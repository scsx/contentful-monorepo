'use client'

import { ProgressStepper } from '@contentful/f36-components'
import { navAndFlowSteps } from '@/utils/constants'

type TFlowStepsProps = {
  flow: 'fromRepo' | 'toRepo'
  activeStep: number
}

const FlowSteps = ({ flow, activeStep }: TFlowStepsProps) => {
  const flowConfig = navAndFlowSteps[flow]
  const steps = flowConfig.steps

  return (
    <div
      style={{
        height: `${steps.length * 60}px`
      }}>
      <ProgressStepper
        activeStep={activeStep}
        orientation='vertical'
        ariaLabel={`${flow} progress stepper`}>
        {steps.map((step, index) => {
          let state: 'active' | 'complete' | 'incomplete' = 'incomplete'
          if (index < activeStep) state = 'complete'
          if (index === activeStep) state = 'active'

          return <ProgressStepper.Step key={index} state={state} labelText={step.simpleLabel} />
        })}
      </ProgressStepper>
    </div>
  )
}

export default FlowSteps
