import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TagServices from './TagServices';

// Componente do modal para adicionar/editar tags
const TagModal = ({ isOpen, onClose, onSave, tag }) => {
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    if (tag) {
      setTagName(tag.nome || '');
    } else {
      setTagName('');
    }
  }, [tag]);

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleSave = async () => {
    try {
      const newTag = { nome: tagName };
      if (tag) {
        await TagServices.editTag(tag.id, newTag);
      } else {
        await TagServices.addTag(newTag);
      }
      onSave();
    } catch (error) {
      console.error('Error saving tag:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel={tag ? 'Editar Tag' : 'Adicionar Tag'}>
      <h2>{tag ? 'Editar Tag' : 'Adicionar Tag'}</h2>
      <input type="text" value={tagName} onChange={handleTagNameChange} />
      <button type="button" onClick={handleSave}>Salvar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </Modal>
  );
};

export default TagModal;
