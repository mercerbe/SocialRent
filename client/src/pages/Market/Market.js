//standard dependencies
import React, { Component } from 'react'
//import logo
import Logo from '../../images/logo_transparent.png'
//semantic components
import { Container, Grid, Header, Segment, Image } from 'semantic-ui-react'
//custom components
import Footer from '../../components/Footer'
//utils
import Service from '../../utils/Service'

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

  //state
  state = {
    user: {}
  }
  //component cycle start
  componentDidMount() {
    Service.get('/api/user')
      .then( res => {
        if(res.data.success) {
          console.log(res.data.user)
          this.setState({user: res.data.user})
        }
      })
      .catch( err => console.log('Not logged in.'))
  }

  //check state for loggedIn
  static getStateFromProps(props) {
    console.log('marketplace')
    if(!props.loggedIn) {
      props.history.push('/')
    }
    return null
  }

 render(){
   return(
     <div>
       <Segment style={headerStyle}>
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
