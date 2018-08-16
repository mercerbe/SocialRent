//standard dependencies
import React, { Component } from 'react'
//router
import { Route, Link, withRouter } from 'react-router-dom'
//semantic components -- test this location
import { Header, List, Button, Icon, Sticky, Menu, Sidebar, Label } from 'semantic-ui-react'
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
    //adding a sidebar, so we can toggle its visiblity with a button click
    visible: false
  }

  //start app lifecyle -- CONFIRM USER/BUSINESS
  componentDidMount() {
    console.log('Application cycle initiated.')
    const token = Storage.getToken()
    if (token) {
      //check for user
      Service.get('/api/user')
        .then(({data}) => {
          if(data.success && data.user !== null) {
            this.setState({ loggedIn: true })
            console.log('Logged in.', data)
          }
          else {
            //check for business
            Service.get('/api/business')
              .then(({data}) => {
                if(data.success) {
                  this.setState({ loggedIn: true })
                  console.log('Logged in as a business.', data)
                }
              })
              .catch( err => console.log('Login failed, please try again.'))
          }
        })
        .catch( err =>
          console.log('Login failed, please try again.'))

    } else {
      console.log(this.state)
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

  //adding functions for the sidebar
  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {

    //sidebar will be hidden until clicked.  I'm thinking about making it only show up on mobile.
    const {visible} = this.state

    return (
      
      <div style={backgroundStyle} className="App">
      
     <Header style={{backgroundColor: '#3e3c3d', padding: '30px', height: '60px', width:'100%'}}> 
     <Button compact onClick={this.handleButtonClick} icon='bars' floated='left' content='menu' inverted color='blue'/> 
     <Button compact onClick={this.logout}  icon='sign out' floated='right' content='logout' inverted color='blue' label ='panther' /> 
     
     
     </Header>
      
      <Sticky>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={this.handleSidebarHide}
        vertical
        visible={visible}
        width=' thin'
      >
        <Menu.Item as='a'>
          <Icon name='home'/>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='sign in' />
          <Link to='/login'>Login/Signup</Link>
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='columns' />
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='handshake' />
          <Link to='/market'>Market</Link>
        </Menu.Item>
      </Sidebar>
      </Sticky>
      <Sidebar.Pushable as={Header}>
        <List horizontal animated relaxed= 'very' >
        
          <List.Item><List.Content><Link to='/'>Home</Link></List.Content></List.Item>
          <List.Item><List.Content><Link to='/login'>Login/Signup</Link></List.Content></List.Item>
          <List.Item><List.Content><Link to='/dashboard'>Dashboard</Link></List.Content></List.Item>
          <List.Item floated='right'><List.Content><Link to='/market'>Market</Link></List.Content></List.Item>
        </List>
        <List horizontal floated='right' style={{backgroundColor: '#3e3c3d', padding: '15px', width:'30%'}}>
          <List.Item><List.Content floated='right'><Header textAlign='right' as='h5' onClick={this.logout} style={{color: 'white'}}>Logout</Header></List.Content></List.Item>
          <List.Item><List.Content floated='right'><Header as='h5' textAlign='right' style={{backgroundColor: '#3e3c3d', color: 'white'}}> ({this.state.loggedIn ? 'logged in' : 'not logged in'})</Header></List.Content></List.Item>
        </List>
        </Sidebar.Pushable>
        {/*routes to render pages*/}
        <div>
          <Route exact path='/' render={()=> <Home loggedIn={this.state.loggedIn}/>}/>
          <Route path='/login' render={()=> <Login login={this.login} loggedIn={this.state.loggedIn}/>}/>
          <Route path='/dashboard' render={()=> <Dashboard history={this.props.history} loggedIn={this.state.loggedIn} login={this.login}/>}/>
          <Route path='/market' render={()=> <Market history={this.props.history} loggedIn={this.state.loggedIn}/>}/>
        </div>
     
      </div>
      
      
    
    );
  }
}

export default withRouter(App)
