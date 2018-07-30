//standard dependencies
import React, { Component } from 'react'
//router
import { BrowserRouter as Router, Route } from 'react-router-dom'
//semantic components
import {  } from 'semantic-ui-react'
//custom components

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
import Users from './pages/Users'

//styles
const backgroundStyle = {
  backgroundColor: '#e9ecef'
}

//App Component
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={backgroundStyle}>

          <Route exact path='/' component={Home}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/market' component={Market}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/users' component={Users}/>
        </div>
    </Router>
    );
  }
}

export default App;
