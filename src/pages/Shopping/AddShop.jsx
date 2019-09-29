import React, { Component } from 'react'
import { warning, error } from './../../Components/Info';
import { addShopData } from './../../Api';
import './../index.scss';
import { Row, Col, Card, Form, Input, InputNumber, Button } from 'antd';
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopprice: 10,
            shopsaleprice: 10,
            shopdefaultnum: 10,
            shopdaynum: 10,
            shopdetail: ''
        }
    }
    render() {
        const { shopprice, shopsaleprice, shopdefaultnum, shopdaynum } = this.state;
        return (
            <div className="home-container">
                <Row>
                    <Col span={24} >
                        <Card className="mg-top" title="添加商品">
                            <Row>
                                <Col span={14}>
                                    <Form {...formItemLayout}>

                                        <Form.Item label="上传封面图">
                                            <input type="file" ref="shopfile" />
                                        </Form.Item>

                                        <Form.Item label="商品名称">
                                            <Input placeholder="请输入商品名称" ref="shopname" />
                                        </Form.Item>

                                        <Form.Item label="商品编号">
                                            <Input placeholder="请输入商品编号" ref="shopcode" maxLength={8} style={{ width: '60%' }} />
                                        </Form.Item>

                                        <Form.Item label="商品原价">
                                            <InputNumber defaultValue={shopprice} style={{ width: '60%' }} onChange={(value) => { this.setState({ shopprice: value }) }} placeholder="请选择商品原价" min={10} />
                                        </Form.Item>

                                        <Form.Item label="商品优惠价">
                                            <InputNumber defaultValue={shopsaleprice} style={{ width: '60%' }} onChange={(value) => { this.setState({ shopsaleprice: value }) }} placeholder="请选择商品优惠价" min={10} />
                                        </Form.Item>

                                        <Form.Item label="默认销量">
                                            <InputNumber defaultValue={shopdefaultnum} style={{ width: '60%' }} onChange={(value) => { this.setState({ shopdefaultnum: value }) }} placeholder="请选择默认销量" min={10} />
                                        </Form.Item>

                                        <Form.Item label="每日销量">
                                            <InputNumber defaultValue={shopdaynum} style={{ width: '60%' }} onChange={(value) => { this.setState({ shopdaynum: value }) }} placeholder="请选择每日销量" min={10} />
                                        </Form.Item>

                                        <Form.Item label="适用地区">
                                            <Input placeholder="请输入适用地区" ref="shopaddress" />
                                        </Form.Item>

                                        <Form.Item label="编辑产品详情" style={{ marginBottom: 0 }}>
                                            <TextArea
                                                placeholder="请按如下规范条数罗列 例如： 1.xxxx 2.xxx"
                                                autosize={{ minRows: 2, maxRows: 6 }}
                                                onChange={({ target: { value } }) => { this.setState({ shopdetail: value }) }}
                                            />
                                        </Form.Item>

                                        <Button type="primary" onClick={() => this._dealWithClick()} >提交生成</Button>
                                    </Form>
                                </Col>
                                <Col span={10}>2</Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
    //提交信息  
    _dealWithClick() {
        // 1. 获取用户输入的内容
        const { shopprice, shopsaleprice, shopdefaultnum, shopdaynum, shopdetail } = this.state;
        const shopfile = this.refs.shopfile.files[0];
        const shopname = this.refs.shopname.state.value;
        const shopcode = this.refs.shopcode.state.value;
        const shopaddress = this.refs.shopaddress.state.value;
        console.log(shopfile, shopname, shopprice, shopsaleprice, shopdefaultnum, shopdaynum, shopaddress, shopdetail);

        // 2. 验证数据不为空
        if (!shopprice || !shopsaleprice || !shopdefaultnum || !shopdaynum || !shopdetail || !shopfile || !shopname || !shopaddress || !shopcode) {
            warning('输入的内容不能为空！');
            return;
        }
        // 3.创建formData
        let formData = new FormData();
        formData.append('shopfile', shopfile);
        formData.append('shopname', shopname);
        formData.append('shopcode', shopcode);
        formData.append('shopprice', shopprice);
        formData.append('shopsaleprice', shopsaleprice);
        formData.append('shopdefaultnum', shopdefaultnum);
        formData.append('shopdaynum', shopdaynum);
        formData.append('shopaddress', shopaddress);
        formData.append('shopdetail', shopdetail);
        // 提价数据
        addShopData(formData).then(res => {
            if (res.data.status_code === 200) {
                this.props.history.push('/shop/list');
            }
        }).catch(err => {
            error('添加数据失败！请重试')
        })
    }
}

export default index;
