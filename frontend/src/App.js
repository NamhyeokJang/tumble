import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, Login, Sign } from './pages'
import { Header } from './components'

import './styles/global.css'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/sign' component={Sign} />
      </Switch>
    </Router>
  );
}

export default App;
