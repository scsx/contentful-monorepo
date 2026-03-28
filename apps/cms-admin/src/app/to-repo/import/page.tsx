import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import FlowSteps from '@/components/FlowSteps'
import FromCtfToRepoNote from '@/components/FromCtfToRepoNote'

export default function SchemaImportPage() {
  return (
    <>
      <PageTitle
        title='Import Schema'
        subtitle='Downloads your content model from Contentful into a local JSON file'
      />
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
          <h2>Expected output</h2>
          <pre className='bg-black text-white p-4 mt-4 text-base'>
            {`
[dotenv@17.3.1] injecting env (7) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com
Schema exported. New version: 1
        `}
          </pre>
          <h2 className='mt-8'>schema.json</h2>
          <pre className='bg-white text-black p-4 mt-4 text-base'>
            {`
{
  "schemaVersion": "1",
  "generatedAt": "2026-03-28T20:11:24.836Z",
  "contentTypes": [
    {
      "id": "blockWrapper",
      "name": "Block",
      "description": "Block, consumes elements",
      "fields": [
      ...
        `}
          </pre>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='toRepo' activeStep={0} />
        </div>
      </div>
    </>
  )
}
