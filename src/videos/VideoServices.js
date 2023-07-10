import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/videos';

const VideoServices = {
  getVideos: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error getting videos:', error);
      throw error;
    }
  },

  addVideo: async (video) => {
    try {
      const response = await axios.post(BASE_URL, video);
      return response.data;
    } catch (error) {
      console.error('Error adding video:', error);
      throw error;
    }
  },

  deleteVideo: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  },

  editVideo: async (id, video) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, video);
      return response.data;
    } catch (error) {
      console.error('Error editing video:', error);
      throw error;
    }
  },
};

export default VideoServices;
