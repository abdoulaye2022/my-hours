import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Transition } from "semantic-ui-react";
import { ShiftModal } from "../components/Modals/ShiftModal";
import { shiftActions } from "../redux/actions/shifts.actions";
import { useNavigate } from "react-router-dom";

const Accueil = () => {
    const authShifts = useSelector((state) => state.shift.authShifts);
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setVisible(true);
        };
    }, []);

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

    return (
        <Transition visible={visible} animation="zoom" duration={500}>
            <Container fluid style={{ marginTop: 25 }}>
                <Row style={{ marginBottom: 25 }}>
                    <Col
                        xs={12}
                        md={12}
                        lg={12}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button
                            style={{ margin: "0px 10px" }}
                            onClick={() => dispatch(shiftActions.shiftModal())}
                        >
                            Ajouter un horaire
                        </Button>
                        <Button
                            style={{ margin: "0px 10px" }}
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
                                style={{ textAlign: "center" }}
                                description={
                                    <Badge style={{ fontSize: "1.1em" }}>
                                        {dayHours(authShifts)}
                                    </Badge>
                                }
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
                                style={{ textAlign: "center" }}
                                description={
                                    <Badge style={{ fontSize: "1.1em" }}>
                                        {weekHours(authShifts)}
                                    </Badge>
                                }
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
                                style={{ textAlign: "center" }}
                                description={
                                    <Badge style={{ fontSize: "1.1em" }}>
                                        {monthHours(authShifts)}
                                    </Badge>
                                }
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Transition>
    );
};

export default Accueil;
