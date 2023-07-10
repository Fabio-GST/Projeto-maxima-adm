import React, { useState } from 'react';
import UserServices from './UserServices';
import Modal from 'react-modal';

const UserModal = ({ isOpen, onClose, selectedUser, onSave }) => {
  const [nome, setNome] = useState(selectedUser ? selectedUser.nome : '');
  const [login, setLogin] = useState(selectedUser ? selectedUser.login : '');
  const [token, setToken] = useState(selectedUser ? selectedUser.token : '');
  const [senha, setSenha] = useState(selectedUser ? selectedUser.senha : '');

  const handleSave = () => {
    const user = { nome, login, token, ativo: true, senha };

    if (selectedUser) {
      onSave(selectedUser.id, user);
    } else {
      onSave(user);
    }

    resetForm();
  };

  const resetForm = () => {
    setNome('');
    setLogin('');
    setToken('');
    setSenha('');

  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Adicionar/Editar Usuário">
      <h2>{selectedUser ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
      <form>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Login:</label>
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div>
          <label>Token:</label>
          <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        
        <div className="buttons">
          <button type="button" onClick={handleSave}>
            {selectedUser ? 'Salvar' : 'Adicionar'}
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
