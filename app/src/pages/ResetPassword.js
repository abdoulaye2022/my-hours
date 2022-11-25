import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Icon, Segment } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { userActions } from "../../src/redux/actions/users.actions";

const ResetPassword = () => {
    const user_email = useSelector(state => state.user.user.email);
    
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
                    <Segment style={{ width: "100%", textAlign: "center" }}>
                        <Icon name="mail" style={{ fontSize: "3em" }} />
                        <p>Nous avons envoyé un e-mail à</p>
                        <p>{user_email}</p>
                        <p>Veuillez vérifier votre boîte de réception et suivre les instructions.</p>
                    </Segment>
                </Col>
            </Row>
        </Container>
    );
}

export default ResetPassword;