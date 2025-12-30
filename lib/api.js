/**
 * Utility API JOKERBOX
 * Menggunakan internal proxy untuk menghindari CORS dan 
 * masalah URL absolut saat rendering di sisi server (Vercel).
 */

const getBaseUrl = () => {
  // Jika di browser, gunakan path relatif
  if (typeof window !== 'undefined') return '';
  
  // Jika di server (saat build/SSR), gunakan VERCEL_URL dari environment
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  
  // Default untuk development lokal
  return 'http://localhost:3000';
};

export const fetchAPI = async (endpoint) => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/proxy?endpoint=${encodeURIComponent(endpoint)}`;
  
  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      throw new Error('Network response was not ok');
    }
    
    return await res.json();
  } catch (error) {
    console.error("Fetch API Error:", error.message);
    throw error;
  }
};

// Fungsi-fungsi pemanggil API JOKERBOX
export const getTrending = () => fetchAPI('/trending');
export const getLatests = () => fetchAPI('/latest');
export const getDetail = (bookId) => fetchAPI(`/detail?bookId=${bookId}`);
export const getStream = (videoId) => fetchAPI(`/stream?videoId=${videoId}`);
export const searchDramas = (query) => fetchAPI(`/search?query=${query}&limit=10&offset=0`);
