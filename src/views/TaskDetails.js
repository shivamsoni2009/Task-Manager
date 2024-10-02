import React, { useContext } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "./context/UserContext";
import { PersonFill } from "react-bootstrap-icons"; 
import { useNavigate } from 'react-router-dom'; 

const TaskDetails = () => {
    const { user,tasks } = useContext(UserContext); 
    const navigate = useNavigate(); 
console.log(user,"user")
    return (
        <Container className="mt-4">
            <Button variant="secondary" onClick={() => navigate('/')} className="mb-3">
                Back to Home
            </Button>
            <h2>Task Details</h2>
            <Row>
                {tasks.map((task,index) => (
                    <Col md={4} key={task.id} className="mb-4">
                        <Card>
                            <Card.Header className="d-flex align-items-center">
                                <PersonFill size={30} className="mr-2" /> 
                                Task : {index+1}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Task:</strong> {task.taskValue}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Timestamp:</strong> {new Date(task.timeStamp).toLocaleString()}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Status:</strong> {task.isCompleted ? "Completed" : "Pending"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TaskDetails;
