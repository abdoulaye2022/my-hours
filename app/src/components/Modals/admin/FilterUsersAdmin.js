import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Button, Radio, Form, Dropdown, Select, Input } from "semantic-ui-react";
import { userActions } from "../../../redux/actions/users.actions";
import { Country, State, City } from "country-state-city";
import { Formik, useFormik } from "formik";
import DatePicker from "react-datepicker";

const FilterUsersAdmin = () => {
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const filterModal = useSelector(state => state.user.filterModal);
    const dispatch = useDispatch();

    const formikfilter = useFormik({
        initialValues: { is_admin: '', statut: '', country: '', province: '', city: '', date_connexion: '' },
        validate: values => {
            const errors = {};

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values)
        }
    });

    return (
        <>
            <Modal
                show={filterModal}
                onHide={() => {
                    formikfilter.resetForm();
                    formikfilter.setErrors({});
                    dispatch(userActions.filterModal());
                    // if (filterShift)
                    //     dispatch(shiftActions.filterDropdown());
                }}
                onExited={() => {
                formikfilter.resetForm();
                formikfilter.setErrors({});
                }}
                onShow={() => {
                    const c = [
                        ...Country.getAllCountries().map((p, i) => {
                            return { key: i, text: p.name, value: p.isoCode };
                        }),
                    ];
                    setCountries(c);
                    // setStartDate('');
                    // setEndDate('');
                    // formikfilter.resetForm();
                    // formikfilter.setErrors({});
                }}
                centered>
                <Modal.Header closeButton style={{ backgroundColor: "#647295", color: "white", fontWeight: "bold" }}>
                    <Modal.Title>Filtre avancer</Modal.Title>
                </Modal.Header>
                <Formik>
                    <Form onSubmit={formikfilter.handleSubmit}>
                        <Modal.Body>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Dropdown text="Role" name="is_admin">
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    formikfilter.setFieldValue('is_admin', 1);
                                                }}>Admin</Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    formikfilter.setFieldValue('is_admin', 0);
                                                }}>Utilisateur</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label="Actif"
                                        name="statut"
                                        value={(1)}
                                        onChange={(e, { value }) => formikfilter.setFieldValue('statut', value)}
                                        checked={formikfilter.values.statut === 1}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label="Bloquer"
                                        name="statut"
                                        value={(0)}
                                        onChange={(e, { value }) => formikfilter.setFieldValue('statut', value)}
                                        checked={formikfilter.values.statut === 0}
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
                                            formikfilter.setFieldValue(
                                                "country",
                                                selected.value
                                            );
                                        }}
                                        options={countries}
                                        placeholder="Selectionner votre pays..."
                                        value={formikfilter.values.country}
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
                                        id="province"
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
                                            formikfilter.setFieldValue(
                                                "province",
                                                selected.value
                                            );
                                        }}
                                        options={states}
                                        placeholder="Selectionner votre province..."
                                        value={formikfilter.values.province}
                                        search
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
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
                                            formikfilter.setFieldValue(
                                                "city",
                                                selected.value
                                            );
                                        }}
                                        onBlur={formikfilter.handleBlur}
                                        options={cities}
                                        placeholder="Selectionner votre ville..."
                                        value={formikfilter.values.city}
                                        search
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label
                                        style={{ fontWeight: "normal" }}
                                    >
                                        Date de connexion
                                    </label>
                                    <DatePicker
                                        id="date_connexion"
                                        name="date_connexion"
                                        onChange={(date) => {
                                            formikfilter.setFieldValue('date_connexion', date)
                                        }}
                                        selected={formikfilter.values.date_connexion}
                                        value={formikfilter.values.date_connexion} />
                                </Form.Field>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="secondary" onClick={() => dispatch(userActions.filterModal())}>
                                Annuler
                            </Button>
                            <Button primary type="submit" style={{ backgroundColor: "#647295", color: "white" }}>
                                Filtrer
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
}

export default FilterUsersAdmin;