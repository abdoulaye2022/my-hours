import React from "react";
import "./Configuration.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Icon, Input, Menu, Table, Button, Popup } from 'semantic-ui-react';
import { EmployerModal } from "../components/Modals/EmployerModal";
import { useDispatch, useSelector } from "react-redux";
import { employerActions } from "../redux/actions/employers.actions";

const Configuration = () => {

    const employers = useSelector(state => state.employer.items);
    const dispatch = useDispatch();

    return (
        <>
            <Container fluid style={{ marginTop: 25 }}>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <Row>
                            <Col style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                <div>
                                    <Button attached='left' primary onClick={() => dispatch(employerActions.modalEmployer())}><Icon name='add' />Ajouter</Button>
                                    <EmployerModal />
                                </div>
                                <Input icon='search' placeholder='Rechercher...' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table celled striped selectable={true} singleLine={true} size="small">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Nom</Table.HeaderCell>
                                            <Table.HeaderCell>Status</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {employers.map((p, i) => (
                                            p.statut === 1 ?
                                                <Popup
                                                    trigger={
                                                        <Table.Row positive className="rowedit">
                                                            <Table.Cell>{p.name_emp}</Table.Cell>
                                                            <Table.Cell>
                                                                <Icon name='checkmark' />
                                                                Actif
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    }
                                                    content={
                                                        <div className="pop">
                                                            <Button style={{ backgroundColor: "#9f3a38", color: "white" }}><Icon name="cancel" /> Inactif</Button>
                                                            <Button color='green' onClick={() => {
                                                                dispatch(employerActions.modalEmployer());
                                                            }}><Icon name="edit" /> Modifier</Button>
                                                        </div>
                                                    }
                                                    on='click'
                                                    position='top center'
                                                />
                                                : <Popup
                                                    trigger={
                                                        <Table.Row positive className="rowedit">
                                                            <Table.Cell>{p.name_emp}</Table.Cell>
                                                            <Table.Cell>
                                                                <Icon name='checkmark' />
                                                                Inactif
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    }
                                                    content={
                                                        <div className="pop">
                                                            <Button style={{ backgroundColor: "#9f3a38", color: "white" }}><Icon name="cancel" /> Inactif</Button>
                                                            <Button color='green' onClick={() => {
                                                                dispatch(employerActions.modalEmployer());
                                                            }}><Icon name="edit" /> Modifier</Button>
                                                        </div>
                                                    }
                                                    on='click'
                                                    position='top center'
                                                />
                                        ))}
                                    </Table.Body>

                                    <Table.Footer>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan='3'>
                                                <Menu floated='right' pagination>
                                                    <Menu.Item as='a' icon>
                                                        <Icon name='chevron left' />
                                                    </Menu.Item>
                                                    <Menu.Item as='a'>1</Menu.Item>
                                                    <Menu.Item as='a'>2</Menu.Item>
                                                    <Menu.Item as='a'>3</Menu.Item>
                                                    <Menu.Item as='a'>4</Menu.Item>
                                                    <Menu.Item as='a' icon>
                                                        <Icon name='chevron right' />
                                                    </Menu.Item>
                                                </Menu>
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <h1>Travail</h1>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Configuration;