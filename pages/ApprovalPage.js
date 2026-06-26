window.ApprovalPage = class ApprovalPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        this.render();
        this.ensureChartHeights();
        setTimeout(() => this.initCharts(), 300);
    }

    ensureChartHeights() {
        const pieEl = document.getElementById('pie-chart');
        const legalBarEl = document.getElementById('legal-bar-chart');
        const personBarEl = document.getElementById('person-bar-chart');
        const columnEl = document.getElementById('column-chart');

        if (pieEl) pieEl.style.height = '150px';
        if (legalBarEl) legalBarEl.style.height = '293px';
        if (personBarEl) personBarEl.style.height = '293px';
        if (columnEl) columnEl.style.height = '300px';
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container animate-slide-in approval-layout">
                <div class="approval-content">
                    <div class="col-left">
                        <div class="card-section">
                            <h3 class="card-title">办件业务量</h3>
                            <div class="stat-card-horizontal">
                                <div class="stat-item-row">
                                    <span class="stat-label">受理量</span>
                                    <span class="stat-value">99</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item-row">
                                    <span class="stat-label">办结量</span>
                                    <span class="stat-value">99</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-section">
                            <h3 class="card-title">事项情况</h3>
                            <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px; padding: 8px 16px; border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 4px;">
                                <span class="stat-label">事项总数</span>
                                <span class="stat-value">999</span>
                            </div>
                            <div id="pie-chart" class="chart-container pie-container" style="width: 80%; margin: 0 auto;"></div>
                        </div>
                        
                        <div class="card-section">
                            <h3 class="card-title">跑动占比</h3>
                            <div class="run-data">
                                <div class="run-group">
                                    <div class="run-label">无需跑动占比</div>
                                    <div class="run-items">
                                        <span>省级 99%</span>
                                        <span>市级 99%</span>
                                        <span>县级 99%</span>
                                        <span>街镇级 99%</span>
                                    </div>
                                </div>
                                <div class="run-group">
                                    <div class="run-label">跑动一次占比</div>
                                    <div class="run-items">
                                        <span>省级 99%</span>
                                        <span>市级 99%</span>
                                        <span>县级 99%</span>
                                        <span>街镇级 99%</span>
                                    </div>
                                </div>
                                <div class="run-group">
                                    <div class="run-label">跑动两次占比</div>
                                    <div class="run-items">
                                        <span>省级 99%</span>
                                        <span>市级 99%</span>
                                        <span>县级 99%</span>
                                        <span>街镇级 99%</span>
                                    </div>
                                </div>
                                <div class="run-group">
                                    <div class="run-label">跑动三次及以上占比</div>
                                    <div class="run-items">
                                        <span>省级 99%</span>
                                        <span>市级 99%</span>
                                        <span>县级 99%</span>
                                        <span>街镇级 99%</span>
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
                                <div class="map-popup">
                                    <div class="popup-header">
                                        <span class="popup-title">海南省</span>
                                        <button class="popup-close">×</button>
                                    </div>
                                    <div class="popup-content">
                                        <div class="popup-item">
                                            <span class="popup-label">平均办理时限</span>
                                            <span class="popup-value">1.5天</span>
                                        </div>
                                        <div class="popup-item">
                                            <span class="popup-label">平均提交材料</span>
                                            <span class="popup-value">2.3件</span>
                                        </div>
                                        <div class="popup-item">
                                            <span class="popup-label">平均跑动次数</span>
                                            <span class="popup-value">0.2次</span>
                                        </div>
                                        <div class="popup-item">
                                            <span class="popup-label">好评率</span>
                                            <span class="popup-value">99.8%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bottom-charts">
                            <div class="card-section bar-card">
                                <h3 class="card-title">法人热门办事主题</h3>
                                <div id="legal-bar-chart" class="chart-container bar-container"></div>
                            </div>
                            <div class="card-section bar-card">
                                <h3 class="card-title">自然人热门办事主题</h3>
                                <div id="person-bar-chart" class="chart-container bar-container"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-right">
                        <div class="card-section effect-card">
                            <h3 class="card-title">成效统计</h3>
                            <div class="effect-stats">
                                <div class="effect-item">
                                    <span class="effect-label">平均办理时限</span>
                                    <span class="effect-value">1.2天</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">压缩幅度</span>
                                    <span class="effect-value">85.7%</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">平均提交材料件数</span>
                                    <span class="effect-value">1.3件</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">降幅</span>
                                    <span class="effect-value">71.7%</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">平均跑动次数</span>
                                    <span class="effect-value">0.1次</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">降幅</span>
                                    <span class="effect-value">95.0%</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">好评率</span>
                                    <span class="effect-value">99.9%</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">差评按期整改率</span>
                                    <span class="effect-value">100%</span>
                                </div>
                            </div>
                            <div id="column-chart" class="chart-container column-container" style="height: 300px;"></div>
                        </div>
                        
                        <div class="card-section">
                            <h3 class="card-title">证照目录汇聚量</h3>
                            <div class="license-stats">
                                <div class="license-item">
                                    <span class="license-label">法人证照目录汇聚量</span>
                                    <span class="license-value">99</span>
                                </div>
                                <div class="license-item">
                                    <span class="license-label">自然人证照目录汇聚量</span>
                                    <span class="license-value">99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initCharts() {
        const checkECharts = () => {
            if (typeof echarts === 'undefined') {
                console.log('Waiting for ECharts to load...');
                setTimeout(checkECharts, 100);
                return;
            }

            const pieEl = document.getElementById('pie-chart');
            const legalBarEl = document.getElementById('legal-bar-chart');
            const personBarEl = document.getElementById('person-bar-chart');
            const columnEl = document.getElementById('column-chart');

            if (pieEl) {
                pieEl.style.height = '150px';
                this.charts.pie = echarts.init(pieEl);
                this.initPieChart();
            }

            if (legalBarEl) {
                legalBarEl.style.height = '293px';
                this.charts.legalBar = echarts.init(legalBarEl);
                this.initLegalBarChart();
            }

            if (personBarEl) {
                personBarEl.style.height = '293px';
                this.charts.personBar = echarts.init(personBarEl);
                this.initPersonBarChart();
            }

            if (columnEl) {
                columnEl.style.height = '300px';
                this.charts.column = echarts.init(columnEl);
                this.initColumnChart();
            }

            window.addEventListener('resize', () => {
                Object.values(this.charts).forEach(chart => {
                    try { chart.resize(); } catch(e) {}
                });
            });
        };

        checkECharts();
    }

    initPieChart() {
        if (!this.charts.pie) return;
        const option = {
            tooltip: { trigger: 'item' },
            series: [{
                name: '办件数',
                type: 'pie',
                radius: ['35%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#050d18',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'outside',
                    color: '#fff',
                    fontSize: 13,
                    formatter: '{b}: {c}'
                },
                data: [
                    { value: 25, name: '行政许可', itemStyle: { color: '#00d4ff' } },
                    { value: 20, name: '行政确认', itemStyle: { color: '#00ff88' } },
                    { value: 15, name: '行政裁决', itemStyle: { color: '#ff6b6b' } },
                    { value: 15, name: '行政奖励', itemStyle: { color: '#ffd93d' } },
                    { value: 10, name: '行政给付', itemStyle: { color: '#6bcbff' } },
                    { value: 10, name: '其他行政权力', itemStyle: { color: '#c084fc' } },
                    { value: 5, name: '公共服务', itemStyle: { color: '#22d3ee' } }
                ]
            }]
        };
        this.charts.pie.setOption(option);
    }

    initLegalBarChart() {
        if (!this.charts.legalBar) return;
        const option = {
            tooltip: { trigger: 'axis' },
            grid: { left: '18%', right: '10%', top: '5%', bottom: '10%', containLabel: true },
            xAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                axisLabel: { color: '#fff', fontSize: 12 }
            },
            yAxis: {
                type: 'category',
                data: ['公安消防', '设立变更', '交通运输', '社会保障', '税收财务'],
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                axisLabel: { color: '#fff', fontSize: 12 }
            },
            series: [{
                type: 'bar',
                barWidth: '50%',
                barCategoryGap: '5%',
                data: [65, 75, 80, 85, 90],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#0088aa' }
                    ]),
                    borderRadius: [0, 4, 4, 0]
                }
            }]
        };
        this.charts.legalBar.setOption(option);
    }

    initPersonBarChart() {
        if (!this.charts.personBar) return;
        const option = {
            tooltip: { trigger: 'axis' },
            grid: { left: '18%', right: '10%', top: '5%', bottom: '10%', containLabel: true },
            xAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                axisLabel: { color: '#fff', fontSize: 12 }
            },
            yAxis: {
                type: 'category',
                data: ['医疗卫生', '旅游观光', '社会保障', '证件办理', '交通出行'],
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                axisLabel: { color: '#fff', fontSize: 12 }
            },
            series: [{
                type: 'bar',
                barWidth: '50%',
                barCategoryGap: '5%',
                data: [60, 70, 78, 82, 95],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#00ff88' },
                        { offset: 1, color: '#00aa55' }
                    ]),
                    borderRadius: [0, 4, 4, 0]
                }
            }]
        };
        this.charts.personBar.setOption(option);
    }

    initColumnChart() {
        if (!this.charts.column) return;
        const option = {
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', top: '5%', bottom: '25%' },
            xAxis: {
                type: 'category',
                data: ['高效办成一件事', '极简审批', '智能快办', '免申即享', '全省通办', '信用审批'],
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                axisLabel: { color: '#fff', fontSize: 12, rotate: 45, interval: 0 }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                axisLabel: { color: '#fff', fontSize: 12 }
            },
            series: [{
                type: 'bar',
                barWidth: '50%',
                data: [85, 78, 72, 65, 88, 75],
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
        
        setTimeout(() => {
            this.ensureChartHeights();
            Object.values(this.charts).forEach(chart => {
                try { chart.resize(); } catch(e) {}
            });
        }, 150);
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }
};