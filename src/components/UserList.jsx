import React from "react";
import UserItem from "./UserItem";

function UserList({ users, onView, onDelete }) {
  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <tr>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onView={onView}
          onDelete={onDelete}
        />
      ))}
    </tr>
  );
}

export default UserList;
