// scripts/schema/bootstrap-from-contentful.ts

import 'dotenv/config'
import { createClient } from 'contentful-management'
import fs from 'fs'
import path from 'path'

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
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

  const outputPath = path.resolve('packages/cms-models/src/content-types/content-types.json')

  fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2))

  console.log('Bootstrap complete.')
}

run()
