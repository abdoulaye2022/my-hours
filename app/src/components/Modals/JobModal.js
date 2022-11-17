import React from "react";
import { Modal } from 'react-bootstrap';
import { Formik, useFormik } from 'formik';
import { Button, Input, Form, Select } from 'semantic-ui-react';
import { jobActions } from "../../redux/actions/jobs.actions";
import { useDispatch, useSelector } from "react-redux";

export const JobModal = ({ job, setJob }) => {
    const auth = useSelector(state => state.user.user);
    const modal = useSelector(state => state.job.modal);
    const employers = useSelector(state => state.employer.items);
    const emp = [...employers.map((p, i) => (
        { key: i, text: p.name_emp, value: p.id }
    ))]
    const dispatch = useDispatch();

    const formikjob = useFormik({
        initialValues: { name_job: '', color_job: '', employer_id: '' },
        validate: values => {
            const errors = {};
            if (!values.name_job) {
                errors.name_job = 'Nom est obligatoire';
            }

            if (!values.color_job) {
                errors.color_job = 'Couleur est obligatoire';
            }

            if (!values.employer_id) {
                errors.employer_id = 'Employeur est obligatoire';
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            if (Object.keys(job).length === 0) {
                dispatch(jobActions.add(values.name_job, values.color_job, values.employer_id, auth.id));
            }
            else {
                dispatch(jobActions.update(job.id, values.name_job, values.color_job, values.employer_id));
            }
        }
    });

    return (
        <>
            <Modal
                show={modal}
                onHide={() => {
                    formikjob.resetForm();
                    formikjob.setErrors({});
                    setJob({});
                    dispatch(jobActions.modalJob());
                }}
                onExiting={() => {
                    formikjob.resetForm();
                    formikjob.setErrors({});
                    setJob({});
                }}
                onShow={() => {
                    if (Object.keys(job).length !== 0) {
                        formikjob.setFieldValue('name_job', job.name_job);
                        formikjob.setFieldValue('color_job', job.color_job);
                        formikjob.setFieldValue('employer_id', job.employer_id);
                    }
                }}
                centered>
                <Modal.Header closeButton style={{ backgroundColor: "#647295", color: "white", fontWeight: "bold" }}>
                    <Modal.Title>{Object.keys(job).length === 0 ? ("Ajouter un travail") : ("Modifier un travail")}</Modal.Title>
                </Modal.Header>
                <Formik>
                    <Form onSubmit={formikjob.handleSubmit}>
                        <Modal.Body>

                            <Form.Field>
                                <label>Nom</label>
                                <Input
                                    id="name_job"
                                    type="text"
                                    name="name_job"
                                    onChange={formikjob.handleChange}
                                    onBlur={formikjob.handleBlur}
                                    placeholder="Entrer le nom du travail..."
                                    value={formikjob.values.name_job} />
                                <span style={{ color: "#9F496E", display: "wrap" }}>{formikjob.errors.name_job && formikjob.touched.name_job && formikjob.errors.name_job}</span>
                            </Form.Field>
                            <Form.Field>
                                <label>Couleur</label>
                                <Input
                                    id="color_job"
                                    type="color"
                                    name="color_job"
                                    onChange={formikjob.handleChange}
                                    onBlur={formikjob.handleBlur}
                                    placeholder="Entrer la couleur du travail..."
                                    value={formikjob.values.color_job} />
                                <span style={{ color: "#9F496E", display: "wrap" }}>{formikjob.errors.color_job && formikjob.touched.color_job && formikjob.errors.color_job}</span>
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontWeight: "normal" }}>Employeur</label>
                                <Select
                                    id="employer_id"
                                    name="employer_id"
                                    onChange={(e, selected) => {
                                        formikjob.setFieldValue("employer_id", selected.value);
                                    }}
                                    //onBlur={formikjob.handleBlur}
                                    options={emp}
                                    placeholder="Selectionner l'employeur..."
                                    value={formikjob.values.employer_id}
                                    //defaultValue={1}
                                    search />
                            </Form.Field>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="secondary" onClick={() => dispatch(jobActions.modalJob())}>
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