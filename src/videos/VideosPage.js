import React, { useState, useEffect } from 'react';
import VideoServices from './VideoServices';
import VideoModal from './VideoModal';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Função para carregar os vídeos da API
  const fetchVideos = async () => {
    try {
      const data = await VideoServices.getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDeleteVideo = async (id) => {
    try {
      await VideoServices.deleteVideo(id);
      // Vídeo deletado com sucesso, atualize a lista de vídeos
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleOpenModal = () => {
    setSelectedVideo(null);
    setModalIsOpen(true);
  };

  const handleOpenEditModal = (video) => {
    setSelectedVideo(video);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setModalIsOpen(false);
  };

  const handleSaveVideo = async () => {
    // Vídeo salvo com sucesso, atualize a lista de vídeos
    fetchVideos();
    
  };

  return (
    <div className="videos">
      <button className="add-button" onClick={handleOpenModal}>Adicionar Vídeo</button>
      <div className="videos-container">
        {videos.map((video) => (
          <div
            className="video-card"
            key={video.id}
            onClick={() => handleOpenEditModal(video)}
          >
            <img className="video-thumbnail" src={video.thumbnail} alt="Video Thumbnail" />
            <h3 className="video-title">{video.title}</h3>
            <p className="video-description">{video.description}</p>
            <button
              className="delete-button"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteVideo(video.id);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
  
      <VideoModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        video={selectedVideo}
        onSave={handleSaveVideo}
      />
    </div>
  );
};
  

export default VideosPage;
