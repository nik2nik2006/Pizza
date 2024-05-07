import React from "react";
import {useDispatch, useSelector} from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../Pagination";
import { SearchContext } from "../App";
import { setCategoryId } from '../redux/slices/filterSlice'


const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort} = useSelector(state => state.filter)
    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [orderBy, setOrderBy] = React.useState('asc');
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    React.useEffect(() => {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        fetch(`https://6603e6a62393662c31d00976.mockapi.io/items?page=${currentPage}&limit=4&${
            category}${
            search}&sortBy=${sort.sortProperty}&order=${orderBy}`,
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sort, orderBy, searchValue, currentPage]);

    // фильтрация пицц без запроса на бекэнд
    // const pizzas = items.filter((obj) => {
    //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true;
    //     }
    //     return false;
    // }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(9)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                            onChangeCategory={ onChangeCategory } />
                <Sort onChangeOrder={(i) => (setOrderBy(i))} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoading ? skeletons : pizzas }
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </div>
    )
}

export default Home;





