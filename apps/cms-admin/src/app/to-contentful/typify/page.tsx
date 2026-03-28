import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps'

export default function TypesGenerationPage() {
  return (
    <>
      <PageTitle title='Typify' subtitle='Generate from .json files' />
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
          <p className='mb-4 text-lg'>
            Generates TypeScript type definitions from the .json model files (from step 2.2,
            Stringify). Reading from JSON is more straightforward and reliable than from .ts source
            files.
          </p>
          <p className='mb-4 text-lg'>
            The resulting{' '}
            <code>
              <b>types.ts</b>
            </code>{' '}
            is saved to{' '}
            <code>
              <b>packages/types</b>
            </code>{' '}
            and becomes the single source of truth for all TypeScript types across the entire
            project.
          </p>
          <p className='mb-4 text-lg'>
            TypeScript convention: all types use{' '}
            <code>
              <b>T</b>
            </code>{' '}
            prefix (e.g.,{' '}
            <code>
              <b>TTable</b>
            </code>
            ) and are declared with{' '}
            <code>
              <b>type</b>
            </code>
            , never{' '}
            <code>
              <b>interface</b>
            </code>
            .
          </p>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='fromRepo' activeStep={2} />
        </div>
      </div>
    </>
  )
}
