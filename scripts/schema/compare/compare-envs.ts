import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { createClient } from 'contentful-management'
import { normalizeSchema } from '../../scripts-utils/normalize-schema'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const args = process.argv.slice(2)
const source = args[0]
const target = args[1]

if (!source || !target) {
  console.error('Usage: pnpm tsx scripts/schema/compare/compare-envs.ts repo dev')
  process.exit(1)
}

async function getRepoSchema() {
  const schemaPath = path.resolve('packages/cms-schema/src/schema/full/schema.json')

  const raw = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'))
  return normalizeSchema(raw)
}

async function getEnvSchema(envId: string) {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN!
  })

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  const env = await space.getEnvironment(envId)

  const contentTypes = await env.getContentTypes()

  const schema = {
    schemaVersion: '1',
    contentTypes: contentTypes.items.map((ct) => ({
      id: ct.sys.id,
      name: ct.name,
      description: ct.description,
      fields: ct.fields
    }))
  }

  return normalizeSchema(schema)
}

async function run() {
  const repoSchema = source === 'repo' ? await getRepoSchema() : await getEnvSchema(source)
  const targetSchema = target === 'repo' ? await getRepoSchema() : await getEnvSchema(target)

  const repoIds = repoSchema.contentTypes.map((ct: any) => ct.id).sort()
  const targetIds = targetSchema.contentTypes.map((ct: any) => ct.id).sort()
  
  const onlyInRepo = repoIds.filter((id: string) => !targetIds.includes(id))
  const onlyInTarget = targetIds.filter((id: string) => !repoIds.includes(id))

  console.log('\nContent types in repo:', repoIds.length)
  console.log('Content types in target:', targetIds.length)

  if (onlyInRepo.length) {
    console.log('\nOnly in repo:')
    console.log(onlyInRepo)
  }

  if (onlyInTarget.length) {
    console.log('\nOnly in target:')
    console.log(onlyInTarget)
  }

  if (!onlyInRepo.length && !onlyInTarget.length) {
    console.log('\nContent type sets match.')
  }

  if (JSON.stringify(repoSchema) === JSON.stringify(targetSchema)) {
    console.log('\nSchemas are identical.')
  } else {
    console.log('\nSchemas differ.')
  }
}

run()
