import React, { Component } from 'react'
import './../index.scss';
import { Row, Col, Card } from 'antd';
import EchartsOne from './../../Components/Echarts/EchartsOne'
import EchartsTwo from './../../Components/Echarts/EchartsTwo'
import EchartsThree from './../../Components/Echarts/EchartsThree'

export default class Echarts extends Component {
    render() {
        return (
            <div className="home-container">
                <Row>
                    <Col span={24}>
                        <Card className="mg-top">
                            <Col span={12}>
                                <EchartsOne />
                            </Col>
                            <Col span={12}>
                                <EchartsTwo />
                            </Col>
                        </Card>
                        <Card className="mg-top" >
                            <Col span={24}>
                                <EchartsThree />
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
