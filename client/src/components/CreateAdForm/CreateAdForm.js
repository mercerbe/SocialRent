import React, {Component} from 'react'
import {Form, Input, TextArea, Select, Button, Header, Icon, Modal} from 'semantic-ui-react'

//component to capture new ad campaign information
class CreateAdForm extends Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })
    render(){   
        return(
    
        <Modal
        trigger={<Button onClick={this.handleOpen}>Add Campaign</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
      >
        <Header icon='browser' content='Campaign Details' />
        <Modal.Content>
            
        </Modal.Content>
        <Form>
            <Form.Field id="headline"
            control = {Input}
            label = 'Campaign Headline'
            placeholder = "Joe Smith for Heisman Trophy" />
            <Form.Field id="adSummary"
            control = {TextArea}
            label = 'Campaign Summary'
            placeholder = "Give a short summary of your campaign"/>
            <Form.Field id="adLink"
            control ={Input}
            label="Campaign Link"
            placeholder="https://www.youradhere.com"/>
            <Form.Group widths='equal'>
            <Form.Field id="startDate"
            control = {Input}
            label="Start of Campaign"
            placeholder="mm/dd/yyyy"/>
            <Form.Field id="endDate"
            control = {Input}
            label="End of Campaign"
            placeholder="mm/dd/yyyy"/>
           </Form.Group>
            
            </Form>
            <Modal.Actions>
          <Button color='green' onClick={this.handleClose} >
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
        
        )
    }
}

export default CreateAdForm