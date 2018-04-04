import React, {Component} from 'react';
import { Button, Comment, Form } from 'semantic-ui-react'


class Message extends Component {
  render(){
    return (
    <Comment.Group>
      <Comment>
    	  <Comment.Avatar as='a' src="https://vignette.wikia.nocookie.net/tumblr-survivor-athena/images/7/7a/Blank_Avatar.png/revision/latest?cb=20161204161729" />
      	  <Comment.Content>
          <Comment.Author>{this.props.username}</Comment.Author>
		        <Comment.Text> 
       			  {this.props.message}
        	  </Comment.Text>
          </Comment.Content>
      </Comment>
    </Comment.Group>
    )
  }
}
export default Message;