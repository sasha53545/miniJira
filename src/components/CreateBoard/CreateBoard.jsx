import React from "react";
import css from './CreateBoard.module.css';
import {customHistory} from "../../App";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";
import {isEmpty} from "../../utils/isEmptyFeild";
import {ErrorValidation} from "../Errors/ErrorValidation/ErrorValidation";
import {updateTokensRequest} from "../../service/auth";
import {boardPostRequest} from "../../service/board";
import {dictionaryRequest} from "../../service/dictionary";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";

export class CreateBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formGet: {
                category: [],
                icon: []
            },
            formPost: {
                title: '',
                key: '',
                category: {
                    key: '',
                    value: ''
                },
                icon: {
                    key: '',
                    value: ''
                }
            },
            errorValidation: {
                title: '',
                key: '',
                validationColor: '',

                colorTitleInput: '',
                colorKeyInput: '',
                colorCategoryInput: '',
                colorIconInput: ''
            },
            errorMessage: '',
        }
    }

    componentDidMount() {
        this.props.isFetching(true);
        dictionaryRequest('categories')
            .then(response => {
                this.setState({
                    formGet: {
                        ...this.state.formGet,
                        category: response
                    }
                });
            })
            .catch(error => {
                this.setState({errorMessage: error.message});
                this.props.isFetching(false);
            });

        dictionaryRequest('board-icons')
            .then(response => {
                this.setState({
                    formGet: {
                        ...this.state.formGet,
                        icon: response
                    }
                });
                this.props.isFetching(false);
            })
            .catch(error => {
                this.setState({errorMessage: error.message});
                this.props.isFetching(false);
            });
    }

    onChange = (event) => {
        if (event) {
            event.preventDefault();
        }

        this.setState({
            formPost: {
                ...this.state.formPost,
                [event.target.name]: event.target.value
            }
        });
    };

    onChangeCategoryAndIcon = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (event.target.name === "category") {
            this.setState({
                formPost: {
                    ...this.state.formPost,
                    category: this.state.formGet.category.find(
                        item => item.value === event.target.value
                    )
                }
            });
        }

        if (event.target.name === "icon") {
            this.setState({
                formPost: {
                    ...this.state.formPost,
                    icon: this.state.formGet.icon.find(
                        item => item.value === event.target.value
                    )
                }
            });
        }
    };

    checkLifeToken = (getToken) => {
        console.log(getToken.accessTokenExpiresIn > Date.now());
        if (getToken.accessTokenExpiresIn > Date.now()) {
            return Promise.resolve();
        } else {
            updateTokensRequest(getToken)
                .then(response => {
                    localStorage.removeItem('TOKEN');
                    localStorage.setItem('TOKEN', JSON.stringify(response));
                })
                .catch(error => {
                    localStorage.removeItem('TOKEN');
                    this.setState({errorMessage: error.message});
                    this.props.isFetching(false);
                });
        }
    };

    onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        let key = '';
        let keyToUpperCase = this.state.formPost.key.toUpperCase();
        let colorKeyInput = '';
        if (!isEmpty(this.state.formPost.key)) {
            key = 'Enter your key!';
            colorKeyInput = 'red';
        } else if (this.state.formPost.key !== keyToUpperCase) {
            key = 'All letters must be uppercase';
            colorKeyInput = 'red';
        } else if (this.state.formPost.key.length > 5) {
            key = 'Maximum key length 5 characters';
            colorKeyInput = 'red';
        }
        let title = '';
        let colorTitleInput = '';
        if(!isEmpty(this.state.formPost.title)) {
            title = 'Enter your title!';
            colorTitleInput = 'red';
        } else {
            title = '';
            colorTitleInput = ''
        }

        this.setState({
            errorValidation: {
                title: title,
                key: key,

                colorKeyInput: colorKeyInput,
                colorTitleInput: colorTitleInput
            }
        });

        if (isEmpty(this.state.formPost.title) && isEmpty(this.state.formPost.key) && this.state.formPost.key === keyToUpperCase && this.state.formPost.key.length <= 5) {
            let getToken = JSON.parse(localStorage.getItem('TOKEN'));
            this.props.isFetching(true);
            this.checkLifeToken(getToken)
                .then(() => {
                    return boardPostRequest(getToken, this.state.formPost);
                })
                .then(() => {
                    customHistory.push('/dashboard');
                    this.props.isFetching(false);
                })
                .catch(error => {
                    if(error.message === "Validation error") {
                        this.setState({
                            errorMessage: error.validation.key.messages[0]
                        });
                    } else {
                        this.setState({
                            errorMessage: error.message
                        });
                    }
                    this.props.isFetching(false);
                });
        }
    };

    isCancel = (event) => {
        if (event) {
            event.preventDefault();
        }

        this.setState({
            formPost: {
                title: '',
                key: '',
                category: {
                    key: '',
                    value: ''
                },
                icon: {
                    key: '',
                    value: ''
                }
            },
        });
    };

    render() {
        return (
            <div>
                {(this.props.stateFetch === true) ?
                    <Preloader/> :
                    <div className={css.create_board}>
                        <header className={css.header}>
                            <div>
                                <h1>MiniJira</h1>
                            </div>
                            <div onClick={() => {
                                customHistory.push('/dashboard')
                            }}>
                                Back
                            </div>
                        </header>
                        <main className={css.main}>
                            <div className={css.form_block}>
                                <div className={css.form_block_without_error_message}>
                                    <div className={css.title_form}>
                                        Add Field
                                    </div>
                                    <form className={css.form}
                                          onSubmit={this.onSubmit}>    {/*Почему onSubmit пишем здесь а не у кнопки, как он понимает к какой из кнопки относится это событие*/}
                                        <div className={css.form_group}>    {/*Первое поле*/}
                                            <label htmlFor="title">Title:</label>
                                            <input type="text" className={css.form_control}
                                                   style={{borderColor: this.state.errorValidation.colorTitleInput}}
                                                   name='title'
                                                   value={this.state.formPost.title}
                                                   onChange={this.onChange}
                                                   placeholder="Title"/>
                                            {this.state.errorValidation.title &&
                                            <ErrorValidation error={this.state.errorValidation.title}/>}
                                        </div>
                                        <div className={css.form_group}>       {/*Второе поле*/}
                                            <label htmlFor="key">Key:</label>
                                            <input type="text" className={css.form_control} name='key'
                                                   value={this.state.formPost.key}
                                                   style={{borderColor: this.state.errorValidation.colorKeyInput}}
                                                   onChange={this.onChange}
                                                   placeholder="Key"/>
                                            {this.state.errorValidation.key &&
                                            <ErrorValidation error={this.state.errorValidation.key}/>}
                                        </div>
                                        <div className={css.form_group}>   {/*Третье поле*/}
                                            <label htmlFor="category">Categories:</label>
                                            <select className={css.form_control}
                                                    style={{borderColor: this.state.errorValidation.colorCategoryInput}}
                                                    value={this.state.formPost.category.value || ''}
                                                    onChange={this.onChangeCategoryAndIcon} name="category">
                                                <option value={''} disabled>Select category
                                                </option>
                                                {this.state.formGet.category.map(item => {
                                                    return <option>{item.value}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className={css.form_group}>   {/*Четвертое поле*/}
                                            <label htmlFor="icon">Icons:</label>
                                            <select className={css.form_control}
                                                    style={{borderColor: this.state.errorValidation.colorIconInput}}
                                                    value={this.state.formPost.icon.value || ''}
                                                    onChange={this.onChangeCategoryAndIcon} name="icon">
                                                <option value={''} disabled>Select icon</option>
                                                {this.state.formGet.icon.map(item => {
                                                    return <option>{item.value}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className={css.buttons}>
                                            <button type="submit" className={css.btn}>Add</button>
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