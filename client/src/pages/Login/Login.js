//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Divider, Segment, Header, Icon } from 'semantic-ui-react'
//custom components
import Footer from '../../components/Footer'
import LoginForm from '../../components/LoginForm'


//page component
class Login extends Component {

 render(){

   return(
    <div>
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
         {/*this is where we might do nothing....*/}
        </Container>
          <Footer />
        </div>
   )

 }

}

export default Login
