import React, { Component } from 'react';
import MessageList from './MessageList';
import MessageBox from './MessageBox';
import firebase from 'firebase';

const firebaseAPIkey = process.env.REACT_APP_FIREBASE_API_KEY;

class Messenger extends Component {

  constructor(props){
    super(props);
    var config = {
      apiKey: firebaseAPIkey,
      authDomain: "trymsg-c4faa.firebaseapp.com",
      databaseURL: "https://trymsg-c4faa.firebaseio.com",
      projectId: "trymsg-c4faa",
      storageBucket: "trymsg-c4faa.appspot.com",
      messagingSenderId: "68372529676"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div className="messengerBox">
        <h1>Messenger</h1>
       <MessageList db={firebase} />
       <MessageBox db={firebase} />
      </div>
    );    
  }
  }


export default Messenger;
