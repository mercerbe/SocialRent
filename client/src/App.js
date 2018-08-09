//standard dependencies
import React, { Component } from 'react'
//router
import { Route, Link, withRouter } from 'react-router-dom'
//semantic components -- test this location
import { Header, List } from 'semantic-ui-react'
//pages
import { Home } from './pages/Home/Home'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
//utils
import Storage from './utils/Storage'
import Service from './utils/Service'

//styles
const backgroundStyle = {
  backgroundColor: '#e9ecef',
}

//App Component
class App extends Component {

  //state for login
  state = {
    loggedIn: false,
  }
  //start app lifecyle
  componentDidMount() {
    console.log('app cycle started')
    const token = Storage.getToken()
    if (token) {
      Service.get('/api/user')
        .then(({data}) => {
          if(data.success) {
            this.setState({ loggedIn: true })
            console.log('Login success!')
          }
        })
        .catch( err =>
          console.log('Login failed, please try again.'))
    }
  }

  //handle login
  login = ({ data }) => {
    console.log(data)
    if(data.success) {
      Storage.setToken(data.token)
      this.setState({ loggedIn: true })
      this.props.history.push('/dashboard')
    }
  }
  //handle logout
  logout = () => {
    Storage.setToken('')
    this.setState({ loggedIn: false })
    this.props.history.push('/')
  }

  render() {
    return (
      <div style={backgroundStyle} className="App">
        <List horizontal animated relaxed= 'very' style={{backgroundColor: '#3e3c3d', padding: '15px', width:'70%'}}>
          <List.Item><List.Content><Link to='/'>Home</Link></List.Content></List.Item>
          <List.Item><List.Content><Link to='/login'>Login/Signup</Link></List.Content></List.Item>
          <List.Item><List.Content><Link to='/dashboard'>Dashboard</Link></List.Content></List.Item>
          <List.Item floated='right'><List.Content><Link to='/market'>Market</Link></List.Content></List.Item>
        </List>
        <List horizontal floated='right' style={{backgroundColor: '#3e3c3d', padding: '15px', width:'30%'}}>
          <List.Item><List.Content floated='right'><Header textAlign='right' as='h5' onClick={this.logout} style={{color: 'white'}}>Logout</Header></List.Content></List.Item>
          <List.Item><List.Content floated='right'><Header as='h5' textAlign='right' style={{backgroundColor: '#3e3c3d', color: 'white'}}> ({this.state.loggedIn ? 'logged in' : 'not logged in'})</Header></List.Content></List.Item>
        </List>
        {/*routes to render pages*/}
        <div>
          <Route exact path='/' render={()=> <Home loggedIn={this.state.loggedIn}/>}/>
          <Route path='/login' render={()=> <Login login={this.login} loggedIn={this.state.loggedIn}/>}/>
          <Route path='/dashboard' render={()=> <Dashboard history={this.props.history} loggedIn={this.state.loggedIn}/>}/>
          <Route path='/market' render={()=> <Market history={this.props.history} loggedIn={this.state.loggedIn}/>}/>
        </div>
      </div>

    );
  }
}

export default withRouter(App)
