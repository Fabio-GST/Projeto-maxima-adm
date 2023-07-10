import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/usuarios';

const UserServices = {
  getUsers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  addUser: async (user) => {
    try {
      const response = await axios.post(BASE_URL, user);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  editUser: async (userId, updatedUser) => {
    try {
      const url = `${BASE_URL}/${userId}`;
      const response = await axios.put(url, updatedUser);
      return response.data;
    } catch (error) {
      console.error('Error editing user:', error);
      throw error;
    }
  },
};

export default UserServices;
