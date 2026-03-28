import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps'
import FromCtfToRepoNote from '@/components/FromCtfToRepoNote'

export default function SchemaSplitPage() {
  return (
    <>
      <PageTitle title='Split Schema' subtitle='Generate individual model files (.json) from the imported schema.json' />
      <div className='flex'>
        <div className='w-2/3'>
          <FromCtfToRepoNote />
          <div className='my-8'></div>
          <ScriptSteps
            steps={[
              {
                title: 'Run:',
                command: 'pnpm tsx scripts/schema/split/split-schema-into-files.ts'
              }
            ]}
          />
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='toRepo' activeStep={1} />
        </div>
      </div>
    </>
  )
}
