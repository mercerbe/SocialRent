import React from 'react'
//import logo
import Logo from '../../images/logo_transparent.png'
//import semantic components
import { Header, Image, Segment } from 'semantic-ui-react'
import TopMenu from '../Menu'

//styles
const logoStyle = {
  maxHeight: '500px',
  maxWidth: '500px'
}
const headerStyle = {
  backgroundColor: '#065471'
}

const PageHeader = () => (
  <Segment style={headerStyle} raised>
    <TopMenu />
    <Image src={Logo} style={logoStyle} fluid centered />
    <Header as='h2' inverted color='grey' textAlign='center'>
      Grassroots advertising through social media
    </Header>
  </Segment>
)

export default PageHeader
