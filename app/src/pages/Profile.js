import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Container, Row, Col } from "react-bootstrap";
import {
    Form,
    Input,
    TextArea,
    Button,
    Select,
    Loader,
} from "semantic-ui-react";
import { Formik, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import { userActions } from "../redux/actions/users.actions";

const genderOptions = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" },
];

const genreOptions = [
    { key: "m", text: "Maxculin", value: "M" },
    { key: "f", text: "Feminin", value: "F" },
    { key: "o", text: "Autre", value: "A" },
];

const Profile = () => {
    const [visible, setVisible] = useState(false);
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const auth = useSelector((state) => state.user.user);
    const loading = useSelector(state => state.user.loading);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            gender: "",
            country: "",
            province: "",
            city: "",
            bio: "",
            email: "",
            password: "",
            password2: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.firstname) {
                errors.firstname = "Prénom est obligatoire";
            }

            if (!values.lastname) {
                errors.lastname = "Nom est obligatoire";
            }

            // if (!values.email) {
            //     errors.email = 'E-mail est obligatoire';
            // } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            // ) {
            //     errors.email = 'E-mail est invalide';
            // }

            // if (!values.password) {
            //     errors.password = "Mot de passe est obligatoir"
            // }

            // if (!values.password2) {
            //     errors.password2 = "Mot de passe de confirmation est obligatoire"
            // }

            if (values.password !== values.password2) {
                errors.password2 =
                    "Mot de passe de confirmation doit etre le meme que le mot de passe";
            }

            return errors;
        },
        onSubmit: (values) => {
            console.log(values);
            dispatch(
                userActions.update(
                    auth.id,
                    values.firstname,
                    values.lastname,
                    values.gender,
                    values.country,
                    values.province,
                    values.city,
                    values.bio,
                    values.password
                )
            );
        },
    });

    useEffect(() => {
        const c = [
            ...Country.getAllCountries().map((p, i) => {
                return { key: i, text: p.name, value: p.isoCode };
            }),
        ];
        setCountries(c);

        if (auth.country) {
            setCountry(auth.country);
            const st = [
                ...State.getStatesOfCountry(auth.country).map((p, i) => {
                    return { key: i, text: p.name, value: p.isoCode };
                }),
            ];
            setStates(st);
        }

        if (auth.province) {
            const c = [
                ...City.getCitiesOfState(auth.country, auth.province).map(
                    (p, i) => {
                        return { key: i, text: p.name, value: p.name };
                    }
                ),
            ];
            setCities(c);
        }

        formik.setFieldValue("firstname", auth.firstname);
        formik.setFieldValue("lastname", auth.lastname);
        formik.setFieldValue("gender", auth.gender);
        formik.setFieldValue("country", auth.country);
        formik.setFieldValue("province", auth.province);
        formik.setFieldValue("city", auth.city);
        formik.setFieldValue("bio", auth.bio);
        formik.setFieldValue("email", auth.email);

        return () => {
            setVisible(true);
        };
    }, [setCountries, auth]);

    return (
        <>
            <Container fluid style={{ marginTop: 25, paddingBottom: 30 }}>
                <Loader content='Loading' active={loading} />
                <Row>
                    <Col xs={0} md={2} lg={2}></Col>
                    <Col xs={12} md={8} lg={8}>
                        <Formik>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group widths="equal">
                                    <Form.Field required>
                                        <label
                                            style={{ fontWeight: "normal" }}
                                        >
                                            Prénom
                                        </label>
                                        <Input
                                            id="firsname"
                                            type="text"
                                            name="firstname"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Entrer votre prénom..."
                                            value={formik.values.firstname}
                                        />
                                        <span
                                            style={{
                                                color: "#9F496E",
                                                display: "wrap",
                                            }}
                                        >
                                            {formik.errors.firstname &&
                                                formik.touched.firstname &&
                                                formik.errors.firstname}
                                        </span>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label
                                            style={{ fontWeight: "normal" }}
                                        >
                                            Nom
                                        </label>
                                        <Input
                                            id="lastname"
                                            type="text"
                                            name="lastname"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Entrer votre nom..."
                                            value={formik.values.lastname}
                                        />
                                        <span
                                            style={{
                                                color: "#9F496E",
                                                display: "block",
                                            }}
                                        >
                                            {formik.errors.lastname &&
                                                formik.touched.lastname &&
                                                formik.errors.lastname}
                                        </span>
                                    </Form.Field>

                                    <Form.Field>
                                        <label
                                            style={{ fontWeight: "normal" }}
                                        >
                                            Genre
                                        </label>
                                        <Select
                                            id="gender"
                                            name="gender"
                                            onChange={(e, selected) => {
                                                formik.setFieldValue(
                                                    "gender",
                                                    selected.value
                                                );
                                            }}
                                            onBlur={formik.handleBlur}
                                            options={genreOptions}
                                            placeholder="Selectionner votre genre..."
                                            value={formik.values.gender}
                                            search
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label
                                            style={{ fontWeight: "normal" }}
                                        >
                                            Pays
                                        </label>
                                        <Select
                                            id="country"
                                            name="country"
                                            onChange={(e, selected) => {
                                                setCountry(selected.value);
                                                setCities([]);
                                                const s = [
                                                    ...State.getStatesOfCountry(
                                                        selected.value
                                                    ).map((p, i) => {
                                                        return {
                                                            key: i,
                                                            text: p.name,
                                                            value: p.isoCode,
                                                        };
                                                    }),
                                                ];
                                                setStates(s);
                                                formik.setFieldValue(
                                                    "country",
                                                    selected.value
                                                );
                                            }}
                                            onBlur={formik.handleBlur}
                                            options={countries}
                                            placeholder="Selectionner votre pays..."
                                            value={formik.values.country}
                                            search
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label
                                            style={{ fontWeight: "normal" }}
                                        >
                                            Province
                                        </label>
                                        <Select
                                            type="province"
                                            name="province"
                                            onChange={(e, selected) => {
                                                const c = [
                                                    ...City.getCitiesOfState(
                                                        country,
                                                        selected.value
                                                    ).map((p, i) => {
                                                        return {
                                                            key: i,
                                                            text: p.name,
                                                            value: p.name,
                                                        };
                                                    }),
                                                ];
                                                setCities(c);
                                                formik.setFieldValue(
                                                    "province",
                                                    selected.value
                                                );
                                            }}
                                            onBlur={formik.handleBlur}
                                            options={states}
                                            placeholder="Selectionner votre province..."
                                            value={formik.values.province}
                                            search
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label
                                            style={{ fontWeight: "normal" }}
                                        >
                                            Ville
                                        </label>
                                        <Select
                                            id="city"
                                            name="city"
                                            onChange={(e, selected) => {
                                                formik.setFieldValue(
                                                    "city",
                                                    selected.value
                                                );
                                            }}
                                            onBlur={formik.handleBlur}
                                            options={cities}
                                            placeholder="Selectionner votre ville..."
                                            value={formik.values.city}
                                            search
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <label style={{ fontWeight: "normal" }}>
                                        Bio
                                    </label>
                                    <TextArea
                                        id="bio"
                                        name="bio"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Entrer votre bio..."
                                        value={formik.values.bio}
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label style={{ fontWeight: "normal" }}>
                                        E-mail
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="joe@schmoe.com"
                                        value={formik.values.email}
                                        disabled={true}
                                    />
                                    <span
                                        style={{
                                            color: "#9F496E",
                                            display: "block",
                                        }}
                                    >
                                        {formik.errors.email &&
                                            formik.touched.email &&
                                            formik.errors.email}
                                    </span>
                                </Form.Field>

                                <Form.Field>
                                    <label style={{ fontWeight: "normal" }}>
                                        Mot de passe
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        placeholder="Entrer votre mot de passe"
                                    />
                                    <span
                                        style={{
                                            color: "#9F496E",
                                            display: "block",
                                        }}
                                    >
                                        {formik.errors.password &&
                                            formik.touched.password &&
                                            formik.errors.password}
                                    </span>
                                </Form.Field>

                                <Form.Field>
                                    <label style={{ fontWeight: "normal" }}>
                                        Confirmation mot de passe
                                    </label>
                                    <Input
                                        id="password2"
                                        type="password"
                                        name="password2"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password2}
                                        placeholder="Entrer votre mot de passe"
                                    />
                                    <span
                                        style={{
                                            color: "#9F496E",
                                            display: "block",
                                        }}
                                    >
                                        {formik.errors.password2 &&
                                            formik.touched.password2 &&
                                            formik.errors.password2}
                                    </span>
                                </Form.Field>

                                <Form.Field>
                                    <Button type="submit" style={{ backgroundColor: "#647295", color: "white" }}>
                                        Enregistrer
                                    </Button>
                                </Form.Field>
                            </Form>
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Profile;
