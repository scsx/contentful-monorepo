import React, { useState, useEffect } from 'react'
import { useSDK } from '@contentful/react-apps-toolkit'
import { FieldAppSDK } from '@contentful/app-sdk'
import { Flex, FormControl, HelpText } from '@contentful/f36-components'
import { colors } from '@repo/utils'
import styles from './ColorPicker.module.css'

const ColorPicker = () => {
  const sdk = useSDK<FieldAppSDK>()
  const [value, setValue] = useState<string>(sdk.field.getValue() || '')

  // Cores disponíveis (excepto neutrals)
  const availableColors = Object.entries(colors).reduce(
    (acc, [key, val]) => {
      if (key !== 'neutral' && typeof val === 'string') {
        acc[key] = val
      }
      return acc
    },
    {} as Record<string, string>
  )

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
