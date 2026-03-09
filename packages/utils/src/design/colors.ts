export const colors = {
  primary: '#e60000',
  secondary: '#4a4d4e',
  tertiary: '#25282b',
  error: '#bd0000',
  warning: '#eb6100',
  success: '#008a00',
  info: '#005ea5',
  neutral: {
    0: '#ffffff',
    1: '#f2f2f2',
    2: '#bebebe',
    3: '#7e7e7e',
    4: '#262626',
    5: '#0d0d0d'
  },
  turquoise: '#00697c',
  purple: '#5e2750',
  yellow: '#fecb00',
  pink: '#9c2aa0'
} as const

export type ColorKey = keyof typeof colors
