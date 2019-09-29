import React, { Component } from 'react'
import './../index.scss';
import showConfirm from '../../Components/TextModal';
import { Row, Col, Card ,Table, Divider, Button } from 'antd';
import { connect } from "react-redux";
import {ShopSaleAction} from './../../Store/actionCreators';
const { Column } = Table;

class Index extends Component {
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
        const shopSaleList = this.props.shopsaleList;
        shopSaleList.forEach((item, index) => {
            item.key = index + 1;
        });
        return (
            <div className="home-container">
                <Row>
                    <Col span={24} >
                        <Card className="mg-top" title="抵扣券明细列表">
                            <Table
                                dataSource={shopSaleList}
                                pagination={{
                                    current: this.state.current,
                                    pageSize: 6,
                                    total: 30,
                                    onChange: this.onChange
                                }}
                            >
                                <Column title="优惠券名称" dataIndex="salename" key="salename" />
                                <Column title="外放对象" dataIndex="saleobj" key="saleobj" />
                                <Column title="抵扣商品范围" dataIndex="saleisarr" key="saleisarr" />
                                <Column title="折扣金额" dataIndex="saleprice" key="saleprice" />
                                <Column title="折扣券数量" dataIndex="salenum" key="salenum" />
                                <Column title="有效期截至" dataIndex="saletime" key="saletime" />
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

    componentDidMount(){
        this.props._ShopSaleData()
    }
}

const mapStateToProps = state => {
    return {
        shopsaleList: state.shopsaleList,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      _ShopSaleData() {
        dispatch(ShopSaleAction());
      }
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index);