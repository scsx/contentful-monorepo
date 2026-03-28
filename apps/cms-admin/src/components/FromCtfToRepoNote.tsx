'use client'

import { Note } from '@contentful/f36-components'

const FromCtfToRepoNote = () => {
  return (
    <div className='w-2/3'>
      <Note title='Once in a lifetime use' variant='neutral'>
        Perform this import only once. After that, your repository becomes the single source of
        truth and will automatically generate and manage all schema updates.
      </Note>
    </div>
  )
}

export default FromCtfToRepoNote
