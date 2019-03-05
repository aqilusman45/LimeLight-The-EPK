import React from 'react'

import { BrowserRouter as Router, Route, } from 'react-router-dom';
//URL routes imported
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';


// Module / React Compoenent Import 
import Navigation from '../Navigaton';
import ACCOUNT from '../Account';
import ADMIN from '../Admin';
import DASHBOARD from '../Dashboard';
import LANDING from '../Landing';
import PASSWORDCHANGE from '../PasswordChange';
import PASSWORDFORGET from '../PasswordForget';
import SIGNIN from '../SignIn';
import SIGNOUT from '../SignOut';
import SIGNUP from '../SignUp';
import Messenger from '../Messenger';

//<Navigation />

const App = ()=>(
                <Router>
                    <div>
                        <Navigation />
                        <Route exact path={ROUTES.LANDING} component={LANDING} />
                        <Route exact path={ROUTES.ACCOUNT} component={ACCOUNT} />
                        <Route exact path={ROUTES.ADMIN} component={ADMIN} />
                        <Route exact path={ROUTES.DASHBOARD} component={DASHBOARD} />
                        <Route exact path={ROUTES.PASSWORD_FORGET} component={PASSWORDFORGET} />
                        <Route exact path={ROUTES.SIGN_IN} component={SIGNIN} />
                        <Route exact path={ROUTES.SIGN_UP} component={SIGNUP} />
                        <Route exact path={ROUTES.SIGN_OUT} component={SIGNOUT} />
                        <Route exact path={ROUTES.MESSAGES} component={Messenger} />
                        <Route exact path={ROUTES.PASSWORD_CHANGE} component={PASSWORDCHANGE} />
                    </div>
                </Router>
        );
export default withAuthentication(App);