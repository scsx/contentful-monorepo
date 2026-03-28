import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps'

export default function ModelGenerationPage() {
  return (
    <>
      <PageTitle title='Stringify' subtitle='Generate from source' />
      <div className='flex'>
        <div className='w-2/3'>
          <ScriptSteps
            steps={[
              {
                title: 'Generate .json models from the .ts source files with:',
                command: 'pnpm tsx scripts/models/generate/generate-json-models.ts'
              }
            ]}
          />
          <p className='mb-4 text-lg'>
            After editing the .ts files (single source of truth), run the script to generate the
            corresponding .json files to{' '}
            <code className='text-lg'>
              <b>\packages\cms-schema\src\schema\models</b>
            </code>
            .
          </p>
          <p className='mb-4 text-lg'>Deleted .ts files will be deleted in the target folder.</p>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='fromRepo' activeStep={1} />
        </div>
      </div>
    </>
  )
}
