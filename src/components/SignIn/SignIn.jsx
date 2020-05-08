import React, {useEffect, useState} from "react";
import css from "./SignIn.module.css";
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import ErrorValidation from "../Errors/ErrorValidation/ErrorValidation";
import {googleAuthAsync} from "../../service/auth";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {facebookAuthIcon, googleAuthIcon} from "../../images/svg";
import {useDispatch, useSelector} from "react-redux";
import {
    authState,
    localStorageSetItemRequest,
    signInRequest
} from "../../reducers/auth";
import styled, {keyframes} from "styled-components";
import {animateHoverButtons, Button, Rectangle, SvgButton} from "../Dashboard/Dashboard";

const animateLineNav = keyframes`
    from {
    }

    to {
        border-bottom: 2px black solid;
    }
`;

const ButtonAuth = styled(Button)`
    width: 250px;
    height: 70px;
    justify-content: space-evenly;
    text-transform: none;
    :hover {
        animation: ${animateHoverButtons} .4s ease-in-out;
        animation-fill-mode: forwards;
    }
`;

export const Input = styled.input`
    outline:none;
    :focus {
        border: 2px #43a047 solid;
    }
`;

const NavItem = styled.div`
    transition: 0.6s;
    :hover {
        animation: ${animateLineNav} .5s ease-in-out 0.4s;
        animation-fill-mode: forwards;
    }
`;
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
            email: form.email.length === 0 ? 'Enter email' : null,
            password: form.password.length === 0 ? 'Enter password' : null,
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
                            <NavItem onClick={() => {
                                customHistory.push('/signUp')
                            }}>
                                Sign Up
                            </NavItem>
                        </div>
                    </header>
                    <main className={css.main}>
                        <div className={css.content}>
                            <div className={css.form_block}>
                                <div className={css.title}>
                                    Sign In
                                </div>
                                <div className={css.auth_buttons}>
                                    <ButtonAuth onClick={signInWithGoogle}>
                                        {googleAuthIcon()}
                                        Sign in with Google
                                    </ButtonAuth>
                                    <ButtonAuth onClick={signInWithGoogle}>
                                        {facebookAuthIcon()}
                                        Sign in with Facebook
                                    </ButtonAuth>
                                </div>
                                <form className={css.form}>
                                    <div className={css.form_group}>
                                        <label htmlFor="inputEmail">Email address:</label>
                                        <Input type="text" className={css.form_control}
                                               style={{borderColor: errorsValidation && errorsValidation.email ? 'red' : ''}}
                                               name='email' value={form.email}
                                               onChange={onChange}
                                               aria-describedby="emailHelp" placeholder="Enter email"/>
                                        {errorsValidation && errorsValidation.email &&
                                        <ErrorValidation error={errorsValidation.email}/>}
                                    </div>
                                    <div className={css.form_group}>
                                        <label htmlFor="inputPassword">Password:</label>
                                        <Input type="password" className={css.form_control}
                                               style={{borderColor: errorsValidation && errorsValidation.password ? 'red' : ''}}
                                               name='password'
                                               value={form.password} onChange={onChange}
                                               placeholder="Password"/>
                                        {errorsValidation && errorsValidation.password &&
                                        <ErrorValidation error={errorsValidation.password}/>}
                                    </div>
                                    <div className={css.buttons}>
                                        <Button onClick={onSubmit}>
                                            Send
                                            <SvgButton className='svg' viewBox='0 0 150 50'
                                                       xmlns='http://www.w3.org/2000/svg'>
                                                <Rectangle className='rectangle' x='0' y='0' fill='none' width='150'
                                                           height='50'/>
                                            </SvgButton>
                                        </Button>
                                        <Button onClick={isCancel}>
                                            Cancel
                                            <SvgButton className='svg' viewBox='0 0 150 50'
                                                       xmlns='http://www.w3.org/2000/svg'>
                                                <Rectangle className='rectangle' x='0' y='0' fill='none' width='150'
                                                           height='50'/>
                                            </SvgButton>
                                        </Button>
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
