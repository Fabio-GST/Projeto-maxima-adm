import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const TagServices = {
    getTags: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tags`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching tags:', error);
        }
    },

    addTag: async (tag) => {
        try {
            const response = await axios.post(`${BASE_URL}/tags`, tag);
            return response.data;
        } catch (error) {
            throw new Error('Error adding tag:', error);
        }
    },

    editTag: async (tagId, updatedTag) => {
        try {
            const url = `${BASE_URL}/tags/${tagId}`;
            const response = await axios.put(url, updatedTag);
            return response.data;
        } catch (error) {
            throw new Error('Error editing tag:', error);
        }
    }
};

export default TagServices;
