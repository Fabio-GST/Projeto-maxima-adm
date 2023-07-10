import React, { useState, useEffect } from 'react';
import UserServices from './UserServices';
import UserModal from './UserModal';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UserServices.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (user) => {
    try {
      await UserServices.addUser(user);
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await UserServices.deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openModal = () => {
    setSelectedUser(null);
    setModalIsOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  const handleSaveUser = (user) => {
    if (selectedUser) {
      handleEditUser(selectedUser.id, user);
    } else {
      handleAddUser(user);
    }
  };

  const handleEditUser = async (userId, updatedUser) => {
    try {
      await UserServices.editUser(userId, updatedUser);
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <div className="users-page">
      <button className="add-button" onClick={openModal}>
        Adicionar Usuário
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Login</th>
            <th>Token</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.login}</td>
              <td>{user.token}</td>
              <td>
                <button onClick={() => openEditModal(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        selectedUser={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UsersPage;
