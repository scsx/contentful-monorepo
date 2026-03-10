import PageTitle from '@/components/PageTitle'

export default function SchemaSplitPage() {
  return (
    <div>
      <PageTitle title='Split Schema' subtitle='Should almost never be used' />

      <div>
        <p className='text-xl'>Generate individual model files from <code>schema.json</code> with:</p>
        <br />
        <code className='text-xl'>pnpm ...</code>
      </div>
    </div>
  )
}
