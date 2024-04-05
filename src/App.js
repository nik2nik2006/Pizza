import React from "react";
import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

// const pizzas = [];

function App() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        fetch('https://6603e6a62393662c31d00976.mockapi.io/items')
            .then(res => res.json())
            .then(arr => {
                setItems(arr);
            });
    }, [])


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map((obj) => {
                                return <PizzaBlock key={obj.id} {...obj}
                                    // title={obj.title}
                                    // price={obj.price}
                                    // imageUrl={obj.imageUrl}
                                    // sizes={obj.sizes}
                                    // types={obj.types}
                                />
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
