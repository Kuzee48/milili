// lib/api.js
const PROXY_URL = 'https://api.allorigins.win/raw?url='; // Proxy gratis tanpa API key
const BASE_URL = 'https://api.sansekai.my.id/api/melolo';

export const fetchAPI = async (endpoint) => {
  const fullUrl = `${BASE_URL}${endpoint}`;
  const res = await fetch(`${PROXY_URL}${encodeURIComponent(fullUrl)}`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export const getTrending = () => fetchAPI('/trending');
export const getLatests = () => fetchAPI('/latest');
export const getDetail = (bookId) => fetchAPI(`/detail?bookId=${bookId}`);
export const getStream = (videoId) => fetchAPI(`/stream?videoId=${videoId}`);
export const searchDramas = (query) => fetchAPI(`/search?query=${query}&limit=10&offset=0`);
