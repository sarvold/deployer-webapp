import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
    const newPasswordInputRef = useRef<HTMLInputElement>(null);
    const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=SOME_KEY';

    const authCtx = useContext(AuthContext);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredPassword = newPasswordInputRef.current?.value;

        // add validation

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredPassword,
                returnSecureToken: false,
            }),
            headers: {
                'Content-Type': 'application/json',
                // TODO-LaSZ: maybe add a bearer token here in an Authorization prop
            },
        }).then(res => {
            console.log(res)
        });
    };

    return (
        <form className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input
                    ref={newPasswordInputRef}
                    type='password'
                    id='new-password'
                    minLength={7}
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
