import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({photos, openModal}) => {
  return (
    <ul className={css.gallery}>
      {
        photos.map((photo) => {
          // console.log(photo);
        return(<li className={css['gallery-item']} key={photo.id}><ImageCard {...photo} openModal={openModal} /></li>);
        })
      }
    </ul>
  );
};

export default ImageGallery;
