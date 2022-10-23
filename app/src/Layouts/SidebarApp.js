import React from "react";
import { Col, Row, Button, Breadcrumb, PageHeader, Table, Card, Space, Avatar } from 'antd';

export const SidebarApp = () => {
    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Card title="Statistics" size="small" headStyle={{ backgroundColor: "gray", color: "white" }}>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card title="Employers" size="small" headStyle={{ backgroundColor: "gray", color: "white" }}>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                {/* <Card title="Card" size="small" headStyle={{ backgroundColor: "gray"}}>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card> */}
            </Space>
        </>
    );
}