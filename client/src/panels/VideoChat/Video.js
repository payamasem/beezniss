import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const ConferenceCall = () => (
<Container textAlign='center'>
<img src={require('../../images/webcam.png')} alt="videochat" />
<br />
<Button color='yellow' icon='video camera' content={<a href='http://payamasem.github.io/beeznissvideo/#beezniss' target='_blank'>Launch Conference Call</a>} />
</Container>
)

export default ConferenceCall;