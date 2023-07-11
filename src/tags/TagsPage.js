import React, { useState, useEffect } from 'react';
import TagServices from './TagServices';
import TagModal from './TagsModal';


// Componente da página de tags
const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const tags = await TagServices.getTags();
      setTags(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleOpenModal = () => {
    setSelectedTag(null);
    setModalIsOpen(true);
  };

  const handleOpenEditModal = (tag) => {
    setSelectedTag(tag);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTag(null);
    setModalIsOpen(false);
  };

  const handleSaveTag = (tag) => {
    if(selectedTag){
      handleEditTag(selectedTag.id, tag);
    } else {
      handleAddTag(tag);
    }
    fetchTags();
    handleCloseModal();
  };

  const handleAddTag = async (tag) => {
    try {
      await TagServices.addTag(tag);
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleEditTag = async (tagId, updatedTag) => {
    try {
      await TagServices.editTag(tagId, updatedTag);
    } catch (error) {
      console.error('Error editing tag:', error);
    }
  };


  return (
    <div className="tags-page">
      <h2>Tags</h2>
      <button onClick={handleOpenModal}>Adicionar Tag</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id} onClick={() => handleOpenEditModal(tag)}>
            {tag.nome}
          </li>
        ))}
      </ul>
      <TagModal isOpen={modalIsOpen} onClose={handleCloseModal} onSave={handleSaveTag} tag={selectedTag} />
    </div>
  );
};

export default TagsPage;
