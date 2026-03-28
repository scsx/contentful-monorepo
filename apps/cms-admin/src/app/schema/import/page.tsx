import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps/FlowSteps'

export default function SchemaImportPage() {
  return (
    <>
      <PageTitle title='Import Schema' subtitle='Use once in a lifetime' />
      <div className='flex'>
        <div className='w-2/3'>
          <ScriptSteps
            steps={[
              {
                title: 'Run from the root of the monorepo:',
                command: 'pnpm tsx scripts/schema/import/import-content-model-from-ctf.ts'
              }
            ]}
          />
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='fromRepo' activeStep={0} />
        </div>
      </div>
    </>
  )
}
