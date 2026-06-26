window.CreditPage = class CreditPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        this.render();
        this.initTabs();
        this.initCharts();
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container credit-layout animate-slide-in">
                <div class="credit-content">
                    <div class="col-left">
                        <div class="card-section credit-level-section">
                            <div class="card-title">一、信用等级审批对象信用信息</div>
                            <div id="creditLevelPie" class="chart-container pie-container"></div>
                        </div>

                        <div class="card-section dual-public-section">
                            <div class="card-title">二、双公示情况</div>
                            <div class="dual-public-content">
                                <div class="public-group">
                                    <div class="public-title">1.行政许可</div>
                                    <div class="public-items-row">
                                        <div class="public-item-horizontal">
                                            <span class="public-label">数据合规率</span>
                                            <span class="public-value">98%</span>
                                        </div>
                                        <div class="public-item-horizontal">
                                            <span class="public-label">数据迟报率</span>
                                            <span class="public-value">2%</span>
                                        </div>
                                        <div class="public-item-horizontal">
                                            <span class="public-label">数据瞒报率</span>
                                            <span class="public-value">0%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="public-group">
                                    <div class="public-title">2.行政处罚</div>
                                    <div class="public-items-row">
                                        <div class="public-item-horizontal">
                                            <span class="public-label">数据合规率</span>
                                            <span class="public-value">96%</span>
                                        </div>
                                        <div class="public-item-horizontal">
                                            <span class="public-label">数据迟报率</span>
                                            <span class="public-value">3%</span>
                                        </div>
                                        <div class="public-item-horizontal">
                                            <span class="public-label">数据瞒报率</span>
                                            <span class="public-value">1%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-section subject-section">
                            <div class="card-title">三、信用主体情况</div>
                            <div id="subjectPie" class="chart-container pie-container"></div>
                        </div>

                        <div class="card-section dishonest-section">
                            <div class="card-title">四、失信情况</div>
                            <div class="dishonest-content">
                                <div class="dishonest-item">
                                    <span class="dishonest-label">一般失信行为总数</span>
                                    <span class="dishonest-value">1,234</span>
                                </div>
                                <div class="dishonest-item">
                                    <span class="dishonest-label">严重失信主体名单总数</span>
                                    <span class="dishonest-value">56</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-center">
                        <div class="credit-stats-bar">
                            <div class="credit-stat-card">
                                <span class="credit-stat-value">1,567</span>
                                <span class="credit-stat-label">信用审批数</span>
                            </div>
                            <div class="credit-stat-card">
                                <span class="credit-stat-value">2,345</span>
                                <span class="credit-stat-label">信用监管数</span>
                            </div>
                            <div class="credit-stat-card">
                                <span class="credit-stat-value">890</span>
                                <span class="credit-stat-label">信用执法数</span>
                            </div>
                            <div class="credit-stat-card">
                                <span class="credit-stat-value">456</span>
                                <span class="credit-stat-label">信用修复数</span>
                            </div>
                        </div>
                        
                        <div class="card-section map-card">
                            <div class="card-title">信用区域分布</div>
                            <div class="map-container">
                                <div class="map-tab-overlay">
                                    <button class="map-tab-btn active">省直</button>
                                    <button class="map-tab-btn">市县</button>
                                </div>
                                <img src="地图.png" class="map-image" alt="海南地图">
                            </div>
                        </div>

                        <div class="card-section effect-section">
                            <div class="effect-content">
                                <div class="effect-item">
                                    <span class="effect-label">信用审批成效:</span>
                                    <span class="effect-value">办理率 98%</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">信用监管成效:</span>
                                    <span class="effect-value">监管覆盖率 95%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-right">
                        <div class="card-section evaluation-section">
                            <div class="card-title">五、信用评价</div>
                            <div class="tab-container">
                                <div class="tab-header">
                                    <div class="tab-item active" data-tab="evaluationBar1">法人公共信用评价报告</div>
                                    <div class="tab-item" data-tab="evaluationBar2">个人金椰分信用评价情况</div>
                                </div>
                                <div class="tab-content">
                                    <div id="evaluationBar1" class="chart-container bar-container tab-pane active"></div>
                                    <div id="evaluationBar2" class="chart-container bar-container tab-pane"></div>
                                </div>
                            </div>
                        </div>

                        <div class="card-section promise-section">
                            <div class="card-title">六、信用承诺</div>
                            <div class="promise-content">
                                <div class="promise-item">
                                    <span class="promise-label">信用承诺申请</span>
                                    <span class="promise-value">1,890</span>
                                </div>
                                <div class="promise-item">
                                    <span class="promise-label">信用承诺办理</span>
                                    <span class="promise-value">1,856</span>
                                </div>
                                <div class="promise-item">
                                    <span class="promise-label">自然人违诺</span>
                                    <span class="promise-value">890</span>
                                </div>
                                <div class="promise-item">
                                    <span class="promise-label">法人违诺</span>
                                    <span class="promise-value">966</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-section reward-section">
                            <div class="card-title">七、联合奖惩</div>
                            <div class="reward-content">
                                <div class="reward-item">
                                    <span class="reward-label">红名单</span>
                                    <span class="reward-value">123</span>
                                </div>
                                <div class="reward-item">
                                    <span class="reward-label">黑名单</span>
                                    <span class="reward-value">45</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-section repair-section">
                            <div class="card-title">八、信用修复</div>
                            <div id="repairPie" class="chart-container pie-container"></div>
                        </div>

                        <div class="card-section category-section">
                            <div class="card-title">九、信用类别情况</div>
                            <div id="categoryBar" class="chart-container bar-container"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initTabs() {
        const tabItems = this.container.querySelectorAll('.tab-item');
        tabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;

                // 移除所有tab的active状态
                tabItems.forEach(t => t.classList.remove('active'));
                this.container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

                // 激活当前tab
                tab.classList.add('active');
                const targetPane = this.container.querySelector(`#${tabId}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                    // 重新调整图表大小
                    const chartId = tabId;
                    if (this.charts[chartId]) {
                        this.charts[chartId].resize();
                    }
                }
            });
        });
    }

    initCharts() {
        setTimeout(() => {
            this.initCreditLevelPie();
            this.initSubjectPie();
            this.initEvaluationBar1();
            this.initEvaluationBar2();
            this.initRepairPie();
            this.initCategoryBar();
        }, 300);
    }

    initCreditLevelPie() {
        const chart = echarts.init(document.getElementById('creditLevelPie'));
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                radius: ['45%', '70%'],
                center: ['50%', '50%'],
                type: 'pie',
                data: [
                    { value: 35, name: '红色对象数', itemStyle: { color: '#ff6b6b' } },
                    { value: 25, name: '橙色对象数', itemStyle: { color: '#ffaa00' } },
                    { value: 30, name: '蓝色对象数', itemStyle: { color: '#00d4ff' } },
                    { value: 10, name: '黑色对象数', itemStyle: { color: '#666666' } }
                ],
                label: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
                labelLine: { length: 5, length2: 5, lineStyle: { color: 'rgba(0,212,255,0.5)' } }
            }]
        };
        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }

    initSubjectPie() {
        const chart = echarts.init(document.getElementById('subjectPie'));
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                radius: ['45%', '70%'],
                center: ['50%', '50%'],
                type: 'pie',
                data: [
                    { value: 45, name: '法人', itemStyle: { color: '#00d4ff' } },
                    { value: 20, name: '社会组织', itemStyle: { color: '#00ff88' } },
                    { value: 25, name: '自然人', itemStyle: { color: '#ffaa00' } },
                    { value: 10, name: '政府部门', itemStyle: { color: '#ff6b6b' } }
                ],
                label: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
                labelLine: { length: 5, length2: 5, lineStyle: { color: 'rgba(0,212,255,0.5)' } }
            }]
        };
        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }

    initRepairPie() {
        const chart = echarts.init(document.getElementById('repairPie'));
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                radius: ['45%', '70%'],
                center: ['50%', '50%'],
                type: 'pie',
                data: [
                    { value: 55, name: '企业数', itemStyle: { color: '#00d4ff' } },
                    { value: 30, name: '个体工商数', itemStyle: { color: '#00ff88' } },
                    { value: 15, name: '其他组织数', itemStyle: { color: '#ffaa00' } }
                ],
                label: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
                labelLine: { length: 5, length2: 5, lineStyle: { color: 'rgba(0,212,255,0.5)' } }
            }]
        };
        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }

    initEvaluationBar1() {
        const chart = echarts.init(document.getElementById('evaluationBar1'));
        const option = {
            backgroundColor: 'transparent',
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true, borderWidth: 0, borderColor: 'transparent' },
            xAxis: { type: 'category', data: ['信用A级', '信用B级', '信用C级', '信用D级'], axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, rotate: 30 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } }, axisTick: { show: false } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }, axisTick: { show: false } },
            series: [{
                data: [45, 30, 18, 7],
                type: 'bar',
                itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00d4ff' }, { offset: 1, color: '#0066cc' }]), borderRadius: [4, 4, 0, 0] },
                barWidth: '50%'
            }]
        };
        chart.setOption(option);
        this.charts.evaluationBar1 = chart;
        window.addEventListener('resize', () => chart.resize());
    }

    initEvaluationBar2() {
        const chart = echarts.init(document.getElementById('evaluationBar2'));
        const option = {
            backgroundColor: 'transparent',
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true, borderWidth: 0, borderColor: 'transparent' },
            xAxis: { type: 'category', data: ['分数待提升', '分数一般', '分数较高', '分数很高', '分数极高'], axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, rotate: 30 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } }, axisTick: { show: false } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }, axisTick: { show: false } },
            series: [{
                data: [15, 25, 30, 22, 8],
                type: 'bar',
                itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00ff88' }, { offset: 1, color: '#00aa55' }]), borderRadius: [4, 4, 0, 0] },
                barWidth: '45%'
            }]
        };
        chart.setOption(option);
        this.charts.evaluationBar2 = chart;
        window.addEventListener('resize', () => chart.resize());
    }

    initCategoryBar() {
        const chart = echarts.init(document.getElementById('categoryBar'));
        const option = {
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['未分类', '基本信息', '业务信息', '行政许可信息', '行政执法信息', '公用事业信息', '其他信息'], axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, rotate: 20 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                data: [5, 35, 25, 15, 12, 5, 3],
                type: 'bar',
                itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#ffaa00' }, { offset: 1, color: '#ff7700' }]), borderRadius: [4, 4, 0, 0] },
                barWidth: '40%'
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