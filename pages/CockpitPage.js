window.CockpitPage = class CockpitPage {
    constructor(container) {
        this.container = container;
        this.currentTab = 'home';
        this.charts = {};
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container cockpit-layout animate-slide-in">
                <div class="cockpit-content">
                    <div class="cockpit-tab-content">
                        <div id="tab-home" class="cockpit-tab-pane active" style="display: grid">
                            <div class="cockpit-row">
                                <div class="card-section supervision-section">
                                    <div class="card-title">事项监督</div>
                                    <div class="supervision-stats">
                                        <div class="supervision-stat-row">
                                            <span class="stat-label">检查事项覆盖率</span>
                                            <span class="stat-value">98%</span>
                                        </div>
                                        <div class="supervision-stat-row">
                                            <span class="stat-label">处罚事项发生率</span>
                                            <span class="stat-value">5%</span>
                                        </div>
                                    </div>
                                    <div class="supervision-list">
                                        <div class="list-header">
                                            <span class="list-col">部门/区划</span>
                                            <span class="list-col">事项数</span>
                                            <span class="list-col">覆盖率</span>
                                        </div>
                                        <div class="list-row">
                                            <span class="list-col">海口</span>
                                            <span class="list-col">156</span>
                                            <span class="list-col">99%</span>
                                        </div>
                                        <div class="list-row">
                                            <span class="list-col">三亚</span>
                                            <span class="list-col">145</span>
                                            <span class="list-col">98%</span>
                                        </div>
                                        <div class="list-row">
                                            <span class="list-col">儋州</span>
                                            <span class="list-col">132</span>
                                            <span class="list-col">97%</span>
                                        </div>
                                    </div>
                                    
                                    <div class="home-sub-section">
                                        <div class="card-title">监督处置</div>
                                        <div class="oversight-grid">
                                            <div class="oversight-item">
                                                <span class="oversight-label">审批</span>
                                                <div class="oversight-values-row">
                                                    <span class="oversight-value">已处置 156</span>
                                                    <span class="oversight-value">未处置 2</span>
                                                </div>
                                            </div>
                                            <div class="oversight-item">
                                                <span class="oversight-label">监管</span>
                                                <div class="oversight-values-row">
                                                    <span class="oversight-value">已处置 145</span>
                                                    <span class="oversight-value">未处置 3</span>
                                                </div>
                                            </div>
                                            <div class="oversight-item">
                                                <span class="oversight-label">执法</span>
                                                <div class="oversight-values-row">
                                                    <span class="oversight-value">已处置 132</span>
                                                    <span class="oversight-value">未处置 1</span>
                                                </div>
                                            </div>
                                            <div class="oversight-item">
                                                <span class="oversight-label">信用</span>
                                                <div class="oversight-values-row">
                                                    <span class="oversight-value">已处置 167</span>
                                                    <span class="oversight-value">未处置 0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="oversight-list">
                                            <div class="list-header">
                                                <span class="list-col">部门/区划</span>
                                                <span class="list-col">总数</span>
                                                <span class="list-col">处置率</span>
                                            </div>
                                            <div class="list-row">
                                                <span class="list-col">海口</span>
                                                <span class="list-col">597</span>
                                                <span class="list-col">99%</span>
                                            </div>
                                            <div class="list-row">
                                                <span class="list-col">三亚</span>
                                                <span class="list-col">562</span>
                                                <span class="list-col">99%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-section map-risk-section">
                                    <div class="card-title">地图</div>
                                    <div class="map-container">
                                        <div class="map-tab-overlay">
                                            <button class="map-tab-btn active">省直</button>
                                            <button class="map-tab-btn">市县</button>
                                        </div>
                                        <img src="地图.png" class="map-image" alt="海南地图">
                                        <div class="risk-signal-overlay">
                                            <div class="risk-title">风险信号</div>
                                            <div class="risk-item">
                                                <span class="risk-label">时间</span>
                                                <span class="risk-value">2024-06-25</span>
                                            </div>
                                            <div class="risk-item">
                                                <span class="risk-label">部门</span>
                                                <span class="risk-value">市场监管局</span>
                                            </div>
                                            <div class="risk-item">
                                                <span class="risk-label">原因</span>
                                                <span class="risk-value">数据异常</span>
                                            </div>
                                            <div class="risk-action">处置</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-section behavior-section">
                                    <div class="card-title">行为监督</div>
                                    <div class="behavior-group">
                                        <div class="behavior-stats">
                                            <div class="behavior-item">
                                                <span class="behavior-label">上线模型数</span>
                                                <span class="behavior-value">15</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">问题发现数</span>
                                                <span class="behavior-value">234</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="behavior-group">
                                        <div class="group-title">【审批】</div>
                                        <div class="behavior-stats">
                                            <div class="behavior-item">
                                                <span class="behavior-label">审批超承诺期限工单量</span>
                                                <span class="behavior-value">12</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">审批材料反复退回补正次数</span>
                                                <span class="behavior-value">8</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">无依据不予受理件数</span>
                                                <span class="behavior-value">3</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="behavior-group">
                                        <div class="group-title">【监管】</div>
                                        <div class="behavior-stats">
                                            <div class="behavior-item">
                                                <span class="behavior-label">线下线索流转工单</span>
                                                <span class="behavior-value">56</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">高频率重复检查户数</span>
                                                <span class="behavior-value">23</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">线索材料退回平均次数</span>
                                                <span class="behavior-value">1.5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="behavior-group">
                                        <div class="group-title">【处罚】</div>
                                        <div class="behavior-stats">
                                            <div class="behavior-item">
                                                <span class="behavior-label">处罚办案超期</span>
                                                <span class="behavior-value">5</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">处罚公示超期</span>
                                                <span class="behavior-value">3</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">超出裁量标准</span>
                                                <span class="behavior-value">2</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">违规处罚撤销</span>
                                                <span class="behavior-value">1</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="behavior-group">
                                        <div class="group-title">【信用】</div>
                                        <div class="behavior-stats">
                                            <div class="behavior-item">
                                                <span class="behavior-label">失信信息公示滞后</span>
                                                <span class="behavior-value">4</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">联合惩戒应执行未执行主体数量</span>
                                                <span class="behavior-value">6</span>
                                            </div>
                                            <div class="behavior-item">
                                                <span class="behavior-label">信用修复超期办理</span>
                                                <span class="behavior-value">2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 指挥调度 - 地图正下方 -->
                            <div class="cockpit-row home-dispatch-row">
                                <div class="card-section dispatch-card-home">
                                    <div class="card-title">指挥调度</div>
                                    <div class="dispatch-content">
                                        <div class="dispatch-item">
                                            <span class="dispatch-label">指挥调度场景</span>
                                            <span class="dispatch-value">99</span>
                                        </div>
                                        <div class="dispatch-item">
                                            <span class="dispatch-label">指挥调度任务</span>
                                            <span class="dispatch-value">99</span>
                                        </div>
                                        <div class="dispatch-item">
                                            <span class="dispatch-label">调度达成率</span>
                                            <span class="dispatch-value">99%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 闭环跟踪 -->
                            <div class="cockpit-row">
                                <div class="card-section closed-loop-section full-width">
                                    <div class="card-title">审管法信闭环跟踪</div>
                                    <div class="closed-loop-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th rowspan="2">当事人名称</th>
                                                    <th colspan="5">审批</th>
                                                    <th colspan="2">监管</th>
                                                    <th colspan="5">执法</th>
                                                    <th colspan="2">信用</th>
                                                    <th rowspan="2">提醒督办</th>
                                                </tr>
                                                <tr>
                                                    <th>审批部门</th>
                                                    <th>审批类别</th>
                                                    <th>推送时间</th>
                                                    <th>发起(接收)部门</th>
                                                    <th>发起(接收)时间</th>
                                                    <th>监管方式</th>
                                                    <th>检查结果</th>
                                                    <th>推送时间</th>
                                                    <th>发起(接收)部门</th>
                                                    <th>发起(接收)时间</th>
                                                    <th>结果反馈</th>
                                                    <th>推送时间</th>
                                                    <th>处罚结果公示时间</th>
                                                    <th>反馈审管法时间</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td><button class="remind-btn">提醒督办</button><button class="push-btn">推送监管一张网</button></td>
                                                </tr>
                                                <tr>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td>xxx</td>
                                                    <td><button class="remind-btn">提醒督办</button><button class="push-btn">推送监管一张网</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab-matters" class="cockpit-tab-pane" style="display: none">
                                    <div class="cockpit-row">
                                        <div class="card-section matters-section matters-left-top">
                                            <div class="card-title">一、政务服务事项</div>
                                            <div class="matters-content">
                                                <div class="matters-main-stat">
                                                    <span class="matters-main-label">事项数量</span>
                                                    <span class="matters-main-value">99<span class="matters-main-unit">个</span></span>
                                                </div>
                                                <div class="matters-group">
                                                    <div class="group-title">1.按层级：</div>
                                                    <div id="matters-pyramid" class="matters-chart-container"></div>
                                                </div>
                                                <div class="matters-group">
                                                    <div class="group-title">2.按事项类型</div>
                                                    <div id="matters-pie" class="matters-chart-container"></div>
                                                </div>
                                                <div class="matters-group">
                                                    <div class="group-title">3.按即办件和承诺件</div>
                                                    <div class="matters-promise-row">
                                                        <div class="matters-promise-item">
                                                            <div class="matters-promise-label">即办件</div>
                                                            <div class="matters-promise-value">45</div>
                                                        </div>
                                                        <div class="matters-promise-item matters-promise-parent">
                                                            <div class="matters-promise-label">承诺件</div>
                                                            <div class="matters-promise-value">54</div>
                                                            <div class="matters-promise-children">
                                                                <div class="matters-promise-child">
                                                                    <span class="child-label">告知承诺制</span>
                                                                    <span class="child-value">9</span>
                                                                </div>
                                                                <div class="matters-promise-child">
                                                                    <span class="child-label">承诺即入制</span>
                                                                    <span class="child-value">9</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                <div class="card-section matters-section matters-center-top">
                                    <div class="card-title">二、事项关联情况</div>
                                    <div class="correlation-image-wrap">
                                        <img src="驾驶舱事项.png" class="correlation-img" alt="事项关联关系图">
                                    </div>
                                    <div class="correlation-map">
                                        <div class="map-tab-overlay">
                                            <button class="map-tab-btn active">省直</button>
                                            <button class="map-tab-btn">市县</button>
                                        </div>
                                        <img src="地图.png" class="map-image" alt="海南地图">
                                    </div>
                                </div>

                                <div class="card-section matters-section matters-right-top">
                                    <div class="card-title">三、监管执法事项</div>
                                    <div class="matters-content">
                                        <div class="matters-stat-row">
                                            <div class="matters-main-stat">
                                                <span class="matters-main-label">领域</span>
                                                <span class="matters-main-value">46<span class="matters-main-unit">个</span></span>
                                            </div>
                                            <div class="matters-main-stat">
                                                <span class="matters-main-label">总数</span>
                                                <span class="matters-main-value">6680<span class="matters-main-unit">项</span></span>
                                            </div>
                                        </div>
                                        <div class="matters-group matters-chart-row">
                                            <div class="matters-chart-half">
                                                <div class="group-title">事项分类</div>
                                                <div id="matters-enforce-pie1" class="matters-chart-container"></div>
                                            </div>
                                            <div class="matters-chart-half">
                                                <div class="group-title">行政检查：</div>
                                                <div id="matters-enforce-pie2" class="matters-chart-container"></div>
                                            </div>
                                        </div>
                                        <div class="matters-group">
                                            <div class="group-title">1.按层级展示：</div>
                                            <div id="matters-enforce-pyramid" class="matters-chart-container"></div>
                                        </div>
                                        <div class="matters-group matters-lists-row">
                                            <div class="matters-list-half">
                                                <div class="group-title">2.按区域展示</div>
                                                <div class="matters-list-table">
                                                    <div class="matters-list-row header">
                                                        <span>区划</span>
                                                        <span>办件数</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>海口市</span>
                                                        <span>2,358</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>三亚市</span>
                                                        <span>1,567</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>儋州市</span>
                                                        <span>1,234</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>琼海市</span>
                                                        <span>892</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>文昌市</span>
                                                        <span>756</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="matters-list-half">
                                                <div class="group-title">3.按部门展示</div>
                                                <div class="matters-list-table">
                                                    <div class="matters-list-row header">
                                                        <span>部门</span>
                                                        <span>办件数</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>市场监管局</span>
                                                        <span>3,456</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>行政审批局</span>
                                                        <span>2,789</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>人社局</span>
                                                        <span>1,856</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>资规局</span>
                                                        <span>1,432</span>
                                                    </div>
                                                    <div class="matters-list-row">
                                                        <span>住建局</span>
                                                        <span>1,123</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="cockpit-row">
                                <div class="card-section matters-section matters-left-bottom">
                                    <div class="card-title">四、行政审批制度改革事项</div>
                                    <div class="matters-content matters-reform-content">
                                        <div class="stat-card-horizontal reform-stat-card">
                                            <div class="stat-item">
                                                <span class="stat-label">高效办成一件事</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item">
                                                <span class="stat-label">极简审批</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item">
                                                <span class="stat-label">智能快办免申即享</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                        </div>
                                        <div class="stat-card-horizontal reform-stat-card">
                                            <div class="stat-item">
                                                <span class="stat-label">全省通办</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item">
                                                <span class="stat-label">便民简证</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item">
                                                <span class="stat-label">信用等级审批</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-section matters-section matters-center-bottom">
                                    <div class="card-title-row">
                                        <span class="card-title">三、高频审批/检查/处罚事项列表</span>
                                        <div class="matters-tabs" id="matters-tabs">
                                            <button class="matters-tab-btn active" data-tab="approval">审批</button>
                                            <button class="matters-tab-btn" data-tab="inspection">检查</button>
                                            <button class="matters-tab-btn" data-tab="penalty">处罚</button>
                                        </div>
                                    </div>
                                    <div class="matters-table" data-table="approval">
                                        <div class="table-header">
                                            <span class="table-col">事项名称</span>
                                            <span class="table-col">次数</span>
                                            <span class="table-col">领域</span>
                                            <span class="table-col">部门</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">企业注册登记</span>
                                            <span class="table-col">1234</span>
                                            <span class="table-col">市场监管</span>
                                            <span class="table-col">市监局</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">食品经营许可</span>
                                            <span class="table-col">567</span>
                                            <span class="table-col">食品药品</span>
                                            <span class="table-col">市监局</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">个体工商户登记</span>
                                            <span class="table-col">890</span>
                                            <span class="table-col">市场监管</span>
                                            <span class="table-col">市监局</span>
                                        </div>
                                    </div>
                                    <div class="matters-table" data-table="inspection" style="display:none">
                                        <div class="table-header">
                                            <span class="table-col">事项名称</span>
                                            <span class="table-col">次数</span>
                                            <span class="table-col">领域</span>
                                            <span class="table-col">部门</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">食品安全检查</span>
                                            <span class="table-col">987</span>
                                            <span class="table-col">食品药品</span>
                                            <span class="table-col">市监局</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">消防安全检查</span>
                                            <span class="table-col">734</span>
                                            <span class="table-col">消防安全</span>
                                            <span class="table-col">消防总队</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">特种设备检查</span>
                                            <span class="table-col">623</span>
                                            <span class="table-col">安全生产</span>
                                            <span class="table-col">应急厅</span>
                                        </div>
                                    </div>
                                    <div class="matters-table" data-table="penalty" style="display:none">
                                        <div class="table-header">
                                            <span class="table-col">事项名称</span>
                                            <span class="table-col">次数</span>
                                            <span class="table-col">领域</span>
                                            <span class="table-col">部门</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">无证经营处罚</span>
                                            <span class="table-col">456</span>
                                            <span class="table-col">市场监管</span>
                                            <span class="table-col">市监局</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">虚假广告处罚</span>
                                            <span class="table-col">312</span>
                                            <span class="table-col">广告监管</span>
                                            <span class="table-col">市监局</span>
                                        </div>
                                        <div class="table-row">
                                            <span class="table-col">环保违规处罚</span>
                                            <span class="table-col">278</span>
                                            <span class="table-col">环境保护</span>
                                            <span class="table-col">生态厅</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-section matters-section matters-right-bottom">
                                    <div class="card-title">五、覆盖率</div>
                                    <div class="matters-content">
                                        <div class="stat-card-horizontal">
                                            <div class="stat-item stat-item-row">
                                                <span class="stat-label">未覆盖事项（监管缺口）</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                        </div>
                                        <div class="matters-group">
                                            <div class="matters-list-table">
                                                <div class="matters-list-row header">
                                                    <span>事项名称</span>
                                                    <span>所属部门</span>
                                                    <span>检查次数</span>
                                                </div>
                                                <div class="matters-list-row">
                                                    <span>食品经营许可</span>
                                                    <span>市场监督管理局</span>
                                                    <span>1,234</span>
                                                </div>
                                                <div class="matters-list-row">
                                                    <span>环境影响评价</span>
                                                    <span>生态环境局</span>
                                                    <span>856</span>
                                                </div>
                                                <div class="matters-list-row">
                                                    <span>建筑工程施工许可</span>
                                                    <span>住房和城乡建设局</span>
                                                    <span>672</span>
                                                </div>
                                                <div class="matters-list-row">
                                                    <span>药品经营许可证</span>
                                                    <span>市场监督管理局</span>
                                                    <span>534</span>
                                                </div>
                                                <div class="matters-list-row">
                                                    <span>特种设备作业</span>
                                                    <span>市场监督管理局</span>
                                                    <span>423</span>
                                                </div>
                                                <div class="matters-list-row">
                                                    <span>排污许可证</span>
                                                    <span>生态环境局</span>
                                                    <span>367</span>
                                                </div>
                                                <div class="matters-list-row">
                                                    <span>其他事项</span>
                                                    <span>其他部门</span>
                                                    <span>1,594</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab-personnel" class="cockpit-tab-pane" style="display: none">
                            <div class="cockpit-row">
                                <div class="card-section personnel-section personnel-left">
                                    <div class="card-title">执法主体</div>
                                    <div class="personnel-card-blue">
                                        <div class="personnel-card-title">行政执法主体统计</div>
                                        <div id="personnel-bar1" class="personnel-chart-container"></div>
                                    </div>
                                    <div class="personnel-card-blue">
                                        <div class="personnel-card-title">行政执法主体总览</div>
                                        <div class="stat-card-horizontal">
                                            <div class="stat-item-row">
                                                <span class="stat-label">行政执法主体（个）</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item-row">
                                                <span class="stat-label">执法单位（个）</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="personnel-card-blue">
                                        <div class="personnel-card-title">所属执法领域统计</div>
                                        <div id="personnel-bar2" class="personnel-chart-container"></div>
                                    </div>
                                    <div class="personnel-chart-row">
                                        <div class="personnel-chart-item">
                                            <div class="chart-title">主体类别统计</div>
                                            <div id="personnel-pie1" class="chart-container pie-container"></div>
                                        </div>
                                        <div class="personnel-chart-item">
                                            <div class="chart-title">有无派出机构</div>
                                            <div id="personnel-pie2" class="chart-container pie-container"></div>
                                        </div>
                                        <div class="personnel-chart-item">
                                            <div class="chart-title">有挂牌机构</div>
                                            <div id="personnel-pie3" class="chart-container pie-container"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-section personnel-section personnel-center">
                                    <div class="personnel-map">
                                        <div class="map-tab-overlay">
                                            <button class="map-tab-btn active">省直</button>
                                            <button class="map-tab-btn">市县</button>
                                        </div>
                                        <img src="地图.png" class="map-image" alt="海南地图">
                                    </div>
                                    <div class="stat-card-horizontal">
                                        <div class="stat-item-row">
                                            <span class="stat-label">行政执法主体</span>
                                            <span class="stat-value">99</span>
                                        </div>
                                        <div class="stat-divider"></div>
                                        <div class="stat-item-row">
                                            <span class="stat-label">执法单位</span>
                                            <span class="stat-value">99</span>
                                        </div>
                                        <div class="stat-divider"></div>
                                        <div class="stat-item-row">
                                            <span class="stat-label">证件数</span>
                                            <span class="stat-value">99</span>
                                        </div>
                                    </div>
                                    <div class="stat-card-horizontal">
                                        <div class="stat-item-row">
                                            <span class="stat-label">新申请（人）</span>
                                            <span class="stat-value">999</span>
                                        </div>
                                        <div class="stat-divider"></div>
                                        <div class="stat-item-row">
                                            <span class="stat-label">换证（人）</span>
                                            <span class="stat-value">999</span>
                                        </div>
                                        <div class="stat-divider"></div>
                                        <div class="stat-item-row">
                                            <span class="stat-label">注销（人）</span>
                                            <span class="stat-value">999</span>
                                        </div>
                                    </div>
                                    <div class="personnel-card-blue">
                                        <div class="personnel-card-title">行政执法资格审批统计</div>
                                        <div id="personnel-line1" class="personnel-chart-container"></div>
                                    </div>
                                </div>

                                <div class="card-section personnel-section personnel-right">
                                    <div class="card-title">执法人员</div>
                                    <div class="personnel-card-blue">
                                        <div class="personnel-card-title">行政执法人员统计</div>
                                        <div id="personnel-bar3" class="personnel-chart-container"></div>
                                    </div>
                                    <div class="personnel-card-blue">
                                        <div class="personnel-card-title">行政执法人员总览</div>
                                        <div class="stat-card-horizontal">
                                            <div class="stat-item-row">
                                                <span class="stat-label">部委执法证</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item-row">
                                                <span class="stat-label">部委执法人员</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                        </div>
                                        <div class="stat-card-horizontal">
                                            <div class="stat-item-row">
                                                <span class="stat-label">行政执法人员</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item-row">
                                                <span class="stat-label">辅助执法人员</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="personnel-card-blue">
                                        <div class="personnel-card-title">所属执法领域统计</div>
                                        <div id="personnel-bar4" class="personnel-chart-container"></div>
                                    </div>
                                    <div class="personnel-chart-row">
                                        <div class="personnel-chart-item">
                                            <div class="chart-title">学历统计</div>
                                            <div id="personnel-pie4" class="chart-container pie-container"></div>
                                        </div>
                                        <div class="personnel-chart-item">
                                            <div class="chart-title">编制统计</div>
                                            <div id="personnel-pie5" class="chart-container pie-container"></div>
                                        </div>
                                        <div class="personnel-chart-item">
                                            <div class="chart-title">性别统计</div>
                                            <div id="personnel-pie6" class="chart-container pie-container"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab-behavior" class="cockpit-tab-pane" style="display: none">
                            <!-- 上排：处罚办案分析（左）+ 地图（中）+ 投诉举报分析（右） -->
                            <div class="cockpit-row">
                                <div class="card-section behavior-section behavior-penalty">
                                    <div class="card-title">处罚办案分析</div>
                                    <div class="behavior-charts-grid-vertical">
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">处罚办案超期</div>
                                            <div id="behavior-bar1" class="behavior-bar-chart"></div>
                                        </div>
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">处罚撤案</div>
                                            <div id="behavior-bar2" class="behavior-bar-chart"></div>
                                        </div>
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">处罚公示超期</div>
                                            <div id="behavior-bar3" class="behavior-bar-chart"></div>
                                        </div>
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">超出裁量标准</div>
                                            <div id="behavior-bar4" class="behavior-bar-chart"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-section behavior-section behavior-center">
                                    <div class="card-title">地图</div>
                                    <div class="map-container" style="position:relative;height:100%">
                                        <div class="map-tab-overlay">
                                            <button class="map-tab-btn active">省直</button>
                                            <button class="map-tab-btn">市县</button>
                                        </div>
                                        <img src="地图.png" class="map-image" alt="海南地图">
                                    </div>
                                </div>

                                <div class="card-section behavior-section behavior-complaint">
                                    <div class="card-title">投诉举报问题分析</div>
                                    <div class="behavior-charts-grid-vertical">
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">反复移交数量</div>
                                            <div id="behavior-bar5" class="behavior-bar-chart"></div>
                                        </div>
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">重复投诉数量</div>
                                            <div id="behavior-bar6" class="behavior-bar-chart"></div>
                                        </div>
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">处置超期数量</div>
                                            <div id="behavior-bar7" class="behavior-bar-chart"></div>
                                        </div>
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">投诉集中数量</div>
                                            <div id="behavior-bar8" class="behavior-bar-chart"></div>
                                        </div>
                                        <div class="behavior-chart-item">
                                            <div class="chart-mini-title">群众满意度</div>
                                            <div id="behavior-bar9" class="behavior-bar-chart"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 下排：行政许可办件分析（左）+ 行政检查案件分析（右），宽度相加=地图宽度 -->
                            <div class="cockpit-row behavior-bottom-row">
                                <div class="card-section behavior-section behavior-license">
                                    <div class="card-title">行政许可办件分析</div>
                                    <div class="behavior-list-container">
                                        <div class="behavior-list-item">
                                            <span class="list-item-label">超期办结</span>
                                            <span class="list-item-value">23</span>
                                        </div>
                                        <div class="behavior-list-item">
                                            <span class="list-item-label">告知承诺核查超期</span>
                                            <span class="list-item-value">15</span>
                                        </div>
                                        <div class="behavior-list-item">
                                            <span class="list-item-label">承诺即入制核查超期</span>
                                            <span class="list-item-value">8</span>
                                        </div>
                                        <div class="behavior-list-item">
                                            <span class="list-item-label">超边办结承诺期限</span>
                                            <span class="list-item-value">12</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-section behavior-section behavior-inspection">
                                    <div class="card-title">行政检查案件分析</div>
                                    <div class="behavior-list-container">
                                        <div class="behavior-list-item">
                                            <span class="list-item-label">重复检查</span>
                                            <span class="list-item-value">35</span>
                                        </div>
                                        <div class="behavior-list-item">
                                            <span class="list-item-label">未响应联合检查任务</span>
                                            <span class="list-item-value">18</span>
                                        </div>
                                        <div class="behavior-list-item">
                                            <span class="list-item-label">重点领域检查缺位</span>
                                            <span class="list-item-value">7</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cockpit-tab-nav">
                    <div class="cockpit-tab-item active" data-tab="home">主页</div>
                    <div class="cockpit-tab-item" data-tab="matters">事项</div>
                    <div class="cockpit-tab-item" data-tab="personnel">人员</div>
                    <div class="cockpit-tab-item" data-tab="behavior">行为</div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // 先清除旧的事件监听器，避免重复绑定
        if (this._boundHandler) {
            this.container.removeEventListener('click', this._boundHandler);
        }

        this._boundHandler = (e) => {
            // 高频事项列表选卡切换
            const mattersTabBtn = e.target.closest('.matters-tab-btn');
            if (mattersTabBtn) {
                e.stopPropagation();
                e.preventDefault();
                const tab = mattersTabBtn.dataset.tab;
                if (tab) this.switchMattersTab(tab);
                return;
            }

            const tabItem = e.target.closest('.cockpit-tab-item');
            if (!tabItem) return;
            e.stopPropagation();
            e.preventDefault();
            const tab = tabItem.dataset.tab;
            if (tab) this.switchTab(tab);
        };

        this.container.addEventListener('click', this._boundHandler);
    }

    switchMattersTab(tab) {
        // 更新按钮状态
        const buttons = this.container.querySelectorAll('.matters-tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = this.container.querySelector(`.matters-tab-btn[data-tab="${tab}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // 切换表格显示
        const tables = this.container.querySelectorAll('.matters-table[data-table]');
        tables.forEach(t => t.style.display = 'none');
        const activeTable = this.container.querySelector(`.matters-table[data-table="${tab}"]`);
        if (activeTable) activeTable.style.display = '';
    }

    initPersonnelPieCharts() {
        const initPie = (id, data) => {
            const el = document.getElementById(id);
            if (!el) return;
            
            if (this.charts[id]) {
                this.charts[id].dispose();
            }
            
            el.style.height = '100px';
            const chart = echarts.init(el);
            this.charts[id] = chart;
            
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                series: [{
                    type: 'pie',
                    radius: ['45%', '65%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 4,
                        borderColor: '#0a1628',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 500,
                        formatter: '{b}\n{c}'
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }]
            };
            chart.setOption(option);
        };

        const initBar = (id, data, color) => {
            const el = document.getElementById(id);
            if (!el) return;
            
            if (this.charts[id]) {
                this.charts[id].dispose();
            }
            
            el.style.height = '120px';
            el.style.width = '100%';
            
            const chart = echarts.init(el);
            this.charts[id] = chart;
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                },
                grid: { left: '5%', right: '5%', top: '15%', bottom: '20%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: data.map(d => d.name),
                    axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                    axisLabel: { 
                        color: '#fff', 
                        fontSize: 10,
                        interval: 0,
                        rotate: data.length > 4 ? 20 : 0
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                    axisLabel: { color: '#fff', fontSize: 10 },
                    splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
                },
                series: [{
                    type: 'bar',
                    barWidth: '50%',
                    data: data.map(d => d.value),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: color },
                            { offset: 1, color: color + '88' }
                        ]),
                        borderRadius: [4, 4, 0, 0]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#fff',
                        fontSize: 10
                    }
                }]
            };
            chart.setOption(option);
        };

        const initLine = (id, categories, seriesData) => {
            const el = document.getElementById(id);
            if (!el) return;
            
            if (this.charts[id]) {
                this.charts[id].dispose();
            }
            
            el.style.height = '120px';
            el.style.width = '100%';
            
            const chart = echarts.init(el);
            this.charts[id] = chart;
            
            const colors = ['#00d4ff', '#00ff88', '#ff6b6b', '#ffd93d', '#c084fc'];
            
            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: seriesData.map(s => s.name),
                    textStyle: { color: '#fff', fontSize: 10 },
                    top: 0,
                    itemWidth: 12,
                    itemHeight: 8
                },
                grid: { left: '5%', right: '5%', top: '25%', bottom: '15%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: categories,
                    axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                    axisLabel: { color: '#fff', fontSize: 10 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                    axisLabel: { color: '#fff', fontSize: 10 },
                    splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
                },
                series: seriesData.map((s, idx) => ({
                    name: s.name,
                    type: 'line',
                    data: s.data,
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: { color: colors[idx % colors.length], width: 2 },
                    itemStyle: { color: colors[idx % colors.length] }
                }))
            };
            chart.setOption(option);
        };

        // 各区划主体数柱状图
        initBar('personnel-bar1', [
            { name: '海口市', value: 28 },
            { name: '三亚市', value: 18 },
            { name: '儋州市', value: 12 },
            { name: '琼海市', value: 9 },
            { name: '其他', value: 32 }
        ], '#00d4ff');

        // 各领域执法主体数柱状图
        initBar('personnel-bar2', [
            { name: '市场监管', value: 25 },
            { name: '生态环境', value: 18 },
            { name: '交通运输', value: 15 },
            { name: '城市建设', value: 12 },
            { name: '其他', value: 29 }
        ], '#00ff88');

        // 各区划主体数柱状图（执法人员）
        initBar('personnel-bar3', [
            { name: '海口市', value: 35 },
            { name: '三亚市', value: 22 },
            { name: '儋州市', value: 15 },
            { name: '琼海市', value: 10 },
            { name: '其他', value: 17 }
        ], '#ff6b6b');

        // 各领域执法人员数柱状图
        initBar('personnel-bar4', [
            { name: '市场监管', value: 32 },
            { name: '生态环境', value: 22 },
            { name: '交通运输', value: 18 },
            { name: '城市建设', value: 14 },
            { name: '其他', value: 13 }
        ], '#ffd93d');

        // 申请、变更、注销、到期换证、跨区执法折线图
        initLine('personnel-line1', 
            ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            [
                { name: '申请', data: [120, 132, 101, 134, 90, 230, 210, 180, 230, 250, 220, 280] },
                { name: '变更', data: [80, 92, 71, 94, 60, 150, 130, 110, 160, 170, 150, 190] },
                { name: '注销', data: [50, 62, 51, 74, 50, 80, 90, 70, 100, 110, 90, 120] },
                { name: '到期换证', data: [30, 42, 31, 54, 30, 60, 70, 50, 80, 90, 70, 100] },
                { name: '跨区执法', data: [20, 32, 21, 44, 20, 50, 60, 40, 70, 80, 60, 90] }
            ]
        );

        initPie('personnel-pie1', [
            { value: 60, name: '行政机关', itemStyle: { color: '#00d4ff' } },
            { value: 30, name: '事业单位', itemStyle: { color: '#00ff88' } },
            { value: 10, name: '其他', itemStyle: { color: '#ff6b6b' } }
        ]);

        initPie('personnel-pie2', [
            { value: 75, name: '有', itemStyle: { color: '#00d4ff' } },
            { value: 25, name: '无', itemStyle: { color: '#6bcbff' } }
        ]);

        initPie('personnel-pie3', [
            { value: 60, name: '有', itemStyle: { color: '#00d4ff' } },
            { value: 40, name: '无', itemStyle: { color: '#6bcbff' } }
        ]);

        initPie('personnel-pie4', [
            { value: 30, name: '本科', itemStyle: { color: '#00d4ff' } },
            { value: 25, name: '硕士', itemStyle: { color: '#00ff88' } },
            { value: 20, name: '专科', itemStyle: { color: '#ffd93d' } },
            { value: 15, name: '博士', itemStyle: { color: '#c084fc' } },
            { value: 10, name: '其他', itemStyle: { color: '#6bcbff' } }
        ]);

        initPie('personnel-pie5', [
            { value: 70, name: '编制内', itemStyle: { color: '#00d4ff' } },
            { value: 30, name: '编外', itemStyle: { color: '#00ff88' } }
        ]);

        initPie('personnel-pie6', [
            { value: 65, name: '男', itemStyle: { color: '#00d4ff' } },
            { value: 35, name: '女', itemStyle: { color: '#ff6b6b' } }
        ]);
    }

    initBehaviorBarCharts() {
        const initBar = (id, data, color) => {
            const el = document.getElementById(id);
            if (!el) return;
            
            if (this.charts[id]) {
                this.charts[id].dispose();
            }
            
            el.style.height = '90px';
            el.style.width = '100%';
            
            const chart = echarts.init(el);
            this.charts[id] = chart;
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                },
                grid: { left: '5%', right: '5%', top: '15%', bottom: '20%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: data.map(d => d.name),
                    axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                    axisLabel: { 
                        color: '#fff', 
                        fontSize: 10,
                        interval: 0,
                        rotate: data.length > 4 ? 20 : 0
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
                    axisLabel: { color: '#fff', fontSize: 10 },
                    splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
                },
                series: [{
                    type: 'bar',
                    barWidth: '50%',
                    data: data.map(d => d.value),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: color },
                            { offset: 1, color: color + '88' }
                        ]),
                        borderRadius: [4, 4, 0, 0]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#fff',
                        fontSize: 10
                    }
                }]
            };
            chart.setOption(option);
        };

        // 处罚办案分析柱状图
        initBar('behavior-bar1', [
            { name: '海口', value: 18 },
            { name: '三亚', value: 12 },
            { name: '儋州', value: 9 },
            { name: '琼海', value: 7 },
            { name: '其他', value: 15 }
        ], '#00d4ff');

        initBar('behavior-bar2', [
            { name: '海口', value: 5 },
            { name: '三亚', value: 3 },
            { name: '儋州', value: 4 },
            { name: '琼海', value: 2 },
            { name: '其他', value: 6 }
        ], '#00ff88');

        initBar('behavior-bar3', [
            { name: '海口', value: 8 },
            { name: '三亚', value: 6 },
            { name: '儋州', value: 5 },
            { name: '琼海', value: 3 },
            { name: '其他', value: 9 }
        ], '#ff6b6b');

        initBar('behavior-bar4', [
            { name: '海口', value: 4 },
            { name: '三亚', value: 2 },
            { name: '儋州', value: 3 },
            { name: '琼海', value: 1 },
            { name: '其他', value: 5 }
        ], '#ffd93d');

        // 投诉举报问题分析柱状图
        initBar('behavior-bar5', [
            { name: '海口', value: 12 },
            { name: '三亚', value: 8 },
            { name: '儋州', value: 6 },
            { name: '其他', value: 10 }
        ], '#00d4ff');

        initBar('behavior-bar6', [
            { name: '海口', value: 25 },
            { name: '三亚', value: 18 },
            { name: '儋州', value: 15 },
            { name: '其他', value: 22 }
        ], '#00ff88');

        initBar('behavior-bar7', [
            { name: '海口', value: 7 },
            { name: '三亚', value: 5 },
            { name: '儋州', value: 4 },
            { name: '其他', value: 9 }
        ], '#ff6b6b');

        initBar('behavior-bar8', [
            { name: '海口', value: 15 },
            { name: '三亚', value: 11 },
            { name: '儋州', value: 9 },
            { name: '其他', value: 13 }
        ], '#ffd93d');

        initBar('behavior-bar9', [
            { name: '海口', value: 95 },
            { name: '三亚', value: 92 },
            { name: '儋州', value: 88 },
            { name: '其他', value: 90 }
        ], '#6bcbff');
    }

    switchTab(tab) {
        if (!tab) return;
        this.currentTab = tab;
        
        const containerEl = this.container;
        
        // 更新 tab 按钮高亮
        const tabItems = containerEl.querySelectorAll('.cockpit-tab-item');
        tabItems.forEach(item => item.classList.remove('active'));
        const activeTab = containerEl.querySelector(`.cockpit-tab-item[data-tab="${tab}"]`);
        if (activeTab) activeTab.classList.add('active');
        
        // 用内联 style 切换显示，绕过所有 CSS 优先级问题
        const tabPanes = containerEl.querySelectorAll('.cockpit-tab-pane');
        tabPanes.forEach(pane => {
            pane.style.display = 'none';
            pane.classList.remove('active');
        });
        const activePane = containerEl.querySelector(`#tab-${tab}`);
        if (activePane) {
            // home 和 behavior 使用 grid 布局，matters 和 personnel 使用 flex 布局
            const displayType = (tab === 'home' || tab === 'behavior') ? 'grid' : 'flex';
            activePane.style.display = displayType;
            activePane.classList.add('active');
        }

        if (tab === 'personnel') {
            this.initPersonnelPieCharts();
        } else if (tab === 'behavior') {
            this.initBehaviorBarCharts();
        } else if (tab === 'matters') {
            this.initMattersCharts();
        }

        // resize 所有已存在的图表
        Object.values(this.charts).forEach(chart => {
            try { chart.resize(); } catch(e) {}
        });
    }

    initMattersCharts() {
        // 金字塔图 - 按层级
        const pyramidEl = document.getElementById('matters-pyramid');
        if (pyramidEl) {
            if (this.charts['matters-pyramid']) {
                this.charts['matters-pyramid'].dispose();
            }
            const chart = echarts.init(pyramidEl);
            this.charts['matters-pyramid'] = chart;
            
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}'
                },
                series: [{
                    type: 'funnel',
                    left: '10%',
                    top: 10,
                    bottom: 10,
                    width: '80%',
                    min: 0,
                    max: 40,
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside',
                        color: '#fff',
                        fontSize: 11,
                        formatter: '{b}\n{c}'
                    },
                    itemStyle: {
                        borderColor: '#0a1628',
                        borderWidth: 1
                    },
                    data: [
                        { value: 38, name: '区县级', itemStyle: { color: '#00d4ff' } },
                        { value: 25, name: '市级', itemStyle: { color: '#0099cc' } },
                        { value: 24, name: '街镇级', itemStyle: { color: '#007799' } },
                        { value: 12, name: '省级', itemStyle: { color: '#005566' } }
                    ]
                }]
            };
            chart.setOption(option);
        }

        // 饼图 - 按事项类型
        const pieEl = document.getElementById('matters-pie');
        if (pieEl) {
            if (this.charts['matters-pie']) {
                this.charts['matters-pie'].dispose();
            }
            const chart = echarts.init(pieEl);
            this.charts['matters-pie'] = chart;
            
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                series: [{
                    type: 'pie',
                    radius: ['35%', '65%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#fff',
                        fontSize: 10,
                        formatter: '{b}:{c}'
                    },
                    data: [
                        { value: 28, name: '行政许可', itemStyle: { color: '#00d4ff' } },
                        { value: 12, name: '行政确认', itemStyle: { color: '#0099cc' } },
                        { value: 5, name: '行政裁决', itemStyle: { color: '#007799' } },
                        { value: 8, name: '行政奖励', itemStyle: { color: '#005566' } },
                        { value: 6, name: '行政给付', itemStyle: { color: '#4da6ff' } },
                        { value: 18, name: '其他权力', itemStyle: { color: '#66b3ff' } },
                        { value: 22, name: '公共服务', itemStyle: { color: '#99ccff' } }
                    ]
                }]
            };
            chart.setOption(option);
        }

        // 饼图 - 事项分类（监管执法）
        const enforcePie1El = document.getElementById('matters-enforce-pie1');
        if (enforcePie1El) {
            if (this.charts['matters-enforce-pie1']) {
                this.charts['matters-enforce-pie1'].dispose();
            }
            const chart = echarts.init(enforcePie1El);
            this.charts['matters-enforce-pie1'] = chart;
            
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                series: [{
                    type: 'pie',
                    radius: ['35%', '65%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#fff',
                        fontSize: 10,
                        formatter: '{b}:{c}'
                    },
                    data: [
                        { value: 35, name: '行政检查', itemStyle: { color: '#00d4ff' } },
                        { value: 28, name: '行政处罚', itemStyle: { color: '#0099cc' } },
                        { value: 12, name: '行政强制', itemStyle: { color: '#007799' } },
                        { value: 25, name: '其它', itemStyle: { color: '#4da6ff' } }
                    ]
                }]
            };
            chart.setOption(option);
        }

        // 饼图 - 行政检查
        const enforcePie2El = document.getElementById('matters-enforce-pie2');
        if (enforcePie2El) {
            if (this.charts['matters-enforce-pie2']) {
                this.charts['matters-enforce-pie2'].dispose();
            }
            const chart = echarts.init(enforcePie2El);
            this.charts['matters-enforce-pie2'] = chart;
            
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                series: [{
                    type: 'pie',
                    radius: ['35%', '65%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#fff',
                        fontSize: 10,
                        formatter: '{b}:{c}'
                    },
                    data: [
                        { value: 45, name: '双随机一公开', itemStyle: { color: '#00d4ff' } },
                        { value: 32, name: '重点监管', itemStyle: { color: '#0099cc' } },
                        { value: 68, name: '日常检查', itemStyle: { color: '#007799' } },
                        { value: 15, name: '信用监管', itemStyle: { color: '#4da6ff' } }
                    ]
                }]
            };
            chart.setOption(option);
        }

        // 金字塔图 - 按层级展示（监管执法）
        const enforcePyramidEl = document.getElementById('matters-enforce-pyramid');
        if (enforcePyramidEl) {
            if (this.charts['matters-enforce-pyramid']) {
                this.charts['matters-enforce-pyramid'].dispose();
            }
            const chart = echarts.init(enforcePyramidEl);
            this.charts['matters-enforce-pyramid'] = chart;
            
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}'
                },
                series: [{
                    type: 'funnel',
                    left: '10%',
                    top: 10,
                    bottom: 10,
                    width: '80%',
                    min: 0,
                    max: 40,
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside',
                        color: '#fff',
                        fontSize: 11,
                        formatter: '{b}\n{c}'
                    },
                    itemStyle: {
                        borderColor: '#0a1628',
                        borderWidth: 1
                    },
                    data: [
                        { value: 38, name: '区县级', itemStyle: { color: '#00d4ff' } },
                        { value: 25, name: '市级', itemStyle: { color: '#0099cc' } },
                        { value: 24, name: '街镇级', itemStyle: { color: '#007799' } },
                        { value: 12, name: '省级', itemStyle: { color: '#005566' } }
                    ]
                }]
            };
            chart.setOption(option);
        }
    }

    show() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = '';  // 恢复 CSS 定义的 flex 布局
        
        // 重新绑定事件，防止 DOM 被重建后监听器丢失
        this.bindEvents();

        setTimeout(() => {
            if (this.currentTab === 'personnel') {
                this.initPersonnelPieCharts();
            } else if (this.currentTab === 'behavior') {
                this.initBehaviorBarCharts();
            } else if (this.currentTab === 'matters') {
                this.initMattersCharts();
            }
            Object.values(this.charts).forEach(chart => {
                try { chart.resize(); } catch(e) {}
            });
        }, 300);
    }

    hide() {
        const el = this.container.querySelector('.page-container');
        if (el) el.style.display = 'none';
    }
};
