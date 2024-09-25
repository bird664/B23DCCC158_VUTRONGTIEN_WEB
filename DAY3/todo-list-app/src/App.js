import React, { useState } from 'react';
import './App.css'; // File CSS để định kiểu

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Học lập trình web với React', dueDate: 'Tomorrow', color: 'orange' },
    { id: 2, text: 'Gửi email nộp bài tập về nhà', dueDate: 'Saturday', color: 'purple' },
    { id: 3, text: 'Học từ vựng tiếng anh mỗi ngày', dueDate: 'Monday', color: 'red' },
    { id: 4, text: 'Viết tiểu luận môn Triết học', dueDate: 'Today', color: 'green' }
  ]);

  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = {
        id: tasks.length + 1,
        text: newTask,
        dueDate: 'No date',
        color: 'gray'
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, text) => {
    setEditingTaskId(id);
    setEditedTask(text);
  };

  const saveEditedTask = () => {
    setTasks(
      tasks.map(task =>
        task.id === editingTaskId ? { ...task, text: editedTask } : task
      )
    );
    setEditingTaskId(null);
    setEditedTask('');
  };

  return (
    <div className="app">
      <h1>My work <span role="img" aria-label="target">🎯</span></h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-text">
              <span className={`dot ${task.color}`}></span>
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <>
                  {task.text}
                  <span className="due-date">{task.dueDate}</span>
                </>
              )}
            </div>
            <div className="task-actions">
              {editingTaskId === task.id ? (
                <button className="save" onClick={saveEditedTask}>Save</button>
              ) : (
                <>
                  <button className="edit" onClick={() => editTask(task.id, task.text)}>Edit</button>
                  <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="new-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add task"
        />
        <button onClick={addTask}>+</button>
      </div>
    </div>
  );
}

export default App;
