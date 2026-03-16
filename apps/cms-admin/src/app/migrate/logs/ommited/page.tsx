import fs from 'node:fs'
import path from 'node:path'
import PageTitle from '@/components/PageTitle'
import F36Table from '@/components/F36Table'

export default function OmittedPage() {
  const filePath = path.resolve(process.cwd(), '../../packages/cms-schema/src/logs/omitted.json')

  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)

  const columns = [
    { key: 'environment', label: 'Environment' },
    { key: 'entity', label: 'Type' },
    { key: 'contentType', label: 'Content Type' },
    { key: 'date', label: 'Date' }
  ]

  const rows = data.omitted.map((item: any) => ({
    environment: item.environment,
    entity: item.entity,
    contentType: `${item.contentTypeId}${item.fieldId ? `.${item.fieldId}` : ''}`,
    date: item.timestamp
  }))

  return (
    <div>
      <PageTitle title='Omission Logs' />

      <F36Table columns={columns} data={rows} />
    </div>
  )
}
