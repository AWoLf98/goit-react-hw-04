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
import { useInView } from 'react-intersection-observer';

function App() {
  const [filter, setFilter] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  //modal
  const [isModalOpen, setisModalOpen] = useState(false);
  //modal img
  const [imgSrc, setImgSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  //Infinity scroll
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    async function callFetchPhotos() {
      try {
        if (!filter) {
          return;
        }

        setLoading(true);
        setErr(false);
        const data = await fetchPhotos(filter, page);
        setPage(prevPage => prevPage + 1);
        setPhotos(prevItems => [...prevItems, ...data.results]);
        console.log(data.results);
      } catch {
        setErr(true);
      }
    }
    callFetchPhotos();
  }, [filter, page]);

  //Infinity scroll
  useEffect(() => {
    async function updateData() {
      try {
        if (!filter) {
          return;
        }
        console.log(inView);
        if ( loading && photos && inView && hasMore && page != 2 && page != 1) {
          setLoading(false);
          const data = await fetchPhotos(filter, page);
          setPage(prevPage => prevPage + 1);
          setPhotos(prevItems => [...prevItems, ...data.results]);
          setHasMore(data.next != null);
          // setLoading(true);
        }
      } catch {
        setErr(true);
      }
    }
    updateData();
  }, [inView, hasMore, page, filter, photos]);

  function changeFilter(value) {
    setFilter(value);
  }

  function handleClose() {
    setisModalOpen(false);
  }

  function handleOpenModal(currImg, currAlt) {
    // console.log(currImg);
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
       {loading && <p ref={ref}>load</p>}
      {/* <Loader ref={ref} visible={loading} /> */}
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
