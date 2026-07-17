window.LawPage = class LawPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        this.modalData = [];
        this.currentPage = 1;
        this.pageSize = 5;
        this.currentStatusFilter = 'all';
        this.currentTypeFilter = 'all';
        this.currentRegionFilter = 'all';
        this.currentFilingFilter = 'all';
        this.currentPenaltyFilter = 'all';
        this.currentModalType = '';
        this.currentModalTitle = '';
        this.currentModalColumns = [];
        this.currentModalDataIndexes = [];
        // 首违不罚弹窗
        this.firstOffenseData = [];
        this.foCurrentPage = 1;
        this.foPageSize = 5;
        this._foOverlay = null;
        this._foCharts = {};
        // 轻微免罚弹窗
        this.minorPenaltyData = [];
        this.mpCurrentPage = 1;
        this.mpPageSize = 5;
        this._mpOverlay = null;
        this._mpCharts = {};
        // 案件办结率弹窗
        this.caseRateData = [];
        this.crCurrentPage = 1;
        this.crPageSize = 5;
        this._crOverlay = null;
        this._crCharts = {};
        // 行刑衔接弹窗
        this.criminalLinkData = [];
        this.clCurrentPage = 1;
        this.clPageSize = 5;
        this._clOverlay = null;
        this._clCharts = {};
        this.clSearchTerm = '';
        // 评查计划弹窗
        this.reviewPlanData = [];
        this.rpCurrentPage = 1;
        this.rpPageSize = 5;
        this._rpOverlay = null;
        this._rpCharts = {};
        // 评查任务弹窗
        this.reviewTaskData = [];
        this.rtCurrentPage = 1;
        this.rtPageSize = 5;
        this._rtOverlay = null;
        this._rtCharts = {};
        // 覆盖部门弹窗
        this.reviewDeptData = [];
        this.rdCurrentPage = 1;
        this.rdPageSize = 5;
        this._rdOverlay = null;
        this._rdCharts = {};
        // 评查结果弹窗
        this.reviewResultData = [];
        this.rrCurrentPage = 1;
        this.rrPageSize = 5;
        this._rrOverlay = null;
        this._rrCharts = {};
        // 信用数据归集弹窗
        this.creditCollectData = [];
        this.ccCurrentPage = 1;
        this.ccPageSize = 5;
        this._ccOverlay = null;
        this._ccCharts = {};
        // 信用数据公示弹窗
        this.creditPublishData = [];
        this.cpCurrentPage = 1;
        this.cpPageSize = 5;
        this._cpOverlay = null;
        this._cpCharts = {};
        // 平均办案时效弹窗
        this.caseEfficiencyData = [];
        this.ceCurrentPage = 1;
        this.cePageSize = 5;
        this._ceOverlay = null;
        this._ceCharts = {};
        this.render();
        this.bindEvents();
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
                                <div class="stat-item" data-indicator="clue_all">
                                    <span class="stat-label">线索总数</span>
                                    <span class="stat-value">128</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item" data-indicator="clue_pending">
                                    <span class="stat-label">待办线索数</span>
                                    <span class="stat-value">10</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item" data-indicator="clue_done">
                                    <span class="stat-label">已办线索数</span>
                                    <span class="stat-value">118</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-section case-section">
                            <div class="card-title">案件情况</div>
                            <div class="case-stats">
                                <div class="stat-card-horizontal">
                                    <div class="stat-item" data-indicator="case_source">
                                        <span class="stat-label">案源数</span>
                                        <span class="stat-value">100</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item" data-indicator="case_filing">
                                        <span class="stat-label">立案数</span>
                                        <span class="stat-value">90</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item" data-indicator="case_penalty">
                                        <span class="stat-label">处罚数</span>
                                        <span class="stat-value">22</span>
                                    </div>
                                </div>
                            </div>
                            <div id="caseBarChart" class="chart-container bar-container-small"></div>
                            <div class="case-bottom-stats">
                                <div class="stat-card-horizontal">
                                    <div class="stat-item" data-first-offense="true">
                                        <span class="stat-label">首违不罚数</span>
                                        <span class="stat-value">20</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item" data-minor-penalty="true">
                                        <span class="stat-label">轻微免罚数</span>
                                        <span class="stat-value">80</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item" data-case-rate="true">
                                        <span class="stat-label">案件办结率</span>
                                        <span class="stat-value">92%</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item" data-criminal-link="true">
                                        <span class="stat-label">涉刑案件数</span>
                                        <span class="stat-value">18</span>
                                    </div>
                                </div>
                            </div>
                            <div id="caseLineChart" class="chart-container line-container-small"></div>
                        </div>
                    </div>

                    <div class="col-center">
                        <div class="card-section map-card">
                          
                            <div class="today-approval-row">
                            <div class="today-approval-item cp-clickable" onclick="window.lawPage.openModal('lw_penalty_total')">
                                    <span class="today-approval-label">行政处罚总数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">100</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓8%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" onclick="window.lawPage.openModal('lw_enforce_item')">
                                    <span class="today-approval-label">执法事项数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">99</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑7.3%</span>
                                    </div>
                                </div>
                               
                                <div class="today-approval-item cp-clickable" onclick="window.lawPage.openModal('lw_clue_accept')">
                                    <span class="today-approval-label">线索受理数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">99</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑9%</span>
                                    </div>
                                </div>
                                
                                <div class="today-approval-item cp-clickable" onclick="window.lawPage.openModal('lw_major_case_ratio')">
                                    <span class="today-approval-label">重大案件占比</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">4.4%</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑1.2%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" onclick="window.lawPage.openModal('lw_credit_push')">
                                    <span class="today-approval-label">推送信用数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">99</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓3.4%</span>
                                    </div>
                                </div>
                            </div>
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
                                    <div class="top10-title">本月执法行为TOP8</div>
                                    <div class="top10-list">
                                        <table class="top10-table">
                                                <thead>
                                                <tr>
                                                    <th>行为名称</th>
                                                    <th>次数</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
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
                                    <div class="top10-title">本月检出问题领域TOP8</div>
                                    <div class="top10-list">
                                        <table class="top10-table">
                                                <thead>
                                                <tr>
                                                    <th>领域</th>
                                                    <th>次数</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
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
                            <div class="card-title">效能分析</div>
                            <div class="efficiency-stat-row">
                                <div class="efficiency-stat-card" onclick="window.lawPage.openModal('admin_lawsuit_rate')" style="cursor: pointer;">
                                    <span class="efficiency-stat-label">行政败诉率</span>
                                    <span class="efficiency-stat-value">1.2%</span>
                                </div>
                                <div class="efficiency-stat-card" onclick="window.lawPage.openModal('review_correction_rate')" style="cursor: pointer;">
                                    <span class="efficiency-stat-label">复议被纠错率</span>
                                    <span class="efficiency-stat-value">2.5%</span>
                                </div>
                            </div>
                            <div id="efficiency-bar-chart" class="chart-container efficiency-bar-container"></div>
                        </div>
                        <div class="card-section penalty-section">
                            <div class="card-title">处罚信息公示情况</div>
                            <div class="stat-card-horizontal">
                                <div class="stat-item" data-credit-collect="true">
                                    <span class="stat-label">行政处罚信用数据归集数</span>
                                    <span class="stat-value">2,345</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item" data-credit-publish="true">
                                    <span class="stat-label">行政处罚信用数据公示数</span>
                                    <span class="stat-value">2,198</span>
                                </div>
                            </div>
                            <div id="penaltyTrendChart" class="chart-container"></div>
                        </div>


                        <div class="card-section dataflow-card">
                            <h3 class="card-title">数据流转情况</h3>
                            <div class="dataflow-tabs">
                                <button class="dataflow-tab active" data-tab="platform">平台流转</button>
                                <button class="dataflow-tab" data-tab="category">数据分类</button>
                            </div>
                            <div id="dataflow-platform" class="dataflow-content">
                                <div class="dataflow-flow-chart" id="law-dataflow-flow-chart"></div>
                            </div>
                            <div id="dataflow-category" class="dataflow-content dataflow-content-hidden">
                                <div class="dataflow-stats">
                                    <div class="dataflow-stat-item" onclick="event.stopPropagation();window.lawPage.openPushDataModal()" style="cursor: pointer;">
                                        <span class="dataflow-label">推送数据</span>
                                        <div class="dataflow-value-box">
                                            <span class="dataflow-value">6.3</span>
                                            <span class="dataflow-unit">万条</span>
                                        </div>
                                        <div id="law-push-pie" class="chart-container pie-container mini-pie"></div>
                                    </div>
                                    <div class="dataflow-stat-item" onclick="event.stopPropagation();window.lawPage.openReceiveDataModal()" style="cursor: pointer;">
                                        <span class="dataflow-label">收到数据</span>
                                        <div class="dataflow-value-box">
                                            <span class="dataflow-value">4.8</span>
                                            <span class="dataflow-unit">万条</span>
                                        </div>
                                        <div id="law-receive-pie" class="chart-container pie-container mini-pie"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ==================== 事件绑定 ====================
    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const foTrigger = e.target.closest('[data-first-offense]');
            if (foTrigger) {
                this.openFirstOffenseModal();
                return;
            }
            const mpTrigger = e.target.closest('[data-minor-penalty]');
            if (mpTrigger) {
                this.openMinorPenaltyModal();
                return;
            }
            const crTrigger = e.target.closest('[data-case-rate]');
            if (crTrigger) {
                this.openCaseRateModal();
                return;
            }
            const clTrigger = e.target.closest('[data-criminal-link]');
            if (clTrigger) {
                this.openCriminalLinkModal();
                return;
            }

            const ccTrigger = e.target.closest('[data-credit-collect]');
            if (ccTrigger) {
                this.openCreditCollectModal();
                return;
            }
            const cpTrigger = e.target.closest('[data-credit-publish]');
            if (cpTrigger) {
                this.openCreditPublishModal();
                return;
            }
            const ceTrigger = e.target.closest('[data-case-efficiency]');
            if (ceTrigger) {
                this.openCaseEfficiencyModal();
                return;
            }
            
            const indicator = e.target.closest('[data-indicator]');
            if (indicator) {
                const type = indicator.dataset.indicator;
                this.openModal(type);
            }
            const tab = e.target.closest('[data-tab]');
            if (tab) {
                this.switchDataflowTab(tab.dataset.tab);
            }
        });
    }

    switchDataflowTab(tab) {
        this.container.querySelectorAll('.dataflow-tab').forEach(t => t.classList.remove('active'));
        this.container.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        this.container.querySelector('#dataflow-platform').classList.toggle('dataflow-content-hidden', tab !== 'platform');
        this.container.querySelector('#dataflow-category').classList.toggle('dataflow-content-hidden', tab !== 'category');
        if (tab === 'category') {
            setTimeout(() => {
                if (this.charts.lawPushPie) this.charts.lawPushPie.resize();
                if (this.charts.lawReceivePie) this.charts.lawReceivePie.resize();
            }, 100);
        }
    }

    renderDataflowFlowChart() {
        const container = document.getElementById('law-dataflow-flow-chart');
        if (!container) return;
        container.innerHTML = `
            <div class="dataflow-image-container">
                <img src="执法-数据流转.png" alt="数据流转" class="dataflow-flow-image">
            </div>
        `;
    }

    // ==================== 模拟数据生成 ====================
    generateClueData() {
        const data = [];
        const types = ['检查发现', '上级交办', '投诉举报', '其他'];
        const entityTypes = ['企业', '个体工商户', '其他组织'];
        const regions = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市'];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局'];
        for (let i = 1; i <= 128; i++) {
            const year = 2024 + Math.floor(Math.random() * 2);
            const month = Math.floor(Math.random() * 12) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            data.push({
                clueCode: 'CL' + String(i).padStart(4, '0'),
                clueDesc: '涉嫌' + ['无证经营', '虚假宣传', '价格欺诈', '产品质量', '环境污染'][i % 5],
                partyName: '当事人' + i,
                partyCode: 'P' + String(i).padStart(4, '0'),
                partyType: entityTypes[i % entityTypes.length],
                registerTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                status: i <= 118 ? '已办' : '待办',
                clueType: types[i % types.length],
                region: regions[i % regions.length],
                dept: depts[i % depts.length]
            });
        }
        return data;
    }

    generateCaseSourceData() {
        const data = [];
        const types = ['检查发现', '上级交办', '投诉举报', '其他'];
        const entityTypes = ['企业', '个体工商户', '其他组织'];
        const regions = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市'];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局'];
        for (let i = 1; i <= 100; i++) {
            const year = 2024 + Math.floor(Math.random() * 2);
            const month = Math.floor(Math.random() * 12) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            data.push({
                clueCode: 'CS' + String(i).padStart(4, '0'),
                sourceDesc: '发现' + ['无证经营行为', '虚假宣传行为', '价格欺诈行为', '产品质量问题', '环境污染问题'][i % 5],
                partyName: '当事人' + i,
                partyCode: 'P' + String(i).padStart(4, '0'),
                partyType: entityTypes[i % entityTypes.length],
                registerTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                status: i <= 90 ? '已办' : '待办',
                sourceType: types[i % types.length],
                region: regions[i % regions.length],
                dept: depts[i % depts.length]
            });
        }
        return data;
    }

    generateFilingData() {
        const data = [];
        const caseTypes = ['行政处罚', '行政强制', '行政检查', '行政征收'];
        const entityTypes = ['企业', '个体工商户', '其他组织'];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局'];
        const noFileReasons = ['没有违法事实', '已过追诉时效', '没有明确当事人或当事人已死亡', '不属于综合行政执法范畴', '其他不予立案情形'];
        for (let i = 1; i <= 100; i++) {
            const isFiled = i <= 90;
            const year = 2024 + Math.floor(Math.random() * 2);
            const month = Math.floor(Math.random() * 12) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            const fileMonth = month + Math.floor(Math.random() * 2) + 1;
            const fileDay = Math.floor(Math.random() * 28) + 1;
            data.push({
                caseCode: 'CA' + String(i).padStart(4, '0'),
                caseType: caseTypes[i % caseTypes.length],
                partyName: '当事人' + i,
                partyCode: 'P' + String(i).padStart(4, '0'),
                registerTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                isFiled: isFiled ? '立案' : '不予立案',
                fileTime: isFiled ? `${year}-${String(fileMonth).padStart(2, '0')}-${String(fileDay).padStart(2, '0')}` : '—',
                noFileReason: !isFiled ? noFileReasons[i % noFileReasons.length] : '—',
                dept: depts[i % depts.length],
                officer: '执法员' + (i % 5 + 1)
            });
        }
        return data;
    }

    generatePenaltyData() {
        const data = [];
        const caseTypes = ['行政处罚', '行政强制', '行政检查', '行政征收'];
        const entityTypes = ['企业', '个体工商户', '其他组织'];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局'];
        const noPenaltyReasons = [
            '当事人有证据足以证明没有主观过错',
            '违法行为轻微并及时改正，没有造成危害后果',
            '初次违法且危害后果轻微并及时改正'
        ];
        for (let i = 1; i <= 100; i++) {
            const isPenalized = i <= 22;
            const year = 2024 + Math.floor(Math.random() * 2);
            const month = Math.floor(Math.random() * 12) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            const penaltyMonth = month + Math.floor(Math.random() * 3) + 1;
            const penaltyDay = Math.floor(Math.random() * 28) + 1;
            data.push({
                caseCode: 'CA' + String(i).padStart(4, '0'),
                caseType: caseTypes[i % caseTypes.length],
                partyName: '当事人' + i,
                partyCode: 'P' + String(i).padStart(4, '0'),
                registerTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                isPenalized: isPenalized ? '处罚' : '不予处罚',
                penaltyTime: isPenalized ? `${year}-${String(penaltyMonth).padStart(2, '0')}-${String(penaltyDay).padStart(2, '0')}` : '—',
                noPenaltyReason: !isPenalized ? noPenaltyReasons[i % noPenaltyReasons.length] : '—',
                dept: depts[i % depts.length],
                officer: '执法员' + (i % 5 + 1)
            });
        }
        return data;
    }

    // ==================== 弹窗系统 ====================
    openModal(type) {
        if (['lw_enforce_item','lw_enforce_case','lw_clue_accept','lw_penalty_total','lw_major_case_ratio','lw_credit_push'].includes(type)) {
            this.openLawTrendModal(type);
            return;
        }
        this.currentPage = 1;
        this.currentStatusFilter = 'all';
        this.currentTypeFilter = 'all';
        this.currentRegionFilter = 'all';
        this.currentFilingFilter = 'all';
        this.currentPenaltyFilter = 'all';
        this.currentModalType = type;

        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';

        if (type === 'clue_all' || type === 'clue_pending' || type === 'clue_done') {
            this.modalData = this.generateClueData();
            this.currentModalTitle = '线索列表';
            this.currentModalColumns = ['线索编号', '线索描述', '当事人', '当事人编码', '当事人类型', '登记时间', '状态', '处理部门'];
            this.currentModalDataIndexes = ['clueCode', 'clueDesc', 'partyName', 'partyCode', 'partyType', 'registerTime', 'status', 'dept'];
            if (type === 'clue_pending') this.currentStatusFilter = '待办';
            if (type === 'clue_done') this.currentStatusFilter = '已办';
            overlay.innerHTML = this.renderClueModal();
        } else if (type === 'case_source') {
            this.modalData = this.generateCaseSourceData();
            this.currentModalTitle = '案源列表';
            this.currentModalColumns = ['线索编号', '案源描述', '当事人', '当事人编码', '当事人类型', '登记时间', '状态', '处理部门'];
            this.currentModalDataIndexes = ['clueCode', 'sourceDesc', 'partyName', 'partyCode', 'partyType', 'registerTime', 'status', 'dept'];
            overlay.innerHTML = this.renderCaseSourceModal();
        } else if (type === 'case_filing') {
            this.modalData = this.generateFilingData();
            this.currentModalTitle = '立案列表';
            this.currentModalColumns = ['案件编号', '案件类型', '当事人名称', '当事人编码', '登记时间', '是否立案', '立案/不予立案时间', '处理部门', '执法人员'];
            this.currentModalDataIndexes = ['caseCode', 'caseType', 'partyName', 'partyCode', 'registerTime', 'isFiled', 'fileTime', 'dept', 'officer'];
            overlay.innerHTML = this.renderFilingModal();
        } else if (type === 'case_penalty') {
            this.modalData = this.generatePenaltyData();
            this.currentModalTitle = '处罚列表';
            this.currentModalColumns = ['案件编号', '案件类型', '当事人名称', '当事人编码', '登记时间', '是否处罚', '处罚/不予处罚时间', '处理部门', '执法人员'];
            this.currentModalDataIndexes = ['caseCode', 'caseType', 'partyName', 'partyCode', 'registerTime', 'isPenalized', 'penaltyTime', 'dept', 'officer'];
            overlay.innerHTML = this.renderPenaltyModal();
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

        this.bindLawModalEvents(overlay);
        this.initLawModalChartsDelayed();
    }

    closeModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) overlay.remove();
    }

    // ==================== 统计卡片生成 ====================
    generateStats(filteredData) {
        const stats = [];

        if (this.currentModalType === 'clue_all' || this.currentModalType === 'clue_pending' || this.currentModalType === 'clue_done') {
            const total = this.modalData.length;
            const pending = this.modalData.filter(item => item.status === '待办').length;
            const done = this.modalData.filter(item => item.status === '已办').length;
            stats.push(
                { label: '线索总数', value: total },
                { label: '待办数量', value: pending },
                { label: '已办数量', value: done }
            );
        } else if (this.currentModalType === 'case_source') {
            const total = this.modalData.length;
            const pending = this.modalData.filter(item => item.status === '待办').length;
            const done = this.modalData.filter(item => item.status === '已办').length;
            stats.push(
                { label: '案源总数', value: total },
                { label: '待办数量', value: pending },
                { label: '已办数量', value: done }
            );
        }

        return stats;
    }

    renderStats(stats) {
        if (!stats || stats.length === 0) return '';
        return `
            <div class="indicator-modal-stats">
                ${stats.map(stat => `
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">${stat.label}</span>
                        <span class="indicator-stat-value">${stat.value}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ==================== 图表配置 ====================
    renderClueCharts() {
        return `
            <div class="indicator-modal-chart">
                <div class="indicator-chart-item">
                    <span class="indicator-chart-title">区划线索数分布</span>
                    <div id="law-modal-bar-1" class="indicator-chart-container"></div>
                </div>
                <div class="indicator-chart-item">
                    <span class="indicator-chart-title">线索类型分布</span>
                    <div id="law-modal-pie-1" class="indicator-chart-container"></div>
                </div>
            </div>
        `;
    }

    renderCaseSourceCharts() {
        return `
            <div class="indicator-modal-chart">
                <div class="indicator-chart-item">
                    <span class="indicator-chart-title">区划案源数分布</span>
                    <div id="law-modal-bar-1" class="indicator-chart-container"></div>
                </div>
                <div class="indicator-chart-item">
                    <span class="indicator-chart-title">案源类型分布</span>
                    <div id="law-modal-pie-1" class="indicator-chart-container"></div>
                </div>
            </div>
        `;
    }

    renderFilingCharts() {
        return `
            <div class="indicator-modal-chart">
                <div class="indicator-chart-item">
                    <span class="indicator-chart-title">立案情况</span>
                    <div id="law-modal-pie-1" class="indicator-chart-container"></div>
                </div>
                <div class="indicator-chart-item">
                    <span class="indicator-chart-title">不予立案原因数量</span>
                    <div id="law-modal-bar-1" class="indicator-chart-container"></div>
                </div>
            </div>
        `;
    }

    renderPenaltyCharts() {
        return `
            <div class="indicator-modal-chart">
                <div class="indicator-chart-item">
                    <span class="indicator-chart-title">处罚情况</span>
                    <div id="law-modal-pie-1" class="indicator-chart-container"></div>
                </div>
                <div class="indicator-chart-item">
                    <span class="indicator-chart-title">不予处罚原因数量</span>
                    <div id="law-modal-bar-1" class="indicator-chart-container"></div>
                </div>
            </div>
        `;
    }

    // ==================== 弹窗渲染 ====================
    renderClueModal() {
        const filteredData = this.filterClueData();
        const totalPages = Math.ceil(filteredData.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = filteredData.slice(start, end);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">${this.currentModalTitle}</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                ${this.renderStats(this.generateStats(filteredData))}
                ${this.renderClueCharts()}
                <div class="indicator-modal-filter">
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">状态：</span>
                        <select class="indicator-filter-select" id="law-status-filter">
                            <option value="all">全部</option>
                            <option value="待办" ${this.currentStatusFilter === '待办' ? 'selected' : ''}>待办</option>
                            <option value="已办" ${this.currentStatusFilter === '已办' ? 'selected' : ''}>已办</option>
                        </select>
                    </div>
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">线索类型：</span>
                        <select class="indicator-filter-select" id="law-type-filter">
                            <option value="all">全部</option>
                            <option value="检查发现" ${this.currentTypeFilter === '检查发现' ? 'selected' : ''}>检查发现</option>
                            <option value="上级交办" ${this.currentTypeFilter === '上级交办' ? 'selected' : ''}>上级交办</option>
                            <option value="投诉举报" ${this.currentTypeFilter === '投诉举报' ? 'selected' : ''}>投诉举报</option>
                            <option value="其他" ${this.currentTypeFilter === '其他' ? 'selected' : ''}>其他</option>
                        </select>
                    </div>
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">区划：</span>
                        <select class="indicator-filter-select" id="law-region-filter">
                            <option value="all">全部</option>
                            <option value="海口市" ${this.currentRegionFilter === '海口市' ? 'selected' : ''}>海口市</option>
                            <option value="三亚市" ${this.currentRegionFilter === '三亚市' ? 'selected' : ''}>三亚市</option>
                            <option value="儋州市" ${this.currentRegionFilter === '儋州市' ? 'selected' : ''}>儋州市</option>
                            <option value="文昌市" ${this.currentRegionFilter === '文昌市' ? 'selected' : ''}>文昌市</option>
                            <option value="琼海市" ${this.currentRegionFilter === '琼海市' ? 'selected' : ''}>琼海市</option>
                            <option value="万宁市" ${this.currentRegionFilter === '万宁市' ? 'selected' : ''}>万宁市</option>
                        </select>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                ${this.currentModalColumns.map(col => `<th>${col}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.clueCode}</td>
                                    <td>${item.clueDesc}</td>
                                    <td>${item.partyName}</td>
                                    <td>${item.partyCode}</td>
                                    <td>${item.partyType}</td>
                                    <td>${item.registerTime}</td>
                                    <td class="${item.status === '待办' ? 'status-pending' : 'status-completed'}">${item.status}</td>
                                    <td>${item.dept}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="law-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="law-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    renderCaseSourceModal() {
        const filteredData = this.filterCaseSourceData();
        const totalPages = Math.ceil(filteredData.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = filteredData.slice(start, end);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">${this.currentModalTitle}</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                ${this.renderStats(this.generateStats(filteredData))}
                ${this.renderCaseSourceCharts()}
                <div class="indicator-modal-filter">
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">状态：</span>
                        <select class="indicator-filter-select" id="law-status-filter">
                            <option value="all">全部</option>
                            <option value="待办" ${this.currentStatusFilter === '待办' ? 'selected' : ''}>待办</option>
                            <option value="已办" ${this.currentStatusFilter === '已办' ? 'selected' : ''}>已办</option>
                        </select>
                    </div>
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">案源类型：</span>
                        <select class="indicator-filter-select" id="law-type-filter">
                            <option value="all">全部</option>
                            <option value="检查发现" ${this.currentTypeFilter === '检查发现' ? 'selected' : ''}>检查发现</option>
                            <option value="上级交办" ${this.currentTypeFilter === '上级交办' ? 'selected' : ''}>上级交办</option>
                            <option value="投诉举报" ${this.currentTypeFilter === '投诉举报' ? 'selected' : ''}>投诉举报</option>
                            <option value="其他" ${this.currentTypeFilter === '其他' ? 'selected' : ''}>其他</option>
                        </select>
                    </div>
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">区划：</span>
                        <select class="indicator-filter-select" id="law-region-filter">
                            <option value="all">全部</option>
                            <option value="海口市" ${this.currentRegionFilter === '海口市' ? 'selected' : ''}>海口市</option>
                            <option value="三亚市" ${this.currentRegionFilter === '三亚市' ? 'selected' : ''}>三亚市</option>
                            <option value="儋州市" ${this.currentRegionFilter === '儋州市' ? 'selected' : ''}>儋州市</option>
                            <option value="文昌市" ${this.currentRegionFilter === '文昌市' ? 'selected' : ''}>文昌市</option>
                            <option value="琼海市" ${this.currentRegionFilter === '琼海市' ? 'selected' : ''}>琼海市</option>
                            <option value="万宁市" ${this.currentRegionFilter === '万宁市' ? 'selected' : ''}>万宁市</option>
                        </select>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                ${this.currentModalColumns.map(col => `<th>${col}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.clueCode}</td>
                                    <td>${item.sourceDesc}</td>
                                    <td>${item.partyName}</td>
                                    <td>${item.partyCode}</td>
                                    <td>${item.partyType}</td>
                                    <td>${item.registerTime}</td>
                                    <td class="${item.status === '待办' ? 'status-pending' : 'status-completed'}">${item.status}</td>
                                    <td>${item.dept}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="law-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="law-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    renderFilingModal() {
        const filteredData = this.filterFilingData();
        const totalPages = Math.ceil(filteredData.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = filteredData.slice(start, end);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">${this.currentModalTitle}</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                ${this.renderFilingCharts()}
                <div class="indicator-modal-filter">
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">是否立案：</span>
                        <select class="indicator-filter-select" id="law-filing-filter">
                            <option value="all">全部</option>
                            <option value="立案" ${this.currentFilingFilter === '立案' ? 'selected' : ''}>立案</option>
                            <option value="不予立案" ${this.currentFilingFilter === '不予立案' ? 'selected' : ''}>不予立案</option>
                        </select>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                ${this.currentModalColumns.map(col => `<th>${col}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.caseCode}</td>
                                    <td>${item.caseType}</td>
                                    <td>${item.partyName}</td>
                                    <td>${item.partyCode}</td>
                                    <td>${item.registerTime}</td>
                                    <td>${item.isFiled}</td>
                                    <td>${item.fileTime}</td>
                                    <td>${item.dept}</td>
                                    <td>${item.officer}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="law-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="law-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    renderPenaltyModal() {
        const filteredData = this.filterPenaltyData();
        const totalPages = Math.ceil(filteredData.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = filteredData.slice(start, end);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">${this.currentModalTitle}</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                ${this.renderPenaltyCharts()}
                <div class="indicator-modal-filter">
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">是否处罚：</span>
                        <select class="indicator-filter-select" id="law-penalty-filter">
                            <option value="all">全部</option>
                            <option value="处罚" ${this.currentPenaltyFilter === '处罚' ? 'selected' : ''}>处罚</option>
                            <option value="不予处罚" ${this.currentPenaltyFilter === '不予处罚' ? 'selected' : ''}>不予处罚</option>
                        </select>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                ${this.currentModalColumns.map(col => `<th>${col}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.caseCode}</td>
                                    <td>${item.caseType}</td>
                                    <td>${item.partyName}</td>
                                    <td>${item.partyCode}</td>
                                    <td>${item.registerTime}</td>
                                    <td>${item.isPenalized}</td>
                                    <td>${item.penaltyTime}</td>
                                    <td>${item.dept}</td>
                                    <td>${item.officer}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="law-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="law-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    // ==================== 数据过滤 ====================
    filterClueData() {
        return this.modalData.filter(item => {
            if (this.currentStatusFilter !== 'all' && item.status !== this.currentStatusFilter) return false;
            if (this.currentTypeFilter !== 'all' && item.clueType !== this.currentTypeFilter) return false;
            if (this.currentRegionFilter !== 'all' && item.region !== this.currentRegionFilter) return false;
            return true;
        });
    }

    filterCaseSourceData() {
        return this.modalData.filter(item => {
            if (this.currentStatusFilter !== 'all' && item.status !== this.currentStatusFilter) return false;
            if (this.currentTypeFilter !== 'all' && item.sourceType !== this.currentTypeFilter) return false;
            if (this.currentRegionFilter !== 'all' && item.region !== this.currentRegionFilter) return false;
            return true;
        });
    }

    filterFilingData() {
        return this.modalData.filter(item => {
            if (this.currentFilingFilter !== 'all' && item.isFiled !== this.currentFilingFilter) return false;
            return true;
        });
    }

    filterPenaltyData() {
        return this.modalData.filter(item => {
            if (this.currentPenaltyFilter !== 'all' && item.isPenalized !== this.currentPenaltyFilter) return false;
            return true;
        });
    }

    // ==================== 弹窗事件绑定 ====================
    bindLawModalEvents(overlay) {
        const statusFilter = overlay.querySelector('#law-status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentStatusFilter = e.target.value;
                this.currentPage = 1;
                this.updateLawModal();
            });
        }

        const typeFilter = overlay.querySelector('#law-type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentTypeFilter = e.target.value;
                this.currentPage = 1;
                this.updateLawModal();
            });
        }

        const regionFilter = overlay.querySelector('#law-region-filter');
        if (regionFilter) {
            regionFilter.addEventListener('change', (e) => {
                this.currentRegionFilter = e.target.value;
                this.currentPage = 1;
                this.updateLawModal();
            });
        }

        const filingFilter = overlay.querySelector('#law-filing-filter');
        if (filingFilter) {
            filingFilter.addEventListener('change', (e) => {
                this.currentFilingFilter = e.target.value;
                this.currentPage = 1;
                this.updateLawModal();
            });
        }

        const penaltyFilter = overlay.querySelector('#law-penalty-filter');
        if (penaltyFilter) {
            penaltyFilter.addEventListener('change', (e) => {
                this.currentPenaltyFilter = e.target.value;
                this.currentPage = 1;
                this.updateLawModal();
            });
        }

        overlay.querySelector('#law-modal-prev').addEventListener('click', () => {
            const filteredData = this.getCurrentFilteredData();
            const totalPages = Math.ceil(filteredData.length / this.pageSize);
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateLawModal();
            }
        });

        overlay.querySelector('#law-modal-next').addEventListener('click', () => {
            const filteredData = this.getCurrentFilteredData();
            const totalPages = Math.ceil(filteredData.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateLawModal();
            }
        });
    }

    getCurrentFilteredData() {
        if (this.currentModalType === 'clue_all' || this.currentModalType === 'clue_pending' || this.currentModalType === 'clue_done') {
            return this.filterClueData();
        } else if (this.currentModalType === 'case_source') {
            return this.filterCaseSourceData();
        } else if (this.currentModalType === 'case_filing') {
            return this.filterFilingData();
        } else if (this.currentModalType === 'case_penalty') {
            return this.filterPenaltyData();
        }
        return [];
    }

    updateLawModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) {
            if (this.currentModalType === 'clue_all' || this.currentModalType === 'clue_pending' || this.currentModalType === 'clue_done') {
                overlay.innerHTML = this.renderClueModal();
            } else if (this.currentModalType === 'case_source') {
                overlay.innerHTML = this.renderCaseSourceModal();
            } else if (this.currentModalType === 'case_filing') {
                overlay.innerHTML = this.renderFilingModal();
            } else if (this.currentModalType === 'case_penalty') {
                overlay.innerHTML = this.renderPenaltyModal();
            }
            this.bindLawModalEvents(overlay);
            this.initLawModalChartsDelayed();
        }
    }

    // ==================== 弹窗图表初始化 ====================
    initLawModalChartsDelayed() {
        const filteredData = this.getCurrentFilteredData();
        this.initLawModalCharts(filteredData);
    }

    initLawModalCharts(filteredData) {
        setTimeout(() => {
            if (typeof echarts === 'undefined') return;
            if (!filteredData || filteredData.length === 0) return;

            if (this.currentModalType === 'clue_all' || this.currentModalType === 'clue_pending' || this.currentModalType === 'clue_done') {
                this.initBarChart('law-modal-bar-1', filteredData, 'region', ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市']);
                this.initPieChart('law-modal-pie-1', filteredData, 'clueType', ['检查发现', '上级交办', '投诉举报', '其他']);
            } else if (this.currentModalType === 'case_source') {
                this.initBarChart('law-modal-bar-1', filteredData, 'region', ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市']);
                this.initPieChart('law-modal-pie-1', filteredData, 'sourceType', ['检查发现', '上级交办', '投诉举报', '其他']);
            } else if (this.currentModalType === 'case_filing') {
                this.initPieChart('law-modal-pie-1', filteredData, 'isFiled', ['立案', '不予立案']);
                this.initNoFileReasonBarChart('law-modal-bar-1', filteredData);
            } else if (this.currentModalType === 'case_penalty') {
                this.initPieChart('law-modal-pie-1', filteredData, 'isPenalized', ['处罚', '不予处罚']);
                this.initNoPenaltyReasonBarChart('law-modal-bar-1', filteredData);
            }
        }, 200);
    }

    // ==================== 基础图表方法 ====================
    initPieChart(domId, data, field, categories) {
        const dom = document.getElementById(domId);
        if (!dom) return;
        if (typeof echarts === 'undefined') return;

        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const chart = echarts.init(dom);
        const counts = {};
        categories.forEach(cat => counts[cat] = 0);
        data.forEach(item => {
            if (counts[item[field]] !== undefined) {
                counts[item[field]]++;
            }
        });

        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                show: true,
                bottom: 0,
                textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: 'rgba(5, 13, 24, 0.98)',
                    borderWidth: 2
                },
                label: { show: false },
                emphasis: { label: { show: true, fontSize: 12 } },
                labelLine: { show: false },
                data: categories.map(cat => ({
                    value: counts[cat],
                    name: cat,
                    itemStyle: {
                        color: this.getColor(categories.indexOf(cat))
                    }
                }))
            }]
        };

        chart.setOption(option);

        const resizeObserver = new ResizeObserver(() => {
            chart.resize();
        });
        resizeObserver.observe(dom);
    }

    initBarChart(domId, data, field, categories) {
        const dom = document.getElementById(domId);
        if (!dom) return;
        if (typeof echarts === 'undefined') return;

        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const chart = echarts.init(dom);
        const counts = {};
        categories.forEach(cat => counts[cat] = 0);
        data.forEach(item => {
            if (counts[item[field]] !== undefined) {
                counts[item[field]]++;
            }
        });

        const option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: categories,
                axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, rotate: 30 },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
            },
            series: [{
                type: 'bar',
                data: categories.map(cat => counts[cat]),
                barWidth: '50%',
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.8)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.3)' }
                    ])
                }
            }]
        };

        chart.setOption(option);

        const resizeObserver = new ResizeObserver(() => {
            chart.resize();
        });
        resizeObserver.observe(dom);
    }

    initNoFileReasonBarChart(domId, data) {
        const dom = document.getElementById(domId);
        if (!dom) return;
        if (typeof echarts === 'undefined') return;

        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const chart = echarts.init(dom);
        const reasons = ['没有违法事实', '已过追诉时效', '没有明确当事人或当事人已死亡', '不属于综合行政执法范畴', '其他不予立案情形'];
        const counts = {};
        reasons.forEach(r => counts[r] = 0);
        data.forEach(item => {
            if (item.noFileReason && counts[item.noFileReason] !== undefined) {
                counts[item.noFileReason]++;
            }
        });

        // 短标签用于显示
        const shortLabels = ['没有违法事实', '已过追诉时效', '无当事人/已死亡', '不属于执法范畴', '其他情形'];

        const option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' },
                formatter: function(params) {
                    const idx = params[0].dataIndex;
                    return reasons[idx] + ': ' + params[0].value;
                }
            },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            yAxis: {
                type: 'category',
                data: shortLabels,
                axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } }
            },
            xAxis: {
                type: 'value',
                axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
            },
            series: [{
                type: 'bar',
                data: reasons.map(r => counts[r]),
                barWidth: '50%',
                itemStyle: {
                    borderRadius: [0, 4, 4, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.8)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.3)' }
                    ])
                }
            }]
        };

        chart.setOption(option);

        const resizeObserver = new ResizeObserver(() => {
            chart.resize();
        });
        resizeObserver.observe(dom);
    }

    initNoPenaltyReasonBarChart(domId, data) {
        const dom = document.getElementById(domId);
        if (!dom) return;
        if (typeof echarts === 'undefined') return;

        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const chart = echarts.init(dom);
        const reasons = [
            '当事人有证据足以证明没有主观过错',
            '违法行为轻微并及时改正，没有造成危害后果',
            '初次违法且危害后果轻微并及时改正'
        ];
        const shortLabels = ['无主观过错', '轻微及时改正', '初次轻微及时改正'];
        const counts = {};
        reasons.forEach(r => counts[r] = 0);
        data.forEach(item => {
            if (item.noPenaltyReason && counts[item.noPenaltyReason] !== undefined) {
                counts[item.noPenaltyReason]++;
            }
        });

        const option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' },
                formatter: function(params) {
                    const idx = params[0].dataIndex;
                    return reasons[idx] + ': ' + params[0].value;
                }
            },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: shortLabels,
                axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, rotate: 20 },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
            },
            series: [{
                type: 'bar',
                data: reasons.map(r => counts[r]),
                barWidth: '50%',
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.8)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.3)' }
                    ])
                }
            }]
        };

        chart.setOption(option);

        const resizeObserver = new ResizeObserver(() => {
            chart.resize();
        });
        resizeObserver.observe(dom);
    }

    getColor(index) {
        const colors = ['#00d4ff', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5856d6'];
        return colors[index % colors.length];
    }

    // ==================== 主页面图表 ====================
    initCharts() {
        setTimeout(() => {
            this.initCaseBarChart();
            this.initCaseLineChart();
            this.initEfficiencyPie1();
            this.initEfficiencyBarChart();
            this.initPenaltyTrendChart();
            this.initLawPushPieChart();
            this.initLawReceivePieChart();
            this.renderDataflowFlowChart();
        }, 300);
    }

    initEfficiencyBarChart() {
        const dom = document.getElementById('efficiency-bar-chart');
        if (!dom) return;
        dom.style.height = '150px';
        const chart = echarts.init(dom);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: (params) => {
                    let s = `<b>${params[0].axisValue}</b><br/>`;
                    params.forEach(p => {
                        s += `${p.marker}${p.seriesName}: ${p.value}%<br/>`;
                    });
                    return s;
                }
            },
            legend: {
                data: ['行政败诉率', '复议被纠正率'],
                top: 0,
                right: 0,
                textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            },
            grid: {
                left: '8%',
                right: '8%',
                bottom: '18%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市'],
                axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, interval: 0, rotate: 30 }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, formatter: '{value}%' },
                splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }
            },
            series: [
                {
                    name: '行政败诉率',
                    type: 'bar',
                    barWidth: '35%',
                    data: [0.8, 1.2, 1.5, 0.5, 0.9, 1.1],
                    itemStyle: {
                        color: '#ff3b30',
                        borderRadius: [4, 4, 0, 0]
                    },
                    label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', fontSize: 10 }
                },
                {
                    name: '复议被纠正率',
                    type: 'bar',
                    barWidth: '35%',
                    data: [1.8, 2.5, 2.8, 1.2, 2.0, 2.3],
                    itemStyle: {
                        color: '#ff9500',
                        borderRadius: [4, 4, 0, 0]
                    },
                    label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', fontSize: 10 }
                }
            ]
        };
        chart.setOption(option);
        this.charts.efficiencyBar = chart;
        dom.addEventListener('click', () => {
            this.openModal('admin_lawsuit_rate');
        });
    }

    initLawPushPieChart() {
        const dom = document.getElementById('law-push-pie');
        if (!dom) return;
        dom.style.height = '80px';
        this.charts.lawPushPie = echarts.init(dom);
        this.charts.lawPushPie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: { show: true, position: 'inside', color: '#fff', fontSize: 8, formatter: '{b}\n{c}%' },
                labelLine: { show: false },
                data: [{ value: 100, name: '处罚结果', itemStyle: { color: '#ff9500' } }]
            }]
        });
        window.addEventListener('resize', () => chart.resize());
    }

    initLawReceivePieChart() {
        const dom = document.getElementById('law-receive-pie');
        if (!dom) return;
        dom.style.height = '80px';
        this.charts.lawReceivePie = echarts.init(dom);
        this.charts.lawReceivePie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: { show: true, position: 'inside', color: '#fff', fontSize: 8, formatter: '{b}\n{c}%' },
                labelLine: { show: false },
                data: [
                    { value: 65, name: '违法线索', itemStyle: { color: '#00d4ff' } },
                    { value: 35, name: '信用数据', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
        window.addEventListener('resize', () => chart.resize());
    }

    initCaseBarChart() {
        const dom = document.getElementById('caseBarChart');
        if (!dom) return;
        const chart = echarts.init(dom);
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
        this.charts.caseBar = chart;
    }

    initCaseLineChart() {
        const dom = document.getElementById('caseLineChart');
        if (!dom) return;
        const chart = echarts.init(dom);
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
        this.charts.caseLine = chart;
    }

    initPenaltyTrendChart() {
        const dom = document.getElementById('penaltyTrendChart');
        if (!dom) return;
        const chart = echarts.init(dom);
        const option = {
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                axisLabel: {
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 10
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.3)' }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 10
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.3)' }
                },
                splitLine: {
                    lineStyle: { color: 'rgba(0,212,255,0.1)' }
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' },
                backgroundColor: 'rgba(5, 13, 24, 0.95)',
                borderColor: 'rgba(0, 212, 255, 0.3)',
                textStyle: { color: '#fff' }
            },
            legend: {
                data: ['归集数', '公示数'],
                bottom: 0,
                textStyle: {
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 10
                }
            },
            series: [
                {
                    name: '归集数',
                    type: 'line',
                    data: [280, 320, 350, 400, 420, 450, 125],
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
                    name: '公示数',
                    type: 'line',
                    data: [260, 300, 330, 370, 390, 420, 118],
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
        this.charts.penaltyTrend = chart;
        window.addEventListener('resize', () => chart.resize());
    }

    initEfficiencyPie1() {
        const dom = document.getElementById('efficiencyPie1');
        if (!dom) return;
        const chart = echarts.init(dom);
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
        this.charts.efficiencyPie = chart;
    }

    // ============================================
    // 首违不罚弹窗
    // ============================================
    
    generateFirstOffenseData() {
        const data = [];
        const violations = ['占道经营', '广告违规', '噪音污染', '其他'];
        const violationWeights = [0.40, 0.25, 0.20, 0.15];
        const parties = [
            '海口龙华区XX餐饮店', '三亚天涯区XX商店', '儋州那大镇XX超市',
            '文昌文城镇XX理发店', '琼海嘉积镇XX建材店', '万宁万城镇XX农资店',
            '海口美兰区XX便利店', '三亚吉阳区XX水果摊', '儋州白马井XX饭馆',
            '海口琼山区XX五金店', '三亚海棠区XX旅租', '东方八所镇XX修理店',
            '陵水椰林镇XX茶店', '乐东抱由镇XX杂货店', '临高临城镇XX建材铺',
            '澄迈金江镇XX早餐店', '定安定城镇XX服饰店', '屯昌屯城镇XX家电铺',
            '琼中营根镇XX文具店', '保亭保城镇XX摩托车行', '五指山通什镇XX照相馆',
            '白沙牙叉镇XX药店', '昌江石碌镇XX家具店', '洋浦经济开发区XX物流点'
        ];
        const basisList = [
            '《行政处罚法》第三十三条',
            '《海南省市场监管领域轻微违法行为免罚清单》第1项',
            '《海南省市场监管领域轻微违法行为免罚清单》第3项',
            '《海南省市场监管领域轻微违法行为免罚清单》第5项',
            '《海南省优化营商环境条例》第五十四条',
            '《海南省市场监管领域轻微违法行为免罚清单》第8项'
        ];
        
        for (let i = 1; i <= 20; i++) {
            const rand = Math.random();
            let violationIdx = 0;
            let cumulative = 0;
            for (let j = 0; j < violationWeights.length; j++) { cumulative += violationWeights[j]; if (rand <= cumulative) { violationIdx = j; break; } }
            
            const monthNum = 2 + Math.floor(Math.random() * 6);
            const day = Math.floor(Math.random() * 28) + 1;
            const dateStr = `2025-${String(monthNum).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            const monthStr = `2025-${String(monthNum).padStart(2,'0')}`;
            
            data.push({
                seq: i,
                party: parties[i % parties.length],
                violation: violations[violationIdx],
                basis: basisList[i % basisList.length],
                date: dateStr,
                month: monthStr
            });
        }
        
        data.sort((a, b) => b.date.localeCompare(a.date));
        data.forEach((item, idx) => item.seq = idx + 1);
        
        return data;
    }

    openFirstOffenseModal() {
        this.foCurrentPage = 1;
        this.firstOffenseData = this.generateFirstOffenseData();
        
        const overlay = document.createElement('div');
        overlay.className = 'first-penalty-modal-overlay';
        overlay.innerHTML = this.renderFirstOffenseModal();
        document.body.appendChild(overlay);
        this._foOverlay = overlay;
        
        overlay.querySelector('.first-penalty-modal-close').addEventListener('click', () => {
            this.closeFirstOffenseModal();
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeFirstOffenseModal();
        });
        
        this.bindFirstOffenseModalEvents();
        this.initFirstOffenseCharts();
    }

    closeFirstOffenseModal() {
        Object.values(this._foCharts).forEach(chart => {
            try { chart.dispose(); } catch(e) {}
        });
        this._foCharts = {};
        
        const overlay = document.querySelector('.first-penalty-modal-overlay');
        if (overlay) overlay.remove();
        this._foOverlay = null;
    }

    renderFirstOffenseStats() {
        const data = this.firstOffenseData;
        const total = data.length;
        const todayNew = Math.min(6, Math.floor(total * 0.05));
        const totalAmount = (total * 2.67).toFixed(1);
        const coverageItems = 24;
        
        return `
            <div class="first-penalty-modal-stats">
                <div class="fp-stat-card">
                    <span class="fp-stat-label">免罚案件总数</span>
                    <span class="fp-stat-value">${total}件</span>
                </div>
                <div class="fp-stat-card">
                    <span class="fp-stat-label">今日新增</span>
                    <span class="fp-stat-value">${todayNew}件</span>
                </div>
                <div class="fp-stat-card">
                    <span class="fp-stat-label">累计免罚金额</span>
                    <span class="fp-stat-value">${totalAmount}万元</span>
                </div>
                <div class="fp-stat-card">
                    <span class="fp-stat-label">适用免罚清单覆盖项数</span>
                    <span class="fp-stat-value">${coverageItems}项</span>
                </div>
            </div>
        `;
    }

    renderFirstOffenseChartsHTML() {
        return `
            <div class="first-penalty-modal-charts">
                <div class="fp-chart-left">
                    <div class="fp-chart-item">
                        <span class="fp-chart-title">免罚案件违法行为类型分布</span>
                        <div id="fo-pie-chart" class="fp-chart-container"></div>
                    </div>
                </div>
                <div class="fp-chart-right">
                    <div class="fp-chart-item">
                        <span class="fp-chart-title">近6个月免罚案件趋势</span>
                        <div id="fo-bar-chart" class="fp-chart-container"></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFirstOffenseModal() {
        const data = this.firstOffenseData;
        const totalPages = Math.ceil(data.length / this.foPageSize);
        const start = (this.foCurrentPage - 1) * this.foPageSize;
        const end = start + this.foPageSize;
        const pageData = data.slice(start, end);
        
        return `
            <div class="first-penalty-modal">
                <div class="first-penalty-modal-header">
                    <span class="first-penalty-modal-title">首次违法免罚全景分析</span>
                    <button class="first-penalty-modal-close">×</button>
                </div>
                ${this.renderFirstOffenseStats()}
                ${this.renderFirstOffenseChartsHTML()}
                <div class="first-penalty-modal-table-wrap">
                    <table class="fp-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>当事人</th>
                                <th>违法行为</th>
                                <th>适用依据</th>
                                <th>决定日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.seq}</td>
                                    <td>${item.party}</td>
                                    <td>${item.violation}</td>
                                    <td>${item.basis}</td>
                                    <td>${item.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="first-penalty-modal-footer">
                    <button class="fp-pagination-btn" id="fo-modal-prev" ${this.foCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="fp-pagination-info">第 ${this.foCurrentPage} / ${totalPages} 页</span>
                    <button class="fp-pagination-btn" id="fo-modal-next" ${this.foCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initFirstOffenseCharts() {
        if (typeof echarts === 'undefined') return;
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    this.initFoPieChart();
                    this.initFoBarChart();
                }, 150);
            });
        });
    }

    initFoPieChart() {
        const overlay = this._foOverlay;
        if (!overlay) return;
        
        const dom = overlay.querySelector('#fo-pie-chart');
        if (!dom) return;
        
        dom.style.width = '100%';
        dom.style.height = '230px';
        dom.style.minHeight = '230px';
        
        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
            setTimeout(() => this.initFoPieChart(), 200);
            return;
        }
        
        const existing = echarts.getInstanceByDom(dom);
        if (existing) existing.dispose();
        
        const chart = echarts.init(dom);
        this._foCharts.pie = chart;
        
        const data = this.firstOffenseData;
        const counts = { '占道经营': 0, '广告违规': 0, '噪音污染': 0, '其他': 0 };
        data.forEach(item => {
            if (counts[item.violation] !== undefined) counts[item.violation]++;
        });
        
        const colors = ['#00d4ff', '#ff9500', '#34c759', '#af52de'];
        const categories = ['占道经营', '广告违规', '噪音污染', '其他'];
        
        const pieData = categories
            .filter(cat => counts[cat] > 0)
            .map((cat, idx) => ({
                value: counts[cat],
                name: cat,
                itemStyle: { color: colors[idx] }
            }));
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}件 ({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: '5%',
                top: 'center',
                textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 }
            },
            series: [{
                type: 'pie',
                radius: ['45%', '75%'],
                center: ['35%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 6,
                    borderColor: 'rgba(5, 13, 24, 0.98)',
                    borderWidth: 3
                },
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}\n{d}%',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11
                },
                emphasis: {
                    label: { show: true, fontSize: 14, fontWeight: 'bold' },
                    scaleSize: 10
                },
                labelLine: {
                    lineStyle: { color: 'rgba(255,255,255,0.3)' }
                },
                data: pieData
            }]
        };
        
        chart.setOption(option);
        
        const ro = new ResizeObserver(() => chart.resize());
        ro.observe(dom);
    }

    initFoBarChart() {
        const overlay = this._foOverlay;
        if (!overlay) return;
        
        const dom = overlay.querySelector('#fo-bar-chart');
        if (!dom) return;
        
        dom.style.width = '100%';
        dom.style.height = '230px';
        dom.style.minHeight = '230px';
        
        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
            setTimeout(() => this.initFoBarChart(), 200);
            return;
        }
        
        const existing = echarts.getInstanceByDom(dom);
        if (existing) existing.dispose();
        
        const chart = echarts.init(dom);
        this._foCharts.bar = chart;
        
        const data = this.firstOffenseData;
        const months = ['2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07'];
        const monthLabels = ['2月', '3月', '4月', '5月', '6月', '7月'];
        const counts = {};
        months.forEach(m => counts[m] = 0);
        data.forEach(item => {
            if (counts[item.month] !== undefined) counts[item.month]++;
        });
        
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: '{b}<br/>免罚案件: {c}件'
            },
            grid: { left: '8%', right: '5%', bottom: '8%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: monthLabels,
                axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                axisTick: { show: false }
            },
            yAxis: {
                type: 'value',
                name: '件',
                nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } }
            },
            series: [{
                type: 'bar',
                data: months.map(m => counts[m]),
                barWidth: '55%',
                itemStyle: {
                    borderRadius: [6, 6, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.2)' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#00e5ff' },
                            { offset: 1, color: 'rgba(0, 229, 255, 0.4)' }
                        ])
                    }
                }
            }]
        };
        
        chart.setOption(option);
        
        const ro = new ResizeObserver(() => chart.resize());
        ro.observe(dom);
    }

    bindFirstOffenseModalEvents() {
        const overlay = this._foOverlay;
        if (!overlay) return;
        
        overlay.querySelector('#fo-modal-prev')?.addEventListener('click', () => {
            if (this.foCurrentPage > 1) {
                this.foCurrentPage--;
                this.updateFirstOffenseModal();
            }
        });
        
        overlay.querySelector('#fo-modal-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.firstOffenseData.length / this.foPageSize);
            if (this.foCurrentPage < totalPages) {
                this.foCurrentPage++;
                this.updateFirstOffenseModal();
            }
        });
    }

    updateFirstOffenseModal() {
        const overlay = this._foOverlay;
        if (!overlay) return;
        
        Object.values(this._foCharts).forEach(chart => {
            try { chart.dispose(); } catch(e) {}
        });
        this._foCharts = {};
        
        overlay.innerHTML = this.renderFirstOffenseModal();
        this.bindFirstOffenseModalEvents();
        this.initFirstOffenseCharts();
    }

    // ============================================
    // 轻微免罚弹窗
    // ============================================

    generateMinorPenaltyData() {
        const data = [];
        const violations = ['占道经营', '广告违规', '噪音污染', '环境卫生', '店招违规'];
        const industries = ['餐饮行业', '零售行业', '交通运输', '建筑工程', '医疗卫生', '教育培训', '文化娱乐'];
        const hazardLevels = ['轻微', '一般', '较轻', '轻微', '轻微'];
        const handlers = ['张伟', '李娜', '王强', '陈静', '刘洋', '赵敏', '周杰', '吴芳'];
        
        for (let i = 1; i <= 89; i++) {
            const isCompleted = Math.random() < 0.62;
            const month = Math.floor(Math.random() * 6) + 2;
            const day = Math.floor(Math.random() * 28) + 1;
            data.push({
                seq: i,
                party: '当事人' + i,
                violation: violations[i % violations.length],
                hazard: hazardLevels[i % hazardLevels.length],
                status: isCompleted ? '已完成' : '整改中',
                handler: handlers[i % handlers.length],
                industry: industries[i % industries.length],
                date: `2025-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
            });
        }
        data.sort((a, b) => b.date.localeCompare(a.date));
        data.forEach((item, idx) => item.seq = idx + 1);
        return data;
    }

    openMinorPenaltyModal() {
        this.mpCurrentPage = 1;
        this.minorPenaltyData = this.generateMinorPenaltyData();
        const overlay = document.createElement('div');
        overlay.className = 'minor-penalty-modal-overlay';
        overlay.innerHTML = this.renderMinorPenaltyModal();
        document.body.appendChild(overlay);
        this._mpOverlay = overlay;
        overlay.querySelector('.mp-modal-close').addEventListener('click', () => this.closeMinorPenaltyModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeMinorPenaltyModal(); });
        this.bindMinorPenaltyEvents();
        this.initMinorPenaltyCharts();
    }

    closeMinorPenaltyModal() {
        Object.values(this._mpCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._mpCharts = {};
        const overlay = document.querySelector('.minor-penalty-modal-overlay');
        if (overlay) overlay.remove();
        this._mpOverlay = null;
    }

    renderMinorPenaltyStats() {
        const total = 80;
        const completed = 60;
        const pending = 20;
        const amount = 156.2;
        return `
            <div class="mp-stats">
                <div class="mp-stat-card"><span class="mp-stat-label">免罚总数</span><span class="mp-stat-value">${total}件</span></div>
                <div class="mp-stat-card"><span class="mp-stat-label">已整改完成</span><span class="mp-stat-value" style="color:#34c759">${completed}件</span></div>
                <div class="mp-stat-card"><span class="mp-stat-label">正在整改中</span><span class="mp-stat-value" style="color:#ff9500">${pending}件</span></div>
                <div class="mp-stat-card"><span class="mp-stat-label">累计减轻处罚金额</span><span class="mp-stat-value">${amount}万元</span></div>
            </div>`;
    }

    renderMinorPenaltyChartsHTML() {
        return `
            <div class="mp-charts">
                <div class="mp-chart-left">
                    <div class="mp-chart-item">
                        <span class="mp-chart-title">整改完成率</span>
                        <div id="mp-donut-chart" class="mp-chart-container"></div>
                    </div>
                </div>
                <div class="mp-chart-right">
                    <div class="mp-chart-item">
                        <span class="mp-chart-title">免罚案件行业分布TOP5</span>
                        <div id="mp-bar-chart" class="mp-chart-container"></div>
                    </div>
                </div>
            </div>`;
    }

    renderMinorPenaltyModal() {
        const data = this.minorPenaltyData;
        const totalPages = Math.ceil(data.length / this.mpPageSize);
        const start = (this.mpCurrentPage - 1) * this.mpPageSize;
        const pageData = data.slice(start, start + this.mpPageSize);
        return `
            <div class="mp-modal">
                <div class="mp-modal-header">
                    <span class="mp-modal-title">轻微违法免罚与整改追踪</span>
                    <button class="mp-modal-close">×</button>
                </div>
                ${this.renderMinorPenaltyStats()}
                ${this.renderMinorPenaltyChartsHTML()}
                <div class="mp-table-wrap">
                    <table class="mp-table">
                        <thead><tr><th>序号</th><th>当事人</th><th>违法行为</th><th>危害后果认定</th><th>整改状态</th><th>承办人</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.seq}</td><td>${item.party}</td><td>${item.violation}</td><td>${item.hazard}</td>
                                    <td><span class="mp-tag ${item.status === '已完成' ? 'mp-tag-done' : 'mp-tag-pending'}">${item.status}</span></td>
                                    <td>${item.handler}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="mp-footer">
                    <button class="mp-page-btn" id="mp-prev" ${this.mpCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="mp-page-info">第 ${this.mpCurrentPage} / ${totalPages} 页</span>
                    <button class="mp-page-btn" id="mp-next" ${this.mpCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    initMinorPenaltyCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initMpDonutChart();
            this.initMpBarChart();
        }, 150)));
    }

    initMpDonutChart() {
        const overlay = this._mpOverlay; if (!overlay) return;
        const dom = overlay.querySelector('#mp-donut-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initMpDonutChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._mpCharts.donut = chart;
        chart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}件 ({d}%)' },
            legend: { bottom: '5%', textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 } },
            series: [{
                type: 'pie', radius: ['60%', '78%'], center: ['50%', '45%'],
                avoidLabelOverlap: false,
                itemStyle: { borderRadius: 6, borderColor: 'rgba(5,13,24,0.98)', borderWidth: 3 },
                label: { show: false },
                emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' }, scaleSize: 8 },
                data: [
                    { value: 60, name: '已整改', itemStyle: { color: '#34c759' } },
                    { value: 20, name: '整改中', itemStyle: { color: '#ff9500' } }
                ]
            }],
            graphic: [{
                type: 'text', left: 'center', top: '38%',
                style: { text: '75%', textAlign: 'center', fill: '#34c759', fontSize: 20, fontWeight: 'bold' }
            }, {
                type: 'text', left: 'center', top: '52%',
                style: { text: '整改完成率', textAlign: 'center', fill: 'rgba(255,255,255,0.5)', fontSize: 12 }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initMpBarChart() {
        const overlay = this._mpOverlay; if (!overlay) return;
        const dom = overlay.querySelector('#mp-bar-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initMpBarChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._mpCharts.bar = chart;
        const industries = ['餐饮行业', '零售行业', '交通运输', '建筑工程', '医疗卫生'];
        const values = [28, 22, 17, 12, 10];
        chart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}件' },
            grid: { left: '3%', right: '8%', bottom: '5%', top: '5%', containLabel: true },
            xAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            yAxis: { type: 'category', data: industries.reverse(), axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 }, axisLine: { show: false }, axisTick: { show: false } },
            series: [{
                type: 'bar', data: values.reverse().map((v, i) => ({
                    value: v,
                    itemStyle: { color: ['#34c759', '#00d4ff', '#ff9500', '#af52de', '#ff6b6b'][i], borderRadius: [0, 6, 6, 0] }
                })), barWidth: '55%'
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    bindMinorPenaltyEvents() {
        const overlay = this._mpOverlay; if (!overlay) return;
        overlay.querySelector('#mp-prev')?.addEventListener('click', () => {
            if (this.mpCurrentPage > 1) { this.mpCurrentPage--; this.updateMinorPenaltyModal(); }
        });
        overlay.querySelector('#mp-next')?.addEventListener('click', () => {
            if (this.mpCurrentPage < Math.ceil(this.minorPenaltyData.length / this.mpPageSize)) { this.mpCurrentPage++; this.updateMinorPenaltyModal(); }
        });
    }

    updateMinorPenaltyModal() {
        const overlay = this._mpOverlay; if (!overlay) return;
        Object.values(this._mpCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._mpCharts = {};
        overlay.innerHTML = this.renderMinorPenaltyModal();
        this.bindMinorPenaltyEvents();
        this.initMinorPenaltyCharts();
    }

    // ============================================
    // 案件办结率弹窗
    // ============================================

    genCaseRateData(){const d=[];const names=['XX公司虚假宣传案','YY餐饮店食品案','ZZ超市价格违法案','AA药房售假案','BB建材环保案','CC运输超载案','DD广告违规案','EE消防隐患案','FF医疗器械案','GG网络安全案','HH知识产权案','II产品质量案','JJ环境违法案','KK安全生产案','LL劳动保障案','MM价格垄断案'];for(let i=1;i<=40;i++){const m=Math.floor(Math.random()*6)+1;const d2=Math.floor(Math.random()*28)+1;const status=i%3===0?'已超期':i%3===1?'即将到期':'正常';d.push({code:`CASE-2025-${String(i).padStart(3,'0')}`,name:names[i%16],submitDate:`2025-${String(m).padStart(2,'0')}-${String(d2).padStart(2,'0')}`,deadline:`2025-${String((m+3)%12+1).padStart(2,'0')}-${String(d2).padStart(2,'0')}`,status});}return d;}
    openCaseRateModal() {
        this.crCurrentPage = 1;
        this.caseRateData = this.genCaseRateData();
        const overlay = document.createElement('div');
        overlay.className = 'case-rate-modal-overlay';
        overlay.innerHTML = this.renderCaseRateModal();
        document.body.appendChild(overlay);
        this._crOverlay = overlay;
        overlay.querySelector('.cr-modal-close').addEventListener('click', () => this.closeCaseRateModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeCaseRateModal(); });
        this.bindCaseRateEvents();
        this.initCaseRateCharts();
    }
    bindCaseRateEvents(){const ovl=this._crOverlay;if(!ovl)return;ovl.querySelector('#cr-prev')?.addEventListener('click',()=>{if(this.crCurrentPage>1){this.crCurrentPage--;this.updateCaseRateModal();}});ovl.querySelector('#cr-next')?.addEventListener('click',()=>{if(this.crCurrentPage<Math.ceil(this.caseRateData.length/this.crPageSize)){this.crCurrentPage++;this.updateCaseRateModal();}});}
    updateCaseRateModal(){const ovl=this._crOverlay;if(!ovl)return;Object.values(this._crCharts).forEach(c=>{try{c.dispose();}catch(e){}});this._crCharts={};ovl.innerHTML=this.renderCaseRateModal();this.bindCaseRateEvents();this.initCaseRateCharts();}

    closeCaseRateModal() {
        Object.values(this._crCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._crCharts = {};
        const overlay = document.querySelector('.case-rate-modal-overlay');
        if (overlay) overlay.remove();
        this._crOverlay = null;
    }

    renderCaseRateModal() {
        const data = this.caseRateData;
        const tp = Math.ceil(data.length / this.crPageSize);
        const pd = data.slice((this.crCurrentPage - 1) * this.crPageSize, this.crCurrentPage * this.crPageSize);
        return `
            <div class="cr-modal">
                <div class="cr-modal-header">
                    <span class="cr-modal-title">案件办理质效深度诊断</span>
                    <button class="cr-modal-close">×</button>
                </div>
                <div class="cr-top">
                    <div class="cr-gauge-wrap"><div id="cr-gauge-chart" class="cr-chart-box"></div></div>
                    <div class="cr-cards">
                        <div class="cr-card"><span class="cr-card-label">待办案件</span><span class="cr-card-value" style="color:#ff6b6b">12件</span></div>
                        <div class="cr-card"><span class="cr-card-label">办理中</span><span class="cr-card-value" style="color:#ff9500">48件</span></div>
                        <div class="cr-card"><span class="cr-card-label">已办结</span><span class="cr-card-value" style="color:#34c759">145件</span></div>
                        <div class="cr-up-trend">环比上周提升 2.3%</div>
                    </div>
                </div>
                <div class="cr-line-wrap">
                    <span class="cr-chart-title">近7日案件办结趋势</span>
                    <div id="cr-line-chart" class="cr-chart-box"></div>
                </div>
                <div class="cr-warning-wrap">
                    <span class="cr-section-title">临期/超期案件红黄牌预警</span>
                    <table class="cr-table">
                        <thead><tr><th>案件编号</th><th>案件名称</th><th>交办时间</th><th>限办期限</th><th>超期状态</th></tr></thead>
                        <tbody>
                            ${pd.map(r => `<tr><td>${r.code}</td><td>${r.name}</td><td>${r.submitDate}</td><td>${r.deadline}</td><td><span class="cr-tag cr-tag-${r.status==='已超期'?'red':r.status==='即将到期'?'yellow':'green'}">${r.status}</span></td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="cr-footer">
                    <button class="cr-page-btn" id="cr-prev" ${this.crCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="cr-page-info">第 ${this.crCurrentPage} / ${tp} 页</span>
                    <button class="cr-page-btn" id="cr-next" ${this.crCurrentPage >= tp ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    initCaseRateCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initCrGaugeChart();
            this.initCrLineChart();
        }, 150)));
    }

    initCrGaugeChart() {
        const dom = this._crOverlay?.querySelector('#cr-gauge-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '110px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initCrGaugeChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._crCharts.gauge = chart;
        chart.setOption({
            series: [{
                type: 'gauge', startAngle: 210, endAngle: -30, center: ['50%', '55%'], radius: '75%',
                min: 0, max: 100, splitNumber: 10,
                axisLine: { lineStyle: { width: 8, color: [[0.92, '#34c759'], [0.80, '#ff9500'], [1, '#ff6b6b']] } },
                pointer: { length: '60%', width: 3, itemStyle: { color: '#00d4ff' } },
                axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
                detail: { valueAnimation: true, formatter: '{value}%', fontSize: 16, fontWeight: 'bold', color: '#34c759', offsetCenter: [0, '65%'] },
                data: [{ value: 70.7 }]
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initCrLineChart() {
        const dom = this._crOverlay?.querySelector('#cr-line-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '200px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initCrLineChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._crCharts.line = chart;
        const dates = ['6月23日', '6月24日', '6月25日', '6月26日', '6月27日', '6月28日', '6月29日'];
        const vals = [18, 22, 19, 21, 23, 20, 22];
        const rates = [68.5, 69.3, 68.8, 70.2, 71.5, 70.0, 70.7];
        chart.setOption({
            tooltip: { trigger: 'axis', formatter: p => `${p[0].axisValue}<br/>办结数量: ${p[0].value}件<br/>办结率: ${rates[p[0].dataIndex]}%` },
            grid: { left: '5%', right: '5%', bottom: '8%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: dates, axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } } },
            yAxis: { type: 'value', name: '件', nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [{
                type: 'line', data: vals, smooth: true, symbol: 'circle', symbolSize: 8,
                lineStyle: { color: '#00d4ff', width: 2 },
                itemStyle: { color: '#00d4ff', borderColor: '#00d4ff', borderWidth: 3 },
                areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,212,255,0.3)'},{offset:1,color:'rgba(0,212,255,0.02)'}]) },
                markLine: { silent: true, symbol: 'none', lineStyle: { color: 'rgba(255,255,255,0.3)', type: 'dashed' }, data: [{ yAxis: 95, name: '日均办结' }] }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    // ============================================
    // 行刑衔接弹窗
    // ============================================

    generateCriminalLinkData() {
        const data = [];
        const caseNames = [
            'XX公司涉嫌非法经营案', 'YY食品厂制售假劣案', 'ZZ建筑公司安全事故案',
            'AA药房销售假药案', 'BB物流运输违禁品案', 'CC广告公司虚假宣传案',
            'DD餐饮店使用非法添加剂案', 'EE贸易公司走私案', 'FF检测机构出具虚假报告案',
            'GG物业公司偷税漏税案'
        ];
        const sendUnits = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局'];
        const recvUnits = ['海口市公安局XX分局', '三亚市公安局YY分局', '儋州市公安局ZZ分局', '文昌市公安局', '琼海市公安局'];
        const statuses = ['已立案', '未立案', '侦办中'];
        const statusWeights = [0.89, 0.06, 0.05];
        for (let i = 1; i <= 18; i++) {
            const month = Math.floor(Math.random() * 6) + 2;
            const day = Math.floor(Math.random() * 28) + 1;
            const rand = Math.random();
            let si = 0, cum = 0;
            for (let j = 0; j < statusWeights.length; j++) { cum += statusWeights[j]; if (rand <= cum) { si = j; break; } }
            data.push({
                seq: i,
                docNo: 'YX' + String(i).padStart(4, '0'),
                caseName: caseNames[i % caseNames.length],
                sendUnit: sendUnits[i % sendUnits.length],
                recvUnit: recvUnits[i % recvUnits.length],
                status: statuses[si],
                date: `2025-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
            });
        }
        data.sort((a, b) => b.date.localeCompare(a.date));
        data.forEach((item, idx) => item.seq = idx + 1);
        return data;
    }

    openCriminalLinkModal() {
        this.clCurrentPage = 1;
        this.clSearchTerm = '';
        this.criminalLinkData = this.generateCriminalLinkData();
        const overlay = document.createElement('div');
        overlay.className = 'criminal-link-modal-overlay';
        overlay.innerHTML = this.renderCriminalLinkModal();
        document.body.appendChild(overlay);
        this._clOverlay = overlay;
        overlay.querySelector('.cl-modal-close').addEventListener('click', () => this.closeCriminalLinkModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeCriminalLinkModal(); });
        this.bindCriminalLinkEvents();
        this.initCriminalLinkCharts();
    }

    closeCriminalLinkModal() {
        Object.values(this._clCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._clCharts = {};
        const overlay = document.querySelector('.criminal-link-modal-overlay');
        if (overlay) overlay.remove();
        this._clOverlay = null;
    }

    getFilteredCLData() {
        if (!this.clSearchTerm) return this.criminalLinkData;
        const term = this.clSearchTerm.toLowerCase();
        return this.criminalLinkData.filter(item =>
            item.docNo.toLowerCase().includes(term) ||
            item.caseName.toLowerCase().includes(term) ||
            item.sendUnit.toLowerCase().includes(term) ||
            item.recvUnit.toLowerCase().includes(term)
        );
    }

    renderCriminalLinkStats() {
        return `
            <div class="cl-stats">
                <div class="cl-stat-card"><span class="cl-stat-label">移送公安机关总数</span><span class="cl-stat-value">18件</span></div>
                <div class="cl-stat-card"><span class="cl-stat-label">公安机关已立案</span><span class="cl-stat-value" style="color:#34c759">16件</span></div>
                <div class="cl-stat-card"><span class="cl-stat-label">立案率</span><span class="cl-stat-value" style="color:#00d4ff">89%</span></div>
                <div class="cl-stat-card"><span class="cl-stat-label">退回补充侦查</span><span class="cl-stat-value" style="color:#ff9500">2件</span></div>
            </div>`;
    }

    renderCriminalLinkChartsHTML() {
        return `
            <div class="cl-charts">
                <div class="cl-chart-left">
                    <div class="cl-chart-item">
                        <span class="cl-chart-title">移送全流程转化漏斗</span>
                        <div id="cl-funnel-chart" class="cl-chart-container"></div>
                    </div>
                </div>
                <div class="cl-chart-right">
                    <div class="cl-chart-item">
                        <span class="cl-chart-title">各公安分局立案率对比</span>
                        <div id="cl-compare-chart" class="cl-chart-container"></div>
                    </div>
                </div>
            </div>`;
    }

    renderCriminalLinkModal() {
        const allData = this.getFilteredCLData();
        const totalPages = Math.ceil(allData.length / this.clPageSize);
        const start = (this.clCurrentPage - 1) * this.clPageSize;
        const pageData = allData.slice(start, start + this.clPageSize);
        return `
            <div class="cl-modal">
                <div class="cl-modal-header">
                    <span class="cl-modal-title">行刑衔接移送与立案监督看板</span>
                    <button class="cl-modal-close">×</button>
                </div>
                ${this.renderCriminalLinkStats()}
                ${this.renderCriminalLinkChartsHTML()}
                <div class="cl-search-wrap">
                    <input type="text" class="cl-search-input" id="cl-search" placeholder="搜索移送文号、案件名称、移送单位..." value="${this.clSearchTerm}">
                </div>
                <div class="cl-table-wrap">
                    <table class="cl-table">
                        <thead><tr><th>移送文号</th><th>案件名称</th><th>移送单位</th><th>接收公安单位</th><th>立案状态</th><th>反馈日期</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.docNo}</td><td>${item.caseName}</td><td>${item.sendUnit}</td><td>${item.recvUnit}</td>
                                    <td><span class="cl-tag ${item.status === '已立案' ? 'cl-tag-ok' : item.status === '未立案' ? 'cl-tag-no' : 'cl-tag-ing'}">${item.status}</span></td>
                                    <td>${item.date}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="cl-footer">
                    <button class="cl-page-btn" id="cl-prev" ${this.clCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="cl-page-info">第 ${this.clCurrentPage} / ${totalPages} 页</span>
                    <button class="cl-page-btn" id="cl-next" ${this.clCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    initCriminalLinkCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initClFunnelChart();
            this.initClCompareChart();
        }, 150)));
    }

    initClFunnelChart() {
        const overlay = this._clOverlay; if (!overlay) return;
        const dom = overlay.querySelector('#cl-funnel-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initClFunnelChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._clCharts.funnel = chart;
        chart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}件' },
            series: [{
                type: 'funnel', left: '15%', right: '15%', top: '10%', bottom: '10%',
                width: '70%', minSize: '30%', maxSize: '100%', gap: 4,
                label: { show: true, position: 'inside', fontSize: 12, color: '#fff', formatter: '{b}\\n{c}件' },
                labelLine: { show: false },
                itemStyle: { borderColor: 'rgba(5,13,24,0.98)', borderWidth: 2 },
                data: [
                    { value: 18, name: '行政移送', itemStyle: { color: '#00d4ff' } },
                    { value: 17, name: '公安受理', itemStyle: { color: '#34c759' } },
                    { value: 16, name: '刑事立案', itemStyle: { color: '#af52de' } },
                    { value: 14, name: '移送起诉', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initClCompareChart() {
        const overlay = this._clOverlay; if (!overlay) return;
        const dom = overlay.querySelector('#cl-compare-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initClCompareChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._clCharts.compare = chart;
        const districts = ['海口XX分局', '三亚YY分局', '儋州ZZ分局', '文昌市公安局', '琼海市公安局'];
        const rates = [90, 85, 76, 72, 65];
        chart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}%' },
            grid: { left: '5%', right: '8%', bottom: '5%', top: '8%', containLabel: true },
            xAxis: { type: 'category', data: districts, axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, rotate: 20 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }, axisTick: { show: false } },
            yAxis: { type: 'value', name: '%', max: 100, nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [{
                type: 'bar', data: rates, barWidth: '50%',
                itemStyle: { borderRadius: [6,6,0,0], color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00d4ff'},{offset:1,color:'rgba(0,212,255,0.2)'}]) },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 11, formatter: '{c}%' }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    bindCriminalLinkEvents() {
        const overlay = this._clOverlay; if (!overlay) return;
        overlay.querySelector('#cl-prev')?.addEventListener('click', () => {
            if (this.clCurrentPage > 1) { this.clCurrentPage--; this.updateCriminalLinkModal(); }
        });
        overlay.querySelector('#cl-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.getFilteredCLData().length / this.clPageSize);
            if (this.clCurrentPage < totalPages) { this.clCurrentPage++; this.updateCriminalLinkModal(); }
        });
        overlay.querySelector('#cl-search')?.addEventListener('input', (e) => {
            this.clSearchTerm = e.target.value;
            this.clCurrentPage = 1;
            this.updateCriminalLinkModal();
        });
    }

    updateCriminalLinkModal() {
        const overlay = this._clOverlay; if (!overlay) return;
        Object.values(this._clCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._clCharts = {};
        overlay.innerHTML = this.renderCriminalLinkModal();
        this.bindCriminalLinkEvents();
        this.initCriminalLinkCharts();
    }

    // ============================================
    // 评查计划弹窗 - 评查计划全景概览
    // ============================================
    generateReviewPlanData() {
        const data = [];
        const types = ['日常评查', '专项评查', '重点评查'];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局',
            '卫健委', '文旅局', '农业农村局', '应急管理局', '自然资源局'];
        for (let i = 1; i <= 50; i++) {
            const sm = Math.floor(Math.random() * 6) + 1;
            const em = sm + Math.floor(Math.random() * 6) + 1;
            const sday = Math.floor(Math.random() * 28) + 1;
            const eday = Math.floor(Math.random() * 28) + 1;
            const statuses = ['已下发', '已下发', '已下发', '待下发', '已逾期'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            data.push({
                seq: i, name: `2025年度${['第一季度','第二季度','第三季度','第四季度'][i%4]}${types[i%3]}计划${Math.floor(i/4)+1}`,
                type: types[i % 3], dept: depts[i % depts.length],
                startDate: `2025-${String(sm).padStart(2,'0')}-${String(sday).padStart(2,'0')}`,
                endDate: `2025-${String(Math.min(em,12)).padStart(2,'0')}-${String(eday).padStart(2,'0')}`,
                status: status
            });
        }
        return data;
    }

    openReviewPlanModal() {
        this.rpCurrentPage = 1;
        this.reviewPlanData = this.generateReviewPlanData();
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay rp-theme';
        overlay.innerHTML = this.renderReviewPlanModal();
        document.body.appendChild(overlay);
        this._rpOverlay = overlay;
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this.closeReviewPlanModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeReviewPlanModal(); });
        this.bindReviewPlanEvents();
        this.initReviewPlanCharts();
    }

    closeReviewPlanModal() {
        Object.values(this._rpCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._rpCharts = {};
        const overlay = document.querySelector('.rv-modal-overlay.rp-theme');
        if (overlay) overlay.remove();
        this._rpOverlay = null;
    }

    renderReviewPlanModal() {
        const data = this.reviewPlanData;
        const totalPages = Math.ceil(data.length / this.rpPageSize);
        const start = (this.rpCurrentPage - 1) * this.rpPageSize;
        const pageData = data.slice(start, start + this.rpPageSize);
        return `
            <div class="rv-modal">
                <div class="rv-modal-header rp-header">
                    <span class="rv-modal-title">评查计划全景概览</span>
                    <button class="rv-modal-close">×</button>
                </div>
                <div class="rv-stats">
                    <div class="rv-stat-card"><span class="rv-stat-label">评查计划总数</span><span class="rv-stat-value">99个</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">已下发计划数</span><span class="rv-stat-value" style="color:#34c759">98个</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">计划下发率</span><span class="rv-stat-value" style="color:#00d4ff">99%</span></div>
                </div>
                <div class="rv-charts">
                    <div class="rv-chart-left" style="flex:6">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">近6个月计划下发趋势</span>
                            <div id="rp-line-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                    <div class="rv-chart-right" style="flex:4">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">计划类型分布</span>
                            <div id="rp-pie-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                </div>
                <div class="rv-table-wrap">
                    <table class="rv-table">
                        <thead><tr><th>计划名称</th><th>计划类型</th><th>下发部门/单位</th><th>计划起止时间</th><th>下发状态</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.name}</td><td>${item.type}</td><td>${item.dept}</td>
                                    <td>${item.startDate} ~ ${item.endDate}</td>
                                    <td>${this.renderRvTag(item.status, {'已下发':'green','待下发':'orange','已逾期':'red'})}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="rv-footer">
                    <button class="rv-page-btn" id="rp-prev" ${this.rpCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="rv-page-info">第 ${this.rpCurrentPage} / ${totalPages} 页</span>
                    <button class="rv-page-btn" id="rp-next" ${this.rpCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    renderRvTag(status, colorMap) {
        const color = colorMap[status] || 'default';
        return `<span class="rv-tag rv-tag-${color}">${status}</span>`;
    }

    bindReviewPlanEvents() {
        const overlay = this._rpOverlay; if (!overlay) return;
        overlay.querySelector('#rp-prev')?.addEventListener('click', () => {
            if (this.rpCurrentPage > 1) { this.rpCurrentPage--; this.updateReviewPlanModal(); }
        });
        overlay.querySelector('#rp-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.reviewPlanData.length / this.rpPageSize);
            if (this.rpCurrentPage < totalPages) { this.rpCurrentPage++; this.updateReviewPlanModal(); }
        });
    }

    updateReviewPlanModal() {
        const overlay = this._rpOverlay; if (!overlay) return;
        Object.values(this._rpCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._rpCharts = {};
        overlay.innerHTML = this.renderReviewPlanModal();
        this.bindReviewPlanEvents();
        this.initReviewPlanCharts();
    }

    initReviewPlanCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initRpLineChart();
            this.initRpPieChart();
        }, 150)));
    }

    initRpLineChart() {
        const dom = this._rpOverlay?.querySelector('#rp-line-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initRpLineChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._rpCharts.line = chart;
        chart.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['生成计划数', '已下发计划数'], textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 }, bottom: 0 },
            grid: { left: '5%', right: '5%', bottom: '15%', top: '8%', containLabel: true },
            xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'], axisLabel: { color: 'rgba(255,255,255,0.6)' }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } } },
            yAxis: { type: 'value', name: '个', nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [
                { name: '生成计划数', type: 'line', data: [14, 18, 15, 20, 17, 15], smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#00d4ff', width: 2 }, itemStyle: { color: '#00d4ff' } },
                { name: '已下发计划数', type: 'line', data: [13, 17, 14, 19, 16, 15], smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#34c759', width: 2 }, itemStyle: { color: '#34c759' } }
            ]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initRpPieChart() {
        const dom = this._rpOverlay?.querySelector('#rp-pie-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initRpPieChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._rpCharts.pie = chart;
        chart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 } },
            series: [{
                type: 'pie', radius: ['55%', '75%'], center: ['50%', '45%'],
                itemStyle: { borderRadius: 6, borderColor: 'rgba(5,13,24,0.98)', borderWidth: 3 },
                label: { formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                data: [
                    { value: 60, name: '日常评查', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '专项评查', itemStyle: { color: '#34c759' } },
                    { value: 15, name: '重点评查', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    // ============================================
    // 评查任务弹窗 - 评查任务执行监控
    // ============================================
    generateReviewTaskData() {
        const data = [];
        const plans = ['2025年度第一季度专项评查计划1', '2025年度第二季度日常评查计划2', '2025年度第三季度重点评查计划1'];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局',
            '卫健委', '文旅局', '应急管理局', '自然资源局', '农业农村局'];
        const handlers = ['张XX', '李XX', '王XX', '赵XX', '陈XX', '刘XX', '周XX', '吴XX'];
        for (let i = 1; i <= 50; i++) {
            const sm = Math.floor(Math.random() * 6) + 1;
            const sday = Math.floor(Math.random() * 28) + 1;
            const dm = sm + Math.floor(Math.random() * 2) + 1;
            const dday = Math.floor(Math.random() * 28) + 1;
            const statuses = ['已执行', '已执行', '已执行', '进行中', '未开始', '已逾期'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            data.push({
                seq: i, name: `${['案卷评查','执法程序评查','文书评查','专项评查'][i%4]}任务${i}`,
                plan: plans[i % plans.length], handler: handlers[i % handlers.length], dept: depts[i % depts.length],
                assignDate: `2025-${String(sm).padStart(2,'0')}-${String(sday).padStart(2,'0')}`,
                dueDate: `2025-${String(Math.min(dm,12)).padStart(2,'0')}-${String(dday).padStart(2,'0')}`,
                status: status
            });
        }
        return data;
    }

    openReviewTaskModal() {
        this.rtCurrentPage = 1;
        this.reviewTaskData = this.generateReviewTaskData();
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay rt-theme';
        overlay.innerHTML = this.renderReviewTaskModal();
        document.body.appendChild(overlay);
        this._rtOverlay = overlay;
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this.closeReviewTaskModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeReviewTaskModal(); });
        this.bindReviewTaskEvents();
        this.initReviewTaskCharts();
    }

    closeReviewTaskModal() {
        Object.values(this._rtCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._rtCharts = {};
        const overlay = document.querySelector('.rv-modal-overlay.rt-theme');
        if (overlay) overlay.remove();
        this._rtOverlay = null;
    }

    renderReviewTaskModal() {
        const data = this.reviewTaskData;
        const totalPages = Math.ceil(data.length / this.rtPageSize);
        const start = (this.rtCurrentPage - 1) * this.rtPageSize;
        const pageData = data.slice(start, start + this.rtPageSize);
        return `
            <div class="rv-modal">
                <div class="rv-modal-header rt-header">
                    <span class="rv-modal-title">评查任务执行监控</span>
                    <button class="rv-modal-close">×</button>
                </div>
                <div class="rv-stats">
                    <div class="rv-stat-card"><span class="rv-stat-label">评查任务总数</span><span class="rv-stat-value">99个</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">已执行任务数</span><span class="rv-stat-value" style="color:#34c759">98个</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">任务执行率</span><span class="rv-stat-value" style="color:#00d4ff">99%</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">逾期未执行数</span><span class="rv-stat-value" style="color:#ff3b30">3个</span></div>
                </div>
                <div class="rv-charts">
                    <div class="rv-chart-left" style="flex:5">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">任务执行进度</span>
                            <div id="rt-donut-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                    <div class="rv-chart-right" style="flex:5">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">各部门/承办人任务执行率TOP8</span>
                            <div id="rt-bar-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                </div>
                <div class="rv-table-wrap">
                    <table class="rv-table">
                        <thead><tr><th>任务名称</th><th>关联计划</th><th>承办部门/人</th><th>任务下发时间</th><th>规定完成时间</th><th>执行状态</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.name}</td><td>${item.plan}</td><td>${item.dept}/${item.handler}</td>
                                    <td>${item.assignDate}</td><td>${item.dueDate}</td>
                                    <td>${this.renderRvTag(item.status, {'已执行':'green','进行中':'blue','未开始':'default','已逾期':'red'})}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="rv-footer">
                    <button class="rv-page-btn" id="rt-prev" ${this.rtCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="rv-page-info">第 ${this.rtCurrentPage} / ${totalPages} 页</span>
                    <button class="rv-page-btn" id="rt-next" ${this.rtCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    bindReviewTaskEvents() {
        const overlay = this._rtOverlay; if (!overlay) return;
        overlay.querySelector('#rt-prev')?.addEventListener('click', () => {
            if (this.rtCurrentPage > 1) { this.rtCurrentPage--; this.updateReviewTaskModal(); }
        });
        overlay.querySelector('#rt-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.reviewTaskData.length / this.rtPageSize);
            if (this.rtCurrentPage < totalPages) { this.rtCurrentPage++; this.updateReviewTaskModal(); }
        });
    }

    updateReviewTaskModal() {
        const overlay = this._rtOverlay; if (!overlay) return;
        Object.values(this._rtCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._rtCharts = {};
        overlay.innerHTML = this.renderReviewTaskModal();
        this.bindReviewTaskEvents();
        this.initReviewTaskCharts();
    }

    initReviewTaskCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initRtDonutChart();
            this.initRtBarChart();
        }, 150)));
    }

    initRtDonutChart() {
        const dom = this._rtOverlay?.querySelector('#rt-donut-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initRtDonutChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._rtCharts.donut = chart;
        chart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
            legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 } },
            series: [{
                type: 'pie', radius: ['60%', '78%'], center: ['50%', '45%'],
                avoidLabelOverlap: false, itemStyle: { borderRadius: 6, borderColor: 'rgba(5,13,24,0.98)', borderWidth: 3 },
                label: { show: false }, emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
                data: [
                    { value: 98, name: '已执行', itemStyle: { color: '#34c759' } },
                    { value: 1, name: '未执行/逾期', itemStyle: { color: '#ff3b30' } }
                ]
            }],
            graphic: [{ type: 'text', left: 'center', top: '38%', style: { text: '99%', textAlign: 'center', fill: '#34c759', fontSize: 22, fontWeight: 'bold' } }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initRtBarChart() {
        const dom = this._rtOverlay?.querySelector('#rt-bar-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initRtBarChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._rtCharts.bar = chart;
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局', '卫健委', '文旅局', '应急管理局'];
        const rates = [99.2, 98.5, 97.1, 96.8, 95.3, 94.6, 93.2, 92.0];
        chart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}%' },
            grid: { left: '5%', right: '8%', bottom: '5%', top: '5%', containLabel: true },
            xAxis: { type: 'value', name: '%', max: 100, nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            yAxis: { type: 'category', data: depts.reverse(), axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }, axisTick: { show: false } },
            series: [{
                type: 'bar', data: rates.reverse(), barWidth: '55%',
                itemStyle: { borderRadius: [0, 6, 6, 0], color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: 'rgba(0,212,255,0.4)' }, { offset: 1, color: '#00d4ff' }]) },
                label: { show: true, position: 'right', color: 'rgba(255,255,255,0.7)', fontSize: 11, formatter: '{c}%' }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    // ============================================
    // 覆盖部门弹窗 - 部门覆盖范围分析
    // ============================================
    generateReviewDeptData() {
        const data = [];
        const types = ['执法类', '审批类', '监管类', '执法类', '执法类', '监管类', '审批类', '监管类', '执法类', '审批类'];
        const regions = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市', '东方市', '五指山市'];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局',
            '卫健委', '文旅局', '农业农村局', '应急管理局', '自然资源局',
            '海口市综合执法局', '三亚市综合执法局', '儋州市综合执法局', '文昌市综合执法局', '琼海市综合执法局',
            '万宁市市场监管局', '东方市市场监管局', '五指山市市场监管局'];
        for (let i = 1; i <= 30; i++) {
            const m = Math.floor(Math.random() * 6) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            const reviewCount = Math.floor(Math.random() * 20) + 1;
            const taskCount = Math.floor(Math.random() * 10) + 1;
            const isCovered = i <= 29;
            data.push({
                seq: i, name: depts[i % depts.length], region: regions[i % regions.length], type: types[i % types.length],
                reviewCount: reviewCount, taskCount: taskCount,
                lastReview: `2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
                covered: isCovered
            });
        }
        return data;
    }

    openReviewDeptModal() {
        this.rdCurrentPage = 1;
        this.reviewDeptData = this.generateReviewDeptData();
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay rd-theme';
        overlay.innerHTML = this.renderReviewDeptModal();
        document.body.appendChild(overlay);
        this._rdOverlay = overlay;
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this.closeReviewDeptModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeReviewDeptModal(); });
        this.bindReviewDeptEvents();
        this.initReviewDeptCharts();
    }

    closeReviewDeptModal() {
        Object.values(this._rdCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._rdCharts = {};
        const overlay = document.querySelector('.rv-modal-overlay.rd-theme');
        if (overlay) overlay.remove();
        this._rdOverlay = null;
    }

    renderReviewDeptModal() {
        const data = this.reviewDeptData;
        const totalPages = Math.ceil(data.length / this.rdPageSize);
        const start = (this.rdCurrentPage - 1) * this.rdPageSize;
        const pageData = data.slice(start, start + this.rdPageSize);
        return `
            <div class="rv-modal">
                <div class="rv-modal-header rd-header">
                    <span class="rv-modal-title">部门覆盖范围分析</span>
                    <button class="rv-modal-close">×</button>
                </div>
                <div class="rv-stats">
                    <div class="rv-stat-card"><span class="rv-stat-label">应覆盖部门总数</span><span class="rv-stat-value">100个</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">已覆盖部门数</span><span class="rv-stat-value" style="color:#34c759">99个</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">部门覆盖率</span><span class="rv-stat-value" style="color:#00d4ff">99%</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">未覆盖部门数</span><span class="rv-stat-value" style="color:#ff3b30">1个</span></div>
                </div>
                <div class="rv-charts">
                    <div class="rv-chart-left" style="flex:5">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">区域部门覆盖情况</span>
                            <div id="rd-coverage-bar" class="rv-chart-container"></div>
                        </div>
                    </div>
                    <div class="rv-chart-right" style="flex:5">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">各部门案卷被抽取次数排行TOP8</span>
                            <div id="rd-bar-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                </div>
                <div class="rv-table-wrap">
                    <table class="rv-table">
                        <thead><tr><th>部门名称</th><th>所属区域</th><th>部门类型</th><th>被评查次数</th><th>参与任务数</th><th>最近评查时间</th><th>覆盖率状态</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.name}</td><td>${item.region}</td><td>${item.type}</td>
                                    <td>${item.reviewCount}次</td><td>${item.taskCount}次</td><td>${item.lastReview}</td>
                                    <td>${this.renderRvTag(item.covered ? '已覆盖' : '未覆盖', {'已覆盖':'green','未覆盖':'red'})}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="rv-footer">
                    <button class="rv-page-btn" id="rd-prev" ${this.rdCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="rv-page-info">第 ${this.rdCurrentPage} / ${totalPages} 页</span>
                    <button class="rv-page-btn" id="rd-next" ${this.rdCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    bindReviewDeptEvents() {
        const overlay = this._rdOverlay; if (!overlay) return;
        overlay.querySelector('#rd-prev')?.addEventListener('click', () => {
            if (this.rdCurrentPage > 1) { this.rdCurrentPage--; this.updateReviewDeptModal(); }
        });
        overlay.querySelector('#rd-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.reviewDeptData.length / this.rdPageSize);
            if (this.rdCurrentPage < totalPages) { this.rdCurrentPage++; this.updateReviewDeptModal(); }
        });
    }

    updateReviewDeptModal() {
        const overlay = this._rdOverlay; if (!overlay) return;
        Object.values(this._rdCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._rdCharts = {};
        overlay.innerHTML = this.renderReviewDeptModal();
        this.bindReviewDeptEvents();
        this.initReviewDeptCharts();
    }

    initReviewDeptCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initRdCoverageBarChart();
            this.initRdBarChart();
        }, 150)));
    }

    initRdCoverageBarChart() {
        const dom = this._rdOverlay?.querySelector('#rd-coverage-bar'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initRdCoverageBarChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._rdCharts.coverageBar = chart;
        const regions = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市', '东方市', '五指山市'];
        const covered = [20, 15, 12, 10, 9, 8, 7, 6];
        const uncovered = [0, 1, 1, 2, 1, 2, 2, 3];
        chart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: (params) => {
                let html = params[0].axisValue + '<br/>';
                params.forEach(p => { html += `${p.marker}${p.seriesName}: ${p.value}个<br/>`; });
                return html;
            }},
            legend: { data: ['已覆盖', '未覆盖'], bottom: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 } },
            grid: { left: '5%', right: '5%', bottom: '12%', top: '8%', containLabel: true },
            xAxis: { type: 'category', data: regions, axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, rotate: 15 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }, axisTick: { show: false } },
            yAxis: { type: 'value', name: '部门数', nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [
                { name: '已覆盖', type: 'bar', data: covered, barWidth: '35%', itemStyle: { borderRadius: [4, 4, 0, 0], color: '#34c759' }, label: { show: true, position: 'top', color: '#34c759', fontSize: 10 } },
                { name: '未覆盖', type: 'bar', data: uncovered, barWidth: '35%', itemStyle: { borderRadius: [4, 4, 0, 0], color: '#ff3b30' }, label: { show: true, position: 'top', color: '#ff3b30', fontSize: 10 } }
            ]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initRdBarChart() {
        const dom = this._rdOverlay?.querySelector('#rd-bar-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initRdBarChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._rdCharts.bar = chart;
        const depts = ['市场监管局', '综合执法局', '生态环境局', '交通运输局', '住建局', '卫健委', '文旅局', '应急局'];
        const counts = [28, 25, 22, 18, 15, 12, 10, 8];
        const colors = ['#00d4ff', '#2196f3', '#1976d2', '#34c759', '#ff9500', '#af52de', '#ff6b3d', '#8e8e93'];
        chart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}次' },
            grid: { left: '5%', right: '8%', bottom: '5%', top: '8%', containLabel: true },
            xAxis: { type: 'category', data: depts, axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, rotate: 15 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }, axisTick: { show: false } },
            yAxis: { type: 'value', name: '次', nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [{
                type: 'bar', data: counts.map((v, i) => ({ value: v, itemStyle: { color: colors[i], borderRadius: [6, 6, 0, 0] } })), barWidth: '50%',
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 11, formatter: '{c}次' }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    // ============================================
    // 评查结果弹窗 - 评查结果质量分析
    // ============================================
    generateReviewResultData() {
        const data = [];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局',
            '卫健委', '文旅局', '应急管理局', '自然资源局', '农业农村局'];
        const names = ['案卷评查', '执法案卷', '行政许可案卷', '处罚决定书评查', '行政强制案卷', '执法记录案卷'];
        for (let i = 1; i <= 50; i++) {
            const m = Math.floor(Math.random() * 6) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            const score = Math.floor(Math.random() * 30) + 70;
            let grade;
            if (score >= 95) grade = '优秀';
            else if (score >= 85) grade = '良好';
            else if (score >= 75) grade = '合格';
            else grade = '不合格';
            data.push({
                seq: i, code: 'FJ' + String(i).padStart(4, '0'), name: `${names[i % names.length]}${Math.floor(i / 6) + 1}`,
                dept: depts[i % depts.length], date: `2025-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                score: score, grade: grade
            });
        }
        return data;
    }

    openReviewResultModal() {
        this.rrCurrentPage = 1;
        this.reviewResultData = this.generateReviewResultData();
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay rr-theme';
        overlay.innerHTML = this.renderReviewResultModal();
        document.body.appendChild(overlay);
        this._rrOverlay = overlay;
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this.closeReviewResultModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeReviewResultModal(); });
        this.bindReviewResultEvents();
        this.initReviewResultCharts();
    }

    closeReviewResultModal() {
        Object.values(this._rrCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._rrCharts = {};
        const overlay = document.querySelector('.rv-modal-overlay.rr-theme');
        if (overlay) overlay.remove();
        this._rrOverlay = null;
    }

    renderReviewResultModal() {
        const data = this.reviewResultData;
        const totalPages = Math.ceil(data.length / this.rrPageSize);
        const start = (this.rrCurrentPage - 1) * this.rrPageSize;
        const pageData = data.slice(start, start + this.rrPageSize);
        return `
            <div class="rv-modal">
                <div class="rv-modal-header rr-header">
                    <span class="rv-modal-title">评查结果质量分析</span>
                    <button class="rv-modal-close">×</button>
                </div>
                <div class="rv-stats">
                    <div class="rv-stat-card"><span class="rv-stat-label">抽取案卷总数</span><span class="rv-stat-value">99卷</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">合格案卷数</span><span class="rv-stat-value" style="color:#34c759">98卷</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">评查合格率</span><span class="rv-stat-value" style="color:#00d4ff">99%</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">不合格案卷数</span><span class="rv-stat-value" style="color:#ff3b30">1卷</span></div>
                </div>
                <div class="rv-charts">
                    <div class="rv-chart-left" style="flex:6">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">近6个月合格率趋势</span>
                            <div id="rr-line-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                    <div class="rv-chart-right" style="flex:4">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">不合格原因分布</span>
                            <div id="rr-pie-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                </div>
                <div class="rv-table-wrap">
                    <table class="rv-table">
                        <thead><tr><th>案卷编号</th><th>案卷名称</th><th>所属部门</th><th>评查时间</th><th>评查得分</th><th>评查等级</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.code}</td><td>${item.name}</td><td>${item.dept}</td>
                                    <td>${item.date}</td><td>${item.score}分</td>
                                    <td>${this.renderRvTag(item.grade, {'优秀':'green','良好':'blue','合格':'orange','不合格':'red'})}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="rv-footer">
                    <button class="rv-page-btn" id="rr-prev" ${this.rrCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="rv-page-info">第 ${this.rrCurrentPage} / ${totalPages} 页</span>
                    <button class="rv-page-btn" id="rr-next" ${this.rrCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    bindReviewResultEvents() {
        const overlay = this._rrOverlay; if (!overlay) return;
        overlay.querySelector('#rr-prev')?.addEventListener('click', () => {
            if (this.rrCurrentPage > 1) { this.rrCurrentPage--; this.updateReviewResultModal(); }
        });
        overlay.querySelector('#rr-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.reviewResultData.length / this.rrPageSize);
            if (this.rrCurrentPage < totalPages) { this.rrCurrentPage++; this.updateReviewResultModal(); }
        });
    }

    updateReviewResultModal() {
        const overlay = this._rrOverlay; if (!overlay) return;
        Object.values(this._rrCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._rrCharts = {};
        overlay.innerHTML = this.renderReviewResultModal();
        this.bindReviewResultEvents();
        this.initReviewResultCharts();
    }

    initReviewResultCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initRrLineChart();
            this.initRrPieChart();
        }, 150)));
    }

    initRrLineChart() {
        const dom = this._rrOverlay?.querySelector('#rr-line-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initRrLineChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._rrCharts.line = chart;
        const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
        const rates = [93.5, 94.2, 96.8, 95.1, 97.5, 99.0];
        chart.setOption({
            tooltip: { trigger: 'axis', formatter: '{b}<br/>合格率: {c}%' },
            grid: { left: '8%', right: '5%', bottom: '5%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: months, axisLabel: { color: 'rgba(255,255,255,0.6)' }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } } },
            yAxis: { type: 'value', name: '%', min: 60, max: 100, nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [{
                type: 'line', data: rates, smooth: true, symbol: 'circle', symbolSize: 8,
                lineStyle: { color: '#00d4ff', width: 2.5 },
                itemStyle: { color: '#00d4ff', borderColor: '#00d4ff', borderWidth: 3 },
                areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,212,255,0.35)' }, { offset: 1, color: 'rgba(0,212,255,0.02)' }]) },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.8)', fontSize: 12, formatter: '{c}%' },
                markLine: { silent: true, symbol: 'none', lineStyle: { color: '#ff3b30', type: 'dashed', width: 2 }, label: { formatter: '警戒线 70%', color: '#ff3b30', fontSize: 11 }, data: [{ yAxis: 70 }] }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initRrPieChart() {
        const dom = this._rrOverlay?.querySelector('#rr-pie-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initRrPieChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._rrCharts.pie = chart;
        chart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 } },
            series: [{
                type: 'pie', radius: ['50%', '72%'], center: ['50%', '45%'],
                itemStyle: { borderRadius: 6, borderColor: 'rgba(5,13,24,0.98)', borderWidth: 3 },
                label: { formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.7)', fontSize: 10 },
                data: [
                    { value: 40, name: '程序违法', itemStyle: { color: '#ff3b30' } },
                    { value: 30, name: '事实不清', itemStyle: { color: '#ff9500' } },
                    { value: 20, name: '法律适用错误', itemStyle: { color: '#af52de' } },
                    { value: 10, name: '文书瑕疵', itemStyle: { color: '#8e8e93' } }
                ]
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    // ============================================
    // 行政处罚信用数据归集弹窗
    // ============================================
    generateCreditCollectData() {
        const data = [];
        const types = ['行政处罚', '行政强制', '行政许可', '行政处罚', '行政处罚', '行政强制', '行政许可', '行政处罚'];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局',
            '卫健委', '文旅局', '农业农村局', '应急管理局', '自然资源局'];
        const statuses = ['已审核', '已审核', '已审核', '待审核', '已退回'];
        for (let i = 1; i <= 50; i++) {
            const m = Math.floor(Math.random() * 6) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            const hour = Math.floor(Math.random() * 24);
            const minute = Math.floor(Math.random() * 60);
            data.push({
                seq: i, code: 'SJ' + String(i).padStart(6, '0'), dept: depts[i % depts.length],
                type: types[i % types.length],
                time: `2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')} ${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`,
                status: statuses[i % statuses.length]
            });
        }
        return data;
    }

    openCreditCollectModal() {
        this.ccCurrentPage = 1;
        this.creditCollectData = this.generateCreditCollectData();
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay cc-theme';
        overlay.innerHTML = this.renderCreditCollectModal();
        document.body.appendChild(overlay);
        this._ccOverlay = overlay;
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this.closeCreditCollectModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeCreditCollectModal(); });
        this.bindCreditCollectEvents();
        this.initCreditCollectCharts();
    }

    closeCreditCollectModal() {
        Object.values(this._ccCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._ccCharts = {};
        const overlay = document.querySelector('.rv-modal-overlay.cc-theme');
        if (overlay) overlay.remove();
        this._ccOverlay = null;
    }

    renderCreditCollectModal() {
        const data = this.creditCollectData;
        const totalPages = Math.ceil(data.length / this.ccPageSize);
        const start = (this.ccCurrentPage - 1) * this.ccPageSize;
        const pageData = data.slice(start, start + this.ccPageSize);
        return `
            <div class="rv-modal">
                <div class="rv-modal-header cc-header">
                    <span class="rv-modal-title">行政处罚信用数据归集全景</span>
                    <button class="rv-modal-close">×</button>
                </div>
                <div class="rv-stats">
                    <div class="rv-stat-card"><span class="rv-stat-label">数据归集总数</span><span class="rv-stat-value">2,345条</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">本月新增</span><span class="rv-stat-value" style="color:#34c759">186条</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">涉及部门数</span><span class="rv-stat-value" style="color:#00d4ff">26个</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">数据完整率</span><span class="rv-stat-value" style="color:#00d4ff">94.7%</span></div>
                </div>
                <div class="rv-charts">
                    <div class="rv-chart-left" style="flex:6">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">各部门数据归集量排行TOP8</span>
                            <div id="cc-bar-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                    <div class="rv-chart-right" style="flex:4">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">数据来源渠道分布</span>
                            <div id="cc-pie-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                </div>
                <div class="rv-table-wrap">
                    <table class="rv-table">
                        <thead><tr><th>序号</th><th>数据编号</th><th>归集部门</th><th>数据类型</th><th>归集时间</th><th>数据状态</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.seq}</td><td>${item.code}</td><td>${item.dept}</td>
                                    <td>${item.type}</td><td>${item.time}</td>
                                    <td>${this.renderRvTag(item.status, {'已审核':'green','待审核':'orange','已退回':'red'})}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="rv-footer">
                    <button class="rv-page-btn" id="cc-prev" ${this.ccCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="rv-page-info">第 ${this.ccCurrentPage} / ${totalPages} 页</span>
                    <button class="rv-page-btn" id="cc-next" ${this.ccCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    bindCreditCollectEvents() {
        const overlay = this._ccOverlay; if (!overlay) return;
        overlay.querySelector('#cc-prev')?.addEventListener('click', () => {
            if (this.ccCurrentPage > 1) { this.ccCurrentPage--; this.updateCreditCollectModal(); }
        });
        overlay.querySelector('#cc-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.creditCollectData.length / this.ccPageSize);
            if (this.ccCurrentPage < totalPages) { this.ccCurrentPage++; this.updateCreditCollectModal(); }
        });
    }

    updateCreditCollectModal() {
        const overlay = this._ccOverlay; if (!overlay) return;
        Object.values(this._ccCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._ccCharts = {};
        overlay.innerHTML = this.renderCreditCollectModal();
        this.bindCreditCollectEvents();
        this.initCreditCollectCharts();
    }

    initCreditCollectCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initCcBarChart();
            this.initCcPieChart();
        }, 150)));
    }

    initCcBarChart() {
        const dom = this._ccOverlay?.querySelector('#cc-bar-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initCcBarChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._ccCharts.bar = chart;
        const depts = ['市场监管局', '综合执法局', '生态环境局', '交通运输局', '住建局', '卫健委', '文旅局', '应急局'];
        const counts = [425, 380, 295, 268, 220, 185, 152, 120];
        chart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}条' },
            grid: { left: '5%', right: '8%', bottom: '5%', top: '8%', containLabel: true },
            xAxis: { type: 'category', data: depts, axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, rotate: 15 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }, axisTick: { show: false } },
            yAxis: { type: 'value', name: '条', nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [{
                type: 'bar', data: counts, barWidth: '55%',
                itemStyle: { borderRadius: [6, 6, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00d4ff' }, { offset: 1, color: 'rgba(0,212,255,0.15)' }]) },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 11, formatter: '{c}' }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initCcPieChart() {
        const dom = this._ccOverlay?.querySelector('#cc-pie-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initCcPieChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._ccCharts.pie = chart;
        chart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 } },
            series: [{
                type: 'pie', radius: ['50%', '72%'], center: ['50%', '45%'],
                itemStyle: { borderRadius: 6, borderColor: 'rgba(5,13,24,0.98)', borderWidth: 3 },
                label: { formatter: '{b}\n{d}%', color: 'rgba(255,255,255,0.7)', fontSize: 10 },
                data: [
                    { value: 55, name: '线上系统填报', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '线下人工录入', itemStyle: { color: '#34c759' } },
                    { value: 15, name: '数据接口对接', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '其他', itemStyle: { color: '#8e8e93' } }
                ]
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    // ============================================
    // 行政处罚信用数据公示弹窗
    // ============================================
    generateCreditPublishData() {
        const data = [];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局',
            '卫健委', '文旅局', '农业农村局', '应急管理局', '自然资源局'];
        const titles = ['XX公司行政处罚公示', 'YY商店违规经营公示', 'ZZ企业环保处罚公示', 'AA物流超载处罚公示',
            'BB餐饮食品安全公示', 'CC建筑违规公示', 'DD药房处罚公示', 'EE广告违规公示'];
        const statuses = ['正常公示', '正常公示', '正常公示', '正常公示', '异议处理中', '已撤销'];
        for (let i = 1; i <= 50; i++) {
            const m = Math.floor(Math.random() * 6) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            data.push({
                seq: i, code: 'GS' + String(i).padStart(6, '0'), dept: depts[i % depts.length],
                title: titles[i % titles.length], date: `2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
                status: statuses[i % statuses.length]
            });
        }
        return data;
    }

    openCreditPublishModal() {
        this.cpCurrentPage = 1;
        this.creditPublishData = this.generateCreditPublishData();
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay cp-theme';
        overlay.innerHTML = this.renderCreditPublishModal();
        document.body.appendChild(overlay);
        this._cpOverlay = overlay;
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this.closeCreditPublishModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeCreditPublishModal(); });
        this.bindCreditPublishEvents();
        this.initCreditPublishCharts();
    }

    closeCreditPublishModal() {
        Object.values(this._cpCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._cpCharts = {};
        const overlay = document.querySelector('.rv-modal-overlay.cp-theme');
        if (overlay) overlay.remove();
        this._cpOverlay = null;
    }

    renderCreditPublishModal() {
        const data = this.creditPublishData;
        const totalPages = Math.ceil(data.length / this.cpPageSize);
        const start = (this.cpCurrentPage - 1) * this.cpPageSize;
        const pageData = data.slice(start, start + this.cpPageSize);
        return `
            <div class="rv-modal">
                <div class="rv-modal-header cp-header">
                    <span class="rv-modal-title">行政处罚信用数据公示监控</span>
                    <button class="rv-modal-close">×</button>
                </div>
                <div class="rv-stats">
                    <div class="rv-stat-card"><span class="rv-stat-label">数据公示总数</span><span class="rv-stat-value">2,198条</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">公示率</span><span class="rv-stat-value" style="color:#34c759">93.7%</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">待公示数</span><span class="rv-stat-value" style="color:#ff9500">147条</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">公示异议数</span><span class="rv-stat-value" style="color:#ff3b30">23条</span></div>
                </div>
                <div class="rv-charts">
                    <div class="rv-chart-left" style="flex:6">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">近6个月数据公示趋势</span>
                            <div id="cp-line-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                    <div class="rv-chart-right" style="flex:4">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">公示数据状态分布</span>
                            <div id="cp-donut-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                </div>
                <div class="rv-table-wrap">
                    <table class="rv-table">
                        <thead><tr><th>序号</th><th>公示编号</th><th>公示部门</th><th>公示标题</th><th>公示日期</th><th>公示状态</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.seq}</td><td>${item.code}</td><td>${item.dept}</td>
                                    <td>${item.title}</td><td>${item.date}</td>
                                    <td>${this.renderRvTag(item.status, {'正常公示':'green','异议处理中':'orange','已撤销':'red'})}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="rv-footer">
                    <button class="rv-page-btn" id="cp-prev" ${this.cpCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="rv-page-info">第 ${this.cpCurrentPage} / ${totalPages} 页</span>
                    <button class="rv-page-btn" id="cp-next" ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    bindCreditPublishEvents() {
        const overlay = this._cpOverlay; if (!overlay) return;
        overlay.querySelector('#cp-prev')?.addEventListener('click', () => {
            if (this.cpCurrentPage > 1) { this.cpCurrentPage--; this.updateCreditPublishModal(); }
        });
        overlay.querySelector('#cp-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.creditPublishData.length / this.cpPageSize);
            if (this.cpCurrentPage < totalPages) { this.cpCurrentPage++; this.updateCreditPublishModal(); }
        });
    }

    updateCreditPublishModal() {
        const overlay = this._cpOverlay; if (!overlay) return;
        Object.values(this._cpCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._cpCharts = {};
        overlay.innerHTML = this.renderCreditPublishModal();
        this.bindCreditPublishEvents();
        this.initCreditPublishCharts();
    }

    initCreditPublishCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initCpLineChart();
            this.initCpDonutChart();
        }, 150)));
    }

    initCpLineChart() {
        const dom = this._cpOverlay?.querySelector('#cp-line-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initCpLineChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._cpCharts.line = chart;
        const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
        const vals = [320, 345, 368, 355, 390, 420];
        const momRates = ['—', '+7.8%', '+6.7%', '-3.5%', '+9.9%', '+7.7%'];
        chart.setOption({
            tooltip: { trigger: 'axis', formatter: (p) => `${p[0].axisValue}<br/>公示数量: ${p[0].value}条<br/>环比上月增长: ${momRates[p[0].dataIndex]}` },
            grid: { left: '8%', right: '5%', bottom: '10%', top: '8%', containLabel: true },
            xAxis: { type: 'category', data: months, axisLabel: { color: 'rgba(255,255,255,0.6)' }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } } },
            yAxis: { type: 'value', name: '条', nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [{
                type: 'line', data: vals, smooth: true, symbol: 'circle', symbolSize: 8,
                lineStyle: { color: '#00d4ff', width: 2.5 },
                itemStyle: { color: '#00d4ff', borderColor: '#00d4ff', borderWidth: 3 },
                areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,212,255,0.35)' }, { offset: 1, color: 'rgba(0,212,255,0.02)' }]) },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.8)', fontSize: 12, formatter: '{c}' },
                markLine: { silent: true, symbol: 'none', lineStyle: { color: 'rgba(255,255,255,0.2)', type: 'dashed' }, label: { show: false }, data: vals.map((v, i) => ({ xAxis: months[i], label: { formatter: momRates[i], position: 'start', fontSize: 10 } })) }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initCpDonutChart() {
        const dom = this._cpOverlay?.querySelector('#cp-donut-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initCpDonutChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._cpCharts.donut = chart;
        chart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}条 ({d}%)' },
            legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 } },
            series: [{
                type: 'pie', radius: ['58%', '76%'], center: ['50%', '45%'],
                avoidLabelOverlap: false, itemStyle: { borderRadius: 6, borderColor: 'rgba(5,13,24,0.98)', borderWidth: 3 },
                label: { show: false }, emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
                data: [
                    { value: 1934, name: '正常公示', itemStyle: { color: '#34c759' } },
                    { value: 110, name: '异议处理中', itemStyle: { color: '#ff9500' } },
                    { value: 88, name: '已撤销公示', itemStyle: { color: '#8e8e93' } },
                    { value: 66, name: '待复核', itemStyle: { color: '#af52de' } }
                ]
            }],
            graphic: [{ type: 'text', left: 'center', top: '38%', style: { text: '2,198', textAlign: 'center', fill: '#00d4ff', fontSize: 22, fontWeight: 'bold' } },
                { type: 'text', left: 'center', top: '50%', style: { text: '总公示数', textAlign: 'center', fill: 'rgba(255,255,255,0.5)', fontSize: 12 } }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    // ============================================
    // 平均办案时效弹窗
    // ============================================
    generateCaseEfficiencyData() {
        const data = [];
        const depts = ['综合行政执法局', '市场监督管理局', '生态环境局', '交通运输局', '住建局',
            '卫健委', '文旅局', '应急管理局', '自然资源局', '农业农村局'];
        const names = ['违规经营案', '食品安全案', '环境污染案', '超载运输案', '建筑违规案',
            '医疗违规案', '旅游投诉案', '安全生产案', '资源违规案', '农业违规案'];
        for (let i = 1; i <= 50; i++) {
            const fm = Math.floor(Math.random() * 12) + 1;
            const fday = Math.floor(Math.random() * 28) + 1;
            const elapsed = Math.floor(Math.random() * 150) + 10;
            const remaining = Math.max(0, 120 - elapsed);
            let timeStatus;
            if (elapsed > 120) timeStatus = '已超期';
            else if (remaining <= 15) timeStatus = '即将到期';
            else timeStatus = '正常';
            data.push({
                seq: i, code: 'AJ' + String(i).padStart(6, '0'), name: `${depts[i%10]}${names[i%10]}${Math.floor(i/10)+1}`,
                dept: depts[i % depts.length],
                filingDate: `2025-${String(fm).padStart(2,'0')}-${String(fday).padStart(2,'0')}`,
                elapsedDays: elapsed, remainingDays: remaining, timeStatus: timeStatus
            });
        }
        return data;
    }

    openCaseEfficiencyModal() {
        this.ceCurrentPage = 1;
        this.caseEfficiencyData = this.generateCaseEfficiencyData();
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay ce-theme';
        overlay.innerHTML = this.renderCaseEfficiencyModal();
        document.body.appendChild(overlay);
        this._ceOverlay = overlay;
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this.closeCaseEfficiencyModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeCaseEfficiencyModal(); });
        this.bindCaseEfficiencyEvents();
        this.initCaseEfficiencyCharts();
    }

    closeCaseEfficiencyModal() {
        Object.values(this._ceCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._ceCharts = {};
        const overlay = document.querySelector('.rv-modal-overlay.ce-theme');
        if (overlay) overlay.remove();
        this._ceOverlay = null;
    }

    renderCaseEfficiencyModal() {
        const data = this.caseEfficiencyData;
        const totalPages = Math.ceil(data.length / this.cePageSize);
        const start = (this.ceCurrentPage - 1) * this.cePageSize;
        const pageData = data.slice(start, start + this.cePageSize);
        return `
            <div class="rv-modal">
                <div class="rv-modal-header ce-header">
                    <span class="rv-modal-title">平均办案时效分析</span>
                    <button class="rv-modal-close">×</button>
                </div>
                <div class="rv-stats">
                    <div class="rv-stat-card"><span class="rv-stat-label">平均办案时效</span><span class="rv-stat-value">98天</span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">环比上月</span><span class="rv-stat-value" style="color:#34c759">-5天 ↓<span style="font-size:12px">提速4.9%</span></span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">同比去年</span><span class="rv-stat-value" style="color:#34c759">-12天 ↓<span style="font-size:12px">提速10.9%</span></span></div>
                    <div class="rv-stat-card"><span class="rv-stat-label">超法定时效案件</span><span class="rv-stat-value" style="color:#ff3b30">3件</span></div>
                </div>
                <div class="rv-charts">
                    <div class="rv-chart-left" style="flex:6">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">近12个月平均办案时效趋势（去年7月-今年6月）</span>
                            <div id="ce-line-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                    <div class="rv-chart-right" style="flex:4">
                        <div class="rv-chart-item">
                            <span class="rv-chart-title">各部门平均办案时效排行TOP8（由短到长）</span>
                            <div id="ce-bar-chart" class="rv-chart-container"></div>
                        </div>
                    </div>
                </div>
                <div class="rv-table-wrap">
                    <table class="rv-table">
                        <thead><tr><th>序号</th><th>案件编号</th><th>案件名称</th><th>承办部门</th><th>立案日期</th><th>已办天数</th><th>剩余法定天数</th><th>时效状态</th></tr></thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.seq}</td><td>${item.code}</td><td>${item.name}</td>
                                    <td>${item.dept}</td><td>${item.filingDate}</td>
                                    <td>${item.elapsedDays}天</td><td>${item.remainingDays}天</td>
                                    <td>${this.renderRvTag(item.timeStatus, {'正常':'green','即将到期':'orange','已超期':'red'})}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="rv-footer">
                    <button class="rv-page-btn" id="ce-prev" ${this.ceCurrentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="rv-page-info">第 ${this.ceCurrentPage} / ${totalPages} 页</span>
                    <button class="rv-page-btn" id="ce-next" ${this.ceCurrentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>`;
    }

    bindCaseEfficiencyEvents() {
        const overlay = this._ceOverlay; if (!overlay) return;
        overlay.querySelector('#ce-prev')?.addEventListener('click', () => {
            if (this.ceCurrentPage > 1) { this.ceCurrentPage--; this.updateCaseEfficiencyModal(); }
        });
        overlay.querySelector('#ce-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.caseEfficiencyData.length / this.cePageSize);
            if (this.ceCurrentPage < totalPages) { this.ceCurrentPage++; this.updateCaseEfficiencyModal(); }
        });
    }

    updateCaseEfficiencyModal() {
        const overlay = this._ceOverlay; if (!overlay) return;
        Object.values(this._ceCharts).forEach(c => { try { c.dispose(); } catch(e) {} });
        this._ceCharts = {};
        overlay.innerHTML = this.renderCaseEfficiencyModal();
        this.bindCaseEfficiencyEvents();
        this.initCaseEfficiencyCharts();
    }

    initCaseEfficiencyCharts() {
        if (typeof echarts === 'undefined') return;
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
            this.initCeLineChart();
            this.initCeBarChart();
        }, 150)));
    }

    initCeLineChart() {
        const dom = this._ceOverlay?.querySelector('#ce-line-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initCeLineChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._ceCharts.line = chart;
        const months = ['7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月'];
        const subLabels = ['去年', '', '', '', '', '', '今年', '', '', '', '', ''];
        const days = [115, 112, 108, 110, 105, 103, 108, 102, 100, 99, 98, 97];
        chart.setOption({
            tooltip: { trigger: 'axis', formatter: '{b0}: {c0}天' },
            grid: { left: '8%', right: '5%', bottom: '12%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: months, axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } } },
            yAxis: { type: 'value', name: '天', min: 80, max: 130, nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            series: [{
                type: 'line', data: days, smooth: true, symbol: 'circle', symbolSize: 8,
                lineStyle: { color: '#00d4ff', width: 2.5 },
                itemStyle: { color: '#00d4ff', borderColor: '#00d4ff', borderWidth: 3 },
                areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,212,255,0.3)' }, { offset: 1, color: 'rgba(0,212,255,0.02)' }]) },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.8)', fontSize: 11, formatter: '{c}天' },
                markLine: { silent: true, symbol: 'none', lineStyle: { color: '#ff3b30', type: 'dashed', width: 2 }, label: { formatter: '法定时效警戒线 120天', color: '#ff3b30', fontSize: 11 }, data: [{ yAxis: 120 }] }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    initCeBarChart() {
        const dom = this._ceOverlay?.querySelector('#ce-bar-chart'); if (!dom) return;
        dom.style.width = '100%'; dom.style.height = '230px';
        if (dom.getBoundingClientRect().width <= 0) { setTimeout(() => this.initCeBarChart(), 200); return; }
        const existing = echarts.getInstanceByDom(dom); if (existing) existing.dispose();
        const chart = echarts.init(dom); this._ceCharts.bar = chart;
        const depts = ['市场监管局', '卫健委', '住建局', '综合执法局', '生态环境局', '交通运输局', '文旅局', '应急局'];
        const days = [85, 92, 95, 98, 105, 112, 118, 125];
        const avg = 98;
        chart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}天' },
            grid: { left: '5%', right: '8%', bottom: '5%', top: '5%', containLabel: true },
            xAxis: { type: 'value', name: '天', nameTextStyle: { color: 'rgba(255,255,255,0.5)' }, axisLabel: { color: 'rgba(255,255,255,0.5)' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
            yAxis: { type: 'category', data: depts.reverse(), axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }, axisTick: { show: false } },
            series: [{
                type: 'bar', data: days.reverse().map(v => ({
                    value: v,
                    itemStyle: { color: v <= avg ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: 'rgba(52,199,89,0.4)' }, { offset: 1, color: '#34c759' }]) : new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: 'rgba(255,59,48,0.4)' }, { offset: 1, color: '#ff3b30' }]), borderRadius: [0, 6, 6, 0] }
                })), barWidth: '55%',
                label: { show: true, position: 'right', color: 'rgba(255,255,255,0.7)', fontSize: 11, formatter: '{c}天' }
            }]
        });
        new ResizeObserver(() => chart.resize()).observe(dom);
    }

    openPushDataModal() {
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        this.modalData = Array.from({ length: 30 }, (_, i) => ({
            id: 'TS' + String(i + 1).padStart(6, '0'),
            name: '处罚结果',
            dept: ['省市场监管局', '省综合执法局', '省住建厅', '省交通厅'][i % 4],
            count: Math.floor(Math.random() * 500) + 100,
            date: '2026-07-' + String(i % 28 + 1).padStart(2, '0')
        }));
        this.currentPage = 1;
        overlay.innerHTML = `
            <div class="indicator-modal">
                <div class="indicator-modal-header"><span class="indicator-modal-title">推送数据分析</span><button class="indicator-modal-close">×</button></div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">推送数据总量</span><span class="indicator-stat-value">6.3万条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">处罚结果</span><span class="indicator-stat-value">100%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">覆盖部门</span><span class="indicator-stat-value">22个</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">推送数据类型分布</span><div id="law-modal-push-pie" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各部门推送数据量</span><div id="law-modal-push-bar" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table"><thead><tr><th>序号</th><th>推送编号</th><th>数据类型</th><th>推送部门</th><th>推送数量</th><th>推送日期</th></tr></thead>
                    <tbody>${this.modalData.slice(0, this.pageSize).map((d, i) => `<tr><td>${i + 1}</td><td>${d.id}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('')}</tbody></table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" disabled>上一页</button>
                    <span class="indicator-pagination-info">第 1 / ${Math.ceil(this.modalData.length / this.pageSize)} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next">下一页</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.bindGenericModalEvents(overlay, 'push');
        setTimeout(() => this.initLawPushModalCharts(), 80);
    }

    openReceiveDataModal() {
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        this.modalData = Array.from({ length: 30 }, (_, i) => ({
            id: 'SD' + String(i + 1).padStart(6, '0'),
            name: ['违法线索', '信用数据'][i % 2],
            dept: ['省市场监管局', '省信用办', '省住建厅', '省交通厅'][i % 4],
            count: Math.floor(Math.random() * 500) + 100,
            date: '2026-07-' + String(i % 28 + 1).padStart(2, '0')
        }));
        this.currentPage = 1;
        overlay.innerHTML = `
            <div class="indicator-modal">
                <div class="indicator-modal-header"><span class="indicator-modal-title">收到数据分析</span><button class="indicator-modal-close">×</button></div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">收到数据总量</span><span class="indicator-stat-value">4.8万条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">违法线索</span><span class="indicator-stat-value">65%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">信用数据</span><span class="indicator-stat-value">35%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">覆盖部门</span><span class="indicator-stat-value">18个</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">收到数据类型分布</span><div id="law-modal-receive-pie" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各来源收到数据量</span><div id="law-modal-receive-bar" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table"><thead><tr><th>序号</th><th>接收编号</th><th>数据类型</th><th>来源部门</th><th>接收数量</th><th>接收日期</th></tr></thead>
                    <tbody>${this.modalData.slice(0, this.pageSize).map((d, i) => `<tr><td>${i + 1}</td><td>${d.id}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('')}</tbody></table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" disabled>上一页</button>
                    <span class="indicator-pagination-info">第 1 / ${Math.ceil(this.modalData.length / this.pageSize)} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next">下一页</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.bindGenericModalEvents(overlay, 'receive');
        setTimeout(() => this.initLawReceiveModalCharts(), 80);
    }

    bindGenericModalEvents(overlay, type) {
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
        const prevBtn = overlay.querySelector('#generic-modal-prev');
        const nextBtn = overlay.querySelector('#generic-modal-next');
        prevBtn?.addEventListener('click', () => {
            if (this.currentPage > 1) { this.currentPage--; this.updateGenericModal(overlay); }
        });
        nextBtn?.addEventListener('click', () => {
            if (this.currentPage < Math.ceil(this.modalData.length / this.pageSize)) { this.currentPage++; this.updateGenericModal(overlay); }
        });
    }

    updateGenericModal(overlay) {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = this.modalData.slice(start, end);
        const totalPages = Math.ceil(this.modalData.length / this.pageSize);
        const tbody = overlay.querySelector('tbody');
        tbody.innerHTML = pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.id}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('');
        overlay.querySelector('#generic-modal-prev').disabled = this.currentPage <= 1;
        overlay.querySelector('#generic-modal-next').disabled = this.currentPage >= totalPages;
        overlay.querySelector('.indicator-pagination-info').textContent = `第 ${this.currentPage} / ${totalPages} 页`;
    }

    initLawPushModalCharts() {
        const pieChart = echarts.init(document.getElementById('law-modal-push-pie'));
        pieChart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie', radius: ['45%', '70%'], center: ['50%', '50%'],
                data: [{ value: 100, name: '处罚结果', itemStyle: { color: '#ff9500' } }]
            }]
        });
        const barChart = echarts.init(document.getElementById('law-modal-push-bar'));
        barChart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '10%', right: '5%', top: '15%', bottom: '10%' },
            xAxis: { type: 'category', data: ['市场监管', '综合执法', '住建', '交通'], axisLabel: { color: '#fff' } },
            yAxis: { type: 'value', axisLabel: { color: '#fff' } },
            series: [{ type: 'bar', data: [3200, 2800, 2000, 1600], itemStyle: { color: '#ff9500' } }]
        });
    }

    initLawReceiveModalCharts() {
        const pieChart = echarts.init(document.getElementById('law-modal-receive-pie'));
        pieChart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie', radius: ['45%', '70%'], center: ['50%', '50%'],
                data: [{ value: 65, name: '违法线索', itemStyle: { color: '#00d4ff' } }, { value: 35, name: '信用数据', itemStyle: { color: '#af52de' } }]
            }]
        });
        const barChart = echarts.init(document.getElementById('law-modal-receive-bar'));
        barChart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '10%', right: '5%', top: '15%', bottom: '10%' },
            xAxis: { type: 'category', data: ['市场监管', '信用办', '住建', '交通'], axisLabel: { color: '#fff' } },
            yAxis: { type: 'value', axisLabel: { color: '#fff' } },
            series: [{ type: 'bar', data: [2500, 1800, 1200, 900], itemStyle: { color: '#00d4ff' } }]
        });
    }

    openPushCreditModal() {
        const months = ['2025-06','2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05'];
        const trendData = [4280, 4720, 5180, 4820, 5560, 5920, 6280, 5320, 5080, 5680, 6120, 6480];
        const sourceData = [
            { value: 24570, name: '行政处罚信息', itemStyle: { color: '#ff7f50' } },
            { value: 16380, name: '行政强制信息', itemStyle: { color: '#ff4081' } },
            { value: 13230, name: '行政检查信息', itemStyle: { color: '#4a9eff' } },
            { value: 8820, name: '其他执法信息', itemStyle: { color: '#af52de' } }
        ];
        const types = ['行政处罚', '行政强制', '行政检查', '其他'];
        const sendDepts = ['海口市综合执法局', '三亚市综合执法局', '儋州市综合执法局', '琼海市综合执法局'];
        const recvDepts = ['海南省信用办', '海口市信用办', '三亚市信用办'];
        const statuses = ['已接收', '未接收', '处理中'];
        const rows = [];
        for (let i = 1; i <= 15; i++) {
            const id = `AJ${String(i).padStart(6, '0')}`;
            const names = ['违反市场监管法规案', '环保行政处罚案', '交通违法案', '食品安全案', '税务稽查案', '安全生产案'];
            const enterprises = ['海南科技有限公司', '海南实业有限公司', '海南商贸有限公司', '海南物流有限公司', '海南旅游有限公司', '海南建筑有限公司'];
            const credit = `${Math.floor(Math.random()*9)+1}${String(Math.floor(Math.random()*1000000000000)).padStart(12, '0')}`;
            const date = `${2025+Math.floor(i/12)}-${String((i%12)+1).padStart(2,'0')}-${String(Math.floor(Math.random()*28)+1).padStart(2,'0')}`;
            rows.push([id, names[i%6], enterprises[i%6], credit, types[i%4], date, sendDepts[i%4], recvDepts[i%3], date, statuses[Math.floor(Math.random()*3)]]);
        }

        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';

        this._panoCfg = {
            title: '执法推送信用数据量分析',
            kpiCols: 4,
            kpis: [
                { label: '累计推送执法信用数据', value: '6.3', suffix: '万条', highlight: 'total' },
                { label: '本月推送', value: '2,567', suffix: '条' },
                { label: '已接收', value: '6.1', suffix: '万条' },
                { label: '接收率', value: '96.8', suffix: '%' }
            ],
            chart1Title: '近12个月推送执法信用数据趋势',
            chart1Type: 'line',
            chart1Data: { x: months, y: trendData },
            chart2Title: '推送数据类型分布',
            chart2Type: 'pie',
            chart2Data: sourceData,
            tableTitle: '执法推送信用数据明细列表',
            table: {
                header: ['案件编号', '案件名称', '当事人/企业名称', '统一社会信用代码', '推送数据类型', '处罚决定日期', '推送部门', '接收信用部门', '推送时间', '接收状态'],
                rows: rows
            }
        };

        this._panoPageSize = 5;
        this._panoPage = 1;
        this._panoTotal = rows.length;
        this._panoPages = Math.max(1, Math.ceil(this._panoTotal / this._panoPageSize));

        const kpisHtml = this._panoCfg.kpis.map(k => {
            const cls = k.highlight === 'total' ? 'value-total' : '';
            return `<div class="trend-kpi-card pano-kpi-card pano-kpi-col-4">
                <span class="trend-kpi-label">${k.label}</span>
                <span class="trend-kpi-value ${cls}">${k.value}${k.suffix || ''}</span>
            </div>`;
        }).join('');

        const renderTbody = () => {
            const start = (this._panoPage - 1) * this._panoPageSize;
            const rows = this._panoCfg.table.rows.slice(start, start + this._panoPageSize);
            return rows.map(r => {
                const cells = r.map((c, i) => {
                    if (i === r.length - 1 && ['已接收', '未接收', '处理中'].includes(c)) {
                        const cls = c === '已接收' ? 'status-completed' : c === '未接收' ? 'status-pending' : 'status-processing';
                        return `<td><span class="status-badge ${cls}">${c}</span></td>`;
                    }
                    return `<td>${c}</td>`;
                });
                return `<tr>${cells.join('')}</tr>`;
            }).join('');
        };

        const renderPager = () => {
            const t = this._panoTotal, cur = this._panoPage, last = this._panoPages;
            return `
            <div class="trend-pager-bar" style="margin-top:6px;">
                <span class="trend-pager-info">共 <b>${t}</b> 条 / 每页 <b>${this._panoPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
                <div class="trend-pager-btns">
                    <button class="trend-pager-btn ${cur<=1?'disabled':''}"
                            onclick="window.lawPage._switchLawPushPage(-1)">上一页</button>
                    <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                    <button class="trend-pager-btn ${cur>=last?'disabled':''}"
                            onclick="window.lawPage._switchLawPushPage(1)">下一页</button>
                </div>
            </div>`;
        };

        overlay.innerHTML = `
        <div class="indicator-modal panorama-modal" style="width:85vw;max-width:1400px;">
            <div class="indicator-modal-header">
                <span class="indicator-modal-title">执法推送信用数据量分析</span>
                <button class="indicator-modal-close">×</button>
            </div>
            <div class="pano-kpi-wrap" style="grid-template-columns: repeat(4, 1fr);">
                ${kpisHtml}
            </div>
            <div class="trend-charts-row">
                <div class="trend-chart-box trend-chart-main">
                    <div class="trend-chart-title">近12个月推送执法信用数据趋势</div>
                    <div id="law-push-chart-left" class="trend-chart-container"></div>
                </div>
                <div class="trend-chart-box trend-chart-pie">
                    <div class="trend-chart-title">推送数据类型分布</div>
                    <div id="law-push-chart-right" class="trend-chart-container"></div>
                </div>
            </div>
            <div class="trend-table-wrap">
                <div class="trend-table-title">执法推送信用数据明细列表</div>
                <div class="trend-table-scroller">
                    <table class="trend-data-table">
                        <thead><tr>${this._panoCfg.table.header.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                        <tbody id="law-push-tbody">${renderTbody()}</tbody>
                    </table>
                </div>
                <div class="trend-pager-bar" id="law-push-pager">${renderPager()}</div>
            </div>
        </div>`;

        document.body.appendChild(overlay);
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => this._closeLawPushModal());
        overlay.addEventListener('click', e => { if (e.target === overlay) this._closeLawPushModal(); });
        setTimeout(() => this._initLawPushCharts(), 80);
    }

    _closeLawPushModal() {
        const el = document.querySelector('.indicator-modal-overlay');
        if (el) el.remove();
    }

    _switchLawPushPage(delta) {
        const next = this._panoPage + delta;
        if (next < 1 || next > this._panoPages) return;
        this._panoPage = next;
        const b = document.getElementById('law-push-tbody');
        if (b) {
            const start = (this._panoPage - 1) * this._panoPageSize;
            const rows = this._panoCfg.table.rows.slice(start, start + this._panoPageSize);
            b.innerHTML = rows.map(r => {
                const cells = r.map((c, i) => {
                    if (i === r.length - 1 && ['已接收', '未接收', '处理中'].includes(c)) {
                        const cls = c === '已接收' ? 'status-completed' : c === '未接收' ? 'status-pending' : 'status-processing';
                        return `<td><span class="status-badge ${cls}">${c}</span></td>`;
                    }
                    return `<td>${c}</td>`;
                });
                return `<tr>${cells.join('')}</tr>`;
            }).join('');
        }
        const p = document.getElementById('law-push-pager');
        if (p) {
            const t = this._panoTotal, cur = this._panoPage, last = this._panoPages;
            p.innerHTML = `
            <div class="trend-pager-bar" style="margin-top:6px;">
                <span class="trend-pager-info">共 <b>${t}</b> 条 / 每页 <b>${this._panoPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
                <div class="trend-pager-btns">
                    <button class="trend-pager-btn ${cur<=1?'disabled':''}"
                            onclick="window.lawPage._switchLawPushPage(-1)">上一页</button>
                    <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                    <button class="trend-pager-btn ${cur>=last?'disabled':''}"
                            onclick="window.lawPage._switchLawPushPage(1)">下一页</button>
                </div>
            </div>`;
        }
    }

    _initLawPushCharts() {
        const cfg = this._panoCfg;
        if (!cfg) return;
        const leftEl = document.getElementById('law-push-chart-left');
        const rightEl = document.getElementById('law-push-chart-right');
        if (!leftEl || !rightEl) return;

        const ch1 = echarts.init(leftEl);
        ch1.setOption({
            textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
            tooltip: { trigger: 'axis', axisPointer: { type: 'line' } },
            grid: { left: '4%', right: '4%', top: '10%', bottom: '18%', containLabel: true },
            xAxis: {
                type: 'category',
                data: cfg.chart1Data.x,
                axisLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 11, interval: 0, rotate: 28 },
                axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } }
            },
            yAxis: {
                type: 'value',
                nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                splitLine: { lineStyle: { color: 'rgba(0,180,255,0.08)' } }
            },
            series: [{
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                data: cfg.chart1Data.y,
                lineStyle: { color: '#00d4ff', width: 2 },
                itemStyle: { color: '#00d4ff', borderColor: '#fff', borderWidth: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0,212,255,0.3)' },
                        { offset: 1, color: 'rgba(0,212,255,0.05)' }
                    ])
                },
                label: { show: false }
            }]
        });

        const ch2 = echarts.init(rightEl);
        ch2.setOption({
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
                data: cfg.chart2Data
            }]
        });

        window.addEventListener('resize', () => {
            try { ch1.resize(); } catch(e) {}
            try { ch2.resize(); } catch(e) {}
        });
    }

    show() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = '';
        setTimeout(() => {
            Object.values(this.charts).forEach(chart => {
                try { chart.resize(); } catch (e) { }
            });
        }, 150);
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }

    // ==================== 新增：执法页面4个趋势弹窗（执法事项/办件/线索受理/推送信用） ====================
    openLawTrendModal(type) {
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';

        const months = ['25年8月','25年9月','25年10月','25年11月','25年12月','26年1月','26年2月','26年3月','26年4月','26年5月','26年6月','26年7月'];

        switch(type) {
            case 'lw_enforce_item': {
                const curYear  = [78, 80, 82, 85, 88, 86, 88, 90, 92, 94, 97, 99];
                const lastYear = [72, 74, 76, 78, 80, 82, 84, 85, 87, 89, 91, 93];
                overlay.innerHTML = this.renderLawTrend({
                    title: '执法事项总量趋势分析',
                    kpis: [
                        { label: '执法事项总数', value: '99',  suffix: '项' },
                        { label: '去年同期',     value: '93',  suffix: '项' },
                        { label: '同比增加',     value: '6',   suffix: '项' },
                        { label: '同比上升',     value: '6.5', suffix: '%', highlight: 'up' }
                    ],
                    leftTitle: '近12个月执法事项趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '项' },
                    rightTitle: '执法事项类型分布',
                    rightPie: [
                        { value: 42, name: '行政处罚', itemStyle: { color: '#ff7f50' } },
                        { value: 28, name: '行政强制', itemStyle: { color: '#e53935' } },
                        { value: 29, name: '行政检查', itemStyle: { color: '#4a9eff' } }
                    ],
                    tableTitle: '执法事项明细列表',
                    tableHeader: ['事项编码','事项名称','所属部门'],
                    tableRows: [
                        ['ZF-SX-0001','无照经营行政处罚','海南省市场监管局'],
                        ['ZF-SX-0002','销售不合格产品处罚','海南省市场监管局'],
                        ['ZF-SX-0003','超标排放污染物处罚','海南省生态环境厅'],
                        ['ZF-SX-0004','违法建设强制拆除','海南省综合执法局'],
                        ['ZF-SX-0005','食品安全日常检查','海南省市场监管局'],
                        ['ZF-SX-0006','占道经营行政处罚','海口市综合执法局'],
                        ['ZF-SX-0007','道路运输违法处罚','海南省交通厅'],
                        ['ZF-SX-0008','虚假广告宣传处罚','海南省市场监管局'],
                        ['ZF-SX-0009','危化品安全检查','海南省应急管理厅'],
                        ['ZF-SX-0010','非法采砂行政强制','海南省水务厅'],
                        ['ZF-SX-0011','违规行医行政处罚','海南省卫健委'],
                        ['ZF-SX-0012','产品质量专项检查','海南省市场监管局']
                    ]
                });
                break;
            }
            case 'lw_enforce_case': {
                const curYear  = [88, 92, 90, 95, 98, 95, 97, 100, 102, 99, 99, 99];
                const lastYear = [94, 98, 96, 101, 104, 102, 103, 106, 108, 106, 105, 106];
                overlay.innerHTML = this.renderLawTrend({
                    title: '执法办件总量趋势分析',
                    kpis: [
                        { label: '执法办件总数', value: '99',  suffix: '件' },
                        { label: '去年同期',     value: '106', suffix: '件' },
                        { label: '同比减少',     value: '7',   suffix: '件' },
                        { label: '同比下降',     value: '6.6', suffix: '%', highlight: 'down' }
                    ],
                    leftTitle: '近12个月执法办件趋势（今年 vs 去年同月）',
                    leftType: 'compareLine',
                    leftCompare: { months, curYear, lastYear, unit: '件' },
                    rightTitle: '案件类型分布',
                    rightPie: [
                        { value: 42, name: '行政处罚', itemStyle: { color: '#ff7f50' } },
                        { value: 25, name: '行政强制', itemStyle: { color: '#e53935' } },
                        { value: 32, name: '行政检查', itemStyle: { color: '#4a9eff' } }
                    ],
                    tableTitle: '执法办件明细列表',
                    tableHeader: ['案件编码','当事人名称','执法事项','执法部门','立案时间'],
                    tableRows: [
                        ['ZF-AJ-2026-07099','海口XX贸易有限公司','无照经营行政处罚','海口市市场监管局','2026-07-12 09:30'],
                        ['ZF-AJ-2026-07098','儋州XX食品厂','销售不合格产品处罚','儋州市综合执法局','2026-07-11 16:52'],
                        ['ZF-AJ-2026-07097','昌江XX水泥厂','超标排放污染物处罚','海南省生态环境厅','2026-07-11 14:08'],
                        ['ZF-AJ-2026-07096','临高XX建筑工程','违法建设强制拆除','临高县综合执法局','2026-07-11 10:18'],
                        ['ZF-AJ-2026-07095','三亚XX餐饮管理公司','食品安全日常检查','三亚市市场监管局','2026-07-10 17:35'],
                        ['ZF-AJ-2026-07094','文昌XX水产冷冻厂','特种设备安全检查','文昌市市场监管局','2026-07-10 15:02'],
                        ['ZF-AJ-2026-07093','万宁XX娱乐城','占道经营行政处罚','万宁市综合执法局','2026-07-10 11:48'],
                        ['ZF-AJ-2026-07092','东方XX加油站','道路运输违法处罚','东方市交通局','2026-07-09 16:25'],
                        ['ZF-AJ-2026-07091','澄迈XX广告公司','虚假广告宣传处罚','澄迈县市场监管局','2026-07-09 14:10'],
                        ['ZF-AJ-2026-07090','五指山XX农资经营部','危化品安全检查','五指山市应急管理局','2026-07-09 09:55'],
                        ['ZF-AJ-2026-07089','屯昌XX食品厂','非法采砂行政强制','屯昌县综合执法局','2026-07-08 17:03'],
                        ['ZF-AJ-2026-07088','白沙XX加工场','违规行医行政处罚','白沙县卫健委','2026-07-08 15:20']
                    ]
                });
                break;
            }
            case 'lw_clue_accept': {
                const curYear  = [6, 7, 7, 8, 9, 8, 8, 10, 10, 9, 10, 99];
                const lastYear = [5, 6, 6, 7, 8, 7, 7, 8, 8, 8, 8, 87];
                overlay.innerHTML = this.renderLawTrend({
                    title: '线索受理总量趋势分析',
                    kpis: [
                        { label: '线索受理总数', value: '99',   suffix: '条' },
                        { label: '去年同期',     value: '87',   suffix: '条' },
                        { label: '同比增加',     value: '12',   suffix: '条' },
                        { label: '同比上升',     value: '13.8', suffix: '%', highlight: 'up' }
                    ],
                    leftTitle: '近12个月线索受理趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '条' },
                    rightTitle: '线索来源分布',
                    rightPie: [
                        { value: 38, name: '日常监管', itemStyle: { color: '#4a9eff' } },
                        { value: 28, name: '投诉举报', itemStyle: { color: '#00c853' } },
                        { value: 18, name: '上级交办', itemStyle: { color: '#ffcc00' } },
                        { value: 15, name: '部门移送', itemStyle: { color: '#ff7f50' } }
                    ],
                    tableTitle: '线索受理明细列表',
                    tableHeader: ['线索编码','当事人名称','线索来源','线索描述','所属部门'],
                    tableRows: [
                        ['XS-2026-07099','海口XX餐饮管理公司','日常监管','涉嫌使用过期食材','海口市市场监管局'],
                        ['XS-2026-07098','三亚XX装饰工程公司','投诉举报','未按合同施工被消费者投诉','三亚市综合执法局'],
                        ['XS-2026-07097','昌江XX水泥厂','部门移送','监测数据显示烟尘排放超标','海南省生态环境厅'],
                        ['XS-2026-07096','儋州XX物流公司','日常监管','车辆超限运输违规行为','儋州市交通局'],
                        ['XS-2026-07095','万宁XX娱乐城','投诉举报','群众举报夜间噪音扰民','万宁市综合执法局'],
                        ['XS-2026-07094','东方XX加油站','上级交办','省级转办涉嫌安全隐患线索','海南省应急管理厅'],
                        ['XS-2026-07093','文昌XX水产冷冻厂','部门移送','特种设备检验发现隐患','海南省市场监管局'],
                        ['XS-2026-07092','五指山XX农资经营部','日常监管','销售假冒伪劣农药嫌疑','五指山市农业农村局'],
                        ['XS-2026-07091','临高XX采砂场','投诉举报','群众举报夜间非法采砂','临高县综合执法局'],
                        ['XS-2026-07090','陵水XX海鲜排档','日常监管','明码标价不规范问题','陵水县市场监管局'],
                        ['XS-2026-07089','澄迈XX贸易公司','上级交办','税务数据异常线索交办','澄迈县税务局'],
                        ['XS-2026-07088','定安XX零售药店','投诉举报','群众反映违规售药','定安县市场监管局']
                    ]
                });
                break;
            }
            case 'lw_penalty_total': {
                const curYear  = [8, 9, 9, 10, 10, 10, 10, 11, 11, 11, 12, 100];
                const lastYear = [9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 108];
                overlay.innerHTML = this.renderLawTrend({
                    title: '行政处罚总数趋势分析',
                    kpis: [
                        { label: '行政处罚总数', value: '100',  suffix: '件' },
                        { label: '去年同期',     value: '108',  suffix: '件' },
                        { label: '同比减少',     value: '8',    suffix: '件' },
                        { label: '同比下降',     value: '7.4',  suffix: '%', highlight: 'down' }
                    ],
                    leftTitle: '近12个月行政处罚趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '件' },
                    rightTitle: '行政处罚类型分布',
                    rightPie: [
                        { value: 45, name: '罚款', itemStyle: { color: '#ff7f50' } },
                        { value: 25, name: '没收违法所得', itemStyle: { color: '#e53935' } },
                        { value: 18, name: '吊销许可证', itemStyle: { color: '#ffaa00' } },
                        { value: 12, name: '责令停产停业', itemStyle: { color: '#4a9eff' } }
                    ],
                    tableTitle: '行政处罚明细列表',
                    tableHeader: ['处罚编号','当事人名称','处罚类型','处罚金额','处罚部门','处罚时间'],
                    tableRows: [
                        ['CF-2026-07099','海口XX贸易有限公司','罚款','5,000元','海口市市场监管局','2026-07-12'],
                        ['CF-2026-07098','儋州XX食品厂','没收违法所得','12,000元','儋州市综合执法局','2026-07-11'],
                        ['CF-2026-07097','昌江XX水泥厂','罚款','20,000元','海南省生态环境厅','2026-07-11'],
                        ['CF-2026-07096','临高XX建筑工程','责令停产停业','-','临高县综合执法局','2026-07-11'],
                        ['CF-2026-07095','三亚XX餐饮管理公司','罚款','3,000元','三亚市市场监管局','2026-07-10'],
                        ['CF-2026-07094','文昌XX水产冷冻厂','吊销许可证','-','文昌市市场监管局','2026-07-10'],
                        ['CF-2026-07093','万宁XX娱乐城','罚款','8,000元','万宁市综合执法局','2026-07-10'],
                        ['CF-2026-07092','东方XX加油站','罚款','15,000元','东方市应急管理局','2026-07-09'],
                        ['CF-2026-07091','澄迈XX广告公司','罚款','6,000元','澄迈县市场监管局','2026-07-09'],
                        ['CF-2026-07090','五指山XX农资经营部','没收违法所得','5,000元','五指山市农业农村局','2026-07-09'],
                        ['CF-2026-07089','屯昌XX食品厂','罚款','10,000元','屯昌县综合执法局','2026-07-08'],
                        ['CF-2026-07088','白沙XX加工场','吊销许可证','-','白沙县市场监管局','2026-07-08']
                    ]
                });
                break;
            }
            case 'lw_major_case_ratio': {
                const curYear  = [3, 4, 4, 3, 5, 4, 4, 5, 4, 5, 5, 9];
                const lastYear = [2, 3, 3, 3, 4, 3, 3, 4, 4, 4, 4, 8];
                overlay.innerHTML = this.renderLawTrend({
                    title: '重大案件占比分析',
                    kpis: [
                        { label: '总案件数',     value: '205',   suffix: '件' },
                        { label: '重大案件数',   value: '9',     suffix: '件' },
                        { label: '一般案件数',   value: '196',   suffix: '件' },
                        { label: '重大案件占比', value: '4.4',   suffix: '%', highlight: 'up' }
                    ],
                    leftTitle: '近12个月重大案件趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '件' },
                    rightTitle: '重大案件类型分布',
                    rightPie: [
                        { value: 3, name: '涉刑案件', itemStyle: { color: '#ff7f50' } },
                        { value: 2, name: '重大安全隐患', itemStyle: { color: '#e53935' } },
                        { value: 2, name: '重大环境污染', itemStyle: { color: '#ffaa00' } },
                        { value: 2, name: '重大经济违法', itemStyle: { color: '#4a9eff' } }
                    ],
                    tableTitle: '重大案件明细列表',
                    tableHeader: ['案件编号','案件名称','所属领域','重大案件类型','认定依据','办理状态'],
                    tableRows: [
                        ['ZD-AJ-2026-0001','海口XX化工厂超标排放','生态环境','重大环境污染','《环境保护法》','办理中'],
                        ['ZD-AJ-2026-0002','三亚XX公司生产销售假药','市场监管','重大经济违法','《药品管理法》','已办结'],
                        ['ZD-AJ-2026-0003','文昌XX工地重大安全事故','住建','重大安全隐患','《安全生产法》','已办结'],
                        ['ZD-AJ-2026-0004','琼海XX企业偷税漏税案','税务','重大经济违法','《税收征管法》','办理中'],
                        ['ZD-AJ-2026-0005','万宁XX食品厂添加有毒有害物质','市场监管','涉刑案件','《食品安全法》','已办结'],
                        ['ZD-AJ-2026-0006','东方XX矿企非法开采','自然资源','涉刑案件','《矿产资源法》','办理中'],
                        ['ZD-AJ-2026-0007','澄迈XX公司重大劳动安全事故','人社','重大安全隐患','《安全生产法》','已办结'],
                        ['ZD-AJ-2026-0008','临高XX企业污染海洋','生态环境','重大环境污染','《海洋环境保护法》','办理中'],
                        ['ZD-AJ-2026-0009','定安XX公司走私普通货物','海关','涉刑案件','《海关法》','已办结']
                    ]
                });
                break;
            }
            case 'lw_credit_push': {
                const curYear  = [7, 8, 8, 9, 10, 9, 9, 11, 10, 9, 9, 99];
                const lastYear = [8, 9, 9, 10, 11, 10, 10, 12, 11, 10, 11, 112];
                overlay.innerHTML = this.renderLawTrend({
                    title: '推送信用总量趋势分析',
                    kpis: [
                        { label: '推送信用总数', value: '99',   suffix: '条' },
                        { label: '去年同期',     value: '112',  suffix: '条' },
                        { label: '同比减少',     value: '13',   suffix: '条' },
                        { label: '同比下降',     value: '11.6', suffix: '%', highlight: 'down' }
                    ],
                    leftTitle: '近12个月推送信用趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '条' },
                    rightTitle: '推送信用类型分布',
                    rightPie: [
                        { value: 30, name: '行政许可', itemStyle: { color: '#4a9eff' } },
                        { value: 40, name: '行政处罚', itemStyle: { color: '#ff7f50' } },
                        { value: 20, name: '信用承诺', itemStyle: { color: '#00c853' } },
                        { value: 9,  name: '其他',     itemStyle: { color: '#af52de' } }
                    ],
                    tableTitle: '推送信用明细列表',
                    tableHeader: ['案件编码','当事人名称','立案时间','处罚结果','执法部门','推送信用时间'],
                    tableRows: [
                        ['ZF-AJ-2026-07099','海口XX贸易有限公司','2026-07-01','罚款5,000元','海口市市场监管局','2026-07-12 10:30'],
                        ['ZF-AJ-2026-07098','儋州XX食品厂','2026-07-02','没收违法所得','儋州市综合执法局','2026-07-11 17:20'],
                        ['ZF-AJ-2026-07097','昌江XX水泥厂','2026-07-02','罚款20,000元','海南省生态环境厅','2026-07-11 15:10'],
                        ['ZF-AJ-2026-07096','临高XX建筑工程','2026-07-03','强制拆除违法建筑','临高县综合执法局','2026-07-11 11:40'],
                        ['ZF-AJ-2026-07095','三亚XX餐饮管理公司','2026-07-03','警告+责令改正','三亚市市场监管局','2026-07-10 18:05'],
                        ['ZF-AJ-2026-07094','文昌XX水产冷冻厂','2026-07-04','特种设备停产整改','文昌市市场监管局','2026-07-10 15:40'],
                        ['ZF-AJ-2026-07093','万宁XX娱乐城','2026-07-04','罚款3,000元','万宁市综合执法局','2026-07-10 12:15'],
                        ['ZF-AJ-2026-07092','东方XX加油站','2026-07-05','暂扣经营许可证','东方市应急管理局','2026-07-09 16:50'],
                        ['ZF-AJ-2026-07091','澄迈XX广告公司','2026-07-05','罚款8,000元','澄迈县市场监管局','2026-07-09 14:28'],
                        ['ZF-AJ-2026-07090','五指山XX农资经营部','2026-07-06','没收假冒产品','五指山市农业农村局','2026-07-09 10:18'],
                        ['ZF-AJ-2026-07089','屯昌XX食品厂','2026-07-06','罚款12,000元','屯昌县综合执法局','2026-07-08 17:45'],
                        ['ZF-AJ-2026-07088','白沙XX加工场','2026-07-07','吊销营业执照','白沙县市场监管局','2026-07-08 15:22']
                    ]
                });
                break;
            }
        }

        document.body.appendChild(overlay);
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', e => { if (e.target === overlay) this.closeModal(); });
        setTimeout(() => this.initLawTrendCharts(type), 80);
    }

    renderLawTrend(cfg) {
        this._lwCfg = cfg;
        this._lwPageSize = 5;
        this._lwPage = 1;
        this._lwTotal = cfg.tableRows.length;
        this._lwPages = Math.max(1, Math.ceil(this._lwTotal / this._lwPageSize));

        const kpisHtml = cfg.kpis.map(k => {
            const cls = k.highlight === 'up' ? 'value-up' : (k.highlight === 'down' ? 'value-down' : '');
            return `<div class="trend-kpi-card pano-kpi-card" style="flex:1;min-height:58px;padding:10px;margin:0;">
                <span class="trend-kpi-label" style="font-size:12px;">${k.label}</span>
                <span class="trend-kpi-value ${cls}" style="font-size:20px;">${k.value}${k.suffix || ''}</span>
            </div>`;
        }).join('');

        return `
        <div class="indicator-modal panorama-modal trend-modal" style="width:92%;max-width:1320px;">
            <div class="indicator-modal-header">
                <span class="indicator-modal-title">${cfg.title}</span>
                <button class="indicator-modal-close">×</button>
            </div>
            <div class="trend-kpi-row" style="display:flex;gap:10px;margin:10px 0 8px;">
                ${kpisHtml}
            </div>
            <div class="trend-charts-row">
                <div class="trend-chart-box trend-chart-main">
                    <div class="trend-chart-title">${cfg.leftTitle}</div>
                    <div id="lw-chart-left" class="trend-chart-container"></div>
                </div>
                <div class="trend-chart-box trend-chart-pie">
                    <div class="trend-chart-title">${cfg.rightTitle}</div>
                    <div id="lw-chart-right" class="trend-chart-container"></div>
                </div>
            </div>
            <div class="trend-table-wrap">
                <div class="trend-table-title">${cfg.tableTitle}</div>
                <div class="trend-table-scroller">
                    <table class="trend-data-table">
                        <thead><tr>${cfg.tableHeader.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                        <tbody id="lw-tbody">${this._renderLwTbody()}</tbody>
                    </table>
                </div>
                <div class="trend-pager-bar" id="lw-pager">${this._renderLwPager()}</div>
            </div>
        </div>`;
    }

    _renderLwTbody() {
        const cfg = this._lwCfg;
        if (!cfg) return '';
        const start = (this._lwPage - 1) * this._lwPageSize;
        const rows = cfg.tableRows.slice(start, start + this._lwPageSize);
        return rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
    }

    _renderLwPager() {
        const t = this._lwTotal, cur = this._lwPage, last = this._lwPages;
        return `
        <div class="trend-pager-bar" style="margin-top:6px;">
            <span class="trend-pager-info">共 <b>${t}</b> 条 / 每页 <b>${this._lwPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
            <div class="trend-pager-btns">
                <button class="trend-pager-btn ${cur<=1?'disabled':''}"
                        onclick="window.lawPage.switchLwPage(-1)">上一页</button>
                <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                <button class="trend-pager-btn ${cur>=last?'disabled':''}"
                        onclick="window.lawPage.switchLwPage(1)">下一页</button>
            </div>
        </div>`;
    }

    switchLwPage(delta) {
        const next = this._lwPage + delta;
        if (next < 1 || next > this._lwPages) return;
        this._lwPage = next;
        const b = document.getElementById('lw-tbody');
        if (b) b.innerHTML = this._renderLwTbody();
        const p = document.getElementById('lw-pager');
        if (p && p.parentNode) {
            const w = document.createElement('div');
            w.innerHTML = this._renderLwPager();
            p.parentNode.replaceChild(w.firstElementChild, p);
        }
    }

    initLawTrendCharts(type) {
        const cfg = this._lwCfg;
        if (!cfg) return;
        const leftEl = document.getElementById('lw-chart-left');
        const rightEl = document.getElementById('lw-chart-right');
        if (!leftEl || !rightEl) return;

        let leftChart;
        if (cfg.leftType === 'compareBar') {
            const d = cfg.leftCompare;
            leftChart = echarts.init(leftEl);
            leftChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                legend: { data: ['今年','去年同期'], top: 0, right: 10, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } },
                grid: { left: '4%', right: '4%', top: '14%', bottom: '18%', containLabel: true },
                xAxis: {
                    type: 'category', data: d.months,
                    axisLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 11, interval: 0, rotate: 28 },
                    axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } }
                },
                yAxis: {
                    type: 'value', name: d.unit || '',
                    nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                    axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                    splitLine: { lineStyle: { color: 'rgba(0,180,255,0.08)' } }
                },
                series: [
                    { name: '今年',     type: 'bar', barWidth: '32%', data: d.curYear,
                      itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[
                            { offset: 0, color: '#4ac3ff' }, { offset: 1, color: '#0066aa' } ]),
                        borderRadius: [4, 4, 0, 0] },
                      label: { show: true, position: 'top', color: 'rgba(255,255,255,0.75)', fontSize: 10 } },
                    { name: '去年同期', type: 'bar', barWidth: '32%', data: d.lastYear,
                      itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[
                            { offset: 0, color: '#ffc16a' }, { offset: 1, color: '#cc6a00' } ]),
                        borderRadius: [4, 4, 0, 0] },
                      label: { show: true, position: 'top', color: 'rgba(255,255,255,0.75)', fontSize: 10 } }
                ]
            });
        } else if (cfg.leftType === 'compareLine') {
            const d = cfg.leftCompare;
            leftChart = echarts.init(leftEl);
            leftChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
                legend: { data: ['今年','去年同期'], top: 0, right: 10, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } },
                grid: { left: '4%', right: '4%', top: '14%', bottom: '18%', containLabel: true },
                xAxis: {
                    type: 'category', data: d.months,
                    axisLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 11, interval: 0, rotate: 28 },
                    axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } }
                },
                yAxis: {
                    type: 'value', name: d.unit || '',
                    nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                    axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                    splitLine: { lineStyle: { color: 'rgba(0,180,255,0.08)' } }
                },
                series: [
                    { name: '今年', type: 'line', smooth: true, symbol: 'circle', symbolSize: 7,
                      data: d.curYear,
                      lineStyle: { color: '#00d4ff', width: 3 }, itemStyle: { color: '#00d4ff' },
                      areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[
                            { offset: 0, color: 'rgba(0,212,255,0.35)' },
                            { offset: 1, color: 'rgba(0,212,255,0.02)' } ]) },
                      label: { show: true, color: 'rgba(255,255,255,0.78)', fontSize: 10 } },
                    { name: '去年同期', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
                      data: d.lastYear,
                      lineStyle: { color: '#ff9500', width: 2, type: 'dashed' }, itemStyle: { color: '#ff9500' },
                      label: { show: true, color: 'rgba(255,255,255,0.78)', fontSize: 10 } }
                ]
            });
        }

        const rightChart = echarts.init(rightEl);
        rightChart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                orient: 'vertical', right: '2%', top: 'middle',
                textStyle: { color: 'rgba(255,255,255,0.75)', fontSize: 11 },
                itemWidth: 10, itemHeight: 10
            },
            series: [{
                type: 'pie',
                radius: ['42%', '70%'],
                center: ['36%', '50%'],
                itemStyle: { borderRadius: 3, borderColor: 'rgba(5,13,24,0.9)', borderWidth: 2 },
                label: { show: false },
                labelLine: { show: false },
                data: cfg.rightPie
            }]
        });

        const handler = () => { try { leftChart && leftChart.resize(); rightChart.resize(); } catch(e) {} };
        window.addEventListener('resize', handler);
        leftEl._lwResizer = handler;
    }
};