import 'modern-normalize'
import './App.css'

import { useEffect, useState } from 'react';
// import { ImageGallery, SearchBar } from 'components/';
import ImageGallery from './components/ImageGallery/ImageGallery'
import SearchBar from './components/SearchBar/SearchBar';

import fetchPhotos from './apiService/unsplashApi';


function App() {
  const [filter, setFilter] = useState(''); 
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function callFetchPhotos() {
      const data = await fetchPhotos(filter);
      console.log(data);
      setPhotos(data);
    }
    callFetchPhotos();
  }, [filter]);

  function changeFilter(value) {
    setFilter(value);
  }

  return (
    <>
      <SearchBar changeFilter={changeFilter} />
      <ImageGallery photos={photos}/>
    </>
  )
}

export default App
