//standard dependencies
import React, { Component } from 'react'
//semantic components
import { Container, Divider, Segment, Header, Icon } from 'semantic-ui-react'
//custom components
import Footer from '../../components/Footer'
import LoginForm from '../../components/LoginForm/LoginForm'

const headerStyle = {
  backgroundColor: '#065471',
  marginBotton: '0px'
}

//page component
export default class Login extends Component {

 render(){

   return(
    <div>
      <Segment style={headerStyle} raised>
        <Header as='h1' inverted color='grey' textAlign='center' style={{paddingTop:'3em', fontSize:'48px'}}>
          <p style={{fontSize: '20px'}}></p>
        </Header>
      </Segment>
      <Container style={{marginTop:'0em', marginBottom:'20em'}}>
        <br />
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '2em 0em', textTransform: 'uppercase' }}
          ><p color='black'><Icon name='angle double down'/></p>
          </Divider>
          <Container text>
            <Segment style={{background: '#fbbd08', marginTop: '0px'}} raised padded>
              <Header as='h1' icon textAlign='center'>
                <Header.Content></Header.Content>
                <Icon name='users' circular/>
              </Header>
               <LoginForm login={this.props.login}/>
             </Segment>
           </Container>
        <br />
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '2em 0em', textTransform: 'uppercase' }}
        >
          <p color='black'><Icon name='angle double up'/></p>
        </Divider>
         {/*this is where we might do nothing....*/}
        </Container>
          <Footer />
        </div>
   )

 }

}
