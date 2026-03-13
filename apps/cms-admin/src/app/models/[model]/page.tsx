import PageTitle from '@/components/PageTitle'
import Button from '@/components/Button'
import { getJSONModel } from '@repo/cms-schema'
import ScriptSteps from '@/components/ScriptSteps'

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

      <ScriptSteps
        steps={[
          {
            title: 'Find usages in dev:',
            command: `pnpm tsx scripts/models/model/find-usages.ts ${model} dev`
          },
          {
            title: 'Find usages in master:',
            command: `pnpm tsx scripts/models/model/find-usages.ts ${model} master`
          }
        ]}
      />

      <div className='flex space-x-8'>
        <pre className='w-2/3 bg-white p-4'>{JSON.stringify(json, null, 2)}</pre>
        <div>
          <Button isDisabled>Edit Model</Button>
          <br />
          <br />
          <p>
            To be implemented. Check{' '}
            <a href='/models/create' className='text-lg'>
              Model Builder
            </a>{' '}
            for more info
          </p>
          
        </div>
      </div>
    </div>
  )
}
