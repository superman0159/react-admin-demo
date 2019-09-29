import React from 'react';
import echarts from 'echarts';

class Test extends React.Component {
    componentDidMount() {
        // 初始化
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title : {
                text: '系统权限分配明细',
                // subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['超级管理员','运营人员','核销人员',]
            },
            series : [
                {
                    name: '所属统计',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:1, name:'超级管理员'},
                        {value:2, name:'运营人员'},
                        {value:3, name:'核销人员'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    }
    render() {
        return (
            <div id="main" style={{ width: '100%', height: 300 }}></div>
        );
    }
}

export default Test;