import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

// 页面
import OrderList from './OrderList'

class DiscountRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/order/list" component={OrderList} />
                <Redirect exact form="/order" to="/order/list" />
            </Switch>
        );
    }
}

export default DiscountRouter;