import React, { useEffect, useImperativeHandle } from "react";
import { Form, Modal, Input } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { employerActions } from "../redux/actions/employers.actions";

export const ModalEmployer = ({ employerUpdate, setEmployerUpdate, formEmployer }) => {
    const isModalOpen = useSelector(state => state.employer.modal);
    const dispatch = useDispatch();

    return (
        <>

            <Modal
                title="Employer"
                open={isModalOpen}
                onCancel={() => { setEmployerUpdate({}); formEmployer.resetFields(); dispatch(employerActions.modalEmployer()); }}
                mask={false}
                okText={Object.keys(employerUpdate).length === 0 ? "Create" : "Update"}
                cancelText="Cancel"
                onOk={() => {
                    formEmployer
                        .validateFields()
                        .then(values => {
                            Object.keys(employerUpdate).length === 0 ? dispatch(employerActions.add(values.name_emp)) : dispatch(employerActions.update(employerUpdate.id, values.name_emp));
        
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={formEmployer}
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
};