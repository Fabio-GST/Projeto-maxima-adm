import React, { useState, useEffect } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Lógica para buscar a lista de usuários da API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = () => {
    // Lógica para adicionar um novo usuário
    console.log('Add user');
  };

  return (
    <div className="users-page">
      <button className="add-button" onClick={handleAddUser}>
        Adicionar Usuário
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Login</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.login}</td>
              <td>{user.token}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
