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

//this page needs to display:
//map all campaigns created, put them in segments- include: Campaign creator, Campaign headline, copy, link,  start/end dates

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
       <p style={{backgroundColor: '#065471'}}> currently {this.props.loggedIn ? 'logged in' : 'not logged in'}</p>
       <Segment style={headerStyle}>
           <Image src={Logo} style={logoStyle} fluid centered />
           <Header as='h2' inverted color='grey' textAlign='center'>
             Browse open Campaigns on the Market
           </Header>
        </Segment>
     <br/>
     <Container style={{marginTop:'1em', marginBottom: '1em'}} >
       <Header textAlign='center'>OPEN CAMPAIGNS</Header>
     <Grid>
       <Grid.Column mobile={16} tablet={16} computer={16} style={{backgroundColor:'#f8f8f8'}}>
         <Segment color='yellow'>
           One Campaign here... mapped with info. header - campaign title, body, link
         </Segment>
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
