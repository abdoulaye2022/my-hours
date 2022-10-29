import React from "react";
import { Form, Input, Modal, Select, InputNumber } from "antd";
import { useSelector } from "react-redux";
import { shiftAction } from "../redux/actions/shifts.actions";
import { useDispatch } from "react-redux";

const { Option } = Select;

export const ModalShift = ({ formShift }) => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.shift.modal);
    const jobs = useSelector((state) => state.job.items);

    return (
        <Modal
            open={open}
            title="Shift"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => dispatch(shiftAction.modalShift())}
            // onOk={() => {
            //     formShift.validateFields()
            //         .then((values) => {
            //             formShift.resetFields();
            //             //onCreate(values);
            //         })
            //         .catch((info) => {
            //             console.log("Validate Failed:", info);
            //         });
            // }}
        >
            <Form form={formShift} autoComplete="off" layout="vertical">
                <Form.Item
                    label="Employer"
                    name="employer_id"
                    rules={[
                        {
                            required: true,
                            message: "Jobs is required!",
                        },
                    ]}
                >
                    <Select>
                        {jobs.map((p) => (
                            <Option value={p.id}>{p.name_job}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Hours"
                    name="hours"
                    rules={[
                        {
                            required: true,
                            message: "Hours id required!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Location"
                    name="location"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
