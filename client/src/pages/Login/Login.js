//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Divider, Segment, Header, Icon } from 'semantic-ui-react'
//custom components
import TopMenu from '../../components/Menu'
import Footer from '../../components/Footer'
import LoginForm from '../../components/LoginForm'

//form validation options--


//page component
class Login extends Component {

 render(){

   return(
    <div>
      <TopMenu/>
      <br />
      <Container style={{marginTop:'4.5em', marginBottom:'20em'}}>
        <br />
          <Container text>
            <Segment style={{background: '#fbbd08', marginTop: '100px'}} raised padded>
              <Header as='h1' icon textAlign='center'>
                <Header.Content>Login</Header.Content>
                <Icon name='users' circular/>
              </Header>
               <LoginForm />
             </Segment>
           </Container>
        <br />
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <p color='black'>Login via Twitter or Paypal</p>
        </Divider>
         {/*this is where we'll add the auth0 login*/}
        </Container>
          <Footer />
        </div>
   )

 }

}

export default Login
