import { Route, Switch } from 'react-router-dom'
import Info  from './components/info/Info'
import Dapp  from './components/dapp/Dapp'

const App = () => {
  return (
    <div>      
      <Switch>
        <Route exact path="/"         component={Info} />
        <Route exact path="/app"    component={Dapp} />
      </Switch>
    </div>
  )
}

export default App
