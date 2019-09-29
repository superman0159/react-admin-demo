import React, { Component } from "react";
import { warning, error } from "./../../Components/Info";
import "./../index.scss";
import { connect } from "react-redux";
import { ShopListAction, ShopDisListAction } from "./../../Store/actionCreators";
import { addShopDiscountData, isAddShopData } from "./../../Api";
import dayjs from 'dayjs';
import {
  Row,
  Col,
  Card,
  Table,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker
} from "antd";
const { Column } = Table;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      visible: false, // 添加券码modal
      shopvisible: false, // 编辑商品modal
      shopname: "", // 商品名称
      shopcode: "", // 商品券码
      shopdiscountnum: "", // 商品券码发放总量
      shopdiscounttime: "", //有效期时间
      shopitem: "", // 点击的商品列表
    };
  }
  //处理分页
  onChange = page => {
    this.setState({
      current: page
    });
  };
  // 关闭添加券码模态框
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  // 关闭编辑商品模态框
  shophandleCancel = e => {
    this.setState({
      shopvisible: false
    });
  };
  //开启券码模态框
  Add = record => {
    this.setState({
      visible: true,
      shopcode: record.shopcode,
      shopname: record.shopname
    });
  };
  //开启商品编辑模态框
  Edit = record => {
    this.setState({
      shopvisible: true,
      shopitem: record,
    });
    console.log(record)
  };
  // 提交券码模态框数据 添加券码
  handleOk() {
    const {
      shopcode,
      shopname,
      shopdiscounttime,
      shopdiscountnum
    } = this.state;
    // const shopdiscountcode = this.refs.shopdiscountcode.state.value;
    const shopdiscountcell = this.refs.shopdiscountcell.state.value;
    if (
      !shopcode ||
      // !shopdiscountcode ||
      !shopdiscounttime ||
      !shopdiscountnum
    ) {
      warning("内容不能为空！");
      return;
    }
    let ShopCodeParams = new URLSearchParams();
    ShopCodeParams.append("shopcode", shopcode);
    ShopCodeParams.append("shopname", shopname);
    ShopCodeParams.append("shopdiscountnum", shopdiscountnum);
    // ShopCodeParams.append("shopdiscountcode", shopdiscountcode);
    ShopCodeParams.append("shopdiscountcell", shopdiscountcell);
    ShopCodeParams.append("shopdiscounttime", shopdiscounttime);
    // 提交数据
    addShopDiscountData(ShopCodeParams).then(res => {
      if (res.data.status_code === 200) {
        this.setState({ visible: false }, () => { this.props.history.push('/shop/discount/list'); });
      } else {
        error("添加券码失败");
      }
    }).catch(err => {
      error("添加券码发生错误");
    });
  }
  // 提交编辑商品模态框数据
  shophandleOk() {
    console.log('提交修改商品')
  }
  // 是否上下架
  ShopShelf(source) {
    const id = source._id
    const shoppingshow = source.shoppingshow;
    // 3.创建formData
    let formData = new FormData();
    formData.append("id", id);
    formData.append("shoppingshow", shoppingshow);
    isAddShopData(formData).then(res => {
      if (res.data.status_code === 200) {
        this.props._ShopListData();
      } else {
        error(`${shoppingshow}操作失败`);
      }
    });
  }
  // 停用 意味着下架
  Stop(source) {
    const id = source._id
    const shoppingshow = "true";
    // 3.创建formData
    let formData = new FormData();
    formData.append("id", id);
    formData.append("shoppingshow", shoppingshow);
    isAddShopData(formData).then(res => {
      if (res.data.status_code === 200) {
        this.props._ShopListData();
      } else {
        error(`停用操作失败`);
      }
    });
  }
  // 时间选择
  onChange = (date, dateString) => {
    this.setState({ shopdiscounttime: dateString });
  };
  render() {
    const shopList = this.props.shopList;
    shopList.forEach((item, index) => {
      item.key = index + 1;
      item.time = dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
    });
    console.log(this.props.shopdiscountList)
    return (
      <div className="home-container">
        <Row>
          <Col span={24}>
            {/* 列表 */}
            <Card className="mg-top" title="商品明细列表">
              <Table
                dataSource={shopList}
                pagination={{
                  current: this.state.current,
                  pageSize: 6,
                  total: 30,
                  onChange: this.onChange
                }}
              >
                <Column title="商品Uid" dataIndex="shopcode" key="shopcode" />
                <Column title="商品名称" dataIndex="shopname" key="shopname" />
                <Column title="添加日期" dataIndex="time" key="time" />
                <Column
                  title="商品价格"
                  dataIndex="shopprice"
                  key="shopprice"
                />
                {/* <Column
                  title="产品销量"
                  dataIndex="shopdefaultnum"
                  key="shopdefaultnum"
                /> */}
                <Column
                  title="上架状态"
                  dataIndex="shoppingshow"
                  key="shoppingshow"
                />
                <Column
                  title="适用地区"
                  dataIndex="shopaddress"
                  key="shopaddress"
                />
                <Column
                  title="操作"
                  key="action"
                  render={(text, record) => (
                    <span>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => this.Edit(record)}
                        disabled={record.shoppingshow === "停用" ? true : false}
                      >
                        编辑
                      </Button>
                      <Divider type="vertical" />
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => this.Add(record)}
                        disabled={record.shoppingshow === "未上架" ? false : true}
                      >
                        添加券码
                      </Button>
                      <Divider type="vertical" />
                      <Button
                        size="small"
                        type="danger"
                        onClick={() => this.ShopShelf(record)}
                        disabled={record.shoppingshow === "未上架" ? false : true}
                      >
                        {record.shoppingshow}
                      </Button>
                      <Divider type="vertical" />
                      <Button
                        size="small"
                        type="danger"
                        onClick={() => this.Stop(record)}
                      >
                        停用
                      </Button>
                    </span>
                  )}
                />
              </Table>
            </Card>

            {/* 添加券码模态框 */}
            <Modal
              title="添加商品券码"
              visible={this.state.visible}
              onOk={() => this.handleOk()}
              onCancel={this.handleCancel}
            >
              <Form {...formItemLayout}>
                <Form.Item label="券码对应商品">
                  <Input value={this.state.shopcode} />
                </Form.Item>

                <Form.Item label="发放总量">
                  <InputNumber
                    style={{ width: "60%" }}
                    placeholder="请选择发放总量"
                    onChange={value => {
                      this.setState({ shopdiscountnum: value });
                    }}
                    min={100}
                  />
                </Form.Item>

                <Form.Item label="商品券码">
                  <Input
                    placeholder="请输入商品券码"
                    style={{ width: "60%" }}
                    ref="shopdiscountcode"
                    maxLength={8}
                  />
                  <Divider type="vertical" />
                  <span className="ant-form-text">AKCH1234</span>
                </Form.Item>

                <Form.Item label="使用门槛">
                  <Input placeholder="请输入使用门槛" ref="shopdiscountcell" />
                </Form.Item>

                <Form.Item label="请选择有效期" style={{ marginBottom: 0 }}>
                  <Form.Item
                    help="请选择有效期"
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 12px)"
                    }}
                  >
                    <DatePicker onChange={this.onChange} />
                  </Form.Item>
                </Form.Item>
              </Form>
            </Modal>

            {/* 编辑商品模态框 */}
            <Modal
              title="编辑商品"
              visible={this.state.shopvisible}
              onOk={() => this.shophandleOk()}
              onCancel={this.shophandleCancel}
            >
              <Form {...formItemLayout}>
                <Form.Item label="商品Uid">
                  <Input value={this.state.shopitem.shopcode} disabled />
                </Form.Item>

                <Form.Item label="商品名称">
                  <Input value={this.state.shopitem.shopname} placeholder="请输入商品名称" />
                </Form.Item>

                <Form.Item label="商品价格">
                  <InputNumber
                    placeholder="请输入商品价格"
                    style={{ width: "50%" }}
                    ref="shopdiscountcode"
                    value={this.state.shopitem.shopprice}
                    disabled
                    min={50}
                  />
                  <Divider type="vertical" />
                  <span className="ant-form-text">商品金额 谨慎修改</span>
                </Form.Item>

                <Form.Item label="使用地区">
                  <Input placeholder="请输入使用地区" ref="shopdiscountcell" value={this.state.shopitem.shopaddress} />
                </Form.Item>

              </Form>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    // 商品列表数据
    this.props._ShopListData();
    // this.props._ShopLisDistData();
  }
}

const mapStateToProps = state => {
  return {
    shopList: state.shopList,
    shopdiscountList: state.shopdiscountList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _ShopListData() {
      dispatch(ShopListAction());
    },
    // _ShopLisDistData() {
    //   dispatch(ShopDisListAction());
    // }
    // dispatch(ShopDisListAction());
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
