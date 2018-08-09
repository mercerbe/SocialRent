//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Form, Input, TextArea, Select, Header } from 'semantic-ui-react'
//utils
import Service from '../../utils/Service'

//options for user type -- this needs to determine which inputs show up
const userOptions = [
  {key: 'b', text:'Business', value:'business'},
  {key: 'u', text:'User', value:'user'}
]
//options for industry
const industryOptions = [
  {key: 'a', text: 'Technology', value: 'technology'},
  {key: 'b', text: 'Finance', value: 'finance'},
  {key: 'c', text: 'Entertainment', value: 'entertainment'},
  {key: 'd', text: 'Games & Hobbies', value: 'gamesandhobbies'},
  {key: 'e', text: 'Automotive', value: 'automotive'},
]

//signup form component
class LoginForm extends Component {
  //state
  state = {
    type: '',
    email: '',
    password: '',
    passwordCheck: '',
    handle: '',
    name: '',
    industry: '',
    about: '',
    createAccount: false
  }

  //handle state and submit-- add usertype, industry, about
  toggleLogin = () => this.setState({createAccount: !this.state.createAccount})
  updateType = (event, {value}) => {
    this.setState({value})
    this.setState({type: value})
    console.log('state: ', {value})
    console.log(this.state.type)
  }
  updatePassword = (event) => this.setState({password: event.target.value})
  updateEmail = (event) => this.setState({email: event.target.value})
  updateHandle = (event) => this.setState({handle: event.target.value})
  updateName = (event) => this.setState({name: event.target.value})
  updateIndustry = (event, {value}) => {
    event.persist()
    this.setState({value})
    this.setState({industry: value})
    console.log('state: ', {value})
    console.log(this.state.industry)
  }
  updatePasswordCheck = (event) => this.setState({passwordCheck: event.target.value})
  updateAbout = (event) => this.setState({about: event.target.value})

  //methods to check all signup params

  //login
  handleLogin = (event) => {
    event.preventDefault()

    Service.post('/api/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(this.props.login)
      .catch(err =>
        //add alert or modal here
        console.log(err))
  }

  //signup
  handleRegistration = (event) => {
    event.preventDefault()

    const { handle, email, password, passwordCheck } = this.state
    console.log('signup', this.state)
    if(handle && email && password !== '' && password === passwordCheck) {
      Service.post('/api/register',{
        handle: this.state.handle,
        email: this.state.email,
        password: this.state.password,
        about: this.state.about
      })
      .then(({data}) => {
        console.log({data});
        if(data.status === 200) {
          this.setState({ handle: '', email:'', password: '', passwordCheck: '', about: '', createAccount: false })
        }
      })
      .catch( err =>
        //add alert here or modal
        console.log('Registration failed. Please try again.'))
    }
  }

  render() {
    const noPassMatch = this.state.passwordCheck !== '' && this.state.passwordCheck !== this.state.password
    const {value} = this.state
    return(
      <div>

        <Header as='h2' textAlign='center'>
          {this.state.createAccount ? 'Signup' : 'Login'}
        </Header>

        {this.state.createAccount ?
          <Header as='h5' textAlign='center'>Already have an account?
            <span onClick={this.toggleLogin} style={{color: '#065471'}}> Login here.</span>
          </Header> :
          <Header as='h5' textAlign='center'>Need an account?
            <span onClick={this.toggleLogin} style={{color: '#065471'}}> Create one now!</span>
          </Header>
            }

      <Form action=''>
        {this.state.createAccount &&
        <Form.Field
          id='userType'
          control={Select}
          label='Are you a business or user?'
          placeholder='Select One'
          options={userOptions}
          name='type'
          value={value}
          onChange={this.updateType}
        />
        }
        <Form.Group widths='equal'>
          <Form.Field
            id='emailInput'
            control={Input}
            label='Email'
            placeholder='Social@gmail.com'
            type='text'
            name='email'
            value={this.state.email}
            onChange={this.updateEmail}
          />
          <Form.Field
            id='passwordInput'
            control={Input}
            label='Password'
            placeholder='**************'
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.updatePassword}
          />
        {this.state.createAccount &&
          <Form.Field
            id='passwordConfirm'
            control={Input}
            label='Confirm Password'
            placeholder='**************'
            type='password'
            name='passwordconfirm'
            value={this.state.passwordCheck}
            onChange={this.updatePasswordCheck}
            />
        }{noPassMatch && <Header as='h6'>Passwords must match!</Header>}
        </Form.Group>
        {this.state.createAccount &&
      <Form.Group widths='equal'>

        <Form.Field
          id='industryType'
          control={Select}
          placeholder='Select One'
          label='Industry'
          options={industryOptions}
          value={value}
          onChange={this.updateIndustry}
        />
        <Form.Field
          id='companyNameInput'
          type='text'
          control={Input}
          label='Business Name'
          placeholder='Our Business'
          name='name'
          value={this.state.name}
          onChange={this.updateName}
        />
      </Form.Group>
    }
      {this.state.createAccount &&
        <Form.Field
          id='handleInput'
          type='text'
          control={Input}
          label='Twitter Handle'
          placeholder='SocialRent4me'
          name='handle'
          value={this.state.handle}
          onChange={this.updateHandle}
        />
    }
      {this.state.createAccount &&
          <Form.Field
            id='aboutInput'
            control={TextArea}
            label='About'
            placeholder='Tell everyone a little about you...'
            name='about'
            value={this.state.about}
            onChange={this.updateAbout}
          />
      }
        {!this.state.createAccount ? (
        <Form.Button content='Login' onClick={this.handleLogin}/>
        ) : (
        <Form.Button content='Signup' onClick={this.handleRegistration}/>
        )
        }
      </Form>
    </div>

    )
  }
}

export default LoginForm
