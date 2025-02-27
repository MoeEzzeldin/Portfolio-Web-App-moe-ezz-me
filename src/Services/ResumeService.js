import axios from 'axios';

export default {
  resume() {
    return axios.get(import.meta.env.VITE_RESUME_URL); 
  },
  Email(data) {
    return axios({
      method: 'post',
      url: import.meta.env.VITE_EMAIL_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }
};