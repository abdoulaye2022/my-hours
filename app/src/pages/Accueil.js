import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Card, Icon } from 'semantic-ui-react';

const Accueil = () => {
    return (
        <Container fluid style={{ marginTop: 25 }}>
            <Row>
                <Col xs={12} md={4} lg={4}>
                    <Card style={{ width: "100%", textCenter: "center" }}>
                        <Card.Content header='Shift de la semaine' />
                        <Card.Content description={(
                            <>25 Heures</>
                        )} />
                    </Card>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Card style={{ width: "100%" }}>
                        <Card.Content header='About Amy' />
                        <Card.Content description={(
                            <>25 Heures</>
                        )} />
                    </Card>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Card style={{ width: "100%" }}>
                        <Card.Content header='About Amy' />
                        <Card.Content description={(
                            <>25 Heures</>
                        )} />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Accueil;