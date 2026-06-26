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
                    <h1 class="screen-title glow-text">${this.options.title}</h1>
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
        if (tabId === this.currentTab) return;

        const oldTab = this.currentTab;
        this.currentTab = tabId;

        this.updateTabStyles();
        this.transitionContent(oldTab, tabId);
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