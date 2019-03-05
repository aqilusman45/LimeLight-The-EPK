import React, { Component } from 'react';
import './Compose.css';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    message: '',
    chatRooms: [],
    getChatRooms:[],
    receiverUID: '',
}

class Compose1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...INITIAL_STATE
    };
  }


  componentWillMount(){
    const messageRef = this.props.firebase.messages();
    this.setState({
      receiverUID: this.props.uid,
    })
    messageRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.state.chatRooms.push(doc.id);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }


  onSubmit = event => {
    const user = this.props.firebase.auth.currentUser;
    var cond1 = `${this.state.receiverUID}_${user.uid}`;
    var cond2 =  `${user.uid}_${this.state.receiverUID}`;

    this.state.getChatRooms = this.state.chatRooms.filter((chatRoom)=>{
      // if(chatRoom === cond1){
      //   return cond1;
      // } else if (chatRoom === cond2) {
      //   return cond2;
      // }else{
      //   return cond1;
      // }
      console.log(cond1);
      console.log(cond2);
    })


    this.setState({
      ...INITIAL_STATE
    })
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const { message } = this.state;
    return (
      <div className="compose">
        <form onSubmit={this.onSubmit}>

          <input
            name="message"
            value={message}
            type="text"
            className="compose-input"
            placeholder="Type a message"
            onChange={this.onChange}
          />
          <button>
            Send
        </button>

        </form>

        {
          this.props.rightItems
        }
      </div>
    );
  }
}

const Compose = withFirebase(Compose1);

export default Compose;