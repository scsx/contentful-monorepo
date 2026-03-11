'use client'

import { Button as F36Button } from '@contentful/f36-components'
import type { ReactNode } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'positive' | 'negative' | 'transparent'
  size?: 'small' | 'medium' | 'large'
  isDisabled?: boolean
  isLoading?: boolean
  isFullWidth?: boolean
  onClick?: () => void
  className?: string
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  isDisabled = false,
  isLoading = false,
  isFullWidth = false,
  onClick,
  className,
  children
}: Props) {
  return (
    <F36Button
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isFullWidth={isFullWidth}
      onClick={onClick}
      className={className}>
      {children}
    </F36Button>
  )
}
