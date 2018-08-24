//standard dependencies
import React, {
  Component
} from 'react'
//semantic components
import { Form, Input, TextArea, Select, Header, Message, Modal, Button } from 'semantic-ui-react'
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
    email: '',
    password: '',
    passwordCheck: '',
    handle: '',
    name: '',
    about: '',
    type: '',
    industry: '',
    createAccount: false,
    emailError: false,
    passwordError: false,
    formError: false,
    errorMessage: '',
    hidden: true,
    open: false,
  }

  //update state
  toggleLogin = () => this.setState({createAccount: !this.state.createAccount})
  updateType = (e, {value}) => {
    this.setState({value})
    console.log('typestate: ', {value})
    this.setState({type: value})
  }
  updatePassword = (event) => this.setState({password: event.target.value, passwordError: false, hidden: true, errorMessage: ''})
  updateEmail = (event) => this.setState({email: event.target.value, emailError: false, hidden: true, errorMessage: ''})
  updateHandle = (event) => this.setState({handle: event.target.value})
  updateName = (event) => this.setState({name: event.target.value})
  updateIndustry = (event, {value}) => {
    this.setState({value})
    console.log('industrystate: ', {value})
    this.setState({industry: value})
    console.log(this.state.industry)
    console.log(this.state.type)
  }
  updatePasswordCheck = (event) => this.setState({passwordCheck: event.target.value})
  updateAbout = (event) => this.setState({about: event.target.value})
  //confirm
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false, createAccount: false, type: '' })

  //==============methods to check all signup and login params==============//

  //login
  handleLogin = (event) => {
    event.preventDefault()
    const { type } = this.state
    if(type === 'user'){
    Service.post('/api/user/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(this.props.login)
      .catch(err =>
        console.log(err))
      }
    if(type === 'business'){
      Service.post('/api/business/login', {
        email: this.state.email,
        password: this.state.password
      })
        .then(this.props.login)
        .catch(err =>
          console.log(err))
    }
  }

  //signup
  handleRegistration = (event) => {
    event.preventDefault()

    const { type, name, industry, about, handle, email, password, passwordCheck } = this.state
    //post to user
    if(handle && email && password && about !== '' && password === passwordCheck && type === 'user') {
    console.log('signup user', this.state)
      Service.post('/api/user/register',{
        handle: this.state.handle,
        email: this.state.email,
        password: this.state.password,
        about: this.state.about
      })
      .then(({data}) => {
        console.log({data});
        if(data.status === 200) {
          this.open()
          this.setState({ type: '', handle: '', email:'', password: '', passwordCheck: '', about: '', emailError: false,
          passwordError: false,
          formError: false,
          errorMessage: '',
          hidden: true,
          })
        }
      })
      .catch( err =>
        //add alert here or modal
        console.log('Registration failed. Please try again.'))
    }
    //post to business
    if(name && email && password && about && industry !== '' && password === passwordCheck && type === 'business') {
    console.log('signup business', this.state)
      Service.post('/api/business/register',{
        name: this.state.name,
        industry: this.state.industry,
        email: this.state.email,
        password: this.state.password,
        about: this.state.about
      })
      .then(({data}) => {
        console.log({data});
        if(data.status === 200) {
          this.open()
          this.setState({ type: '', industry: '', name: '', handle: '', email:'', password: '', passwordCheck: '', about: '', emailError: false,
          passwordError: false,
          formError: false,
          errorMessage: '',
          hidden: true,
          open: true
          })
        }
      })
      .catch( err =>
        //add alert here or modal
        console.log('Registration failed. Please try again.'))
    }
  }
//==============================================================================//

  render() {
    const noPassMatch = this.state.passwordCheck !== '' && this.state.passwordCheck !== this.state.password
    const { value } = this.state
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

        <Form.Field
          id='userType'
          control={Select}
          label='Are you a business or user?'
          placeholder='Select One'
          options={userOptions}
          selection
          name='type'
          value={value}
          onChange={this.updateType}
        />

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
        }
        {noPassMatch && <Header as='h6'>Passwords must match!</Header>}
        </Form.Group>

        {this.state.createAccount && this.state.type === 'business' &&
      <Form.Group widths='equal'>

        <Form.Field
          id='industryType'
          control={Select}
          placeholder='Select One'
          label='Industry'
          options={industryOptions}
          selection
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
      {this.state.createAccount && this.state.type === 'user' &&
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
      {this.state.createAccount && this.state.type !== '' &&
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
      {this.state.createAccount &&
        <Modal open={this.state.open} size='tiny'>
          <Modal.Header>Congrats</Modal.Header>
          <Modal.Content>
              <p>Accout successfully created!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} positive icon='checkmark' labelPosition='right' content='Login'/>
          </Modal.Actions>
        </Modal>
      }
        {!this.state.createAccount ? (
        <Form.Button content='Login' onClick={this.handleLogin}/>
        ) : (
        <Form.Button content='Signup' onClick={this.handleRegistration}/>
        )
        }
        <Message
           error
           content={this.state.errorMessage}
           hidden={this.state.hidden}
         />
      </Form>
    </div>

    )
  }
}

export default LoginForm
