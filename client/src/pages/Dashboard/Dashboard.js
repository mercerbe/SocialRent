//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container } from 'semantic-ui-react'
//custom components
import TopMenu from '../../components/Menu'

//page component
class Dashboard extends Component {
 render(){
   return(
     <div>
     <TopMenu />
     <br/>
     <Container style={{marginTop:'100px'}}>
     <h1>Dashboard Page</h1>
     </Container>
     </div>
   )
 }
}

export default Dashboard
