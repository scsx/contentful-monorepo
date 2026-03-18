import React, { useState, useEffect } from 'react'
import { useSDK } from '@contentful/react-apps-toolkit'
import { FieldAppSDK } from '@contentful/app-sdk'
import { Flex, FormControl, HelpText } from '@contentful/f36-components'
import styles from './ColorPicker.module.css'

const ColorPicker = () => {
  const sdk = useSDK<FieldAppSDK>()
  const [value, setValue] = useState<string>(sdk.field.getValue() || '')

  // Cores disponíveis (podem ser customizadas)
  const availableColors: Record<string, string> = {
    primary: '#e60000',
    secondary: '#4a4d4e',
    tertiary: '#25282b',
    error: '#bd0000',
    warning: '#eb6100',
    success: '#008a00',
    info: '#005ea5',
    neutral: '#7e7e7e',
    turquoise: '#00697c',
    purple: '#5e2750',
    yellow: '#fecb00',
    pink: '#9c2aa0'
  }

  useEffect(() => {
    sdk.field.onValueChanged((newValue: any) => {
      setValue(newValue || '')
    })
  }, [sdk])

  const handleColorSelect = (colorKey: string) => {
    setValue(colorKey)
    sdk.field.setValue(colorKey)
  }

  const colorEntries = Object.entries(availableColors)

  return (
    <FormControl>
      <FormControl.Label>Select a color</FormControl.Label>
      <Flex gap='spacingS' flexWrap='wrap' style={{ marginTop: '12px' }}>
        {colorEntries.map(([key, colorValue]) => (
          <button
            key={key}
            className={`${styles.colorSwatch} ${value === key ? styles.active : ''}`}
            style={{ backgroundColor: colorValue as string }}
            onClick={() => handleColorSelect(key)}
            title={key}
            aria-label={key}
          />
        ))}
      </Flex>
      {value && <HelpText>Selected: {value}</HelpText>}
    </FormControl>
  )
}

export default ColorPicker
