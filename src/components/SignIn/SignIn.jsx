import React, {useEffect, useState} from "react";
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import ErrorValidation from "../Errors/ErrorValidation/ErrorValidation";
import {googleAuthAsync} from "../../service/auth";
import {Preloader} from "../Preloader/Preloader";
import facebookAuthIcon from "../../svg/FacebookAuthIcon";
import googleAuthIcon from "../../svg/GoogleAuthIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    authState,
    localStorageSetItemRequest,
    signInRequest
} from "../../reducers/auth";
import styled from "styled-components";
import Button, {animateHoverButton, SvgButton} from "../../styledComponents/Button";
import Footer from "../../styledComponents/Footer";
import {Header, HeaderNav, HeaderNavItem} from "../../styledComponents/Header";
import {
    Body,
    BodyWrapperForm,
    ButtonsWrapper,
    Form,
    FormWrapper
} from "../../styledComponents/Body";
import {FormGroup, FormInput} from "../../styledComponents/Form";
import {Title} from "../../styledComponents/Title";
import GoogleAuthIcon from "../../svg/GoogleAuthIcon";
import FacebookAuthIcon from "../../svg/FacebookAuthIcon";

const ButtonsAuthWrapper = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0 20px 0;
`;

const ButtonAuth = styled(Button)`
    width: 250px;
    height: 70px;
    justify-content: space-evenly;
    text-transform: none;
    :hover {
        animation: ${animateHoverButton} .5s ease-in-out;
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
                    <Header>
                        <h1>MiniJira</h1>
                        <HeaderNav>
                            <HeaderNavItem onClick={() => {
                                customHistory.push('/signUp')
                            }}>
                                Sign Up
                            </HeaderNavItem>
                        </HeaderNav>
                    </Header>
                    <Body>
                        <BodyWrapperForm>
                            <FormWrapper>
                                <Title>
                                    Sign In
                                </Title>
                                <ButtonsAuthWrapper>
                                    <ButtonAuth onClick={signInWithGoogle}>
                                        <GoogleAuthIcon/>
                                        Sign in with Google
                                    </ButtonAuth>
                                    <ButtonAuth onClick={signInWithGoogle}>
                                        <FacebookAuthIcon/>
                                        Sign in with Facebook
                                    </ButtonAuth>
                                </ButtonsAuthWrapper>
                                <Form>
                                    <FormGroup>
                                        <label htmlFor="inputEmail">Email address:</label>
                                        <FormInput type="text"
                                                   style={{borderColor: errorsValidation && errorsValidation.email ? 'red' : ''}}
                                                   name='email' value={form.email}
                                                   onChange={onChange}
                                                   placeholder="Enter email"/>
                                        {errorsValidation && errorsValidation.email &&
                                        <ErrorValidation error={errorsValidation.email}/>}
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="inputPassword">Password:</label>
                                        <FormInput type="password"
                                                   style={{borderColor: errorsValidation && errorsValidation.password ? 'red' : ''}}
                                                   name='password'
                                                   value={form.password} onChange={onChange}
                                                   placeholder="Password"/>
                                        {errorsValidation && errorsValidation.password &&
                                        <ErrorValidation error={errorsValidation.password}/>}
                                    </FormGroup>
                                    <ButtonsWrapper>
                                        <Button onClick={onSubmit}>
                                            <SvgButton/>
                                            Send
                                        </Button>
                                        <Button onClick={isCancel}>
                                            <SvgButton/>
                                            Cancel
                                        </Button>
                                    </ButtonsWrapper>
                                </Form>
                            </FormWrapper>
                            {errorAuth && <ErrorMessage/>}
                        </BodyWrapperForm>
                    </Body>
                    <Footer>
                        Made by Kazakov Alexander
                    </Footer>
                </div>
            }
        </div>
    );
};

export default SignIn;
