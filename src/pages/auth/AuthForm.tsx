import React, { useContext, useRef, useState } from 'react';
import {
    FirebaseLoginFail,
    FirebaseLoginSuccess,
    isFirebaseLoginSuccess,
} from '../../models/FirebaseLogin';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router';

const AuthForm: React.FC = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const authCtx = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;

        setIsLoading(true);

        const url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8izZExkkQzHEuVfx6v2MwDFNAsj9_jeQ';
        // Test only: Firebase API_KEY = AIzaSyD8izZExkkQzHEuVfx6v2MwDFNAsj9_jeQ
        // Test only: on firebase, email: test@test.com; pass: test1234
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setIsLoading(false);
        const data = (await res.json()) as
            | FirebaseLoginSuccess
            | FirebaseLoginFail;
        console.log(data);
        if (!isFirebaseLoginSuccess(data)) {
            // Show error message
            const { message } = data.error;
            // throw new Error(message);
            alert('Authentication failed: ' + message);
        } else {
            // Route to deployer and keep idToken for next api calls
            authCtx.login(data.idToken);
            navigate('/deployments', { replace: true });
        }
    };
    return (
        <section className={classes.auth}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input
                        type='email'
                        id='email'
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>Login</button>}
                    {isLoading && <p>Logging in...</p>}
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
