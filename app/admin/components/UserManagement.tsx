// src/components/admin/UserManagement.tsx
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import adminApiRequests from "@/app/apiRequests/admin";
import {
  deleteUserBodyType,
  getAllUsersResponse,
  updateUserBodyType,
} from "@/app/interfaces";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  createdDate: string;
  roleName: string[];
}
const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users from API
  const fetchUsers = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken") || "";
    try {
      const response = await adminApiRequests.user.getAll(accessToken);
      setUsers(response.payload.result); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new user (if applicable)
  const handleAddUser = async (newUser: updateUserBodyType) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    try {
      await adminApiRequests.user.update(newUser, accessToken);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (userId: any) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    try {
      await adminApiRequests.user.delete(userId, accessToken);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(
    users.map((user) => ({
      id: user.id,
      email: user.email,
      password: "",
      oldPassword: "",
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      roleName: user.roleName.join(", "),
    }))
  );

  return (
    // src/components/admin/UserManagement.tsx
    <TabContent
      title="Quản lý Người Dùng"
      fields={["id", "Tên", "Email", "Số điện thoại", "Vai trò"]}
      data={users.map((user) => ({
        id: user.id,
        email: user.email,
        password: "",
        oldPassword: "",
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        roleName: user.roleName.join(", "),
      }))}
      onAdd={handleAddUser}
      onDelete={(id) =>
        handleDeleteUser({
          username: `user${id}`,
          password: "placeholder",
          deleeteUserId: id,
        })
      }
      loading={loading}
    />
  );
};

export default UserManagement;
