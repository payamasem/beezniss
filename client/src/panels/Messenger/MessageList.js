import React, {Component} from 'react';
import Message from './Message';
import _ from 'lodash';
import "./list.css";




class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
    let app = this.props.db.database().ref('messages');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      this.setState({
        messages: messages
      });
  }

  render() {
    let messageNodes = this.state.messages.map((message) => {
      // console.log('the message = ', message);
      return (
           <Message 
              message={message.message} 
              username={message.username}
              key={message.key} /> 
      )
    });
    return (
      <div className="messageBox">
        {messageNodes}
      </div>
    );
  }
}

export default MessageList
