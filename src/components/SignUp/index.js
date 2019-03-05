import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  fullName: '',
  photoUrl: 'https://firebasestorage.googleapis.com/v0/b/the-limelight.appspot.com/o/default%2Fdefault-profile-pic%2Fprofile-picture.png?alt=media&token=dd849aa8-4e09-4ae6-b508-689a08a29373',
  description: '',
  bgimageUrl: 'https://firebasestorage.googleapis.com/v0/b/the-limelight.appspot.com/o/default%2Fdefault-cover-photo%2Fdefault-cover-photo.jpg?alt=media&token=6380f21b-e20c-4894-b0d8-27530745cb76',
  error: null,
};





const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, fullName, passwordOne, description, bgimageUrl , photoUrl} = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.props.firebase.user(authUser.user.uid).set(
          {
            fullName,
            bgimageUrl,
            photoUrl,
            username,
            email,
            description,
          },
          { merge: true },
        );
       
      }) 
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

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
      email,
      fullName,
      passwordOne,
      passwordTwo,
      error,
      description,

    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="signup-page">
      <h1>SignUp</h1> 
      <form onSubmit={this.onSubmit}>
      <label>
        User Name
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="User Name"
        />
        </label>
        <label>
          Email
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </label>
        <label>
          Full Name
        <input
          name="fullName"
          value={fullName}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        </label>
        <label>
          Description
        <textarea
          name="description"
          value={description}
          onChange={this.onChange}
          placeholder="Text Area"
        />
        </label>
        <label>
          Password
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </label>
        <label>
          Confirm Password
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };



