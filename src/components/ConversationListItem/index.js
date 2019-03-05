import React, { Component } from 'react';
import shave from 'shave';
import { withRouter } from 'react-router-dom';
import './ConversationListItem.css';

class ConversationListItem1 extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange =(e) => {
    const uid = this.props.data.uid;
    this.props.onChange(uid);
  }


  componentDidMount() {
    shave('.conversation-snippet', 20);
  }
  render() {
    const { photo, name, text} = this.props.data;
    return (
    <div className="conversation-list-item" onClick={(e)=>{
      this.handleChange(e)
    }}>
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{ name }</h1>
        <p className="conversation-snippet">{ text }</p>
      </div>
    </div>
  )}
}
const ConversationListItem = withRouter(ConversationListItem1)

export default ConversationListItem;