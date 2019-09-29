import React from 'react';
import echarts from 'echarts';

class Test extends React.Component {
    componentDidMount() {
        // 初始化
        var myChart = echarts.init(document.getElementById('main1'));
        // 绘制图表
        myChart.setOption({
            title : {
                text: '系统产品列表明细',
                // subtext: '纯属虚构',
                x:'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['屈成氏','肯德基','麦当劳','正新鸡排','一点点']
            },
            series: [
                {
                    name:'所属统计',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'屈成氏'},
                        {value:310, name:'肯德基'},
                        {value:234, name:'麦当劳'},
                        {value:135, name:'正新鸡排'},
                        {value:1548, name:'一点点'}
                    ]
                }
            ]
        });
    }
    render() {
        return (
            <div id="main1" style={{ width: '100%', height: 300 }}></div>
        );
    }
}

export default Test;