import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({photos}) => {
  return (
    <ul className={css.gallery}>
      {
        photos.map((photo) => {
          console.log(photo);
          return(<li className={css['gallery-item']} key={photo.id}><ImageCard {...photo}/></li>);
        })
      }
    </ul>
  );
};

export default ImageGallery;
