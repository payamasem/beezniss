import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const imgStyle = {
	marginTop: '20px',
	marginBottom: '30px',
};

const ConferenceCall = () => (
	<div>
	   <h2>Conference Room</h2>
		<Container textAlign='center'>
			<img src={require('../../images/webcam.png')} width='140' style={imgStyle} alt="videochat" />
			<br />
			<Button color='yellow' icon='video camera' content={<a href='http://payamasem.github.io/beeznissvideo/#beezniss' target='_blank'>Launch Video Call</a>} />
		</Container>
	</div>
)

export default ConferenceCall;