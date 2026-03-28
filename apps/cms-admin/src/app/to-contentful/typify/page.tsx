import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps/FlowSteps'

export default function TypesGenerationPage() {
  return (
    <>
      <PageTitle title='Generate TypeScript types' />
      <div className='flex'>
        <div className='w-2/3'>
          <ScriptSteps
            steps={[
              {
                title: 'From root:',
                command: 'pnpm tsx scripts/types/generate-types.ts'
              }
            ]}
          />
          <p className='mb-4'>
            This is not done from the .ts files (single source of truth), it&apos;s done from the
            next step, .json files, because it&apos;s much easier.
          </p>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='fromRepo' activeStep={2} />
        </div>
      </div>
    </>
  )
}
