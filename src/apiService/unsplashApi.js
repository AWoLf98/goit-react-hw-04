import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export default async function fetchPhotos(filter) {
    const response = await axios.get(`photos?page=2&x-per-page=15&client_id=8nQ0M-aBYfkEhBu7oUnQmCJnSQcd3XyKBPTmc-X9Czg&query={${filter}}`);
    return response.data;
}

