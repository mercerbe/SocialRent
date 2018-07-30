//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Form, Container, Header, Icon } from 'semantic-ui-react'
//custom components
import TopMenu from '../../components/Menu'
import Footer from '../../components/Footer'

//form validation options--may not need if moved to Auth0 or passport
const options = [
  { key: 'u', text: 'User', value: 'User' },
  { key: 'b', text: 'Business', value: 'Business' },
]

//if we're not using passport or Autho0, use 'error' with form inputs on state

//page component
class Login extends Component {

 render(){

   return(
    <div>
      <TopMenu/>
      <Container style={{marginTop:'5em', marginBottom:'10em'}}>
        <Header as='h2' textAlign='center' icon>
          <Icon name='users ' />
          Login
          <Header.Subheader>Log in to manage your account</Header.Subheader>
        </Header>
         <Form>
                 <Form.Select options={options} placeholder='UserType' />
      <Form.Group widths='equal'>
        <Form.Input fluid label='User name' placeholder='Jane Smith' />
        <Form.Input fluid label='Password' placeholder='*********' />
      </Form.Group>
      <Form.Checkbox label='I agree to the Terms and Conditions'/>
    </Form>
    </Container>
      <Footer />
    </div>
   )

 }

}

export default Login
