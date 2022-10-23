import React from "react";
import { Col, Row, Button, Breadcrumb, PageHeader, Table, Card, Space, Avatar } from 'antd';

export const FooterApp = () => {
    return (
        <>
            <Row style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                width: "100%",
                backgroundColor: "gray",
                color: "white",
                textAlign: "center",
            }}>
                <Col>
                    <center>Copyrigh @ 2022</center>
                </Col>
            </Row>
        </>
    );
}