import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { shiftActions } from "../../redux/actions/shifts.actions";
import { Button, Input, Form, Radio, Select } from 'semantic-ui-react';
import { useFormik, Formik } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";

const FilterModal = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const filterShift = useSelector(state => state.shift.filterShift);
    const filterModal = useSelector(state => state.shift.filterModal);
    const jobs = useSelector((state) => state.job.items);
    const jobsOptions = [
        ...jobs.filter(p => p.statut === 1).map((p, i) => ({ key: i, text: p.name_job, value: p.id })),
    ];

    const dispatch = useDispatch();

    const formikfilter = useFormik({
        initialValues: { statut_shift: '', job_id: '', start_date: '', end_date: '' },
        validate: values => {
            const errors = {};

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            let start_date = moment(values.start_date).format("YYYY-MM-DD HH:mm");
            let end_date = moment(values.end_date).format("YYYY-MM-DD HH:mm");
            dispatch(shiftActions.filterAuthShift(values.statut_shift, values.job_id, start_date, end_date))
            dispatch(shiftActions.filterModal());
        }
    });

    return (
        <>
            <Modal
                show={filterModal}
                onHide={() => {
                    formikfilter.resetForm();
                    formikfilter.setErrors({});
                    dispatch(shiftActions.filterModal());
                    if (filterShift)
                        dispatch(shiftActions.filterDropdown());
                }}
                onExited={() => {
                    formikfilter.resetForm();
                    formikfilter.setErrors({});
                }}
                onShow={() => {
                    setStartDate('');
                    setEndDate('');
                    formikfilter.resetForm();
                    formikfilter.setErrors({});
                }}
                centered>
                <Modal.Header closeButton style={{ backgroundColor: "#647295", color: "white", fontWeight: "bold" }}>
                    <Modal.Title>Filtre avancer</Modal.Title>
                </Modal.Header>
                <Formik>
                    <Form onSubmit={formikfilter.handleSubmit}>
                        <Modal.Body>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Radio
                                        label="Accomplis"
                                        name="statut_shift"
                                        value={(1)}
                                        onChange={(e, { value }) => formikfilter.setFieldValue('statut_shift', value)}
                                        onBlur={formikfilter.handleBlur}
                                        checked={formikfilter.values.statut_shift === 1} />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label="Planifier"
                                        name="statut_shift"
                                        value={(0)}
                                        onChange={(e, { value }) => formikfilter.setFieldValue('statut_shift', value)}
                                        onBlur={formikfilter.handleBlur}
                                        checked={formikfilter.values.statut_shift === 0} />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label="Annuler"
                                        name="statut_shift"
                                        value={(2)}
                                        onChange={(e, { value }) => formikfilter.setFieldValue('statut_shift', value)}
                                        onBlur={formikfilter.handleBlur}
                                        checked={formikfilter.values.statut_shift === 2} />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label style={{ fontWeight: "normal" }}>Travail</label>
                                    <Select
                                        id="job_id"
                                        name="job_id"
                                        onChange={(e, selected) => {
                                            formikfilter.setFieldValue(
                                                "job_id",
                                                selected.value
                                            );
                                        }}
                                        onBlur={formikfilter.handleBlur}
                                        options={jobsOptions}
                                        placeholder="Selectionner le travail..."
                                        value={formikfilter.values.job_id}
                                        search
                                    />
                                </Form.Field>
                                <Form.Field>
                                <label style={{ fontWeight: "normal" }}>Date de debut</label>
                                    <DatePicker
                                        name="start_date"
                                        startDate={startDate}
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            formikfilter.setFieldValue('start_date', date);
                                        }}
                                        onBlur={formikfilter.handleBlur}
                                        value={formikfilter.values.start_date} />
                                </Form.Field>
                                <Form.Field>
                                <label style={{ fontWeight: "normal" }}>Date de fin</label>
                                    <DatePicker
                                        name="end_date"
                                        endDate={endDate}
                                        selected={endDate}
                                        minDate={startDate}
                                        onChange={(date) => {
                                            setEndDate(date);
                                            formikfilter.setFieldValue('end_date', date);
                                        }}
                                        onBlur={formikfilter.handleBlur}
                                        value={formikfilter.values.end_date} />
                                </Form.Field>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="secondary" onClick={() => dispatch(shiftActions.filterModal())}>
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

export default FilterModal;