import React, {useState} from "react";
import {customHistory} from "../../index";
import ErrorValidation from "../Errors/ErrorValidation/ErrorValidation";
import {Preloader} from "../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import {signUpRequest} from "../../reducers/auth";
import Button, {SvgButton} from "../../styledComponents/Button";
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

const SignUp = () => {
    const errorAuth = useSelector(state => state.auth.error);
    const loaderAuth = useSelector(state => state.auth.loader);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [errorsValidation, setErrorsValidation] = useState(null);

    const onChange = (event) => {  //Как стрелочная функция заменяет bind();
        setForm({
            ...form,
            [event.target.name]: event.target.value     //Почему ставим квадратные скобки
        });
    };

    const onSubmit = (event) => {
        if (event) {
            event.preventDefault(); //Что еще интересно можно узнать про методы событий
        }

        let errors = validateForm(form);

        if (errors) {
            setErrorsValidation(errors);
            return;
        }

        dispatch(signUpRequest(form));
    };

    const validateForm = (form) => {
        const errors = {
            name: form.name.length === 0 ? 'Enter name' : null,
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
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
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
                                customHistory.push('/signIn')
                            }}>
                                Sign In
                            </HeaderNavItem>
                        </HeaderNav>
                    </Header>
                    <Body>
                        <BodyWrapperForm>
                            <FormWrapper>
                                <Title>
                                    Sign Up
                                </Title>
                                <Form>
                                    <FormGroup>
                                        <label htmlFor="firstName">First name:</label>
                                        <FormInput type="text"
                                                   style={{borderColor: errorsValidation && errorsValidation.name ? 'red' : ''}}
                                                   name='name'
                                                   value={form.name}
                                                   onChange={onChange}
                                                   placeholder="First name"/>
                                        {errorsValidation && errorsValidation.name &&
                                        <ErrorValidation error={errorsValidation.name}/>}
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="email">Email address:</label>
                                        <FormInput type="text"
                                                   style={{borderColor: errorsValidation && errorsValidation.email ? 'red' : ''}}
                                                   name='email'
                                                   value={form.email} onChange={onChange}
                                                   placeholder="Email address"/>
                                        {errorsValidation && errorsValidation.email &&
                                        <ErrorValidation error={errorsValidation.email}/>}
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="password">Password:</label>
                                        <FormInput type="password"
                                                   style={{borderColor: errorsValidation && errorsValidation.password ? 'red' : ''}}
                                                   name='password'
                                                   value={form.password} onChange={onChange}
                                                   placeholder="Password"/>
                                        {errorsValidation && errorsValidation.password &&
                                        <ErrorValidation error={errorsValidation.password}/>}
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="repeatPassword">Repeat password:</label>
                                        <FormInput type="password"
                                                   name='repeatPassword'
                                                   value={form.repeatPassword} onChange={onChange}
                                                   placeholder="Repeat password"/>
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

export default SignUp;
