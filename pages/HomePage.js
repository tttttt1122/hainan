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
                                            <span class="activity-count">99</span>
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
                                            <span class="activity-count">99</span>
                                            <span class="trend-down">↓ 1%</span>
                                        </span>
                                    </div>
                                    <div class="activity-pie-container">
                                        <div id="marketDecreasePie" class="activity-pie"></div>
                                    </div>
                                </div>
                                <div class="activity-item activity-parent">
                                    <span class="activity-label">信用等级B级及以上市场主体</span>
                                    <span class="activity-value-group">
                                        <span class="activity-count">99万</span>
                                        <span class="activity-ratio">占比70%</span>
                                        <span class="trend-up">↑ 1%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="card-section satisfaction-section-left">
                            <div class="card-title">企业和群众满意度</div>
                            <div class="satisfaction-items">
                              
                                <div class="satisfaction-item">
                                    <span class="satisfaction-label">"好差评"好评率</span>
                                    <span class="satisfaction-value-group">
                                        <span class="satisfaction-count">99.96%</span>
                                    </span>
                                </div>
                                <div class="satisfaction-item">
                                    <span class="satisfaction-label">涉企检查市场主体满意度</span>
                                    <span class="satisfaction-value-group">
                                        <span class="satisfaction-count">99%</span>
                                    </span>
                                </div>
                                <div class="satisfaction-item">
                                    <span class="satisfaction-label">涉企检查12345投诉下降</span>
                                    <span class="satisfaction-value-group">
                                        <span class="satisfaction-count">99%</span>
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
                                        <span class="stat-value">80</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">办理开办企业手续平均耗时</span>
                                        <span class="stat-value">7h</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">今日新增建筑工程项目</span>
                                        <span class="stat-value">80</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">建筑工程项目主要事项审批平均用时</span>
                                        <span class="stat-value">7h</span>
                                    </div>
                                    <div class="stat-divider"></div>
                                    <div class="stat-item">
                                        <span class="stat-label">建筑工程项目从审批到落地平均用时</span>
                                        <span class="stat-value">7h</span>
                                    </div>
                                </div>
                            </div>
                            <div class="map-container">
                                <div class="map-view-tabs">
                                    <button class="map-view-tab map-view-tab-active" data-view="panorama">全景图</button>
                                    <button class="map-view-tab" data-view="map">地图</button>
                                </div>
                                <img src="审管法信.gif" class="map-image" data-view="panorama" alt="全景图">
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
                                                <span class="gradient-stat-value">1258</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">年度新增认定企业数</span>
                                                <span class="gradient-stat-value">326</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">同比增加</span>
                                                <span class="gradient-stat-value">2%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gradient-item">
                                        <div class="gradient-title">专精特新中小企业</div>
                                        <div class="gradient-stats">
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">认定企业总数</span>
                                                <span class="gradient-stat-value">456</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">年度新增认定企业数</span>
                                                <span class="gradient-stat-value">118</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">同比增加</span>
                                                <span class="gradient-stat-value">8%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gradient-item">
                                        <div class="gradient-title">专精特新"小巨人"企业</div>
                                        <div class="gradient-stats">
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">认定企业总数</span>
                                                <span class="gradient-stat-value">89</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">年度新增认定企业数</span>
                                                <span class="gradient-stat-value">23</span>
                                            </div>
                                            <div class="gradient-stat">
                                                <span class="gradient-stat-label">同比增加</span>
                                                <span class="gradient-stat-value">5%</span>
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
                                        <div class="achievement-row" data-modal="approval_compress" style="cursor: pointer;">审批时限整体压缩<span class="highlight-num">90%以上</span></div>
                                        <div class="achievement-row" data-modal="approval_efficiency" style="cursor: pointer;">平均<span class="highlight-num">20分钟</span>即可办结1件业务</div>
                                    </div>
                                </div>
                                
                                <div class="achievement-card" data-modal="info_share" style="cursor: pointer;">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">🔗</span>
                                        <span class="achievement-title">信息共享规模</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-row">平台累计共享各类许可信息超过<span class="highlight-num">68万件次</span></div>
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
                                        <span class="achievement-title">业务协同高效</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-row" data-modal="task_push" style="cursor: pointer;">自动推送监管核查任务<span class="highlight-num">11万+件</span></div>
                                        <div class="achievement-row" data-modal="penalty_transfer" style="cursor: pointer;">流转行政处罚办件<span class="highlight-num">18万+件次</span></div>
                                    </div>
                                </div>
                                
                                <div class="achievement-card">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">🛡</span>
                                        <span class="achievement-title">信用服务广泛覆盖</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-row" data-modal="credit_service" style="cursor: pointer;">办件量超<span class="highlight-num">300万件</span></div>
                                        <div class="achievement-desc" data-modal="credit_coverage" style="cursor: pointer;"><span class="highlight-num">99%</span>的办事企业享受到诚信便利服务</div>
                                    </div>
                                </div>
                                
                                <div class="achievement-card" data-modal="credit_verify" style="cursor: pointer;">
                                    <div class="achievement-header">
                                        <span class="achievement-icon">✓</span>
                                        <span class="achievement-title">诚信激励效果显著</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-desc">"海易办"平台累计为超<span class="highlight-num">630万</span>申请人提供自动信用核验服务</div>
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
    }

    // ==================== 弹窗系统 ====================
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
            case 'info_share':
                overlay.innerHTML = this.renderInfoShareModal();
                break;
            case 'approval_supervision':
                overlay.innerHTML = this.renderApprovalSupervisionModal();
                break;
            case 'task_push':
                overlay.innerHTML = this.renderTaskPushModal();
                break;
            case 'penalty_transfer':
                overlay.innerHTML = this.renderPenaltyTransferModal();
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
                        <span class="indicator-stat-label">原法定总时限</span>
                        <span class="indicator-stat-value">1,280天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">现平均办理时限</span>
                        <span class="indicator-stat-value">1.2天</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计节省天数</span>
                        <span class="indicator-stat-value">9,856天</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各维度时限压缩率雷达图</span>
                        <div id="modal-radar-1" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各事项压缩幅度排行TOP8</span>
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
                                <th>原法定时限（天）</th>
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
                        <span class="indicator-stat-value">20分钟</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">即办件占比</span>
                        <span class="indicator-stat-value">45%</span>
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
                                <th>即办件标识</th>
                                <th>办理效率评级</th>
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
            { name: '企业名称预先核准', type: '企业登记', time: 5, instant: '是', level: '高效' },
            { name: '营业执照补发', type: '企业登记', time: 8, instant: '是', level: '高效' },
            { name: '食品经营许可新办', type: '食品药品', time: 15, instant: '否', level: '高效' },
            { name: '公共场所卫生许可', type: '卫生计生', time: 12, instant: '是', level: '高效' },
            { name: '劳务派遣经营许可', type: '人力资源', time: 25, instant: '否', level: '一般' },
            { name: '危险化学品许可', type: '安全生产', time: 35, instant: '否', level: '待优化' },
            { name: '建筑施工许可', type: '工程建设', time: 20, instant: '否', level: '高效' },
            { name: '特种设备登记', type: '市场监管', time: 10, instant: '是', level: '高效' },
            { name: '医疗器械备案', type: '食品药品', time: 18, instant: '是', level: '高效' },
            { name: '进出口权备案', type: '商务贸易', time: 22, instant: '否', level: '一般' }
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

    // 弹窗三：信息共享规模分析
    renderInfoShareModal() {
        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">信息共享规模分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计共享信息</span>
                        <span class="indicator-stat-value">68万件次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">本月新增</span>
                        <span class="indicator-stat-value">3,456件次</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">共享部门数</span>
                        <span class="indicator-stat-value">38个</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">接口调用次数</span>
                        <span class="indicator-stat-value">125,678次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月信息共享趋势</span>
                        <div id="modal-line-3" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">信息类型分布</span>
                        <div id="modal-pie-3" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>共享批次</th>
                                <th>信息类型</th>
                                <th>提供部门</th>
                                <th>接收部门</th>
                                <th>共享时间</th>
                                <th>共享方式</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateInfoShareTableRows()}
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

    generateInfoShareTableRows() {
        const types = ['许可信息', '监管信息', '执法信息', '信用信息'];
        const methods = ['接口', '文件', '库表'];
        const depts = ['审批局', '市场监管局', '生态环境局', '交通运输局', '卫健委'];
        const allItems = [];
        for (let i = 1; i <= 40; i++) {
            allItems.push({
                batch: `Batch${20240000 + i}`,
                type: types[i % 4],
                provideDept: depts[i % 5],
                receiveDept: depts[(i + 2) % 5],
                time: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-15`,
                method: methods[i % 3]
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.batch}</td>
                <td>${item.type}</td>
                <td>${item.provideDept}</td>
                <td>${item.receiveDept}</td>
                <td>${item.time}</td>
                <td>${item.method}</td>
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
                        <span class="indicator-stat-label">互通共享率</span>
                        <span class="indicator-stat-value">100%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已衔接事项</span>
                        <span class="indicator-stat-value">1,286项</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">自动推送任务</span>
                        <span class="indicator-stat-value">11万+件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">流转办件</span>
                        <span class="indicator-stat-value">18万+件次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">互通状态</span>
                        <div id="modal-pie-4" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域审管衔接覆盖率</span>
                        <div id="modal-bar-4" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>事项名称</th>
                                <th>审批部门</th>
                                <th>监管部门</th>
                                <th>衔接方式</th>
                                <th>衔接状态</th>
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
            { name: '食品经营许可证', approval: '审批局', supervision: '市场监管局', method: '自动推送', status: '已互通' },
            { name: '建筑工程施工许可', approval: '住建局', supervision: '质安站', method: '自动推送', status: '已互通' },
            { name: '排污许可证', approval: '生态环境局', supervision: '执法支队', method: '自动推送', status: '已互通' },
            { name: '医疗机构执业许可', approval: '卫健委', supervision: '卫生监督所', method: '自动推送', status: '已互通' },
            { name: '劳务派遣许可', approval: '人社局', supervision: '劳动保障监察', method: '手动抄送', status: '已互通' },
            { name: '道路运输许可', approval: '交通运输局', supervision: '运管处', method: '自动推送', status: '已互通' },
            { name: '危险化学品许可', approval: '应急管理局', supervision: '执法大队', method: '自动推送', status: '已互通' },
            { name: '特种设备许可', approval: '市场监管局', supervision: '特检院', method: '自动推送', status: '已互通' },
            { name: '药品经营许可', approval: '药监局', supervision: '市场监管所', method: '自动推送', status: '已互通' },
            { name: '文化经营许可', approval: '文旅局', supervision: '文化执法队', method: '手动抄送', status: '推进中' }
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
                    <span class="indicator-modal-title">监管核查任务自动推送分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">自动推送任务</span>
                        <span class="indicator-stat-value">11.2万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已签收</span>
                        <span class="indicator-stat-value">10.6万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">签收率</span>
                        <span class="indicator-stat-value">94.6%</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">已办结</span>
                        <span class="indicator-stat-value">8.9万件</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">各领域自动推送任务分布TOP8</span>
                        <div id="modal-bar-5" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">任务类型分布</span>
                        <div id="modal-pie-5" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>任务编号</th>
                                <th>任务名称</th>
                                <th>推送部门</th>
                                <th>接收部门</th>
                                <th>推送时间</th>
                                <th>签收状态</th>
                                <th>办结状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTaskPushTableRows()}
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

    generateTaskPushTableRows() {
        const depts = ['市场监管局', '生态环境局', '交通运输局', '卫健委', '应急管理局'];
        const types = ['日常监管', '专项检查', '双随机任务', '重点监管'];
        const allItems = [];
        for (let i = 1; i <= 75; i++) {
            allItems.push({
                taskNo: `RW${20240000 + i}`,
                taskName: `${types[i % 4]}任务-${i}`,
                pushDept: '审批局',
                receiveDept: depts[i % 5],
                pushTime: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-${(i % 28 + 1).toString().padStart(2, '0')}`,
                signStatus: i % 10 === 0 ? '未签收' : '已签收',
                finishStatus: i % 5 === 0 ? '办理中' : (i % 7 === 0 ? '未办结' : '已办结')
            });
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const items = allItems.slice(start, start + this.pageSize);
        return items.map((item, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item.taskNo}</td>
                <td>${item.taskName}</td>
                <td>${item.pushDept}</td>
                <td>${item.receiveDept}</td>
                <td>${item.pushTime}</td>
                <td>${item.signStatus}</td>
                <td>${item.finishStatus}</td>
            </tr>
        `).join('');
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
                    <span class="indicator-modal-title">信用服务办件量分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">总办件量</span>
                        <span class="indicator-stat-value">300万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">行政审批</span>
                        <span class="indicator-stat-value">135万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">公共服务</span>
                        <span class="indicator-stat-value">98万件</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">监管执法</span>
                        <span class="indicator-stat-value">67万件</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 6fr 4fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">近12个月办件量趋势</span>
                        <div id="modal-area-7" class="indicator-chart-container"></div>
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
                        <span class="indicator-stat-label">享受服务企业</span>
                        <span class="indicator-stat-value">1.2万家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">未覆盖企业</span>
                        <span class="indicator-stat-value">120家</span>
                    </div>
                    <div class="indicator-stat-card">
                        <span class="indicator-stat-label">累计服务次数</span>
                        <span class="indicator-stat-value">8.5万次</span>
                    </div>
                </div>
                <div class="indicator-modal-chart" style="grid-template-columns: 5fr 5fr;">
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">覆盖情况</span>
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
                                <th>企业名称</th>
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
                <td>${item.company}</td>
                <td>${item.creditCode}</td>
                <td>${item.level}</td>
                <td>${item.benefitType}</td>
                <td>${item.firstTime}</td>
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
                <td>${item.applicant}</td>
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
                case 'info_share':
                    this.initInfoShareCharts();
                    break;
                case 'approval_supervision':
                    this.initApprovalSupervisionCharts();
                    break;
                case 'task_push':
                    this.initTaskPushCharts();
                    break;
                case 'penalty_transfer':
                    this.initPenaltyTransferCharts();
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

    // 弹窗三图表
    initInfoShareCharts() {
        const line = echarts.init(document.getElementById('modal-line-3'));
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
                data: [52000, 48000, 55000, 58000, 62000, 65000, 68000, 72000, 75000, 78000, 82000, 85600],
                smooth: true,
                areaStyle: { color: 'rgba(0, 212, 255, 0.3)' },
                lineStyle: { color: '#00d4ff', width: 2 },
                itemStyle: { color: '#00d4ff' },
                label: { show: true, position: 'top', fontSize: 12, color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-pie-3'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 40, name: '许可信息', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '监管信息', itemStyle: { color: '#34c759' } },
                    { value: 20, name: '执法信息', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '信用信息', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, formatter: '{b}\n{c}%', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 },
                labelLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
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
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                data: [
                    { value: 100, name: '已互通', itemStyle: { color: '#34c759' } }
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
                data: [100, 100, 98, 100, 95, 100],
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
        const bar = echarts.init(document.getElementById('modal-bar-5'));
        bar.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'axis' },
            grid: { left: '8%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
            xAxis: { type: 'value' },
            yAxis: {
                type: 'category',
                data: ['市场监管', '生态环境', '交通运输', '卫生健康', '应急管理', '住建工程', '自然资源', '文化旅游'],
                axisLabel: { fontSize: 12 }
            },
            series: [{
                type: 'bar',
                data: [28500, 22000, 18500, 16200, 14800, 13200, 11500, 9800],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#0080ff' }
                    ]),
                    borderRadius: [0, 4, 4, 0]
                },
                label: { show: true, position: 'right', formatter: '{c}', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
            }]
        });

        const pie = echarts.init(document.getElementById('modal-pie-5'));
        pie.setOption({
            textStyle: { color: 'rgba(255,255,255,0.6)' },
            tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 45, name: '日常监管', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '专项检查', itemStyle: { color: '#34c759' } },
                    { value: 20, name: '双随机任务', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '重点监管', itemStyle: { color: '#af52de' } }
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
                    label: { formatter: '300万累计' }
                },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.6)', textBorderWidth: 0 }
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
                    { value: 45, name: '行政审批', itemStyle: { color: '#00d4ff' } },
                    { value: 33, name: '公共服务', itemStyle: { color: '#34c759' } },
                    { value: 22, name: '监管执法', itemStyle: { color: '#ff9500' } }
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
                radius: ['50%', '70%'],
                data: [
                    { value: 99, name: '已覆盖', itemStyle: { color: '#34c759' } },
                    { value: 1, name: '未覆盖', itemStyle: { color: '#ff3b30' } }
                ],
                label: {
                    show: true,
                    position: 'center',
                    formatter: '99%',
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#34c759',
                    textBorderWidth: 0
                }
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

    show() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = '';  // 恢复 CSS 定义的 flex 布局
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }
};
