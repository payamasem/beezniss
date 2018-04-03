import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';

import MessageList from './MessageList';
import MessageBox from './MessageBox';
import firebase from 'firebase';



class messageApp extends Component {

constructor(props){
  super(props);
   var config = {
    apiKey: "AIzaSyBC42q0-AuZgVA8-kyU47M_iFI4bp3KRIM",
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
      <div className="container">
               <MessageList db={firebase} />
               <MessageBox db={firebase} />
        </div>
    );    
  }
  }

               



export default messageApp;
