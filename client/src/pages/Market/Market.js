//standard dependencies
import React, { Component } from 'react'
//import images
import Logo from '../../images/logo_transparent.png'
//semantic components
import { Container, Grid, Header, Segment, Image, Icon, Step, Button, Pagination } from 'semantic-ui-react'
//custom components
import Footer from '../../components/Footer'
//utils
import Service from '../../utils/Service'
//moment
import moment from 'moment'

const data = ''

//get current date/time
const now = moment()
console.log(now)

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
    campaigns: [],
    user: {},
    activePage: 1
  }
  //handle page change
  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  //component cycle start
  componentDidMount() {
    //get all campaigns
    Service.get('/campaign')
      .then( res => {
        if(res.data) {
          this.setState({campaigns: res.data})
          console.log('all campaigns', this.state.campaigns)
        }
      })
      .catch( err => console.log('No campaigns.'))
      //check for business
      Service.get('/api/business')
        .then( res => {
          if(res.data.success && res.data.business !== null) {
            this.setState({user: res.data.business})
            console.log('Public business json data: ', this.state.user)
          } else {
            //check for user
            Service.get('/api/user')
              .then(res => {
                if(res.data.success && data.user !== null) {
                  this.setState({user: res.data.user})
                  console.log('Public user json data: ', this.state.user)
                }
              })
              .catch( err => console.log('not a user.'))
          }
        })
        .catch( err => console.log('Not a business.'))

    }
  //handle ad creation & join campaign button
  handleAdCreation = (id) => {
    //event.preventDefault()
    console.log('join campaign click', id)
    Service.post('/ad/snatch', {
      //get data from clicked campaign
      copy: id.copy,
      url: id.url,
      startDate: id.startDate,
      endDate: id.endDate,
      campaignId: id._id
    })
    .then(({data}) => {
      console.log({data})
      console.log('success, and then...')
      //redirect to the users' dashboard
      this.props.history.push('/dashboard')
    })
    .catch(err => console.log(err, 'ad creation error.'))
  }

  //determine state from props
  static getDerivedStateFromProps(props) {
    if(!props.loggedIn) {
      props.history.push('/login')
    }
    return null
  }

 render(){
   const { activePage } = this.state
   return(
     <div>
       <Segment style={headerStyle}>
           <Image src={Logo} style={logoStyle} fluid centered />
           <Header as='h2' inverted color='grey' textAlign='center'>
             Browse Campaigns on the Market
           </Header>
        </Segment>
     <br/>
     <Container style={{marginTop:'1em', marginBottom: '1em'}} >
       <Header textAlign='center'>OPEN CAMPAIGNS</Header>
     <Grid>
       <Grid.Column mobile={16} tablet={16} computer={16} style={{backgroundColor:'#f8f8f8'}}>
        {this.state.campaigns.map((campaign, i) =>(
          now.isAfter(moment(campaign.startDate)) && now.isBefore(moment(campaign.endDate)) ?
         <Segment color='yellow' key={i} clearing>
           <Header as='h3'>{campaign.headline}</Header>
           <Header as='h5' block>{campaign.copy}</Header>
           <Header as='h5'> <Icon name='linkify'/><Header.Content><a href={campaign.url} target='_blank' rel="noopener noreferrer">{campaign.url}</a></Header.Content></Header>
             <Step.Group stackable='tablet' size='mini'>
                <Step>
                  <Icon name='calendar check outline' color='green'/>
                  <Step.Content>
                    <Step.Title>Start Date</Step.Title>
                    <Step.Description>
                      {moment(campaign.startDate).format('LLL')}
                    </Step.Description>
                  </Step.Content>
                </Step>
                <Step>
                  <Icon name='calendar minus outline' color='red'/>
                  <Step.Content>
                    <Step.Title>End Date</Step.Title>
                    <Step.Description>{moment(campaign.endDate).format('LLL')}</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
              {this.state.user.handle &&
           <Button floated='right' icon='check' content='Join Campaign' labelPosition='right' onClick={ this.handleAdCreation.bind(this,campaign)}></Button> }
         </Segment> :
         null
        ))}
        </Grid.Column>
     </Grid>
     <br/>
       <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
          prevItem={{ content: <Icon name='angle left' />, icon: true }}
          nextItem={{ content: <Icon name='angle right' />, icon: true }}
          totalPages={3}
            />
     </Container>

   <br />
     <Footer />
     </div>
   )
 }
}

export default Market
