window.SupervisionPage = class SupervisionPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        this.render();
        this.ensureChartHeights();
        setTimeout(() => this.initCharts(), 300);
    }

    ensureChartHeights() {
        const pieEl = document.getElementById('supervision-pie');
        const columnEl = document.getElementById('supervision-column');
        
        if (pieEl) pieEl.style.height = '150px';
        if (columnEl) columnEl.style.height = '150px';
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container animate-slide-in supervision-layout">
                <div class="supervision-content">
                    <div class="col-left">
                        <div class="card-section">
                            <h3 class="card-title">监管对象</h3>
                            <div class="supervision-stats-grid">
                                <div class="supervision-stat-item">
                                    <span class="supervision-stat-label">实有市场主体</span>
                                    <span class="supervision-stat-value">99</span>
                                    <span class="supervision-stat-compare trend-up">↑ 1%</span>
                                </div>
                                <div class="supervision-stat-item">
                                    <span class="supervision-stat-label">新设市场主体</span>
                                    <span class="supervision-stat-value">99</span>
                                    <span class="supervision-stat-compare trend-up">↑ 1%</span>
                                </div>
                                <div class="supervision-stat-item">
                                    <span class="supervision-stat-label">注销市场主体</span>
                                    <span class="supervision-stat-value">99</span>
                                    <span class="supervision-stat-compare trend-up">↑ 1%</span>
                                </div>
                                <div class="supervision-stat-item">
                                    <span class="supervision-stat-label">注(吊)销市场主体</span>
                                    <span class="supervision-stat-value">99</span>
                                    <span class="supervision-stat-compare trend-up">↑ 1%</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-section">
                            <h3 class="card-title">对象分类</h3>
                            <div id="supervision-pie" class="chart-container pie-container"></div>
                        </div>

                        <div class="card-section">
                            <h3 class="card-title">迁入迁出</h3>
                            <div id="supervision-column" class="chart-container column-container"></div>
                        </div>

                        <div class="card-section">
                            <h3 class="card-title">经营合规性</h3>
                            <div class="compliance-stats">
                                <div class="compliance-item">
                                    <div class="compliance-row">
                                        <span class="compliance-label">主体合规</span>
                                        <span class="compliance-value">99%</span>
                                        <span class="compliance-compare trend-up">↑ 1%</span>
                                    </div>
                                </div>
                                <div class="compliance-item">
                                    <div class="compliance-row">
                                        <span class="compliance-label">信用等级B级及以上市场主体</span>
                                        <span class="compliance-value">99万户（占比90%）</span>
                                        <span class="compliance-compare trend-up">↑ 1%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-center">
                        <div class="card-section map-card">
                            <h3 class="card-title">地图</h3>
                            <div class="map-container">
                                <div class="map-tab-overlay">
                                    <button class="map-tab-btn active">省直</button>
                                    <button class="map-tab-btn">市县</button>
                                </div>
                                <img src="地图.png" alt="海南地图" class="map-image">
                            </div>
                        </div>

                        <div class="card-section">
                            <div class="top10-container">
                                <div class="top10-section">
                                    <h4 class="top10-section-title">本月监管行为TOP10</h4>
                                    <div class="top10-list">
                                    <table class="top10-table">
                                        <thead>
                                            <tr>
                                                <th>行为名称</th>
                                                <th>次数</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>xxx</td><td>1256</td></tr>
                                            <tr><td>xxx</td><td>985</td></tr>
                                            <tr><td>xxx</td><td>843</td></tr>
                                            <tr><td>xxx</td><td>721</td></tr>
                                            <tr><td>xxx</td><td>654</td></tr>
                                            <tr><td>xxx</td><td>587</td></tr>
                                            <tr><td>xxx</td><td>423</td></tr>
                                            <tr><td>xxx</td><td>367</td></tr>
                                            <tr><td>xxx</td><td>289</td></tr>
                                            <tr><td>xxx</td><td>215</td></tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div class="top10-section">
                                    <h4 class="top10-section-title">本月检出问题领域TOP10</h4>
                                    <div class="top10-list">
                                    <table class="top10-table">
                                        <thead>
                                            <tr>
                                                <th>领域</th>
                                                <th>问题数</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>市场监管</td><td>523</td></tr>
                                            <tr><td>食品安全</td><td>389</td></tr>
                                            <tr><td>消防安全</td><td>276</td></tr>
                                            <tr><td>交通运输</td><td>215</td></tr>
                                            <tr><td>安全生产</td><td>187</td></tr>
                                            <tr><td>环境保护</td><td>156</td></tr>
                                            <tr><td>医疗器械</td><td>123</td></tr>
                                            <tr><td>特种设备</td><td>98</td></tr>
                                            <tr><td>网络交易</td><td>67</td></tr>
                                            <tr><td>广告监管</td><td>56</td></tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-right">
                        <div class="card-section">
                            <h3 class="card-title">监管行为</h3>
                            
                            <div class="action-section">
                                <h4 class="action-title">检查行为总数 <span class="action-title-value">999</span></h4>
                                
                                <div class="action-group">
                                    <h5 class="action-sub-title">(1) 计划类行为</h5>
                                    <div class="action-card">
                                        <div class="action-card-title">单部门双随机</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">制定计划</span><span class="action-indicator-value">1256</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">1156</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">89</span></div>
                                        </div>
                                    </div>
                                    <div class="action-card">
                                        <div class="action-card-title">重点检查</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">制定计划</span><span class="action-indicator-value">523</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">489</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">67</span></div>
                                        </div>
                                    </div>
                                    <div class="action-card">
                                        <div class="action-card-title">专项检查</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">制定计划</span><span class="action-indicator-value">312</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">287</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">45</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="action-group">
                                    <h5 class="action-sub-title">(2) 有因检查</h5>
                                    <div class="action-card">
                                        <div class="action-card-title">有因检查</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">456</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">78</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="action-group">
                                    <h5 class="action-sub-title">(3) 集成类行为</h5>
                                    <div class="action-card">
                                        <div class="action-card-title">综合查一次</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">计划撮合</span><span class="action-indicator-value">234</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">212</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">34</span></div>
                                        </div>
                                    </div>
                                    <div class="action-card">
                                        <div class="action-card-title">跨部门双随机</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">制定计划</span><span class="action-indicator-value">167</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">145</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">23</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="action-section">
                                <h4 class="action-title">核查行为总数 <span class="action-title-value">999</span></h4>
                                <div class="action-group">
                                    <div class="action-card">
                                        <div class="action-card-title">告知承诺制</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">任务</span><span class="action-indicator-value">523</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">完成率</span><span class="action-indicator-value">98%</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">问题检出率</span><span class="action-indicator-value">5%</span></div>
                                            <div class="action-indicator"><span class="action-indicator-value trend-up">↑ 2%</span></div>
                                        </div>
                                    </div>
                                    <div class="action-card">
                                        <div class="action-card-title">承诺即入制</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">任务</span><span class="action-indicator-value">312</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">完成率</span><span class="action-indicator-value">96%</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">问题检出率</span><span class="action-indicator-value">8%</span></div>
                                            <div class="action-indicator"><span class="action-indicator-value trend-up">↑ 8%</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-section">
                            <h3 class="card-title">新型监管</h3>
                            <div class="new-supervision">
                                <button class="new-supervision-btn">沙盒监管</button>
                                <button class="new-supervision-btn">非现场监管</button>
                                <button class="new-supervision-btn">触发式监管</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initCharts() {
        const pieEl = document.getElementById('supervision-pie');
        const columnEl = document.getElementById('supervision-column');

        if (pieEl) {
            this.charts.pie = echarts.init(pieEl);
            this.initPieChart();
        }

        if (columnEl) {
            this.charts.column = echarts.init(columnEl);
            this.initColumnChart();
        }

        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => {
                try { chart.resize(); } catch(e) {}
            });
        });
    }

    initPieChart() {
        if (!this.charts.pie) return;
        const option = {
            tooltip: { trigger: 'item' },
            series: [{
                name: '对象分类',
                type: 'pie',
                radius: ['35%', '70%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: 'rgba(5, 13, 24, 0.8)',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}\n{c}',
                    color: '#fff',
                    fontSize: 12
                },
                data: [
                    { value: 45, name: '企业' },
                    { value: 30, name: '个体工商户' },
                    { value: 15, name: '农专社' },
                    { value: 10, name: '其他组织' }
                ],
                color: ['#00d4ff', '#00ff88', '#ffaa00', '#ff6688']
            }]
        };
        this.charts.pie.setOption(option);
    }

    initColumnChart() {
        if (!this.charts.column) return;
        const option = {
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', top: '15%', bottom: '20%' },
            xAxis: {
                type: 'category',
                data: ['迁入', '迁出'],
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                axisLabel: { color: '#fff', fontSize: 12 }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                axisLabel: { color: '#fff', fontSize: 12 }
            },
            series: [{
                type: 'bar',
                barWidth: '50%',
                data: [99, 99],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#005577' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            }]
        };
        this.charts.column.setOption(option);
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