import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Divider, Col, Form, Row, Input, Button, Table, Badge } from "antd";
import {
    SaveOutlined,
    RedoOutlined,
    PlusOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { employerActions } from "../redux/actions/employers.actions";
import { useSelector, useDispatch } from "react-redux";
import { ModalEmployer } from "../components/ModalEmployer";
import { ModalJob } from "../components/ModalJob";
import { jobActions } from "../redux/actions/jobs.actions";

const dataSource = [
    {
        key: "1",
        name_job: "Mike",
        color: "#56s8s",
    },
];

const Profile = () => {
    const [employerMouseEnterOrLeave, setEmployerMouseEnterOrLeave] =
        useState(0);
    const [jobMouseEntrerOrLeave, setJobMouseEntrerOrLeave] = useState(0);
    const [employerUpdate, setEmployerUpdate] = useState({});
    const [jobUpdate, setJobUpdate] = useState({});

    const employersData = useSelector((state) => state.employer.items);
    const jobsData = useSelector((state) => state.job.items);

    const [formEmployer] = Form.useForm();
    const [formJob] = Form.useForm();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(employerActions.getAll());
    // }, [])

    // Column employers
    const employersColumn = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            width: "5%",
            render: (_, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name_emp",
            width: "30%",
            key: "name_emp",
        },
        {
            title: "Statut",
            dataIndex: "statut",
            key: "statut",
            width: "10%",
            render: (_, record) => {
                if (record.statut === 1)
                    return <CheckCircleOutlined style={{ color: "green" }} />;
                else return <CloseCircleOutlined style={{ color: "red" }} />;
            },
        },
        {
            title: (
                <Button
                    type="primary"
                    size="small"
                    style={{ float: "right" }}
                    onClick={() => dispatch(employerActions.modalEmployer())}
                >
                    <PlusOutlined /> Add
                </Button>
            ),
            width: "35%",
            dataIndex: "options",
            key: "options",
            render: (_, record) => {
                if (record.id === employerMouseEnterOrLeave)
                    return (
                        <>
                            <Button
                                size="small"
                                style={{ float: "left", color: "green" }}
                                onClick={() => {
                                    setEmployerUpdate(record);
                                    formEmployer.setFieldsValue({
                                        name_emp: record.name_emp,
                                    });
                                    dispatch(employerActions.modalEmployer());
                                }}
                            >
                                <EditOutlined /> Edit
                            </Button>
                            <Button
                                size="small"
                                style={{ float: "right", color: "red" }}
                            >
                                {record.statut === 1 ? (
                                    <CheckCircleOutlined
                                        style={{ color: "green" }}
                                        onClick={() =>
                                            alert(
                                                JSON.stringify(
                                                    employerUpdate,
                                                    null,
                                                    2
                                                )
                                            )
                                        }
                                    />
                                ) : (
                                    <CloseCircleOutlined
                                        style={{ color: "red" }}
                                    />
                                )}
                            </Button>
                        </>
                    );
            },
        },
    ];

    // Jobs comlumns
    const JobsColumns = [
        {
            title: "#",
            dataIndex: "id",
            key: "index",
            width: "5%",
            render: (_, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name_job",
            width: "30%",
            key: "name_job",
        },
        {
            title: "Color",
            dataIndex: "color_job",
            width: "20%",
            key: "color_job",
            render: (_, record, index) => (
                <div style={{ backgroundColor: `${record.color_job}`, width: 50, height: 10 }}></div>
            ),
        },
        {
            title: (
                <Button
                    type="primary"
                    size="small"
                    style={{ float: "right" }}
                    onClick={() => dispatch(jobActions.modalJob())}
                >
                    <PlusOutlined /> Add
                </Button>
            ),
            width: "20%",
            dataIndex: "option",
            key: "option",
            render: (_, record) => {
                if (record.id === jobMouseEntrerOrLeave)
                    return (
                        <>
                            <Button
                                size="small"
                                style={{ float: "left", color: "green" }}
                                onClick={() => {
                                    setJobUpdate(record);
                                    formJob.setFieldsValue({
                                        name_job: record.name_job,
                                        employer_id: record.employer_id,
                                        color_job: record.color_job,
                                    });
                                    dispatch(jobActions.modalJob());
                                }}
                            >
                                <EditOutlined /> Edit
                            </Button>
                            {/* <Button size="small" style={{ float: "right", color: "red" }}>
                                {record.statut === 1 ? (
                                    <CheckCircleOutlined style={{ color: "green" }} onClick={() => alert(JSON.stringify(employerUpdate, null, 2))}/>
                                ) : (
                                    <CloseCircleOutlined style={{ color: "red" }} />
                                )}
                            </Button> */}
                        </>
                    );
            },
        },
    ];

    return (
        <>
            <Divider orientation="left">
                <h4 style={{ textAlign: "center", padding: 0 }}>Profile</h4>
            </Divider>

            <Form
                //form={form}
                name="horizontal_login"
                layout="inline"
                //onFinish={onFinish}
                style={{
                    width: "100%",
                    padding:
                        window.innerWidth <= 800 && window.innerHeight <= 600
                            ? "10px"
                            : null,
                }}
            >
                <Row
                    style={{
                        width: "100%",
                        marginBottom: 15,
                    }}
                >
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Firstname"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label={
                                <span
                                    style={{
                                        width: 92,
                                        textAlign: "left",
                                        color: "red",
                                    }}
                                >
                                    First name
                                </span>
                            }
                            // label="Firstname"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{
                        width: "100%",
                        marginBottom: 15,
                    }}
                >
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="E-mail"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Pays"
                            name="Pays"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{
                        width: "100%",
                    }}
                >
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Province"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="First name"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row
                    style={{
                        width: "100%",
                    }}
                >
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            style={{
                                width: "100%",
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: 100 }}
                            >
                                <SaveOutlined /> Save
                            </Button>
                            <Button style={{ width: 100 }}>
                                {" "}
                                <RedoOutlined /> Cancel
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Row
                style={{
                    width: "100%",
                }}
                gutter={[0, 15]}
            >
                <Col xs={24} sm={12} md={12}>
                    <Divider orientation="left">
                        <h4 style={{ textAlign: "center", padding: 0 }}>
                            Employers
                        </h4>
                    </Divider>
                    <ModalEmployer
                        employerUpdate={employerUpdate}
                        setEmployerUpdate={setEmployerUpdate}
                        formEmployer={formEmployer}
                    />
                    <Table
                        dataSource={employersData}
                        columns={employersColumn}
                        size="small"
                        bordered
                        style={{ width: "98%" }}
                        onRow={(record, rowIndex) => {
                            return {
                                onMouseEnter: (event) => {
                                    setEmployerMouseEnterOrLeave(record.id);
                                },
                                onMouseLeave: (event) => {
                                    setEmployerMouseEnterOrLeave(0);
                                },
                            };
                        }}
                    />
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Divider orientation="left">
                        <h4 style={{ textAlign: "center", padding: 0 }}>
                            Jobs
                        </h4>
                    </Divider>
                    <ModalJob
                        jobUpdate={jobUpdate}
                        setJobUpdate={setJobUpdate}
                        formJob={formJob}
                    />
                    <Table
                        dataSource={jobsData}
                        columns={JobsColumns}
                        size="small"
                        bordered
                        style={{ width: "98%" }}
                        onRow={(record, rowIndex) => {
                            return {
                                onMouseEnter: (event) => {
                                    setJobMouseEntrerOrLeave(record.id);
                                },
                                onMouseLeave: (event) => {
                                    setJobMouseEntrerOrLeave(0);
                                },
                            };
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Profile;
