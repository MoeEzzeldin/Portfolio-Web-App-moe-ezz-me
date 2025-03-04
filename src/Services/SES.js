import axios from 'axios';

export default {
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