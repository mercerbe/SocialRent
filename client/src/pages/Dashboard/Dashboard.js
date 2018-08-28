//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Segment, Grid, Header, List, Card, Table, Message, Image } from 'semantic-ui-react'
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
//loader
import Loader from '../../images/loading.gif'
//
let data = ''
//style header
const headerStyle = {
  backgroundColor: '#065471'
}
//get current date/time
const now = moment()

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
    loading: true
  }

  //component cycle
  componentDidMount() {
    console.log(data)
    //check for business
    Service.get('/api/business')
      .then( res => {
        if(res.data.success && res.data.business !== null) {
          this.setState({user: res.data.business, campaigns: res.data.business.campaigns, loading: false})
          console.log('Public business json data: ', this.state)
        } else {
          //check for user
          Service.get('/api/user')
            .then(res => {
              if(res.data.success && data.user !== null) {
                this.setState({user: res.data.user, ads: res.data.user.ads, loading: false})
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

   //method to sum values in array of objects
   Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
  }

   return(
     <div>
       {this.state.loading &&
       <Image src={Loader} centered/>}
       <Segment style={headerStyle} raised>
         <Header as='h1' inverted color='grey' textAlign='center' style={{paddingTop:'2em', fontSize:'40px'}}>
           Welcome, <br></br> {this.state.user.email}
           <p style={{fontSize: '20px'}}>Manage your account</p>
         </Header>
       </Segment>
     <br/>
     <Container style={{marginTop:'1em', marginBottom: '5em'}} fluid>
     <Grid style={{margin:'0em 0.05em 0em 0.05em'}}>
       <Grid.Column mobile={16} tablet={16} computer={6} floated='left' style={{backgroundColor: '', margin:'0em'}}>
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
                <a href={'mailto:'+ this.state.user.email}> {this.state.user.email}</a>
              </List.Content>
            </List.Item>
            {this.state.user.handle &&
            <List.Item>
              <List.Icon name='twitter'/>
              <List.Content>
                <a href={'https://twitter.com/'+ this.state.user.handle} target='_blank' rel="noopener noreferrer">
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
            {this.state.user.name &&
            <Card.Description textAlign='center'>{this.state.campaigns.sum('totalClicks')}</Card.Description>}
            {this.state.user.handle &&
              <Card.Description textAlign='center'>{this.state.ads.sum('clicks')}</Card.Description>
            }
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
        <BarChart width={300} height={300} data={this.state.campaigns}
          margin={{top: 5, right: 0, left: -20, bottom: 5}}>
         <CartesianGrid strokeDasharray="3 3"/>
         <XAxis dataKey="headline"/>
         <YAxis dataKey="users.length"/>
         <Tooltip/>
         <Legend />
         <Bar dataKey="users.length" content="users" fill="#fbbd08" />
        </BarChart>
        }
        {this.state.user.handle &&
          <BarChart width={300} height={300} data={this.state.ads}
            margin={{top: 5, right: 0, left: -20, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="url"/>
           <YAxis dataKey="clicks"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="clicks" content="clicks" fill="#fbbd08"/>
          </BarChart>
        }
        {/* end chart */}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={10} floated='right' style={{margin:'0em'}}>
          <Segment style={{backgroundColor: '#fbbd08', margin: '0px !important'}}>
          <Header as='h4' textAlign='center'>MANAGE {this.state.user.name ? 'CAMPAIGNS' : 'ADVERTISEMENTS'}</Header>
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Current {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            <Table striped>
              <Table.Body>
                {this.state.campaigns.map((campaign, i)=> (
                  now.isAfter(moment(campaign.startDate)) && now.isBefore(moment(campaign.endDate)) ?
                  <Table.Row key={i} positive>
                    <Table.Cell>{campaign.headline}</Table.Cell>
                    <Table.Cell>{campaign.copy}</Table.Cell>
                    <Table.Cell><a href={'https://'+ campaign.url} target='_blank' rel="noopener noreferrer">{campaign.url}</a></Table.Cell>
                    <Table.Cell><List as='ul'>{campaign.users.map((user, i) => (
                       <List.Item key={i} as='li'>{user.handle}, {user.email}</List.Item>))}</List></Table.Cell>
                    <Table.Cell>{moment(campaign.startDate).format('LL')} - {moment(campaign.endDate).format('LL')}</Table.Cell>
                    <Table.Cell><strong>Total Clicks:</strong>{campaign.totalClicks}</Table.Cell>
                  </Table.Row> : null

                ))}
                {/* add same methods to map ads */}
                {this.state.ads.map((ad, i)=> (
                  now.isAfter(moment(ad.startDate)) &&  now.isBefore(moment(ad.endDate)) ?
                  <Table.Row key={i} positive>
                    <Table.Cell><a href={'https://'+ ad.url} target='_blank' rel="noopener noreferrer">{ad.url}</a></Table.Cell>
                    <Table.Cell><Message>{ad.copy} <a href={ad.mRoute} target='_blank'rel="noopener noreferrer">{ad.url + '/' + ad.mRoute}</a></Message></Table.Cell>
                    <Table.Cell>clicks: {ad.clicks}</Table.Cell>
                    <Table.Cell>{moment(ad.startDate).format('LL')} - {moment(ad.endDate).format('LL')}</Table.Cell>
                  </Table.Row> : null
                ))}
              </Table.Body>
            </Table>
          </Segment>
          {this.state.user.name &&
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Upcoming {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            <Table striped>
              <Table.Body>
                {this.state.campaigns.map((campaign, i)=>(
                  now.isBefore(moment(campaign.startDate)) ?
                  <Table.Row key={i} warning>
                    <Table.Cell>{campaign.headline}</Table.Cell>
                    <Table.Cell>{campaign.copy}</Table.Cell>
                    <Table.Cell><a href={'https://'+ campaign.url} target='_blank' rel="noopener noreferrer">{campaign.url}</a></Table.Cell>
                    <Table.Cell>Users can't join upcoming campaigns.</Table.Cell>
                    <Table.Cell>{moment(campaign.startDate).format('LL')} - {moment(campaign.endDate).format('LL')}</Table.Cell>
                    <Table.Cell><strong>Total Clicks:</strong>{campaign.totalClicks}</Table.Cell>
                  </Table.Row> :
                  null
                ))}
              </Table.Body>
            </Table>
          </Segment>
          }
          <Segment color='blue' raised padded>
            <Header as='h5' textAlign='center'>Completed {this.state.user.name ? 'Campaigns' : 'Ads'}</Header>
            <Table striped>
              <Table.Body>
                {this.state.campaigns.map((campaign, i)=>(
                  now.isAfter(moment(campaign.endDate)) ?
                  <Table.Row key={i} negative>
                    <Table.Cell>{campaign.headline}</Table.Cell>
                    <Table.Cell>{campaign.copy}</Table.Cell>
                    <Table.Cell><a href={'https://'+ campaign.url} target='_blank' rel="noopener noreferrer">{campaign.url}</a></Table.Cell>
                    <Table.Cell><List as='ul'>{campaign.users.map((user, i) => (
                       <List.Item key={i} as='li'>{user.handle}, {user.email}</List.Item>))}</List></Table.Cell>
                    <Table.Cell>{moment(campaign.startDate).format('LL')} - {moment(campaign.endDate).format('LL')}</Table.Cell>
                    <Table.Cell><strong>Total Clicks:</strong>{campaign.totalClicks}</Table.Cell>
                  </Table.Row> : null

                ))}
                {/* add same methods to map ads */}
                {this.state.ads.map((ad, i)=>(
                  now.isAfter(moment(ad.endDate)) ?
                  <Table.Row key={i} negative>
                    <Table.Cell><a href={'https://'+ ad.url} target='_blank' rel="noopener noreferrer">{ad.url}</a></Table.Cell>
                    <Table.Cell><Message>{ad.copy} <a href={ad.mRoute} target='_blank' rel="noopener noreferrer" >{ad.url + '/' + ad.mRoute}</a></Message></Table.Cell>
                    <Table.Cell>clicks: {ad.clicks}</Table.Cell>
                    <Table.Cell>{moment(ad.startDate).format('LL')} - {moment(ad.endDate).format('LL')}</Table.Cell>
                  </Table.Row> : null
                ))}
              </Table.Body>
            </Table>
          </Segment>
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
