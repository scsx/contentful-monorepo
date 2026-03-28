import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps/FlowSteps'

export default function ModelGenerationPage() {
  return (
    <>
      <PageTitle title='Generate from source' />
      <div className='flex'>
        <div className='w-2/3'>
          <ScriptSteps
            steps={[
              {
                title: 'Generate TS types',
                command: 'pnpm tsx scripts/migrate/delete-omitted.ts dev'
              }
            ]}
          />
          <p className='mb-4'>
            After editing the .ts files - single source of truth - run the script to generate the
            corresponding .json files.
          </p>
          <p className='mb-4'>
            Deleted files will be deleted in the json folder{' '}
            <code className='text-lg'>\packages\cms-schema\src\schema\models</code>.
          </p>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='toRepo' activeStep={1} />
        </div>
      </div>
    </>
  )
}
