import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const imgStyle = {
	marginTop: '2px',
	marginBottom: '7px',

};
const buttonStyle = {
	color: 'darkslategray',
	backgroundColor: 'rgba(255, 189, 56, 0.81)',
};
const ConferenceCall = () => (
	<div>
	   <h2>Conference Room</h2>
		<Container textAlign='center'>
			<img src={require('../../images/webcam.png')} width='120' style={imgStyle} alt="videochat" />
			<br />
			<Button style={buttonStyle} icon='video camera' content={<a href='http://payamasem.github.io/beeznissvideo/#beezniss' target='_blank'>Launch Video Call</a>} />
		</Container>
	</div>
)

export default ConferenceCall;