import PageTitle from '@/components/PageTitle'
import FlowSteps from '@/components/FlowSteps'

export default function ToContentfulPage() {
  return (
    <div>
      <PageTitle title='Repo to Contentful' />
      <div>
        <h2 className='mb-8'>Steps:</h2>
        <FlowSteps flow='fromRepo' activeStep={5} />
      </div>
    </div>
  )
}
