import React from "react";
import "./MesHoraires.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Icon, Input, Menu, Table, Button, Dropdown } from 'semantic-ui-react';
import { ShiftModal } from "../components/Modals/ShiftModal";
import { shiftActions } from "../redux/actions/shifts.actions";
import { useDispatch } from "react-redux";

const MesHoraires = () => {

    const dispatch = useDispatch();

    return (
        <>
            <Container fluid style={{ marginTop: 25 }}>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <div>
                            <Button attached='left' primary onClick={() => dispatch(shiftActions.shiftModal())}><Icon name='add' />Ajouter</Button>
                             <ShiftModal />
                            <Dropdown
                                text='Filtrer'
                                icon='filter'
                                floating
                                labeled
                                button
                                className='icon'
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Header icon='tags' content='Filter by tag' />
                                    <Dropdown.Item>Important</Dropdown.Item>
                                    <Dropdown.Item>Announcement</Dropdown.Item>
                                    <Dropdown.Item>Discussion</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <Button attached='right'>Filtrer</Button> */}
                        </div>
                        <Input icon='search' placeholder='Rechercher...' style={{ width: 120 }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table celled striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Travail</Table.HeaderCell>
                                    <Table.HeaderCell>Heure</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.HeaderCell>Lieu</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row positive>
                                    <Table.Cell>Securite</Table.Cell>
                                    <Table.Cell>8 Heures</Table.Cell>
                                    <Table.Cell>23/01/2023</Table.Cell>
                                    <Table.Cell>45 rue gauvin</Table.Cell>
                                    <Table.Cell>
                                        <Icon name='checkmark' />
                                        Approved
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row negative>
                                    <Table.Cell>Securite</Table.Cell>
                                    <Table.Cell>8 Heures</Table.Cell>
                                    <Table.Cell>23/01/2023</Table.Cell>
                                    <Table.Cell>45 rue gauvin</Table.Cell>
                                    <Table.Cell>
                                        <Icon name='cancel' />
                                        Approved
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row warning>
                                    <Table.Cell>Securite</Table.Cell>
                                    <Table.Cell>8 Heures</Table.Cell>
                                    <Table.Cell>23/01/2023</Table.Cell>
                                    <Table.Cell>45 rue gauvin</Table.Cell>
                                    <Table.Cell>
                                        <Icon name='warning' />
                                        Approved
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Securite</Table.Cell>
                                    <Table.Cell>8 Heures</Table.Cell>
                                    <Table.Cell>23/01/2023</Table.Cell>
                                    <Table.Cell>45 rue gauvin</Table.Cell>
                                    <Table.Cell>
                                        <Icon name='checkmark' />
                                        Approved
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Securite</Table.Cell>
                                    <Table.Cell>8 Heures</Table.Cell>
                                    <Table.Cell>23/01/2023</Table.Cell>
                                    <Table.Cell>45 rue gauvin</Table.Cell>
                                    <Table.Cell>
                                        <Icon name='checkmark' />
                                        Approved
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Securite</Table.Cell>
                                    <Table.Cell>8 Heures</Table.Cell>
                                    <Table.Cell>23/01/2023</Table.Cell>
                                    <Table.Cell>45 rue gauvin</Table.Cell>
                                    <Table.Cell>
                                        <Icon name='checkmark' />
                                        Approved
                                    </Table.Cell>
                                </Table.Row>
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
            </Container>
        </>
    );
}

export default MesHoraires;