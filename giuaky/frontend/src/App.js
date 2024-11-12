// frontend/src/App.js
import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <h1>Todo List Application</h1>
            <TaskList />
        </div>
    );
};

export default App;
