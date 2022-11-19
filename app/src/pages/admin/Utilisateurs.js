import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Button, Menu, Table, Input, Dropdown } from "semantic-ui-react";
import FilterUsersAdmin from "../../components/Modals/admin/FilterUsersAdmin";
import { Pagination } from "../../components/Pagination/Pagination";
import { userActions } from "../../redux/actions/users.actions";

const Utilisateurs = () => {
    const users = useSelector((state) => state.user.items);
    const filterDropdown = useSelector((state) => state.user.filterDropdown);
    const filterUsers = useSelector((state) => state.user.filterUsers);
    const filteredUsers = useSelector((state) => state.user.filteredUsers);
    const searchedValueUsers = useSelector(
        (state) => state.user.searchedValueUsers
    );
    const searchUsers = useSelector((state) => state.user.searchUsers);
    const searchedUsers = useSelector(state => state.user.searchedUsers);

    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Records to be displayed on the current page
    const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);

    const nPages = Math.ceil(users.length / recordsPerPage);

    const dispatch = useDispatch();

    return (
        <Container style={{ padding: 15 }}>
            <Row>
                <Col>
                    <h3>Listes des utilisateurs</h3>
                </Col>
            </Row>
            <Row style={{ marginTop: 15 }}>
                <Col
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Dropdown
                        text={
                            filterUsers ? (
                                <div>Effacer</div>
                            ) : (
                                <div>Filtrer</div>
                            )
                        }
                        icon={filterUsers ? "cancel" : "filter"}
                        floating
                        labeled
                        button
                        open={filterDropdown}
                        onClose={() => dispatch(userActions.filterDropdown())}
                        onOpen={() => {
                            dispatch(userActions.filterDropdown());
                            if (filterUsers)
                                dispatch(userActions.clearFilterUsers());
                        }}
                        className="icon"
                    >
                        <Dropdown.Menu>
                            <Dropdown
                                text={
                                    <>
                                        <Icon name="user" /> Role
                                    </>
                                }
                                pointing="left"
                                className="link item"
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() =>
                                            dispatch(
                                                userActions.filterUsers(
                                                    1,
                                                    null,
                                                    null,
                                                    null,
                                                    null,
                                                    null
                                                )
                                            )
                                        }
                                    >
                                        Admin
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            dispatch(
                                                userActions.filterUsers(
                                                    0,
                                                    null,
                                                    null,
                                                    null,
                                                    null,
                                                    null
                                                )
                                            )
                                        }
                                    >
                                        Utilisateur
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown.Item
                                onClick={() =>
                                    dispatch(
                                        userActions.filterUsers(
                                            null,
                                            1,
                                            null,
                                            null,
                                            null,
                                            null
                                        )
                                    )
                                }
                            >
                                <Icon name="lock" /> Bloquer
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() =>
                                    dispatch(
                                        userActions.filterUsers(
                                            null,
                                            0,
                                            null,
                                            null,
                                            null,
                                            null
                                        )
                                    )
                                }
                            >
                                <Icon name="unlock" /> Actif
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                onClick={() =>
                                    dispatch(userActions.filterModal())
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
                        placeholder="Rechercher..."
                        onChange={(e) => {
                            dispatch(userActions.searchUsers(e.target.value));
                            if (e.target.value === "") {
                                dispatch(userActions.clearSearchUsers());
                            }
                        }}
                        value={searchedValueUsers}
                    />
                </Col>
            </Row>
            <FilterUsersAdmin />
            <Row>
                <Col>
                    <Table celled style={{ marginTop: 10 }} compact="very">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Prénom & Nom
                                </Table.HeaderCell>
                                <Table.HeaderCell>Genre</Table.HeaderCell>
                                <Table.HeaderCell>E-mail</Table.HeaderCell>
                                <Table.HeaderCell>Pays</Table.HeaderCell>
                                <Table.HeaderCell>Provine</Table.HeaderCell>
                                <Table.HeaderCell>Ville</Table.HeaderCell>
                                <Table.HeaderCell>Statut</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {filterUsers
                                ? filteredUsers.map((p, i) => (
                                      <Table.Row>
                                          <Table.Cell>{i + 1}</Table.Cell>
                                          <Table.Cell
                                              style={{
                                                  borderLeft:
                                                      p.is_admin === 1
                                                          ? "4px solid red"
                                                          : "4px solid green",
                                              }}
                                          >
                                              {p.firstname + " " + p.lastname}
                                          </Table.Cell>
                                          <Table.Cell>{p.gender}</Table.Cell>
                                          <Table.Cell>{p.email}</Table.Cell>
                                          <Table.Cell>{p.country}</Table.Cell>
                                          <Table.Cell>{p.province}</Table.Cell>
                                          <Table.Cell>{p.city}</Table.Cell>
                                          <Table.Cell>
                                              {p.statut === 1 ? (
                                                  <Button
                                                      size="mini"
                                                      style={{
                                                          backgroundColor:
                                                              "red",
                                                          color: "white",
                                                          width: "100%",
                                                      }}
                                                  >
                                                      Bloquer
                                                  </Button>
                                              ) : (
                                                  <Button
                                                      size="mini"
                                                      style={{
                                                          backgroundColor:
                                                              "green",
                                                          color: "white",
                                                          width: "100%",
                                                      }}
                                                  >
                                                      Actif
                                                  </Button>
                                              )}
                                          </Table.Cell>
                                      </Table.Row>
                                  ))
                                : searchUsers
                                ? searchedUsers.map((p, i) => (
                                      <Table.Row>
                                          <Table.Cell>{i + 1}</Table.Cell>
                                          <Table.Cell
                                              style={{
                                                  borderLeft:
                                                      p.is_admin === 1
                                                          ? "4px solid red"
                                                          : "4px solid green",
                                              }}
                                          >
                                              {p.firstname + " " + p.lastname}
                                          </Table.Cell>
                                          <Table.Cell>{p.gender}</Table.Cell>
                                          <Table.Cell>{p.email}</Table.Cell>
                                          <Table.Cell>{p.country}</Table.Cell>
                                          <Table.Cell>{p.province}</Table.Cell>
                                          <Table.Cell>{p.city}</Table.Cell>
                                          <Table.Cell>
                                              {p.statut === 1 ? (
                                                  <Button
                                                      size="mini"
                                                      style={{
                                                          backgroundColor:
                                                              "red",
                                                          color: "white",
                                                          width: "100%",
                                                      }}
                                                  >
                                                      Bloquer
                                                  </Button>
                                              ) : (
                                                  <Button
                                                      size="mini"
                                                      style={{
                                                          backgroundColor:
                                                              "green",
                                                          color: "white",
                                                          width: "100%",
                                                      }}
                                                  >
                                                      Actif
                                                  </Button>
                                              )}
                                          </Table.Cell>
                                      </Table.Row>
                                  ))
                                : currentRecords.map((p, i) => (
                                      <Table.Row>
                                          <Table.Cell>{i + 1}</Table.Cell>
                                          <Table.Cell
                                              style={{
                                                  borderLeft:
                                                      p.is_admin === 1
                                                          ? "4px solid red"
                                                          : "4px solid green",
                                              }}
                                          >
                                              {p.firstname + " " + p.lastname}
                                          </Table.Cell>
                                          <Table.Cell>{p.gender}</Table.Cell>
                                          <Table.Cell>{p.email}</Table.Cell>
                                          <Table.Cell>{p.country}</Table.Cell>
                                          <Table.Cell>{p.province}</Table.Cell>
                                          <Table.Cell>{p.city}</Table.Cell>
                                          <Table.Cell>
                                              {p.statut === 1 ? (
                                                  <Button
                                                      size="mini"
                                                      style={{
                                                          backgroundColor:
                                                              "red",
                                                          color: "white",
                                                          width: "100%",
                                                      }}
                                                  >
                                                      Bloquer
                                                  </Button>
                                              ) : (
                                                  <Button
                                                      size="mini"
                                                      style={{
                                                          backgroundColor:
                                                              "green",
                                                          color: "white",
                                                          width: "100%",
                                                      }}
                                                  >
                                                      Actif
                                                  </Button>
                                              )}
                                          </Table.Cell>
                                      </Table.Row>
                                  ))}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan="8">
                                    <Pagination
                                        nPages={nPages}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Utilisateurs;
