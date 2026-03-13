import fs from 'node:fs'
import path from 'node:path'
import PageTitle from '@/components/PageTitle'

export default function OmittedPage() {
  const filePath = path.resolve(process.cwd(), '../../packages/cms-schema/src/logs/omitted.json')

  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)

  return (
    <div>
      <PageTitle title='Omission Logs' />

      <ul>
        {data.omitted.map((item: any, i: number) => (
          <li key={i}>
            <pre>
              In: {item.environment}, type (type/field): {item.entity}, id: {item.contentTypeId}
              {item.fieldId ? `.${item.fieldId}` : ''}, date: {item.timestamp}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  )
}
