import React, { useState, useEffect } from "react";
import "./Configuration.css";
import { Container, Row, Col } from "react-bootstrap";
import { Icon, Input, Menu, Table, Button, Popup, Transition } from "semantic-ui-react";
import { EmployerModal } from "../components/Modals/EmployerModal";
import { JobModal } from "../components/Modals/JobModal";
import { useDispatch, useSelector } from "react-redux";
import { employerActions } from "../redux/actions/employers.actions";
import { jobActions } from "../redux/actions/jobs.actions";

const Configuration = () => {
    const [employer, setEmployer] = useState({});
    const [job, setJob] = useState({});
    const [visible, setVisible] = useState(false);
    const employers = useSelector((state) => state.employer.items);
    const jobs = useSelector((state) => state.job.items);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            setVisible(true);
        };
    }, []);

    return (
        <>
            <Transition
                visible={visible}
                animation="zoom"
                duration={500}
            >
                <Container fluid style={{ marginTop: 25 }}>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <Row style={{ marginBottom: 10 }}>
                                <Col>
                                    <h3 style={{ textAlign: "center" }}>
                                        Employeur
                                    </h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                >
                                    <div>
                                        <Button
                                            attached="left"
                                            primary
                                            onClick={() =>
                                                dispatch(
                                                    employerActions.modalEmployer()
                                                )
                                            }
                                        >
                                            <Icon name="add" />
                                            Ajouter
                                        </Button>
                                        <EmployerModal
                                            employer={employer}
                                            setEmployer={setEmployer}
                                        />
                                    </div>
                                    <Input
                                        icon="search"
                                        placeholder="Rechercher..."
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Table
                                        celled
                                        striped
                                        selectable={true}
                                        singleLine={true}
                                        size="small"
                                    >
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    Nom
                                                </Table.HeaderCell>
                                                <Table.HeaderCell>
                                                    Status
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {employers.map((p, i) =>
                                                p.statut === 1 ? (
                                                    <Popup
                                                        trigger={
                                                            <Table.Row
                                                                positive
                                                                className="rowedit"
                                                            >
                                                                <Table.Cell>
                                                                    {p.name_emp}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Icon name="checkmark" />
                                                                    Actif
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        }
                                                        content={
                                                            <div>
                                                                {/* <Button
                                                                style={{ backgroundColor: "#9f3a38", color: "white" }}>
                                                                <Icon name="cancel" /> Inactif
                                                            </Button> */}
                                                                <Button
                                                                    color="green"
                                                                    onClick={() => {
                                                                        setEmployer(
                                                                            p
                                                                        );
                                                                        dispatch(
                                                                            employerActions.modalEmployer()
                                                                        );
                                                                    }}
                                                                >
                                                                    <Icon name="edit" />{" "}
                                                                    Modifier
                                                                </Button>
                                                            </div>
                                                        }
                                                        on="click"
                                                        position="top center"
                                                    />
                                                ) : (
                                                    <Popup
                                                        trigger={
                                                            <Table.Row
                                                                negative
                                                                className="rowedit"
                                                            >
                                                                <Table.Cell>
                                                                    {p.name_emp}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Icon name="cancel" />
                                                                    Inactif
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        }
                                                        content={
                                                            <div>
                                                                {/* <Button style={{ backgroundColor: "#9f3a38", color: "white" }}><Icon name="cancel" /> Inactif</Button> */}
                                                                <Button
                                                                    color="green"
                                                                    onClick={() => {
                                                                        setEmployer(
                                                                            p
                                                                        );
                                                                        dispatch(
                                                                            employerActions.modalEmployer()
                                                                        );
                                                                    }}
                                                                >
                                                                    <Icon name="edit" />{" "}
                                                                    Modifier
                                                                </Button>
                                                            </div>
                                                        }
                                                        on="click"
                                                        position="top center"
                                                    />
                                                )
                                            )}
                                        </Table.Body>

                                        <Table.Footer>
                                            <Table.Row>
                                                <Table.HeaderCell colSpan="3">
                                                    <Menu
                                                        floated="right"
                                                        pagination
                                                    >
                                                        <Menu.Item as="a" icon>
                                                            <Icon name="chevron left" />
                                                        </Menu.Item>
                                                        <Menu.Item as="a">
                                                            1
                                                        </Menu.Item>
                                                        <Menu.Item as="a">
                                                            2
                                                        </Menu.Item>
                                                        <Menu.Item as="a">
                                                            3
                                                        </Menu.Item>
                                                        <Menu.Item as="a">
                                                            4
                                                        </Menu.Item>
                                                        <Menu.Item as="a" icon>
                                                            <Icon name="chevron right" />
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
                            <Row style={{ marginBottom: 10 }}>
                                <Col>
                                    <h3 style={{ textAlign: "center" }}>
                                        Travail
                                    </h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                >
                                    <div>
                                        <Button
                                            attached="left"
                                            primary
                                            onClick={() =>
                                                dispatch(jobActions.modalJob())
                                            }
                                        >
                                            <Icon name="add" />
                                            Ajouter
                                        </Button>
                                        <JobModal job={job} setJob={setJob} />
                                    </div>
                                    <Input
                                        icon="search"
                                        placeholder="Rechercher..."
                                    />
                                </Col>
                            </Row>{" "}
                            <Row>
                                <Col>
                                    <Table
                                        celled
                                        striped
                                        selectable={true}
                                        singleLine={true}
                                        size="small"
                                    >
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    Nom
                                                </Table.HeaderCell>
                                                <Table.HeaderCell>
                                                    Employeur
                                                </Table.HeaderCell>
                                                <Table.HeaderCell>
                                                    Couleur
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {jobs.map((p, i) =>
                                                p.statut === 1 ? (
                                                    <Popup
                                                        trigger={
                                                            <Table.Row
                                                                positive
                                                                className="rowedit"
                                                            >
                                                                <Table.Cell>
                                                                    {p.name_job}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {p.name_emp}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <div
                                                                        style={{
                                                                            width: "50%",
                                                                            height: 20,
                                                                            backgroundColor:
                                                                                p.color_job,
                                                                        }}
                                                                    ></div>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        }
                                                        content={
                                                            <div>
                                                                {/* <Button
                                                                style={{ backgroundColor: "#9f3a38", color: "white" }}>
                                                                <Icon name="cancel" /> Inactif
                                                            </Button> */}
                                                                <Button
                                                                    color="green"
                                                                    onClick={() => {
                                                                        setJob(
                                                                            p
                                                                        );
                                                                        dispatch(
                                                                            jobActions.modalJob()
                                                                        );
                                                                    }}
                                                                >
                                                                    <Icon name="edit" />{" "}
                                                                    Modifier
                                                                </Button>
                                                            </div>
                                                        }
                                                        on="click"
                                                        position="top center"
                                                    />
                                                ) : (
                                                    <Popup
                                                        trigger={
                                                            <Table.Row
                                                                negative
                                                                className="rowedit"
                                                            >
                                                                <Table.Cell>
                                                                    {p.name_job}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {p.name_emp}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <div
                                                                        style={{
                                                                            width: "50%",
                                                                            height: 20,
                                                                            backgroundColor:
                                                                                p.color_job,
                                                                        }}
                                                                    ></div>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        }
                                                        content={
                                                            <div>
                                                                {/* <Button style={{ backgroundColor: "#9f3a38", color: "white" }}><Icon name="cancel" /> Inactif</Button> */}
                                                                <Button
                                                                    color="green"
                                                                    onClick={() => {
                                                                        setJob(
                                                                            p
                                                                        );
                                                                        dispatch(
                                                                            jobActions.modalJob()
                                                                        );
                                                                    }}
                                                                >
                                                                    <Icon name="edit" />{" "}
                                                                    Modifier
                                                                </Button>
                                                            </div>
                                                        }
                                                        on="click"
                                                        position="top center"
                                                    />
                                                )
                                            )}
                                        </Table.Body>

                                        <Table.Footer>
                                            <Table.Row>
                                                <Table.HeaderCell colSpan="3">
                                                    <Menu
                                                        floated="right"
                                                        pagination
                                                    >
                                                        <Menu.Item as="a" icon>
                                                            <Icon name="chevron left" />
                                                        </Menu.Item>
                                                        <Menu.Item as="a">
                                                            1
                                                        </Menu.Item>
                                                        <Menu.Item as="a">
                                                            2
                                                        </Menu.Item>
                                                        <Menu.Item as="a">
                                                            3
                                                        </Menu.Item>
                                                        <Menu.Item as="a">
                                                            4
                                                        </Menu.Item>
                                                        <Menu.Item as="a" icon>
                                                            <Icon name="chevron right" />
                                                        </Menu.Item>
                                                    </Menu>
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Footer>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Transition>
        </>
    );
};

export default Configuration;
