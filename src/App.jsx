import 'modern-normalize';
import './App.css';

import { useEffect, useState } from 'react';
// import { ImageGallery, SearchBar } from 'components/';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

import fetchPhotos from './apiService/unsplashApi';

function App() {
  const [filter, setFilter] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  let options = {
    root: document.querySelector('#root'),
    rootMargin: '0px',
    threshold: 1.0,
  };

  new IntersectionObserver(() => {
    setPage(prev => {
      return prev + 1;
    });
  }, options);

  useEffect(() => {
    async function callFetchPhotos() {
      try {
        if (!filter) {
          return;
        }

        setLoading(true);
        setErr(false);
        const data = await fetchPhotos(filter, page);
        setPhotos(data.results);
      } catch {
        setErr(true);
      } finally {
        setLoading(false);
      }
    }
    callFetchPhotos();
  }, [filter, page]);

  function changeFilter(value) {
    setFilter(value);
  }

  function handleClose() {
    setisModalOpen(false);
  }

  function handleOpenModal(currImg, currAlt) {
    console.log(currImg);
    setImgSrc(currImg);
    setImgAlt(currAlt);
    setisModalOpen(prev => !prev);
  }

  return (
    <>
      <SearchBar changeFilter={changeFilter} />
      {err && <ErrorMessage />}
      {/* щоб нуля не було */}
      {!!photos.length && <ImageGallery photos={photos} openModal={handleOpenModal} />}
      <Loader visible={loading} />
      {imgSrc && (
        <ImageModal
          isOpen={isModalOpen}
          imgSrc={imgSrc}
          imgAlt={imgAlt}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default App;
