import axios from 'axios';

export const axiosInstance = axios.create({
  // TODO: 서버 배포되면 .env.local에 baseURL 넣어서 가져와야 함.
  baseURL: 'temp',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});
