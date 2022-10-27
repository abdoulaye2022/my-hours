import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { Button, Form, Modal, Input } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { employerActions } from "../redux/actions/employers.actions";

export const ModalEmployer = forwardRef(({ employerUpdate, setEmployerUpdate }, ref) => {
    const isModalOpen = useSelector(state => state.employer.modal);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        updateData (data) {
            form.setFieldsValue({name_emp: data.name_emp});
        }
    }));

    return (
        <>

            <Modal
                title="Employer"
                open={isModalOpen}
                onCancel={() => { setEmployerUpdate({}); form.resetFields(); dispatch(employerActions.modalEmployer()); }}
                okText={Object.keys(employerUpdate).length === 0 ? "Create" : "Update"}
                cancelText="Cancel"
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            Object.keys(employerUpdate).length === 0 ? dispatch(employerActions.add(values.name_emp)) : dispatch(employerActions.update(employerUpdate.id, employerUpdate.name_emp))
                           
                        })
                        .catch((info) => {
                            // console.log('Validate Failed:', info);
                        });
                }}
            >
                <button onClick={() => console.log(employerUpdate.name_emp)}>Test</button>
                <Form
                    form={form}
                    // initialValues={{
                    //     remember: true,
                    // }}
                    autoComplete="off"
                    layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name_emp"
                        rules={[
                            {
                                required: true,
                                message: 'Please input employer name!',
                            }
                        ]}

                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});