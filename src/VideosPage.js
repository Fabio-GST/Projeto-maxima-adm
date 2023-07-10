import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
  const [videoViews, setVideoViews] = useState(0);
  const [videoLikes, setVideoLikes] = useState(0);
  const [videoDeslikes, setVideoDeslikes] = useState(0);
  const [videoStatus, setVideoStatus] = useState(true);


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
          views: videoViews,
          likes: videoLikes,
          deslikes: videoDeslikes,
          status: videoStatus,

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
    setVideoUrl(e.target.value);
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

  const handleVideoViewsChange = (e) => {
    setVideoViews(e.target.value);
  };

  const handleVideoLikesChange = (e) => {
    setVideoLikes(e.target.value);
  };

  const handleVideoDeslikesChange = (e) => {
    setVideoDeslikes(e.target.value);
  };

  const handleVideoStatusChange = (e) => {
    setVideoStatus(e.target.value);
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
          views: videoViews,
          likes: videoLikes,
          deslikes: videoDeslikes,
          status: videoStatus,

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


  const getVideoData = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: extractVideoId(videoUrl),
          key: 'AIzaSyAg8V36E0Ayn9YSgsXOG41bOehXMhzCPWY'
        }
      });
  
      // Extrair os dados do vídeo da resposta e atualizar os campos do formulário
      const videoData = response.data.items[0];
      setVideoTitle(videoData.snippet.title);
      setVideoDescription(videoData.snippet.description);
      setVideoDuration(videoData.contentDetails.duration.split('PT')[1]. replace('H', ':').replace('M', ':').replace('S', ''));
      setVideoThumbnail(videoData.snippet.thumbnails.default.url);
      setVideoViews(videoData.statistics.viewCount);
      setVideoLikes(videoData.statistics.likeCount);
      setVideoDeslikes(videoData.statistics.dislikeCount);
      setVideoDate(videoData.snippet.publishedAt.split('T')[0]);
      setVideoStatus(true);


      // Atualize os outros campos conforme necessário
  
    } catch (error) {
      console.error('Error getting video data:', error);
    }
  };

  const extractVideoId = (videoUrl) => {
    const videoIdRegex = /(?<=v=|\/videos\/|embed\/|youtu.be\/|\/v\/|\/e\/|\/watch\?v=|\/embed\/|\/v=|\/e=|\/watch\?v=|\/\?v=|\/\?vi=|\/\?version=|\/\?feature=player_embedded&v=|%2Fvideos%2F|embed%\?cid=|&v=|&vi=|embed&v=|watch\?v%3D|youtube.com%2Fwatch%3Fv%3D|youtube.com%2Fv%2F|youtube.com%2Fembed%2F|youtube.com%2Fuser%2F[^#]+#([^\/]+\/)*)[\da-zA-Z_-]{11}/;
    const match = videoUrl.match(videoIdRegex);
    return match ? match[0] : null;
  };
  
  



  const handleOpenEditModal = (video) => {
    setSelectedVideo(video);
    setVideoUrl(video.url);
    setVideoTitle(video.title);
    setVideoDescription(video.description);
    setVideoDuration(video.duracao);
    setVideoDate(video.data);
    setVideoThumbnail(video.thumbnail);
    setVideoViews(video.views);
    setVideoLikes(video.likes);
    setVideoDeslikes(video.deslikes);
    setVideoStatus(video.status);

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
            <input type="text" value={videoUrl} onChange={handleVideoURLChange} 
            />
            <button type="button" onClick={getVideoData}>Buscar</button>
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
          <div>
            <label>Views:</label>
            <input type="text" value={videoViews} onChange={handleVideoViewsChange} />
          </div>
          <div>
            <label>Likes:</label>
            <input type="text" value={videoLikes} onChange={handleVideoLikesChange} />
          </div>
          <div>
            <label>Deslikes:</label>
            <input type="text" value={videoDeslikes} onChange={handleVideoDeslikesChange} />
          </div>
          <div>
            <label>Status:</label>
            <input type="text" value={videoStatus} onChange={handleVideoStatusChange} />
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
