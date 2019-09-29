import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'antd';
import './index.scss';
const { Header } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" onClick={() => { sessionStorage.removeItem('userData') }}>
        注销
      </a>
    </Menu.Item>
  </Menu>
);
export default class index extends Component {
  render() {
    return (
      <>
        <Header className="header" style={{ background: '#fff', padding: 0 }} >
          <h1 className="title">Health loving</h1>
          <Dropdown overlay={menu} className="logo-in">
            <a className="ant-dropdown-link" href="#">
              <Icon type="user" /> 用户设置
            </a>
          </Dropdown>
        </Header>
      </>
    )
  }
}
