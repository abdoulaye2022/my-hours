import React, { useEffect } from "react";
import "./Profile.css";
import { Divider, Col, Form, Row, Input, Button, Table } from "antd";
import { SaveOutlined, RedoOutlined } from "@ant-design/icons";

const dataSource = [
    {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
    },
    {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
];

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
];

const Profile = () => {
    // To disable submit button at the beginning.
    useEffect(() => {
        //forceUpdate({});
    }, []);

    //const form = Form.useForm();

    const onFinish = (values) => {
        console.log("Finish:", values);
    };

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
                    width: "100%"
                }}
                gutter={[0, 15]}
            >
                <Col xs={24} sm={12} md={12}>
                    <Divider orientation="left">
                        <h4 style={{ textAlign: "center", padding: 0 }}>Employers</h4>
                    </Divider>
                    <Table dataSource={dataSource} columns={columns} size="small" />
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <Divider orientation="left">
                        <h4 style={{ textAlign: "center", padding: 0 }}>Jobs</h4>
                    </Divider>
                    <Table dataSource={dataSource} columns={columns} size="small" />
                </Col>
            </Row>
        </>
    );
};

export default Profile;
