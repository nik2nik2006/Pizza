import React from "react";
import axios from "axios";
import qs from "qs"
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../Pagination";
import { SearchContext } from "../App";
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const {categoryId, sort, currentPage} = useSelector(state => state.filter)

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [orderBy, setOrderBy] = React.useState('asc');
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    const fetchPizzas = () => {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        axios.get(`https://6603e6a62393662c31d00976.mockapi.io/items?page=${currentPage}&limit=4&${
            category}${
            search}&sortBy=${sort.sortProperty}&order=${orderBy}`,)
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            })
    }

    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy: sort.sortProperty,
                categoryId,
                page: currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;

    }, [categoryId, sort, orderBy, searchValue, currentPage])


    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find(obj => obj.sortProperty === params.sortBy)
            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);
        if ( !isSearch.current ) {
            fetchPizzas();
        };
        isSearch.current = false;
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
            <Pagination onChangePage={ onChangePage }/>
        </div>
    )
}

export default Home;





