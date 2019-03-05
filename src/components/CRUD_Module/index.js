import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  username: '',
  fullName: '',
  description: '',
  updatePrompt: '',
  error: null,
};


class CRUDModule extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {

    var user = this.props.firebase.auth.currentUser;
    var dbref = this.props.firebase.users().doc(user.uid);
    dbref.get()
        .then(doc => {
            if (doc.exists) {
                this.setState({
                    fullName: doc.data().fullName,
                    username: doc.data().username,
                    description: doc.data().description,
                })
                console.log(this.state);

            } else {
                console.log('No Such Document');

            }
        })
        .catch(error => {
            console.log(error);
        })
}




        


  onSubmit = event => {
    const { username, fullName, description} = this.state;
   
    var user = this.props.firebase.auth.currentUser;
    this.props.firebase.user(user.uid).set(
        {
          fullName,
          username,
          description,
        },
        { merge: true },
      )
      .then(() => {
      alert('User Info Updated');
      })
      .catch(error => {
        this.setState({ error });
      });
      event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      fullName,
      updatePrompt,
      error,
      description,

    } = this.state;

    const isInvalid =
      username === ''||
      fullName === ''||
      description === '';

    return (
    <div className= "CRUD-module">
    <form onSubmit={this.onSubmit}>
      <label>
        Username
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
        />
        </label>
        <label>
        Full Name
        <input
          name="fullName"
          value={fullName}
          onChange={this.onChange}
          type="text"
        />
        </label>
        <label>
        Description
        <textarea
          name="description"
          value={description}
          onChange={this.onChange}
        />
        </label>
        <button disabled={isInvalid} type="submit">
          Update
        </button>
        <p>{updatePrompt}</p>
        {error && <p>{error.message}</p>}
      </form>
    </div>
    );
  }
}

const CRUDForm = withFirebase(CRUDModule);

export {CRUDForm};



