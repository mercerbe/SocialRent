//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Segment, Grid, Image, Header } from 'semantic-ui-react'
//custom components
import Footer from '../../components/Footer'
import CreateCampaignForm from '../../components/CreateCampaignForm'
//import PaypalButton from '../../components/PaypalButton'
//import utils
import Service from '../../utils/Service'

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

  //state params
  state = {
    user: {}
  }
  //component cycle
  componentDidMount() {
    Service.get('/api/user')
      .then( res => {
        //on success, get user data
        if(res.data.success) {
          console.log(res.data.user)
          this.setState({user: res.data.user})
        }
      })
      .catch( err => console.log('Not logged in.'))
  }

  //determine state from props
  static getStateFromProps(props) {
    console.log('dashboard cycle')
    if(!props.loggedIn) {
      props.history.push('/')
    }
    return null
  }

 render(){
   const { user: {email} } = this.state
   return(
     <div>
       <Segment style={headerStyle} raised>
         <Header as='h1' inverted color='grey' textAlign='center' style={{paddingTop:'3em'}}>
           Welcome, {email}
         </Header>
       </Segment>
     <br/>
     <Container style={{marginTop:'1em', marginBottom: '1em'}} >
     <Grid>
       <Grid.Column mobile={16} tablet={8} computer={8}>
         <CreateCampaignForm />
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Header as='h2'>Manage Campaigns:</Header>
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
