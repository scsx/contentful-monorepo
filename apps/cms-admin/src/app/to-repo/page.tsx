import PageTitle from '@/components/PageTitle'
import FlowSteps from '@/components/FlowSteps/FlowSteps'

export default function ToRepoPage() {
  return (
    <div>
      <PageTitle title='Contentful to Repo' />
      <div className='w-2/3'>
        <p>This action should only be performed after you have exported your Contentful data.</p>
        <h2 className='mb-8'>Steps:</h2>
        <FlowSteps flow='toRepo' activeStep={2} />
      </div>
    </div>
  )
}
