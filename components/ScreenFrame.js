window.ScreenFrame = class ScreenFrame {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`容器元素 ${containerId} 不存在`);
        }

        this.options = {
            title: '审管法信一体联动机制',
            tabs: [
                { id: 'home',      label: '首页',     pageTitle: '"审管法信"一体联动机制', pageSubtitle: '' },
                { id: 'approval',  label: '审批',     pageTitle: '"审管法信"一体联动机制', pageSubtitle: '' },
                { id: 'supervision', label: '监管',   pageTitle: '"审管法信"一体联动机制', pageSubtitle: '' },
                { id: 'law',       label: '执法',     pageTitle: '"审管法信"一体联动机制', pageSubtitle: '' },
                { id: 'credit',    label: '信用',     pageTitle: '"审管法信"一体联动机制', pageSubtitle: '' },
                { id: 'cockpit',   label: '监督处置', pageTitle: '"审管法信"一体联动机制', pageSubtitle: '' }
            ],
            defaultTab: 'home',
            ...options
        };

        this.currentTab = this.options.defaultTab;
        this.tabComponents = {};
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.loadTab(this.currentTab);
    }

    getTabConfig(tabId) {
        const tab = this.options.tabs.find(t => t.id === tabId);
        if (tab) {
            return {
                ...tab,
                pageTitle: tab.pageTitle || tab.label || this.options.title,
                pageSubtitle: tab.pageSubtitle || ''
            };
        }
        return { pageTitle: this.options.title, pageSubtitle: '', label: '', id: tabId };
    }

    isHomeTab() {
        return this.currentTab === 'home';
    }

    render() {
        const pageTab = this.getTabConfig(this.currentTab);
        const displayTitle = this.isHomeTab() ? this.options.title : pageTab.pageTitle;
        const subtitle = this.isHomeTab() ? (pageTab.pageSubtitle || '') : '';

        this.container.innerHTML = `
            <div class="screen-frame">
                <header class="screen-header">
                    <div class="screen-title-wrapper">
                        <div class="intro-tabs-container">
                            <button class="intro-tab" onclick="window.screenFrame.showIntroModal()">简介</button>
                            <button class="intro-tab" onclick="window.screenFrame.showArchitectureModal()">架构图</button>
                            <button class="intro-tab" onclick="window.screenFrame.showModelModal()">预警模型</button>
                            <button class="intro-tab" onclick="window.screenFrame.showLegalModal()">法律法规</button>
                        </div>
                        <div class="screen-title-center">
                            <h1 class="screen-title glow-text">${displayTitle}</h1>
                            ${subtitle ? `<div class="screen-subtitle">${subtitle}</div>` : ''}
                        </div>
                        <div class="online-count">今日在线人数 <span class="online-num">99</span></div>
                    </div>
                    <div class="screen-header-divider"></div>
                    <div class="screen-header-bottom">
                        ${this.renderHeaderBottom()}
                    </div>
                </header>
                <main class="screen-content">
                    <div id="tab-content" class="tab-content"></div>
                </main>
            </div>
        `;
    }

    renderHeaderBottom() {
        if (this.isHomeTab()) {
            return `
                <nav class="screen-nav">
                    ${this.options.tabs.map(tab => `
                        <button 
                            class="nav-tab ${tab.id === this.currentTab ? 'active' : ''}"
                            data-tab="${tab.id}"
                        >
                            ${tab.label}
                        </button>
                    `).join('')}
                </nav>
                <div class="header-date-range">
                    <span class="date-label">时间范围</span>
                    <input type="date" class="date-input" id="date-start" value="${this.getYearStartDate()}">
                    <span class="date-separator">至</span>
                    <input type="date" class="date-input" id="date-end" value="${this.getTodayDate()}">
                </div>
            `;
        } else {
            const pageTab = this.getTabConfig(this.currentTab);
            return `
                <div class="subpage-header-row">
                    <button class="back-home-btn" data-action="back-home">
                        <span class="back-icon">←</span> 返回首页
                    </button>
                    <div class="subpage-breadcrumb">
                        <span class="crumb-item" data-tab="home">首页</span>
                        <span class="crumb-sep">/</span>
                        <span class="crumb-item crumb-current">${pageTab.label}</span>
                    </div>
                </div>
                <div class="header-date-range">
                    <span class="date-label">时间范围</span>
                    <input type="date" class="date-input" id="date-start" value="${this.getYearStartDate()}">
                    <span class="date-separator">至</span>
                    <input type="date" class="date-input" id="date-end" value="${this.getTodayDate()}">
                </div>
            `;
        }
    }

    bindEvents() {
        // 首页选卡事件
        const tabs = this.container.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                if (tabId) this.switchTab(tabId);
            });
        });

        // 子页面：返回首页按钮
        const backBtn = this.container.querySelector('[data-action="back-home"]');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.switchTab('home'));
        }

        // 面包屑：首页点击返回
        const crumbHome = this.container.querySelector('.crumb-item[data-tab="home"]');
        if (crumbHome) {
            crumbHome.addEventListener('click', () => this.switchTab('home'));
        }

        // 地图省直/市县选卡委托
        this.container.addEventListener('click', (e) => {
            const btn = e.target.closest('.map-tab-btn');
            if (!btn) return;
            const overlay = btn.closest('.map-tab-overlay');
            if (!overlay) return;
            overlay.querySelectorAll('.map-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    }

    switchTab(tabId) {
        if (tabId === 'intro') {
            this.openIntroModal();
            return;
        }

        if (tabId === this.currentTab) return;

        const oldTab = this.currentTab;
        this.currentTab = tabId;

        // 先更新header（因为tab样式和header内容都依赖currentTab），再切换内容
        this.refreshHeader();
        this.transitionContent(oldTab, tabId);
    }

    /**
     * 切换tab时，根据首页/非首页模式重新渲染header部分，并重新绑定事件
     * 保留tab-content内容不受影响
     */
    refreshHeader() {
        const pageTab = this.getTabConfig(this.currentTab);
        const displayTitle = this.isHomeTab() ? this.options.title : pageTab.pageTitle;
        const subtitle = this.isHomeTab() ? (pageTab.pageSubtitle || '') : '';

        // 1) 更新大标题和副标题
        const titleCenterEl = this.container.querySelector('.screen-title-center');
        if (titleCenterEl) {
            titleCenterEl.innerHTML = `
                <h1 class="screen-title glow-text">${displayTitle}</h1>
                ${subtitle ? `<div class="screen-subtitle">${subtitle}</div>` : ''}
            `;
        }

        // 2) 更新底部行（选卡 or 返回按钮 + 时间）
        const headerBottom = this.container.querySelector('.screen-header-bottom');
        if (headerBottom) {
            headerBottom.innerHTML = this.renderHeaderBottom();
        }

        // 3) 重新绑定该区域的事件
        this.bindEvents();
    }

    showIntroModal() {
        this.openIntroModal();
    }

    showBackgroundModal() {
        const overlay = document.createElement('div');
        overlay.className = 'detail-modal-overlay';
        overlay.innerHTML = `
            <div class="detail-modal">
                <div class="detail-modal-content">
                    <div class="detail-modal-header">
                        <span class="detail-modal-title">建设背景</span>
                        <button class="detail-modal-close">×</button>
                    </div>
                    <div class="detail-modal-body-text">
                        <p>"审管法信"闭环管理体系是我省在全国率先探索的审批、监管、执法、信用四位一体协同便利化改革，通过数字化技术打通审批、监管、执法以及信用各环节相关信息系统，赋能"审批-监管-执法-信用"政府各部门行政管理环节一体联动的总体概念，目标是打破部门壁垒、数据互通共享、全流程闭环管理，推动"条块式"管理向"一体化联动"转变，优化营商环境、支撑自贸港封关运作。</p>
                        <p>海南省"互联网+监管"系统是我省"审管法信"闭环管理体系核心枢纽和规范涉企检查的信息化载体，也是我省"打好营商环境整体提升攻坚战"的主要信息化抓手。海南省"互联网+监管"系统在事前审批环节与海易办系统联通，加强审批办件的共享应用，推行审批结果驱动事中事后监管；事中监管环节，海南省"互联网+监管"系统与部门自建监管系统互联互通，数字赋能跨部门综合监管；事后执法环节，联动省综合行政执法平台，加强行业监管和综合行政执法在线协同衔接；信用环节，嵌入审批、监管、执法各工作流程，一方面实现相关数据自动推送信用平台，纳入信用评价范围；另一方面将信用评价结果加强在审批、监管、执法各环节的应用，积极探索"信用+"场景。</p>
                        <p>海南省"互联网+监管"系统最后一期于2022年获批，未将2023年以来国办及省委省政府监管工作部署要求纳入建设内容，包括国办《关于严格规范涉企行政检查的意见》（国办发〔2024〕54号）、《关于深入推进跨部门综合监管的指导意见》（国办发〔2023〕1号）、《关于清理规范涉企行政检查的通知》（国办督函〔2024〕69号）以及2024年9月27日海南省第七届人大常委会通过的《海南自由贸易港极简审批条例》明确提出的"亮码检查"、"综合查一次"、极简审批、管法衔接等工作要求。在实际工作推进过程中，一线工作人员结合日常监管实践，普遍反映系统在部分功能方面尚存在提升空间。其中，围绕监管风险智能预警、监管任务实时提醒、检查计划协同撮合以及监管事项动态更新等方面的需求反馈较为集中和强烈。为进一步提升监管效能，优化工作流程，省"互联网+监管"系统的迭代升级工作已显得尤为迫切和必要。</p>
                        <p>为贯彻落实《国务院办公厅关于严格规范涉企行政检查的意见》（国办发〔2024〕54号）、《海南省人民政府办公厅关于印发海南省政府数字化转型总体方案（2022—2025）的通知》（琼府办〔2022〕33号）等文件精神，明确"十四五"期间海南省政府数字化转型的目标、架构、任务和保障措施，海南省"互联网+监管"系统以原有的功能和模块为基础，融合海政通平台和海易办平台相关能力，在坚持"机制、平台、场景"三条主线基础上，进一步明确主攻方向，狠抓"四个一"，梳理整合一网监管已有公共服务支撑能力，优化提升一网监管支撑服务水平，强化事中事后监管，压实日常监管职责，积极构建"一枚印章管审批""一个系统管监管""一支队伍管执法"的橄榄型治理结构，有效解决以审代管、以罚代管、监管缺位等问题，实现避免重复检查、规范执法行为、提升执法效率、提高监管效能、减轻企业负担的目标。</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.bindModalClose(overlay);
    }

    showArchitectureModal() {
        const overlay = document.createElement('div');
        overlay.className = 'detail-modal-overlay';
        overlay.innerHTML = `
            <div class="detail-modal">
                <div class="detail-modal-content">
                    <div class="detail-modal-header">
                        <span class="detail-modal-title">架构图</span>
                        <button class="detail-modal-close">×</button>
                    </div>
                    <div class="detail-modal-body-image">
                        <img src="架构图.png" alt="架构图" class="detail-modal-image">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.bindModalClose(overlay);
    }

    showModelModal() {
        const overlay = document.createElement('div');
        overlay.className = 'detail-modal-overlay';
        overlay.innerHTML = `
            <div class="detail-modal">
                <div class="detail-modal-content">
                    <div class="detail-modal-header">
                        <span class="detail-modal-title">预警模型</span>
                        <button class="detail-modal-close">×</button>
                    </div>
                    <div class="detail-modal-body-rules">
                        <div class="rule-box">
                            <div class="rule-title">批后核查逾期未办预警规则：</div>
                            <div class="rule-content">年度内，监测到某单位批后核查办件逾期累计达到3个，发出预警；预警后重新计算，再次监测到该单位批后核查办件逾期累计达到3个，发出预警。</div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">未亮码检查预警规则：</div>
                            <div class="rule-content">监测到某单位无理由未亮码检查累计达到2次，发出预警；预警后重新计算，再次监测到该单位无理由未亮码检查，发出预警。</div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">频繁检查预警规则：</div>
                            <div class="rule-content">监测到某市县出现辖区内同一企业在60个自然日内被检查2次的情况达到3次，发出预警；预警后重新计算，再次监测到该市县出现辖区内同一企业在60个自然日内被检查2次的情况，发出预警，有因检查不纳入监测范围。</div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">线下线索移送预警规则：</div>
                            <div class="rule-content">年度内，监测到某单位线下移送涉嫌违法线索至综合行政执法部门达3次，发出预警，以综合行政执法部门将线下线索录入系统的时间为准；预警后重新计算，再次监测到该单位线下移送涉嫌违法线索，发出预警，预警后3日内，该单位线下推送给预警信息中相同综合行政执法部门的涉嫌违法线索不纳入计算范围。</div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">移送线索质量预警规则：</div>
                            <div class="rule-content">年度内，监测到某单位线上移送的涉嫌违法线索被要求补充材料达5次，发出预警；预警后重新计算，再次监测到该单位线上移送的涉嫌违法线索被要求补充材料达5次，发出预警。</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.bindModalClose(overlay);
    }

    bindModalClose(overlay) {
        overlay.querySelector('.detail-modal-close').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    showLegalModal() {
        const legalData = {
            approval: {
                name: '审批依据',
                chartData: [
                    { value: 350, name: '法律', itemStyle: { color: '#00d4ff' } },
                    { value: 890, name: '行政法规', itemStyle: { color: '#34c759' } },
                    { value: 1560, name: '地方性法规', itemStyle: { color: '#ff9500' } },
                    { value: 2340, name: '部门规章', itemStyle: { color: '#af52de' } },
                    { value: 980, name: '政府规章', itemStyle: { color: '#5856d6' } },
                    { value: 230, name: '国务院命令决定', itemStyle: { color: '#ff3b30' } }
                ],
                listData: [
                    { name: '行政许可法', domain: '审批', type: '法律', issuer: '全国人大常委会', effectiveDate: '2004-07-01', status: '有效' },
                    { name: '企业登记管理条例', domain: '审批', type: '行政法规', issuer: '国务院', effectiveDate: '2014-03-01', status: '有效' },
                    { name: '海南自由贸易港市场主体登记管理条例', domain: '审批', type: '地方性法规', issuer: '海南省人大常委会', effectiveDate: '2021-08-01', status: '有效' },
                    { name: '市场主体登记管理规定', domain: '审批', type: '部门规章', issuer: '市场监管总局', effectiveDate: '2022-03-01', status: '有效' },
                    { name: '海南省企业登记管理办法', domain: '审批', type: '政府规章', issuer: '海南省人民政府', effectiveDate: '2022-05-01', status: '有效' },
                    { name: '关于深化"放管服"改革优化营商环境的决定', domain: '审批', type: '国务院命令决定', issuer: '国务院', effectiveDate: '2020-01-01', status: '有效' },
                    { name: '优化营商环境条例', domain: '审批', type: '行政法规', issuer: '国务院', effectiveDate: '2020-01-01', status: '有效' },
                    { name: '海南自由贸易港优化营商环境条例', domain: '审批', type: '地方性法规', issuer: '海南省人大常委会', effectiveDate: '2021-01-01', status: '有效' },
                    { name: '行政许可法实施细则', domain: '审批', type: '部门规章', issuer: '司法部', effectiveDate: '2004-07-01', status: '有效' },
                    { name: '海南省行政许可设定实施管理办法', domain: '审批', type: '政府规章', issuer: '海南省人民政府', effectiveDate: '2023-01-01', status: '有效' }
                ]
            },
            supervision: {
                name: '监管依据',
                chartData: [
                    { value: 420, name: '法律', itemStyle: { color: '#00d4ff' } },
                    { value: 760, name: '行政法规', itemStyle: { color: '#34c759' } },
                    { value: 1340, name: '地方性法规', itemStyle: { color: '#ff9500' } },
                    { value: 1890, name: '部门规章', itemStyle: { color: '#af52de' } },
                    { value: 870, name: '政府规章', itemStyle: { color: '#5856d6' } },
                    { value: 180, name: '国务院命令决定', itemStyle: { color: '#ff3b30' } }
                ],
                listData: [
                    { name: '市场监督管理行政处罚程序规定', domain: '监管', type: '部门规章', issuer: '市场监管总局', effectiveDate: '2022-04-01', status: '有效' },
                    { name: '海南自由贸易港社会信用条例', domain: '监管', type: '地方性法规', issuer: '海南省人大常委会', effectiveDate: '2022-01-01', status: '有效' },
                    { name: '互联网+监管办法', domain: '监管', type: '部门规章', issuer: '国务院办公厅', effectiveDate: '2020-01-01', status: '有效' },
                    { name: '海南省"互联网+监管"实施细则', domain: '监管', type: '政府规章', issuer: '海南省人民政府', effectiveDate: '2021-03-01', status: '有效' },
                    { name: '关于加强事中事后监管的指导意见', domain: '监管', type: '国务院命令决定', issuer: '国务院', effectiveDate: '2019-09-01', status: '有效' },
                    { name: '产品质量法', domain: '监管', type: '法律', issuer: '全国人大常委会', effectiveDate: '2018-01-01', status: '有效' },
                    { name: '食品安全法', domain: '监管', type: '法律', issuer: '全国人大常委会', effectiveDate: '2021-04-29', status: '有效' },
                    { name: '特种设备安全法', domain: '监管', type: '法律', issuer: '全国人大常委会', effectiveDate: '2014-01-01', status: '有效' },
                    { name: '市场监督管理综合行政执法事项指导目录', domain: '监管', type: '部门规章', issuer: '市场监管总局', effectiveDate: '2022-01-01', status: '有效' },
                    { name: '海南省市场监督管理行政执法办法', domain: '监管', type: '政府规章', issuer: '海南省人民政府', effectiveDate: '2023-01-01', status: '有效' }
                ]
            },
            law: {
                name: '执法依据',
                chartData: [
                    { value: 280, name: '法律', itemStyle: { color: '#00d4ff' } },
                    { value: 650, name: '行政法规', itemStyle: { color: '#34c759' } },
                    { value: 1120, name: '地方性法规', itemStyle: { color: '#ff9500' } },
                    { value: 1560, name: '部门规章', itemStyle: { color: '#af52de' } },
                    { value: 760, name: '政府规章', itemStyle: { color: '#5856d6' } },
                    { value: 150, name: '国务院命令决定', itemStyle: { color: '#ff3b30' } }
                ],
                listData: [
                    { name: '行政处罚法', domain: '执法', type: '法律', issuer: '全国人大常委会', effectiveDate: '2021-07-15', status: '有效' },
                    { name: '行政强制法', domain: '执法', type: '法律', issuer: '全国人大常委会', effectiveDate: '2012-01-01', status: '有效' },
                    { name: '综合行政执法改革方案', domain: '执法', type: '国务院命令决定', issuer: '国务院', effectiveDate: '2018-01-01', status: '有效' },
                    { name: '海南省综合行政执法条例', domain: '执法', type: '地方性法规', issuer: '海南省人大常委会', effectiveDate: '2021-07-01', status: '有效' },
                    { name: '行政执法三项制度指导意见', domain: '执法', type: '部门规章', issuer: '司法部', effectiveDate: '2019-01-01', status: '有效' },
                    { name: '海南省行政执法公示办法', domain: '执法', type: '政府规章', issuer: '海南省人民政府', effectiveDate: '2022-01-01', status: '有效' },
                    { name: '行政复议法', domain: '执法', type: '法律', issuer: '全国人大常委会', effectiveDate: '2024-01-01', status: '有效' },
                    { name: '行政诉讼法', domain: '执法', type: '法律', issuer: '全国人大常委会', effectiveDate: '2017-07-01', status: '有效' },
                    { name: '行政执法监督条例', domain: '执法', type: '行政法规', issuer: '国务院', effectiveDate: '2023-01-01', status: '有效' },
                    { name: '海南省行政执法监督办法', domain: '执法', type: '政府规章', issuer: '海南省人民政府', effectiveDate: '2023-03-01', status: '有效' }
                ]
            },
            credit: {
                name: '信用依据',
                chartData: [
                    { value: 120, name: '法律', itemStyle: { color: '#00d4ff' } },
                    { value: 340, name: '行政法规', itemStyle: { color: '#34c759' } },
                    { value: 560, name: '地方性法规', itemStyle: { color: '#ff9500' } },
                    { value: 780, name: '部门规章', itemStyle: { color: '#af52de' } },
                    { value: 450, name: '政府规章', itemStyle: { color: '#5856d6' } },
                    { value: 80, name: '国务院命令决定', itemStyle: { color: '#ff3b30' } }
                ],
                listData: [
                    { name: '海南自由贸易港社会信用条例', domain: '信用', type: '地方性法规', issuer: '海南省人大常委会', effectiveDate: '2022-01-01', status: '有效' },
                    { name: '社会信用体系建设规划纲要', domain: '信用', type: '国务院命令决定', issuer: '国务院', effectiveDate: '2014-06-27', status: '有效' },
                    { name: '公共信用信息管理办法', domain: '信用', type: '部门规章', issuer: '国家发展改革委', effectiveDate: '2020-01-01', status: '有效' },
                    { name: '失信惩戒措施清单管理办法', domain: '信用', type: '部门规章', issuer: '国家发展改革委', effectiveDate: '2022-01-01', status: '有效' },
                    { name: '海南省公共信用信息管理办法', domain: '信用', type: '政府规章', issuer: '海南省人民政府', effectiveDate: '2021-01-01', status: '有效' },
                    { name: '企业信息公示暂行条例', domain: '信用', type: '行政法规', issuer: '国务院', effectiveDate: '2014-10-01', status: '有效' },
                    { name: '政府信息公开条例', domain: '信用', type: '行政法规', issuer: '国务院', effectiveDate: '2019-05-15', status: '有效' },
                    { name: '市场主体信用信息公示管理办法', domain: '信用', type: '部门规章', issuer: '市场监管总局', effectiveDate: '2022-03-01', status: '有效' },
                    { name: '海南省市场主体信用修复管理办法', domain: '信用', type: '政府规章', issuer: '海南省人民政府', effectiveDate: '2023-01-01', status: '有效' },
                    { name: '关于建立完善守信联合激励和失信联合惩戒制度的指导意见', domain: '信用', type: '国务院命令决定', issuer: '国务院', effectiveDate: '2016-05-30', status: '有效' }
                ]
            }
        };

        const overlay = document.createElement('div');
        overlay.className = 'detail-modal-overlay';
        overlay.innerHTML = `
            <div class="legal-modal-wide">
                <div class="legal-modal-content">
                    <div class="legal-modal-header">
                        <span class="legal-modal-title">法律法规全景分析</span>
                        <button class="legal-modal-close">×</button>
                    </div>
                    <div class="legal-modal-kpi">
                        <div class="legal-kpi-card">
                            <span class="legal-kpi-label">法律法规总数</span>
                            <span class="legal-kpi-value">3.6万部</span>
                        </div>
                        <div class="legal-kpi-card">
                            <span class="legal-kpi-label">审批依据</span>
                            <span class="legal-kpi-value">9,000部</span>
                        </div>
                        <div class="legal-kpi-card">
                            <span class="legal-kpi-label">监管依据</span>
                            <span class="legal-kpi-value">9,000部</span>
                        </div>
                        <div class="legal-kpi-card">
                            <span class="legal-kpi-label">执法依据</span>
                            <span class="legal-kpi-value">9,000部</span>
                        </div>
                        <div class="legal-kpi-card">
                            <span class="legal-kpi-label">信用依据</span>
                            <span class="legal-kpi-value">9,000部</span>
                        </div>
                    </div>
                    <div class="legal-modal-body">
                        <div class="legal-modal-tabs">
                            <div class="legal-tab-item active" data-tab="approval">审批依据</div>
                            <div class="legal-tab-item" data-tab="supervision">监管依据</div>
                            <div class="legal-tab-item" data-tab="law">执法依据</div>
                            <div class="legal-tab-item" data-tab="credit">信用依据</div>
                        </div>
                        <div class="legal-modal-chart">
                            <div id="legal-bar-chart" class="legal-chart-container"></div>
                        </div>
                        <div class="legal-modal-table-wrap">
                            <table class="legal-modal-table">
                                <thead>
                                    <tr>
                                        <th>法规名称</th>
                                        <th>法规类型</th>
                                        <th>发布机关</th>
                                        <th>施行日期</th>
                                        <th>效力状态</th>
                                    </tr>
                                </thead>
                                <tbody id="legal-table-body">
                                </tbody>
                            </table>
                            <div class="legal-modal-pagination">
                                <button class="legal-pagination-btn" id="legal-prev-btn" disabled>上一页</button>
                                <span class="legal-pagination-info" id="legal-page-info">第 1 / 2 页</span>
                                <button class="legal-pagination-btn" id="legal-next-btn">下一页</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const tabs = overlay.querySelectorAll('.legal-tab-item');
        const chartContainer = overlay.querySelector('#legal-bar-chart');
        const tableBody = overlay.querySelector('#legal-table-body');
        const prevBtn = overlay.querySelector('#legal-prev-btn');
        const nextBtn = overlay.querySelector('#legal-next-btn');
        const pageInfo = overlay.querySelector('#legal-page-info');

        let currentTab = 'approval';
        let currentPage = 1;
        const pageSize = 5;

        const renderChart = (tabId) => {
            const data = legalData[tabId];
            if (!data) return;
            
            if (window.legalBarChart) {
                window.legalBarChart.dispose();
            }
            
            window.legalBarChart = echarts.init(chartContainer);
            window.legalBarChart.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '8%', right: '4%', bottom: '8%', top: '10%', containLabel: true },
                xAxis: { 
                    type: 'category', 
                    data: data.chartData.map(d => d.name),
                    axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, rotate: 20 },
                    axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } }
                },
                yAxis: { 
                    type: 'value', 
                    axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
                    splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }
                },
                series: [{
                    type: 'bar',
                    data: data.chartData.map(d => ({ value: d.value, itemStyle: d.itemStyle })),
                    barWidth: '50%',
                    itemStyle: { borderRadius: [4, 4, 0, 0] }
                }]
            });
        };

        const renderTable = (tabId, page) => {
            const data = legalData[tabId];
            if (!data) return;
            
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const pageData = data.listData.slice(start, end);
            
            tableBody.innerHTML = pageData.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.type}</td>
                    <td>${item.issuer}</td>
                    <td>${item.effectiveDate}</td>
                    <td>${item.status}</td>
                </tr>
            `).join('');
            
            const totalPages = Math.ceil(data.listData.length / pageSize);
            pageInfo.textContent = `第 ${page} / ${totalPages} 页`;
            prevBtn.disabled = page <= 1;
            nextBtn.disabled = page >= totalPages;
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentTab = tab.dataset.tab;
                currentPage = 1;
                renderChart(currentTab);
                renderTable(currentTab, currentPage);
            });
        });

        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(currentTab, currentPage);
            }
        });

        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(legalData[currentTab].listData.length / pageSize);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(currentTab, currentPage);
            }
        });

        setTimeout(() => {
            renderChart(currentTab);
            renderTable(currentTab, currentPage);
        }, 100);

        this.bindLegalModalClose(overlay);
    }

    bindLegalModalClose(overlay) {
        overlay.querySelector('.legal-modal-close').addEventListener('click', () => {
            if (window.legalBarChart) {
                window.legalBarChart.dispose();
            }
            document.body.removeChild(overlay);
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                if (window.legalBarChart) {
                    window.legalBarChart.dispose();
                }
                document.body.removeChild(overlay);
            }
        });
    }

    openIntroModal() {
        const overlay = document.createElement('div');
        overlay.className = 'intro-modal-overlay';
        overlay.innerHTML = `
            <div class="intro-modal">
                <div class="intro-modal-header">
                    <span class="intro-modal-title">简介</span>
                    <button class="intro-modal-close">×</button>
                </div>
                <div class="intro-modal-content">
                    <div class="intro-modal-tabs-overlay">
                        <button class="intro-modal-tab active" data-type="panorama">全景图</button>
                        <button class="intro-modal-tab" data-type="flow">流程图</button>
                    </div>
                    <div id="intro-panorama" class="intro-modal-panel active">
                        <img src="审管法信.gif" class="intro-modal-image" alt="全景图">
                    </div>
                    <div id="intro-flow" class="intro-modal-panel">
                        <img src="流程图.gif" class="intro-modal-image" alt="流程图">
                    </div>
                </div>
                <div class="intro-modal-intro">
                    <p class="intro-modal-text">    我省从2022年开始推行"审管法信"一体联动工作机制（以下简称"审管法信"机制），通过审批监管高效联动，监管执法紧密衔接，信用赋能审批监管执法，强化了事中事后监管，有效激发了市场活力，成为具有海南自贸港辨识度的制度集成创新成果，被中央依法治国办作为法治建设案例和国家发展改革委作为信用审批案例进行推广。但在实践中，仍然存在权责不够清晰、职责衔接不畅、数据共享壁垒等问题，影响了改革成效。为落实《中共中央关于制定国民经济和社会发展第十五个五年规划的建议》关于坚持有效市场和有为政府相结合、形成既"放得活"又"管得好"的经济秩序精神，根据省委省政府工作部署和以案促改促治方案要求，省营商环境建设厅会同省司法厅等有关部门研究起草了《关于深入推进"审管法信"一体联动工作机制的意见（审议稿）》（以下简称《意见》），进一步整合行政资源、理顺权责关系、提升行政效能，助力打造市场化、法治化、国际化一流营商环境。</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        overlay.querySelector('.intro-modal-close').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        overlay.querySelectorAll('.intro-modal-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const type = tab.dataset.type;
                overlay.querySelectorAll('.intro-modal-tab').forEach(t => t.classList.remove('active'));
                overlay.querySelectorAll('.intro-modal-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`intro-${type}`).classList.add('active');
            });
        });
    }

    updateTabStyles() {
        const tabs = this.container.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === this.currentTab);
        });
    }

    transitionContent(oldTabId, newTabId) {
        setTimeout(() => {
            this.loadTab(newTabId);
        }, 200);
    }

    loadTab(tabId) {
        const contentContainer = this.container.querySelector('#tab-content');
        
        if (this.tabComponents[tabId]) {
            document.querySelectorAll('.page-wrapper').forEach(wrapper => {
                wrapper.classList.remove('active');
            });
            document.querySelector(`.page-wrapper.page-${tabId}`).classList.add('active');
            
            if (this.tabComponents[tabId].show) {
                this.tabComponents[tabId].show();
            }
            return;
        }

        const tabConfig = this.options.tabs.find(t => t.id === tabId);
        if (tabConfig && tabConfig.component) {
            const pageContainer = document.createElement('div');
            pageContainer.className = `page-wrapper page-${tabId} active`;
            contentContainer.appendChild(pageContainer);
            
            const component = new tabConfig.component(pageContainer);
            this.tabComponents[tabId] = component;
            
            if (tabId === 'supervision') {
                window.supervisionPage = component;
            }
            if (tabId === 'home') {
                window.homePage = component;
            }
            if (tabId === 'approval') {
                window.approvalPage = component;
            }
            if (tabId === 'law') {
                window.lawPage = component;
            }
            if (tabId === 'credit') {
                window.creditPage = component;
            }
            
            document.querySelectorAll('.page-wrapper').forEach(wrapper => {
                if (!wrapper.classList.contains(`page-${tabId}`)) {
                    wrapper.classList.remove('active');
                }
            });
        } else {
            contentContainer.innerHTML = `
                <div class="empty-state animate-slide-in">
                    <div class="empty-icon">📊</div>
                    <p class="empty-text">${tabConfig ? tabConfig.label : '该'}模块内容区域</p>
                    <p class="empty-hint">请在后续开发中添加指标数据</p>
                </div>
            `;
        }
    }

    registerTab(tabId, componentClass) {
        const tab = this.options.tabs.find(t => t.id === tabId);
        if (tab) {
            tab.component = componentClass;
        }
    }

    setTitle(title) {
        this.options.title = title;
        const titleEl = this.container.querySelector('.screen-title');
        if (titleEl) {
            titleEl.textContent = title;
        }
    }

    addTab(tabConfig) {
        this.options.tabs.push(tabConfig);
        this.render();
        this.bindEvents();
    }

    getTodayDate() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    getYearStartDate() {
        const now = new Date();
        const y = now.getFullYear();
        return `${y}-01-01`;
    }
};
