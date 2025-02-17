import { useContext } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';

const Favorites = () => {
    const {favorites, onAddToFavorite, onAddTocart} = useContext(AppContext);

    return (
    
            <div className='content p-40'>

                <div className='d-flex align-center mb-40 justify-between'>
                    <h1>Мои закладки</h1>
                </div>

                <div className='wrapper-1 d-flex flex-wrap'>
                {favorites.map((item, index) => (
                    <Card title={item.title} price={item.price} imageUrl={item.imageUrl} key={index}
                    favorited={true}
                    // onPlus={(obj) => {onAddTocart(obj)}} 
                    onPlus={onAddTocart}
                    onFavorite={onAddToFavorite}
                    id={item.id}
                    // {...item}
                    />
                ))}
                </div>
            </div>
    

    );
}

export default Favorites;


