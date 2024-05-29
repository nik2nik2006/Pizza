import React from "react";
import qs from "qs"
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../Pagination";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterSlice'
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";

import styles from "../components/NotFoundBlock/NotFoundBlock.module.scss";


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const {categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)

    const [orderBy, setOrderBy] = React.useState('asc');

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        dispatch(
            fetchPizzas({
                    currentPage,
                    category,
                    search,
                    sort,
                    orderBy
                }
            )
        );
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
            getPizzas()
        };
        isSearch.current = false;
    }, [categoryId, sort, orderBy, searchValue, currentPage]);

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
            {
                status === 'error' ? (
                    <div className='content__error-info'>
                        <h2>
                            Произошла ошибка
                            <span>{String.fromCodePoint(parseInt('0x0001F629', 16))}</span>
                        </h2>
                        <p> К сожалению, не удалось получить пиццы. Мы уже начали разбираться.
                            Попробуйте повторить позже...</p>
                    </div>
                ) : (
                    <div className="content__items">
                        { status === 'loading' ? skeletons : pizzas }
                    </div>
                )
            }
            <Pagination onChangePage={ onChangePage }/>
        </div>
    )
};

export default Home;