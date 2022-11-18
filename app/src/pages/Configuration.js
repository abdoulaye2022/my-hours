import React, { useState, useEffect } from "react";
import "./Configuration.css";
import { Container, Row, Col } from "react-bootstrap";
import { Icon, Input, Menu, Table, Button, Popup, Loader } from "semantic-ui-react";
import { EmployerModal } from "../components/Modals/EmployerModal";
import { JobModal } from "../components/Modals/JobModal";
import { useDispatch, useSelector } from "react-redux";
import { employerActions } from "../redux/actions/employers.actions";
import { jobActions } from "../redux/actions/jobs.actions";
import { Pagination } from "../components/Pagination/Pagination";

const Configuration = () => {
    const [employer, setEmployer] = useState({});
    const [job, setJob] = useState({});
    const [visible, setVisible] = useState(false);
    const employers = useSelector((state) => state.employer.items);
    const searchEmployers = useSelector(state => state.employer.searchEmployers);
    const searchEmp = useSelector(state => state.employer.searchEmp);
    const searchJobs = useSelector(state => state.job.searchJobs);
    const searchJob = useSelector(state => state.job.searchJob);
    const searchValueEmployer = useSelector(state => state.employer.searchValueEmployer);
    const searchValueJob = useSelector(state => state.job.searchValueJob);
    const jobs = useSelector((state) => state.job.items);
    const loadingJob = useSelector(state => state.job.loading);
    const loadingEmp = useSelector(state => state.employer.loading);
    const dispatch = useDispatch();

    // User is currently on this page
    const [currentPageEmp, setCurrentPageEmp] = useState(1);
    const [currentPageJob, setCurrentPageJob] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPageEmp] = useState(10);
    const [recordsPerPageJob] = useState(10);

    const indexOfLastRecordEmp = currentPageEmp * recordsPerPageEmp;
    const indexOfFirstRecordEmp = indexOfLastRecordEmp - recordsPerPageEmp;

    const indexOfLastRecordJob = currentPageJob * recordsPerPageJob;
    const indexOfFirstRecordJob = indexOfLastRecordJob - recordsPerPageJob;

    // Records to be displayed on the current page
    const currentRecordsEmp = employers.slice(indexOfFirstRecordEmp, indexOfLastRecordEmp);
    const currentRecordsJob = jobs.slice(indexOfFirstRecordJob, indexOfLastRecordJob);


    const nPagesEmp = Math.ceil(employers.length / recordsPerPageEmp);
    const nPagesJob = Math.ceil(jobs.length / recordsPerPageJob);

    useEffect(() => {
        return () => {
            setVisible(true);
        };
    }, []);

    return (
        <>
            <Container fluid style={{ marginTop: 25 }}>
                <Loader content='Loading' active={loadingJob || loadingEmp} />
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
                                        onClick={() => {
                                            dispatch(
                                                employerActions.modalEmployer()
                                            )
                                            dispatch(employerActions.clearEmployer());
                                        }}
                                        style={{ backgroundColor: "#647295", color: "white" }}
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
                                    onChange={(e) => {
                                        dispatch(employerActions.searchEmployer(e.target.value));
                                        if (e.target.value === '') {
                                            dispatch(employerActions.clearEmployer());
                                        }
                                    }}
                                    value={searchValueEmployer}
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
                                        {searchEmp ? (
                                            searchEmployers.map((p, i) =>
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
                                            )
                                        ) : (
                                            currentRecordsEmp.map((p, i) =>
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
                                            )
                                        )}
                                    </Table.Body>

                                    <Table.Footer>
                                        <Table.Row>
                                            <Pagination
                                                nPages={nPagesEmp}
                                                currentPage={currentPageEmp}
                                                setCurrentPage={setCurrentPageEmp}
                                            />
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
                                        onClick={() => {
                                            dispatch(jobActions.modalJob());
                                            dispatch(jobActions.clearSearchJob());
                                        }}
                                        style={{ backgroundColor: "#647295", color: "white" }}
                                    >
                                        <Icon name="add" />
                                        Ajouter
                                    </Button>
                                    <JobModal job={job} setJob={setJob} />
                                </div>
                                <Input
                                    icon="search"
                                    placeholder="Rechercher..."
                                    onChange={(e) => {
                                        dispatch(jobActions.searchJob(e.target.value));
                                        if (e.target.value === '') {
                                            dispatch(jobActions.clearSearchJob());
                                        }
                                    }}
                                    value={searchValueJob}
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
                                        {searchJob ? (
                                            searchJobs.map((p, i) =>
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
                                            )
                                        ) : (
                                            currentRecordsJob.map((p, i) =>
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
                                            )
                                        )}
                                    </Table.Body>

                                    <Table.Footer>
                                        <Table.Row>
                                            <Pagination
                                                nPages={nPagesJob}
                                                currentPage={currentPageJob}
                                                setCurrentPage={setCurrentPageJob}
                                            />
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default Configuration;
