import path from 'node:path'
import dotenv from 'dotenv'
import { normalizeSchema } from '../scripts-utils/normalize-schema'

import { confirm } from './migrate-schema/confirm'
import { getRepoSchema } from './migrate-schema/get-repo-schema'
import { getEnv } from './migrate-schema/get-env'
import { detectOmissions } from './migrate-schema/detect-omissions'
import { logOmission } from './migrate-schema/log-omissions'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// 1. Parse CLI arguments
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

async function run() {
  console.log(`\nSource: ${source}`)
  console.log(`Target: ${target}\n`)

  // 2. Load schemas
  const repoSchema = await getRepoSchema()
  const env = await getEnv(target)
  const existingContentTypes = await env.getContentTypes()

  // 3. Detect omissions (fields / content types not present in repo)
  const { omissions, contentTypesToOmit, existingMap } = detectOmissions(
    repoSchema,
    existingContentTypes
  )

  // 4. Ask confirmation before destructive actions
  if (omissions.length > 0 || contentTypesToOmit.length > 0) {
    if (omissions.length > 0) {
      console.log('\nFields to be omitted:')
      omissions.forEach((f) => console.log(` - ${f}`))
    }

    if (contentTypesToOmit.length > 0) {
      console.log('\nContent types to be omitted:')
      contentTypesToOmit.forEach((ct) => console.log(` - ${ct}`))
    }

    const ok = await confirm(
      '\nDid you run scripts/models/model/find-usages.ts?\n' +
        'Did you run scripts/models/model/find-field-usages.ts?\n' +
        'Continue anyway?'
    )

    if (!ok) {
      console.log('\nMigration aborted.')
      process.exit(1)
    }

    console.log('')
  }

  // 5. Counters for summary
  let created = 0
  let updated = 0
  let fieldsAdded = 0
  let fieldsUpdated = 0
  let fieldsOmitted = 0

  // 6. Iterate repo content types
  for (const repoCT of repoSchema.contentTypes) {
    const existing: any = existingMap.get(repoCT.id)

    // 6.1 Create content type if missing
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

    // 6.2 Update content type metadata
    if (existing.name !== repoCT.name) {
      existing.name = repoCT.name
      changed = true
    }

    if ((existing.description ?? null) !== (repoCT.description ?? null)) {
      existing.description = repoCT.description
      changed = true
    }

    // 6.3 Map existing fields
    const fieldMap = new Map(existing.fields.map((f: any) => [f.id, f]))

    // 6.4 Add or update fields
    for (const repoField of repoCT.fields) {
      const existingField = fieldMap.get(repoField.id)

      // Add new field
      if (!existingField) {
        console.log(`  Add field: ${repoCT.id}.${repoField.id}`)
        existing.fields.push(repoField)
        fieldsAdded++
        changed = true
        continue
      }

      // Compare normalized fields to avoid false positives
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

    // 6.5 Omit fields not present in repo schema
    const repoFieldIds = new Set(repoCT.fields.map((f: any) => f.id))

    for (const existingField of existing.fields) {
      if (!repoFieldIds.has(existingField.id) && !existingField.omitted) {
        console.log(`  Omit field: ${repoCT.id}.${existingField.id}`)

        existingField.omitted = true

        logOmission({
          environment: target,
          entity: 'field',
          contentTypeId: repoCT.id,
          fieldId: existingField.id,
          timestamp: new Date().toISOString()
        })

        fieldsOmitted++
        changed = true
      }
    }

    // 6.6 Update content type if any change occurred
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

  // 7. Omit content types not present in repo
  for (const ctId of contentTypesToOmit) {
    const ct: any = existingMap.get(ctId)
    if (!ct) continue

    console.log(`Omit content type: ${ctId}`)
    // Log omissions to omitted.json
    logOmission({
      environment: target,
      entity: 'contentType',
      contentTypeId: ctId,
      fieldId: null,
      timestamp: new Date().toISOString()
    })

    ct.fields.forEach((f: any) => {
      f.omitted = true
    })

    const updatedCT = await ct.update()
    await updatedCT.publish()
  }

  // 8. Summary
  console.log('\nSummary')
  console.log('-------')
  console.log('Content types created:', created)
  console.log('Content types updated:', updated)
  console.log('Fields added:', fieldsAdded)
  console.log('Fields updated:', fieldsUpdated)
  console.log('Fields omitted:', fieldsOmitted)
}

run()
