import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps/FlowSteps'
import FromCtfToRepoNote from '@/components/FromCtfToRepoNote'

export default function SchemaSplitPage() {
  return (
    <>
      <PageTitle title='Split Schema' subtitle='Should almost never be used' />
      <div className='flex'>
        <div className='w-2/3'>
          <FromCtfToRepoNote />
          <div className='my-8'></div>
          <ScriptSteps
            steps={[
              {
                title: 'Generate individual model files (.json) from schema.json with:',
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
