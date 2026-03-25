import fs from 'node:fs'
import path from 'node:path'
import { normalizeSchema } from '../../scripts-utils/normalize-schema'

const fullSchemaPath = path.resolve('packages/cms-schema/src/schema/full/schema.json')
const modelsDir = path.resolve('packages/cms-schema/src/schema/models')

function run() {
  // Validate models directory exists
  if (!fs.existsSync(modelsDir)) {
    console.error('Models directory not found.')
    process.exit(1)
  }

  // Read current schema to get schemaVersion
  let currentSchema: any = {
    schemaVersion: '0',
    contentTypes: []
  }

  if (fs.existsSync(fullSchemaPath)) {
    try {
      const raw = fs.readFileSync(fullSchemaPath, 'utf-8')
      currentSchema = JSON.parse(raw)
    } catch (err) {
      console.error('Failed to parse current schema:', err)
      process.exit(1)
    }
  }

  // Increment schemaVersion
  const currentVersion = parseInt(currentSchema.schemaVersion || '0', 10)
  const nextVersion = (currentVersion + 1).toString()

  // Get today's date in ISO format
  const generatedAt = new Date().toISOString()

  // Read all model files
  const modelFiles = fs.readdirSync(modelsDir).filter((f) => f.endsWith('.json'))

  if (modelFiles.length === 0) {
    console.warn('No model files found in models directory.')
  }

  const contentTypes: any[] = []
  const processedModelIds = new Set<string>()

  // Process each model file
  for (const modelFile of modelFiles) {
    const modelPath = path.join(modelsDir, modelFile)

    try {
      const raw = fs.readFileSync(modelPath, 'utf-8')
      const modelData = JSON.parse(raw)

      if (!modelData.model || !modelData.model.id) {
        console.error(`Invalid model file: ${modelFile} (missing model.id)`)
        continue
      }

      const model = modelData.model
      processedModelIds.add(model.id)
      contentTypes.push(model)
      console.log(`Loaded: ${model.id}`)
    } catch (err) {
      console.error(`Failed to load model file ${modelFile}:`, err)
      process.exit(1)
    }
  }

  // Build new schema with all models
  const newSchema = {
    schemaVersion: nextVersion,
    generatedAt,
    contentTypes
  }

  // Normalize schema
  const normalizedSchema = normalizeSchema(newSchema)

  // Write to file
  try {
    fs.writeFileSync(fullSchemaPath, JSON.stringify(normalizedSchema, null, 2))
    console.log(`\n✅ Schema updated: ${fullSchemaPath}`)
    console.log(`📝 Version: ${currentVersion} → ${nextVersion}`)
    console.log(`📦 Content types: ${contentTypes.length}`)
    console.log(`🕒 Generated at: ${generatedAt}`)
  } catch (err) {
    console.error('Failed to write schema:', err)
    process.exit(1)
  }
}

run()
