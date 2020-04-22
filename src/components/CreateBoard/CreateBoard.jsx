import React from "react";
import css from './CreateBoard.module.css';
import {customHistory} from "../../App";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import {isEmpty} from "../../utils/isEmptyFeild";
import ErrorValidation from "../Errors/ErrorValidation/ErrorValidation";
import {updateTokensRequest} from "../../service/auth";
import {boardPostRequest} from "../../service/board";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {connect} from "react-redux";
import {fetchedIconsAction} from "../../reducers/icons";
import {fetchedCategoriesAction} from "../../reducers/categories";
import {errorMessageAction} from "../../reducers/errors";
import {loaderAction} from "../../reducers/flags";

class CreateBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        }
    }

    componentDidMount() {
        this.props.fetchedIconsAction();
        this.props.fetchedCategoriesAction();
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

    checkLifeToken = async (getToken) => {
        if (getToken.accessTokenExpiresIn < Date.now()) {
            try {
                const response = await updateTokensRequest(getToken);
                localStorage.removeItem('TOKEN');
                localStorage.setItem('TOKEN', JSON.stringify(response));
            } catch (error) {
                localStorage.removeItem('TOKEN');
            }
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
        if (!isEmpty(this.state.formPost.title)) {
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
            this.props.loaderAction();
            this.checkLifeToken(getToken)
                .then(() => {
                    return boardPostRequest(getToken, this.state.formPost);
                })
                .then(() => {
                    customHistory.push('/dashboard');
                })
                .catch(error => {
                    if (error.message === "Validation error") {
                        this.props.errorMessageAction(error.validation.key.messages[0]);
                    } else {
                        this.props.errorMessageAction(error.message);
                    }
                })
                .finally(() => {
                    this.props.loaderAction();
                })
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
                {(this.props.loader === true) ?
                    <Preloader/> :
                    <div className={css.body_wrap}>
                        <header className={css.header}>
                            <div className={css.header_title}>
                                <h1>MiniJira</h1>
                            </div>
                            <div className={css.header_nav} onClick={() => {
                                customHistory.push('/dashboard')
                            }}>
                                Back
                            </div>
                        </header>
                        <main className={css.main}>
                            <div className={css.content}>
                                <div className={css.form_block}>
                                    <div className={css.title}>
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
                                                {this.props.categories.map((item, index) => {
                                                    return <option key={index}>{item.value}</option>
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
                                                {this.props.icons.map((item, index) => {
                                                    return <option key={index}>{item.value}</option>
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
                                <div className={css.error_message}>
                                    {this.props.errorMessage && <ErrorMessage/>}
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
}

export default connect(
    (state) => ({
        errorMessage: state.errors.errorMessage,
        loader: state.flags.loader,
        categories: state.categories,
        icons: state.icons
    }),
    (dispatch) => ({
        loaderAction: () => dispatch(loaderAction()),
        fetchedCategoriesAction: () => dispatch(fetchedCategoriesAction()),
        errorMessageAction: () => dispatch(errorMessageAction()),
        fetchedIconsAction: () => dispatch(fetchedIconsAction())
    })
)(CreateBoard);