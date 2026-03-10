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

  const { contentTypes, schemaVersion } = parsed

  if (!schemaVersion) {
    console.error('Missing schemaVersion.')
    process.exit(1)
  }

  if (!contentTypes || !Array.isArray(contentTypes)) {
    console.error('Invalid schema format.')
    process.exit(1)
  }

  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true })
  }

  const sortedContentTypes = [...contentTypes].sort((a, b) => a.id.localeCompare(b.id))

  for (const ct of sortedContentTypes) {
    const filePath = path.join(modelsDir, `${ct.id}.json`)

    const sortedModel = {
      ...ct,
      fields: Array.isArray(ct.fields)
        ? [...ct.fields].sort((a, b) => a.id.localeCompare(b.id))
        : []
    }

    const modelObject = {
      schemaVersion,
      model: sortedModel
    }

    fs.writeFileSync(filePath, JSON.stringify(modelObject, null, 2))
    console.log(`Created: ${ct.id}.json`)
  }

  console.log('Schema split completed.')
}

run()
