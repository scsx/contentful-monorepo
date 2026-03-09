import { contentTypes } from '@repo/cms-models'

export default function SchemaViewPage() {
  return (
    <div>
      <h1>Schema View</h1>

      <pre>{JSON.stringify(contentTypes, null, 2)}</pre>
    </div>
  )
}
