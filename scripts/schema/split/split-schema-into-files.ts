import fs from 'node:fs'
import path from 'node:path'

const fullSchemaPath = path.resolve('packages/cms-schema/src/schema/full/schema.json')

const modelsDir = path.resolve('packages/cms-schema/src/schema/models')

function run() {
  if (!fs.existsSync(fullSchemaPath)) {
    console.error('Full schema not found.')
    process.exit(1)
  }

  const raw = fs.readFileSync(fullSchemaPath, 'utf-8')
  const parsed = JSON.parse(raw)

  const { contentTypes } = parsed

  if (!contentTypes || !Array.isArray(contentTypes)) {
    console.error('Invalid schema format.')
    process.exit(1)
  }

  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true })
  }

  for (const ct of contentTypes) {
    const filePath = path.join(modelsDir, `${ct.id}.json`)

    fs.writeFileSync(filePath, JSON.stringify(ct, null, 2))
    console.log(`Created: ${ct.id}.json`)
  }

  console.log('Schema split completed.')
}

run()
