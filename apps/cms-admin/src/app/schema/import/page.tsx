import PageTitle from '@/components/PageTitle'

export default function SchemaImportPage() {
  return (
    <div>
      <PageTitle title='Import Schema' subtitle='Use once in a lifetime' />

      <div>
        <p className='text-xl'>Run from the root of the monorepo:</p>
        <br />
        <code className='text-xl'>pnpm tsx scripts/schema/import-content-model-from-ctf.ts</code>
        <br />
        <br />
        <br />
        <p className='text-xl'>After generate individual model files with:</p>
        <br />
        <code className='text-xl'>pnpm ...</code>
      </div>
    </div>
  )
}
