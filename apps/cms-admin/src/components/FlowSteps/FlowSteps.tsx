'use client'

import { ProgressStepper } from '@contentful/f36-components'

type TFlowStep = {
  label: string
}

type TFlowConfig = {
  [key in 'fromRepo' | 'toRepo']: TFlowStep[]
}

const flowConfigs: TFlowConfig = {
  fromRepo: [
    { label: 'IMPORT from Contentful' },
    { label: 'SPLIT full .json into files' },
    { label: 'CREATE .ts files (needs to be done manually)' }
  ],
  toRepo: [
    { label: 'SOURCE (.ts files)' },
    { label: 'GENERATE .json files' },
    { label: 'GENERATE TS types (from .json files)' },
    { label: 'JOIN to schema.json' },
    { label: 'MIGRATE (schema.json)' },
  ]
}

type TFlowStepsProps = {
  flow: 'fromRepo' | 'toRepo'
  activeStep: number
}

const FlowSteps = ({ flow, activeStep }: TFlowStepsProps) => {
  const steps = flowConfigs[flow]

  return (
    <div
      style={{
        height: `${steps.length * 60}px`,
        display: 'flex',
        justifyContent: 'center'
      }}>
      <ProgressStepper
        activeStep={activeStep}
        orientation='vertical'
        ariaLabel={`${flow} progress stepper`}>
        {steps.map((step, index) => {
          let state: 'active' | 'complete' | 'incomplete' = 'incomplete'
          if (index < activeStep) state = 'complete'
          if (index === activeStep) state = 'active'

          return <ProgressStepper.Step key={index} state={state} labelText={step.label} />
        })}
      </ProgressStepper>
    </div>
  )
}

export default FlowSteps
