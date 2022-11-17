import React, { useState, useEffect } from "react";
import "./MesHoraires.css";
import { Container, Row, Col } from "react-bootstrap";
import {
    Icon,
    Input,
    Menu,
    Table,
    Button,
    Dropdown,
    Popup,
    Search
} from "semantic-ui-react";
import { ShiftModal } from "../components/Modals/ShiftModal";
import { shiftActions } from "../redux/actions/shifts.actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { shiftConstants } from "../redux/constants/shifts.constants";
import FilterModal from "../components/Modals/FilterModal";
import { Pagination } from "../components/Pagination/Pagination";

const MesHoraires = () => {
    //const [shift, setShift] = useState({});
    const [visible, setVisible] = useState(false);
    const shift = useSelector((state) => state.shift.item);
    const shifts = useSelector((state) => state.shift.authShifts);
    const filterAuthShift = useSelector((state) => state.shift.filterAuthShift);
    const filterShift = useSelector((state) => state.shift.filterShift);
    const filterDropdown = useSelector((state) => state.shift.filterDropdown);
    //const [isOpenAcc, setIsOpenAcc] = useState(false);
    const isOpenAcc = useSelector((state) => state.shift.shiftPopupAcc);
    const isOpenPla = useSelector((state) => state.shift.shiftPopupPla);
    //const [isOpenPla, setIsOpenPla] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Records to be displayed on the current page
    const currentRecords = shifts.slice(indexOfFirstRecord, indexOfLastRecord);

    const nPages = Math.ceil(shifts.length / recordsPerPage)

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            setVisible(true);
        };
    }, []);

    return (
        <>
            <Container fluid style={{ marginTop: 25 }}>
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
                                    dispatch(shiftActions.shiftModal());
                                    dispatch(shiftActions.clearFilter());
                                }}
                                style={{ backgroundColor: "#647295", color: "white" }}
                            >
                                <Icon name="add" />
                                Ajouter
                            </Button>
                            <ShiftModal />
                            <Dropdown
                                text={
                                    filterShift ? (
                                        <div>Effacer</div>
                                    ) : (
                                        <div>Filtrer</div>
                                    )
                                }
                                icon={filterShift ? "cancel" : "filter"}
                                floating
                                labeled
                                button
                                open={filterDropdown}
                                onClose={() =>
                                    dispatch(shiftActions.filterDropdown())
                                }
                                onOpen={() => {
                                    if (filterShift) {
                                        dispatch(
                                            shiftActions.clearFilter()
                                        );
                                    } else {
                                        dispatch(
                                            shiftActions.filterDropdown()
                                        );
                                    }
                                }}
                                className="icon"
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() =>
                                            dispatch(
                                                shiftActions.filterAuthShift(
                                                    1,
                                                    null,
                                                    null
                                                )
                                            )
                                        }
                                    >
                                        <Icon name="checkmark" />
                                        Accomplis
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            dispatch(
                                                shiftActions.filterAuthShift(
                                                    0,
                                                    null,
                                                    null
                                                )
                                            )
                                        }
                                    >
                                        <Icon name="warning" /> Planifier
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            dispatch(
                                                shiftActions.filterAuthShift(
                                                    2,
                                                    null,
                                                    null
                                                )
                                            )
                                        }
                                    >
                                        <Icon name="cancel" /> Annuler
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        onClick={() =>
                                            dispatch(
                                                shiftActions.filterModal()
                                            )
                                        }
                                    >
                                        <Icon name="list" /> Filtre avancer
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <FilterModal />
                            {/* <Button attached='right'>Filtrer</Button> */}
                        </div>
                        <Search
                            icon="search"
                            placeholder="Rechercher..."
                            //style={{ width: 120 }}
                            //onSearchChange={(e, data) => console.log(data.value)}
                            onSelectionChange={(e, data) =>
                                console.log(data.value)
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table celled striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        Travail
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Date debut
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Date fin
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Lieu
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Status
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {filterShift
                                    ? filterAuthShift.sort((a, b) => new Date(a.added_at) - new Date(b.added_at)).map((p, i) =>
                                        p.statut_shift === 1 ? (
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
                                                            {moment(
                                                                p.start_date
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {moment(
                                                                p.end_date
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {p.location}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon name="checkmark" />
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
                                                                // setShift(p);
                                                                dispatch(
                                                                    shiftActions.shiftItem(
                                                                        p
                                                                    )
                                                                );
                                                                dispatch(
                                                                    shiftActions.shiftModal()
                                                                );
                                                            }}
                                                        >
                                                            <Icon name="edit" />{" "}
                                                            Modifier
                                                        </Button>
                                                    </div>
                                                }
                                                open={
                                                    shift.id === p.id
                                                        ? isOpenAcc
                                                        : false
                                                }
                                                onOpen={(e) => {
                                                    //setShift(p);
                                                    dispatch(
                                                        shiftActions.shiftItem(
                                                            p
                                                        )
                                                    );
                                                    dispatch(
                                                        shiftActions.shiftPopupAcc()
                                                    );
                                                    //setIsOpenAcc(true);
                                                }}
                                                onClose={() => {
                                                    //setShift({});
                                                    dispatch(
                                                        shiftActions.shiftItem(
                                                            {}
                                                        )
                                                    );
                                                    dispatch(
                                                        shiftActions.shiftPopupAcc()
                                                    );
                                                    //setIsOpenAcc(false);
                                                }}
                                                on="click"
                                                position="top center"
                                            />
                                        ) : (
                                            <Popup
                                                trigger={
                                                    <Table.Row
                                                        warning
                                                        className="rowedit"
                                                    >
                                                        <Table.Cell>
                                                            {p.name_job}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {moment(
                                                                p.start_date
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {moment(
                                                                p.end_date
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {p.location}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon name="warning" />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                }
                                                content={
                                                    <div
                                                        style={{
                                                            width: 255,
                                                        }}
                                                    >
                                                        <Button
                                                            style={{
                                                                backgroundColor:
                                                                    "#c9ba9b",
                                                                color: "white",
                                                            }}
                                                            onClick={() => {
                                                                dispatch(
                                                                    shiftActions.complete(
                                                                        p.id,
                                                                        1
                                                                    )
                                                                );
                                                                dispatch(
                                                                    shiftActions.shiftPopupPla()
                                                                );
                                                                //   setIsOpenPla(
                                                                //       false
                                                                //   );
                                                            }}
                                                            disabled={moment(
                                                                p.end_date
                                                            ).isAfter(
                                                                currentDate
                                                            )}
                                                        // disabled={true}
                                                        >
                                                            <Icon name="checkmark" />{" "}
                                                            Accomplir
                                                        </Button>
                                                        <Button
                                                            color="green"
                                                            onClick={() => {
                                                                //setShift(p);
                                                                dispatch(
                                                                    shiftActions.shiftItem(
                                                                        p
                                                                    )
                                                                );
                                                                dispatch(
                                                                    shiftActions.shiftModal()
                                                                );
                                                            }}
                                                        >
                                                            <Icon name="edit" />{" "}
                                                            Modifier
                                                        </Button>
                                                    </div>
                                                }
                                                open={
                                                    shift.id === p.id
                                                        ? isOpenPla
                                                        : false
                                                }
                                                onOpen={(e) => {
                                                    //setShift(p);
                                                    dispatch(
                                                        shiftActions.shiftItem(
                                                            p
                                                        )
                                                    );
                                                    dispatch(
                                                        shiftActions.shiftPopupPla()
                                                    );
                                                    //setIsOpenPla(true);
                                                }}
                                                onClose={() => {
                                                    //setShift({});
                                                    dispatch(
                                                        shiftActions.shiftItem(
                                                            {}
                                                        )
                                                    );
                                                    dispatch(
                                                        shiftActions.shiftPopupPla()
                                                    );
                                                    //setIsOpenPla(false);
                                                }}
                                                on="click"
                                                position="top center"
                                            />
                                        )
                                    )
                                    : currentRecords.sort((a, b) => new Date(a.added_at) - new Date(b.added_at)).map((p, i) =>
                                        p.statut_shift === 1 ? (
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
                                                            {moment(
                                                                p.start_date
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {moment(
                                                                p.end_date
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {p.location}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon name="checkmark" />
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
                                                                //setShift(p);
                                                                dispatch(
                                                                    shiftActions.shiftItem(
                                                                        p
                                                                    )
                                                                );
                                                                dispatch(
                                                                    shiftActions.shiftModal()
                                                                );
                                                            }}
                                                        >
                                                            <Icon name="edit" />{" "}
                                                            Modifier
                                                        </Button>
                                                    </div>
                                                }
                                                open={
                                                    shift.id === p.id
                                                        ? isOpenAcc
                                                        : false
                                                }
                                                onOpen={(e) => {
                                                    // setShift(p);
                                                    dispatch(
                                                        shiftActions.shiftItem(
                                                            p
                                                        )
                                                    );
                                                    dispatch(
                                                        shiftActions.shiftPopupAcc()
                                                    );
                                                    //   setIsOpenAcc(true);
                                                }}
                                                onClose={() => {
                                                    //setShift({});
                                                    dispatch(
                                                        shiftActions.shiftItem(
                                                            {}
                                                        )
                                                    );
                                                    dispatch(
                                                        shiftActions.shiftPopupAcc()
                                                    );
                                                    //   setIsOpenAcc(false);
                                                }}
                                                on="click"
                                                position="top center"
                                            />
                                        ) : (
                                            <Popup
                                                trigger={
                                                    <Table.Row
                                                        warning
                                                        className="rowedit"
                                                    >
                                                        <Table.Cell>
                                                            {p.name_job}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {moment(
                                                                p.start_date
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {moment(
                                                                p.end_date
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {p.location}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon name="warning" />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                }
                                                content={
                                                    <div
                                                        style={{
                                                            width: 255,
                                                        }}
                                                    >
                                                        <Button
                                                            style={{
                                                                backgroundColor:
                                                                    "#c9ba9b",
                                                                color: "white",
                                                            }}
                                                            onClick={() => {
                                                                dispatch(
                                                                    shiftActions.complete(
                                                                        p.id,
                                                                        1
                                                                    )
                                                                );
                                                                dispatch(
                                                                    shiftActions.shiftPopupPla()
                                                                );
                                                                //   setIsOpenPla(
                                                                //       false
                                                                //   );
                                                            }}
                                                            disabled={moment(
                                                                p.end_date
                                                            ).isAfter(
                                                                currentDate
                                                            )}
                                                        // disabled={true}
                                                        >
                                                            <Icon name="checkmark" />{" "}
                                                            Accomplir
                                                        </Button>
                                                        <Button
                                                            color="green"
                                                            onClick={() => {
                                                                //setShift(p);
                                                                dispatch(
                                                                    shiftActions.shiftItem(
                                                                        p
                                                                    )
                                                                );
                                                                dispatch(
                                                                    shiftActions.shiftModal()
                                                                );
                                                            }}
                                                        >
                                                            <Icon name="edit" />{" "}
                                                            Modifier
                                                        </Button>
                                                    </div>
                                                }
                                                open={
                                                    shift.id === p.id
                                                        ? isOpenPla
                                                        : false
                                                }
                                                onOpen={(e) => {
                                                    //setShift(p);
                                                    dispatch(
                                                        shiftActions.shiftItem(
                                                            p
                                                        )
                                                    );
                                                    dispatch(
                                                        shiftActions.shiftPopupPla()
                                                    );
                                                    //setIsOpenPla(true);
                                                }}
                                                onClose={() => {
                                                    //setShift({});
                                                    dispatch(
                                                        shiftActions.shiftItem(
                                                            {}
                                                        )
                                                    );
                                                    dispatch(
                                                        shiftActions.shiftPopupPla()
                                                    );
                                                    //setIsOpenPla(false);
                                                }}
                                                on="click"
                                                position="top center"
                                            />
                                        )
                                    )}
                                {filterShift === true &&
                                    (filterAuthShift.length === 0 ||
                                        shifts.length === 0) ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={5}>
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                Aucun element trouver
                                            </p>
                                        </Table.Cell>
                                    </Table.Row>
                                ) : null}
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan="5">
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
        </>
    );
};

export default MesHoraires;
