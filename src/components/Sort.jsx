import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { setSortType } from '../redux/slices/filterSlice'


function Sort({ onChangeOrder}) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const sort = useSelector(state => state.filter.sort)
    const onClickListItem = (obj) => {
        dispatch(setSortType(obj));
        setOpen(false)
    }
    const list = [
        {name: 'популярности', sortProperty: 'rating'},
        {name: 'цене', sortProperty: 'price'},
        {name: 'алфавиту', sortProperty: 'title'}]

    return (
        <div className="sort">
            <div className="sort__label">
                <div className="sort__button">
                    <button onClick={() => onChangeOrder('asc')}>↓</button>
                </div>
                <div className="sort__button">
                    <button onClick={() => onChangeOrder('desc')}>↑</button>
                </div>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sort.name}</span>
            </div>

            <div>
                {open && <div className="sort__popup">
                    <ul>
                        {
                            list.map((obj, index) => (
                                <li key={index} onClick={() => onClickListItem(obj)}
                                    className={sort.sortProperty === obj.sortProperty ? "active" : ''}>{obj.name}</li>))
                        }
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Sort