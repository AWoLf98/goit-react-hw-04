import 'modern-normalize';
import './App.css';

import { useEffect, useState } from 'react';
// import { ImageGallery, SearchBar } from 'components/';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';

import fetchPhotos from './apiService/unsplashApi';

function App() {
  const [filter, setFilter] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

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
        if(!filter) {
          return;
        }

        setLoading(true);
        setErr(false)
        const data = await fetchPhotos(filter, page);
        setPhotos(data.results);
      }
      catch {
        setErr(true)
      }
      finally {
        setLoading(false);
      }
    }
    callFetchPhotos();
  }, [filter, page]);

  function changeFilter(value) {
    setFilter(value);
  }

  return (
    <>
      <SearchBar changeFilter={changeFilter} />
      {/* щоб нуля не було */}
      {err && <ErrorMessage />}
      {!!photos.length && <ImageGallery photos={photos} />}
      <Loader visible={loading} />
    </>
  );
}

export default App;
