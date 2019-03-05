import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

import { AuthUserContext } from '../Session';


const Navigation = ({ authUser }) => (

    <nav className="navbar navbar-default navbar-transparent navbar-fixed-top" color-on-scroll="200">

        <div className="container">
            <div className="navbar-header">
                <Link className="navbar-brand" to={ROUTES.LANDING} >Limelight EPK</Link>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right navbar-uppercase">
                    <li>
                        <a href="https://tllis.net" target="_blank" rel="noopener noreferrer">Limelight</a>
                    </li>
                    <li className="dropdown open">
                        <a href="#gaia" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                            <i className="fa fa-share-alt"></i> Follow Zay
                             </a>
                        <ul className="dropdown-menu dropdown-danger">
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=1666930353341708"><i className="fa fa-facebook-square"></i> Facebook</a>
                            </li>
                            <li>
                                <a href="https://twitter.com/zaymariemusic"><i className="fa fa-twitter"></i> Twitter</a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-instagram"></i> Instagram</a>
                              
                            </li>
                        </ul>
                    </li>
                    <li>
                        <AuthUserContext.Consumer>
                            {authUser =>
                                authUser ? <NavigationAuth /> : <NavigationNonAuth />
                            }
                        </AuthUserContext.Consumer>
                    </li>
                </ul>
            </div>
        </div>

    </nav>
);





const NavigationAuth = () => (
    <div className="nav-component">
        <li>
            <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link to={ROUTES.MESSAGES}>Messages</Link>
        </li>
        <li>
            <SignOutButton />
        </li>
    </div>
);

const NavigationNonAuth = () => (
    <div className="nav-component">
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </div>
);

export default Navigation;