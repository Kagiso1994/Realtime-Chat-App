import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import firebase  from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';

function Login() {
    const auth = firebase.auth;
    const provider = firebase.provider;
    const [{}, dispatch] = useStateValue();
    const signIn = () =>{
        auth.signInWithPopup(provider).then(result =>(
           dispatch({
               type: actionTypes.SET_USER,
               user: result.user
           })
        )
    ).catch(error => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Whatsapp_logo" />

                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
