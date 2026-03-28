import PageTitle from '@/components/PageTitle'
import SchemaViewTable from '@/components/page-specific/SchemaViewTable'
import { contentTypes } from '@repo/cms-schema'

export default function SchemaViewPage() {
  return (
    <div>
      <PageTitle
        title='View Schema'
        subtitle='Reading from packages\cms-schema\src\schema\full\schema.json'
      />

      <SchemaViewTable contentTypes={contentTypes} />
    </div>
  )
}
