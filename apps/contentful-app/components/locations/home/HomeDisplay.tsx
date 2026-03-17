import React from 'react'
import { Paragraph } from '@contentful/f36-components'

const HomeDisplay = () => {
  return (
    <div>
      <Paragraph marginTop='spacingM' marginBottom='spacingM'>
        This is Home Display
      </Paragraph>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='https://www.estadao.com.br/resizer/v2/AZMGCEQCVFNPFBDI4PTSUV6GTU.jpg?quality=80&auth=80cfeced1b5f0fb585922c5fdfe8c9bf372e817d07aac11bf7a035995da55989&width=1200&height=1200&smart=true'
        style={{ width: '33%', height: 'auto' }}
        alt='Homer'
      />
    </div>
  )
}

export default HomeDisplay
