//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Segment, Container, Header, Icon } from 'semantic-ui-react'
//custom components
import TopMenu from '../../components/Menu'
import Footer from '../../components/Footer'
import SignupForm from '../../components/SignupForm'

//page component
class Signup extends Component {

  //render page
 render(){
   return(
      <div>
       <TopMenu />
       <br/>
       <Container text>
         <Segment style={{background: '#fbbd08', marginTop: '100px'}} raised padded>
           <Header as='h1' icon textAlign='center'>
             <Header.Content>Signup</Header.Content>
             <Icon name='add user' circular/>
           </Header>
            <SignupForm />
          </Segment>
        </Container>
        <br/>
        <Footer />
      </div>
   )
 }
}

export default Signup
