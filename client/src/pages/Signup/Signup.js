//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
//custom components
import TopMenu from '../../components/Menu'
import Footer from '../../components/Footer'

//page component
class Signup extends Component {
 render(){
   return(
     <div>
       <TopMenu />
       <br/>
       <br/>
       <h1>Sign up</h1>
         <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png'/> 
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Need an account: <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
  <br/>
  <Footer />
     </div>
   )
 }
}

export default Signup
