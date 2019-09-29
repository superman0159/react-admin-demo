import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

// 页面
import AdminList from './AdminList';

class ShopRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/home" component={AdminList}/>
                <Redirect exact form="/home" to="/home"/>
            </Switch>
        );
    }
}

export default ShopRouter;