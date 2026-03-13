import fs from 'node:fs'
import path from 'node:path'
import { normalizeSchema } from '../../scripts-utils/normalize-schema'

export function getRepoSchema() {
  const schemaPath = path.resolve('packages/cms-schema/src/schema/full/schema.json')
  const raw = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'))
  return normalizeSchema(raw)
}
