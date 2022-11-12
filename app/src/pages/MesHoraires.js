import React, { useState } from "react";
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

const MesHoraires = () => {
    const [shift, setShift] = useState({});
    const shifts = useSelector((state) => state.shift.authShifts);
    const filterAuthShift = useSelector((state) => state.shift.filterAuthShift);
    const filterShift = useSelector((state) => state.shift.filterShift);
    const filterDropdown = useSelector((state) => state.shift.filterDropdown);
    const [isOpenAcc, setIsOpenAcc] = useState(false);
    const [isOpenPla, setIsOpenPla] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const dispatch = useDispatch();

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
                            >
                                <Icon name="add" />
                                Ajouter
                            </Button>
                            <ShiftModal
                                setShift={setShift}
                                shift={shift}
                                setIsOpenAcc={setIsOpenAcc}
                                setIsOpenPla={setIsOpenPla}
                            />
                            <Dropdown
                                text={
                                    filterShift ? (
                                        <div>Annuler</div>
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
                                        dispatch(shiftActions.clearFilter());
                                    } else {
                                        dispatch(shiftActions.filterDropdown());
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
                                                    null,
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
                                                    null,
                                                    null,
                                                    2,
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
                                            dispatch(shiftActions.filterModal())
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
                            onSelectionChange={(e, data) => console.log(data.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table celled striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Travail</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Date debut
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Date fin
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Lieu</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {filterShift
                                    ? filterAuthShift.map((p, i) =>
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
                                                                  setShift(p);
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
                                                      setShift(p);
                                                      setIsOpenAcc(true);
                                                  }}
                                                  onClose={() => {
                                                      setShift({});
                                                      setIsOpenAcc(false);
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
                                                          style={{ width: 255 }}
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
                                                                  setIsOpenPla(
                                                                      false
                                                                  );
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
                                                                  setShift(p);
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
                                                      setShift(p);
                                                      setIsOpenPla(true);
                                                  }}
                                                  onClose={() => {
                                                      setShift({});
                                                      setIsOpenPla(false);
                                                  }}
                                                  on="click"
                                                  position="top center"
                                              />
                                          )
                                      )
                                    : shifts.map((p, i) =>
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
                                                                  setShift(p);
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
                                                      setShift(p);
                                                      setIsOpenAcc(true);
                                                  }}
                                                  onClose={() => {
                                                      setShift({});
                                                      setIsOpenAcc(false);
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
                                                          style={{ width: 255 }}
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
                                                                  setIsOpenPla(
                                                                      false
                                                                  );
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
                                                                  setShift(p);
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
                                                      setShift(p);
                                                      setIsOpenPla(true);
                                                  }}
                                                  onClose={() => {
                                                      setShift({});
                                                      setIsOpenPla(false);
                                                  }}
                                                  on="click"
                                                  position="top center"
                                              />
                                          )
                                      )}
                                {(filterShift === true &&
                                (filterAuthShift.length === 0) || (shifts.length === 0)) ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={5}>
                                            <p style={{ textAlign: "center" }}>
                                                Aucun element trouver
                                            </p>
                                        </Table.Cell>
                                    </Table.Row>
                                ) : null}
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan="5">
                                        <Menu floated="right" pagination>
                                            <Menu.Item as="a" icon>
                                                <Icon name="chevron left" />
                                            </Menu.Item>
                                            <Menu.Item as="a">1</Menu.Item>
                                            <Menu.Item as="a">2</Menu.Item>
                                            <Menu.Item as="a">3</Menu.Item>
                                            <Menu.Item as="a">4</Menu.Item>
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
            </Container>
        </>
    );
};

export default MesHoraires;
