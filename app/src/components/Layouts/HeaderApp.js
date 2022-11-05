import React from "react";
import "./HeaderApp.css";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Icon, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/users.actions";
import { useNavigate } from "react-router-dom";

export const HeaderApp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const redirectToLogin = () => {
        return navigate('/');
    }
    return (
        <>
            <Navbar expand="md">
                <Container fluid>
                    <Navbar.Brand href="#">My-Hours</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {/* <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link> */}
                        </Nav>
                        <Nav>
                            <Nav.Link><Link to="/accueil" class="react">Accueil</Link></Nav.Link>
                            <Nav.Link><Link to="/mes-horaires" class="react">Mes horraires</Link></Nav.Link>
                            <Nav.Link>
                                <Link to="/profil" class="react">Profil</Link>
                            </Nav.Link>
                            <Button color='red' onClick={() => dispatch(userActions.logout(redirectToLogin))}>
                                <Icon name='sign out' /> Deconexion
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}