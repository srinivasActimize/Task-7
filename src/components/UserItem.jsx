import React from "react";

function UserItem({ user, onView, onDelete }) {
  return (
    <td>
      {user.name} ({user.age})
      <button onClick={() => onView(user)}><i class="bi bi-eye"></i></button>
      <button onClick={() => onDelete(user.id)}><i class="bi bi-trash"></i></button>
    </td>
  );
}

export default UserItem;
