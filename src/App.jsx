import { createContext, useEffect, useState } from 'react';
import './App.scss';
import Darver from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = createContext({})


function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);




  // при пустом массиве в useEffect действие выполнится только в один раз
  // следит за отрисовкой компонента в котором находится
  useEffect(() => {
    //   fetch('https://67a7b703203008941f685e7c.mockapi.io/items').then(res => {
    //     return res.json();
    //   }).then( json => {setItems(json)
    // });
    async function fetchData() {
      try {
        // (промисс all последний урок, если надо)
        setIsLoading(true);
        const cartResponse = await axios.get('https://67a7b703203008941f685e7c.mockapi.io/cart');
        const favoritesResponse = await axios.get('https://67b1d7bd3fc4eef538ead714.mockapi.io/favorites');
        const itemsResponse = await axios.get('https://67a7b703203008941f685e7c.mockapi.io/items');

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных')
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddTocart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://67a7b703203008941f685e7c.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj])
        // сохраняем на сервер то что добавили в корзину
        const { data } = await axios.post('https://67a7b703203008941f685e7c.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item, id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }

  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://67a7b703203008941f685e7c.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(err);
    }

  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://67b1d7bd3fc4eef538ead714.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
      } else {
        // сохраняем на сервер то что добавили в фавориты
        const { data } = await axios.post('https://67b1d7bd3fc4eef538ead714.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, obj])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  };


  const isAItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }


  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isAItemAdded, onAddToFavorite, onAddTocart, setCartOpened, setCartItems }}>

      <div className='wrapper clear'>

        <Darver items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>

          <Route path="/" exact element={<Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddTocart={onAddTocart}
            isLoading={isLoading}
          />} />

          <Route path="/favorites" exact element={<Favorites />} />

          <Route path="/orders" exact element={<Orders />} />

        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App             
