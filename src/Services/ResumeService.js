import axios from 'axios';

export default {
  resume() {
    return axios.get(import.meta.env.VITE_RESUME_URL); 
  },
};