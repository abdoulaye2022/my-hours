import React, { useState } from "react";
import "./MesHoraires.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Icon, Input, Menu, Table, Button, Dropdown, Popup } from 'semantic-ui-react';
import { ShiftModal } from "../components/Modals/ShiftModal";
import { shiftActions } from "../redux/actions/shifts.actions";
import { useDispatch, useSelector } from "react-redux";

const MesHoraires = () => {
    const [shift, setShift] = useState({});
    const shifts = useSelector(state => state.shift.items);
    const [isOpenAcc, setIsOpenAcc] = useState(false);

    const dispatch = useDispatch();

    return (
        <>
            <Container fluid style={{ marginTop: 25 }}>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <div>
                            <Button attached='left' primary onClick={() => dispatch(shiftActions.shiftModal())}><Icon name='add' />Ajouter</Button>
                            <ShiftModal setShift={setShift} shift={shift} setIsOpenAcc={setIsOpenAcc} />
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
                                    <Table.HeaderCell>Date debut</Table.HeaderCell>
                                    <Table.HeaderCell>Date fin</Table.HeaderCell>
                                    <Table.HeaderCell>Lieu</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {shifts.map((p, i) => (
                                    p.statut_shift === 1 ? (
                                        <Popup
                                            trigger={
                                                <Table.Row positive className="rowedit">
                                                    <Table.Cell>{p.name_job}</Table.Cell>
                                                    <Table.Cell>{p.start_date}</Table.Cell>
                                                    <Table.Cell>{p.end_date}</Table.Cell>
                                                    <Table.Cell>{p.location}</Table.Cell>
                                                    <Table.Cell>
                                                        <Icon name='checkmark' />
                                                    </Table.Cell>
                                                </Table.Row>
                                            }
                                            content={
                                                <div>
                                                    {/* <Button
                                                        style={{ backgroundColor: "#9f3a38", color: "white" }}>
                                                        <Icon name="cancel" /> Inactif
                                                    </Button> */}
                                                    <Button color='green' onClick={() => {
                                                        setShift(p);
                                                        dispatch(shiftActions.shiftModal());
                                                    }}><Icon name="edit" /> Modifier</Button>
                                                </div>
                                            }
                                            open={shift.id === p.id ? isOpenAcc : false}
                                            onOpen={(e) => {
                                                setShift(p);
                                                setIsOpenAcc(true); 
                                            }}
                                            onClose={() => {
                                                setShift({});
                                                setIsOpenAcc(false);
                                            }}
                                            on='click'
                                            position='top center'
                                        />
                                    ) : (
                                        <Popup
                                            trigger={
                                                <Table.Row warning className="rowedit">
                                                    <Table.Cell>{p.name_job}</Table.Cell>
                                                    <Table.Cell>{p.start_date}</Table.Cell>
                                                    <Table.Cell>{p.end_date}</Table.Cell>
                                                    <Table.Cell>{p.location}</Table.Cell>
                                                    <Table.Cell>
                                                        <Icon name='warning' />
                                                    </Table.Cell>
                                                </Table.Row>
                                            }
                                            content={
                                                <div style={{ width: 255 }}>
                                                    <Button
                                                        style={{ backgroundColor: "#c9ba9b", color: "white" }}>
                                                        <Icon name="checkmark" /> Accomplir
                                                    </Button>
                                                    <Button color='green' onClick={() => {
                                                        //setEmployer(p);
                                                        //dispatch(employerActions.modalEmployer());
                                                    }}><Icon name="edit" /> Modifier</Button>
                                                </div>
                                            }
                                            on='click'
                                            position='top center'
                                        />
                                    )

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
            </Container>
        </>
    );
}

export default MesHoraires;