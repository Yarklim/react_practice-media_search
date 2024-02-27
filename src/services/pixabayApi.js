import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const API_KEY = '33618403-e49ffccd3be3cb931e6ce1749';

export const fetchMedia = async (q, page = 1) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 12,
  });

  const { data } = await axios.get(`${baseURL}?${params}`);

  return data;
};
