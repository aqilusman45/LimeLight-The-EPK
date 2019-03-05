import React from 'react';
import { withFirebase } from '../Firebase';

import {Popup} from '../Event_Popup'




class EventsNewsFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      event: [],
    };
  }


  componentWillMount() {
    console.log("Component Added");

    this.setState({ loading: true });

    this.props.firebase
      .events()
      .onSnapshot(snapshot => {
        let eventList = [];

        snapshot.forEach(doc => {
          eventList.push({ ...doc.data() });

        });

        this.setState({
          event: eventList,
          loading: false,
        });
      });
  }

  onDeleteHandler(id) {
    this.props.firebase.event(id).delete()
      .then(() => {
        console.log("Documented Deleted Successfully");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }


  render() {
    var user = this.props.firebase.auth.currentUser;
    return (
      <div className="col-md-12 ">
        <div>{
          this.state.event.reverse().map((d, i) => {
            return (
              <div key={i}>
                {
                  user.uid === d.userUID ? (<div>

                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#Modal${i}`}>
                    Edit
                    </button>
                    
                    <button onClick={() => this.onDeleteHandler(d.ID_Generator)}>Delete</button>
                    <Popup  DBDocId={d.ID_Generator} eventDesc={d.eventDescription} location={d.location} date={d.date} photo={d.eventPhotoUrl} targetid={`Modal${i}`} />                                    
                    </div>) : (<div></div>)
                }
                <div>

                  <p>
                    <img alt={d.eventDescription} src={d.photoUrl} style={{ height: '50px', width: '50px', border: '2px solid white', borderRadius: '100%' }} />
                    {d.fullName}
                  </p>

                  <p className="description show-text">
                    <b>{d.eventDescription}</b>
                    <br />
                    <b> {d.location}</b>
                    <br />
                    <b>{d.date}</b>
                  </p>
                  <div className="col-md-12">
                    <a href="#">
                      <img alt="" title={d.eventDescription} src={d.eventPhotoUrl} width="400px" /></a>
                    <hr />
                  </div>
                </div>
              </div>)
          })}
        </div>
    </div>
    )
  }
}

const EventsNewsFeed1 = withFirebase(EventsNewsFeed);

export { EventsNewsFeed1 };


