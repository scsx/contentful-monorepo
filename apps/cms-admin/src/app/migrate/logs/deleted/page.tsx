import fs from 'node:fs'
import path from 'node:path'
import PageTitle from '@/components/PageTitle'

export default function DeletedPage() {
  const filePath = path.resolve(process.cwd(), '../../packages/cms-schema/src/logs/deleted.json')

  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)

  return (
    <div>
      <PageTitle title='Deletion Logs' subtitle='After being omitted.' />

      <ul>
        {data.deleted?.map((item: any, i: number) => (
          <li key={i}>
            <pre>
              In: {item.environment}, type: {item.entity}, id: {item.contentTypeId}
              {item.fieldId ? `.${item.fieldId}` : ''}, deleted: {item.deletedAt}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  )
}
