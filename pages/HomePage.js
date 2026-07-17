window.HomePage = class HomePage {
    constructor(container) {
        this.container = container;
        this.currentModalType = null;
        this.currentPage = 1;
        this.pageSize = 5;
        this.render();
        window.homePage = this;
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container home-layout animate-slide-in">
                <div class="home-layout-container">
                    <div class="home-col-left">
                        <div class="card-section home-approval-section">
                            <div class="card-title-row">
                                <div class="card-title" onclick="window.screenFrame.switchTab('approval')">审批</div>
                                <div class="approval-tab-container">
                                    <div class="approval-tab-item active" data-tab="case">办件情况</div>
                                    <div class="approval-tab-item" data-tab="speed">提速情况</div>
                                </div>
                                <div class="approval-sub-tab-container">
                                    <div class="approval-sub-tab-item active" data-sub-tab="month">本月</div>
                                    <div class="approval-sub-tab-item" data-sub-tab="total">累计</div>
                                </div>
                            </div>
                            <div class="home-approval-content">
                                <div id="approval-case-panel" class="approval-panel">
                                    <div class="approval-pie-case">
                                        <div id="approvalCasePie" class="chart-container"></div>
                                    </div>
                                    <div class="approval-right-panel-vertical">
                                        <div class="approval-stat-card-vertical">
                                            <span class="approval-stat-label-vertical">办件数</span>
                                            <span class="approval-stat-value-vertical" id="approval-stat-cases">8,956</span>
                                        </div>
                                        <div class="approval-stat-card-vertical">
                                            <span class="approval-stat-label-vertical">办结率</span>
                                            <span class="approval-stat-value-vertical" id="approval-stat-rate">98%</span>
                                        </div>
                                        <div class="approval-stat-card-vertical">
                                            <span class="approval-stat-label-vertical">事项数</span>
                                            <span class="approval-stat-value-vertical" id="approval-stat-items">9,856</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="approval-speed-panel" class="approval-panel approval-panel-hidden">
                                    <div class="approval-pie-speed">
                                        <div id="approvalSpeedPie" class="chart-container"></div>
                                    </div>
                                    <div class="approval-right-panel-vertical">
                                        <div class="approval-stat-card-vertical">
                                            <span class="approval-stat-label-vertical">提速百分比</span>
                                            <span class="approval-stat-value-vertical" id="approval-stat-speed">85.7%</span>
                                        </div>
                                        <div class="approval-stat-card-vertical">
                                            <span class="approval-stat-label-vertical">减少天数</span>
                                            <span class="approval-stat-value-vertical" id="approval-stat-days">6.8天</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-section home-supervision-section">
                            <div class="card-title-row">
                                <div class="card-title" onclick="window.screenFrame.switchTab('supervision')">监管</div>
                             </div>
                            <div class="home-supervision-stat-row-full">
                                <div class="home-supervision-stat-card" onclick="window.homePage.openModal('supervision_visit_reduction')" style="cursor: pointer;">
                                    <span class="home-supervision-stat-label">减少上门次数</span>
                                    <span class="home-supervision-stat-value">892</span>
                                </div>
                                <div class="home-supervision-stat-card" onclick="window.homePage.openModal('supervision_problem_rate')" style="cursor: pointer;">
                                    <span class="home-supervision-stat-label">发现问题率</span>
                                    <span class="home-supervision-stat-value">15.6%</span>
                                </div>
                                <div class="home-supervision-stat-card" onclick="window.homePage.openModal('supervision_transfer_clues')" style="cursor: pointer;">
                                    <span class="home-supervision-stat-label">线索移送</span>
                                    <span class="home-supervision-stat-value">128</span>
                                </div>
                            </div>
                            <div class="home-supervision-content">
                                <div class="home-supervision-chart-col">
                                    <div id="supervisionMethodPie" class="chart-container"></div>
                                    <div class="home-new-supervision-scene">
                                        <div class="home-new-supervision-scene-title">新型监管场景</div>
                                        <div class="home-new-supervision-scene-cards">
                                            <div class="home-supervision-stat-card" onclick="window.homePage.openModal('sandbox_supervision')" style="cursor: pointer;">
                                                <span class="home-supervision-stat-label">沙盒监管</span>
                                                <span class="home-supervision-stat-value">32</span>
                                            </div>
                                            <div class="home-supervision-stat-card" onclick="window.homePage.openModal('offsite_supervision')" style="cursor: pointer;">
                                                <span class="home-supervision-stat-label">非现场监管</span>
                                                <span class="home-supervision-stat-value">15</span>
                                            </div>
                                            <div class="home-supervision-stat-card" onclick="window.homePage.openModal('trigger_supervision')" style="cursor: pointer;">
                                                <span class="home-supervision-stat-label">触发式监管</span>
                                                <span class="home-supervision-stat-value">89</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-section home-law-section">
                            <div class="card-title-row">
                                <div class="card-title" onclick="window.screenFrame.switchTab('law')">执法</div>
                                <div class="card-title-right" onclick="window.screenFrame.switchTab('law')">案件总数 <span class="card-title-value">205件</span><span class="card-title-trend up">↑ 5.2%</span></div>
                            </div>
                            <div class="home-law-content">
                                <div class="home-law-stat-row-full">
                                    <div class="home-law-stat-card" onclick="window.homePage.openModal('law_case_source')" style="cursor: pointer;">
                                        <span class="home-law-stat-label">案源/线索</span>
                                        <span class="home-law-stat-value">228件</span>
                                    </div>
                                    <div class="home-law-stat-card" onclick="window.homePage.openModal('law_case_rate')" style="cursor: pointer;">
                                        <span class="home-law-stat-label">立案率</span>
                                        <span class="home-law-stat-value">90%</span>
                                    </div>
                                    <div class="home-law-stat-card" onclick="window.homePage.openModal('law_major_case_ratio')" style="cursor: pointer;">
                                        <span class="home-law-stat-label">重大案件占比</span>
                                        <span class="home-law-stat-value">4.4%</span>
                                    </div>
                                </div>
                                <div class="home-law-chart-item">
                                    <div class="chart-title">案件数top5</div>
                                    <div id="lawTop10" class="chart-container"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="home-col-center">
                        <div class="card-section today-approval-section">
                            <div class="today-approval-row">
                                <div class="today-approval-item" onclick="window.homePage.openModal('trend_approval_case')" style="cursor: pointer;">
                                    <span class="today-approval-label">审批办件总数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">900</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓15%</span>
                                    </div>
                                </div>
                            
                                <div class="today-approval-item" onclick="window.homePage.openModal('trend_inspection_times')" style="cursor: pointer;">
                                    <span class="today-approval-label">检查企次总数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">900</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓12%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item" onclick="window.homePage.openModal('trend_penalty')" style="cursor: pointer;">
                                    <span class="today-approval-label">行政处罚总数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">100</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓8%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item" onclick="window.homePage.openModal('trend_credit_subject')" style="cursor: pointer;">
                                    <span class="today-approval-label">信用主体总数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">500</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑12%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item" onclick="window.homePage.openModal('transfer_supervision_net')" style="cursor: pointer;">
                                    <span class="today-approval-label">移交监督一张网线索总数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">12</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑20%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-section home-map-section">
                            <div class="home-map-container">
                                <img src="地图.png" class="home-map-image" alt="地图">
                            </div>
                        </div>
                        <div class="card-section home-realtime-section">
                            <div class="card-title-row">
                                <div class="card-title">审管法信流转数据信息</div>
                                <button class="card-title-more" onclick="window.homePage.openModal('flow_data_list')">查看更多</button>
                            </div>
                            <div class="home-realtime-table-container">
                                <table class="home-realtime-table">
                                    <thead>
                                        <tr>
                                            <th>当事人名称</th>
                                            <th>数据类型</th>
                                            <th>推送部门</th>
                                            <th>推送时间</th>
                                            <th>接收部门</th>
                                            <th>接收时间</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>海南XX科技有限公司</td>
                                            <td>审批信息</td>
                                            <td>行政审批局</td>
                                            <td>2026-07-05 10:30</td>
                                            <td>市场监管局</td>
                                            <td>2026-07-05 10:35</td>
                                        </tr>
                                        <tr>
                                            <td>三亚XX贸易有限公司</td>
                                            <td>检查信息</td>
                                            <td>市场监管局</td>
                                            <td>2026-07-05 11:15</td>
                                            <td>综合执法局</td>
                                            <td>2026-07-05 11:20</td>
                                        </tr>
                                        <tr>
                                            <td>海口XX餐饮管理有限公司</td>
                                            <td>违法线索信息</td>
                                            <td>综合执法局</td>
                                            <td>2026-07-05 14:20</td>
                                            <td>市场监管局</td>
                                            <td>2026-07-05 14:25</td>
                                        </tr>
                                        <tr>
                                            <td>文昌XX食品有限公司</td>
                                            <td>审批信息</td>
                                            <td>卫生健康委</td>
                                            <td>2026-07-05 15:45</td>
                                            <td>行政审批局</td>
                                            <td>2026-07-05 15:50</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="home-col-right">
              
                        <div class="card-section home-credit-section">
                            <div class="card-title" onclick="window.screenFrame.switchTab('credit')">信用</div>
                            <div class="home-credit-content">
                                <div class="home-credit-stat-col">
                                    <div class="home-credit-stat-card-vertical" onclick="window.homePage.openModal('credit_b_above')" style="cursor: pointer;">
                                        <span class="home-credit-stat-label">信用等级B级及以上市场主体</span>
                                        <span class="home-credit-stat-value">630.11万户 <span style="font-size:12px;color:#ff3b30;">↑ 5%</span></span>
                                        <span class="home-credit-stat-rate" onclick="window.homePage.openModal('credit_b_ratio'); event.stopPropagation();" style="cursor: pointer;">占比90%</span>
                                    </div>
                                    <div class="home-credit-stat-card-vertical" onclick="window.homePage.openModal('credit_violation_rate')" style="cursor: pointer;">
                                        <span class="home-credit-stat-label">市场主体合规经营比例</span>
                                        <span class="home-credit-stat-value">80% <span style="font-size:12px;color:#ff3b30;">↑ 3.5%</span></span>
                                    </div>
                                </div>
                                <div class="home-credit-chart-item">
                                    <div id="creditPie" class="chart-container"></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-section home-satisfaction-section">
                            <div class="card-title">企业和群众满意度</div>
                            <div class="home-satisfaction-content">
                                <div class="home-satisfaction-item" onclick="window.homePage.openModal('good_bad_rate')" style="cursor: pointer;">
                                    <span class="home-satisfaction-label">"好差评"好评率</span>
                                    <div class="home-satisfaction-value-row">
                                        <span class="home-satisfaction-value">99.96%</span>
                                        <span class="home-satisfaction-trend up">↑ 1%</span>
                                    </div>
                                </div>
                                <div class="home-satisfaction-item" onclick="window.homePage.openModal('enterprise_satisfaction')" style="cursor: pointer;">
                                    <span class="home-satisfaction-label">涉企检查市场主体满意度</span>
                                    <div class="home-satisfaction-value-row">
                                        <span class="home-satisfaction-value">99%</span>
                                        <span class="home-satisfaction-trend up">↑ 1%</span>
                                    </div>
                                </div>
                                <div class="home-satisfaction-item" onclick="window.homePage.openModal('complaint_decrease')" style="cursor: pointer;">
                                    <span class="home-satisfaction-label">涉企监管执法12345投诉下降</span>
                                    <div class="home-satisfaction-value-row">
                                        <span class="home-satisfaction-value">23.33%</span>
                                        <span class="home-satisfaction-trend down">↓ 1%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-section home-flow-data-section">
                            <div class="card-title-row">
                                <div class="card-title">审管法信数据信息流转情况</div>
                                <div class="card-title-right">总数 <span class="card-title-value">10.6万</span></div>
                            </div>
                            <div class="home-flow-data-content">
                                <img src="流动数据总数.png" class="home-flow-data-image" alt="流动数据">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            this.initCharts();
        }, 100);
    }

    initMapViewTabs() {
        const tabs = this.container.querySelectorAll('.map-view-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const view = tab.dataset.view;
                tabs.forEach(t => t.classList.remove('map-view-tab-active'));
                tab.classList.add('map-view-tab-active');
                const images = this.container.querySelectorAll('.map-image');
                images.forEach(img => {
                    if (img.dataset.view === view) {
                        img.classList.remove('map-image-hidden');
                    } else {
                        img.classList.add('map-image-hidden');
                    }
                });
            });
        });
    }

    initCharts() {
        const approvalTypeData = {
            '全部': { items: '9,856', cases: '8,956', days: '1.2天', speed: '85.7%', top3: [
                { dept: '省市场监管局', val: '2,856件' },
                { dept: '省住建厅', val: '1,923件' },
                { dept: '省卫健委', val: '1,456件' }
            ]},
            '高效办成一件事': { items: '2,350', cases: '3,500', days: '0.8天', speed: '92.3%', top3: [
                { dept: '省市场监管局', val: '1,200件' },
                { dept: '省住建厅', val: '980件' },
                { dept: '省税务局', val: '650件' }
            ]},
            '极简审批': { items: '1,800', cases: '2,800', days: '1.0天', speed: '88.5%', top3: [
                { dept: '省公安厅', val: '850件' },
                { dept: '省民政厅', val: '720件' },
                { dept: '省人社厅', val: '610件' }
            ]},
            '智能快办': { items: '1,200', cases: '1,800', days: '0.5天', speed: '95.2%', top3: [
                { dept: '省税务局', val: '680件' },
                { dept: '省市场监管局', val: '520件' },
                { dept: '省人社厅', val: '350件' }
            ]},
            '免申即享': { items: '800', cases: '1,200', days: '0.3天', speed: '97.8%', top3: [
                { dept: '省人社厅', val: '450件' },
                { dept: '省民政厅', val: '380件' },
                { dept: '省卫健委', val: '220件' }
            ]},
            '全省通办': { items: '300', cases: '400', days: '1.5天', speed: '82.1%', top3: [
                { dept: '省公安厅', val: '150件' },
                { dept: '省市场监管局', val: '120件' },
                { dept: '省交通厅', val: '80件' }
            ]},
            '其他': { items: '120', cases: '156', days: '2.5天', speed: '75.3%', top3: [
                { dept: '省教育厅', val: '60件' },
                { dept: '省农业农村厅', val: '50件' },
                { dept: '省文旅厅', val: '30件' }
            ]}
        };
        const allTypes = ['高效办成一件事','极简审批','智能快办','免申即享','全省通办','其他'];
        const updateApprovalPanel = (typeName) => {
            const d = approvalTypeData[typeName] || approvalTypeData['全部'];
            const titleEl = document.getElementById('approval-type-title');
            const itemsEl = document.getElementById('approval-stat-items');
            const casesEl = document.getElementById('approval-stat-cases');
            const daysEl = document.getElementById('approval-stat-days');
            const speedEl = document.getElementById('approval-stat-speed');
            const top3El = document.getElementById('approval-top3-list');
            if (titleEl) titleEl.textContent = typeName;
            if (itemsEl) itemsEl.textContent = d.items;
            if (casesEl) casesEl.textContent = d.cases;
            if (daysEl) daysEl.textContent = d.days;
            if (speedEl) speedEl.textContent = d.speed;
            if (top3El) {
                top3El.innerHTML = d.top3.map((t,i) => `
                    <div class="approval-top3-item">
                        <span class="top3-rank rank-${i+1}">${i+1}</span>
                        <span class="top3-dept">${t.dept}</span>
                        <span class="top3-value">${t.val}</span>
                    </div>
                `).join('');
            }
        };
        let currentApprovalHighlight = -1;
        const approvalPieData = [
            { value: 3500, name: '高效办成一件事', itemStyle: { color: '#ff9500' } },
            { value: 2800, name: '极简审批', itemStyle: { color: '#ff6b30' } },
            { value: 1800, name: '智能快办', itemStyle: { color: '#ff8c00' } },
            { value: 1200, name: '免申即享', itemStyle: { color: '#ffaa00' } },
            { value: 400, name: '全省通办', itemStyle: { color: '#ffbb50' } },
            { value: 156, name: '其他', itemStyle: { color: '#8b8b8b' } }
        ];
        const approvalTotal = approvalPieData.reduce((s,d)=>s+d.value,0);
        const updateApprovalCenter = (idx) => {
            const d = approvalPieData[idx];
            const pct = ((d.value/approvalTotal)*100).toFixed(1);
            window.approvalBar.setOption({
                title: {
                    text: d.name,
                    subtext: `${d.value}件\n${pct}%`,
                    left: '48%',
                    top: '40%',
                    textAlign: 'center',
                    textVerticalAlign: 'middle',
                    textStyle: { color: '#fff', fontSize: 12, fontWeight: 600, lineHeight: 16 },
                    subtextStyle: { color: '#00d4ff', fontSize: 13, fontWeight: 700, lineHeight: 19 }
                }
            });
        };
        const approvalCasePieEl = document.getElementById('approvalCasePie');
        if (approvalCasePieEl) {
            approvalCasePieEl.style.height = '160px';
            window.approvalCasePie = echarts.init(approvalCasePieEl);
            window.approvalCasePie.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}件 ({d}%)' },
                series: [{
                    type: 'pie',
                    radius: ['35%', '65%'],
                    center: ['50%', '50%'],
                    itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 },
                    label: { show: true, fontSize: 11, color: '#fff', formatter: '{b}\n{d}%' },
                    labelLine: { show: true, length: 8, length2: 5 },
                    data: [
                        { value: 280, name: '高效办成一件事', itemStyle: { color: '#4a9eff' } },
                        { value: 220, name: '极简审批', itemStyle: { color: '#00c853' } },
                        { value: 180, name: '智能快办', itemStyle: { color: '#ff9500' } },
                        { value: 120, name: '免申即享', itemStyle: { color: '#ffcc00' } },
                        { value: 100, name: '全省通办', itemStyle: { color: '#af52de' } },
                        { value: 80, name: '信用等级审批', itemStyle: { color: '#ff3b30' } },
                        { value: 20, name: '其他', itemStyle: { color: '#8e8e93' } }
                    ]
                }]
            });
            window.approvalCasePie.resize();
        }

        const approvalSpeedPieEl = document.getElementById('approvalSpeedPie');
        if (approvalSpeedPieEl) {
            approvalSpeedPieEl.style.height = '160px';
            window.approvalSpeedPie = echarts.init(approvalSpeedPieEl);
            window.approvalSpeedPie.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}天 ({d}%)' },
                series: [{
                    type: 'pie',
                    radius: ['35%', '65%'],
                    center: ['50%', '50%'],
                    itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 },
                    label: { show: true, fontSize: 11, color: '#fff', formatter: '{b}\n{d}%' },
                    labelLine: { show: true, length: 8, length2: 5 },
                    data: [
                        { value: 35, name: '减少1-3天', itemStyle: { color: '#34c759' } },
                        { value: 28, name: '减少3-5天', itemStyle: { color: '#00d4ff' } },
                        { value: 22, name: '减少5-7天', itemStyle: { color: '#ff9500' } },
                        { value: 15, name: '减少7天以上', itemStyle: { color: '#ff3b30' } }
                    ]
                }]
            });
            window.approvalSpeedPie.resize();
        }

        const approvalTabItems = this.container.querySelectorAll('.approval-tab-item');
        const approvalSubTabItems = this.container.querySelectorAll('.approval-sub-tab-item');
        const approvalPanels = this.container.querySelectorAll('.approval-panel');
        
        approvalTabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                approvalTabItems.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const tabType = tab.dataset.tab;
                approvalPanels.forEach(panel => {
                    if (panel.id === `approval-${tabType}-panel`) {
                        panel.classList.remove('approval-panel-hidden');
                    } else {
                        panel.classList.add('approval-panel-hidden');
                    }
                });
                setTimeout(() => {
                    if (window.approvalCasePie) window.approvalCasePie.resize();
                    if (window.approvalSpeedPie) window.approvalSpeedPie.resize();
                }, 50);
            });
        });
        
        approvalSubTabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                approvalSubTabItems.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        window.lawTop10 = echarts.init(document.getElementById('lawTop10'));
        window.lawTop10.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '8%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '交通运输', '生态环境', '卫生健康', '文化旅游'], axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13 } },
            series: [{
                type: 'bar',
                data: [120, 95, 78, 65, 55],
                itemStyle: { 
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ff9500' },
                        { offset: 1, color: '#ff6b30' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            }]
        });

        window.creditPie = echarts.init(document.getElementById('creditPie'));
        window.creditPie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}万户 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['45%', '78%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 },
                label: { 
                    show: true, 
                    fontSize: 12, 
                    color: '#fff',
                    formatter: (p) => `${p.value}万户\n${p.percent}%`
                },
                emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
                labelLine: { show: true, length: 9, length2: 5 },
                data: [
                    { value: 280.05, name: 'A级', itemStyle: { color: '#ffcc00' } },
                    { value: 350.06, name: 'B级', itemStyle: { color: '#ff7f50' } },
                    { value: 45.05, name: 'C级', itemStyle: { color: '#ff9500' } },
                    { value: 20.05, name: 'D级', itemStyle: { color: '#ff3b30' } }
                ]
            }]
        });

        window.supervisionMethodPie = echarts.init(document.getElementById('supervisionMethodPie'));
        window.supervisionMethodPie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.65)', fontSize: 11 },
            tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
            legend: { 
                data: ['双随机一公开', '重点检查', '专项检查', '有因检查', '综合查一次'],
                textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                top: '2%',
                right: '3%',
                itemWidth: 10,
                itemHeight: 9
            },
            grid: { left: '9%', right: '4%', bottom: '8%', top: '24%', containLabel: true },
            xAxis: { 
                type: 'category', 
                data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                axisLabel: { fontSize: 11 },
                axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
                axisTick: { show: false }
            },
            yAxis: { 
                type: 'value', 
                axisLabel: { formatter: '{value}', fontSize: 11, margin: 4 },
                axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
            },
            series: [
                { name: '双随机一公开', type: 'line', smooth: false, symbol: 'circle', symbolSize: 5, data: [95, 72, 88, 65, 82, 98], lineStyle: { color: '#ff9500', width: 2 }, itemStyle: { color: '#ff9500' } },
                { name: '重点检查', type: 'line', smooth: false, symbol: 'circle', symbolSize: 5, data: [50, 85, 45, 78, 55, 48], lineStyle: { color: '#ffcc00', width: 2 }, itemStyle: { color: '#ffcc00' } },
                { name: '专项检查', type: 'line', smooth: false, symbol: 'circle', symbolSize: 5, data: [35, 55, 72, 42, 68, 38], lineStyle: { color: '#00d4ff', width: 2 }, itemStyle: { color: '#00d4ff' } },
                { name: '有因检查', type: 'line', smooth: false, symbol: 'circle', symbolSize: 5, data: [20, 35, 52, 25, 48, 18], lineStyle: { color: '#af52de', width: 2 }, itemStyle: { color: '#af52de' } },
                { name: '综合查一次', type: 'line', smooth: false, symbol: 'circle', symbolSize: 5, data: [10, 28, 45, 32, 55, 22], lineStyle: { color: '#00ff88', width: 2 }, itemStyle: { color: '#00ff88' } }
            ]
        });

        window.addEventListener('resize', () => {
            try { window.approvalCasePie.resize(); } catch(e) {}
            try { window.approvalSpeedPie.resize(); } catch(e) {}
            try { window.lawTop10.resize(); } catch(e) {}
            try { window.creditPie.resize(); } catch(e) {}
            try { window.supervisionMethodPie.resize(); } catch(e) {}
            try { window.problemRateBar.resize(); } catch(e) {}
            try { window.avgTimeBar.resize(); } catch(e) {}
        });
    }

    bindAchievementCardEvents() {
        // 绑定卡片点击
        const cards = this.container.querySelectorAll('.achievement-card[data-modal]');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // 如果点击的是行内的元素，不触发卡片点击
                if (e.target.closest('[data-modal]') !== card) return;
                const modalType = card.dataset.modal;
                this.openModal(modalType);
            });
        });
        
        // 绑定行内点击
        const rows = this.container.querySelectorAll('.achievement-row[data-modal], .achievement-desc[data-modal]');
        rows.forEach(row => {
            row.addEventListener('click', () => {
                const modalType = row.dataset.modal;
                this.openModal(modalType);
            });
        });

        // 绑定风险预警动态监测指标点击
        const statItems = this.container.querySelectorAll('.highlight-num[data-modal]');
        statItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const modalType = item.dataset.modal;
                this.openModal(modalType);
            });
        });
    }

    // ==================== 弹窗系统 ====================
    openPanoramaModal() {
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        overlay.innerHTML = `
            <div class="panorama-modal">
                <div class="panorama-modal-header">
                    <span class="panorama-modal-title">简介</span>
                    <button class="panorama-modal-close">×</button>
                </div>
                <div class="panorama-modal-tabs">
                    <div class="panorama-modal-tab active" data-tab="intro">简介</div>
                    <div class="panorama-modal-tab" data-tab="panorama">审管法信全景图</div>
                    <div class="panorama-modal-tab" data-tab="flow">审管法信流程图</div>
                </div>
                <div class="panorama-modal-content">
                    <div class="panorama-modal-tab-content active" id="tab-intro">
                        <p>审管法信一体化监管平台旨在整合审批、监管、执法、信用等业务数据，构建全流程、全周期的智能化监管体系。通过数据共享和业务协同，实现监管事项的精准推送、监管行为的规范记录、执法办案的高效协同，以及信用信息的全面应用，推动监管模式从传统向智能化、精细化转变。</p>
                    </div>
                    <div class="panorama-modal-tab-content" id="tab-panorama">
                        <img src="全景图.gif" class="panorama-image" alt="全景图">
                    </div>
                    <div class="panorama-modal-tab-content" id="tab-flow">
                        <img src="流程图.gif" class="panorama-image" alt="流程图">
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        overlay.querySelector('.panorama-modal-close').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        overlay.querySelectorAll('.panorama-modal-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                overlay.querySelectorAll('.panorama-modal-tab').forEach(t => t.classList.remove('active'));
                overlay.querySelectorAll('.panorama-modal-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
            });
        });
    }

    openModal(type) {
        this.currentModalType = type;
        this.currentPage = 1;
        this.pageSize = 5;
        
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        
        switch(type) {
            case 'approval_compress':
                overlay.innerHTML = this.renderApprovalCompressModal();
                break;
            case 'approval_efficiency':
                overlay.innerHTML = this.renderApprovalEfficiencyModal();
                break;
            case 'info_share_field':
                overlay.innerHTML = this.renderInfoShareFieldModal();
                break;
            case 'info_share_dept':
                overlay.innerHTML = this.renderInfoShareDeptModal();
                break;
            case 'info_share_trend':
                overlay.innerHTML = this.renderInfoShareTrendModal();
                break;
            case 'info_share_rate':
                overlay.innerHTML = this.renderInfoShareRateModal();
                break;
            case 'approval_supervision':
                overlay.innerHTML = this.renderApprovalSupervisionModal();
                break;
            case 'task_push':
                overlay.innerHTML = this.renderTaskPushModal();
                break;
            case 'push_rate':
                overlay.innerHTML = this.renderPushRateModal();
                break;
            case 'penalty_transfer':
                overlay.innerHTML = this.renderPenaltyTransferModal();
                break;
            case 'transfer_rate':
                overlay.innerHTML = this.renderTransferRateModal();
                break;
            case 'credit_service':
                overlay.innerHTML = this.renderCreditServiceModal();
                break;
            case 'credit_coverage':
                overlay.innerHTML = this.renderCreditCoverageModal();
                break;
            case 'credit_verify':
                overlay.innerHTML = this.renderCreditVerifyModal();
                break;
            case 'credit_b_above':
                overlay.innerHTML = this.renderCreditBAboveModal();
                break;
            case 'credit_b_ratio':
                overlay.innerHTML = this.renderCreditBRatioModal();
                break;
            case 'compliance_rate':
                overlay.innerHTML = this.renderComplianceRateModal();
                break;
            case 'violation_rate':
                overlay.innerHTML = this.renderViolationRateModal();
                break;
            case 'risk_warning':
                overlay.innerHTML = this.renderRiskWarningModal();
                break;
            case 'risk_disposal_rate':
                overlay.innerHTML = this.renderRiskDisposalRateModal();
                break;
            case 'new_market':
                overlay.innerHTML = this.renderNewMarketModal();
                break;
            case 'startup_time':
                overlay.innerHTML = this.renderStartupTimeModal();
                break;
            case 'new_project':
                overlay.innerHTML = this.renderNewProjectModal();
                break;
            case 'project_approval':
                overlay.innerHTML = this.renderProjectApprovalModal();
                break;
            case 'project_landing':
                overlay.innerHTML = this.renderProjectLandingModal();
                break;
            case 'yearly_add':
                overlay.innerHTML = this.renderYearlyAddModal();
                break;
            case 'yearly_remove':
                overlay.innerHTML = this.renderYearlyRemoveModal();
                break;
            case 'good_bad_rate':
                overlay.innerHTML = this.renderGoodBadRateModal();
                break;
            case 'enterprise_satisfaction':
                overlay.innerHTML = this.renderEnterpriseSatisfactionModal();
                break;
            case 'complaint_decrease':
                overlay.innerHTML = this.renderComplaintDecreaseModal();
                break;
            case 'tech_total':
                overlay.innerHTML = this.renderTechTotalModal();
                break;
            case 'tech_new':
                overlay.innerHTML = this.renderTechNewModal();
                break;
            case 'tech_growth':
                overlay.innerHTML = this.renderTechGrowthModal();
                break;
            case 'special_total':
                overlay.innerHTML = this.renderSpecialTotalModal();
                break;
            case 'special_new':
                overlay.innerHTML = this.renderSpecialNewModal();
                break;
            case 'special_growth':
                overlay.innerHTML = this.renderSpecialGrowthModal();
                break;
            case 'giant_total':
                overlay.innerHTML = this.renderGiantTotalModal();
                break;
            case 'giant_new':
                overlay.innerHTML = this.renderGiantNewModal();
                break;
            case 'giant_growth':
                overlay.innerHTML = this.renderGiantGrowthModal();
                break;
            case 'supervision_behavior_total':
                overlay.innerHTML = this.renderSupervisionBehaviorTotalModal();
                break;
            case 'supervision_problem_rate':
                overlay.innerHTML = this.renderSupervisionProblemRateModal();
                break;
            case 'supervision_visit_reduction':
                overlay.innerHTML = this.renderSupervisionVisitReductionModal();
                break;
            case 'supervision_transfer_clues':
                overlay.innerHTML = this.renderSupervisionTransferCluesModal();
                break;
            case 'law_case_source':
                overlay.innerHTML = this.renderLawCaseSourceModal();
                break;
            case 'law_case_rate':
                overlay.innerHTML = this.renderLawCaseRateModal();
                break;
            case 'law_major_case_ratio':
                overlay.innerHTML = this.renderLawMajorCaseRatioModal();
                break;
            case 'credit_b_above':
                overlay.innerHTML = this.renderCreditBAboveNewModal();
                break;
            case 'credit_b_ratio':
                overlay.innerHTML = this.renderCreditBRatioNewModal();
                break;
            case 'credit_violation_rate':
                overlay.innerHTML = this.renderCreditViolationRateModal();
                break;
            case 'avg_process_time':
                overlay.innerHTML = this.renderAvgProcessTimeModal();
                break;
            case 'project_approval_landing':
                overlay.innerHTML = this.renderProjectApprovalLandingModal();
                break;
            case 'admin_check_year_on_year':
                overlay.innerHTML = this.renderAdminCheckYearOnYearModal();
                break;
            case 'first_offense_exemption':
                overlay.innerHTML = this.renderFirstOffenseExemptionModal();
                break;
            case 'transfer_supervision_net':
                overlay.innerHTML = this.renderTransferSupervisionNetModal();
                break;
            case 'offsite_supervision':
                overlay.innerHTML = this.renderOffsiteSupervisionModal();
                break;
            case 'bright_kitchen':
                overlay.innerHTML = this.renderBrightKitchenModal();
                break;
            case 'sand_theft':
                overlay.innerHTML = this.renderSandTheftModal();
                break;
            case 'sandbox_supervision':
                overlay.innerHTML = this.renderSandboxSupervisionModal();
                break;
            case 'trigger_supervision':
                overlay.innerHTML = this.renderTriggerSupervisionModal();
                break;
            case 'lecheng_medical':
                overlay.innerHTML = this.renderLechengMedicalModal();
                break;
            case 'nfan_breeding':
                overlay.innerHTML = this.renderNfanBreedingModal();
                break;
            case 'network_public_opinion':
                overlay.innerHTML = this.renderNetworkPublicOpinionModal();
                break;
            case 'safety_production':
                overlay.innerHTML = this.renderSafetyProductionModal();
                break;
            case 'eco_environment':
                overlay.innerHTML = this.renderEcoEnvironmentModal();
                break;
            case 'trend_approval_case':
                overlay.innerHTML = this.renderTrendAnalysisModal({
                    title: '审批办件总量趋势分析',
                    unit: '件',
                    mainType: 'bar',
                    tableTitle: '审批办件明细列表',
                    kpis: [
                        { label: '审批办件总量', value: '900', suffix: '件' },
                        { label: '去年同期', value: '1,059', suffix: '件' },
                        { label: '同比减少', value: '159', suffix: '件' },
                        { label: '同比下降', value: '15%', highlight: 'down' }
                    ],
                    trendTitle: '审批办件最多的领域 TOP10',
                    topBarData: {
                        x: ['市场监管','住建','卫健','交通','生态环境','农业农村','应急管理','税务','文旅','海关'],
                        y: [180, 150, 120, 100, 90, 80, 70, 60, 50, 40]
                    },
                    pieTitle: '审批类型分布',
                    pieData: [
                        { value: 420, name: '行政许可',   itemStyle: { color: '#4a9eff' } },
                        { value: 260, name: '行政确认',   itemStyle: { color: '#ff7f50' } },
                        { value: 150, name: '公共服务',   itemStyle: { color: '#ffcc00' } },
                        { value: 70,  name: '其他',       itemStyle: { color: '#af52de' } }
                    ],
                    table: {
                        header: ['办件编号', '办件类型', '当事人名称', '事项名称', '审批部门', '审批时间'],
                        rows: [
                            ['SP2026070015','行政许可','海南XX科技有限公司','互联网信息服务许可','海南省工信厅','2026-07-12 10:23'],
                            ['SP2026070014','行政确认','三亚XX农业合作社','绿色食品认证','海南省农业农村厅','2026-07-12 09:51'],
                            ['SP2026070013','公共服务','王XX','社保转移接续','海口市社保局','2026-07-11 16:40'],
                            ['SP2026070012','行政许可','海口XX建筑公司','建筑业企业资质变更','海南省住建厅','2026-07-11 14:02'],
                            ['SP2026070011','其他','李XX','医师执业地点变更','海南省卫健委','2026-07-11 11:18'],
                            ['SP2026070010','行政许可','儋州XX食品厂','食品生产许可','儋州市市场监管局','2026-07-10 17:05'],
                            ['SP2026070009','行政确认','文昌XX养殖基地','水产种苗生产条件确认','海南省农业农村厅','2026-07-10 15:20'],
                            ['SP2026070008','公共服务','张XX','不动产登记信息查询','琼海市自然资源局','2026-07-10 10:33'],
                            ['SP2026070007','行政许可','万宁XX药业公司','药品经营许可','海南省药监局','2026-07-09 16:11'],
                            ['SP2026070006','行政确认','东方XX物流公司','道路运输车辆达标核查','海南省交通厅','2026-07-09 14:29'],
                            ['SP2026070005','行政许可','澄迈XX酒店','公共场所卫生许可','澄迈县卫健委','2026-07-09 09:47'],
                            ['SP2026070004','公共服务','刘XX','社保缴纳证明打印','三亚市社保局','2026-07-08 17:30'],
                            ['SP2026070003','行政许可','五指山XX矿业公司','采矿权延续','海南省自然资源厅','2026-07-08 13:58'],
                            ['SP2026070002','行政确认','定安XX合作社','农机购置补贴资格确认','定安县农业农村局','2026-07-08 10:15'],
                            ['SP2026070001','其他','陈XX','教师资格定期注册','海南省教育厅','2026-07-08 09:22']
                        ]
                    }
                });
                break;
            case 'trend_inspection_times':
                overlay.innerHTML = this.renderTrendAnalysisModal({
                    title: '检查企次总量趋势分析',
                    unit: '次',
                    mainType: 'bar',
                    tableTitle: '检查企次明细列表',
                    kpis: [
                        { label: '检查企次总量', value: '900', suffix: '次' },
                        { label: '去年同期', value: '1,023', suffix: '次' },
                        { label: '同比减少', value: '123', suffix: '次' },
                        { label: '同比下降', value: '12%', highlight: 'down' }
                    ],
                    trendTitle: '检查企次最多的领域 TOP10',
                    topBarData: {
                        x: ['市场监管','应急管理','生态环境','交通运输','卫健','住建','农业农村','文旅','海关','税务'],
                        y: [170, 150, 130, 110, 100, 90, 80, 70, 60, 50]
                    },
                    pieTitle: '检查类型分布',
                    pieData: [
                        { value: 410, name: '日常监管',   itemStyle: { color: '#4a9eff' } },
                        { value: 220, name: '专项检查',   itemStyle: { color: '#ff7f50' } },
                        { value: 180, name: '双随机',     itemStyle: { color: '#00c853' } },
                        { value: 90,  name: '重点检查',   itemStyle: { color: '#ffcc00' } }
                    ],
                    table: {
                        header: ['任务编码', '当事人名称', '检查部门', '检查事项', '检查时间'],
                        rows: [
                            ['JC2026070099','海口XX餐饮管理公司','海口市市场监管局','餐饮服务食品安全日常检查','2026-07-12 11:20'],
                            ['JC2026070098','三亚XX酒店','三亚市综合执法局','公共场所消防重点检查','2026-07-12 10:08'],
                            ['JC2026070097','海南XX建筑工程公司','海南省住建厅','工程质量专项检查','2026-07-11 16:45'],
                            ['JC2026070096','儋州XX物流有限公司','儋州市交通局','道路运输车辆双随机检查','2026-07-11 15:10'],
                            ['JC2026070095','文昌XX水产冷冻厂','文昌市市场监管局','特种设备安全日常检查','2026-07-11 10:28'],
                            ['JC2026070094','琼海XX医药连锁','海南省药监局','药品经营质量专项检查','2026-07-10 17:02'],
                            ['JC2026070093','万宁XX娱乐城','万宁市综合执法局','娱乐场所经营行为重点检查','2026-07-10 15:38'],
                            ['JC2026070092','东方XX加油站','海南省应急管理厅','危化品经营安全双随机检查','2026-07-10 10:55'],
                            ['JC2026070091','澄迈XX科技有限公司','澄迈县税务局','纳税申报情况日常检查','2026-07-09 16:22'],
                            ['JC2026070090','五指山XX农场','海南省农业农村厅','农产品质量专项检查','2026-07-09 14:40'],
                            ['JC2026070089','定安XX自来水厂','定安县卫健委','生活饮用水卫生日常检查','2026-07-09 11:05'],
                            ['JC2026070088','临高XX建筑工程','海南省生态环境厅','工地扬尘污染专项检查','2026-07-08 17:18'],
                            ['JC2026070087','陵水XX海鲜排档','陵水县市场监管局','明码标价重点检查','2026-07-08 14:50'],
                            ['JC2026070086','昌江XX水泥厂','昌江县生态环境局','污染物排放双随机检查','2026-07-08 10:33'],
                            ['JC2026070085','屯昌XX燃气公司','屯昌县综合执法局','燃气站点安全日常检查','2026-07-08 09:15']
                        ]
                    }
                });
                break;
            case 'trend_penalty':
                overlay.innerHTML = this.renderTrendAnalysisModal({
                    title: '行政处罚总量趋势分析',
                    unit: '件',
                    mainType: 'bar',
                    tableTitle: '行政处罚案件明细列表',
                    kpis: [
                        { label: '行政处罚总量', value: '100', suffix: '件' },
                        { label: '去年同期', value: '109', suffix: '件' },
                        { label: '同比减少', value: '9', suffix: '件' },
                        { label: '同比下降', value: '8%', highlight: 'down' }
                    ],
                    trendTitle: '行政处罚最多的领域 TOP10',
                    topBarData: {
                        x: ['市场监管','城市管理','生态环境','交通运输','卫健','应急管理','农业农村','税务','文旅','海关'],
                        y: [25, 22, 20, 18, 15, 14, 12, 10, 9, 7]
                    },
                    pieTitle: '处罚类型分布',
                    pieData: [
                        { value: 36, name: '警告',             itemStyle: { color: '#ffcc00' } },
                        { value: 28, name: '罚款',             itemStyle: { color: '#ff7f50' } },
                        { value: 15, name: '没收违法所得',     itemStyle: { color: '#e53935' } },
                        { value: 12, name: '暂扣许可证',       itemStyle: { color: '#7e57c2' } },
                        { value: 9,  name: '其他',             itemStyle: { color: '#4a9eff' } }
                    ],
                    table: {
                        header: ['案件编号', '当事人类型', '执法事项', '执法部门', '立案时间'],
                        rows: [
                            ['CF2026070100','企业法人','无照经营','海口市市场监管局','2026-07-12 09:30'],
                            ['CF2026070099','个体工商户','销售过期食品','三亚市综合执法局','2026-07-11 16:52'],
                            ['CF2026070098','自然人','违反交通信号灯','儋州市交警支队','2026-07-11 14:08'],
                            ['CF2026070097','企业法人','超标排放污染物','海南省生态环境厅','2026-07-11 10:18'],
                            ['CF2026070096','其他组织','违规占道经营','文昌市综合执法局','2026-07-10 17:35'],
                            ['CF2026070095','企业法人','未按规定保存经营台账','琼海市市场监管局','2026-07-10 15:02'],
                            ['CF2026070094','个体工商户','擅自变更登记事项','万宁市市场监管局','2026-07-10 11:48'],
                            ['CF2026070093','企业法人','安全生产管理制度缺失','东方市应急管理局','2026-07-09 16:25'],
                            ['CF2026070092','自然人','未取得驾驶证驾驶机动车','澄迈县交警大队','2026-07-09 14:10'],
                            ['CF2026070091','企业法人','虚假广告宣传','五指山市市场监管局','2026-07-09 09:55'],
                            ['CF2026070090','企业法人','偷逃税款','定安县税务局','2026-07-08 17:03'],
                            ['CF2026070089','个体工商户','未经许可从事餐饮服务','临高县综合执法局','2026-07-08 15:20'],
                            ['CF2026070088','自然人','非法采砂','海南省综合执法局','2026-07-08 11:36'],
                            ['CF2026070087','企业法人','经营不合格化妆品','陵水县市场监管局','2026-07-08 09:45'],
                            ['CF2026070086','其他组织','违反价格管理规定','昌江县综合执法局','2026-07-07 16:18']
                        ]
                    }
                });
                break;
            case 'trend_credit_subject':
                overlay.innerHTML = this.renderTrendAnalysisModal({
                    title: '信用主体总量趋势分析',
                    unit: '个',
                    mainType: 'bar',
                    tableTitle: '信用主体明细列表',
                    kpis: [
                        { label: '信用主体总量', value: '500', suffix: '个' },
                        { label: '去年同期', value: '568', suffix: '个' },
                        { label: '同比减少', value: '68', suffix: '个' },
                        { label: '同比下降', value: '12%', highlight: 'down' }
                    ],
                    trendTitle: '信用主体数最多的领域 TOP10',
                    topBarData: {
                        x: ['市场监管','发改','金融监管','住建','交通运输','卫健','农业农村','文旅','应急管理','税务'],
                        y: [120, 100, 90, 80, 70, 65, 60, 55, 50, 45]
                    },
                    pieTitle: '信用等级分布',
                    pieData: [
                        { value: 225, name: 'A级', itemStyle: { color: '#ffcc00' } },
                        { value: 200, name: 'B级', itemStyle: { color: '#4a9eff' } },
                        { value: 50,  name: 'C级', itemStyle: { color: '#ff9500' } },
                        { value: 25,  name: 'D级', itemStyle: { color: '#ff3b30' } }
                    ],
                    table: {
                        header: ['主体名称', '信用等级', '评定时间', '评定部门'],
                        rows: [
                            ['海南XX科技有限公司','A级','2026-07-10','海南省发改委'],
                            ['三亚XX农业合作社','A级','2026-07-09','三亚市发改委'],
                            ['海口XX建筑公司','B级','2026-07-08','海南省住建厅'],
                            ['儋州XX食品厂','A级','2026-07-08','儋州市市场监管局'],
                            ['文昌XX养殖基地','B级','2026-07-07','海南省农业农村厅'],
                            ['琼海XX医药连锁公司','A级','2026-07-06','海南省药监局'],
                            ['万宁XX娱乐城','C级','2026-07-05','万宁市综合执法局'],
                            ['东方XX加油站','B级','2026-07-05','海南省应急管理厅'],
                            ['澄迈XX科技有限公司','A级','2026-07-04','澄迈县发改委'],
                            ['五指山XX农场','B级','2026-07-03','海南省农业农村厅'],
                            ['定安XX自来水厂','A级','2026-07-02','定安县发改委'],
                            ['临高XX建筑工程公司','D级','2026-07-02','海南省住建厅'],
                            ['陵水XX海鲜排档','C级','2026-07-01','陵水县综合执法局'],
                            ['昌江XX水泥厂','B级','2026-07-01','海南省生态环境厅'],
                            ['屯昌XX燃气公司','A级','2026-06-30','屯昌县发改委']
                        ]
                    }
                });
                break;
            case 'flow_data_list':
                this.pageSize = 10;
                overlay.innerHTML = this.renderFlowDataListModal();
                break;
        }
        
        document.body.appendChild(overlay);
        
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal();
            }
        });
        
        this.initModalCharts(type);
    }

    closeModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) overlay.remove();
    }

    renderFlowDataListModal() {
        return `
            <div class="indicator-modal" style="width: 90%; max-width: 1200px;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">审管法信流动数据</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">流动数据总数</span>
                        <span class="indicator-stat-value">10.6万</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日新增</span>
                        <span class="indicator-stat-value">128</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">涉及部门数</span>
                        <span class="indicator-stat-value">45个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">涉及企业数</span>
                        <span class="indicator-stat-value">3,892家</span>
                    </div>
                </div>
                <div class="indicator-modal-filter">
                    <div class="indicator-filter-item">
                        <label>数据类型:</label>
                        <select class="indicator-filter-select" id="flow-filter-type">
                            <option value="">全部</option>
                            <option value="审批信息">审批信息</option>
                            <option value="检查信息">检查信息</option>
                            <option value="违法线索信息">违法线索信息</option>
                            <option value="处罚信息">处罚信息</option>
                        </select>
                    </div>
                    <div class="indicator-filter-item">
                        <label>推送部门:</label>
                        <select class="indicator-filter-select" id="flow-filter-sender">
                            <option value="">全部</option>
                            <option value="市场监管局">市场监管局</option>
                            <option value="综合执法局">综合执法局</option>
                            <option value="卫生健康委">卫生健康委</option>
                            <option value="自然资源局">自然资源局</option>
                        </select>
                    </div>
                    <div class="indicator-filter-item">
                        <label>接收部门:</label>
                        <select class="indicator-filter-select" id="flow-filter-receiver">
                            <option value="">全部</option>
                            <option value="行政审批局">行政审批局</option>
                            <option value="综合执法局">综合执法局</option>
                            <option value="市场监管局">市场监管局</option>
                        </select>
                    </div>
                    <button class="indicator-filter-btn" onclick="window.homePage.filterFlowData()">查询</button>
                </div>
                <div class="indicator-modal-list">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>当事人名称</th>
                                <th>推送数据类型</th>
                                <th>推送部门</th>
                                <th>推送时间</th>
                                <th>接收部门</th>
                                <th>接收时间</th>
                            </tr>
                        </thead>
                        <tbody id="flow-data-list-body">
                            ${this.generateFlowDataTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn" onclick="window.homePage.prevPage()">上一页</button>
                        <span class="indicator-pagination-info">第 ${this.currentPage} 页 / 共 1060 页</span>
                        <button class="indicator-pagination-btn" onclick="window.homePage.nextPage()">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateFlowDataTableRows() {
        const flowData = [
            { name: '海南XX科技有限公司', type: '审批信息', sender: '市场监管局', sendTime: '2026-07-05 10:30', receiver: '行政审批局', receiveTime: '2026-07-05 10:35' },
            { name: '三亚XX贸易有限公司', type: '检查信息', sender: '市场监管局', sendTime: '2026-07-05 11:15', receiver: '综合执法局', receiveTime: '2026-07-05 11:20' },
            { name: '海口XX餐饮管理有限公司', type: '违法线索信息', sender: '综合执法局', sendTime: '2026-07-05 14:20', receiver: '市场监管局', receiveTime: '2026-07-05 14:25' },
            { name: '文昌XX食品有限公司', type: '审批信息', sender: '卫生健康委', sendTime: '2026-07-05 15:45', receiver: '行政审批局', receiveTime: '2026-07-05 15:50' },
            { name: '万宁XX建材有限公司', type: '检查信息', sender: '自然资源局', sendTime: '2026-07-05 16:30', receiver: '综合执法局', receiveTime: '2026-07-05 16:35' },
            { name: '琼海XX旅游有限公司', type: '处罚信息', sender: '综合执法局', sendTime: '2026-07-05 17:00', receiver: '市场监管局', receiveTime: '2026-07-05 17:05' },
            { name: '五指山XX农业有限公司', type: '审批信息', sender: '农业农村局', sendTime: '2026-07-05 17:30', receiver: '行政审批局', receiveTime: '2026-07-05 17:35' },
            { name: '东方XX能源有限公司', type: '检查信息', sender: '生态环境局', sendTime: '2026-07-05 18:00', receiver: '综合执法局', receiveTime: '2026-07-05 18:05' },
            { name: '定安XX物流有限公司', type: '违法线索信息', sender: '交通运输局', sendTime: '2026-07-05 18:30', receiver: '综合执法局', receiveTime: '2026-07-05 18:35' },
            { name: '澄迈XX科技有限公司', type: '审批信息', sender: '科技厅', sendTime: '2026-07-05 19:00', receiver: '行政审批局', receiveTime: '2026-07-05 19:05' }
        ];
        
        let html = '';
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        
        for (let i = start; i < end && i < flowData.length; i++) {
            const item = flowData[i];
            html += `
                <tr>
                    <td>${i + 1}</td>
                    <td><span class="flow-data-name" onclick="window.homePage.showEnterpriseProfile('${item.name}')" style="cursor: pointer; color: #00d4ff; text-decoration: underline;">${item.name}</span></td>
                    <td>${item.type}</td>
                    <td>${item.sender}</td>
                    <td>${item.sendTime}</td>
                    <td>${item.receiver}</td>
                    <td>${item.receiveTime}</td>
                </tr>
            `;
        }
        
        return html;
    }

    filterFlowData() {
        const type = document.getElementById('flow-filter-type').value;
        const sender = document.getElementById('flow-filter-sender').value;
        const receiver = document.getElementById('flow-filter-receiver').value;
        this.currentPage = 1;
        const tbody = document.getElementById('flow-data-list-body');
        if (tbody) {
            tbody.innerHTML = this.generateFlowDataTableRows();
        }
    }

    showEnterpriseProfile(name) {
        this.closeModal();
        this.openObjectProfileModal(name);
    }

    // 弹窗一：审批时限压缩成效分析
    renderApprovalCompressModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">审批时限压缩成效分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">整体压缩率</span>
                        <span class="indicator-stat-value">90%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">原平均办理时限</span>
                        <span class="indicator-stat-value">20天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">现平均办理时限</span>
                        <span class="indicator-stat-value">1.2天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计节省天数</span>
                        <span class="indicator-stat-value">9,856天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计减少跑动次数</span>
                        <span class="indicator-stat-value">2,912次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各维度时限压缩率雷达图</span>
                        <div id="modal-radar-1" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各事项压缩幅度情况</span>
                        <div id="modal-bar-1" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>事项名称</th>
                                <th>事项类型</th>
                                <th>原办理时限（天）</th>
                                <th>现办理时限（天）</th>
                                <th>压缩率（%）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCompressTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn" onclick="window.homePage.prevPage()">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 5 页</span>
                        <button class="indicator-pagination-btn" onclick="window.homePage.nextPage()">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCompressTableRows() {
        const allItems = [
            { name: '企业设立登记', type: '行政许可', original: 20, current: 0.5, rate: 97.5 },
            { name: '食品经营许可', type: '行政许可', original: 20, current: 1, rate: 95 },
            { name: '建筑工程施工许可', type: '行政许可', original: 15, current: 1, rate: 93.3 },
            { name: '排污许可证核发', type: '行政许可', original: 20, current: 2, rate: 90 },
            { name: '医疗机构执业许可', type: '行政许可', original: 45, current: 5, rate: 88.9 },
            { name: '危险化学品经营许可', type: '行政许可', original: 30, current: 3, rate: 90 },
            { name: '道路运输经营许可', type: '行政许可', original: 20, current: 1, rate: 95 },
            { name: '特种设备使用登记', type: '行政许可', original: 15, current: 0.5, rate: 96.7 },
            { name: '医疗器械经营许可', type: '行政许可', original: 30, current: 3, rate: 90 },
            { name: '药品经营许可证核发', type: '行政许可', original: 45, current: 5, rate: 88.9 }
        ];
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.original}</td>
                <td>${item.current}</td>
                <td>${item.rate}%</td>
            </tr>
        `).join('');
    }

    // 弹窗二：审批效率分析
    renderApprovalEfficiencyModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">审批效率分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">平均办结时限</span>
                        <span class="indicator-stat-value">1.2天</span>
                    </div>
                   
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">最快办结</span>
                        <span class="indicator-stat-value">5分钟</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">最慢办结</span>
                        <span class="indicator-stat-value">45分钟</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各维度平均办理时限（分钟）</span>
                        <div id="modal-radar-2" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">办结时限分布</span>
                        <div id="modal-pie-2" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>事项名称</th>
                                <th>事项类型</th>
                                <th>平均办理时限（分钟）</th>
                                <th>最快办结（分钟）</th>
                                <th>最慢办结（分钟）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateEfficiencyTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 5 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateEfficiencyTableRows() {
        const allItems = [
            { name: '企业名称预先核准', type: '高效办成一件事', time: 5, instant: '2', level: '20' },
            { name: '营业执照补发', type: '便民简证', time: 8, instant: '4', level: '20' },
            { name: '食品经营许可新办', type: '极简审批', time: 15, instant: '10', level: '20' },
            { name: '公共场所卫生许可', type: '智能快办', time: 12, instant: '4', level: '20' },
            { name: '劳务派遣经营许可', type: '免申即享', time: 25, instant: '10', level: '40' },
            { name: '危险化学品许可', type: '全省通办', time: 35, instant: '15', level: '50' },
            { name: '建筑施工许可', type: '极简审批', time: 20, instant: '10', level: '60' },
            { name: '特种设备登记', type: '智能快办', time: 10, instant: '4', level: '20' },
            { name: '医疗器械备案', type: '智能快办', time: 18, instant: '8', level: '30' },
            { name: '进出口权备案', type: '智能快办', time: 22, instant: '12', level: '50' }
        ];
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td>${item.instant}</td>
                <td>${item.level}</td>
            </tr>
        `).join('');
    }

    // 弹窗三：信息共享领域全景分析
    renderInfoShareFieldModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信息共享领域全景分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">覆盖领域总数</span>
                        <span class="indicator-stat-value">45个</span>
                    </div>
                
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">信息共享率</span>
                        <span class="indicator-stat-value">100%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计数据共享量</span>
                        <span class="indicator-stat-value">199.01万件次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域共享信息量情况</span>
                        <div id="modal-field-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">共享数据类型分类占比</span>
                        <div id="modal-field-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>领域名称</th>
                                <th>共享信息量（件次）</th>
                                <th>涉及部门数</th>
                                <th>共享率（%）</th>
                                <th>主要共享数据类型</th>
                                <th>最近共享时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateInfoShareFieldTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 9 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateInfoShareFieldTableRows() {
        const fields = ['市场监管', '交通运输', '生态环境', '卫生健康', '文化旅游', '应急管理', '税务', '海关', '人力资源', '农业农村', '自然资源', '住建', '教育', '科技', '民政', '公安', '财政', '审计', '统计', '发改', '商务', '工信', '司法', '信访', '国防', '体育', '水利', '林业', '气象', '地震', '邮政', '通信', '电力', '燃气', '供水', '供热', '环保', '医疗', '社保', '就业', '物价', '质检', '药监', '烟草', '粮食'];
        const dataTypes = ['许可信息', '监管信息', '执法信息', '信用信息', '备案信息'];
        const allItems = [];
        for (let i = 1; i <= 45; i++) {
            const shareCount = Math.floor(Math.random() * 5000 + 500);
            allItems.push({
                field: fields[i - 1],
                count: shareCount,
                deptCount: Math.floor(Math.random() * 20 + 5),
                rate: 100,
                dataType: dataTypes[i % 5],
                time: `2024-0${i % 12 + 1}-15`
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.field}</td>
                <td>${item.count.toLocaleString()}</td>
                <td>${item.deptCount}</td>
                <td>${item.rate}</td>
                <td>${item.dataType}</td>
                <td>${item.time}</td>
            </tr>
        `).join('');
    }

    // 弹窗四：信息共享部门全景分析
    renderInfoShareDeptModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信息共享部门全景分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">覆盖部门总数</span>
                        <span class="indicator-stat-value">1,909个</span>
                    </div>
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">信息共享率</span>
                        <span class="indicator-stat-value">100%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">平均每部门共享量</span>
                        <span class="indicator-stat-value">238件次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各部门共享信息量情况</span>
                        <div id="modal-dept-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">部门层级分布</span>
                        <div id="modal-dept-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>部门名称</th>
                                <th>所属层级</th>
                                <th>共享信息量（件次）</th>
                                <th>涉及领域数</th>
                                <th>共享率（%）</th>
                                <th>最近共享时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateInfoShareDeptTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 382 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateInfoShareDeptTableRows() {
        const depts = ['省市场监管局', '省交通运输厅', '省生态环境厅', '省卫健委', '省文旅厅', '省应急管理厅', '省税务局', '海口海关', '省人社厅', '省农业农村厅', '省自然资源厅', '省住建厅', '省教育厅', '省科技厅', '省民政厅'];
        const levels = ['省级', '市级', '区县级'];
        const allItems = [];
        for (let i = 1; i <= 30; i++) {
            const shareCount = Math.floor(Math.random() * 1000 + 50);
            allItems.push({
                dept: depts[i % 15] + (i > 15 ? '（海口）' : ''),
                level: levels[i % 3],
                count: shareCount,
                fieldCount: Math.floor(Math.random() * 10 + 3),
                rate: 100,
                time: `2024-0${i % 12 + 1}-20`
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.dept}</td>
                <td>${item.level}</td>
                <td>${item.count.toLocaleString()}</td>
                <td>${item.fieldCount}</td>
                <td>${item.rate}</td>
                <td>${item.time}</td>
            </tr>
        `).join('');
    }

    // 弹窗五：信息共享规模趋势分析
    renderInfoShareTrendModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信息共享规模趋势分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计共享总量</span>
                        <span class="indicator-stat-value">45.44万件次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">本月新增</span>
                        <span class="indicator-stat-value">3.2万件次</span>
                    </div>
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">本月新增同比增长</span>
                        <span class="indicator-stat-value">+12.5%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">日均共享量</span>
                        <span class="indicator-stat-value">1,245件次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月信息共享趋势</span>
                        <div id="modal-trend-line" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">信息类型分布</span>
                        <div id="modal-trend-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>月份</th>
                                <th>共享量（件次）</th>
                                <th>环比增长（%）</th>
                                <th>主要共享领域</th>
                                <th>主要共享部门</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateInfoShareTrendTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 3 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateInfoShareTrendTableRows() {
        const months = ['2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'];
        const fields = ['市场监管', '交通运输', '生态环境', '卫生健康'];
        const depts = ['省市场监管局', '省交通运输厅', '省生态环境厅', '省卫健委'];
        const allItems = [];
        for (let i = 0; i < 12; i++) {
            const count = Math.floor(Math.random() * 5000 + 2500);
            allItems.push({
                month: months[i],
                count: count,
                growth: Math.random() * 20 - 5,
                field: fields[i % 4],
                dept: depts[i % 4]
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.month}</td>
                <td>${item.count.toLocaleString()}</td>
                <td>${item.growth >= 0 ? '+' : ''}${item.growth.toFixed(1)}</td>
                <td>${item.field}</td>
                <td>${item.dept}</td>
            </tr>
        `).join('');
    }

    // 弹窗六：信息共享率达成分析
    renderInfoShareRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信息共享率达成分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">整体共享率</span>
                        <span class="indicator-stat-value">100%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已共享领域</span>
                        <span class="indicator-stat-value">45个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已共享部门</span>
                        <span class="indicator-stat-value">1,909个</span>
                    </div>
                    
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">整体共享率</span>
                        <div id="modal-rate-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域共享率达成情况</span>
                        <div id="modal-rate-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>领域名称</th>
                                <th>应共享量（件次）</th>
                                <th>实际共享量（件次）</th>
                                <th>共享率（%）</th>
                                <th>共享状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateInfoShareRateTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 9 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateInfoShareRateTableRows() {
        const fields = ['市场监管', '交通运输', '生态环境', '卫生健康', '文化旅游', '应急管理', '税务', '海关', '人力资源', '农业农村', '自然资源', '住建', '教育', '科技', '民政', '公安', '财政', '审计', '统计', '发改', '商务', '工信', '司法', '信访', '国防', '体育', '水利', '林业', '气象', '地震', '邮政', '通信', '电力', '燃气', '供水', '供热', '环保', '医疗', '社保', '就业', '物价', '质检', '药监', '烟草', '粮食'];
        const allItems = [];
        for (let i = 1; i <= 45; i++) {
            const shouldShare = Math.floor(Math.random() * 5000 + 500);
            allItems.push({
                field: fields[i - 1],
                shouldShare: shouldShare,
                actualShare: shouldShare,
                rate: 100,
                status: '全部达成'
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.field}</td>
                <td>${item.shouldShare.toLocaleString()}</td>
                <td>${item.actualShare.toLocaleString()}</td>
                <td>${item.rate}</td>
                <td>${item.status}</td>
            </tr>
        `).join('');
    }

    // 弹窗七：监管核查任务自动推送率分析
    renderPushRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">线索转案件分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">转换案件总数</span>
                        <span class="indicator-stat-value">99宗</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">线索转案件率</span>
                        <span class="indicator-stat-value">0.088%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已结案</span>
                        <span class="indicator-stat-value">67宗</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">办理中</span>
                        <span class="indicator-stat-value">32宗</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">线索转案件全流程转化</span>
                        <div id="modal-case-funnel" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域转换案件数量情况</span>
                        <div id="modal-case-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>案件编号</th>
                                <th>线索编号</th>
                                <th>案件名称</th>
                                <th>所属领域</th>
                                <th>立案日期</th>
                                <th>案件状态</th>
                                <th>承办部门</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCaseTransferTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 8 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderCreditBAboveModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信用等级B级及以上市场主体分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">市场主体总数</span>
                        <span class="indicator-stat-value">700.12万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">B级及以上市场主体总数</span>
                        <span class="indicator-stat-value">630.11万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">B级及以上市场主体总数占比</span>
                        <span class="indicator-stat-value">90%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 1fr 1fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各等级市场主体数量</span>
                        <div id="modal-b-level-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">信用等级B级及以上市场主体类型分布</span>
                        <div id="modal-b-level-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>对象名称</th>
                                <th>统一社会信用代码</th>
                                <th>信用等级</th>
                                <th>所属行业</th>
                                <th>评定日期</th>
                                <th>有效期至</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCreditBAboveTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 10 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderNewMarketModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">今日新增市场主体分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日新增</span>
                        <span class="indicator-stat-value">80户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">新增企业</span>
                        <span class="indicator-stat-value">45户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">新增个体工商户</span>
                        <span class="indicator-stat-value">30户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">新增农民专业合作社</span>
                        <span class="indicator-stat-value">5户</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">新增主体类型分布</span>
                        <div id="modal-market-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各区域今日新增排行TOP8</span>
                        <div id="modal-market-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>主体名称</th>
                                <th>统一社会信用代码</th>
                                <th>主体类型</th>
                                <th>所属区域</th>
                                <th>登记时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateMarketTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 16 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateMarketTableRows() {
        const types = ['企业', '个体', '农专'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['海南科技有限公司', '三亚旅游服务公司', '海口商贸企业', '文昌农业开发', '琼海餐饮服务', '万宁渔业公司', '东方化工企业', '澄迈物流中心'];
        const allItems = [];
        for (let i = 1; i <= 80; i++) {
            allItems.push({
                name: names[i % 8] + i,
                code: `9146${String(i).padStart(10, '0')}`,
                type: types[i % 3],
                region: regions[i % 8],
                time: `2026-07-02 ${Math.floor(Math.random() * 12) + 8}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '', '${item.region}')">${item.name}</span></td>
                <td>${item.code}</td>
                <td>${item.type}</td>
                <td>${item.region}</td>
                <td>${item.time}</td>
            </tr>
        `).join('');
    }

    renderStartupTimeModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">开办企业手续耗时分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">平均耗时</span>
                        <span class="indicator-stat-value">7小时</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">最快</span>
                        <span class="indicator-stat-value">2.5小时</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">最慢</span>
                        <span class="indicator-stat-value">15小时</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比压缩</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">-15%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各行业开办企业平均耗时</span>
                        <div id="modal-startup-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各行业开办企业耗时占比</span>
                        <div id="modal-startup-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>企业名称</th>
                                <th>名称核准</th>
                                <th>材料提交</th>
                                <th>审批审核</th>
                                <th>刻章备案</th>
                                <th>税务登记</th>
                                <th>银行开户</th>
                                <th>总耗时</th>
                                <th>办理日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateStartupTimeTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 10 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStartupTimeTableRows() {
        const names = ['海南科技有限公司', '三亚旅游服务公司', '海口商贸企业', '文昌农业开发', '琼海餐饮服务'];
        const allItems = [];
        for (let i = 1; i <= 50; i++) {
            const name = names[i % 5] + i;
            const step1 = parseFloat((Math.random() * 0.5 + 0.5).toFixed(1));
            const step2 = parseFloat((Math.random() * 1 + 1).toFixed(1));
            const step3 = parseFloat((Math.random() * 2 + 2).toFixed(1));
            const step4 = parseFloat((Math.random() * 1 + 0.5).toFixed(1));
            const step5 = parseFloat((Math.random() * 1 + 0.5).toFixed(1));
            const step6 = parseFloat((Math.random() * 1 + 0.5).toFixed(1));
            const total = parseFloat((step1 + step2 + step3 + step4 + step5 + step6).toFixed(1));
            allItems.push({ name, step1, step2, step3, step4, step5, step6, total, date: `2026-06-${Math.floor(Math.random() * 20) + 10}` });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}')">${item.name}</span></td>
                <td>${item.step1}h</td>
                <td>${item.step2}h</td>
                <td>${item.step3}h</td>
                <td>${item.step4}h</td>
                <td>${item.step5}h</td>
                <td>${item.step6}h</td>
                <td>${item.total}h</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderNewProjectModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">今日新增项目分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日新增</span>
                        <span class="indicator-stat-value">80个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">政府投资项目</span>
                        <span class="indicator-stat-value">32个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">企业投资项目</span>
                        <span class="indicator-stat-value">48个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">总投资额</span>
                        <span class="indicator-stat-value">12.5亿元</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">项目类型分布</span>
                        <div id="modal-project-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各区域今日新增项目排行TOP8</span>
                        <div id="modal-project-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>项目名称</th>
                                <th>项目类型</th>
                                <th>所属区域</th>
                                <th>总投资额（万元）</th>
                                <th>立项时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateProjectTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 16 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateProjectTableRows() {
        const types = ['政府投资', '企业投资'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['基础设施建设项目', '产业园区开发项目', '旅游综合体项目', '科技创新项目', '生态环保项目', '城市更新项目', '现代农业项目', '物流枢纽项目'];
        const allItems = [];
        for (let i = 1; i <= 80; i++) {
            allItems.push({
                name: names[i % 8] + i,
                type: types[i % 2],
                region: regions[i % 8],
                investment: Math.floor(Math.random() * 5000) + 500,
                time: `2026-07-02 ${Math.floor(Math.random() * 12) + 8}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.region}</td>
                <td>${item.investment.toLocaleString()}</td>
                <td>${item.time}</td>
            </tr>
        `).join('');
    }

    renderProjectApprovalModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">项目审批用时分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">平均审批用时</span>
                        <span class="indicator-stat-value">7小时</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">立项审批</span>
                        <span class="indicator-stat-value">1.5h</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">规划审批</span>
                        <span class="indicator-stat-value">2h</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">施工许可</span>
                        <span class="indicator-stat-value">2h</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">竣工验收</span>
                        <span class="indicator-stat-value">1.5h</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各类型项目平均审批用时</span>
                        <div id="modal-approval-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各类型项目审批用时占比</span>
                        <div id="modal-approval-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>项目名称</th>
                                <th>立项审批</th>
                                <th>用地规划</th>
                                <th>工程规划</th>
                                <th>施工许可</th>
                                <th>竣工验收</th>
                                <th>总用时</th>
                                <th>审批日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateApprovalTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 10 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateApprovalTableRows() {
        const names = ['基础设施建设项目', '产业园区开发项目', '旅游综合体项目', '科技创新项目', '生态环保项目'];
        const allItems = [];
        for (let i = 1; i <= 50; i++) {
            const name = names[i % 5] + i;
            const step1 = parseFloat((Math.random() * 1 + 1).toFixed(1));
            const step2 = parseFloat((Math.random() * 1 + 1).toFixed(1));
            const step3 = parseFloat((Math.random() * 1 + 1).toFixed(1));
            const step4 = parseFloat((Math.random() * 1 + 1).toFixed(1));
            const step5 = parseFloat((Math.random() * 1 + 1).toFixed(1));
            const total = parseFloat((step1 + step2 + step3 + step4 + step5).toFixed(1));
            allItems.push({ name, step1, step2, step3, step4, step5, total, date: `2026-06-${Math.floor(Math.random() * 20) + 10}` });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.name}</td>
                <td>${item.step1}h</td>
                <td>${item.step2}h</td>
                <td>${item.step3}h</td>
                <td>${item.step4}h</td>
                <td>${item.step5}h</td>
                <td>${item.total}h</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderProjectLandingModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">项目审批到落地用时分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">平均落地用时</span>
                        <span class="indicator-stat-value">7小时</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">审批阶段</span>
                        <span class="indicator-stat-value">5h</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">落地阶段</span>
                        <span class="indicator-stat-value">2h</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比压缩</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">-20%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各类型项目落地用时占比</span>
                        <div id="modal-landing-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各类型项目审批到落地用时排行</span>
                        <div id="modal-landing-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>项目名称</th>
                                <th>审批用时</th>
                                <th>落地用时</th>
                                <th>总用时</th>
                                <th>落地日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateLandingTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 10 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateLandingTableRows() {
        const names = ['基础设施建设项目', '产业园区开发项目', '旅游综合体项目', '科技创新项目', '生态环保项目'];
        const allItems = [];
        for (let i = 1; i <= 50; i++) {
            const name = names[i % 5] + i;
            const approval = parseFloat((Math.random() * 3 + 3).toFixed(1));
            const landing = parseFloat((Math.random() * 2 + 1).toFixed(1));
            const total = parseFloat((approval + landing).toFixed(1));
            allItems.push({ name, approval, landing, total, date: `2026-06-${Math.floor(Math.random() * 20) + 10}` });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.name}</td>
                <td>${item.approval}h</td>
                <td>${item.landing}h</td>
                <td>${item.total}h</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderYearlyAddModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">年度新增市场主体分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度新增</span>
                        <span class="indicator-stat-value">2856户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">新增企业</span>
                        <span class="indicator-stat-value">1456户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">新增个体工商户</span>
                        <span class="indicator-stat-value">1200户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">新增农村专业合作社</span>
                        <span class="indicator-stat-value">200户</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月新增市场主体趋势</span>
                        <div id="modal-yearly-add-trend" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">新增类型分布</span>
                        <div id="modal-yearly-add-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>主体名称</th>
                                <th>主体类型</th>
                                <th>所属区域</th>
                                <th>新增日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateYearlyAddTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 572 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateYearlyAddTableRows() {
        const types = ['企业', '个体', '农专'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['海南科技有限公司', '三亚旅游服务公司', '海口商贸企业', '文昌农业开发', '琼海餐饮服务'];
        const allItems = [];
        for (let i = 1; i <= 99; i++) {
            allItems.push({
                name: names[i % 5] + i,
                type: types[i % 3],
                region: regions[i % 8],
                date: `2026-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '', '${item.region}')">${item.name}</span></td>
                <td>${item.type}</td>
                <td>${item.region}</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderYearlyRemoveModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">年度减少市场主体分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度减少</span>
                        <span class="indicator-stat-value">1234户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度注销</span>
                        <span class="indicator-stat-value">987户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度吊销</span>
                        <span class="indicator-stat-value">247户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">净减少率</span>
                        <span class="indicator-stat-value">0.1%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">减少类型分布</span>
                        <div id="modal-yearly-remove-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各行业减少数量排行TOP8</span>
                        <div id="modal-yearly-remove-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>主体名称</th>
                                <th>类型</th>
                                <th>所属行业</th>
                                <th>注（吊）销日期</th>
                                <th>注（吊）销原因</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateYearlyRemoveTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 247 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateYearlyRemoveTableRows() {
        const types = ['注销', '吊销'];
        const industries = ['制造业', '批发零售', '住宿餐饮', '交通运输', '信息技术', '建筑业', '金融业', '农林牧渔'];
        const reasons = ['经营不善', '主动注销', '违法违规', '吊销营业执照', '破产清算', '其他'];
        const names = ['海南科技有限公司', '三亚旅游服务公司', '海口商贸企业', '文昌农业开发', '琼海餐饮服务'];
        const allItems = [];
        for (let i = 1; i <= 99; i++) {
            allItems.push({
                name: names[i % 5] + i,
                type: types[i % 2],
                industry: industries[i % 8],
                date: `2026-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                reason: reasons[i % 6]
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '${item.industry}')">${item.name}</span></td>
                <td>${item.type}</td>
                <td>${item.industry}</td>
                <td>${item.date}</td>
                <td>${item.reason}</td>
            </tr>
        `).join('');
    }

    renderGoodBadRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">“好差评”好评率分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">评价总数</span>
                        <span class="indicator-stat-value">12,856条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">好评数</span>
                        <span class="indicator-stat-value">12,851条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">差评数</span>
                        <span class="indicator-stat-value" style="color: #ff3b30;">5条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">好评率</span>
                        <span class="indicator-stat-value">99.96%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">好评率仪表盘</span>
                        <div id="modal-goodbad-gauge" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">评价维度分布</span>
                        <div id="modal-goodbad-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>评价编号</th>
                                <th>评价类型</th>
                                <th>评价内容</th>
                                <th>评价日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateGoodBadTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 2572 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateGoodBadTableRows() {
        const goodContents = ['服务态度好，办事效率高', '流程便捷，一次办好', '工作人员热情耐心', '材料清单清晰明了', '整体服务体验满意'];
        const badContents = ['服务态度差', '办事效率低', '流程不便捷', '材料不清晰', '其他问题'];
        const allItems = [];
        for (let i = 1; i <= 5; i++) {
            const isGood = i <= 3;
            allItems.push({
                code: `PJ${202606}${String(i).padStart(4, '0')}`,
                type: isGood ? '好评' : '差评',
                content: isGood ? goodContents[i - 1] : badContents[i - 3],
                date: `2026-${String(Math.floor(Math.random() * 3) + 4).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        return allItems.map((item, index) => {
            const typeColor = item.type === '好评' ? '#ffcc00' : '#ff3b30';
            return `
            <tr>
                <td>${index + 1}</td>
                <td>${item.code}</td>
                <td><span style="color: ${typeColor}; font-weight: bold;">${item.type}</span></td>
                <td>${item.content}</td>
                <td>${item.date}</td>
            </tr>
        `}).join('');
    }

    renderEnterpriseSatisfactionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">涉企检查满意度分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">非常满意</span>
                        <span class="indicator-stat-value">65%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">满意</span>
                        <span class="indicator-stat-value">20%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">基本满意</span>
                        <span class="indicator-stat-value">14%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">不满意</span>
                        <span class="indicator-stat-value" style="color: #ff3b30;">0.5%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">非常不满意</span>
                        <span class="indicator-stat-value" style="color: #ff3b30;">0.5%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">满意度</span>
                        <span class="indicator-stat-value">99%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">满意度等级分布</span>
                        <div id="modal-satisfaction-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域满意度排行TOP8</span>
                        <div id="modal-satisfaction-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>检查对象</th>
                                <th>所属领域</th>
                                <th>满意度评价</th>
                                <th>评价日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSatisfactionTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 100 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateSatisfactionTableRows() {
        const evaluations = ['非常满意', '满意', '基本满意', '不满意', '非常不满意'];
        const domains = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '税务', '海关'];
        const names = ['海南科技有限公司', '三亚旅游服务公司', '海口商贸企业', '文昌农业开发', '琼海餐饮服务'];
        const allItems = [];
        for (let i = 1; i <= 500; i++) {
            const evalIndex = Math.random() > 0.995 ? 4 : (Math.random() > 0.99 ? 3 : (Math.random() > 0.85 ? 2 : (Math.random() > 0.65 ? 1 : 0)));
            allItems.push({
                name: names[i % 5] + i,
                domain: domains[i % 8],
                evaluation: evaluations[evalIndex],
                date: `2026-${String(Math.floor(Math.random() * 3) + 4).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => {
            const evalColor = item.evaluation === '非常满意' ? '#ffcc00' : (item.evaluation === '满意' ? '#ff6347' : (item.evaluation === '基本满意' ? '#ffcc00' : '#ff3b30'));
            return `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}')">${item.name}</span></td>
                <td>${item.domain}</td>
                <td><span style="color: ${evalColor}; font-weight: bold;">${item.evaluation}</span></td>
                <td>${item.date}</td>
            </tr>
        `}).join('');
    }

    renderComplaintDecreaseModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">涉企检查投诉分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                   
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">本期投诉</span>
                        <span class="indicator-stat-value">23件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">上期投诉</span>
                        <span class="indicator-stat-value">30件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">减少</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">7件</span>
                    </div>
                     <div class="indicator-stat-card">
                        <span class="indicator-stat-label">投诉下降率</span>
                        <span class="indicator-stat-value">23.33%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">投诉类型分布</span>
                        <div id="modal-complaint-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域投诉量排行TOP8</span>
                        <div id="modal-complaint-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>投诉编号</th>
                                <th>投诉类型</th>
                                <th>所属领域</th>
                                <th>投诉日期</th>
                                <th>处理状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateComplaintTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 5 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateComplaintTableRows() {
        const types = ['服务态度', '办事效率', '流程问题', '材料要求', '其他'];
        const domains = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '税务', '海关'];
        const statuses = ['已处理', '处理中'];
        const allItems = [];
        for (let i = 1; i <= 23; i++) {
            allItems.push({
                code: `TS${202606}${String(i).padStart(4, '0')}`,
                type: types[i % 5],
                domain: domains[i % 8],
                date: `2026-${String(Math.floor(Math.random() * 3) + 4).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                status: statuses[i % 2]
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => {
            const statusColor = item.status === '已处理' ? '#ffcc00' : '#ffcc00';
            return `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.code}</td>
                <td>${item.type}</td>
                <td>${item.domain}</td>
                <td>${item.date}</td>
                <td><span style="color: ${statusColor}; font-weight: bold;">${item.status}</span></td>
            </tr>
        `}).join('');
    }

    renderTechTotalModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">科技和创新型中小企业全景分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">认定总数</span>
                        <span class="indicator-stat-value">1,258家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度新增</span>
                        <span class="indicator-stat-value">326家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+92%</span>
                    </div>
                    
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">行业分布</span>
                        <div id="modal-tech-total-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市认定数量排行TOP8</span>
                        <div id="modal-tech-total-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>企业名称</th>
                                <th>统一社会信用代码</th>
                                <th>所属行业</th>
                                <th>认定日期</th>
                                <th>有效期至</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTechTotalTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 252 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateTechTotalTableRows() {
        const industries = ['制造业', '信息技术', '科学研究', '生物医药', '新材料', '其他'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['海南科技有限公司', '三亚创新科技公司', '海口信息技术企业', '文昌生物科技', '琼海新材料公司'];
        const allItems = [];
        for (let i = 1; i <= 1258; i++) {
            allItems.push({
                name: names[i % 5] + i,
                code: `9146${String(i).padStart(10, '0')}`,
                industry: industries[i % 6],
                region: regions[i % 8],
                date: `202${Math.floor(Math.random() * 4) + 3}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                validUntil: `202${Math.floor(Math.random() * 2) + 6}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '${item.industry}', '${item.region}')">${item.name}</span></td>
                <td>${item.code}</td>
                <td>${item.industry}</td>
                <td>${item.date}</td>
                <td>${item.validUntil}</td>
            </tr>
        `).join('');
    }

    renderTechNewModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">科技和创新型中小企业年度新增分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度新增</span>
                        <span class="indicator-stat-value">326家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+92%</span>
                    </div>
                  
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近5年新增趋势</span>
                        <div id="modal-tech-new-trend" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市年度新增排行TOP8</span>
                        <div id="modal-tech-new-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>企业名称</th>
                                <th>所属行业</th>
                                <th>所属区域</th>
                                <th>认定日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTechNewTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 66 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateTechNewTableRows() {
        const industries = ['制造业', '信息技术', '科学研究', '生物医药', '新材料', '其他'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['海南科技有限公司', '三亚创新科技公司', '海口信息技术企业', '文昌生物科技', '琼海新材料公司'];
        const allItems = [];
        for (let i = 1; i <= 326; i++) {
            allItems.push({
                name: names[i % 5] + i,
                industry: industries[i % 6],
                region: regions[i % 8],
                date: `2026-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '${item.industry}', '${item.region}')">${item.name}</span></td>
                <td>${item.industry}</td>
                <td>${item.region}</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderTechGrowthModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">科技和创新型中小企业同比增长分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">上年度新增</span>
                        <span class="indicator-stat-value">170家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">本年度新增</span>
                        <span class="indicator-stat-value">326家</span>
                    </div>
                  <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+92%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 1fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市同比增长率情况</span>
                        <div id="modal-tech-growth-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>市/区名称</th>
                                <th>上年度新增（家）</th>
                                <th>本年度新增（家）</th>
                                <th>同比增长率（%）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTechGrowthTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 2 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateTechGrowthTableRows() {
        const cities = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const data = [
            { city: '海口', lastYear: 55, thisYear: 110, rate: 100 },
            { city: '三亚', lastYear: 35, thisYear: 68, rate: 94 },
            { city: '儋州', lastYear: 25, thisYear: 48, rate: 92 },
            { city: '文昌', lastYear: 20, thisYear: 38, rate: 90 },
            { city: '琼海', lastYear: 15, thisYear: 28, rate: 87 },
            { city: '万宁', lastYear: 10, thisYear: 18, rate: 80 },
            { city: '东方', lastYear: 8, thisYear: 14, rate: 75 },
            { city: '澄迈', lastYear: 2, thisYear: 4, rate: 100 }
        ];
        return data.slice(0, 5).map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.city}</td>
                <td>${item.lastYear}</td>
                <td>${item.thisYear}</td>
                <td>${item.rate}%</td>
            </tr>
        `).join('');
    }

    renderSpecialTotalModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">专精特新中小企业全景分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">认定总数</span>
                        <span class="indicator-stat-value">456家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度新增</span>
                        <span class="indicator-stat-value">118家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+88%</span>
                    </div>
                    
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">行业分布TOP6</span>
                        <div id="modal-special-total-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市认定数量排行TOP8</span>
                        <div id="modal-special-total-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>企业名称</th>
                                <th>统一社会信用代码</th>
                                <th>所属行业</th>
                                <th>认定日期</th>
                                <th>有效期至</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSpecialTotalTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 92 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateSpecialTotalTableRows() {
        const industries = ['制造业', '信息技术', '科学研究', '生物医药', '新材料', '其他'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['海南科技有限公司', '三亚创新科技公司', '海口信息技术企业', '文昌生物科技', '琼海新材料公司'];
        const allItems = [];
        for (let i = 1; i <= 456; i++) {
            allItems.push({
                name: names[i % 5] + i,
                code: `9146${String(i).padStart(10, '0')}`,
                industry: industries[i % 6],
                region: regions[i % 8],
                date: `202${Math.floor(Math.random() * 4) + 3}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                validUntil: `202${Math.floor(Math.random() * 2) + 6}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '${item.industry}', '${item.region}')">${item.name}</span></td>
                <td>${item.code}</td>
                <td>${item.industry}</td>
                <td>${item.date}</td>
                <td>${item.validUntil}</td>
            </tr>
        `).join('');
    }

    renderSpecialNewModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">专精特新中小企业年度新增分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度新增</span>
                        <span class="indicator-stat-value">118家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+88%</span>
                    </div>
                    
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近5年新增趋势</span>
                        <div id="modal-special-new-trend" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市年度新增排行TOP8</span>
                        <div id="modal-special-new-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>企业名称</th>
                                <th>所属行业</th>
                                <th>所属区域</th>
                                <th>认定日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSpecialNewTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 24 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateSpecialNewTableRows() {
        const industries = ['制造业', '信息技术', '科学研究', '生物医药', '新材料', '其他'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['海南科技有限公司', '三亚创新科技公司', '海口信息技术企业', '文昌生物科技', '琼海新材料公司'];
        const allItems = [];
        for (let i = 1; i <= 118; i++) {
            allItems.push({
                name: names[i % 5] + i,
                industry: industries[i % 6],
                region: regions[i % 8],
                date: `2026-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '${item.industry}', '${item.region}')">${item.name}</span></td>
                <td>${item.industry}</td>
                <td>${item.region}</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderSpecialGrowthModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">专精特新中小企业同比增长分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">上年度新增</span>
                        <span class="indicator-stat-value">63家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">本年度新增</span>
                        <span class="indicator-stat-value">118家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+88%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 1fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市同比增长率情况</span>
                        <div id="modal-special-growth-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>市/区名称</th>
                                <th>上年度新增（家）</th>
                                <th>本年度新增（家）</th>
                                <th>同比增长率（%）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSpecialGrowthTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 2 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateSpecialGrowthTableRows() {
        const cities = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const data = [
            { city: '海口', lastYear: 25, thisYear: 48, rate: 92 },
            { city: '三亚', lastYear: 15, thisYear: 28, rate: 87 },
            { city: '儋州', lastYear: 10, thisYear: 18, rate: 80 },
            { city: '文昌', lastYear: 5, thisYear: 9, rate: 80 },
            { city: '琼海', lastYear: 5, thisYear: 8, rate: 60 },
            { city: '万宁', lastYear: 3, thisYear: 4, rate: 33 },
            { city: '东方', lastYear: 0, thisYear: 2, rate: 0 },
            { city: '澄迈', lastYear: 0, thisYear: 1, rate: 0 }
        ];
        return data.slice(0, 5).map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.city}</td>
                <td>${item.lastYear}</td>
                <td>${item.thisYear}</td>
                <td>${item.rate}%</td>
            </tr>
        `).join('');
    }

    renderGiantTotalModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">专精特新"小巨人"企业全景分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">认定总数</span>
                        <span class="indicator-stat-value">89家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度新增</span>
                        <span class="indicator-stat-value">23家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+85%</span>
                    </div>
                  
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">行业分布</span>
                        <div id="modal-giant-total-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市认定数量排行TOP8</span>
                        <div id="modal-giant-total-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>企业名称</th>
                                <th>统一社会信用代码</th>
                                <th>所属行业</th>
                                <th>认定日期</th>
                                <th>有效期至</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateGiantTotalTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 18 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateGiantTotalTableRows() {
        const industries = ['制造业', '信息技术', '科学研究', '生物医药', '新材料', '其他'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['海南科技有限公司', '三亚创新科技公司', '海口信息技术企业', '文昌生物科技', '琼海新材料公司'];
        const allItems = [];
        for (let i = 1; i <= 89; i++) {
            allItems.push({
                name: names[i % 5] + i,
                code: `9146${String(i).padStart(10, '0')}`,
                industry: industries[i % 6],
                region: regions[i % 8],
                date: `202${Math.floor(Math.random() * 4) + 3}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                validUntil: `202${Math.floor(Math.random() * 2) + 6}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '${item.industry}', '${item.region}')">${item.name}</span></td>
                <td>${item.code}</td>
                <td>${item.industry}</td>
                <td>${item.date}</td>
                <td>${item.validUntil}</td>
            </tr>
        `).join('');
    }

    renderGiantNewModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">专精特新"小巨人"企业年度新增分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">年度新增</span>
                        <span class="indicator-stat-value">23家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+85%</span>
                    </div>
                    
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近5年新增趋势</span>
                        <div id="modal-giant-new-trend" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市年度新增排行TOP8</span>
                        <div id="modal-giant-new-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>企业名称</th>
                                <th>所属行业</th>
                                <th>所属区域</th>
                                <th>认定日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateGiantNewTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 5 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateGiantNewTableRows() {
        const industries = ['制造业', '信息技术', '科学研究', '生物医药', '新材料', '其他'];
        const regions = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const names = ['海南科技有限公司', '三亚创新科技公司', '海口信息技术企业', '文昌生物科技', '琼海新材料公司'];
        const allItems = [];
        for (let i = 1; i <= 23; i++) {
            allItems.push({
                name: names[i % 5] + i,
                industry: industries[i % 6],
                region: regions[i % 8],
                date: `2026-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '${item.industry}', '${item.region}')">${item.name}</span></td>
                <td>${item.industry}</td>
                <td>${item.region}</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderGiantGrowthModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">专精特新"小巨人"企业同比增长分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">上年度新增</span>
                        <span class="indicator-stat-value">12家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">本年度新增</span>
                        <span class="indicator-stat-value">23家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长</span>
                        <span class="indicator-stat-value" style="color: #ffcc00;">+85%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 1fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市同比增长率情况</span>
                        <div id="modal-giant-growth-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>市/区名称</th>
                                <th>上年度新增（家）</th>
                                <th>本年度新增（家）</th>
                                <th>同比增长率（%）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateGiantGrowthTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 2 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    // ==================== 监管模块弹窗 ====================
    renderSupervisionBehaviorTotalModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">监管行为总数构成分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">双随机一公开</span>
                        <span class="indicator-stat-value">1,000次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">专项检查</span>
                        <span class="indicator-stat-value">500次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">重点检查</span>
                        <span class="indicator-stat-value">400次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">有因检查</span>
                        <span class="indicator-stat-value">300次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">综合查一次</span>
                        <span class="indicator-stat-value">150次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">其他</span>
                        <span class="indicator-stat-value">106次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">监管行为类型分布</span>
                        <div id="modal-behavior-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近6个月监管行为趋势</span>
                        <div id="modal-behavior-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>类型</th>
                                <th>事项</th>
                                <th>部门</th>
                                <th>时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCheckBehaviorTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 263 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCheckBehaviorTableRows() {
        const types = ['双随机一公开', '专项检查', '重点检查', '有因检查', '综合查一次', '其他'];
        const depts = ['市场监管局', '卫生健康委', '自然资源局', '生态环境局', '交通运输局'];
        const names = ['食品经营安全检查', '特种设备安全检查', '企业年度报告核查', '药品经营检查', '医疗器械检查', '化妆品检查'];
        const allItems = [];
        for (let i = 1; i <= 1314; i++) {
            allItems.push({
                code: `JC${String(i).padStart(6, '0')}`,
                type: types[i % 6],
                name: names[i % 6],
                dept: depts[i % 5],
                time: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${item.code}</td>
                <td>${item.type}</td>
                <td>${item.name}</td>
                <td>${item.dept}</td>
                <td>${item.time}</td>
            </tr>
        `).join('');
    }

    renderSupervisionProblemRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">检查发现问题率分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">检查行为总数</span>
                        <span class="indicator-stat-value">2,456次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">发现问题数</span>
                        <span class="indicator-stat-value">383个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">发现问题率</span>
                        <span class="indicator-stat-value">15.6%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 3fr 7fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">问题类型分布</span>
                        <div id="modal-problem-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <div class="modal-chart-tabs">
                            <span class="modal-chart-tab active" onclick="window.homePage.switchProblemRateTab('domain')">领域</span>
                            <span class="modal-chart-tab" onclick="window.homePage.switchProblemRateTab('item')">事项</span>
                            <span class="modal-chart-tab" onclick="window.homePage.switchProblemRateTab('city')">市县</span>
                        </div>
                        <span class="indicator-chart-title">问题发现率排行</span>
                        <div id="modal-problem-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>行为编号</th>
                                <th>当事人名称</th>
                                <th>检查方式</th>
                                <th>问题类型</th>
                                <th>发现时间</th>
                                <th>检查结果</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCheckProblemTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 39 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCheckProblemTableRows() {
        const types = ['违规操作', '资料不全', '资质过期', '安全隐患', '质量问题'];
        const behaviors = ['双随机一公开', '重点检查', '专项检查', '有因检查', '综合查一次'];
        const parties = ['海南XX科技有限公司', '三亚XX贸易有限公司', '海口XX餐饮管理有限公司', '文昌XX食品有限公司', '琼海XX医疗器械有限公司'];
        const results = ['涉嫌违法线索移送', '行政指导', '责令改正'];
        const allItems = [];
        for (let i = 1; i <= 192; i++) {
            allItems.push({
                code: `BH${String(i).padStart(6, '0')}`,
                party: parties[i % 5],
                behavior: behaviors[i % 5],
                type: types[i % 5],
                time: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                result: results[i % 3]
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        const resultColors = { '涉嫌违法线索移送': '#ff3b30', '行政指导': '#ffcc00', '责令改正': '#ff9500' };
        return items.map((item, index) => `
            <tr>
                <td>${item.code}</td>
                <td>${item.party}</td>
                <td>${item.behavior}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span style="color: ${resultColors[item.result]};">${item.result}</span></td>
            </tr>
        `).join('');
    }

    renderSupervisionVisitReductionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">减少上门次数成效分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">上门检查任务总量</span>
                        <span class="indicator-stat-value">2,456个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">实际上门次数</span>
                        <span class="indicator-stat-value">1,564次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">减少上门次数</span>
                        <span class="indicator-stat-value">892次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">减少比例</span>
                        <span class="indicator-stat-value">36.32%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        
                        <div id="modal-visit-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        
                        <div id="modal-visit-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>事项名称</th>
                                <th>所属领域</th>
                                <th>上门检查任务总量</th>
                                <th>实际上门次数</th>
                                <th>减少次数</th>
                                <th>减少方式</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateVisitTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 120 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateVisitTableRows() {
        const domains = ['市场监管', '卫生健康', '自然资源', '生态环境', '交通运输'];
        const names = ['食品经营检查', '医疗机构检查', '用地规划核查', '排污许可检查', '道路运输检查'];
        const methods = ['综合查一次', '非现场监管'];
        const allItems = [];
        for (let i = 1; i <= 600; i++) {
            const before = Math.floor(Math.random() * 10) + 1;
            const after = Math.floor(Math.random() * before);
            allItems.push({
                name: names[i % 5],
                domain: domains[i % 5],
                before: before,
                after: after,
                reduce: before - after,
                method: methods[i % 2]
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.domain}</td>
                <td>${item.before}</td>
                <td>${item.after}</td>
                <td>${item.reduce}</td>
                <td>${item.method}</td>
            </tr>
        `).join('');
    }

    renderSupervisionTransferCluesModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">涉嫌违法移送线索分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">移送线索总数</span>
                        <span class="indicator-stat-value">128条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已受理</span>
                        <span class="indicator-stat-value">95条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已驳回</span>
                        <span class="indicator-stat-value">33条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已立案</span>
                        <span class="indicator-stat-value">89条</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">移送领域分布</span>
                        <div id="modal-clues-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近6个月移送趋势</span>
                        <div id="modal-clues-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>线索编号</th>
                                <th>来源</th>
                                <th>违法类型</th>
                                <th>移送部门</th>
                                <th>接收部门</th>
                                <th>受理状态</th>
                                <th>立案状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCluesTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 26 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCluesTableRows() {
        const sources = ['日常监管', '投诉举报', '信用预警', '部门移送'];
        const types = ['价格违法', '产品质量', '虚假宣传', '无证经营', '安全生产'];
        const depts = ['市场监管局', '综合执法局', '自然资源局', '生态环境局'];
        const allItems = [];
        for (let i = 1; i <= 128; i++) {
            const acceptStatus = i <= 95 ? '已受理' : '已驳回';
            let caseStatus = '—';
            if (acceptStatus === '已受理') {
                caseStatus = i <= 89 ? '已立案' : '未立案';
            }
            allItems.push({
                code: `XS${String(i).padStart(6, '0')}`,
                source: sources[i % 4],
                type: types[i % 5],
                sendDept: depts[i % 4],
                receiveDept: depts[(i + 1) % 4],
                acceptStatus: acceptStatus,
                caseStatus: caseStatus
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        const acceptColors = { '已受理': '#ffcc00', '已驳回': '#ff3b30' };
        const caseColors = { '已立案': '#ffcc00', '未立案': '#ffcc00', '—': 'rgba(255,255,255,0.3)' };
        return items.map((item, index) => `
            <tr>
                <td>${item.code}</td>
                <td>${item.source}</td>
                <td>${item.type}</td>
                <td>${item.sendDept}</td>
                <td>${item.receiveDept}</td>
                <td><span style="color: ${acceptColors[item.acceptStatus]};">${item.acceptStatus}</span></td>
                <td><span style="color: ${caseColors[item.caseStatus]};">${item.caseStatus}</span></td>
            </tr>
        `).join('');
    }

    // ==================== 执法模块弹窗 ====================
    renderLawCaseSourceModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">案源线索构成分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">案源数</span>
                        <span class="indicator-stat-value">100件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">涉嫌违法移送线索数</span>
                        <span class="indicator-stat-value">128件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">受理数</span>
                        <span class="indicator-stat-value">210件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">立案数</span>
                        <span class="indicator-stat-value">205件</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">案源线索来源分布</span>
                        <div id="modal-case-source-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域线索数量排行</span>
                        <div id="modal-case-source-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>线索编号</th>
                                <th>线索名称</th>
                                <th>来源</th>
                                <th>所属领域</th>
                                <th>受理状态</th>
                                <th>立案状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCaseSourceTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-stat-value">第 1 页 / 共 20 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCaseSourceTableRows() {
        const sources = ['日常监管', '投诉举报', '信用预警', '部门移送', '其他'];
        const domains = ['市场监管', '生态环境', '交通运输', '卫生健康', '自然资源'];
        const names = ['价格违法线索', '产品质量线索', '虚假宣传线索', '无证经营线索', '安全生产线索'];
        const acceptStatuses = ['已受理', '已驳回', '待受理'];
        const caseStatuses = ['已立案', '未立案'];
        const allItems = [];
        for (let i = 1; i <= 100; i++) {
            let acceptStatus = acceptStatuses[i % 3];
            let caseStatus = caseStatuses[i % 2];
            if (acceptStatus === '已驳回') caseStatus = '未立案';
            allItems.push({
                code: `AY${String(i).padStart(6, '0')}`,
                name: names[i % 5] + i,
                source: sources[i % 5],
                domain: domains[i % 5],
                acceptStatus: acceptStatus,
                caseStatus: caseStatus
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        const acceptColors = { '已受理': '#ffcc00', '已驳回': '#ff3b30', '待受理': '#ff9500' };
        const caseColors = { '已立案': '#ffcc00', '未立案': 'rgba(255,255,255,0.6)' };
        return items.map((item, index) => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.source}</td>
                <td>${item.domain}</td>
                <td><span style="color: ${acceptColors[item.acceptStatus]};">${item.acceptStatus}</span></td>
                <td><span style="color: ${caseColors[item.caseStatus]};">${item.caseStatus}</span></td>
            </tr>
        `).join('');
    }

    renderLawCaseRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">立案率深度分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">案源线索总数</span>
                        <span class="indicator-stat-value">228件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已立案</span>
                        <span class="indicator-stat-value">205件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">未立案</span>
                        <span class="indicator-stat-value">13件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">立案率</span>
                        <span class="indicator-stat-value">90%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">立案 vs 未立案</span>
                        <div id="modal-case-rate-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域立案率情况</span>
                        <div id="modal-case-rate-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>案件编号</th>
                                <th>案件名称</th>
                                <th>所属领域</th>
                                <th>线索来源</th>
                                <th>立案日期</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCaseRateTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-stat-value">第 1 页 / 共 2 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCaseRateTableRows() {
        const domains = ['市场监管', '生态环境', '交通运输', '卫生健康'];
        const sources = ['日常监管', '投诉举报', '部门移送'];
        const names = ['价格违法案', '产品质量案', '虚假宣传案', '无证经营案', '安全生产案'];
        const allItems = [];
        for (let i = 1; i <= 9; i++) {
            allItems.push({
                code: `AJ${String(i).padStart(6, '0')}`,
                name: names[i % 5] + i,
                domain: domains[i % 4],
                source: sources[i % 3],
                date: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                status: i <= 4 ? '已立案' : '未立案'
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        const statusColors = { '已立案': '#ff9500', '未立案': '#ffcc00' };
        return items.map((item, index) => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.domain}</td>
                <td>${item.source}</td>
                <td>${item.date}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderLawMajorCaseRatioModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">重大案件占比分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">总案件数</span>
                        <span class="indicator-stat-value">205件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">重大案件数</span>
                        <span class="indicator-stat-value">9件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">一般案件数</span>
                        <span class="indicator-stat-value">196件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">重大案件占比</span>
                        <span class="indicator-stat-value">4.4%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">重大案件类型分布</span>
                        <div id="modal-major-case-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域重大案件数量排行</span>
                        <div id="modal-major-case-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>案件编号</th>
                                <th>案件名称</th>
                                <th>所属领域</th>
                                <th>重大案件类型</th>
                                <th>认定依据</th>
                                <th>办理状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateMajorCaseTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-stat-value">第 1 页 / 共 2 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateMajorCaseTableRows() {
        const domains = ['市场监管', '生态环境', '交通运输', '卫生健康'];
        const types = ['重大安全隐患', '重大经济损失', '重大社会影响', '涉刑案件'];
        const names = ['重大价格违法案', '重大产品质量案', '重大环境污染案', '重大安全事故案'];
        const statuses = ['办理中', '已结案', '待审批'];
        const allItems = [];
        for (let i = 1; i <= 9; i++) {
            allItems.push({
                code: `ZD${String(i).padStart(6, '0')}`,
                name: names[i % 4] + i,
                domain: domains[i % 4],
                type: types[i % 4],
                basis: '《行政处罚法》第38条',
                status: statuses[i % 3]
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        const statusColors = { '办理中': '#ffcc00', '已结案': '#ff9500', '待审批': '#ffcc00' };
        return items.map((item, index) => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.domain}</td>
                <td>${item.type}</td>
                <td>${item.basis}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    // ==================== 信用模块弹窗 ====================
    renderCreditBAboveNewModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信用等级B级及以上市场主体分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">B级及以上市场主体</span>
                        <span class="indicator-stat-value">89.8万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">其中A级</span>
                        <span class="indicator-stat-value">35.9万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">其中B级</span>
                        <span class="indicator-stat-value">53.9万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">占比</span>
                        <span class="indicator-stat-value">90%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">ABCD等级分布</span>
                        <div id="modal-credit-b-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各行业B级及以上占比排行</span>
                        <div id="modal-credit-b-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>企业名称</th>
                                <th>统一社会信用代码</th>
                                <th>信用等级</th>
                                <th>所属行业</th>
                                <th>评定日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCreditBAboveTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-stat-value">第 1 页 / 共 54100 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCreditBAboveTableRows() {
        const levels = ['A级', 'B级'];
        const industries = ['制造业', '批发零售', '信息技术', '住宿餐饮', '建筑业'];
        const names = ['海南科技有限公司', '三亚贸易有限公司', '海口信息技术企业', '文昌生物科技', '琼海新材料公司'];
        const allItems = [];
        for (let i = 1; i <= 270500; i++) {
            allItems.push({
                name: names[i % 5] + i,
                code: `9146${String(i).padStart(10, '0')}`,
                level: levels[i % 2],
                industry: industries[i % 5],
                date: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        const levelColors = { 'A级': '#ffcc00', 'B级': '#ff7f50' };
        return items.map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.code}</td>
                <td><span style="color: ${levelColors[item.level]};">${item.level}</span></td>
                <td>${item.industry}</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderCreditBRatioNewModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信用等级B级及以上占比分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">市场主体总数</span>
                        <span class="indicator-stat-value">700.12万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">B级及以上主体数</span>
                        <span class="indicator-stat-value">630.11万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">C级及以下主体数</span>
                        <span class="indicator-stat-value">70.01万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">B级及以上占比</span>
                        <span class="indicator-stat-value">90%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">B级及以上 vs C级及以下</span>
                        <div id="modal-credit-ratio-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市县B级及以上占比排行</span>
                        <div id="modal-credit-ratio-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>市县名称</th>
                                <th>市场主体总数</th>
                                <th>B级及以上数量</th>
                                <th>占比</th>
                                <th>C级数量</th>
                                <th>D级数量</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCreditBRatioTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-stat-value">第 1 页 / 共 4 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCreditBRatioTableRows() {
        const cities = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈', '临高', '定安'];
        const allItems = [];
        for (let i = 0; i < cities.length; i++) {
            const total = Math.floor(Math.random() * 50000) + 10000;
            const aboveB = Math.floor(total * (0.85 + Math.random() * 0.1));
            const c = Math.floor((total - aboveB) * 0.7);
            const d = total - aboveB - c;
            allItems.push({
                city: cities[i],
                total: total,
                aboveB: aboveB,
                ratio: ((aboveB / total) * 100).toFixed(2) + '%',
                c: c,
                d: d
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${item.city}</td>
                <td>${item.total.toLocaleString()}</td>
                <td>${item.aboveB.toLocaleString()}</td>
                <td>${item.ratio}</td>
                <td>${item.c.toLocaleString()}</td>
                <td>${item.d.toLocaleString()}</td>
            </tr>
        `).join('');
    }

    renderCreditViolationRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">市场主体违法行为发生率分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">市场主体总数</span>
                        <span class="indicator-stat-value">700.12万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">违法行为主体数</span>
                        <span class="indicator-stat-value">2,100户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">无违法行为主体数</span>
                        <span class="indicator-stat-value">699.91万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">违法行为发生率</span>
                        <span class="indicator-stat-value">0.03%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域违法行为发生率情况</span>
                        <div id="modal-credit-violation-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">违法类型分布</span>
                        <div id="modal-credit-violation-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>企业名称</th>
                                <th>统一社会信用代码</th>
                                <th>所属领域</th>
                                <th>违法类型</th>
                                <th>整改状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCreditViolationTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-stat-value">第 1 页 / 共 60 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCreditViolationTableRows() {
        const domains = ['市场监管', '生态环境', '交通运输', '卫生健康', '自然资源'];
        const types = ['价格违法', '产品质量', '虚假宣传', '无证经营', '安全生产', '环境污染'];
        const names = ['海南违规企业', '三亚违法企业', '海口问题企业'];
        const statuses = ['已整改', '整改中', '待整改'];
        const allItems = [];
        for (let i = 1; i <= 300; i++) {
            allItems.push({
                name: names[i % 3] + i,
                code: `9146${String(i).padStart(10, '0')}`,
                domain: domains[i % 5],
                type: types[i % 6],
                status: statuses[i % 3]
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        const statusColors = { '已整改': '#ffcc00', '整改中': '#ffcc00', '待整改': '#ff3b30' };
        return items.map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.code}</td>
                <td>${item.domain}</td>
                <td>${item.type}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    // ==================== 今日审批指标弹窗 ====================
    renderAvgProcessTimeModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">平均办件时长分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">高效办成一件事平均办件时长</span>
                        <span class="indicator-stat-value">1.2天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">极简审批平均办件时长</span>
                        <span class="indicator-stat-value">1.5天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">智能快办平均办件时长</span>
                        <span class="indicator-stat-value">0.8天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">免申即享平均办件时长</span>
                        <span class="indicator-stat-value">0.5天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">全省通办平均办件时长</span>
                        <span class="indicator-stat-value">1.0天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">其他平均办件时长</span>
                        <span class="indicator-stat-value">2.0天</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 7fr 3fr;">
                    <div class="indicator-chart-item">
                        <div class="modal-chart-tabs">
                            <span class="modal-chart-tab active" onclick="window.homePage.switchAvgTimeTab('domain')">领域</span>
                            <span class="modal-chart-tab" onclick="window.homePage.switchAvgTimeTab('item')">事项</span>
                            <span class="modal-chart-tab" onclick="window.homePage.switchAvgTimeTab('city')">市县</span>
                        </div>
                        <span class="indicator-chart-title">各办件类型平均时长排行</span>
                        <div id="modal-avg-time-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">办件时长区间分布</span>
                        <div id="modal-avg-time-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>事项名称</th>
                                <th>办件类型</th>
                                <th>办件时长（天）</th>
                                <th>办理部门</th>
                                <th>办结日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateAvgTimeTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 200 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateAvgTimeTableRows() {
        const types = ['高效办成一件事', '极简审批', '智能快办', '免申即享', '全省通办', '其他'];
        const depts = ['市场监管局', '行政审批局', '卫生健康委', '自然资源局', '交通运输局'];
        const names = ['食品经营许可证', '营业执照变更', '企业登记', '税务登记', '道路运输许可', '医疗机构备案'];
        const allItems = [];
        for (let i = 1; i <= 1000; i++) {
            const type = types[i % 6];
            let time = 0;
            if (type === '高效办成一件事') time = (Math.random() * 1 + 0.5).toFixed(1);
            else if (type === '极简审批') time = (Math.random() * 1 + 0.8).toFixed(1);
            else if (type === '智能快办') time = (Math.random() * 0.5 + 0.3).toFixed(1);
            else if (type === '免申即享') time = (Math.random() * 0.3 + 0.2).toFixed(1);
            else if (type === '全省通办') time = (Math.random() * 0.8 + 0.5).toFixed(1);
            else time = (Math.random() * 1.5 + 1).toFixed(1);
            allItems.push({
                name: names[i % 6],
                type: type,
                time: time,
                dept: depts[i % 5],
                date: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td>${item.dept}</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderProjectApprovalLandingModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">项目审批到落地时长分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">工业项目平均用时</span>
                        <span class="indicator-stat-value">8.5天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">商业项目平均用时</span>
                        <span class="indicator-stat-value">9.9天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">服务业项目平均用时</span>
                        <span class="indicator-stat-value">7.2天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">基础设施项目平均用时</span>
                        <span class="indicator-stat-value">11.5天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">其他项目平均用时</span>
                        <span class="indicator-stat-value">6.8天</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各项目类型平均时长对比</span>
                        <div id="modal-project-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各项目类型数量占比</span>
                        <div id="modal-project-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>项目名称</th>
                                <th>项目类型</th>
                                <th>审批用时（天）</th>
                                <th>落地用时（天）</th>
                                <th>总用时（天）</th>
                                <th>完成日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateProjectTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 50 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateProjectTableRows() {
        const types = ['工业项目', '商业项目', '服务业项目', '基础设施项目', '其他'];
        const names = ['海南智能制造产业园', '三亚商业综合体', '海口物流中心', '文昌新能源项目', '琼海医疗健康项目'];
        const allItems = [];
        for (let i = 1; i <= 250; i++) {
            const approvalTime = (Math.random() * 4 + 2).toFixed(1);
            const landingTime = (Math.random() * 6 + 3).toFixed(1);
            const totalTime = (parseFloat(approvalTime) + parseFloat(landingTime)).toFixed(1);
            allItems.push({
                name: names[i % 5] + i,
                type: types[i % 5],
                approval: approvalTime,
                landing: landingTime,
                total: totalTime,
                date: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.approval}</td>
                <td>${item.landing}</td>
                <td>${item.total}</td>
                <td>${item.date}</td>
            </tr>
        `).join('');
    }

    renderAdminCheckYearOnYearModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">行政检查同比变化分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">去年同期行政检查次数</span>
                        <span class="indicator-stat-value">1,256次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今年同期行政检查次数</span>
                        <span class="indicator-stat-value">1,156次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比减少</span>
                        <span class="indicator-stat-value">100次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比变化率</span>
                        <span class="indicator-stat-value">-8%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月行政检查次数趋势</span>
                        <div id="modal-check-trend-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域行政检查分布及同比变化</span>
                        <div id="modal-check-dist-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>检查领域</th>
                                <th>今年检查次数</th>
                                <th>去年同期检查次数</th>
                                <th>同比变化率（%）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCheckYearOnYearTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 20 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCheckYearOnYearTableRows() {
        const domains = ['市场监管', '卫生健康', '自然资源', '生态环境', '交通运输'];
        const allItems = [];
        for (let i = 1; i <= 100; i++) {
            const lastYear = Math.floor(Math.random() * 50) + 20;
            const thisYear = Math.floor(lastYear * (0.85 + Math.random() * 0.2));
            const rate = ((thisYear - lastYear) / lastYear * 100).toFixed(1);
            allItems.push({
                code: `JW${String(i).padStart(6, '0')}`,
                domain: domains[i % 5],
                thisYear: thisYear,
                lastYear: lastYear,
                rate: rate
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.domain}</td>
                <td>${item.thisYear}</td>
                <td>${item.lastYear}</td>
                <td style="color: ${parseFloat(item.rate) >= 0 ? '#ff3b30' : '#ffcc00'};">${item.rate}%</td>
            </tr>
        `).join('');
    }

    renderFirstOffenseExemptionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">首违不罚、轻微免罚同比变化分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">去年同期案件数</span>
                        <span class="indicator-stat-value">89件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今年同期案件数</span>
                        <span class="indicator-stat-value">100件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增加</span>
                        <span class="indicator-stat-value">11件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比增长率</span>
                        <span class="indicator-stat-value">12%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月趋势（今年与去年对比）</span>
                        <div id="modal-exempt-trend-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">首违不罚与轻微免罚占比</span>
                        <div id="modal-exempt-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>案件编号</th>
                                <th>当事人名称</th>
                                <th>案件类型</th>
                                <th>决定日期</th>
                                <th>适用依据</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateExemptTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 20 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateExemptTableRows() {
        const types = ['首违不罚', '轻微免罚'];
        const names = ['海南科技有限公司', '三亚贸易有限公司', '海口信息技术企业', '文昌生物科技', '琼海新材料公司'];
        const laws = ['《行政处罚法》第三十三条', '《市场监督管理行政处罚裁量权规定》', '《优化营商环境条例》', '《海南自由贸易港优化营商环境条例》'];
        const allItems = [];
        for (let i = 1; i <= 100; i++) {
            allItems.push({
                code: `AJ${String(i).padStart(6, '0')}`,
                name: names[i % 5] + i,
                type: types[i % 2],
                date: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                law: laws[i % 4]
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.date}</td>
                <td>${item.law}</td>
            </tr>
        `).join('');
    }

    renderTransferSupervisionNetModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">移交监督一张网分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">移交监督一张网总数</span>
                        <span class="indicator-stat-value">12件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已办结</span>
                        <span class="indicator-stat-value">8件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">办理中</span>
                        <span class="indicator-stat-value">2件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">重点督办</span>
                        <span class="indicator-stat-value">2件</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">移交事项类型分布</span>
                        <div id="modal-transfer-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域移交数量排行</span>
                        <div id="modal-transfer-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>移交编号</th>
                                <th>事项名称</th>
                                <th>事项类型</th>
                                <th>移交部门</th>
                                <th>接收部门</th>
                                <th>移交时间</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTransferTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 3 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderOffsiteSupervisionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">非现场监管智能监控平台</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监管场景数</span>
                        <span class="indicator-stat-value">15个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">场景内行为数</span>
                        <span class="indicator-stat-value">2,856次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接入监控点位</span>
                        <span class="indicator-stat-value">1,286个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">在线率</span>
                        <span class="indicator-stat-value">97.5%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域场景数量</span>
                        <div id="modal-offsite-list" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市县场景分布</span>
                        <div id="modal-offsite-trend" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>场景名称</th>
                                <th>所属领域</th>
                                <th>所属市县</th>
                                <th>监控点位</th>
                                <th>行为数</th>
                                <th>创建时间</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateOffsiteTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 4 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateOffsiteTableRows() {
        const domains = ['生态环境', '安全生产', '市场监管', '交通运输'];
        const cities = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市'];
        const sceneNames = ['明厨亮灶', '盗采河沙', '水质监测', '视频监控', 'AI识别', '遥感监测'];
        const allItems = [];
        for (let i = 1; i <= 15; i++) {
            const idx = (i - 1) % 6;
            const domain = domains[(i - 1) % 4];
            allItems.push({
                name: `${sceneNames[idx]}场景${i}`,
                domain: domain,
                city: cities[i % 5],
                points: Math.floor(Math.random() * 100) + 50,
                behaviors: Math.floor(Math.random() * 500) + 100,
                createTime: `2025-0${Math.floor(Math.random() * 12) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                status: Math.random() > 0.1 ? '运行中' : '维护中'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '运行中': '#ff9500', '维护中': '#ffcc00' };
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.domain}</td>
                <td>${item.city}</td>
                <td>${item.points}</td>
                <td>${item.behaviors}</td>
                <td>${item.createTime}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderBrightKitchenModal() {
        return `
            <div class="indicator-modal" style="width:90vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">明厨亮灶智慧监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats" style="margin-bottom:12px;">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接入餐饮商家</span>
                        <span class="indicator-stat-value">1,235家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">在线摄像头</span>
                        <span class="indicator-stat-value">2,891路</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日违规预警</span>
                        <span class="indicator-stat-value">23次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已整改</span>
                        <span class="indicator-stat-value">19家(82.6%)</span>
                    </div>
                </div>
                <div style="display:flex;height:600px;">
                    <div style="width:260px;background:rgba(0,0,0,0.3);border-right:1px solid rgba(255,149,0,0.3);display:flex;flex-direction:column;">
                        <div style="padding:8px 12px;border-bottom:1px solid rgba(255,149,0,0.3);">
                            <span style="color:#fff;font-size:13px;font-weight:bold;">区划筛选</span>
                        </div>
                        <div style="padding:8px;">
                            <div class="monitor-filter-item active" onclick="window.homePage.switchKitchenRegion('全部')">全部</div>
                            <div class="monitor-filter-item" onclick="window.homePage.switchKitchenRegion('海口市')">海口市</div>
                            <div class="monitor-filter-item" onclick="window.homePage.switchKitchenRegion('三亚市')">三亚市</div>
                            <div class="monitor-filter-item" onclick="window.homePage.switchKitchenRegion('儋州市')">儋州市</div>
                        </div>
                        <div style="padding:8px 12px;border-bottom:1px solid rgba(255,149,0,0.3);border-top:1px solid rgba(255,149,0,0.3);">
                            <span style="color:#fff;font-size:13px;font-weight:bold;">商家列表</span>
                        </div>
                        <div style="flex:1;overflow-y:auto;padding:8px;">
                            <div class="monitor-shop-item active" onclick="window.homePage.switchKitchenShop('海南酒家 - 国贸店')">
                                <div style="font-size:13px;color:#fff;">海南酒家 - 国贸店</div>
                                <div style="font-size:11px;color:rgba(255,255,255,0.6);">在线 | 4路摄像头</div>
                            </div>
                            <div class="monitor-shop-item" onclick="window.homePage.switchKitchenShop('文昌鸡饭店')">
                                <div style="font-size:13px;color:#fff;">文昌鸡饭店</div>
                                <div style="font-size:11px;color:rgba(255,255,255,0.6);">在线 | 3路摄像头</div>
                            </div>
                            <div class="monitor-shop-item" onclick="window.homePage.switchKitchenShop('和乐蟹餐厅')">
                                <div style="font-size:13px;color:#fff;">和乐蟹餐厅</div>
                                <div style="font-size:11px;color:rgba(255,255,255,0.6);">离线 | 2路摄像头</div>
                            </div>
                            <div class="monitor-shop-item" onclick="window.homePage.switchKitchenShop('加积鸭酒楼')">
                                <div style="font-size:13px;color:#fff;">加积鸭酒楼</div>
                                <div style="font-size:11px;color:rgba(255,255,255,0.6);">在线 | 3路摄像头</div>
                            </div>
                            <div class="monitor-shop-item" onclick="window.homePage.switchKitchenShop('东山羊庄')">
                                <div style="font-size:13px;color:#fff;">东山羊庄</div>
                                <div style="font-size:11px;color:rgba(255,255,255,0.6);">在线 | 2路摄像头</div>
                            </div>
                        </div>
                    </div>
                    <div style="flex:1;display:flex;flex-direction:column;background:#000;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:rgba(0,0,0,0.6);border-bottom:1px solid rgba(255,149,0,0.3);">
                            <div>
                                <span style="color:#fff;font-size:14px;font-weight:bold;">当前监控：</span>
                                <span id="kitchen-current-shop" style="color:#ff9500;font-size:14px;">海南酒家 - 国贸店</span>
                                <span style="color:rgba(255,255,255,0.6);font-size:12px;margin-left:12px;">| 区域：<span id="kitchen-current-region">海口市</span></span>
                            </div>
                            <span style="color:#ff3b30;font-size:12px;font-weight:bold;">● LIVE</span>
                        </div>
                        <div style="flex:1;position:relative;overflow:hidden;">
                            <img id="kitchen-video-img" src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=restaurant%20kitchen%20with%20chefs%20cooking%20professional%20equipment%20clean%20environment%20surveillance%20camera%20view&image_size=landscape_16_9" 
                                 style="width:100%;height:100%;object-fit:cover;"/>
                            <div id="kitchen-ai-alert" style="position:absolute;top:20px;right:20px;background:rgba(255,59,48,0.9);padding:8px 16px;border-radius:4px;display:flex;align-items:center;gap:8px;">
                                <span style="color:#fff;font-size:12px;font-weight:bold;">⚠️ AI识别：未戴口罩</span>
                            </div>
                            <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.8));padding:16px;">
                                <div style="color:#fff;font-size:13px;">实时监控画面</div>
                                <div style="color:rgba(255,255,255,0.6);font-size:11px;">${new Date().toLocaleString()}</div>
                            </div>
                        </div>
                        <div style="padding:8px 12px;background:rgba(0,0,0,0.6);border-top:1px solid rgba(255,149,0,0.3);">
                            <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
                                <div class="monitor-camera-item active" onclick="window.homePage.switchKitchenCamera('后厨A区')">
                                    <div style="width:80px;height:45px;background:rgba(255,149,0,0.2);border:2px solid #ff9500;border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
                                        <span style="color:#ff9500;font-size:10px;">A</span>
                                    </div>
                                    <span style="color:#fff;font-size:11px;">后厨A区</span>
                                </div>
                                <div class="monitor-camera-item" onclick="window.homePage.switchKitchenCamera('后厨B区')">
                                    <div style="width:80px;height:45px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
                                        <span style="color:rgba(255,255,255,0.5);font-size:10px;">B</span>
                                    </div>
                                    <span style="color:rgba(255,255,255,0.6);font-size:11px;">后厨B区</span>
                                </div>
                                <div class="monitor-camera-item" onclick="window.homePage.switchKitchenCamera('备餐区')">
                                    <div style="width:80px;height:45px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
                                        <span style="color:rgba(255,255,255,0.5);font-size:10px;">C</span>
                                    </div>
                                    <span style="color:rgba(255,255,255,0.6);font-size:11px;">备餐区</span>
                                </div>
                                <div class="monitor-camera-item warning" onclick="window.homePage.switchKitchenCamera('凉菜间')">
                                    <div style="width:80px;height:45px;background:rgba(255,59,48,0.2);border:2px solid #ff3b30;border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
                                        <span style="color:#ff3b30;font-size:10px;">⚠️</span>
                                    </div>
                                    <span style="color:#fff;font-size:11px;">凉菜间</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="indicator-modal-content" style="margin-top:12px;">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>商家名称</th>
                                <th>预警类型</th>
                                <th>预警时间</th>
                                <th>预警截图</th>
                                <th>整改状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateKitchenTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 5 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    switchKitchenRegion(region) {
        const regionItems = document.querySelectorAll('.monitor-filter-item');
        regionItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent === region) {
                item.classList.add('active');
            }
        });
        const regionSpan = document.getElementById('kitchen-current-region');
        if (regionSpan) {
            regionSpan.textContent = region;
        }
    }

    switchKitchenShop(shop) {
        const shopItems = document.querySelectorAll('.monitor-shop-item');
        shopItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent.includes(shop)) {
                item.classList.add('active');
            }
        });
        const shopSpan = document.getElementById('kitchen-current-shop');
        if (shopSpan) {
            shopSpan.textContent = shop;
        }
    }

    switchKitchenCamera(camera) {
        const cameraItems = document.querySelectorAll('.monitor-camera-item');
        cameraItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent.includes(camera)) {
                item.classList.add('active');
            }
        });
        const shopSpan = document.getElementById('kitchen-current-shop');
        if (shopSpan) {
            shopSpan.textContent = shopSpan.textContent.split(' - ')[0] + ' - ' + camera;
        }
    }

    generateKitchenTableRows() {
        const shops = ['海南酒家', '文昌鸡饭店', '和乐蟹餐厅', '加积鸭酒楼', '东山羊庄'];
        const types = ['未戴帽子', '未戴口罩', '老鼠活动', '地面湿滑'];
        const allItems = [];
        for (let i = 1; i <= 23; i++) {
            allItems.push({
                code: `YJ${String(i).padStart(6, '0')}`,
                shop: shops[i % 5],
                type: types[i % 4],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i <= 19 ? '已整改' : '整改中'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '已整改': '#ffcc00', '整改中': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.shop}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span style="color:#ff9500;cursor:pointer;">查看</span></td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderSandTheftModal() {
        return `
            <div class="indicator-modal" style="width:90vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">盗采河沙智能监控预警</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats" style="margin-bottom:12px;">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控河道</span>
                        <span class="indicator-stat-value">32条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控点位</span>
                        <span class="indicator-stat-value">156个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日预警</span>
                        <span class="indicator-stat-value">8次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">确认盗采</span>
                        <span class="indicator-stat-value">3起</span>
                    </div>
                </div>
                <div style="display:flex;height:600px;">
                    <div style="width:260px;background:rgba(0,0,0,0.3);border-right:1px solid rgba(255,59,48,0.3);display:flex;flex-direction:column;">
                        <div style="padding:8px 12px;border-bottom:1px solid rgba(255,59,48,0.3);">
                            <span style="color:#fff;font-size:13px;font-weight:bold;">区划筛选</span>
                        </div>
                        <div style="padding:8px;">
                            <div class="monitor-filter-item active" onclick="window.homePage.switchSandRegion('全部')">全部</div>
                            <div class="monitor-filter-item" onclick="window.homePage.switchSandRegion('琼海市')">琼海市</div>
                            <div class="monitor-filter-item" onclick="window.homePage.switchSandRegion('万宁市')">万宁市</div>
                            <div class="monitor-filter-item" onclick="window.homePage.switchSandRegion('文昌市')">文昌市</div>
                        </div>
                        <div style="padding:8px 12px;border-bottom:1px solid rgba(255,59,48,0.3);border-top:1px solid rgba(255,59,48,0.3);">
                            <span style="color:#fff;font-size:13px;font-weight:bold;">河道列表</span>
                        </div>
                        <div style="flex:1;overflow-y:auto;padding:8px;">
                            <div class="monitor-shop-item active sand-high" onclick="window.homePage.switchSandRiver('万泉河 - 琼海段')">
                                <div style="font-size:13px;color:#fff;">万泉河 - 琼海段</div>
                                <div style="font-size:11px;color:#ff3b30;">高风险 | 今日预警3次</div>
                            </div>
                            <div class="monitor-shop-item sand-medium" onclick="window.homePage.switchSandRiver('龙滚河 - 万宁段')">
                                <div style="font-size:13px;color:#fff;">龙滚河 - 万宁段</div>
                                <div style="font-size:11px;color:#ff9500;">中风险 | 今日预警2次</div>
                            </div>
                            <div class="monitor-shop-item sand-low" onclick="window.homePage.switchSandRiver('文教河 - 文昌段')">
                                <div style="font-size:13px;color:#fff;">文教河 - 文昌段</div>
                                <div style="font-size:11px;color:#ffcc00;">低风险 | 今日预警1次</div>
                            </div>
                            <div class="monitor-shop-item sand-low" onclick="window.homePage.switchSandRiver('九曲江')">
                                <div style="font-size:13px;color:#fff;">九曲江</div>
                                <div style="font-size:11px;color:#ffcc00;">低风险 | 今日预警0次</div>
                            </div>
                            <div class="monitor-shop-item sand-medium" onclick="window.homePage.switchSandRiver('太阳河')">
                                <div style="font-size:13px;color:#fff;">太阳河</div>
                                <div style="font-size:11px;color:#ff9500;">中风险 | 今日预警2次</div>
                            </div>
                        </div>
                    </div>
                    <div style="flex:1;display:flex;flex-direction:column;background:#000;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:rgba(0,0,0,0.6);border-bottom:1px solid rgba(255,59,48,0.3);">
                            <div>
                                <span style="color:#fff;font-size:14px;font-weight:bold;">当前监控：</span>
                                <span id="sand-current-river" style="color:#ff3b30;font-size:14px;">万泉河 - 琼海段</span>
                                <span style="color:rgba(255,255,255,0.6);font-size:12px;margin-left:12px;">| 区域：<span id="sand-current-region">琼海市</span></span>
                            </div>
                            <span style="color:#ff3b30;font-size:12px;font-weight:bold;">● LIVE</span>
                        </div>
                        <div style="flex:1;position:relative;overflow:hidden;">
                            <img id="sand-video-img" src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=river%20sand%20mining%20surveillance%20camera%20view%20boats%20water%20natural%20environment%20night%20vision&image_size=landscape_16_9" 
                                 style="width:100%;height:100%;object-fit:cover;"/>
                            <div id="sand-ai-alert" style="position:absolute;top:20px;right:20px;background:rgba(255,59,48,0.9);padding:8px 16px;border-radius:4px;display:flex;align-items:center;gap:8px;">
                                <span style="color:#fff;font-size:12px;font-weight:bold;">⚠️ AI识别：异常船只靠近</span>
                            </div>
                            <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.8));padding:16px;">
                                <div style="color:#fff;font-size:13px;">实时监控画面</div>
                                <div style="color:rgba(255,255,255,0.6);font-size:11px;">${new Date().toLocaleString()}</div>
                            </div>
                        </div>
                        <div style="padding:8px 12px;background:rgba(0,0,0,0.6);border-top:1px solid rgba(255,59,48,0.3);">
                            <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
                                <div class="monitor-camera-item" onclick="window.homePage.switchSandCamera('上游监控点')">
                                    <div style="width:80px;height:45px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
                                        <span style="color:rgba(255,255,255,0.5);font-size:10px;">上</span>
                                    </div>
                                    <span style="color:rgba(255,255,255,0.6);font-size:11px;">上游监控点</span>
                                </div>
                                <div class="monitor-camera-item active warning" onclick="window.homePage.switchSandCamera('中游监控点')">
                                    <div style="width:80px;height:45px;background:rgba(255,59,48,0.2);border:2px solid #ff3b30;border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
                                        <span style="color:#ff3b30;font-size:10px;">⚠️</span>
                                    </div>
                                    <span style="color:#fff;font-size:11px;">中游监控点</span>
                                </div>
                                <div class="monitor-camera-item" onclick="window.homePage.switchSandCamera('下游监控点')">
                                    <div style="width:80px;height:45px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
                                        <span style="color:rgba(255,255,255,0.5);font-size:10px;">下</span>
                                    </div>
                                    <span style="color:rgba(255,255,255,0.6);font-size:11px;">下游监控点</span>
                                </div>
                                <div class="monitor-camera-item" onclick="window.homePage.switchSandCamera('桥梁监控点')">
                                    <div style="width:80px;height:45px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
                                        <span style="color:rgba(255,255,255,0.5);font-size:10px;">桥</span>
                                    </div>
                                    <span style="color:rgba(255,255,255,0.6);font-size:11px;">桥梁监控点</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="indicator-modal-content" style="margin-top:12px;">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>河道名称</th>
                                <th>监控点位</th>
                                <th>预警类型</th>
                                <th>预警时间</th>
                                <th>确认状态</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSandTheftTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 2 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    switchSandRegion(region) {
        const regionItems = document.querySelectorAll('.monitor-filter-item');
        regionItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent === region) {
                item.classList.add('active');
            }
        });
        const regionSpan = document.getElementById('sand-current-region');
        if (regionSpan) {
            regionSpan.textContent = region;
        }
    }

    switchSandRiver(river) {
        const riverItems = document.querySelectorAll('.monitor-shop-item');
        riverItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent.includes(river)) {
                item.classList.add('active');
            }
        });
        const riverSpan = document.getElementById('sand-current-river');
        if (riverSpan) {
            riverSpan.textContent = river;
        }
    }

    switchSandCamera(camera) {
        const cameraItems = document.querySelectorAll('.monitor-camera-item');
        cameraItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent.includes(camera)) {
                item.classList.add('active');
            }
        });
    }

    generateSandTheftTableRows() {
        const rivers = ['万泉河', '南渡江', '昌化江', '陵水河'];
        const types = ['异常船只', '挖掘机作业', '车辆出入', '水位异常'];
        const allItems = [];
        for (let i = 1; i <= 8; i++) {
            let confirmStatus = '待核实';
            if (i <= 3) confirmStatus = '已确认';
            else if (i === 7) confirmStatus = '误报';
            allItems.push({
                code: `YJ${String(i).padStart(6, '0')}`,
                river: rivers[i % 4],
                point: `监控点${i}`,
                type: types[i % 4],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                confirm: confirmStatus,
                status: i <= 6 ? '已处置' : '待处置'
            });
        }
        const items = allItems.slice(0, 5);
        const confirmColors = { '已确认': '#ff3b30', '待核实': '#ff9500', '误报': '#ffcc00' };
        const statusColors = { '已处置': '#ffcc00', '待处置': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.river}</td>
                <td>${item.point}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span style="color: ${confirmColors[item.confirm]};">${item.confirm}</span></td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderSandboxSupervisionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">沙盒监管创新试点</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监管场景数</span>
                        <span class="indicator-stat-value">32个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">场景内企业数</span>
                        <span class="indicator-stat-value">89家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计检查次数</span>
                        <span class="indicator-stat-value">256次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">问题发现率</span>
                        <span class="indicator-stat-value">8.9%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域场景数量</span>
                        <div id="modal-sandbox-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">场景类型分布</span>
                        <div id="modal-sandbox-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>场景名称</th>
                                <th>所属领域</th>
                                <th>涉及企业数</th>
                                <th>检查次数</th>
                                <th>发现问题数</th>
                                <th>创建时间</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSandboxTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 8 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateSandboxTableRows() {
        const domains = ['医疗健康', '金融科技', '数字经济', '高端制造', '现代服务业', '农业科技'];
        const sceneNames = ['乐城医疗器械试点', '南繁育种试点', '创新药物研发', '互联网保险', '跨境电商', '智能制造'];
        const allItems = [];
        for (let i = 1; i <= 32; i++) {
            const idx = (i - 1) % 6;
            const domain = domains[idx];
            allItems.push({
                name: `${sceneNames[idx]}场景${i}`,
                domain: domain,
                enterprises: Math.floor(Math.random() * 10) + 2,
                inspections: Math.floor(Math.random() * 20) + 5,
                problems: Math.floor(Math.random() * 5),
                createTime: `2025-0${Math.floor(Math.random() * 12) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                status: Math.random() > 0.1 ? '运行中' : '暂停'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '运行中': '#ff9500', '暂停': '#ffcc00' };
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.domain}</td>
                <td>${item.enterprises}</td>
                <td>${item.inspections}</td>
                <td>${item.problems}</td>
                <td>${item.createTime}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderTriggerSupervisionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">触发式监管智能预警</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监管场景数</span>
                        <span class="indicator-stat-value">89个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计预警数</span>
                        <span class="indicator-stat-value">1,256次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计行为数</span>
                        <span class="indicator-stat-value">3,892次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">自动处置率</span>
                        <span class="indicator-stat-value">84.4%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域场景数量</span>
                        <div id="modal-trigger-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市县场景分布</span>
                        <div id="modal-trigger-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>场景名称</th>
                                <th>所属领域</th>
                                <th>所属市县</th>
                                <th>预警数</th>
                                <th>行为数</th>
                                <th>自动处置率</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTriggerTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 18 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateTriggerTableRows() {
        const domains = ['市场监管', '生态环境', '安全生产', '税务', '人力资源'];
        const cities = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市'];
        const sceneNames = ['风险预警', '网络舆情', '异常监测', '合规检测', '信用评估', '行为分析'];
        const allItems = [];
        for (let i = 1; i <= 89; i++) {
            const idx = (i - 1) % 6;
            const domain = domains[(i - 1) % 5];
            const autoRate = (Math.random() * 20 + 70).toFixed(1);
            allItems.push({
                name: `${sceneNames[idx]}场景${i}`,
                domain: domain,
                city: cities[i % 5],
                warnings: Math.floor(Math.random() * 50) + 5,
                behaviors: Math.floor(Math.random() * 100) + 20,
                autoRate: `${autoRate}%`,
                status: Math.random() > 0.05 ? '运行中' : '暂停'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '运行中': '#ff9500', '暂停': '#ffcc00' };
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.domain}</td>
                <td>${item.city}</td>
                <td>${item.warnings}</td>
                <td>${item.behaviors}</td>
                <td>${item.autoRate}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderLechengMedicalModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">乐城医疗器械试点监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">试点医疗机构</span>
                        <span class="indicator-stat-value">23家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">特许药械品种</span>
                        <span class="indicator-stat-value">189种</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计使用人次</span>
                        <span class="indicator-stat-value">3,456人次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">不良事件报告</span>
                        <span class="indicator-stat-value">3件</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各医疗机构特许药械使用量排行</span>
                        <div id="modal-lecheng-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">特许药械类别分布</span>
                        <div id="modal-lecheng-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>机构名称</th>
                                <th>特许药械名称</th>
                                <th>类别</th>
                                <th>首次使用日期</th>
                                <th>累计使用人次</th>
                                <th>不良事件</th>
                                <th>监管状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateLechengTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 38 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateLechengTableRows() {
        const hospitals = ['博鳌超级医院', '恒大国际医院', '莱佛士医院', '一龄医院', '慈铭博鳌'];
        const categories = ['影像设备', '植入器械', '检测试剂', '治疗设备', '其他'];
        const allItems = [];
        for (let i = 1; i <= 189; i++) {
            let adverse = '否';
            if (i === 10 || i === 55 || i === 120) adverse = '是';
            let status = '正常';
            if (adverse === '是') status = '重点关注';
            allItems.push({
                hospital: hospitals[i % 5],
                name: `特许药械${i}`,
                category: categories[i % 5],
                firstUse: `2025-0${Math.floor(Math.random() * 12) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                count: Math.floor(Math.random() * 50) + 1,
                adverse: adverse,
                status: status
            });
        }
        const items = allItems.slice(0, 5);
        const adverseColors = { '是': '#ff3b30', '否': '#ffcc00' };
        const statusColors = { '正常': '#ffcc00', '重点关注': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.hospital}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.firstUse}</td>
                <td>${item.count}</td>
                <td><span style="color: ${adverseColors[item.adverse]};">${item.adverse}</span></td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderNfanBreedingModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">南繁育种试点监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">试点育种单位</span>
                        <span class="indicator-stat-value">56家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">育种基地</span>
                        <span class="indicator-stat-value">128个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">种子进出口批次</span>
                        <span class="indicator-stat-value">234批</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">检疫合格率</span>
                        <span class="indicator-stat-value">98.7%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各育种单位种植面积排行</span>
                        <div id="modal-nfan-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">育种作物类型分布</span>
                        <div id="modal-nfan-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>单位名称</th>
                                <th>基地位置</th>
                                <th>主要育种作物</th>
                                <th>种植面积(亩)</th>
                                <th>种子进出口批次</th>
                                <th>检疫结果</th>
                                <th>监管状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateNfanTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 26 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateNfanTableRows() {
        const crops = ['水稻', '玉米', '棉花', '大豆', '蔬菜'];
        const locations = ['三亚', '陵水', '乐东', '文昌', '琼海'];
        const allItems = [];
        for (let i = 1; i <= 128; i++) {
            let quarantine = '合格';
            if (i === 15 || i === 78) quarantine = '不合格';
            allItems.push({
                name: `育种单位${i}`,
                location: locations[i % 5],
                crop: crops[i % 5],
                area: Math.floor(Math.random() * 500) + 50,
                batches: Math.floor(Math.random() * 10) + 1,
                quarantine: quarantine,
                status: quarantine === '合格' ? '正常' : '重点关注'
            });
        }
        const items = allItems.slice(0, 5);
        const quarantineColors = { '合格': '#ffcc00', '不合格': '#ff3b30' };
        const statusColors = { '正常': '#ffcc00', '重点关注': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.location}</td>
                <td>${item.crop}</td>
                <td>${item.area}</td>
                <td>${item.batches}</td>
                <td><span style="color: ${quarantineColors[item.quarantine]};">${item.quarantine}</span></td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderNetworkPublicOpinionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">网络舆情风险监测</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监测关键词</span>
                        <span class="indicator-stat-value">128个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日舆情信息</span>
                        <span class="indicator-stat-value">1,234条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">敏感舆情</span>
                        <span class="indicator-stat-value">45条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已处置舆情</span>
                        <span class="indicator-stat-value">43条(95.6%)</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近7天敏感舆情趋势</span>
                        <div id="modal-opinion-line" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">舆情情感分布</span>
                        <div id="modal-opinion-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>舆情编号</th>
                                <th>舆情标题</th>
                                <th>来源平台</th>
                                <th>情感倾向</th>
                                <th>发布时间</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateOpinionTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 247 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateOpinionTableRows() {
        const platforms = ['微博', '微信', '抖音', '今日头条', '小红书'];
        const sentiments = ['正面', '中性', '负面'];
        const allItems = [];
        for (let i = 1; i <= 1234; i++) {
            let sentiment = sentiments[i % 3];
            if (i <= 45) sentiment = '负面';
            let status = '已处置';
            if (i <= 2) status = '处置中';
            if (i === 3) status = '待处置';
            allItems.push({
                code: `YQ${String(i).padStart(6, '0')}`,
                title: `舆情标题${i}`,
                platform: platforms[i % 5],
                sentiment: sentiment,
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: status
            });
        }
        const items = allItems.slice(0, 5);
        const sentimentColors = { '正面': '#ffcc00', '中性': 'rgba(255,255,255,0.6)', '负面': '#ff3b30' };
        const statusColors = { '已处置': '#ffcc00', '处置中': '#ff9500', '待处置': '#ff3b30' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.title}</td>
                <td>${item.platform}</td>
                <td><span style="color: ${sentimentColors[item.sentiment]};">${item.sentiment}</span></td>
                <td>${item.time}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderSafetyProductionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">安全生产智能监控</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接入企业</span>
                        <span class="indicator-stat-value">456家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控点位</span>
                        <span class="indicator-stat-value">2,345个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日预警</span>
                        <span class="indicator-stat-value">12次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">重大隐患</span>
                        <span class="indicator-stat-value">3个</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 4fr 6fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">接入企业列表</span>
                        <div id="modal-safety-list" class="indicator-chart-container" style="height: 300px;"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                            <span class="indicator-chart-title">生产车间视频监控</span>
                            <span style="color:#ff3b30;font-size:12px;">海南化工集团 - 高风险</span>
                        </div>
                        <div id="modal-safety-video" class="indicator-chart-container" style="height: 300px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,59,48,0.3);border-radius:4px;display:flex;align-items:center;justify-content:center;">
                            <div style="text-align:center;color:rgba(255,255,255,0.5);">
                                <div style="font-size:48px;margin-bottom:8px;">🏭</div>
                                <div>车间实时监控</div>
                                <div style="color:#ff3b30;margin-top:8px;">⚠️ AI识别：未戴安全帽</div>
                            </div>
                        </div>
                        <div style="display:flex;gap:4px;margin-top:8px;overflow-x:auto;">
                            <div style="padding:4px 8px;background:rgba(255,59,48,0.3);border:1px solid #ff3b30;border-radius:4px;color:#fff;font-size:11px;">一号车间 ⚠️</div>
                            <div style="padding:4px 8px;background:rgba(255,149,0,0.3);border:1px solid #ff9500;border-radius:4px;color:#fff;font-size:11px;">二号车间</div>
                            <div style="padding:4px 8px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;color:rgba(255,255,255,0.6);font-size:11px;">三号车间</div>
                            <div style="padding:4px 8px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;color:rgba(255,255,255,0.6);font-size:11px;">仓库区</div>
                        </div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>企业名称</th>
                                <th>预警类型</th>
                                <th>预警时间</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSafetyTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 3 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateSafetyTableRows() {
        const enterprises = ['海南化工集团', '海南电力公司', '海南建材集团', '海南矿业公司', '海南制造企业'];
        const types = ['未戴安全帽', '未系安全带', '人员倒地', '烟雾火焰'];
        const allItems = [];
        for (let i = 1; i <= 12; i++) {
            allItems.push({
                code: `YJ${String(i).padStart(6, '0')}`,
                enterprise: enterprises[i % 5],
                type: types[i % 4],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i <= 10 ? '已处置' : '待处置'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '已处置': '#ffcc00', '待处置': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.enterprise}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    renderEcoEnvironmentModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">生态环境智能监控</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监测点位</span>
                        <span class="indicator-stat-value">678个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">在线率</span>
                        <span class="indicator-stat-value">94.3%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日超标预警</span>
                        <span class="indicator-stat-value">9次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">处置率</span>
                        <span class="indicator-stat-value">88.9%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 4fr 6fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">监测点列表</span>
                        <div id="modal-eco-list" class="indicator-chart-container" style="height: 300px;"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                            <span class="indicator-chart-title">监测数据可视化</span>
                            <span style="color:#ff9500;font-size:12px;">三亚水质监测站 - pH值: 8.2</span>
                        </div>
                        <div id="modal-eco-dashboard" class="indicator-chart-container" style="height: 200px;"></div>
                        <div style="margin-top:8px;">
                            <span class="indicator-chart-title">近7天监测趋势</span>
                            <div id="modal-eco-trend" class="indicator-chart-container" style="height: 100px;"></div>
                        </div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>监测点位</th>
                                <th>监测类型</th>
                                <th>超标指标</th>
                                <th>超标数值</th>
                                <th>预警时间</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateEcoTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 2 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateEcoTableRows() {
        const types = ['水质', '大气', '土壤', '噪声'];
        const points = ['三亚监测站', '海口监测站', '文昌监测站', '琼海监测站'];
        const indicators = ['pH值', 'PM2.5', '重金属', '分贝'];
        const allItems = [];
        for (let i = 1; i <= 9; i++) {
            allItems.push({
                code: `YJ${String(i).padStart(6, '0')}`,
                point: points[i % 4],
                type: types[i % 4],
                indicator: indicators[i % 4],
                value: (Math.random() * 10 + 5).toFixed(1),
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i <= 8 ? '已处置' : '待处置'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '已处置': '#ffcc00', '待处置': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.point}</td>
                <td>${item.type}</td>
                <td>${item.indicator}</td>
                <td style="color:#ff3b30;">${item.value}</td>
                <td>${item.time}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    generateTransferTableRows() {
        const types = ['未亮码检查', '线下线索移送', '批后核查逾期', '线上线索移送质量低'];
        const sendDepts = ['市场监管局', '综合执法局', '自然资源局', '生态环境局'];
        const receiveDepts = ['省营商环境建设厅', '省司法厅', '省政务服务中心', '省纪委监委'];
        const names = ['未亮码检查事项', '线下线索移送事项', '批后核查逾期事项', '线上线索质量问题', '亮码检查异常'];
        const allItems = [];
        for (let i = 1; i <= 12; i++) {
            allItems.push({
                code: `YJ${String(i).padStart(6, '0')}`,
                name: names[i % 5],
                type: types[i % 4],
                sendDept: sendDepts[i % 4],
                receiveDept: receiveDepts[i % 4],
                time: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                status: i <= 8 ? '已办结' : '办理中'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '已办结': '#ffcc00', '办理中': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.sendDept}</td>
                <td>${item.receiveDept}</td>
                <td>${item.time}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    generateGiantGrowthTableRows() {
        const cities = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'];
        const data = [
            { city: '海口', lastYear: 6, thisYear: 11, rate: 83 },
            { city: '三亚', lastYear: 3, thisYear: 6, rate: 100 },
            { city: '儋州', lastYear: 2, thisYear: 3, rate: 50 },
            { city: '文昌', lastYear: 1, thisYear: 2, rate: 100 },
            { city: '琼海', lastYear: 0, thisYear: 1, rate: 0 },
            { city: '万宁', lastYear: 0, thisYear: 0, rate: 0 },
            { city: '东方', lastYear: 0, thisYear: 0, rate: 0 },
            { city: '澄迈', lastYear: 0, thisYear: 0, rate: 0 }
        ];
        return data.slice(0, 5).map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.city}</td>
                <td>${item.lastYear}</td>
                <td>${item.thisYear}</td>
                <td>${item.rate}%</td>
            </tr>
        `).join('');
    }

    renderRiskWarningModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">风险预警动态监测全景</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">发现预警总数</span>
                        <span class="indicator-stat-value">45</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">处置预警总数</span>
                        <span class="indicator-stat-value">45</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">处置率</span>
                        <span class="indicator-stat-value">100%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">平均处置时间</span>
                        <span class="indicator-stat-value">1天</span>
                    </div>
                  
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域四色预警分布</span>
                        <div id="modal-warning-stack-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">全省近7天风险趋势</span>
                        <div id="modal-warning-trend" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>预警编号</th>
                                <th>预警主题/领域</th>
                                <th>预警等级</th>
                                <th>预警来源</th>
                                <th>发现时间</th>
                                <th>处置时间</th>
                                <th>处置方式</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateWarningTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 9 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderRiskDisposalRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">风险预警处置率达成分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">处置率</span>
                        <span class="indicator-stat-value">100%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已处置预警</span>
                        <span class="indicator-stat-value">45个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">待处置预警</span>
                        <span class="indicator-stat-value">0个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">平均处置时长</span>
                        <span class="indicator-stat-value">2.3天</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域处置数量排行TOP8</span>
                        <div id="modal-disposal-domain-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域处置时效排行TOP8</span>
                        <div id="modal-disposal-efficiency-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>预警编号</th>
                                <th>预警主题/领域</th>
                                <th>预警等级</th>
                                <th>发现时间</th>
                                <th>处置完成时间</th>
                                <th>处置时长（天）</th>
                                <th>处置方式</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateDisposalWarningTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 9 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateWarningTableRows() {
        const domains = ['危化品安全', '传销监测', '交通运输新业态', '涉水产品违规', '农民工欠薪', '非法现金贷', '食品安全', '特种设备安全'];
        const levels = ['红色', '橙色', '黄色', '蓝色'];
        const sources = ['国办', '省办', '市县'];
        const methods = ['人工处置', '系统自动'];
        const allItems = [];
        for (let i = 1; i <= 45; i++) {
            const level = levels[i % 4];
            const domain = domains[i % 8];
            const foundDate = `2026-06-${Math.floor(Math.random() * 20) + 10}`;
            const excludeDate = `2026-06-${Math.floor(Math.random() * 20) + 15}`;
            allItems.push({
                code: `YW${202606}${String(i).padStart(4, '0')}`,
                domain: domain,
                level: level,
                source: sources[i % 3],
                foundDate: foundDate,
                excludeDate: excludeDate,
                method: methods[i % 2]
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => {
            const levelColor = item.level === '红色' ? '#ff3b30' : item.level === '橙色' ? '#ff9500' : item.level === '黄色' ? '#ffcc00' : '#ff6347';
            return `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openWarningDetailModal('${item.code}', '${item.domain}', '${item.level}', '${item.source}', '${item.foundDate}', '${item.excludeDate}', '${item.method}')">${item.code}</span></td>
                <td>${item.domain}</td>
                <td><span style="color: ${levelColor}; font-weight: bold;">${item.level}</span></td>
                <td>${item.source}</td>
                <td>${item.foundDate}</td>
                <td>${item.excludeDate}</td>
                <td>${item.method}</td>
            </tr>
        `}).join('');
    }

    generateDisposalWarningTableRows() {
        const domains = ['危化品安全', '传销监测', '交通运输新业态', '涉水产品违规', '农民工欠薪', '非法现金贷', '食品安全', '特种设备安全'];
        const levels = ['红色', '橙色', '黄色', '蓝色'];
        const methods = ['人工处置', '系统自动'];
        const allItems = [];
        for (let i = 1; i <= 45; i++) {
            const level = levels[i % 4];
            const domain = domains[i % 8];
            const foundDate = `2026-06-${Math.floor(Math.random() * 20) + 10}`;
            const disposalDate = `2026-06-${Math.floor(Math.random() * 20) + 15}`;
            const foundDateTime = new Date(foundDate);
            const disposalDateTime = new Date(disposalDate);
            const disposalDays = Math.floor((disposalDateTime - foundDateTime) / (1000 * 60 * 60 * 24));
            allItems.push({
                code: `YW${202606}${String(i).padStart(4, '0')}`,
                domain: domain,
                level: level,
                foundDate: foundDate,
                disposalDate: disposalDate,
                disposalDays: disposalDays > 0 ? disposalDays : 1,
                method: methods[i % 2]
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => {
            const levelColor = item.level === '红色' ? '#ff3b30' : item.level === '橙色' ? '#ff9500' : item.level === '黄色' ? '#ffcc00' : '#ff6347';
            return `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openWarningDetailModal('${item.code}', '${item.domain}', '${item.level}', '系统', '${item.foundDate}', '${item.disposalDate}', '${item.method}')">${item.code}</span></td>
                <td>${item.domain}</td>
                <td><span style="color: ${levelColor}; font-weight: bold;">${item.level}</span></td>
                <td>${item.foundDate}</td>
                <td>${item.disposalDate}</td>
                <td>${item.disposalDays}</td>
                <td>${item.method}</td>
            </tr>
        `}).join('');
    }

    renderComplianceRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">市场主体合规经营比例分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">市场主体总数</span>
                        <span class="indicator-stat-value">700.12万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">合规经营主体数</span>
                        <span class="indicator-stat-value">630.11万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">合规经营比例</span>
                        <span class="indicator-stat-value">90%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">同比提升</span>
                        <span class="indicator-stat-value">+2.5%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 4fr 6fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">合规经营占比</span>
                        <div id="modal-compliance-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各行业合规经营排行</span>
                        <div id="modal-compliance-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>行业名称</th>
                                <th>市场主体数（万户）</th>
                                <th>合规经营数（万户）</th>
                                <th>合规经营比例（%）</th>
                                <th>同比变化（%）</th>
                                <th>合规经营趋势</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateComplianceTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 8 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateComplianceTableRows() {
        const industries = ['制造业', '批发零售', '信息技术', '建筑业', '交通运输', '住宿餐饮', '金融业', '农林牧渔', '教育', '医疗', '文化娱乐', '房地产', '电力能源', '水利', '环保'];
        const trends = ['↑', '↑', '↑', '→', '↑'];
        const allItems = [];
        for (let i = 1; i <= 40; i++) {
            const total = parseFloat((Math.random() * 50 + 10).toFixed(2));
            const rate = Math.floor(Math.random() * 20) + 80;
            const compliant = parseFloat((total * rate / 100).toFixed(2));
            const yearOnYear = parseFloat((Math.random() * 5 - 1).toFixed(2));
            allItems.push({
                industry: industries[i % 15],
                total: total,
                compliant: compliant,
                rate: rate,
                yearOnYear: yearOnYear,
                trend: yearOnYear >= 0 ? '↑' : '↓'
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.industry}</td>
                <td>${item.total}</td>
                <td>${item.compliant}</td>
                <td>${item.rate}</td>
                <td style="color: ${parseFloat(item.yearOnYear) >= 0 ? '#ff9500' : '#ffcc00'};">${item.yearOnYear > 0 ? '+' : ''}${item.yearOnYear}%</td>
                <td>${item.trend}</td>
            </tr>
        `).join('');
    }

    renderViolationRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">市场主体违法比例分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">市场主体总数</span>
                        <span class="indicator-stat-value">700.12万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">违法主体数</span>
                        <span class="indicator-stat-value">70.01万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">合规主体数</span>
                        <span class="indicator-stat-value">630.11万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">违法比例</span>
                        <span class="indicator-stat-value">10%</span>
                    </div>
                    
                    
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">违法占比</span>
                        <div id="modal-violation-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域违法比例情况</span>
                        <div id="modal-violation-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>行业名称</th>
                                <th>市场主体总数（万户）</th>
                                <th>违法主体数（万户）</th>
                                <th>违法比例（%）</th>
                                <th>主要违法类型</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateViolationTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 8 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateViolationTableRows() {
        const industries = ['建筑业', '住宿餐饮', '批发零售', '交通运输', '制造业', '信息技术', '金融业', '农林牧渔', '教育', '医疗', '文化娱乐', '房地产', '电力能源', '水利', '环保'];
        const violationTypes = ['无证经营', '超范围经营', '未年报', '产品质量', '虚假宣传', '价格欺诈', '违法广告', '不正当竞争'];
        const allItems = [];
        for (let i = 1; i <= 40; i++) {
            const total = parseFloat((Math.random() * 50 + 10).toFixed(2));
            const rate = Math.floor(Math.random() * 20) + 5;
            const violation = parseFloat((total * rate / 100).toFixed(2));
            allItems.push({
                industry: industries[i % 15],
                total: total,
                violation: violation,
                rate: rate,
                violationType: violationTypes[i % 8]
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.industry}</td>
                <td>${item.total}</td>
                <td>${item.violation}</td>
                <td>${item.rate}</td>
                <td>${item.violationType}</td>
            </tr>
        `).join('');
    }

    renderCreditBRatioModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信用等级B级及以上占比分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">B级及以上占比</span>
                        <span class="indicator-stat-value">90%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">B级及以上主体数</span>
                        <span class="indicator-stat-value">630.11万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">市场主体总数</span>
                        <span class="indicator-stat-value">700.12万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">C级及以下主体数</span>
                        <span class="indicator-stat-value">70.01万户</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">信用等级整体分布（ABCD）</span>
                        <div id="modal-b-ratio-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各行业B级及以上占比排行TOP8</span>
                        <div id="modal-b-ratio-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>行业名称</th>
                                <th>市场主体总数（万户）</th>
                                <th>B级及以上数量（万户）</th>
                                <th>B级及以上占比（%）</th>
                                <th>C级数量（万户）</th>
                                <th>D级数量（万户）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCreditBRatioTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 8 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCaseTransferTableRows() {
        const fields = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '税务', '海关'];
        const depts = ['市场监管局', '生态环境局', '交通运输局', '卫健委', '文旅局', '应急管理局', '税务局', '海关'];
        const allItems = [];
        for (let i = 1; i <= 40; i++) {
            allItems.push({
                caseNo: `AJ${20240000 + i}`,
                clueNo: `XS${20240000 + i}`,
                caseName: `${fields[i % 8]}案件-${i}`,
                field: fields[i % 8],
                registerDate: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-${(i % 28 + 1).toString().padStart(2, '0')}`,
                status: i % 3 === 0 ? '办理中' : (i % 5 === 0 ? '已撤销' : '已结案'),
                dept: 'xx执法局'
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.caseNo}</td>
                <td>${item.clueNo}</td>
                <td>${item.caseName}</td>
                <td>${item.field}</td>
                <td>${item.registerDate}</td>
                <td>${item.status}</td>
                <td>${item.dept}</td>
            </tr>
        `).join('');
    }

    // 弹窗八：线上线索移送率分析
    renderTransferRateModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">线上线索移送率分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">线上移送率</span>
                        <span class="indicator-stat-value">99%</span>
                    </div>
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已线上移送</span>
                        <span class="indicator-stat-value">11.21万宗</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">线下移送</span>
                        <span class="indicator-stat-value">0.11万宗</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 1fr 1fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">整体移送率</span>
                        <div id="modal-transfer-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域线上移送率情况</span>
                        <div id="modal-transfer-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>领域名称</th>
                                <th>已线上移送数</th>
                                <th>线下移送数</th>
                                <th>线上移送率（%）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTransferRateTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 8 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateTransferRateTableRows() {
        const fields = ['市场监管', '交通运输', '生态环境', '卫生健康', '文化旅游', '应急管理', '税务', '海关', '人力资源', '农业农村', '自然资源', '住建', '教育', '科技', '民政'];
        const reasons = ['系统未对接', '纸质材料要求', '历史遗留', '特殊审批流程', '数据保密要求'];
        const allItems = [];
        for (let i = 1; i <= 40; i++) {
            const shouldTransfer = Math.floor(Math.random() * 5000 + 500);
            const rate = Math.random() > 0.05 ? 100 : Math.floor(Math.random() * 5) + 95;
            const onlineTransfer = Math.floor(shouldTransfer * rate / 100);
            allItems.push({
                field: fields[i % 15],
                shouldTransfer: shouldTransfer,
                onlineTransfer: onlineTransfer,
                rate: rate,
                offlineTransfer: shouldTransfer - onlineTransfer,
                reason: (shouldTransfer - onlineTransfer > 0) ? reasons[i % 5] : '-'
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.field}</td>
                <td>${item.onlineTransfer.toLocaleString()}</td>
                <td>${item.offlineTransfer}</td>
                <td>${item.rate}</td>
            </tr>
        `).join('');
    }

    // 弹窗四：审管衔接互通分析
    renderApprovalSupervisionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">审管衔接互通分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">审批办件总数</span>
                        <span class="indicator-stat-value">100.32万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已推送办件数</span>
                        <span class="indicator-stat-value">100.32万件</span>
                    </div>
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">推送率</span>
                        <span class="indicator-stat-value">100%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各类型审批办件占比</span>
                        <div id="modal-pie-4" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域审管衔接互通率</span>
                        <div id="modal-bar-4" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>事项名称</th>
                                <th>事项类型</th>
                                <th>已办结数</th>
                                <th>已推送数</th>
                                <th>推送率</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSupervisionTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 10 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateSupervisionTableRows() {
        const allItems = [
            { name: '食品经营许可证', approval: '极简审批', supervision: '2000', method: '2000', status: '100%' },
            { name: '建筑工程施工许可', approval: '高效办成一件事', supervision: '2000', method: '2000', status: '100%' },
            { name: '排污许可证', approval: '信用审批', supervision: '200', method: '200', status: '100%' },
            { name: '医疗机构执业许可', approval: '免申即享', supervision: '2000', method: '2000', status: '100%' },
            { name: '劳务派遣许可', approval: '全省通办', supervision: '2000', method: '2000', status: '100%' },  
            { name: '道路运输许可', approval: '免申即享', supervision: '2000', method: '2000', status: '100%' },
            { name: '危险化学品许可', approval: '全省通办', supervision: '2000', method: '2000', status: '100%' },
            { name: '特种设备许可', approval: '全省通办', supervision: '2000', method: '2000', status: '100%' },
            { name: '药品经营许可', approval: '智能快办', supervision: '2000', method: '2000', status: '100%' },
            { name: '文化经营许可', approval: '智能快办', supervision: '2000', method: '2000', status: '100%' }
        ];
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.name}</td>
                <td>${item.approval}</td>
                <td>${item.supervision}</td>
                <td>${item.method}</td>
                <td>${item.status}</td>
            </tr>
        `).join('');
    }

    // 弹窗五：监管核查任务自动推送分析
    renderTaskPushModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">线上移送线索全景分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">线上移送线索总数</span>
                        <span class="indicator-stat-value">11.21万宗</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已接收</span>
                        <span class="indicator-stat-value">10.98万宗</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接收率</span>
                        <span class="indicator-stat-value">98%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">办理中</span>
                        <span class="indicator-stat-value">8.56万宗</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月线上移送线索趋势</span>
                        <div id="modal-transfer-trend" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">线索来源分布</span>
                        <div id="modal-transfer-source" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>线索编号</th>
                                <th>线索来源</th>
                                <th>移送部门</th>
                                <th>接收部门</th>
                                <th>移送时间</th>
                                <th>接收状态</th>
                                <th>办理状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTransferTaskTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 15 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateTransferTaskTableRows() {
        const sources = ['重点检查', '专项检查', '有因检查', '双随机一公开', '综合查一次'];
        const depts = ['市场监管局', '生态环境局', '交通运输局', '卫健委', '应急管理局', '税务局', '海关', '文旅局'];
        const allItems = [];
        for (let i = 1; i <= 75; i++) {
            allItems.push({
                clueNo: `XS${20240000 + i}`,
                source: sources[i % 5],
                transferDept: depts[i % 8],
                receiveDept: 'xx执法局',
                transferTime: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-${(i % 28 + 1).toString().padStart(2, '0')}`,
                receiveStatus: i % 20 === 0 ? '未接收' : '已接收',
                handleStatus: i % 5 === 0 ? '办理中' : (i % 7 === 0 ? '已退回' : '已办结')
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openClueDetailModal('${item.clueNo}', '${item.source}', '${item.transferDept}', '${item.receiveDept}', '${item.transferTime}', '${item.receiveStatus}', '${item.handleStatus}')">${item.clueNo}</span></td>
                <td>${item.source}</td>
                <td>${item.transferDept}</td>
                <td>${item.receiveDept}</td>
                <td>${item.transferTime}</td>
                <td>${item.receiveStatus}</td>
                <td>${item.handleStatus}</td>
            </tr>
        `).join('');
    }

    openClueDetailModal(clueNo, source, transferDept, receiveDept, transferTime, receiveStatus, handleStatus) {
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        overlay.innerHTML = this.renderClueDetailModal(clueNo, source, transferDept, receiveDept, transferTime, receiveStatus, handleStatus);
        document.body.appendChild(overlay);
        
        overlay.querySelector('.clue-detail-close').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    renderClueDetailModal(clueNo, source, transferDept, receiveDept, transferTime, receiveStatus, handleStatus) {
        return `
            <div class="clue-detail-modal">
                <div class="clue-detail-header">
                    <span class="clue-detail-title">线索详情 - ${clueNo}</span>
                    <button class="clue-detail-close">×</button>
                </div>
                <div class="clue-detail-content">
                    <div class="clue-detail-section">
                        <div class="clue-detail-section-title">基本信息</div>
                        <div class="clue-detail-grid">
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">线索编号</span>
                                <span class="clue-detail-value">${clueNo}</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">线索来源</span>
                                <span class="clue-detail-value">${source}</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">移送部门</span>
                                <span class="clue-detail-value">${transferDept}</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">接收部门</span>
                                <span class="clue-detail-value">${receiveDept}</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">移送时间</span>
                                <span class="clue-detail-value">${transferTime}</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">接收状态</span>
                                <span class="clue-detail-value">${receiveStatus}</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">办理状态</span>
                                <span class="clue-detail-value">${handleStatus}</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">线索类型</span>
                                <span class="clue-detail-value">一般线索</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="clue-detail-section">
                        <div class="clue-detail-section-title">线索描述</div>
                        <div class="clue-detail-item" style="grid-column: span 2;">
                            <span class="clue-detail-value" style="line-height: 1.6;">经检查发现，该企业存在违规经营行为，具体表现为：未按规定公示年度报告、未落实从业人员健康管理制度、经营场所卫生条件不达标。线索已于${transferTime}由${transferDept}移送至${receiveDept}处理。</span>
                        </div>
                    </div>
                    
                    <div class="clue-detail-section">
                        <div class="clue-detail-section-title">当事人信息</div>
                        <div class="clue-detail-grid">
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">当事人名称</span>
                                <span class="clue-detail-value">海南信信贸易有限公司</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">统一社会信用代码</span>
                                <span class="clue-detail-value">91460000MA5TG635K</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">法定代表人</span>
                                <span class="clue-detail-value">王建国</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">联系电话</span>
                                <span class="clue-detail-value">13800000000</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">地址</span>
                                <span class="clue-detail-value">海南省海口市龙华区XX街道XX号</span>
                            </div>
                            <div class="clue-detail-item">
                                <span class="clue-detail-label">行业类别</span>
                                <span class="clue-detail-value">批发和零售业</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="clue-detail-section">
                        <div class="clue-detail-section-title">移送材料清单</div>
                        <div class="clue-detail-item" style="grid-column: span 2;">
                            <div style="display: flex; flex-direction: column; gap: 6px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px solid rgba(0, 212, 255, 0.05);">
                                    <span style="color: rgba(255,255,255,0.8); font-size: 13px;">现场检查笔录</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px solid rgba(0, 212, 255, 0.05);">
                                    <span style="color: rgba(255,255,255,0.8); font-size: 13px;">证据照片</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px solid rgba(0, 212, 255, 0.05);">
                                    <span style="color: rgba(255,255,255,0.8); font-size: 13px;">线索移送审批表</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0;">
                                    <span style="color: rgba(255,255,255,0.8); font-size: 13px;">相关法律依据</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="clue-detail-section">
                        <div class="clue-detail-section-title">办理进度</div>
                        <div class="warning-detail-timeline">
                            <div class="warning-timeline-item green">
                                <div class="warning-timeline-title">线索登记</div>
                                <div class="warning-timeline-time">${transferTime} 09:00</div>
                                <div class="warning-timeline-content">线索已登记并录入系统</div>
                            </div>
                            <div class="warning-timeline-item blue">
                                <div class="warning-timeline-title">移送审批</div>
                                <div class="warning-timeline-time">${transferTime} 10:30</div>
                                <div class="warning-timeline-content">移送申请已通过审批</div>
                            </div>
                            <div class="warning-timeline-item orange">
                                <div class="warning-timeline-title">接收确认</div>
                                <div class="warning-timeline-time">${transferTime} 14:00</div>
                                <div class="warning-timeline-content">${receiveDept}已确认接收线索</div>
                            </div>
                            <div class="warning-timeline-item red">
                                <div class="warning-timeline-title">立案调查</div>
                                <div class="warning-timeline-time">${transferTime} 15:00</div>
                                <div class="warning-timeline-content">已立案，正在调查中</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 弹窗六：行政处罚办件流转分析
    renderPenaltyTransferModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">行政处罚办件流转分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">流转处罚办件</span>
                        <span class="indicator-stat-value">18.2万件次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已结案</span>
                        <span class="indicator-stat-value">15.6万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">结案率</span>
                        <span class="indicator-stat-value">85.7%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">在办</span>
                        <span class="indicator-stat-value">2.6万件</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月行政处罚办件流转趋势</span>
                        <div id="modal-line-6" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">处罚类型分布</span>
                        <div id="modal-pie-6" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>处罚编号</th>
                                <th>案件名称</th>
                                <th>处罚类型</th>
                                <th>流转部门</th>
                                <th>接收部门</th>
                                <th>流转时间</th>
                                <th>办结状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generatePenaltyTransferTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 20 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generatePenaltyTransferTableRows() {
        const types = ['警告', '罚款', '没收违法所得', '暂扣许可证', '其他'];
        const depts = ['市场监管局', '生态环境局', '交通运输局', '卫健委', '应急管理局'];
        const allItems = [];
        for (let i = 1; i <= 100; i++) {
            allItems.push({
                penaltyNo: `CF${20240000 + i}`,
                caseName: `案件${i}`,
                penaltyType: types[i % 5],
                transferDept: depts[i % 5],
                receiveDept: depts[(i + 1) % 5],
                transferTime: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-${(i % 28 + 1).toString().padStart(2, '0')}`,
                finishStatus: i % 4 === 0 ? '办理中' : '已结案'
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.penaltyNo}</td>
                <td>${item.caseName}</td>
                <td>${item.penaltyType}</td>
                <td>${item.transferDept}</td>
                <td>${item.receiveDept}</td>
                <td>${item.transferTime}</td>
                <td>${item.finishStatus}</td>
            </tr>
        `).join('');
    }

    // 弹窗七：信用服务办件量分析
    renderCreditServiceModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信用等级审批办件量分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">总数</span>
                        <span class="indicator-stat-value">300万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">行政许可</span>
                        <span class="indicator-stat-value">120万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">行政确认</span>
                        <span class="indicator-stat-value">45万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">行政裁决</span>
                        <span class="indicator-stat-value">20万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">行政奖励</span>
                        <span class="indicator-stat-value">15万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">行政给付</span>
                        <span class="indicator-stat-value">8万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">公共服务</span>
                        <span class="indicator-stat-value">72万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">其他行政权力</span>
                        <span class="indicator-stat-value">20万件</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月办件量趋势</span>
                        <div id="modal-area-7" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">信用等级审批占比</span>
                        <div id="modal-pie-7a" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">办件类型分布</span>
                        <div id="modal-pie-7" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>业务类型</th>
                                <th>办件量（件）</th>
                                <th>占比（%）</th>
                                <th>同比增长（%）</th>
                                <th>环比增长（%）</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCreditServiceTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 3 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCreditServiceTableRows() {
        const allItems = [
            { type: '企业开办', count: 850000, ratio: 28.3, yoy: 15.2, mom: 3.8 },
            { type: '资质认定', count: 520000, ratio: 17.3, yoy: 12.5, mom: 2.5 },
            { type: '许可审批', count: 480000, ratio: 16.0, yoy: 8.6, mom: 1.8 },
            { type: '信用查询', count: 380000, ratio: 12.7, yoy: 25.3, mom: 5.2 },
            { type: '监管执法', count: 350000, ratio: 11.7, yoy: 18.9, mom: 4.1 },
            { type: '公共服务', count: 280000, ratio: 9.3, yoy: 22.1, mom: 3.5 },
            { type: '其他业务', count: 140000, ratio: 4.7, yoy: 5.4, mom: 0.8 }
        ];
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.type}</td>
                <td>${item.count.toLocaleString()}</td>
                <td>${item.ratio}%</td>
                <td>+${item.yoy}%</td>
                <td>+${item.mom}%</td>
            </tr>
        `).join('');
    }

    // 弹窗八：诚信便利服务覆盖率分析
    renderCreditCoverageModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">诚信便利服务覆盖率分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">覆盖率</span>
                        <span class="indicator-stat-value">99%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">享受服务对象</span>
                        <span class="indicator-stat-value">1.2万家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">未覆盖对象</span>
                        <span class="indicator-stat-value">120家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计服务次数</span>
                        <span class="indicator-stat-value">8.5万次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各类型对象覆盖情况</span>
                        <div id="modal-donut-8" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域诚信便利覆盖率TOP8</span>
                        <div id="modal-bar-8" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>对象名称</th>
                                <th>统一社会信用代码</th>
                                <th>信用等级</th>
                                <th>享受便利类型</th>
                                <th>首次享受时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCreditCoverageTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 25 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCreditCoverageTableRows() {
        const companies = ['海南科技有限公司', '三亚旅游集团', '海口贸易公司', '文昌航天企业', '博鳌会展公司'];
        const types = ['绿色通道', '容缺受理', '告知承诺', '免申即享'];
        const levels = ['A', 'B'];
        const allItems = [];
        for (let i = 1; i <= 125; i++) {
            allItems.push({
                company: companies[i % 5],
                creditCode: `91460000M0001${(10000 + i).toString().substring(1)}`,
                level: levels[i % 2],
                benefitType: types[i % 4],
                firstTime: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-15`
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.company}', '${item.creditCode}')">${item.company}</span></td>
                <td>${item.creditCode}</td>
                <td>${item.level}</td>
                <td>${item.benefitType}</td>
                <td>${item.firstTime}</td>
            </tr>
        `).join('');
    }

    generateCreditBAboveTableRows() {
        const industries = ['制造业', '批发和零售业', '信息技术', '建筑业', '交通运输', '住宿餐饮', '金融业', '农林牧渔'];
        const allItems = [];
        for (let i = 1; i <= 50; i++) {
            allItems.push({
                name: `海南${industries[i % 8]}有限公司`,
                code: `9146${String(i).padStart(10, '0')}`,
                level: i % 3 === 0 ? 'A' : 'B',
                industry: industries[i % 8],
                assessDate: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-10`,
                validUntil: `2025-${(i % 12 + 1).toString().padStart(2, '0')}-09`
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '${item.industry}')">${item.name}</span></td>
                <td>${item.code}</td>
                <td>${item.level}</td>
                <td>${item.industry}</td>
                <td>${item.assessDate}</td>
                <td>${item.validUntil}</td>
            </tr>
        `).join('');
    }

    generateCreditBRatioTableRows() {
        const industries = ['制造业', '批发和零售业', '信息技术', '建筑业', '交通运输', '住宿餐饮', '金融业', '农林牧渔'];
        const allItems = [];
        for (let i = 0; i < 8; i++) {
            const total = Math.round((Math.random() * 50 + 50) * 100) / 100;
            const ratio = Math.round((Math.random() * 8 + 88) * 100) / 100;
            const bAbove = Math.round(total * ratio / 100 * 100) / 100;
            const c = Math.round((total * (100 - ratio) * 0.7) * 100) / 100;
            const d = Math.round((total * (100 - ratio) * 0.3) * 100) / 100;
            allItems.push({
                industry: industries[i],
                total,
                bAbove,
                ratio,
                c,
                d
            });
        }
        const start = 0;
        const items = allItems.slice(start, start + 5);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.industry}</td>
                <td>${item.total}</td>
                <td>${item.bAbove}</td>
                <td>${item.ratio}%</td>
                <td>${item.c}</td>
                <td>${item.d}</td>
            </tr>
        `).join('');
    }

    // 弹窗九：自动信用核验服务分析
    renderCreditVerifyModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">自动信用核验服务分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计核验人数</span>
                        <span class="indicator-stat-value">630万人</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">本月核验</span>
                        <span class="indicator-stat-value">12.5万人</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">日均核验</span>
                        <span class="indicator-stat-value">4,167人</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">核验通过率</span>
                        <span class="indicator-stat-value">97%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月信用核验趋势</span>
                        <div id="modal-area-9" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">核验结果分布</span>
                        <div id="modal-pie-9" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>申请人/企业名称</th>
                                <th>统一社会信用代码</th>
                                <th>核验时间</th>
                                <th>核验结果</th>
                                <th>信用等级</th>
                                <th>享受服务类型</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCreditVerifyTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 30 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCreditVerifyTableRows() {
        const companies = ['海南科技有限公司', '三亚旅游集团', '海口贸易公司', '文昌航天企业'];
        const results = ['通过', '待核查', '不通过'];
        const levels = ['A', 'B', 'C'];
        const services = ['信用贷款', '审批绿色通道', '免押金服务', '优先办理'];
        const allItems = [];
        for (let i = 1; i <= 150; i++) {
            allItems.push({
                applicant: companies[i % 4],
                creditCode: `91460000M0001${(10000 + i).toString().substring(1)}`,
                verifyTime: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-${(i % 28 + 1).toString().padStart(2, '0')}`,
                result: results[i % 3],
                level: levels[i % 3],
                serviceType: services[i % 4]
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #ff9500;" onclick="window.homePage.openObjectProfileModal('${item.applicant}', '${item.creditCode}')">${item.applicant}</span></td>
                <td>${item.creditCode}</td>
                <td>${item.verifyTime}</td>
                <td>${item.result}</td>
                <td>${item.level}</td>
                <td>${item.serviceType}</td>
            </tr>
        `).join('');
    }

    // 初始化弹窗图表
    initModalCharts(type) {
        setTimeout(() => {
            switch(type) {
                case 'approval_compress':
                    this.initApprovalCompressCharts();
                    break;
                case 'approval_efficiency':
                    this.initApprovalEfficiencyCharts();
                    break;
                case 'info_share_field':
                    this.initInfoShareFieldCharts();
                    break;
                case 'info_share_dept':
                    this.initInfoShareDeptCharts();
                    break;
                case 'info_share_trend':
                    this.initInfoShareTrendCharts();
                    break;
                case 'info_share_rate':
                    this.initInfoShareRateCharts();
                    break;
                case 'approval_supervision':
                    this.initApprovalSupervisionCharts();
                    break;
                case 'task_push':
                    this.initTaskPushCharts();
                    break;
                case 'push_rate':
                    this.initPushRateCharts();
                    break;
                case 'penalty_transfer':
                    this.initPenaltyTransferCharts();
                    break;
                case 'transfer_rate':
                    this.initTransferRateCharts();
                    break;
                case 'credit_service':
                    this.initCreditServiceCharts();
                    break;
                case 'credit_coverage':
                    this.initCreditCoverageCharts();
                    break;
                case 'credit_verify':
                    this.initCreditVerifyCharts();
                    break;
                case 'credit_b_above':
                    this.initCreditBAboveCharts();
                    break;
                case 'credit_b_ratio':
                    this.initCreditBRatioCharts();
                    break;
                case 'compliance_rate':
                    this.initComplianceRateCharts();
                    break;
                case 'violation_rate':
                    this.initViolationRateCharts();
                    break;
                case 'risk_warning':
                    this.initRiskWarningCharts();
                    break;
                case 'risk_disposal_rate':
                    this.initRiskDisposalRateCharts();
                    break;
                case 'new_market':
                    this.initNewMarketCharts();
                    break;
                case 'startup_time':
                    this.initStartupTimeCharts();
                    break;
                case 'new_project':
                    this.initNewProjectCharts();
                    break;
                case 'project_approval':
                    this.initProjectApprovalCharts();
                    break;
                case 'project_landing':
                    this.initProjectLandingCharts();
                    break;
                case 'yearly_add':
                    this.initYearlyAddCharts();
                    break;
                case 'yearly_remove':
                    this.initYearlyRemoveCharts();
                    break;
                case 'good_bad_rate':
                    this.initGoodBadRateCharts();
                    break;
                case 'enterprise_satisfaction':
                    this.initEnterpriseSatisfactionCharts();
                    break;
                case 'complaint_decrease':
                    this.initComplaintDecreaseCharts();
                    break;
                case 'tech_total':
                    this.initTechTotalCharts();
                    break;
                case 'tech_new':
                    this.initTechNewCharts();
                    break;
                case 'tech_growth':
                    this.initTechGrowthCharts();
                    break;
                case 'special_total':
                    this.initSpecialTotalCharts();
                    break;
                case 'special_new':
                    this.initSpecialNewCharts();
                    break;
                case 'special_growth':
                    this.initSpecialGrowthCharts();
                    break;
                case 'giant_total':
                    this.initGiantTotalCharts();
                    break;
                case 'giant_new':
                    this.initGiantNewCharts();
                    break;
                case 'giant_growth':
                    this.initGiantGrowthCharts();
                    break;
                case 'supervision_behavior_total':
                    this.initSupervisionBehaviorTotalCharts();
                    break;
                case 'supervision_problem_rate':
                    this.initSupervisionProblemRateCharts();
                    break;
                case 'supervision_visit_reduction':
                    this.initSupervisionVisitReductionCharts();
                    break;
                case 'supervision_transfer_clues':
                    this.initSupervisionTransferCluesCharts();
                    break;
                case 'law_case_source':
                    this.initLawCaseSourceCharts();
                    break;
                case 'law_case_rate':
                    this.initLawCaseRateCharts();
                    break;
                case 'law_major_case_ratio':
                    this.initLawMajorCaseRatioCharts();
                    break;
                case 'credit_b_above':
                    this.initCreditBAboveNewCharts();
                    break;
                case 'credit_b_ratio':
                    this.initCreditBRatioNewCharts();
                    break;
                case 'credit_violation_rate':
                    this.initCreditViolationRateCharts();
                    break;
                case 'avg_process_time':
                    this.initAvgProcessTimeCharts();
                    break;
                case 'project_approval_landing':
                    this.initProjectApprovalLandingCharts();
                    break;
                case 'admin_check_year_on_year':
                    this.initAdminCheckYearOnYearCharts();
                    break;
                case 'first_offense_exemption':
                    this.initFirstOffenseExemptionCharts();
                    break;
                case 'transfer_supervision_net':
                    this.initTransferSupervisionNetCharts();
                    break;
                case 'offsite_supervision':
                    this.initOffsiteSupervisionCharts();
                    break;
                case 'bright_kitchen':
                    break;
                case 'sand_theft':
                    break;
                case 'sandbox_supervision':
                    this.initSandboxSupervisionCharts();
                    break;
                case 'trigger_supervision':
                    this.initTriggerSupervisionCharts();
                    break;
                case 'lecheng_medical':
                    this.initLechengMedicalCharts();
                    break;
                case 'nfan_breeding':
                    this.initNfanBreedingCharts();
                    break;
                case 'network_public_opinion':
                    this.initNetworkPublicOpinionCharts();
                    break;
                case 'safety_production':
                    this.initSafetyProductionCharts();
                    break;
                case 'eco_environment':
                    this.initEcoEnvironmentCharts();
                    break;
                case 'trend_approval_case':
                case 'trend_inspection_times':
                case 'trend_penalty':
                case 'trend_credit_subject':
                    this.initTrendAnalysisCharts();
                    break;
            }
        }, 100);
    }

    // ==================== 通用趋势分析弹窗（4个KPI + 趋势图/饼图 + 5条/页业务明细表） ====================
    renderTrendAnalysisModal(cfg) {
        this._trendCfg = cfg;
        this._trendPageSize = 5;
        this._trendPage = 1;
        this._trendTotalRows = cfg.table.rows.length;
        this._trendTotalPages = Math.max(1, Math.ceil(this._trendTotalRows / this._trendPageSize));
        const kpisHtml = cfg.kpis.map(k => {
            const valClass = k.highlight === 'down' ? 'value-down' : (k.highlight === 'up' ? 'value-up' : '');
            return `
                <div class="trend-kpi-card">
                    <span class="trend-kpi-label">${k.label}</span>
                    <span class="trend-kpi-value ${valClass}">${k.value}${k.suffix || ''}</span>
                </div>
            `;
        }).join('');
        return `
            <div class="indicator-modal trend-modal" style="width:90%;max-width:1280px;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">${cfg.title}</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="trend-kpi-row">
                    ${kpisHtml}
                </div>
                <div class="trend-charts-row">
                    <div class="trend-chart-box trend-chart-main">
                        <div class="trend-chart-title">${cfg.trendTitle}</div>
                        <div id="trend-main-chart" class="trend-chart-container"></div>
                    </div>
                    <div class="trend-chart-box trend-chart-pie">
                        <div class="trend-chart-title">${cfg.pieTitle}</div>
                        <div id="trend-pie-chart" class="trend-chart-container"></div>
                    </div>
                </div>
                <div class="trend-table-wrap">
                    <div class="trend-table-title">${cfg.tableTitle || '明细数据'}</div>
                    <div class="trend-table-scroller">
                        <table class="trend-data-table">
                            <thead>
                                <tr>${cfg.table.header.map(h => `<th>${h}</th>`).join('')}</tr>
                            </thead>
                            <tbody id="trend-table-body">
                                ${this._renderTrendTbody()}
                            </tbody>
                        </table>
                    </div>
                    ${this._renderTrendPager()}
                </div>
            </div>
        `;
    }

    _renderTrendTbody() {
        const cfg = this._trendCfg;
        if (!cfg) return '';
        const start = (this._trendPage - 1) * this._trendPageSize;
        const end = start + this._trendPageSize;
        const pageRows = cfg.table.rows.slice(start, end);
        return pageRows.map(r => {
            return `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`;
        }).join('');
    }

    _renderTrendPager() {
        const total = this._trendTotalRows;
        const cur = this._trendPage;
        const last = this._trendTotalPages;
        const canPrev = cur > 1;
        const canNext = cur < last;
        const prevCls = canPrev ? '' : 'disabled';
        const nextCls = canNext ? '' : 'disabled';
        return `
            <div class="trend-pager-bar" id="trend-pager-bar">
                <span class="trend-pager-info">共 <b>${total}</b> 条 / 每页 <b>${this._trendPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
                <div class="trend-pager-btns">
                    <button class="trend-pager-btn ${prevCls}" onclick="window.homePage.switchTrendPage(-1)">上一页</button>
                    <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                    <button class="trend-pager-btn ${nextCls}" onclick="window.homePage.switchTrendPage(1)">下一页</button>
                </div>
            </div>
        `;
    }

    switchTrendPage(delta) {
        const next = this._trendPage + delta;
        if (next < 1 || next > this._trendTotalPages) return;
        this._trendPage = next;
        const bodyEl = document.getElementById('trend-table-body');
        if (bodyEl) bodyEl.innerHTML = this._renderTrendTbody();
        const barEl = document.getElementById('trend-pager-bar');
        if (barEl && barEl.parentNode) {
            // 重建分页条（因为按钮状态要更新）
            const wrap = document.createElement('div');
            wrap.innerHTML = this._renderTrendPager();
            const newBar = wrap.firstElementChild;
            barEl.parentNode.replaceChild(newBar, barEl);
        }
    }

    initTrendAnalysisCharts() {
        const cfg = this._trendCfg;
        if (!cfg) return;
        const mainEl = document.getElementById('trend-main-chart');
        const pieEl = document.getElementById('trend-pie-chart');
        if (!mainEl || !pieEl) return;

        const top = cfg.topBarData || { x: [], y: [] };
        const mainChart = echarts.init(mainEl);
        mainChart.setOption({
            textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '4%', right: '4%', top: '10%', bottom: '18%', containLabel: true },
            xAxis: {
                type: 'category',
                data: top.x,
                axisLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 11, interval: 0, rotate: 28 },
                axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } }
            },
            yAxis: {
                type: 'value',
                name: cfg.unit || '',
                nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                splitLine: { lineStyle: { color: 'rgba(0,180,255,0.08)' } }
            },
            series: [{
                type: 'bar',
                barWidth: '48%',
                data: top.y,
                itemStyle: {
                    color: (p) => {
                        const palette = ['#4a9eff','#00c853','#ffcc00','#ff7f50','#af52de','#ff4081','#00e5ff','#76ff03','#e040fb','#ffd740'];
                        return palette[p.dataIndex % palette.length];
                    },
                    borderRadius: [4, 4, 0, 0]
                },
                label: {
                    show: true,
                    position: 'top',
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: 11,
                    formatter: (p) => p.value
                }
            }]
        });

        const pieChart = echarts.init(pieEl);
        pieChart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                orient: 'vertical',
                right: '2%',
                top: 'middle',
                textStyle: { color: 'rgba(255,255,255,0.75)', fontSize: 11 },
                itemWidth: 10,
                itemHeight: 10
            },
            series: [{
                type: 'pie',
                radius: ['42%', '70%'],
                center: ['36%', '50%'],
                itemStyle: { borderRadius: 3, borderColor: 'rgba(5,13,24,0.9)', borderWidth: 2 },
                label: { show: false },
                labelLine: { show: false },
                data: cfg.pieData
            }]
        });

        const resizer = () => { try { mainChart.resize(); pieChart.resize(); } catch(e) {} };
        window.addEventListener('resize', resizer);
        mainEl._trendResizer = resizer;
    }

    // 弹窗一图表
    initApprovalCompressCharts() {
        const radar = echarts.init(document.getElementById('modal-radar-1'));
        radar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: {},
            radar: {
                indicator: [
                    { name: '高效办成一件事', max: 100 },
                    { name: '极简审批', max: 100 },
                    { name: '智能快办', max: 100 },
                    { name: '免申即享', max: 100 },
                    { name: '全省通办', max: 100 },
                    { name: '便民简证', max: 100 }
                ],
                splitArea: { areaStyle: { color: ['rgba(0, 212, 255, 0.05)', 'rgba(0, 212, 255, 0.1)'] } },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } }
            },
            series: [{
                type: 'radar',
                label: { color: 'rgba(255,255,255,0.6)' },
                data: [{
                    value: [92, 88, 95, 85, 78, 82],
                    name: '时限压缩率',
                    areaStyle: { color: 'rgba(0, 212, 255, 0.3)' },
                    lineStyle: { color: '#ff9500', width: 2 },
                    itemStyle: { color: '#ff9500' }
                }]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-bar-1'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
            yAxis: {
                type: 'category',
                data: ['企业开办', '食品许可', '施工许可', '排污许可', '医疗许可', '危化许可', '运输许可', '特种设备'],
                axisLabel: { fontSize: 13 }
            },
            series: [{
                type: 'bar',
                data: [97.5, 95, 93.3, 90, 88.9, 90, 95, 96.7],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#ff9500' },
                        { offset: 1, color: '#ff6b30' }
                    ]),
                    borderRadius: [0, 4, 4, 0]
                },
                label: { show: true, position: 'right', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    // 弹窗二图表
    initApprovalEfficiencyCharts() {
        const radar = echarts.init(document.getElementById('modal-radar-2'));
        radar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: {},
            radar: {
                indicator: [
                    { name: '高效办成一件事', max: 30 },
                    { name: '极简审批', max: 30 },
                    { name: '智能快办', max: 30 },
                    { name: '免申即享', max: 30 },
                    { name: '全省通办', max: 30 },
                    { name: '便民简证', max: 30 }
                ],
                splitArea: { areaStyle: { color: ['rgba(0, 212, 255, 0.05)', 'rgba(0, 212, 255, 0.1)'] } },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } }
            },
            series: [{
                type: 'radar',
                label: { color: 'rgba(255,255,255,0.6)' },
                data: [{
                    value: [18, 15, 10, 22, 25, 20],
                    name: '平均办理时限（分钟）',
                    areaStyle: { color: 'rgba(52, 199, 89, 0.3)' },
                    lineStyle: { color: '#ffcc00', width: 2 },
                    itemStyle: { color: '#ffcc00' }
                }]
            }]
        });

        const pie = echarts.init(document.getElementById('modal-pie-2'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 25, name: '10分钟内', itemStyle: { color: '#ffcc00' } },
                    { value: 35, name: '10-20分钟', itemStyle: { color: '#ff9500' } },
                    { value: 25, name: '20-30分钟', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '30分钟以上', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });
    }

    // 弹窗三图表：信息共享领域全景分析
    initInfoShareFieldCharts() {
        const bar = echarts.init(document.getElementById('modal-field-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}件次' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['市场监管', '交通运输', '生态环境', '卫生健康', '文化旅游', '应急管理', '税务', '海关', '人力资源', '农业农村', '自然资源', '住建', '教育', '科技', '民政'],
                axisLabel: { fontSize: 11, rotate: 45 }
            },
            yAxis: { type: 'value', name: '件次' },
            series: [{
                type: 'bar',
                data: [81796, 68160, 54528, 45440, 36352, 31808, 27264, 45440, 45440, 45440, 45440, 45440, 45440, 45440, 45440],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ff9500' },
                        { offset: 1, color: '#ff6b30' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                label: { show: false }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-field-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 28, name: '监管信息', itemStyle: { color: '#ff9500' } },
                    { value: 25, name: '执法信息', itemStyle: { color: '#ffcc00' } },
                    { value: 20, name: '信用信息', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '备案信息', itemStyle: { color: '#af52de' } },
                    { value: 12, name: '许可信息', itemStyle: { color: '#ffcc00' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });
    }

    // 弹窗四图表：信息共享部门全景分析
    initInfoShareDeptCharts() {
        const bar = echarts.init(document.getElementById('modal-dept-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}件次' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['省市场监管局', '省交通运输厅', '省生态环境厅', '省卫健委', '省文旅厅', '省应急管理厅', '省税务局', '海口海关', '省人社厅', '省农业农村厅', '省自然资源厅', '省住建厅', '省教育厅', '省科技厅', '省民政厅'],
                axisLabel: { fontSize: 10, rotate: 45 }
            },
            yAxis: { type: 'value', name: '件次' },
            series: [{
                type: 'bar',
                data: [52000, 45000, 38000, 32000, 28000, 25000, 22000, 20000, 18000, 16000, 15000, 14000, 13000, 12000, 11000],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ffcc00' },
                        { offset: 1, color: '#30d158' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                label: { show: false }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-dept-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 12, name: '省级部门', itemStyle: { color: '#ff9500' } },
                    { value: 35, name: '市级部门', itemStyle: { color: '#ffcc00' } },
                    { value: 53, name: '区县级部门', itemStyle: { color: '#ff9500' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });
    }

    // 弹窗五图表：信息共享规模趋势分析
    initInfoShareTrendCharts() {
        const line = echarts.init(document.getElementById('modal-trend-line'));
        line.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06']
            },
            yAxis: { type: 'value', name: '件次' },
            series: [{
                type: 'line',
                data: [32000, 35000, 38000, 42000, 45000, 48000, 52000, 55000, 58000, 62000, 65000, 68000],
                smooth: true,
                areaStyle: { color: 'rgba(0, 212, 255, 0.3)' },
                lineStyle: { color: '#ff9500', width: 2 },
                itemStyle: { color: '#ff9500' },
                label: { show: true, position: 'top', fontSize: 12, color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-trend-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 35, name: '许可信息', itemStyle: { color: '#ff9500' } },
                    { value: 28, name: '监管信息', itemStyle: { color: '#ffcc00' } },
                    { value: 22, name: '执法信息', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '信用信息', itemStyle: { color: '#af52de' } },
                    { value: 5, name: '其他', itemStyle: { color: '#636366' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });
    }

    // 弹窗六图表：信息共享率达成分析
    initInfoShareRateCharts() {
        const donut = echarts.init(document.getElementById('modal-rate-donut'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                data: [
                    { value: 100, name: '已共享', itemStyle: { color: '#ffcc00' } }
                ],
                label: {
                    show: true,
                    position: 'center',
                    formatter: '100%',
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#ffcc00',
                    textBorderWidth: 0
                }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-rate-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['市场监管', '交通运输', '生态环境', '卫生健康', '文化旅游', '应急管理', '税务', '海关'],
                axisLabel: { fontSize: 12 }
            },
            yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            series: [{
                type: 'bar',
                data: [100, 100, 100, 100, 100, 100, 100, 100],
                itemStyle: {
                    color: '#ffcc00',
                    borderRadius: [4, 4, 0, 0]
                },
                label: { show: true, position: 'top', formatter: '{c}%', color: '#ffcc00', textBorderWidth: 0 }
            }]
        });
    }

    // 弹窗四图表
    initApprovalSupervisionCharts() {
        const pie = echarts.init(document.getElementById('modal-pie-4'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { 
                    show: true, 
                    formatter: '{b}\n{c}%', 
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 12
                },
                data: [
                    { value: 25, name: '高效办成一件事', itemStyle: { color: '#ffcc00' } },
                    { value: 20, name: '极简审批', itemStyle: { color: '#ff9500' } },
                    { value: 18, name: '智能快办', itemStyle: { color: '#ff6347' } },
                    { value: 15, name: '免申即享', itemStyle: { color: '#ffcc00' } },
                    { value: 12, name: '全省通办', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '信用审批', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-bar-4'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            yAxis: {
                type: 'category',
                data: ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理'],
                axisLabel: { fontSize: 13 }
            },
            series: [{
                type: 'bar',
                data: [100, 100, 100, 100, 100, 100],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#ff9500' },
                        { offset: 1, color: '#ffcc00' }
                    ]),
                    borderRadius: [0, 4, 4, 0]
                },
                label: { show: true, position: 'right', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    // 弹窗五图表
    initTaskPushCharts() {
        const area = echarts.init(document.getElementById('modal-transfer-trend'));
        area.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['去年7月', '去年8月', '去年9月', '去年10月', '去年11月', '去年12月', '今年1月', '今年2月', '今年3月', '今年4月', '今年5月', '今年6月']
            },
            yAxis: { type: 'value', name: '宗' },
            series: [{
                type: 'line',
                data: [8500, 8200, 9100, 8800, 9500, 9200, 9800, 9500, 10200, 9900, 10500, 10800],
                smooth: true,
                areaStyle: { color: 'rgba(0, 212, 255, 0.3)' },
                lineStyle: { color: '#ff9500', width: 2 },
                itemStyle: { color: '#ff9500' },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-transfer-source'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 35, name: '日常监管', itemStyle: { color: '#ff9500' } },
                    { value: 25, name: '专项检查', itemStyle: { color: '#ffcc00' } },
                    { value: 20, name: '投诉举报', itemStyle: { color: '#ff9500' } },
                    { value: 12, name: '双随机抽查', itemStyle: { color: '#af52de' } },
                    { value: 8, name: '其他', itemStyle: { color: '#8e8e93' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });
    }

    // 弹窗六图表
    initPenaltyTransferCharts() {
        const line = echarts.init(document.getElementById('modal-line-6'));
        line.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: { type: 'value', name: '件次' },
            series: [{
                type: 'line',
                data: [15200, 14800, 16200, 15800, 17200, 16800, 18200, 17800, 19200, 18800, 20200, 21200],
                smooth: true,
                lineStyle: { color: '#ff9500', width: 2 },
                itemStyle: { color: '#ff9500' },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-pie-6'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 20, name: '警告', itemStyle: { color: '#ffcc00' } },
                    { value: 45, name: '罚款', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '没收违法所得', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '暂扣许可证', itemStyle: { color: '#af52de' } },
                    { value: 10, name: '其他', itemStyle: { color: '#8e8e93' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });
    }

    // 弹窗七图表：线索转案件分析
    initPushRateCharts() {
        const funnel = echarts.init(document.getElementById('modal-case-funnel'));
        funnel.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}宗 ({d}%)' },
            series: [{
                type: 'funnel',
                left: '10%',
                top: '10%',
                bottom: '10%',
                width: '80%',
                min: 0,
                max: 112100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: { show: true, position: 'inside', formatter: '{b}\n{c}宗', color: '#fff', fontSize: 12 },
                labelLine: { show: false },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: { fontSize: 14 }
                },
                data: [
                    { value: 112100, name: '线上移送线索', itemStyle: { color: '#ff9500' } },
                    { value: 8965, name: '已接收线索(8%)', itemStyle: { color: '#5856d6' } },
                    { value: 1255, name: '已立案调查(14%)', itemStyle: { color: '#ff9500' } },
                    { value: 99, name: '已结案(7.9%)', itemStyle: { color: '#ffcc00' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-case-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}宗' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '税务', '海关'],
                axisLabel: { fontSize: 11 }
            },
            yAxis: { type: 'value', name: '宗' },
            series: [{
                type: 'bar',
                data: [32, 18, 15, 12, 8, 6, 4, 4],
                itemStyle: {
                    color: '#ff9500',
                    borderRadius: [4, 4, 0, 0]
                },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    // 弹窗八图表：线上线索移送率分析
    initTransferRateCharts() {
        const donut = echarts.init(document.getElementById('modal-transfer-donut'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['55%', '75%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: { show: false, position: 'center' },
                emphasis: { label: { show: true, fontSize: 18, fontWeight: 'bold', formatter: '线上移送率\n{b}\n{c}%' } },
                labelLine: { show: false },
                data: [
                    { value: 99, name: '99%', itemStyle: { color: '#ffcc00' } },
                    { value: 1, name: '1%', itemStyle: { color: '#ff3b30' } }
                ]
            }]
        });
        const centerLabel = document.createElement('div');
        centerLabel.style.position = 'absolute';
        centerLabel.style.left = '50%';
        centerLabel.style.top = '50%';
        centerLabel.style.transform = 'translate(-50%, -50%)';
        centerLabel.style.textAlign = 'center';
        centerLabel.style.color = '#fff';
        centerLabel.innerHTML = '<div style="font-size: 14px;">线上移送率</div><div style="font-size: 24px; font-weight: bold;">99%</div>';
        document.getElementById('modal-transfer-donut').appendChild(centerLabel);

        const bar = echarts.init(document.getElementById('modal-transfer-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['市场监管', '交通运输', '生态环境', '卫生健康', '文化旅游', '应急管理', '税务', '海关'],
                axisLabel: { fontSize: 11 }
            },
            yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            series: [
                {
                    type: 'bar',
                    data: [
                        { value: 99, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                        { value: 97, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                        { value: 98, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                        { value: 100, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                        { value: 94, itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                        { value: 96, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                        { value: 99, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                        { value: 95, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } }
                    ],
                    label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
                },
                {
                    type: 'line',
                    data: [100, 100, 100, 100, 100, 100, 100, 100],
                    lineStyle: { color: '#ff3b30', width: 2, type: 'dashed' },
                    itemStyle: { color: '#ff3b30' },
                    symbol: 'none'
                }
            ]
        });
    }

    // 弹窗七图表
    initCreditServiceCharts() {
        const area = echarts.init(document.getElementById('modal-area-7'));
        area.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '20%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: { type: 'value', name: '万件' },
            series: [{
                type: 'line',
                data: [22, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
                smooth: true,
                areaStyle: { color: 'rgba(0, 212, 255, 0.3)' },
                lineStyle: { color: '#ff9500', width: 2 },
                itemStyle: { color: '#ff9500' },
                markPoint: {
                    data: [{ type: 'max', name: '最大值' }],
                    
                },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie7a = echarts.init(document.getElementById('modal-pie-7a'));
        pie7a.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 65, name: '信用等级审批', itemStyle: { color: '#ff9500' } },
                    { value: 35, name: '非信用等级审批', itemStyle: { color: '#ffcc00' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-pie-7'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 40, name: '行政许可', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '行政确认', itemStyle: { color: '#ffcc00' } },
                    { value: 7, name: '行政裁决', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '行政奖励', itemStyle: { color: '#ffcc00' } },
                    { value: 3, name: '行政给付', itemStyle: { color: '#ff6b6b' } },
                    { value: 24, name: '公共服务', itemStyle: { color: '#9b59b6' } },
                    { value: 6, name: '其他行政权力', itemStyle: { color: '#ffa500' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });
    }

    // 弹窗八图表
    initCreditCoverageCharts() {
        const donut = echarts.init(document.getElementById('modal-donut-8'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 55, name: '企业', itemStyle: { color: '#ff9500' } },
                    { value: 30, name: '个体工商', itemStyle: { color: '#ffcc00' } },
                    { value: 10, name: '农专社', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '其他组织', itemStyle: { color: '#9b59b6' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-bar-8'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            yAxis: {
                type: 'category',
                data: ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '住建工程', '自然资源'],
                axisLabel: { fontSize: 12 }
            },
            series: [{
                type: 'bar',
                data: [99.5, 99.2, 98.8, 99.0, 98.5, 99.3, 98.9, 98.6],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#ff9500' },
                        { offset: 1, color: '#ffcc00' }
                    ]),
                    borderRadius: [0, 4, 4, 0]
                },
                label: { show: true, position: 'right', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    // 弹窗九图表
    initCreditVerifyCharts() {
        const area = echarts.init(document.getElementById('modal-area-9'));
        area.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: { type: 'value', name: '万人' },
            series: [{
                type: 'line',
                data: [48, 46, 52, 50, 54, 52, 56, 54, 58, 56, 60, 62],
                smooth: true,
                areaStyle: { color: 'rgba(0, 212, 255, 0.3)' },
                lineStyle: { color: '#ff9500', width: 2 },
                itemStyle: { color: '#ff9500' },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-pie-9'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 97, name: '通过', itemStyle: { color: '#ffcc00' } },
                    { value: 2, name: '待核查', itemStyle: { color: '#ff9500' } },
                    { value: 1, name: '不通过', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
            }]
        });
    }

    initCreditBAboveCharts() {
        const bar = echarts.init(document.getElementById('modal-b-level-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}万户' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['A级', 'B级', 'C级', 'D级']
            },
            yAxis: { type: 'value', name: '万户' },
            series: [{
                type: 'bar',
                data: [280.05, 350.06, 45.05, 20.05],
                itemStyle: {
                    color: '#ff9500',
                    borderRadius: [4, 4, 0, 0]
                },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-b-level-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 45, name: '企业', itemStyle: { color: '#ffcc00' } },
                    { value: 40, name: '个体工商', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '农专社', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '其他组织', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        });
    }

    initCreditBRatioCharts() {
        const donut = echarts.init(document.getElementById('modal-b-ratio-donut'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                data: [
                    { value: 35, name: 'A级', itemStyle: { color: '#ffcc00' } },
                    { value: 55, name: 'B级', itemStyle: { color: '#06c270' } },
                    { value: 7, name: 'C级', itemStyle: { color: '#ff9500' } },
                    { value: 3, name: 'D级', itemStyle: { color: '#ff3b30' } }
                ],
                label: {
                    show: true,
                    position: 'center',
                    formatter: 'B级及以上\n90%',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#ffcc00',
                    textBorderWidth: 0
                },
                labelLine: { show: false },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-b-ratio-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['制造业', '批发零售', '信息技术', '建筑业', '交通运输', '住宿餐饮', '金融业', '农林牧渔'],
                axisLabel: { fontSize: 11, interval: 0, rotate: 30 }
            },
            yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            series: [
                {
                    type: 'bar',
                    data: [92, 91, 93, 88, 89, 87, 94, 86],
                    itemStyle: {
                        color: '#ff9500',
                        borderRadius: [4, 4, 0, 0]
                    },
                    label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
                },
                {
                    type: 'line',
                    data: [90, 90, 90, 90, 90, 90, 90, 90],
                    lineStyle: { color: '#ff3b30', width: 2, type: 'dashed' },
                    itemStyle: { color: '#ff3b30' },
                    symbol: 'none'
                }
            ]
        });
    }

    initComplianceRateCharts() {
        const donut = echarts.init(document.getElementById('modal-compliance-donut'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                data: [
                    { value: 90, name: '合规', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#ffcc00' }, { offset: 1, color: '#06c270' }]) } },
                    { value: 10, name: '不合规', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#ff3b30' }, { offset: 1, color: '#ff9500' }]) } }
                ],
                label: {
                    show: true,
                    position: 'center',
                    formatter: '90%',
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#ffcc00',
                    textBorderWidth: 0
                },
                labelLine: { show: false },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-compliance-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['制造业', '批发零售', '信息技术', '建筑业', '交通运输', '住宿餐饮', '金融业', '农林牧渔'],
                axisLabel: { fontSize: 11, interval: 0, rotate: 30 }
            },
            yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            series: [{
                type: 'bar',
                data: [
                    { value: 92, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                    { value: 90, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                    { value: 95, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                    { value: 85, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                    { value: 88, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                    { value: 82, itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                    { value: 96, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                    { value: 87, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } }
                ],
                label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initViolationRateCharts() {
        const donut = echarts.init(document.getElementById('modal-violation-donut'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                data: [
                    { value: 90, name: '合规', itemStyle: { color: 'rgba(52, 199, 89, 0.3)' } },
                    { value: 10, name: '违法', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#ff3b30' }, { offset: 1, color: '#ff6b30' }]) } }
                ],
                label: {
                    show: true,
                    position: 'center',
                    formatter: '10%',
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#ff3b30',
                    textBorderWidth: 0
                },
                labelLine: { show: false },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-violation-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['建筑业', '住宿餐饮', '批发零售', '交通运输', '制造业', '信息技术', '金融业', '农林牧渔'],
                axisLabel: { fontSize: 11, interval: 0, rotate: 30 }
            },
            yAxis: { type: 'value', max: 25, axisLabel: { formatter: '{value}%' } },
            series: [{
                type: 'bar',
                data: [
                    { value: 18, itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                    { value: 15, itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                    { value: 12, itemStyle: { color: '#ff6b30', borderRadius: [4, 4, 0, 0] } },
                    { value: 10, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                    { value: 8, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                    { value: 7, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                    { value: 5, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                    { value: 6, itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } }
                ],
                label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initNewMarketCharts() {
        const pie = echarts.init(document.getElementById('modal-market-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}户 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}户 ({d}%)', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 45, name: '企业', itemStyle: { color: '#ff6347' } },
                    { value: 30, name: '个体工商户', itemStyle: { color: '#ffcc00' } },
                    { value: 5, name: '农民专业合作社', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-market-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}户' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}户' } },
            series: [{ type: 'bar', data: [25, 18, 12, 8, 6, 5, 4, 2], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}户', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initStartupTimeCharts() {
        const bar = echarts.init(document.getElementById('modal-startup-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}小时' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['批发零售', '餐饮住宿', '科技服务', '物流运输', '医疗健康', '文化旅游'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}h' } },
            series: [{ type: 'bar', data: [6.5, 8.2, 5.8, 9.5, 12.0, 7.0], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}h', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });

        const pie = echarts.init(document.getElementById('modal-startup-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}h ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 6.5, name: '批发零售', itemStyle: { color: '#ffcc00' } },
                    { value: 8.2, name: '餐饮住宿', itemStyle: { color: '#ff6347' } },
                    { value: 5.8, name: '科技服务', itemStyle: { color: '#ff9500' } },
                    { value: 9.5, name: '物流运输', itemStyle: { color: '#ffcc00' } },
                    { value: 12.0, name: '医疗健康', itemStyle: { color: '#ff9500' } },
                    { value: 7.0, name: '文化旅游', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    initNewProjectCharts() {
        const pie = echarts.init(document.getElementById('modal-project-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}个 ({d}%)', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 32, name: '政府投资项目', itemStyle: { color: '#ff6347' } },
                    { value: 48, name: '企业投资项目', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-project-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}个' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}个' } },
            series: [{ type: 'bar', data: [22, 18, 12, 8, 7, 6, 4, 3], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}个', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initProjectApprovalCharts() {
        const bar = echarts.init(document.getElementById('modal-approval-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}小时' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['政府投资项目', '企业投资项目', '科技创新项目', '基础设施项目', '生态环保项目'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}h' } },
            series: [{ type: 'bar', data: [8.5, 6.2, 4.8, 9.5, 7.2], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}h', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });

        const pie = echarts.init(document.getElementById('modal-approval-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}h ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 8.5, name: '政府投资项目', itemStyle: { color: '#ffcc00' } },
                    { value: 6.2, name: '企业投资项目', itemStyle: { color: '#ff6347' } },
                    { value: 4.8, name: '科技创新项目', itemStyle: { color: '#ff9500' } },
                    { value: 9.5, name: '基础设施项目', itemStyle: { color: '#ffcc00' } },
                    { value: 7.2, name: '生态环保项目', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });
    }

    initYearlyAddCharts() {
        const trend = echarts.init(document.getElementById('modal-yearly-add-trend'));
        trend.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}<br/>新增: {c}户' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['去年7月', '去年8月', '去年9月', '去年10月', '去年11月', '去年12月', '今年1月', '今年2月', '今年3月', '今年4月', '今年5月', '今年6月'], axisLabel: { fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}户' } },
            series: [{
                type: 'line',
                data: [210, 225, 245, 230, 255, 268, 280, 220, 275, 290, 265, 285],
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#ff9500' },
                lineStyle: { color: '#ff9500', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
                    ])
                },
                label: { show: true, position: 'top', formatter: '{c}', fontSize: 11, color: '#ff9500', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-yearly-add-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}户 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}户 ({d}%)', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 1456, name: '企业', itemStyle: { color: '#ff6347' } },
                    { value: 1200, name: '个体', itemStyle: { color: '#ffcc00' } },
                    { value: 200, name: '农专', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    initYearlyRemoveCharts() {
        const pie = echarts.init(document.getElementById('modal-yearly-remove-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}户 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}户 ({d}%)', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 987, name: '注销', itemStyle: { color: '#ff6347' } },
                    { value: 247, name: '吊销', itemStyle: { color: '#ff3b30' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-yearly-remove-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}户' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['制造业', '批发零售', '住宿餐饮', '交通运输', '信息技术', '建筑业', '金融业', '农林牧渔'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}户' } },
            series: [{ type: 'bar', data: [280, 220, 180, 150, 130, 120, 100, 84], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}户', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initGoodBadRateCharts() {
        const gauge = echarts.init(document.getElementById('modal-goodbad-gauge'));
        gauge.setOption({
            textStyle: { color: '#fff' },
            series: [{
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                pointer: { show: true, length: '60%', width: 6, itemStyle: { color: '#ffcc00' } },
                progress: { show: true, overlap: false, roundCap: true, clip: false, itemStyle: { color: '#ffcc00' } },
                axisLine: { lineStyle: { width: 20, color: [[1, '#ffcc00']] } },
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                title: { show: false },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    fontSize: 36,
                    fontWeight: 'bold',
                    color: '#ffcc00',
                    offsetCenter: [0, '30%']
                },
                data: [{ value: 99.96, name: '' }]
            }]
        });

        const pie = echarts.init(document.getElementById('modal-goodbad-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 35, name: '服务态度', itemStyle: { color: '#ffcc00' } },
                    { value: 30, name: '办事效率', itemStyle: { color: '#ff6347' } },
                    { value: 20, name: '流程便捷', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '材料清晰', itemStyle: { color: '#ffcc00' } },
                    { value: 5, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    initEnterpriseSatisfactionCharts() {
        const pie = echarts.init(document.getElementById('modal-satisfaction-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 45, name: '非常满意', itemStyle: { color: '#ffcc00' } },
                    { value: 35, name: '满意', itemStyle: { color: '#ff6347' } },
                    { value: 15, name: '基本满意', itemStyle: { color: '#ffcc00' } },
                    { value: 4, name: '不满意', itemStyle: { color: '#ff9500' } },
                    { value: 1, name: '非常不满意', itemStyle: { color: '#ff3b30' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-satisfaction-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '税务', '海关'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, max: 100 },
            series: [{ type: 'bar', data: [99.5, 99.2, 99.0, 98.8, 98.5, 98.2, 98.0, 97.5], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initTechTotalCharts() {
        const pie = echarts.init(document.getElementById('modal-tech-total-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 30, name: '制造业', itemStyle: { color: '#ff6347' } },
                    { value: 25, name: '信息技术', itemStyle: { color: '#ff9500' } },
                    { value: 20, name: '科学研究', itemStyle: { color: '#ffcc00' } },
                    { value: 12, name: '生物医药', itemStyle: { color: '#ffcc00' } },
                    { value: 8, name: '新材料', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-tech-total-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [380, 280, 200, 150, 120, 80, 40, 8], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initTechNewCharts() {
        const trend = echarts.init(document.getElementById('modal-tech-new-trend'));
        trend.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}<br/>新增: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['2022年', '2023年', '2024年', '2025年', '2026年'], axisLabel: { fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{
                type: 'line',
                data: [85, 120, 170, 200, 326],
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#ffcc00' },
                lineStyle: { color: '#ffcc00', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(52, 199, 89, 0.3)' },
                        { offset: 1, color: 'rgba(52, 199, 89, 0.05)' }
                    ])
                },
                label: { show: true, position: 'top', formatter: '{c}', fontSize: 11, color: '#ffcc00', textBorderWidth: 0 }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-tech-new-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [100, 75, 55, 40, 30, 20, 8, 0], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initTechGrowthCharts() {
        const bar = echarts.init(document.getElementById('modal-tech-growth-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, max: 120 },
            series: [{ type: 'bar', data: [100, 94, 92, 90, 87, 80, 75, 100], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initSpecialTotalCharts() {
        const pie = echarts.init(document.getElementById('modal-special-total-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 35, name: '制造业', itemStyle: { color: '#ff6347' } },
                    { value: 28, name: '信息技术', itemStyle: { color: '#ff9500' } },
                    { value: 18, name: '科学研究', itemStyle: { color: '#ffcc00' } },
                    { value: 10, name: '生物医药', itemStyle: { color: '#ffcc00' } },
                    { value: 6, name: '新材料', itemStyle: { color: '#ff9500' } },
                    { value: 3, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-special-total-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [150, 100, 75, 55, 40, 25, 10, 1], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initSpecialNewCharts() {
        const trend = echarts.init(document.getElementById('modal-special-new-trend'));
        trend.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}<br/>新增: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['2022年', '2023年', '2024年', '2025年', '2026年'], axisLabel: { fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{
                type: 'line',
                data: [35, 50, 63, 80, 118],
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#ffcc00' },
                lineStyle: { color: '#ffcc00', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(52, 199, 89, 0.3)' },
                        { offset: 1, color: 'rgba(52, 199, 89, 0.05)' }
                    ])
                },
                label: { show: true, position: 'top', formatter: '{c}', fontSize: 11, color: '#ffcc00', textBorderWidth: 0 }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-special-new-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [40, 28, 18, 12, 10, 6, 3, 1], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initSpecialGrowthCharts() {
        const bar = echarts.init(document.getElementById('modal-special-growth-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, max: 120 },
            series: [{ type: 'bar', data: [92, 87, 80, 80, 60, 33, 0, 0], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initGiantTotalCharts() {
        const pie = echarts.init(document.getElementById('modal-giant-total-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 40, name: '制造业', itemStyle: { color: '#ff6347' } },
                    { value: 30, name: '信息技术', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '科学研究', itemStyle: { color: '#ffcc00' } },
                    { value: 8, name: '生物医药', itemStyle: { color: '#ffcc00' } },
                    { value: 5, name: '新材料', itemStyle: { color: '#ff9500' } },
                    { value: 2, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-giant-total-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [40, 25, 10, 6, 4, 3, 1, 0], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initGiantNewCharts() {
        const trend = echarts.init(document.getElementById('modal-giant-new-trend'));
        trend.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}<br/>新增: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['2022年', '2023年', '2024年', '2025年', '2026年'], axisLabel: { fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{
                type: 'line',
                data: [5, 8, 12, 15, 23],
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#ffcc00' },
                lineStyle: { color: '#ffcc00', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(52, 199, 89, 0.3)' },
                        { offset: 1, color: 'rgba(52, 199, 89, 0.05)' }
                    ])
                },
                label: { show: true, position: 'top', formatter: '{c}', fontSize: 11, color: '#ffcc00', textBorderWidth: 0 }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-giant-new-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [10, 6, 3, 2, 1, 1, 0, 0], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initGiantGrowthCharts() {
        const bar = echarts.init(document.getElementById('modal-giant-growth-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, max: 120 },
            series: [{ type: 'bar', data: [83, 100, 50, 100, 0, 0, 0, 0], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initComplaintDecreaseCharts() {
        const pie = echarts.init(document.getElementById('modal-complaint-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}件' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}件', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 8, name: '服务态度', itemStyle: { color: '#ff3b30' } },
                    { value: 6, name: '办事效率', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '流程问题', itemStyle: { color: '#ffcc00' } },
                    { value: 3, name: '材料要求', itemStyle: { color: '#ff6347' } },
                    { value: 1, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-complaint-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}件' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '税务', '海关'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}件' } },
            series: [{ type: 'bar', data: [8, 5, 4, 3, 2, 1, 0, 0], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}件', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initProjectLandingCharts() {
        const donut = echarts.init(document.getElementById('modal-landing-donut'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}h ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                labelLine: { show: true },
                data: [
                    { value: 11.5, name: '政府投资项目', itemStyle: { color: '#ffcc00' } },
                    { value: 8.2, name: '企业投资项目', itemStyle: { color: '#ff6347' } },
                    { value: 6.5, name: '科技创新项目', itemStyle: { color: '#ff9500' } },
                    { value: 12.8, name: '基础设施项目', itemStyle: { color: '#ffcc00' } },
                    { value: 9.5, name: '生态环保项目', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-landing-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}小时' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['政府投资项目', '企业投资项目', '科技创新项目', '基础设施项目', '生态环保项目', '文化旅游项目', '产业园区项目', '城市更新项目'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}h' } },
            series: [{ type: 'bar', data: [11.5, 8.2, 6.5, 12.8, 9.5, 7.8, 8.5, 10.2], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}h', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
        });
    }

    initRiskWarningCharts() {
        const stackBar = echarts.init(document.getElementById('modal-warning-stack-bar'));
        stackBar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { 
                data: ['红色预警', '橙色预警', '黄色预警', '蓝色预警'],
                bottom: 0,
                textStyle: { fontSize: 11 }
            },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['危化品安全', '传销监测', '交通运输新业态', '涉水产品违规', '农民工欠薪']
            },
            yAxis: { type: 'value' },
            series: [
                { name: '红色预警', type: 'bar', stack: 'total', data: [3, 2, 1, 1, 1], itemStyle: { color: '#ff3b30' } },
                { name: '橙色预警', type: 'bar', stack: 'total', data: [4, 3, 3, 2, 3], itemStyle: { color: '#ff9500' } },
                { name: '黄色预警', type: 'bar', stack: 'total', data: [3, 2, 2, 1, 4], itemStyle: { color: '#ffcc00' } },
                { name: '蓝色预警', type: 'bar', stack: 'total', data: [2, 1, 1, 1, 2], itemStyle: { color: '#ff6347' } }
            ]
        });

        const trend = echarts.init(document.getElementById('modal-warning-trend'));
        trend.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}<br/>风险预警数: {c}个' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['2026-06-26', '2026-06-27', '2026-06-28', '2026-06-29', '2026-06-30', '2026-07-01', '2026-07-02'],
                axisLabel: { fontSize: 11 }
            },
            yAxis: { type: 'value' },
            series: [{
                type: 'line',
                data: [12, 8, 10, 6, 9, 7, 5],
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#ff9500' },
                lineStyle: { color: '#ff9500', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
                    ])
                },
                label: { 
                    show: true, 
                    position: 'top', 
                    formatter: '{c}', 
                    fontSize: 11,
                    color: '#ff9500',
                    textBorderWidth: 0 
                }
            }]
        });
    }

    initRiskDisposalRateCharts() {
        const domainBar = echarts.init(document.getElementById('modal-disposal-domain-bar'));
        domainBar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}个' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['危化品安全', '交通运输新业态', '传销监测', '涉水产品违规', '农民工欠薪', '非法现金贷', '食品安全', '特种设备安全'],
                axisLabel: { fontSize: 10, interval: 0, rotate: 25 }
            },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}个' } },
            series: [{
                type: 'bar',
                data: [8, 7, 6, 5, 5, 4, 4, 2],
                itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}个', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const efficiencyBar = echarts.init(document.getElementById('modal-disposal-efficiency-bar'));
        efficiencyBar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}天' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['食品安全', '特种设备安全', '危化品安全', '交通运输新业态', '传销监测', '涉水产品违规', '农民工欠薪', '非法现金贷'],
                axisLabel: { fontSize: 10, interval: 0, rotate: 25 }
            },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}天' } },
            series: [{
                type: 'bar',
                data: [1.2, 1.5, 1.8, 2.0, 2.2, 2.5, 2.8, 3.0],
                itemStyle: { 
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ffcc00' },
                        { offset: 1, color: '#90ee90' }
                    ]),
                    borderRadius: [4, 4, 0, 0] 
                },
                label: { show: true, position: 'top', formatter: '{c}天', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    openWarningDetailModal(code, domain, level, source, foundDate, disposalDate, method) {
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        overlay.innerHTML = this.renderWarningDetailModal(code, domain, level, source, foundDate, disposalDate, method);
        document.body.appendChild(overlay);
        
        overlay.querySelector('.warning-detail-close').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    renderWarningDetailModal(code, domain, level, source, foundDate, disposalDate, method) {
        const levelColor = level === '红色' ? '#ff3b30' : level === '橙色' ? '#ff9500' : level === '黄色' ? '#ffcc00' : '#ff6347';
        return `
            <div class="warning-detail-modal">
                <div class="warning-detail-header">
                    <span class="warning-detail-title">${code} - ${domain}${level}风险预警</span>
                    <button class="warning-detail-close">×</button>
                </div>
                <div class="warning-detail-content">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div class="warning-detail-row">
                            <span class="warning-detail-label">预警时间</span>
                            <span class="warning-detail-value">${foundDate}</span>
                        </div>
                        <div class="warning-detail-row">
                            <span class="warning-detail-label">预警类型</span>
                            <span class="warning-detail-value">批后核查逾期未办</span>
                        </div>
                        <div class="warning-detail-row">
                            <span class="warning-detail-label">市场主体</span>
                            <span class="warning-detail-value">海南融创房地产开发有限公司</span>
                        </div>
                        <div class="warning-detail-row">
                            <span class="warning-detail-label">审批日期</span>
                            <span class="warning-detail-value">2026-04-01</span>
                        </div>
                        <div class="warning-detail-row">
                            <span class="warning-detail-label">批后核查时限</span>
                            <span class="warning-detail-value">30个工作日</span>
                        </div>
                        <div class="warning-detail-row">
                            <span class="warning-detail-label">预警等级</span>
                            <span class="warning-detail-value" style="color: ${levelColor}; font-weight: 600;">${level}</span>
                        </div>
                    </div>
                    
                    <div class="warning-detail-row" style="margin-bottom: 20px;">
                        <span class="warning-detail-label">预警描述</span>
                        <div class="warning-detail-value" style="line-height: 1.6;">
                            海南融创房地产开发有限公司于2026年04月01日取得食品经营许可证，根据《食品经营许可管理办法》规定，需在许可批准后30日内完成现场核查。截至2026年05月15日，责任科室未提交核查计划，系统自动判定为"逾期未办"高风险预警。经核查，原因为经办人员岗位调整，工作交接遗漏，导致核查任务超期未启动，该预警已推送至XX局，由处理人张三负责跟进处理，目前已重新指定核查责任人并制定核查计划，预计于2026年05月23日完成现场核查。
                        </div>
                    </div>
                    
                    <div class="warning-detail-row" style="margin-bottom: 20px;">
                        <span class="warning-detail-label">预警原因</span>
                        <div class="warning-detail-value">
                            批后核查任务超过规定时限未启动，且无正当理由的，触发高风险预警。
                        </div>
                    </div>
                    
                    <div class="warning-detail-row">
                        <span class="warning-detail-label">处理信息</span>
                        <div class="warning-detail-value" style="line-height: 1.6;">
                            任务接收：2026年05月22日 15:20，处理人张三通过移动端接收预警工单，原因核查：15:30-16:00，联系原经办人李四，确认因岗位调整（李四调至XX科室）导致任务遗漏。整改措施：16:10，重新指定核查责任人：王五（联系电话：138XXXXXXXXXX）；16:20，制定核查计划：2026年05月23日 09:00开展现场核查；16:30，向市场主体发送《核查告知书》，说明逾期原因及补查安排。结果反馈：17:00，在系统上传《整改说明》《核查计划表》《告知书送达回执》，申请解除预警。
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(0, 212, 255, 0.15);">
                        <div class="warning-detail-label">预警处理流程</div>
                        <div class="warning-detail-timeline">
                            <div class="warning-timeline-item green">
                                <div class="warning-timeline-title">触发预警</div>
                                <div class="warning-timeline-time">2026-01-01 12:00:00</div>
                                <div class="warning-timeline-content">系统自动触发预警信号</div>
                            </div>
                            <div class="warning-timeline-item blue">
                                <div class="warning-timeline-title">推送至：XX局</div>
                                <div class="warning-timeline-time">2026-01-01 12:00:00</div>
                                <div class="warning-timeline-content">预警信息已推送至相关部门</div>
                            </div>
                            <div class="warning-timeline-item orange">
                                <div class="warning-timeline-title">处理人：张三</div>
                                <div class="warning-timeline-time">2026-01-01 12:00:00</div>
                                <div class="warning-timeline-content">处理人已接收并开始处理</div>
                            </div>
                            <div class="warning-timeline-item red">
                                <div class="warning-timeline-title">解除预警</div>
                                <div class="warning-timeline-time">2026-01-01 12:00:00</div>
                                <div class="warning-timeline-content">预警已解除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    openObjectProfileModal(name, code, industry, region) {
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        overlay.innerHTML = this.renderObjectProfileModal(name, code, industry, region);
        document.body.appendChild(overlay);
        
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        this.initObjectProfileCharts();
    }

    renderObjectProfileModal(name, code, industry, region) {
        return `
            <div class="indicator-modal" style="width: 90%; max-width: 1200px;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">企业画像</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="object-profile-content">
                    <div class="object-profile-left">
                        <div class="profile-section">
                            <div class="profile-section-title">基础信息</div>
                            <div class="profile-info-grid">
                                <div class="profile-info-item">
                                    <span class="profile-info-label">统一社会信用代码</span>
                                    <span class="profile-info-value">${code || '91460000MA5TG635K'}</span>
                                </div>
                                <div class="profile-info-item">
                                    <span class="profile-info-label">企业名称</span>
                                    <span class="profile-info-value">${name || '海南信信贸易有限公司'}</span>
                                </div>
                                <div class="profile-info-item">
                                    <span class="profile-info-label">法定代表人</span>
                                    <span class="profile-info-value">王建国</span>
                                </div>
                                <div class="profile-info-item">
                                    <span class="profile-info-label">注册日期</span>
                                    <span class="profile-info-value">2018-05-20</span>
                                </div>
                                <div class="profile-info-item">
                                    <span class="profile-info-label">登记机关</span>
                                    <span class="profile-info-value">海口市市场监督管理局</span>
                                </div>
                                <div class="profile-info-item">
                                    <span class="profile-info-label">行业类别</span>
                                    <span class="profile-info-value">${industry || '批发和零售业'}</span>
                                </div>
                                <div class="profile-info-item">
                                    <span class="profile-info-label">行政区划</span>
                                    <span class="profile-info-value">${region || '海南省海口市龙华区'}</span>
                                </div>
                                <div class="profile-info-item">
                                    <span class="profile-info-label">经营范围</span>
                                    <span class="profile-info-value">国内贸易、进出口贸易</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-section">
                            <div class="profile-section-title">信用信息</div>
                            <div class="credit-info-grid">
                                <div class="credit-item">
                                    <div class="credit-title">公共信用评级</div>
                                    <div class="credit-detail">
                                        <div class="credit-level">信用等级：B</div>
                                        <div class="credit-date">评价时间：2026-03-15</div>
                                        <div class="credit-agency">评价单位：海南省发改委</div>
                                    </div>
                                </div>
                                <div class="credit-item">
                                    <div class="credit-title">市监诚信信用评级</div>
                                    <div class="credit-detail">
                                        <div class="credit-level">信用等级：A</div>
                                        <div class="credit-date">评价时间：2026-04-01</div>
                                        <div class="credit-agency">评价单位：海南省市场监管局</div>
                                    </div>
                                </div>
                                <div class="credit-item">
                                    <div class="credit-title">税务纳税信用评级</div>
                                    <div class="credit-detail">
                                        <div class="credit-level">信用等级：A级</div>
                                        <div class="credit-date">评价时间：2026-01-10</div>
                                        <div class="credit-agency">评价单位：海南省税务局</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="object-profile-center">
                        <div class="profile-section">
                            <div class="profile-section-title">企业画像</div>
                            <div class="profile-stats-card">
                                <div class="profile-stat-item">
                                    <span class="profile-stat-value">12</span>
                                    <span class="profile-stat-label">许可审批次数</span>
                                </div>
                                <div class="profile-stat-item">
                                    <span class="profile-stat-value">15</span>
                                    <span class="profile-stat-label">被检查次数</span>
                                </div>
                                <div class="profile-stat-item">
                                    <span class="profile-stat-value">2</span>
                                    <span class="profile-stat-label">被处罚次数</span>
                                </div>
                                <div class="profile-stat-item">
                                    <span class="profile-stat-value">3</span>
                                    <span class="profile-stat-label">公共信用评级</span>
                                </div>
                                <div class="profile-stat-item">
                                    <span class="profile-stat-value">2</span>
                                    <span class="profile-stat-label">预警次数</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-section">
                            <div class="profile-section-title">审批信息</div>
                            <table class="profile-table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>审批部门</th>
                                        <th>审批时间</th>
                                        <th>审批事项</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>海南省商务厅</td><td>2026-03-10</td><td>对外贸易经营者备案</td></tr>
                                    <tr><td>2</td><td>海口市市场监管局</td><td>2026-02-15</td><td>营业执照变更</td></tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="profile-section">
                            <div class="profile-section-title">监管信息</div>
                            <table class="profile-table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>监管部门</th>
                                        <th>检查时间</th>
                                        <th>检查结果</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>海口市市场监管局</td><td>2026-05-18</td><td>未发现问题</td></tr>
                                    <tr><td>2</td><td>海南省商务厅</td><td>2026-04-20</td><td>需限期整改</td></tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="profile-section">
                            <div class="profile-section-title">执法信息</div>
                            <table class="profile-table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>执法部门</th>
                                        <th>决定时间</th>
                                        <th>处罚结果</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>海口市综合行政执法局</td><td>2025-11-05</td><td>罚款5000元</td></tr>
                                    <tr><td>2</td><td>海口市综合行政执法局</td><td>2024-08-15</td><td>警告</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="object-profile-right">
                        <div class="profile-section">
                            <div class="profile-section-title">证照信息</div>
                            <div class="license-list">
                                <div class="license-item">
                                    <span class="license-name">营业执照</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                                <div class="license-item">
                                    <span class="license-name">对外贸易经营者备案登记表</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                                <div class="license-item">
                                    <span class="license-name">税务登记证</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                                <div class="license-item">
                                    <span class="license-name">组织机构代码证</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                                <div class="license-item">
                                    <span class="license-name">海关报关单位注册登记证书</span>
                                    <button class="license-view-btn">查看</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-section">
                            <div class="profile-section-title">风险预警</div>
                            <div class="risk-warning-list">
                                <div class="risk-warning-item risk-warning-active">
                                    <div class="risk-warning-header">
                                        <span class="risk-warning-title">信用评分极低预警</span>
                                        <span class="risk-warning-status">预警中</span>
                                    </div>
                                    <div class="risk-warning-detail">
                                        <div>预警时间：2026-05-15</div>
                                        <div>预警等级：中</div>
                                        <div>预警原因：信用评分极低</div>
                                    </div>
                                </div>
                                <div class="risk-warning-item risk-warning-resolved">
                                    <div class="risk-warning-header">
                                        <span class="risk-warning-title">多次被检查预警</span>
                                        <span class="risk-warning-status">已解除</span>
                                    </div>
                                    <div class="risk-warning-detail">
                                        <div>预警时间：2026-04-20</div>
                                        <div>预警等级：低</div>
                                        <div>预警原因：企业多次被检查</div>
                                    </div>
                                    <div class="risk-warning-resolved-time">解除预警时间：2026-04-25</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initObjectProfileCharts() {
        setTimeout(() => {
            const chart = echarts.init(document.getElementById('modal-profile-chart'));
            if (chart) {
                chart.setOption({
                    textStyle: { color: 'rgba(255,255,255,0.6)' },
                    tooltip: { trigger: 'item', formatter: '{b}: {c}次' },
                    series: [{
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '50%'],
                        label: { 
                            show: true, 
                            formatter: '{b}\n{c}次', 
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: 12
                        },
                        data: [
                            { value: 12, name: '许可审批', itemStyle: { color: '#ff9500' } },
                            { value: 15, name: '被检查', itemStyle: { color: '#ff9500' } },
                            { value: 2, name: '被处罚', itemStyle: { color: '#ff3b30' } },
                            { value: 2, name: '预警', itemStyle: { color: '#ffcc00' } }
                        ]
                    }]
                });
            }
        }, 100);
    }

    show() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = '';  // 恢复 CSS 定义的 flex 布局
        setTimeout(() => {
            try {
                if (window.approvalBar) window.approvalBar.resize();
                if (window.approvalLine) window.approvalLine.resize();
                if (window.lawTop10) window.lawTop10.resize();
                if (window.creditPie) window.creditPie.resize();
                if (window.supervisionMethodPie) window.supervisionMethodPie.resize();
            } catch(e) {}
        }, 100);
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }

    // ==================== 监管模块弹窗图表 ====================
    initSupervisionBehaviorTotalCharts() {
        const pie = echarts.init(document.getElementById('modal-behavior-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}次', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 1000, name: '双随机一公开', itemStyle: { color: '#ff9500' } },
                    { value: 500, name: '专项检查', itemStyle: { color: '#ff9500' } },
                    { value: 400, name: '重点检查', itemStyle: { color: '#ffcc00' } },
                    { value: 300, name: '有因检查', itemStyle: { color: '#af52de' } },
                    { value: 150, name: '综合查一次', itemStyle: { color: '#ffcc00' } },
                    { value: 106, name: '其他', itemStyle: { color: '#8b8b8b' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-behavior-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}次' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '卫生健康', '自然资源', '生态环境', '交通运输'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}次' } },
            series: [{
                type: 'bar',
                data: [800, 520, 400, 380, 356],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}次', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initSupervisionProblemRateCharts() {
        const pie = echarts.init(document.getElementById('modal-problem-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}个', color: 'rgba(255,255,255,0.8)', fontSize: 11 },
                data: [
                    { value: 90, name: '违规操作', itemStyle: { color: '#ff9500' } },
                    { value: 76, name: '资料不全', itemStyle: { color: '#ffcc00' } },
                    { value: 64, name: '资质过期', itemStyle: { color: '#ff6b30' } },
                    { value: 84, name: '安全隐患', itemStyle: { color: '#ff3b30' } },
                    { value: 69, name: '质量问题', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        window.problemRateBar = echarts.init(document.getElementById('modal-problem-bar'));
        this.updateProblemRateBar('domain');
    }

    switchProblemRateTab(tab) {
        const tabs = document.querySelectorAll('.modal-chart-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tabs[tab === 'domain' ? 0 : tab === 'item' ? 1 : 2].classList.add('active');
        this.updateProblemRateBar(tab);
    }

    updateProblemRateBar(tab) {
        let data, categories;
        if (tab === 'domain') {
            categories = ['食品药品', '特种设备', '价格监管', '广告监管', '网络交易', '知识产权', '计量认证', '标准化', '产品质量', '认证认可', '市场准入', '竞争执法'];
            data = [20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 6];
        } else if (tab === 'item') {
            categories = ['食品经营许可', '特种设备使用', '广告发布', '价格欺诈', '网络交易', '商标侵权', '计量器具', '标准备案', '产品抽检', '认证服务', '企业登记', '反垄断'];
            data = [20, 17, 15, 14, 13, 12, 11, 10, 9, 8, 7, 5];
        } else {
            categories = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈', '临高', '定安', '屯昌', '昌江'];
            data = [19, 17, 15, 14, 13, 12, 11, 10, 9, 8, 6, 4];
        }

        window.problemRateBar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '6%', right: '4%', bottom: '22%', top: '5%', containLabel: true },
            xAxis: { type: 'category', data: categories, axisLabel: { fontSize: 9, interval: 0, rotate: 45 } },
            yAxis: { type: 'value', max: 25, axisLabel: { formatter: '{value}%', fontSize: 10 } },
            series: [{
                type: 'bar',
                data: data,
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', fontSize: 9, textBorderWidth: 0 }
            }]
        });
    }

    initSupervisionVisitReductionCharts() {
        const bar = echarts.init(document.getElementById('modal-visit-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['上门检查任务总量', '实际上门次数'], textStyle: { color: 'rgba(255,255,255,0.6)' } },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '卫生健康', '自然资源', '生态环境', '交通运输'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}次' } },
            series: [
                { name: '上门检查任务总量', type: 'bar', data: [380, 320, 280, 260, 320], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                { name: '实际上门次数', type: 'bar', data: [150, 130, 120, 140, 128], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } }
            ]
        });

        const pie = echarts.init(document.getElementById('modal-visit-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}次', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 520, name: '综合查一次', itemStyle: { color: '#ff9500' } },
                    { value: 322, name: '非现场监管', itemStyle: { color: '#ffcc00' } },
                    { value: 50, name: '其他', itemStyle: { color: '#8b8b8b' } }
                ]
            }]
        });
    }

    initSupervisionTransferCluesCharts() {
        const pie = echarts.init(document.getElementById('modal-clues-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}条 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}条', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 45, name: '市场监管', itemStyle: { color: '#ff9500' } },
                    { value: 32, name: '生态环境', itemStyle: { color: '#ffcc00' } },
                    { value: 25, name: '交通运输', itemStyle: { color: '#af52de' } },
                    { value: 18, name: '卫生健康', itemStyle: { color: '#ffcc00' } },
                    { value: 8, name: '其他', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-clues-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['已受理', '已驳回'], textStyle: { color: 'rgba(255,255,255,0.6)' } },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'], axisLabel: { fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}条' } },
            series: [
                { name: '已受理', type: 'bar', data: [14, 15, 16, 18, 19, 13], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}条', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } },
                { name: '已驳回', type: 'bar', data: [4, 5, 6, 6, 7, 5], itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}条', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }
            ]
        });
    }

    // ==================== 执法模块弹窗图表 ====================
    initLawCaseSourceCharts() {
        const pie = echarts.init(document.getElementById('modal-case-source-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}件 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}件', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 80, name: '日常监管', itemStyle: { color: '#ff9500' } },
                    { value: 57, name: '投诉举报', itemStyle: { color: '#ffcc00' } },
                    { value: 34, name: '信用预警', itemStyle: { color: '#ffcc00' } },
                    { value: 23, name: '部门移送', itemStyle: { color: '#af52de' } },
                    { value: 34, name: '其他', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-case-source-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}件' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '生态环境', '交通运输', '卫生健康', '自然资源'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}件' } },
            series: [{
                type: 'bar',
                data: [65, 52, 42, 23, 18],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}件', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initLawCaseRateCharts() {
        const donut = echarts.init(document.getElementById('modal-case-rate-donut'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}件 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                data: [
                    { value: 90, name: '已立案', itemStyle: { color: '#ffcc00' } },
                    { value: 10, name: '未立案', itemStyle: { color: 'rgba(255,255,255,0.2)' } }
                ],
                label: { show: true, position: 'center', formatter: '立案率\n90%', fontSize: 20, fontWeight: 'bold', color: '#ffcc00', textBorderWidth: 0 },
                labelLine: { show: false }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-case-rate-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '生态环境', '交通运输', '卫生健康', '自然资源'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            series: [{
                type: 'bar',
                data: [95, 94, 96, 93, 95],
                itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initLawMajorCaseRatioCharts() {
        const pie = echarts.init(document.getElementById('modal-major-case-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}件 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}件', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 3, name: '重大安全隐患', itemStyle: { color: '#ff3b30' } },
                    { value: 2, name: '重大经济损失', itemStyle: { color: '#ff9500' } },
                    { value: 2, name: '重大社会影响', itemStyle: { color: '#ffcc00' } },
                    { value: 2, name: '涉刑案件', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-major-case-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}件' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '生态环境', '交通运输', '卫生健康', '自然资源'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}件' } },
            series: [{
                type: 'bar',
                data: [4, 2, 1, 1, 1],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}件', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    // ==================== 信用模块弹窗图表 ====================
    initCreditBAboveNewCharts() {
        const pie = echarts.init(document.getElementById('modal-credit-b-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}万户 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}万户', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 280.05, name: 'A级', itemStyle: { color: '#ffcc00' } },
                    { value: 350.06, name: 'B级', itemStyle: { color: '#ff7f50' } },
                    { value: 45.05, name: 'C级', itemStyle: { color: '#ff9500' } },
                    { value: 20.05, name: 'D级', itemStyle: { color: '#ff3b30' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-credit-b-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['制造业', '批发零售', '信息技术', '建筑业', '交通运输'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            series: [{
                type: 'bar',
                data: [94, 93, 95, 91, 92],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initCreditBRatioNewCharts() {
        const donut = echarts.init(document.getElementById('modal-credit-ratio-donut'));
        donut.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                data: [
                    { value: 90, name: 'B级及以上', itemStyle: { color: '#ffcc00' } },
                    { value: 10, name: 'C级及以下', itemStyle: { color: 'rgba(255,255,255,0.2)' } }
                ],
                label: { show: true, position: 'center', formatter: 'B级及以上\n90%', fontSize: 20, fontWeight: 'bold', color: '#ffcc00', textBorderWidth: 0 },
                labelLine: { show: false }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-credit-ratio-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
            series: [{
                type: 'bar',
                data: [94, 93, 91, 92, 90],
                itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initCreditViolationRateCharts() {
        const bar = echarts.init(document.getElementById('modal-credit-violation-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '生态环境', '交通运输', '卫生健康', '自然资源'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', max: 0.1, axisLabel: { formatter: '{value}%' } },
            series: [{
                type: 'bar',
                data: [0.05, 0.03, 0.02, 0.04, 0.01],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-credit-violation-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}户 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}户', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 100, name: '价格违法', itemStyle: { color: '#ff9500' } },
                    { value: 80, name: '产品质量', itemStyle: { color: '#ffcc00' } },
                    { value: 60, name: '虚假宣传', itemStyle: { color: '#ff6b30' } },
                    { value: 40, name: '无证经营', itemStyle: { color: '#ff3b30' } },
                    { value: 20, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    // ==================== 今日审批指标弹窗图表 ====================
    initAvgProcessTimeCharts() {
        window.avgTimeBar = echarts.init(document.getElementById('modal-avg-time-bar'));
        this.updateAvgTimeBar('domain');

        const pie = echarts.init(document.getElementById('modal-avg-time-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.8)', fontSize: 11 },
                data: [
                    { value: 45, name: '1天内', itemStyle: { color: '#ffcc00' } },
                    { value: 30, name: '1-2天', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '2-3天', itemStyle: { color: '#ffcc00' } },
                    { value: 10, name: '3天以上', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });
    }

    switchAvgTimeTab(tab) {
        const tabs = document.querySelectorAll('.modal-chart-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tabs[tab === 'domain' ? 0 : tab === 'item' ? 1 : 2].classList.add('active');
        this.updateAvgTimeBar(tab);
    }

    updateAvgTimeBar(tab) {
        let data, categories;
        if (tab === 'domain') {
            categories = ['市场监管', '卫生健康', '自然资源', '生态环境', '交通运输', '文化旅游', '教育', '民政', '人社', '住建', '水务', '农业农村'];
            data = [1.2, 1.8, 2.2, 2.5, 1.5, 1.0, 0.8, 1.3, 0.9, 2.0, 1.6, 1.4];
        } else if (tab === 'item') {
            categories = ['食品经营许可', '营业执照', '医疗器械许可', '药品经营许可', '特种设备登记', '道路运输许可', '卫生许可', '环评审批', '施工许可', '不动产登记', '社保办理', '公积金'];
            data = [1.5, 0.5, 2.0, 2.5, 1.2, 2.2, 1.8, 3.0, 2.8, 0.8, 0.5, 0.6];
        } else {
            categories = ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈', '临高', '定安', '屯昌', '昌江'];
            data = [1.0, 1.2, 1.5, 1.8, 1.4, 1.6, 1.9, 1.3, 2.0, 2.2, 2.1, 2.3];
        }

        const sortedPairs = categories.map((cat, idx) => ({ name: cat, value: data[idx] }))
            .sort((a, b) => b.value - a.value);
        categories = sortedPairs.map(p => p.name);
        data = sortedPairs.map(p => p.value);

        window.avgTimeBar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}天' },
            grid: { left: '6%', right: '4%', bottom: '22%', top: '5%', containLabel: true },
            xAxis: { type: 'category', data: categories, axisLabel: { fontSize: 9, interval: 0, rotate: 45 } },
            yAxis: { type: 'value', max: 3.5, axisLabel: { formatter: '{value}天', fontSize: 10 } },
            series: [{
                type: 'bar',
                data: data,
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}天', color: 'rgba(255,255,255,0.6)', fontSize: 9, textBorderWidth: 0 }
            }]
        });
    }

    initProjectApprovalLandingCharts() {
        const bar = echarts.init(document.getElementById('modal-project-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}天' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['工业项目', '商业项目', '服务业项目', '基础设施项目', '其他'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', max: 12, axisLabel: { formatter: '{value}天' } },
            series: [{
                type: 'bar',
                data: [8.5, 9.9, 7.2, 11.5, 6.8],
                itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}天', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-project-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}个', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 45, name: '工业项目', itemStyle: { color: '#ff9500' } },
                    { value: 35, name: '商业项目', itemStyle: { color: '#ffcc00' } },
                    { value: 12, name: '服务业项目', itemStyle: { color: '#ffcc00' } },
                    { value: 8, name: '基础设施项目', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '其他', itemStyle: { color: '#8b8b8b' } }
                ]
            }]
        });
    }

    initAdminCheckYearOnYearCharts() {
        const bar = echarts.init(document.getElementById('modal-check-trend-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['今年', '去年'], textStyle: { color: 'rgba(255,255,255,0.6)' } },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: ['7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月'], axisLabel: { fontSize: 11, interval: 0, rotate: 45 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}次' } },
            series: [
                { name: '今年', type: 'bar', data: [95, 98, 102, 105, 110, 115, 90, 85, 95, 100, 110, 114], itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                { name: '去年', type: 'bar', data: [105, 108, 112, 115, 120, 125, 100, 95, 105, 110, 120, 126], itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] } }
            ]
        });

        const pie = echarts.init(document.getElementById('modal-check-dist-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}次', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 380, name: '市场监管', itemStyle: { color: '#ff9500' } },
                    { value: 250, name: '卫生健康', itemStyle: { color: '#ffcc00' } },
                    { value: 200, name: '自然资源', itemStyle: { color: '#ff9500' } },
                    { value: 180, name: '生态环境', itemStyle: { color: '#af52de' } },
                    { value: 146, name: '交通运输', itemStyle: { color: '#ffcc00' } }
                ]
            }]
        });
    }

    initFirstOffenseExemptionCharts() {
        const bar = echarts.init(document.getElementById('modal-exempt-trend-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['今年', '去年'], textStyle: { color: 'rgba(255,255,255,0.6)' } },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: ['7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月'], axisLabel: { fontSize: 11, interval: 0, rotate: 45 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}件' } },
            series: [
                { name: '今年', type: 'bar', data: [7, 8, 8, 9, 10, 10, 8, 7, 9, 10, 11, 13], itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] } },
                { name: '去年', type: 'bar', data: [6, 7, 7, 8, 8, 9, 7, 6, 7, 8, 9, 10], itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] } }
            ]
        });

        const pie = echarts.init(document.getElementById('modal-exempt-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}件 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}件', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 55, name: '首违不罚', itemStyle: { color: '#ff9500' } },
                    { value: 45, name: '轻微免罚', itemStyle: { color: '#ffcc00' } }
                ]
            }]
        });
    }

    initTransferSupervisionNetCharts() {
        const pie = echarts.init(document.getElementById('modal-transfer-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}件 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}件', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 4, name: '未亮码检查', itemStyle: { color: '#ff9500' } },
                    { value: 3, name: '线下线索移送', itemStyle: { color: '#ff9500' } },
                    { value: 3, name: '批后核查逾期', itemStyle: { color: '#ffcc00' } },
                    { value: 2, name: '线上线索移送质量低', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-transfer-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}件' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '综合执法', '自然资源', '生态环境'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}件' } },
            series: [{
                type: 'bar',
                data: [5, 4, 2, 1],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}件', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initOffsiteSupervisionCharts() {
        const listChart = echarts.init(document.getElementById('modal-offsite-list'));
        listChart.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}个场景' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['生态环境', '安全生产', '市场监管', '交通运输', '其他'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}个' } },
            series: [{
                type: 'bar',
                data: [5, 4, 3, 2, 1],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}个', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const trendChart = echarts.init(document.getElementById('modal-offsite-trend'));
        trendChart.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}个场景' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}个' } },
            series: [{
                type: 'bar',
                data: [6, 4, 2, 1, 1, 1],
                itemStyle: { color: '#ffcc00', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}个', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });
    }

    initBrightKitchenCharts() {
        const listChart = echarts.init(document.getElementById('modal-kitchen-list'));
        listChart.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: {},
            grid: { left: '10%', right: '10%', bottom: '5%', top: '5%', containLabel: true },
            xAxis: { show: false },
            yAxis: { 
                type: 'category', 
                data: ['东山羊庄', '加积鸭酒楼', '和乐蟹餐厅', '文昌鸡饭店', '海南酒家'],
                axisLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },
                axisLine: { show: false },
                axisTick: { show: false }
            },
            series: [
                {
                    type: 'bar',
                    data: [3, 2, 5, 4, 9],
                    barWidth: '40%',
                    itemStyle: { color: '#ff9500', borderRadius: [0, 4, 4, 0] },
                    label: { show: true, position: 'right', formatter: '{c}次', color: '#ff9500', fontSize: 11 }
                }
            ]
        });
    }

    initSandTheftCharts() {
        const listChart = echarts.init(document.getElementById('modal-sand-list'));
        listChart.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: {},
            grid: { left: '10%', right: '10%', bottom: '5%', top: '5%', containLabel: true },
            xAxis: { show: false },
            yAxis: { 
                type: 'category', 
                data: ['陵水河', '昌化江', '南渡江', '万泉河'],
                axisLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
                axisLine: { show: false },
                axisTick: { show: false }
            },
            series: [
                {
                    type: 'bar',
                    data: [2, 1, 2, 3],
                    barWidth: '40%',
                    itemStyle: { 
                        color: ['#ffcc00', '#ff9500', '#ff9500', '#ff3b30'],
                        borderRadius: [0, 4, 4, 0] 
                    },
                    label: { show: true, position: 'right', formatter: '{c}次', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
                }
            ]
        });
    }

    initSandboxSupervisionCharts() {
        const bar = echarts.init(document.getElementById('modal-sandbox-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}个场景' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['医疗健康', '金融科技', '数字经济', '高端制造', '现代服务业'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}个' } },
            series: [{
                type: 'bar',
                data: [12, 8, 6, 4, 2],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}个', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-sandbox-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}个', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 18, name: '创新研发', itemStyle: { color: '#ff9500' } },
                    { value: 8, name: '数字服务', itemStyle: { color: '#ffcc00' } },
                    { value: 4, name: '智能制造', itemStyle: { color: '#00d4ff' } },
                    { value: 2, name: '其他', itemStyle: { color: '#8b8b8b' } }
                ]
            }]
        });
    }

    initTriggerSupervisionCharts() {
        const bar = echarts.init(document.getElementById('modal-trigger-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}个场景' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '生态环境', '安全生产', '税务', '人力资源'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}个' } },
            series: [{
                type: 'bar',
                data: [35, 25, 15, 8, 6],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}个', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-trigger-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}个场景 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}个', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 25, name: '海口', itemStyle: { color: '#ff9500' } },
                    { value: 18, name: '三亚', itemStyle: { color: '#ffcc00' } },
                    { value: 12, name: '儋州', itemStyle: { color: '#00d4ff' } },
                    { value: 8, name: '文昌', itemStyle: { color: '#00ff88' } },
                    { value: 7, name: '琼海', itemStyle: { color: '#af52de' } },
                    { value: 6, name: '万宁', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '东方', itemStyle: { color: '#ffcc00' } },
                    { value: 4, name: '澄迈', itemStyle: { color: '#00d4ff' } },
                    { value: 3, name: '临高', itemStyle: { color: '#00ff88' } },
                    { value: 2, name: '定安', itemStyle: { color: '#af52de' } },
                    { value: 2, name: '屯昌', itemStyle: { color: '#ff9500' } },
                    { value: 2, name: '昌江', itemStyle: { color: '#ffcc00' } },
                    { value: 1, name: '白沙', itemStyle: { color: '#00d4ff' } },
                    { value: 1, name: '乐东', itemStyle: { color: '#00ff88' } },
                    { value: 1, name: '陵水', itemStyle: { color: '#af52de' } },
                    { value: 1, name: '保亭', itemStyle: { color: '#ff9500' } },
                    { value: 1, name: '琼中', itemStyle: { color: '#ffcc00' } },
                    { value: 1, name: '五指山', itemStyle: { color: '#00d4ff' } },
                    { value: 1, name: '三沙', itemStyle: { color: '#00ff88' } }
                ]
            }]
        });
    }

    initLechengMedicalCharts() {
        const bar = echarts.init(document.getElementById('modal-lecheng-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}人次' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['博鳌超级医院', '恒大国际医院', '莱佛士医院', '一龄医院', '慈铭博鳌'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}人次' } },
            series: [{
                type: 'bar',
                data: [1200, 850, 620, 450, 336],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}人', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-lecheng-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}种 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}种', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 45, name: '影像设备', itemStyle: { color: '#ff9500' } },
                    { value: 38, name: '植入器械', itemStyle: { color: '#ff9500' } },
                    { value: 35, name: '检测试剂', itemStyle: { color: '#ffcc00' } },
                    { value: 42, name: '治疗设备', itemStyle: { color: '#ff9500' } },
                    { value: 29, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    initNfanBreedingCharts() {
        const bar = echarts.init(document.getElementById('modal-nfan-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}亩' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['育种单位1', '育种单位2', '育种单位3', '育种单位4', '育种单位5'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}亩' } },
            series: [{
                type: 'bar',
                data: [450, 380, 320, 280, 250],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}亩', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-nfan-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}个', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 45, name: '水稻', itemStyle: { color: '#ff9500' } },
                    { value: 32, name: '玉米', itemStyle: { color: '#ff9500' } },
                    { value: 18, name: '棉花', itemStyle: { color: '#ffcc00' } },
                    { value: 15, name: '大豆', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '蔬菜', itemStyle: { color: '#af52de' } },
                    { value: 8, name: '其他', itemStyle: { color: 'rgba(255,255,255,0.3)' } }
                ]
            }]
        });
    }

    initNetworkPublicOpinionCharts() {
        const line = echarts.init(document.getElementById('modal-opinion-line'));
        line.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['7/3', '7/4', '7/5', '7/6', '7/7', '7/8', '7/9'], axisLabel: { fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}条' } },
            series: [{
                type: 'line',
                data: [32, 28, 45, 38, 52, 42, 45],
                smooth: true,
                itemStyle: { color: '#ff9500' },
                lineStyle: { color: '#ff9500', width: 2 },
                areaStyle: { color: 'rgba(255,149,0,0.2)' },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-opinion-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}条 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}条', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 45, name: '负面', itemStyle: { color: '#ff3b30' } },
                    { value: 520, name: '中性', itemStyle: { color: 'rgba(255,255,255,0.3)' } },
                    { value: 669, name: '正面', itemStyle: { color: '#ffcc00' } }
                ]
            }]
        });
    }

    initSafetyProductionCharts() {
        const listChart = echarts.init(document.getElementById('modal-safety-list'));
        listChart.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: {},
            grid: { left: '10%', right: '10%', bottom: '5%', top: '5%', containLabel: true },
            xAxis: { show: false },
            yAxis: { 
                type: 'category', 
                data: ['海南制造企业', '海南矿业公司', '海南建材集团', '海南电力公司', '海南化工集团'],
                axisLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },
                axisLine: { show: false },
                axisTick: { show: false }
            },
            series: [
                {
                    type: 'bar',
                    data: [0, 1, 1, 1, 3],
                    barWidth: '40%',
                    itemStyle: { 
                        color: ['#ffcc00', '#ff9500', '#ff9500', '#ff9500', '#ff3b30'],
                        borderRadius: [0, 4, 4, 0] 
                    },
                    label: { show: true, position: 'right', formatter: '{c}个隐患', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
                }
            ]
        });
    }

    initEcoEnvironmentCharts() {
        const dashboard = echarts.init(document.getElementById('modal-eco-dashboard'));
        dashboard.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: {},
            series: [
                {
                    type: 'gauge',
                    startAngle: 200,
                    endAngle: -20,
                    center: ['25%', '50%'],
                    radius: '60%',
                    min: 0,
                    max: 14,
                    splitNumber: 7,
                    itemStyle: { color: '#ff9500' },
                    title: { offsetCenter: [0, '70%'], fontSize: 10, color: 'rgba(255,255,255,0.6)', formatter: 'pH值' },
                    detail: { offsetCenter: [0, '30%'], fontSize: 18, color: '#fff', formatter: '8.2' },
                    data: [{ value: 8.2 }]
                },
                {
                    type: 'gauge',
                    startAngle: 200,
                    endAngle: -20,
                    center: ['50%', '50%'],
                    radius: '60%',
                    min: 0,
                    max: 50,
                    splitNumber: 5,
                    itemStyle: { color: '#ffcc00' },
                    title: { offsetCenter: [0, '70%'], fontSize: 10, color: 'rgba(255,255,255,0.6)', formatter: 'PM2.5' },
                    detail: { offsetCenter: [0, '30%'], fontSize: 18, color: '#fff', formatter: '25μg' },
                    data: [{ value: 25 }]
                },
                {
                    type: 'gauge',
                    startAngle: 200,
                    endAngle: -20,
                    center: ['75%', '50%'],
                    radius: '60%',
                    min: 0,
                    max: 100,
                    splitNumber: 5,
                    itemStyle: { color: '#ff9500' },
                    title: { offsetCenter: [0, '70%'], fontSize: 10, color: 'rgba(255,255,255,0.6)', formatter: '噪声分贝' },
                    detail: { offsetCenter: [0, '30%'], fontSize: 18, color: '#fff', formatter: '45dB' },
                    data: [{ value: 45 }]
                }
            ]
        });

        const trend = echarts.init(document.getElementById('modal-eco-trend'));
        trend.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', bottom: '5%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: ['7/3', '7/4', '7/5', '7/6', '7/7', '7/8', '7/9'], axisLabel: { fontSize: 10 } },
            yAxis: { type: 'value', show: false },
            series: [{
                type: 'line',
                data: [7.8, 8.0, 8.2, 7.9, 8.1, 8.3, 8.2],
                smooth: true,
                itemStyle: { color: '#ff9500' },
                lineStyle: { color: '#ff9500', width: 2 },
                areaStyle: { color: 'rgba(255,149,0,0.2)' },
                label: { show: false }
            }]
        });
    }
};
