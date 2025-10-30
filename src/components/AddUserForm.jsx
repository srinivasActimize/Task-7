import React, { useState } from "react";

function AddUserForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age) return alert("Please fill all fields");
    onAdd({ name, age });
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New User</h3>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br /><br />
      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <br /><br />
      <button type="submit">Add User</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default AddUserForm;
