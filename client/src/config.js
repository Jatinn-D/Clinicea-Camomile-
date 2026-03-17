// client/src/config.js

export const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://clinicea-camomile-production.up.railway.app/api';