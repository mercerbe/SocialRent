//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Divider } from 'semantic-ui-react'
//custom components
import TopMenu from '../../components/Menu'
import Footer from '../../components/Footer'
import LoginForm from '../../components/LoginForm'

//form validation options--may not need if moved to Auth0 or passport


//if we're not using passport or Autho0, use 'error' with form inputs on state

//page component
class Login extends Component {

 render(){

   return(
    <div>
      <TopMenu/>
      <br />
      <Container style={{marginTop:'4.5em', marginBottom:'20em'}}>
        <br />
        <LoginForm />
        <br />
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <p color='black'>Login via Twitter or Paypal</p>
        </Divider>
         {/*this is where we'll add the auth0 or passport login*/}
        </Container>
          <Footer />
        </div>
   )

 }

}

export default Login
