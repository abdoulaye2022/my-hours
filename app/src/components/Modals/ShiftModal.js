import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { shiftActions } from "../../redux/actions/shifts.actions";
import { Modal, Button } from 'react-bootstrap';

export const ShiftModal = () => {
    const modal = useSelector(state => state.shift.modal);

    const dispatch = useDispatch();

    return (
        <>
            <Modal show={modal} onHide={() => dispatch(shiftActions.shiftModal())} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un shift</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(shiftActions.shiftModal())}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}