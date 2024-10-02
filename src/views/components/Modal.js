
import React, { useState, useEffect } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";

export const TaskModal = ({ taskDetails, onConfirm, show, onClose }) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (taskDetails) {
            setInputValue(taskDetails.taskValue);
        }
    }, [taskDetails]);

    const handleConfirm = () => {
        onConfirm({ ...taskDetails, taskValue: inputValue }); 
        onClose();
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
            size="md"
        >
            <Modal.Header closeButton>
                <Modal.Title>Update the Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Task Description"
                        aria-label="Task Description"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleConfirm}>
                    Update
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
