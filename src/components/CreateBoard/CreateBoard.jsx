import React, {useEffect, useState} from "react";
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import ErrorValidation from "../Errors/ErrorValidation/ErrorValidation";
import {Preloader} from "../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {
    localStorageRemoveItemRequest,
} from "../../reducers/auth";
import {iconsRequest} from "../../reducers/icons";
import {categoriesRequest} from "../../reducers/categories";
import {boardPostRequest} from "../../reducers/board";
import Button, {SvgButton} from "../../styledComponents/Button";
import {Header, HeaderNav, HeaderNavItem} from "../../styledComponents/Header";
import {Body, BodyWrapperForm, ButtonsWrapper, Form, FormWrapper} from "../../styledComponents/Body";
import Footer from "../../styledComponents/Footer";
import {FormGroup, FormInput, FormSelect} from "../../styledComponents/Form";
import {Title} from "../../styledComponents/Title";


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
                <div>
                    <Header>
                        <h1>MiniJira</h1>
                        <HeaderNav>
                            <HeaderNavItem onClick={() => {
                                customHistory.push('/dashboard')
                            }}>
                                Back
                            </HeaderNavItem>
                            <HeaderNavItem onClick={() => {
                                dispatch(localStorageRemoveItemRequest({key: 'TOKEN'}));
                            }}>
                                Log Out
                            </HeaderNavItem>
                        </HeaderNav>
                    </Header>
                    <Body>
                        <BodyWrapperForm>
                            <FormWrapper>
                                <Title>
                                    Add Field
                                </Title>
                                <Form>
                                    <FormGroup>
                                        <label htmlFor="title">Title:</label>
                                        <FormInput type="text"
                                                   style={{borderColor: errorsValidation && errorsValidation.title ? 'red' : null}}
                                                   name='title'
                                                   value={formPost.title}
                                                   onChange={onChange}
                                                   placeholder="Title"/>
                                        {errorsValidation && errorsValidation.title &&
                                        <ErrorValidation error={errorsValidation.title}/>}
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="key">Key:</label>
                                        <FormInput type="text" name='key'
                                                   value={formPost.key}
                                                   style={{borderColor: errorsValidation && errorsValidation.key ? 'red' : null}}
                                                   onChange={onChange}
                                                   placeholder="Key"/>
                                        {errorsValidation && errorsValidation.key &&
                                        <ErrorValidation error={errorsValidation.key}/>}
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="category">Categories:</label>
                                        <FormSelect
                                                value={formPost.category.value || ''}
                                                onChange={onChangeCategoryAndIcon} name="category">
                                            <option value={''} disabled>Select category
                                            </option>
                                            {categories.map((item, index) => {
                                                return <option key={index}>{item.value}</option>
                                            })}
                                        </FormSelect>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="icon">Icons:</label>
                                        <FormSelect
                                                value={formPost.icon.value || ''}
                                                onChange={onChangeCategoryAndIcon} name="icon">
                                            <option value={''} disabled>Select icon</option>
                                            {icons.map((item, index) => {
                                                return <option key={index}>{item.value}</option>
                                            })}
                                        </FormSelect>
                                    </FormGroup>
                                    <ButtonsWrapper>
                                        <Button onClick={onSubmit}>
                                            <SvgButton/>
                                            Add
                                        </Button>
                                        <Button onClick={isCancel}>
                                            <SvgButton/>
                                            Cancel
                                        </Button>
                                    </ButtonsWrapper>
                                </Form>
                            </FormWrapper>
                                {(errorBoard || errorAuth || errorIconsAuth || errorCategoriesAuth) && <ErrorMessage/>}
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

export default CreateBoard;

