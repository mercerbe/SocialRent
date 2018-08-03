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

//======================================//
//Auth0 imports
import Callback from './AuthCallback'
import Auth from './Auth/Auth'
//======================================//
//========================================//
// //Auth0 test to render Auth0 page
// import Auth from './Auth/Auth.js'
// //auth0 test
// const auth = new Auth()
// auth.login()
//========================================//

//styles
const backgroundStyle = {
  backgroundColor: '#e9ecef'
}
//auth0 handle authentication
const auth = new Auth()
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
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
          <Route exact path='/login' render={(props) => <Login auth={auth} {...props}/>}/>
          <Route exact path='/market' component={Market}/>
          <Route exact path='/dashboard/' component={Dashboard}/>{/*for testing*/}
          <Route exact path='/dashboard/:id' component={Dashboard}/>
          <Route exact path='/users' component={Users}/>
          {/* routing for Auth0*/}
          <Route path='/callback' render={(props) => {handleAuthentication(props); return <Callback {...props}/>}}/>
          </Switch>
        </div>
    </Router>
    </div>

    );
  }
}

export default App;
