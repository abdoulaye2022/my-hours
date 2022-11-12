import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { shiftActions } from "../../redux/actions/shifts.actions";
import { Button, Input, Form, Checkbox } from 'semantic-ui-react';
import { useFormik, Formik } from "formik";
import DatePicker from "react-datepicker";

const FilterModal = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const filterShift = useSelector(state => state.shift.filterShift);
    const filterModal = useSelector(state => state.shift.filterModal);
    const dispatch = useDispatch();

    const formikfilter = useFormik({
        initialValues: { accomplis: '', planifier: '', annuler: '', start_date: '', end_date: '' },
        validate: values => {
            const errors = {};

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            dispatch(shiftActions.filterAuthShift(values.accomplis, values.planifier, values.annuler, values.start_date, values.end_date))
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
                    if(filterShift)
                        dispatch(shiftActions.filterDropdown());
                }}
                onExited={() => {
                    formikfilter.resetForm();
                    formikfilter.setErrors({});
                }}
                // onShow={() => {
                //     dispatch(shiftActions.filterDropdown())
                // }}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Filtre avancer</Modal.Title>
                </Modal.Header>
                <Formik>
                    <Form onSubmit={formikfilter.handleSubmit}>
                        <Modal.Body>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Checkbox
                                        label="Accomplis"
                                        name="accomplis"
                                        onChange={() => {
                                            formikfilter.setFieldValue('accomplis', 1);
                                        }}
                                        onBlur={formikfilter.handleBlur}
                                        value={formikfilter.values.accomplis} />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        label="Planifier"
                                        name="planifier"
                                        onChange={() => {
                                            formikfilter.setFieldValue('planifier', 0);
                                        }}
                                        onBlur={formikfilter.handleBlur}
                                        value={formikfilter.values.planifier} />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        label="Annuler"
                                        name="annuler"
                                        onChange={() => {
                                            formikfilter.setFieldValue('annuler', 2);
                                        }}
                                        onBlur={formikfilter.handleBlur}
                                        value={formikfilter.values.annuler} />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <span>Date de debut</span>
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
                                    <span>Date de fin</span>
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
                            <Button primary type="submit">
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