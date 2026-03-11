import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'

export default function CompareSchemasPage() {
  return (
    <div>
      <PageTitle title='Compare Schemas' subtitle='' />

      <ScriptSteps
        steps={[
          {
            title: 'Compare two schema.json files with:',
            command: 'pnpm tsx scripts/schema/compare-envs.ts dev master'
          }
        ]}
      />

      <p className='text-lg'>
        Use <code className='bg-white text-blue'>dev</code>,{' '}
        <code className='bg-white text-blue'>preprod</code>,{' '}
        <code className='bg-white text-blue'>staging</code> or{' '}
        <code className='bg-white text-blue'>master</code> (Nothing has been implemented)
      </p>
      
    </div>
  )
}
