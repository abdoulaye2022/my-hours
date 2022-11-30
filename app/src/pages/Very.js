import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../src/redux/actions/users.actions";
import { Container, Row, Col } from "react-bootstrap";
import { Button, Divider, Icon, Segment } from "semantic-ui-react";

const Very = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.error.error);

    const redirectToCreateAccount = () => {
        return navigate("/");
    }

    useEffect(() => {
        dispatch(userActions.verifyUserEmail(params.token, redirectToCreateAccount))
    }, [dispatch, params.token])

    return (
        <Container>
            <Row>
                <Col md={4}></Col>
                <Col
                    md={4}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        flexDirection: "column",
                    }}>
                    <Segment style={{ width: "100%", textAlign: "center", backgroundColor: "#647295" }}>
                        <Icon name="check circle" style={{ color: "white", fontSize: 40 }} />
                        <br />
                        <div style={{ color: "white", fontSize: "1.8em", fontWeight: "bold" }}>My-Hours</div>
                        <br />
                        <div style={{ color: "white", fontSize: "1.2em" }}>Félicitation, votre compte a été creer avec succès !</div>
                        <br />
                        <Button onClick={() => navigate('/')}>Se connecter</Button>
                    </Segment>
                </Col>
            </Row>
        </Container>
    );
}

export default Very;