import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = () => {
  return (
    <ul className={css.gallery}>
      <li>
        <ImageCard />
      </li>
    </ul>
  );
};

export default ImageGallery;
