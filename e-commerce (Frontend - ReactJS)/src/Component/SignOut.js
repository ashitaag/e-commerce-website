import React, {Component} from 'react';
import {ReactSession} from 'react-client-session';
import history from "./history";
class SignOut extends Component {
    render() {
        ReactSession.set("username", null);
        ReactSession.set("email", null);
        history.push("/")
        window.location.reload(false);
        return (
            <div>

            </div>
        );
    }
}

export default SignOut;