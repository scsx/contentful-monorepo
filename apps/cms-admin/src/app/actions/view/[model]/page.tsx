import Link from 'next/link'
import PageTitle from '@/components/PageTitle'
import Button from '@/components/Button'
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

      <ActionsViewModelTabs model={model} fields={json.model.fields} />

      <div className='flex space-x-8'>
        <pre className='w-2/3 bg-white p-4'>{JSON.stringify(json, null, 2)}</pre>
        <div>
          <Button isDisabled>Edit Model</Button>
          <p>
            To be implemented. Check{' '}
            <Link href='/to-repo/create' className='text-lg'>
              Model Builder
            </Link>{' '}
            for more info
          </p>
        </div>
      </div>
    </div>
  )
}
