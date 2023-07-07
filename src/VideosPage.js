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
    // Implemente a lógica de exclusão do vídeo
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
  };

  return (
    <div className="videos">
        <button className="add-button" onClick={openModal}>Adicionar Vídeo</button>
    <div className="videos-container">
      

      {videos.map((video) => (
        <div className="video-card" key={video.id}>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Adicionar Vídeo"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Adicionar Vídeo</h2>
        <form>
          <div>
            <label>URL do Vídeo:</label>
            <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          </div>
          <div>
            <label>Título:</label>
            <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
          </div>
          <div>
            <label>Descrição:</label>
            <input type="text" value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} />
          </div>
          <div>
            <label>Duração:</label>
            <input type="text" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} />
          </div>
          <div>
            <label>Data:</label>
            <input type="text" value={videoDate} onChange={(e) => setVideoDate(e.target.value)} />
          </div>
          <div>
            <label>Thumbnail:</label>
            <input type="text" value={videoThumbnail} onChange={(e) => setVideoThumbnail(e.target.value)} />
          </div>
          <div className="buttons">
            <button type="button" onClick={handleAddVideo}>Adicionar</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
    </div>
  );
};

export default VideosPage;
