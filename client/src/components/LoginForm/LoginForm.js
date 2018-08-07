//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Form, Input, TextArea, Select } from 'semantic-ui-react'
//utils
import Service from '../../utils/Service'

//options for user type
const userOptions = [
  {key: 'b', text:'Business', value:'business'},
  {key: 'u', text:'User', value:'user'}
]
//options for industry
const industryOptions = [
  {key: 'a', text: 'Technology', value: 'technology'},
  {key: 'b', text: 'Finance', value: 'finance'},
  {key: 'c', text: 'Entertainment', value: 'entertainment'},
  {key: 'd', text: 'Other', value: 'other'},
  {key: 'e', text: 'Other2', value: 'other2'},
]

//signup form component
class SignupForm extends Component {
  //state
  state = {
    handle: '',
    email: '',
    password: '',
    passwordCheck: '',
    createAccount: true
  }

  //handle state and submit
  toggleLogin = () => this.setState({createAccount: !this.state.createAccount})
  updatePassword = (event) => this.setState({password: event.target.value})
  updateEmail = (event) => this.setState({email: event.target.value})
  updateHandle = (event) => this.setState({})
  updatePasswordCheck = (event) => this.setState({passwordCheck: event.target.value})

  render() {
    return(
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='usernameInput'
            control={Input}
            label='Username'
            placeholder='SocialRent4me'
          />
          <Form.Field
            id='passwordInput'
            control={Input}
            label='Password'
            placeholder='**************'
            type='password'
          />
        </Form.Group>
        <Form.Field
          id='userType'
          control={Select}
          label='Are you a business or user?'
          placeholder='Select One'
          options={userOptions}
        />
        <Form.Field
          id='industryType'
          control={Select}
          label='Industry'
          placeholder='Select One'
          options={industryOptions}
        />
        <Form.Group widths='equal'>
          <Form.Field
            id='twitterHandle'
            control={Input}
            label='TwitterHandle'
            placeholder='@twitterHandle'
          />
          <Form.Field
            id='emailInput'
            control={Input}
            label='Email'
            placeholder='Social@gmail.com'
          />
        </Form.Group>
          <Form.Field
            id='aboutInput'
            control={TextArea}
            label='About'
            placeholder='Tell everyone a little about you...'
          />
        <Form.Button content='Submit'/>
      </Form>

    )
  }
}

export default SignupForm
