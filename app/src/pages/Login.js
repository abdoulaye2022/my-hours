import React, { useState } from "react";
import { ThemeProvider, Container, Row, Col } from 'react-bootstrap';
import { Form, Input, Dimmer, Loader } from 'semantic-ui-react';
import "./Login.css";
import { Formik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/users.actions";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const loading = useSelector(state => state.user.loading);

    const redirectToHome = () => {
        return navigator('/');
    }

    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <Container fluid>
                <Row>
                    <Col xs={0} sm={0} md style={{ backgroundColor: "#647295" }}>Logo</Col>
                    <Col xs={12} sm={12} md style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'E-mail est obligatoire';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'E-mail est invalide';
                                }

                                if (!values.password) {
                                    errors.password = "Mot de passe est obligatoir"
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                dispatch(userActions.login(values.email, values.password, redirectToHome));
                            }}
                        >{({
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
                                    <label style={{ fontWeight: "normal" }}>E-mail</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder='Entrer votre adress courriel'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        style={{ width: 300 }} />
                                    <span style={{ color: "#9F496E", display: "block" }}>{errors.email && touched.email && errors.email}</span>
                                </Form.Field>
                                <Form.Field required>
                                    <label style={{ fontWeight: "normal" }}>Mot de passe</label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder='Entrer votre mot de passe'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        style={{ width: 300 }} />
                                    <span style={{ color: "#9F496E", display: "block" }}>{errors.password && touched.password && errors.password}</span>
                                </Form.Field>
                                <Form.Button>
                                    Se connecter
                                </Form.Button>
                            </Form>)}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
}

export default Login;