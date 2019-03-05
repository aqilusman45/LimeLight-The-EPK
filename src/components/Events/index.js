import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    eventPhotoUrl: '',
    eventImage: '',
    eventDescription: '',
    location: '',
    date: '',
    eventStatus: '',
    error: null,
};


class EventsCreator extends Component {
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
                        photoUrl: doc.data().photoUrl,
                        userUID: user.uid,
                    })

                } else {
                    console.log('No Such Document');

                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleEventImage = event => {
        const eventImage = event.target.files[0];
        this.setState({ eventImage });
    };



    onSubmit = event => {

        const { fullName, eventDescription, date, location, photoUrl, eventImage, userUID } = this.state;

        var ID_Generator = '_' + Math.random().toString(36).substr(2, 9);
        const eventImageUpload = this.props.firebase.storage.ref(`event/event-pictures/${ID_Generator}/${eventImage.name}`).put(eventImage);
        const eventImageState = this.props.firebase.event(ID_Generator);
        //profile-pic upload reference
        eventImageUpload.on('state_changed', (snapshot) => {
             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);
        }, () => {
              eventImageUpload.snapshot.ref.getDownloadURL().then((eventPhotoUrl) => {
                console.log(eventPhotoUrl);
                eventImageState.set(
                    {
                        eventPhotoUrl,
                    },
                    { merge: true },
                ).then(
                    alert('Event Created')
                )
            });
        })

        eventImageState.set(
            {
                fullName,
                date,
                eventDescription,
                location,
                photoUrl,
                userUID,
                ID_Generator,
            },
            { merge: true },
        )
            .then(() => {
                this.setState({ ...INITIAL_STATE })

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
            eventDescription,
            date,
            location,

        } = this.state;

        const isInvalid =
            date === '' ||
            location === '' ||
            eventDescription === '';

        return (

            <div className="CRUD-module">
                <h1>Create Event</h1>
                <section>
                    <div className="text">
                        <form onSubmit={this.onSubmit}>
                            {/* <img src={this.state.photoUrl} /> */}
                            <label>
                                Event Description
                            <textarea name="eventDescription" value={eventDescription} onChange={this.onChange} />
                            </label>
                            <label>
                                Location
        <input name="location" value={location} onChange={this.onChange} type="text" />
                            </label>
                            <label>
                                Event Banner
        <input onChange={this.handleEventImage} type="file" />
                            </label>
                            <label>
                                Date
        <input name="date" value={date} onChange={this.onChange} type="date" />
                            </label>
                            <button disabled={isInvalid} className="btn btn-primary" type="submit">
                                Save Changes
                    </button>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

const EventsCreator1 = withFirebase(EventsCreator);

export { EventsCreator1 };





