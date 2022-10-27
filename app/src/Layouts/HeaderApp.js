import React from "react";
import "./HeaderApp.css";
import { Col, Row, Button, PageHeader, Space, Avatar, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { userActions } from "../redux/actions/users.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const menu = (
    <Menu
        items={[
            {
                label: (<><Link to="/profile"><UserOutlined /> Profile</Link></>),
                key: '0',
            },
            {
                type: 'divider',
            },
            {
                label: (<><SettingOutlined /> Setting</>),
                key: '3',
            },
        ]}
    />
);

export const HeaderApp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectToLogin = () => {
        return navigate('/');
    }

    return (
        <>
            <Row>
                <Col xs={24} md={24}>
                    <PageHeader
                        style={{
                            borderBottom: "1px solid gray",
                        }}
                        ghost={false}
                        title="My-hours"
                        // subTitle="Know your work hours"
                        extra={[
                            // <UserOutlined key="2" style={{ marginRight: 10 }} />,
                            <Dropdown key="2" overlay={menu} trigger={['click']} arrow>
                                <a onClick={e => e.preventDefault()}>
                                    <Space>
                                        <Avatar size="default" icon={<UserOutlined />} />
                                    </Space>
                                </a>
                            </Dropdown>,
                            <Button key="1" type="primary" danger onClick={() => dispatch(userActions.logout(redirectToLogin))}>
                                <LogoutOutlined /> Logout
                            </Button>,
                        ]}
                    >
                    </PageHeader>
                </Col>
            </Row>
        </>
    );
}