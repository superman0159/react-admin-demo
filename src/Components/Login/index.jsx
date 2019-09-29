import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginAction } from './../../Store/actionCreators';
import { Form, Icon, Input, Button } from 'antd';
import md5 from 'md5'
import './index.scss';

const S_TOKEN = 'WoShiDaShuaiGe.ChaoJiShuai.Com'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //获取数据
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let username = values.username, // 用户名
                    password = md5(values.password + S_TOKEN); // 密码
                // 加密 md5

                let loginParams = new URLSearchParams();
                loginParams.append('username', username)
                loginParams.append('password', password)

                this.props._LoginAdmin(loginParams, (code) => {
                    console.log(code)
                    if (code.token !== '') {
                        this.props.history.push('/')
                    }
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container">
                <Form className="login-form">
                    <div className="login-logo">
                        {/* <img src={Config.logoSrc} /> */}
                        <span>Admin Login</span>
                    </div>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                maxLength={8}
                            /> ,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleSubmit} type="primary" className="login-form-button" >
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        _LoginAdmin(data, callback) {
            dispatch(LoginAction(data, callback))
        }
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Index);

export default connect(
    null,
    mapDispatchToProps
)(WrappedNormalLoginForm)
