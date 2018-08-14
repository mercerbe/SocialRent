import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Input, TextArea } from 'semantic-ui-react'
//date picker
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
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
    startDate: moment(),
    endDate: moment(),
    bodyCopy: '',
    showModal: false
  }

  //update form state -- add these as onChange of form attr.
  updateHeadline = (event) =>  this.setState({headline: event.target.value})
  updateLink = (event) => this.setState({campaignLink: event.target.value})
  updateBodyCopy = (event) => this.setState({bodyCopy: event.target.value})
  //=======test these to ensure they capture values from date form========//
  updateStartDate = (date) => this.setState({startDate: date})
  updateEndDate = (date) => this.setState({endDate: date})
  //==============================================================//
  closeModal = () => {
    this.setState({ showModal: false })
  }

  //handleSubmitandCreate
  handleFormState = (event) => {
    event.preventDefault()
    const { headline, campaignLink, startDate, endDate, bodyCopy} = this.state
    if(headline && campaignLink && startDate && endDate && bodyCopy !== '') {
    //continue post from here to route -- confirm this route is correct
    Service.post('/campaign', {
      //confirm camgaign post is tied to business that posts
      headline: this.state.headline,
      url: this.state.campaignLink,
      copy: this.state.bodyCopy,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    })
      .then(({data}) => {
        console.log({data})
        this.setState({headline: '', campaignLink: '', startDate: moment(), endDate: moment(), bodyCopy: ''})
        this.closeModal()
      })
      .catch(err => console.log(err, 'campaign post error.'))
  } else {
    alert('Campaign not created. Please fill out all fields to create a campaign.')
  }
}


  render() {
    const {showModal} = this.state
    return(
      <Modal closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}>Create Campaign</Button>}>
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
          <p style={{fontWeight: '600'}}>Start Date</p>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.updateStartDate}
            />
          </Form.Field>
          <Form.Field>
          <p style={{fontWeight: '600'}}>End Date</p>
          <DatePicker
            selected={this.state.endDate}
            onChange={this.updateEndDate}
            />
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
        <Form.Button
            style={buttonStyle}
            floated='right'
            id='submit'
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
