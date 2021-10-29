import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Main } from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Main} exact />
      </Switch>
    </BrowserRouter>
  )
}
