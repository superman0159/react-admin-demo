import React, { Component } from 'react'
import showConfirm from './../../Components/TextModal';
import { error } from './../../Components/Info';
import { AdminAction } from './../../Store/actionCreators';
import { addAdminData, removeAdminData } from './../../Api';
import { connect } from 'react-redux';
import './../index.scss';
import { Row, Col, Card, Table, Divider, Select, Button, Modal, Form, Input } from 'antd';
const { Column } = Table;
const { Option } = Select;

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
            current: 1,
            visible: false,
            adminname: '',
            adminrole: '运营人员',
            code: '1',
            admincode: '',
            adminpwd: '',
        }
    }
    //编辑管理员
    Edit = (record) => {
        console.log(record)
    }
    //删除管理员
    Delete = (record) => {
        const { _id } = record;
        showConfirm(record, () => {
            removeAdminData(_id).then(res=>{
                if(res.data.status_code === 200){
                    this.props.reqAdminData()
                }
            }).catch(err=>{
                error('删除数据失败')
            })
        })
    }
    //处理分页
    onChange = page => {
        this.setState({
            current: page,
        });
    };
    //模态框处理
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //提交管理员
    handleOk = e => {
        const { adminname, adminrole, admincode, adminpwd } = this.state;
        if (adminname === '' || adminrole === '' || admincode === '' || adminpwd === '') {
            error('请填写完整信息')
        }
        console.log(adminname, adminrole, admincode, adminpwd)
        let loginParams = new URLSearchParams();
        loginParams.append('adminname', adminname)
        loginParams.append('adminrole', adminrole)
        loginParams.append('admincode', admincode)
        loginParams.append('adminpwd', adminpwd)
        console.log(this.props.history)
        addAdminData(loginParams).then((res) => {
            if (res.data.status_code === 200) {
                this.setState({
                    visible: false,
                }, () => {
                    this.props.reqAdminData()
                });
            } else {
                error('添加管理员失败')
            }
        })
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const { adminlist } = this.props;
        adminlist.forEach((item, index) => {
            item.key = index + 1
        })
        const { adminname, code, admincode, adminpwd } = this.state;
        return (
            <div className="home-container">
                <Row>
                    <Col span={24} >
                        <Card className="mg-top" title="管理员权限">
                            <Button type="primary" onClick={this.showModal}>添加管理员</Button>
                            <Modal
                                title="添加管理员明细"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <Form {...formItemLayout}>
                                    <Form.Item label="管理员名称">
                                        <Input placeholder="请输入管理员名称" name="adminname" value={adminname} onChange={(e) => this._onInputChange(e)} />
                                    </Form.Item>
                                    <Form.Item label="角色">
                                        <Select
                                            onChange={(e) => this._onSelectChange(e)}
                                            defaultValue={code}
                                        >
                                            <Option value="1">运营人员</Option>
                                            <Option value="2">核销人员</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="账号">
                                        <Input placeholder="请输入管理员账号" name="admincode" value={admincode} onChange={(e) => this._onInputChange(e)} />
                                    </Form.Item>
                                    <Form.Item label="密码">
                                        <Input placeholder="请输入管理员密码" name="adminpwd" value={adminpwd} onChange={(e) => this._onInputChange(e)} />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Card>
                        <Card className="mg-top" title="管理成员明细列表">
                            <Table
                                dataSource={adminlist}
                                pagination={{
                                    current: this.state.current,
                                    pageSize: 6,
                                    total: 30,
                                    onChange: this.onChange
                                }}
                            >
                                <Column title="姓名" dataIndex="adminname" key="adminname" />
                                <Column title="角色" dataIndex="adminrole" key="adminrole" />
                                <Column title="管理账号" dataIndex="admincode" key="admincode" />
                                <Column title="密码" dataIndex="adminpwd" key="adminpwd" />
                                <Column title="创建时间" dataIndex="time" key="time" />
                                <Column
                                    title="操作"
                                    key="action"
                                    render={(text, record) => (
                                        <span>
                                            <Button size="small" type="primary" onClick={() => this.Edit(record)}>编辑 </Button>
                                            <Divider type="vertical" />
                                            <Button size="small" type="danger" onClick={() => this.Delete(record)}>删除</Button>
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
    // g获取输入框
    _onInputChange(e, f) {
        // 1.1 获取用户输入的数据
        let inputValue = e.target.value;
        let inputName = e.target.name;
        // 更新状态机
        this.setState({
            [inputName]: inputValue
        })
    }
    //多选
    _onSelectChange(e) {
        let adminrole;
        if (e === '2') {
            adminrole = '核销人员'
        } else if (e === '1') {
            adminrole = '运营人员'
        }
        this.setState({ adminrole })
    }
    componentDidMount() {
        this.props.reqAdminData()
    }

}

const mapStateToProps = (state) => {
    return {
        adminlist: state.adminlist
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        reqAdminData(callback) {
            dispatch(AdminAction(callback))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(index);
