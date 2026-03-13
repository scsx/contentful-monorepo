import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { createClient } from 'contentful-management'
import { normalizeSchema } from '../scripts-utils/normalize-schema'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const args = process.argv.slice(2)
const source = args[0]
const target = args[1]

if (!source || !target) {
  console.error('Usage: pnpm tsx scripts/schema/migrate/migrate-schema.ts repo dev')
  process.exit(1)
}

if (source !== 'repo') {
  console.error('Only repo → env migrations supported for now.')
  process.exit(1)
}

async function confirm(question: string) {
  const rl = readline.createInterface({ input, output })
  const answer = await rl.question(`${question} (y/n): `)
  rl.close()
  return answer.toLowerCase() === 'y'
}

async function getRepoSchema() {
  const schemaPath = path.resolve('packages/cms-schema/src/schema/full/schema.json')
  const raw = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'))
  return normalizeSchema(raw)
}

async function getEnv() {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN!
  })

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  return space.getEnvironment(target)
}

async function run() {
  console.log(`\nSource: ${source}`)
  console.log(`Target: ${target}\n`)

  const repoSchema = await getRepoSchema()
  const env = await getEnv()

  const existingContentTypes = await env.getContentTypes()
  const existingMap = new Map(existingContentTypes.items.map((ct) => [ct.sys.id, ct]))

  const omissions: string[] = []

  for (const repoCT of repoSchema.contentTypes) {
    const existing = existingMap.get(repoCT.id)
    if (!existing) continue

    const repoFieldIds = new Set(repoCT.fields.map((f: any) => f.id))

    for (const existingField of existing.fields) {
      if (!repoFieldIds.has(existingField.id) && !existingField.omitted) {
        omissions.push(`${repoCT.id}.${existingField.id}`)
      }
    }
  }

  if (omissions.length > 0) {
    console.log('\nFields to be omitted:')
    omissions.forEach((f) => console.log(` - ${f}`))

    const ok = await confirm(
      '\nDid you run scripts/models/model/find-field-usages.ts?\n' +
        'Did you run scripts/models/model/find-field-usages.ts?\n' +
        'Continue anyway?'
    )

    if (!ok) {
      console.log('\nMigration aborted.')
      process.exit(1)
    }

    console.log('')
  }

  let created = 0
  let updated = 0
  let fieldsAdded = 0
  let fieldsUpdated = 0
  let fieldsOmitted = 0

  for (const repoCT of repoSchema.contentTypes) {
    const existing = existingMap.get(repoCT.id)

    if (!existing) {
      console.log(`Create content type: ${repoCT.id}`)

      const ct = await env.createContentTypeWithId(repoCT.id, {
        name: repoCT.name,
        description: repoCT.description,
        fields: repoCT.fields
      })

      await ct.publish()

      created++
      continue
    }

    let changed = false

    if (existing.name !== repoCT.name) {
      existing.name = repoCT.name
      changed = true
    }

    if ((existing.description ?? null) !== (repoCT.description ?? null)) {
      existing.description = repoCT.description
      changed = true
    }

    const fieldMap = new Map(existing.fields.map((f: any) => [f.id, f]))

    for (const repoField of repoCT.fields) {
      const existingField = fieldMap.get(repoField.id)

      if (!existingField) {
        console.log(`  Add field: ${repoCT.id}.${repoField.id}`)
        existing.fields.push(repoField)
        fieldsAdded++
        changed = true
        continue
      }

      const existingNormalized = normalizeSchema({
        schemaVersion: '1',
        contentTypes: [{ id: 'x', name: '', description: '', fields: [existingField] }]
      }).contentTypes[0].fields[0]

      const repoNormalized = repoField

      if (JSON.stringify(existingNormalized) !== JSON.stringify(repoNormalized)) {
        console.log(`  Update field: ${repoCT.id}.${repoField.id}`)

        Object.assign(existingField, repoField)

        fieldsUpdated++
        changed = true
      }
    }

    const repoFieldIds = new Set(repoCT.fields.map((f: any) => f.id))

    for (const existingField of existing.fields) {
      if (!repoFieldIds.has(existingField.id) && !existingField.omitted) {
        console.log(`  Omit field: ${repoCT.id}.${existingField.id}`)

        existingField.omitted = true

        fieldsOmitted++
        changed = true
      }
    }

    if (changed) {
      console.log(`Update content type: ${repoCT.id}`)

      const ordered = repoCT.fields.map((repoField: any) => {
        const current = existing.fields.find((f: any) => f.id === repoField.id)
        return current ?? repoField
      })

      const omittedFields = existing.fields.filter((f: any) => f.omitted)

      existing.fields = [...ordered, ...omittedFields]

      const updatedCT = await existing.update()
      await updatedCT.publish()

      updated++
    } else {
      console.log(`No changes: ${repoCT.id}`)
    }
  }

  console.log('\nSummary')
  console.log('-------')
  console.log('Content types created:', created)
  console.log('Content types updated:', updated)
  console.log('Fields added:', fieldsAdded)
  console.log('Fields updated:', fieldsUpdated)
  console.log('Fields omitted:', fieldsOmitted)
}

run()
