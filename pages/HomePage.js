window.HomePage = class HomePage {
    constructor(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container home-layout animate-slide-in">
                <div class="home-content">
                    <div class="home-left-col">
                        <div class="card-section activity-section">
                            <div class="card-title">市场主体</div>
                            <div class="activity-items">
                                <!-- 年度新增市场主体 分组 -->
                                <div class="activity-group">
                                    <div class="activity-item activity-parent">
                                        <span class="activity-label">年度新增市场主体</span>
                                        <span class="activity-value-group">
                                            <span class="activity-count">99</span>
                                            <span class="trend-up">↑ 1%</span>
                                        </span>
                                    </div>
                                    <div class="activity-sub-items">
                                        <div class="activity-item activity-sub">
                                            <span class="activity-label">迁入本省市场主体</span>
                                            <span class="activity-value-group">
                                                <span class="activity-count">99</span>
                                                <span class="activity-ratio">占比10%</span>
                                                <span class="trend-up">↑ 1%</span>
                                            </span>
                                        </div>
                                        <div class="activity-item activity-sub">
                                            <span class="activity-label">新设立市场主体</span>
                                            <span class="activity-value-group">
                                                <span class="activity-count">99</span>
                                                <span class="activity-ratio">占比10%</span>
                                                <span class="trend-up">↑ 1%</span>
                                            </span>
                                        </div>
                                        <div class="activity-item activity-sub">
                                            <span class="activity-label">新设市场主体"个转企"</span>
                                            <span class="activity-value-group">
                                                <span class="activity-count">99</span>
                                                <span class="activity-ratio">占比10%</span>
                                                <span class="trend-up">↑ 1%</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 年度减少市场主体 分组 -->
                                <div class="activity-group">
                                    <div class="activity-item activity-parent">
                                        <span class="activity-label">年度减少市场主体</span>
                                        <span class="activity-value-group">
                                            <span class="activity-count">99</span>
                                            <span class="trend-down">↓ 1%</span>
                                        </span>
                                    </div>
                                    <div class="activity-sub-items">
                                        <div class="activity-item activity-sub">
                                            <span class="activity-label">迁出本省市场主体</span>
                                            <span class="activity-value-group">
                                                <span class="activity-count">99</span>
                                                <span class="trend-down">↓ 1%</span>
                                            </span>
                                        </div>
                                        <div class="activity-item activity-sub">
                                            <span class="activity-label">市场主体注（吊）销</span>
                                            <span class="activity-value-group">
                                                <span class="activity-count">99</span>
                                                <span class="trend-up">↑ 1%</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 同级独立指标 -->
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
                        <div class="card-section satisfaction-section-bottom">
                            <div class="card-title">企业和群众满意度</div>
                            <div class="satisfaction-items">
                                <div class="satisfaction-item">
                                    <span class="satisfaction-label">"海易办"月活峰值</span>
                                    <span class="satisfaction-value-group">
                                        <span class="satisfaction-count">600万</span>
                                        <span class="satisfaction-ratio">占常住人口75%</span>
                                    </span>
                                </div>
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
                                        <span class="stat-label">建筑工程主要事项审批平均用时</span>
                                        <span class="stat-value">7h</span>
                                    </div>
                                </div>
                            </div>
                            <div class="map-container">
                                <div class="map-tab-overlay">
                                    <button class="map-tab-btn active">省直</button>
                                    <button class="map-tab-btn">市县</button>
                                </div>
                                <img src="地图.png" class="map-image" alt="海南地图">
                            </div>
                        </div>
                        <div class="card-section industry-section">
                            <div class="card-title">产业总体情况</div>
                            <div class="industry-grid">
                                <div class="industry-item">
                                    <div class="industry-title">产业分布</div>
                                    <div class="industry-tags">
                                        <span class="industry-tag">旅游业  9</span>
                                        <span class="industry-tag">现代服务业  8</span>
                                        <span class="industry-tag">高新技术产业  7</span>
                                        <span class="industry-tag">热带特色高效农业  3</span>
                                    </div>
                                </div>
                                <div class="industry-item">
                                    <div class="industry-title">梯度培育</div>
                                    <div class="industry-tags">
                                        <span class="industry-tag">企业规模  5</span>
                                        <span class="industry-tag">创新经营税收  21</span>
                                        <span class="industry-tag">创新专利  1</span>
                                        <span class="industry-tag">xxxx  1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="home-right-col">
                        <div class="card-section right-panel-section">
                            <div class="panel-group panel-grid">
                                <div class="panel-title">审批</div>
                                <div class="panel-items">
                                    <div class="panel-item">
                                        <span class="panel-label">高效办成"一件事"场景服务</span>
                                        <span class="panel-value">600项</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">"智能快办"场景服务</span>
                                        <span class="panel-value">200项</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">"极简审批"服务</span>
                                        <span class="panel-value">200项</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">信用等级审批服务</span>
                                        <span class="panel-value">200项</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">"全省通办"</span>
                                        <span class="panel-value">100项</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">零跑动事项数</span>
                                        <span class="panel-value">100项</span>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-group panel-grid">
                                <div class="panel-title">监管</div>
                                <div class="panel-items">
                                    <div class="panel-item panel-item-full">
                                        <span class="panel-label">审管法信数字链路</span>
                                        <span class="panel-value">45个领域 4664条</span>
                                    </div>
                                    <div class="panel-item panel-item-full">
                                        <span class="panel-label">通过链路办理业务</span>
                                        <span class="panel-value">99次</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">新型监管场景</span>
                                        <span class="panel-value">322个</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">减少企业上门数</span>
                                        <span class="panel-value">9639户次</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">规范行政检查行为</span>
                                        <span class="panel-value">199</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">问题检出率</span>
                                        <span class="panel-value">9%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-group">
                                <div class="panel-title">执法</div>
                                <div class="panel-items">
                                    <div class="panel-item-row">
                                        <div class="panel-item panel-item-half">
                                            <span class="panel-label">轻微免罚</span>
                                            <span class="panel-value">80</span>
                                        </div>
                                        <div class="panel-item panel-item-half">
                                            <span class="panel-label">首违不罚</span>
                                            <span class="panel-value">90</span>
                                        </div>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">重点领域违法发生率同比降幅</span>
                                        <span class="panel-value"> 20%</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">高风险主体违规行为发生率同比降幅</span>
                                        <span class="panel-value">5%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-group panel-grid">
                                <div class="panel-title">信用</div>
                                <div class="panel-items">
                                    <div class="panel-item">
                                        <span class="panel-label">信用应用场景数</span>
                                        <span class="panel-value">99</span>
                                    </div>
                                    <div class="panel-item">
                                        <span class="panel-label">信用场景应用次数</span>
                                        <span class="panel-value">256</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
