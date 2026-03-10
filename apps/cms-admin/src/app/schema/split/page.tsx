import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
export default function SchemaSplitPage() {
  return (
    <div>
      <PageTitle title='Split Schema' subtitle='Should almost never be used' />

      <ScriptSteps
        steps={[
          {
            title: 'Generate individual model files from schema.json with:',
            command: 'pnpm tsx scripts/schema/split/split-schema-into-files.ts'
          }
        ]}
      />
    </div>
  )
}
