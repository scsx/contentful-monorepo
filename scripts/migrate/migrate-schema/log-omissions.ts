import fs from 'node:fs'
import path from 'node:path'

type Omission = {
  environment: string
  entity: 'field' | 'contentType'
  contentTypeId: string
  fieldId?: string | null
  timestamp: string
}

const filePath = path.resolve('packages/cms-schema/src/logs/omitted.json')

export function logOmission(entry: Omission) {
  let data = { omitted: [] as Omission[] }

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8')
    data = JSON.parse(raw)
  }

  const exists = data.omitted.some(
    (o) =>
      o.environment === entry.environment &&
      o.entity === entry.entity &&
      o.contentTypeId === entry.contentTypeId &&
      o.fieldId === entry.fieldId
  )

  if (!exists) {
    data.omitted.push(entry)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  }
}
