import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    bgImage: '',
    bgimageUrl: '',
}




class BGImageHandler extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
       this.onClickForBgImage = this.onClickForBgImage.bind(this);
    }


    componentDidMountBG() {
        var user = this.props.firebase.auth.currentUser;
        var dbref = this.props.firebase.users().doc(user.uid);
        dbref.get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({
                        bgimageUrl: doc.data().bgimageUrl,
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


    handleBackgroundImage = event => {
        const bgImage = event.target.files[0];
        this.setState({ bgImage });
        console.log('File Selected');
    };

    

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const BGImageHandler1 = withFirebase(BGImageHandler);

export { BGImageHandler1 };