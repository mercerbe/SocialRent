//standard dependencies
import React, { Component } from 'react'
//import images
import Logo from '../../images/logo_transparent.png'
//import Target from '../../images/target-ad.gif'
//semantic components
import { Container, Grid, Header, Segment, Image, Icon, Step, Button } from 'semantic-ui-react'
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
    campaign: {}
  }
  //component cycle start
  componentDidMount() {
    Service.get('/campaign')
      .then( res => {
          console.log('all campaigns', res)
        if(res.data) {
          this.setState({campaign: res.data})
          console.log(this.state)
        }
      })
      .catch( err => console.log('Not logged in.'))
  }

  //determine state from props
  static getDerivedStateFromProps(props) {
    if(!props.loggedIn) {
      props.history.push('/login')
      console.log('please log in to continue to the market.')
    }
    return null
  }

 render(){
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
         <Segment color='yellow'> {/* this is the component to map over for all campaigns*/}
           <Header as='h4'>Campaign Headline</Header>
           <Header as='h5' block>Campaign copy: </Header>
           <Header as='h6'> <Icon name='linkify'/><Header.Content>Url link: </Header.Content></Header>
             <Step.Group stackable='tablet' size='mini'>
                <Step>
                  <Icon name='calendar check outline' color='green'/>
                  <Step.Content>
                    <Step.Title>Start Date</Step.Title>
                    <Step.Description>Date</Step.Description>
                  </Step.Content>
                </Step>
                <Step>
                  <Icon name='calendar minus outline' color='red'/>
                  <Step.Content>
                    <Step.Title>End Date</Step.Title>
                    <Step.Description>Date</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
           <Button floated='right' icon='check' content='Join Campaign' labelPosition='right'></Button>
         </Segment>
        </Grid.Column>
     </Grid>
     <br/>
     {/*<Image src={Target} style={logoStyle} fluid centered />*/}
     </Container>
   <br />
     <Footer />
     </div>
   )
 }
}

export default Market
