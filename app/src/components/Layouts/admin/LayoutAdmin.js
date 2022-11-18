import React from "react";
import { AsideBarAppAdmin } from "./AsideBarAppAdmin";
import { FooterAppAdmin } from "./FooterAppAdmin";
import { HeaderAppAdmin } from "./HeaderAppAdmin";
import { Container, Row, Col, Badge } from "react-bootstrap";

export const LayoutAdmin = ({ children }) => {
    return (
        <Container fluid style={{ padding: 0, minWidth: 750 }}>
            <Row>
                <Col md={3} style={{ padding: 0 }}>
                    <AsideBarAppAdmin />
                </Col>
                <Col md={9} style={{ padding: 0 }}>
                    <Row>
                        <Col>
                            <HeaderAppAdmin />
                        </Col>
                    </Row>
                    <Row>
                        <Col>{children}</Col>
                    </Row>
                    <Row>
                        <Col>
                            <FooterAppAdmin />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
