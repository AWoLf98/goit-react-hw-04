import css from './ImageCard.module.css';

const ImageCard = ({ urls, user: { username }, likes, description, openModal }) => {
  //  console.log(photo);
  // const {urls, user, likes, description} = photo;
  const alt =`${description}, photo by ${username}`;
  console.log();
  return (
    <div
      className={css.conteiner}
      onClick={() => {
        openModal(urls.regular, alt);
      }}
    >
      <img className={css.img} src={urls.small} alt={alt} />
      <div className={css['img-card']}>
        <span>Likes: {likes} </span>
        <span>User: {username}</span>
      </div>
    </div>
  );
};

export default ImageCard;
