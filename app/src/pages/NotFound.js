import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container fluid>
            <Row>
                <Col
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            border: "2px solid #FCEDDA",
                            padding: 50,
                            backgroundColor: "#647295",
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyItems: "center"
                        }}
                    >
                        <h3>404 - Page introuvable</h3>
                        <Button onClick={() => navigate(-1)} style={{ backgroundColor: "white", color: "#647295" }}>
                            Retour en arriere !
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
