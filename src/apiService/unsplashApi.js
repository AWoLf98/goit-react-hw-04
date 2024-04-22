import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Accept-Version'] = 'v1';
axios.defaults.headers.common['Authorization'] =
  'Client-ID 8nQ0M-aBYfkEhBu7oUnQmCJnSQcd3XyKBPTmc-X9Czg';

axios.defaults.params = { per_page: 15 };

export default async function fetchPhotos(query, page) {
  console.log(query);
  const response = await axios.get('/search/photos', {
    params: {
      query,
      page,
    },
  });
  return response.data;
}
