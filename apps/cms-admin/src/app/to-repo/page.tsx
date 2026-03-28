'use client'

import PageTitle from '@/components/PageTitle'
import FlowSteps from '@/components/FlowSteps'
import FromCtfToRepoNote from '@/components/FromCtfToRepoNote'

export default function ToRepoPage() {
  return (
    <div>
      <PageTitle title='Contentful to Repo' />
      <div className='w-2/3'>
        <FromCtfToRepoNote />
        <h2 className='my-8'>Steps:</h2>
        <FlowSteps flow='toRepo' activeStep={2} />
      </div>
    </div>
  )
}
