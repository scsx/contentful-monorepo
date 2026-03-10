import dotenv from 'dotenv'
import { createClient } from 'contentful-management'
import fs from 'node:fs'
import path from 'node:path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN!
})

async function run() {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT!)

  const contentTypes = await env.getContentTypes()

  const cleaned = contentTypes.items.map((ct) => ({
    id: ct.sys.id,
    name: ct.name,
    description: ct.description,
    fields: ct.fields
  }))

  const outputPath = path.resolve('packages/cms-schema/src/schema/full/schema.json')

  if (fs.existsSync(outputPath)) {
    console.log('Schema already exists. Aborting.')
    return
  }

  let previousVersion = 0

  if (fs.existsSync(outputPath)) {
    const existing = JSON.parse(fs.readFileSync(outputPath, 'utf-8'))
    previousVersion = Number(existing.schemaVersion || 0)
  }

  const newVersion = previousVersion + 1

  const schemaObject = {
    schemaVersion: String(newVersion),
    generatedAt: new Date().toISOString(),
    contentTypes: cleaned
  }

  fs.writeFileSync(outputPath, JSON.stringify(schemaObject, null, 2))

  console.log(`Schema exported. New version: ${newVersion}`)
}

run()
