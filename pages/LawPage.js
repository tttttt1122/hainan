window.LawPage = class LawPage {
    constructor(container) {
        this.container = container;
        this.render();
        this.initCharts();
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container law-layout animate-slide-in">
                <div class="law-content">
                    <div class="col-left">
                        <div class="card-section clue-section">
                            <div class="card-title">线索办理情况</div>
                            <div class="stat-card-horizontal">
                                <div class="stat-item">
                                    <span class="stat-label">线索总数</span>
                                    <span class="stat-value">1,234</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item">
                                    <span class="stat-label">待办线索数</span>
                                    <span class="stat-value">156</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item">
                                    <span class="stat-label">已办线索数</span>
                                    <span class="stat-value">1,078</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-section case-section">
                            <div class="card-title">案件情况</div>
                            <div class="case-stats">
                                <div class="stat-card-horizontal">
                                    <div class="stat-item">
                                        <span class="stat-label">案源数</span>
                                        <span class="stat-value">892</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">立案数</span>
                                        <span class="stat-value">756</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">处罚数</span>
                                        <span class="stat-value">689</span>
                                    </div>
                                </div>
                            </div>
                            <div id="caseBarChart" class="chart-container bar-container-small"></div>
                            <div class="case-bottom-stats">
                                <div class="stat-card-horizontal">
                                    <div class="stat-item">
                                        <span class="stat-label">首违不罚数</span>
                                        <span class="stat-value">123</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">轻微免罚数</span>
                                        <span class="stat-value">89</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">案件办结率</span>
                                        <span class="stat-value">92%</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">行刑衔接率</span>
                                        <span class="stat-value">85%</span>
                                    </div>
                                </div>
                            </div>
                            <div id="caseLineChart" class="chart-container line-container-small"></div>
                        </div>
                    </div>

                    <div class="col-center">
                        <div class="card-section map-card">
                            <div class="card-title">执法区域分布</div>
                            <div class="map-container">
                                <div class="map-tab-overlay">
                                    <button class="map-tab-btn active">省直</button>
                                    <button class="map-tab-btn">市县</button>
                                </div>
                                <img src="地图.png" class="map-image" alt="海南地图">
                            </div>
                        </div>
                        <div class="card-section top10-section">
                            <div class="top10-container">
                                <div class="top10-card">
                                    <div class="top10-title">本月执法行为TOP10</div>
                                    <div class="top10-list">
                                        <table class="top10-table">
                                                <thead>
                                                <tr>
                                                    <th>行为名称</th>
                                                    <th>次数</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>xxx</td><td>156</td></tr>
                                                <tr><td>xxx</td><td>142</td></tr>
                                                <tr><td>xxx</td><td>89</td></tr>
                                                <tr><td>xxx</td><td>78</td></tr>
                                                <tr><td>xxx</td><td>65</td></tr>
                                                <tr><td>xxx</td><td>56</td></tr>
                                                <tr><td>xxx</td><td>45</td></tr>
                                                <tr><td>xxx</td><td>38</td></tr>
                                                <tr><td>xxx</td><td>29</td></tr>
                                                <tr><td>xxx</td><td>23</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="top10-card">
                                    <div class="top10-title">本月检出问题领域TOP10</div>
                                    <div class="top10-list">
                                        <table class="top10-table">
                                                <thead>
                                                <tr>
                                                    <th>领域</th>
                                                    <th>次数</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>食品安全</td><td>134</td></tr>
                                                <tr><td>产品质量</td><td>98</td></tr>
                                                <tr><td>价格违规</td><td>76</td></tr>
                                                <tr><td>广告违法</td><td>65</td></tr>
                                                <tr><td>特种设备</td><td>54</td></tr>
                                                <tr><td>知识产权</td><td>48</td></tr>
                                                <tr><td>网络安全</td><td>42</td></tr>
                                                <tr><td>环境保护</td><td>36</td></tr>
                                                <tr><td>劳动保障</td><td>31</td></tr>
                                                <tr><td>消防安全</td><td>27</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-right">
                        <div class="card-section efficiency-section">
                            <div class="card-title">办案时效统计</div>
                            <div class="stat-card-horizontal">
                                <div class="stat-item">
                                    <span class="stat-label">平均办案时效 98天</span>
                                </div>
                            </div>
                            <div id="efficiencyPie1" class="chart-container pie-container"></div>
                        </div>

                        <div class="card-section penalty-section">
                            <div class="card-title">处罚信息公示情况</div>
                            <div class="stat-card-horizontal">
                                <div class="stat-item">
                                    <span class="stat-label">行政处罚信用数据归集数</span>
                                    <span class="stat-value">2,345</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item">
                                    <span class="stat-label">行政处罚信用数据公示数</span>
                                    <span class="stat-value">2,198</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-section review-section">
                            <div class="card-title">在线案卷评查</div>
                            <div class="review-content">
                                <div class="review-group">
                                    <div class="review-title">评查计划</div>
                                    <div class="review-items-row">
                                        <div class="review-item-horizontal">
                                            <span class="review-label">计划总数</span>
                                            <span class="review-value">99</span>
                                        </div>
                                        <div class="review-item-horizontal">
                                            <span class="review-label">计划下发率</span>
                                            <span class="review-value">99%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="review-group">
                                    <div class="review-title">评查任务</div>
                                    <div class="review-items-row">
                                        <div class="review-item-horizontal">
                                            <span class="review-label">任务总数</span>
                                            <span class="review-value">99</span>
                                        </div>
                                        <div class="review-item-horizontal">
                                            <span class="review-label">任务执行率</span>
                                            <span class="review-value">99%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="review-group">
                                    <div class="review-title">覆盖部门</div>
                                    <div class="review-items-row">
                                        <div class="review-item-horizontal">
                                            <span class="review-label">部门总数</span>
                                            <span class="review-value">99</span>
                                        </div>
                                        <div class="review-item-horizontal">
                                            <span class="review-label">部门覆盖率</span>
                                            <span class="review-value">99%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="review-group">
                                    <div class="review-title">评查结果</div>
                                    <div class="review-items-row">
                                        <div class="review-item-horizontal">
                                            <span class="review-label">抽取案卷总数</span>
                                            <span class="review-value">99</span>
                                        </div>
                                        <div class="review-item-horizontal">
                                            <span class="review-label">评查合格率</span>
                                            <span class="review-value">99%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initCharts() {
        setTimeout(() => {
            this.initCaseBarChart();
            this.initCaseLineChart();
            this.initEfficiencyPie1();
        }, 300);
    }

    initCaseBarChart() {
        const chart = echarts.init(document.getElementById('caseBarChart'));
        const option = {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['简易程序', '普通程序', '行政强制措施', '行政强制执行'],
                axisLabel: {
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 12,
                    rotate: 30
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.3)' }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.3)' }
                },
                splitLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.1)' }
                }
            },
            series: [{
                data: [320, 280, 156, 89],
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#0066cc' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                barWidth: '50%'
            }]
        };
        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }

    initCaseLineChart() {
        const chart = echarts.init(document.getElementById('caseLineChart'));
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['首违不罚', '轻微免罚'],
                textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
                bottom: 0
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '12%',
                top: '8%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                axisLabel: {
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.3)' }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.3)' }
                },
                splitLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.1)' }
                }
            },
            series: [
                {
                    name: '首违不罚',
                    type: 'line',
                    data: [18, 22, 20, 25, 21, 17],
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: {
                        color: '#00d4ff',
                        width: 2
                    },
                    itemStyle: {
                        color: '#00d4ff'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0,212,255,0.25)' },
                            { offset: 1, color: 'rgba(0,212,255,0.02)' }
                        ])
                    }
                },
                {
                    name: '轻微免罚',
                    type: 'line',
                    data: [12, 15, 14, 18, 16, 14],
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: {
                        color: '#00ff88',
                        width: 2
                    },
                    itemStyle: {
                        color: '#00ff88'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0,255,136,0.25)' },
                            { offset: 1, color: 'rgba(0,255,136,0.02)' }
                        ])
                    }
                }
            ]
        };
        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }

    initEfficiencyPie1() {
        const chart = echarts.init(document.getElementById('efficiencyPie1'));
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            series: [{
                radius: ['45%', '70%'],
                center: ['50%', '50%'],
                type: 'pie',
                data: [
                    { value: 45, name: '90日内办结', itemStyle: { color: '#00d4ff' } },
                    { value: 30, name: '90-120日办结', itemStyle: { color: '#00ff88' } },
                    { value: 15, name: '120-180日办结', itemStyle: { color: '#ffaa00' } },
                    { value: 10, name: '180日以上', itemStyle: { color: '#ff6b6b' } }
                ],
                label: {
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.8)'
                },
                labelLine: {
                    length: 5,
                    length2: 5,
                    lineStyle: { color: 'rgba(0,212,255,0.5)' }
                }
            }]
        };
        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }

    show() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = '';  // 恢复 CSS 定义的布局
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }
};