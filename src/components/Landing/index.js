import React from 'react';
//URL routes imported

import image_1 from '../../img/faces/zay-album.jpg';
import image_2 from '../../img/mar1-show-flyer.jpg';
import image_3 from '../../img/Design.jpg';
import image_4 from '../../img/gold-concert.jpg';
//gold-concert.jpg
//nav bar component



// banner section
class Bannersec extends React.Component {
    render() {
        return (
            <div className="section section-header">
                <div className="parallax filter filter-color-grey">
                    <div className="image" style={{ backgroundImage: `url(${image_1})` }}>
                    </div>
                    <div className="container">
                        <div className="content">
                            <div className="title-area">
                                <h1 className="title-modern">Zay'Marie</h1>
                                <p>Pop, R&amp;B and Soul</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const ArtistsInfo = () =>
    (
        <div className="col-md-6">
            <h2>Artist Information</h2>
            <div className="separator separator-danger">∎</div>
            <p className="description">Hometown: Virginia Beach
            <br />Genre: Pop, R&amp;B and Soul
            <br />Influence: Whitney Houston, Stevie Wonder, Beyonce, many more
            <br />Label: Self Released
            </p>
        </div>
    )

const Biography = () =>
    (
        <div className="col-md-6">
            <h2>Biography</h2>
            <div className="separator separator-danger">∎</div>
            <p className="description">Elizabeth Marie Murray, also known by her stage moniker Zay’Marie, is a Pop/Soul/R&amp;B singer,songwriter, and producer. Although she is a native of Virginia Beach, she is based in Atlanta,GA where she attended Spelman college as a music major with concentrations in voice and composition. She has opened up for acts like Danity Kane, and will be opening up for Dreezy in March.
                    </p>
            <p className="description">
                With Whitney Houston as her favorite vocalist, Stevie Wonder as her favorite songwriter, and Beyoncé as her favorite performer, she is largely influenced by these and other artists, but her sound is uniquely her own. In 2018 she released her first album titled Brand New (available on all streaming platforms) and she plans to release new music in the spring and summer of 2019. Be sure to keep up with her journey, and follow on all social media @ZayMarieMusic. She is definitely one to watch!
                    </p>
        </div>
    )

const UpcomingShows = () => (
    <div className="col-md-12">
        <h2>Upcoming Shows</h2>
        <div className="separator separator-danger">∎</div>
        <p className="description show-text push-right-160">
            <b>Dreezy x Zay'Marie</b>
            <br />
            <b> The Buckhead Theatre</b>
            <br />
            <b> Mar 1, 2019 @ 9pm</b>
        </p>
    </div>

)
const ShowFlyer = () => (
    <div className="col-md-12 push-right-160">
        <a href="https://ticketmaster.com/event/0E005588331573DB">
            <img alt="flyer" src={image_2} width="400px" /></a>
        <hr />
    </div>
)

const Text = () => (
    <div>
        <p className="description show-text push-right-160">
            <b>Zay'Marie x Gold Shade's Album release concert</b>
            <br />
            <b> Smith's Olde Bar</b>
            <br />
            <b> February 7, 2019 @ 8pm</b>
        </p>
    </div>
)

const ReleaseAlb = () => (
    <div className="col-md-12 push-right-160">
        <a href="https://www.eventbrite.com/e/gold-shades-album-release-nik-zaymarie-tickets-53183655746">
            <img alt="" src={image_4} width="400px" />
        </a>
        <hr />
    </div>
)
const PreviousShows = () => (
    <div className="col-md-12">
        <h2>Previous Shows</h2>
        <div className="separator separator-danger">∎</div>
        <p className="description show-text push-right-160">
            <b>Zay'Marie x Danity Kane x Glo96</b>
            <br />
            <b> The Buckhead Theatre</b>
            <br />
            <b> November 2, 2018 @ 8pm</b>
        </p>
    </div>
)

const FbEvent = () => (
    <div className="col-md-12 push-right-160">
        <a href="https://www.facebook.com/events/358129704953023/">
            <img alt="" src={image_3} width="400px" />
        </a>
        <hr />
    </div>
)

class Bodysec extends React.Component {
    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="row">
                        <ArtistsInfo />
                        <Biography />
                        <UpcomingShows />
                        <ShowFlyer />
                        <Text />
                        <ReleaseAlb />
                        <PreviousShows />
                        <FbEvent />
                    </div>
                </div>
            </div>
        );
    }
}


const Teamfreebie = () => (
    <div className="section section-our-team-freebie">
        <div className="parallax filter filter-color-black">
            <div className="image" style={{ backgroundImage: `url(${image_2})` }}>
            </div>
            <div className="container">
                <div className="content">
                    <div className="row">
                        <h2>Videos</h2>
                        <div className="separator separator-danger">∎</div>
                        <div className="col-md-4">
                            <iframe title="youtube_1" width="400" height="315" src="https://www.youtube.com/embed/9P4Oq-buNtI" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>
                        <div className="col-md-4">
                            <iframe title="youtube_2" width="400" height="315" src="https://www.youtube.com/embed/-A6lfaYXykI" frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
                        </div>
                        <div className="col-md-4">
                            <iframe title="youtube_3" width="400" height="315" src="https://www.youtube.com/embed/tH-dJwFHnKc" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <iframe title="youtube_5" width="660" height="415" src="https://www.youtube.com/embed/x2ww4OwqkzQ" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const Gallery = () => (
    <div className="section section-our-clients-freebie">
        <div className="container">
            <div className="title-area">
                <h2>Gallery</h2>
                <div className="separator separator-danger">∎</div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="icons-container">
                            <iframe title="soundclound_1" width="450" height="431" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/356524119&amp;color=%233a1b1f&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <h3>
                            <p className="description">

                                Zay follows up her Vivid EP with a full length album, Brand New. Brand New is a statement to the world; life forces us all
                                to change, but that growth can be beautiful and transformative. Her sultry southern charm and
                                catchy lyrics enchant listeners, as she bares her heart and soul. Words cannot describe how amazing
                                this project is; you have to experience it for yourself. Be on the lookout for the Brand New
                                Tour. Coming to a city near you!
                            </p>

                        </h3>
                        <h3>

                        </h3>
                        <img alt="" src="img/zay-album1.jpg" width="180px" />
                        <img alt="" src="img/faces/zay'marie2.jpg" width="200px" />
                        <img alt="" src="img/faces/zay'marie.jpg" width="180px" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const WorkWithZay = () => (
    <div className="section section-small section-get-started">
        <div className="parallax filter">
            <div className="image" style={{ backgroundImage: `url(${image_3})` }}>
            </div>
            <div className="container">
                <div className="title-area">
                    <h2 className="text-white">Do you want to work with Zay?</h2>
                    <div className="separator line-separator">♦</div>
                    <p className="description"> For booking information, contact our management team at corp@tllis.net</p>
                </div>
                <div className="button-get-started">
                    <a href="mailto:corp@tllis.net" className="btn btn-danger btn-fill btn-lg">Contact Us</a>
                </div>
            </div>
        </div>
        <a className="twitter-timeline tweetBox" href="https://twitter.com/zaymariemusic" data-tweet-limit="3">Tweets by @zaymariemusic</a>
        <a className="twitter-timeline" href="https://twitter.com/hashtag/tllis" ></a>
    </div>
)

const Footer = () => (
    <footer className="footer footer-big footer-color-black" data-color="black">
        <div className="container">
            <div className="row">

                <div className="col-md-2 col-md-offset-1 col-sm-3">
                    <div className="info">
                        <h5 className="title">Follow us on</h5>
                        <nav>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/zaymariemusic/" className="btn btn-social btn-facebook btn-simple">
                                        <i className="fa fa-facebook-square"></i> Facebook
                                </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/channel/UC3v1jr6cKouC3hjVpZWL-LQ" className="btn btn-social btn-youtube btn-simple">
                                        <i className="fa fa-youtube"></i> Youtube
                                </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/zaymariemusic" className="btn btn-social btn-twitter btn-simple">
                                        <i className="fa fa-twitter"></i> Twitter
                                </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <hr />
            <div className="copyright">
                © <script> document.write(new Date().getFullYear()) </script> The Limelight Internet Showcase - All Rights Reserved.
        </div>
        </div>
    </footer>
);
const LANDING = () =>
    (
        <div>
            <Bannersec />
            <Bodysec />
            <Teamfreebie />
            <Gallery />
            <WorkWithZay />
            <Footer />
        </div>
    )

export default LANDING;