window.ApprovalPage = class ApprovalPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        this.modalData = [];
        this.currentPage = 1;
        this.pageSize = 5;
        this.currentStatus = 'all';
        this.currentType = 'all';
        this.itemTypeFilter = 'all';
        this.itemDeptFilter = 'all';
        this.currentLicenseFilter = 'all';
        this.currentModalType = '';
        this.currentModalTitle = '';
        this.currentModalColumns = [];
        this.currentModalDataIndexes = [];
        this.render();
        this.bindEvents();
        setTimeout(() => {
            this.ensureChartHeights();
            this.initCharts();
            this.renderDataflowFlowChart();
            Object.values(this.charts).forEach(chart => {
                try { chart.resize(); } catch(e) {}
            });
        }, 100);
    }

    ensureChartHeights() {
        const pieEl = document.getElementById('pie-chart');
        const legalBarEl = document.getElementById('legal-bar-chart');
        const personBarEl = document.getElementById('person-bar-chart');
        const columnEl = document.getElementById('column-chart');
        const casePieType = document.getElementById('case-pie-type');
        const casePieMode = document.getElementById('case-pie-mode');
        const casePieField = document.getElementById('case-pie-field');
        const itemPieMode = document.getElementById('item-pie-mode');
        const itemPieField = document.getElementById('item-pie-field');

        if (pieEl) pieEl.style.height = '210px';
        if (legalBarEl) legalBarEl.style.height = '366px';
        if (personBarEl) personBarEl.style.height = '366px';
        if (columnEl) columnEl.style.height = '300px';
        if (casePieType) casePieType.style.height = '200px';
        if (casePieMode) casePieMode.style.height = '200px';
        if (casePieField) casePieField.style.height = '200px';
        if (itemPieMode) itemPieMode.style.height = '210px';
        if (itemPieField) itemPieField.style.height = '210px';
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container animate-slide-in approval-layout">
                <div class="approval-content">
                    <div class="col-left">
                        <div class="card-section approval-card-case">
                            <div class="card-title-row">
                                <h3 class="card-title">办件情况</h3>
                                <div class="card-title-right cp-clickable" data-indicator="business_volume_analysis" style="cursor: pointer;">
                                    受理量<span class="card-title-value">9,856</span>
                                    <span style="display:inline-block;width:1px;height:14px;background:rgba(0,212,255,0.25);margin:0 8px;vertical-align:middle;"></span>
                                    办结量<span class="card-title-value">9,756</span>
                                </div>
                            </div>
                            <div class="chart-title-row" style="margin-top: 6px; margin-bottom: 4px;">
                                <div class="chart-tabs" id="case-tabs">
                                    <button class="chart-tab active" data-case-tab="type">按事项类型</button>
                                    <button class="chart-tab" data-case-tab="mode">按审批模式</button>
                                    <button class="chart-tab" data-case-tab="field">按所属领域</button>
                                </div>
                            </div>
                            <div id="case-pie-type" class="chart-container pie-container" style="width: 85%; margin: 0 auto; height: 225px;"></div>
                            <div id="case-pie-mode" class="chart-container pie-container chart-hidden" style="width: 85%; margin: 0 auto; height: 225px;"></div>
                            <div id="case-pie-field" class="chart-container pie-container chart-hidden" style="width: 85%; margin: 0 auto; height: 225px;"></div>
                        </div>
                        
                        <div class="card-section approval-card-item">
                            <div class="card-title-row">
                                <h3 class="card-title">事项情况</h3>
                                <div class="card-title-right cp-clickable" data-indicator="item_overview_analysis" style="cursor: pointer;">
                                    事项总数<span class="card-title-value">999项</span>
                                </div>
                            </div>
                            <div class="chart-title-row" style="margin-bottom: 4px;">
                                <div class="chart-tabs" id="item-tabs">
                                    <button class="chart-tab active" data-item-tab="type">按事项类型</button>
                                    <button class="chart-tab" data-item-tab="mode">按审批模式</button>
                                    <button class="chart-tab" data-item-tab="field">按所属领域</button>
                                </div>
                            </div>
                            <div id="pie-chart" class="chart-container pie-container" style="width: 85%; margin: 0 auto; height: 238px;"></div>
                            <div id="item-pie-mode" class="chart-container pie-container chart-hidden" style="width: 85%; margin: 0 auto; height: 238px;"></div>
                            <div id="item-pie-field" class="chart-container pie-container chart-hidden" style="width: 85%; margin: 0 auto; height: 238px;"></div>
                        </div>
                        
                        <div class="card-section approval-card-license">
                            <h3 class="card-title">证照目录汇聚量</h3>
                            <div class="license-pie-container">
                                <div class="license-pie-item" onclick="window.approvalPage.openModal('legal_license_analysis')" style="cursor: pointer;">
                                    <div class="license-pie-title">法人证照</div>
                                    <div class="license-pie-count">99类</div>
                                    <div id="legal-license-pie" class="chart-container pie-container"></div>
                                </div>
                                <div class="license-pie-item" onclick="window.approvalPage.openModal('person_license_analysis')" style="cursor: pointer;">
                                    <div class="license-pie-title">自然人证照</div>
                                    <div class="license-pie-count">99类</div>
                                    <div id="person-license-pie" class="chart-container pie-container"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-center">
                        <div class="card-section map-card">
                            
                            <div class="today-approval-row">
                            <div class="today-approval-item cp-clickable" data-indicator="ap_case_count">
                                    <span class="today-approval-label">审批办件数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">99</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓3%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" data-indicator="ap_item_count">
                                    <span class="today-approval-label">审批事项数</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">90</span>
                                        <span class="today-approval-change" style="color:#ff3b30;">↑8%</span>
                                    </div>
                                </div>
                                
                                <div class="today-approval-item cp-clickable" data-indicator="ap_time_compress">
                                    <span class="today-approval-label">办件时限压缩比</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">90%</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓5.2%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" data-indicator="ap_material_compress">
                                    <span class="today-approval-label">办件材料压缩比</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">90%</span>
                                        <span class="today-approval-change" style="color:#34c759;">↓2.1%</span>
                                    </div>
                                </div>
                                <div class="today-approval-item cp-clickable" data-indicator="projectLanding">
                                    <span class="today-approval-label">项目审批到落地平均时长</span>
                                    <div class="today-approval-value-row">
                                        <span class="today-approval-value">7h</span>
                                        <span class="today-approval-change" style="color:#ffcc00;">↓20%</span>
                                    </div>
                                </div>
                            </div>
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
                                <div class="card-title-row">
                                    <h3 class="card-title">热门办事主题</h3>
                                    <div class="chart-tabs compact-tabs" id="hot-topic-tabs" style="margin: 0;">
                                        <button class="chart-tab active" data-topic-tab="legal">法人</button>
                                        <button class="chart-tab" data-topic-tab="person">自然人</button>
                                    </div>
                                </div>
                                <div id="legal-bar-chart" class="chart-container bar-container"></div>
                                <div id="person-bar-chart" class="chart-container bar-container chart-hidden"></div>
                            </div>
                            <div class="card-section bar-card">
                                <h3 class="card-title">办件数最多部门TOP10</h3>
                                <div id="dept-top10-list" class="dept-top10-container"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-right">
                        <div class="card-section effect-card">
                            <div class="card-title-row">
                                <h3 class="card-title">成效统计</h3>
                                <div class="chart-tabs compact-tabs" id="effect-tabs" style="margin: 0;">
                                    <button class="chart-tab active" data-effect-tab="type">按事项类型</button>
                                    <button class="chart-tab" data-effect-tab="mode">按审批模式</button>
                                    <button class="chart-tab" data-effect-tab="field">按所属领域</button>
                                </div>
                            </div>
                            <div class="effect-charts-col" style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                                <div class="effect-chart-item" style="display:flex; flex-direction:column; gap:2px;">
                                    <div class="effect-chart-title" style="font-size:12px; font-weight:600; color:#ff9500; padding:0 4px;">平均办理时限</div>
                                    <div id="effect-time-bar" class="chart-container effect-bar-container" style="height: 90px;"></div>
                                </div>
                                <div class="effect-chart-item" style="display:flex; flex-direction:column; gap:2px;">
                                    <div class="effect-chart-title" style="font-size:12px; font-weight:600; color:#ff9500; padding:0 4px;">平均提交材料件数</div>
                                    <div id="effect-material-bar" class="chart-container effect-bar-container" style="height: 90px;"></div>
                                </div>
                                <div class="effect-chart-item" style="display:flex; flex-direction:column; gap:2px;">
                                    <div class="effect-chart-title" style="font-size:12px; font-weight:600; color:#ff9500; padding:0 4px;">平均跑动次数</div>
                                    <div id="effect-run-bar" class="chart-container effect-bar-container" style="height: 90px;"></div>
                                </div>
                                <div class="effect-chart-item" style="display:flex; flex-direction:column; gap:2px;">
                                    <div class="effect-chart-title" style="font-size:12px; font-weight:600; color:#ff9500; padding:0 4px;">好评率</div>
                                    <div id="effect-satisfy-bar" class="chart-container effect-bar-container" style="height: 90px;"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-section dataflow-card">
                            <h3 class="card-title">数据流转情况</h3>
                            <div class="dataflow-tabs">
                                <button class="dataflow-tab active" data-tab="platform">平台流转</button>
                                <button class="dataflow-tab" data-tab="category">数据分类</button>
                            </div>
                            <div id="dataflow-platform" class="dataflow-content">
                                <div class="dataflow-flow-chart" id="dataflow-flow-chart"></div>
                            </div>
                            <div id="dataflow-category" class="dataflow-content dataflow-content-hidden">
                                <div class="dataflow-stats">
                                    <div class="dataflow-stat-item" onclick="window.approvalPage.openModal('push_data_analysis')" style="cursor: pointer;">
                                        <span class="dataflow-label">推送数据</span>
                                        <div class="dataflow-value-box">
                                            <span class="dataflow-value">1.2</span>
                                            <span class="dataflow-unit">万条</span>
                                        </div>
                                        <div id="push-data-pie" class="chart-container pie-container mini-pie"></div>
                                    </div>
                                    <div class="dataflow-stat-item" onclick="window.approvalPage.openModal('receive_data_analysis')" style="cursor: pointer;">
                                        <span class="dataflow-label">收到数据</span>
                                        <div class="dataflow-value-box">
                                            <span class="dataflow-value">1.2</span>
                                            <span class="dataflow-unit">万条</span>
                                        </div>
                                        <div id="receive-data-pie" class="chart-container pie-container mini-pie"></div>
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
            const indicator = e.target.closest('[data-indicator]');
            if (indicator) {
                const type = indicator.dataset.indicator;
                this.openModal(type);
            }
            const tab = e.target.closest('.dataflow-tab');
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
                if (this.charts.pushDataPie) this.charts.pushDataPie.resize();
                if (this.charts.receiveDataPie) this.charts.receiveDataPie.resize();
            }, 100);
        }
    }

    renderDataflowFlowChart() {
        const container = document.getElementById('dataflow-flow-chart');
        if (!container) return;
        container.innerHTML = `
            <div class="dataflow-image-container">
                <img src="审批-数据流转.png" alt="数据流转" class="dataflow-flow-image">
            </div>
        `;
    }

    generateMockData() {
        const data = [];
        const types = ['承诺件', '即办件', '并联审批', '容缺受理'];
        const departments = ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委'];
        const effectTypes = ['高效办成一件事', '极简审批', '智能快办', '免申即享', '全省通办', '信用审批'];
        for (let i = 1; i <= 30; i++) {
            data.push({
                code: 'xx',
                objName: 'xx',
                objCode: 'xx',
                type: types[i % types.length],
                itemName: 'xx',
                status: i <= 15 ? '已受理' : '已办结',
                department: departments[i % departments.length],
                effectType: effectTypes[i % effectTypes.length]
            });
        }
        return data;
    }

    generateItemData() {
        const data = [];
        const itemTypes = ['行政许可', '行政确认', '行政裁决', '行政奖励', '公共服务'];
        const departments = ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委'];
        const regions = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市'];
        for (let i = 1; i <= 30; i++) {
            data.push({
                code: 'xx',
                name: 'xx',
                type: itemTypes[i % itemTypes.length],
                department: departments[i % departments.length],
                region: regions[i % regions.length]
            });
        }
        return data;
    }

    generateTimeLimitData() {
        const data = [];
        const types = ['承诺件', '即办件', '并联审批', '容缺受理'];
        const departments = ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委'];
        for (let i = 1; i <= 30; i++) {
            data.push({
                code: 'xx',
                objName: 'xx',
                objCode: 'xx',
                type: types[i % types.length],
                itemName: 'xx',
                department: departments[i % departments.length],
                timeLimit: Math.floor(Math.random() * 10) + 1
            });
        }
        return data;
    }

    generateMaterialCountData() {
        const data = [];
        const types = ['承诺件', '即办件', '并联审批', '容缺受理'];
        const departments = ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委'];
        for (let i = 1; i <= 30; i++) {
            data.push({
                code: 'xx',
                objName: 'xx',
                objCode: 'xx',
                type: types[i % types.length],
                itemName: 'xx',
                department: departments[i % departments.length],
                materialCount: Math.floor(Math.random() * 10) + 1
            });
        }
        return data;
    }

    generateRunCountData() {
        const data = [];
        const types = ['承诺件', '即办件', '并联审批', '容缺受理'];
        const departments = ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委'];
        for (let i = 1; i <= 30; i++) {
            data.push({
                code: 'xx',
                objName: 'xx',
                objCode: 'xx',
                type: types[i % types.length],
                itemName: 'xx',
                department: departments[i % departments.length],
                runCount: Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 2) + 1
            });
        }
        return data;
    }

    generateGoodRateData() {
        const data = [];
        const types = ['承诺件', '即办件', '并联审批', '容缺受理'];
        const evaluations = ['非常满意', '满意', '一般满意', '不满意', '非常不满意'];
        const departments = ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委'];
        for (let i = 1; i <= 30; i++) {
            data.push({
                code: 'xx',
                objName: 'xx',
                objCode: 'xx',
                type: types[i % types.length],
                itemName: 'xx',
                department: departments[i % departments.length],
                evaluation: evaluations[Math.floor(Math.random() * 5)]
            });
        }
        return data;
    }

    generateLegalLicenseData() {
        const data = [];
        const licenseNames = ['营业执照', '组织机构代码证', '税务登记证', '社会保险登记证', '统计登记证', '开户许可证'];
        for (let i = 1; i <= 30; i++) {
            const year = 2023 + Math.floor(Math.random() * 3);
            const month = Math.floor(Math.random() * 12) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            data.push({
                licenseName: licenseNames[i % licenseNames.length],
                licenseNo: 'xx',
                objName: 'xx',
                objCode: 'xx',
                gatherTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            });
        }
        return data;
    }

    generatePersonLicenseData() {
        const data = [];
        const licenseNames = ['居民身份证', '驾驶证', '行驶证', '护照', '社保卡', '居住证'];
        for (let i = 1; i <= 30; i++) {
            const year = 2023 + Math.floor(Math.random() * 3);
            const month = Math.floor(Math.random() * 12) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            data.push({
                licenseName: licenseNames[i % licenseNames.length],
                licenseNo: 'xx',
                name: 'xx',
                idCard: 'xx',
                gatherTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            });
        }
        return data;
    }

    openModal(type) {
        if (['ap_item_count','ap_case_count','ap_time_compress','ap_material_compress'].includes(type)) {
            this.openApprovalPanorama(type);
            return;
        }
        this.currentPage = 1;
        this.currentType = 'all';
        this.currentStatus = 'all';
        this.itemTypeFilter = 'all';
        this.itemDeptFilter = 'all';
        this.currentLicenseFilter = 'all';
        this.currentModalType = type;

        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        
        const renderMethod = this['render' + type.charAt(0).toUpperCase() + type.slice(1) + 'Modal'];
        if (renderMethod && typeof renderMethod === 'function') {
            this.modalData = this['generate' + type.charAt(0).toUpperCase() + type.slice(1) + 'Data']();
            overlay.innerHTML = renderMethod.call(this);
            this['bind' + type.charAt(0).toUpperCase() + type.slice(1) + 'ModalEvents'](overlay);
        } else {
            this.modalData = this.generateMockData();
            this.currentStatus = type === 'accept_count' ? '已受理' : '已办结';
            overlay.innerHTML = this.renderModal();
            this.bindModalEvents(overlay);
        }

        document.body.appendChild(overlay);

        this.initModalChartsDelayed();

        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) overlay.remove();
    }

    initModalChartsDelayed() {
        const filteredData = this.currentModalType === 'item_total' 
            ? this.modalData 
            : (this.currentModalType === 'accept_count' || this.currentModalType === 'finish_count')
                ? this.modalData
                : this.modalData;
        this.initModalCharts(filteredData);
    }

    generateStats(filteredData) {
        const stats = [];
        
        if (this.currentModalType === 'accept_count' || this.currentModalType === 'finish_count') {
            const total = filteredData.length;
            const typeCount = new Set(filteredData.map(item => item.type)).size;
            const accepted = filteredData.filter(item => item.status === '已受理').length;
            const completed = filteredData.filter(item => item.status === '已办结').length;
            stats.push(
                { label: '总数', value: total },
                { label: '已受理', value: accepted },
                { label: '已办结', value: completed },
                { label: '类型数', value: typeCount }
            );
        } else if (this.currentModalType === 'item_total') {
            const total = filteredData.length;
            const typeCount = new Set(filteredData.map(item => item.type)).size;
            const deptCount = new Set(filteredData.map(item => item.department)).size;
            stats.push(
                { label: '事项总数', value: total },
                { label: '事项类型', value: typeCount },
                { label: '涉及部门', value: deptCount }
            );
        } else if (this.currentModalType === 'avg_time_limit') {
            const total = filteredData.length;
            const avgTime = total > 0 
                ? (filteredData.reduce((sum, item) => sum + (parseInt(item.timeLimit) || 0), 0) / total).toFixed(1) 
                : '0';
            const maxTime = Math.max(...filteredData.map(item => parseInt(item.timeLimit) || 0));
            stats.push(
                { label: '办件总数', value: total },
                { label: '平均时限', value: `${avgTime}天` },
                { label: '最长时限', value: `${maxTime}天` }
            );
        } else if (this.currentModalType === 'avg_material_count') {
            const total = filteredData.length;
            const avgCount = total > 0 
                ? (filteredData.reduce((sum, item) => sum + (parseInt(item.materialCount) || 0), 0) / total).toFixed(1) 
                : '0';
            const maxCount = Math.max(...filteredData.map(item => parseInt(item.materialCount) || 0));
            stats.push(
                { label: '办件总数', value: total },
                { label: '平均材料数', value: `${avgCount}件` },
                { label: '最多提交材料', value: `${maxCount}件` }
            );
        } else if (this.currentModalType === 'avg_run_count') {
            const total = filteredData.length;
            const avgCount = total > 0 
                ? (filteredData.reduce((sum, item) => sum + (parseInt(item.runCount) || 0), 0) / total).toFixed(1) 
                : '0';
            const maxCount = Math.max(...filteredData.map(item => parseInt(item.runCount) || 0));
            stats.push(
                { label: '办件总数', value: total },
                { label: '平均跑动次数', value: `${avgCount}次` },
                { label: '最多跑动次数', value: `${maxCount}次` }
            );
        } else if (this.currentModalType === 'good_rate') {
            const total = filteredData.length;
            const excellent = filteredData.filter(item => item.evaluation === '非常满意').length;
            const good = filteredData.filter(item => item.evaluation === '满意').length;
            const bad = filteredData.filter(item => item.evaluation === '不满意' || item.evaluation === '非常不满意').length;
            const goodCount = excellent + good;
            const rate = total > 0 ? ((goodCount / total) * 100).toFixed(1) : '0';
            stats.push(
                { label: '评价总数', value: total },
                { label: '好评数', value: goodCount },
                { label: '差评数', value: bad },
                { label: '好评率', value: `${rate}%` }
            );
        } else if (this.currentModalType === 'legal_license_count') {
            const total = filteredData.length;
            const typeCount = new Set(filteredData.map(item => item.licenseName)).size;
            stats.push(
                { label: '证照总数', value: total },
                { label: '证照类型', value: typeCount }
            );
        } else if (this.currentModalType === 'person_license_count') {
            const total = filteredData.length;
            const typeCount = new Set(filteredData.map(item => item.licenseName)).size;
            stats.push(
                { label: '证照总数', value: total },
                { label: '证照类型', value: typeCount }
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

    renderCharts() {
        const chartConfigs = [];
        
        if (this.currentModalType === 'accept_count' || this.currentModalType === 'finish_count') {
            chartConfigs.push({ id: 'modal-bar-1', title: '部门办件数' });
            chartConfigs.push({ id: 'modal-bar-2', title: '办件类型分布' });
        } else if (this.currentModalType === 'item_total') {
            chartConfigs.push({ id: 'modal-bar-1', title: '区划事项数' });
            chartConfigs.push({ id: 'modal-bar-2', title: '部门事项数' });
        } else if (this.currentModalType === 'avg_time_limit') {
            chartConfigs.push({ id: 'modal-bar-1', title: '办件类型时限' });
            chartConfigs.push({ id: 'modal-bar-2', title: '办理部门时限' });
        } else if (this.currentModalType === 'avg_material_count') {
            chartConfigs.push({ id: 'modal-bar-1', title: '办件类型材料数' });
            chartConfigs.push({ id: 'modal-bar-2', title: '办理部门材料数' });
        } else if (this.currentModalType === 'avg_run_count') {
            chartConfigs.push({ id: 'modal-bar-1', title: '办件类型跑动次数' });
            chartConfigs.push({ id: 'modal-bar-2', title: '办理部门跑动次数' });
        } else if (this.currentModalType === 'good_rate') {
            chartConfigs.push({ id: 'modal-bar-1', title: '评价分布' });
            chartConfigs.push({ id: 'modal-bar-2', title: '部门好评率' });
        } else if (this.currentModalType === 'legal_license_count') {
            chartConfigs.push({ id: 'modal-pie-1', title: '法人证照分布' });
        } else if (this.currentModalType === 'person_license_count') {
            chartConfigs.push({ id: 'modal-pie-1', title: '自然人证照分布' });
        }
        
        if (chartConfigs.length === 0) return '';
        
        return `
            <div class="indicator-modal-chart">
                ${chartConfigs.map(config => `
                    <div class="indicator-chart-item">
                        <span class="indicator-chart-title">${config.title}</span>
                        <div id="${config.id}" class="indicator-chart-container"></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    initModalCharts(filteredData) {
        setTimeout(() => {
            if (typeof echarts === 'undefined') {
                console.log('ECharts not loaded');
                return;
            }
            
            if (!filteredData || filteredData.length === 0) {
                console.log('No data for charts');
                return;
            }
            
            if (this.currentModalType === 'accept_count' || this.currentModalType === 'finish_count') {
                this.initBarChart('modal-bar-1', filteredData, 'department', ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委']);
                this.initBarChart('modal-bar-2', filteredData, 'effectType', ['高效办成一件事', '极简审批', '智能快办', '免申即享', '全省通办', '信用审批']);
            } else if (this.currentModalType === 'item_total') {
                this.initBarChart('modal-bar-1', filteredData, 'region', ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市']);
                this.initBarChart('modal-bar-2', filteredData, 'department', ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委']);
            } else if (this.currentModalType === 'avg_time_limit') {
                this.initBarChart('modal-bar-1', filteredData, 'type', ['承诺件', '即办件', '并联审批', '容缺受理']);
                this.initBarChart('modal-bar-2', filteredData, 'department', ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委']);
            } else if (this.currentModalType === 'avg_material_count') {
                this.initBarChart('modal-bar-1', filteredData, 'type', ['承诺件', '即办件', '并联审批', '容缺受理']);
                this.initBarChart('modal-bar-2', filteredData, 'department', ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委']);
            } else if (this.currentModalType === 'avg_run_count') {
                this.initBarChart('modal-bar-1', filteredData, 'type', ['承诺件', '即办件', '并联审批', '容缺受理']);
                this.initBarChart('modal-bar-2', filteredData, 'department', ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委']);
            } else if (this.currentModalType === 'good_rate') {
                this.initBarChart('modal-bar-1', filteredData, 'evaluation', ['非常满意', '满意', '一般满意', '不满意', '非常不满意']);
                this.initBarChart('modal-bar-2', filteredData, 'department', ['省发改委', '省财政厅', '省人社厅', '省自然资源厅', '省住建厅', '省卫健委'], 'rate');
            } else if (this.currentModalType === 'legal_license_count') {
                this.initPieChart('modal-pie-1', filteredData, 'licenseName', ['营业执照', '组织机构代码证', '税务登记证', '社会保险登记证', '统计登记证', '开户许可证']);
            } else if (this.currentModalType === 'person_license_count') {
                this.initPieChart('modal-pie-1', filteredData, 'licenseName', ['居民身份证', '驾驶证', '行驶证', '护照', '社保卡', '居住证']);
            }
        }, 200);
    }

    initPieChart(domId, data, field, categories) {
        const dom = document.getElementById(domId);
        if (!dom) {
            console.log('Chart DOM not found:', domId);
            return;
        }
        
        if (typeof echarts === 'undefined') {
            console.log('ECharts not loaded');
            return;
        }
        
        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
            console.log('Chart container has no size:', domId, rect);
            return;
        }
        
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

    initBarChart(domId, data, field, categories, chartType = 'count') {
        const dom = document.getElementById(domId);
        if (!dom) {
            console.log('Chart DOM not found:', domId);
            return;
        }
        
        if (typeof echarts === 'undefined') {
            console.log('ECharts not loaded');
            return;
        }
        
        const rect = dom.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
            console.log('Chart container has no size:', domId, rect);
            return;
        }
        
        const chart = echarts.init(dom);
        const values = {};
        categories.forEach(cat => values[cat] = 0);
        
        if (chartType === 'count') {
            data.forEach(item => {
                if (values[item[field]] !== undefined) {
                    values[item[field]]++;
                }
            });
        } else if (chartType === 'avg') {
            const sums = {};
            const counts = {};
            categories.forEach(cat => { sums[cat] = 0; counts[cat] = 0; });
            data.forEach(item => {
                if (sums[item[field]] !== undefined) {
                    sums[item[field]] += (parseInt(item[field + 'Value']) || parseInt(item[field === 'type' ? 'timeLimit' : 'materialCount']) || parseInt(item[field === 'type' ? 'runCount' : 'runCount']) || 0);
                    counts[item[field]]++;
                }
            });
            categories.forEach(cat => {
                values[cat] = counts[cat] > 0 ? (sums[cat] / counts[cat]).toFixed(1) : 0;
            });
        } else if (chartType === 'rate') {
            const totalCounts = {};
            const goodCounts = {};
            categories.forEach(cat => { totalCounts[cat] = 0; goodCounts[cat] = 0; });
            data.forEach(item => {
                if (totalCounts[item[field]] !== undefined) {
                    totalCounts[item[field]]++;
                    if (item.evaluation === '非常满意' || item.evaluation === '满意') {
                        goodCounts[item[field]]++;
                    }
                }
            });
            categories.forEach(cat => {
                values[cat] = totalCounts[cat] > 0 ? ((goodCounts[cat] / totalCounts[cat]) * 100).toFixed(1) : 0;
            });
        }
        
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
                data: categories.map(cat => values[cat]),
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

    renderModal() {
        const filteredData = this.filterData();
        const totalPages = Math.ceil(filteredData.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = filteredData.slice(start, end);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">办件列表</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                ${this.renderStats(this.generateStats(this.modalData))}
                ${this.renderCharts()}
                <div class="indicator-modal-filter">
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">状态：</span>
                        <select class="indicator-filter-select" id="modal-status-filter">
                            <option value="all">全部</option>
                            <option value="已受理" ${this.currentStatus === '已受理' ? 'selected' : ''}>已受理</option>
                            <option value="已办结" ${this.currentStatus === '已办结' ? 'selected' : ''}>已办结</option>
                        </select>
                    </div>
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">办件类型：</span>
                        <select class="indicator-filter-select" id="modal-type-filter">
                            <option value="all">全部</option>
                            <option value="承诺件" ${this.currentType === '承诺件' ? 'selected' : ''}>承诺件</option>
                            <option value="即办件" ${this.currentType === '即办件' ? 'selected' : ''}>即办件</option>
                            <option value="并联审批" ${this.currentType === '并联审批' ? 'selected' : ''}>并联审批</option>
                            <option value="容缺受理" ${this.currentType === '容缺受理' ? 'selected' : ''}>容缺受理</option>
                        </select>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>办件编码</th>
                                <th>对象名称</th>
                                <th>对象编码</th>
                                <th>办件类型</th>
                                <th>事项名称</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.code}</td>
                                    <td>${item.objName}</td>
                                    <td>${item.objCode}</td>
                                    <td>${item.type}</td>
                                    <td>${item.itemName}</td>
                                    <td class="status-${item.status === '已受理' ? 'pending' : 'completed'}">${item.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    filterData() {
        return this.modalData.filter(item => {
            if (this.currentStatus !== 'all' && item.status !== this.currentStatus) {
                return false;
            }
            if (this.currentType !== 'all' && item.type !== this.currentType) {
                return false;
            }
            return true;
        });
    }

    bindModalEvents(overlay) {
        overlay.querySelector('#modal-status-filter').addEventListener('change', (e) => {
            this.currentStatus = e.target.value;
            this.currentPage = 1;
            this.updateModal();
        });

        overlay.querySelector('#modal-type-filter').addEventListener('change', (e) => {
            this.currentType = e.target.value;
            this.currentPage = 1;
            this.updateModal();
        });

        overlay.querySelector('#modal-prev').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateModal();
            }
        });

        overlay.querySelector('#modal-next').addEventListener('click', () => {
            const filteredData = this.filterData();
            const totalPages = Math.ceil(filteredData.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateModal();
            }
        });
    }

    updateModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) {
            overlay.innerHTML = this.renderModal();
            this.bindModalEvents(overlay);
            this.initModalChartsDelayed();
        }
    }

    renderItemModal() {
        const filteredData = this.filterItemData();
        const totalPages = Math.ceil(filteredData.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = filteredData.slice(start, end);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">事项列表</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                ${this.renderStats(this.generateStats(this.modalData))}
                ${this.renderCharts()}
                <div class="indicator-modal-filter">
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">事项类型：</span>
                        <select class="indicator-filter-select" id="item-modal-type-filter">
                            <option value="all">全部</option>
                            <option value="行政许可" ${this.itemTypeFilter === '行政许可' ? 'selected' : ''}>行政许可</option>
                            <option value="行政确认" ${this.itemTypeFilter === '行政确认' ? 'selected' : ''}>行政确认</option>
                            <option value="行政裁决" ${this.itemTypeFilter === '行政裁决' ? 'selected' : ''}>行政裁决</option>
                            <option value="行政奖励" ${this.itemTypeFilter === '行政奖励' ? 'selected' : ''}>行政奖励</option>
                            <option value="公共服务" ${this.itemTypeFilter === '公共服务' ? 'selected' : ''}>公共服务</option>
                        </select>
                    </div>
                    <div class="indicator-filter-item">
                        <span class="indicator-filter-label">所属部门：</span>
                        <select class="indicator-filter-select" id="item-modal-dept-filter">
                            <option value="all">全部</option>
                            <option value="省发改委" ${this.itemDeptFilter === '省发改委' ? 'selected' : ''}>省发改委</option>
                            <option value="省财政厅" ${this.itemDeptFilter === '省财政厅' ? 'selected' : ''}>省财政厅</option>
                            <option value="省人社厅" ${this.itemDeptFilter === '省人社厅' ? 'selected' : ''}>省人社厅</option>
                            <option value="省自然资源厅" ${this.itemDeptFilter === '省自然资源厅' ? 'selected' : ''}>省自然资源厅</option>
                            <option value="省住建厅" ${this.itemDeptFilter === '省住建厅' ? 'selected' : ''}>省住建厅</option>
                            <option value="省卫健委" ${this.itemDeptFilter === '省卫健委' ? 'selected' : ''}>省卫健委</option>
                        </select>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                <th>事项编码</th>
                                <th>事项名称</th>
                                <th>事项类型</th>
                                <th>所属部门</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    <td>${item.code}</td>
                                    <td>${item.name}</td>
                                    <td>${item.type}</td>
                                    <td>${item.department}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="item-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="item-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    filterItemData() {
        return this.modalData.filter(item => {
            if (this.itemTypeFilter !== 'all' && item.type !== this.itemTypeFilter) {
                return false;
            }
            if (this.itemDeptFilter !== 'all' && item.department !== this.itemDeptFilter) {
                return false;
            }
            return true;
        });
    }

    bindItemModalEvents(overlay) {
        overlay.querySelector('#item-modal-type-filter').addEventListener('change', (e) => {
            this.itemTypeFilter = e.target.value;
            this.currentPage = 1;
            this.updateItemModal();
        });

        overlay.querySelector('#item-modal-dept-filter').addEventListener('change', (e) => {
            this.itemDeptFilter = e.target.value;
            this.currentPage = 1;
            this.updateItemModal();
        });

        overlay.querySelector('#item-modal-prev').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateItemModal();
            }
        });

        overlay.querySelector('#item-modal-next').addEventListener('click', () => {
            const filteredData = this.filterItemData();
            const totalPages = Math.ceil(filteredData.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateItemModal();
            }
        });
    }

    updateItemModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) {
            overlay.innerHTML = this.renderItemModal();
            this.bindItemModalEvents(overlay);
            this.initModalChartsDelayed();
        }
    }

    renderGenericModal(title, columns, dataIndexes) {
        const filteredData = this.filterGenericData();
        const totalPages = Math.ceil(filteredData.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = filteredData.slice(start, end);
        
        const hasTypeFilter = dataIndexes.includes('type');
        const hasLicenseFilter = dataIndexes.includes('licenseName');
        
        let filterHtml = '';
        if (hasTypeFilter) {
            filterHtml = `
                <div class="indicator-filter-item">
                    <span class="indicator-filter-label">办件类型：</span>
                    <select class="indicator-filter-select" id="generic-type-filter">
                        <option value="all">全部</option>
                        <option value="承诺件" ${this.currentType === '承诺件' ? 'selected' : ''}>承诺件</option>
                        <option value="即办件" ${this.currentType === '即办件' ? 'selected' : ''}>即办件</option>
                        <option value="并联审批" ${this.currentType === '并联审批' ? 'selected' : ''}>并联审批</option>
                        <option value="容缺受理" ${this.currentType === '容缺受理' ? 'selected' : ''}>容缺受理</option>
                    </select>
                </div>
            `;
        } else if (hasLicenseFilter) {
            const licenseNames = title.includes('法人') 
                ? ['全部', '营业执照', '组织机构代码证', '税务登记证', '社会保险登记证', '统计登记证', '开户许可证']
                : ['全部', '居民身份证', '驾驶证', '行驶证', '护照', '社保卡', '居住证'];
            filterHtml = `
                <div class="indicator-filter-item">
                    <span class="indicator-filter-label">证照名称：</span>
                    <select class="indicator-filter-select" id="generic-license-filter">
                        ${licenseNames.map(name => `<option value="${name === '全部' ? 'all' : name}" ${this.currentLicenseFilter === (name === '全部' ? 'all' : name) ? 'selected' : ''}>${name}</option>`).join('')}
                    </select>
                </div>
            `;
        }

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">${title}</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                ${this.renderStats(this.generateStats(this.modalData))}
                ${this.renderCharts()}
                ${filterHtml ? `<div class="indicator-modal-filter">${filterHtml}</div>` : ''}
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead>
                            <tr>
                                ${columns.map(col => `<th>${col}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.map(item => `
                                <tr>
                                    ${dataIndexes.map(key => {
                                        const value = item[key];
                                        const isEvaluation = key === 'evaluation';
                                        let cellClass = '';
                                        if (isEvaluation) {
                                            if (value === '非常满意' || value === '满意') {
                                                cellClass = 'status-completed';
                                            } else if (value === '不满意' || value === '非常不满意') {
                                                cellClass = 'status-pending';
                                            }
                                        }
                                        return `<td${cellClass ? ' class="' + cellClass + '"' : ''}>${value}</td>`;
                                    }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    filterGenericData() {
        return this.modalData.filter(item => {
            if (this.currentType !== 'all' && item.type !== undefined && item.type !== this.currentType) {
                return false;
            }
            if (this.currentLicenseFilter !== 'all' && this.currentLicenseFilter !== undefined && item.licenseName !== this.currentLicenseFilter) {
                return false;
            }
            return true;
        });
    }

    bindGenericModalEvents(overlay) {
        const typeFilter = overlay.querySelector('#generic-type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentType = e.target.value;
                this.currentPage = 1;
                this.updateGenericModal();
            });
        }

        const licenseFilter = overlay.querySelector('#generic-license-filter');
        if (licenseFilter) {
            licenseFilter.addEventListener('change', (e) => {
                this.currentLicenseFilter = e.target.value;
                this.currentPage = 1;
                this.updateGenericModal();
            });
        }

        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateGenericModal();
            }
        });

        overlay.querySelector('#generic-modal-next').addEventListener('click', () => {
            const filteredData = this.filterGenericData();
            const totalPages = Math.ceil(filteredData.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateGenericModal();
            }
        });
    }

    updateGenericModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay && this.currentModalType !== 'item_total' && 
!['accept_count', 'finish_count'].includes(this.currentModalType)
) {
            overlay.innerHTML = this.renderGenericModal(this.currentModalTitle, this.currentModalColumns, this.currentModalDataIndexes);
            this.bindGenericModalEvents(overlay);
            this.initModalChartsDelayed();
        }
    }

    initCharts() {
        const checkECharts = () => {
            if (typeof echarts === 'undefined') {
                console.log('Waiting for ECharts to load...');
                setTimeout(checkECharts, 100);
                return;
            }

            const pieEl = document.getElementById('pie-chart');
            const itemModeEl = document.getElementById('item-pie-mode');
            const itemFieldEl = document.getElementById('item-pie-field');
            const caseTypeEl = document.getElementById('case-pie-type');
            const caseModeEl = document.getElementById('case-pie-mode');
            const caseFieldEl = document.getElementById('case-pie-field');
            const legalBarEl = document.getElementById('legal-bar-chart');
            const personBarEl = document.getElementById('person-bar-chart');
            const effectTimeEl = document.getElementById('effect-time-bar');
            const effectMaterialEl = document.getElementById('effect-material-bar');
            const effectRunEl = document.getElementById('effect-run-bar');
            const effectSatisfyEl = document.getElementById('effect-satisfy-bar');

            if (pieEl) {
                pieEl.style.height = '210px';
                this.charts.pie = echarts.init(pieEl);
                this.initPieChart();
            }
            if (itemModeEl) {
                itemModeEl.style.height = '210px';
                this.charts.itemModePie = echarts.init(itemModeEl);
                this.initItemModePieChart();
            }
            if (itemFieldEl) {
                itemFieldEl.style.height = '210px';
                this.charts.itemFieldPie = echarts.init(itemFieldEl);
                this.initItemFieldPieChart();
            }
            if (caseTypeEl) {
                caseTypeEl.style.height = '200px';
                this.charts.caseTypePie = echarts.init(caseTypeEl);
                this.initCaseTypePieChart();
            }
            if (caseModeEl) {
                caseModeEl.style.height = '200px';
                this.charts.caseModePie = echarts.init(caseModeEl);
                this.initCaseModePieChart();
            }
            if (caseFieldEl) {
                caseFieldEl.style.height = '200px';
                this.charts.caseFieldPie = echarts.init(caseFieldEl);
                this.initCaseFieldPieChart();
            }

            this.bindApprovalTabs();
            this.bindEffectTabs();
            this.bindHotTopicTabs();
            this.renderDeptTop10();

            if (legalBarEl) {
                legalBarEl.style.height = '366px';
                this.charts.legalBar = echarts.init(legalBarEl);
                this.initLegalBarChart();
            }

            if (personBarEl) {
                personBarEl.style.height = '366px';
                this.charts.personBar = echarts.init(personBarEl);
                this.initPersonBarChart();
            }

            if (effectTimeEl) {
                effectTimeEl.style.height = '110px';
                this.charts.effectTime = echarts.init(effectTimeEl);
                this.initEffectTimeBar('type');
            }
            if (effectMaterialEl) {
                effectMaterialEl.style.height = '110px';
                this.charts.effectMaterial = echarts.init(effectMaterialEl);
                this.initEffectMaterialBar('type');
            }
            if (effectRunEl) {
                effectRunEl.style.height = '110px';
                this.charts.effectRun = echarts.init(effectRunEl);
                this.initEffectRunBar('type');
            }
            if (effectSatisfyEl) {
                effectSatisfyEl.style.height = '110px';
                this.charts.effectSatisfy = echarts.init(effectSatisfyEl);
                this.initEffectSatisfyBar('type');
            }

            const legalLicensePieEl = document.getElementById('legal-license-pie');
            const personLicensePieEl = document.getElementById('person-license-pie');
            const pushDataPieEl = document.getElementById('push-data-pie');
            const receiveDataPieEl = document.getElementById('receive-data-pie');

            if (legalLicensePieEl) {
                legalLicensePieEl.style.height = '90px';
                this.charts.legalLicensePie = echarts.init(legalLicensePieEl);
                this.initLegalLicensePieChart();
            }
            if (personLicensePieEl) {
                personLicensePieEl.style.height = '90px';
                this.charts.personLicensePie = echarts.init(personLicensePieEl);
                this.initPersonLicensePieChart();
            }
            if (pushDataPieEl) {
                pushDataPieEl.style.height = '80px';
                this.charts.pushDataPie = echarts.init(pushDataPieEl);
                this.initPushDataPieChart();
            }
            if (receiveDataPieEl) {
                receiveDataPieEl.style.height = '80px';
                this.charts.receiveDataPie = echarts.init(receiveDataPieEl);
                this.initReceiveDataPieChart();
            }

            window.addEventListener('resize', () => {
                Object.values(this.charts).forEach(chart => {
                    try { chart.resize(); } catch(e) {}
                });
            });
        };

        checkECharts();
    }

    bindApprovalTabs() {
        const itemTabs = document.querySelectorAll('#item-tabs .chart-tab');
        const caseTabs = document.querySelectorAll('#case-tabs .chart-tab');
        const pieType = document.getElementById('pie-chart');
        const pieMode = document.getElementById('item-pie-mode');
        const pieField = document.getElementById('item-pie-field');
        const caseType = document.getElementById('case-pie-type');
        const caseMode = document.getElementById('case-pie-mode');
        const caseField = document.getElementById('case-pie-field');
        const showHide = (showEls, hideEls) => {
            showEls.forEach(el => el && el.classList.remove('chart-hidden'));
            hideEls.forEach(el => el && el.classList.add('chart-hidden'));
        };
        itemTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                itemTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const t = tab.getAttribute('data-item-tab');
                if (t === 'type') {
                    showHide([pieType], [pieMode, pieField]);
                    try { this.charts.pie && this.charts.pie.resize(); } catch(e){}
                } else if (t === 'mode') {
                    showHide([pieMode], [pieType, pieField]);
                    try { this.charts.itemModePie && this.charts.itemModePie.resize(); } catch(e){}
                } else {
                    showHide([pieField], [pieType, pieMode]);
                    try { this.charts.itemFieldPie && this.charts.itemFieldPie.resize(); } catch(e){}
                }
            });
        });
        caseTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                caseTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const t = tab.getAttribute('data-case-tab');
                if (t === 'type') {
                    showHide([caseType], [caseMode, caseField]);
                    try { this.charts.caseTypePie && this.charts.caseTypePie.resize(); } catch(e){}
                } else if (t === 'mode') {
                    showHide([caseMode], [caseType, caseField]);
                    try { this.charts.caseModePie && this.charts.caseModePie.resize(); } catch(e){}
                } else {
                    showHide([caseField], [caseType, caseMode]);
                    try { this.charts.caseFieldPie && this.charts.caseFieldPie.resize(); } catch(e){}
                }
            });
        });
    }

    bindEffectTabs() {
        const tabs = document.querySelectorAll('#effect-tabs .chart-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const mode = tab.getAttribute('data-effect-tab');
                try {
                    this.initEffectTimeBar(mode);
                    this.initEffectMaterialBar(mode);
                    this.initEffectRunBar(mode);
                    this.initEffectSatisfyBar(mode);
                } catch(e) {}
            });
        });
    }

    bindHotTopicTabs() {
        const tabs = document.querySelectorAll('#hot-topic-tabs .chart-tab');
        const legalChart = document.getElementById('legal-bar-chart');
        const personChart = document.getElementById('person-bar-chart');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const t = tab.getAttribute('data-topic-tab');
                if (t === 'legal') {
                    legalChart.classList.remove('chart-hidden');
                    personChart.classList.add('chart-hidden');
                    try { this.charts.legalBar && this.charts.legalBar.resize(); } catch(e){}
                } else {
                    personChart.classList.remove('chart-hidden');
                    legalChart.classList.add('chart-hidden');
                    try { this.charts.personBar && this.charts.personBar.resize(); } catch(e){}
                }
            });
        });
    }

    renderDeptTop10() {
        const container = document.getElementById('dept-top10-list');
        if (!container) return;
        const deptData = [
            { rank: 1, name: '海南省市场监管局', count: 2356, rate: '+12%' },
            { rank: 2, name: '海南省住建厅', count: 1890, rate: '+8%' },
            { rank: 3, name: '海南省卫健委', count: 1654, rate: '+5%' },
            { rank: 4, name: '海南省交通厅', count: 1432, rate: '+15%' },
            { rank: 5, name: '海南省自然资源厅', count: 1289, rate: '-3%' },
            { rank: 6, name: '海南省生态环境厅', count: 1156, rate: '+6%' },
            { rank: 7, name: '海南省农业农村厅', count: 1089, rate: '+9%' },
            { rank: 8, name: '海南省应急管理厅', count: 967, rate: '+11%' },
            { rank: 9, name: '海南省人社厅', count: 876, rate: '+4%' },
            { rank: 10, name: '海南省税务局', count: 756, rate: '+7%' }
        ];
        container.innerHTML = deptData.map(item => `
            <div class="dept-top10-item">
                <span class="dept-top10-rank ${item.rank <= 3 ? 'top-rank-' + item.rank : ''}">${item.rank}</span>
                <span class="dept-top10-name">${item.name}</span>
                <span class="dept-top10-count">${item.count.toLocaleString()}</span>
                <span class="dept-top10-rate" style="color: ${item.rate.startsWith('+') ? '#34c759' : '#ff3b30'}">${item.rate}</span>
            </div>
        `).join('');
    }

    initPieChart() {
        if (!this.charts.pie) return;
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                orient: 'vertical',
                right: '3%',
                top: 'center',
                itemGap: 8,
                textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
                itemWidth: 10, itemHeight: 10
            },
            series: [{
                name: '办件数',
                type: 'pie',
                radius: ['32%', '60%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#050d18',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'outside',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 600,
                    formatter: (p) => `${p.value}\n${p.percent}%`,
                    alignTo: 'labelLine',
                    edgeDistance: 3
                },
                labelLine: { show: true, length: 6, length2: 9, smooth: false },
                data: [
                    { value: 356, name: '行政许可', itemStyle: { color: '#00d4ff' } },
                    { value: 198, name: '行政确认', itemStyle: { color: '#ff9500' } },
                    { value: 56, name: '行政裁决', itemStyle: { color: '#34c759' } },
                    { value: 45, name: '行政奖励', itemStyle: { color: '#af52de' } },
                    { value: 32, name: '行政给付', itemStyle: { color: '#ff3b30' } },
                    { value: 289, name: '公共服务', itemStyle: { color: '#00ff88' } },
                    { value: 23, name: '其他行政权力', itemStyle: { color: '#8e8e93' } }
                ]
            }]
        };
        this.charts.pie.setOption(option);
    }

    initLegalLicensePieChart() {
        if (!this.charts.legalLicensePie) return;
        this.charts.legalLicensePie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: { show: true, color: '#fff', fontSize: 10, formatter: '{b}\n{c}%' },
                labelLine: { show: true, length: 4, length2: 3 },
                data: [
                    { value: 65, name: '证', itemStyle: { color: '#00d4ff' } },
                    { value: 35, name: '照', itemStyle: { color: '#ff9500' } }
                ]
            }]
        });
    }

    initPersonLicensePieChart() {
        if (!this.charts.personLicensePie) return;
        this.charts.personLicensePie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: { show: true, color: '#fff', fontSize: 10, formatter: '{b}\n{c}%' },
                labelLine: { show: true, length: 4, length2: 3 },
                data: [
                    { value: 70, name: '证', itemStyle: { color: '#34c759' } },
                    { value: 30, name: '照', itemStyle: { color: '#af52de' } }
                ]
            }]
        });
    }

    initPushDataPieChart() {
        if (!this.charts.pushDataPie) return;
        this.charts.pushDataPie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderRadius: 3, borderColor: '#050d18', borderWidth: 2 },
                label: { show: true, position: 'inside', color: '#fff', fontSize: 8, formatter: '{b}\n{c}%' },
                labelLine: { show: false },
                data: [
                    { value: 60, name: '一般类', itemStyle: { color: '#00d4ff' } },
                    { value: 40, name: '承诺类', itemStyle: { color: '#34c759' } }
                ]
            }]
        });
    }

    initReceiveDataPieChart() {
        if (!this.charts.receiveDataPie) return;
        this.charts.receiveDataPie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderRadius: 3, borderColor: '#050d18', borderWidth: 2 },
                label: { show: true, position: 'inside', color: '#fff', fontSize: 8, formatter: '{b}\n{c}%' },
                labelLine: { show: false },
                data: [
                    { value: 45, name: '检查结果', itemStyle: { color: '#00d4ff' } },
                    { value: 35, name: '处罚结果', itemStyle: { color: '#ff9500' } },
                    { value: 20, name: '信用数据', itemStyle: { color: '#34c759' } }
                ]
            }]
        });
    }

    initItemModePieChart() {
        if (!this.charts.itemModePie) return;
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                orient: 'vertical',
                right: '3%',
                top: 'center',
                itemGap: 8,
                textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
                itemWidth: 10, itemHeight: 10
            },
            series: [{
                type: 'pie',
                radius: ['32%', '60%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: {
                    show: true, position: 'outside',
                    color: '#fff', fontSize: 10, fontWeight: 600,
                    formatter: (p) => `${p.value}\n${p.percent}%`,
                    alignTo: 'labelLine',
                    edgeDistance: 3
                },
                labelLine: { show: true, length: 6, length2: 9, smooth: false },
                data: [
                    { value: 3500, name: '高效办成一件事', itemStyle: { color: '#ff9500' } },
                    { value: 2800, name: '极简审批', itemStyle: { color: '#ff6b30' } },
                    { value: 1800, name: '智能快办', itemStyle: { color: '#ff8c00' } },
                    { value: 1200, name: '免申即享', itemStyle: { color: '#ffaa00' } },
                    { value: 400, name: '全省通办', itemStyle: { color: '#ffbb50' } },
                    { value: 156, name: '其他', itemStyle: { color: '#8b8b8b' } }
                ]
            }]
        };
        this.charts.itemModePie.setOption(option);
    }

    initCaseTypePieChart() {
        if (!this.charts.caseTypePie) return;
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                orient: 'vertical',
                right: '3%',
                top: 'center',
                itemGap: 8,
                textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
                itemWidth: 10, itemHeight: 10
            },
            series: [{
                type: 'pie',
                radius: ['32%', '60%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: {
                    show: true, position: 'outside',
                    color: '#fff', fontSize: 10, fontWeight: 600,
                    formatter: (p) => `${p.value}\n${p.percent}%`,
                    alignTo: 'labelLine',
                    edgeDistance: 3
                },
                labelLine: { show: true, length: 6, length2: 9, smooth: false },
                data: [
                    { value: 2856, name: '行政许可',     itemStyle: { color: '#00d4ff' } },
                    { value: 1456, name: '行政确认',     itemStyle: { color: '#ff9500' } },
                    { value: 280,  name: '行政裁决',     itemStyle: { color: '#34c759' } },
                    { value: 220,  name: '行政奖励',     itemStyle: { color: '#af52de' } },
                    { value: 823,  name: '行政给付',     itemStyle: { color: '#ff3b30' } },
                    { value: 1923, name: '公共服务',     itemStyle: { color: '#00ff88' } },
                    { value: 60,   name: '其他行政权力', itemStyle: { color: '#8e8e93' } }
                ]
            }]
        };
        this.charts.caseTypePie.setOption(option);
    }

    initCaseModePieChart() {
        if (!this.charts.caseModePie) return;
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                orient: 'vertical',
                right: '3%',
                top: 'center',
                itemGap: 8,
                textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
                itemWidth: 10, itemHeight: 10
            },
            series: [{
                type: 'pie',
                radius: ['32%', '60%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: {
                    show: true, position: 'outside',
                    color: '#fff', fontSize: 10, fontWeight: 600,
                    formatter: (p) => `${p.value}\n${p.percent}%`,
                    alignTo: 'labelLine',
                    edgeDistance: 3
                },
                labelLine: { show: true, length: 6, length2: 9, smooth: false },
                data: [
                    { value: 3200, name: '高效办成一件事', itemStyle: { color: '#ff9500' } },
                    { value: 2500, name: '极简审批',     itemStyle: { color: '#ff6b30' } },
                    { value: 1600, name: '智能快办',     itemStyle: { color: '#ff8c00' } },
                    { value: 1100, name: '免申即享',     itemStyle: { color: '#ffaa00' } },
                    { value: 300,  name: '全省通办',     itemStyle: { color: '#ffbb50' } },
                    { value: 56,   name: '其他',         itemStyle: { color: '#8b8b8b' } }
                ]
            }]
        };
        this.charts.caseModePie.setOption(option);
    }

    initItemFieldPieChart() {
        if (!this.charts.itemFieldPie) return;
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                orient: 'vertical',
                right: '2%',
                top: 'center',
                itemGap: 7,
                textStyle: { color: 'rgba(255,255,255,0.82)', fontSize: 11 },
                itemWidth: 10, itemHeight: 10
            },
            series: [{
                name: '事项数',
                type: 'pie',
                radius: ['32%', '60%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: {
                    show: true, position: 'outside',
                    color: '#fff', fontSize: 10, fontWeight: 600,
                    formatter: (p) => `${p.value}\n${p.percent}%`,
                    alignTo: 'labelLine',
                    edgeDistance: 3
                },
                labelLine: { show: true, length: 6, length2: 9, smooth: false },
                data: [
                    { value: 245, name: '工程建设项目', itemStyle: { color: '#00d4ff' } },
                    { value: 210, name: '市场准入',     itemStyle: { color: '#ff9500' } },
                    { value: 185, name: '社会事务',     itemStyle: { color: '#34c759' } },
                    { value: 110, name: '农业农村',     itemStyle: { color: '#5ac8fa' } },
                    { value: 90,  name: '交通物流',     itemStyle: { color: '#ff6b6b' } },
                    { value: 75,  name: '自然资源',     itemStyle: { color: '#af52de' } },
                    { value: 54,  name: '文化旅游',     itemStyle: { color: '#ff2d92' } },
                    { value: 30,  name: '其他',         itemStyle: { color: '#8e8e93' } }
                ]
            }]
        };
        this.charts.itemFieldPie.setOption(option);
    }

    initCaseFieldPieChart() {
        if (!this.charts.caseFieldPie) return;
        const option = {
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: {
                orient: 'vertical',
                right: '2%',
                top: 'center',
                itemGap: 7,
                textStyle: { color: 'rgba(255,255,255,0.82)', fontSize: 11 },
                itemWidth: 10, itemHeight: 10
            },
            series: [{
                name: '办件数',
                type: 'pie',
                radius: ['32%', '60%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: { borderRadius: 4, borderColor: '#050d18', borderWidth: 2 },
                label: {
                    show: true, position: 'outside',
                    color: '#fff', fontSize: 10, fontWeight: 600,
                    formatter: (p) => `${p.value}\n${p.percent}%`,
                    alignTo: 'labelLine',
                    edgeDistance: 3
                },
                labelLine: { show: true, length: 6, length2: 9, smooth: false },
                data: [
                    { value: 2550, name: '工程建设项目', itemStyle: { color: '#00d4ff' } },
                    { value: 2200, name: '市场准入',     itemStyle: { color: '#ff9500' } },
                    { value: 1980, name: '社会事务',     itemStyle: { color: '#34c759' } },
                    { value: 1080, name: '农业农村',     itemStyle: { color: '#5ac8fa' } },
                    { value: 850,  name: '交通物流',     itemStyle: { color: '#ff6b6b' } },
                    { value: 660,  name: '自然资源',     itemStyle: { color: '#af52de' } },
                    { value: 396,  name: '文化旅游',     itemStyle: { color: '#ff2d92' } },
                    { value: 140,  name: '其他',         itemStyle: { color: '#8e8e93' } }
                ]
            }]
        };
        this.charts.caseFieldPie.setOption(option);
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

    getEffectAxisData(mode) {
        if (mode === 'mode') {
            return ['高效办成一件事', '极简审批', '智能快办', '免申即享', '全省通办', '信用等级审批', '其他'];
        }
        if (mode === 'field') {
            return ['工程建设项目', '市场准入', '社会事务', '农业农村', '交通物流', '自然资源', '文化旅游', '其他'];
        }
        return ['行政许可', '行政确认', '行政裁决', '行政奖励', '行政给付', '公共服务', '其他行政权力'];
    }

    initEffectTimeBar(mode = 'type') {
        if (!this.charts.effectTime) return;
        const data = mode === 'mode'
            ? [0.8, 1.0, 0.6, 0.3, 1.2, 0.5, 1.8]
            : mode === 'field'
            ? [2.3, 1.1, 1.2, 0.9, 1.5, 1.8, 1.0, 1.6]
            : [1.5, 0.9, 1.8, 0.7, 1.3, 0.8, 2.1];
        const option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: (p) => `${p[0].axisValue}<br/>平均办理时限：${p[0].value}天` },
            grid: { left: '14%', right: '3%', top: '6%', bottom: '35%', containLabel: false },
            xAxis: {
                type: 'category',
                data: this.getEffectAxisData(mode),
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.25)' } },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 10,
                    interval: 0,
                    rotate: mode === 'type' ? 20 : mode === 'field' ? 25 : 15,
                    margin: 12
                }
            },
            yAxis: {
                type: 'value',
                name: '天',
                nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 9, padding: [0, 2, 0, -8] },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                axisTick: { show: false },
                axisLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 9 },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
            },
            series: [{
                type: 'bar',
                data,
                barMaxWidth: 8,
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00e0ff' },
                        { offset: 1, color: '#0066aa' }
                    ])
                },
                label: {
                    show: true, position: 'top',
                    color: '#fff', fontSize: 9,
                    formatter: '{c}'
                }
            }]
        };
        this.charts.effectTime.setOption(option, true);
    }

    initEffectMaterialBar(mode = 'type') {
        if (!this.charts.effectMaterial) return;
        const data = mode === 'mode'
            ? [1.1, 1.4, 0.8, 0.4, 1.8, 0.6, 2.6]
            : mode === 'field'
            ? [2.8, 1.2, 1.4, 1.0, 1.6, 2.0, 1.1, 1.7]
            : [1.8, 1.1, 2.0, 0.9, 1.5, 1.0, 2.8];
        const option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: (p) => `${p[0].axisValue}<br/>平均材料：${p[0].value}件` },
            grid: { left: '14%', right: '3%', top: '6%', bottom: '35%', containLabel: false },
            xAxis: {
                type: 'category',
                data: this.getEffectAxisData(mode),
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.25)' } },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 10,
                    interval: 0,
                    rotate: mode === 'type' ? 20 : mode === 'field' ? 25 : 15,
                    margin: 5
                }
            },
            yAxis: {
                type: 'value',
                name: '件',
                nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 9, padding: [0, 2, 0, -8] },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                axisTick: { show: false },
                axisLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 9 },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
            },
            series: [{
                type: 'bar',
                data,
                barMaxWidth: 8,
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ffb347' },
                        { offset: 1, color: '#c56200' }
                    ])
                },
                label: {
                    show: true, position: 'top',
                    color: '#fff', fontSize: 9,
                    formatter: '{c}'
                }
            }]
        };
        this.charts.effectMaterial.setOption(option, true);
    }

    initEffectRunBar(mode = 'type') {
        if (!this.charts.effectRun) return;
        const data = mode === 'mode'
            ? [0.05, 0.08, 0.02, 0.01, 0.12, 0.03, 0.30]
            : mode === 'field'
            ? [0.30, 0.10, 0.12, 0.09, 0.18, 0.22, 0.08, 0.16]
            : [0.12, 0.08, 0.18, 0.06, 0.10, 0.04, 0.28];
        const option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: (p) => `${p[0].axisValue}<br/>平均跑动：${p[0].value}次` },
            grid: { left: '14%', right: '3%', top: '6%', bottom: '35%', containLabel: false },
            xAxis: {
                type: 'category',
                data: this.getEffectAxisData(mode),
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.25)' } },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 10,
                    interval: 0,
                    rotate: mode === 'type' ? 20 : mode === 'field' ? 25 : 15,
                    margin: 12
                }
            },
            yAxis: {
                type: 'value',
                name: '次',
                nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 9, padding: [0, 2, 0, -8] },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                axisTick: { show: false },
                axisLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 9 },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
            },
            series: [{
                type: 'bar',
                data,
                barMaxWidth: 8,
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#34e58a' },
                        { offset: 1, color: '#0b7a3c' }
                    ])
                },
                label: {
                    show: true, position: 'top',
                    color: '#fff', fontSize: 9,
                    formatter: '{c}'
                }
            }]
        };
        this.charts.effectRun.setOption(option, true);
    }

    initEffectSatisfyBar(mode = 'type') {
        if (!this.charts.effectSatisfy) return;
        const data = mode === 'mode'
            ? [99.95, 99.88, 99.92, 99.98, 99.70, 99.96, 99.50]
            : mode === 'field'
            ? [99.60, 99.80, 99.78, 99.86, 99.72, 99.68, 99.84, 99.55]
            : [99.82, 99.88, 99.70, 99.92, 99.85, 99.95, 99.60];
        const option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: (p) => `${p[0].axisValue}<br/>好评率：${p[0].value}%` },
            grid: { left: '14%', right: '3%', top: '6%', bottom: '35%', containLabel: false },
            xAxis: {
                type: 'category',
                data: this.getEffectAxisData(mode),
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.25)' } },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 10,
                    interval: 0,
                    rotate: mode === 'type' ? 20 : mode === 'field' ? 25 : 15,
                    margin: 5
                }
            },
            yAxis: {
                type: 'value',
                name: '%',
                min: 99, max: 100,
                nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 9, padding: [0, 2, 0, -8] },
                axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
                axisTick: { show: false },
                axisLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 9 },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
            },
            series: [{
                type: 'bar',
                data,
                barMaxWidth: 8,
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ff6bd6' },
                        { offset: 1, color: '#a93795' }
                    ])
                },
                label: {
                    show: true, position: 'top',
                    color: '#fff', fontSize: 9,
                    formatter: '{c}%'
                }
            }]
        };
        this.charts.effectSatisfy.setOption(option, true);
    }

    openPushSupervisionModal() {
        const months = ['2025-06','2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05'];
        const trendData = [6850, 7420, 8060, 7580, 8560, 9120, 9780, 8350, 7980, 8760, 9580, 10230];
        const sourceData = [
            { value: 39780, name: '行政许可审批信息', itemStyle: { color: '#4a9eff' } },
            { value: 25500, name: '备案信息', itemStyle: { color: '#00c853' } },
            { value: 18360, name: '资质认定信息', itemStyle: { color: '#ffcc00' } },
            { value: 18360, name: '其他审批信息', itemStyle: { color: '#af52de' } }
        ];
        const types = ['行政许可', '备案', '资质认定', '其他'];
        const sendDepts = ['海南省审批服务局', '海口市审批服务局', '三亚市审批服务局', '儋州市审批服务局'];
        const recvDepts = ['海南省市场监管局', '海南省生态环境厅', '海南省交通厅', '海南省应急管理厅'];
        const statuses = ['已接收', '未接收', '处理中'];
        const rows = [];
        for (let i = 1; i <= 15; i++) {
            const id = `SP${String(i).padStart(6, '0')}`;
            const names = ['建筑工程施工许可', '食品经营许可', '医疗器械经营许可', '道路运输经营许可', '特种设备使用登记', '营业执照变更'];
            const enterprises = ['海南科技有限公司', '海南实业有限公司', '海南商贸有限公司', '海南物流有限公司', '海南旅游有限公司', '海南建筑有限公司'];
            const credit = `${Math.floor(Math.random()*9)+1}${String(Math.floor(Math.random()*1000000000000)).padStart(12, '0')}`;
            const date = `${2025+Math.floor(i/12)}-${String((i%12)+1).padStart(2,'0')}-${String(Math.floor(Math.random()*28)+1).padStart(2,'0')}`;
            rows.push([id, names[i%6], enterprises[i%6], credit, types[i%4], date, sendDepts[i%4], recvDepts[i%4], date, statuses[Math.floor(Math.random()*3)]]);
        }

        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';

        this._apCfg = {
            title: '审批推送监管数据量分析',
            kpiCols: 4,
            kpis: [
                { label: '累计推送审批监管数据', value: '10.2', suffix: '万条', highlight: 'total' },
                { label: '本月推送', value: '4,235', suffix: '条' },
                { label: '已接收', value: '9.9', suffix: '万条' },
                { label: '接收率', value: '97.1', suffix: '%' }
            ],
            chart1Title: '近12个月推送审批监管数据趋势',
            chart1Type: 'line',
            chart1Data: { x: months, y: trendData },
            chart2Title: '推送数据类型分布',
            chart2Type: 'pie',
            chart2Data: sourceData,
            tableTitle: '审批推送监管数据明细列表',
            table: {
                header: ['审批决定书文号', '审批事项名称', '当事人/企业名称', '统一社会信用代码', '推送数据类型', '审批决定日期', '推送部门', '接收监管部门', '推送时间', '接收状态'],
                rows: rows
            }
        };

        this._apPageSize = 5;
        this._apPage = 1;
        this._apTotal = rows.length;
        this._apPages = Math.max(1, Math.ceil(this._apTotal / this._apPageSize));

        const kpisHtml = this._apCfg.kpis.map(k => {
            const cls = k.highlight === 'total' ? 'value-total' : '';
            return `<div class="trend-kpi-card pano-kpi-card pano-kpi-col-4">
                <span class="trend-kpi-label">${k.label}</span>
                <span class="trend-kpi-value ${cls}">${k.value}${k.suffix || ''}</span>
            </div>`;
        }).join('');

        const renderTbody = () => {
            const start = (this._apPage - 1) * this._apPageSize;
            const rows = this._apCfg.table.rows.slice(start, start + this._apPageSize);
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
            const t = this._apTotal, cur = this._apPage, last = this._apPages;
            return `
            <div class="trend-pager-bar" style="margin-top:6px;">
                <span class="trend-pager-info">共 <b>${t}</b> 条 / 每页 <b>${this._apPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
                <div class="trend-pager-btns">
                    <button class="trend-pager-btn ${cur<=1?'disabled':''}"
                            onclick="window.approvalPage._switchApPushPage(-1)">上一页</button>
                    <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                    <button class="trend-pager-btn ${cur>=last?'disabled':''}"
                            onclick="window.approvalPage._switchApPushPage(1)">下一页</button>
                </div>
            </div>`;
        };

        overlay.innerHTML = `
        <div class="indicator-modal panorama-modal" style="width:85vw;max-width:1400px;">
            <div class="indicator-modal-header">
                <span class="indicator-modal-title">审批推送监管数据量分析</span>
                <button class="indicator-modal-close">×</button>
            </div>
            <div class="pano-kpi-wrap" style="grid-template-columns: repeat(4, 1fr);">
                ${kpisHtml}
            </div>
            <div class="trend-charts-row">
                <div class="trend-chart-box trend-chart-main">
                    <div class="trend-chart-title">近12个月推送审批监管数据趋势</div>
                    <div id="ap-push-chart-left" class="trend-chart-container"></div>
                </div>
                <div class="trend-chart-box trend-chart-pie">
                    <div class="trend-chart-title">推送数据类型分布</div>
                    <div id="ap-push-chart-right" class="trend-chart-container"></div>
                </div>
            </div>
            <div class="trend-table-wrap">
                <div class="trend-table-title">审批推送监管数据明细列表</div>
                <div class="trend-table-scroller">
                    <table class="trend-data-table">
                        <thead><tr>${this._apCfg.table.header.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                        <tbody id="ap-push-tbody">${renderTbody()}</tbody>
                    </table>
                </div>
                <div class="trend-pager-bar" id="ap-push-pager">${renderPager()}</div>
            </div>
        </div>`;

        document.body.appendChild(overlay);
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => this._closeApPushModal());
        overlay.addEventListener('click', e => { if (e.target === overlay) this._closeApPushModal(); });
        setTimeout(() => this._initApPushCharts(), 80);
    }

    _closeApPushModal() {
        const el = document.querySelector('.indicator-modal-overlay');
        if (el) el.remove();
    }

    _switchApPushPage(delta) {
        const next = this._apPage + delta;
        if (next < 1 || next > this._apPages) return;
        this._apPage = next;
        const b = document.getElementById('ap-push-tbody');
        if (b) {
            const start = (this._apPage - 1) * this._apPageSize;
            const rows = this._apCfg.table.rows.slice(start, start + this._apPageSize);
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
        const p = document.getElementById('ap-push-pager');
        if (p) {
            const t = this._apTotal, cur = this._apPage, last = this._apPages;
            p.innerHTML = `
            <div class="trend-pager-bar" style="margin-top:6px;">
                <span class="trend-pager-info">共 <b>${t}</b> 条 / 每页 <b>${this._apPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
                <div class="trend-pager-btns">
                    <button class="trend-pager-btn ${cur<=1?'disabled':''}"
                            onclick="window.approvalPage._switchApPushPage(-1)">上一页</button>
                    <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                    <button class="trend-pager-btn ${cur>=last?'disabled':''}"
                            onclick="window.approvalPage._switchApPushPage(1)">下一页</button>
                </div>
            </div>`;
        }
    }

    _initApPushCharts() {
        const cfg = this._apCfg;
        if (!cfg) return;
        const leftEl = document.getElementById('ap-push-chart-left');
        const rightEl = document.getElementById('ap-push-chart-right');
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

    // ============ 弹窗数据生成方法 ============

    // 弹窗一：办理时限与压缩幅度分析
    generateTime_limit_analysisData() {
        const types = ['企业开办', '建筑许可', '食品经营', '药品经营', '危险化学品', '医疗器械', '特种设备', '环境影响评价'];
        const depts = ['省发改委', '省住建厅', '省市场监管局', '省生态环境厅', '省应急厅', '省卫健委', '省交通运输厅', '省农业农村厅'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            dept: depts[Math.floor(Math.random() * depts.length)],
            originalDays: Math.floor(Math.random() * 30) + 5,
            currentDays: Math.floor(Math.random() * 5) + 1,
            ratio: (Math.random() * 0.3 + 0.7).toFixed(1),
            level: ['显著', '明显', '一般'][Math.floor(Math.random() * 3)]
        }));
    }

    renderTime_limit_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">办理时限与压缩幅度分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">平均办理时限</span><span class="indicator-stat-value">1.2天</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">压缩幅度</span><span class="indicator-stat-value">85.7%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">原法定时限</span><span class="indicator-stat-value">8.4天</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">节省总天数</span><span class="indicator-stat-value">12,856天</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1.2;"><span class="indicator-chart-title">改革前后办理时限对比</span><div id="modal-line-chart" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各事项压缩幅度情况</span><div id="modal-bar-chart" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>事项名称</th><th>所属部门</th><th>原法定时限（天）</th><th>现平均办理时限（天）</th><th>压缩幅度（%）</th><th>压缩成效等级</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.originalDays}</td><td>${d.currentDays}</td><td>${((1 - d.currentDays / d.originalDays) * 100).toFixed(1)}%</td><td><span class="rv-status ${d.level === '显著' ? 'positive' : ''}">${d.level}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initTime_limit_analysisCharts() {
        setTimeout(() => {
            const types = ['企业开办', '建筑许可', '食品经营', '药品经营', '危险化学品'];
            const lineData1 = types.map(() => Math.floor(Math.random() * 20) + 5);
            const lineData2 = types.map(() => Math.floor(Math.random() * 5) + 1);

            const lineChart = echarts.init(document.getElementById('modal-line-chart'));
            lineChart.setOption({
                tooltip: { trigger: 'axis' },
                legend: { data: ['改革前法定时限', '改革后平均办理时限'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
                xAxis: { type: 'category', data: types, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
                yAxis: { type: 'value', name: '天数', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [
                    { name: '改革前法定时限', type: 'line', data: lineData1, itemStyle: { color: '#ff3b30' }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 9 } },
                    { name: '改革后平均办理时限', type: 'line', data: lineData2, itemStyle: { color: '#34c759' }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 9 } }
                ]
            });

            const items = ['企业开办', '建筑许可', '食品经营', '药品经营', '医疗器械', '特种设备', '环境影响评价', '危险化学品'];
            const barData = items.map(() => (Math.random() * 30 + 60).toFixed(1));

            const barChart = echarts.init(document.getElementById('modal-bar-chart'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: items, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9, interval: 0, rotate: 30 } },
                yAxis: { type: 'value', name: '%', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 9 } }]
            });
        }, 200);
    }

    bindTime_limit_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateTime_limit_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateTime_limit_analysisModal(); } });
        this.initTime_limit_analysisCharts();
    }

    updateTime_limit_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderTime_limit_analysisModal(); this.bindTime_limit_analysisModalEvents(overlay); }
    }

    // 弹窗二：材料精简成效分析
    generateMaterial_analysisData() {
        const types = ['企业开办', '建筑许可', '食品经营', '药品经营', '危险化学品', '医疗器械', '特种设备', '环境影响评价'];
        const depts = ['省发改委', '省住建厅', '省市场监管局', '省生态环境厅', '省应急厅', '省卫健委', '省交通运输厅', '省农业农村厅'];
        const methods = ['共享复用', '告知承诺', '直接取消', '合并优化'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            dept: depts[Math.floor(Math.random() * depts.length)],
            originalCount: Math.floor(Math.random() * 8) + 3,
            currentCount: Math.floor(Math.random() * 3) + 1,
            ratio: (Math.random() * 0.3 + 0.5).toFixed(1),
            method: methods[Math.floor(Math.random() * methods.length)]
        }));
    }

    renderMaterial_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">材料精简成效分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">平均提交材料件数</span><span class="indicator-stat-value">1.3件</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">降幅</span><span class="indicator-stat-value">71.7%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">原平均材料件数</span><span class="indicator-stat-value">4.6件</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">累计减少材料</span><span class="indicator-stat-value">8,932件</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1.2;"><span class="indicator-chart-title">改革前后材料件数对比</span><div id="modal-bar-chart2" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">材料精简方式分布</span><div id="modal-pie-chart" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>事项名称</th><th>所属部门</th><th>原材料件数</th><th>现材料件数</th><th>精简幅度（%）</th><th>精简方式</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.originalCount}</td><td>${d.currentCount}</td><td>${((1 - d.currentCount / d.originalCount) * 100).toFixed(1)}%</td><td>${d.method}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initMaterial_analysisCharts() {
        setTimeout(() => {
            const types = ['企业开办', '建筑许可', '食品经营', '药品经营', '危险化学品'];
            const barData1 = types.map(() => Math.floor(Math.random() * 5) + 3);
            const barData2 = types.map(() => Math.floor(Math.random() * 3) + 1);

            const barChart = echarts.init(document.getElementById('modal-bar-chart2'));
            barChart.setOption({
                tooltip: { trigger: 'axis' },
                legend: { data: ['改革前', '改革后'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
                xAxis: { type: 'category', data: types, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
                yAxis: { type: 'value', name: '材料件数', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [
                    { name: '改革前', type: 'bar', data: barData1, itemStyle: { color: '#ff9500' }, barWidth: '30%' },
                    { name: '改革后', type: 'bar', data: barData2, itemStyle: { color: '#34c759' }, barWidth: '30%' }
                ]
            });

            const pieChart = echarts.init(document.getElementById('modal-pie-chart'));
            pieChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
                legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                series: [{
                    type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                    data: [
                        { value: 40, name: '共享复用', itemStyle: { color: '#00d4ff' } },
                        { value: 25, name: '告知承诺', itemStyle: { color: '#34c759' } },
                        { value: 20, name: '直接取消', itemStyle: { color: '#ff9500' } },
                        { value: 15, name: '合并优化', itemStyle: { color: '#af52de' } }
                    ],
                    label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' }
                }]
            });
        }, 200);
    }

    bindMaterial_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateMaterial_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateMaterial_analysisModal(); } });
        this.initMaterial_analysisCharts();
    }

    updateMaterial_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderMaterial_analysisModal(); this.bindMaterial_analysisModalEvents(overlay); }
    }

    // 弹窗三：跑动次数压减成效分析
    generateRun_count_analysisData() {
        const types = ['企业开办', '建筑许可', '食品经营', '药品经营', '危险化学品', '医疗器械', '特种设备', '环境影响评价'];
        const depts = ['省发改委', '省住建厅', '省市场监管局', '省生态环境厅', '省应急厅', '省卫健委', '省交通运输厅', '省农业农村厅'];
        const levels = ['零跑动', '一次跑动', '多次跑动'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            dept: depts[Math.floor(Math.random() * depts.length)],
            originalCount: Math.floor(Math.random() * 3) + 1,
            currentCount: Math.random() > 0.85 ? Math.floor(Math.random() * 2) + 1 : 0,
            ratio: (Math.random() * 0.3 + 0.7).toFixed(1),
            level: Math.random() > 0.85 ? levels[1] : levels[0]
        }));
    }

    renderRun_count_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">跑动次数压减成效分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">平均跑动次数</span><span class="indicator-stat-value">0.1次</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">降幅</span><span class="indicator-stat-value">95.0%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">原平均跑动次数</span><span class="indicator-stat-value">2.0次</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">零跑动事项占比</span><span class="indicator-stat-value">85%</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">跑动次数分布</span><div id="modal-donut-chart" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各层级零跑动占比对比</span><div id="modal-hbar-chart" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>事项名称</th><th>所属部门</th><th>原跑动次数</th><th>现跑动次数</th><th>压减幅度（%）</th><th>跑动等级</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.originalCount}</td><td>${d.currentCount}</td><td>${((1 - d.currentCount / d.originalCount) * 100).toFixed(1)}%</td><td><span class="rv-status ${d.level === '零跑动' ? 'positive' : ''}">${d.level}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initRun_count_analysisCharts() {
        setTimeout(() => {
            const donutChart = echarts.init(document.getElementById('modal-donut-chart'));
            donutChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
                series: [{
                    type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                    data: [
                        { value: 85, name: '无需跑动', itemStyle: { color: '#34c759' } },
                        { value: 12, name: '跑动1次', itemStyle: { color: '#00d4ff' } },
                        { value: 2, name: '跑动2次', itemStyle: { color: '#ff9500' } },
                        { value: 1, name: '跑动3次及以上', itemStyle: { color: '#ff3b30' } }
                    ],
                    label: { show: false },
                    labelLine: { show: false }
                }]
            });
            donutChart.setOption({ title: { text: '0.1次', subtext: '平均跑动', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#34c759' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

            const levels = ['省级', '市级', '县级', '街镇级'];
            const hbarData = levels.map(() => (Math.random() * 5 + 95).toFixed(1));

            const hbarChart = echarts.init(document.getElementById('modal-hbar-chart'));
            hbarChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '15%', right: '10%', bottom: '3%', top: '3%', containLabel: true },
                xAxis: { type: 'value', max: 100, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                yAxis: { type: 'category', data: levels, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                series: [{ type: 'bar', data: hbarData, barWidth: '50%', itemStyle: { color: '#34c759', borderRadius: [0, 4, 4, 0] }, label: { show: true, position: 'right', color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{c}%' } }]
            });
        }, 200);
    }

    bindRun_count_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateRun_count_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateRun_count_analysisModal(); } });
        this.initRun_count_analysisCharts();
    }

    updateRun_count_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderRun_count_analysisModal(); this.bindRun_count_analysisModalEvents(overlay); }
    }

    // 弹窗四：满意度评价分析
    generateSatisfaction_analysisData() {
        const depts = ['省发改委', '省住建厅', '省市场监管局', '省生态环境厅', '省应急厅', '省卫健委', '省交通运输厅', '省农业农村厅'];
        const reasons = ['服务态度差', '办事效率低', '流程繁琐', '材料要求不清晰', '等待时间长'];
        const statuses = ['已整改', '整改中', '待整改'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `PJ${String(i + 1).padStart(8, '0')}`,
            name: `评价事项${i + 1}`,
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            date: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.7 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    renderSatisfaction_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">满意度评价分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">好评率</span><span class="indicator-stat-value" style="color:#34c759;">99.9%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">评价总数</span><span class="indicator-stat-value">12,856条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">好评数</span><span class="indicator-stat-value">12,843条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">差评数</span><span class="indicator-stat-value" style="color:#ff3b30;">13条</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">区划好评率情况</span><div id="modal-bar-chart11" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">评价维度分布</span><div id="modal-pie-chart2" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>评价编号</th><th>评价事项</th><th>差评原因</th><th>评价日期</th><th>整改状态</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.name}</td><td>${d.reason}</td><td>${d.date}</td><td><span class="rv-status ${d.status === '已整改' ? 'positive' : d.status === '待整改' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initSatisfaction_analysisCharts() {
        setTimeout(() => {
            const barChart = echarts.init(document.getElementById('modal-bar-chart11'));
            const districts = ['海口市', '三亚市', '儋州市', '文昌市', '琼海市', '万宁市', '东方市', '五指山市'];
            const rates = [99.9, 99.8, 99.7, 99.6, 99.5, 99.4, 99.3, 99.2];
            const colors = rates.map(r => r >= 99.8 ? '#34c759' : r >= 99.5 ? '#00d4ff' : r >= 99.3 ? '#ff9500' : '#ff3b30');
            barChart.setOption({
                tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
                grid: { left: '3%', right: '4%', bottom: '15%', top: '8%', containLabel: true },
                xAxis: { type: 'category', data: districts, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9, rotate: 20 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }, axisTick: { show: false } },
                yAxis: { type: 'value', min: 99, max: 100, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, formatter: '{value}%' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
                series: [{ type: 'bar', data: rates.map((r, i) => ({ value: r, itemStyle: { color: colors[i], borderRadius: [4, 4, 0, 0] } })), barWidth: '50%', label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{c}%' } }]
            });

            const pieChart = echarts.init(document.getElementById('modal-pie-chart2'));
            pieChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
                legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                series: [{
                    type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                    data: [
                        { value: 30, name: '服务态度', itemStyle: { color: '#00d4ff' } },
                        { value: 28, name: '办事效率', itemStyle: { color: '#34c759' } },
                        { value: 22, name: '流程便捷', itemStyle: { color: '#ff9500' } },
                        { value: 15, name: '材料清晰', itemStyle: { color: '#af52de' } },
                        { value: 5, name: '其他', itemStyle: { color: '#5856d6' } }
                    ],
                    label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' }
                }]
            });
        }, 200);
    }

    bindSatisfaction_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateSatisfaction_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateSatisfaction_analysisModal(); } });
        this.initSatisfaction_analysisCharts();
    }

    updateSatisfaction_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderSatisfaction_analysisModal(); this.bindSatisfaction_analysisModalEvents(overlay); }
    }

    // 弹窗五：差评整改追踪
    generateBad_review_trackingData() {
        const depts = ['省发改委', '省住建厅', '省市场监管局', '省生态环境厅', '省应急厅', '省卫健委', '省交通运输厅', '省农业农村厅'];
        const reasons = ['服务态度差', '办事效率低', '流程繁琐', '材料要求不清晰'];
        const measures = ['流程优化', '服务改进', '系统修复', '人员培训'];
        const statuses = ['已完成', '进行中'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `ZG${String(i + 1).padStart(8, '0')}`,
            name: `差评事项${i + 1}`,
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            measure: measures[Math.floor(Math.random() * measures.length)],
            completeDate: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.floor(Math.random() * 2)]
        }));
    }

    renderBad_review_trackingModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">差评整改追踪</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">差评按期整改率</span><span class="indicator-stat-value" style="color:#34c759;">100%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">差评总数</span><span class="indicator-stat-value">13条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">已整改</span><span class="indicator-stat-value">13条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">平均整改时长</span><span class="indicator-stat-value">2.3天</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各部门差评整改时长排行</span><div id="modal-bar-chart3" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">差评整改类型分布</span><div id="modal-pie-chart3" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>评价编号</th><th>差评事项</th><th>差评原因</th><th>整改措施</th><th>整改完成日期</th><th>整改状态</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.name}</td><td>${d.reason}</td><td>${d.measure}</td><td>${d.completeDate}</td><td><span class="rv-status ${d.status === '已完成' ? 'positive' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initBad_review_trackingCharts() {
        setTimeout(() => {
            const depts = ['省发改委', '省住建厅', '省市场监管局', '省生态环境厅', '省应急厅', '省卫健委', '省交通运输厅', '省农业农村厅'];
            const barData = depts.map(() => (Math.random() * 3 + 1).toFixed(1));

            const barChart = echarts.init(document.getElementById('modal-bar-chart3'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: depts, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
                yAxis: { type: 'value', name: '天数', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 } }]
            });

            const pieChart = echarts.init(document.getElementById('modal-pie-chart3'));
            pieChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
                legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                series: [{
                    type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                    data: [
                        { value: 35, name: '流程优化', itemStyle: { color: '#00d4ff' } },
                        { value: 30, name: '服务改进', itemStyle: { color: '#34c759' } },
                        { value: 20, name: '系统修复', itemStyle: { color: '#ff9500' } },
                        { value: 15, name: '人员培训', itemStyle: { color: '#af52de' } }
                    ],
                    label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' }
                }]
            });
        }, 200);
    }

    bindBad_review_trackingModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateBad_review_trackingModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateBad_review_trackingModal(); } });
        this.initBad_review_trackingCharts();
    }

    updateBad_review_trackingModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderBad_review_trackingModal(); this.bindBad_review_trackingModalEvents(overlay); }
    }

    // 弹窗六~九：跑动占比分析
    generateRun_zero_analysisData() {
        const types = ['行政许可', '公共服务', '行政确认', '其他'];
        const levels = ['省级', '市级', '县级', '街镇级'];
        const methods = ['全流程网办', '邮寄办', '代办帮办'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            level: levels[Math.floor(Math.random() * levels.length)],
            type: types[Math.floor(Math.random() * types.length)],
            method: methods[Math.floor(Math.random() * methods.length)]
        }));
    }

    renderRun_zero_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">无需跑动占比分析（零跑动）</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">省级</span><span class="indicator-stat-value">80%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">市级</span><span class="indicator-stat-value">82%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">县级</span><span class="indicator-stat-value">80%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">街镇级</span><span class="indicator-stat-value">82%</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;justify-content:center;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各层级零跑动占比对比</span><div id="modal-bar-chart4" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>事项名称</th><th>所属层级</th><th>事项类型</th><th>零跑动实现方式</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.level}</td><td>${d.type}</td><td>${d.method}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initRun_zero_analysisCharts() {
        setTimeout(() => {
            const levels = ['省级', '市级', '县级', '街镇级'];
            const barData = levels.map(() => (Math.random() * 5 + 95).toFixed(1));

            const barChart = echarts.init(document.getElementById('modal-bar-chart4'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: levels, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                yAxis: { type: 'value', max: 100, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{c}%' } }]
            });
        }, 200);
    }

    bindRun_zero_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateRun_zero_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateRun_zero_analysisModal(); } });
        this.initRun_zero_analysisCharts();
    }

    updateRun_zero_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderRun_zero_analysisModal(); this.bindRun_zero_analysisModalEvents(overlay); }
    }

    // 弹窗七：跑动一次占比分析
    generateRun_once_analysisData() {
        const levels = ['省级', '市级', '县级', '街镇级'];
        const scenes = ['现场核验', '原件核验', '面签'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            level: levels[Math.floor(Math.random() * levels.length)],
            scene: scenes[Math.floor(Math.random() * scenes.length)],
            bookable: Math.random() > 0.3 ? '是' : '否'
        }));
    }

    renderRun_once_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">跑动一次占比分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">省级</span><span class="indicator-stat-value">9%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">市级</span><span class="indicator-stat-value">10%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">县级</span><span class="indicator-stat-value">9%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">街镇级</span><span class="indicator-stat-value">10%</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;justify-content:center;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各层级跑动一次占比对比</span><div id="modal-bar-chart5" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>事项名称</th><th>所属层级</th><th>跑动场景</th><th>是否可预约</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.level}</td><td>${d.scene}</td><td><span class="rv-status ${d.bookable === '是' ? 'positive' : ''}">${d.bookable}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initRun_once_analysisCharts() {
        setTimeout(() => {
            const levels = ['省级', '市级', '县级', '街镇级'];
            const barData = levels.map(() => (Math.random() * 5 + 93).toFixed(1));

            const barChart = echarts.init(document.getElementById('modal-bar-chart5'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: levels, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                yAxis: { type: 'value', max: 100, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{c}%' } }]
            });
        }, 200);
    }

    bindRun_once_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateRun_once_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateRun_once_analysisModal(); } });
        this.initRun_once_analysisCharts();
    }

    updateRun_once_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderRun_once_analysisModal(); this.bindRun_once_analysisModalEvents(overlay); }
    }

    // 弹窗八：跑动两次占比分析
    generateRun_twice_analysisData() {
        const levels = ['省级', '市级', '县级', '街镇级'];
        const reasons = ['材料不齐', '现场勘验', '专家评审'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            level: levels[Math.floor(Math.random() * levels.length)],
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            plan: `优化计划${i + 1}`
        }));
    }

    renderRun_twice_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">跑动两次占比分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">省级</span><span class="indicator-stat-value">7%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">市级</span><span class="indicator-stat-value">6%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">县级</span><span class="indicator-stat-value">7%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">街镇级</span><span class="indicator-stat-value">6%</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;justify-content:center;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各层级跑动两次占比对比</span><div id="modal-bar-chart6" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>事项名称</th><th>所属层级</th><th>两次跑动原因</th><th>优化计划</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.level}</td><td>${d.reason}</td><td>${d.plan}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initRun_twice_analysisCharts() {
        setTimeout(() => {
            const levels = ['省级', '市级', '县级', '街镇级'];
            const barData = levels.map(() => (Math.random() * 3 + 1).toFixed(1));

            const barChart = echarts.init(document.getElementById('modal-bar-chart6'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: levels, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 } }]
            });
        }, 200);
    }

    bindRun_twice_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateRun_twice_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateRun_twice_analysisModal(); } });
        this.initRun_twice_analysisCharts();
    }

    updateRun_twice_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderRun_twice_analysisModal(); this.bindRun_twice_analysisModalEvents(overlay); }
    }

    // 弹窗九：跑动三次及以上占比分析
    generateRun_three_analysisData() {
        const levels = ['省级', '市级', '县级', '街镇级'];
        const reasons = ['多部门串联', '现场勘验', '材料补正'];
        const depts = ['省发改委', '省住建厅', '省市场监管局'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            level: levels[Math.floor(Math.random() * levels.length)],
            count: Math.floor(Math.random() * 3) + 3,
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            dept: depts[Math.floor(Math.random() * depts.length)],
            deadline: `${2026}-${String(Math.floor(Math.random() * 6) + 7).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
        }));
    }

    renderRun_three_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">跑动三次及以上占比分析（重点攻坚）</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">省级</span><span class="indicator-stat-value">4%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">市级</span><span class="indicator-stat-value">2%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">县级</span><span class="indicator-stat-value">4%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">街镇级</span><span class="indicator-stat-value">2%</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;justify-content:center;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各层级跑动三次及以上占比对比</span><div id="modal-bar-chart7" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>事项名称</th><th>所属层级</th><th>跑动次数</th><th>多次跑动原因</th><th>整改责任部门</th><th>整改完成时限</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.level}</td><td><span class="rv-status negative">${d.count}</span></td><td>${d.reason}</td><td>${d.dept}</td><td>${d.deadline}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initRun_three_analysisCharts() {
        setTimeout(() => {
            const levels = ['省级', '市级', '县级', '街镇级'];
            const barData = levels.map(() => (Math.random() * 1 + 0.5).toFixed(1));

            const barChart = echarts.init(document.getElementById('modal-bar-chart7'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: levels, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 } }]
            });
        }, 200);
    }

    bindRun_three_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateRun_three_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateRun_three_analysisModal(); } });
        this.initRun_three_analysisCharts();
    }

    updateRun_three_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderRun_three_analysisModal(); this.bindRun_three_analysisModalEvents(overlay); }
    }

    // 弹窗十：法人证照目录汇聚分析
    generateLegal_license_analysisData() {
        const types = ['营业执照', '许可证', '资质证书', '备案凭证', '其他'];
        const depts = ['省市场监管局', '省住建厅', '省交通运输厅', '省应急厅', '省卫健委', '省生态环境厅', '省发改委', '省农业农村厅'];
        const statuses = ['已共享', '待共享'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `证照${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            dept: depts[Math.floor(Math.random() * depts.length)],
            date: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.floor(Math.random() * 2)]
        }));
    }

    renderLegal_license_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">法人证照目录汇聚分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">法人证照目录汇聚量</span><span class="indicator-stat-value">99类</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">已关联事项</span><span class="indicator-stat-value">856项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">调用次数</span><span class="indicator-stat-value">12,345次</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">覆盖部门</span><span class="indicator-stat-value">26个</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">法人证照类型分布</span><div id="modal-pie-chart4" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各部门法人证照调用情况</span><div id="modal-bar-chart8" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>证照名称</th><th>证照类型</th><th>主管部门</th><th>汇聚日期</th><th>共享状态</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.dept}</td><td>${d.date}</td><td><span class="rv-status ${d.status === '已共享' ? 'positive' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initLegal_license_analysisCharts() {
        setTimeout(() => {
            const pieChart = echarts.init(document.getElementById('modal-pie-chart4'));
            pieChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
                legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                series: [{
                    type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                    data: [
                        { value: 25, name: '营业执照', itemStyle: { color: '#00d4ff' } },
                        { value: 30, name: '许可证', itemStyle: { color: '#34c759' } },
                        { value: 20, name: '资质证书', itemStyle: { color: '#ff9500' } },
                        { value: 15, name: '备案凭证', itemStyle: { color: '#af52de' } },
                        { value: 10, name: '其他', itemStyle: { color: '#5856d6' } }
                    ],
                    label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' }
                }]
            });

            const depts = ['省市场监管局', '省住建厅', '省交通运输厅', '省应急厅', '省卫健委', '省生态环境厅', '省发改委', '省农业农村厅'];
            const barData = depts.map(() => Math.floor(Math.random() * 500) + 100);

            const barChart = echarts.init(document.getElementById('modal-bar-chart8'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: depts, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
                yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 } }]
            });
        }, 200);
    }

    bindLegal_license_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateLegal_license_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateLegal_license_analysisModal(); } });
        this.initLegal_license_analysisCharts();
    }

    updateLegal_license_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderLegal_license_analysisModal(); this.bindLegal_license_analysisModalEvents(overlay); }
    }

    // 弹窗十一：自然人证照目录汇聚分析
    generatePerson_license_analysisData() {
        const types = ['身份证', '户口簿', '驾驶证', '社保卡', '学历证明', '其他'];
        const depts = ['省公安厅', '省人社厅', '省教育厅', '省民政厅', '省卫健委', '省交通运输厅'];
        const statuses = ['已共享', '待共享'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `证照${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            dept: depts[Math.floor(Math.random() * depts.length)],
            date: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.floor(Math.random() * 2)]
        }));
    }

    renderPerson_license_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">自然人证照目录汇聚分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">自然人证照目录汇聚量</span><span class="indicator-stat-value">99类</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">已关联事项</span><span class="indicator-stat-value">623项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">调用次数</span><span class="indicator-stat-value">8,765次</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">覆盖部门</span><span class="indicator-stat-value">18个</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">自然人证照类型分布</span><div id="modal-pie-chart5" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各部门自然人证照调用情况</span><div id="modal-bar-chart9" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>证照名称</th><th>证照类型</th><th>主管部门</th><th>汇聚日期</th><th>共享状态</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.dept}</td><td>${d.date}</td><td><span class="rv-status ${d.status === '已共享' ? 'positive' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initPerson_license_analysisCharts() {
        setTimeout(() => {
            const pieChart = echarts.init(document.getElementById('modal-pie-chart5'));
            pieChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
                legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                series: [{
                    type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                    data: [
                        { value: 30, name: '身份证', itemStyle: { color: '#00d4ff' } },
                        { value: 15, name: '户口簿', itemStyle: { color: '#34c759' } },
                        { value: 20, name: '驾驶证', itemStyle: { color: '#ff9500' } },
                        { value: 15, name: '社保卡', itemStyle: { color: '#af52de' } },
                        { value: 10, name: '学历证明', itemStyle: { color: '#5856d6' } },
                        { value: 10, name: '其他', itemStyle: { color: '#ff3b30' } }
                    ],
                    label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' }
                }]
            });

            const depts = ['省公安厅', '省人社厅', '省教育厅', '省民政厅', '省卫健委', '省交通运输厅', '省发改委', '省住建厅'];
            const barData = depts.map(() => Math.floor(Math.random() * 400) + 100);

            const barChart = echarts.init(document.getElementById('modal-bar-chart9'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: depts, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
                yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 } }]
            });
        }, 200);
    }

    bindPerson_license_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updatePerson_license_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updatePerson_license_analysisModal(); } });
        this.initPerson_license_analysisCharts();
    }

    updatePerson_license_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderPerson_license_analysisModal(); this.bindPerson_license_analysisModalEvents(overlay); }
    }

    // 弹窗十二：推送数据分析
    generatePush_data_analysisData() {
        return Array.from({ length: 30 }, (_, i) => ({
            id: 'TS' + String(i + 1).padStart(6, '0'),
            name: ['一般类办件', '承诺类办件'][i % 2],
            dept: ['省市场监管局', '省住建厅', '省卫健委', '省交通厅'][i % 4],
            count: Math.floor(Math.random() * 500) + 100,
            date: '2026-07-' + String(i % 28 + 1).padStart(2, '0')
        }));
    }

    renderPush_data_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">推送数据分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">推送数据总量</span><span class="indicator-stat-value">1.2万条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">一般类办件</span><span class="indicator-stat-value">60%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">承诺类办件</span><span class="indicator-stat-value">40%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">覆盖部门</span><span class="indicator-stat-value">26个</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">推送数据类型分布</span><div id="modal-push-pie" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各部门推送数据量</span><div id="modal-push-bar" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>推送编号</th><th>办件类型</th><th>推送部门</th><th>推送数量</th><th>推送日期</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.id}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    bindPush_data_analysisModalEvents(overlay) {
        const prevBtn = overlay.querySelector('#generic-modal-prev');
        const nextBtn = overlay.querySelector('#generic-modal-next');
        prevBtn?.addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updatePush_data_analysisModal(); } });
        nextBtn?.addEventListener('click', () => { if (this.currentPage < Math.ceil(this.modalData.length / this.pageSize)) { this.currentPage++; this.updatePush_data_analysisModal(); } });
        overlay.querySelector('.indicator-modal-close')?.addEventListener('click', () => overlay.remove());
    }

    updatePush_data_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderPush_data_analysisModal(); this.bindPush_data_analysisModalEvents(overlay); }
    }

    // 弹窗十三：收到数据分析
    generateReceive_data_analysisData() {
        return Array.from({ length: 30 }, (_, i) => ({
            id: 'SD' + String(i + 1).padStart(6, '0'),
            name: ['检查结果', '处罚结果', '信用数据'][i % 3],
            dept: ['省市场监管局', '省综合执法局', '省信用办'][i % 3],
            count: Math.floor(Math.random() * 500) + 100,
            date: '2026-07-' + String(i % 28 + 1).padStart(2, '0')
        }));
    }

    renderReceive_data_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">收到数据分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">收到数据总量</span><span class="indicator-stat-value">1.2万条</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">检查结果</span><span class="indicator-stat-value">45%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">处罚结果</span><span class="indicator-stat-value">35%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">信用数据</span><span class="indicator-stat-value">20%</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">收到数据类型分布</span><div id="modal-receive-pie" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各来源收到数据量</span><div id="modal-receive-bar" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>接收编号</th><th>数据类型</th><th>来源部门</th><th>接收数量</th><th>接收日期</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.id}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    bindReceive_data_analysisModalEvents(overlay) {
        const prevBtn = overlay.querySelector('#generic-modal-prev');
        const nextBtn = overlay.querySelector('#generic-modal-next');
        prevBtn?.addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateReceive_data_analysisModal(); } });
        nextBtn?.addEventListener('click', () => { if (this.currentPage < Math.ceil(this.modalData.length / this.pageSize)) { this.currentPage++; this.updateReceive_data_analysisModal(); } });
        overlay.querySelector('.indicator-modal-close')?.addEventListener('click', () => overlay.remove());
    }

    updateReceive_data_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderReceive_data_analysisModal(); this.bindReceive_data_analysisModalEvents(overlay); }
    }

    // 弹窗十四：办件业务量趋势分析
    generateBusiness_volume_analysisData() {
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            month: `${2025}-${String(Math.floor(Math.random() * 6) + 7).padStart(2, '0')}`,
            accept: Math.floor(Math.random() * 200) + 800,
            finish: Math.floor(Math.random() * 200) + 800,
            rate: (Math.random() * 5 + 95).toFixed(1),
            growth: (Math.random() * 10 - 2).toFixed(1)
        }));
    }

    renderBusiness_volume_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">办件业务量趋势分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">总受理量</span><span class="indicator-stat-value">9,856件</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">总办结量</span><span class="indicator-stat-value">9,756件</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">办结率</span><span class="indicator-stat-value" style="color:#34c759;">99.0%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">在办量</span><span class="indicator-stat-value">100件</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;justify-content:center;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">近12个月受理量与办结量趋势对比</span><div id="modal-line-chart2" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>月份</th><th>受理量（件）</th><th>办结量（件）</th><th>办结率（%）</th><th>环比增长率（%）</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.month}</td><td>${d.accept}</td><td>${d.finish}</td><td>${d.rate}%</td><td><span class="rv-status ${parseFloat(d.growth) > 0 ? 'positive' : 'negative'}">${d.growth > 0 ? '+' : ''}${d.growth}%</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initBusiness_volume_analysisCharts() {
        setTimeout(() => {
            const months = ['23年7月', '23年8月', '23年9月', '23年10月', '23年11月', '23年12月', '24年1月', '24年2月', '24年3月', '24年4月', '24年5月', '24年6月'];
            const acceptData = months.map(() => Math.floor(Math.random() * 200) + 800);
            const finishData = months.map(() => Math.floor(Math.random() * 200) + 800);

            const lineChart = echarts.init(document.getElementById('modal-line-chart2'));
            lineChart.setOption({
                tooltip: { trigger: 'axis' },
                legend: { data: ['受理量', '办结量'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
                xAxis: { type: 'category', data: months, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
                yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [
                    { name: '受理量', type: 'line', data: acceptData, itemStyle: { color: '#00d4ff' }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 9 } },
                    { name: '办结量', type: 'line', data: finishData, itemStyle: { color: '#34c759' }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 9 } }
                ]
            });
        }, 200);
    }

    bindBusiness_volume_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateBusiness_volume_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateBusiness_volume_analysisModal(); } });
        this.initBusiness_volume_analysisCharts();
    }

    updateBusiness_volume_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderBusiness_volume_analysisModal(); this.bindBusiness_volume_analysisModalEvents(overlay); }
    }

    // 弹窗十三：项目从审批到落地平均时长分析
    generateProjectLandingData() {
        const names = ['基础设施建设项目', '产业园区开发项目', '旅游综合体项目', '科技创新项目', '生态环保项目'];
        return Array.from({ length: 50 }, (_, i) => {
            const approval = parseFloat((Math.random() * 3 + 3).toFixed(1));
            const landing = parseFloat((Math.random() * 2 + 1).toFixed(1));
            return {
                id: i + 1,
                name: names[i % 5] + (i + 1),
                approval,
                landing,
                total: parseFloat((approval + landing).toFixed(1)),
                date: `2026-06-${String(Math.floor(Math.random() * 20) + 10).padStart(2, '0')}`
            };
        });
    }

    renderProjectLandingModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">项目审批到落地用时分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">平均落地用时</span><span class="indicator-stat-value">7小时</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">政府投资项目平均</span><span class="indicator-stat-value">11.5h</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">基础设施项目平均</span><span class="indicator-stat-value">12.8h</span></div>
                    
                    <div class="indicator-stat-card"><span class="indicator-stat-label">企业投资项目平均</span><span class="indicator-stat-value">11.5h</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">科技创新项目平均</span><span class="indicator-stat-value">12.8h</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">生态环保项目平均</span><span class="indicator-stat-value">11.5h</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">同比压缩</span><span class="indicator-stat-value" style="color:#ffcc00;">-20%</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">上年与今年各类项目平均用时对比</span>
                        <div id="modal-landing-donut" class="indicator-chart-container"></div>
                    </div>
                    <div class="indicator-chart-item" style="flex:1;">
                        <span class="indicator-chart-title">本年1-12月项目平均用时趋势</span>
                        <div id="modal-landing-bar" class="indicator-chart-container"></div>
                    </div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>项目名称</th><th>审批用时</th><th>落地用时</th><th>总用时</th><th>落地日期</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.approval}h</td><td>${d.landing}h</td><td>${d.total}h</td><td>${d.date}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initProjectLandingCharts() {
        setTimeout(() => {
            // ==================== 左图：上年 vs 今年 各类项目平均用时对比（分组柱状图） ====================
            const compareBar = echarts.init(document.getElementById('modal-landing-donut'));
            const typeLabels = ['政府投资项目', '企业投资项目', '科技创新项目', '基础设施项目', '生态环保项目'];
            const lastYearData  = [14.8, 11.0, 9.2, 16.0, 12.5]; // 上年：都比今年高
            const thisYearData  = [11.5, 8.2,  6.5, 12.8, 9.5];  // 今年：都比上年低
            compareBar.setOption({
                color: ['#00d4ff', '#ff9500'],
                textStyle: { color: 'rgba(255,255,255,0.6)' },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    formatter: (params) => {
                        let html = params[0].axisValue + '<br/>';
                        params.forEach(p => {
                            html += `${p.marker}${p.seriesName}：${p.value}h<br/>`;
                        });
                        return html;
                    }
                },
                legend: {
                    data: ['2025年(上年)', '2026年(今年)'],
                    top: 0,
                    right: 0,
                    itemGap: 12,
                    textStyle: { color: 'rgba(255,255,255,0.75)', fontSize: 11 },
                    itemWidth: 10, itemHeight: 10
                },
                grid: { left: '8%', right: '4%', bottom: '20%', top: '18%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: typeLabels,
                    axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } },
                    axisLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 10, interval: 0, rotate: 20 }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: { formatter: '{value}h', color: 'rgba(255,255,255,0.55)', fontSize: 10 },
                    splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }
                },
                series: [
                    {
                        name: '2025年(上年)',
                        type: 'bar',
                        data: lastYearData,
                        barGap: '20%',
                        barCategoryGap: '35%',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#36d5ff' },
                                { offset: 1, color: '#009fd4' }
                            ]),
                            borderRadius: [3, 3, 0, 0]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: 'rgba(255,255,255,0.82)',
                            fontSize: 10,
                            formatter: '{c}h'
                        }
                    },
                    {
                        name: '2026年(今年)',
                        type: 'bar',
                        data: thisYearData,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#ffc773' },
                                { offset: 1, color: '#ff8a00' }
                            ]),
                            borderRadius: [3, 3, 0, 0]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: 'rgba(255,255,255,0.82)',
                            fontSize: 10,
                            formatter: '{c}h'
                        }
                    }
                ]
            });

            // ==================== 右图：本年1-12月项目平均用时趋势（折线图） ====================
            const trendLine = echarts.init(document.getElementById('modal-landing-bar'));
            const monthLabels = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
            const monthlyHours = [9.5, 9.2, 8.8, 8.3, 7.9, 7.5, 7.2, 7.0, 6.8, 6.5, 6.3, 6.0];
            trendLine.setOption({
                textStyle: { color: 'rgba(255,255,255,0.6)' },
                tooltip: {
                    trigger: 'axis',
                    formatter: (p) => {
                        const v = p[0];
                        return `2026年${v.axisValue}<br/>${v.marker}平均用时：<b style="color:#ffcc00;">${v.value}h</b>`;
                    }
                },
                grid: { left: '8%', right: '5%', bottom: '15%', top: '14%', containLabel: true },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: monthLabels,
                    axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } },
                    axisLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 10, interval: 0 }
                },
                yAxis: {
                    type: 'value',
                    min: 5,
                    max: 11,
                    interval: 1,
                    axisLabel: { formatter: '{value}h', color: 'rgba(255,255,255,0.55)', fontSize: 10 },
                    splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }
                },
                series: [{
                    name: '平均用时',
                    type: 'line',
                    data: monthlyHours,
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 7,
                    lineStyle: {
                        width: 2.5,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#00d4ff' },
                            { offset: 1, color: '#ffcc00' }
                        ])
                    },
                    itemStyle: { color: '#ffcc00', borderColor: '#fff', borderWidth: 1.2 },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(255,204,0,0.35)' },
                            { offset: 1, color: 'rgba(0,212,255,0.02)' }
                        ])
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: 10,
                        fontWeight: 600,
                        formatter: '{c}h'
                    }
                }]
            });
        }, 200);
    }

    bindProjectLandingModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => {
            if (this.currentPage > 1) { this.currentPage--; this.updateProjectLandingModal(); }
        });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => {
            const totalPages = Math.ceil(this.modalData.length / this.pageSize);
            if (this.currentPage < totalPages) { this.currentPage++; this.updateProjectLandingModal(); }
        });
        this.initProjectLandingCharts();
    }

    updateProjectLandingModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderProjectLandingModal(); this.bindProjectLandingModalEvents(overlay); }
    }

    // 弹窗十四：事项全景分析
    generateItem_overview_analysisData() {
        const types = ['行政许可', '公共服务', '行政确认', '行政裁决', '行政奖励', '其他'];
        const depts = ['省发改委', '省住建厅', '省市场监管局', '省生态环境厅', '省应急厅', '省卫健委', '省交通运输厅', '省农业农村厅'];
        const statuses = ['已发布', '已下架', '已变更'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            dept: depts[Math.floor(Math.random() * depts.length)],
            limit: Math.floor(Math.random() * 20) + 1,
            runCount: Math.random() > 0.85 ? Math.floor(Math.random() * 2) + 1 : 0,
            status: statuses[Math.floor(Math.random() * 3)]
        }));
    }

    renderItem_overview_analysisModal() {
        const data = this.modalData;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="indicator-modal">
                <div class="indicator-modal-header">
                    <span class="indicator-modal-title">事项全景分析</span>
                    <button class="indicator-modal-close">×</button>
                </div>
                <div class="indicator-modal-stats" style="flex-wrap:wrap;">
                    <div class="indicator-stat-card"><span class="indicator-stat-label">事项总数</span><span class="indicator-stat-value">999项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">行政许可</span><span class="indicator-stat-value">356项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">行政确认</span><span class="indicator-stat-value">198项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">行政裁决</span><span class="indicator-stat-value">56项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">行政奖励</span><span class="indicator-stat-value">45项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">行政给付</span><span class="indicator-stat-value">32项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">公共服务</span><span class="indicator-stat-value">289项</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">其他行政权力</span><span class="indicator-stat-value">23项</span></div>
                </div>
                <div class="indicator-modal-chart" style="display:flex;gap:10px;">
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">事项类型分布</span><div id="modal-pie-chart6" class="indicator-chart-container"></div></div>
                    <div class="indicator-chart-item" style="flex:1;"><span class="indicator-chart-title">各部门事项数量</span><div id="modal-bar-chart10" class="indicator-chart-container"></div></div>
                </div>
                <div class="indicator-modal-content">
                    <table class="indicator-modal-table">
                        <thead><tr><th>序号</th><th>事项名称</th><th>事项类型</th><th>所属部门</th><th>办理时限（天）</th><th>跑动次数</th><th>事项状态</th></tr></thead>
                        <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.dept}</td><td>${d.limit}</td><td>${d.runCount}</td><td><span class="rv-status ${d.status === '已发布' ? 'positive' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="indicator-modal-pagination">
                    <button class="indicator-pagination-btn" id="generic-modal-prev" ${this.currentPage <= 1 ? 'disabled' : ''}>上一页</button>
                    <span class="indicator-pagination-info">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="indicator-pagination-btn" id="generic-modal-next" ${this.currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    initItem_overview_analysisCharts() {
        setTimeout(() => {
            const pieChart = echarts.init(document.getElementById('modal-pie-chart6'));
            pieChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
                legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
                series: [{
                    type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                    data: [
                        { value: 35.6, name: '行政许可', itemStyle: { color: '#00d4ff' } },
                        { value: 19.8, name: '行政确认', itemStyle: { color: '#ff9500' } },
                        { value: 5.6, name: '行政裁决', itemStyle: { color: '#34c759' } },
                        { value: 4.5, name: '行政奖励', itemStyle: { color: '#af52de' } },
                        { value: 3.2, name: '行政给付', itemStyle: { color: '#ff3b30' } },
                        { value: 28.9, name: '公共服务', itemStyle: { color: '#00ff88' } },
                        { value: 2.4, name: '其他行政权力', itemStyle: { color: '#8e8e93' } }
                    ],
                    label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' }
                }]
            });

            const depts = ['省发改委', '省住建厅', '省市场监管局', '省生态环境厅', '省应急厅', '省卫健委', '省交通运输厅', '省农业农村厅'];
            const barData = depts.map(() => Math.floor(Math.random() * 80) + 20);

            const barChart = echarts.init(document.getElementById('modal-bar-chart10'));
            barChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
                xAxis: { type: 'category', data: depts, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
                yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
                series: [{ type: 'bar', data: barData, barWidth: '50%', itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 } }]
            });
        }, 200);
    }

    bindItem_overview_analysisModalEvents(overlay) {
        overlay.querySelector('#generic-modal-prev').addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateItem_overview_analysisModal(); } });
        overlay.querySelector('#generic-modal-next').addEventListener('click', () => { const totalPages = Math.ceil(this.modalData.length / this.pageSize); if (this.currentPage < totalPages) { this.currentPage++; this.updateItem_overview_analysisModal(); } });
        this.initItem_overview_analysisCharts();
    }

    updateItem_overview_analysisModal() {
        const overlay = document.querySelector('.indicator-modal-overlay');
        if (overlay) { overlay.innerHTML = this.renderItem_overview_analysisModal(); this.bindItem_overview_analysisModalEvents(overlay); }
    }

    // ==================== 新增：审批页面4个弹窗（事项数/办件数/时限压缩比/材料压缩比） ====================
    openApprovalPanorama(type) {
        const old = document.querySelector('.indicator-modal-overlay');
        if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';

        const months = ['25年8月','25年9月','25年10月','25年11月','25年12月','26年1月','26年2月','26年3月','26年4月','26年5月','26年6月','26年7月'];
        const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        switch(type) {
            case 'ap_item_count': {
                const curYear  = [70, 72, 75, 78, 76, 80, 82, 85, 83, 86, 88, 90];
                const lastYear = [65, 66, 68, 70, 72, 70, 74, 76, 75, 78, 80, 85];
                overlay.innerHTML = this.renderApprovalPanorama({
                    title: '审批事项总量趋势分析',
                    kpis: [
                        { label: '审批事项总数', value: '90',  suffix: '项' },
                        { label: '去年同期',     value: '85',  suffix: '项' },
                        { label: '同比增加',     value: '5',   suffix: '项' },
                        { label: '同比上升',     value: '5.9', suffix: '%', highlight: 'up' }
                    ],
                    leftTitle: '近12个月审批事项数量趋势（今年 vs 去年同月）',
                    leftType: 'compareBar',
                    leftCompare: { months, curYear, lastYear, unit: '项' },
                    rightTitle: '审批事项类型分布',
                    rightType: 'pie',
                    rightPie: [
                        { value: 35, name: '行政许可', itemStyle: { color: '#4a9eff' } },
                        { value: 25, name: '行政确认', itemStyle: { color: '#ff7f50' } },
                        { value: 30, name: '公共服务', itemStyle: { color: '#ffcc00' } },
                        { value: 10, name: '其他',     itemStyle: { color: '#af52de' } }
                    ],
                    tableTitle: '审批事项明细列表',
                    tableHeader: ['审批事项编码','审批事项名称','所属部门'],
                    tableRows: [
                        ['SP-SX-2026-0001','互联网信息服务许可','海南省工信厅'],
                        ['SP-SX-2026-0002','建筑业企业资质核准','海南省住建厅'],
                        ['SP-SX-2026-0003','食品生产许可','海南省市场监管局'],
                        ['SP-SX-2026-0004','药品经营许可','海南省药监局'],
                        ['SP-SX-2026-0005','不动产登记','海南省自然资源厅'],
                        ['SP-SX-2026-0006','公共场所卫生许可','海南省卫健委'],
                        ['SP-SX-2026-0007','社会保险登记','海南省人社厅'],
                        ['SP-SX-2026-0008','道路运输经营许可','海南省交通厅'],
                        ['SP-SX-2026-0009','采矿权延续登记','海南省自然资源厅'],
                        ['SP-SX-2026-0010','绿色食品认证','海南省农业农村厅'],
                        ['SP-SX-2026-0011','医师执业注册','海南省卫健委'],
                        ['SP-SX-2026-0012','教师资格认定','海南省教育厅']
                    ]
                });
                break;
            }
            case 'ap_case_count': {
                const curYear  = [95, 102, 108, 110, 105, 99, 108, 112, 106, 100, 98, 99];
                const lastYear = [110, 115, 120, 118, 112, 110, 118, 122, 116, 112, 110, 110];
                overlay.innerHTML = this.renderApprovalPanorama({
                    title: '审批办件总量趋势分析',
                    kpis: [
                        { label: '审批办件总数', value: '99',  suffix: '件' },
                        { label: '去年同期',     value: '110', suffix: '件' },
                        { label: '同比减少',     value: '11',  suffix: '件' },
                        { label: '同比下降',     value: '10',  suffix: '%', highlight: 'down' }
                    ],
                    leftTitle: '近12个月审批办件趋势（今年 vs 去年同月）',
                    leftType: 'compareLine',
                    leftCompare: { months, curYear, lastYear, unit: '件' },
                    rightTitle: '办件类型分布',
                    rightType: 'pie',
                    rightPie: [
                        { value: 55, name: '即办件',   itemStyle: { color: '#4a9eff' } },
                        { value: 45, name: '承诺件',   itemStyle: { color: '#ff7f50' } }
                    ],
                    tableTitle: '审批办件明细列表',
                    tableHeader: ['审批办件编码','当事人名称','审批事项','审批部门','审批时间'],
                    tableRows: [
                        ['SP-BJ-2026-07012','海南XX科技有限公司','互联网信息服务许可','海南省工信厅','2026-07-12 10:23'],
                        ['SP-BJ-2026-07011','海口XX建筑工程公司','建筑业企业资质核准','海南省住建厅','2026-07-11 14:02'],
                        ['SP-BJ-2026-07010','儋州XX食品厂','食品生产许可','儋州市市场监管局','2026-07-10 17:05'],
                        ['SP-BJ-2026-07009','万宁XX药业公司','药品经营许可','海南省药监局','2026-07-09 16:11'],
                        ['SP-BJ-2026-07008','张XX','不动产登记','三亚市自然资源局','2026-07-10 10:33'],
                        ['SP-BJ-2026-07007','澄迈XX酒店','公共场所卫生许可','澄迈县卫健委','2026-07-09 09:47'],
                        ['SP-BJ-2026-07006','王XX','社保转移接续','海口市社保局','2026-07-11 16:40'],
                        ['SP-BJ-2026-07005','东方XX物流公司','道路运输经营许可','海南省交通厅','2026-07-09 14:29'],
                        ['SP-BJ-2026-07004','五指山XX矿业公司','采矿权延续登记','海南省自然资源厅','2026-07-08 13:58'],
                        ['SP-BJ-2026-07003','三亚XX农业合作社','绿色食品认证','海南省农业农村厅','2026-07-12 09:51'],
                        ['SP-BJ-2026-07002','李XX','医师执业注册','海南省卫健委','2026-07-11 11:18'],
                        ['SP-BJ-2026-07001','陈XX','教师资格认定','海南省教育厅','2026-07-08 09:22']
                    ]
                });
                break;
            }
            case 'ap_time_compress': {
                const items = ['互联网信息服务许可','建筑业企业资质','食品生产许可','药品经营许可','不动产登记','公共场所卫生许可','社保转移接续','道路运输许可','采矿权延续','绿色食品认证'];
                const legal = [20, 30, 20, 15, 30, 20, 15, 20, 40, 20];
                const nowL  = [2,  3,  2,  2,  3,  2,  1,  2,  5,  2 ];
                overlay.innerHTML = this.renderApprovalPanorama({
                    title: '办件时限压缩比分析',
                    kpis: [
                        { label: '办件时限压缩比',   value: '90',  suffix: '%' },
                        { label: '原法定平均时限',   value: '20',  suffix: '天' },
                        { label: '现平均办理时限',   value: '2',   suffix: '天' },
                        { label: '压缩天数',         value: '18',  suffix: '天', highlight: 'up' }
                    ],
                    leftTitle: '各事项法定时限与现时限对比（天）',
                    leftType: 'doubleBar',
                    leftDouble: {
                        x: items,
                        legal,
                        now: nowL,
                        legend1: '原法定时限',
                        legend2: '现办理时限',
                        unit: '天'
                    },
                    rightTitle: '压缩幅度分布',
                    rightType: 'pie',
                    rightPie: [
                        { value: 6,  name: '压缩80%以上', itemStyle: { color: '#00c853' } },
                        { value: 3,  name: '压缩60%-80%', itemStyle: { color: '#ffcc00' } },
                        { value: 1,  name: '压缩60%以下', itemStyle: { color: '#ff7f50' } }
                    ],
                    tableTitle: '办件时限压缩明细',
                    tableHeader: ['事项名称','原法定时限（天）','现办理时限（天）','压缩天数（天）','压缩比（%）'],
                    tableRows: items.map((name, i) => {
                        const d = legal[i] - nowL[i];
                        const r = (d / legal[i] * 100).toFixed(1);
                        return [name, legal[i], nowL[i], d, r + '%'];
                    })
                });
                break;
            }
            case 'ap_material_compress': {
                const items = ['企业开办登记','建设工程规划许可','食品经营许可','医疗机构执业登记','交通运输经营许可','危险化学品经营许可','药品零售许可','公共场所卫生许可','不动产首次登记','社保开户登记'];
                const oldM = [10, 12,  9, 11, 10, 13, 10,  8, 12,  9];
                const newM = [1,  1,  1,  2,  1,  2,  1,  1,  2,  1];
                overlay.innerHTML = this.renderApprovalPanorama({
                    title: '办件材料压缩比分析',
                    kpis: [
                        { label: '办件材料压缩比',   value: '90',  suffix: '%' },
                        { label: '原平均材料数',     value: '10',  suffix: '件' },
                        { label: '现平均材料数',     value: '1',   suffix: '件' },
                        { label: '压缩材料数',       value: '9',   suffix: '件', highlight: 'up' }
                    ],
                    leftTitle: '各事项原材料数与现材料数对比（件）',
                    leftType: 'doubleBar',
                    leftDouble: {
                        x: items,
                        legal: oldM,
                        now: newM,
                        legend1: '原材料数',
                        legend2: '现材料数',
                        unit: '件'
                    },
                    rightTitle: '材料精简方式分布',
                    rightType: 'pie',
                    rightPie: [
                        { value: 40, name: '共享复用',   itemStyle: { color: '#4a9eff' } },
                        { value: 25, name: '告知承诺',   itemStyle: { color: '#00c853' } },
                        { value: 20, name: '直接取消',   itemStyle: { color: '#ffcc00' } },
                        { value: 15, name: '合并优化',   itemStyle: { color: '#ff7f50' } }
                    ],
                    tableTitle: '办件材料压缩明细',
                    tableHeader: ['事项名称','原材料数（件）','现材料数（件）','压缩材料数（件）','压缩比（%）'],
                    tableRows: items.map((name, i) => {
                        const d = oldM[i] - newM[i];
                        const r = (d / oldM[i] * 100).toFixed(1);
                        return [name, oldM[i], newM[i], d, r + '%'];
                    })
                });
                break;
            }
        }

        document.body.appendChild(overlay);
        overlay.querySelector('.indicator-modal-close').addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', e => { if (e.target === overlay) this.closeModal(); });
        setTimeout(() => this.initApprovalPanoramaCharts(type), 80);
    }

    renderApprovalPanorama(cfg) {
        this._apCfg = cfg;
        this._apPageSize = 5;
        this._apPage = 1;
        this._apTotal = cfg.tableRows.length;
        this._apPages = Math.max(1, Math.ceil(this._apTotal / this._apPageSize));

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
                    <div id="ap-chart-left" class="trend-chart-container"></div>
                </div>
                <div class="trend-chart-box trend-chart-pie">
                    <div class="trend-chart-title">${cfg.rightTitle}</div>
                    <div id="ap-chart-right" class="trend-chart-container"></div>
                </div>
            </div>
            <div class="trend-table-wrap">
                <div class="trend-table-title">${cfg.tableTitle}</div>
                <div class="trend-table-scroller">
                    <table class="trend-data-table">
                        <thead><tr>${cfg.tableHeader.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                        <tbody id="ap-tbody">${this._renderApTbody()}</tbody>
                    </table>
                </div>
                <div class="trend-pager-bar" id="ap-pager">${this._renderApPager()}</div>
            </div>
        </div>`;
    }

    _renderApTbody() {
        const cfg = this._apCfg;
        if (!cfg) return '';
        const start = (this._apPage - 1) * this._apPageSize;
        const rows = cfg.tableRows.slice(start, start + this._apPageSize);
        return rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
    }

    _renderApPager() {
        const t = this._apTotal, cur = this._apPage, last = this._apPages;
        return `
        <div class="trend-pager-bar" style="margin-top:6px;">
            <span class="trend-pager-info">共 <b>${t}</b> 条 / 每页 <b>${this._apPageSize}</b> 条 / 共 <b>${last}</b> 页</span>
            <div class="trend-pager-btns">
                <button class="trend-pager-btn ${cur<=1?'disabled':''}"
                        onclick="window.approvalPage.switchApPage(-1)">上一页</button>
                <span class="trend-pager-num">第 <b>${cur}</b> / ${last} 页</span>
                <button class="trend-pager-btn ${cur>=last?'disabled':''}"
                        onclick="window.approvalPage.switchApPage(1)">下一页</button>
            </div>
        </div>`;
    }

    switchApPage(delta) {
        const next = this._apPage + delta;
        if (next < 1 || next > this._apPages) return;
        this._apPage = next;
        const b = document.getElementById('ap-tbody');
        if (b) b.innerHTML = this._renderApTbody();
        const p = document.getElementById('ap-pager');
        if (p && p.parentNode) {
            const w = document.createElement('div');
            w.innerHTML = this._renderApPager();
            p.parentNode.replaceChild(w.firstElementChild, p);
        }
    }

    initApprovalPanoramaCharts(type) {
        const cfg = this._apCfg;
        if (!cfg) return;
        const leftEl = document.getElementById('ap-chart-left');
        const rightEl = document.getElementById('ap-chart-right');
        if (!leftEl || !rightEl) return;

        // 左图
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
        } else if (cfg.leftType === 'doubleBar') {
            const d = cfg.leftDouble;
            leftChart = echarts.init(leftEl);
            leftChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                legend: { data: [d.legend1, d.legend2], top: 0, right: 10, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } },
                grid: { left: '4%', right: '4%', top: '14%', bottom: '22%', containLabel: true },
                xAxis: {
                    type: 'category', data: d.x,
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
                    { name: d.legend1, type: 'bar', barWidth: '32%', data: d.legal,
                      itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[
                            { offset: 0, color: '#7e57c2' }, { offset: 1, color: '#4527a0' } ]),
                        borderRadius: [4, 4, 0, 0] },
                      label: { show: true, position: 'top', color: 'rgba(255,255,255,0.75)', fontSize: 10 } },
                    { name: d.legend2, type: 'bar', barWidth: '32%', data: d.now,
                      itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[
                            { offset: 0, color: '#34c759' }, { offset: 1, color: '#00701a' } ]),
                        borderRadius: [4, 4, 0, 0] },
                      label: { show: true, position: 'top', color: 'rgba(255,255,255,0.75)', fontSize: 10 } }
                ]
            });
        }

        // 右图饼图
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
        leftEl._apResizer = handler;
    }
};