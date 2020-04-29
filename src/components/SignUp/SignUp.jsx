import React, {useState} from "react";
import css from "./SignUp.module.css";
import {customHistory} from "../../index";
import ErrorValidation from "../Errors/ErrorValidation/ErrorValidation";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import {signUpRequest} from "../../reducers/auth";

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
            name: form.name.length === 0 ? 'Name should not be empty' : null,
            email: form.email.length === 0 ? 'Email should not be empty' : null,
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
                    <header className={css.header}>
                        <div className={css.header_title}>
                            <h1>MiniJira</h1>
                        </div>
                        <div className={css.header_nav}>
                            <div onClick={() => {
                                customHistory.push('/signIn')
                            }}>
                                Sign In
                            </div>
                        </div>
                    </header>
                    <main className={css.main}>
                        <div className={css.content}>
                            <div className={css.form_block}>
                                <div className={css.title}>
                                    Sign Up
                                </div>
                                <form className={css.form}
                                      onSubmit={onSubmit}>    {/*Почему onSubmit пишем здесь а не у кнопки, как он понимает к какой из кнопки относится это событие*/}
                                    <div className={css.form_group}>
                                        <label htmlFor="firstName">First name:</label>
                                        <input type="text" className={css.form_control}
                                               style={{borderColor: errorsValidation && errorsValidation.name ? 'red' : ''}}
                                               name='name'
                                               value={form.name}
                                               onChange={onChange}
                                               placeholder="First name"/>
                                        {errorsValidation && errorsValidation.name &&
                                        <ErrorValidation error={errorsValidation.name}/>}
                                    </div>
                                    <div className={css.form_group}>
                                        <label htmlFor="email">Email address:</label>
                                        <input type="text" className={css.form_control}
                                               style={{borderColor: errorsValidation && errorsValidation.email ? 'red' : ''}}
                                               name='email'
                                               value={form.email} onChange={onChange}
                                               placeholder="Email address"/>
                                        {errorsValidation && errorsValidation.email &&
                                        <ErrorValidation error={errorsValidation.email}/>}
                                    </div>
                                    <div className={css.form_group}>
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className={css.form_control}
                                               style={{borderColor: errorsValidation && errorsValidation.password ? 'red' : ''}}
                                               name='password'
                                               value={form.password} onChange={onChange}
                                               placeholder="Password"/>
                                        {errorsValidation && errorsValidation.password &&
                                        <ErrorValidation error={errorsValidation.password}/>}
                                    </div>
                                    <div className={css.form_group}>
                                        <label htmlFor="repeatPassword">Repeat password:</label>
                                        <input type="password" className={css.form_control}
                                               name='repeatPassword'
                                               value={form.repeatPassword} onChange={onChange}
                                               placeholder="Repeat password"/>
                                    </div>
                                    <div className={css.buttons}>
                                        <button type="submit" className={css.btn}>Send</button>
                                        <button type="submit" className={css.btn} onClick={isCancel}>Cancel
                                        </button>
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
}

export default SignUp;
