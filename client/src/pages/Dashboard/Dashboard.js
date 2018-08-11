//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Segment, Grid, Header, List, Card, Responsive, Divider} from 'semantic-ui-react'
//custom components
import Footer from '../../components/Footer'
import CreateCampaignForm from '../../components/CreateCampaignForm'
import PaypalButton from '../../components/PaypalButton/PaypalCheckoutButton'
//import utils
import Service from '../../utils/Service'
//chart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
//chart data -- imported from campaign data
const data = [
      {name: 'Headline 1', clicks: 4000},
      {name: 'Headline 2', clicks: 3000},
      {name: 'Headline 3', clicks: 2000},
      {name: 'Headline 4', clicks: 2780},
      {name: 'Headline 5', clicks: 1890},
      {name: 'Headline 6', clicks: 2390},
      {name: 'Headline 7', clicks: 3490},
];

//data that needs to be on this page:
//show taken and open ads
//display username
//display paypal/payment button -- sandbox to paypal dev
//display number of ads created/taken

//style header
const headerStyle = {
  backgroundColor: '#065471'
}

//page component
class Dashboard extends Component {

  //state params
  state = {
    user: {},
    business: {},
  }
  //component cycle
  componentDidMount() {
    //call for user
    Service.get('/api/user')
      .then( res => {
        //on success, get user data
        if(res.data.success && res.data.user.handle) {
          console.log('find data', res.data.user)
          this.setState({user: res.data.user})
        }
      })
      .catch( err => console.log('Not a user.'))
    Service.get('/api/business')
      .then( res => {
        if(res.data.success && res.data.business.industry) {
          console.log('business data', res.data)
          this.setState({business: res.data.business})
        }
      })
      .catch( err => console.log('Not a business'))
  }

  //determine state from props - if not logged in, redirect to login page
  static getDerivedStateFromProps(props) {
    console.log('dashboard cycle', props)
    if(!props.loggedIn) {
      props.history.push('/login')
      console.log('please login to view your dashboard.')
    }
    return null
  }

 render(){
   const {user: {email, handle, about, name, industry}} = this.state

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
              <List.Content>Business Name: {name}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='cogs' />
              <List.Content>Industry {industry}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                <a href='mailto:test@mail.com'>Email Address: {email}</a>
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
                <a href='' target='_blank'>Handle: {handle}</a>
              </List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name='users'/>
                  <List.Content>About Section {about}</List.Content>
            </List.Item>
          </List>
        <Header as='h4'>CAMPAIGN STATS</Header>
        <Card.Group>
          <Card raised color='blue'
            header='Total Campaigns'
            meta='active and finished'
            description='12'
            />
            <Divider horizontal></Divider>
          <Card raised  color='blue'
            header='Payouts Received/Sent'
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
            <Header as='h5' textAlign='center'>Upcoming Campaigns/Ads</Header>
            list of upcomming campaigns
          </Segment>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Completed Campaigns/Ads</Header>
            list of completed campaigns
          </Segment>
          <Header as='h4' textAlign='center'>CAMPGAIN PERFORMANCE</Header>
          {/* chart here? */}
          <Responsive>
          <BarChart width={350} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis dataKey="clicks"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="clicks" fill="#fbbd08" />
          </BarChart>
          </Responsive>
          {/* end chart */}
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
