import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  Home,
  Login,
  Sign,
  ViewProjectDetail,
  ViewProjectMenu,
  ViewSearch,
  DiscoverProject,
  ViewCollectionDetail,
  ViewUserMenu,
  ViewUser
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
        <Route path='/search' component={ViewSearch} />
        <Route path='/project/:projectId' component={ViewProjectDetail} />
        <Route path='/collection/:collectionId' component={ViewCollectionDetail} />
        <Route path='/discover' component={DiscoverProject} />
        <Route exact path='/user/:userId' component={ViewUser} />
        <Route exact path='/user/menu/:userId' component={ViewUserMenu} />

      </Switch>
    </Router>
  );
}

export default App;
