//standard dependencies
import React, { Component } from 'react'
//router
import { Route, Link, withRouter } from 'react-router-dom'
//semantic components -- test this location
import {  } from 'semantic-ui-react'
//pages
import { Home } from './pages/Home/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
//utils
import Storage from './utils/Storage'
import Service from './utils/Service'

//styles
const backgroundStyle = {
  backgroundColor: '#e9ecef'
}

//App Component
class App extends Component {

  //state for login
  state = {
    loggedIn: false
  }
  //start app lifecyle
  componentDidMount() {
    console.log('app cycle started')
    const token = Storage.getToken()
    if (token) {
      Service.get('/api/user')
        .then(({data}) => {
          if(data.success) {
            this.setState({ loggedIn: true} )
            console.log('Login success!')
          }
        })
        .catch( err =>
          console.log('Login failed, please try again.'))
    }
  }

  //handle login
  login = ({data}) => {
    if(data.success) {
      Storage.setToken(data.token)
      this.setState({ loggedIn: true })
      this.props.history.push('/')
    }
  }
  //handle logout
  logout = () => {
    Storage.setToken('')
    this.setState({loggedIn: false})
    this.props.history.push('/')
  }

  render() {
    return (
      <div style={backgroundStyle} className="App">
        <div>{/*semantic menu*/}
          <Link to='/' component={Home}>Home</Link>
          <Link to='/login'>Login/Signup</Link>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/market'>Market</Link>
          <span onClick={this.logout}>Logout</span>
        </div>
        {/*routes to render pages*/}
        <div>
          <Route exact path='/' render={()=> <Home loggedIn={this.state.loggedIn}/>}/>
          <Route path='/login' render={()=> <Login login={this.login}/>}/>
          <Route path='/dashboard' render={()=> <Dashboard history={this.props.history} loggedIn={this.state.loggedIn}/>}/>
          <Route path='/market' render={()=> <Market loggedIn={this.state.loggedIn}/>}/>
        </div>
      </div>

    );
  }
}

export default withRouter(App)
