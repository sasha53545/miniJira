import React from "react";
import css from "./SignUp.module.css";
import {customHistory} from "../../App";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";
import {isEmpty} from "../../utils/isEmptyFeild";
import {ErrorValidation} from "../Errors/ErrorValidation/ErrorValidation";
import {signUpRequest} from "../../service/auth";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                email: '',
                password: '',
                repeatPassword: ''
            },
            errorValidation: {
                name: '',
                email: '',
                password: '',

                colorNameInput: '',
                colorEmailInput: '',
                colorPasswordInput: ''
            },
            errorMessage: ''
        }
    }

    onChange = (event) => {  //Как стрелочная функция заменяет bind();
        this.setState({
            form: {
                ...this.state.form,     //Еще раз про спред оператор
                [event.target.name]: event.target.value     //Почему ставим квадратные скобки
            }
        });
    };

    onSubmit = (event) => {
        if (event) {
            event.preventDefault(); //Что еще интересно можно узнать про методы событий
        }

        let name = '';
        let colorNameInput = '';
        if (!isEmpty(this.state.form.name)) {
            name = 'Enter your name!';
            colorNameInput = 'red';
        } else {
            name = '';
            colorNameInput = ''
        }

        let email = '';
        let colorEmailInput = '';
        if (!isEmpty(this.state.form.email)) {
            email = 'Enter your email!';
            colorEmailInput = 'red';
        } else {
            email = '';
            colorEmailInput = ''
        }

        let errorMessage = '';
        let password = '';
        let colorPasswordInput = '';
        if (!isEmpty(this.state.form.password)) {
            password = 'Enter your password!';
            colorPasswordInput = 'red';
        } else if (this.state.form.password !== this.state.form.repeatPassword) {
            errorMessage = 'Passwords do not match!';
            colorPasswordInput = 'red';
        } else {
            password = '';
            colorPasswordInput = '';
            errorMessage = '';
        }

        this.setState({
            ...this.state,
            errorMessage: errorMessage,
            errorValidation: {
                name: name,
                email: email,
                password: password,

                colorNameInput: colorNameInput,
                colorEmailInput: colorEmailInput,
                colorPasswordInput: colorPasswordInput
            }
        });

        if (this.state.form.password === this.state.form.repeatPassword && isEmpty(this.state.form.password) && isEmpty(this.state.form.name) && isEmpty(this.state.form.email)) {
            this.props.isFetching(true);
            signUpRequest(this.state.form)
                .then(response => {
                    localStorage.setItem('TOKEN', JSON.stringify(response));
                    this.props.onChangeFlag(true);
                    customHistory.push('/dashboard');
                    this.props.isFetching(false);
                })
                .catch(error => {
                    this.setState({
                        errorMessage: error.message
                    });
                    this.props.isFetching(false);
                });
        }
    };

    isCancel = (event) => {
        if (event) {
            event.preventDefault();
        }

        this.setState({
            form: {
                name: '',
                email: '',
                password: '',
                repeatPassword: ''
            },
        });
    };

    render() {
        return (
            <div>
                {(this.props.stateFetch === true) ?
                    <Preloader/> :
                    <div className={css.sign_up}>
                        <header className={css.header}>
                            <div>
                                <h1>MiniJira</h1>
                            </div>
                            <div onClick={() => {
                                customHistory.push('/signIn')
                            }}>
                                Sign In
                            </div>
                        </header>
                        <main className={css.main}>
                            <div className={css.form_block}>
                                <div className={css.form_block_without_error_message}>
                                    <div className={css.title_form}>
                                        Sign Up
                                    </div>
                                    <form className={css.form}
                                          onSubmit={this.onSubmit}>    {/*Почему onSubmit пишем здесь а не у кнопки, как он понимает к какой из кнопки относится это событие*/}
                                        <div className={css.form_group}>
                                            <label htmlFor="firstName">First name:</label>
                                            <input type="text" className={css.form_control}
                                                   style={{borderColor: this.state.errorValidation.colorNameInput}}
                                                   name='name'
                                                   value={this.state.form.name}
                                                   onChange={this.onChange}
                                                   placeholder="First name"/>
                                            {this.state.errorValidation.name &&
                                            <ErrorValidation error={this.state.errorValidation.name}/>}
                                        </div>
                                        <div className={css.form_group}>
                                            <label htmlFor="email">Email address:</label>
                                            <input type="text" className={css.form_control}
                                                   style={{borderColor: this.state.errorValidation.colorEmailInput}}
                                                   name='email'
                                                   value={this.state.form.email} onChange={this.onChange}
                                                   placeholder="Email address"/>
                                            {this.state.errorValidation.email &&
                                            <ErrorValidation error={this.state.errorValidation.email}/>}
                                        </div>
                                        <div className={css.form_group}>
                                            <label htmlFor="password">Password:</label>
                                            <input type="password" className={css.form_control}
                                                   style={{borderColor: this.state.errorValidation.colorPasswordInput}}
                                                   name='password'
                                                   value={this.state.form.password} onChange={this.onChange}
                                                   placeholder="Password"/>
                                            {this.state.errorValidation.password &&
                                            <ErrorValidation error={this.state.errorValidation.password}/>}
                                        </div>
                                        <div className={css.form_group}>
                                            <label htmlFor="repeatPassword">Repeat password:</label>
                                            <input type="password" className={css.form_control}
                                                   style={{borderColor: this.state.errorValidation.colorPasswordInput}}
                                                   name='repeatPassword'
                                                   value={this.state.form.repeatPassword} onChange={this.onChange}
                                                   placeholder="Repeat password"/>
                                        </div>
                                        <div className={css.buttons}>
                                            <button type="submit" className={css.btn}>Send</button>
                                            <button type="submit" className={css.btn} onClick={this.isCancel}>Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className={css.block_with_error_message}>
                                    {this.state.errorMessage && <ErrorMessage error={this.state.errorMessage}/>}
                                </div>
                            </div>
                        </main>
                        <Footer/>
                    </div>
                }
            </div>
        );
    }
}
