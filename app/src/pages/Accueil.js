import moment from "moment";
import "./Accueil.css";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Loader, Accordion, Icon, Table, Popup } from "semantic-ui-react";
import { ShiftModal } from "../components/Modals/ShiftModal";
import { shiftActions } from "../redux/actions/shifts.actions";
import { useNavigate } from "react-router-dom";
import { WelcomeModal } from "../components/Modals/WelcomeModal";

const mois = ["", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const Accueil = () => {
    const authShifts = useSelector((state) => state.shift.authShifts);
    const loadingJob = useSelector(state => state.job.loading);
    const loadingEmp = useSelector(state => state.employer.loading);
    const loadingShift = useSelector(state => state.shift.loading);
    const [activeIndex, setActiveIndex] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserMonthsNumber = (shift) => {
        let months = [];

        shift.map((p, i) => {
            let v = parseInt(moment(p.start_date).format("M"));
            if (!months.includes(v)) {
                months = [...months, v];
            }
        });

        return months;
    }

    const dayHours = (shifts) => {
        let time;
        let sum = 0;

        shifts
            .filter((p) => p.statut_shift === 1)
            .map((p, i) => {
                var now = moment();
                let today = now.format("YYYY-MM-DD");
                let start = moment(p.start_date, "YYYY-MM-DD");
                let end = moment(p.end_date, "YYYY-MM-DD");

                let start_shift = moment(p.start_date, "YYYY-MM-DD HH:mm");
                let end_shift = moment(p.end_date, "YYYY-MM-DD HH:mm");
                let x;

                if (start.isSame(today) && end.isSame(today))
                    sum += end_shift.diff(start_shift);
            });

        let tempTime = moment.duration(sum);
        time = tempTime.hours() + " h " + tempTime.minutes() + " m ";

        return time;
    };

    const weekHours = (shifts) => {
        var now = moment();
        var sunday = now.clone().weekday(0);
        var saturday = now.clone().weekday(6);
        let time;
        let sum = 0;

        shifts
            .filter((p) => p.statut_shift === 1)
            .map((p, i) => {
                let start = moment(p.start_date, "YYYY-MM-DD");
                let end = moment(p.end_date, "YYYY-MM-DD");

                let start_shift = moment(p.start_date, "YYYY-MM-DD HH:mm");
                let end_shift = moment(p.end_date, "YYYY-MM-DD HH:mm");
                let sun = moment(sunday)
                    .subtract(1, "days")
                    .format("YYYY-MM-DD");
                let sat = moment(saturday).add(1, "days").format("YYYY-MM-DD");

                if (start.isBetween(sun, sat) && end.isBetween(sun, sat)) {
                    sum += end_shift.diff(start_shift);
                }
            });

        let tempTime = moment.duration(sum);
        time = tempTime.hours() + " h " + tempTime.minutes() + " m ";

        return time;
    };

    const monthHours = (shifts) => {
        var now = moment().format("M");
        let time;
        let sum = 0;

        shifts
            .filter((p) => p.statut_shift === 1)
            .map((p, i) => {
                let start = moment(p.start_date);
                let end = moment(p.end_date);

                let start_shift = moment(p.start_date, "YYYY-MM-DD HH:mm");
                let end_shift = moment(p.end_date, "YYYY-MM-DD HH:mm");

                if (now === start.format("M") && now === end.format("M")) {
                    sum += end_shift.diff(start_shift);
                }
            });

        let tempTime = moment.duration(sum);
        time = tempTime.hours() + " h " + tempTime.minutes() + " m ";

        return time;
    };

    const hoursShift = (start, end) => {
        let start_date = moment(start)
        let end_date = moment(end)
        let time;

        var duration = moment.duration(end_date.diff(start_date));

        time = duration.hours() + " h " + duration.minutes() + " m ";

        return time;
    }

    return (
        <Container fluid style={{ marginTop: 25, paddingBottom: 30 }}>
            <Loader content='Loading' active={loadingJob || loadingShift || loadingEmp} />
            <Row style={{ marginBottom: 25 }}>
                <Col
                    xs={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Button
                        style={{ margin: "0px 10px", backgroundColor: "#647295", color: "white" }}
                        onClick={() => dispatch(shiftActions.shiftModal())}
                    >
                        Ajouter un horaire
                    </Button>
                    <Button
                        style={{ margin: "0px 10px", backgroundColor: "#647295", color: "white" }}
                        onClick={() => navigate("/mes-horaires")}
                    >
                        Voir mes horaires
                    </Button>
                </Col>
            </Row>
            <ShiftModal />
            <Row>
                <Col xs={12} md={4} lg={4}>
                    <Card style={{ width: "100%", textCenter: "center" }}>
                        <Card.Content
                            style={{ textAlign: "center" }}
                            header="Aujourd'hui"
                        />
                        <Card.Content
                            style={{ textAlign: "center", backgroundColor: "#647295", fontWeight: "bold", color: "white", fontSize: "1.1em" }}
                            description={<span style={{ color: "white" }}>{dayHours(authShifts)}</span>}
                        />
                    </Card>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Card style={{ width: "100%", textCenter: "center" }}>
                        <Card.Content
                            style={{ textAlign: "center" }}
                            header="Cette semaine"
                        />
                        <Card.Content
                            style={{ textAlign: "center", backgroundColor: "#647295", fontWeight: "bold", color: "white", fontSize: "1.1em" }}
                            description={<span style={{ color: "white" }}>{weekHours(authShifts)}</span>}
                        />
                    </Card>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Card style={{ width: "100%", textCenter: "center" }}>
                        <Card.Content
                            style={{ textAlign: "center" }}
                            header="Ce mois"
                        />
                        <Card.Content
                            style={{ textAlign: "center", backgroundColor: "#647295", fontWeight: "bold", color: "white", fontSize: "1.1em" }}
                            description={<span style={{ color: "white" }}>{monthHours(authShifts)}</span>}
                        />
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: 25}}>
                <Col>
                    <h3 style={{ textAlign: "center" }}>Historique de mes horaires</h3>
                    <Accordion fluid styled>
                        {getUserMonthsNumber(authShifts).sort((a, b) => a - b).map((p, i) => (
                            <>
                                <Accordion.Title
                                    active={activeIndex === i + 1}
                                    index={0}
                                    onClick={() => {

                                        setActiveIndex(activeIndex === 0 ? (i + 1) : (0));
                                    }}
                                    style={{ color: "#647295" }}
                                >
                                    <Icon name='dropdown' />
                                    {mois[p]}
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === i + 1}>
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
                                                    Durée
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
                                            {authShifts.sort((a, b) => new Date(a.added_at) - new Date(b.added_at))
                                                .filter(t => parseInt(moment(t.start_date).format("M")) === p).map((p, k) => (
                                                    p.statut_shift === 1 ? (
                                                        <Table.Row
                                                            positive
                                                            className="rowedit"
                                                        >
                                                            <Table.Cell>
                                                                {p.name_job}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {jours[moment(p.start_date).day()] + ", " +
                                                                    moment(p.start_date).date() + " " +
                                                                    moment(p.start_date).format("MMMM") + " " +
                                                                    moment(p.start_date).year() + ", à " +
                                                                    moment(p.start_date).format("HH:mm")}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {jours[moment(p.end_date).day()] + ", " +
                                                                    moment(p.end_date).date() + " " +
                                                                    moment(p.end_date).format("MMMM") + " " +
                                                                    moment(p.end_date).year() + ",  à " +
                                                                    moment(p.end_date).format("HH:mm")}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {hoursShift(p.start_date, p.end_date)}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {p.location}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Icon name="checkmark" />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    ) : p.statut_shift === 0 ? (
                                                        <Table.Row
                                                            warning
                                                            className="rowedit"
                                                        >
                                                            <Table.Cell>
                                                                {p.name_job}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {jours[moment(p.start_date).day()] + ", " +
                                                                    moment(p.start_date).date() + " " +
                                                                    moment(p.start_date).format("MMMM") + " " +
                                                                    moment(p.start_date).year() + ", à " +
                                                                    moment(p.start_date).format("HH:mm")}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {jours[moment(p.end_date).day()] + ", " +
                                                                    moment(p.end_date).date() + " " +
                                                                    moment(p.end_date).format("MMMM") + " " +
                                                                    moment(p.end_date).year() + ",  à " +
                                                                    moment(p.end_date).format("HH:mm")}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {hoursShift(p.start_date, p.end_date)}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {p.location}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Icon name="warning" />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    ) : p.statut_shift === 2 ? (
                                                        <Table.Row
                                                            error
                                                            className="rowedit"
                                                        >
                                                            <Table.Cell>
                                                                {p.name_job}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {jours[moment(p.start_date).day()] + ", " +
                                                                    moment(p.start_date).date() + " " +
                                                                    moment(p.start_date).format("MMMM") + " " +
                                                                    moment(p.start_date).year() + ", à " +
                                                                    moment(p.start_date).format("HH:mm")}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {jours[moment(p.end_date).day()] + ", " +
                                                                    moment(p.end_date).date() + " " +
                                                                    moment(p.end_date).format("MMMM") + " " +
                                                                    moment(p.end_date).year() + ",  à " +
                                                                    moment(p.end_date).format("HH:mm")}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {hoursShift(p.start_date, p.end_date)}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {p.location}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Icon name="cancel" />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    ) : (null)
                                                ))}
                                        </Table.Body>
                                    </Table>
                                </Accordion.Content>
                            </>
                        ))}
                    </Accordion>
                </Col>
            </Row>
            <WelcomeModal />
        </Container>
    );
};

export default Accueil;
