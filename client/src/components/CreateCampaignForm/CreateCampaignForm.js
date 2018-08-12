import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Input, TextArea } from 'semantic-ui-react'
import DateSelect from './DatePicker'
//utils
import Service from '../../utils/Service'
//SET PROPS AND STATE FOR FORM
//styles
const headStyle = {
  backgroundColor: '#065471',
  color: 'white'
}
const buttonStyle = {
  backgroundColor: '#fbbd08'
}

class CreateCampaignForm extends Component{

  //state
  state = {
    headline: '',
    campaignLink: '',
    startDate: '',
    endDate: '',
    bodyCopy: '',
    modalOpen: false
  }
  //update form state -- add these as onChange of form attr.
  updateHeadline = (event) =>  this.setState({headline: event.target.value})
  updateLink = (event) => this.setState({campaignLink: event.target.value})
  updateBodyCopy = (event) => this.setState({bodyCopy: event.target.value})
  //=======test these to ensure they capture values from date form========//
  updateStartDate = (event) => this.setState({startDate: event.target.value})
  updateEndDate = (event) => this.setState({endDate: event.target.value})
  //==============================================================//

  //handleSubmitandCreate
  handleFormState = (event) => {
    event.preventDefault()
    const { headline, campaignLink, startDate, endDate, bodyCopy} = this.state
    //continue post from here to route -- confirm this route is correct
    Service.post('/api/campaign', {
      //confirm camgaign post is tied to business that posts
      headline: this.state.headline,
      url: this.state.campaignLink,
      copy: this.state.bodyCopy,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    })
      .then(({data}) => {
        console.log({data})
      })
      .catch(err => console.log(err, 'campaign post error.'))
  }
//close the modal
handleClose = () => this.setState({ modalOpen: false })

  render() {
    return(
      <Modal trigger={<Button>Create Campaign</Button>}>
        <Modal.Header style={headStyle}>Create a new campaign</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header textAlign='center' as='h2'><Icon name='edit outline' size='huge'/></Header>
            <Header as='h3' textAlign='center'>Fill out the form below to create your new advertising campaign:</Header>
          <Form style={{paddingBottom: '2em'}}>
          <Form.Group widths='equal'>
            <Form.Field
              id='headline'
              control={Input}
              label='Headline'
              placeholder='This is our product!'
              value={this.state.headline}
              onChange={this.updateHeadline}
            />
            <Form.Field
              id='campaignLink'
              control={Input}
              label='Campaign Link'
              placeholder='Link to your product'
              value={this.state.campaignLink}
              onChange={this.updateLink}
            />
          </Form.Group>
          <Form.Group widths='equal'>
          <Form.Field>
          <p style={{fontWeight: '600'}}>Start Date</p><DateSelect />
          <a value={this.state.startDate}
          onChange={this.updateStartDate}/>
          </Form.Field>
          <Form.Field>
          <p style={{fontWeight: '600'}}>End Date</p>
          <a value={this.state.endDate}
          onChange={this.updateEndDate}/><DateSelect />
          </Form.Field>
          </Form.Group>
          <Form.Field
            id='copyInput'
            control={TextArea}
            label='Advertisement Body'
            placeholder='place the exact content you would like your campaign contributors to tweet here...'
            value={this.state.bodyCopy}
            onChange={this.updateBodyCopy}          
          />
          <Form.Field
            style={buttonStyle}
            floated='right'
            id='submit'
            control={Button}
            content='Create Campaign'
            onClick={this.handleFormState}
          />
        </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default CreateCampaignForm
