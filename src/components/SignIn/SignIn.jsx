import React from "react";
import css from "./SignIn.module.css";
import {customHistory} from "../../App";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";
import {isEmpty} from "../../utils/isEmptyFeild";
import {ErrorValidation} from "../Errors/ErrorValidation/ErrorValidation";
import {signInRequest} from "../../service/auth";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";

export class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
            errorMessage: '',
            errorValidation: {
                email: '',
                password: '',

                colorEmailInput: '',
                colorPasswordInput: ''
            }
        };
    }

    onChange = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    };

    onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (isEmpty(this.state.form.password) && isEmpty(this.state.form.email)) {
            this.props.isFetching(true);
            signInRequest(this.state.form)
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

        let email = '';
        let colorEmailInput = '';
        if(!isEmpty(this.state.form.email)) {
            email = 'Enter your email!';
            colorEmailInput = 'red';
        } else {
            email = '';
            colorEmailInput = ''
        }

        let password = '';
        let colorPasswordInput = '';
        if(!isEmpty(this.state.form.password)) {
            password = 'Enter your password!';
            colorPasswordInput = 'red';
        } else {
            password = '';
            colorPasswordInput = ''
        }

        this.setState({
            errorValidation: {
                email: email,
                password: password,

                colorEmailInput: colorEmailInput,
                colorPasswordInput: colorPasswordInput
            }
        });
    };

    isCancel = (event) => {
        if (event) {
            event.preventDefault();
        }

        this.setState({
            form: {
                email: '',
                password: '',
            },
        });
    };

    render() {
        return (
            <div>
                {(this.props.stateFetch === true) ?
                    <Preloader/> :
                    <div className={css.sign_in}>
                        <header className={css.header}>
                            <div>
                                <h1>MiniJira</h1>
                            </div>
                            <div onClick={() => {
                                customHistory.push('/signUp')
                            }}>
                                Sign Up
                            </div>
                        </header>
                        <main className={css.main}>
                            <div className={css.form_block}>
                                <div className={css.form_block_without_error_message}>
                                    <div className={css.title_form}>
                                        Sign In
                                    </div>
                                    <form className={css.form} onSubmit={this.onSubmit}>
                                        <div className={css.form_group}>
                                            <label htmlFor="inputEmail1">Email address:</label>
                                            <input type="text" className={css.form_control}
                                                   style={{borderColor: this.state.errorValidation.colorEmailInput}}
                                                   name='email' value={this.state.email}
                                                   onChange={this.onChange}
                                                   aria-describedby="emailHelp" placeholder="Enter email"/>
                                            {this.state.errorValidation.email &&
                                            <ErrorValidation error={this.state.errorValidation.email}/>}
                                        </div>
                                        <div className={css.form_group}>
                                            <label htmlFor="inputPassword1">Password:</label>
                                            <input type="password" className={css.form_control}
                                                   style={{borderColor: this.state.errorValidation.colorPasswordInput}}
                                                   name='password'
                                                   value={this.state.password} onChange={this.onChange}
                                                   placeholder="Password"/>
                                            {this.state.errorValidation.email &&
                                            <ErrorValidation error={this.state.errorValidation.password}/>}
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