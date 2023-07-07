import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoDate, setVideoDate] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Função para carregar os vídeos da API
  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/videos');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDeleteVideo = (id) => {
    fetch(`http://localhost:3000/api/videos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      // Vídeo deletado com sucesso, atualize a lista de vídeos
      fetchVideos();
    });
  };

  const handleAddVideo = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: videoUrl,
          title: videoTitle,
          description: videoDescription,
          duracao: videoDuration,
          data: videoDate,
          thumbnail: videoThumbnail,
          isPop: false,
        }),
      });
      if (response.ok) {
        // Vídeo adicionado com sucesso, atualize a lista de vídeos
        fetchVideos();
        closeModal();
      } else {
        console.error('Failed to add video:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setVideoUrl('');
    setVideoTitle('');
    setVideoDescription('');
    setVideoDuration('');
    setVideoDate('');
    setVideoThumbnail('');
    setSelectedVideo(null);
  };

  const handleVideoURLChange = (e) => {
    const url = e.target.value;
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      const videoId = videoId.substring(0, ampersandPosition);
      setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
      setVideoThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
    } else {
      setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
      setVideoThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
    }
  };

  const handleVideoTitleChange = (e) => {
    setVideoTitle(e.target.value);
  };

  const handleVideoDescriptionChange = (e) => {
    setVideoDescription(e.target.value);
  };

  const handleVideoDurationChange = (e) => {
    setVideoDuration(e.target.value);
  };

  const handleVideoDateChange = (e) => {
    setVideoDate(e.target.value);
  };

  const handleVideoThumbnailChange = (e) => {
    setVideoThumbnail(e.target.value);
  };

  const handleEditVideo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/videos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: videoUrl,
          title: videoTitle,
          description: videoDescription,
          duracao: videoDuration,
          data: videoDate,
          thumbnail: videoThumbnail,
          isPop: false,
        }),
      });
      if (response.ok) {
        // Vídeo editado com sucesso, atualize a lista de vídeos
        fetchVideos();
        closeModal();
      } else {
        console.error('Failed to edit video:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing video:', error);
    }
  };

  const handleOpenEditModal = (video) => {
    setSelectedVideo(video);
    setVideoUrl(video.url);
    setVideoTitle(video.title);
    setVideoDescription(video.description);
    setVideoDuration(video.duracao);
    setVideoDate(video.data);
    setVideoThumbnail(video.thumbnail);
    openModal();
  };

  return (
    <div className="videos">
      <button className="add-button" onClick={openModal}>Adicionar Vídeo</button>
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
              onClick={() => handleDeleteVideo(video.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Adicionar/Editar Vídeo"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>{selectedVideo ? 'Editar Vídeo' : 'Adicionar Vídeo'}</h2>
        <form>
          <div>
            <label>URL do Vídeo:</label>
            <input type="text" value={videoUrl} onChange={handleVideoURLChange} />
          </div>
          <div>
            <label>Título:</label>
            <input type="text" value={videoTitle} onChange={handleVideoTitleChange} />
          </div>
          <div>
            <label>Descrição:</label>
            <input type="text" value={videoDescription} onChange={handleVideoDescriptionChange} />
          </div>
          <div>
            <label>Duração:</label>
            <input type="text" value={videoDuration} onChange={handleVideoDurationChange} />
          </div>
          <div>
            <label>Data:</label>
            <input type="text" value={videoDate} onChange={handleVideoDateChange} />
          </div>
          <div>
            <label>Thumbnail:</label>
            <input type="text" value={videoThumbnail} onChange={handleVideoThumbnailChange} />
          </div>
          <div className="buttons">
            <button type="button" onClick={selectedVideo ? () => handleEditVideo(selectedVideo.id) : handleAddVideo}>
              {selectedVideo ? 'Salvar' : 'Adicionar'}
            </button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VideosPage;
