import Link from 'next/link'
import PageTitle from '@/components/PageTitle'
import { getJSONModel } from '@repo/cms-schema'
import ActionsViewModelTabs from '@/components/page-specific/ActionsViewModelTabs'

type Props = {
  params: Promise<{
    model: string
  }>
}

export default async function ModelDetailPage({ params }: Props) {
  const { model } = await params

  const json = getJSONModel(model)

  if (!json) {
    return <div>Model not found</div>
  }

  return (
    <div>
      <PageTitle title={model} subtitle='Model (content type)' />

      <div className='flex space-x-8'>
        <div className='w-2/3'>
          <h2 className='mb-4'>Find usages in Contentful</h2>
          <ActionsViewModelTabs model={model} fields={json.model.fields} />

          <h2 className='mb-4'>Model JSON</h2>
          <p className='text-lg mb-4'>
            Live data, reading from{' '}
            <code>
              <b>packages\cms-schema\src\index.ts</b>
            </code>
          </p>
          <pre className='bg-white p-4'>{JSON.stringify(json, null, 2)}</pre>
        </div>
        <div className='w-1/3 pt-8'>
          <Link href='/actions/view'>Back to view schema</Link>
        </div>
      </div>
    </div>
  )
}
