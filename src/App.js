import React, { useState } from "react";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);

  const addUser = (user) => {
    const updatedUsers = [...users, { id: Date.now(), ...user }];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowModal(false);
  };

  const deleteUser = (id) => {
    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const viewUser = (user) => {
    alert(`Name: ${user.name}\nAge: ${user.age}`);
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Header />
      <h2>Users</h2>

      <button onClick={() => setShowModal(true)}>Add User</button>

      <table className="container" style={{ border: "1px solid blue", width: "100%", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "lightgray" }}>
            <th>Username</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => viewUser(user)}>
                  <i className="bi bi-eye"></i>
                </button>
                <button onClick={() => deleteUser(user.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddUserForm onAdd={addUser} onCancel={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
