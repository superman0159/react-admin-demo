import React, { Component } from 'react'
import showConfirm from './../../Components/TextModal';
import './../index.scss';
import { Row, Col, Card, Table, Divider, Button } from 'antd';

const { Column } = Table;

const data = [
    {
        key: '1',
        usercode: 'WeChat',
        username: '张三',
        phone: '13543675428',
        time: '2019-1-1',
    },
    {
        key: '2',
        usercode: 'WeChat',
        username: '3李四',
        phone: '13543675428',
        time: '2019-1-1',
    },
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
                        <Card className="mg-top" title="用户明细列表">
                            <Table
                                dataSource={data}
                                pagination={{
                                    current: this.state.current,
                                    pageSize: 6,
                                    total: 30,
                                    onChange: this.onChange
                                }}
                            >
                                <Column title="微信昵称" dataIndex="usercode" key="usercode" />
                                <Column title="登陆账号" dataIndex="username" key="username" />
                                <Column title="注册日期" dataIndex="time" key="time" />
                                <Column title="邮箱号码" dataIndex="phone" key="phone" />
                                <Column
                                    title="操作"
                                    key="action"
                                    render={(text, record) => (
                                        <span>
                                            <Button size="small" type="primary" onClick={() => this.Edit(record)}>编辑 </Button>
                                            <Divider type="vertical" />
                                            <Button size="small" type="danger" onClick={() => this.Delete(record)}>禁用</Button>
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
