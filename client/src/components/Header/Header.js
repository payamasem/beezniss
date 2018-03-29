import React from 'react'
import { Segment, Button, Header, Icon, Modal } from 'semantic-ui-react'

const HeaderNav = () => (
  
            <Segment inverted>
              <Header as='h2' inverted color='yellow'> Beezniss Dashboard    
              <Modal trigger={<Button color='yellow' icon='remove user' content='Logout' floated='right' />} basic size='small'>
    
    <Header icon='remove user' content='Logout?' />
    <Modal.Content>
      <p>Do you wish to logout of your Beezniss Dashboard?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
 </Header>
</Segment>
)


export default HeaderNav;