import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log("Fetched user from localStorage:", storedUser); 

        if (storedUser) {
            setUser(storedUser);
            const storedTasks = JSON.parse(localStorage.getItem(storedUser.email)) || [];
            setTasks(storedTasks);
        }
        setIsLoading(false); 
    }, []);

    const login = (email) => {
        const user = { email };
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        const storedTasks = JSON.parse(localStorage.getItem(email)) || [];
        setTasks(storedTasks);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setTasks([]);
    };

    const saveTasks = (newTasks) => {
        setTasks(newTasks);
        if (user) {
            localStorage.setItem(user.email, JSON.stringify(newTasks));
        }
    };

    return (
        <UserContext.Provider value={{ user, tasks, saveTasks, login, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
