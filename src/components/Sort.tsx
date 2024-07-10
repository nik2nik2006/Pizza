import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectSort, setSortType} from '../redux/slices/filterSlice'
import { useWhyDidYouUpdate } from 'ahooks';


type ListItem = {
    name: string;
    sortProperty: string
}

export const list: ListItem[] = [
    {name: 'популярности', sortProperty: 'rating'},
    {name: 'цене', sortProperty: 'price'},
    {name: 'алфавиту', sortProperty: 'title'}]

const Sort = React.memo(({ onChangeOrder, value}) => {
    const dispatch = useDispatch()
    const sort = useSelector(selectSort);
    const sortRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);

    useWhyDidYouUpdate('Sort', {value, onChangeOrder});

    const onClickListItem = (obj: ListItem) => {
        dispatch(setSortType(obj));
        setOpen(false)
    }

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.composedPath().includes(sortRef.current)) {
                setOpen(false);
            }
        }
        document.body.addEventListener('click', handleClickOutside);
        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <div className="sort__button">
                    <button onClick={() => onChangeOrder('asc')}>↓</button>
                </div>
                <div className="sort__button">
                    <button onClick={() => onChangeOrder('desc')}>↑</button>
                </div>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{value.name}</span>
            </div>

            <div>
                {open && <div className="sort__popup">
                    <ul>
                        {
                            list.map((obj, index) => (
                                <li key={index} onClick={() => onClickListItem(obj)}
                                    className={value.sortProperty === obj.sortProperty ? "active" : ''}>{obj.name}</li>))
                        }
                    </ul>
                </div>}
            </div>
        </div>
    )
})

export default Sort