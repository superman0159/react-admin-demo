import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

// 页面
import ShopList from './ShopList';
import AddShop from './AddShop';
import ShopDiscountList from './ShopDiscountList';

class ShopRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/shop/list" component={ShopList}/>
                <Route path="/shop/add" component={AddShop}/>
                <Route path="/shop/discount/list" component={ShopDiscountList}/>
                <Redirect exact form="/shop" to="/shop/list"/>
            </Switch>
        );
    }
}

export default ShopRouter;