//standard dependencies
import React, { Component } from 'react'
//router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//semantic components
import {  } from 'semantic-ui-react'
//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
import Users from './pages/Users'

//Kenton joining

//styles
const backgroundStyle = {
  backgroundColor: '#e9ecef'
}

//App Component
class App extends Component {
  render() {
    return (
      <div style={backgroundStyle} className="App">
      <Router>
        <div>
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/market' component={Market}/>
          <Route exact path='/dashboard/' component={Dashboard}/>{/*for testing*/}
          <Route exact path='/dashboard/:id' component={Dashboard}/>
          <Route exact path='/users' component={Users}/>
          </Switch>
        </div>
    </Router>
    </div>

    );
  }
}

export default App;
