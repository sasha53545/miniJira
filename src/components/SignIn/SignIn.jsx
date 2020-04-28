import React, {useEffect, useState} from "react";
import css from "./SignIn.module.css";
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import ErrorValidation from "../Errors/ErrorValidation/ErrorValidation";
import {googleAuth, googleAuthAsync} from "../../service/auth";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {facebookAuthIcon, googleAuthIcon} from "../../images/svg";
import {useDispatch, useSelector} from "react-redux";
import {
    authState,
    localStorageSetItemRequest,
    requestedSignIn,
    requestLocalStorageSetItem,
    signInRequest
} from "../../reducers/auth";

const SignIn = (props) => {
    const errorAuth = useSelector(state => state.auth.error);
    const loaderAuth = useSelector(state => state.auth.loader);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errorsValidation, setErrorsValidation] = useState(null);

    useEffect(() => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2
                .init({
                    client_id:
                        '416520824005-i7rgnt5fcm7rd12av7p7h70ndvnmjodp.apps.googleusercontent.com',
                })
        });
    }, []);

    const signInWithGoogle = () => {
        window.gapi.auth2.getAuthInstance().signIn()
            .then(googleUser => {
                const id_token = googleUser.getAuthResponse().id_token;
                // props.loader();
                return googleAuthAsync(id_token)
                    .then(response => {
                        localStorageSetItemRequest('TOKEN', response);
                        dispatch(authState());
                        customHistory.push('/dashboard');
                    })
                    .catch(error => console.log(error.message))
                    .finally(() => props.loader());
            })
    };

    const onChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        let errors = validateForm(form);

        if (errors) {
            setErrorsValidation(errors);
            return null;
        }

        dispatch(signInRequest(form));
    };

    const validateForm = (form) => {
        const errors = {
            email: form.email.length === 0 ? 'Name should not be empty' : null,
            password: form.password.length === 0 ? 'Password should not be empty' : null,
        };

        for (let key of Object.keys(errors)) {
            if (errors[key]) {
                return errors;
            }
        }

        return null;
    };

    const isCancel = (event) => {
        if (event) {
            event.preventDefault();
        }

        setForm({
            email: '',
            password: ''
        });
    };

    return (
        <div>
            {(loaderAuth === true) ?
                <Preloader/> :
                <div>
                    <header className={css.header}>
                        <div className={css.header_title}>
                            <h1>MiniJira</h1>
                        </div>
                        <div className={css.header_nav}>
                            <div onClick={() => {
                                customHistory.push('/signUp')
                            }}>
                                Sign Up
                            </div>
                        </div>
                    </header>
                    <main className={css.main}>
                        <div className={css.content}>
                            <div className={css.form_block}>
                                <div className={css.title}>
                                    Sign In
                                </div>
                                <div className={css.auth_buttons}>
                                    <button className={css.auth_button} onClick={signInWithGoogle}>
                                        <div className={css.auth_icon}>
                                            {googleAuthIcon()}
                                        </div>
                                        <div>
                                            Sign in with Google
                                        </div>
                                    </button>
                                    <button className={css.auth_button} onClick={signInWithGoogle}>
                                        <div className={css.auth_icon}>
                                            {facebookAuthIcon()}
                                        </div>
                                        <div>
                                            Sign in with Facebook
                                        </div>
                                    </button>
                                </div>
                                <form className={css.form} onSubmit={onSubmit}>
                                    <div className={css.form_group}>
                                        <label htmlFor="inputEmail">Email address:</label>
                                        <input type="text" className={css.form_control}
                                               style={{borderColor: errorsValidation && errorsValidation.email ? 'red' : ''}}
                                               name='email' value={form.email}
                                               onChange={onChange}
                                               aria-describedby="emailHelp" placeholder="Enter email"/>
                                        {errorsValidation && errorsValidation.email &&
                                        <ErrorValidation error={errorsValidation.email}/>}
                                    </div>
                                    <div className={css.form_group}>
                                        <label htmlFor="inputPassword">Password:</label>
                                        <input type="password" className={css.form_control}
                                               style={{borderColor: errorsValidation && errorsValidation.password ? 'red' : ''}}
                                               name='password'
                                               value={form.password} onChange={onChange}
                                               placeholder="Password"/>
                                        {errorsValidation && errorsValidation.password &&
                                        <ErrorValidation error={errorsValidation.password}/>}
                                    </div>
                                    <div className={css.buttons}>
                                        <button type="submit" className={css.btn}>Send</button>
                                        <button className={css.btn} onClick={isCancel}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                            <div className={css.error_message}>
                                {errorAuth && <ErrorMessage/>}
                            </div>
                        </div>
                    </main>
                    <footer className={css.footer}>
                        <Footer/>
                    </footer>
                </div>
            }
        </div>
    );
};

export default SignIn;
