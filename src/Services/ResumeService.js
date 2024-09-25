import axios from 'axios';

export default {
  resume() {
    return axios.get('/profile/profile');
  },
//   Email(){
//     return axios.post('/email')
//   }
};