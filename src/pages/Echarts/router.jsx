import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

// 页面
import Echarts from './Echarts';

class ShopRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={Echarts}/>
                <Redirect exact form="/" to="/"/>
            </Switch>
        );
    }
}

export default ShopRouter;