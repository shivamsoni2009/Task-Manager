import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './views/context/UserContext';
import Task from './views/Task';
import Auth from './views/Auth';
import './App.css';
import TaskDetails from './views/TaskDetails';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PrivateRoute element={<Task />} />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path='task-details' element={<TaskDetails />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

const PrivateRoute = ({ element }) => {
    const { user, isLoading } = useContext(UserContext);
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return element;
};
export default App;
