import css from './ImageCard.module.css';

const ImageCard = ({urls, user}) => {
  return (
    <div className={css.conteiner}>
      <img className={css.img} src={urls.small} alt={`photo by ${user.username}`} />
    </div>
  );
};

export default ImageCard;
