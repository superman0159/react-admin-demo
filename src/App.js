import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Types from './Store/action-Types';
import './App.scss';

import Index_Out from './pages/Out'
import Login from './Components/Login'

//内容区域面板
import Echarts from './pages/Echarts/router';
import Admin from './pages/Home/router';
import User from './pages/User/router';
import Order from './pages/Order/router';
import Shopping from './pages/Shopping/router';
import Discount from './pages/Discount/router';
import Remove from './pages/Remove/router';

class App extends Component {
  componentWillMount() {
    this.props._Login()
  }
  render() {
    //主面板
    const Index = (
      <Index_Out >
        <Switch>
          <Route exact path="/" component={Echarts} />
          <Route path="/home" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/order" component={Order} />
          <Route path="/shop" component={Shopping} />
          <Route path="/discount" component={Discount} />
          <Route path="/remove" component={Remove} />
        </Switch>
      </Index_Out>
    )
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={
              this.props.payload ? (props) => Index : () => <Redirect to="/login" push />
            }
          />
          <Route path="/login" component={Login} />
          <Route path="/" render={props => Index} />
        </Switch>
      </Router >
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _Login() {
      const payload = JSON.parse(sessionStorage.getItem('userData'));
      dispatch({
        type: Types.ADMIN_LOGIN,
        payload
      })
    }
  }
}
const mapStateToProps = (state) => {
  return {
    payload: state.admin
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
