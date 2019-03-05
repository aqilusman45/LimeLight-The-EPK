import React from 'react';

import { withFirebase } from '../Firebase';

import { withAuthorization } from '../Session';

import { EventsCreator1 } from '../Events'

import { EventsNewsFeed1 } from '../Events_News_Feed';

const INITIAL_STATE = {
    fullName: '',
    photoUrl: '',
    description: '',
    bgimageUrl: '',
    error: null,
}




const DASHBOARD = () =>
    (

        <DashboardView />
    )


class DashboardFeatures extends React.Component {
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
                        description: doc.data().description,
                        bgimageUrl: doc.data().bgimageUrl,
                    })

                } else {
                    console.log('No Such Document');

                }
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        return (
            <div >

                <div className="section section-header">
                    <div className="parallax filter filter-color-grey">
                        <div className="image" style={{ backgroundImage: `url(${this.state.bgimageUrl})` }}>
                        </div>
                        <div className="container">
                            <div className="content">
                                <div className="title-area">

                                    <img title={this.state.fullName} alt={this.state.fullName} src={this.state.photoUrl} style={{ height: '200px', width: '200px', border: '2px solid white', borderRadius: '100%' }} />

                                    <h1 className="title-modern">{this.state.fullName}</h1>
                                    <p><b>Status</b><br />{this.state.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <EventsCreator1 />
                
                <div className="col-md-6">
                
                <h2>Events</h2>
                <EventsNewsFeed1 />
                </div>
            </div>
        )
    }


}

const DashboardView = withFirebase(DashboardFeatures);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DASHBOARD);