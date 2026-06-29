function UserTable({
  users,
  onEdit,
  onDelete,
}) {
  return (
    <div className="table-container">
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.department}</td>

            <td>
              <button
                onClick={() => onEdit(user) }
                className="edit-btn"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(user.id)
                }
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default UserTable;