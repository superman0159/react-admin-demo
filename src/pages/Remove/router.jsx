import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

// 页面
import Remove from './Remove';

class RemoveRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/remove/item" component={Remove}/>
                <Redirect exact form="/remove" to="/remove/item"/>
            </Switch>
        );
    }
}

export default RemoveRouter;