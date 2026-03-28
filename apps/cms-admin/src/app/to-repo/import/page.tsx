import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps/FlowSteps'
import FromCtfToRepoNote from '@/components/FromCtfToRepoNote'

export default function SchemaImportPage() {
  return (
    <>
      <PageTitle title='Import Schema' />
      <div className='flex'>
        <div className='w-2/3'>
          <FromCtfToRepoNote />
          <div className='my-8'></div>
          <ScriptSteps
            steps={[
              {
                title: 'Run from the root of the monorepo:',
                command: 'pnpm tsx scripts/schema/import/import-content-model-from-ctf.ts'
              }
            ]}
          />
          <p className="mt-8 text-lg">Downloads your content model from Contentful into a local JSON file.</p>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='toRepo' activeStep={0} />
        </div>
      </div>
    </>
  )
}
