import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react';
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import { Country, State, City } from 'country-state-city';

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

const genreOptions = [
    { key: 'm', text: 'Maxculin', value: 'M' },
    { key: 'f', text: 'Feminin', value: 'F' },
    { key: 'o', text: 'Autre', value: 'A' },
]

const Profile = () => {
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const c = [...Country.getAllCountries().map((p, i) => {
            return { key: i, text: p.name, value: p.isoCode };
        })];
        setCountries(c);
    }, [setCountries]);


    return (
        <>
            <Container fluid style={{ marginTop: 25 }}>
                <Row>
                    <Col xs={0} md={2} lg={2}></Col>
                    <Col xs={12} md={8} lg={8}>
                        <Formik
                            initialValues={{ firstname: '', lastname: '', gender: '', country: '', province: '', city: '', bio: '', email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.firstname) {
                                    errors.firstname = 'Prénom est obligatoire';
                                }

                                if (!values.lastname) {
                                    errors.lastname = 'Nom est obligatoire';
                                }

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
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >{({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue
                            /* and other goodies */
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label style={{ fontWeight: "normal" }}>Prénom</label>
                                        <Input
                                            type="text"
                                            name="firstname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Entrer votre prénom...'
                                        />
                                        <span style={{ color: "#9F496E", display: "wrap" }}>{errors.firstname && touched.firstname && errors.firstname}</span>
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{ fontWeight: "normal" }}>Nom</label>
                                        <Input
                                            type="text"
                                            name="lastname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Entrer votre nom...' />
                                        <span style={{ color: "#9F496E", display: "block" }}>{errors.lastname && touched.lastname && errors.lastname}</span>
                                    </Form.Field>

                                    <Form.Field>
                                        <label style={{ fontWeight: "normal" }}>Genre</label>
                                        <Select
                                            name="gender"
                                            onChange={(e, selected) => {
                                                setFieldValue("gender", selected.value);
                                            }}
                                            onBlur={(e, selected) => {
                                                setFieldValue("gender", selected.value);
                                            }}
                                            options={genreOptions}
                                            placeholder='Selectionner votre genre...'
                                            search />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label style={{ fontWeight: "normal" }}>Pays</label>
                                        <Select
                                            name="country"
                                            onChange={(e, selected) => {
                                                setCountry(selected.value)
                                                const s = [...State.getStatesOfCountry(selected.value).map((p, i) => {
                                                    return { key: i, text: p.name, value: p.isoCode };
                                                })];
                                                setStates(s);
                                                setFieldValue("country", selected.value);
                                            }}
                                            options={countries}
                                            placeholder='Selectionner votre pays...'
                                            search />
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{ fontWeight: "normal" }}>Province</label>
                                        <Select
                                            name="province"
                                            onChange={(e, selected) => {
                                                const c = [...City.getCitiesOfState(country, selected.value).map((p, i) => {
                                                    return { key: i, text: p.name, value: p.name };
                                                })];
                                                setCities(c);
                                                setFieldValue('province', selected.value);
                                            }}
                                            options={states}
                                            placeholder='Selectionner votre province...'
                                            search />
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{ fontWeight: "normal" }}>Ville</label>
                                        <Select
                                            name="city"
                                            onChange={(e, selected) => {
                                                setFieldValue('city', selected.value);
                                            }}
                                            options={cities}
                                            placeholder='Selectionner votre ville...'
                                            search />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <label style={{ fontWeight: "normal" }}>Bio</label>
                                    <TextArea name="bio"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Entrer votre bio...' />
                                </Form.Field>
                                <Form.Field>
                                    <label style={{ fontWeight: "normal" }}>E-mail</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='joe@schmoe.com' />
                                    <span style={{ color: "#9F496E", display: "block" }}>{errors.email && touched.email && errors.email}</span>
                                </Form.Field>

                                <Form.Field>
                                    <label style={{ fontWeight: "normal" }}>Mot de passe</label>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Entrer votre mot de passe' />
                                    <span style={{ color: "#9F496E", display: "block" }}>{errors.password && touched.password && errors.password}</span>
                                </Form.Field>

                                <Form.Field>
                                    <label style={{ fontWeight: "normal" }}>Confirmation mot de passe</label>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Entrer votre mot de passe' />
                                    <span style={{ color: "#9F496E", display: "block" }}>{errors.password && touched.password && errors.password}</span>
                                </Form.Field>

                                <Form.Field
                                    id='form-button-control-public'
                                    control={Button}
                                    content='Confirm'
                                />
                            </Form>
                        )}
                        </Formik>
                    </Col>
                </Row>
            </Container></>
    );
}

export default Profile;