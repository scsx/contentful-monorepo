import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'

export default function SchemaImportPage() {
  return (
    <div>
      <PageTitle title='Import Schema' subtitle='Use once in a lifetime' />

      <ScriptSteps
        steps={[
          {
            title: '1 Run from the root of the monorepo:',
            command: 'pnpm tsx scripts/schema/import-content-model-from-ctf.ts'
          },
          {
            title: '2 After generate individual model files with:',
            command: 'pnpm ...'
          }
        ]}
      />
    </div>
  )
}
