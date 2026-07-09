window.SupervisionPage = class SupervisionPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        this.svModalData = [];
        this.svCurrentPage = 1;
        this.svCurrentModal = 0;
        this.pageSize = 5;
        this.render();
        this.ensureChartHeights();
        this.bindEvents();
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
                                <div class="supervision-stat-item" data-sv-modal="1">
                                    <span class="supervision-stat-label">实有市场主体</span>
                                    <span class="supervision-stat-value">99.8万</span>
                                    <span class="supervision-stat-compare trend-up">↑ 1.2%</span>
                                </div>
                                <div class="supervision-stat-item" data-sv-modal="2">
                                    <span class="supervision-stat-label">新设市场主体</span>
                                    <span class="supervision-stat-value">8956</span>
                                    <span class="supervision-stat-compare trend-up">↑ 1.5%</span>
                                </div>
                                <div class="supervision-stat-item" data-sv-modal="3">
                                    <span class="supervision-stat-label">注(吊)销市场主体</span>
                                    <span class="supervision-stat-value">1234</span>
                                    <span class="supervision-stat-compare trend-up">↑ 0.8%</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-section">
                            <h3 class="card-title">对象来源</h3>
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
                                    <div class="compliance-row" data-sv-modal="4">
                                        <span class="compliance-label">主体合规</span>
                                        <span class="compliance-value">99%</span>
                                        <span class="compliance-compare trend-up">↑ 1%</span>
                                    </div>
                                </div>
                                <div class="compliance-item">
                                    <div class="compliance-row" data-sv-modal="5">
                                        <span class="compliance-label">信用等级B级及以上市场主体</span>
                                        <span class="compliance-value">89.8万户（占比90%）</span>
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
                                    <h4 class="top10-section-title">本月监管行为TOP8</h4>
                                    <div class="top10-list">
                                    <table class="top10-table"><thead><tr><th>事项名称</th><th>次数</th></tr></thead>
                                    <tbody>
                                        <tr><td>xxx</td><td>843</td></tr><tr><td>xxx</td><td>721</td></tr><tr><td>xxx</td><td>654</td></tr><tr><td>xxx</td><td>587</td></tr><tr><td>xxx</td><td>423</td></tr><tr><td>xxx</td><td>367</td></tr><tr><td>xxx</td><td>289</td></tr><tr><td>xxx</td><td>215</td></tr>
                                    </tbody></table>
                                    </div>
                                </div>
                                <div class="top10-section">
                                    <h4 class="top10-section-title">本月检出问题领域TOP8</h4>
                                    <div class="top10-list">
                                    <table class="top10-table"><thead><tr><th>领域</th><th>问题数</th></tr></thead>
                                    <tbody>
                                        <tr><td>消防安全</td><td>276</td></tr><tr><td>交通运输</td><td>215</td></tr><tr><td>安全生产</td><td>187</td></tr><tr><td>环境保护</td><td>156</td></tr><tr><td>医疗器械</td><td>123</td></tr><tr><td>特种设备</td><td>98</td></tr><tr><td>网络交易</td><td>67</td></tr><tr><td>广告监管</td><td>56</td></tr>
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
                        <div class="card-section">
                            <h3 class="card-title">新型监管</h3>
                            <div class="new-supervision">
                                <div class="new-supervision-card" onclick="window.supervisionPage.openNewSupervisionModal('sandbox')" style="cursor: pointer;">
                                    <div class="new-supervision-card-title">沙盒监管</div>
                                    <div class="new-supervision-card-items">
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('lecheng')" style="cursor: pointer;">乐城医疗器械试点</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('nfan')" style="cursor: pointer;">南繁育种试点</span>
                                    </div>
                                </div>
                                <div class="new-supervision-card" onclick="window.supervisionPage.openNewSupervisionModal('offsite')" style="cursor: pointer;">
                                    <div class="new-supervision-card-title">非现场监管</div>
                                    <div class="new-supervision-card-items">
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('bright_kitchen')" style="cursor: pointer;">明厨亮灶</span>
                                        <span onclick="event.stopPropagation();window.supervisionPage.openNewSupervisionModal('sand_theft')" style="cursor: pointer;">盗采河沙风险预警</span>
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
        });
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
        for (let i = 1; i <= 40; i++) {
            data.push({
                areaName: areas[i % areas.length],
                total: (Math.random() * 8 + 2).toFixed(1),
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
            <div class="rv-stats">${this._svRenderCard('实有市场主体总数','99.8万户')}${this._svRenderCard('同比增长','+1.2%','sv-stat-highlight')}${this._svRenderCard('环比上月','+0.3%')}${this._svRenderCard('新增本年累计','8,956户')}</div>
            ${this._svChartsWrap('svc1','近12个月实有市场主体趋势','svc1b','市场主体类型分布',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','区域/行业名称','市场主体总数(万户)','同比增长(%)','环比增长(%)'],['idx','areaName','total','yoyGrowth','momGrowth'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})))}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart1() {
        const c = this._svInitChart('svc1'); if (!c) return;
        const months = this._svMonthLabels(12);
        const vals = [98.2,98.5,98.7,98.9,99.1,99.2,99.4,99.5,99.6,99.7,99.8,99.8];
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
            <div class="rv-stats">${this._svRenderCard('B级及以上主体数','89.8万户')}${this._svRenderCard('占比','90%')}${this._svRenderCard('信用A级主体数','45.6万户')}${this._svRenderCard('信用B级主体数','44.2万户')}</div>
            ${this._svChartsWrap('svc5','信用等级分布','svc5b','各行业B级及以上占比排行',5,5)}
            <div class="rv-table-wrap">${this._svRenderTable(['序号','主体名称','统一社会信用代码','所属行业','信用等级','评定日期','有效期至'],['idx','name','uscc','industry','creditLevel','assessDate','validUntil'],d.map((it,i)=>({...it,idx:(p-1)*ps+i+1})), 'name')}</div>
            <div class="rv-footer"><button class="rv-page-btn sv-page-prev" ${p<=1?'disabled':''}>上一页</button>${this._svPageInfo()}<button class="rv-page-btn sv-page-next" ${p>=Math.ceil(this.svModalData.length/ps)?'disabled':''}>下一页</button></div></div>`;
    }
    _svChart5() {
        const c = this._svInitChart('svc5'); if (!c) return;
        c.setOption({ tooltip:{trigger:'item',formatter:'{b}: {d}%'}, legend:{bottom:0,textStyle:{color:'rgba(255,255,255,0.5)',fontSize:10}}, series:[{type:'pie',radius:['45%','70%'],center:['50%','45%'],label:{show:false},emphasis:{label:{show:true,fontSize:11}},data:[{value:46,name:'A级',itemStyle:{color:'#34c759'}},{value:44,name:'B级',itemStyle:{color:'#00d4ff'}},{value:6,name:'C级',itemStyle:{color:'#ff9500'}},{value:3,name:'D级',itemStyle:{color:'#ff3b30'}},{value:1,name:'E级',itemStyle:{color:'#8e8e93'}}]}] });
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
        const columnEl = document.getElementById('supervision-column');
        if (pieEl) { this.charts.pie = echarts.init(pieEl); this.initPieChart(); }
        if (columnEl) { this.charts.column = echarts.init(columnEl); this.initColumnChart(); }
        window.addEventListener('resize', () => { Object.values(this.charts).forEach(chart => { try { chart.resize(); } catch(e) {} }); });
    }

    initPieChart() {
        if (!this.charts.pie) return;
        this.charts.pie.setOption({
            tooltip: { trigger: 'item' },
            series: [{ type:'pie', radius:['35%','70%'], center:['50%','50%'], itemStyle:{ borderRadius:4, borderColor:'rgba(5,13,24,0.8)', borderWidth:2 }, label:{ show:true, position:'outside', formatter:'{b}\n{c}', color:'#fff', fontSize:12 }, data:[{ value:50, name:'审批推送' },{ value:35, name:'检查发现' },{ value:15, name:'其他' }], color:['#00d4ff','#00ff88','#ffaa00','#ff6688'] }]
        });
    }

    initColumnChart() {
        if (!this.charts.column) return;
        this.charts.column.setOption({
            tooltip: { trigger: 'axis' },
            grid: { left:'8%', right:'8%', top:'15%', bottom:'20%' },
            xAxis: { type:'category', data:['迁入','迁出'], axisLine:{ lineStyle:{ color:'rgba(0,212,255,0.3)' } }, axisLabel:{ color:'#fff', fontSize:12 } },
            yAxis: { type:'value', axisLine:{ lineStyle:{ color:'rgba(0,212,255,0.3)' } }, axisLabel:{ color:'#fff', fontSize:12 } },
            series: [{ type:'bar', barWidth:'50%', data:[99,99], itemStyle:{ color:new echarts.graphic.LinearGradient(0,0,0,1,[{ offset:0, color:'#00d4ff' },{ offset:1, color:'#005577' }]), borderRadius:[4,4,0,0] } }]
        });
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
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 5 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
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
                    <div class="indicator-modal-pagination">
                        <button class="indicator-pagination-btn">上一页</button>
                        <span class="indicator-pagination-info">第 1 页 / 共 3 页</span>
                        <button class="indicator-pagination-btn">下一页</button>
                    </div>
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

    initRiskWarningCharts() {}

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
};