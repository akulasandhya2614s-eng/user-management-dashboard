import { useState, useEffect } from "react";

import "./styles/App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import Pagination from "./components/Pagination";
import ConfirmDelete from "./components/ConfirmDelete";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./api/userService";



function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [departmentFilter, setDepartmentFilter] = useState("");


  const [selectedUser, setSelectedUser] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

const [userToDelete, setUserToDelete] = useState(null);

  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  setLoading(true);

  try {
    const response = await getUsers();

    const mappedUsers = response.data.map((user) => {
      const names = user.name.split(" ");

      const departments = [
        "IT",
        "HR",
        "Sales",
        "Engineering",
      ];

      return {
        id: user.id,
        firstName: names[0],
        lastName: names.slice(1).join(" "),
        email: user.email,
        department:
          departments[
            Math.floor(
              Math.random() * departments.length
            )
          ],
      };
    });

    setUsers(mappedUsers);
  } catch (error) {
    setError("Failed to load users. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const saveUser = async (user) => {
    if (user.id) {
      await updateUser(user.id, user);

      setUsers(
        users.map((u) =>
          u.id === user.id ? user : u
        )
      );
    } else {
      const response =
        await createUser(user);

      setUsers([
        {
          ...user,
          id: response.data.id,
        },
        ...users,
      ]);
    }
    setSelectedUser(null);
  };
  
  const removeUser = (id) => {
  setUserToDelete(id);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  await deleteUser(userToDelete);

  setUsers(
    users.filter(
      (user) => user.id !== userToDelete
    )
  );

  setShowDeleteModal(false);
  setUserToDelete(null);
};

const cancelDelete = () => {
  setShowDeleteModal(false);
  setUserToDelete(null);
};

 const filteredUsers = users.filter((user) => {
  const matchesSearch =
    user.firstName
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.lastName
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesDepartment =
    departmentFilter === "" ||
    user.department === departmentFilter;

  return matchesSearch && matchesDepartment;
});

    const sortedUsers = [...filteredUsers].sort(
  (a, b) => {
   if (sortField === "id") {
  return sortOrder === "asc"
    ? a.id - b.id
    : b.id - a.id;
}

const valueA =
  a[sortField].toString().toLowerCase();

const valueB =
  b[sortField].toString().toLowerCase();

    return sortOrder === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  }
);

  const lastIndex =
    currentPage * usersPerPage;

  const firstIndex =
    lastIndex - usersPerPage;

  const currentUsers =
    sortedUsers.slice(
      firstIndex,
      lastIndex
    );

  const totalPages = Math.ceil(
    filteredUsers.length /
      usersPerPage
  );

  return (
    <div className="container">
      {loading && (
  <div className="loading">
    Loading Users...
  </div>
)}

      {error && (
  <div className="error">
    {error}
  </div>
)}
      <Header />

<ConfirmDelete
  isOpen={showDeleteModal}
  onConfirm={confirmDelete}
  onCancel={cancelDelete}
/>
      <UserForm
        selectedUser={selectedUser}
        onSave={saveUser}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      /> 
  <div className="controls-row">
      <select
  value={departmentFilter}
  onChange={(e) =>
    setDepartmentFilter(e.target.value)
  }
>
  <option value="">All Departments</option>
  <option value="IT">IT</option>
  <option value="HR">HR</option>
  <option value="Sales">Sales</option>
  <option value="Engineering">
    Engineering
  </option>
</select>

      
  <select
    value={sortField}
    onChange={(e) =>
      setSortField(e.target.value)
    }
  > 
    <option value="id">ID</option>
    <option value="firstName">
      First Name
    </option>


    <option value="lastName">
      Last Name
    </option>

    <option value="email">
      Email
    </option>

    <option value="department">
      Department
    </option>
  </select>

  <select
    value={sortOrder}
    onChange={(e) =>
      setSortOrder(e.target.value)
    }
  >
    <option value="asc">
      Ascending
    </option>

    <option value="desc">
        Descending
       </option>
       </select>
    
      </div>

      <UserTable
        users={currentUsers}
        onEdit={setSelectedUser}
        onDelete={removeUser}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={
          setCurrentPage
        }
      />
    </div>
  );
}

export default App;