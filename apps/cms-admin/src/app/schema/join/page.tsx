import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'

export default function SchemaJoinPage() {
  return (
    <div>
      <PageTitle title='Join Schema' subtitle='' />

      <ScriptSteps
        steps={[
          {
            title: 'Generate final schema.json from individual model files (.json) with:',
            command: 'pnpm ...'
          }
        ]}
      />
    </div>
  )
}
