import schema from './schema/full/schema.json'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Export content models for other places on monorepo.

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const contentTypes = schema.contentTypes

export function getJSONModel(modelName: string) {
  const modelPath = path.join(__dirname, 'schema', 'models', `${modelName}.json`)

  if (!fs.existsSync(modelPath)) {
    return null
  }

  return JSON.parse(fs.readFileSync(modelPath, 'utf-8'))
}
