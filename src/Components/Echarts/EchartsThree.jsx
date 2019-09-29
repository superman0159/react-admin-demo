import React from 'react';
import echarts from 'echarts';

class Test extends React.Component {
    componentDidMount() {
        // 初始化
        var myChart = echarts.init(document.getElementById('main2'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '系统产品细节明细',
                // subtext: '纯属虚构',
                x: 'left'
            },
            legend: {
                
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            dataset: {
                source: [
                    ['product', '2017', '2018', '2019', '2020'],
                    ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
                    ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
                    ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
                ]
            },
            xAxis: [
                { type: 'category', gridIndex: 0 },
                { type: 'category', gridIndex: 1 }
            ],
            yAxis: [
                { gridIndex: 0 },
                { gridIndex: 1 }
            ],
            grid: [
                { bottom: '55%' },
                { top: '55%' }
            ],
            series: [
                // These series are in the first grid.
                { type: 'bar', seriesLayoutBy: 'row' },
                { type: 'bar', seriesLayoutBy: 'row' },
                { type: 'bar', seriesLayoutBy: 'row' },
                // These series are in the second grid.
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
            ]
        });
    }
    render() {
        return (
            <div id="main2" style={{ width: 'auto', height: 500}}></div>
        );
    }
}

export default Test;