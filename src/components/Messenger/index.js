import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import {withFirebase} from '../Firebase';

class Messenger1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: ''
    };
  
  }

  uidChangeHandler = (newUid) => {  
    console.log(newUid);
      
    this.setState({
      uid: newUid,
    })
  }


  render() {  
    return (
        <div className="messenger">
         <ConversationList onChange={this.uidChangeHandler} />
          <MessageList uid={this.state.uid}/>
        </div>
    );
  }
}

const Messenger = withFirebase(Messenger1);

export default Messenger;




