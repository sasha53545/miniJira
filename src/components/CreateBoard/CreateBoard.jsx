import React, {useEffect, useState} from "react";
import css from './CreateBoard.module.css';
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import ErrorValidation from "../Errors/ErrorValidation/ErrorValidation";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {
    localStorageRemoveItemRequest,
} from "../../reducers/auth";
import {iconsRequest} from "../../reducers/icons";
import {categoriesRequest} from "../../reducers/categories";
import {boardPostRequest} from "../../reducers/board";
import {Button, Rectangle, SvgButton} from "../Dashboard/Dashboard";
import {Input} from "../SignIn/SignIn";

const CreateBoard = () => {
    const categories = useSelector(state => state.categories.data);
    const icons = useSelector(state => state.icons.data);
    const loaderCategories = useSelector(state => state.categories.loader);
    const loaderIcons = useSelector(state => state.icons.loader);
    const errorCategoriesAuth = useSelector(state => state.categories.error);
    const errorIconsAuth = useSelector(state => state.icons.error);
    const errorAuth = useSelector(state => state.auth.error);
    const errorBoard = useSelector(state => state.board.error);
    const dataLocalstorage = useSelector(state => state.auth.localstorage.data);
    const dispatch = useDispatch();

    const [formPost, setFormPost] = useState({
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
    });
    const [errorsValidation, setErrorsValidation] = useState(null);

    useEffect(() => {
        dispatch(iconsRequest());
        dispatch(categoriesRequest());
    }, [iconsRequest, categoriesRequest]);

    const onChange = (event) => {
        if (event) {
            event.preventDefault();
        }

        setFormPost({
            ...formPost,
            [event.target.name]: event.target.value
        });
    };

    const onChangeCategoryAndIcon = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (event.target.name === "category") {
            setFormPost({
                ...formPost,
                category: categories.find(
                    item => item.value === event.target.value
                )
            });
        }

        if (event.target.name === "icon") {
            setFormPost({
                ...formPost,
                icon: icons.find(
                    item => item.value === event.target.value
                )
            });
        }
    };

    const onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        let errors = validateForm(formPost);

        if (errors) {
            setErrorsValidation(errors);
            return;
        }

        dispatch(boardPostRequest({token: dataLocalstorage, form: formPost}));
    };

    const validateForm = (formPost) => {
        const errors = {
            title: formPost.title.length === 0 ? 'Title should not be empty' : null,
            key: formPost.key.length === 0 ? 'Key should not be empty' : null,
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

        setFormPost({
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
        });
    };

    return (
        <div>
            {(loaderIcons === true || loaderCategories === true) ?
                <Preloader/> :
                <div className={css.body_wrap}>
                    <header className={css.header}>
                        <div className={css.header_title}>
                            <h1>MiniJira</h1>
                        </div>
                        <div className={css.header_nav}>
                            <div onClick={() => {
                                customHistory.push('/dashboard')
                            }}>
                                Back
                            </div>
                            <div onClick={() => {
                                dispatch(localStorageRemoveItemRequest({key: 'TOKEN'}));
                            }}>
                                Log Out
                            </div>
                        </div>
                    </header>
                    <main className={css.main}>
                        <div className={css.content}>
                            <div className={css.form_block}>
                                <div className={css.title}>
                                    Add Field
                                </div>
                                <form className={css.form}>    {/*Почему onSubmit пишем здесь а не у кнопки, как он понимает к какой из кнопки относится это событие*/}
                                    <div className={css.form_group}>    {/*Первое поле*/}
                                        <label htmlFor="title">Title:</label>
                                        <Input type="text" className={css.form_control}
                                               style={{borderColor: errorsValidation && errorsValidation.title ? 'red' : null}}
                                               name='title'
                                               value={formPost.title}
                                               onChange={onChange}
                                               placeholder="Title"/>
                                        {errorsValidation && errorsValidation.title &&
                                        <ErrorValidation error={errorsValidation.title}/>}
                                    </div>
                                    <div className={css.form_group}>       {/*Второе поле*/}
                                        <label htmlFor="key">Key:</label>
                                        <Input type="text" className={css.form_control} name='key'
                                               value={formPost.key}
                                               style={{borderColor: errorsValidation && errorsValidation.key ? 'red' : null}}
                                               onChange={onChange}
                                               placeholder="Key"/>
                                        {errorsValidation && errorsValidation.key &&
                                        <ErrorValidation error={errorsValidation.key}/>}
                                    </div>
                                    <div className={css.form_group}>   {/*Третье поле*/}
                                        <label htmlFor="category">Categories:</label>
                                        <select className={css.form_control}
                                                value={formPost.category.value || ''}
                                                onChange={onChangeCategoryAndIcon} name="category">
                                            <option value={''} disabled>Select category
                                            </option>
                                            {categories.map((item, index) => {
                                                return <option key={index}>{item.value}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className={css.form_group}>   {/*Четвертое поле*/}
                                        <label htmlFor="icon">Icons:</label>
                                        <select className={css.form_control}
                                                value={formPost.icon.value || ''}
                                                onChange={onChangeCategoryAndIcon} name="icon">
                                            <option value={''} disabled>Select icon</option>
                                            {icons.map((item, index) => {
                                                return <option key={index}>{item.value}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className={css.buttons}>
                                        <Button onClick={onSubmit}>
                                            Add
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
                                {(errorBoard || errorAuth || errorIconsAuth || errorCategoriesAuth) && <ErrorMessage/>}
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

export default CreateBoard;

