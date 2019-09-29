import React, { Component } from 'react'
import { Layout } from 'antd';

import Header from './../../Components/Header';
import Menu from './../../Components/Menu';
import Footer from './../../Components/Footer';
const { Content } = Layout;
export default class index extends Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Menu />
                <Layout>
                    <Header />
                    <Content style={{ margin: '0 16px' }}>
                        {this.props.children}
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        )
    }
}
