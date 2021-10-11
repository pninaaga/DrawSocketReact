import logo from './logo.svg';
import './App.css';
import Socket from '../src/components/socket/socket'
import EnterName from '../src/components/enterName/enterName'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Switch>
      <Route exact path='/' component={EnterName}></Route>
      <Route exact path='/draw' component={Socket}></Route>
      </Switch>
    </Router>
  );
}

export default App;
