import axios from 'axios';

export default {
  resume() {
    return axios.get('https://evqgg7vggb.execute-api.us-east-1.amazonaws.com/info/resume');
  },
  Email(){
    return axios.post('/email')
  }
};