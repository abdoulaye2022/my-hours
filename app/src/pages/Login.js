import React, { useState } from "react";
import { ThemeProvider, Container, Row, Col } from "react-bootstrap";
import { Form, Input, Dimmer, Tab, Button } from "semantic-ui-react";
import "./Login.css";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/users.actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const loading = useSelector((state) => state.user.loading);

    const redirectToHome = () => {
        return navigator("/");
    };

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
                errors.email = "E-mail est obligatoire";
            }

            if (!values.password) {
                errors.password = "Nom est obligatoire";
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);
        },
    });

    const panes = [
        {
            menuItem: "Authentification",
            render: () => (
                <div style={{ paddingTop: 10 }}>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = "E-mail est obligatoire";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                )
                            ) {
                                errors.email = "E-mail est invalide";
                            }

                            if (!values.password) {
                                errors.password = "Mot de passe est obligatoir";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(
                                userActions.login(
                                    values.email,
                                    values.password,
                                    redirectToHome
                                )
                            );
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <Form id="login" onSubmit={handleSubmit}>
                                <Form.Field required>
                                    <label style={{ fontWeight: "normal" }}>
                                        E-mail
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Entrer votre adress courriel"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        //style={{ width: 300 }}
                                    />
                                    <span
                                        style={{
                                            color: "#9F496E",
                                            display: "block",
                                        }}
                                    >
                                        {errors.email &&
                                            touched.email &&
                                            errors.email}
                                    </span>
                                </Form.Field>
                                <Form.Field required>
                                    <label style={{ fontWeight: "normal" }}>
                                        Mot de passe
                                    </label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Entrer votre mot de passe"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        //style={{ width: 300 }}
                                    />
                                    <span
                                        style={{
                                            color: "#9F496E",
                                            display: "block",
                                        }}
                                    >
                                        {errors.password &&
                                            touched.password &&
                                            errors.password}
                                    </span>
                                </Form.Field>
                                <Form.Button>Se connecter</Form.Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            ),
        },
        {
            menuItem: "Créer un compte",
            render: () => (
                <div style={{ paddingTop: 10 }}>
                    <Formik>
                        <Form onSubmit={formikcompte.handleSubmit}>
                            <Form.Field required>
                                <span>Prénom</span>
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
                                        display: "wrap",
                                    }}
                                >
                                    {formikcompte.errors.firstname &&
                                        formikcompte.touched.firstname &&
                                        formikcompte.errors.firstname}
                                </span>
                            </Form.Field>
                            <Form.Field required>
                                <span>Nom</span>
                                <Input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    placeholder="Entrer votre nom"
                                    onChange={formikcompte.handleChange}
                                    onBlur={formikcompte.handleBlur}
                                    value={formikcompte.values.lastname}
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap",
                                    }}
                                >
                                    {formikcompte.errors.lastname &&
                                        formikcompte.touched.lastname &&
                                        formikcompte.errors.lastname}
                                </span>
                            </Form.Field>
                            <Form.Field required>
                                <span>E-mail</span>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Entrer votre e-mail"
                                    onChange={formikcompte.handleChange}
                                    onBlur={formikcompte.handleBlur}
                                    value={formikcompte.values.email}
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap",
                                    }}
                                >
                                    {formikcompte.errors.email &&
                                        formikcompte.touched.email &&
                                        formikcompte.errors.email}
                                </span>
                            </Form.Field>
                            <Form.Field required>
                                <span>Password</span>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Entrer votre mot de passe"
                                    onChange={formikcompte.handleChange}
                                    onBlur={formikcompte.handleBlur}
                                    value={formikcompte.values.password}
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap",
                                    }}
                                >
                                    {formikcompte.errors.password &&
                                        formikcompte.touched.password &&
                                        formikcompte.errors.password}
                                </span>
                            </Form.Field>
                            <Form.Field>
                                <Button type="submit">Créer un compte</Button>
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
                        <Tab panes={panes} />
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
