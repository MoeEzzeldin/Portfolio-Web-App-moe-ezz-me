import axios from 'axios';

export default {
  resume() {
    return axios.get('https://evqgg7vggb.execute-api.us-east-1.amazonaws.com/info/resume'); 
  },
  Email(data) {
    return axios({
      method: 'post',
      url: 'https://ujbefj66q2.execute-api.us-east-1.amazonaws.com/test/contact',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      data: JSON.stringify(data), // Ensure data is in stringified JSON format if necessary
    });
  }
};
