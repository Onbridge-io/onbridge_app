import { useState } from 'react'
import { utils } from 'ethers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getRefParam } from './utils/getRefParam'

import { Main, Activities, Leaderboard } from './pages'

export function App() {
  const [currentPage, setCurrentPage] = useState('Main')

  const referrer = getRefParam()

  if (utils.isAddress(referrer)) {
    localStorage.setItem('referrer', referrer)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/activities"
          element={
            <Activities
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <Route
          path="/"
          exact
          element={
            <Main currentPage={currentPage} setCurrentPage={setCurrentPage} />
          }
        />
        <Route
          path="*"
          element={
            <Main currentPage={currentPage} setCurrentPage={setCurrentPage} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
