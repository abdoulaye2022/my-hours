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
            <Modal.Header closeButton style={{ backgroundColor: "#647295", color: "white", fontWeight: "bold" }}>
                <Modal.Title>Bienvenue sur My-hours</Modal.Title>
            </Modal.Header>
            <Modal.Body>l’applications web interactive qui vous permettra de bien gérer votre temps. 
                S’organiser et gérer ses horaires de travail n’est pas du tout évident; heureusement 
                My-Hours a été conçu pour répondre à cette préoccupation. Son principal but est de 
                vous fournir du soutient qui vous permettra d’enregistrer le nombre de shift que 
                vous avez effectué, de vous présenter le nombre d’heures de travail que vous effectuez
                 et ainsi par la même occasion elle vous fournira la possibilité de prévoir les shift que vous effectuerez. My-Hours procède par des méthodes fiables et sur dans le but d’offrir les services de qualités au internautes que vous êtes par la création  de votre compte et la possibilité de le personnaliser à vos besoins. Pour assurer la sécurité de vos informations confidentielles vous devez associer un mot de passe unique et confidentielle à votre compte. Cette application vous permettra de faire le bilan de vos heures de travail, bien plus vous aidera à ne pas vous méprendre sur ce que vous pouvez effectuer et sur le dû qui vous sera remis. </Modal.Body>
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