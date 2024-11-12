// frontend/src/App.js
import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <header>
                <h1>Todo List Application</h1>
            </header>
            <main>
                <TaskList />
            </main>
        </div>
    );
};

export default App;
