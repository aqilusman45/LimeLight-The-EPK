import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.emailAuthProvider = app.auth.EmailAuthProvider;

    //storage

    this.storage = app.storage();

    this.auth = app.auth();

    this.db = app.firestore();
    
    this.db.settings({ timestampsInSnapshots: true });

    // //Social Login Platforms 
    // this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();

  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // doSignInWithGoogle = () =>
  //   this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);


  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  event = (eventid) => this.db.doc(`events/${eventid}`);

  events = () => this.db.collection(`events`);

  message = (id) => this.db.doc(`messages/${id}`);

  messages = () => this.db.collection(`messages`);
} 



export default Firebase;
