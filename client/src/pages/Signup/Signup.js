//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Segment, Container } from 'semantic-ui-react'
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
            <h1>Sign up</h1>
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
