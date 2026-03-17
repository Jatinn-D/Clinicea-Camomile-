// In a file like client/src/api/config.js
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://clinicea-camomile-production.up.railway.app';

export default API_BASE_URL;