import React, { Component } from "react";
import { warning, error } from "./../../Components/Info";
import { connect } from "react-redux";
import { Checkbox, Divider } from "antd";
import { ShopListAction } from "./../../Store/actionCreators";
import {addShopSaleData} from './../../Api'
import "./../index.scss";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button
} from "antd";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saleisarr: "", //使用范围
      saleprice: "", //抵扣金额
      salenum:"",// 抵扣数量
      saletime:""// 抵扣券有效期
    };
  }
  // 商品适用范围选择
  onChange = checkedValues => {
    this.setState({ saleisarr: checkedValues });
  };
  // 时间选择
  onTimeChange = (date, dateString) => {
    this.setState({ saletime: dateString });
  };
  render() {
    // 添加可抵扣商品范围
    let ListData = this.props.shopList.filter(
      item => item.shoppingshow === "已上架"
    );
    let plainOptions = [];
    ListData.forEach((item, index) => {
      plainOptions.push(item.shopname);
    });
    return (
      <div className="home-container">
        <Row>
          <Col span={24}>
            <Card className="mg-top" title="生成抵扣券">
              <Col span={16}>
                <Form {...formItemLayout}>
                  <Form.Item label="优惠券名称">
                    <Input
                      placeholder="请输入优惠券名称"
                      ref="salename"
                      maxLength={4}
                    />
                  </Form.Item>

                  <Form.Item label="外放对象">
                    <Input
                      placeholder="请输入外放对象"
                      ref="saleobj"
                      maxLength={6}
                    />
                  </Form.Item>

                  <Form.Item label="抵扣商品范围">
                    <Checkbox.Group
                      options={plainOptions}
                      onChange={value => this.onChange(value)}
                    />
                  </Form.Item>

                  <Form.Item label="抵扣金额">
                    <InputNumber
                      style={{ width: "45%" }}
                      placeholder="请选择抵扣金额"
                      onChange={(value) => { this.setState({ saleprice: value }) }}
                      min={10}
                    />
                    <Divider type="vertical" />
                    <span className="ant-form-text">折扣金额 请谨慎填写 </span>
                  </Form.Item>

                  <Form.Item label="设置优惠券码数量">
                    <InputNumber
                      style={{ width: "45%" }}
                      placeholder="请输入生成券码数量 "
                      onChange={(value) => { this.setState({ salenum: value }) }}
                      min={100}
                    />
                     <Divider type="vertical" />
                    <span className="ant-form-text">默认规则 - gc04f55b </span>
                  </Form.Item>

                  <Form.Item label="请选择有效期" style={{ marginBottom: 0 }}>
                    <Form.Item
                      help="请选择有效期"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 12px)"
                      }}
                    >
                      <DatePicker onChange={this.onTimeChange} />
                    </Form.Item>
                  </Form.Item>

                  <Button type="primary" onClick={()=>this._dealWithClick()}>提交生成</Button>
                </Form>
              </Col>
              <Col span={8}>1</Col>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  // 提交抵扣券
  _dealWithClick(){
    const {saleisarr,saleprice,salenum,saletime} = this.state;
    const salename = this.refs.salename.state.value;
    const saleobj = this.refs.saleobj.state.value;
    console.log(salename,saleobj,saleisarr,saleprice,salenum,saletime)
    if (
      !salename ||
      !saleobj ||
      !saleisarr ||
      !saleprice ||
      !salenum ||
      !saletime
    ) {
      warning("内容不能为空！");
      return;
    }
    let ShopSaleParams = new URLSearchParams();
    ShopSaleParams.append("salename", salename);
    ShopSaleParams.append("saleobj", saleobj);
    ShopSaleParams.append("saleisarr", saleisarr);
    ShopSaleParams.append("saleprice", saleprice);
    ShopSaleParams.append("salenum", salenum);
    ShopSaleParams.append("saletime", saletime);
    
    // 发起请求
    addShopSaleData(ShopSaleParams).then(res=>{
      if (res.data.status_code === 200) {
        this.props.history.push('/discount/list');
      } else {
        error("添加抵扣券失败");
      }
    }).catch(err=>{
      error("添加抵扣券失败");
    })
  }

  componentDidMount() {
    this.props._ShopListData();
  }
}

const mapStateToProps = state => {
  return {
    shopList: state.shopList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _ShopListData() {
      dispatch(ShopListAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
