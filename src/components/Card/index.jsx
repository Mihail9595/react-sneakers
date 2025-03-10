import { useState } from 'react';
import ContentLoader from "react-content-loader";
import { useContext } from 'react';
import { AppContext } from '../../App';
import styles from './Card.module.scss';

const Card = ({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false
}) => {

  const { isAItemAdded } = useContext(AppContext);
  const [isFavoprite, setIsFavoprite] = useState(favorited);
  const obj = { id, parentId: id ,title, imageUrl, price };



  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavoprite(!isFavoprite);
  };


  return (
    <div className={styles.card}>

      {loading ? <ContentLoader
        speed={2}
        width={155}
        height={265}
        viewBox="0 0 150 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
        <rect x="0" y="197" rx="5" ry="5" width="100" height="15" />
        <rect x="0" y="230" rx="5" ry="5" width="80" height="25" />
        <rect x="118" y="225" rx="10" ry="10" width="32" height="32" />
      </ContentLoader> : <>   <div className={styles.favorite}>
        {onFavorite &&
          <img onClick={onClickFavorite}
            src={isFavoprite ? "img/heart-like.svg" : "img/heart-unliked.svg"} alt="Unliked" />
        }
      </div>

        <img width={133} height={112} src={imageUrl} alt="Sneakers" />
        <h5>{title}</h5>
        <div className='d-flex justify-between align-center'>
          <div className='d-flex flex-column'>
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
          <div >
            {onPlus &&
              <img className={styles.plus} onClick={onClickPlus}
                src={isAItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="plus" />
            }
          </div>
        </div> </>}

    </div>
  );
}

export default Card;

