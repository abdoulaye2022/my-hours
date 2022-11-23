import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/actions/users.actions";
import { Modal } from 'react-bootstrap';
import { Button } from "semantic-ui-react";

export const WelcomeModal = () => {
    const welcomeModal = useSelector(state => state.user.welcomeModal);

    const dispatch = useDispatch();

    return (
        <Modal 
            show={welcomeModal} 
            onHide={() => dispatch(userActions.closeWelcomeModal())}
            >
            <Modal.Header closeButton>
                <Modal.Title>Bienvenue sur My-hours</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch(userActions.closeWelcomeModal())}>
                    Fermer
                </Button>
                <Button variant="primary">
                    Commencer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}