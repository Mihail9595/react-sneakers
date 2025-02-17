import axios from "axios";

import { useState } from "react";
import { useCart } from "../../hooks/useCart";

import Info from "../Info";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Darver = ({ onClose, onRemove, items = [], opened }) => {

    const {cartItems, setCartItems, totalPrice} = useCart();

    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const onClickOrder = async () => {
        try{
            setIsLoading(true);
            // сохраняем на сервер 
          const {data} = await axios.post('https://67b1d7bd3fc4eef538ead714.mockapi.io/orders', {items: cartItems,});
          setOrderId(data.id);
          setIsOrderComplete(true);
          setCartItems([]);

          for (let i=0; i < cartItems.length; i++) {
            const item = cartItems[i];
            // await axios.delete('https://67a7b703203008941f685e7c.mockapi.io/cart' + item.id);
            await delay(1000);
          }

        } catch {
            alert('Ошибка при создании заказа!')
        }
        setIsLoading(false);
    }

    return (

        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : '' }`}>

            <div className={styles.drawer}>

                <h2 className=' d-flex justify-between mb-30'>Корзина
                    <img onClick={onClose} className='removeBtn cu-p'
                        src="/img/btn-remove.svg"
                        alt="Remove" /></h2>

                {items.length > 0 ? <>
                    <div className={styles.items }>

                        {items.map((obj) => (

                            <div key={obj.id} className="cartItem d-flex align-center mb-20">

                                <div style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                    className='cartItemImg '></div>

                                <div className='mr-20 flex'>
                                    <p className='mb-5'>{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className='removeBtn' src="/img/btn-remove.svg" alt="Remove" />
                            </div>
                        ))}

                    </div>

                    <div className='cartTotalBlock'>
                        <ul >
                            <li className='d-flex'>
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб.</b>
                            </li>
                            <li className='d-flex'>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{Math.trunc(totalPrice*0.05)} руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} 
                        className='greenButton'>Оформить заказ<img src="/img/arrow.svg" alt="Arrow" /></button>

                    </div>
                </>

                    :
                    <Info 
                    title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                            : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                    image={isOrderComplete ? "/img/complete-order.jpg" :"/img/empty-cart.jpg"} 
                    />
                }

            </div>
        </div>
    );
}

export default Darver;