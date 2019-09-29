import React, { Component } from "react";
import "./../index.scss";
import showConfirm from "../../Components/TextModal";
import { connect } from "react-redux";
import { ShopDisListAction } from "./../../Store/actionCreators";
import { Row, Col, Card, Table, Divider, Button } from "antd";
const { Column } = Table;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1
    };
  }
  //编辑用户
  Edit = record => {
    console.log(record);
  };
  //删除用户
  Delete = record => {
    showConfirm(record);
    console.log(record);
  };
  //处理分页
  onChange = page => {
    this.setState({
      current: page
    });
  };
  render() {
    const shopDisList = this.props.shopdiscountList;
    shopDisList.forEach((item, index) => {
      item.key = index + 1;
    });
    return (
      <div className="home-container">
        <Row>
          <Col span={24}>
            <Card className="mg-top" title="商品券码明细列表">
              <Table
                dataSource={shopDisList}
                pagination={{
                  current: this.state.current,
                  pageSize: 6,
                  total: 30,
                  onChange: this.onChange
                }}
              >
                <Column
                  title="券码商品Uid"
                  dataIndex="shopcode"
                  key="shopcode"
                />
                <Column
                  title="券码适用商品"
                  dataIndex="shopname"
                  key="shopname"
                />
                {/* <Column
                  title="券码数量"
                  dataIndex="shopdiscountnum"
                  key="shopdiscountnum"
                /> */}
                <Column
                  title="发放总量"
                  dataIndex="shopdiscountnum"
                  key="shopdiscountnum"
                />
                <Column
                  title="已使用"
                  dataIndex="shopdefalutnum"
                  key="shopdefalutnum"
                />
                <Column
                  title="使用门槛"
                  dataIndex="shopdiscountcell"
                  key="shopdiscountcell"
                />
                <Column
                  title="有效期截至"
                  dataIndex="shopdiscounttime"
                  key="shopdiscounttime"
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
                      >
                        编辑{" "}
                      </Button>
                      <Divider type="vertical" />
                      <Button
                        size="small"
                        type="danger"
                        onClick={() => this.Delete(record)}
                      >
                        删除
                      </Button>
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount(){
      this.props._ShopDisListData()
  }
}

const mapStateToProps = state => {
  return {
    shopdiscountList: state.shopdiscountList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _ShopDisListData() {
      dispatch(ShopDisListAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
