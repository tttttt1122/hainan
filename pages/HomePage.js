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
                <div class="home-content">
                    <div class="home-left-col">
                        <div class="card-section activity-section">
                            <div class="card-title">市场主体</div>
                            <div class="activity-items">
                                <div class="activity-group">
                                    <div class="activity-item activity-parent">
                                        <span class="activity-label">年度新增市场主体</span>
                                        <span class="activity-value-group">
                                            <span class="activity-count highlight-num" data-modal="yearly_add" style="cursor: pointer;">2856</span>
                                            <span class="trend-up">↑ 1%</span>
                                        </span>
                                    </div>
                                    <div class="activity-pie-container">
                                        <div id="marketIncreasePie" class="activity-pie"></div>
                                    </div>
                                </div>
                                <div class="activity-group">
                                    <div class="activity-item activity-parent">
                                        <span class="activity-label">年度减少市场主体</span>
                                        <span class="activity-value-group">
                                            <span class="activity-count highlight-num" data-modal="yearly_remove" style="cursor: pointer;">1234</span>
                                            <span class="trend-down">↓ 1%</span>
                                        </span>
                                    </div>
                                    <div class="activity-pie-container">
                                        <div id="marketDecreasePie" class="activity-pie"></div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="card-section satisfaction-section-left">
                            <div class="card-title">企业和群众满意度</div>
                            <div class="satisfaction-items">
                              
                                <div class="satisfaction-item">
                                    <span class="satisfaction-label">"好差评"好评率</span>
                                    <span class="satisfaction-value-group">
                                        <span class="satisfaction-count highlight-num" data-modal="good_bad_rate" style="cursor: pointer;">99.96%</span>
                                        <span class="trend-up">↑ 1%</span>
                                    </span>
                                    
                                </div>
                                <div class="satisfaction-item">
                                    <span class="satisfaction-label">涉企检查市场主体满意度</span>
                                    <span class="satisfaction-value-group">
                                        <span class="satisfaction-count highlight-num" data-modal="enterprise_satisfaction" style="cursor: pointer;">99%</span>
                                        <span class="trend-up">↑ 1%</span>
                                    </span>
                                </div>
                                <div class="satisfaction-item">
                                    <span class="satisfaction-label">涉企检查12345投诉下降</span>
                                    <span class="satisfaction-value-group">
                                        <span class="satisfaction-count highlight-num" data-modal="complaint_decrease" style="cursor: pointer;">99%</span>
                                        <span class="trend-down">↓ 1%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="home-center-col">
                        <div class="card-section map-main-section">
                            <div class="top-stats">
                                <div class="stat-card-horizontal">
                                    <div class="stat-item">
                                        <span class="stat-label">今日新增市场主体（户）</span>
                                        <span class="stat-value highlight-num" data-modal="new_market" style="cursor: pointer;">80</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">办理开办企业手续平均耗时</span>
                                        <span class="stat-value highlight-num" data-modal="startup_time" style="cursor: pointer;">7h</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">今日新增项目</span>
                                        <span class="stat-value highlight-num" data-modal="new_project" style="cursor: pointer;">80</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">项目主要事项审批平均用时</span>
                                        <span class="stat-value highlight-num" data-modal="project_approval" style="cursor: pointer;">7h</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">项目从审批到落地平均用时</span>
                                        <span class="stat-value highlight-num" data-modal="project_landing" style="cursor: pointer;">7h</span>
                                    </div>
                                </div>
                            </div>
                            <div class="map-container">
                                <div class="map-view-tabs">
                                    <button class="map-view-tab map-view-tab-active" data-view="panorama">全景图</button>
                                    <button class="map-view-tab" data-view="map">地图</button>
                                </div>
                                <img src="审管法信.gif" class="map-image" data-view="panorama" alt="全景图" style="cursor: pointer;" onclick="window.homePage.openPanoramaModal()">
                                <img src="地图.png" class="map-image map-image-hidden" data-view="map" alt="地图">
                            </div>
                        </div>
                        <div class="card-section industry-section">
                            <div class="card-title">梯度培育</div>
                            <div class="industry-grid">
                                <div class="gradient-grid">
                                    <div class="gradient-item">
                                        <div class="gradient-title">科技和创新型中小企业</div>
                                        <div class="gradient-stats">
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">认定企业总数</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="tech_total" style="cursor: pointer;">1258</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">年度新增认定企业</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="tech_new" style="cursor: pointer;">326</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">同比增加</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="tech_growth" style="cursor: pointer;">92%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gradient-item">
                                        <div class="gradient-title">专精特新中小企业</div>
                                        <div class="gradient-stats">
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">认定企业总数</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="special_total" style="cursor: pointer;">456</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">年度新增认定企业</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="special_new" style="cursor: pointer;">118</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">同比增加</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="special_growth" style="cursor: pointer;">88%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gradient-item">
                                        <div class="gradient-title">专精特新"小巨人"企业</div>
                                        <div class="gradient-stats">
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">认定企业总数</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="giant_total" style="cursor: pointer;">89</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">年度新增认定企业</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="giant_new" style="cursor: pointer;">23</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">同比增加</span>
                                                <span class="gradient-stat-value highlight-num" data-modal="giant_growth" style="cursor: pointer;">85%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="home-right-col">
                        <div class="card-section right-panel-section">
                            <div class="achievement-section">
                                <div class="achievement-card">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">⏱</span>
                                        <span class="achievement-title">审批效率飞跃</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-row" data-modal="approval_compress" style="cursor: pointer;">审批时限整体压缩<span class="highlight-num">90%</span><span class="trend-up">↑ 1%</span></div>
                                        <div class="achievement-row" data-modal="approval_efficiency" style="cursor: pointer;">平均<span class="highlight-num">20分钟</span>即可办结1件业务<span class="trend-down">↓ 1%</span></div>
                                    </div>
                                </div>
                                
                              
                                
                                <div class="achievement-card" data-modal="approval_supervision" style="cursor: pointer;">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">🔄</span>
                                        <span class="achievement-title">审管衔接无缝</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-row">审批与监管衔接业务实现<span class="highlight-num">100%</span>互通共享</div>
                                        <div class="achievement-desc">彻底打破信息孤岛，实现无缝对接</div>
                                    </div>
                                </div>
                                
                                <div class="achievement-card">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">⚡</span>
                                        <span class="achievement-title">管法衔接顺畅</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-row">线上移送线索<span class="highlight-num" data-modal="task_push" style="cursor: pointer;">11.21万宗</span>，转换案件<span class="highlight-num" data-modal="push_rate" style="cursor: pointer;">99宗</span>，线上线索移送率<span class="highlight-num" data-modal="transfer_rate" style="cursor: pointer;">99%</span></div>
                                    </div>
                                </div>
                                
                                <div class="achievement-card">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">🛡</span>
                                        <span class="achievement-title">信用服务广泛覆盖</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-row" data-modal="credit_service" style="cursor: pointer;">信用等级审批办件量<span class="highlight-num">300万件</span><span class="trend-up">↑ 1%</span></div>
                                        <div class="achievement-desc">累计为<span class="highlight-num" data-modal="credit_verify" style="cursor: pointer;">630.11万</span>申请人提供自动信用核验服务，<span class="highlight-num" data-modal="credit_coverage" style="cursor: pointer;">99%</span>的办事主体享受到诚信便利服务</div>
                                    
                                    </div>
                                </div>
                                
                                <div class="achievement-card">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">✓</span>
                                        <span class="achievement-title">诚信激励效果显著</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-desc">合规比例<span class="highlight-num" data-modal="compliance_rate" style="cursor: pointer;">90%  </span><span class="trend-up">    ↑ 1%</span> ，信用等级B级及以上市场主体<span class="highlight-num" data-modal="credit_b_above" style="cursor: pointer;">630.11万  </span><span class="trend-up">    ↑ 1%</span> ，违法比例<span class="highlight-num" data-modal="violation_rate" style="cursor: pointer;">10%  </span><span class="trend-down">    ↓ 1%</span></div>
                                    </div>
                                </div>

                                  <div class="achievement-card" style="cursor: pointer;">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">🔗</span>
                                        <span class="achievement-title">风险预警动态监测</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-row">根据风险预警模型发现并处置<span class="highlight-num" data-modal="risk_warning" style="cursor: pointer;">45个</span>预警信息，处置率<span class="highlight-num" data-modal="risk_disposal_rate" style="cursor: pointer;">100%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.initMapViewTabs();
        this.initCharts();
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
        const increasePie = echarts.init(document.getElementById('marketIncreasePie'));
        increasePie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { 
                    show: true, 
                    formatter: '{b}\n{c}%', 
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 14
                },
                emphasis: { label: { show: true, fontSize: 16, formatter: '{b}\n{d}%' } },
                data: [
                    { value: 45, name: '迁入', itemStyle: { color: '#34c759' } },
                    { value: 40, name: '新设立', itemStyle: { color: '#00d4ff' } },
                    { value: 15, name: '"个转企"', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });

        const decreasePie = echarts.init(document.getElementById('marketDecreasePie'));
        decreasePie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label: { 
                    show: true, 
                    formatter: '{b}\n{c}%', 
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 14
                },
                emphasis: { label: { show: true, fontSize: 16, formatter: '{b}\n{d}%' } },
                data: [
                    { value: 30, name: '迁出', itemStyle: { color: '#ff3b30' } },
                    { value: 70, name: '注（吊）销', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });

        window.addEventListener('resize', () => {
            try { increasePie.resize(); } catch(e) {}
            try { decreasePie.resize(); } catch(e) {}
        });
        
        this.bindAchievementCardEvents();
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
                    <span class="panorama-modal-title">全景流程图</span>
                    <button class="panorama-modal-close">×</button>
                </div>
                <div class="panorama-modal-content">
                    <img src="流程图.gif" class="panorama-image" alt="流程图">
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '', '${item.region}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value" style="color: #34c759;">-15%</span>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value" style="color: #34c759;">-20%</span>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '', '${item.region}')">${item.name}</span></td>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '${item.industry}')">${item.name}</span></td>
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
            const typeColor = item.type === '好评' ? '#34c759' : '#ff3b30';
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
            const evalColor = item.evaluation === '非常满意' ? '#34c759' : (item.evaluation === '满意' ? '#007aff' : (item.evaluation === '基本满意' ? '#ffcc00' : '#ff3b30'));
            return `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value">2,300件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">减少</span>
                        <span class="indicator-stat-value" style="color: #34c759;">2,277件</span>
                    </div>
                     <div class="indicator-stat-card">
                        <span class="indicator-stat-label">投诉下降率</span>
                        <span class="indicator-stat-value">99%</span>
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
            const statusColor = item.status === '已处理' ? '#34c759' : '#ffcc00';
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
                        <span class="indicator-stat-value" style="color: #34c759;">+92%</span>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '${item.industry}', '${item.region}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value" style="color: #34c759;">+92%</span>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '${item.industry}', '${item.region}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value" style="color: #34c759;">+92%</span>
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
                        <span class="indicator-stat-value" style="color: #34c759;">+88%</span>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '${item.industry}', '${item.region}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value" style="color: #34c759;">+88%</span>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '${item.industry}', '${item.region}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value" style="color: #34c759;">+88%</span>
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
                        <span class="indicator-stat-value" style="color: #34c759;">+85%</span>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '${item.industry}', '${item.region}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value" style="color: #34c759;">+85%</span>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '', '${item.industry}', '${item.region}')">${item.name}</span></td>
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
                        <span class="indicator-stat-value" style="color: #34c759;">+85%</span>
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
            const levelColor = item.level === '红色' ? '#ff3b30' : item.level === '橙色' ? '#ff9500' : item.level === '黄色' ? '#ffcc00' : '#007aff';
            return `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openWarningDetailModal('${item.code}', '${item.domain}', '${item.level}', '${item.source}', '${item.foundDate}', '${item.excludeDate}', '${item.method}')">${item.code}</span></td>
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
            const levelColor = item.level === '红色' ? '#ff3b30' : item.level === '橙色' ? '#ff9500' : item.level === '黄色' ? '#ffcc00' : '#007aff';
            return `
            <tr>
                <td>${start + index + 1}</td>
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openWarningDetailModal('${item.code}', '${item.domain}', '${item.level}', '系统', '${item.foundDate}', '${item.disposalDate}', '${item.method}')">${item.code}</span></td>
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
                    <span class="indicator-modal-title">市场主体合规比例分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">市场主体总数</span>
                        <span class="indicator-stat-value">700.12万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">合规主体数</span>
                        <span class="indicator-stat-value">630.11万户</span>
                    </div>
                    
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">不合规主体数</span>
                        <span class="indicator-stat-value">70.01万户</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">合规比例</span>
                        <span class="indicator-stat-value">90%</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">合规占比</span>
                        <div id="modal-compliance-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域合规比例情况</span>
                        <div id="modal-compliance-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>行业名称</th>
                                <th>市场主体总数（万户）</th>
                                <th>合规主体数（万户）</th>
                                <th>合规比例（%）</th>
                                <th>不合规主体数（万户）</th>
                                <th>主要不合规类型</th>
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
        const violationTypes = ['无证经营', '超范围经营', '未年报', '产品质量', '虚假宣传', '价格欺诈'];
        const allItems = [];
        for (let i = 1; i <= 40; i++) {
            const total = parseFloat((Math.random() * 50 + 10).toFixed(2));
            const rate = Math.floor(Math.random() * 20) + 80;
            const compliant = parseFloat((total * rate / 100).toFixed(2));
            const nonCompliant = parseFloat((total - compliant).toFixed(2));
            allItems.push({
                industry: industries[i % 15],
                total: total,
                compliant: compliant,
                rate: rate,
                nonCompliant: nonCompliant,
                violationType: violationTypes[i % 6]
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
                <td>${item.nonCompliant}</td>
                <td>${item.violationType}</td>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openClueDetailModal('${item.clueNo}', '${item.source}', '${item.transferDept}', '${item.receiveDept}', '${item.transferTime}', '${item.receiveStatus}', '${item.handleStatus}')">${item.clueNo}</span></td>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.company}', '${item.creditCode}')">${item.company}</span></td>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.name}', '${item.code}', '${item.industry}')">${item.name}</span></td>
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
                <td><span class="highlight-num" style="cursor: pointer; color: #00d4ff;" onclick="window.homePage.openObjectProfileModal('${item.applicant}', '${item.creditCode}')">${item.applicant}</span></td>
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
            }
        }, 100);
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
                    lineStyle: { color: '#00d4ff', width: 2 },
                    itemStyle: { color: '#00d4ff' }
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
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#0080ff' }
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
                    lineStyle: { color: '#34c759', width: 2 },
                    itemStyle: { color: '#34c759' }
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
                    { value: 25, name: '10分钟内', itemStyle: { color: '#34c759' } },
                    { value: 35, name: '10-20分钟', itemStyle: { color: '#00d4ff' } },
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
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#0080ff' }
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
                    { value: 28, name: '监管信息', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '执法信息', itemStyle: { color: '#34c759' } },
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
                        { offset: 0, color: '#34c759' },
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
                    { value: 12, name: '省级部门', itemStyle: { color: '#00d4ff' } },
                    { value: 35, name: '市级部门', itemStyle: { color: '#34c759' } },
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
                lineStyle: { color: '#00d4ff', width: 2 },
                itemStyle: { color: '#00d4ff' },
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
                    { value: 35, name: '许可信息', itemStyle: { color: '#00d4ff' } },
                    { value: 28, name: '监管信息', itemStyle: { color: '#34c759' } },
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
                    { value: 100, name: '已共享', itemStyle: { color: '#34c759' } }
                ],
                label: {
                    show: true,
                    position: 'center',
                    formatter: '100%',
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#34c759',
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
                    color: '#34c759',
                    borderRadius: [4, 4, 0, 0]
                },
                label: { show: true, position: 'top', formatter: '{c}%', color: '#34c759', textBorderWidth: 0 }
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
                    { value: 25, name: '高效办成一件事', itemStyle: { color: '#34c759' } },
                    { value: 20, name: '极简审批', itemStyle: { color: '#00d4ff' } },
                    { value: 18, name: '智能快办', itemStyle: { color: '#007aff' } },
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
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#34c759' }
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
                lineStyle: { color: '#00d4ff', width: 2 },
                itemStyle: { color: '#00d4ff' },
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
                    { value: 35, name: '日常监管', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '专项检查', itemStyle: { color: '#34c759' } },
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
                    { value: 20, name: '警告', itemStyle: { color: '#34c759' } },
                    { value: 45, name: '罚款', itemStyle: { color: '#00d4ff' } },
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
                    { value: 112100, name: '线上移送线索', itemStyle: { color: '#00d4ff' } },
                    { value: 8965, name: '已接收线索(8%)', itemStyle: { color: '#5856d6' } },
                    { value: 1255, name: '已立案调查(14%)', itemStyle: { color: '#ff9500' } },
                    { value: 99, name: '已结案(7.9%)', itemStyle: { color: '#34c759' } }
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
                    color: '#00d4ff',
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
                    { value: 99, name: '99%', itemStyle: { color: '#34c759' } },
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
                        { value: 99, itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                        { value: 97, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                        { value: 98, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                        { value: 100, itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                        { value: 94, itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                        { value: 96, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                        { value: 99, itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
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
                lineStyle: { color: '#00d4ff', width: 2 },
                itemStyle: { color: '#00d4ff' },
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
                    { value: 65, name: '信用等级审批', itemStyle: { color: '#00d4ff' } },
                    { value: 35, name: '非信用等级审批', itemStyle: { color: '#34c759' } }
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
                    { value: 40, name: '行政许可', itemStyle: { color: '#00d4ff' } },
                    { value: 15, name: '行政确认', itemStyle: { color: '#34c759' } },
                    { value: 7, name: '行政裁决', itemStyle: { color: '#ff9500' } },
                    { value: 5, name: '行政奖励', itemStyle: { color: '#ffcc00' } },
                    { value: 3, name: '行政给付', itemStyle: { color: '#ff6b6b' } },
                    { value: 24, name: '公共服务', itemStyle: { color: '#9b59b6' } },
                    { value: 6, name: '其他行政权力', itemStyle: { color: '#1abc9c' } }
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
                    { value: 55, name: '企业', itemStyle: { color: '#00d4ff' } },
                    { value: 30, name: '个体工商', itemStyle: { color: '#34c759' } },
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
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#34c759' }
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
                lineStyle: { color: '#00d4ff', width: 2 },
                itemStyle: { color: '#00d4ff' },
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
                    { value: 97, name: '通过', itemStyle: { color: '#34c759' } },
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
                data: [245.67, 384.44, 49.01, 21.0],
                itemStyle: {
                    color: ['#34c759', '#00d4ff', '#ff9500', '#ff3b30'],
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
                    { value: 45, name: '企业', itemStyle: { color: '#34c759' } },
                    { value: 40, name: '个体工商', itemStyle: { color: '#00d4ff' } },
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
                    { value: 35, name: 'A级', itemStyle: { color: '#34c759' } },
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
                    color: '#34c759',
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
                        color: '#00d4ff',
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
                    { value: 90, name: '合规', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#34c759' }, { offset: 1, color: '#06c270' }]) } },
                    { value: 10, name: '不合规', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#ff3b30' }, { offset: 1, color: '#ff9500' }]) } }
                ],
                label: {
                    show: true,
                    position: 'center',
                    formatter: '90%',
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#34c759',
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
                    { value: 92, itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                    { value: 90, itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                    { value: 95, itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                    { value: 85, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                    { value: 88, itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                    { value: 82, itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                    { value: 96, itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
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
                    { value: 45, name: '企业', itemStyle: { color: '#007aff' } },
                    { value: 30, name: '个体工商户', itemStyle: { color: '#34c759' } },
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
            series: [{ type: 'bar', data: [25, 18, 12, 8, 6, 5, 4, 2], itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}户', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
            series: [{ type: 'bar', data: [6.5, 8.2, 5.8, 9.5, 12.0, 7.0], itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}h', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                    { value: 6.5, name: '批发零售', itemStyle: { color: '#34c759' } },
                    { value: 8.2, name: '餐饮住宿', itemStyle: { color: '#007aff' } },
                    { value: 5.8, name: '科技服务', itemStyle: { color: '#00d4ff' } },
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
                    { value: 32, name: '政府投资项目', itemStyle: { color: '#007aff' } },
                    { value: 48, name: '企业投资项目', itemStyle: { color: '#00d4ff' } }
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
            series: [{ type: 'bar', data: [22, 18, 12, 8, 7, 6, 4, 3], itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}个', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
            series: [{ type: 'bar', data: [8.5, 6.2, 4.8, 9.5, 7.2], itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}h', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                    { value: 8.5, name: '政府投资项目', itemStyle: { color: '#34c759' } },
                    { value: 6.2, name: '企业投资项目', itemStyle: { color: '#007aff' } },
                    { value: 4.8, name: '科技创新项目', itemStyle: { color: '#00d4ff' } },
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
                itemStyle: { color: '#00d4ff' },
                lineStyle: { color: '#00d4ff', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
                    ])
                },
                label: { show: true, position: 'top', formatter: '{c}', fontSize: 11, color: '#00d4ff', textBorderWidth: 0 }
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
                    { value: 1456, name: '企业', itemStyle: { color: '#007aff' } },
                    { value: 1200, name: '个体', itemStyle: { color: '#34c759' } },
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
                    { value: 987, name: '注销', itemStyle: { color: '#007aff' } },
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
                pointer: { show: true, length: '60%', width: 6, itemStyle: { color: '#34c759' } },
                progress: { show: true, overlap: false, roundCap: true, clip: false, itemStyle: { color: '#34c759' } },
                axisLine: { lineStyle: { width: 20, color: [[1, '#34c759']] } },
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                title: { show: false },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    fontSize: 36,
                    fontWeight: 'bold',
                    color: '#34c759',
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
                    { value: 35, name: '服务态度', itemStyle: { color: '#34c759' } },
                    { value: 30, name: '办事效率', itemStyle: { color: '#007aff' } },
                    { value: 20, name: '流程便捷', itemStyle: { color: '#00d4ff' } },
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
                    { value: 45, name: '非常满意', itemStyle: { color: '#34c759' } },
                    { value: 35, name: '满意', itemStyle: { color: '#007aff' } },
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
            series: [{ type: 'bar', data: [99.5, 99.2, 99.0, 98.8, 98.5, 98.2, 98.0, 97.5], itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                    { value: 30, name: '制造业', itemStyle: { color: '#007aff' } },
                    { value: 25, name: '信息技术', itemStyle: { color: '#00d4ff' } },
                    { value: 20, name: '科学研究', itemStyle: { color: '#34c759' } },
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
            series: [{ type: 'bar', data: [380, 280, 200, 150, 120, 80, 40, 8], itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                itemStyle: { color: '#34c759' },
                lineStyle: { color: '#34c759', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(52, 199, 89, 0.3)' },
                        { offset: 1, color: 'rgba(52, 199, 89, 0.05)' }
                    ])
                },
                label: { show: true, position: 'top', formatter: '{c}', fontSize: 11, color: '#34c759', textBorderWidth: 0 }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-tech-new-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [100, 75, 55, 40, 30, 20, 8, 0], itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
            series: [{ type: 'bar', data: [100, 94, 92, 90, 87, 80, 75, 100], itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                    { value: 35, name: '制造业', itemStyle: { color: '#007aff' } },
                    { value: 28, name: '信息技术', itemStyle: { color: '#00d4ff' } },
                    { value: 18, name: '科学研究', itemStyle: { color: '#34c759' } },
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
            series: [{ type: 'bar', data: [150, 100, 75, 55, 40, 25, 10, 1], itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                itemStyle: { color: '#34c759' },
                lineStyle: { color: '#34c759', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(52, 199, 89, 0.3)' },
                        { offset: 1, color: 'rgba(52, 199, 89, 0.05)' }
                    ])
                },
                label: { show: true, position: 'top', formatter: '{c}', fontSize: 11, color: '#34c759', textBorderWidth: 0 }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-special-new-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [40, 28, 18, 12, 10, 6, 3, 1], itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
            series: [{ type: 'bar', data: [92, 87, 80, 80, 60, 33, 0, 0], itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                    { value: 40, name: '制造业', itemStyle: { color: '#007aff' } },
                    { value: 30, name: '信息技术', itemStyle: { color: '#00d4ff' } },
                    { value: 15, name: '科学研究', itemStyle: { color: '#34c759' } },
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
            series: [{ type: 'bar', data: [40, 25, 10, 6, 4, 3, 1, 0], itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                itemStyle: { color: '#34c759' },
                lineStyle: { color: '#34c759', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(52, 199, 89, 0.3)' },
                        { offset: 1, color: 'rgba(52, 199, 89, 0.05)' }
                    ])
                },
                label: { show: true, position: 'top', formatter: '{c}', fontSize: 11, color: '#34c759', textBorderWidth: 0 }
            }]
        });

        const bar = echarts.init(document.getElementById('modal-giant-new-bar'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis', formatter: '{b}: {c}家' },
            grid: { left: '8%', right: '8%', bottom: '18%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['海口', '三亚', '儋州', '文昌', '琼海', '万宁', '东方', '澄迈'], axisLabel: { fontSize: 11, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}家' } },
            series: [{ type: 'bar', data: [10, 6, 3, 2, 1, 1, 0, 0], itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}家', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
            series: [{ type: 'bar', data: [83, 100, 50, 100, 0, 0, 0, 0], itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                    { value: 3, name: '材料要求', itemStyle: { color: '#007aff' } },
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
                    { value: 11.5, name: '政府投资项目', itemStyle: { color: '#34c759' } },
                    { value: 8.2, name: '企业投资项目', itemStyle: { color: '#007aff' } },
                    { value: 6.5, name: '科技创新项目', itemStyle: { color: '#00d4ff' } },
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
            series: [{ type: 'bar', data: [11.5, 8.2, 6.5, 12.8, 9.5, 7.8, 8.5, 10.2], itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', formatter: '{c}h', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 } }]
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
                { name: '蓝色预警', type: 'bar', stack: 'total', data: [2, 1, 1, 1, 2], itemStyle: { color: '#007aff' } }
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
                itemStyle: { color: '#00d4ff' },
                lineStyle: { color: '#00d4ff', width: 2 },
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
                    color: '#00d4ff',
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
                itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] },
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
                        { offset: 0, color: '#34c759' },
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
        const levelColor = level === '红色' ? '#ff3b30' : level === '橙色' ? '#ff9500' : level === '黄色' ? '#ffcc00' : '#007aff';
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
                                    <button class="risk-warning-detail-btn">查看详情</button>
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
                            { value: 12, name: '许可审批', itemStyle: { color: '#00d4ff' } },
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
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }
};
