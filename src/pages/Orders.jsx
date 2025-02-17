import { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { AppContext } from '../App';

const Orders = () => {
    const { onAddToFavorite, onAddTocart } = useContext(AppContext)
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://67b1d7bd3fc4eef538ead714.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert("Ошибка призапросе заказов")
            }
        })();
    }, [])
    return (

        <div className='content p-40'>

            <div className='d-flex align-center mb-40 justify-between'>
                <h1>Мои заказы</h1>
            </div>

            <div className='wrapper-1 d-flex flex-wrap'>
               {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>


    );
}

export default Orders;


