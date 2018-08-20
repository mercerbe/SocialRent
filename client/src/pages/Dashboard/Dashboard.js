//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Segment, Grid, Header, List, Card, Table } from 'semantic-ui-react'
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
//
let data = ''

//style header
const headerStyle = {
  backgroundColor: '#065471'
}
//get current date/time
const now = moment()
console.log(now)

//page component
class Dashboard extends Component {
  constructor(props) {
      super(props)
      this.handleCampaignUpdate = this.handleCampaignUpdate.bind(this)
    }
  //handleUpdate on new campaign
  handleCampaignUpdate() {
    Service.get('/api/business')
      .then(res => {
        this.setState({user: res.data.business, campaigns: res.data.business.campaigns})
      })
  }
  //state params
  state = {
    user: {},
    campaigns: [],
    ads: [],
    payouts: [],
    clicks: [],
  }
  //component cycle
  componentDidMount() {
    console.log(data)
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
         <CreateCampaignForm loggedIn={this.state.loggedIn} businessId={this.state.user.id} handleUpdate={this.handleCampaignUpdate}/>
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
            <Card.Meta textAlign='center'>active upcoming and finished</Card.Meta>
            <Card.Description textAlign='center'>{this.state.user.name ? this.state.campaigns.length : this.state.ads.length}</Card.Description>
          </Card>
          <Card raised color='blue'>
            <Card.Header textAlign='center'>Payouts {this.state.user.name ? 'Sent' : 'Recieved'}</Card.Header>
            <Card.Meta textAlign='center'>active and finished</Card.Meta>
            <Card.Description textAlign='center'>{this.state.payouts.length}</Card.Description>
          </Card>
          <Card raised color='blue'>
            <Card.Header textAlign='center'>Clicks Generated</Card.Header>
            <Card.Meta textAlign='center'>from all {this.state.user.name ? 'campaigns' : 'ads'} </Card.Meta>
            <Card.Description textAlign='center'>{this.state.clicks.length}</Card.Description>
          </Card>
        </Card.Group>
        {this.state.user.name &&
        <Header as='h5'>MAKE A PAYMENT</Header>
        }
        {this.state.user.name &&
        <PaypalButton />
        }
        <Header as='h4'>{this.state.user.name ? 'CAMPAIGN' : 'AD'} PERFORMANCE</Header>
        {/* chart here */}
        {this.state.user.name &&
        <BarChart width={225} height={225} data={this.state.campaigns}
          margin={{top: 5, right: 0, left: -30, bottom: 5}}>
         <CartesianGrid strokeDasharray="3 3"/>
         <XAxis dataKey="headline"/>
         <YAxis dataKey="users.length"/>
         <Tooltip/>
         <Legend />
         <Bar dataKey="users.length" content="users" fill="#fbbd08" />
        </BarChart>
        }
        {this.state.user.handle &&
          <BarChart width={225} height={225} data={this.state.ads}
            margin={{top: 5, right: 0, left: -30, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="url"/>
           <YAxis dataKey="clicks"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="clicks" content="users" fill="#fbbd08" />
          </BarChart>
        }
        {/* end chart */}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8} style={{backgroundColor: '#f8f8f8', margin:'1em'}}>
          <Header as='h4' textAlign='center'>MANAGE {this.state.user.name ? 'CAMPAIGNS' : 'ADVERTISEMENTS'}</Header>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Current {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            <Table striped style={{backgroundColor: '#1c9e3b'}} inverted>
              <Table.Body>
                {this.state.campaigns.map((campaign, i)=> (
                  now.isAfter(moment(campaign.startDate)) && now.isBefore(moment(campaign.endDate)) ?
                  <Table.Row key={i}>
                    <Table.Cell>{campaign.headline}</Table.Cell>
                    <Table.Cell>{campaign.copy}</Table.Cell>
                    <Table.Cell>{campaign.url}</Table.Cell>
                    <Table.Cell>user handles and assoc clicks</Table.Cell>
                    <Table.Cell>{moment(campaign.startDate).format('LL')}</Table.Cell>
                    <Table.Cell>{moment(campaign.endDate).format('LL')}</Table.Cell>
                  </Table.Row> :
                  <Table.Row key={i}>
                    <Table.Cell>No Current Campaigns</Table.Cell>
                  </Table.Row>
                ))}
                {/* add same methods to map ads */}
                {this.state.ads.map((ad, i)=> (
                  now.isAfter(moment(ad.startDate)) &&  now.isBefore(moment(ad.endDate)) ?
                  <Table.Row key={i}>
                    <Table.Cell>{ad.headline}</Table.Cell>
                    <Table.Cell>{ad.copy}</Table.Cell>
                    <Table.Cell>{ad.url}</Table.Cell>
                    <Table.Cell>user handles and assoc clicks</Table.Cell>
                    <Table.Cell>{moment(ad.startDate).format('LL')}</Table.Cell>
                    <Table.Cell>{moment(ad.endDate).format('LL')}</Table.Cell>
                  </Table.Row> :
                  <Table.Row key={i}>
                    <Table.Cell>No Current Ads</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Upcomming {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            <Table striped style={{backgroundColor: '#e26d0e'}} inverted>
              <Table.Body>
                {this.state.campaigns.map((campaign, i)=>(
                  now.isBefore(moment(campaign.startDate)) ?
                  <Table.Row key={i}>
                    <Table.Cell>{campaign.headline}</Table.Cell>
                    <Table.Cell>{campaign.copy}</Table.Cell>
                    <Table.Cell>{campaign.url}</Table.Cell>
                    <Table.Cell>user handles and assoc clicks</Table.Cell>
                    <Table.Cell>{moment(campaign.startDate).format('LL')}</Table.Cell>
                    <Table.Cell>{moment(campaign.endDate).format('LL')}</Table.Cell>
                  </Table.Row> :
                  <Table.Row key={i}>
                    <Table.Cell>No Upcomming Campaigns</Table.Cell>
                  </Table.Row>
                ))}
                {/* add same methods to map ads */}
                {this.state.ads.map((ad, i)=>(
                  now.isBefore(moment(ad.startDate)) ?
                  <Table.Row key={i}>
                    <Table.Cell>{ad.headline}</Table.Cell>
                    <Table.Cell>{ad.copy}</Table.Cell>
                    <Table.Cell>{ad.url}</Table.Cell>
                    <Table.Cell>user handles and assoc clicks</Table.Cell>
                    <Table.Cell>{moment(ad.startDate).format('LL')}</Table.Cell>
                    <Table.Cell>{moment(ad.endDate).format('LL')}</Table.Cell>
                  </Table.Row> :
                  <Table.Row key={i}>
                    <Table.Cell>No Upcomming Ads</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Completed {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            <Table striped style={{backgroundColor: '#ba2222'}} inverted>
              <Table.Body>
                {this.state.campaigns.map((campaign, i)=>(
                  now.isAfter(moment(campaign.endDate)) ?
                  <Table.Row key={i}>
                    <Table.Cell>{campaign.headline}</Table.Cell>
                    <Table.Cell>{campaign.copy}</Table.Cell>
                    <Table.Cell>{campaign.url}</Table.Cell>
                    <Table.Cell>user handles and assoc clicks</Table.Cell>
                    <Table.Cell>{moment(campaign.startDate).format('LL')}</Table.Cell>
                    <Table.Cell>{moment(campaign.endDate).format('LL')}</Table.Cell>
                  </Table.Row> :
                  <Table.Row key={i}>
                    <Table.Cell>No Completed Campaigns</Table.Cell>
                  </Table.Row>
                ))}
                {/* add same methods to map ads */}
                {this.state.ads.map((ad, i)=>(
                  now.isAfter(moment(ad.endDate)) ?
                  <Table.Row key={i}>
                    <Table.Cell>{ad.headline}</Table.Cell>
                    <Table.Cell>{ad.copy}</Table.Cell>
                    <Table.Cell>{ad.url}</Table.Cell>
                    <Table.Cell>user handles and assoc clicks</Table.Cell>
                    <Table.Cell>{moment(ad.startDate).format('LL')}</Table.Cell>
                    <Table.Cell>{moment(ad.endDate).format('LL')}</Table.Cell>
                  </Table.Row> :
                  <Table.Row key={i}>
                    <Table.Cell>No Completed Ads</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
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
