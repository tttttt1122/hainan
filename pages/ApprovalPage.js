window.ApprovalPage = class ApprovalPage {
    constructor(container) {
        this.container = container;
        this.charts = {};
        this.modalData = [];
        this.currentPage = 1;
        this.pageSize = 10;
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
        this.ensureChartHeights();
        this.bindEvents();
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
                                <div class="stat-item-row" data-indicator="accept_count">
                                    <span class="stat-label">受理量</span>
                                    <span class="stat-value">99</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item-row" data-indicator="finish_count">
                                    <span class="stat-label">办结量</span>
                                    <span class="stat-value">99</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-section">
                            <h3 class="card-title">事项情况</h3>
                            <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px; padding: 8px 16px; border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 4px; cursor: pointer;" data-indicator="item_total">
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
                                <div class="effect-item" data-indicator="avg_time_limit">
                                    <span class="effect-label">平均办理时限</span>
                                    <span class="effect-value">1.2天</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">压缩幅度</span>
                                    <span class="effect-value">85.7%</span>
                                </div>
                                <div class="effect-item" data-indicator="avg_material_count">
                                    <span class="effect-label">平均提交材料件数</span>
                                    <span class="effect-value">1.3件</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">降幅</span>
                                    <span class="effect-value">71.7%</span>
                                </div>
                                <div class="effect-item" data-indicator="avg_run_count">
                                    <span class="effect-label">平均跑动次数</span>
                                    <span class="effect-value">0.1次</span>
                                </div>
                                <div class="effect-item">
                                    <span class="effect-label">降幅</span>
                                    <span class="effect-value">95.0%</span>
                                </div>
                                <div class="effect-item" data-indicator="good_rate">
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
                                <div class="license-item" data-indicator="legal_license_count">
                                    <span class="license-label">法人证照目录汇聚量</span>
                                    <span class="license-value">99</span>
                                </div>
                                <div class="license-item" data-indicator="person_license_count">
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

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const indicator = e.target.closest('[data-indicator]');
            if (indicator) {
                const type = indicator.dataset.indicator;
                this.openModal(type);
            }
        });
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
        this.currentPage = 1;
        this.currentType = 'all';
        this.currentStatus = 'all';
        this.itemTypeFilter = 'all';
        this.itemDeptFilter = 'all';
        this.currentLicenseFilter = 'all';
        this.currentModalType = type;

        const overlay = document.createElement('div');
        overlay.className = 'indicator-modal-overlay';
        
        let title = '';
        let columns = [];
        let dataIndexes = [];
        
        if (type === 'item_total') {
            this.modalData = this.generateItemData();
            this.currentModalTitle = '事项列表';
            this.currentModalColumns = ['事项编码', '事项名称', '事项类型', '所属部门'];
            this.currentModalDataIndexes = ['code', 'name', 'type', 'department'];
            overlay.innerHTML = this.renderItemModal();
            this.bindItemModalEvents(overlay);
        } else if (type === 'avg_time_limit') {
            this.modalData = this.generateTimeLimitData();
            title = '办理时限列表';
            columns = ['办件编码', '对象名称', '对象编码', '办件类型', '事项名称', '办理部门', '办理时限'];
            dataIndexes = ['code', 'objName', 'objCode', 'type', 'itemName', 'department', 'timeLimit'];
            this.currentModalTitle = title;
            this.currentModalColumns = columns;
            this.currentModalDataIndexes = dataIndexes;
            overlay.innerHTML = this.renderGenericModal(title, columns, dataIndexes);
            this.bindGenericModalEvents(overlay);
        } else if (type === 'avg_material_count') {
            this.modalData = this.generateMaterialCountData();
            title = '材料件数列表';
            columns = ['办件编码', '对象名称', '对象编码', '办件类型', '事项名称', '提交材料件数'];
            dataIndexes = ['code', 'objName', 'objCode', 'type', 'itemName', 'materialCount'];
            this.currentModalTitle = title;
            this.currentModalColumns = columns;
            this.currentModalDataIndexes = dataIndexes;
            overlay.innerHTML = this.renderGenericModal(title, columns, dataIndexes);
            this.bindGenericModalEvents(overlay);
        } else if (type === 'avg_run_count') {
            this.modalData = this.generateRunCountData();
            title = '跑动次数列表';
            columns = ['办件编码', '对象名称', '对象编码', '办件类型', '事项名称', '跑动次数'];
            dataIndexes = ['code', 'objName', 'objCode', 'type', 'itemName', 'runCount'];
            this.currentModalTitle = title;
            this.currentModalColumns = columns;
            this.currentModalDataIndexes = dataIndexes;
            overlay.innerHTML = this.renderGenericModal(title, columns, dataIndexes);
            this.bindGenericModalEvents(overlay);
        } else if (type === 'good_rate') {
            this.modalData = this.generateGoodRateData();
            title = '好评列表';
            columns = ['办件编码', '对象名称', '对象编码', '办件类型', '事项名称', '办理部门', '办结评价'];
            dataIndexes = ['code', 'objName', 'objCode', 'type', 'itemName', 'department', 'evaluation'];
            this.currentModalTitle = title;
            this.currentModalColumns = columns;
            this.currentModalDataIndexes = dataIndexes;
            overlay.innerHTML = this.renderGenericModal(title, columns, dataIndexes);
            this.bindGenericModalEvents(overlay);
        } else if (type === 'legal_license_count') {
            this.modalData = this.generateLegalLicenseData();
            title = '法人证照列表';
            columns = ['证照名称', '证照编号', '对象名称', '对象编码', '汇聚时间'];
            dataIndexes = ['licenseName', 'licenseNo', 'objName', 'objCode', 'gatherTime'];
            this.currentModalTitle = title;
            this.currentModalColumns = columns;
            this.currentModalDataIndexes = dataIndexes;
            overlay.innerHTML = this.renderGenericModal(title, columns, dataIndexes);
            this.bindGenericModalEvents(overlay);
        } else if (type === 'person_license_count') {
            this.modalData = this.generatePersonLicenseData();
            title = '自然人证照列表';
            columns = ['证照名称', '证照编号', '姓名', '身份证号码', '汇聚时间'];
            dataIndexes = ['licenseName', 'licenseNo', 'name', 'idCard', 'gatherTime'];
            this.currentModalTitle = title;
            this.currentModalColumns = columns;
            this.currentModalDataIndexes = dataIndexes;
            overlay.innerHTML = this.renderGenericModal(title, columns, dataIndexes);
            this.bindGenericModalEvents(overlay);
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
