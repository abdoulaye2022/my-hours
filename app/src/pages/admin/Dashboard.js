import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Statistic } from 'semantic-ui-react'

const Dashboard = () => {

    const shifts = useSelector(state => state.shift.items);
    const users = useSelector(state => state.user.items);

    return (
        <Container style={{ padding: 15 }}>
            <Row>
                <Col>
                    <Statistic>
                        <Statistic.Label>Utilisateurs</Statistic.Label>
                        <Statistic.Value>{users.length}</Statistic.Value>
                    </Statistic>
                </Col>
                <Col>
                    <Statistic>
                        <Statistic.Label>Nombres d'employeurs</Statistic.Label>
                        <Statistic.Value></Statistic.Value>
                    </Statistic>
                </Col>
                <Col>
                    <Statistic>
                        <Statistic.Label>Nombres de shifts</Statistic.Label>
                        <Statistic.Value>{shifts.length}</Statistic.Value>
                    </Statistic>
                </Col>
                <Col>
                    <Statistic>
                        <Statistic.Label>Connexions</Statistic.Label>
                        <Statistic.Value>40,509</Statistic.Value>
                    </Statistic>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
