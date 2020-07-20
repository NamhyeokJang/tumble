import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  Home,
  Login,
  Sign,
  ViewProjectDetail,
  ViewProjectMenu,
  DiscoverProject,
  ViewCollection
} from './pages'
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

        <Route path='/menu' component={ViewProjectMenu} />
        <Route path='/project/:projectId' component={ViewProjectDetail} />
        <Route path='/collection/:collection' component={ViewCollection} />
        <Route path='/discover' component={DiscoverProject} />
      </Switch>
    </Router>
  );
}

export default App;
