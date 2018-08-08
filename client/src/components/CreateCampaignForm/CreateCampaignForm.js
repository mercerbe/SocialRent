import React from 'react'
import { Button, Header, Icon, Modal, Form, Input, TextArea } from 'semantic-ui-react'
import DateSelect from './DatePicker'
//SET PROPS AND STATE FOR FORM

const CreateCampaignForm = () => (
  <Modal trigger={<Button>Create Campaign</Button>}>
    <Modal.Header>Create a new campaign</Modal.Header>
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
        />
        <Form.Field
          id='campaignLink'
          control={Input}
          label='Campaign Link'
          placeholder='Link to your product'
        />
      </Form.Group>
      <Form.Group widths='equal'>
      <Form.Field>
      <p style={{fontWeight: '600'}}>Start Date</p><DateSelect />
      </Form.Field>
      <Form.Field>
      <p style={{fontWeight: '600'}}>End Date</p><DateSelect />
      </Form.Field>
      </Form.Group>
      <Form.Field
        id='copyInput'
        control={TextArea}
        label='Advertisement Body'
        placeholder='place the exact content you would like your campaign contributors to tweet here...'
      />
      <Form.Field
        floated='right'
        id='submit'
        control={Button}
        content='Create Campaign'
      />
    </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default CreateCampaignForm
