import React from 'react'
import ReactDOM from 'react-dom'
import { Web3ReactProvider } from '@web3-react/core'

import './scss/index.scss'
import { App } from './App'
import { getLibrary } from './utils/web3/getLibrary'

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
)
