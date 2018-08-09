//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Segment, Grid, Image, Header, List, Card } from 'semantic-ui-react'
//custom components
import Footer from '../../components/Footer'
import CreateCampaignForm from '../../components/CreateCampaignForm'
import PaypalButton from '../../components/PaypalButton/PaypalCheckoutButton'
//import utils
import Service from '../../utils/Service'

//data that needs to be on this page:
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
         <Header as='h1' inverted color='grey' textAlign='center' style={{paddingTop:'3em', fontSize:'48px'}}>
           Welcome, {email}
           <p style={{fontSize: '20px'}}>Manage your account</p>
         </Header>
       </Segment>
     <br/>
     <Container style={{marginTop:'1em', marginBottom: '5em'}} fluid>
     <Grid style={{margin:'0em 1em 0em 1em'}}>
       <Grid.Column mobile={16} tablet={7} computer={7} style={{backgroundColor: '#f8f8f8', margin:'1em'}}>
         <Header as='h4'>CREATE A CAMPAIGN</Header>
         <CreateCampaignForm />
         <Header as='h4'>PROFILE</Header>
          <List>
            <List.Item>
              <List.Icon name='building outline' />
              <List.Content>Business Name</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='cogs' />
              <List.Content>Industry</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                <a href='mailto:test@mail.com'>Email Address</a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='linkify' />
              <List.Content>
                <a href='' target='_blank'>Website</a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='twitter'/>
              <List.Content>
                <a href='' target='_blank'>Handle</a>
              </List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name='users'/>
                  <List.Content>About Section</List.Content>
            </List.Item>
          </List>
        <Header as='h4'>CAMPAIGN STATS</Header>
        <Card.Group itemsPerRow={3}>
          <Card raised color='blue'
            header='Total Campaigns'
            meta='active and finished'
            description='12'
            />
          <Card raised  color='blue'
            header='Payouts Recieved/Sent'
            meta='number of payouts'
            description='8'
            />
          <Card raised  color='blue'
            header='Clicks Generated'
            meta='From all Campaigns'
            description='530'
            />
        </Card.Group>
        <Header as='h5'>MAKE A PAYMENT</Header>
        <PaypalButton />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={7} computer={7} style={{backgroundColor: '#f8f8f8', margin:'1em'}}>
          <Header as='h4' textAlign='center'>MANAGE CAMPAIGNS/ADS</Header>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Current Campaigns/Ads</Header>
            list of current campaigns
          </Segment>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Upcomming Campaigns/Ads</Header>
            list of upcomming campaigns
          </Segment>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Completed Campaigns/Ads</Header>
            list of completed campaigns
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

export default Dashboard
