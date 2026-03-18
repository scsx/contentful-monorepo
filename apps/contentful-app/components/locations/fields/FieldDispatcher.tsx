import React from 'react'
import { useSDK } from '@contentful/react-apps-toolkit'
import { FieldAppSDK } from '@contentful/app-sdk'
import { WidgetId } from '@repo/cms-schema/widgets'
import ColorPicker from './ColorPicker/ColorPicker'

const FieldDispatcher = () => {
  const sdk = useSDK<FieldAppSDK>()

  // Mapear widget IDs para componentes
  const widgetComponents: Record<string, React.ComponentType<any>> = {
    [WidgetId.COLOR_PICKER]: ColorPicker
    // Adicionar mais widgets customizados aqui
  }

  // Ler o widget ID dos parâmetros da instância
  const widgetId = sdk.parameters?.instance?.widgetId as string

  const Component = widgetComponents[widgetId]

  if (!Component) {
    return <div>No custom widget configured for {widgetId || 'unknown'}</div>
  }

  return <Component />
}

export default FieldDispatcher
