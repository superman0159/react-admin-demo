import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

// 页面
import UserList from './UserList';

class ShopRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/user/list" component={UserList}/>
                <Redirect exact form="/user" to="/user/list"/>
            </Switch>
        );
    }
}

export default ShopRouter;