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
    status: 'Pending', // Default status
  };

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('Add');
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useState(blankuser);
  const [editIndex, setEditIndex] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add');
    setUser(blankuser);
    setEditIndex(null);
  };

  const addUser = () => {
    setUserdata([...userdata, user]);
    onCloseModal();
  };

  const editUser = (index) => {
    setAction('Edit');
    setUser(userdata[index]);
    setEditIndex(index);
    onOpenModal();
  };

  const updateUser = () => {
    const updated = userdata.map((x, i) => (i === editIndex ? user : x));
    setUserdata(updated);
    onCloseModal();
  };

  const deleteUser = (index) => {
    const updated = userdata.filter((_, i) => i !== index);
    setUserdata(updated);
  };

  // Toggle status to next in sequence
  const toggleStatus = (index) => {
    const statusCycle = ['Pending', 'In Progress', 'Completed', 'In Review'];
    const currentIndex = statusCycle.indexOf(userdata[index].status);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    const updated = [...userdata];
    updated[index].status = nextStatus;
    setUserdata(updated);
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
          {userdata.length > 0 &&
            userdata.map((user, index) => (
              <tr key={index}>
                <td>{user.Task_Name}</td>
                <td>{user.Assigned_To}</td>
                <td>{user.Description}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 ${
                      user.status === 'Pending'
                        ? 'btn-outline btn-primary'
                        : user.status === 'In Progress'
                        ? 'btn-primary'
                        : user.status === 'Completed'
                        ? 'btn-success'
                        : 'btn-warning'
                    }`}
                    onClick={() => toggleStatus(index)}
                  >
                    {user.status}
                  </button>
                </td>
                <td>
  <div className="action-buttons">
    <button className="btn" onClick={() => editUser(index)}>
      <Edit size={16} />
      <span>Edit</span>
    </button>
    <button className="btn btn-outline" onClick={() => deleteUser(index)}>
      <Trash2 size={16} />
      <span>Delete</span>
    </button>
  </div>
</td>

              </tr>
            ))}
        </tbody>
      </table>
</div>
      {/* Modal Form */}
      <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'custom-modal' }}>
        <div className="modal-content">
          <h2 className="modal-title">{action} Task</h2>
          <div className="form-wrapper">
            <div className="form animated-form">
              <label>Task Name</label>
              <input
                type="text"
                className="animated-input"
                value={user.Task_Name}
                onChange={(e) => setUser({ ...user, Task_Name: e.target.value })}
              />
              <label>Assigned To</label>
              <input
                type="text"
                className="animated-input"
                value={user.Assigned_To}
                onChange={(e) => setUser({ ...user, Assigned_To: e.target.value })}
              />
              <label>Status</label>
              <select
                className="animated-input"
                value={user.status}
                onChange={(e) => setUser({ ...user, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="In Review">In Review</option>
              </select>
              <label>Description</label>
              <textarea
                className="animated-input"
                rows="4"
                value={user.Description}
                onChange={(e) => setUser({ ...user, Description: e.target.value })}
              ></textarea>

              {action === 'Add' && (
                <button className="btn" onClick={addUser}>
                  Submit
                </button>
              )}
              {action === 'Edit' && (
                <button className="btn" onClick={updateUser}>
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
     <footer className="footer">
  <p>
    Created by <strong>Vansh Chauhan</strong> &nbsp;|&nbsp;
    <a
      href="https://github.com/your-username/your-repo"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
      title="GitHub"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58...z" />
      </svg>
    </a>
    &nbsp;
    <a
      href="https://linkedin.com/in/your-linkedin-id"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
      title="LinkedIn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.146C0...z" />
      </svg>
    </a>
  </p>
  <p className="interview-message">
    I have completed the assignment for the <strong>Oritso</strong> company and I am waiting for your response.
  </p>
</footer>


    </div>
    
  );
}

export default App;
