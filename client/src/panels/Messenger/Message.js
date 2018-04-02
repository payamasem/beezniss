import React, {Component} from 'react';
import { Button, Comment, Form } from 'semantic-ui-react'


class Message extends Component {
  render(){
    return (
    <Comment.Group>
      <Comment>
    	  <Comment.Avatar as='a' src="https://semantic-ui.com/images/avatar/large/daniel.jpg" />
      	  <Comment.Content>
      	  	<Comment.Author>Tung Tung</Comment.Author>
		      <Comment.Text> 
       			 {this.props.message}
        	  </Comment.Text>
          </Comment.Content>
      </Comment>
    </Comment.Group>
    )
  }
}
export default Message