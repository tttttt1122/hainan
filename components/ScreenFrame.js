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
                        <button class="intro-tab" onclick="window.screenFrame.showIntroModal()">简介</button>
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