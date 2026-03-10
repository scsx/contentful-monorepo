import PageTitle from '@/components/PageTitle'

export default function SchemaImportPage() {
  return (
    <div>
      <PageTitle title='Import Schema' subtitle='Once in a lifetime use' />

      <div>
        Run from the root of the monorepo:
        <br />
        <br />
        <code className='text-xl'>pnpm tsx scripts/schema/import-content-model-from-ctf.ts</code>
      </div>
    </div>
  )
}
