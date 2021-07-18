import axios from 'axios';

const moviesDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '58ca72e37c65ec7364a8bfa28012a232',
    language: 'en-US',
  },
});

export default moviesDB;
