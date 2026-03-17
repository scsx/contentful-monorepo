import React from 'react'
import { useSDK } from '@contentful/react-apps-toolkit'

const Sidebar: React.FC = () => {
  const sdk = useSDK()

  return (
    <div style={{ padding: '16px', backgroundColor: '#f3f4f5', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>My Sidebar App</h3>
      <p style={{ margin: '8px 0' }}>This is showing in the entry sidebar!</p>
      <p style={{ margin: '8px 0', fontSize: '12px', color: '#666' }}>Location: entry-sidebar</p>
    </div>
  )
}

export default Sidebar
