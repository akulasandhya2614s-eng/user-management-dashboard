import { useState, useEffect } from "react";

function UserForm({
  selectedUser,
  onSave,
}) {
  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName) {
      alert("First Name Required");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Invalid Email");
      return;
    }

    onSave(formData);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />

      <button type="submit" className="save-btn">
        Save User
      </button>
    </form>
  );
}

export default UserForm;