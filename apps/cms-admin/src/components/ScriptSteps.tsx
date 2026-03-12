'use client'

import React, { useState } from 'react'
import { CopySimpleIcon } from '@contentful/f36-icons'

type Step = {
  title: string
  command?: string
}

type ScriptStepsProps = {
  steps: Step[]
}

const ScriptSteps: React.FC<ScriptStepsProps> = ({ steps }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)

    setTimeout(() => {
      setCopiedIndex(null)
    }, 2000)
  }

  return (
    <div className='scriptsteps'>
      {steps.map((step, index) => (
        <div key={index} className='step'>
          <h5 className='text-xl'>{step.title}</h5>

          {step.command && (
            <div className='flex items-center'>
              <code className='text-xl bg-white text-blue'>{step.command}</code>

              <CopySimpleIcon
                className='ml-4 mr-4 cursor-pointer'
                onClick={() => handleCopy(step.command!, index)}
              />

              {copiedIndex === index && <p>Copied!</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ScriptSteps
