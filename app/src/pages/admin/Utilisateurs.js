import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Button, Menu, Table, Input, Dropdown } from "semantic-ui-react";
import FilterUsersAdmin from "../../components/Modals/admin/FilterUsersAdmin";
import { userActions } from "../../redux/actions/users.actions";

const Utilisateurs = () => {
    const users = useSelector(state => state.user.items);
    const filterDropdown = useSelector(state => state.user.filterDropdown);

    const dispatch = useDispatch();

    return (
        <Container style={{ padding: 15 }}>
            <Row>
                <Col>
                    <h3>Listes des utilisateurs</h3>
                </Col>
            </Row>
            <Row style={{ marginTop: 15 }}>
                <Col style={{ display: "flex", justifyContent: "space-between" }}>
                    <Dropdown
                        text={
                            // filterShift ? (
                            //     <div>Effacer</div>
                            // ) : (
                            <div>Filtrer</div>
                            //)
                        }
                        //icon={filterShift ? "cancel" : "filter"}
                        floating
                        labeled
                        button
                        open={filterDropdown}
                        onClose={() => dispatch(userActions.filterDropdown())}
                        onOpen={() => dispatch(userActions.filterDropdown())}
                        className="icon"
                    >
                        <Dropdown.Menu>
                            <Dropdown text={(<><Icon name="user" /> Role</>)} pointing='left' className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => alert("Admin")}>Admin</Dropdown.Item>
                                    <Dropdown.Item onClick={() => alert("Utilisateur")}>Utilisateur</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown.Item onClick={() => alert("Bloquer")}>
                                <Icon name="lock" /> Bloquer
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => alert("Actif")}>
                                <Icon name="unlock" />  Actif
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                onClick={() =>
                                    dispatch(
                                        userActions.filterModal()
                                    )
                                }
                            >
                                <Icon name="list" /> Filtre avancer
                            </Dropdown.Item>
                            {/* <Dropdown.Item>
                                Derniere connexion
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Pays
                            </Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Input
                        icon="search"
                        placeholder="Rechercher..." />
                </Col>
            </Row>
            <FilterUsersAdmin />
            <Row>
                <Col>
                    <Table celled style={{ marginTop: 10 }}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Prénom & Nom</Table.HeaderCell>
                                <Table.HeaderCell>Genre</Table.HeaderCell>
                                <Table.HeaderCell>E-mail</Table.HeaderCell>
                                <Table.HeaderCell>Pays</Table.HeaderCell>
                                <Table.HeaderCell>Provine</Table.HeaderCell>
                                <Table.HeaderCell>Ville</Table.HeaderCell>
                                <Table.HeaderCell>Statut</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {users.map((p, i) => (
                                <Table.Row>
                                    <Table.Cell>{i + 1}</Table.Cell>
                                    <Table.Cell>{p.firstname + " " + p.lastname}</Table.Cell>
                                    <Table.Cell>{p.gender}</Table.Cell>
                                    <Table.Cell>{p.email}</Table.Cell>
                                    <Table.Cell>{p.country}</Table.Cell>
                                    <Table.Cell>{p.province}</Table.Cell>
                                    <Table.Cell>{p.city}</Table.Cell>
                                    <Table.Cell>{p.is_admin}</Table.Cell>
                                    <Table.Cell>Action</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='9'>
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
    );
}

export default Utilisateurs;