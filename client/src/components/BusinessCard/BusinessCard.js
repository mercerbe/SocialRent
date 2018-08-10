import React, {Component} from 'react'
import {Card, Image, Item, Container, Segment, Header, List} from 'semantic-ui-react'

export default class BusinessCard extends Component {
    render(){
        return(
<Container>
            <Segment>
            <Header size='medium'>Business/User Name Here</Header>
            <List>
    <List.Item>
      <List.Icon name='users' />
      <List.Content>Semantic UI</List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='marker' />
      <List.Content>New York, NY</List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='mail' />
      <List.Content>
        <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='linkify' />
      <List.Content>
        <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
      </List.Content>
    </List.Item>
  </List>
            </Segment>
           
           
<Card.Group itemsPerRow={3}>
    <Card
      header='Camp'
      meta='www.tesla.com'
      description='Email: ' 
      />    
      <Card
      header='Camp'
      meta='www.tesla.com'
      description='Email: ' 
      />    
      <Card
      header='Camp'
      meta='www.tesla.com'
      description='Email: ' 
      />    
</Card.Group>

</Container>
)
}
}