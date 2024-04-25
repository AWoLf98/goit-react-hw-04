import 'modern-normalize';
import './App.css';

import { useEffect, useState } from 'react';
// import { ImageGallery, SearchBar } from 'components/';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import Filters from './components/Filters/Filters';

import fetchPhotos from './apiService/unsplashApi';
import { useInView } from 'react-intersection-observer';

function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  //filters
  const [orientation, setOrientation] = useState('');
  const [color, setColor] = useState('');
  const [content_filter, setContentFilter] = useState('low');
  const [order_by, setOrderBy] = useState('relevant');

  //modal
  const [isModalOpen, setisModalOpen] = useState(false);
  //modal img
  const [imgSrc, setImgSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  // Infinity scroll
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  //use effect for first search
  useEffect(() => {
    async function callFetchPhotos() {
      try {
        if (!query) {
          return;
        }
        setPage(1);
        setLoading(true);
        setErr(false);
        const data = await fetchPhotos(query, 1, orientation, color, content_filter, order_by);
        setPhotos(data.results);
      } catch {
        setErr(true);
      }
    }
    callFetchPhotos();
  }, [query, orientation, color, content_filter, order_by]);

  // Infinity scroll
  // useEffect(() => {
  //   async function updateData() {
  //     try {
  //       if (!query) {
  //         return;
  //       }
  //       console.log(inView);
  //       if (loading && photos && inView && hasMore) {
  //         // setLoading(false);
  //         setPage(prevPage => prevPage + 1);
  //         const data = await fetchPhotos(query, page, orientation, color, content_filter, order_by);
  //         setPhotos(prevItems => [...prevItems, ...data.results]);
  //         setHasMore(data.next != null);
  //         console.log(`Infinity: filter:${query} page: ${page}`);
  //         // setLoading(true);
  //       }
  //     } catch {
  //       setErr(true);
  //     }
  //     finally {
  //       // setLoading(true);
  //     }
  //   }
  //   // if (inView && loading) {
  //     updateData();
  //   // }
  // }, [inView, hasMore, page]);

  function changeQuery(value) {
    setQuery(value);
  }

  function handleClose() {
    setisModalOpen(false);
  }

  function handleResetFilters() {
    setOrientation('');
    setColor('');
    setContentFilter('low');
    setOrderBy('relevant');
  }

  function handleOpenModal(currImg, currAlt) {
    setImgSrc(currImg);
    setImgAlt(currAlt);
    setisModalOpen(prev => !prev);
  }

  return (
    <>
      <SearchBar changeFilter={changeQuery} />
      <Filters
        orientation={orientation}
        color={color}
        content_filter={content_filter}
        order_by={order_by}
        setOrientation={setOrientation}
        setColor={setColor}
        setContentFilter={setContentFilter}
        setOrderBy={setOrderBy}
        resetFilters={handleResetFilters}
      />

      {err && <ErrorMessage />}
      {/* щоб нуля не було */}
      {!!photos.length && <ImageGallery photos={photos} openModal={handleOpenModal} />}
      {/* {loading && <p ref={ref}>load</p>} */}
      <Loader ref={ref} visible={loading} />
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
