//standard dependencies
import React, { Component } from 'react'
//semanitc compononents
import { Container, Responsive, Segment, Header, Grid, Image, Button } from 'semantic-ui-react'
//custom components
import PageHeader from '../../components/Header'
import Footer from '../../components/Footer'
//images
import MarketingImage from '../../images/social-marketing.png'


//page export
class Home extends Component {
  render() {
    return(
      <div>
      <PageHeader />

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Businesses: extend your reach
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Promote your company, campaign or products by hiring Social Rent users to advertise in thier social
                media feeds.
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Users: support what you like
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Get paid to advetise and post on behalf of the companies and businesses you support.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image rounded size='large' src={MarketingImage} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge' color='black'>See Who's Here</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Footer />
      </div>
    )
  }
}

export default Home
