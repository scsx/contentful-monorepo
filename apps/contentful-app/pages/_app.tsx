import 'regenerator-runtime/runtime'
import { SDKProvider } from '@contentful/react-apps-toolkit'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <SDKProvider>
      <Component {...pageProps} />
    </SDKProvider>
  )
}

export default App
