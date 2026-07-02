window.CreditPage = class CreditPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        // 行政许可弹窗
        this.xkComplianceData = []; this.xkCompPage = 1; this.xkCompPageSize = 5; this._xkCompOvl = null; this._xkCompCharts = {};
        this.xkLateData = []; this.xkLatePage = 1; this.xkLatePageSize = 5; this._xkLateOvl = null; this._xkLateCharts = {};
        this.xkConcealData = []; this.xkConcPage = 1; this.xkConcPageSize = 5; this._xkConcOvl = null; this._xkConcCharts = {};
        // 行政处罚弹窗
        this.xzComplianceData = []; this.xzCompPage = 1; this.xzCompPageSize = 5; this._xzCompOvl = null; this._xzCompCharts = {};
        this.xzLateData = []; this.xzLatePage = 1; this.xzLatePageSize = 5; this._xzLateOvl = null; this._xzLateCharts = {};
        this.xzConcealData = []; this.xzConcPage = 1; this.xzConcPageSize = 5; this._xzConcOvl = null; this._xzConcCharts = {};
        // 信用承诺弹窗
        this.promiseApplyData = []; this.paPage = 1; this.paPageSize = 5; this._paOvl = null; this._paCharts = {};
        this.promiseHandleData = []; this.phPage = 1; this.phPageSize = 5; this._phOvl = null; this._phCharts = {};
        this.promiseNaturalData = []; this.pnPage = 1; this.pnPageSize = 5; this._pnOvl = null; this._pnCharts = {};
        this.promiseLegalData = []; this.plPage = 1; this.plPageSize = 5; this._plOvl = null; this._plCharts = {};
        // 联合奖惩弹窗
        this.rewardRedData = []; this.rrPage = 1; this.rrPageSize = 5; this._rrOvl = null; this._rrCharts = {};
        this.rewardBlackData = []; this.rbPage = 1; this.rbPageSize = 5; this._rbOvl = null; this._rbCharts = {};
        // 失信情况弹窗
        this.dishonestGeneralData = []; this.dgPage = 1; this.dgPageSize = 5; this._dgOvl = null; this._dgCharts = {};
        this.dishonestSeriousData = []; this.dsPage = 1; this.dsPageSize = 5; this._dsOvl = null; this._dsCharts = {};
        // 信用全景分析弹窗
        this.caData = []; this.caPage = 1; this.caPageSize = 5; this._caOvl = null; this._caCharts = {};
        this.csData = []; this.csPage = 1; this.csPageSize = 5; this._csOvl = null; this._csCharts = {};
        this.clData = []; this.clPage = 1; this.clPageSize = 5; this._clOvl = null; this._clCharts = {};
        this.crData = []; this.crPage = 1; this.crPageSize = 5; this._crOvl = null; this._crCharts = {};
        this.render();
        this.initTabs();
        this.initCharts();
        this.bindEvents();
    }

    renderRvTag(status, colorMap) {
        const color = colorMap[status] || 'default';
        return `<span class="rv-tag rv-tag-${color}">${status}</span>`;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const triggers = [
                ['data-xk-compliance', 'openXkComplianceModal'],
                ['data-xk-late', 'openXkLateModal'],
                ['data-xk-conceal', 'openXkConcealModal'],
                ['data-xz-compliance', 'openXzComplianceModal'],
                ['data-xz-late', 'openXzLateModal'],
                ['data-xz-conceal', 'openXzConcealModal'],
                ['data-promise-apply', 'openPromiseApplyModal'],
                ['data-promise-handle', 'openPromiseHandleModal'],
                ['data-promise-natural', 'openPromiseNaturalModal'],
                ['data-promise-legal', 'openPromiseLegalModal'],
                ['data-reward-red', 'openRewardRedModal'],
                ['data-reward-black', 'openRewardBlackModal'],
                ['data-dishonest-general', 'openDishonestGeneralModal'],
                ['data-dishonest-serious', 'openDishonestSeriousModal'],
                ['data-credit-approval', 'openCreditApprovalModal'],
                ['data-credit-supervision', 'openCreditSupervisionModal'],
                ['data-credit-law', 'openCreditLawModal'],
                ['data-credit-repair', 'openCreditRepairModal'],
            ];
            for (const [attr, method] of triggers) {
                const trigger = e.target.closest(`[${attr}]`);
                if (trigger) { this[method](); return; }
            }
        });
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container credit-layout animate-slide-in">
                <div class="credit-content">
                    <div class="col-left">
                        <div class="card-section credit-level-section">
                            <div class="card-title">信用等级审批对象信用信息</div>
                            <div id="creditLevelPie" class="chart-container pie-container"></div>
                        </div>

                        <div class="card-section dual-public-section">
                            <div class="card-title">双公示情况</div>
                            <div class="dual-public-content">
                                <div class="public-group">
                                    <div class="public-title">行政许可</div>
                                    <div class="public-items-row">
                                        <div class="public-item-horizontal" data-xk-compliance="true">
                                            <span class="public-label">数据合规率</span>
                                            <span class="public-value">98%</span>
                                        </div>
                                        <div class="public-item-horizontal" data-xk-late="true">
                                            <span class="public-label">数据迟报率</span>
                                            <span class="public-value">2%</span>
                                        </div>
                                        <div class="public-item-horizontal" data-xk-conceal="true">
                                            <span class="public-label">数据瞒报率</span>
                                            <span class="public-value">0%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="public-group">
                                    <div class="public-title">行政处罚</div>
                                    <div class="public-items-row">
                                        <div class="public-item-horizontal" data-xz-compliance="true">
                                            <span class="public-label">数据合规率</span>
                                            <span class="public-value">96%</span>
                                        </div>
                                        <div class="public-item-horizontal" data-xz-late="true">
                                            <span class="public-label">数据迟报率</span>
                                            <span class="public-value">3%</span>
                                        </div>
                                        <div class="public-item-horizontal" data-xz-conceal="true">
                                            <span class="public-label">数据瞒报率</span>
                                            <span class="public-value">1%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-section subject-section">
                            <div class="card-title">信用主体情况</div>
                            <div id="subjectPie" class="chart-container pie-container"></div>
                        </div>

                        <div class="card-section dishonest-section">
                            <div class="card-title">失信情况</div>
                            <div class="dishonest-content">
                                <div class="dishonest-item" data-dishonest-general="true">
                                    <span class="dishonest-label">一般失信行为总数</span>
                                    <span class="dishonest-value">1,234</span>
                                </div>
                                <div class="dishonest-item" data-dishonest-serious="true">
                                    <span class="dishonest-label">严重失信主体名单总数</span>
                                    <span class="dishonest-value">56</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-center">
                        <div class="credit-stats-bar">
                            <div class="credit-stat-card" data-credit-approval="true">
                                <span class="credit-stat-value">1,567</span>
                                <span class="credit-stat-label">信用审批数</span>
                            </div>
                            <div class="credit-stat-card" data-credit-supervision="true">
                                <span class="credit-stat-value">2,345</span>
                                <span class="credit-stat-label">信用监管数</span>
                            </div>
                            <div class="credit-stat-card" data-credit-law="true">
                                <span class="credit-stat-value">890</span>
                                <span class="credit-stat-label">信用执法数</span>
                            </div>
                            <div class="credit-stat-card" data-credit-repair="true">
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

                        <div class="card-section ce-wrapper">
                            <div class="ce-container">
                                <div class="ce-card">
                                    <div class="ce-title">信用审批成效</div>
                                    <div class="ce-kpi-row">
                                        <div class="ce-kpi">
                                            <span class="ce-kpi-num">1,567件</span>
                                            <span class="ce-kpi-text">信用审批办件量</span>
                                        </div>
                                        <div class="ce-kpi">
                                            <span class="ce-kpi-num">98%</span>
                                            <span class="ce-kpi-text">办结率 <span class="ce-up">↑2%</span></span>
                                        </div>
                                        <div class="ce-kpi">
                                            <span class="ce-kpi-num">1.2天</span>
                                            <span class="ce-kpi-text">平均时限</span>
                                        </div>
                                        <div class="ce-kpi">
                                            <span class="ce-kpi-num">85.7%</span>
                                            <span class="ce-kpi-text">压缩幅度</span>
                                        </div>
                                    </div>
                                    <div class="ce-bar-row">
                                        <div class="ce-bar" style="flex:35;background:#00d4ff;"></div>
                                        <div class="ce-bar" style="flex:25;background:#34c759;"></div>
                                        <div class="ce-bar" style="flex:20;background:#ff9500;"></div>
                                        <div class="ce-bar" style="flex:20;background:#af52de;"></div>
                                    </div>
                                    <div class="ce-labels">
                                        <span class="ce-label">告知承诺制</span>
                                        <span class="ce-label">容缺受理</span>
                                        <span class="ce-label">信用承诺</span>
                                        <span class="ce-label">其他</span>
                                    </div>
                                </div>
                                <div class="ce-card">
                                    <div class="ce-title">信用监管成效</div>
                                    <div class="ce-kpi-row">
                                        <div class="ce-kpi">
                                            <span class="ce-kpi-num">2,345户</span>
                                            <span class="ce-kpi-text">覆盖对象</span>
                                        </div>
                                        <div class="ce-kpi">
                                            <span class="ce-kpi-num">95%</span>
                                            <span class="ce-kpi-text">覆盖率 <span class="ce-up">↑3%</span></span>
                                        </div>
                                        <div class="ce-kpi">
                                            <span class="ce-kpi-num">8.5%</span>
                                            <span class="ce-kpi-text">问题发现率</span>
                                        </div>
                                        <div class="ce-kpi">
                                            <span class="ce-kpi-num">92%</span>
                                            <span class="ce-kpi-text">整改率</span>
                                        </div>
                                    </div>
                                    <div class="ce-bar-row">
                                        <div class="ce-bar" style="flex:45;background:#34c759;"></div>
                                        <div class="ce-bar" style="flex:38;background:#00d4ff;"></div>
                                        <div class="ce-bar" style="flex:12;background:#ff9500;"></div>
                                        <div class="ce-bar" style="flex:5;background:#ff3b30;"></div>
                                    </div>
                                    <div class="ce-labels">
                                        <span class="ce-label">A级 45%</span>
                                        <span class="ce-label">B级 38%</span>
                                        <span class="ce-label">C级 12%</span>
                                        <span class="ce-label">D级 5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-right">
                        <div class="card-section evaluation-section">
                            <div class="card-title">信用评价</div>
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
                            <div class="card-title">信用承诺</div>
                            <div class="promise-content">
                                <div class="promise-item" data-promise-apply="true">
                                    <span class="promise-label">信用承诺申请</span>
                                    <span class="promise-value">1,890</span>
                                </div>
                                <div class="promise-item" data-promise-handle="true">
                                    <span class="promise-label">信用承诺办理</span>
                                    <span class="promise-value">1,856</span>
                                </div>
                                <div class="promise-item" data-promise-natural="true">
                                    <span class="promise-label">自然人违诺</span>
                                    <span class="promise-value">890</span>
                                </div>
                                <div class="promise-item" data-promise-legal="true">
                                    <span class="promise-label">法人违诺</span>
                                    <span class="promise-value">966</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-section reward-section">
                            <div class="card-title">联合奖惩</div>
                            <div class="reward-content">
                                <div class="reward-item" data-reward-red="true">
                                    <span class="reward-label">红名单</span>
                                    <span class="reward-value">123</span>
                                </div>
                                <div class="reward-item" data-reward-black="true">
                                    <span class="reward-label">黑名单</span>
                                    <span class="reward-value">45</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-section repair-section">
                            <div class="card-title">信用修复</div>
                            <div id="repairPie" class="chart-container pie-container"></div>
                        </div>

                        <div class="card-section category-section">
                            <div class="card-title">信用类别情况</div>
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

    // ============================================
    // 弹窗一：行政许可 - 数据合规率(98%)
    // ============================================
    genXkComplianceData() {
        const d = []; const types = ['工商登记','建筑许可','食品经营','药品经营','危险化学品','交通运输','卫生许可','环境评估'];
        const errTypes = ['数据缺失','格式错误','逻辑矛盾','超时录入'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random() * 6) + 1; const day = Math.floor(Math.random() * 28) + 1;
            const statuses = ['已修复','已修复','已修复','待修复'];
            d.push({ seq: i, code: 'XKHG'+String(i).padStart(5,'0'), bizType: types[i%8],
                errType: errTypes[i%4], time: `2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
                status: statuses[i%4] });
        }
        return d;
    }
    openXkComplianceModal() {
        this.xkCompPage = 1; this.xkComplianceData = this.genXkComplianceData();
        const ovl = document.createElement('div'); ovl.className = 'rv-modal-overlay xkc-theme';
        ovl.innerHTML = this.renderXkComplianceModal(); document.body.appendChild(ovl); this._xkCompOvl = ovl;
        ovl.querySelector('.rv-modal-close').addEventListener('click', () => this.closeXkComplianceModal());
        ovl.addEventListener('click', (e) => { if (e.target === ovl) this.closeXkComplianceModal(); });
        this.bindXkComplianceEvents(); this.initXkComplianceCharts();
    }
    closeXkComplianceModal() {
        Object.values(this._xkCompCharts).forEach(c => { try { c.dispose(); } catch(e) {} }); this._xkCompCharts = {};
        const ovl = document.querySelector('.rv-modal-overlay.xkc-theme'); if (ovl) ovl.remove(); this._xkCompOvl = null;
    }
    renderXkComplianceModal() {
        const data = this.xkComplianceData; const tp = Math.ceil(data.length / this.xkCompPageSize);
        const pd = data.slice((this.xkCompPage - 1) * this.xkCompPageSize, this.xkCompPage * this.xkCompPageSize);
        return `<div class="rv-modal"><div class="rv-modal-header xkc-header"><span class="rv-modal-title">行政许可数据合规率分析</span><button class="rv-modal-close">×</button></div>
        <div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">数据合规率</span><span class="rv-stat-value" style="color:#34c759">98%</span></div><div class="rv-stat-card"><span class="rv-stat-label">合规数据量</span><span class="rv-stat-value">4,802条</span></div><div class="rv-stat-card"><span class="rv-stat-label">不合规数据量</span><span class="rv-stat-value" style="color:#ff3b30">98条</span></div></div>
        <div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">合规 vs 不合规占比</span><div id="xkc-donut" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各业务类型合规率对比</span><div id="xkc-bar" class="rv-chart-container"></div></div></div></div>
        <div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>数据编号</th><th>业务类型</th><th>违规类型</th><th>发现时间</th><th>数据状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.bizType}</td><td>${r.errType}</td><td>${r.time}</td><td>${this.renderRvTag(r.status,{'已修复':'green','待修复':'orange'})}</td></tr>`).join('')}</tbody></table></div>
        <div class="rv-footer"><button class="rv-page-btn" id="xkc-prev" ${this.xkCompPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.xkCompPage} / ${tp} 页</span><button class="rv-page-btn" id="xkc-next" ${this.xkCompPage>=tp?'disabled':''}>下一页</button></div></div>`;
    }
    bindXkComplianceEvents() {
        const ovl = this._xkCompOvl; if (!ovl) return;
        ovl.querySelector('#xkc-prev')?.addEventListener('click', () => { if (this.xkCompPage > 1) { this.xkCompPage--; this.updateXkComplianceModal(); } });
        ovl.querySelector('#xkc-next')?.addEventListener('click', () => { if (this.xkCompPage < Math.ceil(this.xkComplianceData.length / this.xkCompPageSize)) { this.xkCompPage++; this.updateXkComplianceModal(); } });
    }
    updateXkComplianceModal() { this._reRenderOvl('xkComp'); this.initXkComplianceCharts(); }
    _reRenderOvl(key) {
        const ovl = this[`_${key}Ovl`]; if (!ovl) return;
        Object.values(this[`_${key}Charts`]).forEach(c => { try { c.dispose(); } catch(e) {} }); this[`_${key}Charts`] = {};
        ovl.innerHTML = this[`render${key.charAt(0).toUpperCase()+key.slice(1)}Modal`] ? this[`render${key.charAt(0).toUpperCase()+key.slice(1)}Modal`]() : '';
    }
    initXkComplianceCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => { this.initXkcDonut(); this.initXkcBar(); }, 150)));
    }
    initXkcDonut() {
        const dom = this._xkCompOvl?.querySelector('#xkc-donut'); if (!dom) return;
        dom.style.cssText = 'width:100%;height:230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initXkcDonut(), 200); return; }
        const ex = echarts.getInstanceByDom(dom); if (ex) ex.dispose();
        const c = echarts.init(dom); this._xkCompCharts.donut = c;
        c.setOption({ tooltip: { trigger: 'item' }, legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 } },
            series: [{ type: 'pie', radius: ['60%','78%'], center: ['50%','45%'], avoidLabelOverlap: false, itemStyle: { borderRadius: 6, borderColor: 'rgba(5,13,24,0.98)', borderWidth: 3 },
                label: { show: false }, emphasis: { label: { show: true, fontSize: 14 } },
                data: [{ value: 4802, name: '合规', itemStyle: { color: '#34c759' } }, { value: 98, name: '不合规', itemStyle: { color: '#ff3b30' } }] }],
            graphic: [{ type: 'text', left: 'center', top: '38%', style: { text: '98%', textAlign: 'center', fill: '#34c759', fontSize: 22, fontWeight: 'bold' } }] });
        new ResizeObserver(() => c.resize()).observe(dom);
    }
    initXkcBar() {
        const dom = this._xkCompOvl?.querySelector('#xkc-bar'); if (!dom) return;
        dom.style.cssText = 'width:100%;height:230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initXkcBar(), 200); return; }
        const ex = echarts.getInstanceByDom(dom); if (ex) ex.dispose();
        const c = echarts.init(dom); this._xkCompCharts.bar = c;
        const cats = ['工商登记','建筑许可','食品经营','药品经营','危险化学品','交通运输','卫生许可','环境评估'];
        const vals = [99, 98.5, 98, 97.5, 97, 96.5, 96, 95.8];
        c.setOption({ tooltip: { trigger: 'axis', formatter: '{b}: {c}%' }, grid: { left: '5%', right: '8%', bottom: '5%', top: '8%', containLabel: true },
            xAxis: { type: 'category', data: cats, axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, rotate: 20 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }, axisTick: { show: false } },
            yAxis: { type: 'value', name: '%', min: 90, max: 100, nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [{ type: 'bar', data: vals, barWidth: '55%', itemStyle: { borderRadius: [6,6,0,0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#34c759' }, { offset: 1, color: 'rgba(52,199,89,0.2)' }]) }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{c}%' } }] });
        new ResizeObserver(() => c.resize()).observe(dom);
    }

    // ============================================
    // 弹窗二：行政许可 - 数据迟报率(2%)
    // ============================================
    genXkLateData() {
        const d=[]; const types=['工商登记','建筑许可','食品经营','药品经营','危险化学品','交通运输','卫生许可','环境评估'];
        const depts=['综合行政执法局','市场监督管理局','生态环境局','交通运输局','住建局','卫健委','文旅局','农业农村局'];
        for(let i=1;i<=40;i++){
            const sm=Math.floor(Math.random()*6)+1;const dday=Math.floor(Math.random()*28)+1;
            const addDay=Math.floor(Math.random()*15)+1;
            const dueMonth=sm;const dueDay=Math.min(dday+addDay,28);
            d.push({seq:i,code:'XKCB'+String(i).padStart(5,'0'),bizType:types[i%8],dept:depts[i%8],
                dueTime:`2025-${String(sm).padStart(2,'0')}-${String(dday).padStart(2,'0')}`,
                realTime:`2025-${String(dueMonth).padStart(2,'0')}-${String(dueDay).padStart(2,'0')}`,
                delayDays:addDay});
        }
        return d;
    }
    openXkLateModal(){this.xkLatePage=1;this.xkLateData=this.genXkLateData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay xkl-theme';ovl.innerHTML=this.renderXkLateModal();document.body.appendChild(ovl);this._xkLateOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeXkLateModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeXkLateModal();});this.bindXkLateEvents();this.initXkLateCharts();}
    closeXkLateModal(){Object.values(this._xkLateCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xkLateCharts={};const ovl=document.querySelector('.rv-modal-overlay.xkl-theme');if(ovl)ovl.remove();this._xkLateOvl=null;}
    renderXkLateModal(){const data=this.xkLateData;const tp=Math.ceil(data.length/this.xkLatePageSize);const pd=data.slice((this.xkLatePage-1)*this.xkLatePageSize,this.xkLatePage*this.xkLatePageSize);return`<div class="rv-modal"><div class="rv-modal-header xkl-header"><span class="rv-modal-title">行政许可数据迟报分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">数据迟报率</span><span class="rv-stat-value" style="color:#ff9500">2%</span></div><div class="rv-stat-card"><span class="rv-stat-label">迟报数据量</span><span class="rv-stat-value" style="color:#ff3b30">98条</span></div><div class="rv-stat-card"><span class="rv-stat-label">按时报送数据量</span><span class="rv-stat-value" style="color:#34c759">4,802条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">近6个月迟报率趋势</span><div id="xkl-line" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">迟报部门分布</span><div id="xkl-bar" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>数据编号</th><th>业务类型</th><th>报送部门</th><th>应报时间</th><th>实报时间</th><th>延迟天数</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.bizType}</td><td>${r.dept}</td><td>${r.dueTime}</td><td>${r.realTime}</td><td style="color:#ff9500">${r.delayDays}天</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="xkl-prev" ${this.xkLatePage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.xkLatePage} / ${tp} 页</span><button class="rv-page-btn" id="xkl-next" ${this.xkLatePage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindXkLateEvents(){const ovl=this._xkLateOvl;if(!ovl)return;ovl.querySelector('#xkl-prev')?.addEventListener('click',()=>{if(this.xkLatePage>1){this.xkLatePage--;this.updateXkLateModal();}});ovl.querySelector('#xkl-next')?.addEventListener('click',()=>{if(this.xkLatePage<Math.ceil(this.xkLateData.length/this.xkLatePageSize)){this.xkLatePage++;this.updateXkLateModal();}});}
    updateXkLateModal(){const ovl=this._xkLateOvl;if(!ovl)return;Object.values(this._xkLateCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xkLateCharts={};ovl.innerHTML=this.renderXkLateModal();this.bindXkLateEvents();this.initXkLateCharts();}
    initXkLateCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initXklLine();this.initXklBar();},150)));}
    initXklLine(){const dom=this._xkLateOvl?.querySelector('#xkl-line');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXklLine(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xkLateCharts.line=c;c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}%'},grid:{left:'8%',right:'5%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:['1月','2月','3月','4月','5月','6月'],axisLabel:{color:'rgba(255,255,255,0.6)'},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}}},yAxis:{type:'value',name:'%',max:5,nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'line',data:[3.5,2.8,2.2,1.8,2.0,1.5],smooth:true,symbol:'circle',symbolSize:8,lineStyle:{color:'#ff9500',width:2.5},itemStyle:{color:'#ff9500',borderColor:'#ff9500',borderWidth:3},areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(255,149,0,0.3)'},{offset:1,color:'rgba(255,149,0,0.02)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.8)',fontSize:11,formatter:'{c}%'}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initXklBar(){const dom=this._xkLateOvl?.querySelector('#xkl-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXklBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xkLateCharts.bar=c;const depts=['市场监管局','综合执法局','生态环境局','交通运输局','其他'];const vals=[28,22,18,15,15];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}次'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:depts,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10,rotate:15},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'次',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff9500'},{offset:1,color:'rgba(255,149,0,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗三：行政许可 - 数据瞒报率(0%)
    // ============================================
    genXkConcealData(){const d=[];const scopes=['工商登记数据','建筑许可数据','食品经营数据','药品经营数据','危险化学品数据','交通运输数据','卫生许可数据','环境评估数据'];const methods=['系统比对','人工核查','举报核查','系统比对','人工核查'];const results=['正常','正常','正常','正常','正常','正常','正常','正常','正常','疑似'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;d.push({seq:i,batch:`2025年第${i%4+1}批次排查`,scope:scopes[i%8],method:methods[i%5],result:results[i%10],date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`});}return d;}
    openXkConcealModal(){this.xkConcPage=1;this.xkConcealData=this.genXkConcealData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay xkc2-theme';ovl.innerHTML=this.renderXkConcealModal();document.body.appendChild(ovl);this._xkConcOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeXkConcealModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeXkConcealModal();});this.bindXkConcealEvents();this.initXkConcealCharts();}
    closeXkConcealModal(){Object.values(this._xkConcCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xkConcCharts={};const ovl=document.querySelector('.rv-modal-overlay.xkc2-theme');if(ovl)ovl.remove();this._xkConcOvl=null;}
    renderXkConcealModal(){const data=this.xkConcealData;const tp=Math.ceil(data.length/this.xkConcPageSize);const pd=data.slice((this.xkConcPage-1)*this.xkConcPageSize,this.xkConcPage*this.xkConcPageSize);return`<div class="rv-modal"><div class="rv-modal-header xkc2-header"><span class="rv-modal-title">行政许可数据瞒报监控</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">数据瞒报率</span><span class="rv-stat-value" style="color:#34c759">0%</span></div><div class="rv-stat-card"><span class="rv-stat-label">瞒报疑似线索</span><span class="rv-stat-value" style="color:#00d4ff">0条</span></div><div class="rv-stat-card"><span class="rv-stat-label">已查实瞒报</span><span class="rv-stat-value" style="color:#00d4ff">0条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:1"><div class="rv-chart-item"><span class="rv-chart-title">各业务瞒报风险指数排名</span><div id="xkc2-bar" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>排查批次</th><th>排查范围</th><th>排查方式</th><th>排查结果</th><th>排查日期</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.batch}</td><td>${r.scope}</td><td>${r.method}</td><td>${this.renderRvTag(r.result,{'正常':'green','疑似':'orange','已查实':'red'})}</td><td>${r.date}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="xkc2-prev" ${this.xkConcPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.xkConcPage} / ${tp} 页</span><button class="rv-page-btn" id="xkc2-next" ${this.xkConcPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindXkConcealEvents(){const ovl=this._xkConcOvl;if(!ovl)return;ovl.querySelector('#xkc2-prev')?.addEventListener('click',()=>{if(this.xkConcPage>1){this.xkConcPage--;this.updateXkConcealModal();}});ovl.querySelector('#xkc2-next')?.addEventListener('click',()=>{if(this.xkConcPage<Math.ceil(this.xkConcealData.length/this.xkConcPageSize)){this.xkConcPage++;this.updateXkConcealModal();}});}
    updateXkConcealModal(){const ovl=this._xkConcOvl;if(!ovl)return;Object.values(this._xkConcCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xkConcCharts={};ovl.innerHTML=this.renderXkConcealModal();this.bindXkConcealEvents();this.initXkConcealCharts();}
    initXkConcealCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initXkc2Bar();},150)));}
    initXkc2Bar(){const dom=this._xkConcOvl?.querySelector('#xkc2-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXkc2Bar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xkConcCharts.bar=c;const cats=['工商登记','建筑许可','食品经营','药品经营','危险化学品','交通运输','卫生许可','环境评估'];const vals=[0.2,0.1,0,0.1,0,0,0,0];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: 风险指数 {c}'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:cats,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10,rotate:20},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'风险指数',max:1,nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'55%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34c759'},{offset:1,color:'rgba(52,199,89,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:11,formatter:'{c}'}}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗四：行政处罚 - 数据合规率(96%)
    // ============================================
    genXzComplianceData(){const d=[];const types=['警告','罚款','没收违法所得','暂扣许可证','行政拘留','吊销许可证','责令停产停业','限制从业'];const errTypes=['数据缺失','格式错误','逻辑矛盾','超时录入'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const statuses=['已修复','已修复','已修复','待修复'];d.push({seq:i,code:'XZHG'+String(i).padStart(5,'0'),penaltyType:types[i%8],errType:errTypes[i%4],time:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,status:statuses[i%4]});}return d;}
    openXzComplianceModal(){this.xzCompPage=1;this.xzComplianceData=this.genXzComplianceData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay xzc-theme';ovl.innerHTML=this.renderXzComplianceModal();document.body.appendChild(ovl);this._xzCompOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeXzComplianceModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeXzComplianceModal();});this.bindXzComplianceEvents();this.initXzComplianceCharts();}
    closeXzComplianceModal(){Object.values(this._xzCompCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xzCompCharts={};const ovl=document.querySelector('.rv-modal-overlay.xzc-theme');if(ovl)ovl.remove();this._xzCompOvl=null;}
    renderXzComplianceModal(){const data=this.xzComplianceData;const tp=Math.ceil(data.length/this.xzCompPageSize);const pd=data.slice((this.xzCompPage-1)*this.xzCompPageSize,this.xzCompPage*this.xzCompPageSize);return`<div class="rv-modal"><div class="rv-modal-header xzc-header"><span class="rv-modal-title">行政处罚数据合规率分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">数据合规率</span><span class="rv-stat-value" style="color:#34c759">96%</span></div><div class="rv-stat-card"><span class="rv-stat-label">合规数据量</span><span class="rv-stat-value">2,112条</span></div><div class="rv-stat-card"><span class="rv-stat-label">不合规数据量</span><span class="rv-stat-value" style="color:#ff3b30">88条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">合规 vs 不合规占比</span><div id="xzc-donut" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各处罚类型合规率对比</span><div id="xzc-bar" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>数据编号</th><th>处罚类型</th><th>违规类型</th><th>发现时间</th><th>数据状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.penaltyType}</td><td>${r.errType}</td><td>${r.time}</td><td>${this.renderRvTag(r.status,{'已修复':'green','待修复':'orange'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="xzc-prev" ${this.xzCompPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.xzCompPage} / ${tp} 页</span><button class="rv-page-btn" id="xzc-next" ${this.xzCompPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindXzComplianceEvents(){const ovl=this._xzCompOvl;if(!ovl)return;ovl.querySelector('#xzc-prev')?.addEventListener('click',()=>{if(this.xzCompPage>1){this.xzCompPage--;this.updateXzComplianceModal();}});ovl.querySelector('#xzc-next')?.addEventListener('click',()=>{if(this.xzCompPage<Math.ceil(this.xzComplianceData.length/this.xzCompPageSize)){this.xzCompPage++;this.updateXzComplianceModal();}});}
    updateXzComplianceModal(){const ovl=this._xzCompOvl;if(!ovl)return;Object.values(this._xzCompCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xzCompCharts={};ovl.innerHTML=this.renderXzComplianceModal();this.bindXzComplianceEvents();this.initXzComplianceCharts();}
    initXzComplianceCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initXzcDonut();this.initXzcBar();},150)));}
    initXzcDonut(){const dom=this._xzCompOvl?.querySelector('#xzc-donut');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXzcDonut(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xzCompCharts.donut=c;c.setOption({tooltip:{trigger:'item'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:12}},series:[{type:'pie',radius:['60%','78%'],center:['50%','45%'],avoidLabelOverlap:false,itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{show:false},emphasis:{label:{show:true,fontSize:14}},data:[{value:2112,name:'合规',itemStyle:{color:'#34c759'}},{value:88,name:'不合规',itemStyle:{color:'#ff3b30'}}]}],graphic:[{type:'text',left:'center',top:'38%',style:{text:'96%',textAlign:'center',fill:'#34c759',fontSize:22,fontWeight:'bold'}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initXzcBar(){const dom=this._xzCompOvl?.querySelector('#xzc-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXzcBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xzCompCharts.bar=c;const cats=['警告','罚款','没收违法所得','暂扣许可证','行政拘留','吊销许可证','责令停产停业','限制从业'];const vals=[97,96.5,96,95.8,95.5,95,94.8,94.5];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}%'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:cats,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10,rotate:20},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'%',min:90,max:100,nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'55%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34c759'},{offset:1,color:'rgba(52,199,89,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:10,formatter:'{c}%'}}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗五：行政处罚 - 数据迟报率(3%)
    // ============================================
    genXzLateData(){const d=[];const types=['警告','罚款','没收违法所得','暂扣许可证','行政拘留','吊销许可证','责令停产停业','限制从业'];const depts=['综合行政执法局','市场监督管理局','生态环境局','交通运输局','住建局','卫健委','文旅局','农业农村局'];for(let i=1;i<=40;i++){const sm=Math.floor(Math.random()*6)+1;const dday=Math.floor(Math.random()*28)+1;const addDay=Math.floor(Math.random()*15)+1;const dueMonth=sm;const dueDay=Math.min(dday+addDay,28);d.push({seq:i,code:'XZCB'+String(i).padStart(5,'0'),penaltyType:types[i%8],dept:depts[i%8],dueTime:`2025-${String(sm).padStart(2,'0')}-${String(dday).padStart(2,'0')}`,realTime:`2025-${String(dueMonth).padStart(2,'0')}-${String(dueDay).padStart(2,'0')}`,delayDays:addDay});}return d;}
    openXzLateModal(){this.xzLatePage=1;this.xzLateData=this.genXzLateData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay xzl-theme';ovl.innerHTML=this.renderXzLateModal();document.body.appendChild(ovl);this._xzLateOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeXzLateModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeXzLateModal();});this.bindXzLateEvents();this.initXzLateCharts();}
    closeXzLateModal(){Object.values(this._xzLateCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xzLateCharts={};const ovl=document.querySelector('.rv-modal-overlay.xzl-theme');if(ovl)ovl.remove();this._xzLateOvl=null;}
    renderXzLateModal(){const data=this.xzLateData;const tp=Math.ceil(data.length/this.xzLatePageSize);const pd=data.slice((this.xzLatePage-1)*this.xzLatePageSize,this.xzLatePage*this.xzLatePageSize);return`<div class="rv-modal"><div class="rv-modal-header xzl-header"><span class="rv-modal-title">行政处罚数据迟报分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">数据迟报率</span><span class="rv-stat-value" style="color:#ff9500">3%</span></div><div class="rv-stat-card"><span class="rv-stat-label">迟报数据量</span><span class="rv-stat-value" style="color:#ff3b30">66条</span></div><div class="rv-stat-card"><span class="rv-stat-label">按时报送数据量</span><span class="rv-stat-value" style="color:#34c759">2,134条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">近6个月迟报率趋势</span><div id="xzl-line" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">迟报部门分布</span><div id="xzl-bar" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>数据编号</th><th>处罚类型</th><th>报送部门</th><th>应报时间</th><th>实报时间</th><th>延迟天数</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.penaltyType}</td><td>${r.dept}</td><td>${r.dueTime}</td><td>${r.realTime}</td><td style="color:#ff9500">${r.delayDays}天</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="xzl-prev" ${this.xzLatePage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.xzLatePage} / ${tp} 页</span><button class="rv-page-btn" id="xzl-next" ${this.xzLatePage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindXzLateEvents(){const ovl=this._xzLateOvl;if(!ovl)return;ovl.querySelector('#xzl-prev')?.addEventListener('click',()=>{if(this.xzLatePage>1){this.xzLatePage--;this.updateXzLateModal();}});ovl.querySelector('#xzl-next')?.addEventListener('click',()=>{if(this.xzLatePage<Math.ceil(this.xzLateData.length/this.xzLatePageSize)){this.xzLatePage++;this.updateXzLateModal();}});}
    updateXzLateModal(){const ovl=this._xzLateOvl;if(!ovl)return;Object.values(this._xzLateCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xzLateCharts={};ovl.innerHTML=this.renderXzLateModal();this.bindXzLateEvents();this.initXzLateCharts();}
    initXzLateCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initXzlLine();this.initXzlBar();},150)));}
    initXzlLine(){const dom=this._xzLateOvl?.querySelector('#xzl-line');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXzlLine(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xzLateCharts.line=c;c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}%'},grid:{left:'8%',right:'5%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:['1月','2月','3月','4月','5月','6月'],axisLabel:{color:'rgba(255,255,255,0.6)'},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}}},yAxis:{type:'value',name:'%',max:5,nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'line',data:[4.2,3.8,3.5,3.0,3.2,2.8],smooth:true,symbol:'circle',symbolSize:8,lineStyle:{color:'#ff9500',width:2.5},itemStyle:{color:'#ff9500',borderColor:'#ff9500',borderWidth:3},areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(255,149,0,0.3)'},{offset:1,color:'rgba(255,149,0,0.02)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.8)',fontSize:11,formatter:'{c}%'}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initXzlBar(){const dom=this._xzLateOvl?.querySelector('#xzl-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXzlBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xzLateCharts.bar=c;const depts=['综合执法局','市场监管局','交通运输局','生态环境局','其他'];const vals=[24,18,12,8,14];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}次'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:depts,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10,rotate:15},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'次',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff9500'},{offset:1,color:'rgba(255,149,0,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗六：行政处罚 - 数据瞒报率(1%)
    // ============================================
    genXzConcealData(){const d=[];const scopes=['行政处罚决定','处罚金额数据','当事人信息','违法事实记录','听证程序记录'];const methods=['系统比对','人工核查','举报核查','系统比对','人工核查'];const results=['正常','疑似','正常','已查实','正常','正常','疑似','正常','已查实','正常'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;d.push({seq:i,batch:`2025年第${i%4+1}批次排查`,scope:scopes[i%5],method:methods[i%5],result:results[i%10],date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`});}return d;}
    openXzConcealModal(){this.xzConcPage=1;this.xzConcealData=this.genXzConcealData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay xzc2-theme';ovl.innerHTML=this.renderXzConcealModal();document.body.appendChild(ovl);this._xzConcOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeXzConcealModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeXzConcealModal();});this.bindXzConcealEvents();this.initXzConcealCharts();}
    closeXzConcealModal(){Object.values(this._xzConcCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xzConcCharts={};const ovl=document.querySelector('.rv-modal-overlay.xzc2-theme');if(ovl)ovl.remove();this._xzConcOvl=null;}
    renderXzConcealModal(){const data=this.xzConcealData;const tp=Math.ceil(data.length/this.xzConcPageSize);const pd=data.slice((this.xzConcPage-1)*this.xzConcPageSize,this.xzConcPage*this.xzConcPageSize);return`<div class="rv-modal"><div class="rv-modal-header xzc2-header"><span class="rv-modal-title">行政处罚数据瞒报监控</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">数据瞒报率</span><span class="rv-stat-value" style="color:#ff9500">1%</span></div><div class="rv-stat-card"><span class="rv-stat-label">瞒报疑似线索</span><span class="rv-stat-value" style="color:#ff9500">5条</span></div><div class="rv-stat-card"><span class="rv-stat-label">已查实瞒报</span><span class="rv-stat-value" style="color:#ff3b30">2条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">疑似瞒报类型分布</span><div id="xzc2-pie" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各部门瞒报风险指数TOP5</span><div id="xzc2-bar" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>排查批次</th><th>排查范围</th><th>排查方式</th><th>排查结果</th><th>排查日期</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.batch}</td><td>${r.scope}</td><td>${r.method}</td><td>${this.renderRvTag(r.result,{'正常':'green','疑似':'orange','已查实':'red'})}</td><td>${r.date}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="xzc2-prev" ${this.xzConcPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.xzConcPage} / ${tp} 页</span><button class="rv-page-btn" id="xzc2-next" ${this.xzConcPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindXzConcealEvents(){const ovl=this._xzConcOvl;if(!ovl)return;ovl.querySelector('#xzc2-prev')?.addEventListener('click',()=>{if(this.xzConcPage>1){this.xzConcPage--;this.updateXzConcealModal();}});ovl.querySelector('#xzc2-next')?.addEventListener('click',()=>{if(this.xzConcPage<Math.ceil(this.xzConcealData.length/this.xzConcPageSize)){this.xzConcPage++;this.updateXzConcealModal();}});}
    updateXzConcealModal(){const ovl=this._xzConcOvl;if(!ovl)return;Object.values(this._xzConcCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._xzConcCharts={};ovl.innerHTML=this.renderXzConcealModal();this.bindXzConcealEvents();this.initXzConcealCharts();}
    initXzConcealCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initXzc2Pie();this.initXzc2Bar();},150)));}
    initXzc2Pie(){const dom=this._xzConcOvl?.querySelector('#xzc2-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXzc2Pie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xzConcCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {c}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['50%','72%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:10},data:[{value:40,name:'隐瞒处罚决定',itemStyle:{color:'#ff3b30'}},{value:30,name:'隐瞒处罚金额',itemStyle:{color:'#ff9500'}},{value:20,name:'隐瞒当事人信息',itemStyle:{color:'#af52de'}},{value:10,name:'其他',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initXzc2Bar(){const dom=this._xzConcOvl?.querySelector('#xzc2-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initXzc2Bar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._xzConcCharts.bar=c;const depts=['综合执法局','市场监管局','交通运输局','生态环境局','住建局'];const vals=[3.5,2.8,2.0,1.5,1.0];c.setOption({tooltip:{trigger:'axis',axisPointer:{type:'shadow'},formatter:'{b}: 风险指数 {c}'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:depts,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:11,rotate:15},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'风险指数',max:5,nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'55%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff9500'},{offset:1,color:'rgba(255,149,0,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:11,formatter:'{c}'}}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗七：信用承诺 - 信用承诺申请(1,890)
    // ============================================
    genPromiseApplyData(){const d=[];const types=['主动承诺','告知承诺','修复承诺','其他'];const units=['XX科技有限公司','YY建设工程有限公司','ZZ餐饮管理有限公司','AA物流有限公司','BB医药有限公司','CC房地产开发公司','DD文化旅游公司','EE环保科技有限公司'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const statuses=['已办理','已办理','已办理','待办理','已退回'];d.push({seq:i,code:'SQ'+String(i).padStart(5,'0'),unit:units[i%8],type:types[i%4],date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,status:statuses[i%5]});}return d;}
    openPromiseApplyModal(){this.paPage=1;this.promiseApplyData=this.genPromiseApplyData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay pa-theme';ovl.innerHTML=this.renderPromiseApplyModal();document.body.appendChild(ovl);this._paOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closePromiseApplyModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closePromiseApplyModal();});this.bindPromiseApplyEvents();this.initPromiseApplyCharts();}
    closePromiseApplyModal(){Object.values(this._paCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._paCharts={};const ovl=document.querySelector('.rv-modal-overlay.pa-theme');if(ovl)ovl.remove();this._paOvl=null;}
    renderPromiseApplyModal(){const data=this.promiseApplyData;const tp=Math.ceil(data.length/this.paPageSize);const pd=data.slice((this.paPage-1)*this.paPageSize,this.paPage*this.paPageSize);return`<div class="rv-modal"><div class="rv-modal-header pa-header"><span class="rv-modal-title">信用承诺申请全景</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">申请总数</span><span class="rv-stat-value">1,890件</span></div><div class="rv-stat-card"><span class="rv-stat-label">已办理</span><span class="rv-stat-value" style="color:#34c759">1,856件</span></div><div class="rv-stat-card"><span class="rv-stat-label">办理率</span><span class="rv-stat-value" style="color:#00d4ff">98.2%</span></div><div class="rv-stat-card"><span class="rv-stat-label">待办理</span><span class="rv-stat-value" style="color:#ff9500">34件</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">近6个月信用承诺申请趋势</span><div id="pa-line" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">申请类型分布</span><div id="pa-pie" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>申请编号</th><th>申请人/单位</th><th>申请类型</th><th>申请日期</th><th>办理状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.unit}</td><td>${r.type}</td><td>${r.date}</td><td>${this.renderRvTag(r.status,{'已办理':'green','待办理':'orange','已退回':'red'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="pa-prev" ${this.paPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.paPage} / ${tp} 页</span><button class="rv-page-btn" id="pa-next" ${this.paPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindPromiseApplyEvents(){const ovl=this._paOvl;if(!ovl)return;ovl.querySelector('#pa-prev')?.addEventListener('click',()=>{if(this.paPage>1){this.paPage--;this.updatePromiseApplyModal();}});ovl.querySelector('#pa-next')?.addEventListener('click',()=>{if(this.paPage<Math.ceil(this.promiseApplyData.length/this.paPageSize)){this.paPage++;this.updatePromiseApplyModal();}});}
    updatePromiseApplyModal(){const ovl=this._paOvl;if(!ovl)return;Object.values(this._paCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._paCharts={};ovl.innerHTML=this.renderPromiseApplyModal();this.bindPromiseApplyEvents();this.initPromiseApplyCharts();}
    initPromiseApplyCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initPaLine();this.initPaPie();},150)));}
    initPaLine(){const dom=this._paOvl?.querySelector('#pa-line');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initPaLine(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._paCharts.line=c;c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}件'},grid:{left:'8%',right:'5%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:['1月','2月','3月','4月','5月','6月'],axisLabel:{color:'rgba(255,255,255,0.6)'},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}}},yAxis:{type:'value',name:'件',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'line',data:[280,310,295,330,320,355],smooth:true,symbol:'circle',symbolSize:8,lineStyle:{color:'#00d4ff',width:2.5},itemStyle:{color:'#00d4ff',borderColor:'#00d4ff',borderWidth:3},areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,212,255,0.3)'},{offset:1,color:'rgba(0,212,255,0.02)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.8)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initPaPie(){const dom=this._paOvl?.querySelector('#pa-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initPaPie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._paCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['50%','72%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:10},data:[{value:50,name:'主动承诺',itemStyle:{color:'#00d4ff'}},{value:30,name:'告知承诺',itemStyle:{color:'#34c759'}},{value:15,name:'修复承诺',itemStyle:{color:'#ff9500'}},{value:5,name:'其他',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗八：信用承诺 - 信用承诺办理(1,856)
    // ============================================
    genPromiseHandleData(){const d=[];const types=['主动承诺','告知承诺','修复承诺','其他'];const units=['XX科技有限公司','YY建设工程有限公司','ZZ餐饮管理有限公司','AA物流有限公司','BB医药有限公司','CC房地产开发公司','DD文化旅游公司','EE环保科技有限公司'];for(let i=1;i<=40;i++){const sm=Math.floor(Math.random()*6)+1;const sday=Math.floor(Math.random()*28)+1;const em=sm+Math.floor(Math.random()*1);const eday=Math.floor(Math.random()*28)+1;const statuses=['已办结','已办结','已办结','办理中','已退回'];d.push({seq:i,code:'BL'+String(i).padStart(5,'0'),unit:units[i%8],type:types[i%4],startDate:`2025-${String(sm).padStart(2,'0')}-${String(sday).padStart(2,'0')}`,endDate:`2025-${String(Math.min(em,6)).padStart(2,'0')}-${String(eday).padStart(2,'0')}`,status:statuses[i%5]});}return d;}
    openPromiseHandleModal(){this.phPage=1;this.promiseHandleData=this.genPromiseHandleData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay ph-theme';ovl.innerHTML=this.renderPromiseHandleModal();document.body.appendChild(ovl);this._phOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closePromiseHandleModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closePromiseHandleModal();});this.bindPromiseHandleEvents();this.initPromiseHandleCharts();}
    closePromiseHandleModal(){Object.values(this._phCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._phCharts={};const ovl=document.querySelector('.rv-modal-overlay.ph-theme');if(ovl)ovl.remove();this._phOvl=null;}
    renderPromiseHandleModal(){const data=this.promiseHandleData;const tp=Math.ceil(data.length/this.phPageSize);const pd=data.slice((this.phPage-1)*this.phPageSize,this.phPage*this.phPageSize);return`<div class="rv-modal"><div class="rv-modal-header ph-header"><span class="rv-modal-title">信用承诺办理监控</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">办理总数</span><span class="rv-stat-value">1,856件</span></div><div class="rv-stat-card"><span class="rv-stat-label">今日办理</span><span class="rv-stat-value" style="color:#34c759">23件</span></div><div class="rv-stat-card"><span class="rv-stat-label">平均办理时长</span><span class="rv-stat-value" style="color:#00d4ff">2.5天</span></div><div class="rv-stat-card"><span class="rv-stat-label">超期办理</span><span class="rv-stat-value" style="color:#ff3b30">12件</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">办理时效分布</span><div id="ph-ring" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各部门办理量排行TOP8</span><div id="ph-bar" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>办理编号</th><th>申请人/单位</th><th>承诺类型</th><th>受理日期</th><th>办结日期</th><th>办理状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.unit}</td><td>${r.type}</td><td>${r.startDate}</td><td>${r.endDate}</td><td>${this.renderRvTag(r.status,{'已办结':'green','办理中':'blue','已退回':'red'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="ph-prev" ${this.phPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.phPage} / ${tp} 页</span><button class="rv-page-btn" id="ph-next" ${this.phPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindPromiseHandleEvents(){const ovl=this._phOvl;if(!ovl)return;ovl.querySelector('#ph-prev')?.addEventListener('click',()=>{if(this.phPage>1){this.phPage--;this.updatePromiseHandleModal();}});ovl.querySelector('#ph-next')?.addEventListener('click',()=>{if(this.phPage<Math.ceil(this.promiseHandleData.length/this.phPageSize)){this.phPage++;this.updatePromiseHandleModal();}});}
    updatePromiseHandleModal(){const ovl=this._phOvl;if(!ovl)return;Object.values(this._phCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._phCharts={};ovl.innerHTML=this.renderPromiseHandleModal();this.bindPromiseHandleEvents();this.initPromiseHandleCharts();}
    initPromiseHandleCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initPhRing();this.initPhBar();},150)));}
    initPhRing(){const dom=this._phOvl?.querySelector('#ph-ring');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initPhRing(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._phCharts.ring=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['58%','78%'],center:['50%','45%'],avoidLabelOverlap:false,itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{show:false},emphasis:{label:{show:true,fontSize:14}},data:[{value:45,name:'1天内办结',itemStyle:{color:'#34c759'}},{value:35,name:'1-3天办结',itemStyle:{color:'#00d4ff'}},{value:15,name:'3-7天办结',itemStyle:{color:'#ff9500'}},{value:5,name:'7天以上',itemStyle:{color:'#ff3b30'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initPhBar(){const dom=this._phOvl?.querySelector('#ph-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initPhBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._phCharts.bar=c;const depts=['市场监管局','综合执法局','卫健委','交通运输局','住建局','生态环境局','文旅局','应急局'];const vals=[385,342,256,220,188,150,128,100];c.setOption({tooltip:{trigger:'axis',axisPointer:{type:'shadow'},formatter:'{b}: {c}件'},grid:{left:'5%',right:'8%',bottom:'5%',top:'5%',containLabel:true},xAxis:{type:'value',name:'件',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},yAxis:{type:'category',data:depts.reverse(),axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:11},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},series:[{type:'bar',data:vals.reverse(),barWidth:'55%',itemStyle:{borderRadius:[0,6,6,0],color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:'rgba(0,212,255,0.4)'},{offset:1,color:'#00d4ff'}])},label:{show:true,position:'right',color:'rgba(255,255,255,0.7)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗九：信用承诺 - 自然人违诺(890)
    // ============================================
    genPromiseNaturalData(){const d=[];const types=['未履行承诺','虚假承诺','逾期履行','其他'];const names=['张XX','李XX','王XX','赵XX','陈XX','刘XX','周XX','吴XX','郑XX','孙XX'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const repaired=i%3===0;d.push({seq:i,name:names[i%10],idCard:'46'+(i%2===0?'01':'02')+'**********'+String(i).padStart(4,'0'),type:types[i%4],date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,repaired:repaired});}return d;}
    openPromiseNaturalModal(){this.pnPage=1;this.promiseNaturalData=this.genPromiseNaturalData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay pn-theme';ovl.innerHTML=this.renderPromiseNaturalModal();document.body.appendChild(ovl);this._pnOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closePromiseNaturalModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closePromiseNaturalModal();});this.bindPromiseNaturalEvents();this.initPromiseNaturalCharts();}
    closePromiseNaturalModal(){Object.values(this._pnCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._pnCharts={};const ovl=document.querySelector('.rv-modal-overlay.pn-theme');if(ovl)ovl.remove();this._pnOvl=null;}
    renderPromiseNaturalModal(){const data=this.promiseNaturalData;const tp=Math.ceil(data.length/this.pnPageSize);const pd=data.slice((this.pnPage-1)*this.pnPageSize,this.pnPage*this.pnPageSize);return`<div class="rv-modal"><div class="rv-modal-header pn-header"><span class="rv-modal-title">自然人违诺分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">自然人违诺总数</span><span class="rv-stat-value">890条</span></div><div class="rv-stat-card"><span class="rv-stat-label">违诺率</span><span class="rv-stat-value" style="color:#ff9500">3.2%</span></div><div class="rv-stat-card"><span class="rv-stat-label">已修复</span><span class="rv-stat-value" style="color:#34c759">320条</span></div><div class="rv-stat-card"><span class="rv-stat-label">未修复</span><span class="rv-stat-value" style="color:#ff3b30">570条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各年龄段违诺分布</span><div id="pn-bar" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">违诺类型分布</span><div id="pn-pie" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>姓名</th><th>身份证号（脱敏）</th><th>违诺类型</th><th>违诺日期</th><th>修复状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.name}</td><td>${r.idCard}</td><td>${r.type}</td><td>${r.date}</td><td>${this.renderRvTag(r.repaired?'已修复':'未修复',{'已修复':'green','未修复':'red'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="pn-prev" ${this.pnPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.pnPage} / ${tp} 页</span><button class="rv-page-btn" id="pn-next" ${this.pnPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindPromiseNaturalEvents(){const ovl=this._pnOvl;if(!ovl)return;ovl.querySelector('#pn-prev')?.addEventListener('click',()=>{if(this.pnPage>1){this.pnPage--;this.updatePromiseNaturalModal();}});ovl.querySelector('#pn-next')?.addEventListener('click',()=>{if(this.pnPage<Math.ceil(this.promiseNaturalData.length/this.pnPageSize)){this.pnPage++;this.updatePromiseNaturalModal();}});}
    updatePromiseNaturalModal(){const ovl=this._pnOvl;if(!ovl)return;Object.values(this._pnCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._pnCharts={};ovl.innerHTML=this.renderPromiseNaturalModal();this.bindPromiseNaturalEvents();this.initPromiseNaturalCharts();}
    initPromiseNaturalCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initPnBar();this.initPnPie();},150)));}
    initPnBar(){const dom=this._pnOvl?.querySelector('#pn-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initPnBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._pnCharts.bar=c;const ages=['20-30岁','30-40岁','40-50岁','50-60岁','60岁以上'];const vals=[280,320,180,80,30];const colors=['#00d4ff','#34c759','#ff9500','#af52de','#ff3b30'];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}条'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:ages,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'条',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals.map((v,i)=>({value:v,itemStyle:{color:colors[i],borderRadius:[6,6,0,0]}})),barWidth:'50%',label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initPnPie(){const dom=this._pnOvl?.querySelector('#pn-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initPnPie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._pnCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['50%','72%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:10},data:[{value:55,name:'未履行承诺',itemStyle:{color:'#ff3b30'}},{value:25,name:'虚假承诺',itemStyle:{color:'#ff9500'}},{value:15,name:'逾期履行',itemStyle:{color:'#af52de'}},{value:5,name:'其他',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十：信用承诺 - 法人违诺(966)
    // ============================================
    genPromiseLegalData(){const d=[];const types=['未履行承诺','虚假承诺','逾期履行','其他'];const names=['XX建筑集团有限公司','YY餐饮连锁有限公司','ZZ零售商贸有限公司','AA制造工业有限公司','BB科技有限公司','CC房地产开发公司','DD物流运输有限公司','EE环保工程有限公司'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const repaired=i%3===0;d.push({seq:i,name:names[i%8],creditCode:'9146**********'+String(i).padStart(4,'0'),type:types[i%4],date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,repaired:repaired});}return d;}
    openPromiseLegalModal(){this.plPage=1;this.promiseLegalData=this.genPromiseLegalData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay pl-theme';ovl.innerHTML=this.renderPromiseLegalModal();document.body.appendChild(ovl);this._plOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closePromiseLegalModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closePromiseLegalModal();});this.bindPromiseLegalEvents();this.initPromiseLegalCharts();}
    closePromiseLegalModal(){Object.values(this._plCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._plCharts={};const ovl=document.querySelector('.rv-modal-overlay.pl-theme');if(ovl)ovl.remove();this._plOvl=null;}
    renderPromiseLegalModal(){const data=this.promiseLegalData;const tp=Math.ceil(data.length/this.plPageSize);const pd=data.slice((this.plPage-1)*this.plPageSize,this.plPage*this.plPageSize);return`<div class="rv-modal"><div class="rv-modal-header pl-header"><span class="rv-modal-title">法人违诺分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">法人违诺总数</span><span class="rv-stat-value">966条</span></div><div class="rv-stat-card"><span class="rv-stat-label">违诺率</span><span class="rv-stat-value" style="color:#ff9500">4.1%</span></div><div class="rv-stat-card"><span class="rv-stat-label">已修复</span><span class="rv-stat-value" style="color:#34c759">340条</span></div><div class="rv-stat-card"><span class="rv-stat-label">未修复</span><span class="rv-stat-value" style="color:#ff3b30">626条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各行业违诺分布TOP8</span><div id="pl-bar" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">违诺类型分布</span><div id="pl-pie" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>企业名称</th><th>统一社会信用代码（脱敏）</th><th>违诺类型</th><th>违诺日期</th><th>修复状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.name}</td><td>${r.creditCode}</td><td>${r.type}</td><td>${r.date}</td><td>${this.renderRvTag(r.repaired?'已修复':'未修复',{'已修复':'green','未修复':'red'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="pl-prev" ${this.plPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.plPage} / ${tp} 页</span><button class="rv-page-btn" id="pl-next" ${this.plPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindPromiseLegalEvents(){const ovl=this._plOvl;if(!ovl)return;ovl.querySelector('#pl-prev')?.addEventListener('click',()=>{if(this.plPage>1){this.plPage--;this.updatePromiseLegalModal();}});ovl.querySelector('#pl-next')?.addEventListener('click',()=>{if(this.plPage<Math.ceil(this.promiseLegalData.length/this.plPageSize)){this.plPage++;this.updatePromiseLegalModal();}});}
    updatePromiseLegalModal(){const ovl=this._plOvl;if(!ovl)return;Object.values(this._plCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._plCharts={};ovl.innerHTML=this.renderPromiseLegalModal();this.bindPromiseLegalEvents();this.initPromiseLegalCharts();}
    initPromiseLegalCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initPlBar();this.initPlPie();},150)));}
    initPlBar(){const dom=this._plOvl?.querySelector('#pl-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initPlBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._plCharts.bar=c;const inds=['建筑业','餐饮业','零售业','制造业','信息技术','房地产','交通运输','环保'];const vals=[220,185,160,138,115,95,78,55];const colors=['#ff3b30','#ff9500','#ff6b3d','#af52de','#00d4ff','#34c759','#2196f3','#8e8e93'];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}条'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:inds,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10,rotate:15},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'条',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals.map((v,i)=>({value:v,itemStyle:{color:colors[i],borderRadius:[6,6,0,0]}})),barWidth:'50%',label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:10}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initPlPie(){const dom=this._plOvl?.querySelector('#pl-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initPlPie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._plCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['50%','72%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:10},data:[{value:50,name:'未履行承诺',itemStyle:{color:'#ff3b30'}},{value:30,name:'虚假承诺',itemStyle:{color:'#ff9500'}},{value:15,name:'逾期履行',itemStyle:{color:'#af52de'}},{value:5,name:'其他',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十一：联合奖惩 - 红名单(123)
    // ============================================
    genRewardRedData(){const d=[];const types=['法人','自然人'];const names=['XX科技有限公司','YY建设集团','李XX','ZZ餐饮有限公司','AA物流有限公司','王XX','BB医药有限公司','CC房地产开发公司','赵XX','DD文化旅游公司'];const measures=['绿色通道','容缺受理','容缺受理','优先扶持','绿色通道','绿色通道','容缺受理','优先扶持','绿色通道','容缺受理'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;d.push({seq:i,name:names[i%10],type:types[i%2],basis:'信用评价A级',date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,measure:measures[i%10]});}return d;}
    openRewardRedModal(){this.rrPage=1;this.rewardRedData=this.genRewardRedData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay rrd-theme';ovl.innerHTML=this.renderRewardRedModal();document.body.appendChild(ovl);this._rrOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeRewardRedModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeRewardRedModal();});this.bindRewardRedEvents();this.initRewardRedCharts();}
    closeRewardRedModal(){Object.values(this._rrCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._rrCharts={};const ovl=document.querySelector('.rv-modal-overlay.rrd-theme');if(ovl)ovl.remove();this._rrOvl=null;}
    renderRewardRedModal(){const data=this.rewardRedData;const tp=Math.ceil(data.length/this.rrPageSize);const pd=data.slice((this.rrPage-1)*this.rrPageSize,this.rrPage*this.rrPageSize);return`<div class="rv-modal"><div class="rv-modal-header rrd-header"><span class="rv-modal-title">红名单（守信激励）全景</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">红名单总数</span><span class="rv-stat-value">123个</span></div><div class="rv-stat-card"><span class="rv-stat-label">本月新增</span><span class="rv-stat-value" style="color:#34c759">8个</span></div><div class="rv-stat-card"><span class="rv-stat-label">激励措施落实</span><span class="rv-stat-value" style="color:#00d4ff">112项</span></div><div class="rv-stat-card"><span class="rv-stat-label">激励覆盖率</span><span class="rv-stat-value" style="color:#00d4ff">91%</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">近6个月红名单新增趋势</span><div id="rrd-line" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">红名单类型分布</span><div id="rrd-pie" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>名称</th><th>类型</th><th>纳入依据</th><th>纳入日期</th><th>激励措施</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.name}</td><td>${this.renderRvTag(r.type,{'法人':'blue','自然人':'green'})}</td><td>${r.basis}</td><td>${r.date}</td><td>${r.measure}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="rrd-prev" ${this.rrPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.rrPage} / ${tp} 页</span><button class="rv-page-btn" id="rrd-next" ${this.rrPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindRewardRedEvents(){const ovl=this._rrOvl;if(!ovl)return;ovl.querySelector('#rrd-prev')?.addEventListener('click',()=>{if(this.rrPage>1){this.rrPage--;this.updateRewardRedModal();}});ovl.querySelector('#rrd-next')?.addEventListener('click',()=>{if(this.rrPage<Math.ceil(this.rewardRedData.length/this.rrPageSize)){this.rrPage++;this.updateRewardRedModal();}});}
    updateRewardRedModal(){const ovl=this._rrOvl;if(!ovl)return;Object.values(this._rrCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._rrCharts={};ovl.innerHTML=this.renderRewardRedModal();this.bindRewardRedEvents();this.initRewardRedCharts();}
    initRewardRedCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initRrdLine();this.initRrdPie();},150)));}
    initRrdLine(){const dom=this._rrOvl?.querySelector('#rrd-line');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initRrdLine(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._rrCharts.line=c;c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}个'},grid:{left:'8%',right:'5%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:['1月','2月','3月','4月','5月','6月'],axisLabel:{color:'rgba(255,255,255,0.6)'},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}}},yAxis:{type:'value',name:'个',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'line',data:[5,6,7,8,9,8],smooth:true,symbol:'circle',symbolSize:8,lineStyle:{color:'#ff3b30',width:2.5},itemStyle:{color:'#ff3b30',borderColor:'#ff3b30',borderWidth:3},areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(255,59,48,0.25)'},{offset:1,color:'rgba(255,59,48,0.02)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.8)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initRrdPie(){const dom=this._rrOvl?.querySelector('#rrd-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initRrdPie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._rrCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:12}},series:[{type:'pie',radius:['55%','75%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:12},data:[{value:65,name:'法人',itemStyle:{color:'#00d4ff'}},{value:35,name:'自然人',itemStyle:{color:'#34c759'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十二：联合奖惩 - 黑名单(45)
    // ============================================
    genRewardBlackData(){const d=[];const types=['法人','自然人'];const fields=['税务','环保','市场监管','工程建设','安全生产','交通运输'];const names=['XX商贸有限公司','YY工程有限公司','刘XX','ZZ化工有限公司','AA建筑有限公司','陈XX','BB餐饮有限公司'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const active=i<=32;d.push({seq:i,name:names[i%7],type:types[i%2],field:fields[i%6],reason:`${fields[i%6]}领域严重失信`,date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,active:active});}return d;}
    openRewardBlackModal(){this.rbPage=1;this.rewardBlackData=this.genRewardBlackData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay rbk-theme';ovl.innerHTML=this.renderRewardBlackModal();document.body.appendChild(ovl);this._rbOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeRewardBlackModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeRewardBlackModal();});this.bindRewardBlackEvents();this.initRewardBlackCharts();}
    closeRewardBlackModal(){Object.values(this._rbCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._rbCharts={};const ovl=document.querySelector('.rv-modal-overlay.rbk-theme');if(ovl)ovl.remove();this._rbOvl=null;}
    renderRewardBlackModal(){const data=this.rewardBlackData;const tp=Math.ceil(data.length/this.rbPageSize);const pd=data.slice((this.rbPage-1)*this.rbPageSize,this.rbPage*this.rbPageSize);return`<div class="rv-modal"><div class="rv-modal-header rbk-header"><span class="rv-modal-title">黑名单（失信惩戒）全景</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">黑名单总数</span><span class="rv-stat-value">45个</span></div><div class="rv-stat-card"><span class="rv-stat-label">本月新增</span><span class="rv-stat-value" style="color:#ff9500">3个</span></div><div class="rv-stat-card"><span class="rv-stat-label">已移出黑名单</span><span class="rv-stat-value" style="color:#34c759">10个</span></div><div class="rv-stat-card"><span class="rv-stat-label">联合惩戒执行</span><span class="rv-stat-value" style="color:#ff3b30">38项</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">黑名单领域分布</span><div id="rbk-bar" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">黑名单状态分布</span><div id="rbk-donut" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>名称</th><th>类型</th><th>列入原因</th><th>列入日期</th><th>状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.name}</td><td>${this.renderRvTag(r.type,{'法人':'blue','自然人':'green'})}</td><td>${r.reason}</td><td>${r.date}</td><td>${this.renderRvTag(r.active?'当前有效':'已移出',{'当前有效':'red','已移出':'default'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="rbk-prev" ${this.rbPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.rbPage} / ${tp} 页</span><button class="rv-page-btn" id="rbk-next" ${this.rbPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindRewardBlackEvents(){const ovl=this._rbOvl;if(!ovl)return;ovl.querySelector('#rbk-prev')?.addEventListener('click',()=>{if(this.rbPage>1){this.rbPage--;this.updateRewardBlackModal();}});ovl.querySelector('#rbk-next')?.addEventListener('click',()=>{if(this.rbPage<Math.ceil(this.rewardBlackData.length/this.rbPageSize)){this.rbPage++;this.updateRewardBlackModal();}});}
    updateRewardBlackModal(){const ovl=this._rbOvl;if(!ovl)return;Object.values(this._rbCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._rbCharts={};ovl.innerHTML=this.renderRewardBlackModal();this.bindRewardBlackEvents();this.initRewardBlackCharts();}
    initRewardBlackCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initRbkBar();this.initRbkDonut();},150)));}
    initRbkBar(){const dom=this._rbOvl?.querySelector('#rbk-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initRbkBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._rbCharts.bar=c;const fields=['税务','环保','市场监管','工程建设','安全生产','交通运输'];const vals=[12,10,8,7,5,3];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}个'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:fields,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:11},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'个',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff3b30'},{offset:1,color:'rgba(255,59,48,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initRbkDonut(){const dom=this._rbOvl?.querySelector('#rbk-donut');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initRbkDonut(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._rbCharts.donut=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:12}},series:[{type:'pie',radius:['60%','78%'],center:['50%','45%'],avoidLabelOverlap:false,itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{show:false},emphasis:{label:{show:true,fontSize:14}},data:[{value:78,name:'当前有效',itemStyle:{color:'#ff3b30'}},{value:22,name:'已移出',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十三：一般失信行为总数(1,234)
    // ============================================
    genDishonestGeneralData(){const d=[];const types=['行政处罚类','合同违约类','行政处罚类','虚假承诺类','行政处罚类','合同违约类','合同违约类','虚假承诺类','行政处罚类','其他'];const fields=['税务','环保','市场监管','交通','税务','环保','市场监管','工程建设'];const names=['XX科技有限公司','YY建设工程有限公司','李XX','ZZ餐饮有限公司','AA物流有限公司','王XX','BB医药有限公司','CC房地产开发公司'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const statuses=['已整改','已整改','已整改','整改中','未整改'];d.push({seq:i,name:names[i%8],subjectType:i%3===2?'自然人':'法人',type:types[i%10],field:fields[i%8],date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,rectifyStatus:statuses[i%5]});}return d;}
    openDishonestGeneralModal(){this.dgPage=1;this.dishonestGeneralData=this.genDishonestGeneralData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay dg-theme';ovl.innerHTML=this.renderDishonestGeneralModal();document.body.appendChild(ovl);this._dgOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeDishonestGeneralModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeDishonestGeneralModal();});this.bindDishonestGeneralEvents();this.initDishonestGeneralCharts();}
    closeDishonestGeneralModal(){Object.values(this._dgCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._dgCharts={};const ovl=document.querySelector('.rv-modal-overlay.dg-theme');if(ovl)ovl.remove();this._dgOvl=null;}
    renderDishonestGeneralModal(){const data=this.dishonestGeneralData;const tp=Math.ceil(data.length/this.dgPageSize);const pd=data.slice((this.dgPage-1)*this.dgPageSize,this.dgPage*this.dgPageSize);return`<div class="rv-modal"><div class="rv-modal-header dg-header"><span class="rv-modal-title">一般失信行为分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">一般失信总数</span><span class="rv-stat-value">1,234条</span></div><div class="rv-stat-card"><span class="rv-stat-label">涉及法人</span><span class="rv-stat-value" style="color:#00d4ff">890条</span></div><div class="rv-stat-card"><span class="rv-stat-label">涉及自然人</span><span class="rv-stat-value" style="color:#af52de">344条</span></div><div class="rv-stat-card"><span class="rv-stat-label">已整改</span><span class="rv-stat-value" style="color:#34c759">456条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各领域一般失信分布TOP8</span><div id="dg-bar" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">失信类型分布</span><div id="dg-pie" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>主体名称</th><th>主体类型</th><th>失信类型</th><th>失信日期</th><th>整改状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.name}</td><td>${r.subjectType}</td><td>${r.type}</td><td>${r.date}</td><td>${this.renderRvTag(r.rectifyStatus,{'已整改':'green','整改中':'orange','未整改':'red'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="dg-prev" ${this.dgPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.dgPage} / ${tp} 页</span><button class="rv-page-btn" id="dg-next" ${this.dgPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindDishonestGeneralEvents(){const ovl=this._dgOvl;if(!ovl)return;ovl.querySelector('#dg-prev')?.addEventListener('click',()=>{if(this.dgPage>1){this.dgPage--;this.updateDishonestGeneralModal();}});ovl.querySelector('#dg-next')?.addEventListener('click',()=>{if(this.dgPage<Math.ceil(this.dishonestGeneralData.length/this.dgPageSize)){this.dgPage++;this.updateDishonestGeneralModal();}});}
    updateDishonestGeneralModal(){const ovl=this._dgOvl;if(!ovl)return;Object.values(this._dgCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._dgCharts={};ovl.innerHTML=this.renderDishonestGeneralModal();this.bindDishonestGeneralEvents();this.initDishonestGeneralCharts();}
    initDishonestGeneralCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initDgBar();this.initDgPie();},150)));}
    initDgBar(){const dom=this._dgOvl?.querySelector('#dg-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initDgBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._dgCharts.bar=c;const fields=['税务','环保','市场监管','交通','工程建设','卫健','文旅','农业'];const vals=[285,220,195,168,138,105,82,60];const colors=['#ff3b30','#ff9500','#ff6b3d','#af52de','#00d4ff','#34c759','#2196f3','#8e8e93'];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}条'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:fields,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10,rotate:15},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'条',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals.map((v,i)=>({value:v,itemStyle:{color:colors[i],borderRadius:[6,6,0,0]}})),barWidth:'50%',label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:10}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initDgPie(){const dom=this._dgOvl?.querySelector('#dg-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initDgPie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._dgCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['50%','72%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:10},data:[{value:40,name:'行政处罚类',itemStyle:{color:'#ff3b30'}},{value:30,name:'合同违约类',itemStyle:{color:'#ff9500'}},{value:20,name:'虚假承诺类',itemStyle:{color:'#af52de'}},{value:10,name:'其他',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十四：严重失信主体名单总数(56)
    // ============================================
    genDishonestSeriousData(){const d=[];const fields=['税务','环保','市场监管','工程建设','安全生产'];const names=['XX化工集团有限公司','YY建筑工程有限公司','ZZ商贸有限公司','AA房地产开发公司','刘XX','BB制造有限公司','陈XX','CC物流有限公司'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const active=i<=34;d.push({seq:i,name:names[i%8],subjectType:i%5===0||i%7===0?'自然人':'法人',field:fields[i%5],reason:`${fields[i%5]}领域严重违法失信`,date:`2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,active:active});}return d;}
    openDishonestSeriousModal(){this.dsPage=1;this.dishonestSeriousData=this.genDishonestSeriousData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay ds-theme';ovl.innerHTML=this.renderDishonestSeriousModal();document.body.appendChild(ovl);this._dsOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeDishonestSeriousModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeDishonestSeriousModal();});this.bindDishonestSeriousEvents();this.initDishonestSeriousCharts();}
    closeDishonestSeriousModal(){Object.values(this._dsCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._dsCharts={};const ovl=document.querySelector('.rv-modal-overlay.ds-theme');if(ovl)ovl.remove();this._dsOvl=null;}
    renderDishonestSeriousModal(){const data=this.dishonestSeriousData;const tp=Math.ceil(data.length/this.dsPageSize);const pd=data.slice((this.dsPage-1)*this.dsPageSize,this.dsPage*this.dsPageSize);return`<div class="rv-modal"><div class="rv-modal-header ds-header"><span class="rv-modal-title">严重失信主体名单分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">严重失信总数</span><span class="rv-stat-value">56条</span></div><div class="rv-stat-card"><span class="rv-stat-label">涉及法人</span><span class="rv-stat-value" style="color:#00d4ff">42条</span></div><div class="rv-stat-card"><span class="rv-stat-label">涉及自然人</span><span class="rv-stat-value" style="color:#af52de">14条</span></div><div class="rv-stat-card"><span class="rv-stat-label">已修复移出</span><span class="rv-stat-value" style="color:#34c759">8条</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各领域严重失信分布TOP5</span><div id="ds-bar" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">严重失信主体状态分布</span><div id="ds-donut" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>主体名称</th><th>主体类型</th><th>列入事由</th><th>列入日期</th><th>状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.name}</td><td>${r.subjectType}</td><td>${r.reason}</td><td>${r.date}</td><td>${this.renderRvTag(r.active?'当前有效':'已移出',{'当前有效':'red','已移出':'default'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="ds-prev" ${this.dsPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.dsPage} / ${tp} 页</span><button class="rv-page-btn" id="ds-next" ${this.dsPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindDishonestSeriousEvents(){const ovl=this._dsOvl;if(!ovl)return;ovl.querySelector('#ds-prev')?.addEventListener('click',()=>{if(this.dsPage>1){this.dsPage--;this.updateDishonestSeriousModal();}});ovl.querySelector('#ds-next')?.addEventListener('click',()=>{if(this.dsPage<Math.ceil(this.dishonestSeriousData.length/this.dsPageSize)){this.dsPage++;this.updateDishonestSeriousModal();}});}
    updateDishonestSeriousModal(){const ovl=this._dsOvl;if(!ovl)return;Object.values(this._dsCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._dsCharts={};ovl.innerHTML=this.renderDishonestSeriousModal();this.bindDishonestSeriousEvents();this.initDishonestSeriousCharts();}
    initDishonestSeriousCharts(){if(typeof echarts==='undefined')return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{this.initDsBar();this.initDsDonut();},150)));}
    initDsBar(){const dom=this._dsOvl?.querySelector('#ds-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initDsBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._dsCharts.bar=c;const fields=['税务','环保','市场监管','工程建设','安全生产'];const vals=[18,14,10,8,6];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}条'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:fields,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:11},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'条',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff3b30'},{offset:1,color:'rgba(255,59,48,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initDsDonut(){const dom=this._dsOvl?.querySelector('#ds-donut');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initDsDonut(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._dsCharts.donut=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:12}},series:[{type:'pie',radius:['60%','78%'],center:['50%','45%'],avoidLabelOverlap:false,itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{show:false},emphasis:{label:{show:true,fontSize:14}},data:[{value:86,name:'当前有效',itemStyle:{color:'#ff3b30'}},{value:14,name:'已移出',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十五：信用审批全景分析
    // ============================================
    genCreditApprovalData(){const d=[];const types=['告知承诺制','容缺受理','信用承诺','绿色通道','其他'];const names=['XX科技有限公司','YY建设工程有限公司','ZZ餐饮管理有限公司','AA物流有限公司','BB医药有限公司','CC房地产开发公司','DD文化旅游公司','EE环保科技有限公司'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const statuses=['已办结','已办结','已办结','办理中','已退回'];d.push({seq:i,code:'SP'+String(i).padStart(6,'0'),name:names[i%8],type:types[i%5],date:`2026-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,status:statuses[i%5]});}return d;}
    openCreditApprovalModal(){this.caPage=1;this.caData=this.genCreditApprovalData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay ca-theme';ovl.innerHTML=this.renderCreditApprovalModal();document.body.appendChild(ovl);this._caOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeCreditApprovalModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeCreditApprovalModal();});this.bindCreditApprovalEvents();this.initCreditApprovalCharts();}
    closeCreditApprovalModal(){Object.values(this._caCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._caCharts={};const ovl=document.querySelector('.rv-modal-overlay.ca-theme');if(ovl)ovl.remove();this._caOvl=null;}
    renderCreditApprovalModal(){const data=this.caData;const tp=Math.ceil(data.length/this.caPageSize);const pd=data.slice((this.caPage-1)*this.caPageSize,this.caPage*this.caPageSize);return`<div class="rv-modal"><div class="rv-modal-header ca-header"><span class="rv-modal-title">信用审批全景分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">信用审批总数</span><span class="rv-stat-value">1,567件</span></div><div class="rv-stat-card"><span class="rv-stat-label">已办结</span><span class="rv-stat-value" style="color:#34c759">1,423件</span></div><div class="rv-stat-card"><span class="rv-stat-label">办理中</span><span class="rv-stat-value" style="color:#ff9500">89件</span></div><div class="rv-stat-card"><span class="rv-stat-label">已退回</span><span class="rv-stat-value" style="color:#ff3b30">55件</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">近6个月信用审批趋势</span><div id="ca-line" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">信用审批类型分布</span><div id="ca-pie" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>审批编号</th><th>申请人/企业名称</th><th>审批类型</th><th>申请日期</th><th>审批状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.name}</td><td>${r.type}</td><td>${r.date}</td><td>${this.renderRvTag(r.status,{'已办结':'green','办理中':'orange','已退回':'red'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="ca-prev" ${this.caPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.caPage} / ${tp} 页</span><button class="rv-page-btn" id="ca-next" ${this.caPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindCreditApprovalEvents(){const ovl=this._caOvl;if(!ovl)return;ovl.querySelector('#ca-prev')?.addEventListener('click',()=>{if(this.caPage>1){this.caPage--;this.updateCreditApprovalModal();}});ovl.querySelector('#ca-next')?.addEventListener('click',()=>{if(this.caPage<Math.ceil(this.caData.length/this.caPageSize)){this.caPage++;this.updateCreditApprovalModal();}});}
    updateCreditApprovalModal(){const ovl=this._caOvl;if(!ovl)return;Object.values(this._caCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._caCharts={};ovl.innerHTML=this.renderCreditApprovalModal();this.bindCreditApprovalEvents();this.initCreditApprovalCharts();}
    initCreditApprovalCharts(){if(typeof echarts==='undefined')return;const init=()=>{this.initCaLine();this.initCaPie();};setTimeout(init,300);}
    initCaLine(){const dom=this._caOvl?.querySelector('#ca-line');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initCaLine(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._caCharts.line=c;c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}件'},grid:{left:'8%',right:'5%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:['1月','2月','3月','4月','5月','6月'],axisLabel:{color:'rgba(255,255,255,0.6)'},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}}},yAxis:{type:'value',name:'件',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'line',data:[220,260,245,280,275,287],smooth:true,symbol:'circle',symbolSize:8,lineStyle:{color:'#00d4ff',width:2.5},itemStyle:{color:'#00d4ff',borderColor:'#00d4ff',borderWidth:3},areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,212,255,0.3)'},{offset:1,color:'rgba(0,212,255,0.02)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.8)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initCaPie(){const dom=this._caOvl?.querySelector('#ca-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initCaPie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._caCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['50%','72%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:10},data:[{value:35,name:'告知承诺制',itemStyle:{color:'#00d4ff'}},{value:25,name:'容缺受理',itemStyle:{color:'#34c759'}},{value:20,name:'信用承诺',itemStyle:{color:'#ff9500'}},{value:12,name:'绿色通道',itemStyle:{color:'#af52de'}},{value:8,name:'其他',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十六：信用监管全景分析
    // ============================================
    genCreditSupervisionData(){const d=[];const levels=['A','B','C','D'];const types=['日常监管','专项监管','双随机'];const names=['XX科技有限公司','YY建设工程有限公司','ZZ餐饮管理有限公司','AA物流有限公司','BB医药有限公司','CC房地产开发公司','DD文化旅游公司','EE环保科技有限公司'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const results=['合格','合格','合格','发现问题','移送'];d.push({seq:i,code:'JG'+String(i).padStart(6,'0'),name:names[i%8],level:levels[i%4],type:types[i%3],date:`2026-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,result:results[i%5]});}return d;}
    openCreditSupervisionModal(){this.csPage=1;this.csData=this.genCreditSupervisionData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay cs-theme';ovl.innerHTML=this.renderCreditSupervisionModal();document.body.appendChild(ovl);this._csOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeCreditSupervisionModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeCreditSupervisionModal();});this.bindCreditSupervisionEvents();this.initCreditSupervisionCharts();}
    closeCreditSupervisionModal(){Object.values(this._csCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._csCharts={};const ovl=document.querySelector('.rv-modal-overlay.cs-theme');if(ovl)ovl.remove();this._csOvl=null;}
    renderCreditSupervisionModal(){const data=this.csData;const tp=Math.ceil(data.length/this.csPageSize);const pd=data.slice((this.csPage-1)*this.csPageSize,this.csPage*this.csPageSize);return`<div class="rv-modal"><div class="rv-modal-header cs-header"><span class="rv-modal-title">信用监管全景分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">信用监管总数</span><span class="rv-stat-value">2,345次</span></div><div class="rv-stat-card"><span class="rv-stat-label">A级监管</span><span class="rv-stat-value" style="color:#34c759">1,056次</span></div><div class="rv-stat-card"><span class="rv-stat-label">B级监管</span><span class="rv-stat-value" style="color:#00d4ff">890次</span></div><div class="rv-stat-card"><span class="rv-stat-label">C级及以下监管</span><span class="rv-stat-value" style="color:#ff9500">399次</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各领域信用监管分布</span><div id="cs-bar" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">信用等级监管分布</span><div id="cs-donut" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>监管编号</th><th>监管对象名称</th><th>信用等级</th><th>监管类型</th><th>监管日期</th><th>监管结果</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.name}</td><td>${r.level}</td><td>${r.type}</td><td>${r.date}</td><td>${this.renderRvTag(r.result,{'合格':'green','发现问题':'orange','移送':'red'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="cs-prev" ${this.csPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.csPage} / ${tp} 页</span><button class="rv-page-btn" id="cs-next" ${this.csPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindCreditSupervisionEvents(){const ovl=this._csOvl;if(!ovl)return;ovl.querySelector('#cs-prev')?.addEventListener('click',()=>{if(this.csPage>1){this.csPage--;this.updateCreditSupervisionModal();}});ovl.querySelector('#cs-next')?.addEventListener('click',()=>{if(this.csPage<Math.ceil(this.csData.length/this.csPageSize)){this.csPage++;this.updateCreditSupervisionModal();}});}
    updateCreditSupervisionModal(){const ovl=this._csOvl;if(!ovl)return;Object.values(this._csCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._csCharts={};ovl.innerHTML=this.renderCreditSupervisionModal();this.bindCreditSupervisionEvents();this.initCreditSupervisionCharts();}
    initCreditSupervisionCharts(){if(typeof echarts==='undefined')return;const init=()=>{this.initCsBar();this.initCsDonut();};setTimeout(init,300);}
    initCsBar(){const dom=this._csOvl?.querySelector('#cs-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initCsBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._csCharts.bar=c;const fields=['市场监管','生态环境','交通运输','卫生健康','文化旅游','应急管理','税务','海关'];const vals=[380,320,290,260,240,220,210,155];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}次'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:fields,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10,rotate:15},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'次',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34c759'},{offset:1,color:'rgba(52,199,89,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:10}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initCsDonut(){const dom=this._csOvl?.querySelector('#cs-donut');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initCsDonut(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._csCharts.donut=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:12}},series:[{type:'pie',radius:['60%','78%'],center:['50%','45%'],avoidLabelOverlap:false,itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{show:false},emphasis:{label:{show:true,fontSize:14}},data:[{value:45,name:'A级',itemStyle:{color:'#34c759'}},{value:38,name:'B级',itemStyle:{color:'#00d4ff'}},{value:12,name:'C级',itemStyle:{color:'#ff9500'}},{value:5,name:'D级',itemStyle:{color:'#ff3b30'}}]}],graphic:[{type:'text',left:'center',top:'38%',style:{text:'2,345次',textAlign:'center',fill:'#34c759',fontSize:20,fontWeight:'bold'}}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十七：信用执法全景分析
    // ============================================
    genCreditLawData(){const d=[];const types=['行政处罚','行政强制','行政检查'];const names=['XX科技有限公司','YY建设工程有限公司','ZZ餐饮管理有限公司','AA物流有限公司','BB医药有限公司','CC房地产开发公司','DD文化旅游公司','EE环保科技有限公司'];const results=['罚款','警告','责令整改','吊销许可证','其他'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;d.push({seq:i,code:'ZF'+String(i).padStart(6,'0'),name:names[i%8],type:types[i%3],basis:`法律依据${i%5+1}`,date:`2026-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,result:results[i%5]});}return d;}
    openCreditLawModal(){this.clPage=1;this.clData=this.genCreditLawData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay cl-theme';ovl.innerHTML=this.renderCreditLawModal();document.body.appendChild(ovl);this._clOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeCreditLawModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeCreditLawModal();});this.bindCreditLawEvents();this.initCreditLawCharts();}
    closeCreditLawModal(){Object.values(this._clCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._clCharts={};const ovl=document.querySelector('.rv-modal-overlay.cl-theme');if(ovl)ovl.remove();this._clOvl=null;}
    renderCreditLawModal(){const data=this.clData;const tp=Math.ceil(data.length/this.clPageSize);const pd=data.slice((this.clPage-1)*this.clPageSize,this.clPage*this.clPageSize);return`<div class="rv-modal"><div class="rv-modal-header cl-header"><span class="rv-modal-title">信用执法全景分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">信用执法总数</span><span class="rv-stat-value">890次</span></div><div class="rv-stat-card"><span class="rv-stat-label">行政处罚</span><span class="rv-stat-value" style="color:#ff3b30">356次</span></div><div class="rv-stat-card"><span class="rv-stat-label">行政强制</span><span class="rv-stat-value" style="color:#ff9500">234次</span></div><div class="rv-stat-card"><span class="rv-stat-label">行政检查</span><span class="rv-stat-value" style="color:#00d4ff">300次</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">各领域信用执法分布</span><div id="cl-bar" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">执法结果分布</span><div id="cl-pie" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>执法编号</th><th>执法对象名称</th><th>执法类型</th><th>执法依据</th><th>执法日期</th><th>执法结果</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.name}</td><td>${r.type}</td><td>${r.basis}</td><td>${r.date}</td><td>${r.result}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="cl-prev" ${this.clPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.clPage} / ${tp} 页</span><button class="rv-page-btn" id="cl-next" ${this.clPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindCreditLawEvents(){const ovl=this._clOvl;if(!ovl)return;ovl.querySelector('#cl-prev')?.addEventListener('click',()=>{if(this.clPage>1){this.clPage--;this.updateCreditLawModal();}});ovl.querySelector('#cl-next')?.addEventListener('click',()=>{if(this.clPage<Math.ceil(this.clData.length/this.clPageSize)){this.clPage++;this.updateCreditLawModal();}});}
    updateCreditLawModal(){const ovl=this._clOvl;if(!ovl)return;Object.values(this._clCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._clCharts={};ovl.innerHTML=this.renderCreditLawModal();this.bindCreditLawEvents();this.initCreditLawCharts();}
    initCreditLawCharts(){if(typeof echarts==='undefined')return;const init=()=>{this.initClBar();this.initClPie();};setTimeout(init,300);}
    initClBar(){const dom=this._clOvl?.querySelector('#cl-bar');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initClBar(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._clCharts.bar=c;const fields=['市场监管','生态环境','交通运输','卫生健康','文化旅游','应急管理','税务','海关'];const vals=[180,140,120,100,90,80,70,60];c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}次'},grid:{left:'5%',right:'8%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:fields,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:10,rotate:15},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}},axisTick:{show:false}},yAxis:{type:'value',name:'次',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[6,6,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff9500'},{offset:1,color:'rgba(255,149,0,0.2)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:10}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initClPie(){const dom=this._clOvl?.querySelector('#cl-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initClPie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._clCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['50%','72%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:10},data:[{value:30,name:'罚款',itemStyle:{color:'#ff3b30'}},{value:25,name:'警告',itemStyle:{color:'#ff9500'}},{value:20,name:'责令整改',itemStyle:{color:'#af52de'}},{value:10,name:'吊销许可证',itemStyle:{color:'#5856d6'}},{value:15,name:'其他',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    // ============================================
    // 弹窗十八：信用修复全景分析
    // ============================================
    genCreditRepairData(){const d=[];const types=['行政处罚修复','失信主体修复','经营异常修复','其他'];const names=['XX科技有限公司','YY建设工程有限公司','ZZ餐饮管理有限公司','AA物流有限公司','BB医药有限公司','CC房地产开发公司','DD文化旅游公司','EE环保科技有限公司'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const day=Math.floor(Math.random()*28)+1;const statuses=['已修复','已修复','已修复','修复中','修复失败'];d.push({seq:i,code:'XF'+String(i).padStart(6,'0'),name:names[i%8],type:types[i%4],date:`2026-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,status:statuses[i%5]});}return d;}
    openCreditRepairModal(){this.crPage=1;this.crData=this.genCreditRepairData();const ovl=document.createElement('div');ovl.className='rv-modal-overlay cr-theme';ovl.innerHTML=this.renderCreditRepairModal();document.body.appendChild(ovl);this._crOvl=ovl;ovl.querySelector('.rv-modal-close').addEventListener('click',()=>this.closeCreditRepairModal());ovl.addEventListener('click',(e)=>{if(e.target===ovl)this.closeCreditRepairModal();});this.bindCreditRepairEvents();this.initCreditRepairCharts();}
    closeCreditRepairModal(){Object.values(this._crCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._crCharts={};const ovl=document.querySelector('.rv-modal-overlay.cr-theme');if(ovl)ovl.remove();this._crOvl=null;}
    renderCreditRepairModal(){const data=this.crData;const tp=Math.ceil(data.length/this.crPageSize);const pd=data.slice((this.crPage-1)*this.crPageSize,this.crPage*this.crPageSize);return`<div class="rv-modal"><div class="rv-modal-header cr-header"><span class="rv-modal-title">信用修复全景分析</span><button class="rv-modal-close">×</button></div><div class="rv-stats"><div class="rv-stat-card"><span class="rv-stat-label">信用修复总数</span><span class="rv-stat-value">456件</span></div><div class="rv-stat-card"><span class="rv-stat-label">已修复</span><span class="rv-stat-value" style="color:#34c759">389件</span></div><div class="rv-stat-card"><span class="rv-stat-label">修复中</span><span class="rv-stat-value" style="color:#ff9500">45件</span></div><div class="rv-stat-card"><span class="rv-stat-label">修复失败</span><span class="rv-stat-value" style="color:#ff3b30">22件</span></div></div><div class="rv-charts"><div class="rv-chart-left" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">近6个月信用修复趋势</span><div id="cr-line" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:5"><div class="rv-chart-item"><span class="rv-chart-title">信用修复类型分布</span><div id="cr-pie" class="rv-chart-container"></div></div></div></div><div class="rv-table-wrap"><table class="rv-table"><thead><tr><th>序号</th><th>修复编号</th><th>申请主体名称</th><th>修复类型</th><th>申请日期</th><th>修复状态</th></tr></thead><tbody>${pd.map(r=>`<tr><td>${r.seq}</td><td>${r.code}</td><td>${r.name}</td><td>${r.type}</td><td>${r.date}</td><td>${this.renderRvTag(r.status,{'已修复':'green','修复中':'orange','修复失败':'red'})}</td></tr>`).join('')}</tbody></table></div><div class="rv-footer"><button class="rv-page-btn" id="cr-prev" ${this.crPage<=1?'disabled':''}>上一页</button><span class="rv-page-info">第 ${this.crPage} / ${tp} 页</span><button class="rv-page-btn" id="cr-next" ${this.crPage>=tp?'disabled':''}>下一页</button></div></div>`;}
    bindCreditRepairEvents(){const ovl=this._crOvl;if(!ovl)return;ovl.querySelector('#cr-prev')?.addEventListener('click',()=>{if(this.crPage>1){this.crPage--;this.updateCreditRepairModal();}});ovl.querySelector('#cr-next')?.addEventListener('click',()=>{if(this.crPage<Math.ceil(this.crData.length/this.crPageSize)){this.crPage++;this.updateCreditRepairModal();}});}
    updateCreditRepairModal(){const ovl=this._crOvl;if(!ovl)return;Object.values(this._crCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._crCharts={};ovl.innerHTML=this.renderCreditRepairModal();this.bindCreditRepairEvents();this.initCreditRepairCharts();}
    initCreditRepairCharts(){if(typeof echarts==='undefined')return;const init=()=>{this.initCrLine();this.initCrPie();};setTimeout(init,300);}
    initCrLine(){const dom=this._crOvl?.querySelector('#cr-line');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initCrLine(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._crCharts.line=c;c.setOption({tooltip:{trigger:'axis',formatter:'{b}: {c}件'},grid:{left:'8%',right:'5%',bottom:'5%',top:'8%',containLabel:true},xAxis:{type:'category',data:['1月','2月','3月','4月','5月','6月'],axisLabel:{color:'rgba(255,255,255,0.6)'},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}}},yAxis:{type:'value',name:'件',nameTextStyle:{color:'rgba(255,255,255,0.5)'},axisLabel:{color:'rgba(255,255,255,0.5)'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.08)'}}},series:[{type:'line',data:[60,65,75,78,85,93],smooth:true,symbol:'circle',symbolSize:8,lineStyle:{color:'#af52de',width:2.5},itemStyle:{color:'#af52de',borderColor:'#af52de',borderWidth:3},areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(175,82,222,0.3)'},{offset:1,color:'rgba(175,82,222,0.02)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.8)',fontSize:11}}]});new ResizeObserver(()=>c.resize()).observe(dom);}
    initCrPie(){const dom=this._crOvl?.querySelector('#cr-pie');if(!dom)return;dom.style.cssText='width:100%;height:230px';if(dom.getBoundingClientRect().width<=0){setTimeout(()=>this.initCrPie(),200);return;}const ex=echarts.getInstanceByDom(dom);if(ex)ex.dispose();const c=echarts.init(dom);this._crCharts.pie=c;c.setOption({tooltip:{trigger:'item',formatter:'{b}: {d}%'},legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11}},series:[{type:'pie',radius:['50%','72%'],center:['50%','45%'],itemStyle:{borderRadius:6,borderColor:'rgba(5,13,24,0.98)',borderWidth:3},label:{formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:10},data:[{value:35,name:'行政处罚修复',itemStyle:{color:'#ff3b30'}},{value:30,name:'失信主体修复',itemStyle:{color:'#ff9500'}},{value:20,name:'经营异常修复',itemStyle:{color:'#00d4ff'}},{value:15,name:'其他',itemStyle:{color:'#8e8e93'}}]}]});new ResizeObserver(()=>c.resize()).observe(dom);}

    show() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = '';
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }
};
