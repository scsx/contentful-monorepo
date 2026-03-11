import PageTitle from '@/components/PageTitle'
import Button from '@/components/Button'
import { getJSONModel } from '@repo/cms-schema'

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
      <PageTitle title={`Model: ${model}`} subtitle='' />

      <div className='flex space-x-8'>
        <pre className='w-1/3'>{JSON.stringify(json, null, 2)}</pre>
        <div>
          <Button isDisabled>Edit Model</Button>
          <br />
          <br />
          <p>
            To be implemented. Check <code className='text-lg'>/models/create</code> for more info
          </p>
        </div>
      </div>
    </div>
  )
}
