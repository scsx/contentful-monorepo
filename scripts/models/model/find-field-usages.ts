import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { createClient } from 'contentful-management'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const args = process.argv.slice(2)
const input = args[0]
const environment = args[1] || 'master'

const USAGE_LIMIT = 500

if (!input || !input.includes('.')) {
  console.error(
    'Usage: pnpm tsx scripts/models/model/find-field-usages.ts <contentType.fieldId> [environment]'
  )
  console.error('Example: pnpm tsx scripts/models/model/find-field-usages.ts cta.ctaBgColour dev')
  process.exit(1)
}

const [contentTypeId, fieldId] = input.split('.')

async function getEnv(envName: string) {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN!
  })

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  return space.getEnvironment(envName)
}

async function run() {
  console.log(`\nSearching usages of field: ${contentTypeId}.${fieldId}`)
  console.log(`Environment: ${environment}\n`)

  const env = await getEnv(environment)

  try {
    const entriesResponse = await env.getEntries({
      content_type: contentTypeId,
      limit: 1000,
      order: '-sys.updatedAt'
    })

    const filteredEntries = entriesResponse.items.filter((entry) => {
      const field = entry.fields?.[fieldId]

      if (!field) return false

      return Object.values(field).some((value) => value !== null && value !== undefined)
    })

    const totalEntries = filteredEntries.length
    const isLimited = totalEntries > USAGE_LIMIT

    const displayEntries = isLimited ? filteredEntries.slice(0, USAGE_LIMIT) : filteredEntries

    const usages = displayEntries.map((entry) => ({
      id: entry.sys.id,
      title: entry.fields.title?.['en-US'] || entry.fields.name?.['en-US'] || '(no title)',
      updatedAt: entry.sys.updatedAt,
      contentType: entry.sys.contentType.sys.id
    }))

    const result = {
      model: contentTypeId,
      field: fieldId,
      environment,
      totalUsages: totalEntries,
      displayed: displayEntries.length,
      limited: isLimited,
      ...(isLimited && { moreInfo: `Showing ${USAGE_LIMIT} of ${totalEntries} entries` }),
      entries: usages
    }

    const outputDir = path.resolve('scripts/output')

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const outputPath = path.resolve(
      outputDir,
      `find-field-usages-${contentTypeId}-${fieldId}-${environment}.json`
    )

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))

    console.log(`✓ Found ${totalEntries} usages`)
    if (isLimited) {
      console.log(`⚠️  Showing first ${USAGE_LIMIT} entries (${totalEntries - USAGE_LIMIT} more)`)
    }
    console.log(`✓ Saved to: ${outputPath}\n`)
  } catch (error: any) {
    if (error.message?.includes('Not Found')) {
      console.error(`✗ Model not found: ${contentTypeId}`)
    } else {
      console.error(`✗ Error:`, error.message)
    }
    process.exit(1)
  }
}

run()
