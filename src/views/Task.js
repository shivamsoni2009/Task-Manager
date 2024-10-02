import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { TaskModal } from "./components/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const Task = () => {
    const { tasks, saveTasks, logout } = useContext(UserContext);
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState("");
    const [showModal, setShowModel] = useState(false);
    const [taskForUpdate, setTaskForUpdate] = useState(null);
    const [draggingTaskId, setDraggingTaskId] = useState(null);
    const navigate = useNavigate()

    const addTask = () => {
        if (inputValue.trim() === "") {
            setInputError("Task cannot be empty");

            setTimeout(() => {
                setInputError("");
            }, 3000); 

            return;
        }

        const newTask = {
            id: `${Math.floor(Math.random() * 1000)}`, 
            isCompleted: false,
            taskValue: inputValue,
            timeStamp: Date.now(), 
        };
        const updatedTasks = [...tasks, newTask];
        saveTasks(updatedTasks);
        setInputValue("");
    };

    const toggleComplete = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        );
        saveTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((item) => item.id !== id);
        saveTasks(updatedTasks);
    };

    const updateTask = (task) => {
        setTaskForUpdate(task);
        setShowModel(true);
    };

    const onClose = () => {
        setShowModel(false);
        setTaskForUpdate(null);
    };

    const onConfirm = (updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        saveTasks(updatedTasks);
    };

    const handleDragStart = (id) => {
        setDraggingTaskId(id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (id) => {
        const draggedTaskIndex = tasks.findIndex((task) => task.id === draggingTaskId);
        const droppedTaskIndex = tasks.findIndex((task) => task.id === id);

        if (draggedTaskIndex === -1 || droppedTaskIndex === -1) return;

        const updatedTasks = [...tasks];
        const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
        updatedTasks.splice(droppedTaskIndex, 0, draggedTask);

        saveTasks(updatedTasks);
        setDraggingTaskId(null);
    };
    const handleLogOut = () => {
        logout();
        navigate('/auth')
    }
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>

                <Button onClick={handleLogOut} variant="danger" className="mt-3" >
                    Log Out
                </Button>
            </div>
            <div className="task_div">
                <h1 className="task-heading">Task Manager</h1>
                <div className="task-input">
                    <input
                        type="text"
                        value={inputValue}
                        placeholder="Add a task"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={addTask}>Add</button>
                </div>
                {inputError && (
                    <p className="error-message" style={{ color: "red" }}>
                        {inputError}
                    </p>
                )} 

                <div className="taskList">
                    <ul>
                        {tasks.map((task, index) => (
                            <li
                                key={task.id}
                                className={task.isCompleted ? "completed" : ""}
                                draggable
                                onDragStart={() => handleDragStart(task.id)}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(task.id)}
                            >
                                <span>{index + 1}</span>
                                <span>{task.taskValue}</span>
                                <div>
                                    <button onClick={() => toggleComplete(task.id)}>
                                        {task.isCompleted ? "Undo" : "Complete"}
                                    </button>
                                    <PencilSquare size={30} onClick={() => updateTask(task)} />
                                    <TrashFill
                                        size={30}
                                        color="red"
                                        onClick={() => deleteTask(task.id)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <TaskModal
                    taskDetails={taskForUpdate}
                    onConfirm={onConfirm}
                    show={showModal}
                    onClose={onClose}
                />
                <Button onClick={() => navigate('/task-details')} className="mt-3">
                    View Task Details
                </Button>
            </div>
        </div>
    );
};

export default Task;
