import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>({
        imageUrl: '',
        title: '',
        price: 0,
    });
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://6603e6a62393662c31d00976.mockapi.io/items/${id}`);
                setPizza(data);
            } catch (error) {
                alert("Ошибка при получении пиццы");
                navigate('/');
            }

        };
        fetchPizza().then(r => r);
    }, []);
    if (!pizza) {
        return "Загрузка..."
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
            <Link to='/qwerty'>
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>

    )
}

export default FullPizza;