import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

// 页面
import DiscountList from './DiscountList'
import AddDiscount from './AddDiscount'

class DiscountRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/discount/list" component={DiscountList} />
                <Route path="/discount/add" component={AddDiscount} />
                <Redirect exact form="/discount" to="/discount/list" />
            </Switch>
        );
    }
}

export default DiscountRouter;