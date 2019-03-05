import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import {withFirebase} from '../Firebase';

import './ConversationList.css';



class ConversationList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
    this.changeConvo = this.changeConvo.bind(this);
  }

  componentDidMount() {
    this.getConversations();
  }




  getConversations(){
    let { conversationsList } = this.setState;
    let conversationsObject =[];
  this.props.firebase.users().get()
  .then(snapshot => {
    snapshot.forEach((doc) => {
      conversationsObject.push({
        ...doc.data(),
        doc,
      });
    });
    return conversationsObject
  })
  .then( (conversationsObject)=>{ 
    conversationsList = conversationsObject.map((doc)=>{
      return {
        photo: doc.photoUrl,
        name: doc.username,
        text: '',
        uid: doc.doc.id,
      }
    })
    this.setState( {
      conversations: conversationsList,
   });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
  }

  changeConvo = (e, uidParam ) => {
    const uid = uidParam;
    this.props.onChange(uid);
  }

  
  render() {
    return (
      <div className="scrollable content">
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          this.state.conversations.map( conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
              onChange={(e) => { 
                  this.changeConvo(e ,conversation.uid);
              }}
            />
          )
        }
      </div>
      </div>
    );
  }
}


const ConversationList = withFirebase(ConversationList1);

export default ConversationList;






    // this.props.firebase
    //   .users()
    //   .get().then(snapshot => {
    //     console.log(snapshot);
    //     let conversations =  snapshot.map((doc,i) => {
    //       this.setState({
    //         photo: doc.data().photoUrl,
    //         name: doc.data().fullName,
    //         text: '',
    //       })
    //       return {conversations};
    //     });
    //   });

    // axios.get('https://randomuser.me/api/?results=20').then(response => {
    //   console.log(response);
      
    //   this.setState(prevState => {
        
    //     let conversations = response.data.results.map(result => {
    //       // console.log(result);
          
    //       return {
    //         photo: result.picture.large,
    //         name: `${result.name.first} ${result.name.last}`,
    //         text: 'Hello world! This is a long message that needs to be truncated.'
    //       };
    //     });
    //    ;
        
    //   });
    // });