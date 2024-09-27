import axios from 'axios';

export default {
  resume() {
    return axios.get('https://i83ff03rfd.execute-api.us-east-1.amazonaws.com/profile/profile');
  },
//   Email(){
//     return axios.post('/email')
//   }
};