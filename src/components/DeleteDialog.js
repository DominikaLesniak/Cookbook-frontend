import React, { useState, Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const DeleteDialog = props => {
    const [show, setShow] = useState(true);
    const [canDelete, setCanDelete] = useState(true);
    const handleClose = () => setShow(false);
    const handleDelete = () => {
        if (canDelete) {
            setCanDelete(false);
            props.onAgreed();
            setShow(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your {props.deletedItem}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-warning" onClick={handleClose}>
                        Cancel
            </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteDialog