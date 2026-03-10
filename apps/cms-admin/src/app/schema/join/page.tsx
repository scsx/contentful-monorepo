import PageTitle from '@/components/PageTitle'

export default function SchemaJoinPage() {
  return (
    <div>
      <PageTitle title='Join Schema' subtitle='' />

      <div>
        <p className='text-xl'>Generate final <code>schema.json</code> from individual model files with:</p>
        <br />
        <code className='text-xl'>pnpm ...</code>
      </div>
    </div>
  )
}
