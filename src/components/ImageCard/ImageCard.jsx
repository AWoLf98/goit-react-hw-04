import css from './ImageCard.module.css';

const ImageCard = ({ urls, user, likes }) => {
  return (
    <div className={css.conteiner}>
      <img className={css.img} src={urls.small} alt={`photo by ${user.username}`} />
      <div className={css['img-card']}>
        <span>Likes: {likes} </span>
        <span>User: {user.username}</span>
      </div>
    </div>
  );
};

export default ImageCard;
