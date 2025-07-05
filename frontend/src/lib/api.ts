import axios from 'axios';

const api = axios.create({
  baseURL: 'https://b3syyb9vf3.execute-api.us-east-1.amazonaws.com', 
});

export default api;
