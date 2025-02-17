import { useContext } from "react";
import { AppContext } from "../App";

const Info = ({ title, image, description }) => {
    const { setCartOpened } = useContext(AppContext)
    return (
        <div className="cartEmpty">
            <img height={120} src={image} alt="" />
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => { setCartOpened(false) }} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
            </button>
        </div>
    );
}

export default Info;


