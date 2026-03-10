import React from 'react'

type Step = {
  title: string
  command?: string
}

type ScriptStepsProps = {
  steps: Step[]
}

const ScriptSteps: React.FC<ScriptStepsProps> = ({ steps }) => {
  return (
    <div className='scriptsteps'>
      {steps.map((step, index) => (
        <div key={index} className='step'>
          <h5 className='text-xl'>{step.title}</h5>

          {step.command && <code className='text-xl bg-white text-blue'>{step.command}</code>}
        </div>
      ))}
    </div>
  )
}

export default ScriptSteps
