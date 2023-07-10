import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import VideoServices from './VideoServices';


const VideoModal = ({ isOpen, video, onClose, onSave }) => {
    const [videoId , setVideoId] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoDuration, setVideoDuration] = useState('');
    const [videoDate, setVideoDate] = useState('');
    const [videoThumbnail, setVideoThumbnail] = useState('');
    const [videoViews, setVideoViews] = useState(0);
    const [videoLikes, setVideoLikes] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (video) {
            setVideoId(video.id || '');
            setVideoUrl(video.url || '');
            setVideoTitle(video.title || '');
            setVideoDescription(video.description || '');
            setVideoDuration(video.duracao || '');
            setVideoDate(video.data || '');
            setVideoThumbnail(video.thumbnail || '');
            setVideoViews(video.views || 0);
            setVideoLikes(video.likes || 0);
        } else {
            setVideoUrl('');
            setVideoTitle('');
            setVideoDescription('');
            setVideoDuration('');
            setVideoDate('');
            setVideoThumbnail('');
            setVideoViews(0);
            setVideoLikes(0);
        }
    }, [video]);

    useEffect(() => {
        // Realiza a validação dos campos
        const validateForm = () => {
            const isUrlValid = videoUrl.trim() !== '';
            const isTitleValid = videoTitle.trim() !== '';
            const isDescriptionValid = videoDescription.trim() !== '';
            const isDurationValid = videoDuration.trim() !== '';
            const isDateValid = videoDate.trim() !== '';
            const isThumbnailValid = videoThumbnail.trim() !== '';
            const isViewsValid = videoViews >= 0;
            const isLikesValid = videoLikes >= 0;

            // Define se o formulário é válido
            setIsFormValid(
                isUrlValid &&
                isTitleValid &&
                isDescriptionValid &&
                isDurationValid &&
                isDateValid &&
                isThumbnailValid &&
                isViewsValid &&
                isLikesValid
            );
        };

        validateForm();
    }, [
        videoUrl,
        videoTitle,
        videoDescription,
        videoDuration,
        videoDate,
        videoThumbnail,
        videoViews,
        videoLikes,
    ]);

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


    const handleSave = async () => {
        const editedVideo = {
            id: videoId,
            url: videoUrl,
            title: videoTitle,
            description: videoDescription,
            duracao: videoDuration,
            data: videoDate,
            thumbnail: videoThumbnail,
            views: videoViews,
            likes: videoLikes,
            dislikes: 0,
        };

        try {
            if (video) {
                await VideoServices.editVideo(editedVideo.id, editedVideo);
            } else {
                await VideoServices.addVideo(editedVideo);
            }

            onSave();
            onClose();

            // Limpa os campos do formulário
            setVideoId('');
            setVideoUrl('');
            setVideoTitle('');
            setVideoDescription('');
            setVideoDuration('');
            setVideoDate('');
            setVideoThumbnail('');
            setVideoViews(0);
            setVideoLikes(0);


        } catch (error) {
            console.error('Error saving video:', error);
        }
    };

    const getVideoData = async () => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: extractVideoId(videoUrl),
                    key: 'AIzaSyAg8V36E0Ayn9YSgsXOG41bOehXMhzCPWY',
                },
            });

            // Extrair os dados do vídeo da resposta e atualizar os campos do formulário
            const videoData = response.data.items[0];
            setVideoTitle(videoData.snippet.title);
            setVideoDescription(videoData.snippet.description);
            setVideoDuration(formatVideoDuration(videoData.contentDetails.duration));
            setVideoThumbnail(videoData.snippet.thumbnails.high.url);
            setVideoViews(videoData.statistics.viewCount);
            setVideoLikes(videoData.statistics.likeCount);
            setVideoDate(videoData.snippet.publishedAt.split('T')[0]);
        } catch (error) {
            console.error('Error getting video data:', error);
        }
    };

    const extractVideoId = (videoUrl) => {
        const videoIdRegex =
            /(?<=v=|\/videos\/|embed\/|youtu.be\/|\/v\/|\/e\/|\/watch\?v=|\/embed\/|\/v=|\/e=|\/watch\?v=|\/\?v=|\/\?vi=|\/\?version=|\/\?feature=player_embedded&v=|%2Fvideos%2F|embed%\?cid=|&v=|&vi=|embed&v=|watch\?v%3D|youtube.com%2Fwatch%3Fv%3D|youtube.com%2Fv%2F|youtube.com%2Fembed%2F|youtube.com%2Fuser%2F[^#]+#([^]+\/)*)[\da-zA-Z_-]{11}/;
        const match = videoUrl.match(videoIdRegex);
        return match ? match[0] : null;
    };

    const formatVideoDuration = (duration) => {
        const durationRegex = /(\d+)(?=[HMS])/g;
        const parts = duration.match(durationRegex);
        if (!parts) return '00:00';
      
        const hours = parts.length > 2 ? parseInt(parts[0], 10) : 0;
        const minutes = parseInt(parts[parts.length - 2], 10);
        const seconds = parseInt(parts[parts.length - 1], 10);
      
        let formattedDuration = '';
        if (hours > 0) {
          formattedDuration += `${hours.toString().padStart(2, '0')}:`;
        }
        if (hours > 0 || minutes > 0) {
          formattedDuration += `${minutes.toString().padStart(2, '0')}:`;
        } else {
          formattedDuration += '00:';
        }
        formattedDuration += `${seconds.toString().padStart(2, '0')}`;
      
        return formattedDuration;
      };
      

    return (
        <form>

            <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Adicionar/Editar Vídeo">
                <h2>{video ? 'Editar Vídeo' : 'Adicionar Vídeo'}</h2>
                <div>
                    <label>URL do Vídeo:</label>
                    <input type="text" value={videoUrl} onChange={handleVideoURLChange} />
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
                <div className="buttons">
                    <button type="button" onClick={handleSave} disabled={!isFormValid}>
                        {video ? 'Salvar' : 'Adicionar'}
                    </button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </Modal>
        </form>


    );
};

export default VideoModal;
