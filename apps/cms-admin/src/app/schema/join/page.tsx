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
            command: 'pnpm tsx scripts/schema/join/join-files-into-schema.ts'
          }
        ]}
      />

      <h2 className='pt-8 pb-4'>Example output when deleting referenced models</h2>
      <p>
        If you try to delete a model (by removing its .json file) while it is still referenced in
        another model, the script will not proceed:
      </p>
      <pre className='bg-black text-white p-4 mt-4 text-base w-2/3'>
        {`
❌ ABORT: The following models will be DELETED but are still referenced:

❌ "cta" is referenced by: "ctaGroup", "hero"

📋 ACTION REQUIRED:
1. Replace the references in the dependent models
2. Update the corresponding .json files in packages/cms-schema/src/schema/models/
3. Run the script again
`}
      </pre>
    </div>
  )
}
