import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Main } from './pages/Main/Main'

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  )
}
