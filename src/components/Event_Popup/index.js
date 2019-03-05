import React from 'react';
import {withFirebase} from '../Firebase'


const INITIAL_STATE = {
  eventPhotoUrl: '',
  eventImage: '',
  eventDescription: '',
  location: '',
  date: '',
  DBDocId: '',
  error: null,
};


class PopupModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE };
  }
  componentWillMount() {
    this.setState({
      eventPhotoUrl: this.props.photo,
      eventDescription: this.props.eventDesc,
      location: this.props.location,
      date: this.props.date,
      DBDocId: this.props.DBDocId,
      error: null,    
    })
  }

  onSubmit = event => {
    event.preventDefault();
    const { eventImage, eventDescription, location, date, DBDocId } = this.state
    const eventImageUpload = this.props.firebase.storage.ref(`event/event-pictures/${DBDocId}/${eventImage.name}`).put(eventImage);
    const eventImageState = this.props.firebase.event(DBDocId);
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
        date,
        eventDescription,
        location,
      },
      { merge: true },
    ).catch(error => {
      this.setState({ error });
    });

    
  };


  handleEventImage = event => {
    const eventImage = event.target.files[0];
    this.setState({ eventImage });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { eventDescription, location, date ,eventPhotoUrl } = this.state
    return (
      <div className="modal fade" id={this.props.targetid} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Event</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <div>

                <form onSubmit={this.onSubmit}>
                  <label>
                    Event Description
          <textarea placeholder="Event Description" name="eventDescription" value={eventDescription} onChange={this.onChange} />
                  </label>
                  <label>
                    Location
          <input name="location" value={location} onChange={this.onChange} type="text" />
                  </label>
                  <a href="#">
                    <img alt="" title={this.props.eventDescription} src={eventPhotoUrl} width="400px" /></a>

                  <label>
                    Event Banner
          <input onChange={this.handleEventImage} type="file" />
                  </label>
                  <label>
                    Date
          <input name="date" value={date} onChange={this.onChange} type="date" />
                  </label>
                  <button className="btn btn-primary" type="submit">
                    Save Changes
                      </button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Popup = withFirebase(PopupModal);

export { Popup };

