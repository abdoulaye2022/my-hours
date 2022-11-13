import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import { Button, Input, Form, Select } from "semantic-ui-react";
import { shiftActions } from "../../redux/actions/shifts.actions";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ca from "date-fns/locale/fr-CA";
registerLocale("ca", ca);

let statutOptions = [
    { key: "0", text: "Accomplis", value: 1 },
    { key: "1", text: "Planifier", value: 0 },
];

export const ShiftModal = () => {
    const shift = useSelector(state => state.shift.item);
    const modal = useSelector((state) => state.shift.modal);
    const startDateExist = useSelector((state) => state.shift.startDateExist);
    const endDateExist = useSelector((state) => state.shift.endDateExist);
    const jobs = useSelector((state) => state.job.items);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const jobsOptions = [
        ...jobs.filter(p => p.statut === 1).map((p, i) => ({ key: i, text: p.name_job, value: p.id })),
    ];
    const auth = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const filterPassedTime = (start) => {
        const currentDate = new Date(startDate);
        const selectedDate = new Date(start);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const formikshift = useFormik({
        initialValues: {
            job_id: "",
            start_date: "",
            end_date: "",
            location: "",
            statut_shift: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.job_id) {
                errors.job_id = "Trvail est obligatoire.";
            }

            if (
                values.start_date === "" &&
                Object.keys(values.start_date).length === 0
            ) {
                errors.start_date = "Date de debut obligatoire.";
            }

            if (!(values.start_date instanceof Date)) {
                errors.start_date = "Date de debut est invalide.";
            }

            if (
                values.end_date === "" &&
                Object.keys(values.end_date).length === 0
            ) {
                errors.start_date = "Date de fin obligatoire.";
            }

            if (!(values.end_date instanceof Date)) {
                errors.end_date = "Date de fin est invalide.";
            }

            if (values.statut_shift !== 0 && values.statut_shift !== 1) {
                errors.statut_shift = "Trvail est obligatoire.";
            }

            if (startDateExist) {
                errors.start_date = "Cette date est deja occupe."
            }

            if (endDateExist) {
                errors.end_date = "Cette date est deja occupe."
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            let start_date = moment(values.start_date).format(
                "YYYY-MM-DD HH:mm"
            );
            let end_date = moment(values.end_date).format("YYYY-MM-DD HH:mm");
            let added_at = moment().format("YYYY-MM-DD HH:mm");

            if (Object.keys(shift).length === 0) {
                dispatch(
                    shiftActions.add(
                        values.job_id,
                        start_date,
                        end_date,
                        values.statut_shift,
                        values.location,
                        auth.id,
                        added_at
                    )
                );
                dispatch(shiftActions.shiftModal());
            } else {
                let start_date = moment(values.start_date).format(
                    "YYYY-MM-DD HH:mm"
                );
                let end_date = moment(values.end_date).format(
                    "YYYY-MM-DD HH:mm"
                );
                dispatch(
                    shiftActions.update(
                        shift.id,
                        values.job_id,
                        start_date,
                        end_date,
                        values.statut_shift,
                        values.location,
                        auth.id
                    )
                );
                dispatch(shiftActions.shiftModal());
            }
        },
    });

    return (
        <>
            <Modal
                show={modal}
                centered
                onHide={() => {
                    formikshift.resetForm();
                    formikshift.setErrors({});
                    //setShift({});
                    dispatch(shiftActions.shiftItem({}));
                    setStartDate("");
                    setEndDate("");
                    if (modal) dispatch(shiftActions.shiftModal());
                }}
                onExited={() => {
                    formikshift.resetForm();
                    formikshift.setErrors({});
                   // setShift({});
                    dispatch(shiftActions.shiftItem({}));
                    setStartDate("");
                    setEndDate("");
                }}
                onShow={() => {
                    //setIsOpenAcc(false);
                    dispatch(shiftActions.shiftPopupAcc())
                    dispatch(shiftActions.shiftPopupPla());
                    // setIsOpenPla(false);
                    if (Object.keys(shift).length !== 0) {
                        let da = new Date();
                        let s_date = new Date(shift.start_date);
                        if (s_date > da) {
                            statutOptions = [
                                ...statutOptions.map((p, i) => {
                                    if (p.key === "0") {
                                        p.disabled = true;
                                    }
                                    return p;
                                }),
                            ];
                        }
                        formikshift.setFieldValue("job_id", shift.job_id);
                        formikshift.setFieldValue(
                            "start_date",
                            new Date(shift.start_date)
                        );
                        formikshift.setFieldValue(
                            "end_date",
                            new Date(shift.end_date)
                        );
                        formikshift.setFieldValue(
                            "statut_shift",
                            shift.statut_shift
                        );
                        formikshift.setFieldValue("location", shift.location);
                    }
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un shift</Modal.Title>
                </Modal.Header>
                <Formik>
                    <Form onSubmit={formikshift.handleSubmit}>
                        <Modal.Body>
                            <Form.Field>
                                <label style={{ fontWeight: "normal" }}>
                                    Travail
                                </label>
                                <Select
                                    id="job_id"
                                    name="job_id"
                                    onChange={(e, selected) => {
                                        formikshift.setFieldValue(
                                            "job_id",
                                            selected.value
                                        );
                                    }}
                                    onBlur={formikshift.handleBlur}
                                    options={jobsOptions}
                                    placeholder="Selectionner le travail..."
                                    value={formikshift.values.job_id}
                                    search
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap",
                                    }}
                                >
                                    {formikshift.errors.job_id &&
                                        formikshift.touched.job_id &&
                                        formikshift.errors.job_id}
                                </span>
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontWeight: "normal" }}>
                                    Date debut
                                </label>
                                <DatePicker
                                    id="start_date"
                                    name="start_date"
                                    showTimeSelect
                                    dateFormat="dd/MM/yyyy p"
                                    locale="ca"
                                    timeIntervals={15}
                                    selected={formikshift.values.start_date}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        const d = new Date();
                                        if (date > endDate) {
                                            formikshift.setFieldValue(
                                                "end_date",
                                                ""
                                            );
                                            setEndDate("");
                                        }
                                        if (date > d) {
                                            formikshift.setFieldValue(
                                                "statut_shift",
                                                ""
                                            );
                                            statutOptions = [
                                                ...statutOptions.map((p, i) => {
                                                    if (p.key === "0") {
                                                        p.disabled = true;
                                                    }
                                                    return p;
                                                }),
                                            ];
                                        } else {
                                            formikshift.setFieldValue(
                                                "statut_shift",
                                                ""
                                            );
                                            statutOptions = [
                                                ...statutOptions.map((p, i) => {
                                                    if (p.key === "0") {
                                                        delete p.disabled;
                                                    }
                                                    return p;
                                                }),
                                            ];
                                        }
                                        if (date < d) {
                                            formikshift.setFieldValue(
                                                "statut_shift",
                                                ""
                                            );
                                            statutOptions = [
                                                ...statutOptions.map((p, i) => {
                                                    if (p.key === "1") {
                                                        p.disabled = true;
                                                    }
                                                    return p;
                                                }),
                                            ];
                                        } else {
                                            formikshift.setFieldValue(
                                                "statut_shift",
                                                ""
                                            );
                                            statutOptions = [
                                                ...statutOptions.map((p, i) => {
                                                    if (p.key === "1") {
                                                        delete p.disabled;
                                                    }
                                                    return p;
                                                }),
                                            ];
                                        }
                                        formikshift.setFieldValue(
                                            "start_date",
                                            date
                                        );
                                        dispatch(shiftActions.checkStartDateShift(auth.id, date));
                                    }}
                                    selectsStart
                                    startDate={formikshift.values.start_date}
                                    endDate={formikshift.values.end_date}
                                    onBlur={formikshift.handleBlur}
                                    value={formikshift.values.start_date}
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap",
                                    }}
                                >
                                    {formikshift.errors.start_date &&
                                        formikshift.touched.start_date &&
                                        formikshift.errors.start_date}
                                </span>
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontWeight: "normal" }}>
                                    Date de fin
                                </label>
                                <DatePicker
                                    id="end_date"
                                    locale="ca"
                                    selected={formikshift.values.end_date}
                                    selectsEnd
                                    startDate={formikshift.values.start_date}
                                    disabled={startDate === "" ? true : false}
                                    endDate={endDate}
                                    minDate={formikshift.values.start_date}
                                    name="end_date"
                                    timeIntervals={15}
                                    showTimeSelect
                                    dateFormat="dd/MM/yyyy p"
                                    filterTime={filterPassedTime}
                                    onChange={(date) => {
                                        setEndDate(date);
                                        const d = new Date();
                                        if (date > d) {
                                            formikshift.setFieldValue(
                                                "statut_shift",
                                                ""
                                            );
                                            statutOptions = [
                                                ...statutOptions.map((p, i) => {
                                                    if (p.key === "0") {
                                                        p.disabled = true;
                                                    }
                                                    return p;
                                                }),
                                            ];
                                        } else {
                                            formikshift.setFieldValue(
                                                "statut_shift",
                                                ""
                                            );
                                            statutOptions = [
                                                ...statutOptions.map((p, i) => {
                                                    if (p.key === "0") {
                                                        delete p.disabled;
                                                    }
                                                    return p;
                                                }),
                                            ];
                                        }
                                        if (date < d) {
                                            formikshift.setFieldValue(
                                                "statut_shift",
                                                ""
                                            );
                                            statutOptions = [
                                                ...statutOptions.map((p, i) => {
                                                    if (p.key === "1") {
                                                        p.disabled = true;
                                                    }
                                                    return p;
                                                }),
                                            ];
                                        } else {
                                            formikshift.setFieldValue(
                                                "statut_shift",
                                                ""
                                            );
                                            statutOptions = [
                                                ...statutOptions.map((p, i) => {
                                                    if (p.key === "1") {
                                                        delete p.disabled;
                                                    }
                                                    return p;
                                                }),
                                            ];
                                        }
                                        formikshift.setFieldValue(
                                            "end_date",
                                            date
                                        );
                                        dispatch(shiftActions.checkEndDateShift(auth.id, date));
                                    }}
                                    onBlur={formikshift.handleBlur}
                                    // placeholder="Entrer la date du travail..."
                                    value={formikshift.values.end_date}
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap",
                                    }}
                                >
                                    {formikshift.errors.end_date &&
                                        formikshift.touched.end_date &&
                                        formikshift.errors.end_date}
                                </span>
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontWeight: "normal" }}>
                                    Statut
                                </label>
                                <Select
                                    id="statut_shift"
                                    name="statut_shift"
                                    onChange={(e, selected) => {
                                        formikshift.setFieldValue(
                                            "statut_shift",
                                            selected.value
                                        );
                                    }}
                                    onBlur={formikshift.handleBlur}
                                    options={statutOptions}
                                    placeholder="Selectionner le statut du travail..."
                                    value={formikshift.values.statut_shift}
                                    //defaultValue={1}
                                    search
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap",
                                    }}
                                >
                                    {formikshift.errors.statut_shift &&
                                        formikshift.touched.statut_shift &&
                                        formikshift.errors.statut_shift}
                                </span>
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontWeight: "normal" }}>
                                    Location
                                </label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    onChange={formikshift.handleChange}
                                    onBlur={formikshift.handleBlur}
                                    placeholder="Entrer l'adress du lieu de travail..."
                                    value={formikshift.values.location}
                                />
                                <span
                                    style={{
                                        color: "#9F496E",
                                        display: "wrap",
                                    }}
                                >
                                    {formikshift.errors.location &&
                                        formikshift.touched.location &&
                                        formikshift.errors.location}
                                </span>
                            </Form.Field>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() =>
                                    dispatch(shiftActions.shiftModal())
                                }
                            >
                                Annuler
                            </Button>
                            <Button primary type="submit">
                                Enregistrer
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};
