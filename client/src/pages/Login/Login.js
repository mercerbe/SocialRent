//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Divider, Segment, Header, Icon } from 'semantic-ui-react'
//custom components
import Footer from '../../components/Footer'
import LoginForm from '../../components/LoginForm/LoginForm'


//page component
export default class Login extends Component {

 render(){

   return(
    <div>
      <p style={{backgroundColor: '#065471'}}> currently {this.props.loggedIn ? 'logged in' : 'not logged in'}</p>
      <br />
      <Container style={{marginTop:'4.5em', marginBottom:'20em'}}>
        <br />
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <p color='black'>===</p>
          </Divider>
          <Container text>
            <Segment style={{background: '#fbbd08', marginTop: '0px'}} raised padded>
              <Header as='h1' icon textAlign='center'>
                <Header.Content></Header.Content>
                <Icon name='users' circular/>
              </Header>
               <LoginForm login={this.props.login}/>
             </Segment>
           </Container>
        <br />
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <p color='black'>===</p>
        </Divider>
         {/*this is where we might do nothing....*/}
        </Container>
          <Footer />
        </div>
   )

 }

}
