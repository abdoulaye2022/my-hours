import React, { useEffect, useState } from "react";
import { ThemeProvider, Container, Row, Col } from "react-bootstrap";
import { Form, Input, Tab, Button, Loader, Segment } from "semantic-ui-react";
import "./Login.css";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/users.actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const error = useSelector(state => state.user.error);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        dispatch(userActions.actualiseLoginPage());
    }, []);

    const redirectToHome = () => {
        return navigator("/");
    };

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
                errors.password = "Mot de passe doit être supérieur à 4 caractères";
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            dispatch(
                userActions.login(
                    values.email,
                    values.password,
                    redirectToHome
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
            dispatch(userActions.register(values.firstname, values.lastname, values.email, values.password, redirectToHome));
        },
    });

    const panes = [
        {
            menuItem: "Authentification",
            render: () => (
                <div style={{ paddingTop: 10 }}>
                    <span style={{
                        color: "#9F496E",
                        display: "wrap"
                    }}>{error}</span>
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

    return (
        <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
        >
            <Container fluid>
                <Row>
                    <Col
                        xs={0}
                        sm={0}
                        md
                        style={{ backgroundColor: "#647295" }}
                        className="d-none d-lg-block"
                    >
                        Logo
                    </Col>
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
                        <Segment style={{ border: "1px solid #d4d4d5" }}>
                            <Loader content='Loading' active={loading} />
                            <Tab panes={panes} />
                        </Segment>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
