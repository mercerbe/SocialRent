import React from 'react'
//bottom menu from semantic
import { Segment, Container, Grid, List, Header, Icon } from 'semantic-ui-react'

const footerStyle = {
  backgroundColor: '#065471',
  padding: '15px 0px'
}

const Footer = () => (
<Segment inverted vertical style={footerStyle} raised>
  <Container>
    <Grid divided inverted stackable>
      <Grid.Row>
        <Grid.Column width={5}>
          <Header inverted as='h4' content='About' />
          <List link inverted>
            <List.Item as='a'>GitHub Repo</List.Item>
            <List.Item as='a'>Home</List.Item>
            <List.Item as='a'>This</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={5}>
          <Header inverted as='h4' content='Resources' />
          <List link inverted>
            <List.Item as='a'>React</List.Item>
            <List.Item as='a'>Semantic UI</List.Item>
            <List.Item as='a'>Node</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header as='h4' inverted>
            Connect with us:
          </Header>
          <List link horizontal>
          <List.Item as='a' href='https://www.facebook.com/mercerbe' target='_blank'><Icon size='big' color='yellow' name='facebook square'/></List.Item>
          <List.Item as='a' href='https://www.facebook.com/mercerbe' target='_blank'><Icon size='big' color='yellow' name='linkedin square'/></List.Item>
          <List.Item as='a' href='https://www.facebook.com/mercerbe' target='_blank'><Icon size='big' color='yellow' name='twitter square'/></List.Item>
          <List.Item as='a' href='https://www.facebook.com/mercerbe' target='_blank'><Icon size='big' color='yellow' name='instagram'/></List.Item>
          </List>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
</Segment>
)

export default Footer
