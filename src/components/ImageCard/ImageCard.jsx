import css from './ImageCard.module.css';

const ImageCard = ({ urls, user: { username }, likes, description, openModal }) => {
  const alt = `${description}, photo by ${username}`;
  return (
    <div
      className={css.conteiner}
      onClick={() => {
        openModal(urls.regular, alt);
      }}
    >
      <img className={css.img} src={urls.small} alt={alt} loading='lazzy'/>
      <div className={css['img-card']}>
        <span>Likes: {likes} </span>
        <span>User: {username}</span>
      </div>
    </div>
  );
};

export default ImageCard;
