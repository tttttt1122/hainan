window.ScreenFrame = class ScreenFrame {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`容器元素 ${containerId} 不存在`);
        }

        this.options = {
            title: '审管法信一体联动机制',
            tabs: [
                { id: 'home', label: '首页' },
                { id: 'approval', label: '审批' },
                { id: 'supervision', label: '监管' },
                { id: 'law', label: '执法' },
                { id: 'credit', label: '信用' },
                { id: 'cockpit', label: '监督处置' }
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

    render() {
        this.container.innerHTML = `
            <div class="screen-frame">
                <header class="screen-header">
                    <div class="screen-title-wrapper">
                        <div class="intro-tabs-container">
                            <button class="intro-tab" onclick="window.screenFrame.showIntroModal()">简介</button>
                            
                            <button class="intro-tab" onclick="window.screenFrame.showArchitectureModal()">架构图</button>
                            <button class="intro-tab" onclick="window.screenFrame.showModelModal()">预警模型</button>
                        </div>
                        <h1 class="screen-title glow-text">${this.options.title}</h1>
                        <div class="online-count">今日在线人数 <span class="online-num">99</span></div>
                    </div>
                    <div class="screen-header-divider"></div>
                    <div class="screen-header-bottom">
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
                    </div>
                </header>
                <main class="screen-content">
                    <div id="tab-content" class="tab-content"></div>
                </main>
            </div>
        `;
    }

    bindEvents() {
        const tabs = this.container.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                if (tabId) this.switchTab(tabId);
            });
        });

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

        this.updateTabStyles();
        this.transitionContent(oldTab, tabId);
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
