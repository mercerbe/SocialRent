//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Form, Header, Icon, Button } from 'semantic-ui-react'

//LoginForm component
class LoginForm extends Component {

  render() {
    return(
      <div>
      <Header as='h2' textAlign='center' icon>
        <Icon name='users ' />
        Login
        <Header.Subheader>Log in to manage your account</Header.Subheader>
      </Header>
       <Form>

        <Form.Group widths='equal'>
          <Form.Input fluid label='Username' placeholder='JaneSmith' />
          <Form.Input fluid label='Password' placeholder='*********' type='password' />
        </Form.Group>

         <Button type='submit' color='black' floated='right'>Submit</Button>

      </Form>
      </div>
    )
  }
}

export default LoginForm
