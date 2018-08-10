//standard dependencies
import React, {
  Component
} from 'react'
//semantic components
import {
  Form,
  Input,
  TextArea,
  Select
} from 'semantic-ui-react'

//options for user type
const options = [{
    key: 'b',
    text: 'Business',
    value: 'business'
  },
  {
    key: 'u',
    text: 'User',
    value: 'user'
  }
]

//signup form component
class SignupForm extends Component {

  //handle state and submit
  state = {
    userName: '',
    email: '',
    submittedName: '',
    submittedEmail: ''
  }

  handleChange = (e, {
    name,
    value
  }) => this.setState({
    [name]: value
  })

  handleSubmit = () => {
    const {
      name,
      email
    } = this.state

    this.setState({
      submittedName: name,
      submittedEmail: email
    })
  }

  render() {
    return ( <Form >
      <Form.Group widths = 'equal' >
        <Form.Field id = 'usernameInput'
          control = {Input}
      label = 'Username'
      placeholder = 'SocialRent4me' />
      <Form.Field id = 'passwordInput'
      control = {
        Input
      }
      label = 'Password'
      placeholder = '**************'
      type = 'password' />
      </Form.Group> 
      <Form.Field id = 'userType'
      control = {
        Select
      }
      label = 'Are you a business or user?'
      placeholder = 'Select One'
      options = {
        options
      }/> <Form.Group widths = 'equal' >
      <Form.Field id = 'twitterHandle'
      control = {
        Input
      }
      label = 'TwitterHandle'
      placeholder = '@twitterHandle' />
      <Form.Field id = 'emailInput'
      control = {
        Input
      }
      label = 'Email'
      placeholder = 'Social@gmail.com' /
      >
      </Form.Group> 
      <Form.Field id = 'aboutInput'
      control = {
        TextArea
      }
      label = 'About'
      placeholder = 'Tell everyone a little about you...' /
      >
      <Form.Button content = 'Submit' />
      </Form>

    )
  }
}

export default SignupForm