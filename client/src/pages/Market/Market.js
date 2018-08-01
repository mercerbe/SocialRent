//standard dependencies
import React, { Component } from 'react'
//import logo
import Logo from '../../images/logo_transparent.png'
//semantic components
import { Container, Grid, Icon, Header, Segment, Image } from 'semantic-ui-react'
//custom components
import TopMenu from '../../components/Menu'
import Footer from '../../components/Footer'


//data this page needs to display:
//map all ads created, put them in segments- include: ad title, ad creator, number available, ad body

//styles
const logoStyle = {
  maxHeight: '350px',
  maxWidth: '350px'
}
const headerStyle = {
  backgroundColor: '#065471'
}


//page component
class Market extends Component {

 render(){
   return(
     <div>
       <Segment style={headerStyle}>
         <TopMenu />
           <Image src={Logo} style={logoStyle} fluid centered />
           <Header as='h2' inverted color='grey' textAlign='center'>
             Browse open Ads on the Market
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

export default Market
