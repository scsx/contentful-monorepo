import React, { useMemo } from 'react'
import { locations } from '@contentful/app-sdk'
import { useSDK } from '@contentful/react-apps-toolkit'
import ConfigScreen from '@/components/locations/ConfigScreen'
import Sidebar from '@/components/locations/entry-sidebar/Sidebar'

const ComponentLocationSettings = {
  [locations.LOCATION_ENTRY_SIDEBAR]: Sidebar,
  [locations.LOCATION_APP_CONFIG]: ConfigScreen
}

const App = () => {
  const sdk = useSDK()

  const Component = useMemo(() => {
    for (const [location, component] of Object.entries(ComponentLocationSettings)) {
      if (sdk.location.is(location)) {
        return component
      }
    }
  }, [sdk.location])

  return Component ? <Component /> : null
}

export default App
