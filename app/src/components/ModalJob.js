import React from "react";
import { Form, Modal, Input, Select, Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { jobActions } from "../redux/actions/jobs.actions";

const { Option } = Select;

export const ModalJob = ({ jobUpdate, setJobUpdate, formJob }) => {
    const isModalOpen = useSelector(state => state.job.modal);
    const employers = useSelector(state => state.employer.items);
    const dispatch = useDispatch();

    return (
        <Modal
            title="Job"
            open={isModalOpen}
            onCancel={() => { setJobUpdate({}); formJob.resetFields(); dispatch(jobActions.modalJob()); }}
            mask={false}
            okText={Object.keys(jobUpdate).length === 0 ? "Create" : "Update"}
            cancelText="Cancel"
            onOk={() => {
                formJob
                    .validateFields()
                    .then(values => {
                        Object.keys(jobUpdate).length === 0 ? dispatch(jobActions.add(values.name_job, values.employer_id, values.color_job)) : dispatch(jobActions.update(jobUpdate.id, values.name_job, values.employer_id, values.color_job));

                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={formJob}
                autoComplete="off"
                layout="vertical">
                <Form.Item
                    label="Name"
                    name="name_job"
                    rules={[
                        {
                            required: true,
                            message: 'Please input employer name!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="Employer"
                    name="employer_id"
                    rules={[
                        {
                            required: true,
                            message: 'Employer name is required !',
                        }
                    ]}>
                    <Select>
                        {employers.map((p) => (
                            <Option value={p.id}>{p.name_emp}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Color"
                    name="color_job"
                >
                    <Input type="color" />
                </Form.Item>
            </Form>
        </Modal>
    );
}