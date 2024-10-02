import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const { user, login } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {
        if (user && user.email) { 
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = () => {
        let isValid = true;

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (password.trim() === "") {
            setPasswordError("Password cannot be empty.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (isValid) {
            if (email && password) {
                login(email);
                navigate('/'); 
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth_div">
                <h2>Login</h2>
                {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        Login successful!
                    </Alert>
                )}
                <div className="">
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            isInvalid={!!emailError}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            isInvalid={!!passwordError}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>}
                    </Form.Group>

                    <Button variant="primary" onClick={handleLogin} className="w-100">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
