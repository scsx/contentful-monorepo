import React from 'react'
import { locations } from '@contentful/app-sdk'
import { useSDK } from '@contentful/react-apps-toolkit'
import ConfigScreen from '@/components/locations/ConfigScreen'
import Sidebar from '@/components/locations/entry-sidebar/Sidebar'
import HomeDisplay from '@/components/locations/home/HomeDisplay'
import FieldDispatcher from '@/components/locations/fields/FieldDispatcher'

const ComponentLocationSettings = {
  [locations.LOCATION_ENTRY_SIDEBAR]: Sidebar,
  [locations.LOCATION_APP_CONFIG]: ConfigScreen,
  [locations.LOCATION_HOME]: HomeDisplay,
  [locations.LOCATION_ENTRY_FIELD]: FieldDispatcher
}

const App = () => {
  const sdk = useSDK()

  const Component = Object.entries(ComponentLocationSettings).find(([location]) =>
    sdk.location.is(location)
  )?.[1]

  if (!Component) {
    console.log('Available locations:', Object.keys(ComponentLocationSettings))
    console.log('Current SDK location:', sdk.location)
    Object.keys(ComponentLocationSettings).forEach((loc) => {
      console.log(`Is ${loc}?`, sdk.location.is(loc))
    })
  }

  return Component ? (
    <Component />
  ) : (
    <div style={{ padding: '20px', background: '#f3f3f3', borderRadius: '4px' }}>
      <p style={{ margin: 0, color: '#666' }}>
        App not initialized. Check console for details or ensure the app is properly configured in
        Contentful settings.
      </p>
    </div>
  )
}

export default App
