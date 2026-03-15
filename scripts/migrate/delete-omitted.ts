import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { createClient } from 'contentful-management'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

if (!process.env.CONTENTFUL_ENVIRONMENT_DEV) {
  console.error('Missing CONTENTFUL_ENVIRONMENT_DEV in .env')
  process.exit(1)
}

const args = process.argv.slice(2)
const target = args[0]

if (!target) {
  console.error('Usage: pnpm tsx scripts/migrate/delete-omitted.ts dev')
  process.exit(1)
}

const DEV = process.env.CONTENTFUL_ENVIRONMENT_DEV

if (target !== DEV) {
  console.error(`Deletion only allowed in ${DEV}`)
  process.exit(1)
}

const omittedPath = path.resolve('packages/cms-schema/src/logs/omitted.json')
const deletedPath = path.resolve('packages/cms-schema/src/logs/deleted.json')

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN!
})

async function run() {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  const env = await space.getEnvironment(target)

  const omittedRaw = JSON.parse(fs.readFileSync(omittedPath, 'utf-8'))

  const deletedRaw = fs.existsSync(deletedPath)
    ? JSON.parse(fs.readFileSync(deletedPath, 'utf-8'))
    : { deleted: [] }

  const remaining: any[] = []

  const toDelete = omittedRaw.omitted.filter((o: any) => o.environment === target)

  for (const item of omittedRaw.omitted) {
    if (item.environment !== target) {
      remaining.push(item)
      continue
    }

    if (item.entity === 'field') {
      console.log(`Delete field: ${item.contentTypeId}.${item.fieldId}`)

      const ct: any = await env.getContentType(item.contentTypeId)

      const exists = ct.fields.some((f: any) => f.id === item.fieldId)

      if (!exists) {
        console.log(`Field already removed: ${item.contentTypeId}.${item.fieldId}`)
      } else {
        ct.fields = ct.fields.filter((f: any) => f.id !== item.fieldId)

        const updated = await ct.update()
        await updated.publish()
      }

      deletedRaw.deleted.push({
        ...item,
        deletedAt: new Date().toISOString()
      })

      continue
    }

    if (item.entity === 'contentType') {
      console.log(`Delete content type: ${item.contentTypeId}`)

      const ct: any = await env.getContentType(item.contentTypeId)

      try {
        await ct.unpublish()
      } catch {}

      await ct.delete()

      deletedRaw.deleted.push({
        ...item,
        deletedAt: new Date().toISOString()
      })

      continue
    }

    remaining.push(item)
  }

  fs.writeFileSync(omittedPath, JSON.stringify({ omitted: remaining }, null, 2))

  fs.writeFileSync(deletedPath, JSON.stringify(deletedRaw, null, 2))

  console.log('\nDeleted items:', toDelete.length)
}

run()
