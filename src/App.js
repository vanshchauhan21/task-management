// Task Management App with Colored Status Buttons & Initial Data
import './App.css';
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { PlusCircle, Edit, Trash2 } from 'react-feather';
import { Modal } from 'react-responsive-modal';

function App() {
  const blankuser = {
    Task_Name: '',
    Assigned_To: '',
    Description: '',
    status: 'Pending',
  };

  const initialTasks = [
    {
      Task_Name: 'Fix login bug',
      Assigned_To: 'Ravi',
      Description: 'Resolve issue with user login ',
      status: 'Pending'
    },
    {
      Task_Name: 'UI Enhancements',
      Assigned_To: 'Priya',
      Description: 'Improve dashboard layout',
      status: 'In Progress'
    },
    {
      Task_Name: 'Deploy to production',
      Assigned_To: 'Arjun',
      Description: 'Push release version to server',
      status: 'Completed'
    },
  ];

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('Add');
  const [userdata, setUserdata] = useState(initialTasks);
  const [user, setUser] = useState(blankuser);
  const [editIndex, setEditIndex] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add');
    setUser(blankuser);
    setEditIndex(null);
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!user.Task_Name.trim()) errors.Task_Name = 'Task Name is required.';
    if (!user.Assigned_To.trim()) errors.Assigned_To = 'Assigned To is required.';
    if (!user.Description.trim()) errors.Description = 'Description is required.';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const addUser = () => {
    if (!validateForm()) return;
    setUserdata([...userdata, user]);
    onCloseModal();
    showToast('✅ Task added successfully!');
  };

  const editUser = (index) => {
    setAction('Edit');
    setUser(userdata[index]);
    setEditIndex(index);
    onOpenModal();
  };

  const updateUser = () => {
    if (!validateForm()) return;
    const updated = userdata.map((x, i) => (i === editIndex ? user : x));
    setUserdata(updated);
    onCloseModal();
    showToast('✅ Task updated successfully!');
  };

  const deleteUser = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    const updated = userdata.filter((_, i) => i !== index);
    setUserdata(updated);
    showToast('🗑️ Task deleted successfully!');
  };

  const toggleStatus = (index) => {
    const statusCycle = ['Pending', 'In Progress', 'Completed', 'In Review'];
    const currentIndex = statusCycle.indexOf(userdata[index].status);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    const updated = [...userdata];
    updated[index].status = nextStatus;
    setUserdata(updated);
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-red';
      case 'In Progress': return 'status-orange';
      case 'Completed': return 'status-green';
      case 'In Review': return 'status-yellow';
      default: return '';
    }
  };

  return (
    <div className="container">
      <div className="d-flex">
        <h1>Task Management App</h1>
      </div>
      <div className="toolbar">
        <button className="btn btn-p" onClick={onOpenModal}>
          <PlusCircle size={16} />
          <span>Add</span>
        </button>
      </div>
      <hr />
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0 && userdata.map((user, index) => (
              <tr key={index}>
                <td>{user.Task_Name}</td>
                <td>{user.Assigned_To}</td>
                <td>{user.Description}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 ${getStatusColorClass(user.status)}`}
                    onClick={() => toggleStatus(index)}
                  >
                    {user.status}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn" onClick={() => editUser(index)}>
                      <Edit size={16} /> <span>Edit</span>
                    </button>
                    <button className="btn btn-outline" onClick={() => deleteUser(index)}>
                      <Trash2 size={16} /> <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'custom-modal' }}>
        <div className="modal-content">
          <h2 className="modal-title">{action} Task</h2>
          <div className="form-wrapper">
            <div className="form animated-form">
              <label>Task Name</label>
              <input type="text" className={`animated-input ${validationErrors.Task_Name ? 'input-error' : ''}`} value={user.Task_Name} onChange={(e) => setUser({ ...user, Task_Name: e.target.value })} />
              {validationErrors.Task_Name && <p className="error-text">{validationErrors.Task_Name}</p>}
              <label>Assigned To</label>
              <input type="text" className={`animated-input ${validationErrors.Assigned_To ? 'input-error' : ''}`} value={user.Assigned_To} onChange={(e) => setUser({ ...user, Assigned_To: e.target.value })} />
              {validationErrors.Assigned_To && <p className="error-text">{validationErrors.Assigned_To}</p>}
              <label>Status</label>
              <select className="animated-input" value={user.status} onChange={(e) => setUser({ ...user, status: e.target.value })}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="In Review">In Review</option>
              </select>
              <label>Description</label>
              <textarea className={`animated-input ${validationErrors.Description ? 'input-error' : ''}`} rows="4" value={user.Description} onChange={(e) => setUser({ ...user, Description: e.target.value })}></textarea>
              {validationErrors.Description && <p className="error-text">{validationErrors.Description}</p>}
              {action === 'Add' && <button className="btn" onClick={addUser}>Submit</button>}
              {action === 'Edit' && <button className="btn" onClick={updateUser}>Update</button>}
            </div>
          </div>
        </div>
      </Modal>

      {toastMessage && <div className="custom-toast">{toastMessage}</div>}

      <footer className="footer">
        <p>
          Created by <strong>Vansh Chauhan</strong> &nbsp;|&nbsp;
          <a href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a>
          &nbsp;|&nbsp;
          <a href="https://linkedin.com/in/your-linkedin-id" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
        <p className="interview-message">
          I have completed the assignment for the <strong>Oritso</strong> company and I am waiting for your response.
        </p>
      </footer>
    </div>
  );
}

export default App;
