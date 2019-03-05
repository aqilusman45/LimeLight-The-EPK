import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    profileImage: '',
    photoUrl: '',

}


class ProfileImageHandler extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
        this.onClickForProfPic = this.onClickForProfPic.bind(this);
    }

    componentWillMount() {
        var user = this.props.firebase.auth.currentUser;
        var dbref = this.props.firebase.users().doc(user.uid);
        dbref.get().then(doc => {
                if (doc.exists) {
                    this.setState({
                        photoUrl: doc.data().photoUrl,
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


    handleProfileImage = event => {
        const profileImage = event.target.files[0];
        this.setState({ profileImage });
    };


    onClickForProfPic = event => {
        const { profileImage } = this.state;
        var user = this.props.firebase.auth.currentUser;
        const profileImageUpload = this.props.firebase.storage.ref(`images/profile-pictures/${user.uid}/${profileImage.name}`).put(profileImage);
       
        //profile-pic upload reference
        profileImageUpload.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            profileImageUpload.snapshot.ref.getDownloadURL().then((photoUrl) => {
                console.log(photoUrl);
                this.props.firebase.user(user.uid).set(
                    {
                        photoUrl,
                    },
                    { merge: true },
                ).then(
                    this.setState({photoUrl}),
                    alert('Profile Picture Updated')
                )
            });
        })
    }

    render() {
        return (
            <div>
                <label className= "profile-picture">
                   <div>
                    Profile picture
                    </div>
                    <img alt="" src={this.state.photoUrl} style={{ height: '200px', width: '200px' , border: '2px solid white', borderRadius: '100%' }}/>

        <input
                        onChange={this.handleProfileImage}
                        type="file"
                    />
                    <button onClick={this.onClickForProfPic}>Update</button>
                </label>
            </div>
        )
    }
}

const ProfileImageHandler1 = withFirebase(ProfileImageHandler);

export { ProfileImageHandler1 };