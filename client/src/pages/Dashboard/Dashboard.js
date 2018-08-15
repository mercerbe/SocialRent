//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Segment, Grid, Header, List, Card } from 'semantic-ui-react'
//moment
import moment from 'moment'
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

//style header
const headerStyle = {
  backgroundColor: '#065471'
}

//page component
class Dashboard extends Component {

  //state params
  state = {
    user: {},
    campaigns: [],
    ads: [],
  }
  //component cycle
  componentDidMount() {
    //check for business
    Service.get('/api/business')
      .then( res => {
        if(res.data.success && res.data.business !== null) {
          this.setState({user: res.data.business, campaigns: res.data.business.campaigns})
          console.log('Public business json data: ', this.state)
        } else {
          //check for user
          Service.get('/api/user')
            .then(res => {
              if(res.data.success && data.user !== null) {
                this.setState({user: res.data.user, ads: res.data.user.ads})
                console.log('Public user json data: ', this.state)
              }
            })
            .catch( err => console.log('not a user.'))
        }
      })
      .catch( err => console.log('Not a business.'))
  }

  //determine state from props - if not logged in, redirect to login page
  static getDerivedStateFromProps(props) {
    if(!props.loggedIn) {
      props.history.push('/login')
    }
    return null
  }

 render(){

   return(
     <div>
       <Segment style={headerStyle} raised>
         <Header as='h1' inverted color='grey' textAlign='center' style={{paddingTop:'3em', fontSize:'40px'}}>
           Welcome, {this.state.user.email}
           <p style={{fontSize: '20px'}}>Manage your account</p>
         </Header>
       </Segment>
     <br/>
     <Container style={{marginTop:'1em', marginBottom: '5em'}} fluid>
     <Grid style={{margin:'0em 1em 0em 1em'}}>
       <Grid.Column mobile={16} tablet={6} computer={6} style={{backgroundColor: '', margin:'1em'}}>
         {this.state.user.name &&
         <Header as='h4'>CREATE A CAMPAIGN</Header>
         }
         {this.state.user.name &&
         <CreateCampaignForm loggedIn={this.state.loggedIn} businessId={this.state.user.id}/>
         }
         <Header as='h4'>PROFILE</Header>
          <List>
            {this.state.user.name &&
            <List.Item>
              <List.Icon name='building outline' />
              <List.Content>Business:  {this.state.user.name}</List.Content>
            </List.Item>
            }
            {this.state.user.industry &&
            <List.Item>
              <List.Icon name='cogs' />
              <List.Content>Industry:  {this.state.user.industry}</List.Content>
            </List.Item>
            }
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                <a href='mailto:{this.state.user.email}'> {this.state.user.email}</a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='linkify' />
              <List.Content>
                <a href='' target='_blank' rel="noopener noreferrer">Website: </a>
              </List.Content>
            </List.Item>
            {this.state.user.handle &&
            <List.Item>
              <List.Icon name='twitter'/>
              <List.Content>
                <a href='https://twitter.com/{this.state.user.handle}' target='_blank' rel="noopener noreferrer">
                  {this.state.user.handle}</a>
              </List.Content>
            </List.Item>
            }
            <List.Item>
                <List.Icon name='users'/>
                  <List.Content>
                    About:  {this.state.user.about}
                  </List.Content>
            </List.Item>
          </List>
        <Header as='h4'>{this.state.user.name ? 'CAMPAIGN STATS' : 'ADVERTISEMENT STATS'}</Header>
        <Card.Group>
          <Card raised color='blue'>
            <Card.Header textAlign='center'>Total {this.state.user.name ? 'Campaigns' : 'Ads'}</Card.Header>
            <Card.Meta textAlign='center'>active and finished</Card.Meta>
            <Card.Description textAlign='center'>{this.state.campaigns.length}</Card.Description>
          </Card>
          <Card raised color='blue'>
            <Card.Header textAlign='center'>Payouts {this.state.user.name ? 'Sent' : 'Recieved'}</Card.Header>
            <Card.Meta textAlign='center'>active and finished</Card.Meta>
            <Card.Description textAlign='center'>8</Card.Description>
          </Card>
          <Card raised color='blue'>
            <Card.Header textAlign='center'>Clicks Generated</Card.Header>
            <Card.Meta textAlign='center'>from all {this.state.user.name ? 'campaigns' : 'ads'} </Card.Meta>
            <Card.Description textAlign='center'>530</Card.Description>
          </Card>
        </Card.Group>
        {this.state.user.name &&
        <Header as='h5'>MAKE A PAYMENT</Header>
        }
        {this.state.user.name &&
        <PaypalButton />
        }
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8} style={{backgroundColor: '#f8f8f8', margin:'1em'}}>
          <Header as='h4' textAlign='center'>MANAGE {this.state.user.name ? 'CAMPAIGNS' : 'ADVERTISEMENTS'}</Header>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Current {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            {/* show campaigns in range in list via map using moment */}
            total: {this.state.user.name ? this.state.campaigns.length : this.state.ads.length}
            <List style={{backgroundColor: '#d1d0b2', padding: '10px'}}>
              <List.Item icon='users' content='Semantic UI' />
              <List.Item icon='marker' content='New York, NY' />
              <List.Item
                icon='mail'
                content={<a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>}
              />
              <List.Item icon='linkify' content={<a href='http://www.semantic-ui.com'>semantic-ui.com</a>} />
            </List>
          </Segment>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Upcomming {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            {/* check date on moment, if less than moment, move here */}
            total: {this.state.user.name ? this.state.campaigns.length : this.state.ads.length}
            <List style={{backgroundColor: '#d1d0b2', padding: '10px'}}>
              <List.Item icon='users' content='Semantic UI' />
              <List.Item icon='marker' content='New York, NY' />
              <List.Item
                icon='mail'
                content={<a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>}
              />
              <List.Item icon='linkify' content={<a href='http://www.semantic-ui.com'>semantic-ui.com</a>} />
            </List>
          </Segment>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Completed {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            {/* check date on moment, if greater than moment, move here */}
            total: {this.state.user.name ? this.state.campaigns.length : this.state.ads.length}
            <List style={{backgroundColor: '#d1d0b2', padding: '10px'}}>
              <List.Item icon='users' content='Semantic UI' />
              <List.Item icon='marker' content='New York, NY' />
              <List.Item
                icon='mail'
                content={<a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>}
              />
              <List.Item icon='linkify' content={<a href='http://www.semantic-ui.com'>semantic-ui.com</a>} />
            </List>
          </Segment>
          <Header as='h4' textAlign='center'>{this.state.user.name ? 'CAMPAIGN' : 'AD'} PERFORMANCE</Header>
          {/* chart here-- 200x200 is great for mobile */}
          <BarChart width={200} height={200} data={data}
            margin={{top: 5, right: 0, left: 0, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis dataKey="clicks"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="clicks" fill="#fbbd08" />
          </BarChart>
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
