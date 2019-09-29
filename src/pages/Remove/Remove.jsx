import React, { Component } from 'react'
import './../index.scss';
import { Row, Col, Card, Table, Input, Button } from 'antd';
const { Column } = Table;
const { Search } = Input;

const data = [
    {
        key: '1',
        usercode: '20190730101001',
        shopcode: '01',
        wechat: '微信账号',
        time: '2019-1-1',
        placecode: 'ZS20190730',
        salecode: 'AKJBANK0961',
        price: '99',
        code: '待使用',
    }
];
class index extends Component {
    render() {
        return (
            <div className="home-container">
                <Row>
                    <Col span={24} >
                        <Card className="mg-top" >
                            <Col span={6}>
                                <Search
                                    placeholder="请输入优惠券码"
                                    enterButton="Search"
                                    size="large"
                                    onSearch={value => console.log(value)}
                                />
                            </Col>
                            <Button type="primary" size="large">确认核销</Button>
                        </Card>
                        <Card className="mg-top" title="优惠券核销">
                            <Table dataSource={data}>
                                <Column title="订单编号" dataIndex="usercode" key="usercode" />
                                <Column title="订单商品编号" dataIndex="shopcode" key="shopcode" />
                                <Column title="订单账号" dataIndex="wechat" key="wechat" />
                                <Column title="订单日期" dataIndex="time" key="time" />
                                <Column title="邀请码" dataIndex="placecode" key="placecode" />
                                <Column title="优惠券码" dataIndex="salecode" key="salecode" />
                                <Column title="状态" dataIndex="code" key="code" />
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default index;
