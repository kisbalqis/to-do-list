import React, { useState } from 'react';

function Form() {
  const [tasks, setTasks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const addTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, task: newTask, completed: false }]);
    setShowAlert(true);
    setAlertMessage('Data berhasil ditambahkan!');
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setShowAlert(true);
    setAlertMessage('Data berhasil dihapus!');
    setTimeout(() => setShowAlert(false), 2000); // Hide alert after 3 seconds
  };

  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
        const newTask = event.target.elements.newTask.value;
        if (newTask) {
          addTask(newTask);
          event.target.elements.newTask.value = '';
        }
      }}>
        <input type="text" name="newTask" placeholder="Masukkan tugas baru" />
        <button type="submit">Tambah</button>
      </form>

      {showAlert && <div className="alert">{alertMessage}</div>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {task.task}
            <button onClick={() => removeTask(task.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Form;
