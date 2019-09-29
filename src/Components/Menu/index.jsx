import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './index.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="layout-logo">
          <img className="logo-img" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
          <Menu.Item key="0">
            <Link to='/'>
              <Icon type="pie-chart" />
              <span>可视化</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to='/home'>
              <Icon type="pie-chart" />
              <span>系统管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/user/list'>
              <Icon type="desktop" />
              <span>用户管理</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>订单管理</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to='/order/list'>订单列表</Link>
            </Menu.Item>
            <Menu.Item key="4">待支付订单</Menu.Item>
            <Menu.Item key="5">已完成订单</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="fund" />
                <span>商品管理</span>
              </span>
            }
          >
            <Menu.Item key="7">
              <Link to='/shop/list'>商品列表</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to='/shop/add'>添加商品</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to='/shop/discount/list'>商品券码列表</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="team" />
                <span>运营管理</span>
              </span>
            }
          >
            <Menu.Item key="11">
              <Link to='/discount/list'>
                抵扣券管理
              </Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link to='/discount/add'>
                抵扣券生成
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="13">
            <Link to='/remove/item'>
              <Icon type="pie-chart" />
              <span>优惠券核销</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
