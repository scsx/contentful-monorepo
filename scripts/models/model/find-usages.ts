import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { createClient } from 'contentful-management'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const args = process.argv.slice(2)
const modelId = args[0]
const environment = args[1] || 'master'

const USAGE_LIMIT = 500

if (!modelId) {
  console.error('Usage: pnpm tsx scripts/models/model/find-usages.ts <modelId> [environment]')
  console.error('Example: pnpm tsx scripts/models/model/find-usages.ts blockWrapper dev')
  process.exit(1)
}

async function getEnv(envName: string) {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN!
  })

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  return space.getEnvironment(envName)
}

async function run() {
  console.log(`\nSearching usages of model: ${modelId}`)
  console.log(`Environment: ${environment}\n`)

  const env = await getEnv(environment)

  try {
    const entriesResponse = await env.getEntries({
      content_type: modelId,
      limit: 1000,
      order: '-sys.updatedAt'
    })

    const totalEntries = entriesResponse.total
    const isLimited = totalEntries > USAGE_LIMIT
    const displayEntries = isLimited
      ? entriesResponse.items.slice(0, USAGE_LIMIT)
      : entriesResponse.items

    const usages = displayEntries.map((entry) => ({
      id: entry.sys.id,
      title: entry.fields.title?.['en-US'] || entry.fields.name?.['en-US'] || '(no title)',
      updatedAt: entry.sys.updatedAt,
      contentType: entry.sys.contentType.sys.id
    }))

    const result = {
      model: modelId,
      environment,
      totalUsages: totalEntries,
      displayed: displayEntries.length,
      limited: isLimited,
      ...(isLimited && { moreInfo: `Showing ${USAGE_LIMIT} of ${totalEntries} entries` }),
      entries: usages
    }

    // Ensure output directory exists
    const outputDir = path.resolve('scripts/output')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const outputPath = path.resolve(outputDir, `find-usages-${modelId}-${environment}.json`)

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))

    console.log(`✓ Found ${totalEntries} usages`)
    if (isLimited) {
      console.log(`⚠️  Showing first ${USAGE_LIMIT} entries (${totalEntries - USAGE_LIMIT} more)`)
    }
    console.log(`✓ Saved to: ${outputPath}\n`)
  } catch (error: any) {
    if (error.message?.includes('Not Found')) {
      console.error(`✗ Model not found: ${modelId}`)
    } else {
      console.error(`✗ Error:`, error.message)
    }
    process.exit(1)
  }
}

run()
