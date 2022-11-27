import React, { useEffect, useState } from "react";
import { ThemeProvider, Container, Row, Col } from "react-bootstrap";
import { Form, Input, Tab, Button, Loader, Segment, Divider, Dropdown, Message } from "semantic-ui-react";
import "./Login.css";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/users.actions";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { detectMob } from "../helpers/heleprs";
import { FormattedMessage } from 'react-intl'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.error.error);
    const loading = useSelector((state) => state.user.loading);
    const createdAccount = useSelector(state => state.user.createdAccount);
    //const is_admin = useSelector(state => state.user.user.is_admin);
    const [passwordForgrt, setPasswordForget] = useState(false);
    const resetPassword = useSelector(state => state.user.resetPassword);
    const token = useSelector(state => state.user.user.access_token);

    let lang = navigator.language.split(/[-_]/)[0];

    useEffect(() => {
        dispatch(userActions.logout(redirectToLogin));
    }, []);

    const redirectToHome = () => {
        return navigate("/");
    };

    const redirectToCreateAccount = () => {
        return navigate("/creer-un-compte");
    }

    const redirectToDashboard = () => {
        return navigate("/dashboard");
    };

    const redirectToResetPassword = () => {
        return navigate("/reinitialiser-mot-de-passe");
    }

    const redirectToLogin = () => {
        return navigate('/');
    }

    const formiklogin = useFormik({
        initialValues: { email: "", password: "" },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'E-mail est obligatoire';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'E-mail est invalid';
            }

            if (!values.password) {
                errors.password = "Mot de passe est obligatoire";
            } else if (values.password.length < 6) {
                errors.password = "Mot de passe doit être supérieur à 6 caractères";
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            dispatch(
                userActions.login(
                    values.email,
                    values.password,
                    redirectToHome,
                    redirectToDashboard,
                    currentDate
                )
            );
        },
    });

    const formikcompte = useFormik({
        initialValues: { firstname: "", lastname: "", email: "", password: "" },
        validate: (values) => {
            const errors = {};
            if (!values.firstname) {
                errors.firstname = "Prénom est obligatoire";
            }

            if (!values.lastname) {
                errors.lastname = "Nom est obligatoire";
            }

            if (!values.email) {
                errors.email = 'E-mail est obligatoire';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'E-mail est invalid';
            }

            if (!values.password) {
                errors.password = "Mot de passe est obligatoire";
            } else if (values.password.length < 6) {
                errors.password = "Mot de passe doit être supérieur à 6 caractères";
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            dispatch(userActions.register(values.firstname, values.lastname, values.email, values.password, redirectToCreateAccount, currentDate));
        },
    });

    const formikforgetPassword = useFormik({
        initialValues: { password: "" },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'E-mail est obligatoire';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'E-mail est invalid';
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            dispatch(userActions.resetUserPassword(values.email, redirectToResetPassword, redirectToHome))
        },
    });

    const formikresetpassword = useFormik({
        initialValues: { password: "", password2: "" },
        validate: (values) => {
            const errors = {};
            if (!values.password) {
                errors.password = 'Mot de passe est obligatoire';
            } else if (values.password.length < 6) {
                errors.password = "Mot de passe doit être supérieur à 6 caractères";
            }

            if (!values.password2) {
                errors.password2 = 'Mot de passe de confirmation est obligatoire';
            }

            if (values.password != values.password2) {
                errors.password2 = 'Mot de passe de confirmation doit etre le meme que votre mot de passe';
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            dispatch(userActions.newPasswordUser(token, values.password, redirectToHome));
        },
    });

    const panes = [
        {
            menuItem: "Authentification",
            render: () => (
                <div style={{ paddingTop: 10 }}>
                    {error ? (
                        <Message
                            error
                            content={error} />
                    ) : (null)}
                    {createdAccount ? (
                        <Message
                            success
                            content={createdAccount}
                        />
                    ) : null}
                    <Formik>
                        <Form id="login" onSubmit={formiklogin.handleSubmit}>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>
                                    E-mail
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Entrer votre adress courriel"
                                    onChange={formiklogin.handleChange}
                                    onBlur={formiklogin.handleBlur}
                                    value={formiklogin.values.email}
                                />
                                <span style={{
                                    color: "#9F496E",
                                    display: "wrap",
                                }}>{formiklogin.errors.email &&
                                    formiklogin.touched.email &&
                                    formiklogin.errors.email}</span>
                            </Form.Field>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>
                                    Mot de passe
                                </label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Entrer votre mot de passe"
                                    onChange={formiklogin.handleChange}
                                    onBlur={formiklogin.handleBlur}
                                    value={formiklogin.values.password}
                                    error={formiklogin.errors.password &&
                                        formiklogin.touched.password &&
                                        formiklogin.errors.password}
                                />
                                <span style={{
                                    color: "#9F496E",
                                    display: "wrap",
                                }}>{formiklogin.errors.password &&
                                    formiklogin.touched.password &&
                                    formiklogin.errors.password}</span>
                            </Form.Field>
                            <Form.Field>
                                <Button type="submit" style={{ backgroundColor: "#647295", color: "white" }}>Se connecter</Button>
                            </Form.Field>
                            <Form.Field>
                                <span style={{
                                    color: "#D35269",
                                    cursor: "pointer",
                                    float: "right"
                                }} onClick={() => setPasswordForget(true)}><FormattedMessage id="forget-pass" defaultMessage="Mot de passe oublié?" /></span>
                            </Form.Field>
                        </Form>
                    </Formik>
                </div>
            ),
        },
        {
            menuItem: "Créer un compte",
            render: () => (
                <div style={{ paddingTop: 10 }}>
                    <Formik>
                        <Form id="created" onSubmit={formikcompte.handleSubmit}>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>Prénom</label>
                                <Input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    placeholder="Entrer votre prénom"
                                    onChange={formikcompte.handleChange}
                                    onBlur={formikcompte.handleBlur}
                                    value={formikcompte.values.firstname}
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap"
                                    }}
                                >
                                    {formikcompte.errors.firstname &&
                                        formikcompte.touched.firstname &&
                                        formikcompte.errors.firstname}
                                </span>
                            </Form.Field>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>Nom</label>
                                <Input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    placeholder="Entrer votre nom"
                                    onChange={formikcompte.handleChange}
                                    onBlur={formikcompte.handleBlur}
                                    value={formikcompte.values.lastname}
                                />
                                <span style={{
                                    color: "#9F496E",
                                    display: "wrap",
                                }}>{formikcompte.errors.lastname &&
                                    formikcompte.touched.lastname &&
                                    formikcompte.errors.lastname}</span>
                            </Form.Field>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>E-mail</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Entrer votre e-mail"
                                    onChange={formikcompte.handleChange}
                                    onBlur={formikcompte.handleBlur}
                                    value={formikcompte.values.email}
                                />
                                <span style={{
                                    color: "#9F496E",
                                    display: "wrap",
                                }}>{formikcompte.errors.email &&
                                    formikcompte.touched.email &&
                                    formikcompte.errors.email}</span>
                            </Form.Field>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>Password</label>
                                <Form.Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Entrer votre mot de passe"
                                    onChange={formikcompte.handleChange}
                                    onBlur={formikcompte.handleBlur}
                                    value={formikcompte.values.password}
                                />
                                <span style={{
                                    color: "#9F496E",
                                    display: "wrap",
                                }}>{formikcompte.errors.password &&
                                    formikcompte.touched.password &&
                                    formikcompte.errors.password}</span>
                            </Form.Field>
                            <Form.Field>
                                <Button type="submit" style={{ backgroundColor: "#647295", color: "white" }}>Créer un compte</Button>
                            </Form.Field>
                        </Form>
                    </Formik>
                </div>
            ),
        },
    ];

    const panesPassword = [
        {
            menuItem: "Mot de passe oublié?",
            render: () => (
                <div style={{ paddingTop: 10 }}>
                    <Formik>
                        <Form id="created" onSubmit={formikforgetPassword.handleSubmit}>
                            <span style={{
                                color: "#9F496E",
                                display: "wrap"
                            }}>{error}</span>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>E-mail</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Entrer votre e-mail"
                                    onChange={formikforgetPassword.handleChange}
                                    onBlur={formikforgetPassword.handleBlur}
                                    value={formikforgetPassword.values.email}
                                />
                                <span style={{
                                    color: "#9F496E",
                                    display: "wrap",
                                }}>{formikforgetPassword.errors.email &&
                                    formikforgetPassword.touched.email &&
                                    formikforgetPassword.errors.email}</span>
                            </Form.Field>
                            <Form.Field>
                                <Button onClick={() => {
                                    setPasswordForget(false);
                                    dispatch(userActions.logout(redirectToLogin));
                                }}>Annuler</Button>
                                <Button type="submit" style={{ backgroundColor: "#647295", color: "white" }}>Envoyer</Button>
                            </Form.Field>
                        </Form>
                    </Formik>
                </div>
            ),
        },
    ];

    const panesNewPassword = [
        {
            menuItem: " Réinitialisation de mot de passe",
            render: () => (
                <div style={{ paddingTop: 10 }}>
                    <Formik>
                        <Form id="created" onSubmit={formikresetpassword.handleSubmit}>
                            <span style={{
                                color: "#9F496E",
                                display: "wrap"
                            }}>{error}</span>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>Nouveau mot de passe</label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Entrer votre mot de passe"
                                    onChange={formikresetpassword.handleChange}
                                    onBlur={formikresetpassword.handleBlur}
                                    value={formikresetpassword.values.password}
                                />
                                <span style={{
                                    color: "#9F496E",
                                    display: "wrap",
                                }}>{formikresetpassword.errors.password &&
                                    formikresetpassword.touched.password &&
                                    formikresetpassword.errors.password}</span>
                            </Form.Field>
                            <Form.Field required>
                                <label style={{ fontWeight: "normal" }}>Confime Nouveau mot de passe</label>
                                <Input
                                    id="password2"
                                    name="password2"
                                    type="password"
                                    placeholder="Entrer votre mot de passe à nouveau"
                                    onChange={formikresetpassword.handleChange}
                                    onBlur={formikresetpassword.handleBlur}
                                    value={formikresetpassword.values.password2}
                                />
                                <span style={{
                                    color: "#9F496E",
                                    display: "wrap",
                                }}>{formikresetpassword.errors.password2 &&
                                    formikresetpassword.touched.password2 &&
                                    formikresetpassword.errors.password2}</span>
                            </Form.Field>
                            <Form.Field>
                                <Button type="submit" style={{ backgroundColor: "#647295", color: "white" }}>Enregistrer</Button>
                            </Form.Field>
                        </Form>
                    </Formik>
                </div>
            ),
        },
    ];

    return (
        <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
        >
            <Container fluid>
                <Row>
                    {detectMob() ? (null) : (
                        <Col
                            xs={0}
                            sm={0}
                            md
                            //className="d-none d-lg-block"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                                color: "white",
                                backgroundColor: "#647295"
                            }}
                        >
                            <h1 style={{
                                fontSize: "6em"
                            }}>My-Hours</h1>
                        </Col>
                    )}
                    <Col
                        xs={12}
                        sm={12}
                        md
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            flexDirection: "column",
                        }}
                    >
                        <Dropdown text={lang.toUpperCase()} style={{ position: "absolute", top: 40, right: 40 }}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='FR' />
                                <Dropdown.Item text='EN' />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Segment style={{ border: "1px solid #d4d4d5" }}>
                            <h1 style={{ color: "#647295", textAlign: "center" }}>My-Hours</h1>
                            <Divider />
                            <Loader content='Loading' active={loading} />
                            <Tab panes={resetPassword ? panesNewPassword : (passwordForgrt ? panesPassword : panes)} />
                        </Segment>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
