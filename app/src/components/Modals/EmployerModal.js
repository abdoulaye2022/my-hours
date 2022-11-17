import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import { Button, Input, Form, Select } from 'semantic-ui-react';
import { employerActions } from "../../redux/actions/employers.actions";
import { shiftActions } from "../../redux/actions/shifts.actions";

const statutOptions = [
    { key: '0', text: 'Actif', value: 1 },
    { key: '1', text: 'Inactif', value: 0 }
];

export const EmployerModal = ({ employer, setEmployer }) => {
    const auth = useSelector(state => state.user.user);
    const modal = useSelector(state => state.employer.modal);
    const jobs = useSelector(state => state.job.items);
    const dispatch = useDispatch();

    const formikemployer = useFormik({
        initialValues: { name_emp: '', statut: 1 },
        validate: values => {
            const errors = {};
            if (!values.name_emp) {
                errors.name_emp = 'Nom est obligatoire';
            }

            // if (values.statut !== 0 && values.statut !== 1) {
            //     errors.statut = 'Nom est obligatoire';
            // }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            if (Object.keys(employer).length === 0) {
                dispatch(employerActions.add(values.name_emp, values.statut, auth.id));
            }
            else {
                dispatch(employerActions.update(employer.id, values.name_emp, values.statut, updateEmployer));
            }
        }
    });

    const updateEmployer = () => {
        dispatch(shiftActions.updateEmployerStatut([...jobs.filter(p => p.employer_id === employer.id)]));
    }

    return (
        <>
            <Modal
                show={modal}
                onHide={() => {
                    formikemployer.resetForm();
                    formikemployer.setErrors({});
                    setEmployer({});
                    dispatch(employerActions.modalEmployer())
                }}
                onExiting={() => {
                    formikemployer.resetForm();
                    formikemployer.setErrors({});
                    setEmployer({});
                }}
                onShow={() => {
                    if (Object.keys(employer).length !== 0) {
                        formikemployer.setFieldValue('name_emp', employer.name_emp);
                        formikemployer.setFieldValue('statut', employer.statut);
                    }
                }}
                centered>
                <Modal.Header closeButton style={{ backgroundColor: "#647295", color: "white", fontWeight: "bold" }}>
                    <Modal.Title>{Object.keys(employer).length === 0 ? ("Ajouter un employeur") : ("Modifier un employeur")}</Modal.Title>
                </Modal.Header>
                <Formik>
                    <Form onSubmit={formikemployer.handleSubmit}>
                        <Modal.Body>

                            <Form.Field>
                                <label>Nom</label>
                                <Input
                                    id="name_emp"
                                    type="text"
                                    name="name_emp"
                                    onChange={formikemployer.handleChange}
                                    onBlur={formikemployer.handleBlur}
                                    placeholder="Entrer le nom de l'employeur..."
                                    value={formikemployer.values.name_emp} />
                                <span style={{ color: "#9F496E", display: "wrap" }}>{formikemployer.errors.name_emp && formikemployer.touched.name_emp && formikemployer.errors.name_emp}</span>
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontWeight: "normal" }}>Statut</label>
                                <Select
                                    id="statut"
                                    name="statut"
                                    onChange={(e, selected) => {
                                        formikemployer.setFieldValue("statut", selected.value);
                                    }}
                                    //onBlur={formikemployer.handleBlur}
                                    options={statutOptions}
                                    placeholder="Selectionner le statut de l'employeur..."
                                    value={formikemployer.values.statut}
                                    //defaultValue={1}
                                    search />
                            </Form.Field>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="secondary" onClick={() => dispatch(employerActions.modalEmployer())}>
                                Annuler
                            </Button>
                            <Button primary type="submit" style={{ backgroundColor: "#647295", color: "white" }}>
                                Enregistrer
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
}