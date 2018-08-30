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
    typeError: false,
    handleError: false,
    industryError: false,
    nameError: false,
    emailError: false,
    passwordError: false,
    passwordCheckError: false,
    aboutError: false,
    formError: false,
    errorMessage: '',
    hidden: true,
    open: false
  }

  //update state
  toggleLogin = () => this.setState({createAccount: !this.state.createAccount, type: '', value: '', email: '', password: ''})
  updateType = (e, {value}) => {
    this.setState({value})
    console.log('typestate: ', {value})
    this.setState({type: value, typeError: false, hidden: true, errorMessage: ''})
  }
  updatePassword = (event) => this.setState({password: event.target.value, passwordError: false, hidden: true, errorMessage: ''})
  updateEmail = (event) => this.setState({email: event.target.value, emailError: false, hidden: true, errorMessage: ''})
  updateHandle = (event) => this.setState({handle: event.target.value, hidden: true, errorMessage: ''})
  updateName = (event) => this.setState({name: event.target.value, hidden: true, errorMessage: ''})
  updateIndustry = (event, {value}) => {
    this.setState({value})
    console.log('industrystate: ', {value})
    this.setState({industry: value, industryError: false, hidden: true, errorMessage: ''})
    console.log(this.state.industry)
  }
  updatePasswordCheck = (event) => this.setState({passwordCheck: event.target.value, passwordCheckError: false, hidden: true, errorMessage: ''})
  updateAbout = (event) => this.setState({about: event.target.value, aboutError: false, hidden: true, errorMessage: ''})
  //confirm
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false, createAccount: false, type: '', value: '' })

  //==============methods to check all signup and login params==============//

  //login
  handleLogin = (event) => {
    event.preventDefault()

    /////form validation/////
    let error = false
    if(this.state.type === '') {
      this.setState({typeError: true, errorMessage: 'Please select if you are a user or a business.', hidden: false})
      error = true
    }
    if(this.state.email === '') {
      this.setState({emailError: true, errorMessage: 'Please fill in your email address.', hidden: false})
      error = true
    }
    if(this.state.password === ''){
      this.setState({passwordError: true, errorMessage: 'Please fill in your password.'})
      error = true
    }
    if(error) {
      this.setState({formError: true})
      return
    }
    //////-------------/////
    if(this.state.type === 'user'){
    Service.post('/api/user/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(this.props.login)
      .catch(err =>
        this.setState({formError: true, errorMessage: 'Email and password do not match any records. Please try again.', hidden: false}))
      }
    if(this.state.type === 'business'){
      Service.post('/api/business/login', {
        email: this.state.email,
        password: this.state.password
      })
        .then(this.props.login)
        .catch((err) =>
            this.setState({formError: true, errorMessage: 'Email and password do not match any records. Please try again.', hidden: false})
        )
    }
  }

  //signup
  handleRegistration = (event) => {
    event.preventDefault()
    const { type, name, industry, about, handle, email, password, passwordCheck } = this.state

    /////form validation/////
    let error = false
    if(type === ''){
      this.setState({typeError: true, errorMessage: "Please select which type of account you're registering.", hidden: false})
      error = true
    }
    if(email === ''){
      this.setState({emailError: true, errorMessage: 'Please fill an email address for your email account.', hidden: false})
      error = true
    }
    if(password === ''){
      this.setState({passwordError: true, errorMessage: 'Please fill in a password for your account', hidden: false})
      error = true
    }
    if(passwordCheck !== password){
      this.setState({passwordCheckError: true, errorMessage: 'Passwords must match.', hidden: false})
      error = true
    }
    if(type === 'user' && handle === ''){
      this.setState({handleError: true, errorMessage: 'Please provide a valid twitter handle with no @ for your account.', hidden: false})
      error = true
    }
    if(type === 'business' && industry === ''){
      this.setState({industryError: true, errorMessage: 'Please select an industry type for your business.', hidden: false})
      error = true
    }
    if(type === 'business' && name === ''){
      this.setState({nameError: true, errorMessage: 'Please fill in the name of your business', hidden: false})
      error = true
    }
    if(this.state.about === ''){
      this.setState({aboutError: true, errorMessage: 'Please tell everyone about yourself.', hidden: false})
      error = true
    }
    if(error){
      this.setState({formError: true})
    }
    /////---------------/////

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

      <Form action='' error={this.state.formError}>

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
          error={this.state.typeError}
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
            error={this.state.emailError}
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
            error={this.state.emailError}
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
            error={this.state.passwordCheckError}
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
          error={this.state.industryError}
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
          error={this.state.nameError}
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
          error={this.state.handleError}
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
            error={this.state.aboutError}
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
      </Form>
      <Message
         error
         content={this.state.errorMessage}
         hidden={this.state.hidden}
       />
    </div>

    )
  }
}

export default LoginForm
