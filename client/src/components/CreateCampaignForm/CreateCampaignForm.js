// importing other react components
import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Input, TextArea, Message } from 'semantic-ui-react'
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
    endDate: moment().add(1, 'days'),
    bodyCopy: '',
    showModal: false,
    headlineError: false,
    campaignLinkError: false,
    startDateError: false,
    endDateError: false,
    bodyCopyError: false,
    formError: false,
    errorMessage: '',
    hidden: true
  }

  //update form state -- add these as onChange of form attr.
  updateHeadline = (event) => this.setState({headline: event.target.value, headlineError: false, hidden: true, errorMessage: ''})
  updateLink = (event) => this.setState({campaignLink: event.target.value, campaignLinkError: false, hidden: true, errorMessage: ''})
  updateBodyCopy = (event) => this.setState({bodyCopy: event.target.value, bodyCopyError: false, hidden: true, errorMessage: ''})
  updateStartDate = (date) => this.setState({startDate: moment(date), startDateError: false, hidden: true, errorMessage: ''})
  updateEndDate = (date) => this.setState({endDate: moment(date), endDateError: false, hidden: true, errorMessage: ''})
  closeModal = () => {
    this.setState({
    headline: '',
    campaignLink: '',
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    bodyCopy: '',
    showModal: false,
    formError: false,
    headlineError: false,
    campaignLinkError: false,
    startDateError: false,
    endDateError: false,
    bodyCopyError: false,
    hidden: true,
    errorMessage: '',
    })
  }

  //handleSubmitandCreate
  handleFormState = (event) => {
    event.preventDefault()
    let { headline, campaignLink, startDate, endDate, bodyCopy} = this.state

    //////form validation//////
    let error = false
    if(this.state.headline === '') {
      this.setState({headlineError: true, errorMessage: 'please fill in a valid headline.', hidden: false})
      error = true
    }
    //regex ^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$
    if(this.state.campaignLink === '') {
      this.setState({campaignLinkError: true, errorMessage: 'please fill in a valid website', hidden: false})
      error = true
    }
    if(this.state.bodyCopy.length < 10 || this.state.bodyCopy.length > 260) {
      this.setState({bodyCopyError: true, errorMessage: 'please fill in a copy between 10 and 260 characters.', hidden: false})
      error = true
    }
    if(this.state.endDate < moment()) {
      this.setState({endDateError: true, errorMessage: 'a campaign must end after the current date.', hidden: false})
      error = true
    }
    if(error) {
      this.setState({formError: true})
      return
    }
    //////end validation //////

    if(headline && campaignLink && startDate && endDate && bodyCopy !== '') {
    //continue post from here to route -- confirm this route is correct
    Service.post('/campaign', {
      //confirm camgaign post is tied to business that posts
      headline: headline,
      url: campaignLink,
      copy: bodyCopy,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      businessId: this.props.businessId
    })
      .then(({data}) => {
        console.log({data})
        this.setState({headline: '', campaignLink: '', startDate: moment(), endDate: moment().add(1, 'days'), bodyCopy: ''})
        this.closeModal()
        this.props.handleUpdate()
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
          <Form style={{paddingBottom: '2em'}} error={this.state.formError}>
          <Form.Group widths='equal'>
            <Form.Field
              id='headline'
              control={Input}
              label='Headline'
              placeholder='This is our product!'
              value={this.state.headline}
              onChange={this.updateHeadline}
              error={this.state.headlineError}
            />
            <Form.Field
              id='campaignLink'
              control={Input}
              label='Campaign Link'
              placeholder='Link to your product'
              value={this.state.campaignLink}
              onChange={this.updateLink}
              error={this.state.campaignLinkError}
            />
          </Form.Group>
          <Form.Group widths='equal'>
          <Form.Field
            error={this.state.startDateError}
            >
          <p style={{fontWeight: '600'}}>Start Date</p>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.updateStartDate}
            />
          </Form.Field>
          <Form.Field
            error={this.state.endDateError}
            >
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
            error={this.state.bodyCopyError}
          />
        <Form.Button
            style={buttonStyle}
            floated='right'
            id='submit'
            content='Create Campaign'
            onClick={this.handleFormState}
          />
        </Form>
        <Message
           error
           content={this.state.errorMessage}
           hidden={this.state.hidden}
         />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default CreateCampaignForm
