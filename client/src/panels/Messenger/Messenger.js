import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';

const Messages = () => (
  <Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Team Messenger</Message.Header>
      Just a second, we are fetching your team's most recent messages.
    </Message.Content>
  </Message>
)

export default Messages;
