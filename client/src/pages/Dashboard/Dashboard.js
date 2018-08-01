//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Segment, Grid, Image, Header } from 'semantic-ui-react'
//custom components
import TopMenu from '../../components/Menu'
import Footer from '../../components/Footer'

//data that needs to be on this page:
//form to create new ad for businesses
//show taken and open ads
//display username
//display paypal/payment option--modal popup for success/fail transaction or route to paypal
//display number of ads created/taken

//style header
const headerStyle = {
  backgroundColor: '#065471'
}

//page component
class Dashboard extends Component {
 render(){
   return(
     <div>
       <Segment style={headerStyle} raised>
         <TopMenu />
         <Header as='h1' inverted color='grey' textAlign='center' style={{paddingTop:'3em'}}>
           Welcome, {/*Username*/}
         </Header>
       </Segment>
     <br/>
     <Container style={{marginTop:'1em', marginBottom: '1em'}} >
     <Grid>
       <Grid.Column mobile={16} tablet={8} computer={8}>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Grid.Column>
     </Grid>
     </Container>
   <br />
   <Footer />
     </div>
   )
 }
}

export default Dashboard
