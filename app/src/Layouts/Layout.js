import React from "react";
import { HeaderApp } from "./HeaderApp";
import { Col, Row, Button, Breadcrumb, PageHeader, Table, Card, Space, Avatar } from 'antd';
import { FooterApp } from "./FooterApp";
import { SidebarApp } from "./SidebarApp";

export const Layout = ({children}) => {
    return (
        <>
            <HeaderApp />
            <Row>
                <Col xs={24} sm={14} md={16} lg={18} style={{
                    padding: ((window.innerWidth <= 800) && (window.innerHeight <= 600)) ? 0 : 15
                }}>
                    {children}
                </Col>
                <Col xs={24} sm={10} md={8} lg={6} style={{
                    padding: ((window.innerWidth <= 800) && (window.innerHeight <= 600)) ? 0 : 15
                }}>
                    <SidebarApp />
                </Col>
            </Row>
            <FooterApp />
        </>
    );
}