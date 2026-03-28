import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps/FlowSteps'

export default function SchemaJoinPage() {
  return (
    <>
      <PageTitle title='Join Schema' subtitle='' />
      <div className='flex'>
        <div className='w-2/3'>
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
            If you try to delete a model (by removing its .json file) while it is still referenced
            in another model, the script will not proceed:
          </p>
          <pre className='bg-black text-white p-4 mt-4 text-base'>
            {`
❌ ABORT: The following models will be DELETED but are still referenced:

❌ "cta" is referenced by: "ctaGroup", "hero"

📋 ACTION REQUIRED:
1. Replace the references in the dependent models
2. Update the corresponding .json files in packages/cms-schema/src/schema/models/
3. Run the script again
`}
          </pre>

          <h2 className='pt-8 pb-4'>Example schema.json when deleting all models</h2>
          <p>
            If you try to delete a model (by removing its .json file) that is being referenced in
            another model but that model is also being deleted, the script will proceed. Deleting
            all results in a clean schema.json:
          </p>
          <pre className='bg-white text-black p-4 mt-4 text-base'>
            {`
{
  "schemaVersion": "4",
  "generatedAt": "2026-03-27T17:42:31.479Z",
  "contentTypes": []
}
`}
          </pre>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='toRepo' activeStep={3} />
        </div>
      </div>
    </>
  )
}
