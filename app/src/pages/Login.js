import React from "react";
import { Col, Row, Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/users.actions";

const Login = () => {
    // const form = Form.useForm();
    const err = useSelector(state => state.user.error);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const redirectToHome = () => {
        return navigate("/home");
    };

    const error = (msg) => {
        message.error(msg);
    };

    const onFinish = (values) => {
        const { email, password } = values;
        dispatch(userActions.login(email, password, redirectToHome, error));
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Row
            style={{
                height: "100vh",
            }}
        >
            <Col
                xs={0}
                md={12}
                style={{
                    backgroundColor: "gray",
                    height: "100%",
                }}
            >
                Logo
            </Col>
            <Col
                xs={24}
                md={12}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    height: "100%",
                    padding:
                        (window.innerWidth <= 800 &&
                            window.innerHeight <= 600) > 435
                            ? 300
                            : 50,
                }}
            >
                <h2
                    style={{
                        height: 32,
                        backgroundColor: "gray",
                        width: 235,
                        textAlign: "center",
                        borderRadius: "15px 0px",
                        color: "white",
                    }}
                >
                    Log In
                </h2>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                        style={{
                            width: 235
                        }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            {
                                min: 5,
                                message:
                                    "Password must be minimum 5 characters.",
                            },
                        ]}
                        style={{
                            width: 235
                        }}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: "100%",
                            }}
                        >
                            connection
                        </Button>
                    </Form.Item>
                </Form>
                <div
                    style={{
                        width:
                            (window.innerWidth <= 800 &&
                                window.innerHeight <= 600) > 435
                                ? 300
                                : null,
                    }}
                >
                    <p
                        style={{
                            float: "left",
                            marginRight: 30,
                        }}
                    >
                        Create an account.
                    </p>
                    <p
                        style={{
                            float: "right",
                        }}
                    >
                        I have forget my password.
                    </p>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
