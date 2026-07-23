window.SupervisionPage = class SupervisionPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        this.svModalData = [];
        this.svCurrentPage = 1;
        this.svCurrentModal = 0;
        this.pageSize = 5;
        this.topBehaviorTab = 'month';
        this.topProblemTab = 'month';
        window.supervisionPage = this;
        this.render();
        this.ensureChartHeights();
        this.bindEvents();
        this.bindTopTabEvents();
        setTimeout(() => this.initCharts(), 300);
    }

    ensureChartHeights() {
        const pieEl = document.getElementById('supervision-pie');
        const barEl = document.getElementById('supervision-matter-bar');
        if (pieEl) pieEl.style.height = '185px';
        if (barEl) barEl.style.height = '165px';
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container animate-slide-in supervision-layout">
                <div class="supervision-content">
                    <div class="col-left">
                        <div class="card-section sv-left-card sv-matter-card" onclick="window.supervisionPage.openModal('sv_matter')" style="cursor:pointer;">
                            <h3 class="card-title">·监管事项</h3>
                            <div class="sv-matter-wrap">
                                <div id="supervision-pie" class="sv-matter-pie"></div>
                            </div>
                            <div class="sv-matter-lists">
                                <div class="sv-matter-list">
                                    <div class="sv-matter-list-title">未覆盖事项</div>
                                    <div class="sv-matter-list-table-wrap">
                                        <table class="sv-matter-list-table">
                                            <thead>
                                                <tr>
                                                    <th>事项名称</th>
                                                    <th>所属部门</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>食品生产许可审查</td><td>市场监管局</td></tr>
                                                <tr><td>药品经营许可审批</td><td>药监局</td></tr>
                                                <tr><td>医疗器械备案</td><td>药监局</td></tr>
                                                <tr><td>特种设备使用登记</td><td>市场监管局</td></tr>
                                                <tr><td>危险化学品经营许可</td><td>应急管理局</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-section sv-left-card">
                            <h3 class="card-title">·新型监管</h3>
                            <div class="new-supervision">
                                <div class="new-supervision-card" onclick="window.supervisionPage.openNewSupervisionModal('sandbox')" style="cursor: pointer;">
                                    <div class="new-supervision-card-title">沙盒监管</div>
                                    <div class="new-supervision-card-items">
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('lecheng')" style="cursor: pointer;">乐城医疗器械试点</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('nfan')" style="cursor: pointer;">南繁育种试点</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('data_cross')" style="cursor: pointer;">数据跨境流动试点</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('ocean_drug')" style="cursor: pointer;">海洋药物试点</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('commercial_space')" style="cursor: pointer;">商业航天试点</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('deep_sea')" style="cursor: pointer;">深海技术试点</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('offshore_finance')" style="cursor: pointer;">离岸金融业务试点</span>
                                    </div>
                                </div>
                                <div class="new-supervision-card" onclick="window.supervisionPage.openNewSupervisionModal('offsite')" style="cursor: pointer;">
                                    <div class="new-supervision-card-title">非现场监管</div>
                                    <div class="new-supervision-card-items">
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('bright_kitchen')" style="cursor: pointer;">明厨亮灶</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('sand_theft')" style="cursor: pointer;">盗采河沙</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('muck_transport')" style="cursor: pointer;">渣土清运</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('street_vending')" style="cursor: pointer;">沿街摆摊</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('smart_construction')" style="cursor: pointer;">智慧工地</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('straw_burning')" style="cursor: pointer;">秸秆焚烧</span>
                                    </div>
                                </div>
                                <div class="new-supervision-card" onclick="window.supervisionPage.openNewSupervisionModal('trigger')" style="cursor: pointer;">
                                    <div class="new-supervision-card-title">触发式监管</div>
                                    <div class="new-supervision-card-items">
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('risk_warning')" style="cursor: pointer;">风险预警</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('network_opinion')" style="cursor: pointer;">网络舆情</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-center">
                        <div class="card-section map-card">
                            
                            <div class="today-approval-row">
                            <div class="today-approval-item cp-clickable" onclick="window.supervisionPage.openModal('sv_check_case')">
                                    <span class="today-approval-label">检查企次总数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">900</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓12%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" onclick="window.supervisionPage.openModal('sv_check_item')">
                                    <span class="today-approval-label">检查事项数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">1610</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑6.5%</span>
                                    </div>
                                </div>
                                
                                <div class="today-approval-item cp-clickable" onclick="window.supervisionPage.openModal('sv_problem_count')">
                                    <span class="today-approval-label">发现问题数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">383</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑8%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" onclick="window.supervisionPage.openModal('sv_clue_transfer')">
                                    <span class="today-approval-label">违法线索移送数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">339</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑11%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" onclick="window.supervisionPage.openModal('sv_check_reduce')">
                                    <span class="today-approval-label">上门检查次数减少率</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">73%</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓2.8%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" onclick="window.supervisionPage.openBrightCodeModal()">
                                    <span class="today-approval-label">亮码比例</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">89%</span>
                                        <span class="today-approval-change" style="color:#34c759;">↑3%</span>
                                    </div>
                                </div>
                            </div>
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
                                    <div class="top10-header-row">
                                        <h4 class="top10-section-title">监管行为TOP8</h4>
                                        <div class="top-tab-group" data-top-group="behavior">
                                            <button class="top-tab-btn active" data-tab="year">本年</button>
                                            <button class="top-tab-btn" data-tab="month">本月</button>
                                        </div>
                                    </div>
                                    <div class="top10-list" id="top-behavior-list">
                                    <table class="top10-table"><thead><tr><th>事项名称</th><th>次数</th></tr></thead>
                                    <tbody>
                                        <tr><td>食品安全日常检查</td><td>984</td></tr><tr><td>特种设备安全监察</td><td>871</td></tr><tr><td>药品经营质量管理检查</td><td>764</td></tr><tr><td>市场主体登记事项核查</td><td>687</td></tr><tr><td>产品质量监督抽查</td><td>542</td></tr><tr><td>计量器具强制检定</td><td>437</td></tr><tr><td>广告发布内容审查</td><td>328</td></tr><tr><td>网络交易平台监管</td><td>215</td></tr>
                                    </tbody></table>
                                    </div>
                                </div>
                                <div class="top10-section">
                                    <div class="top10-header-row">
                                        <h4 class="top10-section-title">检出问题领域TOP8</h4>
                                        <div class="top-tab-group" data-top-group="problem">
                                            <button class="top-tab-btn active" data-tab="year">本年</button>
                                            <button class="top-tab-btn" data-tab="month">本月</button>
                                        </div>
                                    </div>
                                    <div class="top10-list" id="top-problem-list">
                                    <table class="top10-table"><thead><tr><th>领域</th><th>问题数</th></tr></thead>
                                    <tbody>
                                        <tr><td>消防安全</td><td>36</td></tr><tr><td>交通运输</td><td>25</td></tr><tr><td>安全生产</td><td>21</td></tr><tr><td>环境保护</td><td>19</td></tr><tr><td>医疗器械</td><td>14</td></tr><tr><td>特种设备</td><td>11</td></tr><tr><td>网络交易</td><td>8</td></tr><tr><td>广告监管</td><td>6</td></tr>
                                    </tbody></table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-right">
                        <div class="card-section">
                            <h3 class="card-title">监管行为</h3>
                            <div class="action-section">
                                <h4 class="action-title sv-clickable" data-sv-modal="6">检查行为总数 <span class="action-title-value">2456</span></h4>
                                <div class="action-group">
                                    <h5 class="action-sub-title">(1) 计划类行为</h5>
                                    <div class="action-card sv-clickable" data-sv-modal="7">
                                        <div class="action-card-title">单部门双随机</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">制定计划</span><span class="action-indicator-value">1256</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">1156</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">89</span></div>
                                        </div>
                                    </div>
                                    <div class="action-card sv-clickable" data-sv-modal="8">
                                        <div class="action-card-title">重点检查</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">制定计划</span><span class="action-indicator-value">523</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">489</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">67</span></div>
                                        </div>
                                    </div>
                                    <div class="action-card sv-clickable" data-sv-modal="9">
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
                                    <div class="action-card sv-clickable" data-sv-modal="10">
                                        <div class="action-card-title">有因检查</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">456</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">78</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="action-group">
                                    <h5 class="action-sub-title">(3) 集成类行为</h5>
                                    <div class="action-card sv-clickable" data-sv-modal="11">
                                        <div class="action-card-title">综合查一次</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">计划撮合</span><span class="action-indicator-value">234</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">检查</span><span class="action-indicator-value">212</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">违法线索移送</span><span class="action-indicator-value">34</span></div>
                                        </div>
                                    </div>
                                    <div class="action-card sv-clickable" data-sv-modal="12">
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
                                <h4 class="action-title sv-clickable" data-sv-modal="13">核查行为总数 <span class="action-title-value">835</span></h4>
                                <div class="action-group">
                                    <div class="action-card sv-clickable" data-sv-modal="14">
                                        <div class="action-card-title">告知承诺制</div>
                                        <div class="action-card-body">
                                            <div class="action-indicator"><span class="action-indicator-label">任务</span><span class="action-indicator-value">523</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">完成率</span><span class="action-indicator-value">98%</span></div>
                                            <div class="action-indicator"><span class="action-indicator-label">问题检出率</span><span class="action-indicator-value">5%</span></div>
                                            <div class="action-indicator"><span class="action-indicator-value trend-up">↑ 2%</span></div>
                                        </div>
                                    </div>
                                    <div class="action-card sv-clickable" data-sv-modal="15">
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
                        <div class="card-section dataflow-card">
                            <div class="card-title-row">
                                <h3 class="card-title">数据流转情况</h3>
                                <div class="dataflow-tabs-inline">
                                    <button class="dataflow-tab active" data-tab="platform">平台流转</button>
                                    <button class="dataflow-tab" data-tab="category">数据分类</button>
                                </div>
                            </div>
                            <div id="dataflow-platform" class="dataflow-content">
                                <div class="dataflow-flow-chart" id="sv-dataflow-flow-chart"></div>
                            </div>
                            <div id="dataflow-category" class="dataflow-content dataflow-content-hidden">
                                <div class="dataflow-stats">
                                    <div class="dataflow-stat-item" onclick="event.stopPropagation();window.supervisionPage.openPushDataModal()" style="cursor: pointer;">
                                        <div class="dataflow-label-row">
                                            <span class="dataflow-label">推送数据</span>
                                            <div class="dataflow-value-box">
                                                <span class="dataflow-value">7.5</span>
                                                <span class="dataflow-unit">万条</span>
                                            </div>
                                        </div>
                                        <div id="sv-push-pie" class="chart-container pie-container mini-pie"></div>
                                    </div>
                                    <div class="dataflow-stat-item" onclick="event.stopPropagation();window.supervisionPage.openReceiveDataModal()" style="cursor: pointer;">
                                        <div class="dataflow-label-row">
                                            <span class="dataflow-label">收到数据</span>
                                            <div class="dataflow-value-box">
                                                <span class="dataflow-value">5.2</span>
                                                <span class="dataflow-unit">万条</span>
                                            </div>
                                        </div>
                                        <div id="sv-receive-pie" class="chart-container pie-container mini-pie"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const target = e.target.closest('[data-sv-modal]');
            if (target) {
                const modalId = parseInt(target.dataset.svModal);
                if (modalId >= 1 && modalId <= 15) {
                    this['openSvModal' + modalId]();
                }
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
                if (this.charts.svPushPie) this.charts.svPushPie.resize();
                if (this.charts.svReceivePie) this.charts.svReceivePie.resize();
            }, 100);
        }
    }

    renderDataflowFlowChart() {
        const container = document.getElementById('sv-dataflow-flow-chart');
        if (!container) return;
        container.innerHTML = `
            <div class="dataflow-image-container">
                <img src="监管-数据流转.png" alt="数据流转" class="dataflow-flow-image">
            </div>
        `;
    }

    openNewSupervisionModal(type) {
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        
        switch(type) {
            case 'sandbox':
                overlay.innerHTML = this.renderSandboxSupervisionModal();
                break;
            case 'offsite':
                overlay.innerHTML = this.renderOffsiteSupervisionModal();
                break;
            case 'trigger':
                overlay.innerHTML = this.renderTriggerSupervisionModal();
                break;
            case 'lecheng':
                overlay.innerHTML = this.renderLechengMedicalModal();
                break;
            case 'nfan':
                overlay.innerHTML = this.renderNfanBreedingModal();
                break;
            case 'bright_kitchen':
                overlay.innerHTML = this.renderBrightKitchenModal();
                break;
            case 'sand_theft':
                overlay.innerHTML = this.renderSandTheftModal();
                break;
            case 'muck_transport':
                overlay.innerHTML = this.renderMuckTransportModal();
                break;
            case 'street_vending':
                overlay.innerHTML = this.renderStreetVendingModal();
                break;
            case 'smart_construction':
                overlay.innerHTML = this.renderSmartConstructionModal();
                break;
            case 'straw_burning':
                overlay.innerHTML = this.renderStrawBurningModal();
                break;
            case 'data_cross':
                overlay.innerHTML = this.renderDataCrossModal();
                break;
            case 'ocean_drug':
                overlay.innerHTML = this.renderOceanDrugModal();
                break;
            case 'commercial_space':
                overlay.innerHTML = this.renderCommercialSpaceModal();
                break;
            case 'deep_sea':
                overlay.innerHTML = this.renderDeepSeaModal();
                break;
            case 'offshore_finance':
                overlay.innerHTML = this.renderOffshoreFinanceModal();
                break;
            case 'risk_warning':
                overlay.innerHTML = this.renderRiskWarningModal();
                break;
            case 'network_opinion':
                overlay.innerHTML = this.renderNetworkPublicOpinionModal();
                break;
        }
        
        document.body.appendChild(overlay);
        
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => {
            overlay.remove();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
        
        this.initNewSupervisionCharts(type);
    }

    initNewSupervisionCharts(type) {
        setTimeout(() => {
            switch(type) {
                case 'sandbox':
                    this.initSandboxSupervisionCharts();
                    break;
                case 'offsite':
                    this.initOffsiteSupervisionCharts();
                    break;
                case 'trigger':
                    this.initTriggerSupervisionCharts();
                    break;
                case 'lecheng':
                    this.initLechengMedicalCharts();
                    break;
                case 'nfan':
                    this.initNfanBreedingCharts();
                    break;
                case 'bright_kitchen':
                    this.initBrightKitchenCharts();
                    break;
                case 'sand_theft':
                    this.initSandTheftCharts();
                    break;
                case 'muck_transport':
                    this.initMuckTransportCharts();
                    break;
                case 'street_vending':
                    this.initStreetVendingCharts();
                    break;
                case 'smart_construction':
                    this.initSmartConstructionCharts();
                    break;
                case 'straw_burning':
                    this.initStrawBurningCharts();
                    break;
                case 'data_cross':
                    this.initDataCrossCharts();
                    break;
                case 'ocean_drug':
                    this.initOceanDrugCharts();
                    break;
                case 'commercial_space':
                    this.initCommercialSpaceCharts();
                    break;
                case 'deep_sea':
                    this.initDeepSeaCharts();
                    break;
                case 'offshore_finance':
                    this.initOffshoreFinanceCharts();
                    break;
                case 'risk_warning':
                    this.initRiskWarningCharts();
                    break;
                case 'network_opinion':
                    this.initNetworkPublicOpinionCharts();
                    break;
            }
        }, 100);
    }

    openPlanDetail(planName, target) {
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay sv-theme-default';
        overlay.innerHTML = this.renderPlanDetailModal(planName, target);
        document.body.appendChild(overlay);
        
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => {
            overlay.remove();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    renderPlanDetailModal(planName, target) {
        return `
            <div class="rv-modal" style="width: 60%; max-width: 800px;">
                <div class="rv-modal-header">
                    <span class="rv-modal-title">计划详情 - ${planName}</span>
                    <button class="rv-modal-close">×</button>
                </div>
                <div style="padding: 15px; overflow-y: auto; max-height: 70vh;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                        <div style="background: rgba(0,212,255,0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(0,212,255,0.2);">
                            <div style="color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 4px;">计划名称</div>
                            <div style="color: rgba(255,255,255,0.9); font-size: 14px;">${planName}</div>
                        </div>
                        <div style="background: rgba(0,212,255,0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(0,212,255,0.2);">
                            <div style="color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 4px;">检查对象</div>
                            <div style="color: rgba(255,255,255,0.9); font-size: 14px;">${target || '未指定'}</div>
                        </div>
                        <div style="background: rgba(0,212,255,0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(0,212,255,0.2);">
                            <div style="color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 4px;">制定部门</div>
                            <div style="color: rgba(255,255,255,0.9); font-size: 14px;">海南省市场监督管理局</div>
                        </div>
                        <div style="background: rgba(0,212,255,0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(0,212,255,0.2);">
                            <div style="color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 4px;">制定日期</div>
                            <div style="color: rgba(255,255,255,0.9); font-size: 14px;">2026-01-15</div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(0,212,255,0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(0,212,255,0.2); margin-bottom: 20px;">
                        <div style="color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 4px;">检查事项</div>
                        <div style="color: rgba(255,255,255,0.9); font-size: 13px; line-height: 1.6;">
                            1. 营业执照、许可证有效期及经营范围核查；<br>
                            2. 经营场所与注册地址一致性检查；<br>
                            3. 安全生产管理制度落实情况检查；<br>
                            4. 从业人员资质证书核查；<br>
                            5. 进销货台账及票据完整性检查。
                        </div>
                    </div>
                    
                    <div style="background: rgba(0,212,255,0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(0,212,255,0.2); margin-bottom: 20px;">
                        <div style="color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 4px;">计划状态</div>
                        <div style="color: rgba(255,255,255,0.9); font-size: 13px;">已完成</div>
                    </div>
                    
                    <div style="background: rgba(0,212,255,0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(0,212,255,0.2);">
                        <div style="color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 8px;">执行记录</div>
                        <table class="rv-table" style="font-size: 12px;">
                            <thead>
                                <tr>
                                    <th>执行日期</th>
                                    <th>执行人员</th>
                                    <th>执行结果</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>2026-02-10</td><td>张三、李四</td><td>合格</td><td>未发现问题</td></tr>
                                <tr><td>2026-03-15</td><td>王五、赵六</td><td>责令整改</td><td>发现轻微违规，已整改完毕</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // ============ HELPER METHODS ============
    _svColor(idx) {
        const colors = ['#00d4ff', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5856d6', '#ffd54f', '#2196f3'];
        return colors[idx % colors.length];
    }

    _svTheme(m) {
        const map = {1:'default',2:'green',3:'orange',4:'default',5:'green',6:'default',7:'default',8:'orange',9:'purple',10:'red',11:'default',12:'green',13:'orange',14:'default'};
        return map[m] || 'default';
    }

    _svTitle(m) {
        const map = {
            1:'实有市场主体全景分析', 2:'新设市场主体活力分析', 3:'注(吊)销市场主体分析',
            4:'主体合规率分析', 5:'信用等级分布分析', 6:'检查行为总览',
            7:'单部门双随机检查分析', 8:'重点检查分析', 9:'专项检查分析',
            10:'有因检查分析', 11:'综合查一次分析', 12:'跨部门双随机分析',
            13:'核查行为总览', 14:'告知承诺制核查分析', 15:'承诺即入制核查分析'
        };
        return map[m] || '';
    }

    _svClose(overlay) {
        const ids = ['svc1','svc2','svc3','svc4','svc5','svc6','svc7','svc8','svc9','svc10','svc11','svc12','svc13','svc14','svc15',
                      'svc1b','svc2b','svc3b','svc4b','svc5b','svc6b','svc7b','svc8b','svc9b','svc10b','svc11b','svc12b','svc13b','svc14b','svc15b'];
        ids.forEach(id => { try { const d = document.getElementById(id); if (d) { const inst = echarts.getInstanceByDom(d); if (inst) inst.dispose(); } } catch(e) {} });
        if (overlay) overlay.remove();
        this.svCurrentModal = 0;
        this.svCurrentPage = 1;
    }

    _svBindPages(overlay) {
        const prev = overlay.querySelector('.sv-page-prev');
        const next = overlay.querySelector('.sv-page-next');
        if (prev) prev.addEventListener('click', () => { if (this.svCurrentPage > 1) { this.svCurrentPage--; this._svUpdate(overlay); } });
        if (next) next.addEventListener('click', () => {
            const total = Math.ceil(this.svModalData.length / this.pageSize);
            if (this.svCurrentPage < total) { this.svCurrentPage++; this._svUpdate(overlay); }
        });
    }

    _svUpdate(overlay) {
        const m = this.svCurrentModal;
        if (m < 1 || m > 14) return;
        overlay.innerHTML = this['_svHtml' + m]();
        this._svBindPages(overlay);
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this._svClose(overlay));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this._svClose(overlay); });
        requestAnimationFrame(() => { requestAnimationFrame(() => { setTimeout(() => { this['_svChart' + m](); }, 200); }); });
    }

    _svOpen(m, data) {
        this.svCurrentPage = 1;
        this.svCurrentModal = m;
        this.svModalData = data;
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay sv-theme-' + this._svTheme(m);
        overlay.innerHTML = this['_svHtml' + m]();
        document.body.appendChild(overlay);
        this._svBindPages(overlay);
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this._svClose(overlay));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this._svClose(overlay); });
        requestAnimationFrame(() => { requestAnimationFrame(() => { setTimeout(() => { this['_svChart' + m](); }, 200); }); });
    }

    _svRenderCard(label, value, cls) {
        return `<div class="rv-stat-card"><span class="rv-stat-label">${label}</span><span class="rv-stat-value${cls ? ' ' + cls : ''}">${value}</span></div>`;
    }

    _svRenderTable(cols, keys, data, clickableColumn) {
        return `<table class="rv-table"><thead><tr>${cols.map(c => '<th>' + c + '</th>').join('')}</tr></thead><tbody>${data.map(item => '<tr>' + keys.map(k => {
            const value = item[k] || '';
            if (clickableColumn === k) {
                if (k === 'planName') {
                    return `<td><span class="rv-clickable-cell" style="cursor: pointer; color: #00d4ff;" onclick="window.supervisionPage.openPlanDetail('${value}', '${item.target || ''}')">${value}</span></td>`;
                } else if (k === 'name') {
                    return `<td><span class="rv-clickable-cell" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${value}', '${item.uscc || ''}', '${item.industry || ''}')">${value}</span></td>`;
                }
            }
            return '<td>' + value + '</td>';
        }).join('') + '</tr>').join('')}</tbody></table>`;
    }

    _svPageInfo() {
        const total = Math.ceil(this.svModalData.length / this.pageSize);
        return `<span class="rv-page-info">第 ${this.svCurrentPage} / ${total} 页（共 ${this.svModalData.length} 条）</span>`;
    }

    _svChartsWrap(leftId, leftTitle, rightId, rightTitle, leftFlex, rightFlex) {
        return `<div class="rv-charts"><div class="rv-chart-left" style="flex:${leftFlex||5}"><div class="rv-chart-item"><span class="rv-chart-title">${leftTitle}</span><div id="${leftId}" class="rv-chart-container"></div></div></div><div class="rv-chart-right" style="flex:${rightFlex||5}"><div class="rv-chart-item"><span class="rv-chart-title">${rightTitle}</span><div id="${rightId}" class="rv-chart-container"></div></div></div></div>`;
    }

    _svInitChart(domId) {
        const dom = document.getElementById(domId);
        if (!dom) return null;
        dom.style.width = '100%'; dom.style.height = '220px'; dom.style.minHeight = '220px';
        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) { setTimeout(() => this._svInitChart(domId), 200); return null; }
        const existing = echarts.getInstanceByDom(dom);
        if (existing) existing.dispose();
        const chart = echarts.init(dom);
        const ro = new ResizeObserver(() => chart.resize());
        ro.observe(dom);
        return chart;
    }

    _svMonthLabels(n) {
        const now = new Date();
        const labels = [];
        for (let i = n - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            labels.push((d.getFullYear() % 100) + '/' + (d.getMonth() + 1));
        }
        return labels;
    }

    // ============ MODAL 1: 实有市场主体全景分析 ============
    genSv1Data() {
        const data = [];
        const areas = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市', '五指山市', '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙县', '昌江县', '乐东县', '陵水县', '保亭县', '琼中县'];
        const baseTotals = [85.5, 62.3, 48.2, 35.8, 32.1, 28.6, 8.5, 25.3, 15.2, 12.1, 38.9, 18.7, 6.2, 14.5, 22.8, 16.5, 5.8, 8.2];
        for (let i = 1; i <= 40; i++) {
            const base = baseTotals[i % baseTotals.length];
            data.push({
                areaName: areas[i % areas.length],
                total: (base + Math.random() * 2 - 1).toFixed(1),
                yoyGrowth: ((Math.random() * 6 - 1)).toFixed(1),
                momGrowth: ((Math.random() * 4 - 1)).toFixed(1)
            });
        }
        return data;
    }
    openSvModal1() { this._svOpen(1, this.genSv1Data()); }
    _svHtml1() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(1)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('实有市场主体总数','700.12万户')}${this._svRenderCard('同比增长','+1.2%','sv-stat-highlight')}${this._svRenderCard('环比上月','+0.3%')}${this._svRenderCard('新增本年累计','8,956户')}</div>
            ${this._svChartsWrap('svc1','近12个月实有市场主体趋势','svc1b','市场主体类型分布',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','区域/行业名称','市场主体总数(万户)','同比增长(%)','环比增长(%)'],['idx','areaName','total','yoyGrowth','momGrowth'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})))}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart1() {
        const c = this._svInitChart('svc1'); if (!c) return;
        const months = this._svMonthLabels(12);
        const vals = [695.2,696.5,697.7,698.2,698.8,699.1,699.4,699.6,699.8,699.9,700.05,700.12];
        c.setOption({ tooltip:{trigger:'axis'}, grid:{left:'3%',right:'4%',bottom:'3%',top:'10%',containLabel:true}, xAxis:{type:'category',data:months,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}}}, yAxis:{type:'value',name:'万户',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:11},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'line',data:vals,smooth:true,areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(0,212,255,0.3)'},{offset:1,color:'rgba(0,212,255,0.02)'}]}},lineStyle:{color:'#00d4ff',width:2},itemStyle:{color:'#00d4ff'},label:{show:true,color:'rgba(255,255,255,0.7)',fontSize:10,formatter:'{c}'}}] });
        const cb = this._svInitChart('svc1b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},emphasis:{label:{show:true,fontSize:12}},data:[{value:45,name:'企业',itemStyle:{color:'#00d4ff'}},{value:40,name:'个体工商户',itemStyle:{color:'#34c759'}},{value:10,name:'农民专业合作社',itemStyle:{color:'#ff9500'}},{value:5,name:'其他',itemStyle:{color:'#af52de'}}]}] });
    }

    // ============ MODAL 2: 新设市场主体活力分析 ============
    genSv2Data() {
        const data = [];
        const types = ['企业', '个体工商户', '农专社'];
        const industries = ['批发零售', '餐饮住宿', '信息技术', '建筑', '制造', '交通运输', '金融', '教育', '医疗', '其他'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ name:'市场'+(2000+i), uscc:'91460000MA5T'+String(100000+i).slice(1), type:types[i%3], establishDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), industry:industries[i%10] });
        }
        return data;
    }
    openSvModal2() { this._svOpen(2, this.genSv2Data()); }
    _svHtml2() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(2)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('新设市场主体总数','8,956户')}${this._svRenderCard('同比增长','+1.5%','sv-stat-highlight')}${this._svRenderCard('环比上月','+0.8%')}${this._svRenderCard('本年累计新设','8,956户')}</div>
            ${this._svChartsWrap('svc2','近12个月新设市场主体趋势','svc2b','新设市场主体行业分布TOP5',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','市场主体名称','统一社会信用代码','类型','新设日期','所属行业'],['idx','name','uscc','type','establishDate','industry'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'name')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart2() {
        const c = this._svInitChart('svc2'); if (!c) return;
        const months = this._svMonthLabels(12);
        const vals = [680,710,740,760,780,800,820,840,860,880,900,8956/12*1.2|0];
        const yoyRates = [0.8,1.2,1.5,1.8,2.0,1.9,2.1,2.3,2.0,1.8,1.6,1.5];
        c.setOption({ 
            tooltip:{trigger:'axis'}, 
            legend:{data:['新设数量','同比增长率'],textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10},top:0},
            grid:{left:'3%',right:'8%',bottom:'3%',top:'15%',containLabel:true}, 
            xAxis:{type:'category',data:months,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10}}, 
            yAxis:[
                {type:'value',name:'户',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:11},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}},
                {type:'value',name:'同比增长率(%)',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,formatter:'{value}%'},splitLine:{show:false}}
            ],
            series:[
                {type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[4,4,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34c759'},{offset:1,color:'rgba(52,199,89,0.3)'}])}},
                {type:'line',yAxisIndex:1,data:yoyRates,smooth:true,lineStyle:{color:'#ff9500',width:2},itemStyle:{color:'#ff9500'},label:{show:true,color:'rgba(255,255,255,0.7)',fontSize:9,formatter:'{c}%'}}
            ] 
        });
        const cb = this._svInitChart('svc2b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},data:[{value:30,name:'批发零售',itemStyle:{color:'#00d4ff'}},{value:20,name:'餐饮住宿',itemStyle:{color:'#34c759'}},{value:18,name:'信息技术',itemStyle:{color:'#ff9500'}},{value:15,name:'建筑',itemStyle:{color:'#af52de'}},{value:17,name:'其他',itemStyle:{color:'#5856d6'}}]}] });
    }

    // ============ MODAL 3: 注(吊)销市场主体分析 ============
    genSv3Data() {
        const data = [];
        const reasons = ['经营不善', '主动退出', '违规被吊销', '其他'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ name:'市场主体'+(3000+i), uscc:'91460000MA5T'+String(200000+i).slice(1), cancelType:i%5===0?'吊销':'注销', cancelDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), cancelReason:reasons[i%4] });
        }
        return data;
    }
    openSvModal3() { this._svOpen(3, this.genSv3Data()); }
    _svHtml3() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(3)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('注(吊)销总数','1,234户')}${this._svRenderCard('注销','987户')}${this._svRenderCard('吊销','247户')}${this._svRenderCard('同比增长','+0.8%','sv-stat-highlight')}</div>
            ${this._svChartsWrap('svc3','近12个月注(吊)销趋势','svc3b','注(吊)销原因分布',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','市场主体名称','统一社会信用代码','注/吊销类型','注吊销日期','注吊销原因'],['idx','name','uscc','cancelType','cancelDate','cancelReason'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'name')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart3() {
        const c = this._svInitChart('svc3'); if (!c) return;
        const months = this._svMonthLabels(12);
        const zx = [78,82,85,80,88,90,85,92,88,95,90,82];
        const dg = [22,20,18,22,20,18,22,20,24,20,22,20];
        c.setOption({ tooltip:{trigger:'axis'}, legend:{data:['注销','吊销'],textStyle:{color:'rgba(255,255,255,0.6)',fontSize:11},top:0}, grid:{left:'3%',right:'4%',bottom:'3%',top:'15%',containLabel:true}, xAxis:{type:'category',data:months,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:11},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{name:'注销',type:'bar',data:zx,barWidth:'50%',itemStyle:{color:'#ff9500',borderRadius:[4,4,0,0]}},{name:'吊销',type:'bar',data:dg,barWidth:'50%',itemStyle:{color:'#ff3b30',borderRadius:[4,4,0,0]}}] });
        const cb = this._svInitChart('svc3b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},data:[{value:40,name:'经营不善',itemStyle:{color:'#ff3b30'}},{value:25,name:'主动退出',itemStyle:{color:'#ff9500'}},{value:20,name:'违规被吊销',itemStyle:{color:'#af52de'}},{value:15,name:'其他',itemStyle:{color:'#8e8e93'}}]}] });
    }

    // ============ MODAL 4: 主体合规率分析 ============
    genSv4Data() {
        const data = [];
        const industries = ['批发零售', '餐饮住宿', '信息技术', '建筑', '制造', '交通运输'];
        const violations = ['无证经营', '超范围经营', '未年报', '地址异常', '其他'];
        const statuses = ['已整改', '整改中', '未整改'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ name:'主体'+(4000+i), uscc:'91460000MA5T'+String(300000+i).slice(1), industry:industries[i%6], violationType:violations[i%5], discoverDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), rectificationStatus:statuses[i%3] });
        }
        return data;
    }
    openSvModal4() { this._svOpen(4, this.genSv4Data()); }
    _svHtml4() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(4)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('主体合规率','99%')}${this._svRenderCard('合规主体数','98.8万户')}${this._svRenderCard('不合规主体数','1.0万户')}${this._svRenderCard('较上季度提升','+0.5%','sv-stat-highlight')}</div>
            ${this._svChartsWrap('svc4','合规vs不合规占比','svc4b','各行业合规率情况',4,6)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','主体名称','统一社会信用代码','所属行业','违规类型','发现日期','整改状态'],['idx','name','uscc','industry','violationType','discoverDate','rectificationStatus'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'name')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart4() {
        const c = this._svInitChart('svc4'); if (!c) return;
        c.setOption({ tooltip:{trigger:'item',formatter:'{b}: {c}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10},data:['合规','不合规']}, series:[{type:'pie',radius:['55%','72%'],center:['50%','50%'],label:{show:false},emphasis:{label:{show:true,fontSize:14,formatter:'{d}%'}},data:[{value:99,name:'合规',itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34c759'},{offset:1,color:'rgba(52,199,89,0.6)'}])}},{value:1,name:'不合规',itemStyle:{color:'rgba(255,59,48,0.3)'}}],graphic:[{type:'text',left:'center',top:'center',style:{text:'99%',textAlign:'center',fill:'#34c759',fontSize:26,fontWeight:'bold'}}]}] });
        const cb = this._svInitChart('svc4b'); if (!cb) return;
        const cats = ['批发零售','餐饮住宿','信息技术','建筑','制造','交通运输'];
        const vals = [98.5,95.2,97.8,92.6,94.1,89.3];
        const colors = vals.map(v => v>=95?'#34c759':v>=90?'#ff9500':'#ff3b30');
        cb.setOption({ tooltip:{trigger:'axis',formatter:'{b}: {c}%'}, grid:{left:'20%',right:'10%',bottom:'3%',top:'5%',containLabel:true}, xAxis:{type:'value',max:100,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,formatter:'{value}%'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, yAxis:{type:'category',data:cats,axisLabel:{color:'rgba(255,255,255,0.6)',fontSize:11},axisLine:{lineStyle:{color:'rgba(0,212,255,0.2)'}}}, series:[{type:'bar',data:vals.map((v,i)=>({value:v,itemStyle:{color:colors[i],borderRadius:[0,4,4,0]}})),barWidth:'60%',label:{show:true,position:'right',color:'rgba(255,255,255,0.6)',fontSize:10,formatter:'{c}%'}}] });
    }

    // ============ MODAL 5: 信用等级分布分析 ============
    genSv5Data() {
        const data = [];
        const industries = ['批发零售', '餐饮住宿', '信息技术', '建筑', '制造', '交通运输'];
        const levels = ['A', 'B', 'A', 'B', 'A', 'B'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            const assessDate = '2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
            const validDate = new Date(2026,m-1,d); validDate.setFullYear(validDate.getFullYear()+1);
            data.push({ name:'主体'+(5000+i), uscc:'91460000MA5T'+String(400000+i).slice(1), industry:industries[i%6], creditLevel:levels[i%6]+'级', assessDate:assessDate, validUntil:validDate.getFullYear()+'-'+String(validDate.getMonth()+1).padStart(2,'0')+'-'+String(validDate.getDate()).padStart(2,'0') });
        }
        return data;
    }
    openSvModal5() { this._svOpen(5, this.genSv5Data()); }
    _svHtml5() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(5)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('B级及以上主体数','630.11万户')}${this._svRenderCard('占比','90%')}${this._svRenderCard('信用A级主体数','280.05万户')}${this._svRenderCard('信用B级主体数','350.06万户')}</div>
            ${this._svChartsWrap('svc5','信用等级分布','svc5b','各行业B级及以上占比排行',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','主体名称','统一社会信用代码','所属行业','信用等级','评定日期','有效期至'],['idx','name','uscc','industry','creditLevel','assessDate','validUntil'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'name')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart5() {
        const c = this._svInitChart('svc5'); if (!c) return;
        c.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},emphasis:{label:{show:true,fontSize:11}},data:[{value:280.05,name:'A级',itemStyle:{color:'#34c759'}},{value:350.06,name:'B级',itemStyle:{color:'#00d4ff'}},{value:45.05,name:'C级',itemStyle:{color:'#ff9500'}},{value:20.05,name:'D级',itemStyle:{color:'#ff3b30'}}]}] });
        const cb = this._svInitChart('svc5b'); if (!cb) return;
        const cats = ['批发零售','信息技术','餐饮住宿','制造','交通运输','建筑'];
        const vals = [95,93,91,88,85,82];
        cb.setOption({ tooltip:{trigger:'axis',formatter:'{b}: {c}%'}, grid:{left:'3%',right:'4%',bottom:'10%',top:'8%',containLabel:true}, xAxis:{type:'category',data:cats,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,rotate:20}}, yAxis:{type:'value',max:100,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,formatter:'{value}%'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[4,4,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34c759'},{offset:1,color:'rgba(52,199,89,0.3)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.6)',fontSize:10,formatter:'{c}%'}}] });
    }

    // ============ MODAL 6: 检查行为总览 ============
    genSv6Data() {
        const data = [];
        const types = ['单部门双随机','重点检查','专项检查','有因检查','综合查一次','跨部门双随机'];
        const depts = ['省市场监督管理局','省发改委','省财政厅','省住建厅','省生态环境厅'];
        const results = ['合格','不合格','移送'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ inspectionNo:'JC2026'+String(1000+i).slice(1), inspectionType:types[i%6], target:'对象'+i, inspectionDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), result:results[i%3], department:depts[i%5] });
        }
        return data;
    }
    openSvModal6() { this._svOpen(6, this.genSv6Data()); }
    _svHtml6() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(6)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('检查行为总数','2,456次')}${this._svRenderCard('计划类检查','1,932次')}${this._svRenderCard('有因检查','456次')}${this._svRenderCard('集成类检查','68次')}</div>
            ${this._svChartsWrap('svc6','检查行为类型分布','svc6b','近6个月检查行为趋势',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','检查编号','检查类型','检查对象','检查日期','检查结果','承办部门'],['idx','inspectionNo','inspectionType','target','inspectionDate','result','department'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})))}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart6() {
        const c = this._svInitChart('svc6'); if (!c) return;
        c.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:9}}, series:[{type:'pie',radius:['35%','65%'],center:['50%','45%'],label:{show:false},data:[{value:48,name:'单部门双随机',itemStyle:{color:'#00d4ff'}},{value:20,name:'重点检查',itemStyle:{color:'#ff9500'}},{value:12,name:'专项检查',itemStyle:{color:'#af52de'}},{value:18,name:'有因检查',itemStyle:{color:'#ff3b30'}},{value:1,name:'综合查一次',itemStyle:{color:'#34c759'}},{value:1,name:'跨部门双随机',itemStyle:{color:'#5856d6'}}]}] });
        const cb = this._svInitChart('svc6b'); if (!cb) return;
        const months = this._svMonthLabels(6);
        cb.setOption({ tooltip:{trigger:'axis'}, legend:{data:['单部门双随机','重点检查','专项检查','有因检查','综合查一次','跨部门双随机'],textStyle:{color:'rgba(255,255,255,0.5)',fontSize:9},top:0}, grid:{left:'3%',right:'4%',bottom:'3%',top:'20%',containLabel:true}, xAxis:{type:'category',data:months,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{name:'单部门双随机',type:'bar',stack:'total',data:[180,190,195,200,192,195],itemStyle:{color:'#00d4ff'}},{name:'重点检查',type:'bar',stack:'total',data:[75,80,82,85,80,82],itemStyle:{color:'#ff9500'}},{name:'专项检查',type:'bar',stack:'total',data:[45,48,50,48,45,50],itemStyle:{color:'#af52de'}},{name:'有因检查',type:'bar',stack:'total',data:[70,72,75,78,75,72],itemStyle:{color:'#ff3b30'}},{name:'综合查一次',type:'bar',stack:'total',data:[6,5,7,6,5,6],itemStyle:{color:'#34c759'}},{name:'跨部门双随机',type:'bar',stack:'total',data:[5,4,6,5,4,5],itemStyle:{color:'#5856d6'}}] });
    }

    // ============ MODAL 7: 单部门双随机检查分析 ============
    genSv7Data() {
        const data = [];
        const depts = ['省市场监督管理局','省发改委','省财政厅','省住建厅','省生态环境厅','省卫健委','省教育厅','省文旅厅'];
        const results = ['合格','责令整改','违法移送'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ planName:'双随机计划'+(6000+i), target:'对象'+i, department:depts[i%8], inspectionDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), result:results[i%3] });
        }
        return data;
    }
    openSvModal7() { this._svOpen(7, this.genSv7Data()); }
    _svHtml7() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(7)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('制定计划','1,256个')}${this._svRenderCard('检查','1,156次')}${this._svRenderCard('计划执行率','92.0%')}${this._svRenderCard('违法线索移送','89条')}</div>
            ${this._svChartsWrap('svc7','各部门检查次数排行TOP8','svc7b','检查结果分布',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','计划名称','检查对象','检查部门','检查日期','检查结果'],['idx','planName','target','department','inspectionDate','result'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'planName')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart7() {
        const c = this._svInitChart('svc7'); if (!c) return;
        const depts = ['省市场监管局','省发改委','省财政厅','省住建厅','省生态环境厅','省卫健委','省教育厅','省文旅厅'];
        const vals = [280,195,160,145,125,110,85,56];
        c.setOption({ tooltip:{trigger:'axis'}, grid:{left:'3%',right:'4%',bottom:'10%',top:'8%',containLabel:true}, xAxis:{type:'category',data:depts,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:9,rotate:25}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:vals,barWidth:'55%',itemStyle:{borderRadius:[4,4,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00d4ff'},{offset:1,color:'rgba(0,212,255,0.3)'}])}}] });
        const cb = this._svInitChart('svc7b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},data:[{value:75,name:'合格',itemStyle:{color:'#34c759'}},{value:15,name:'责令整改',itemStyle:{color:'#ff9500'}},{value:7,name:'违法线索移送',itemStyle:{color:'#ff3b30'}},{value:3,name:'其他',itemStyle:{color:'#8e8e93'}}]}] });
    }

    // ============ MODAL 8: 重点检查分析 ============
    genSv8Data() {
        const data = [];
        const areas = ['食品药品','特种设备','危险化学品','建筑安全','消防安全','环境安全','卫生安全','交通安全'];
        const results = ['合格','一般问题','严重问题','违法移送'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ planName:'重点检查计划'+(7000+i), target:'对象'+i, keyArea:areas[i%8], inspectionDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), result:results[i%4] });
        }
        return data;
    }
    openSvModal8() { this._svOpen(8, this.genSv8Data()); }
    _svHtml8() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(8)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('制定计划','523个')}${this._svRenderCard('检查','489次')}${this._svRenderCard('计划执行率','93.5%')}${this._svRenderCard('违法线索移送','67条')}</div>
            ${this._svChartsWrap('svc8','重点检查领域分布TOP8','svc8b','检查结果分布',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','计划名称','检查对象','重点领域','检查日期','检查结果'],['idx','planName','target','keyArea','inspectionDate','result'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'planName')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart8() {
        const c = this._svInitChart('svc8'); if (!c) return;
        const cats = ['食品药品','特种设备','危险化学品','建筑安全','消防安全','环境安全','卫生安全','交通安全'];
        const vals = [98,85,72,65,58,48,38,25];
        c.setOption({ tooltip:{trigger:'axis'}, grid:{left:'3%',right:'4%',bottom:'15%',top:'8%',containLabel:true}, xAxis:{type:'category',data:cats,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:9,rotate:20}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:vals,barWidth:'55%',itemStyle:{borderRadius:[4,4,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff9500'},{offset:1,color:'rgba(255,149,0,0.3)'}])}}] });
        const cb = this._svInitChart('svc8b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},data:[{value:75,name:'合格',itemStyle:{color:'#34c759'}},{value:15,name:'责令整改',itemStyle:{color:'#ff9500'}},{value:7,name:'违法线索移送',itemStyle:{color:'#ff3b30'}},{value:3,name:'其他',itemStyle:{color:'#8e8e93'}}]}] });
    }

    // ============ MODAL 9: 专项检查分析 ============
    genSv9Data() {
        const data = [];
        const specials = ['校园食品安全','长江禁渔','网剑行动','双打','价格监管','广告监管'];
        const results = ['合格','发现问题','违法移送'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ specialName:specials[i%6], target:'对象'+i, specialArea:specials[i%6], inspectionDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), result:results[i%3] });
        }
        return data;
    }
    openSvModal9() { this._svOpen(9, this.genSv9Data()); }
    _svHtml9() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(9)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('制定计划','312个')}${this._svRenderCard('检查','287次')}${this._svRenderCard('计划执行率','92.0%')}${this._svRenderCard('违法线索移送','45条')}</div>
            ${this._svChartsWrap('svc9','专项检查类型分布','svc9b','检查结果分布',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','专项名称','检查对象','专项领域','检查日期','检查结果'],['idx','specialName','target','specialArea','inspectionDate','result'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})))}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart9() {
        const c = this._svInitChart('svc9'); if (!c) return;
        const cats = ['校园食品安全','长江禁渔','网剑行动','双打','价格监管','广告监管'];
        const vals = [82,68,55,42,28,12];
        c.setOption({ tooltip:{trigger:'axis'}, grid:{left:'3%',right:'4%',bottom:'15%',top:'8%',containLabel:true}, xAxis:{type:'category',data:cats,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:9,rotate:20}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:vals,barWidth:'55%',itemStyle:{borderRadius:[4,4,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#af52de'},{offset:1,color:'rgba(175,82,222,0.3)'}])}}] });
        const cb = this._svInitChart('svc9b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},data:[{value:75,name:'合格',itemStyle:{color:'#34c759'}},{value:15,name:'责令整改',itemStyle:{color:'#ff9500'}},{value:7,name:'违法线索移送',itemStyle:{color:'#ff3b30'}},{value:3,name:'其他',itemStyle:{color:'#8e8e93'}}]}] });
    }

    // ============ MODAL 10: 有因检查分析 ============
    genSv10Data() {
        const data = [];
        const triggers = ['投诉举报','上级交办','大数据预警','部门移送'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            const found = Math.random() > 0.5;
            data.push({ inspectionNo:'YJ2026'+String(10000+i).slice(1), triggerReason:triggers[i%4], target:'对象'+i, inspectionDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), problemFound:found?'是':'否', transferStatus:found&&Math.random()>0.3?'已移送':'未移送' });
        }
        return data;
    }
    openSvModal10() { this._svOpen(10, this.genSv10Data()); }
    _svHtml10() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(10)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('有因检查总数','456次')}${this._svRenderCard('违法线索移送','78条')}${this._svRenderCard('线索转化率','17.1%')}${this._svRenderCard('投诉举报引发','65%')}</div>
            ${this._svChartsWrap('svc10','有因检查触发原因分布','svc10b','有因检查问题发现率(按类型)',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','检查编号','触发原因','检查对象','检查日期','问题发现','移送情况'],['idx','inspectionNo','triggerReason','target','inspectionDate','problemFound','transferStatus'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})))}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart10() {
        const c = this._svInitChart('svc10'); if (!c) return;
        c.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['35%','65%'],center:['50%','45%'],label:{show:false},itemStyle:{borderRadius:4,borderColor:'rgba(5,13,24,0.98)',borderWidth:2},data:[{value:65,name:'投诉举报',itemStyle:{color:'#ff3b30'}},{value:15,name:'上级交办',itemStyle:{color:'#ff9500'}},{value:12,name:'大数据预警',itemStyle:{color:'#00d4ff'}},{value:8,name:'其他部门移送',itemStyle:{color:'#8e8e93'}}]}] });
        const cb = this._svInitChart('svc10b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'axis',formatter:'{b}: {c}%'}, grid:{left:'3%',right:'4%',bottom:'10%',top:'8%',containLabel:true}, xAxis:{type:'category',data:['投诉举报','上级交办','大数据预警','部门移送'],axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,rotate:15}}, yAxis:{type:'value',max:100,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,formatter:'{value}%'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:[28,22,45,18],barWidth:'50%',itemStyle:{borderRadius:[4,4,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff3b30'},{offset:1,color:'rgba(255,59,48,0.3)'}])},label:{show:true,position:'top',color:'rgba(255,255,255,0.6)',fontSize:10,formatter:'{c}%'}}] });
    }

    // ============ MODAL 11: 综合查一次分析 ============
    genSv11Data() {
        const data = [];
        const leadDepts = ['省市场监督管理局','省发改委','省住建厅','省生态环境厅','省卫健委'];
        const results = ['合格','问题','移送'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            const dc = 2 + Math.floor(Math.random()*7);
            data.push({ planName:'综合查一次计划'+(11000+i), leadDept:leadDepts[i%5], deptCount:dc, target:'对象'+i, inspectionDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), result:results[i%3] });
        }
        return data;
    }
    openSvModal11() { this._svOpen(11, this.genSv11Data()); }
    _svHtml11() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(11)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('计划合并','234个')}${this._svRenderCard('检查','212次')}${this._svRenderCard('计划执行率','90.6%')}${this._svRenderCard('违法线索移送','34条')}</div>
            ${this._svChartsWrap('svc11','各部门联合检查次数排行TOP8','svc11b','联合检查涉及部门数分布',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','计划名称','牵头部门','参与部门数','检查对象','检查日期','检查结果'],['idx','planName','leadDept','deptCount','target','inspectionDate','result'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'planName')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart11() {
        const c = this._svInitChart('svc11'); if (!c) return;
        const depts = ['省市场监管局','省发改委','省住建厅','省生态环境厅','省卫健委','省财政厅','省交通厅','省应急厅'];
        const vals = [52,42,38,30,22,18,12,8];
        c.setOption({ tooltip:{trigger:'axis'}, grid:{left:'3%',right:'4%',bottom:'12%',top:'8%',containLabel:true}, xAxis:{type:'category',data:depts,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:8,rotate:25}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:vals,barWidth:'50%',itemStyle:{borderRadius:[4,4,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00d4ff'},{offset:1,color:'rgba(0,212,255,0.3)'}])}}] });
        const cb = this._svInitChart('svc11b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},data:[{value:40,name:'2部门联合',itemStyle:{color:'#00d4ff'}},{value:35,name:'3部门联合',itemStyle:{color:'#34c759'}},{value:25,name:'4部门及以上',itemStyle:{color:'#ff9500'}}]}] });
    }

    // ============ MODAL 12: 跨部门双随机分析 ============
    genSv12Data() {
        const data = [];
        const combos = ['市监+税务','市监+环保','市监+消防','市监+卫健','税务+环保','市监+住建','市监+文旅','税务+消防'];
        const results = ['全部合格','部分问题','全部问题','违法移送'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ planName:'跨部门计划'+(12000+i), participatingDepts:combos[i%8], target:'对象'+i, inspectionDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), result:results[i%4] });
        }
        return data;
    }
    openSvModal12() { this._svOpen(12, this.genSv12Data()); }
    _svHtml12() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(12)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('制定计划','167个')}${this._svRenderCard('检查','145次')}${this._svRenderCard('计划执行率','86.8%')}${this._svRenderCard('违法线索移送','23条')}</div>
            ${this._svChartsWrap('svc12','跨部门双随机领域分布','svc12b','检查结果分布',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','计划名称','参与部门','检查对象','检查日期','检查结果'],['idx','planName','participatingDepts','target','inspectionDate','result'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'planName')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart12() {
        const c = this._svInitChart('svc12'); if (!c) return;
        const fields = ['市场监管','生态环境','交通运输','卫生健康','文化旅游','应急管理','税务','海关'];
        const vals = [45,38,30,22,18,15,10,7];
        c.setOption({ tooltip:{trigger:'axis'}, grid:{left:'3%',right:'4%',bottom:'15%',top:'8%',containLabel:true}, xAxis:{type:'category',data:fields,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:9,rotate:20}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:vals,barWidth:'55%',itemStyle:{borderRadius:[4,4,0,0],color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34c759'},{offset:1,color:'rgba(52,199,89,0.3)'}])}}] });
        const cb = this._svInitChart('svc12b'); if (!cb) return;
        cb.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},data:[{value:75,name:'合格',itemStyle:{color:'#34c759'}},{value:15,name:'责令整改',itemStyle:{color:'#ff9500'}},{value:7,name:'违法线索移送',itemStyle:{color:'#ff3b30'}},{value:3,name:'其他',itemStyle:{color:'#8e8e93'}}]}] });
    }

    // ============ MODAL 13: 核查行为总览 ============
    genSv13Data() {
        const data = [];
        const types = ['告知承诺制','承诺即入制'];
        const conclusions = ['合格','不合格','问题整改'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ verificationNo:'HC2026'+String(13000+i).slice(1), verificationType:types[i%2], target:'对象'+i, verificationDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), conclusion:conclusions[i%3] });
        }
        return data;
    }
    openSvModal13() { this._svOpen(13, this.genSv13Data()); }
    _svHtml13() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(13)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('核查行为总数','835次')}${this._svRenderCard('告知承诺制','523次')}${this._svRenderCard('承诺即入制','312次')}${this._svRenderCard('问题检出率','5.8%','sv-stat-highlight')}</div>
            ${this._svChartsWrap('svc13','核查类型分布','svc13b','近6个月核查行为趋势',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','核查编号','核查类型','核查对象','核查日期','核查结论'],['idx','verificationNo','verificationType','target','verificationDate','conclusion'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})))}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart13() {
        const c = this._svInitChart('svc13'); if (!c) return;
        c.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:11}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:true,formatter:'{b}\n{d}%',color:'rgba(255,255,255,0.7)',fontSize:11},data:[{value:63,name:'告知承诺制',itemStyle:{color:'#ff9500'}},{value:37,name:'承诺即入制',itemStyle:{color:'#00d4ff'}}]}] });
        const cb = this._svInitChart('svc13b'); if (!cb) return;
        const months = this._svMonthLabels(6);
        cb.setOption({ tooltip:{trigger:'axis'}, legend:{data:['告知承诺制','承诺即入制'],textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10},top:0}, grid:{left:'3%',right:'4%',bottom:'3%',top:'15%',containLabel:true}, xAxis:{type:'category',data:months,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{name:'告知承诺制',type:'bar',data:[80,85,88,90,87,85],barWidth:'50%',itemStyle:{color:'#ff9500',borderRadius:[4,4,0,0]}},{name:'承诺即入制',type:'bar',data:[48,50,52,55,52,50],barWidth:'50%',itemStyle:{color:'#00d4ff',borderRadius:[4,4,0,0]}}] });
    }

    // ============ MODAL 14: 告知承诺制核查分析 ============
    genSv14Data() {
        const data = [];
        const results = ['合格','问题整改','不合格'];
        const statuses = ['已完成','进行中','未开始'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ target:'核查对象'+(14000+i), promiseItem:'承诺事项'+(i%10+1), verificationDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), result:results[i%3], rectificationStatus:statuses[i%3] });
        }
        return data;
    }
    openSvModal14() { this._svOpen(14, this.genSv14Data()); }
    _svHtml14() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(14)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('核查任务数','523次')}${this._svRenderCard('完成率','98%')}${this._svRenderCard('问题检出率','5%')}${this._svRenderCard('问题检出同比','↑5%','sv-stat-highlight')}</div>
            ${this._svChartsWrap('svc14','核查结果分布','svc14b','各部门告知承诺制核查问题检出率排行',4,6)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','核查对象','承诺事项','核查日期','核查结果','整改状态'],['idx','target','promiseItem','verificationDate','result','rectificationStatus'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})))}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }

    // ============ MODAL 15: 承诺即入制核查分析 ============
    genSv15Data() {
        const data = [];
        const results = ['合格','问题整改','不合格'];
        const statuses = ['已完成','进行中','未开始'];
        for (let i = 1; i <= 40; i++) {
            const m = Math.floor(Math.random()*12)+1, d = Math.floor(Math.random()*28)+1;
            data.push({ target:'核查对象'+(15000+i), promiseItem:'承诺事项'+(i%10+1), verificationDate:'2026-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'), result:results[i%3], rectificationStatus:statuses[i%3] });
        }
        return data;
    }
    openSvModal15() { this._svOpen(15, this.genSv15Data()); }
    _svChart14() {
        const c = this._svInitChart('svc14'); if (!c) return;
        c.setOption({ tooltip:{trigger:'item',formatter:'{b}: {c}%'}, series:[{type:'pie',radius:['55%','72%'],center:['50%','50%'],label:{show:false},emphasis:{label:{show:true,fontSize:12,formatter:'{d}%'}},data:[{value:85,name:'合格',itemStyle:{color:'#34c759'}},{value:10,name:'问题整改',itemStyle:{color:'#ff9500'}},{value:5,name:'不合格',itemStyle:{color:'#ff3b30'}}],graphic:[{type:'text',left:'center',top:'center',style:{text:'98%',textAlign:'center',fill:'#00d4ff',fontSize:26,fontWeight:'bold'}}]}] });
        const cb = this._svInitChart('svc14b'); if (!cb) return;
        const depts = ['省市场监管局','省发改委','省住建厅','省卫健委','省财政厅','省生态环境厅','省教育厅','省文旅厅'];
        const vals = [8.5,6.2,5.8,5.1,4.3,3.8,3.2,2.5];
        const colors = vals.map(v => v>8?'#ff3b30':v>5?'#ff9500':'#34c759');
        cb.setOption({ tooltip:{trigger:'axis',formatter:'{b}: {c}%'}, grid:{left:'3%',right:'8%',bottom:'12%',top:'8%',containLabel:true}, xAxis:{type:'category',data:depts,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:8,rotate:25}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,formatter:'{value}%'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:vals.map((v,i)=>({value:v,itemStyle:{color:colors[i],borderRadius:[4,4,0,0]}})),barWidth:'50%',label:{show:true,position:'top',color:'rgba(255,255,255,0.6)',fontSize:10,formatter:'{c}%'}}] });
    }

    // ============ MODAL 15: 承诺即入制核查分析 ============
    _svHtml15() {
        const p = this.svCurrentPage, ps = this.pageSize, d = this.svModalData.slice((p-1)*ps, p*ps);
        return `<div class="rv-modal"><div class="rv-modal-header"><span class="rv-modal-title">${this._svTitle(15)}</span><button class="rv-modal-close">×</button></div>
            <div class="rv-stats">${this._svRenderCard('核查任务数','312次')}${this._svRenderCard('完成率','96%')}${this._svRenderCard('问题检出率','8%')}${this._svRenderCard('问题检出同比','↑8%','sv-stat-highlight')}</div>
            ${this._svChartsWrap('svc15','核查结果分布','svc15b','各部门承诺即入制核查问题检出率排行',4,6)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','核查对象','承诺事项','核查日期','核查结果','整改状态'],['idx','target','promiseItem','verificationDate','result','rectificationStatus'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})))}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart15() {
        const c = this._svInitChart('svc15'); if (!c) return;
        c.setOption({ tooltip:{trigger:'item',formatter:'{b}: {c}%'}, series:[{type:'pie',radius:['55%','72%'],center:['50%','50%'],label:{show:false},emphasis:{label:{show:true,fontSize:12,formatter:'{d}%'}},data:[{value:82,name:'合格',itemStyle:{color:'#34c759'}},{value:12,name:'问题整改',itemStyle:{color:'#ff9500'}},{value:6,name:'不合格',itemStyle:{color:'#ff3b30'}}],graphic:[{type:'text',left:'center',top:'center',style:{text:'96%',textAlign:'center',fill:'#00d4ff',fontSize:26,fontWeight:'bold'}}]}] });
        const cb = this._svInitChart('svc15b'); if (!cb) return;
        const depts = ['省市场监管局','省发改委','省住建厅','省卫健委','省财政厅','省生态环境厅','省教育厅','省文旅厅'];
        const vals = [12.5,9.2,8.8,7.1,6.3,5.8,4.2,3.5];
        const colors = vals.map(v => v>10?'#ff3b30':v>6?'#ff9500':'#34c759');
        cb.setOption({ tooltip:{trigger:'axis',formatter:'{b}: {c}%'}, grid:{left:'3%',right:'8%',bottom:'12%',top:'8%',containLabel:true}, xAxis:{type:'category',data:depts,axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:8,rotate:25}}, yAxis:{type:'value',axisLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,formatter:'{value}%'},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}}, series:[{type:'bar',data:vals.map((v,i)=>({value:v,itemStyle:{color:colors[i],borderRadius:[4,4,0,0]}})),barWidth:'50%',label:{show:true,position:'top',color:'rgba(255,255,255,0.6)',fontSize:10,formatter:'{c}%'}}] });
    }

    // ============ PAGE-LEVEL CHARTS ============
    initCharts() {
        const pieEl = document.getElementById('supervision-pie');
        const barEl = document.getElementById('supervision-matter-bar');
        const svPushPieEl = document.getElementById('sv-push-pie');
        const svReceivePieEl = document.getElementById('sv-receive-pie');
        if (pieEl) { this.charts.pie = echarts.init(pieEl); this.initMatterPieChart(); }
        if (barEl) { this.charts.bar = echarts.init(barEl); this.initMatterBarChart(); }
        if (svPushPieEl) { svPushPieEl.style.height = '80px'; this.charts.svPushPie = echarts.init(svPushPieEl); this.initSvPushPieChart(); }
        if (svReceivePieEl) { svReceivePieEl.style.height = '80px'; this.charts.svReceivePie = echarts.init(svReceivePieEl); this.initSvReceivePieChart(); }
        this.renderDataflowFlowChart();
        window.addEventListener('resize', () => { Object.values(this.charts).forEach(chart => { try { chart.resize(); } catch(e) {} }); });
    }

    initSvPushPieChart() {
        if (!this.charts.svPushPie) return;
        this.charts.svPushPie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: { show: true, position: 'inside', color: '#fff', fontSize: 10, formatter: '{b}\n{c}%' },
                labelLine: { show: false },
                data: [
                    { value: 60, name: '违法线索', itemStyle: { color: '#00d4ff' } },
                    { value: 40, name: '检查结果', itemStyle: { color: '#34c759' } }
                ]
            }]
        });
    }

    initSvReceivePieChart() {
        if (!this.charts.svReceivePie) return;
        this.charts.svReceivePie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: { show: true, position: 'inside', color: '#fff', fontSize: 10, formatter: '{b}\n{c}%' },
                labelLine: { show: false },
                data: [
                    { value: 30, name: '一般类', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '承诺类', itemStyle: { color: '#34c759' } },
                    { value: 28, name: '处罚结果', itemStyle: { color: '#ff9500' } },
                    { value: 17, name: '信用数据', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    initSvBasisRadarChart() {
        if (!this.charts.basisRadar) return;
        this.charts.basisRadar.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}个'
            },
            radar: {
                indicator: [
                    { name: '法律', max: 6000 },
                    { name: '行政法规', max: 6000 },
                    { name: '地方性法规', max: 6000 },
                    { name: '部门规章', max: 6000 },
                    { name: '政府规章', max: 6000 },
                    { name: '国务院命令决定', max: 6000 }
                ],
                center: ['50%', '50%'],
                radius: '65%',
                shape: 'polygon',
                splitNumber: 5,
                axisName: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 500
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(0, 212, 255, 0.05)', 'rgba(0, 212, 255, 0.1)', 'rgba(0, 212, 255, 0.15)', 'rgba(0, 212, 255, 0.2)', 'rgba(0, 212, 255, 0.25)']
                    }
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0, 212, 255, 0.3)' }
                },
                splitLine: {
                    lineStyle: { color: 'rgba(0, 212, 255, 0.3)' }
                }
            },
            series: [{
                type: 'radar',
                data: [{
                    value: [5000, 5000, 5000, 5000, 5000, 5000],
                    name: '政策法规数量',
                    areaStyle: {
                        color: 'rgba(0, 212, 255, 0.3)'
                    },
                    lineStyle: {
                        color: '#00d4ff',
                        width: 2
                    },
                    itemStyle: {
                        color: '#00d4ff'
                    },
                    symbol: 'circle',
                    symbolSize: 6
                }]
            }]
        });
    }

    initMatterPieChart() {
        if (!this.charts.pie) return;
        this.charts.pie.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            legend: {
                show: false
            },
            series: [
                {
                    name: '监管事项',
                    type: 'pie',
                    radius: ['35%', '75%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: true,
                    itemStyle: {
                        borderRadius: 4,
                        borderColor: 'rgba(5,13,24,0.92)',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ffffff',
                        fontSize: 12,
                        fontWeight: 500,
                        formatter: function (params) {
                            return params.name + '  ' + params.value + ' (' + params.percent + '%)';
                        }
                    },
                    labelLine: {
                        show: true,
                        length: 20,
                        length2: 25,
                        smooth: true
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 13,
                            fontWeight: 700
                        },
                        itemStyle: {
                            shadowBlur: 12,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [
                        { value: 1050, name: '双随机一公开', itemStyle: { color: '#4a9eff' } },
                        { value: 160,  name: '重点检查',   itemStyle: { color: '#ff7f50' } },
                        { value: 200,  name: '专项检查',   itemStyle: { color: '#00d4aa' } },
                        { value: 200,  name: '信用监管',   itemStyle: { color: '#ffd700' } }
                    ]
                }
            ]
        }, true);
    }

    initMatterBarChart() {
        if (!this.charts.bar) return;
        this.charts.bar.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left:'15%', right:'8%', top:'5%', bottom:'12%', containLabel: true },
            xAxis: {
                type:'value',
                axisLine:{ lineStyle:{ color:'rgba(0,212,255,0.2)' } },
                axisLabel:{ color:'rgba(255,255,255,0.6)', fontSize:10 },
                splitLine:{ lineStyle:{ color:'rgba(0,212,255,0.08)' } }
            },
            yAxis: {
                type:'category',
                data:['行政其他','行政强制','行政处罚','行政检查'],
                axisLine:{ lineStyle:{ color:'rgba(0,212,255,0.2)' } },
                axisLabel:{ color:'rgba(255,255,255,0.7)', fontSize:11 }
            },
            series: [
                {
                    name:'事项数',
                    type:'bar',
                    barWidth:'30%',
                    data:[80, 120, 450, 1800],
                    itemStyle:{ color:'#4a9eff', borderRadius:[0,3,3,0] }
                },
                {
                    name:'部门数',
                    type:'bar',
                    barWidth:'30%',
                    data:[20, 45, 180, 320],
                    itemStyle:{ color:'#5cb85c', borderRadius:[0,3,3,0] }
                }
            ]
        });
    }

    bindTopTabEvents() {
        const groups = this.container.querySelectorAll('.top-tab-group');
        groups.forEach(group => {
            const groupType = group.dataset.topGroup;
            const btns = group.querySelectorAll('.top-tab-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    btns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const tab = btn.dataset.tab;
                    this.switchTopList(groupType, tab);
                });
            });
        });
    }

    getBehaviorData(tab) {
        if (tab === 'year') {
            return [
                ['食品安全日常检查', 918],
                ['特种设备安全监察', 871],
                ['药品经营质量管理检查', 765],
                ['市场主体登记事项核查', 657],
                ['产品质量监督抽查', 543],
                ['计量器具强制检定', 437],
                ['广告发布内容审查', 329],
                ['网络交易平台监管', 216]
            ];
        } else {
            return [
                ['食品安全日常检查', 83],
                ['特种设备安全监察', 71],
                ['药品经营质量管理检查', 64],
                ['市场主体登记事项核查', 87],
                ['产品质量监督抽查', 43],
                ['计量器具强制检定', 36],
                ['广告发布内容审查', 29],
                ['网络交易平台监管', 21]
            ];
        }
    }

    getProblemData(tab) {
        if (tab === 'year') {
            return [
                ['消防安全', 37],
                ['交通运输', 25],
                ['安全生产', 21],
                ['环境保护', 18],
                ['医疗器械', 14],
                ['特种设备', 11],
                ['网络交易', 8],
                ['广告监管', 6]
            ];
        } else {
            return [
                ['消防安全', 27],
                ['交通运输', 21],
                ['安全生产', 18],
                ['环境保护', 16],
                ['医疗器械', 13],
                ['特种设备', 9],
                ['网络交易', 6],
                ['广告监管', 5]
            ];
        }
    }

    switchTopList(group, tab) {
        let listId, data, col1Name, col2Name;
        if (group === 'behavior') {
            listId = 'top-behavior-list';
            data = this.getBehaviorData(tab);
            col1Name = '事项名称';
            col2Name = '次数';
        } else {
            listId = 'top-problem-list';
            data = this.getProblemData(tab);
            col1Name = '领域';
            col2Name = '问题数';
        }
        const container = document.getElementById(listId);
        if (!container) return;
        let html = `<table class="top10-table"><thead><tr><th>${col1Name}</th><th>${col2Name}</th></tr></thead><tbody>`;
        data.forEach(row => {
            html += `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`;
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    show() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = '';
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }

    // ============ 沙盒监管创新试点 ============
    renderSandboxSupervisionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">沙盒监管创新试点</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">入盒企业</span>
                        <span class="indicator-stat-value">89家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">在盒企业</span>
                        <span class="indicator-stat-value">67家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">出盒企业</span>
                        <span class="indicator-stat-value">22家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">问题发现率</span>
                        <span class="indicator-stat-value">8.9%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各行业入盒企业数量</span>
                        <div id="modal-sandbox-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">企业状态分布</span>
                        <div id="modal-sandbox-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>企业名称</th>
                                <th>所属行业</th>
                                <th>入盒时间</th>
                                <th>出盒时间</th>
                                <th>当前状态</th>
                                <th>问题发现数</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSandboxTableRows()}
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

    generateSandboxTableRows() {
        const industries = ['医疗健康', '金融科技', '数字经济', '高端制造', '现代服务业'];
        const allItems = [];
        for (let i = 1; i <= 89; i++) {
            let status = '在盒';
            let outTime = '-';
            if (i <= 22) {
                status = '出盒';
                outTime = `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
            }
            allItems.push({
                name: `沙盒企业${i}`,
                industry: industries[i % 5],
                inTime: `2025-0${Math.floor(Math.random() * 12) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                outTime: outTime,
                status: status,
                problemCount: Math.floor(Math.random() * 3),
                dispose: '已处置'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '在盒': '#ff9500', '出盒': '#ffcc00' };
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.industry}</td>
                <td>${item.inTime}</td>
                <td>${item.outTime}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
                <td>${item.problemCount}</td>
                <td>${item.dispose}</td>
            </tr>
        `).join('');
    }

    initSandboxSupervisionCharts() {
        const bar = echarts.init(document.getElementById('modal-sandbox-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['医疗健康', '金融科技', '数字经济', '高端制造', '现代服务业'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{
                type: 'bar',
                data: [35, 22, 15, 10, 7],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-sandbox-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}家 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}家', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 67, name: '在盒', itemStyle: { color: '#ff9500' } },
                    { value: 22, name: '出盒', itemStyle: { color: '#ffcc00' } }
                ]
            }]
        });
    }

    // ============ 非现场监管智能监控平台 ============
    renderOffsiteSupervisionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">非现场监管智能监控平台</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接入监控点位</span>
                        <span class="indicator-stat-value">1,286个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">在线率</span>
                        <span class="indicator-stat-value">97.5%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日预警总数</span>
                        <span class="indicator-stat-value">47次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已处置预警</span>
                        <span class="indicator-stat-value">43次(91.5%)</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 4fr 6fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">场景列表</span>
                        <div id="modal-offsite-list" class="indicator-chart-container" style="height: 300px;"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">预警趋势分析</span>
                        <div id="modal-offsite-trend" class="indicator-chart-container" style="height: 300px;"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>预警场景</th>
                                <th>预警点位</th>
                                <th>预警内容</th>
                                <th>预警时间</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateOffsiteTableRows()}
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

    generateOffsiteTableRows() {
        const scenes = ['明厨亮灶', '盗采河沙', '安全生产', '生态环境'];
        const points = ['海秀路店-A1', '万泉河-监控点3', '工业园区-C2', '监测站-水质1'];
        const contents = ['未戴帽子', '异常船只', '未戴安全帽', '水质超标'];
        const allItems = [];
        for (let i = 1; i <= 47; i++) {
            allItems.push({
                code: `YJ${String(i).padStart(6, '0')}`,
                scene: scenes[i % 4],
                point: points[i % 4],
                content: contents[i % 4],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i <= 43 ? '已处置' : '待处置'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '已处置': '#ffcc00', '待处置': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.scene}</td>
                <td>${item.point}</td>
                <td>${item.content}</td>
                <td>${item.time}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initOffsiteSupervisionCharts() {
        const listChart = echarts.init(document.getElementById('modal-offsite-list'));
        listChart.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: {},
            grid: { left: '10%', right: '10%', bottom: '5%', top: '5%', containLabel: true },
            xAxis: { show: false },
            yAxis: { type: 'category', data: ['生态环境监测', '安全生产监控', '盗采河沙预警', '明厨亮灶'], axisLabel: { fontSize: 11 } },
            series: [{
                type: 'bar',
                data: [450, 320, 286, 230],
                barWidth: '60%',
                itemStyle: { color: '#ff9500', borderRadius: [0, 4, 4, 0] },
                label: { show: true, position: 'right', formatter: '{c}个', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });

        const trendChart = echarts.init(document.getElementById('modal-offsite-trend'));
        trendChart.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '10%', right: '5%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { 
                type: 'category', 
                data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                axisLabel: { fontSize: 10 }
            },
            yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
            series: [{
                type: 'line',
                data: [2, 1, 0, 3, 8, 12, 5, 6, 8, 4, 2],
                smooth: true,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(255,149,0,0.3)' },
                        { offset: 1, color: 'rgba(255,149,0,0.05)' }
                    ])
                },
                lineStyle: { color: '#ff9500', width: 2 },
                itemStyle: { color: '#ff9500' },
                label: { show: true, fontSize: 10, color: 'rgba(255,255,255,0.6)' }
            }]
        });
    }

    // ============ 触发式监管智能预警 ============
    renderTriggerSupervisionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">触发式监管智能预警</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">触发规则总数</span>
                        <span class="indicator-stat-value">89条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日触发事件</span>
                        <span class="indicator-stat-value">45次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">自动处置</span>
                        <span class="indicator-stat-value">38次(84.4%)</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">人工介入</span>
                        <span class="indicator-stat-value">7次(15.6%)</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域触发事件数量排行</span>
                        <div id="modal-trigger-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">触发规则类型分布</span>
                        <div id="modal-trigger-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>触发编号</th>
                                <th>触发规则名称</th>
                                <th>所属领域</th>
                                <th>触发条件</th>
                                <th>触发时间</th>
                                <th>处置方式</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTriggerTableRows()}
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

    generateTriggerTableRows() {
        const domains = ['市场监管', '生态环境', '安全生产', '税务', '人力资源'];
        const types = ['阈值触发', '行为触发', '时间触发', '组合触发'];
        const allItems = [];
        for (let i = 1; i <= 45; i++) {
            let method = '自动处置';
            if (i > 38) method = '人工介入';
            allItems.push({
                code: `CF${String(i).padStart(6, '0')}`,
                rule: `触发规则${i}`,
                domain: domains[i % 5],
                condition: types[i % 4],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                method: method,
                status: '已完成'
            });
        }
        const items = allItems.slice(0, 5);
        const methodColors = { '自动处置': '#ffcc00', '人工介入': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.rule}</td>
                <td>${item.domain}</td>
                <td>${item.condition}</td>
                <td>${item.time}</td>
                <td><span style="color: ${methodColors[item.method]};">${item.method}</span></td>
                <td>${item.status}</td>
            </tr>
        `).join('');
    }

    initTriggerSupervisionCharts() {
        const bar = echarts.init(document.getElementById('modal-trigger-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}次' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['市场监管', '生态环境', '安全生产', '税务', '人力资源'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}次' } },
            series: [{
                type: 'bar',
                data: [18, 12, 8, 4, 3],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}次', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-trigger-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}条 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}条', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 32, name: '阈值触发', itemStyle: { color: '#ff9500' } },
                    { value: 28, name: '行为触发', itemStyle: { color: '#ff9500' } },
                    { value: 18, name: '时间触发', itemStyle: { color: '#ffcc00' } },
                    { value: 11, name: '组合触发', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    // ============ 乐城医疗器械试点监管 ============
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
                        <span class="indicator-chart-title">各医疗机构使用人次</span>
                        <div id="modal-lecheng-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">药械品种分类分布</span>
                        <div id="modal-lecheng-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>医疗机构名称</th>
                                <th>药械品种数</th>
                                <th>累计使用人次</th>
                                <th>不良事件数</th>
                                <th>监管状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateLechengTableRows()}
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

    generateLechengTableRows() {
        const names = ['博鳌超级医院', '恒大国际医院', '莱佛士医院', '一龄医院', '慈铭博鳌'];
        const allItems = [];
        for (let i = 1; i <= 23; i++) {
            allItems.push({
                name: names[i % 5] || `医疗机构${i}`,
                count: Math.floor(Math.random() * 20) + 5,
                visits: Math.floor(Math.random() * 500) + 100,
                events: Math.floor(Math.random() * 2),
                status: '正常'
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>${item.visits}</td>
                <td>${item.events}</td>
                <td><span style="color: #ffcc00;">${item.status}</span></td>
            </tr>
        `).join('');
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

    // ============ 南繁育种试点监管 ============
    renderNfanBreedingModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">南繁育种试点监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">入驻科研单位</span>
                        <span class="indicator-stat-value">268家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">试验基地面积</span>
                        <span class="indicator-stat-value">1.8万亩</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">培育新品种</span>
                        <span class="indicator-stat-value">156个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">问题发现率</span>
                        <span class="indicator-stat-value">3.2%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各单位试验面积</span>
                        <div id="modal-nfan-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">作物类型分布</span>
                        <div id="modal-nfan-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>单位名称</th>
                                <th>试验面积(亩)</th>
                                <th>培育品种数</th>
                                <th>问题发现数</th>
                                <th>监管状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateNfanTableRows()}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 54 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateNfanTableRows() {
        const names = ['育种单位1', '育种单位2', '育种单位3', '育种单位4', '育种单位5'];
        const allItems = [];
        for (let i = 1; i <= 50; i++) {
            allItems.push({
                name: names[i % 5] || `育种单位${i}`,
                area: Math.floor(Math.random() * 200) + 50,
                varieties: Math.floor(Math.random() * 10) + 1,
                problems: Math.floor(Math.random() * 2),
                status: '正常'
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.area}</td>
                <td>${item.varieties}</td>
                <td>${item.problems}</td>
                <td><span style="color: #ffcc00;">${item.status}</span></td>
            </tr>
        `).join('');
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
                    { value: 65, name: '水稻', itemStyle: { color: '#ff9500' } },
                    { value: 42, name: '玉米', itemStyle: { color: '#ff9500' } },
                    { value: 28, name: '蔬菜', itemStyle: { color: '#ffcc00' } },
                    { value: 12, name: '棉花', itemStyle: { color: '#af52de' } },
                    { value: 9, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    // ============ 明厨亮灶智慧监管 ============
    renderBrightKitchenModal() {
        return `
            <div class="indicator-modal" style="width:90vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">明厨亮灶智慧监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接入餐饮单位</span>
                        <span class="indicator-stat-value">2,856家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">在线率</span>
                        <span class="indicator-stat-value">98.2%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日预警</span>
                        <span class="indicator-stat-value">23次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">处置率</span>
                        <span class="indicator-stat-value">100%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">预警类型分布</span>
                        <div id="modal-bright-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各市县接入数量</span>
                        <div id="modal-bright-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>餐饮单位名称</th>
                                <th>所属市县</th>
                                <th>预警类型</th>
                                <th>预警时间</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateBrightKitchenTableRows()}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn">上一页</button>
                    <span class="indicator-pagination-info">第 1 页 / 共 5 页</span>
                    <button class="indicator-pagination-btn">下一页</button>
                </div>
            </div>
        `;
    }

    generateBrightKitchenTableRows() {
        const names = ['海秀路餐饮', '解放路酒楼', '国贸餐厅', '三亚湾饭店', '凤凰路小吃'];
        const cities = ['海口', '三亚', '文昌', '琼海', '万宁'];
        const types = ['未戴帽子', '未戴口罩', '食品未加盖', '操作不规范'];
        const allItems = [];
        for (let i = 1; i <= 23; i++) {
            allItems.push({
                name: names[i % 5] || `餐饮单位${i}`,
                city: cities[i % 5],
                type: types[i % 4],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: '已处置'
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.city}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span style="color: #ffcc00;">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initBrightKitchenCharts() {
        const pie = echarts.init(document.getElementById('modal-bright-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}次', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 8, name: '未戴帽子', itemStyle: { color: '#ff9500' } },
                    { value: 6, name: '未戴口罩', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '食品未加盖', itemStyle: { color: '#ffcc00' } },
                    { value: 4, name: '操作不规范', itemStyle: { color: '#af52de' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-bright-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '文昌', '琼海', '万宁'], axisLabel: { fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{
                type: 'bar',
                data: [856, 620, 430, 380, 270],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });
    }

    // ============ 盗采河沙智能监控预警 ============
    renderSandTheftModal() {
        return `
            <div class="indicator-modal" style="width:90vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">盗采河沙智能监控预警</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控河段</span>
                        <span class="indicator-stat-value">286公里</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控点位</span>
                        <span class="indicator-stat-value">320个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日预警</span>
                        <span class="indicator-stat-value">12次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">处置率</span>
                        <span class="indicator-stat-value">91.7%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">预警时段分布</span>
                        <div id="modal-sand-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">河段预警排行</span>
                        <div id="modal-sand-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>预警河段</th>
                                <th>预警点位</th>
                                <th>预警内容</th>
                                <th>预警时间</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateSandTheftTableRows()}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn">上一页</button>
                    <span class="indicator-pagination-info">第 1 页 / 共 3 页</span>
                    <button class="indicator-pagination-btn">下一页</button>
                </div>
            </div>
        `;
    }

    generateSandTheftTableRows() {
        const rivers = ['万泉河', '南渡江', '昌化江', '陵水河', '宁远河'];
        const allItems = [];
        for (let i = 1; i <= 12; i++) {
            allItems.push({
                code: `DS${String(i).padStart(6, '0')}`,
                river: rivers[i % 5],
                point: `监控点${Math.floor(Math.random() * 10) + 1}`,
                content: i % 3 === 0 ? '异常船只' : i % 3 === 1 ? '夜间作业' : '采砂设备',
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i <= 11 ? '已处置' : '待处置'
            });
        }
        const items = allItems.slice(0, 5);
        const statusColors = { '已处置': '#ffcc00', '待处置': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.river}</td>
                <td>${item.point}</td>
                <td>${item.content}</td>
                <td>${item.time}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initSandTheftCharts() {
        const bar = echarts.init(document.getElementById('modal-sand-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}次' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['00:00-04:00', '04:00-08:00', '08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-24:00'], axisLabel: { fontSize: 10, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}次' } },
            series: [{
                type: 'bar',
                data: [5, 1, 1, 2, 1, 2],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-sand-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}次', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 4, name: '万泉河', itemStyle: { color: '#ff9500' } },
                    { value: 3, name: '南渡江', itemStyle: { color: '#ff9500' } },
                    { value: 2, name: '昌化江', itemStyle: { color: '#ffcc00' } },
                    { value: 2, name: '陵水河', itemStyle: { color: '#ffcc00' } },
                    { value: 1, name: '宁远河', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    // ============ 渣土清运智能监控 ============
    renderMuckTransportModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">渣土清运智能监控</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接入运输企业</span>
                        <span class="indicator-stat-value">56家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接入车辆</span>
                        <span class="indicator-stat-value">892辆</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日违规预警</span>
                        <span class="indicator-stat-value">34次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已处置</span>
                        <span class="indicator-stat-value">28次(82.4%)</span>
                    </div>
                </div>
                <div class="indicator-modal-content indicator-modal-content-row">
                    <div class="indicator-modal-left">
                        <div class="indicator-search-box">
                            <input type="text" placeholder="搜索企业名称或车牌号" class="indicator-search-input" id="muck-search-input">
                            <button class="indicator-search-btn" onclick="window.supervisionPage.searchMuckTransport()">搜索</button>
                        </div>
                        <div class="indicator-modal-table-wrap">
                            <table class="indicator-modal-table" id="muck-transport-table">
                                <thead>
                                    <tr>
                                        <th>企业名称</th>
                                        <th>车牌号</th>
                                        <th>在线状态</th>
                                        <th>今日预警数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.generateMuckTransportTableRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="indicator-modal-right">
                        <div class="indicator-video-area">
                            <div class="indicator-video-header">
                                <span>当前车辆：琼A·88888</span>
                                <div class="indicator-realtime-alert">
                                    <span class="alert-dot"></span>实时预警
                                </div>
                            </div>
                            <div class="indicator-video-frame">
                                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20transport%20vehicle%20monitoring%20camera%20view%20with%20AI%20detection%20overlay%20boxes&image_size=landscape_16_9" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
                                <div class="ai-detection-box" style="top:20%;left:15%;width:30%;height:40%;border:2px solid #ff3b30;"></div>
                                <div class="ai-detection-label" style="top:15%;left:15%;background:#ff3b30;">未覆盖</div>
                            </div>
                            <div class="indicator-video-thumbnails">
                                <div class="video-thumbnail">琼A·12345</div>
                                <div class="video-thumbnail">琼A·54321</div>
                                <div class="video-thumbnail active">琼A·88888</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="indicator-modal-footer">
                    <table class="indicator-modal-table" id="muck-alert-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>企业名称</th>
                                <th>车牌号</th>
                                <th>预警类型</th>
                                <th>预警时间</th>
                                <th>预警截图</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateMuckAlertTableRows(1)}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn" id="muck-prev-btn" disabled>上一页</button>
                        <span class="indicator-pagination-info">第 1 / 7 页</span>
                        <button class="indicator-pagination-btn" id="muck-next-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateMuckTransportTableRows() {
        const companies = ['海南鑫达运输', '海南华通物流', '海南顺达货运', '海南恒通运输', '海南捷运物流'];
        const statusColors = { '在线': '#34c759', '离线': '#ff3b30' };
        return companies.map((company, i) => {
            const status = i % 2 === 0 ? '在线' : '离线';
            return `
                <tr>
                    <td>${company}</td>
                    <td>琼A·${String(80001 + i).padStart(5, '0')}</td>
                    <td><span style="color: ${statusColors[status]};">${status}</span></td>
                    <td>${Math.floor(Math.random() * 8)}</td>
                </tr>
            `;
        }).join('');
    }

    generateMuckAlertTableRows(page) {
        const companies = ['海南鑫达运输', '海南华通物流', '海南顺达货运', '海南恒通运输', '海南捷运物流'];
        const types = ['未覆盖', '超载', '违规倾倒', '路线偏离'];
        const statuses = ['已处置', '处置中', '未处置'];
        const items = [];
        for (let i = (page - 1) * 5; i < page * 5 && i < 34; i++) {
            items.push({
                code: `MZ${String(i + 1).padStart(6, '0')}`,
                company: companies[i % 5],
                plate: `琼A·${String(80001 + (i % 10)).padStart(5, '0')}`,
                type: types[i % 4],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i < 28 ? '已处置' : (i < 31 ? '处置中' : '未处置')
            });
        }
        const statusColors = { '已处置': '#34c759', '处置中': '#ff9500', '未处置': '#ff3b30' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.company}</td>
                <td>${item.plate}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span class="alert-screenshot">查看</span></td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initMuckTransportCharts() {}

    // ============ 沿街摆摊智能监控 ============
    renderStreetVendingModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">沿街摆摊智能监控</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控路段</span>
                        <span class="indicator-stat-value">156条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控点位</span>
                        <span class="indicator-stat-value">623个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日违规预警</span>
                        <span class="indicator-stat-value">89次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已劝离</span>
                        <span class="indicator-stat-value">76次(85.4%)</span>
                    </div>
                </div>
                <div class="indicator-modal-content indicator-modal-content-row">
                    <div class="indicator-modal-left">
                        <div class="indicator-search-box">
                            <input type="text" placeholder="搜索路段名称" class="indicator-search-input" id="street-search-input">
                            <button class="indicator-search-btn" onclick="window.supervisionPage.searchStreetVending()">搜索</button>
                        </div>
                        <div class="indicator-modal-table-wrap">
                            <table class="indicator-modal-table" id="street-vending-table">
                                <thead>
                                    <tr>
                                        <th>路段名称</th>
                                        <th>在线状态</th>
                                        <th>今日预警数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.generateStreetVendingTableRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="indicator-modal-right">
                        <div class="indicator-video-area">
                            <div class="indicator-video-header">
                                <span>当前路段：解放路商业街</span>
                                <div class="indicator-realtime-alert">
                                    <span class="alert-dot"></span>实时预警
                                </div>
                            </div>
                            <div class="indicator-video-frame">
                                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=street%20market%20vendors%20monitoring%20camera%20view%20with%20AI%20detection%20overlay%20boxes&image_size=landscape_16_9" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
                                <div class="ai-detection-box" style="top:30%;left:20%;width:25%;height:35%;border:2px solid #ff9500;"></div>
                                <div class="ai-detection-label" style="top:25%;left:20%;background:#ff9500;">占道经营</div>
                            </div>
                            <div class="indicator-video-thumbnails">
                                <div class="video-thumbnail">点位A1</div>
                                <div class="video-thumbnail">点位A2</div>
                                <div class="video-thumbnail active">点位A3</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="indicator-modal-footer">
                    <table class="indicator-modal-table" id="street-alert-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>路段名称</th>
                                <th>监控点位</th>
                                <th>预警类型</th>
                                <th>预警时间</th>
                                <th>预警截图</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateStreetAlertTableRows(1)}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn" id="street-prev-btn" disabled>上一页</button>
                        <span class="indicator-pagination-info">第 1 / 18 页</span>
                        <button class="indicator-pagination-btn" id="street-next-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStreetVendingTableRows() {
        const streets = ['解放路商业街', '中山路步行街', '人民大道', '滨海大道', '海秀东路'];
        const statusColors = { '在线': '#34c759', '离线': '#ff3b30' };
        return streets.map((street, i) => {
            const status = i % 3 !== 0 ? '在线' : '离线';
            return `
                <tr>
                    <td>${street}</td>
                    <td><span style="color: ${statusColors[status]};">${status}</span></td>
                    <td>${Math.floor(Math.random() * 15) + 1}</td>
                </tr>
            `;
        }).join('');
    }

    generateStreetAlertTableRows(page) {
        const streets = ['解放路商业街', '中山路步行街', '人民大道', '滨海大道', '海秀东路'];
        const types = ['占道经营', '超范围摆摊', '噪音扰民', '违规搭建'];
        const items = [];
        for (let i = (page - 1) * 5; i < page * 5 && i < 89; i++) {
            items.push({
                code: `YB${String(i + 1).padStart(6, '0')}`,
                street: streets[i % 5],
                point: `点位${String.fromCharCode(65 + (i % 5))}${Math.floor(Math.random() * 5) + 1}`,
                type: types[i % 4],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i < 76 ? '已劝离' : (i < 83 ? '处置中' : '未处置')
            });
        }
        const statusColors = { '已劝离': '#34c759', '处置中': '#ff9500', '未处置': '#ff3b30' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.street}</td>
                <td>${item.point}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span class="alert-screenshot">查看</span></td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initStreetVendingCharts() {}

    // ============ 智慧工地智能监控 ============
    renderSmartConstructionModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">智慧工地智能监控</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接入工地</span>
                        <span class="indicator-stat-value">234个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控点位</span>
                        <span class="indicator-stat-value">1,567个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日违规预警</span>
                        <span class="indicator-stat-value">45次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已处置</span>
                        <span class="indicator-stat-value">39次(86.7%)</span>
                    </div>
                </div>
                <div class="indicator-modal-content indicator-modal-content-row">
                    <div class="indicator-modal-left">
                        <div class="indicator-search-box">
                            <input type="text" placeholder="搜索工地名称" class="indicator-search-input" id="construction-search-input">
                            <button class="indicator-search-btn" onclick="window.supervisionPage.searchSmartConstruction()">搜索</button>
                        </div>
                        <div class="indicator-modal-table-wrap">
                            <table class="indicator-modal-table" id="construction-table">
                                <thead>
                                    <tr>
                                        <th>工地名称</th>
                                        <th>施工单位</th>
                                        <th>风险等级</th>
                                        <th>今日预警数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.generateConstructionTableRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="indicator-modal-right">
                        <div class="indicator-video-area">
                            <div class="indicator-video-header">
                                <span>当前工地：三亚湾壹号项目</span>
                                <span class="risk-level" style="color:#ff3b30;">风险等级：红色</span>
                            </div>
                            <div class="indicator-video-frame">
                                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=construction%20site%20safety%20monitoring%20camera%20view%20with%20AI%20detection%20overlay%20boxes%20for%20hardhat%20and%20safety%20belt&image_size=landscape_16_9" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
                                <div class="ai-detection-box" style="top:40%;left:30%;width:20%;height:35%;border:2px solid #ff3b30;"></div>
                                <div class="ai-detection-label" style="top:35%;left:30%;background:#ff3b30;">未戴安全帽</div>
                            </div>
                            <div class="indicator-video-thumbnails">
                                <div class="video-thumbnail">塔吊监控</div>
                                <div class="video-thumbnail">出入口</div>
                                <div class="video-thumbnail active">作业区</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="indicator-modal-footer">
                    <table class="indicator-modal-table" id="construction-alert-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>工地名称</th>
                                <th>预警类型</th>
                                <th>预警时间</th>
                                <th>预警截图</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateConstructionAlertTableRows(1)}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn" id="construction-prev-btn" disabled>上一页</button>
                        <span class="indicator-pagination-info">第 1 / 9 页</span>
                        <button class="indicator-pagination-btn" id="construction-next-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateConstructionTableRows() {
        const sites = ['三亚湾壹号项目', '海口世纪大厦', '文昌航天城', '万宁度假区', '琼海博鳌项目'];
        const companies = ['中建一局', '中建三局', '中铁建设', '海南建工', '广东建工'];
        const levels = ['红色', '橙色', '蓝色'];
        const levelColors = { '红色': '#ff3b30', '橙色': '#ff9500', '蓝色': '#00d4ff' };
        return sites.map((site, i) => {
            const level = levels[i % 3];
            return `
                <tr>
                    <td>${site}</td>
                    <td>${companies[i % 5]}</td>
                    <td><span style="color: ${levelColors[level]};">${level}</span></td>
                    <td>${Math.floor(Math.random() * 10)}</td>
                </tr>
            `;
        }).join('');
    }

    generateConstructionAlertTableRows(page) {
        const sites = ['三亚湾壹号项目', '海口世纪大厦', '文昌航天城', '万宁度假区', '琼海博鳌项目'];
        const types = ['未戴安全帽', '未系安全带', '人员越界', '扬尘超标', '噪声超标'];
        const items = [];
        for (let i = (page - 1) * 5; i < page * 5 && i < 45; i++) {
            items.push({
                code: `GD${String(i + 1).padStart(6, '0')}`,
                site: sites[i % 5],
                type: types[i % 5],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i < 39 ? '已处置' : (i < 42 ? '处置中' : '未处置')
            });
        }
        const statusColors = { '已处置': '#34c759', '处置中': '#ff9500', '未处置': '#ff3b30' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.site}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span class="alert-screenshot">查看</span></td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initSmartConstructionCharts() {}

    // ============ 秸秆焚烧智能监控 ============
    renderStrawBurningModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">秸秆焚烧智能监控</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控区域</span>
                        <span class="indicator-stat-value">89个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监控点位</span>
                        <span class="indicator-stat-value">345个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日火点预警</span>
                        <span class="indicator-stat-value">12次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已处置</span>
                        <span class="indicator-stat-value">11次(91.7%)</span>
                    </div>
                </div>
                <div class="indicator-modal-content indicator-modal-content-row">
                    <div class="indicator-modal-left">
                        <div class="indicator-search-box">
                            <input type="text" placeholder="搜索区域名称" class="indicator-search-input" id="straw-search-input">
                            <button class="indicator-search-btn" onclick="window.supervisionPage.searchStrawBurning()">搜索</button>
                        </div>
                        <div class="indicator-modal-table-wrap">
                            <table class="indicator-modal-table" id="straw-burning-table">
                                <thead>
                                    <tr>
                                        <th>区域名称</th>
                                        <th>风险等级</th>
                                        <th>今日预警数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.generateStrawBurningTableRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="indicator-modal-right">
                        <div class="indicator-video-area">
                            <div class="indicator-video-header">
                                <span>当前区域：文昌市东路镇</span>
                                <span class="risk-level" style="color:#ff9500;">风险等级：橙色</span>
                            </div>
                            <div class="indicator-video-frame">
                                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=agricultural%20field%20fire%20detection%20thermal%20camera%20view%20with%20smoke%20and%20flame%20AI%20detection%20overlay&image_size=landscape_16_9" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
                                <div class="ai-detection-box" style="top:45%;left:40%;width:15%;height:20%;border:2px solid #ff3b30;"></div>
                                <div class="ai-detection-label" style="top:40%;left:40%;background:#ff3b30;">明火检测</div>
                            </div>
                            <div class="indicator-video-thumbnails">
                                <div class="video-thumbnail">点位1</div>
                                <div class="video-thumbnail">点位2</div>
                                <div class="video-thumbnail active">点位3</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="indicator-modal-footer">
                    <table class="indicator-modal-table" id="straw-alert-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>区域名称</th>
                                <th>监控点位</th>
                                <th>预警类型</th>
                                <th>预警时间</th>
                                <th>预警截图</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateStrawAlertTableRows(1)}
                        </tbody>
                    </table>
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn" id="straw-prev-btn" disabled>上一页</button>
                        <span class="indicator-pagination-info">第 1 / 3 页</span>
                        <button class="indicator-pagination-btn" id="straw-next-btn">下一页</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStrawBurningTableRows() {
        const areas = ['文昌市东路镇', '定安县龙湖镇', '澄迈县金江镇', '临高县临城镇', '儋州市那大镇'];
        const levels = ['橙色', '蓝色', '蓝色', '橙色', '蓝色'];
        const levelColors = { '红色': '#ff3b30', '橙色': '#ff9500', '蓝色': '#00d4ff' };
        return areas.map((area, i) => {
            const level = levels[i];
            return `
                <tr>
                    <td>${area}</td>
                    <td><span style="color: ${levelColors[level]};">${level}</span></td>
                    <td>${Math.floor(Math.random() * 4)}</td>
                </tr>
            `;
        }).join('');
    }

    generateStrawAlertTableRows(page) {
        const areas = ['文昌市东路镇', '定安县龙湖镇', '澄迈县金江镇', '临高县临城镇', '儋州市那大镇'];
        const types = ['烟雾检测', '明火检测', '过火面积'];
        const items = [];
        for (let i = (page - 1) * 5; i < page * 5 && i < 12; i++) {
            items.push({
                code: `JH${String(i + 1).padStart(6, '0')}`,
                area: areas[i % 5],
                point: `点位${Math.floor(Math.random() * 10) + 1}`,
                type: types[i % 3],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i < 11 ? '已处置' : '未处置'
            });
        }
        const statusColors = { '已处置': '#34c759', '未处置': '#ff3b30' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.area}</td>
                <td>${item.point}</td>
                <td>${item.type}</td>
                <td>${item.time}</td>
                <td><span class="alert-screenshot">查看</span></td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initStrawBurningCharts() {}

    // ============ 风险预警动态监测全景 ============
    renderRiskWarningModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">风险预警动态监测全景</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日预警信号</span>
                        <span class="indicator-stat-value">45条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已处置</span>
                        <span class="indicator-stat-value">38条(84.4%)</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">待处置</span>
                        <span class="indicator-stat-value">7条(15.6%)</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">平均处置时长</span>
                        <span class="indicator-stat-value">2.3小时</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">预警等级分布</span>
                        <div id="modal-risk-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近7日预警趋势</span>
                        <div id="modal-risk-line" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>预警编号</th>
                                <th>预警类型</th>
                                <th>预警对象</th>
                                <th>预警等级</th>
                                <th>预警时间</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateRiskWarningTableRows()}
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

    generateRiskWarningTableRows() {
        const types = ['信用风险', '经营异常', '违法违规', '投诉举报', '舆情监测'];
        const levels = ['红色', '橙色', '黄色'];
        const allItems = [];
        for (let i = 1; i <= 45; i++) {
            allItems.push({
                code: `YX${String(i).padStart(6, '0')}`,
                type: types[i % 5],
                target: `企业${i}`,
                level: levels[i % 3],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i <= 38 ? '已处置' : '待处置'
            });
        }
        const items = allItems.slice(0, 5);
        const levelColors = { '红色': '#ff3b30', '橙色': '#ff9500', '黄色': '#ffcc00' };
        const statusColors = { '已处置': '#ffcc00', '待处置': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.type}</td>
                <td>${item.target}</td>
                <td><span style="color: ${levelColors[item.level]};">${item.level}</span></td>
                <td>${item.time}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initRiskWarningCharts() {
        const pieEl = document.getElementById('modal-risk-pie');
        const lineEl = document.getElementById('modal-risk-line');
        
        if (pieEl) {
            const pieChart = echarts.init(pieEl);
            pieChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}条 ({d}%)' },
                series: [{
                    type: 'pie',
                    radius: ['45%', '70%'],
                    center: ['50%', '50%'],
                    itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                    label: { show: true, position: 'inside', color: '#fff', fontSize: 11, formatter: '{b}\n{c}条' },
                    labelLine: { show: false },
                    data: [
                        { value: 12, name: '红色', itemStyle: { color: '#ff3b30' } },
                        { value: 18, name: '橙色', itemStyle: { color: '#ff9500' } },
                        { value: 15, name: '黄色', itemStyle: { color: '#ffcc00' } }
                    ]
                }]
            });
        }
        
        if (lineEl) {
            const lineChart = echarts.init(lineEl);
            lineChart.setOption({
                tooltip: { trigger: 'axis' },
                grid: { left: '8%', right: '8%', bottom: '8%', top: '10%' },
                xAxis: {
                    type: 'category',
                    data: ['7/3', '7/4', '7/5', '7/6', '7/7', '7/8', '7/9'],
                    axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } },
                    axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } },
                    axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }
                },
                series: [{
                    name: '预警数量',
                    type: 'line',
                    data: [32, 45, 38, 52, 48, 35, 45],
                    smooth: true,
                    itemStyle: { color: '#00d4ff' },
                    lineStyle: { color: '#00d4ff', width: 2 },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0,212,255,0.3)' },
                            { offset: 1, color: 'rgba(0,212,255,0.05)' }
                        ])
                    }
                }]
            });
        }
    }

    // ============ 网络舆情风险监测 ============
    renderNetworkPublicOpinionModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">网络舆情风险监测</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">今日舆情</span>
                        <span class="indicator-stat-value">128条</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">负面舆情</span>
                        <span class="indicator-stat-value">23条(17.9%)</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已处置</span>
                        <span class="indicator-stat-value">105条(82.1%)</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">重点舆情</span>
                        <span class="indicator-stat-value">5条</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">舆情情感分布</span>
                        <div id="modal-opinion-pie" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">舆情来源分布</span>
                        <div id="modal-opinion-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>舆情标题</th>
                                <th>来源平台</th>
                                <th>情感倾向</th>
                                <th>发布时间</th>
                                <th>处置状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateNetworkOpinionTableRows()}
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

    generateNetworkOpinionTableRows() {
        const sources = ['微博', '微信', '新闻网站', '论坛', '短视频'];
        const sentiments = ['正面', '中性', '负面'];
        const allItems = [];
        for (let i = 1; i <= 50; i++) {
            allItems.push({
                title: `舆情信息${i}`,
                source: sources[i % 5],
                sentiment: sentiments[i % 3],
                time: `2026-07-09 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                status: i <= 40 ? '已处置' : '待处置'
            });
        }
        const items = allItems.slice(0, 5);
        const sentimentColors = { '正面': '#34c759', '中性': '#ffcc00', '负面': '#ff3b30' };
        const statusColors = { '已处置': '#ffcc00', '待处置': '#ff9500' };
        return items.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${item.source}</td>
                <td><span style="color: ${sentimentColors[item.sentiment]};">${item.sentiment}</span></td>
                <td>${item.time}</td>
                <td><span style="color: ${statusColors[item.status]};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initNetworkPublicOpinionCharts() {
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
                    { value: 65, name: '正面', itemStyle: { color: '#34c759' } },
                    { value: 40, name: '中性', itemStyle: { color: '#ffcc00' } },
                    { value: 23, name: '负面', itemStyle: { color: '#ff3b30' } }
                ]
            }]
        });

        const bar = echarts.init(document.getElementById('modal-opinion-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}条' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['微博', '微信', '新闻网站', '论坛', '短视频'], axisLabel: { fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}条' } },
            series: [{
                type: 'bar',
                data: [45, 38, 25, 12, 8],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });
    }

    // ==================== 4个全景分析弹窗（监管依据/主体/对象/事项） ====================
    openModal(type) {
        if (['sv_check_item','sv_check_case','sv_problem_count','sv_clue_transfer','sv_verify_action','sv_check_reduce'].includes(type)) {
            this.openSupervisionTrendModal(type);
            return;
        }
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';

        switch(type) {
            case 'sv_basis':
                overlay.innerHTML = this.renderPanoramaModal({
                    modalKey: 'sv_basis',
                    title: '监管依据全景分析',
                    kpiCols: 4,
                    kpis: [
                        { label: '监管依据总数', value: '30,000', suffix: '个', highlight: 'total' },
                        { label: '法律',         value: '5,000',  suffix: '个' },
                        { label: '行政法规',     value: '5,000',  suffix: '个' },
                        { label: '地方性法规',   value: '5,000',  suffix: '个' },
                        { label: '部门规章',     value: '5,000',  suffix: '个' },
                        { label: '政府规章',     value: '5,000',  suffix: '个' },
                        { label: '国务院命令决定', value: '5,000', suffix: '个' }
                    ],
                    chart1Title: '六类监管依据数量对比',
                    chart1Type: 'bar',
                    chart1Data: {
                        x: ['法律','行政法规','地方性法规','部门规章','政府规章','国务院命令决定'],
                        y: [5000, 5000, 5000, 5000, 5000, 5000]
                    },
                    chart2Title: '各类依据占比',
                    chart2Type: 'pie',
                    chart2Data: [
                        { value: 5000, name: '法律',         itemStyle: { color: '#4a9eff' } },
                        { value: 5000, name: '行政法规',     itemStyle: { color: '#ff7f50' } },
                        { value: 5000, name: '地方性法规',   itemStyle: { color: '#ffcc00' } },
                        { value: 5000, name: '部门规章',     itemStyle: { color: '#00c853' } },
                        { value: 5000, name: '政府规章',     itemStyle: { color: '#af52de' } },
                        { value: 5000, name: '国务院命令决定', itemStyle: { color: '#ff4081' } }
                    ],
                    tableTitle: '监管依据明细列表',
                    table: {
                        header: ['依据名称','依据类型','发布机关','施行日期','效力状态'],
                        rows: [
                            ['《中华人民共和国行政许可法》','法律','全国人大常委会','2019-12-01','有效'],
                            ['《市场主体登记管理条例》','行政法规','国务院','2022-03-01','有效'],
                            ['《海南省热带雨林保护条例》','地方性法规','海南省人大常委会','2021-10-01','有效'],
                            ['《网络食品安全违法行为查处办法》','部门规章','国家市场监管总局','2021-12-06','修订'],
                            ['《海南省公共数据管理办法》','政府规章','海南省人民政府','2021-12-01','有效'],
                            ['《互联网信息服务管理办法》','国务院命令决定','国务院','2011-01-08','有效'],
                            ['《中华人民共和国反不正当竞争法》','法律','全国人大常委会','2019-04-23','有效'],
                            ['《企业信息公示暂行条例》','行政法规','国务院','2014-10-01','有效'],
                            ['《海南自由贸易港社会信用条例》','地方性法规','海南省人大常委会','2022-01-01','有效'],
                            ['《食品生产经营监督检查管理办法》','部门规章','国家市场监管总局','2022-03-15','有效'],
                            ['《海南省价格监测管理规定》','政府规章','海南省人民政府','2020-04-01','废止'],
                            ['《关于取消和下放一批行政许可事项的决定》','国务院命令决定','国务院','2022-01-10','有效'],
                            ['《中华人民共和国药品管理法》','法律','全国人大常委会','2019-12-01','有效'],
                            ['《建设工程质量管理条例》','行政法规','国务院','2019-04-23','修订'],
                            ['《海南省城乡规划条例》','地方性法规','海南省人大常委会','2018-08-02','有效']
                        ]
                    }
                });
                break;
            case 'sv_subject':
                overlay.innerHTML = this.renderPanoramaModal({
                    modalKey: 'sv_subject',
                    title: '监管主体全景分析',
                    kpiCols: 4,
                    kpis: [
                        { label: '监管主体总数', value: '350',   suffix: '个', highlight: 'total' },
                        { label: '执法人员总数', value: '1.00',  suffix: '万人', highlight: 'total' },
                        { label: '省级主体',     value: '0',     suffix: '个' },
                        { label: '市级主体',     value: '100',   suffix: '个' },
                        { label: '区县级主体',   value: '200',   suffix: '个' },
                        { label: '乡镇街道主体', value: '50',    suffix: '个' }
                    ],
                    chart1Title: '四级监管主体数量对比',
                    chart1Type: 'bar',
                    chart1Data: {
                        x: ['省级','市级','区县级','乡镇街道'],
                        y: [0, 100, 200, 50]
                    },
                    chart2Title: '执法人员层级分布',
                    chart2Type: 'pie',
                    chart2Data: [
                        { value: 0,    name: '省级',     itemStyle: { color: '#ff4081' } },
                        { value: 4000, name: '市级',     itemStyle: { color: '#4a9eff' } },
                        { value: 5000, name: '区县级',   itemStyle: { color: '#00c853' } },
                        { value: 1000, name: '乡镇街道', itemStyle: { color: '#ff7f50' } }
                    ],
                    tableTitle: '监管主体明细列表',
                    table: {
                        header: ['主体名称','所属层级','执法人员数','监管领域','状态'],
                        rows: [
                            ['海口市市场监督管理局','市级',320,'市场监管/价格/知识产权','正常'],
                            ['三亚市综合行政执法局','市级',280,'全领域综合执法','正常'],
                            ['儋州市生态环境局','市级',95,'生态环境监管','正常'],
                            ['琼海市卫生健康委员会','区县级',78,'卫生健康执法','正常'],
                            ['文昌市交通运输局','区县级',66,'交通运输监管','正常'],
                            ['万宁市应急管理局','区县级',52,'安全生产/应急执法','正常'],
                            ['澄迈县农业农村局','区县级',61,'农业/农资/畜牧执法','正常'],
                            ['东方市自然资源和规划局','区县级',70,'土地/矿产/规划执法','正常'],
                            ['五指山市旅游文化广电体育局','区县级',38,'旅游/文化市场执法','正常'],
                            ['定安县税务局','区县级',89,'税务稽查/税费征管','正常'],
                            ['临高县综合行政执法局','区县级',120,'全领域综合执法','正常'],
                            ['陵水县新村镇人民政府','乡镇街道',15,'乡镇综合执法','正常'],
                            ['昌江县石碌镇人民政府','乡镇街道',18,'乡镇综合执法','正常'],
                            ['屯昌县乌坡镇人民政府','乡镇街道',11,'乡镇综合执法','撤销'],
                            ['乐东县九所镇人民政府','乡镇街道',14,'乡镇综合执法','正常']
                        ]
                    }
                });
                break;
            case 'sv_object':
                overlay.innerHTML = this.renderPanoramaModal({
                    modalKey: 'sv_object',
                    title: '监管对象全景分析',
                    kpiCols: 4,
                    kpis: [
                        { label: '监管对象总数', value: '80.08', suffix: '万个', highlight: 'total' },
                        { label: '主体类对象',   value: '40.04', suffix: '万个' },
                        { label: '客体类对象',   value: '40.04', suffix: '万个' },
                        { label: '覆盖率',       value: '100',   suffix: '%' }
                    ],
                    chart1Title: '八类监管对象数量对比',
                    chart1Type: 'bar',
                    chart1Data: {
                        x: ['企业','个体工商户','项目工程','场地场所','特定自然人','其他组织','特定产品','特种设备'],
                        y: [10.01, 10.01, 10.01, 10.01, 10.01, 10.01, 10.01, 10.01]
                    },
                    chart2Title: '主体类 / 客体类占比',
                    chart2Type: 'pie',
                    chart2Data: [
                        { value: 40.04, name: '主体类对象', itemStyle: { color: '#4a9eff' } },
                        { value: 40.04, name: '客体类对象', itemStyle: { color: '#ffcc00' } }
                    ],
                    tableTitle: '监管对象明细列表',
                    table: {
                        header: ['对象名称','对象类型','具体分类','所属区域','监管状态'],
                        rows: [
                            ['海南XX科技有限公司','主体类','企业','海口市','在册'],
                            ['海口XX个体餐饮店','主体类','个体工商户','海口市','在册'],
                            ['XX高速扩建A标段','客体类','项目工程','琼中县','在册'],
                            ['三亚XX国际酒店','客体类','场地场所','三亚市','在册'],
                            ['执业医师王某某','主体类','特定自然人','儋州市','在册'],
                            ['文昌XX农民合作社','主体类','其他组织','文昌市','在册'],
                            ['批次20260701瓶装液化气','客体类','特定产品','澄迈县','在册'],
                            ['琼海XX小区电梯01号','客体类','特种设备','琼海市','在册'],
                            ['万宁XX食品加工厂','主体类','企业','万宁市','注销'],
                            ['屯昌XX建材商行','主体类','个体工商户','屯昌县','在册'],
                            ['XX安置区建设项目','客体类','项目工程','五指山市','在册'],
                            ['东方XX网吧','客体类','场地场所','东方市','在册'],
                            ['执业药师李某某','主体类','特定自然人','定安县','在册'],
                            ['临高XX渔业协会','主体类','其他组织','临高县','在册'],
                            ['乐东XX小区燃气锅炉','客体类','特种设备','乐东县','在册']
                        ]
                    }
                });
                break;
            case 'sv_matter':
                overlay.innerHTML = this.renderPanoramaModal({
                    modalKey: 'sv_matter',
                    title: '监管事项全景分析',
                    kpiCols: 5,
                    kpis: [
                        { label: '监管事项总数', value: '6,680', suffix: '项', highlight: 'total' },
                        { label: '行政检查',     value: '2,672', suffix: '项' },
                        { label: '行政处罚',     value: '2,005', suffix: '项' },
                        { label: '行政强制',     value: '1,336', suffix: '项' },
                        { label: '其他',         value: '667',   suffix: '项' }
                    ],
                    chart1Title: '监管事项类型分布',
                    chart1Type: 'pie',
                    chart1Data: [
                        { value: 2672, name: '行政检查', itemStyle: { color: '#4a9eff' } },
                        { value: 2005, name: '行政处罚', itemStyle: { color: '#ff7f50' } },
                        { value: 1336, name: '行政强制', itemStyle: { color: '#ffcc00' } },
                        { value: 667,  name: '其他',     itemStyle: { color: '#af52de' } }
                    ],
                    chart2Title: '各领域监管事项数量 TOP10',
                    chart2Type: 'bar',
                    chart2Data: {
                        x: ['市场监管','生态环境','交通运输','卫生健康','文化旅游','应急管理','农业农村','城市管理','税务','海关'],
                        y: [880, 820, 780, 720, 650, 620, 580, 540, 520, 570]
                    },
                    tableTitle: '监管事项明细列表',
                    table: {
                        header: ['事项名称','事项类型','所属领域','设定依据','实施主体','状态'],
                        rows: [
                            ['对食品生产活动的监督检查','行政检查','市场监管','《食品安全法》第110条','省市县市场监管局','已发布'],
                            ['对超标排放污染物的行政处罚','行政处罚','生态环境','《环境保护法》第59条','生态环境主管部门','已发布'],
                            ['对道路运输经营者违规的行政强制','行政强制','交通运输','《道路运输条例》第62条','交通运输主管部门','已发布'],
                            ['对医疗机构执业的监督检查','行政检查','卫生健康','《医疗机构管理条例》第40条','卫健委综合监督局','已发布'],
                            ['对旅行社虚假宣传的行政处罚','行政处罚','文化旅游','《旅游法》第97条','文旅综合执法部门','已发布'],
                            ['对危险化学品经营的行政强制','行政强制','应急管理','《危险化学品安全管理条例》第7条','应急管理部门','已发布'],
                            ['对农产品质量安全的监督检查','行政检查','农业农村','《农产品质量安全法》第39条','农业农村主管部门','已发布'],
                            ['对违法占道经营的行政处罚','行政处罚','城市管理','《城市市容和环境卫生管理条例》','综合执法局','已发布'],
                            ['对逃避缴纳税款的行政强制','行政强制','税务','《税收征收管理法》第40条','税务稽查部门','已发布'],
                            ['对进出口商品的检验监管','其他','海关','《进出口商品检验法》第5条','隶属海关','已发布'],
                            ['对药品经营活动的监督检查','行政检查','市场监管','《药品管理法》第99条','药品监管部门','已发布'],
                            ['对大气污染防治设施的监督检查','行政检查','生态环境','《大气污染防治法》第29条','生态环境主管部门','已发布'],
                            ['对非法营运车辆的行政处罚','行政处罚','交通运输','《道路运输条例》第63条','交通运输综合执法','已发布'],
                            ['对存在事故隐患的单位行政强制','行政强制','应急管理','《安全生产法》第65条','应急管理执法队伍','已发布'],
                            ['对旅馆业特种行业的监督检查','行政检查','公安','《旅馆业治安管理办法》第14条','属地公安部门','已下架']
                        ]
                    }
                });
                break;
        }

        document.body.appendChild(overlay);
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', e => { if (e.target === overlay) this.closeModal(); });
        setTimeout(() => this.initPanoramaCharts(type), 80);
    }

    openPushDataModal() {
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        this.svModalData = Array.from({ length: 30 }, (_, i) => ({
            id: 'TS' + String(i + 1).padStart(6, '0'),
            name: ['违法线索', '检查结果'][i % 2],
            dept: ['省市场监管局', '省住建厅', '省卫健委', '省交通厅'][i % 4],
            count: Math.floor(Math.random() * 500) + 100,
            date: '2026-07-' + String(i % 28 + 1).padStart(2, '0')
        }));
        this.svCurrentPage = 1;
        overlay.innerHTML = `
            <div class="indicator-modal">
                <div class="indicator-modal-header"><span class="indicator-modal-title">推送数据分析</span><button class="indicator-modal-close">×</button></div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">推送数据总量</span><span class="indicator-stat-value">7.5万条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">违法线索</span><span class="indicator-stat-value">60%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">检查结果</span><span class="indicator-stat-value">40%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">覆盖部门</span><span class="indicator-stat-value">26个</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">推送数据类型分布</span><div id="sv-modal-push-pie" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各部门推送数据量</span><div id="sv-modal-push-bar" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table"><thead><tr><th>序号</th><th>推送编号</th><th>数据类型</th><th>推送部门</th><th>推送数量</th><th>推送日期</th></tr></thead>
                    <tbody>${this.svModalData.slice(0, this.pageSize).map((d, i) => `<tr><td>${i + 1}</td><td>${d.id}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('')}</tbody></table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="sv-modal-prev" disabled>上一页</button>
                    <span class="indicator-pagination-info">第 1 / ${Math.ceil(this.svModalData.length / this.pageSize)} 页</span>
                    <button class="indicator-pagination-btn" id="sv-modal-next">下一页</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.bindSvModalEvents(overlay);
        setTimeout(() => this.initSvPushModalCharts(), 80);
    }

    openReceiveDataModal() {
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        this.svModalData = Array.from({ length: 30 }, (_, i) => ({
            id: 'SD' + String(i + 1).padStart(6, '0'),
            name: ['一般类办件', '承诺类办件', '处罚结果', '信用数据'][i % 4],
            dept: ['省市场监管局', '省综合执法局', '省信用办', '省审批局'][i % 4],
            count: Math.floor(Math.random() * 500) + 100,
            date: '2026-07-' + String(i % 28 + 1).padStart(2, '0')
        }));
        this.svCurrentPage = 1;
        overlay.innerHTML = `
            <div class="indicator-modal">
                <div class="indicator-modal-header"><span class="indicator-modal-title">收到数据分析</span><button class="indicator-modal-close">×</button></div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">收到数据总量</span><span class="indicator-stat-value">5.2万条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">一般类办件</span><span class="indicator-stat-value">30%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">承诺类办件</span><span class="indicator-stat-value">25%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">处罚结果</span><span class="indicator-stat-value">28%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">信用数据</span><span class="indicator-stat-value">17%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">覆盖部门</span><span class="indicator-stat-value">22个</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">收到数据类型分布</span><div id="sv-modal-receive-pie" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各来源收到数据量</span><div id="sv-modal-receive-bar" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table"><thead><tr><th>序号</th><th>接收编号</th><th>数据类型</th><th>来源部门</th><th>接收数量</th><th>接收日期</th></tr></thead>
                    <tbody>${this.svModalData.slice(0, this.pageSize).map((d, i) => `<tr><td>${i + 1}</td><td>${d.id}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('')}</tbody></table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="sv-modal-prev" disabled>上一页</button>
                    <span class="indicator-pagination-info">第 1 / ${Math.ceil(this.svModalData.length / this.pageSize)} 页</span>
                    <button class="indicator-pagination-btn" id="sv-modal-next">下一页</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.bindSvModalEvents(overlay);
        setTimeout(() => this.initSvReceiveModalCharts(), 80);
    }

    bindSvModalEvents(overlay) {
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
        const prevBtn = overlay.querySelector('#sv-modal-prev');
        const nextBtn = overlay.querySelector('#sv-modal-next');
        prevBtn?.addEventListener('click', () => {
            if (this.svCurrentPage > 1) { this.svCurrentPage--; this.updateSvModal(overlay); }
        });
        nextBtn?.addEventListener('click', () => {
            if (this.svCurrentPage < Math.ceil(this.svModalData.length / this.pageSize)) { this.svCurrentPage++; this.updateSvModal(overlay); }
        });
    }

    updateSvModal(overlay) {
        const start = (this.svCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = this.svModalData.slice(start, end);
        const totalPages = Math.ceil(this.svModalData.length / this.pageSize);
        const tbody = overlay.querySelector('tbody');
        tbody.innerHTML = pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.id}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('');
        overlay.querySelector('#sv-modal-prev').disabled = this.svCurrentPage <= 1;
        overlay.querySelector('#sv-modal-next').disabled = this.svCurrentPage >= totalPages;
        overlay.querySelector('.indicator-pagination-info').textContent = `第 ${this.svCurrentPage} / ${totalPages} 页`;
    }

    initSvPushModalCharts() {
        const pieChart = echarts.init(document.getElementById('sv-modal-push-pie'));
        pieChart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie', radius: ['45%', '70%'], center: ['50%', '50%'],
                data: [{ value: 60, name: '违法线索', itemStyle: { color: '#00d4ff' } }, { value: 40, name: '检查结果', itemStyle: { color: '#34c759' } }]
            }]
        });
        const barChart = echarts.init(document.getElementById('sv-modal-push-bar'));
        barChart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '10%', right: '5%', top: '15%', bottom: '10%' },
            xAxis: { type: 'category', data: ['市场监管', '住建', '卫健', '交通'], axisLabel: { color: '#fff' } },
            yAxis: { type: 'value', axisLabel: { color: '#fff' } },
            series: [{ type: 'bar', data: [3500, 2800, 2200, 1800], itemStyle: { color: '#00d4ff' } }]
        });
    }

    initSvReceiveModalCharts() {
        const pieChart = echarts.init(document.getElementById('sv-modal-receive-pie'));
        pieChart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie', radius: ['45%', '70%'], center: ['50%', '50%'],
                data: [
                    { value: 30, name: '一般类办件', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '承诺类办件', itemStyle: { color: '#34c759' } },
                    { value: 28, name: '处罚结果', itemStyle: { color: '#ff9500' } },
                    { value: 17, name: '信用数据', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
        const barChart = echarts.init(document.getElementById('sv-modal-receive-bar'));
        barChart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '10%', right: '5%', top: '15%', bottom: '10%' },
            xAxis: { type: 'category', data: ['市场监管', '综合执法', '信用办', '审批局'], axisLabel: { color: '#fff' } },
            yAxis: { type: 'value', axisLabel: { color: '#fff' } },
            series: [{ type: 'bar', data: [2500, 2000, 1500, 1200], itemStyle: { color: '#34c759' } }]
        });
    }

    openLawDataModal() {
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';

        const months = ['2025-06','2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05'];
        const trendData = [4520, 4890, 5230, 4980, 5560, 5890, 6230, 5120, 4860, 5430, 6120, 6540];

        const sourceData = [
            { value: 25500, name: '双随机一公开', itemStyle: { color: '#4a9eff' } },
            { value: 18750, name: '综合查一次', itemStyle: { color: '#00c853' } },
            { value: 12750, name: '有因检查', itemStyle: { color: '#ffcc00' } },
            { value: 9750, name: '重点检查', itemStyle: { color: '#ff7f50' } },
            { value: 8250, name: '专项检查', itemStyle: { color: '#af52de' } }
        ];

        const tableRows = [];
        const statuses = ['待受理', '办理中', '已办结'];
        const types = ['行政处罚', '行政检查', '行政强制', '其他'];
        const depts = ['海口市市场监管局', '三亚市综合执法局', '儋州市生态环境局', '琼海市卫健委', '文昌市交通局', '万宁市应急管理局', '澄迈县农业农村局', '东方市自然资源局', '五指山市旅游局', '定安县税务局'];
        const recvDepts = ['海南省市场监管局', '海南省综合执法局', '海南省生态环境厅', '海南省卫健委', '海南省交通厅', '海南省应急管理厅'];

        for (let i = 1; i <= 15; i++) {
            const id = `ZF${String(i).padStart(6, '0')}`;
            const name = `海南${['科技','实业','商贸','物流','旅游','农业','建材','电子','食品','医药'][i%10]}有限公司`;
            const credit = `${Math.floor(Math.random()*9)+1}${String(Math.floor(Math.random()*1000000000000)).padStart(12, '0')}`;
            const type = types[i%4];
            const sendDept = depts[i%10];
            const recvDept = recvDepts[i%6];
            const date = `${2025+Math.floor(i/12)}-${String((i%12)+1).padStart(2,'0')}-${String(Math.floor(Math.random()*28)+1).padStart(2,'0')}`;
            const status = statuses[Math.floor(Math.random()*3)];
            tableRows.push([id, name, credit, type, sendDept, recvDept, date, status]);
        }

        overlay.innerHTML = this.renderPanoramaModal({
            modalKey: 'law_data',
            title: '推送执法数据量分析',
            kpiCols: 4,
            kpis: [
                { label: '累计推送总量', value: '7.5', suffix: '万条', highlight: 'total' },
                { label: '本月推送',     value: '3,245', suffix: '条' },
                { label: '已接收',       value: '7.2', suffix: '万条' },
                { label: '接收率',       value: '96', suffix: '%' }
            ],
            chart1Title: '近12个月推送执法数据趋势',
            chart1Type: 'line',
            chart1Data: {
                x: months,
                y: trendData
            },
            chart2Title: '推送数据来源分布',
            chart2Type: 'pie',
            chart2Data: sourceData,
            tableTitle: '推送执法数据明细列表',
            table: {
                header: ['任务编号','当事人名称','统一社会信用代码','推送数据类型','推送部门','接收部门','推送时间','接收状态'],
                rows: tableRows
            }
        });

        document.body.appendChild(overlay);
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', e => { if (e.target === overlay) this.closeModal(); });
        setTimeout(() => this.initPanoramaCharts('law_data'), 80);
    }

    closeModal() {
        const el = document.querySelector('.indicator-modal-overlay');
        if (el) el.remove();
    }

    renderPanoramaModal(cfg) {
        this._panoCfg = cfg;
        this._panoPageSize = 5;
        this._panoPage = 1;
        this._panoTotal = cfg.table.rows.length;
        this._panoPages = Math.max(1, Math.ceil(this._panoTotal / this._panoPageSize));

        const cols = cfg.kpiCols || 4;
        const kpisHtml = cfg.kpis.map(k => {
            const cls = k.highlight === 'total' ? 'value-total' : '';
            return `<div class="trend-kpi-card pano-kpi-card pano-kpi-col-${cols}">
                <span class="trend-kpi-label">${k.label}</span>
                <span class="trend-kpi-value ${cls}">${k.value}${k.suffix || ''}</span>
            </div>`;
        }).join('');

        return `
        <div class="indicator-modal panorama-modal" style="width:85vw;max-width:1400px;">
            <div class="indicator-modal-header">
                <span class="indicator-modal-title">${cfg.title}</span>
                <button class="indicator-modal-close">×</button>
            </div>
            <div class="pano-kpi-wrap" style="grid-template-columns: repeat(${cols}, 1fr);">
                ${kpisHtml}
            </div>
            <div class="trend-charts-row">
                <div class="trend-chart-box trend-chart-main">
                    <div class="trend-chart-title">${cfg.chart1Title}</div>
                    <div id="pano-chart-left" class="trend-chart-container"></div>
                </div>
                <div class="trend-chart-box trend-chart-pie">
                    <div class="trend-chart-title">${cfg.chart2Title}</div>
                    <div id="pano-chart-right" class="trend-chart-container"></div>
                </div>
            </div>
            <div class="trend-table-wrap">
                <div class="trend-table-title">${cfg.tableTitle}</div>
                <div class="trend-table-scroller">
                    <table class="trend-data-table">
                        <thead><tr>${cfg.table.header.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                        <tbody id="pano-tbody">${this._renderPanoramaTbody()}</tbody>
                    </table>
                </div>
                <div class="trend-pager-bar" id="pano-pager">${this._renderPanoramaPager()}</div>
            </div>
        </div>`;
    }

    _renderPanoramaTbody() {
        const cfg = this._panoCfg;
        if (!cfg) return '';
        const start = (this._panoPage - 1) * this._panoPageSize;
        const rows = cfg.table.rows.slice(start, start + this._panoPageSize);
        return rows.map(r => {
            const cells = r.map((c, i) => {
                if (i === r.length - 1 && ['待受理', '办理中', '已办结'].includes(c)) {
                    const cls = c === '待受理' ? 'status-pending' : c === '办理中' ? 'status-processing' : 'status-completed';
                    return `<td><span class="status-badge ${cls}">${c}</span></td>`;
                }
                return `<td>${c}</td>`;
            });
            return `<tr>${cells.join('')}</tr>`;
        }).join('');
    }

    _renderPanoramaPager() {
        const t = this._panoTotal, cur = this._panoPage, last = this._panoPages;
        return `
        <div class="trend-pager-bar" style="margin-top:6px;">
            <span class="trend-pager-info">共 <b>${t}</b> 条 / 每页 <b>${this._panoPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
            <div class="trend-pager-btns">
                <button class="trend-pager-btn ${cur<=1?'disabled':''}"
                        onclick="window.supervisionPage.switchPanoramaPage(-1)">上一页</button>
                <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                <button class="trend-pager-btn ${cur>=last?'disabled':''}"
                        onclick="window.supervisionPage.switchPanoramaPage(1)">下一页</button>
            </div>
        </div>`;
    }

    switchPanoramaPage(delta) {
        const next = this._panoPage + delta;
        if (next < 1 || next > this._panoPages) return;
        this._panoPage = next;
        const b = document.getElementById('pano-tbody');
        if (b) b.innerHTML = this._renderPanoramaTbody();
        const p = document.getElementById('pano-pager');
        if (p) {
            const w = document.createElement('div');
            w.innerHTML = this._renderPanoramaPager();
            p.parentNode.replaceChild(w.firstElementChild, p);
        }
    }

    initPanoramaCharts(type) {
        const cfg = this._panoCfg;
        if (!cfg) return;
        const leftEl = document.getElementById('pano-chart-left');
        const rightEl = document.getElementById('pano-chart-right');
        if (!leftEl || !rightEl) return;

        const renderBar = (el, data, unit) => {
            const ch = echarts.init(el);
            ch.setOption({
                textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '4%', right: '4%', top: '10%', bottom: '18%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: data.x,
                    axisLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 11, interval: 0, rotate: type === 'sv_matter' ? 28 : 14 },
                    axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } }
                },
                yAxis: {
                    type: 'value',
                    name: unit || '',
                    nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                    axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                    splitLine: { lineStyle: { color: 'rgba(0,180,255,0.08)' } }
                },
                series: [{
                    type: 'bar',
                    barWidth: '45%',
                    data: data.y,
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
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 11,
                        formatter: (p) => p.value
                    }
                }]
            });
            return ch;
        };

        const renderPie = (el, data) => {
            const ch = echarts.init(el);
            ch.setOption({
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
                    data: data
                }]
            });
            return ch;
        };

        const renderLine = (el, data, unit) => {
            const ch = echarts.init(el);
            ch.setOption({
                textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                tooltip: { trigger: 'axis', axisPointer: { type: 'line' } },
                grid: { left: '4%', right: '4%', top: '10%', bottom: '18%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: data.x,
                    axisLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 11, interval: 0, rotate: 28 },
                    axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } }
                },
                yAxis: {
                    type: 'value',
                    name: unit || '',
                    nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
                    axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
                    splitLine: { lineStyle: { color: 'rgba(0,180,255,0.08)' } }
                },
                series: [{
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    data: data.y,
                    lineStyle: {
                        color: '#00d4ff',
                        width: 2
                    },
                    itemStyle: {
                        color: '#00d4ff',
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0,212,255,0.3)' },
                            { offset: 1, color: 'rgba(0,212,255,0.05)' }
                        ])
                    },
                    label: {
                        show: false
                    }
                }]
            });
            return ch;
        };

        const leftChart = cfg.chart1Type === 'pie'
            ? renderPie(leftEl, cfg.chart1Data)
            : cfg.chart1Type === 'line'
                ? renderLine(leftEl, cfg.chart1Data, cfg.chart1Unit || '')
                : renderBar(leftEl, cfg.chart1Data, cfg.chart1Unit || '');
        const rightChart = cfg.chart2Type === 'pie'
            ? renderPie(rightEl, cfg.chart2Data)
            : renderBar(rightEl, cfg.chart2Data, cfg.chart2Unit || '');

        const handler = () => { try { leftChart.resize(); rightChart.resize(); } catch(e) {} };
        window.addEventListener('resize', handler);
        leftEl._panoResizer = handler;
    }

    // ==================== 新增：4个趋势弹窗（检查事项/检查办件/线索移送/核查行为） ====================
    openSupervisionTrendModal(type) {
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';

        const months = ['25年8月','25年9月','25年10月','25年11月','25年12月','26年1月','26年2月','26年3月','26年4月','26年5月','26年6月','26年7月'];

        switch(type) {
            case 'sv_check_item': {
                const curYear  = [78, 82, 85, 88, 92, 88, 90, 92, 95, 96, 98, 99];
                const lastYear = [85, 88, 92, 95, 98, 95, 100, 102, 105, 106, 107, 108];
                overlay.innerHTML = this.renderSupervisionTrend({
                    title: '检查事项总量趋势分析',
                    kpis: [
                        { label: '检查事项总数', value: '99',   suffix: '项' },
                        { label: '去年同期',     value: '108',  suffix: '项' },
                        { label: '同比减少',     value: '9',    suffix: '项' },
                        { label: '同比下降',     value: '8.3',  suffix: '%', highlight: 'down' }
                    ],
                    leftTitle: '事项数最多的领域 TOP10',
                    leftType: 'top10Bar',
                    leftTop10: {
                        areas: ['食品药品监管','特种设备安全','产品质量监督','安全生产监管','生态环境保护','道路交通执法','市场主体登记','税收征缴核查','公共卫生监督','文化市场监管'],
                        values: [820, 756, 684, 622, 568, 512, 478, 435, 392, 358],
                        unit: '项'
                    },
                    rightTitle: '检查事项类型分布',
                    rightPie: [
                        { value: 35, name: '日常检查',     itemStyle: { color: '#4a9eff' } },
                        { value: 25, name: '专项检查',     itemStyle: { color: '#ff7f50' } },
                        { value: 24, name: '双随机检查',   itemStyle: { color: '#00c853' } },
                        { value: 15, name: '重点检查',     itemStyle: { color: '#ffcc00' } }
                    ],
                    tableTitle: '检查事项明细列表',
                    tableHeader: ['事项编码','事项名称','所属部门'],
                    tableRows: [
                        ['JC20260001','餐饮服务食品安全日常检查','海南省市场监管局'],
                        ['JC20260002','特种设备安全专项监察','海南省市场监管局'],
                        ['JC20260003','药品经营质量管理双随机检查','海南省药监局'],
                        ['JC20260004','市场主体登记事项核查','海口市市场监管局'],
                        ['JC20260005','产品质量监督抽查','海南省市场监管局'],
                        ['JC20260006','计量器具强制检定','海南省市场监管局'],
                        ['JC20260007','广告发布内容日常审查','海南省市场监管局'],
                        ['JC20260008','建设工程质量专项检查','海南省住建厅'],
                        ['JC20260009','道路运输车辆双随机检查','海南省交通厅'],
                        ['JC20260010','生活饮用水卫生重点检查','海南省卫健委'],
                        ['JC20260011','危化品经营安全专项检查','海南省应急管理厅'],
                        ['JC20260012','医疗废物处置日常检查','海南省生态环境厅'],
                        ['JC20260013','娱乐场所经营双随机检查','海南省旅文厅'],
                        ['JC20260014','纳税申报情况日常核查','海南省税务局'],
                        ['JC20260015','农业投入品质量专项检查','海南省农业农村厅']
                    ]
                });
                break;
            }
            case 'sv_check_case': {
                const curYear  = [75, 82, 88, 95, 100, 98, 96, 102, 105, 100, 99, 900];
                const lastYear = [85, 92, 98, 105, 110, 108, 106, 112, 115, 110, 108, 1023];
                overlay.innerHTML = this.renderSupervisionTrend({
                    title: '检查企次总量趋势分析',
                    kpis: [
                        { label: '检查企次总量', value: '900',   suffix: '次' },
                        { label: '去年同期',     value: '1,023',  suffix: '次' },
                        { label: '同比减少',     value: '123',    suffix: '次' },
                        { label: '同比下降',     value: '12',     suffix: '%', highlight: 'down' }
                    ],
                    leftTitle: '检查企次最多的领域 TOP10',
                    leftType: 'topBar',
                    topBarData: {
                        x: ['市场监管','应急管理','生态环境','交通运输','卫健','住建','农业农村','文旅','海关','税务'],
                        y: [170, 150, 130, 110, 100, 90, 80, 70, 60, 50]
                    },
                    rightTitle: '检查类型分布',
                    rightPie: [
                        { value: 410, name: '日常监管',   itemStyle: { color: '#4a9eff' } },
                        { value: 220, name: '专项检查',   itemStyle: { color: '#ff7f50' } },
                        { value: 180, name: '双随机',     itemStyle: { color: '#00c853' } },
                        { value: 90,  name: '重点检查',   itemStyle: { color: '#ffcc00' } }
                    ],
                    tableTitle: '检查企次明细列表',
                    tableHeader: ['任务编码','当事人名称','检查部门','检查事项','检查时间'],
                    tableRows: [
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
                });
                break;
            }
            case 'sv_problem_count': {
                const curYear  = [28, 32, 35, 38, 42, 38, 40, 45, 48, 45, 42, 383];
                const lastYear = [25, 28, 32, 35, 38, 35, 36, 40, 42, 40, 38, 349];
                overlay.innerHTML = this.renderSupervisionTrend({
                    title: '检查发现问题率分析',
                    kpis: [
                        { label: '检查行为总数', value: '2,456', suffix: '次' },
                        { label: '发现问题数',     value: '383',   suffix: '个' },
                        { label: '发现问题率',     value: '15.6',  suffix: '%', highlight: 'up' },
                        { label: '同比上升',     value: '34',    suffix: '个' }
                    ],
                    leftTitle: '近12个月发现问题趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '个' },
                    rightTitle: '问题类型分布',
                    rightPie: [
                        { value: 150, name: '违规操作',   itemStyle: { color: '#ff7f50' } },
                        { value: 100, name: '资料不全',   itemStyle: { color: '#ffcc00' } },
                        { value: 60,  name: '资质过期',   itemStyle: { color: '#af52de' } },
                        { value: 45,  name: '安全隐患',   itemStyle: { color: '#ff3b30' } },
                        { value: 28,  name: '质量问题',   itemStyle: { color: '#4a9eff' } }
                    ],
                    tableTitle: '检查发现问题明细列表',
                    tableHeader: ['行为编号','当事人名称','检查方式','问题类型','发现时间','检查结果'],
                    tableRows: [
                        ['BH000001','海南XX科技有限公司','双随机一公开','违规操作','2026-07-12','责令改正'],
                        ['BH000002','三亚XX贸易有限公司','重点检查','资料不全','2026-07-12','行政指导'],
                        ['BH000003','海口XX餐饮管理有限公司','专项检查','资质过期','2026-07-11','涉嫌违法线索移送'],
                        ['BH000004','文昌XX食品有限公司','双随机一公开','安全隐患','2026-07-11','责令改正'],
                        ['BH000005','琼海XX医疗器械有限公司','有因检查','质量问题','2026-07-11','行政指导'],
                        ['BH000006','万宁XX娱乐城','综合查一次','违规操作','2026-07-10','责令改正'],
                        ['BH000007','东方XX加油站','重点检查','安全隐患','2026-07-10','涉嫌违法线索移送'],
                        ['BH000008','澄迈XX科技有限公司','双随机一公开','资料不全','2026-07-09','行政指导'],
                        ['BH000009','五指山XX农场','专项检查','违规操作','2026-07-09','责令改正'],
                        ['BH000010','定安XX自来水厂','有因检查','资质过期','2026-07-09','行政指导'],
                        ['BH000011','临高XX建筑工程','综合查一次','安全隐患','2026-07-08','涉嫌违法线索移送'],
                        ['BH000012','陵水XX海鲜排档','双随机一公开','质量问题','2026-07-08','责令改正'],
                        ['BH000013','昌江XX水泥厂','重点检查','违规操作','2026-07-08','行政指导'],
                        ['BH000014','屯昌XX食品厂','专项检查','资料不全','2026-07-07','责令改正'],
                        ['BH000015','白沙XX加工场','有因检查','资质过期','2026-07-07','涉嫌违法线索移送']
                    ]
                });
                break;
            }
            case 'sv_clue_transfer': {
                const curYear  = [5,  6,  7,  8,  9,  7,  8,  10, 10, 9, 10, 99];
                const lastYear = [4,  5,  6,  7,  8,  6,  7,  8,  9,  8,  9,  85];
                overlay.innerHTML = this.renderSupervisionTrend({
                    title: '违法线索移送趋势分析',
                    kpis: [
                        { label: '违法线索移送总数', value: '339',   suffix: '条' },
                        { label: '去年同期',         value: '285',   suffix: '条' },
                        { label: '同比增加',         value: '54',   suffix: '条' },
                        { label: '同比上升',         value: '16', suffix: '%', highlight: 'up' }
                    ],
                    leftTitle: '近12个月违法线索移送趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '条' },
                    rightTitle: '线索类型分布',
                    rightPie: [
                        { value: 30, name: '无证经营',     itemStyle: { color: '#ff3b30' } },
                        { value: 25, name: '超范围经营',   itemStyle: { color: '#ff7f50' } },
                        { value: 20, name: '产品质量',     itemStyle: { color: '#ffcc00' } },
                        { value: 15, name: '虚假宣传',     itemStyle: { color: '#af52de' } },
                        { value: 9,  name: '其他',         itemStyle: { color: '#4a9eff' } }
                    ],
                    tableTitle: '违法线索移送明细列表',
                    tableHeader: ['移送任务编码','当事人名称','检查事项','移送部门','移送时间','接收部门','接收时间'],
                    tableRows: [
                        ['YS2026070099','海口XX餐饮管理公司','未取得食品经营许可','海口市市场监管局','2026-07-12 16:20','海口市综合执法局','2026-07-12 17:05'],
                        ['YS2026070098','万宁XX娱乐城','娱乐场所涉嫌违规经营','万宁市市场监管局','2026-07-11 16:08','万宁市综合执法局','2026-07-11 16:40'],
                        ['YS2026070097','昌江XX水泥厂','污染物超标排放','昌江县生态环境局','2026-07-11 14:15','海南省生态环境厅执法局','2026-07-11 15:22'],
                        ['YS2026070096','陵水XX海鲜排档','涉嫌价格欺诈','陵水县市场监管局','2026-07-10 17:30','陵水县综合执法局','2026-07-10 18:00'],
                        ['YS2026070095','五指山XX农资经营部','销售假冒伪劣农药','五指山市农业农村局','2026-07-10 15:40','五指山市综合执法局','2026-07-10 16:25'],
                        ['YS2026070094','临高XX采砂点','非法采砂行为举报线索','临高县水务局','2026-07-10 11:02','海南省综合执法局','2026-07-10 14:10'],
                        ['YS2026070093','文昌XX水产冷冻厂','特种设备无证运行','文昌市市场监管局','2026-07-09 16:22','文昌市综合执法局','2026-07-09 17:08'],
                        ['YS2026070092','东方XX加油站','安全隐患逾期未整改','东方市应急管理局','2026-07-09 14:33','东方市综合执法局','2026-07-09 15:10'],
                        ['YS2026070091','澄迈XX贸易公司','虚假广告宣传行为','澄迈县市场监管局','2026-07-09 10:18','澄迈县综合执法局','2026-07-09 11:00'],
                        ['YS2026070090','定安XX零售药店','违规销售处方药','定安县市场监管局','2026-07-08 17:05','定安县综合执法局','2026-07-08 17:50'],
                        ['YS2026070089','三亚XX酒吧','超范围经营娱乐活动','三亚市市场监管局','2026-07-08 15:38','三亚市综合执法局','2026-07-08 16:12'],
                        ['YS2026070088','屯昌XX食品厂','生产销售不合格食品','屯昌县市场监管局','2026-07-08 11:20','屯昌县综合执法局','2026-07-08 12:00'],
                        ['YS2026070087','琼海XX装修公司','无资质承揽工程','琼海市住建局','2026-07-07 17:15','琼海市综合执法局','2026-07-07 17:50'],
                        ['YS2026070086','儋州XX物流公司','超限运输违法行为','儋州市交通局','2026-07-07 14:22','儋州市综合执法局','2026-07-07 15:00'],
                        ['YS2026070085','白沙XX加工场','生产许可证超期未续','白沙县市场监管局','2026-07-07 09:45','白沙县综合执法局','2026-07-07 10:25']
                    ]
                });
                break;
            }
            case 'sv_verify_action': {
                const curYear  = [6,  7,  7,  8,  9,  8,  8,  10, 10, 10, 6, 99];
                const lastYear = [5,  6,  6,  7,  8,  7,  7,  9,  9,  9,  9,  92];
                overlay.innerHTML = this.renderSupervisionTrend({
                    title: '核查行为总量趋势分析',
                    kpis: [
                        { label: '核查行为总数', value: '99',  suffix: '次' },
                        { label: '去年同期',     value: '92',  suffix: '次' },
                        { label: '同比增加',     value: '7',   suffix: '次' },
                        { label: '同比上升',     value: '7.6', suffix: '%', highlight: 'up' }
                    ],
                    leftTitle: '近12个月核查行为趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '次' },
                    rightTitle: '核查类型分布',
                    rightPie: [
                        { value: 55, name: '告知承诺制核查',   itemStyle: { color: '#4a9eff' } },
                        { value: 44, name: '承诺即入制核查',   itemStyle: { color: '#00c853' } }
                    ],
                    tableTitle: '核查行为明细列表',
                    tableHeader: ['核查任务编码','当事人名称','监管部门','核查时间','核查结果'],
                    tableRows: [
                        ['HC2026070099','海南XX科技有限公司','海南省市场监管局','2026-07-12 10:30','告知承诺内容属实'],
                        ['HC2026070098','三亚XX农业合作社','三亚市市场监管局','2026-07-12 09:45','告知承诺内容属实'],
                        ['HC2026070097','海口XX建筑工程公司','海南省住建厅','2026-07-11 16:20','承诺条件已满足'],
                        ['HC2026070096','儋州XX食品厂','儋州市市场监管局','2026-07-11 14:50','告知承诺内容属实'],
                        ['HC2026070095','文昌XX养殖基地','海南省农业农村厅','2026-07-11 10:18','告知承诺内容属实'],
                        ['HC2026070094','琼海XX医药连锁','海南省药监局','2026-07-10 17:05','承诺即入核查通过'],
                        ['HC2026070093','万宁XX娱乐城','万宁市旅文局','2026-07-10 15:22','承诺条件部分未达标'],
                        ['HC2026070092','东方XX加油站','海南省应急管理厅','2026-07-10 10:55','告知承诺内容属实'],
                        ['HC2026070091','澄迈XX科技有限公司','澄迈县市场监管局','2026-07-09 16:30','承诺即入核查通过'],
                        ['HC2026070090','五指山XX农场','五指山市市场监管局','2026-07-09 14:00','告知承诺内容属实'],
                        ['HC2026070089','定安XX自来水厂','定安县卫健委','2026-07-09 10:40','告知承诺内容属实'],
                        ['HC2026070088','临高XX建筑工程','海南省住建厅','2026-07-08 16:50','承诺条件已满足'],
                        ['HC2026070087','陵水XX海鲜排档','陵水县市场监管局','2026-07-08 14:10','告知承诺内容属实'],
                        ['HC2026070086','昌江XX水泥厂','昌江县生态环境局','2026-07-08 10:15','承诺即入核查通过'],
                        ['HC2026070085','屯昌XX燃气公司','屯昌县综合执法局','2026-07-08 09:00','告知承诺内容属实']
                    ]
                });
                break;
            }
            case 'sv_check_reduce': {
                overlay.innerHTML = this.renderSupervisionTrend({
                    title: '上门检查次数减少率分析',
                    width: '85vw',
                    kpis: [
                        { label: '预计检查次数', value: '2456', suffix: '次', highlight: 'total' },
                        { label: '实际检查次数', value: '900',   suffix: '次' },
                        { label: '减少次数',     value: '1456', suffix: '次', highlight: 'up' },
                        { label: '减少率',         value: '73',    suffix: '%', highlight: 'up' }
                    ],
                    leftTitle: '检查次数对比（预计 vs 实际）',
                    leftType: 'reduceBar',
                    leftReduce: {
                        fields:   ['食品药品监管','特种设备安全','产品质量监督','工程建设监管','道路交通执法','安全生产监管','生态环境保护','文化市场监管','公共卫生监督','市场登记与税收'],
                        expected: [850, 340, 540, 240, 220, 200, 300, 160, 150, 234],
                        actual:   [236,  94,  150,  68,  62,  58,  74,  42,  40,  49],
                        unit: '次'
                    },
                    rightTitle: '减少方式分布',
                    rightPie: [
                        { value: 826,  name: '非现场检查',   itemStyle: { color: '#4a9eff' } },
                        { value: 1535, name: '综合查一次',   itemStyle: { color: '#00c853' } }
                    ],
                    tableTitle: '检查事项减少明细',
                    tableHeader: ['事项名称','所属领域','预计检查次数','实际检查次数','减少次数','减少率（%）'],
                    tableRows: [
                        ['餐饮服务食品安全日常检查','食品药品监管','360','98','262','73'],
                        ['特种设备安全专项监察','特种设备安全','340','94','246','72'],
                        ['药品经营质量管理双随机检查','食品药品监管','310','86','224','72'],
                        ['产品质量监督抽查','产品质量监督','280','78','202','72'],
                        ['计量器具强制检定','产品质量监督','260','72','188','72'],
                        ['建设工程质量专项检查','工程建设监管','240','68','172','72'],
                        ['道路运输车辆双随机检查','道路交通执法','220','62','158','72'],
                        ['危化品经营安全专项检查','安全生产监管','200','58','142','71'],
                        ['网络餐饮服务日常检查','食品药品监管','180','52','128','71'],
                        ['建筑施工扬尘专项检查','生态环境保护','170','44','126','74'],
                        ['娱乐场所经营双随机检查','文化市场监管','160','42','118','74'],
                        ['医疗机构日常监督检查','公共卫生监督','150','40','110','73'],
                        ['广告发布内容审查','市场登记与税收','140','35','105','75'],
                        ['排污企业现场巡查','生态环境保护','130','30','100','77'],
                        ['纳税申报情况日常核查','市场登记与税收','94','14','80','85']
                    ]
                });
                break;
            }
        }

        document.body.appendChild(overlay);
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', e => { if (e.target === overlay) this.closeModal(); });
        setTimeout(() => this.initSupervisionTrendCharts(type), 80);
    }

    renderSupervisionTrend(cfg) {
        this._svTrendCfg = cfg;
        this._svTrendPageSize = 5;
        this._svTrendPage = 1;
        this._svTrendTotal = cfg.tableRows.length;
        this._svTrendPages = Math.max(1, Math.ceil(this._svTrendTotal / this._svTrendPageSize));

        const kpisHtml = cfg.kpis.map(k => {
            const cls = k.highlight === 'up' ? 'value-up' : (k.highlight === 'down' ? 'value-down' : '');
            return `<div class="trend-kpi-card pano-kpi-card" style="flex:1;min-height:58px;padding:10px;margin:0;">
                <span class="trend-kpi-label" style="font-size:12px;">${k.label}</span>
                <span class="trend-kpi-value ${cls}" style="font-size:20px;">${k.value}${k.suffix || ''}</span>
            </div>`;
        }).join('');

        const modalWidth = cfg.width || '92%';
        return `
        <div class="indicator-modal panorama-modal trend-modal" style="width:${modalWidth};max-width:1380px;">
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
                    <div id="svt-chart-left" class="trend-chart-container"></div>
                </div>
                <div class="trend-chart-box trend-chart-pie">
                    <div class="trend-chart-title">${cfg.rightTitle}</div>
                    <div id="svt-chart-right" class="trend-chart-container"></div>
                </div>
            </div>
            <div class="trend-table-wrap">
                <div class="trend-table-title">${cfg.tableTitle}</div>
                <div class="trend-table-scroller">
                    <table class="trend-data-table">
                        <thead><tr>${cfg.tableHeader.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                        <tbody id="svt-tbody">${this._renderSvTrendTbody()}</tbody>
                    </table>
                </div>
                <div class="trend-pager-bar" id="svt-pager">${this._renderSvTrendPager()}</div>
            </div>
        </div>`;
    }

    _renderSvTrendTbody() {
        const cfg = this._svTrendCfg;
        if (!cfg) return '';
        const start = (this._svTrendPage - 1) * this._svTrendPageSize;
        const rows = cfg.tableRows.slice(start, start + this._svTrendPageSize);
        return rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
    }

    _renderSvTrendPager() {
        const t = this._svTrendTotal, cur = this._svTrendPage, last = this._svTrendPages;
        return `
        <div class="trend-pager-bar" style="margin-top:6px;">
            <span class="trend-pager-info">共 <b>${t}</b> 条 / 每页 <b>${this._svTrendPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
            <div class="trend-pager-btns">
                <button class="trend-pager-btn ${cur<=1?'disabled':''}"
                        onclick="window.supervisionPage.switchSvTrendPage(-1)">上一页</button>
                <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                <button class="trend-pager-btn ${cur>=last?'disabled':''}"
                        onclick="window.supervisionPage.switchSvTrendPage(1)">下一页</button>
            </div>
        </div>`;
    }

    switchSvTrendPage(delta) {
        const next = this._svTrendPage + delta;
        if (next < 1 || next > this._svTrendPages) return;
        this._svTrendPage = next;
        const b = document.getElementById('svt-tbody');
        if (b) b.innerHTML = this._renderSvTrendTbody();
        const p = document.getElementById('svt-pager');
        if (p && p.parentNode) {
            const w = document.createElement('div');
            w.innerHTML = this._renderSvTrendPager();
            p.parentNode.replaceChild(w.firstElementChild, p);
        }
    }

    initSupervisionTrendCharts(type) {
        const cfg = this._svTrendCfg;
        if (!cfg) return;
        const leftEl = document.getElementById('svt-chart-left');
        const rightEl = document.getElementById('svt-chart-right');
        if (!leftEl || !rightEl) return;

        let leftChart;
        if (cfg.leftType === 'top10Bar') {
            const d = cfg.leftTop10;
            leftChart = echarts.init(leftEl);
            leftChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' },
                    formatter: (ps) => { const p = ps[0]; return `${p.name}<br/>事项数：${p.value} ${d.unit || ''}`; } },
                grid: { left: '4%', right: '4%', top: '6%', bottom: '22%', containLabel: true },
                xAxis: {
                    type: 'category', data: d.areas,
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
                    { name: '事项数', type: 'bar', barWidth: '48%', data: d.values,
                      itemStyle: {
                          color: new echarts.graphic.LinearGradient(0,0,0,1,[
                              { offset: 0, color: '#4ac3ff' },
                              { offset: 1, color: '#0066aa' }
                          ]),
                          borderRadius: [5, 5, 0, 0]
                      },
                      label: {
                          show: true, position: 'top',
                          color: 'rgba(255,255,255,0.8)', fontSize: 10,
                          formatter: '{c}'
                      }
                    }
                ]
            });
        } else if (cfg.leftType === 'compareBar') {
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
        } else if (cfg.leftType === 'reduceBar') {
            const d = cfg.leftReduce;
            leftChart = echarts.init(leftEl);
            leftChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' },
                    formatter: (ps) => {
                        const f = ps[0].axisValue;
                        let s = `<b>${f}</b><br/>`;
                        ps.forEach(p => { s += `${p.marker}${p.seriesName}：${p.value} ${d.unit || ''}<br/>`; });
                        return s;
                    }
                },
                legend: { data: ['预计检查','实际检查'], top: 0, right: 10, textStyle: { color: 'rgba(255,255,255,0.72)', fontSize: 11 } },
                grid: { left: '4%', right: '4%', top: '14%', bottom: '22%', containLabel: true },
                xAxis: {
                    type: 'category', data: d.fields,
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
                    { name: '预计检查', type: 'bar', barWidth: '34%', data: d.expected,
                      itemStyle: {
                          color: new echarts.graphic.LinearGradient(0,0,0,1,[
                              { offset: 0, color: '#ffc16a' },
                              { offset: 1, color: '#cc6a00' }
                          ]),
                          borderRadius: [4, 4, 0, 0]
                      },
                      label: { show: true, position: 'top', color: 'rgba(255,255,255,0.78)', fontSize: 10 } },
                    { name: '实际检查', type: 'bar', barWidth: '34%', data: d.actual,
                      itemStyle: {
                          color: new echarts.graphic.LinearGradient(0,0,0,1,[
                              { offset: 0, color: '#4ac3ff' },
                              { offset: 1, color: '#0066aa' }
                          ]),
                          borderRadius: [4, 4, 0, 0]
                      },
                      label: { show: true, position: 'top', color: 'rgba(255,255,255,0.78)', fontSize: 10 } }
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
        leftEl._svtResizer = handler;
    }

    // ========== 亮码比例弹窗 ==========
    genBrightCodeListData() {
        const depts = ['省市场监管局','省住建厅','省卫健委','省公安厅','省生态环境厅','省交通厅','省应急管理厅','海口市综合执法局','三亚市综合执法局','儋州市市场监管局'];
        const persons = ['张三','李四','王五','赵六','陈七','刘八','吴九','郑十','孙一','周明','吴强','郑华'];
        const parties = ['海南XX贸易有限公司','三亚XX酒店有限公司','海口XX餐饮管理公司','儋州XX建材市场','文昌XX农业合作社','万宁XX娱乐城','琼海XX物流公司','东方XX能源公司','屯昌XX燃气公司','澄迈XX食品加工厂','临高XX养殖合作社','昌江XX矿业公司','白沙XX茶叶公司','乐东XX水果基地','陵水XX海鲜排档','保亭XX旅游景区','五指山XX民宿','定安XX饲料厂','琼中XX超市','洋浦XX物流公司'];
        const results = ['合格','责令整改','合格','合格','合格','违法线索移送','合格','合格','责令整改','合格'];
        const codes = ['JC','LD','ZC','XY','JD'];
        const rows = [];
        const total = 25;
        const unlitCount = Math.round(total * 0.1);
        const unlitIdx = new Set();
        while (unlitIdx.size < unlitCount) { unlitIdx.add(Math.floor(Math.random()*total)); }
        for (let i = 0; i < total; i++) {
            const c0 = codes[i % codes.length];
            const mm = String(Math.floor(Math.random()*12)+1).padStart(2,'0');
            const dd = String(Math.floor(Math.random()*28)+1).padStart(2,'0');
            const hh = String(Math.floor(Math.random()*10)+8).padStart(2,'0');
            const mi = String(Math.floor(Math.random()*60)).padStart(2,'0');
            const ps = persons.slice(i*2 % persons.length, (i*2 % persons.length)+2).join('、');
            rows.push({
                idx: i+1,
                code: `${c0}2026${mm}${dd}${String(1000+i).padStart(4,'0')}`,
                party: parties[i % parties.length],
                dept: depts[i % depts.length],
                staff: ps,
                result: results[i % results.length],
                time: `2026-${mm}-${dd} ${hh}:${mi}`,
                lit: !unlitIdx.has(i)
            });
        }
        return rows;
    }

    openBrightCodeModal() {
        this._brightCodeData = this.genBrightCodeListData();
        this._brightCodePage = 1;
        const pageSize = 5;
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        overlay.id = 'bright-code-modal-overlay';
        overlay.innerHTML = this.renderBrightCodeModal(pageSize);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        const close = () => { document.body.style.overflow = ''; overlay.remove(); };
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        overlay.querySelector('.rv-modal-close').addEventListener('click', close);
        this.bindBrightCodePagination(overlay, pageSize, close);
        setTimeout(() => this.initBrightCodeCharts(overlay), 80);
    }

    renderBrightCodeModal(pageSize) {
        const rows = this._brightCodeData.slice(0, pageSize);
        const total = this._brightCodeData.length;
        const totalPages = Math.ceil(total / pageSize);
        const renderRow = (r) => `
            <tr>
                <td style="width:50px;">${r.idx}</td>
                <td>${r.code}</td>
                <td>${r.party}</td>
                <td>${r.dept}</td>
                <td>${r.staff}</td>
                <td style="color:${r.result==='合格'?'#34c759':r.result==='责令整改'?'#ff9500':'#ff3b30'};">${r.result}</td>
                <td>${r.time}</td>
                <td>
                    <span class="bright-status ${r.lit?'lit':'unlit'}">
                        ${r.lit?'已亮码':'未亮码'}
                    </span>
                </td>
            </tr>`;
        return `
        <div class="bright-code-modal">
            <div class="rv-modal-header" style="border-bottom:1px solid rgba(0,212,255,0.2);">
                <span class="rv-modal-title">亮码比例分析</span>
                <button class="rv-modal-close">×</button>
            </div>
            <div class="bright-code-body">
                <div class="bright-kpi-row">
                    <div class="bright-kpi-card">
                        <div class="bright-kpi-label">检查企次数</div>
                        <div class="bright-kpi-value">900<span class="bright-kpi-unit">次</span></div>
                    </div>
                    <div class="bright-kpi-card">
                        <div class="bright-kpi-label">亮码次数</div>
                        <div class="bright-kpi-value bright-kpi-green">800<span class="bright-kpi-unit">次</span></div>
                    </div>
                    <div class="bright-kpi-card">
                        <div class="bright-kpi-label">未亮码次数</div>
                        <div class="bright-kpi-value bright-kpi-red">100<span class="bright-kpi-unit">次</span></div>
                    </div>
                    <div class="bright-kpi-card">
                        <div class="bright-kpi-label">亮码比例</div>
                        <div class="bright-kpi-value bright-kpi-blue">89<span class="bright-kpi-unit">%</span></div>
                    </div>
                </div>
                <div class="bright-charts-row">
                    <div class="bright-chart-card bright-chart-ring">
                        <div class="bright-chart-title">亮码状态占比</div>
                        <div id="bright-ring-chart" class="chart-container" style="height:230px;"></div>
                    </div>
                    <div class="bright-chart-card bright-chart-bar">
                        <div class="bright-chart-title">各场景亮码比例排行</div>
                        <div id="bright-bar-chart" class="chart-container" style="height:230px;"></div>
                    </div>
                </div>
                <div class="bright-list-card">
                    <div class="bright-list-title">亮码检查记录明细</div>
                    <div class="rv-table-wrap">
                        <table class="rv-table rv-table-striped bright-table">
                            <thead>
                                <tr>
                                    <th style="width:50px;">序号</th>
                                    <th>任务编码</th>
                                    <th>当事人名称</th>
                                    <th>检查部门</th>
                                    <th>检查人员</th>
                                    <th>检查结果</th>
                                    <th>检查时间</th>
                                    <th>是否亮码</th>
                                </tr>
                            </thead>
                            <tbody id="bright-table-body">
                                ${rows.map(renderRow).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="rv-footer bright-pager">
                        <button class="rv-page-btn bright-page-prev" ${this._brightCodePage<=1?'disabled':''}>上一页</button>
                        <span class="bright-page-info">第 <b>${this._brightCodePage}</b> / ${totalPages} 页，共 ${total} 条</span>
                        <button class="rv-page-btn bright-page-next" ${this._brightCodePage>=totalPages?'disabled':''}>下一页</button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    initBrightCodeCharts(overlay) {
        const ringEl = overlay.querySelector('#bright-ring-chart');
        const barEl = overlay.querySelector('#bright-bar-chart');
        if (ringEl) {
            const ringChart = echarts.init(ringEl);
            ringChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
                legend: { bottom: 0, left: 'center', textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 }, itemWidth: 11, itemHeight: 11 },
                series: [{
                    type: 'pie',
                    radius: ['42%', '65%'],
                    center: ['50%', '44%'],
                    avoidLabelOverlap: true,
                    itemStyle: { borderRadius: 6, borderColor: 'rgba(5,13,24,0.98)', borderWidth: 3 },
                    label: {
                        show: true, color: '#fff', fontSize: 12, fontWeight: 600,
                        formatter: (p) => `${p.value}次\n${p.percent}%`
                    },
                    labelLine: { show: true, length: 8, length2: 6 },
                    data: [
                        { value: 11111, name: '已亮码', itemStyle: { color: '#34c759' } },
                        { value: 1234, name: '未亮码', itemStyle: { color: '#ff3b30' } }
                    ]
                }]
            });
            this._bcResizer1 = () => ringChart.resize();
            window.addEventListener('resize', this._bcResizer1);
        }
        if (barEl) {
            const regionTotals = { '海口市':3100,'三亚市':2500,'儋州市':1500,'琼海市':1300,'文昌市':1100,'万宁市':900,'东方市':800,'澄迈县':1145 };
            const regionRates = [94,92,89,92,90,88,86,87];
            const barChart = echarts.init(barEl);
            barChart.setOption({
                tooltip: { trigger: 'axis', formatter: (params) => {
                    const p = params[0];
                    const names = ['海口市','三亚市','儋州市','琼海市','文昌市','万宁市','东方市','澄迈县'];
                    const tot = regionTotals[names[p.dataIndex]] || 1;
                    const rate = p.value;
                    const lit = Math.round(tot*rate/100);
                    return `${names[p.dataIndex]}<br/>亮码次数：${lit}次<br/>总次数：${tot}次<br/>亮码比例：${rate}%`;
                }},
                grid: { left: '5%', right: '4%', bottom: '8%', top: '9%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: ['海口市','三亚市','儋州市','琼海市','文昌市','万宁市','东方市','澄迈县'],
                    axisLine: { lineStyle: { color: 'rgba(0,212,255,0.25)' } },
                    axisLabel: { color: 'rgba(255,255,255,0.78)', fontSize: 11, interval: 0 }
                },
                yAxis: {
                    type: 'value',
                    name: '亮码比例(%)',
                    max: 100,
                    axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{value}%' },
                    axisLine: { lineStyle: { color: 'rgba(0,212,255,0.25)' } },
                    splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } },
                    nameTextStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 10 }
                },
                series: [{
                    type: 'bar',
                    barWidth: '52%',
                    label: { show: true, position: 'top', color: '#fff', fontSize: 11, fontWeight: 600, formatter: '{c}%' },
                    data: [
                        { value: regionRates[0], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00e676'},{offset:1,color:'#1b5e20'}]), borderRadius:[5,5,0,0] } },
                        { value: regionRates[1], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00d4ff'},{offset:1,color:'#004d66'}]), borderRadius:[5,5,0,0] } },
                        { value: regionRates[2], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ffd700'},{offset:1,color:'#665500'}]), borderRadius:[5,5,0,0] } },
                        { value: regionRates[3], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff9500'},{offset:1,color:'#663300'}]), borderRadius:[5,5,0,0] } },
                        { value: regionRates[4], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#aa80ff'},{offset:1,color:'#402266'}]), borderRadius:[5,5,0,0] } },
                        { value: regionRates[5], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff6b9d'},{offset:1,color:'#661122'}]), borderRadius:[5,5,0,0] } },
                        { value: regionRates[6], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#4ecdc4'},{offset:1,color:'#0f5050'}]), borderRadius:[5,5,0,0] } },
                        { value: regionRates[7], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#66bb6a'},{offset:1,color:'#1b4d1b'}]), borderRadius:[5,5,0,0] } }
                    ]
                }]
            });
            this._bcResizer2 = () => barChart.resize();
            window.addEventListener('resize', this._bcResizer2);
        }
    }

    bindBrightCodePagination(overlay, pageSize, onClose) {
        const prevBtn = overlay.querySelector('.bright-page-prev');
        const nextBtn = overlay.querySelector('.bright-page-next');
        const tbody = overlay.querySelector('#bright-table-body');
        const info = overlay.querySelector('.bright-page-info');
        const total = this._brightCodeData.length;
        const totalPages = Math.ceil(total / pageSize);
        const renderPage = () => {
            const start = (this._brightCodePage - 1) * pageSize;
            const rows = this._brightCodeData.slice(start, start + pageSize);
            tbody.innerHTML = rows.map(r => `
                <tr>
                    <td style="width:50px;">${r.idx}</td>
                    <td>${r.code}</td>
                    <td>${r.party}</td>
                    <td>${r.dept}</td>
                    <td>${r.staff}</td>
                    <td style="color:${r.result==='合格'?'#34c759':r.result==='责令整改'?'#ff9500':'#ff3b30'};">${r.result}</td>
                    <td>${r.time}</td>
                    <td><span class="bright-status ${r.lit?'lit':'unlit'}">${r.lit?'已亮码':'未亮码'}</span></td>
                </tr>`).join('');
            info.innerHTML = `第 <b>${this._brightCodePage}</b> / ${totalPages} 页，共 ${total} 条`;
            prevBtn.disabled = this._brightCodePage <= 1;
            nextBtn.disabled = this._brightCodePage >= totalPages;
        };
        const origClose = onClose;
        const cleanup = () => {
            if (this._bcResizer1) { window.removeEventListener('resize', this._bcResizer1); this._bcResizer1 = null; }
            if (this._bcResizer2) { window.removeEventListener('resize', this._bcResizer2); this._bcResizer2 = null; }
        };
        prevBtn.addEventListener('click', () => { if (this._brightCodePage > 1) { this._brightCodePage--; renderPage(); } });
        nextBtn.addEventListener('click', () => { if (this._brightCodePage < totalPages) { this._brightCodePage++; renderPage(); } });
        overlay._brightCleanup = cleanup;
        const origRemove = overlay.remove.bind(overlay);
        overlay.remove = () => { cleanup(); origRemove(); };
    }

    // ============ 数据跨境流动沙盒试点监管 ============
    renderDataCrossModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">数据跨境流动沙盒试点监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">入盒企业</span>
                        <span class="indicator-stat-value">23家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">数据出境批次</span>
                        <span class="indicator-stat-value">1,256批</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">涉及国家</span>
                        <span class="indicator-stat-value">15个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">安全评估通过率</span>
                        <span class="indicator-stat-value">98.7%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">各行业入盒企业数量</span>
                        <div id="modal-data-cross-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">数据出境类型分布</span>
                        <div id="modal-data-cross-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>企业名称</th>
                                <th>所属行业</th>
                                <th>数据出境批次</th>
                                <th>涉及国家</th>
                                <th>数据类型</th>
                                <th>安全评估结果</th>
                                <th>入盒时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateDataCrossTableRows()}
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

    generateDataCrossTableRows() {
        const names = ['海南XX金融科技', '海南XX医疗数据', '海南XX汽车科技', '海南XX物流科技', '海南XX数字科技'];
        const industries = ['金融', '医疗', '汽车', '物流', '科技', '其他'];
        const types = ['个人信息', '商业数据', '科研数据', '其他'];
        const countries = ['美国', '日本', '新加坡', '韩国', '德国', '英国', '澳大利亚', '法国'];
        const results = ['通过', '通过', '通过', '未通过'];
        const allItems = [];
        for (let i = 1; i <= 23; i++) {
            allItems.push({
                name: names[i % 5] || `企业${i}`,
                industry: industries[i % 6],
                batches: Math.floor(Math.random() * 100) + 20,
                country: countries[i % 8],
                type: types[i % 4],
                result: results[i % 4],
                time: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.industry}</td>
                <td>${item.batches}</td>
                <td>${item.country}</td>
                <td>${item.type}</td>
                <td><span style="color: ${item.result === '通过' ? '#34c759' : '#ff3b30'};">${item.result}</span></td>
                <td>${item.time}</td>
            </tr>
        `).join('');
    }

    initDataCrossCharts() {
        const bar = echarts.init(document.getElementById('modal-data-cross-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['金融', '医疗', '汽车', '物流', '科技', '其他'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{
                type: 'bar',
                data: [5, 4, 4, 3, 5, 2],
                itemStyle: { color: '#4a9eff', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-data-cross-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}批 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}批', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 452, name: '个人信息', itemStyle: { color: '#4a9eff' } },
                    { value: 513, name: '商业数据', itemStyle: { color: '#00c853' } },
                    { value: 186, name: '科研数据', itemStyle: { color: '#ffcc00' } },
                    { value: 105, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    // ============ 海洋药物试点监管 ============
    renderOceanDrugModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">海洋药物试点监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">试点研发机构</span>
                        <span class="indicator-stat-value">18家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">临床试验品种</span>
                        <span class="indicator-stat-value">45种</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">获批上市</span>
                        <span class="indicator-stat-value">6种</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">研发成功率</span>
                        <span class="indicator-stat-value">13.3%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">各研发机构在研品种数量排行</span>
                        <div id="modal-ocean-drug-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">药物类型分布</span>
                        <div id="modal-ocean-drug-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>研发机构名称</th>
                                <th>药物名称</th>
                                <th>药物类型</th>
                                <th>研发阶段</th>
                                <th>审批状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateOceanDrugTableRows()}
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

    generateOceanDrugTableRows() {
        const names = ['海南海洋药物研究所', '三亚生物科技', '海口制药研究院', '琼海海洋实验室', '文昌医药研发中心'];
        const drugs = ['海葵素注射液', '海藻多糖胶囊', '珊瑚提取物', '贝类活性肽', '深海鱼油软胶囊'];
        const types = ['抗肿瘤', '抗病毒', '抗炎', '心血管', '其他'];
        const stages = ['实验室', '临床前', '临床I期', '临床II期', '临床III期', '已上市'];
        const statuses = ['在审', '已批', '未批'];
        const allItems = [];
        for (let i = 1; i <= 45; i++) {
            allItems.push({
                org: names[i % 5] || `研发机构${i}`,
                drug: drugs[i % 5] || `药物${i}`,
                type: types[i % 5],
                stage: stages[i % 6],
                status: statuses[i % 3]
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.org}</td>
                <td>${item.drug}</td>
                <td>${item.type}</td>
                <td>${item.stage}</td>
                <td><span style="color: ${item.status === '已批' ? '#34c759' : item.status === '在审' ? '#ff9500' : '#ff3b30'};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initOceanDrugCharts() {
        const bar = echarts.init(document.getElementById('modal-ocean-drug-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}种' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海南海洋药物研究所', '三亚生物科技', '海口制药研究院', '琼海海洋实验室', '文昌医药研发中心'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}种' } },
            series: [{
                type: 'bar',
                data: [12, 8, 7, 6, 5],
                itemStyle: { color: '#00c853', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-ocean-drug-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}种 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}种', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 15, name: '抗肿瘤', itemStyle: { color: '#00c853' } },
                    { value: 10, name: '抗病毒', itemStyle: { color: '#4a9eff' } },
                    { value: 8, name: '抗炎', itemStyle: { color: '#ffcc00' } },
                    { value: 7, name: '心血管', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    // ============ 商业航天试点监管 ============
    renderCommercialSpaceModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">商业航天试点监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">试点企业</span>
                        <span class="indicator-stat-value">12家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">发射次数</span>
                        <span class="indicator-stat-value">34次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">在研型号</span>
                        <span class="indicator-stat-value">19个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">发射成功率</span>
                        <span class="indicator-stat-value">94.1%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">各企业发射次数排行</span>
                        <div id="modal-space-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">火箭类型分布</span>
                        <div id="modal-space-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>企业名称</th>
                                <th>火箭型号</th>
                                <th>火箭类型</th>
                                <th>发射日期</th>
                                <th>发射地点</th>
                                <th>发射结果</th>
                                <th>监管状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateCommercialSpaceTableRows()}
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

    generateCommercialSpaceTableRows() {
        const names = ['海南文昌航天', '三亚火箭科技', '海口航天工业', '琼海卫星公司', '文昌发射中心'];
        const models = ['长征八号', '捷龙一号', '快舟十一号', '谷神星一号', '朱雀二号'];
        const types = ['固体火箭', '液体火箭', '可回收火箭', '其他'];
        const locations = ['文昌发射场', '三亚发射点', '海南航天港'];
        const results = ['成功', '成功', '成功', '失败', '部分成功'];
        const statuses = ['正常', '正常', '正常', '重点关注'];
        const allItems = [];
        for (let i = 1; i <= 34; i++) {
            allItems.push({
                name: names[i % 5] || `航天企业${i}`,
                model: models[i % 5],
                type: types[i % 4],
                date: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                location: locations[i % 3],
                result: results[i % 5],
                status: statuses[i % 4]
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.model}</td>
                <td>${item.type}</td>
                <td>${item.date}</td>
                <td>${item.location}</td>
                <td><span style="color: ${item.result === '成功' ? '#34c759' : item.result === '部分成功' ? '#ff9500' : '#ff3b30'};">${item.result}</span></td>
                <td><span style="color: ${item.status === '正常' ? '#34c759' : '#ff9500'};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initCommercialSpaceCharts() {
        const bar = echarts.init(document.getElementById('modal-space-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}次' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海南文昌航天', '三亚火箭科技', '海口航天工业', '琼海卫星公司', '文昌发射中心'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}次' } },
            series: [{
                type: 'bar',
                data: [10, 8, 7, 5, 4],
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-space-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}次', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 14, name: '固体火箭', itemStyle: { color: '#ff9500' } },
                    { value: 12, name: '液体火箭', itemStyle: { color: '#4a9eff' } },
                    { value: 6, name: '可回收火箭', itemStyle: { color: '#00c853' } },
                    { value: 2, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    // ============ 深海技术试点监管 ============
    renderDeepSeaModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">深海技术试点监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">试点研发机构</span>
                        <span class="indicator-stat-value">16家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">深海装备</span>
                        <span class="indicator-stat-value">28台套</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">海试次数</span>
                        <span class="indicator-stat-value">156次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">技术成果转化率</span>
                        <span class="indicator-stat-value">67.9%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">各机构海试次数排行</span>
                        <div id="modal-deep-sea-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">技术领域分布</span>
                        <div id="modal-deep-sea-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>机构名称</th>
                                <th>装备名称</th>
                                <th>技术领域</th>
                                <th>海试日期</th>
                                <th>海试深度（米）</th>
                                <th>海试结果</th>
                                <th>转化状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateDeepSeaTableRows()}
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

    generateDeepSeaTableRows() {
        const names = ['海南深海研究所', '三亚海洋技术中心', '海口深海装备', '琼海海洋工程', '文昌深海实验室'];
        const equipments = ['蛟龙号', '奋斗者号', '深海一号', '潜龙三号', '海龙二号'];
        const fields = ['深海探测', '深海采矿', '深海生物', '深海通信', '其他'];
        const results = ['成功', '成功', '成功', '部分成功', '失败'];
        const statuses = ['已转化', '转化中', '未转化'];
        const allItems = [];
        for (let i = 1; i <= 156; i++) {
            allItems.push({
                name: names[i % 5] || `机构${i}`,
                equipment: equipments[i % 5],
                field: fields[i % 5],
                date: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                depth: Math.floor(Math.random() * 5000) + 1000,
                result: results[i % 5],
                status: statuses[i % 3]
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.equipment}</td>
                <td>${item.field}</td>
                <td>${item.date}</td>
                <td>${item.depth}</td>
                <td><span style="color: ${item.result === '成功' ? '#34c759' : item.result === '部分成功' ? '#ff9500' : '#ff3b30'};">${item.result}</span></td>
                <td><span style="color: ${item.status === '已转化' ? '#34c759' : item.status === '转化中' ? '#ff9500' : '#ff3b30'};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initDeepSeaCharts() {
        const bar = echarts.init(document.getElementById('modal-deep-sea-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}次' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海南深海研究所', '三亚海洋技术中心', '海口深海装备', '琼海海洋工程', '文昌深海实验室'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}次' } },
            series: [{
                type: 'bar',
                data: [42, 35, 30, 28, 21],
                itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-deep-sea-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}次', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 48, name: '深海探测', itemStyle: { color: '#00d4ff' } },
                    { value: 35, name: '深海采矿', itemStyle: { color: '#4a9eff' } },
                    { value: 32, name: '深海生物', itemStyle: { color: '#00c853' } },
                    { value: 28, name: '深海通信', itemStyle: { color: '#ffcc00' } },
                    { value: 13, name: '其他', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    // ============ 离岸金融业务试点监管 ============
    renderOffshoreFinanceModal() {
        return `
            <div class="indicator-modal" style="width:85vw;">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">离岸金融业务试点监管</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">试点机构</span>
                        <span class="indicator-stat-value">9家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">跨境业务量</span>
                        <span class="indicator-stat-value">2,345笔</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">业务规模</span>
                        <span class="indicator-stat-value">156.8亿元</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">合规率</span>
                        <span class="indicator-stat-value">99.2%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">各试点机构业务规模排行</span>
                        <div id="modal-offshore-finance-bar" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">业务类型分布</span>
                        <div id="modal-offshore-finance-pie" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>机构名称</th>
                                <th>业务类型</th>
                                <th>业务金额（万元）</th>
                                <th>交易对手国家/地区</th>
                                <th>交易日期</th>
                                <th>合规状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateOffshoreFinanceTableRows()}
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

    generateOffshoreFinanceTableRows() {
        const names = ['海南离岸银行', '三亚国际银行', '海口金融中心', '琼海跨境银行', '文昌离岸金融'];
        const types = ['跨境贷款', '离岸结算', '跨境投资', '外汇交易', '其他'];
        const countries = ['新加坡', '香港', '澳门', '美国', '日本', '德国', '英国'];
        const statuses = ['合规', '合规', '合规', '预警', '违规'];
        const allItems = [];
        for (let i = 1; i <= 2345; i++) {
            allItems.push({
                name: names[i % 5] || `机构${i}`,
                type: types[i % 5],
                amount: Math.floor(Math.random() * 50000) + 5000,
                country: countries[i % 7],
                date: `2026-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                status: statuses[i % 5]
            });
        }
        const items = allItems.slice(0, 5);
        return items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.amount}</td>
                <td>${item.country}</td>
                <td>${item.date}</td>
                <td><span style="color: ${item.status === '合规' ? '#34c759' : item.status === '预警' ? '#ff9500' : '#ff3b30'};">${item.status}</span></td>
            </tr>
        `).join('');
    }

    initOffshoreFinanceCharts() {
        const bar = echarts.init(document.getElementById('modal-offshore-finance-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}亿元' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海南离岸银行', '三亚国际银行', '海口金融中心', '琼海跨境银行', '文昌离岸金融'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}亿元' } },
            series: [{
                type: 'bar',
                data: [45, 38, 32, 25, 16.8],
                itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', formatter: '{c}', color: 'rgba(255,255,255,0.6)', fontSize: 11 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-offshore-finance-pie'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}笔 ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { show: true, formatter: '{b}\n{c}笔', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
                data: [
                    { value: 680, name: '跨境贷款', itemStyle: { color: '#af52de' } },
                    { value: 750, name: '离岸结算', itemStyle: { color: '#4a9eff' } },
                    { value: 480, name: '跨境投资', itemStyle: { color: '#00c853' } },
                    { value: 320, name: '外汇交易', itemStyle: { color: '#ffcc00' } },
                    { value: 115, name: '其他', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });
    }
};