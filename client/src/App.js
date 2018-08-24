//standard dependencies
import React, { Component } from 'react'
//router
import { Route, Link, withRouter } from 'react-router-dom'
//semantic components -- test this location
import { Header, Button, Icon, Sticky, Menu, Sidebar, Segment, Image } from 'semantic-ui-react'
//pages
import { Home } from './pages/Home/Home'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
//utils
import Storage from './utils/Storage'
import Service from './utils/Service'
import Loader from './images/loading.gif'

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
    visible: false,
    loading: true
  }

  //start app lifecyle -- CONFIRM USER/BUSINESS
  componentDidMount() {
    this.setState({loading: false})
    console.log('Application cycle initiated.')
    const token = Storage.getToken()
    if (token) {
      //check for user
      Service.get('/api/user')
        .then(({data}) => {
          if(data.success && data.user !== null) {
            this.setState({ loggedIn: true, loading: false })
            console.log('Logged in.', data)
          }
          else {
            //check for business
            Service.get('/api/business')
              .then(({data}) => {
                if(data.success) {
                  this.setState({ loggedIn: true, loading: false })
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
      this.setState({ loggedIn: true, loading: false })
      this.props.history.push('/dashboard')
    }
  }
  //handle logout
  logout = () => {
    Storage.setToken('')
    this.setState({ loggedIn: false, loading: false })
    this.props.history.push('/')
  }
  //adding functions for the sidebar
  handleButtonClick = () => this.setState({ visible: !this.state.visible })
  handleSidebarHide = () => this.setState({ visible: false })

  //adding functions for the sidebar
  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const {visible} = this.state
    return (

      <div style={backgroundStyle} className="App">

          {this.state.loading &&
          <Image src={Loader} centered/>}
        <Header style={{backgroundColor: '#1b1c1d', padding: '10px', height: '50px', width:'100%', marginBottom: '-18px'}}>
          <Button compact onClick={this.handleButtonClick} icon='bars' floated='left' content='menu' inverted color='grey'/>
          {this.state.loggedIn &&
          <Button compact onClick={this.logout}  icon='sign out' floated='right' content='logout' inverted color='grey'/>
          }
        </Header>
        <Sidebar.Pushable as={Segment}>
         <Sticky>
           <Sidebar
             as={Menu}
             animation='overlay'
             icon='labeled'
             inverted
             onHide={this.handleSidebarHide}
             vertical
             visible={visible}
             width='thin'
           >
             <Menu.Item as=''>
               <Icon name='home'/>
               <Link to='/' onClick={this.handleButtonClick}>Home</Link>
             </Menu.Item>
             {this.state.loggedIn === false &&
             <Menu.Item as=''>
               <Icon name='sign in' />
               <Link to='/login' onClick={this.handleButtonClick }>Login/Signup</Link>
             </Menu.Item>
             }
             <Menu.Item as=''>
               <Icon name='columns' />
               <Link to='/dashboard' onClick={this.handleButtonClick}>Dashboard</Link>
             </Menu.Item>
             <Menu.Item as=''>
               <Icon name='handshake' />
               <Link to='/market' onClick={this.handleButtonClick}>Market</Link>
             </Menu.Item>
           </Sidebar>
         </Sticky>
           {/*routes to render pages*/}
           <Sidebar.Pusher dimmed={visible} style={{margin: 0}}>
           <div style={{margin: 0}}>
             <Route exact path='/' render={()=> <Home loggedIn={this.state.loggedIn}/>}/>
             <Route path='/login' render={()=> <Login login={this.login} loggedIn={this.state.loggedIn}/>}/>
             <Route path='/dashboard' render={()=> <Dashboard history={this.props.history} loggedIn={this.state.loggedIn} login={this.login}/>}/>
             <Route path='/market' render={()=> <Market history={this.props.history} loggedIn={this.state.loggedIn}/>}/>
           </div>
         </Sidebar.Pusher>
         </Sidebar.Pushable>
         </div>
    );
  }
}

export default withRouter(App)
