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
        this.ensureChartHeights();
        this.bindEvents();
        setTimeout(() => this.initCharts(), 300);
    }

    ensureChartHeights() {
        const pieEl = document.getElementById('pie-chart');
        const legalBarEl = document.getElementById('legal-bar-chart');
        const personBarEl = document.getElementById('person-bar-chart');
        const columnEl = document.getElementById('column-chart');

        if (pieEl) pieEl.style.height = '130px';
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
                            <div class="stat-card-horizontal cp-clickable" data-indicator="business_volume_analysis">
                                <div class="stat-item-row">
                                    <span class="stat-label">受理量</span>
                                    <span class="stat-value">99</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item-row">
                                    <span class="stat-label">办结量</span>
                                    <span class="stat-value">99</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-section">
                            <h3 class="card-title">事项情况</h3>
                            <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px; padding: 8px 16px; border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 4px; cursor: pointer;" class="cp-clickable" data-indicator="item_overview_analysis">
                                <span class="stat-label">事项总数</span>
                                <span class="stat-value">100</span>
                            </div>
                            <div id="pie-chart" class="chart-container pie-container" style="width: 80%; margin: 0 auto;"></div>
                        </div>
                        
                        <div class="card-section">
                            <h3 class="card-title">跑动占比</h3>
                            <div class="run-data">
                                <div class="run-group cp-clickable" data-indicator="run_zero_analysis">
                                    <div class="run-label">无需跑动占比</div>
                                    <div class="run-items">
                                        <span>省级 80%</span>
                                        <span>市级 82%</span>
                                        <span>县级 80%</span>
                                        <span>街镇级 82%</span>
                                    </div>
                                </div>
                                <div class="run-group cp-clickable" data-indicator="run_once_analysis">
                                    <div class="run-label">跑动一次占比</div>
                                    <div class="run-items">
                                        <span>省级 9%</span>
                                        <span>市级 10%</span>
                                        <span>县级 9%</span>
                                        <span>街镇级 10%</span>
                                    </div>
                                </div>
                                <div class="run-group cp-clickable" data-indicator="run_twice_analysis">
                                    <div class="run-label">跑动两次占比</div>
                                    <div class="run-items">
                                        <span>省级 7%</span>
                                        <span>市级 6%</span>
                                        <span>县级 7%</span>
                                        <span>街镇级 6%</span>
                                    </div>
                                </div>
                                <div class="run-group cp-clickable" data-indicator="run_three_analysis">
                                    <div class="run-label">跑动三次及以上占比</div>
                                    <div class="run-items">
                                        <span>省级 4%</span>
                                        <span>市级 2%</span>
                                        <span>县级 4%</span>
                                        <span>街镇级 2%</span>
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
                                <div class="effect-item cp-clickable" data-indicator="time_limit_analysis">
                                    <span class="effect-label">平均办理时限</span>
                                    <span class="effect-value">1.2天</span>
                                </div>
                                <div class="effect-item cp-clickable" data-indicator="time_limit_analysis">
                                    <span class="effect-label">压缩幅度</span>
                                    <span class="effect-value">85.7%</span>
                                </div>
                                <div class="effect-item cp-clickable" data-indicator="material_analysis">
                                    <span class="effect-label">平均提交材料件数</span>
                                    <span class="effect-value">1.3件</span>
                                </div>
                                <div class="effect-item cp-clickable" data-indicator="material_analysis">
                                    <span class="effect-label">降幅</span>
                                    <span class="effect-value">71.7%</span>
                                </div>
                                <div class="effect-item cp-clickable" data-indicator="run_count_analysis">
                                    <span class="effect-label">平均跑动次数</span>
                                    <span class="effect-value">0.1次</span>
                                </div>
                                <div class="effect-item cp-clickable" data-indicator="run_count_analysis">
                                    <span class="effect-label">降幅</span>
                                    <span class="effect-value">95.0%</span>
                                </div>
                                <div class="effect-item cp-clickable" data-indicator="satisfaction_analysis">
                                    <span class="effect-label">好评率</span>
                                    <span class="effect-value">99.9%</span>
                                </div>
                                <div class="effect-item cp-clickable" data-indicator="bad_review_tracking">
                                    <span class="effect-label">差评按期整改率</span>
                                    <span class="effect-value">100%</span>
                                </div>
                            </div>
                            <div id="column-chart" class="chart-container column-container" style="height: 300px;"></div>
                        </div>
                        
                        <div class="card-section">
                            <h3 class="card-title">证照目录汇聚量</h3>
                            <div class="license-stats">
                                <div class="license-item cp-clickable" data-indicator="legal_license_analysis">
                                    <span class="license-label">法人证照目录汇聚量</span>
                                    <span class="license-value">99</span>
                                </div>
                                <div class="license-item cp-clickable" data-indicator="person_license_analysis">
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
                    <div class="indicator-stat-card"><span class="indicator-stat-label">总体零跑动占比</span><span class="indicator-stat-value" style="color:#34c759;">98.5%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">省级</span><span class="indicator-stat-value">99%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">市级</span><span class="indicator-stat-value">99%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">县级</span><span class="indicator-stat-value">99%</span></div>
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
                    <div class="indicator-stat-card"><span class="indicator-stat-label">总体跑动一次占比</span><span class="indicator-stat-value">95.2%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">省级</span><span class="indicator-stat-value">99%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">市级</span><span class="indicator-stat-value">99%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">县级</span><span class="indicator-stat-value">99%</span></div>
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
                    <div class="indicator-stat-card"><span class="indicator-stat-label">总体跑动两次占比</span><span class="indicator-stat-value" style="color:#ff9500;">3.1%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">省级</span><span class="indicator-stat-value">99%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">市级</span><span class="indicator-stat-value">99%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">县级</span><span class="indicator-stat-value">99%</span></div>
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
                    <div class="indicator-stat-card"><span class="indicator-stat-label">总体跑动三次及以上占比</span><span class="indicator-stat-value" style="color:#ff3b30;">0.8%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">省级</span><span class="indicator-stat-value">99%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">市级</span><span class="indicator-stat-value">99%</span></div>
                    <div class="indicator-stat-card"><span class="indicator-stat-label">县级</span><span class="indicator-stat-value">99%</span></div>
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

    // 弹窗十二：办件业务量趋势分析
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

    // 弹窗十三：事项全景分析
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
};
