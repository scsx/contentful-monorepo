import fs from 'node:fs'
import path from 'node:path'
import { normalizeSchema } from '../../scripts-utils/normalize-schema'
import { createInterface } from 'node:readline'

const fullSchemaPath = path.resolve('packages/cms-schema/src/schema/full/schema.json')
const modelsDir = path.resolve('packages/cms-schema/src/schema/models')

// Helper to prompt user
function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.toLowerCase())
    })
  })
}

// Extract all referenced content type IDs from a model
function getReferences(model: any): string[] {
  const refs = new Set<string>()

  const extractRefs = (obj: any) => {
    if (!obj || typeof obj !== 'object') return

    if (Array.isArray(obj)) {
      for (const item of obj) {
        extractRefs(item)
      }
    } else {
      // Check for linkContentType references
      if (obj.linkContentType && Array.isArray(obj.linkContentType)) {
        obj.linkContentType.forEach((ref: string) => refs.add(ref))
      }

      // Recurse through all properties
      for (const key in obj) {
        extractRefs(obj[key])
      }
    }
  }

  extractRefs(model)
  return Array.from(refs)
}

// Find which models reference a given model ID
function findDependents(modelId: string, allModels: Map<string, any>): string[] {
  const dependents: string[] = []

  for (const [id, model] of allModels) {
    const refs = getReferences(model)
    if (refs.includes(modelId)) {
      dependents.push(id)
    }
  }

  return dependents
}

async function run() {
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

  // Read all model files
  const modelFiles = fs.readdirSync(modelsDir).filter((f) => f.endsWith('.json'))

  if (modelFiles.length === 0) {
    console.warn('No model files found in models directory.')
  }

  const newModels = new Map<string, any>()
  const oldModels = new Map<string, any>()

  // Load new models
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
      newModels.set(model.id, model)
    } catch (err) {
      console.error(`Failed to load model file ${modelFile}:`, err)
      process.exit(1)
    }
  }

  // Track old models
  for (const ct of currentSchema.contentTypes) {
    oldModels.set(ct.id, ct)
  }

  // Check for deletions and their dependents
  const deletedModels: string[] = []
  for (const [id] of oldModels) {
    if (!newModels.has(id)) {
      deletedModels.push(id)
    }
  }

  if (deletedModels.length > 0) {
    console.log('\n⚠️  The following models will be DELETED:')
    for (const modelId of deletedModels) {
      const dependents = findDependents(modelId, oldModels)
      if (dependents.length > 0) {
        console.log(`  ❌ ${modelId} (Referenced by: ${dependents.join(', ')})`)
      } else {
        console.log(`  ✓ ${modelId}`)
      }
    }

    const answer = await prompt('\nDo you want to proceed? (yes/no): ')
    if (answer !== 'yes' && answer !== 'y') {
      console.log('Cancelled.')
      process.exit(0)
    }
  }

  // Increment schemaVersion
  const currentVersion = parseInt(currentSchema.schemaVersion || '0', 10)
  const nextVersion = (currentVersion + 1).toString()

  // Get today's date in ISO format
  const generatedAt = new Date().toISOString()

  console.log(`\n📦 Loading ${newModels.size} models...`)
  for (const [modelId] of newModels) {
    console.log(`  Loaded: ${modelId}`)
  }

  // Build new schema with all models
  const contentTypes = Array.from(newModels.values())
  const newSchema = {
    schemaVersion: nextVersion,
    generatedAt,
    contentTypes
  }

  // Normalize schema (sorts everything alphabetically, preserves all fields)
  const normalizedSchema = normalizeSchema(newSchema)

  // Write to file
  try {
    fs.writeFileSync(fullSchemaPath, JSON.stringify(normalizedSchema, null, 2))
    console.log(`\n✅ Schema updated: ${fullSchemaPath}`)
    console.log(`📝 Version: ${currentVersion} → ${nextVersion}`)
    console.log(`📦 Content types: ${contentTypes.length}`)
    console.log(`🕒 Generated at: ${generatedAt}`)
    if (deletedModels.length > 0) {
      console.log(`🗑️  Deleted models: ${deletedModels.length}`)
    }
  } catch (err) {
    console.error('Failed to write schema:', err)
    process.exit(1)
  }
}

run()
