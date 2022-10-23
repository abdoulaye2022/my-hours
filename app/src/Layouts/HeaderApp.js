import React from "react";
import "./HeaderApp.css";
import { Col, Row, Button, Breadcrumb, PageHeader, Table, Card, Space, Avatar, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";

const menu = (
    <Menu
        items={[
            {
                label: (<><UserOutlined /> Profile</>),
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
                            <Button key="1" type="primary" danger>
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