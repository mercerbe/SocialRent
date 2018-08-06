//standard dependencies
import React from 'react'
//semanitc compononents
import { Container, Segment, Header, Grid, Image, Button, Divider } from 'semantic-ui-react'
//custom components
import PageHeader from '../../components/Header'
import Footer from '../../components/Footer'
//images
import MarketingImage from '../../images/social-marketing.png'
import WideImage from '../../images/wide-marketing.png'


//export functional component for props
export const Home = (props) => (
      <div>
        <p> currently {props.loggedIn ? 'logged in' : 'not logged in'}</p>
      <PageHeader />
      <Segment style={{ padding: '8em 0em', border: 'none' }} vertical>
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

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text textAlign='center'>
          <Header as='h3' style={{ fontSize: '2em' }}>
            What is Social Rent?
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Social Rent is a marketplace designed to connect social media users with businesses that would like to advertise through social media users’ actual posts. On Social Rent, advertisers can sign up and make posts/ requests on the marketplace.
          </p>
          <p style={{ fontSize: '1.33em' }}>
             A Social Rent user can choose to take the post from the advertiser/business and post the ad on their social media outlet, then get paid from the Social Rent Advertiser by click, view, like, retweet, engagement ect.
          </p>
          <p style={{ fontSize: '1.33em' }}>
             Businesses can choose to make a post public or private. A public post will go the the marketplace page with the number of users an advertiser wants to have take the post (e.g. ‘business a wants 100 users to take this ad’), and private posts will be saved to the advertisers account and can be send via message to specific users.
          </p>
          <Image size='huge' src={WideImage} />

          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <p color='black'>Who is this for? Who wins?</p>
          </Divider>

          <p style={{ fontSize: '1.33em' }}>
            We exist to provide a marketplace where people who use social media have an opportunity to work with, and get paid
            by the companies and products they support. That being said, it's a two-way street: companies get to work with
            the people who support thier products and pay them to promote the products they support. Call to action here --
          </p>
          <Button size='huge' color='black'> Get Started </Button>
        </Container>
      </Segment>


      <Footer />
      </div>
    )
