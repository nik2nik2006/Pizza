import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";


const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(1);
    const [sortType, setSortType] = React.useState(0);

    React.useEffect(() => {
        setIsLoading(true);
        fetch('https://6603e6a62393662c31d00976.mockapi.io/items?category=' + categoryId)
            .then((res) => res.json())
            .then((arr) => {
                    setItems(arr);
                    setIsLoading(false);
                });
        window.scrollTo(0, 0);
    }, [categoryId]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                            onClickCategory={(i) => (setCategoryId(i))}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(9)].map((_, index) => <Skeleton key={index}/>)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </div>
    )
}

export default Home;
