import './App.css';
import Socket from '../src/components/socket/socket'
import EnterName from '../src/components/enterName/enterName'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import socketIoClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:3000/'

function App() {

  const socket = socketIoClient(ENDPOINT)

  return (
    <>
      <p className="title-draw">Drawing</p>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <EnterName socket={socket} />} />
          <Route exact path='/draw/:firstName' render={() => <Socket socket={socket} />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
