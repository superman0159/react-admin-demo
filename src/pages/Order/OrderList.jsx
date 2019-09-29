import React, { Component } from 'react'
import './../index.scss';
import showConfirm from '../../Components/TextModal';
import { Row, Col, Card, Table, Divider, Button } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        ordernum: '01',
        ordername: 'weChat',
        time: '2019-1-1',
        salecode: 'HSKC3647',
        orderemail: '1231239@awd.com',
        orderprice: '99',
        ordercode: '待使用',
    }
];

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        }
    }
    //编辑用户
    Edit = (record) => {
        console.log(record)
    }
    //删除用户
    Delete = (record) => {
        showConfirm(record)
        console.log(record)
    }
    //处理分页
    onChange = page => {
        console.log(page);
        this.setState({
            current: page,
        });
    };
    render() {
        return (
            <div className="home-container">
                <Row>
                    <Col span={24} >
                        <Card className="mg-top" title="订单明细列表">
                            <Table
                                dataSource={data}
                                pagination={{
                                    current: this.state.current,
                                    pageSize: 6,
                                    total: 30,
                                    onChange: this.onChange
                                }}
                            >
                                <Column title="订单商品编号" dataIndex="ordernum" key="ordernum" />
                                <Column title="订单账号" dataIndex="ordername" key="ordername" />
                                <Column title="订单日期" dataIndex="time" key="time" />
                                <Column title="渠道" dataIndex="code" key="code" />
                                <Column title="优惠券码" dataIndex="salecode" key="salecode" />
                                <Column title="订单邮箱" dataIndex="orderemail" key="orderemail" />
                                <Column title="订单金额" dataIndex="orderprice" key="orderprice" />
                                <Column title="状态" dataIndex="ordercode" key="ordercode" />
                                <Column
                                    title="操作"
                                    key="action"
                                    render={(text, record) => (
                                        <span>
                                            <Button size="small" type="primary" onClick={() => this.Edit(record)}>编辑 </Button>
                                            <Divider type="vertical" />
                                            <Button size="small" type="danger" onClick={() => this.Delete(record)}>上架</Button>
                                        </span>
                                    )}
                                />
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default index;
