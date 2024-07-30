import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
// import FullPizza from "./pages/FullPizza";
// import Cart from "./pages/Cart";

import './scss/app.scss';
import MainLayout from "./scss/layouts/MainLayout";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path='' element={<Home/>}/>
                <Route path='cart' element={
                    <Suspense fallback={<div>Идет получение данных...</div>}>
                        <Cart/>
                    </Suspense>
                }/>
                <Route path='pizza/:id' element={
                    <Suspense fallback={<div>Идет получение данных...</div>}>
                        <FullPizza/>
                    </Suspense>
                }/>
                <Route path='*' element={<Suspense fallback={<div>Идет получение данных...</div>}>
                        <NotFound/>
                    </Suspense>}/>
            </Route>
        </Routes>
    );
}

export default App;





