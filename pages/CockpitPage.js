window.CockpitPage = class CockpitPage {
    constructor(container) {
        this.container = container;
        this.currentTab = 'home';
        this.charts = {};
        this.cpModalData = [];
        this.cpCurrentPage = 1;
        this.cpCurrentModal = 0;
        this.pageSize = 10;
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
                                        <div class="supervision-stat-row cp-clickable" data-cp-modal="1">
                                            <span class="stat-label">检查事项覆盖率</span>
                                            <span class="stat-value">98%</span>
                                        </div>
                                        <div class="supervision-stat-row cp-clickable" data-cp-modal="2">
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
                                            <div class="oversight-item cp-clickable" data-cp-modal="3">
                                                <span class="oversight-label">审批</span>
                                                <div class="oversight-values-row">
                                                    <span class="oversight-value">已处置 156</span>
                                                    <span class="oversight-value">未处置 2</span>
                                                </div>
                                            </div>
                                            <div class="oversight-item cp-clickable" data-cp-modal="4">
                                                <span class="oversight-label">监管</span>
                                                <div class="oversight-values-row">
                                                    <span class="oversight-value">已处置 145</span>
                                                    <span class="oversight-value">未处置 3</span>
                                                </div>
                                            </div>
                                            <div class="oversight-item cp-clickable" data-cp-modal="5">
                                                <span class="oversight-label">执法</span>
                                                <div class="oversight-values-row">
                                                    <span class="oversight-value">已处置 132</span>
                                                    <span class="oversight-value">未处置 1</span>
                                                </div>
                                            </div>
                                            <div class="oversight-item cp-clickable" data-cp-modal="6">
                                                <span class="oversight-label">信用</span>
                                                <div class="oversight-values-row">
                                                    <span class="oversight-value">已处置 167</span>
                                                    <span class="oversight-value">未处置 0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="oversight-list cp-clickable" data-cp-modal="7">
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
                                            <div class="behavior-item cp-clickable" data-cp-modal="11">
                                                <span class="behavior-label">上线模型数</span>
                                                <span class="behavior-value">15</span>
                                            </div>
                                            <div class="behavior-item cp-clickable" data-cp-modal="12">
                                                <span class="behavior-label">问题发现数</span>
                                                <span class="behavior-value">234</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="behavior-group cp-clickable" data-cp-modal="13">
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
                                    <div class="behavior-group cp-clickable" data-cp-modal="14">
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
                                    <div class="behavior-group cp-clickable" data-cp-modal="15">
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
                                    <div class="behavior-group cp-clickable" data-cp-modal="16">
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
                                        <div class="dispatch-item cp-clickable" data-cp-modal="8">
                                            <span class="dispatch-label">指挥调度场景</span>
                                            <span class="dispatch-value">99</span>
                                        </div>
                                        <div class="dispatch-item cp-clickable" data-cp-modal="9">
                                            <span class="dispatch-label">指挥调度任务</span>
                                            <span class="dispatch-value">99</span>
                                        </div>
                                        <div class="dispatch-item cp-clickable" data-cp-modal="10">
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
                                                <div class="matters-main-stat cp-clickable" data-cp-modal="17">
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
                                                    <div class="matters-promise-row cp-clickable" data-cp-modal="18">
                                                        <div class="matters-promise-item">
                                                            <div class="matters-promise-label">即办件</div>
                                                            <div class="matters-promise-value">45</div>
                                                        </div>
                                                        <div class="matters-promise-item matters-promise-parent">
                                                            <div class="matters-promise-label">承诺件</div>
                                                            <div class="matters-promise-value">54</div>
                                                            <div class="matters-promise-children cp-clickable" data-cp-modal="19">
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
                                            <div class="matters-main-stat cp-clickable" data-cp-modal="26">
                                                <span class="matters-main-label">领域</span>
                                                <span class="matters-main-value">46<span class="matters-main-unit">个</span></span>
                                            </div>
                                            <div class="matters-main-stat cp-clickable" data-cp-modal="27">
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
                                            <div class="stat-item cp-clickable" data-cp-modal="20">
                                                <span class="stat-label">高效办成一件事</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item cp-clickable" data-cp-modal="21">
                                                <span class="stat-label">极简审批</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item cp-clickable" data-cp-modal="22">
                                                <span class="stat-label">智能快办免申即享</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                        </div>
                                        <div class="stat-card-horizontal reform-stat-card">
                                            <div class="stat-item cp-clickable" data-cp-modal="23">
                                                <span class="stat-label">全省通办</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item cp-clickable" data-cp-modal="24">
                                                <span class="stat-label">便民简证</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item cp-clickable" data-cp-modal="25">
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
                                            <div class="stat-item stat-item-row cp-clickable" data-cp-modal="28">
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
                                            <div class="stat-item-row cp-clickable" data-cp-modal="29">
                                                <span class="stat-label">行政执法主体（个）</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item-row cp-clickable" data-cp-modal="30">
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
                                        <div class="stat-item-row cp-clickable" data-cp-modal="29">
                                            <span class="stat-label">行政执法主体</span>
                                            <span class="stat-value">99</span>
                                        </div>
                                        <div class="stat-divider"></div>
                                        <div class="stat-item-row cp-clickable" data-cp-modal="30">
                                            <span class="stat-label">执法单位</span>
                                            <span class="stat-value">99</span>
                                        </div>
                                        <div class="stat-divider"></div>
                                        <div class="stat-item-row cp-clickable" data-cp-modal="31">
                                            <span class="stat-label">证件数</span>
                                            <span class="stat-value">99</span>
                                        </div>
                                    </div>
                                    <div class="stat-card-horizontal cp-clickable" data-cp-modal="32">
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
                                            <div class="stat-item-row cp-clickable" data-cp-modal="33">
                                                <span class="stat-label">部委执法证</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item-row cp-clickable" data-cp-modal="34">
                                                <span class="stat-label">部委执法人员</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                        </div>
                                        <div class="stat-card-horizontal">
                                            <div class="stat-item-row cp-clickable" data-cp-modal="35">
                                                <span class="stat-label">行政执法人员</span>
                                                <span class="stat-value">99</span>
                                            </div>
                                            <div class="stat-divider"></div>
                                            <div class="stat-item-row cp-clickable" data-cp-modal="36">
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
                                        <div class="behavior-list-item cp-clickable" data-cp-modal="37">
                                            <span class="list-item-label">超期办结</span>
                                            <span class="list-item-value">23</span>
                                        </div>
                                        <div class="behavior-list-item cp-clickable" data-cp-modal="38">
                                            <span class="list-item-label">告知承诺核查超期</span>
                                            <span class="list-item-value">15</span>
                                        </div>
                                        <div class="behavior-list-item cp-clickable" data-cp-modal="41">
                                            <span class="list-item-label">承诺即入制核查超期</span>
                                            <span class="list-item-value">8</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-section behavior-section behavior-inspection">
                                    <div class="card-title">行政检查案件分析</div>
                                    <div class="behavior-list-container">
                                        <div class="behavior-list-item cp-clickable" data-cp-modal="39">
                                            <span class="list-item-label">重复检查</span>
                                            <span class="list-item-value">35</span>
                                        </div>
                                        <div class="behavior-list-item cp-clickable" data-cp-modal="40">
                                            <span class="list-item-label">未响应联合检查任务</span>
                                            <span class="list-item-value">18</span>
                                        </div>
                                        <div class="behavior-list-item cp-clickable" data-cp-modal="43">
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
        if (this._boundHandler) {
            this.container.removeEventListener('click', this._boundHandler);
        }

        this._boundHandler = (e) => {
            const mattersTabBtn = e.target.closest('.matters-tab-btn');
            if (mattersTabBtn) {
                e.stopPropagation();
                e.preventDefault();
                const tab = mattersTabBtn.dataset.tab;
                if (tab) this.switchMattersTab(tab);
                return;
            }

            const cpModalTarget = e.target.closest('[data-cp-modal]');
            if (cpModalTarget) {
                e.stopPropagation();
                const modalId = parseInt(cpModalTarget.dataset.cpModal);
                if (modalId >= 1 && modalId <= 43) {
                    this['openCpModal' + modalId]();
                }
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

    _cpColor(idx) {
        const colors = ['#00d4ff', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5856d6', '#ffd54f', '#2196f3'];
        return colors[idx % colors.length];
    }

    _cpTheme(m) {
        const map = {1:'default',2:'default',3:'default',4:'default',5:'default',6:'green',7:'default',8:'default',9:'default',10:'green',11:'default',12:'default',13:'orange',14:'default',15:'orange'};
        return map[m] || 'default';
    }

    _cpTitle(m) {
        const map = {
            1:'检查事项覆盖率分析', 2:'处罚事项发生率分析', 3:'审批类监督处置分析',
            4:'监管类监督处置分析', 5:'执法类监督处置分析', 6:'信用类监督处置分析',
            7:'监督处置综合排名分析', 8:'指挥调度场景分析', 9:'指挥调度任务分析',
            10:'调度达成率分析', 11:'上线模型运行全景', 12:'问题发现总览',
            13:'审批类行为监督明细', 14:'监管类行为监督明细', 15:'处罚类行为监督明细',
            16:'信用类行为监督明细', 17:'政务服务事项全景分析', 18:'即办件与承诺件分析',
            19:'告知承诺制与承诺即入制分析', 20:'高效办成一件事分析', 21:'极简审批事项分析',
            22:'智能快办与免申即享分析', 23:'全省通办事项分析', 24:'便民简证事项分析',
            25:'信用等级审批分析', 26:'监管执法领域分析', 27:'监管执法事项清单分析',
            28:'监管缺口分析（未覆盖事项）', 29:'行政执法主体全景分析', 30:'执法单位全景分析',
            31:'行政执法证件管理分析', 32:'执法证件动态分析', 33:'部委执法证持有情况分析',
            34:'部委执法人员分析', 35:'行政执法人员全景分析', 36:'辅助执法人员分析',
            37:'超期办结分析', 38:'告知承诺核查超期分析', 39:'重复检查分析',
            40:'未响应联合检查任务分析', 41:'承诺即入制核查超期分析',
            43:'重点领域检查缺位分析'
        };
        return map[m] || '';
    }

    _cpClose(overlay) {
        const ids = [];
        for (let i = 1; i <= 43; i++) {
            ids.push('cpc' + i, 'cpc' + i + 'b');
        }
        ids.forEach(id => { try { const d = document.getElementById(id); if (d) { const inst = echarts.getInstanceByDom(d); if (inst) inst.dispose(); } } catch(e) {} });
        if (overlay) overlay.remove();
        this.cpCurrentModal = 0;
        this.cpCurrentPage = 1;
    }

    _cpBindPages(overlay) {
        const prev = overlay.querySelector('.cp-page-prev');
        const next = overlay.querySelector('.cp-page-next');
        if (prev) prev.addEventListener('click', () => { if (this.cpCurrentPage > 1) { this.cpCurrentPage--; this._cpUpdate(overlay); } });
        if (next) next.addEventListener('click', () => {
            const total = Math.ceil(this.cpModalData.length / this.pageSize);
            if (this.cpCurrentPage < total) { this.cpCurrentPage++; this._cpUpdate(overlay); }
        });
    }

    _cpUpdate(overlay) {
        const m = this.cpCurrentModal;
        if (m < 1 || m > 43) return;
        overlay.innerHTML = this['_cpHtml' + m]();
        this._cpBindPages(overlay);
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this._cpClose(overlay));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this._cpClose(overlay); });
        requestAnimationFrame(() => { requestAnimationFrame(() => { setTimeout(() => { this['_cpChart' + m](); }, 200); }); });
    }

    _cpOpen(m, data) {
        this.cpCurrentPage = 1;
        this.cpCurrentModal = m;
        this.cpModalData = data;
        const overlay = document.createElement('div');
        overlay.className = 'rv-modal-overlay cp-theme-' + this._cpTheme(m);
        overlay.innerHTML = this['_cpHtml' + m]();
        document.body.appendChild(overlay);
        this._cpBindPages(overlay);
        overlay.querySelector('.rv-modal-close').addEventListener('click', () => this._cpClose(overlay));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this._cpClose(overlay); });
        requestAnimationFrame(() => { requestAnimationFrame(() => { setTimeout(() => { this['_cpChart' + m](); }, 200); }); });
    }

    _cpRenderCard(label, value, cls) {
        return `<div class="rv-stat-card"><span class="rv-stat-label">${label}</span><span class="rv-stat-value${cls ? ' ' + cls : ''}">${value}</span></div>`;
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

    // ============ MODAL 1: 检查事项覆盖率 ============
    genCp1Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return areas.map((area, i) => {
            const total = Math.floor(Math.random() * 200) + 100;
            const covered = Math.floor(Math.random() * total * 0.98) + Math.ceil(total * 0.85);
            return {
                id: i + 1,
                area: area,
                total: total,
                covered: Math.min(covered, total),
                uncovered: Math.max(0, total - covered),
                penaltyRate: (Math.random() * 8 + 2).toFixed(1),
                rate: ((covered / total) * 100).toFixed(1)
            };
        });
    }

    openCpModal1() { this._cpOpen(1, this.genCp1Data()); }

    _cpHtml1() {
        const data = this.cpModalData;
        const total = data.reduce((s, d) => s + d.total, 0);
        const covered = data.reduce((s, d) => s + d.covered, 0);
        const uncovered = data.reduce((s, d) => s + d.uncovered, 0);
        const penaltyRate = (data.reduce((s, d) => s + parseFloat(d.penaltyRate), 0) / data.length).toFixed(1);
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(1)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row" style="justify-content:space-between;">
                        ${this._cpRenderCard('检查事项覆盖率', '98%', 'highlight', 'flex:1;margin:0 5px;')}
                        ${this._cpRenderCard('已覆盖事项数', `${covered.toLocaleString()}项`, '', 'flex:1;margin:0 5px;')}
                        ${this._cpRenderCard('未覆盖事项数', `${uncovered.toLocaleString()}项`, '', 'flex:1;margin:0 5px;')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区事项覆盖情况</div><div id="cpc1" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">事项类型分布</div><div id="cpc1b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>市/区名称</th><th>事项总数</th><th>已覆盖数</th><th>覆盖率(%)</th><th>未覆盖事项数</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.area}</td><td>${d.total}</td><td>${d.covered}</td><td>${d.rate}</td><td>${d.uncovered}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart1() {
        const data = this.cpModalData;
        
        const c1 = echarts.init(document.getElementById('cpc1'));
        c1.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['已覆盖', '未覆盖'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: data.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '已覆盖', stack: 'total', data: data.map(d => d.covered), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '未覆盖', stack: 'total', data: data.map(d => d.uncovered), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } }
            ]
        });

        const c1b = echarts.init(document.getElementById('cpc1b'));
        c1b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 35, name: '行政检查', itemStyle: { color: '#00d4ff' } },
                    { value: 30, name: '行政处罚', itemStyle: { color: '#34c759' } },
                    { value: 20, name: '行政强制', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '其他', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 2: 处罚事项发生率 ============
    genCp2Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const types = ['市场监管', '生态环境', '交通运输', '卫生健康', '教育', '住房城乡建设', '自然资源', '文化旅游'];
        return Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            name: `处罚事项${i + 1}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            type: types[Math.floor(Math.random() * types.length)],
            basis: '相关法律法规',
            count: Math.floor(Math.random() * 50) + 5,
            date: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
        }));
    }

    openCpModal2() { this._cpOpen(2, this.genCp2Data()); }

    _cpHtml2() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(2)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('处罚事项发生率', '5%', 'highlight')}
                        ${this._cpRenderCard('发生处罚事项数', '64项')}
                        ${this._cpRenderCard('未发生处罚事项数', '1,222项')}
                        ${this._cpRenderCard('较上季度', '↓0.8%', 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">近6个月处罚事项发生率趋势</div><div id="cpc2" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各领域处罚事项发生情况</div><div id="cpc2b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>所属领域</th><th>处罚依据</th><th>发生次数</th><th>最近发生日期</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.basis}</td><td>${d.count}</td><td>${d.date}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart2() {
        const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
        const rates = [6.2, 5.8, 5.5, 5.2, 5.0, 5.0];
        
        const c2 = echarts.init(document.getElementById('cpc2'));
        c2.setOption({
            tooltip: { trigger: 'axis' },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: months, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, formatter: '{value}%' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'line', smooth: true, data: rates,
                lineStyle: { color: '#ff9500', width: 2 },
                itemStyle: { color: '#ff9500' },
                symbol: 'circle', symbolSize: 8,
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{c}%' }
            }]
        });

        const types = ['市场监管', '生态环境', '交通运输', '卫生健康', '教育', '住房城乡建设', '自然资源', '文化旅游'];
        const typeData = types.map(t => ({ name: t, value: Math.floor(Math.random() * 40) + 10 }));
        
        const c2b = echarts.init(document.getElementById('cpc2b'));
        c2b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: typeData.map(d => d.name), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: typeData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#ff9500'},{offset:1,color:'rgba(255,149,0,0.3)'}]), borderRadius: [4,4,0,0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 3: 审批类监督处置 ============
    genCp3Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `SP${String(i + 1).padStart(6, '0')}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            name: `审批事项${i + 1}`,
            receiveTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 09:00`,
            status: Math.random() > 0.02 ? '已处置' : '未处置',
            disposeTime: Math.random() > 0.02 ? `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 17:00` : '-'
        }));
    }

    openCpModal3() { this._cpOpen(3, this.genCp3Data()); }

    _cpHtml3() {
        const data = this.cpModalData;
        const total = data.length;
        const disposed = data.filter(d => d.status === '已处置').length;
        const pending = total - disposed;
        const rate = ((disposed / total) * 100).toFixed(1);
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(3)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('审批类工单总数', `${total}件`)}
                        ${this._cpRenderCard('已处置', `${disposed}件`, 'positive')}
                        ${this._cpRenderCard('处置率', `${rate}%`, 'highlight')}
                        ${this._cpRenderCard('未处置', `${pending}件`, 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">处置状态分布</div><div id="cpc3" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区审批类处置情况</div><div id="cpc3b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>工单编号</th><th>市/区</th><th>事项名称</th><th>接收时间</th><th>处置状态</th><th>处置时间</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.area}</td><td>${d.name}</td><td>${d.receiveTime}</td><td><span class="rv-status ${d.status === '已处置' ? 'positive' : 'negative'}">${d.status}</span></td><td>${d.disposeTime}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart3() {
        const data = this.cpModalData;
        const disposed = data.filter(d => d.status === '已处置').length;
        const pending = data.length - disposed;
        const rate = ((disposed / data.length) * 100).toFixed(1);

        const c3 = echarts.init(document.getElementById('cpc3'));
        c3.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [
                    { value: disposed, name: '已处置', itemStyle: { color: '#34c759' } },
                    { value: pending, name: '未处置', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: false },
                labelLine: { show: false },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
        c3.setOption({ title: { text: rate + '%', subtext: '处置率', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#fff' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => {
            const areaItems = data.filter(d => d.area === area);
            return { area, disposed: areaItems.filter(d => d.status === '已处置').length, pending: areaItems.length - areaItems.filter(d => d.status === '已处置').length };
        });

        const c3b = echarts.init(document.getElementById('cpc3b'));
        c3b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['已处置', '未处置'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '已处置', stack: 'total', data: areaData.map(d => d.disposed), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '未处置', stack: 'total', data: areaData.map(d => d.pending), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 4: 监管类监督处置 ============
    genCp4Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return Array.from({ length: 45 }, (_, i) => ({
            id: i + 1,
            code: `JG${String(i + 1).padStart(6, '0')}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            target: `监管对象${i + 1}`,
            receiveTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 09:00`,
            status: Math.random() > 0.03 ? '已处置' : '未处置',
            disposeTime: Math.random() > 0.03 ? `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 17:00` : '-'
        }));
    }

    openCpModal4() { this._cpOpen(4, this.genCp4Data()); }

    _cpHtml4() {
        const data = this.cpModalData;
        const total = data.length;
        const disposed = data.filter(d => d.status === '已处置').length;
        const pending = total - disposed;
        const rate = ((disposed / total) * 100).toFixed(1);
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(4)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('监管类工单总数', `${total}件`)}
                        ${this._cpRenderCard('已处置', `${disposed}件`, 'positive')}
                        ${this._cpRenderCard('处置率', `${rate}%`, 'highlight')}
                        ${this._cpRenderCard('未处置', `${pending}件`, 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">处置状态分布</div><div id="cpc4" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区监管类处置情况</div><div id="cpc4b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>工单编号</th><th>市/区</th><th>监管对象</th><th>接收时间</th><th>处置状态</th><th>处置时间</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.area}</td><td>${d.target}</td><td>${d.receiveTime}</td><td><span class="rv-status ${d.status === '已处置' ? 'positive' : 'negative'}">${d.status}</span></td><td>${d.disposeTime}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart4() {
        const data = this.cpModalData;
        const disposed = data.filter(d => d.status === '已处置').length;
        const pending = data.length - disposed;
        const rate = ((disposed / data.length) * 100).toFixed(1);

        const c4 = echarts.init(document.getElementById('cpc4'));
        c4.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [
                    { value: disposed, name: '已处置', itemStyle: { color: '#34c759' } },
                    { value: pending, name: '未处置', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: false },
                labelLine: { show: false },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
        c4.setOption({ title: { text: rate + '%', subtext: '处置率', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#fff' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => {
            const areaItems = data.filter(d => d.area === area);
            return { area, disposed: areaItems.filter(d => d.status === '已处置').length, pending: areaItems.length - areaItems.filter(d => d.status === '已处置').length };
        });

        const c4b = echarts.init(document.getElementById('cpc4b'));
        c4b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['已处置', '未处置'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '已处置', stack: 'total', data: areaData.map(d => d.disposed), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '未处置', stack: 'total', data: areaData.map(d => d.pending), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 5: 执法类监督处置 ============
    genCp5Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return Array.from({ length: 40 }, (_, i) => ({
            id: i + 1,
            code: `ZF${String(i + 1).padStart(6, '0')}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            item: `执法事项${i + 1}`,
            receiveTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 09:00`,
            status: Math.random() > 0.01 ? '已处置' : '未处置',
            disposeTime: Math.random() > 0.01 ? `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 17:00` : '-'
        }));
    }

    openCpModal5() { this._cpOpen(5, this.genCp5Data()); }

    _cpHtml5() {
        const data = this.cpModalData;
        const total = data.length;
        const disposed = data.filter(d => d.status === '已处置').length;
        const pending = total - disposed;
        const rate = ((disposed / total) * 100).toFixed(1);
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(5)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('执法类工单总数', `${total}件`)}
                        ${this._cpRenderCard('已处置', `${disposed}件`, 'positive')}
                        ${this._cpRenderCard('处置率', `${rate}%`, 'highlight')}
                        ${this._cpRenderCard('未处置', `${pending}件`, 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">处置状态分布</div><div id="cpc5" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区执法类处置情况</div><div id="cpc5b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>工单编号</th><th>市/区</th><th>执法事项</th><th>接收时间</th><th>处置状态</th><th>处置时间</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.area}</td><td>${d.item}</td><td>${d.receiveTime}</td><td><span class="rv-status ${d.status === '已处置' ? 'positive' : 'negative'}">${d.status}</span></td><td>${d.disposeTime}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart5() {
        const data = this.cpModalData;
        const disposed = data.filter(d => d.status === '已处置').length;
        const pending = data.length - disposed;
        const rate = ((disposed / data.length) * 100).toFixed(1);

        const c5 = echarts.init(document.getElementById('cpc5'));
        c5.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [
                    { value: disposed, name: '已处置', itemStyle: { color: '#34c759' } },
                    { value: pending, name: '未处置', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: false },
                labelLine: { show: false },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
        c5.setOption({ title: { text: rate + '%', subtext: '处置率', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#fff' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => {
            const areaItems = data.filter(d => d.area === area);
            return { area, disposed: areaItems.filter(d => d.status === '已处置').length, pending: areaItems.length - areaItems.filter(d => d.status === '已处置').length };
        });

        const c5b = echarts.init(document.getElementById('cpc5b'));
        c5b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['已处置', '未处置'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '已处置', stack: 'total', data: areaData.map(d => d.disposed), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '未处置', stack: 'total', data: areaData.map(d => d.pending), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 6: 信用类监督处置 ============
    genCp6Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return Array.from({ length: 60 }, (_, i) => ({
            id: i + 1,
            code: `XY${String(i + 1).padStart(6, '0')}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            subject: `信用主体${i + 1}`,
            receiveTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 09:00`,
            status: '已处置',
            disposeTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 17:00`
        }));
    }

    openCpModal6() { this._cpOpen(6, this.genCp6Data()); }

    _cpHtml6() {
        const data = this.cpModalData;
        const total = data.length;
        const disposed = total;
        const rate = '100';
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(6)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('信用类工单总数', `${total}件`)}
                        ${this._cpRenderCard('已处置', `${disposed}件`, 'positive')}
                        ${this._cpRenderCard('处置率', `${rate}%`, 'highlight')}
                        ${this._cpRenderCard('未处置', '0件')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">处置状态分布</div><div id="cpc6" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区信用类处置情况</div><div id="cpc6b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>工单编号</th><th>市/区</th><th>信用主体</th><th>接收时间</th><th>处置状态</th><th>处置时间</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.area}</td><td>${d.subject}</td><td>${d.receiveTime}</td><td><span class="rv-status positive">${d.status}</span></td><td>${d.disposeTime}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart6() {
        const data = this.cpModalData;
        const disposed = data.length;

        const c6 = echarts.init(document.getElementById('cpc6'));
        c6.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [{ value: disposed, name: '已处置', itemStyle: { color: '#34c759' } }],
                label: { show: false },
                labelLine: { show: false },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
        c6.setOption({ title: { text: '100%', subtext: '处置率', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#34c759' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => {
            const areaItems = data.filter(d => d.area === area);
            return { area, disposed: areaItems.filter(d => d.status === '已处置').length, pending: areaItems.length - areaItems.filter(d => d.status === '已处置').length };
        });

        const c6b = echarts.init(document.getElementById('cpc6b'));
        c6b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['已处置', '未处置'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '已处置', stack: 'total', data: areaData.map(d => d.disposed), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '未处置', stack: 'total', data: areaData.map(d => d.pending), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 7: 监督处置综合排名 ============
    genCp7Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return areas.map((area, i) => {
            const total = Math.floor(Math.random() * 200) + 100;
            const disposed = Math.floor(Math.random() * total * 0.02) + total - Math.ceil(total * 0.02);
            return {
                id: i + 1,
                area: area,
                total: total,
                disposed: Math.min(disposed, total),
                pending: Math.max(0, total - disposed),
                rate: ((disposed / total) * 100).toFixed(1)
            };
        }).sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate)).map((d, i) => ({ ...d, rank: i + 1 }));
    }

    openCpModal7() { this._cpOpen(7, this.genCp7Data()); }

    _cpHtml7() {
        const data = this.cpModalData;
        const total = data.reduce((s, d) => s + d.total, 0);
        const disposed = data.reduce((s, d) => s + d.disposed, 0);
        const pending = data.reduce((s, d) => s + d.pending, 0);
        const rate = ((disposed / total) * 100).toFixed(1);
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(7)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('监督处置总工单数', `${total.toLocaleString()}件`)}
                        ${this._cpRenderCard('总处置率', `${rate}%`, 'highlight')}
                        ${this._cpRenderCard('已处置', `${disposed.toLocaleString()}件`, 'positive')}
                        ${this._cpRenderCard('未处置', `${pending}件`, 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区监督处置总数排行</div><div id="cpc7" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">监督处置工单类型分布</div><div id="cpc7b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>市/区名称</th><th>工单总数(件)</th><th>已处置数(件)</th><th>未处置数(件)</th><th>处置率(%)</th><th>综合排名</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.area}</td><td>${d.total}</td><td>${d.disposed}</td><td>${d.pending}</td><td>${d.rate}</td><td>${d.rank}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart7() {
        const data = this.cpModalData;

        const c7 = echarts.init(document.getElementById('cpc7'));
        c7.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: data.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: data.map(d => ({ value: d.total, itemStyle: { color: parseFloat(d.rate) >= 99 ? '#34c759' : parseFloat(d.rate) >= 98 ? '#ff9500' : '#ff3b30', borderRadius: [4, 4, 0, 0] } })),
                barWidth: '50%',
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c7b = echarts.init(document.getElementById('cpc7b'));
        c7b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 13.6, name: '审批', itemStyle: { color: '#00d4ff' } },
                    { value: 12.8, name: '监管', itemStyle: { color: '#34c759' } },
                    { value: 11.5, name: '执法', itemStyle: { color: '#ff9500' } },
                    { value: 14.4, name: '信用', itemStyle: { color: '#af52de' } },
                    { value: 47.7, name: '其他', itemStyle: { color: '#5856d6' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 8: 指挥调度场景 ============
    genCp8Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const types = ['常态化', '应急', '专项'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `调度场景${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            area: areas[Math.floor(Math.random() * areas.length)],
            createTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            dispatchCount: Math.floor(Math.random() * 50) + 5,
            status: Math.random() > 0.1 ? '启用' : '停用'
        }));
    }

    openCpModal8() { this._cpOpen(8, this.genCp8Data()); }

    _cpHtml8() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(8)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('调度场景总数', '99个')}
                        ${this._cpRenderCard('常态化场景', '56个')}
                        ${this._cpRenderCard('应急场景', '28个')}
                        ${this._cpRenderCard('专项场景', '15个')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">调度场景类型分布</div><div id="cpc8" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区调度场景分布</div><div id="cpc8b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>场景名称</th><th>场景类型</th><th>所属区域</th><th>创建时间</th><th>调度次数</th><th>状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.area}</td><td>${d.createTime}</td><td>${d.dispatchCount}</td><td><span class="rv-status ${d.status === '启用' ? 'positive' : 'negative'}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart8() {
        const c8 = echarts.init(document.getElementById('cpc8'));
        c8.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 28, name: '应急处置', itemStyle: { color: '#ff3b30' } },
                    { value: 25, name: '日常监管', itemStyle: { color: '#00d4ff' } },
                    { value: 20, name: '重大活动保障', itemStyle: { color: '#34c759' } },
                    { value: 15, name: '专项整治', itemStyle: { color: '#ff9500' } },
                    { value: 12, name: '其他', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const data = this.cpModalData;
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => {
            const items = data.filter(d => d.area === area);
            return {
                area: area,
                normal: items.filter(d => d.type === '常态化').length,
                emergency: items.filter(d => d.type === '应急').length,
                special: items.filter(d => d.type === '专项').length
            };
        });

        const c8b = echarts.init(document.getElementById('cpc8b'));
        c8b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['常态化', '应急', '专项'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '常态化', stack: 'total', data: areaData.map(d => d.normal), itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '应急', stack: 'total', data: areaData.map(d => d.emergency), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '专项', stack: 'total', data: areaData.map(d => d.special), itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 9: 指挥调度任务 ============
    genCp9Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const scenes = ['日常监管', '应急处置', '重大活动保障', '专项整治'];
        const statuses = ['已完成', '进行中', '已逾期'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `调度任务${i + 1}`,
            scene: scenes[Math.floor(Math.random() * scenes.length)],
            area: areas[Math.floor(Math.random() * areas.length)],
            issueTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 09:00`,
            deadline: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 17:00`,
            status: statuses[Math.random() > 0.87 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    openCpModal9() { this._cpOpen(9, this.genCp9Data()); }

    _cpHtml9() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(9)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('调度任务总数', '99个')}
                        ${this._cpRenderCard('已完成', '87个', 'positive')}
                        ${this._cpRenderCard('进行中', '10个')}
                        ${this._cpRenderCard('已逾期', '2个', 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">任务完成状态分布</div><div id="cpc9" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区调度任务分布</div><div id="cpc9b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>任务名称</th><th>关联场景</th><th>承办市/区</th><th>下达时间</th><th>限办时间</th><th>任务状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.scene}</td><td>${d.area}</td><td>${d.issueTime}</td><td>${d.deadline}</td><td><span class="rv-status ${d.status === '已完成' ? 'positive' : d.status === '已逾期' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart9() {
        const data = this.cpModalData;
        const completed = data.filter(d => d.status === '已完成').length;
        const inProgress = data.filter(d => d.status === '进行中').length;
        const overdue = data.filter(d => d.status === '已逾期').length;
        const rate = ((completed / data.length) * 100).toFixed(1);

        const c9 = echarts.init(document.getElementById('cpc9'));
        c9.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [
                    { value: completed, name: '已完成', itemStyle: { color: '#34c759' } },
                    { value: inProgress, name: '进行中', itemStyle: { color: '#ff9500' } },
                    { value: overdue, name: '已逾期', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: false },
                labelLine: { show: false },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
        c9.setOption({ title: { text: rate + '%', subtext: '完成率', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#fff' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => {
            const items = data.filter(d => d.area === area);
            return {
                area: area,
                completed: items.filter(d => d.status === '已完成').length,
                inProgress: items.filter(d => d.status === '进行中').length,
                overdue: items.filter(d => d.status === '已逾期').length
            };
        });

        const c9b = echarts.init(document.getElementById('cpc9b'));
        c9b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['已完成', '进行中', '已逾期'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '已完成', stack: 'total', data: areaData.map(d => d.completed), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '进行中', stack: 'total', data: areaData.map(d => d.inProgress), itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '已逾期', stack: 'total', data: areaData.map(d => d.overdue), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 10: 调度达成率 ============
    genCp10Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return areas.map((area, i) => {
            const total = Math.floor(Math.random() * 50) + 20;
            const completed = Math.floor(Math.random() * total * 0.02) + total - 2;
            return {
                id: i + 1,
                area: area,
                total: Math.min(total, 88),
                completed: Math.min(completed, total),
                rate: ((completed / total) * 100).toFixed(1),
                reason: completed < total ? '任务难度较大' : '-'
            };
        });
    }

    openCpModal10() { this._cpOpen(10, this.genCp10Data()); }

    _cpHtml10() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(10)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('调度达成率', '99%', 'highlight')}
                        ${this._cpRenderCard('达成任务数', '87个', 'positive')}
                        ${this._cpRenderCard('总任务数', '88个')}
                        ${this._cpRenderCard('未达成任务数', '1个', 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">调度达成率</div><div id="cpc10" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区调度达成率</div><div id="cpc10b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>市/区名称</th><th>总任务数</th><th>已完成任务数</th><th>达成率(%)</th><th>未达成原因</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.area}</td><td>${d.total}</td><td>${d.completed}</td><td>${d.rate}</td><td>${d.reason}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart10() {
        const c10 = echarts.init(document.getElementById('cpc10'));
        c10.setOption({
            series: [{
                type: 'gauge', radius: '90%', center: ['50%', '50%'],
                startAngle: 200, endAngle: -20,
                min: 0, max: 100, splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        width: 15,
                        color: [[1, '#34c759']]
                    }
                },
                pointer: { itemStyle: { color: '#fff' }, width: 4, length: '60%' },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                title: { show: false },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    color: '#fff',
                    fontSize: 32,
                    fontWeight: 'bold',
                    offsetCenter: [0, '20%']
                },
                data: [{ value: 99, name: '达成率' }]
            }]
        });

        const data = this.cpModalData;
        const c10b = echarts.init(document.getElementById('cpc10b'));
        c10b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: data.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', max: 100, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, formatter: '{value}%' }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: data.map(d => parseFloat(d.rate)), barWidth: '50%',
                itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{c}%' }
            }]
        });
    }

    // ============ MODAL 11: 上线模型运行全景 ============
    genCp11Data() {
        const types = ['审批', '监管', '处罚', '信用'];
        const statuses = ['正常', '异常', '维护中'];
        return Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            name: `模型${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            onlineTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.85 ? Math.random() > 0.5 ? 2 : 1 : 0],
            problemCount: Math.floor(Math.random() * 100) + 10
        }));
    }

    openCpModal11() { this._cpOpen(11, this.genCp11Data()); }

    _cpHtml11() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(11)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('上线模型总数', '15个', 'highlight')}
                        ${this._cpRenderCard('审批类', '4个')}
                        ${this._cpRenderCard('监管类', '5个')}
                        ${this._cpRenderCard('执法类', '3个')}
                        ${this._cpRenderCard('信用类', '3个')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">模型类型分布</div><div id="cpc11" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各模型问题发现量排行TOP8</div><div id="cpc11b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>模型名称</th><th>模型类型</th><th>上线时间</th><th>运行状态</th><th>累计发现问题数</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.onlineTime}</td><td><span class="rv-status ${d.status === '正常' ? 'positive' : d.status === '异常' ? 'negative' : ''}">${d.status}</span></td><td>${d.problemCount}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart11() {
        const c11 = echarts.init(document.getElementById('cpc11'));
        c11.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 27, name: '审批类', itemStyle: { color: '#00d4ff' } },
                    { value: 33, name: '监管类', itemStyle: { color: '#34c759' } },
                    { value: 20, name: '执法类', itemStyle: { color: '#ff9500' } },
                    { value: 20, name: '信用类', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const data = this.cpModalData.sort((a, b) => b.problemCount - a.problemCount).slice(0, 8);
        const c11b = echarts.init(document.getElementById('cpc11b'));
        c11b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: data.map(d => d.name), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: data.map(d => d.problemCount), barWidth: '50%',
                itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00d4ff'},{offset:1,color:'rgba(0,212,255,0.3)'}]), borderRadius: [4,4,0,0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 12: 问题发现总览 ============
    genCp12Data() {
        const types = ['审批', '监管', '处罚', '信用'];
        const statuses = ['已处置', '处置中', '未处置'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `WT${String(i + 1).padStart(6, '0')}`,
            type: types[Math.floor(Math.random() * types.length)],
            desc: `发现问题${i + 1}，存在异常情况`,
            model: `模型${Math.floor(Math.random() * 10) + 1}`,
            date: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.6 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    openCpModal12() { this._cpOpen(12, this.genCp12Data()); }

    _cpHtml12() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(12)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('问题发现总数', '234个', 'highlight')}
                        ${this._cpRenderCard('审批类模型发现问题数', '23个')}
                        ${this._cpRenderCard('监管类模型发现问题数', '80个')}
                        ${this._cpRenderCard('执法类模型发现问题数', '11个')}
                        ${this._cpRenderCard('信用类模型发现问题数', '12个')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">问题类型分布（按四大类）</div><div id="cpc12" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">近6个月问题发现趋势</div><div id="cpc12b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>问题编号</th><th>所属类别</th><th>问题描述</th><th>发现模型</th><th>发现日期</th><th>处理状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.type}</td><td>${d.desc}</td><td>${d.model}</td><td>${d.date}</td><td><span class="rv-status ${d.status === '已处置' ? 'positive' : d.status === '未处置' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart12() {
        const c12 = echarts.init(document.getElementById('cpc12'));
        c12.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 9.8, name: '审批类', itemStyle: { color: '#00d4ff' } },
                    { value: 34.2, name: '监管类', itemStyle: { color: '#34c759' } },
                    { value: 4.7, name: '执法类', itemStyle: { color: '#ff9500' } },
                    { value: 5.1, name: '信用类', itemStyle: { color: '#af52de' } },
                    { value: 46.2, name: '其他模型发现', itemStyle: { color: '#5856d6' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
        const trendData = months.map(m => ({
            m: m,
            approve: Math.floor(Math.random() * 10) + 5,
            supervise: Math.floor(Math.random() * 20) + 15,
            punish: Math.floor(Math.random() * 5) + 2,
            credit: Math.floor(Math.random() * 5) + 3,
            other: Math.floor(Math.random() * 30) + 20
        }));

        const c12b = echarts.init(document.getElementById('cpc12b'));
        c12b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['审批类', '监管类', '执法类', '信用类', '其他'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: trendData.map(d => d.m), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '审批类', stack: 'total', data: trendData.map(d => d.approve), itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '监管类', stack: 'total', data: trendData.map(d => d.supervise), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '执法类', stack: 'total', data: trendData.map(d => d.punish), itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '信用类', stack: 'total', data: trendData.map(d => d.credit), itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '其他', stack: 'total', data: trendData.map(d => d.other), itemStyle: { color: '#5856d6', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 13: 审批类行为监督明细 ============
    genCp13Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            code: `SP${String(i + 1).padStart(6, '0')}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            name: `审批事项${i + 1}`,
            acceptTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 09:00`,
            promiseTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 17:00`,
            actualTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 17:00`,
            overdueDays: Math.floor(Math.random() * 10) + 1
        }));
    }

    openCpModal13() { this._cpOpen(13, this.genCp13Data()); }

    _cpHtml13() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(13)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('审批超承诺期限工单量', '12件', 'negative')}
                        ${this._cpRenderCard('审批材料反复退回补正次数', '8次')}
                        ${this._cpRenderCard('无依据不予受理件数', '3件')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区审批超期工单分布</div><div id="cpc13" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">材料反复退回原因分布</div><div id="cpc13b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>工单编号</th><th>市/区</th><th>事项名称</th><th>受理时间</th><th>承诺办结时间</th><th>实际办结时间</th><th>超期天数(天)</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.area}</td><td>${d.name}</td><td>${d.acceptTime}</td><td>${d.promiseTime}</td><td>${d.actualTime}</td><td>${d.overdueDays}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart13() {
        const data = this.cpModalData;
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => ({ area, value: data.filter(d => d.area === area).length }));

        const c13 = echarts.init(document.getElementById('cpc13'));
        c13.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c13b = echarts.init(document.getElementById('cpc13b'));
        c13b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 35, name: '材料不齐', itemStyle: { color: '#ff9500' } },
                    { value: 25, name: '格式不符', itemStyle: { color: '#00d4ff' } },
                    { value: 20, name: '内容有误', itemStyle: { color: '#af52de' } },
                    { value: 20, name: '其他', itemStyle: { color: '#5856d6' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 14: 监管类行为监督明细 ============
    genCp14Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const sources = ['举报', '巡查', '移送', '系统监测'];
        const statuses = ['已流转', '处理中', '已办结'];
        return Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            code: `JX${String(i + 1).padStart(6, '0')}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            source: sources[Math.floor(Math.random() * sources.length)],
            receiveTime: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 09:00`,
            status: statuses[Math.random() > 0.7 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    openCpModal14() { this._cpOpen(14, this.genCp14Data()); }

    _cpHtml14() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(14)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('线下线索流转工单', '56件')}
                        ${this._cpRenderCard('高频率重复检查户数', '23户')}
                        ${this._cpRenderCard('线索材料退回平均次数', '1.5次')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区线下线索流转工单分布</div><div id="cpc14" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">高频重复检查对象TOP8</div><div id="cpc14b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>工单编号</th><th>市/区</th><th>线索来源</th><th>接收时间</th><th>流转状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.area}</td><td>${d.source}</td><td>${d.receiveTime}</td><td><span class="rv-status ${d.status === '已办结' ? 'positive' : d.status === '已流转' ? '' : 'negative'}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart14() {
        const data = this.cpModalData;
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => ({ area, value: data.filter(d => d.area === area).length }));

        const c14 = echarts.init(document.getElementById('cpc14'));
        c14.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const checkObjects = Array.from({ length: 8 }, (_, i) => ({ name: `检查对象${i + 1}`, value: Math.floor(Math.random() * 20) + 5 })).sort((a, b) => b.value - a.value);
        const c14b = echarts.init(document.getElementById('cpc14b'));
        c14b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: checkObjects.map(d => d.name), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: checkObjects.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 15: 处罚类行为监督明细 ============
    genCp15Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const types = ['办案超期', '公示超期', '超出裁量', '违规撤销'];
        const statuses = ['已整改', '整改中', '未整改'];
        return Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            code: `CF${String(i + 1).padStart(6, '0')}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            caseName: `案件${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            date: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.6 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    openCpModal15() { this._cpOpen(15, this.genCp15Data()); }

    _cpHtml15() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(15)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('处罚办案超期', '5件', 'negative')}
                        ${this._cpRenderCard('处罚公示超期', '3件', 'negative')}
                        ${this._cpRenderCard('超出裁量标准', '2件', 'negative')}
                        ${this._cpRenderCard('违规处罚撤销', '1件', 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区处罚类问题分布</div><div id="cpc15" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">处罚类问题类型占比</div><div id="cpc15b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>问题编号</th><th>市/区</th><th>案件名称</th><th>问题类型</th><th>发现日期</th><th>处理状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.area}</td><td>${d.caseName}</td><td>${d.type}</td><td>${d.date}</td><td><span class="rv-status ${d.status === '已整改' ? 'positive' : d.status === '未整改' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart15() {
        const data = this.cpModalData;
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => {
            const items = data.filter(d => d.area === area);
            return {
                area: area,
                planOverdue: items.filter(d => d.type === '办案超期').length,
                publishOverdue: items.filter(d => d.type === '公示超期').length,
                exceedStandard: items.filter(d => d.type === '超出裁量').length,
                revoke: items.filter(d => d.type === '违规撤销').length
            };
        });

        const c15 = echarts.init(document.getElementById('cpc15'));
        c15.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['办案超期', '公示超期', '超出裁量', '违规撤销'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '办案超期', stack: 'total', data: areaData.map(d => d.planOverdue), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '公示超期', stack: 'total', data: areaData.map(d => d.publishOverdue), itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '超出裁量', stack: 'total', data: areaData.map(d => d.exceedStandard), itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '违规撤销', stack: 'total', data: areaData.map(d => d.revoke), itemStyle: { color: '#5856d6', borderRadius: [4, 4, 0, 0] } }
            ]
        });

        const c15b = echarts.init(document.getElementById('cpc15b'));
        c15b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 5, name: '办案超期', itemStyle: { color: '#ff3b30' } },
                    { value: 3, name: '公示超期', itemStyle: { color: '#ff9500' } },
                    { value: 2, name: '超出裁量', itemStyle: { color: '#af52de' } },
                    { value: 1, name: '违规撤销', itemStyle: { color: '#5856d6' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 16: 信用类行为监督明细 ============
    genCp16Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const types = ['公示滞后', '惩戒未执行', '修复超期'];
        const statuses = ['已整改', '整改中', '未整改'];
        return Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            code: `XY${String(i + 1).padStart(6, '0')}`,
            area: areas[Math.floor(Math.random() * areas.length)],
            subject: `信用主体${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            date: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.6 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    openCpModal16() { this._cpOpen(16, this.genCp16Data()); }

    _cpHtml16() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(16)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('失信信息公示滞后', '4件', 'negative')}
                        ${this._cpRenderCard('联合惩戒应执行未执行主体数量', '6个', 'negative')}
                        ${this._cpRenderCard('信用修复超期办理', '2件', 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区信用类问题分布</div><div id="cpc16" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">信用类问题类型占比</div><div id="cpc16b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>问题编号</th><th>市/区</th><th>信用主体名称</th><th>问题类型</th><th>发现日期</th><th>处理状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.area}</td><td>${d.subject}</td><td>${d.type}</td><td>${d.date}</td><td><span class="rv-status ${d.status === '已整改' ? 'positive' : d.status === '未整改' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart16() {
        const data = this.cpModalData;
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => {
            const items = data.filter(d => d.area === area);
            return {
                area: area,
                publishDelay: items.filter(d => d.type === '公示滞后').length,
                notExecuted: items.filter(d => d.type === '惩戒未执行').length,
                repairOverdue: items.filter(d => d.type === '修复超期').length
            };
        });

        const c16 = echarts.init(document.getElementById('cpc16'));
        c16.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['公示滞后', '惩戒未执行', '修复超期'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '公示滞后', stack: 'total', data: areaData.map(d => d.publishDelay), itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '惩戒未执行', stack: 'total', data: areaData.map(d => d.notExecuted), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '修复超期', stack: 'total', data: areaData.map(d => d.repairOverdue), itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] } }
            ]
        });

        const c16b = echarts.init(document.getElementById('cpc16b'));
        c16b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 4, name: '公示滞后', itemStyle: { color: '#ff9500' } },
                    { value: 6, name: '惩戒未执行', itemStyle: { color: '#ff3b30' } },
                    { value: 2, name: '修复超期', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 17: 政务服务事项全景分析 ============
    genCp17Data() {
        const types = ['行政许可', '行政确认', '公共服务'];
        const statuses = ['已发布', '已下架'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `政务服务事项${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            dept: `部门${Math.floor(Math.random() * 10) + 1}`,
            days: Math.floor(Math.random() * 20) + 1,
            status: statuses[Math.random() > 0.15 ? 0 : 1]
        }));
    }

    openCpModal17() { this._cpOpen(17, this.genCp17Data()); }

    _cpHtml17() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(17)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('事项总数', '99个', 'highlight')}
                        ${this._cpRenderCard('行政许可', '25个')}
                        ${this._cpRenderCard('行政确认', '20个')}
                        ${this._cpRenderCard('行政裁决', '15个')}
                    </div>
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('行政奖励', '12个')}
                        ${this._cpRenderCard('行政给付', '10个')}
                        ${this._cpRenderCard('公共服务', '12个')}
                        ${this._cpRenderCard('其他行政权力', '5个')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">事项类型分布</div><div id="cpc17" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区事项数量排行TOP8</div><div id="cpc17b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>事项类型</th><th>所属部门</th><th>办理时限(天)</th><th>事项状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.dept}</td><td>${d.days}</td><td><span class="rv-status ${d.status === '已发布' ? 'positive' : 'negative'}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart17() {
        const c17 = echarts.init(document.getElementById('cpc17'));
        c17.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 25.3, name: '行政许可', itemStyle: { color: '#00d4ff' } },
                    { value: 20.2, name: '行政确认', itemStyle: { color: '#34c759' } },
                    { value: 15.2, name: '行政裁决', itemStyle: { color: '#ff9500' } },
                    { value: 12.1, name: '行政奖励', itemStyle: { color: '#af52de' } },
                    { value: 10.1, name: '行政给付', itemStyle: { color: '#5856d6' } },
                    { value: 12.1, name: '公共服务', itemStyle: { color: '#ffcc00' } },
                    { value: 5.0, name: '其他行政权力', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 30) + 10 }));

        const c17b = echarts.init(document.getElementById('cpc17b'));
        c17b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 18: 即办件与承诺件分析 ============
    genCp18Data() {
        const types = ['即办件', '承诺件'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            dept: `部门${Math.floor(Math.random() * 10) + 1}`,
            promiseDays: Math.floor(Math.random() * 15) + 1,
            actualDays: Math.floor(Math.random() * 10) + 0.5
        }));
    }

    openCpModal18() { this._cpOpen(18, this.genCp18Data()); }

    _cpHtml18() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(18)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('即办件', '45个')}
                        ${this._cpRenderCard('承诺件', '54个')}
                        ${this._cpRenderCard('即办件占比', '45.5%', 'highlight')}
                        ${this._cpRenderCard('平均办理时限', '1.2天')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">即办件 vs 承诺件占比</div><div id="cpc18" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区即办件与承诺件分布</div><div id="cpc18b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>事项类型</th><th>所属部门</th><th>承诺办结时限</th><th>实际平均时限</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.dept}</td><td>${d.promiseDays}天</td><td>${d.actualDays}天</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart18() {
        const c18 = echarts.init(document.getElementById('cpc18'));
        c18.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [
                    { value: 45, name: '即办件', itemStyle: { color: '#34c759' } },
                    { value: 54, name: '承诺件', itemStyle: { color: '#00d4ff' } }
                ],
                label: { show: false },
                labelLine: { show: false },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
        c18.setOption({ title: { text: '45.5%', subtext: '即办件占比', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#34c759' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市'];
        const areaData = areas.map(area => ({
            area: area,
            instant: Math.floor(Math.random() * 20) + 5,
            promise: Math.floor(Math.random() * 25) + 8
        }));

        const c18b = echarts.init(document.getElementById('cpc18b'));
        c18b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['即办件', '承诺件'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '即办件', stack: 'total', data: areaData.map(d => d.instant), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '承诺件', stack: 'total', data: areaData.map(d => d.promise), itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 19: 告知承诺制与承诺即入制分析 ============
    genCp19Data() {
        const types = ['告知承诺制', '承诺即入制'];
        return Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            dept: `部门${Math.floor(Math.random() * 10) + 1}`,
            days: Math.floor(Math.random() * 10) + 1,
            checkRate: (Math.random() * 50 + 50).toFixed(1)
        }));
    }

    openCpModal19() { this._cpOpen(19, this.genCp19Data()); }

    _cpHtml19() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(19)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('告知承诺制事项', '9个')}
                        ${this._cpRenderCard('承诺即入制事项', '9个')}
                        ${this._cpRenderCard('合计', '18个')}
                        ${this._cpRenderCard('占全部事项比例', '18.2%', 'highlight')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">两项制度占比</div><div id="cpc19" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各领域告知承诺与承诺即入分布</div><div id="cpc19b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>制度类型</th><th>所属部门</th><th>办理时限(天)</th><th>事后核查率(%)</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.dept}</td><td>${d.days}</td><td>${d.checkRate}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart19() {
        const c19 = echarts.init(document.getElementById('cpc19'));
        c19.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 50, name: '告知承诺制', itemStyle: { color: '#00d4ff' } },
                    { value: 50, name: '承诺即入制', itemStyle: { color: '#34c759' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const fields = ['市场监管', '卫生健康', '交通运输', '生态环境', '教育', '住房城乡建设', '自然资源', '文化旅游'];
        const fieldData = fields.map(f => ({
            f: f,
            promise: Math.floor(Math.random() * 5) + 1,
            entry: Math.floor(Math.random() * 5) + 1
        }));

        const c19b = echarts.init(document.getElementById('cpc19b'));
        c19b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['告知承诺制', '承诺即入制'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '告知承诺制', data: fieldData.map(d => d.promise), barWidth: '40%', itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '承诺即入制', data: fieldData.map(d => d.entry), barWidth: '40%', itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } }
            ]
        });
    }

    // ============ MODAL 20: 高效办成一件事分析 ============
    genCp20Data() {
        const statuses = ['已上线', '开发中', '已下架'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `高效办成一件事${i + 1}`,
            leadDept: `牵头部门${Math.floor(Math.random() * 8) + 1}`,
            deptCount: Math.floor(Math.random() * 8) + 2,
            days: Math.floor(Math.random() * 20) + 3,
            status: statuses[Math.random() > 0.12 ? 0 : Math.random() > 0.5 ? 1 : 2]
        }));
    }

    openCpModal20() { this._cpOpen(20, this.genCp20Data()); }

    _cpHtml20() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(20)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('高效办成一件事办件数', '99件', 'highlight')}
                        ${this._cpRenderCard('高效办成一件事事项数', '89件', 'positive')}
                        ${this._cpRenderCard('办理中办件数', '8件')}
                        ${this._cpRenderCard('已办结办件数', '2件')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">一件事主题类型分布</div><div id="cpc20" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区高效办成一件事数量排行TOP8</div><div id="cpc20b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>牵头部门</th><th>涉及部门数</th><th>办理时限</th><th>上线状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.leadDept}</td><td>${d.deptCount}</td><td>${d.days}天</td><td><span class="rv-status ${d.status === '已上线' ? 'positive' : d.status === '已下架' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart20() {
        const c20 = echarts.init(document.getElementById('cpc20'));
        c20.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 20, name: '企业开办', itemStyle: { color: '#00d4ff' } },
                    { value: 15, name: '出生一件事', itemStyle: { color: '#34c759' } },
                    { value: 18, name: '不动产登记', itemStyle: { color: '#ff9500' } },
                    { value: 12, name: '退休一件事', itemStyle: { color: '#af52de' } },
                    { value: 35, name: '其他', itemStyle: { color: '#5856d6' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 35) + 5 }));

        const c20b = echarts.init(document.getElementById('cpc20b'));
        c20b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 21: 极简审批事项分析 ============
    genCp21Data() {
        const methods = ['告知承诺', '备案制', '容缺受理', '免审即享', '其他'];
        const statuses = ['已实施', '试点中', '待实施'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `极简审批事项${i + 1}`,
            field: `领域${Math.floor(Math.random() * 8) + 1}`,
            method: methods[Math.floor(Math.random() * methods.length)],
            reduction: (Math.random() * 50 + 40).toFixed(1),
            status: statuses[Math.random() > 0.18 ? 0 : Math.random() > 0.5 ? 1 : 2]
        }));
    }

    openCpModal21() { this._cpOpen(21, this.genCp21Data()); }

    _cpHtml21() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(21)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('极简审批事项', '99个', 'highlight')}
                        ${this._cpRenderCard('办理中办件数', '85件', 'positive')}
                        ${this._cpRenderCard('办理时限压缩', '65%')}
                        ${this._cpRenderCard('累计办件量', '12,345件')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各领域极简审批事项分布TOP8</div><div id="cpc21" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">办件量最多的极简审批事项TOP10</div><div id="cpc21b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>所属领域</th><th>压缩幅度(%)</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.field}</td><td>${d.reduction}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart21() {
        const fields = ['市场监管', '卫生健康', '交通运输', '生态环境', '教育', '住房城乡建设', '自然资源', '文化旅游'];
        const fieldData = fields.map(f => ({ f, value: Math.floor(Math.random() * 25) + 5 }));

        const c21 = echarts.init(document.getElementById('cpc21'));
        c21.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: fieldData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const items = ['事项1', '事项2', '事项3', '事项4', '事项5', '事项6', '事项7', '事项8', '事项9', '事项10'];
        const itemData = items.map(i => ({ i, value: Math.floor(Math.random() * 500) + 100 }));

        const c21b = echarts.init(document.getElementById('cpc21b'));
        c21b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: itemData.map(d => d.i), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: itemData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 22: 智能快办与免申即享分析 ============
    genCp22Data() {
        const types = ['智能快办', '免申即享'];
        const methods = ['系统自动', '人工审核'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `事项${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            dept: `部门${Math.floor(Math.random() * 10) + 1}`,
            method: methods[Math.random() > 0.3 ? 0 : 1],
            avgDuration: (Math.random() * 60 + 5).toFixed(1),
            benefitCount: Math.floor(Math.random() * 500) + 50
        }));
    }

    openCpModal22() { this._cpOpen(22, this.genCp22Data()); }

    _cpHtml22() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(22)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('智能快办事项', '52个')}
                        ${this._cpRenderCard('免申即享事项', '47个')}
                        ${this._cpRenderCard('办理中办件量', '99件', 'highlight')}
                        ${this._cpRenderCard('累计办件量', '8,965件')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">智能快办 vs 免申即享占比</div><div id="cpc22" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区智能快办免申即享数量排行TOP8</div><div id="cpc22b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>类型</th><th>所属部门</th><th>办理方式</th><th>平均办理时长</th><th>受益主体数</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.dept}</td><td>${d.method}</td><td>${d.avgDuration}分钟</td><td>${d.benefitCount}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart22() {
        const c22 = echarts.init(document.getElementById('cpc22'));
        c22.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [
                    { value: 52, name: '智能快办', itemStyle: { color: '#00d4ff' } },
                    { value: 47, name: '免申即享', itemStyle: { color: '#34c759' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 40) + 10 }));

        const c22b = echarts.init(document.getElementById('cpc22b'));
        c22b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 23: 全省通办事项分析 ============
    genCp23Data() {
        const ranges = ['全省', '跨省'];
        const methods = ['全程网办', '异地代收代办', '多地联办'];
        const statuses = ['已落地', '推进中'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `全省通办事项${i + 1}`,
            range: ranges[Math.random() > 0.3 ? 0 : 1],
            method: methods[Math.floor(Math.random() * methods.length)],
            dept: `部门${Math.floor(Math.random() * 10) + 1}`,
            status: statuses[Math.random() > 0.12 ? 0 : 1]
        }));
    }

    openCpModal23() { this._cpOpen(23, this.genCp23Data()); }

    _cpHtml23() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(23)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('全省通办事项', '99个', 'highlight')}
                        ${this._cpRenderCard('办理中办件量', '89件', 'positive')}
                        ${this._cpRenderCard('跨域办件量', '8,765件')}
                        ${this._cpRenderCard('异地办理占比', '35%')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区全省通办事项数量排行TOP8</div><div id="cpc23" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">通办方式分布</div><div id="cpc23b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>通办范围</th><th>通办方式</th><th>所属部门</th><th>落地状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.range}</td><td>${d.method}</td><td>${d.dept}</td><td><span class="rv-status ${d.status === '已落地' ? 'positive' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart23() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 35) + 10 }));

        const c23 = echarts.init(document.getElementById('cpc23'));
        c23.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c23b = echarts.init(document.getElementById('cpc23b'));
        c23b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 45, name: '全程网办', itemStyle: { color: '#00d4ff' } },
                    { value: 30, name: '异地代收代办', itemStyle: { color: '#34c759' } },
                    { value: 25, name: '多地联办', itemStyle: { color: '#ff9500' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 24: 便民简证事项分析 ============
    genCp24Data() {
        const methods = ['取消', '承诺', '共享', '核验'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `便民简证事项${i + 1}`,
            field: `领域${Math.floor(Math.random() * 8) + 1}`,
            originalCount: Math.floor(Math.random() * 10) + 3,
            currentCount: Math.floor(Math.random() * 5) + 1,
            reduction: 0,
            method: methods[Math.floor(Math.random() * methods.length)]
        })).map(d => ({ ...d, reduction: (((d.originalCount - d.currentCount) / d.originalCount) * 100).toFixed(1) }));
    }

    openCpModal24() { this._cpOpen(24, this.genCp24Data()); }

    _cpHtml24() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(24)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('便民简证事项', '99个', 'highlight')}
                        ${this._cpRenderCard('免提交材料数', '256件')}
                        ${this._cpRenderCard('材料精简率', '45%')}
                        ${this._cpRenderCard('累计惠及人次', '8,234人次')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各领域便民简证事项分布</div><div id="cpc24" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">证明减免方式分布</div><div id="cpc24b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>所属领域</th><th>原需材料数</th><th>现需材料数</th><th>精简率(%)</th><th>减免方式</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.field}</td><td>${d.originalCount}</td><td>${d.currentCount}</td><td>${d.reduction}</td><td>${d.method}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart24() {
        const fields = ['市场监管', '卫生健康', '交通运输', '生态环境', '教育', '住房城乡建设', '自然资源', '文化旅游'];
        const fieldData = fields.map(f => ({ f, value: Math.floor(Math.random() * 25) + 5 }));

        const c24 = echarts.init(document.getElementById('cpc24'));
        c24.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: fieldData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c24b = echarts.init(document.getElementById('cpc24b'));
        c24b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 35, name: '直接取消', itemStyle: { color: '#ff9500' } },
                    { value: 30, name: '告知承诺', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: '数据共享', itemStyle: { color: '#34c759' } },
                    { value: 10, name: '部门核验', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 25: 信用等级审批分析 ============
    genCp25Data() {
        const levels = ['A级', 'B级'];
        const methods = ['容缺受理', '绿色通道', '告知承诺'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `信用等级审批事项${i + 1}`,
            field: `领域${Math.floor(Math.random() * 8) + 1}`,
            level: levels[Math.floor(Math.random() * levels.length)],
            method: methods[Math.floor(Math.random() * methods.length)],
            count: Math.floor(Math.random() * 500) + 50
        }));
    }

    openCpModal25() { this._cpOpen(25, this.genCp25Data()); }

    _cpHtml25() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(25)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('信用等级审批事项', '99个', 'highlight')}
                        ${this._cpRenderCard('A级适用', '45个')}
                        ${this._cpRenderCard('B级适用', '54个')}
                        ${this._cpRenderCard('累计受益主体', '2,345个')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">信用等级适用范围分布</div><div id="cpc25" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各领域信用等级审批事项分布</div><div id="cpc25b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>所属领域</th><th>适用信用等级</th><th>审批方式</th><th>累计办件量</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.field}</td><td>${d.level}</td><td>${d.method}</td><td>${d.count}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart25() {
        const c25 = echarts.init(document.getElementById('cpc25'));
        c25.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 45, name: 'A级及以上', itemStyle: { color: '#34c759' } },
                    { value: 55, name: 'B级及以上', itemStyle: { color: '#ff9500' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const fields = ['市场监管', '卫生健康', '交通运输', '生态环境', '教育', '住房城乡建设', '自然资源', '文化旅游'];
        const fieldData = fields.map(f => ({ f, value: Math.floor(Math.random() * 20) + 5 }));

        const c25b = echarts.init(document.getElementById('cpc25b'));
        c25b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: fieldData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 26: 监管执法领域分析 ============
    genCp26Data() {
        const types = ['日常', '专项', '双随机', '重点', '信用'];
        return Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `领域${i + 1}`,
            itemCount: Math.floor(Math.random() * 500) + 100,
            objectCount: Math.floor(Math.random() * 5000) + 500,
            dept: `牵头部门${Math.floor(Math.random() * 8) + 1}`,
            type: types[Math.floor(Math.random() * types.length)]
        }));
    }

    openCpModal26() { this._cpOpen(26, this.genCp26Data()); }

    _cpHtml26() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(26)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('监管执法领域', '46个', 'highlight')}
                        ${this._cpRenderCard('监管执法事项', '6,680项')}
                        ${this._cpRenderCard('平均每领域事项数', '145项')}
                        ${this._cpRenderCard('覆盖部门', '28个')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item" style="width:100%;"><div class="rv-chart-title">各领域执法事项数量</div><div id="cpc26" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>领域名称</th><th>监管执法事项数</th><th>监管对象数</th><th>牵头部门</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.itemCount}</td><td>${d.objectCount}</td><td>${d.dept}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart26() {
        const fields = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '教育', '住房城乡建设', '自然资源', '农业农村'];
        const fieldData = fields.map(f => ({ f, value: Math.floor(Math.random() * 800) + 500 }));

        const c26 = echarts.init(document.getElementById('cpc26'));
        c26.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 45 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: fieldData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 27: 监管执法事项清单分析 ============
    genCp27Data() {
        const types = ['行政检查', '行政处罚', '行政强制', '其他'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `执法事项${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            field: `领域${Math.floor(Math.random() * 8) + 1}`,
            basis: `依据${Math.floor(Math.random() * 20) + 1}`,
            subject: `实施主体${Math.floor(Math.random() * 15) + 1}`
        }));
    }

    openCpModal27() { this._cpOpen(27, this.genCp27Data()); }

    _cpHtml27() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(27)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('监管执法事项总数', '6,680项', 'highlight')}
                        ${this._cpRenderCard('行政检查', '2,672项')}
                        ${this._cpRenderCard('行政处罚', '2,005项')}
                        ${this._cpRenderCard('行政强制', '1,336项')}
                        ${this._cpRenderCard('其他', '667项')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">监管执法事项类型分布</div><div id="cpc27" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区执法事项数量</div><div id="cpc27b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>事项类型</th><th>所属领域</th><th>设定依据</th><th>实施主体</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.field}</td><td>${d.basis}</td><td>${d.subject}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart27() {
        const c27 = echarts.init(document.getElementById('cpc27'));
        c27.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 40, name: '行政检查', itemStyle: { color: '#00d4ff' } },
                    { value: 30, name: '行政处罚', itemStyle: { color: '#ff3b30' } },
                    { value: 20, name: '行政强制', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '其他', itemStyle: { color: '#5856d6' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 1000) + 500 }));

        const c27b = echarts.init(document.getElementById('cpc27b'));
        c27b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 28: 监管缺口分析（未覆盖事项） ============
    genCp28Data() {
        const types = ['行政检查', '行政处罚', '行政强制', '其他'];
        const reasons = ['无监管对象', '暂无计划', '其他'];
        const depts = ['省市场监管局', '省生态环境厅', '省交通运输厅', '省卫健委', '省应急厅', '省住建厅', '省农业农村厅', '省文旅厅'];
        return Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `未覆盖事项${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            field: `领域${Math.floor(Math.random() * 8) + 1}`,
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            dept: depts[Math.floor(Math.random() * depts.length)]
        }));
    }

    openCpModal28() { this._cpOpen(28, this.genCp28Data()); }

    _cpHtml28() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(28)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row" style="justify-content:space-between;">
                        ${this._cpRenderCard('未覆盖事项', '99个', 'negative', 'flex:1;margin:0 5px;')}
                        ${this._cpRenderCard('覆盖率', '98.5%', 'highlight', 'flex:1;margin:0 5px;')}
                        ${this._cpRenderCard('已覆盖事项', '6,581项', '', 'flex:1;margin:0 5px;')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">未覆盖事项类型分布</div><div id="cpc28" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各领域未覆盖事项数量</div><div id="cpc28b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>事项名称</th><th>事项类型</th><th>所属领域</th><th>未覆盖原因</th><th>所属部门</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.field}</td><td>${d.reason}</td><td>${d.dept}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart28() {
        const c28 = echarts.init(document.getElementById('cpc28'));
        c28.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 35, name: '行政检查', itemStyle: { color: '#00d4ff' } },
                    { value: 30, name: '行政处罚', itemStyle: { color: '#ff3b30' } },
                    { value: 20, name: '行政强制', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '其他', itemStyle: { color: '#5856d6' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const fields = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '教育', '住房城乡建设'];
        const fieldData = fields.map(f => ({ f, value: Math.floor(Math.random() * 20) + 5 }));

        const c28b = echarts.init(document.getElementById('cpc28b'));
        c28b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: fieldData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 29: 行政执法主体全景分析 ============
    genCp29Data() {
        const levels = ['省级', '市级', '区县级'];
        const fields = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '农业农村', '城市管理'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `行政执法主体${i + 1}`,
            level: levels[Math.floor(Math.random() * levels.length)],
            field: fields[Math.floor(Math.random() * fields.length)],
            code: `9146${String(Math.floor(Math.random() * 1000000000000)).slice(0, 12)}`,
            legalRep: `法人${i + 1}`,
            status: Math.random() > 0.95 ? '撤销' : '正常'
        }));
    }

    openCpModal29() { this._cpOpen(29, this.genCp29Data()); }

    _cpHtml29() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(29)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('行政执法主体总数', '99个', 'highlight')}
                        ${this._cpRenderCard('省级主体', '12个')}
                        ${this._cpRenderCard('市级主体', '35个')}
                        ${this._cpRenderCard('区县级主体', '52个')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">行政执法主体层级分布</div><div id="cpc29" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各领域行政执法主体分布TOP8</div><div id="cpc29b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>主体名称</th><th>所属层级</th><th>所属领域</th><th>统一社会信用代码</th><th>法定代表人</th><th>状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.level}</td><td>${d.field}</td><td>${d.code}</td><td>${d.legalRep}</td><td><span class="rv-status ${d.status === '正常' ? 'positive' : 'negative'}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart29() {
        const c29 = echarts.init(document.getElementById('cpc29'));
        c29.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 12.1, name: '省级', itemStyle: { color: '#00d4ff' } },
                    { value: 35.4, name: '市级', itemStyle: { color: '#34c759' } },
                    { value: 52.5, name: '区县级', itemStyle: { color: '#ff9500' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const fields = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '农业农村', '城市管理'];
        const fieldData = fields.map(f => ({ f, value: Math.floor(Math.random() * 20) + 5 }));

        const c29b = echarts.init(document.getElementById('cpc29b'));
        c29b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: fieldData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 30: 执法单位全景分析 ============
    genCp30Data() {
        const types = ['综合执法', '专业执法'];
        const levels = ['省级', '市级', '区县级'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `执法单位${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            level: levels[Math.floor(Math.random() * levels.length)],
            staffCount: Math.floor(Math.random() * 100) + 10,
            area: `区域${i + 1}`,
            status: Math.random() > 0.95 ? '撤销' : '正常'
        }));
    }

    openCpModal30() { this._cpOpen(30, this.genCp30Data()); }

    _cpHtml30() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(30)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('执法单位总数', '99个', 'highlight')}
                        ${this._cpRenderCard('综合执法单位', '32个')}
                        ${this._cpRenderCard('专业执法单位', '67个')}
                        ${this._cpRenderCard('执法队伍人数', '2,345人')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">执法单位类型分布</div><div id="cpc30" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区执法单位数量排行TOP8</div><div id="cpc30b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>单位名称</th><th>单位类型</th><th>所属层级</th><th>执法人员数</th><th>执法区域</th><th>状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.type}</td><td>${d.level}</td><td>${d.staffCount}</td><td>${d.area}</td><td><span class="rv-status ${d.status === '正常' ? 'positive' : 'negative'}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart30() {
        const c30 = echarts.init(document.getElementById('cpc30'));
        c30.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 32.3, name: '综合执法', itemStyle: { color: '#00d4ff' } },
                    { value: 67.7, name: '专业执法', itemStyle: { color: '#34c759' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 20) + 5 }));

        const c30b = echarts.init(document.getElementById('cpc30b'));
        c30b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 31: 行政执法证件管理分析 ============
    genCp31Data() {
        const types = ['执法证', '监督证'];
        const statuses = ['有效', '即将到期', '已过期'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `ZF${String(i + 1).padStart(8, '0')}`,
            name: `持证人${i + 1}`,
            unit: `单位${Math.floor(Math.random() * 20) + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            issueDate: `${2024}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            expireDate: `${2026}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.93 ? Math.random() > 0.6 ? 2 : 1 : 0]
        }));
    }

    openCpModal31() { this._cpOpen(31, this.genCp31Data()); }

    _cpHtml31() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(31)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('证件总数', '2,198个', 'highlight')}
                        ${this._cpRenderCard('有效证件', '2,045个', 'positive')}
                        ${this._cpRenderCard('过期证件', '153个', 'negative')}
                        ${this._cpRenderCard('证件覆盖率', '93.1%')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">证件状态分布</div><div id="cpc31" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区执法证件持有量排行TOP8</div><div id="cpc31b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>证件编号</th><th>持证人姓名</th><th>所属单位</th><th>证件类型</th><th>发证日期</th><th>有效期至</th><th>状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.name}</td><td>${d.unit}</td><td>${d.type}</td><td>${d.issueDate}</td><td>${d.expireDate}</td><td><span class="rv-status ${d.status === '有效' ? 'positive' : d.status === '已过期' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart31() {
        const c31 = echarts.init(document.getElementById('cpc31'));
        c31.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [
                    { value: 93.1, name: '有效', itemStyle: { color: '#34c759' } },
                    { value: 4.2, name: '即将到期', itemStyle: { color: '#ff9500' } },
                    { value: 2.7, name: '已过期', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: false },
                labelLine: { show: false },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
        c31.setOption({ title: { text: '2,045', subtext: '有效证件', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#34c759' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 300) + 100 }));

        const c31b = echarts.init(document.getElementById('cpc31b'));
        c31b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 32: 执法证件动态分析 ============
    genCp32Data() {
        const types = ['新申请', '换证'];
        const results = ['合格', '不合格'];
        const statuses = ['已通过', '审核中', '已驳回'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `申请人${i + 1}`,
            unit: `单位${Math.floor(Math.random() * 20) + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            date: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            examResult: results[Math.random() > 0.15 ? 0 : 1],
            status: statuses[Math.random() > 0.7 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    openCpModal32() { this._cpOpen(32, this.genCp32Data()); }

    _cpHtml32() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(32)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('新申请', '356人')}
                        ${this._cpRenderCard('换证', '234人')}
                        ${this._cpRenderCard('注销', '89人', 'negative')}
                        ${this._cpRenderCard('本年增长', '567人', 'positive')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">近6个月证件动态趋势</div><div id="cpc32" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">注销原因分布</div><div id="cpc32b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>姓名</th><th>所属单位</th><th>申请类型</th><th>申请日期</th><th>培训考核结果</th><th>审批状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.unit}</td><td>${d.type}</td><td>${d.date}</td><td><span class="rv-status ${d.examResult === '合格' ? 'positive' : 'negative'}">${d.examResult}</span></td><td><span class="rv-status ${d.status === '已通过' ? 'positive' : d.status === '已驳回' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart32() {
        const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
        const trendData = months.map(m => ({
            m: m,
            newApply: Math.floor(Math.random() * 80) + 30,
            renew: Math.floor(Math.random() * 50) + 20,
            cancel: Math.floor(Math.random() * 20) + 5
        }));

        const c32 = echarts.init(document.getElementById('cpc32'));
        c32.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['新申请', '换证', '注销'], textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
            xAxis: { type: 'category', data: trendData.map(d => d.m), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [
                { type: 'bar', name: '新申请', stack: 'total', data: trendData.map(d => d.newApply), itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '换证', stack: 'total', data: trendData.map(d => d.renew), itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] } },
                { type: 'bar', name: '注销', stack: 'total', data: trendData.map(d => d.cancel), itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] } }
            ]
        });

        const c32b = echarts.init(document.getElementById('cpc32b'));
        c32b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 35, name: '退休', itemStyle: { color: '#5856d6' } },
                    { value: 30, name: '调离执法岗位', itemStyle: { color: '#af52de' } },
                    { value: 20, name: '证件过期', itemStyle: { color: '#ff9500' } },
                    { value: 10, name: '违规被撤销', itemStyle: { color: '#ff3b30' } },
                    { value: 5, name: '其他', itemStyle: { color: '#00d4ff' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 33: 部委执法证持有情况分析 ============
    genCp33Data() {
        const ministries = ['市场监管总局', '生态环境部', '交通运输部', '司法部', '卫健委', '应急管理部', '农业农村部', '商务部'];
        const statuses = ['有效', '过期'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `持证人员${i + 1}`,
            unit: `单位${Math.floor(Math.random() * 20) + 1}`,
            ministry: ministries[Math.floor(Math.random() * ministries.length)],
            code: `BW${String(i + 1).padStart(8, '0')}`,
            issueDate: `${2024}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            expireDate: `${2026}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.9 ? 1 : 0]
        }));
    }

    openCpModal33() { this._cpOpen(33, this.genCp33Data()); }

    _cpHtml33() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(33)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('部委执法证总数', '99个', 'highlight')}
                        ${this._cpRenderCard('有效', '89个', 'positive')}
                        ${this._cpRenderCard('过期', '10个', 'negative')}
                        ${this._cpRenderCard('部委执法人员', '99人')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">部委执法证归属分布</div><div id="cpc33" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">部委执法证领域分布情况</div><div id="cpc33b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>姓名</th><th>所属单位</th><th>发证部委</th><th>证件编号</th><th>发证日期</th><th>有效期至</th><th>状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.unit}</td><td>${d.ministry}</td><td>${d.code}</td><td>${d.issueDate}</td><td>${d.expireDate}</td><td><span class="rv-status ${d.status === '有效' ? 'positive' : 'negative'}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart33() {
        const c33 = echarts.init(document.getElementById('cpc33'));
        c33.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 25, name: '市场监管总局', itemStyle: { color: '#00d4ff' } },
                    { value: 20, name: '生态环境部', itemStyle: { color: '#34c759' } },
                    { value: 18, name: '交通运输部', itemStyle: { color: '#ff9500' } },
                    { value: 37, name: '其他部委', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const fields = ['市场监管', '生态环境', '交通运输', '卫生健康', '应急管理', '农业农村', '文化旅游', '城市管理'];
        const fieldData = fields.map(f => ({ f, value: Math.floor(Math.random() * 20) + 5 }));

        const c33b = echarts.init(document.getElementById('cpc33b'));
        c33b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: fieldData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 34: 部委执法人员分析 ============
    genCp34Data() {
        const ministries = ['市场监管总局', '生态环境部', '交通运输部', '司法部', '卫健委', '应急管理部', '农业农村部', '商务部'];
        const categories = ['市场监管', '生态环境', '交通运输', '综合执法'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `执法人员${i + 1}`,
            ministry: ministries[Math.floor(Math.random() * ministries.length)],
            position: ['处长', '科长', '科员', '执法员'][Math.floor(Math.random() * 4)],
            hasCert: Math.random() > 0.1 ? '已持有' : '未持有',
            certCode: Math.random() > 0.1 ? `BW${String(i + 1).padStart(8, '0')}` : '-',
            category: categories[Math.floor(Math.random() * categories.length)]
        }));
    }

    openCpModal34() { this._cpOpen(34, this.genCp34Data()); }

    _cpHtml34() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(34)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('部委执法人员总数', '99人', 'highlight')}
                        ${this._cpRenderCard('部委执法证持有', '89人', 'positive')}
                        ${this._cpRenderCard('持证率', '89.9%')}
                        ${this._cpRenderCard('部委执法证无证人员', '10人', 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">部委执法人员持证状态</div><div id="cpc34" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各部委执法人员数量排行TOP8</div><div id="cpc34b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>姓名</th><th>所属部委</th><th>职务</th><th>执法证持有情况</th><th>证件编号</th><th>执法类别</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.ministry}</td><td>${d.position}</td><td><span class="rv-status ${d.hasCert === '已持有' ? 'positive' : 'negative'}">${d.hasCert}</span></td><td>${d.certCode}</td><td>${d.category}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart34() {
        const c34 = echarts.init(document.getElementById('cpc34'));
        c34.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            series: [{
                type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
                data: [
                    { value: 89.9, name: '已持证', itemStyle: { color: '#34c759' } },
                    { value: 10.1, name: '未持证', itemStyle: { color: '#ff3b30' } }
                ],
                label: { show: false },
                labelLine: { show: false },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
        c34.setOption({ title: { text: '89.9%', subtext: '持证率', left: 'center', top: 'center', textStyle: { fontSize: 28, fontWeight: 'bold', color: '#34c759' }, subtextStyle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' } } });

        const ministries = ['市场监管总局', '生态环境部', '交通运输部', '司法部', '卫健委', '应急管理部', '农业农村部', '商务部'];
        const ministryData = ministries.map(m => ({ m, value: Math.floor(Math.random() * 20) + 5 }));

        const c34b = echarts.init(document.getElementById('cpc34b'));
        c34b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: ministryData.map(d => d.m), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: ministryData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 35: 行政执法人员全景分析 ============
    genCp35Data() {
        const categories = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '农业农村', '城市管理'];
        const statuses = ['在岗', '调离', '退休'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `执法人员${i + 1}`,
            unit: `单位${Math.floor(Math.random() * 20) + 1}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            certCode: `ZF${String(i + 1).padStart(8, '0')}`,
            expireDate: `${2026}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.95 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    openCpModal35() { this._cpOpen(35, this.genCp35Data()); }

    _cpHtml35() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(35)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('行政执法人员总数', '1,876人', 'highlight')}
                        ${this._cpRenderCard('持证人数', '1,723人', 'positive')}
                        ${this._cpRenderCard('持证率', '91.8%')}
                        ${this._cpRenderCard('辅助执法人员', '234人')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">行政执法人员类型分布</div><div id="cpc35" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各领域行政执法人员数量排行TOP8</div><div id="cpc35b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>姓名</th><th>所属单位</th><th>执法类别</th><th>证件编号</th><th>执法证有效期</th><th>状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.unit}</td><td>${d.category}</td><td>${d.certCode}</td><td>${d.expireDate}</td><td><span class="rv-status ${d.status === '在岗' ? 'positive' : 'negative'}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart35() {
        const c35 = echarts.init(document.getElementById('cpc35'));
        c35.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 88.9, name: '行政执法人员', itemStyle: { color: '#00d4ff' } },
                    { value: 11.1, name: '辅助执法人员', itemStyle: { color: '#34c759' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const categories = ['市场监管', '生态环境', '交通运输', '卫生健康', '文化旅游', '应急管理', '农业农村', '城市管理'];
        const categoryData = categories.map(c => ({ c, value: Math.floor(Math.random() * 300) + 100 }));

        const c35b = echarts.init(document.getElementById('cpc35b'));
        c35b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: categoryData.map(d => d.c), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: categoryData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#00d4ff', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 36: 辅助执法人员分析 ============
    genCp36Data() {
        const positions = ['窗口服务', '现场巡查', '档案管理', '其他'];
        const statuses = ['在岗', '离职'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `辅助人员${i + 1}`,
            unit: `单位${Math.floor(Math.random() * 20) + 1}`,
            position: positions[Math.floor(Math.random() * positions.length)],
            hasCert: Math.random() > 0.15 ? '是' : '否',
            hireDate: `${2024}-${String(Math.floor(Math.random() * 24) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: statuses[Math.random() > 0.9 ? 1 : 0]
        }));
    }

    openCpModal36() { this._cpOpen(36, this.genCp36Data()); }

    _cpHtml36() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(36)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('辅助执法人员总数', '234人', 'highlight')}
                        ${this._cpRenderCard('持证上岗', '198人', 'positive')}
                        ${this._cpRenderCard('持证率', '84.6%')}
                        ${this._cpRenderCard('在岗', '210人')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">辅助执法人员岗位分布</div><div id="cpc36" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区辅助执法人员数量排行TOP8</div><div id="cpc36b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>姓名</th><th>所属单位</th><th>岗位类型</th><th>是否持证上岗</th><th>入职日期</th><th>状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.unit}</td><td>${d.position}</td><td><span class="rv-status ${d.hasCert === '是' ? 'positive' : 'negative'}">${d.hasCert}</span></td><td>${d.hireDate}</td><td><span class="rv-status ${d.status === '在岗' ? 'positive' : 'negative'}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart36() {
        const c36 = echarts.init(document.getElementById('cpc36'));
        c36.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 35, name: '窗口服务', itemStyle: { color: '#00d4ff' } },
                    { value: 30, name: '现场巡查', itemStyle: { color: '#34c759' } },
                    { value: 20, name: '档案管理', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '其他', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });

        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 50) + 10 }));

        const c36b = echarts.init(document.getElementById('cpc36b'));
        c36b.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });
    }

    // ============ MODAL 37: 超期办结分析 ============
    genCp37Data() {
        const types = ['行政许可', '行政确认', '公共服务', '其他'];
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `BJ${String(i + 1).padStart(8, '0')}`,
            name: `事项${i + 1}`,
            dept: areas[Math.floor(Math.random() * areas.length)],
            promiseDays: Math.floor(Math.random() * 20) + 5,
            actualDays: Math.floor(Math.random() * 20) + 10,
            overDays: Math.floor(Math.random() * 23) + 1
        }));
    }

    openCpModal37() { this._cpOpen(37, this.genCp37Data()); }

    _cpHtml37() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(37)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('超期办结总数', '23件', 'highlight')}
                        ${this._cpRenderCard('平均超期天数', '5.2天')}
                        ${this._cpRenderCard('最长超期', '23天', 'negative')}
                        ${this._cpRenderCard('超期率', '2.3%')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区超期办结数量排行TOP8</div><div id="cpc37" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">超期办结事项类型分布</div><div id="cpc37b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>办件编号</th><th>事项名称</th><th>所属部门/区划</th><th>承诺办结时限</th><th>实际办结时限</th><th>超期天数（天）</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.name}</td><td>${d.dept}</td><td>${d.promiseDays}天</td><td>${d.actualDays}天</td><td><span class="rv-status negative">${d.overDays}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart37() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 10) + 1 }));

        const c37 = echarts.init(document.getElementById('cpc37'));
        c37.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c37b = echarts.init(document.getElementById('cpc37b'));
        c37b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 25, name: '行政许可', itemStyle: { color: '#ff3b30' } },
                    { value: 20, name: '行政确认', itemStyle: { color: '#ff9500' } },
                    { value: 15, name: '行政裁决', itemStyle: { color: '#00d4ff' } },
                    { value: 12, name: '行政奖励', itemStyle: { color: '#34c759' } },
                    { value: 10, name: '行政给付', itemStyle: { color: '#af52de' } },
                    { value: 12, name: '公共服务', itemStyle: { color: '#5856d6' } },
                    { value: 6, name: '其他行政权力', itemStyle: { color: '#ffcc00' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 38: 告知承诺核查超期分析 ============
    genCp38Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `HC${String(i + 1).padStart(8, '0')}`,
            name: `事项${i + 1}`,
            promisor: `承诺人${i + 1}`,
            promiseDate: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            checkLimit: Math.floor(Math.random() * 15) + 5,
            actualCheckDate: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            overDays: Math.floor(Math.random() * 12) + 1
        }));
    }

    openCpModal38() { this._cpOpen(38, this.genCp38Data()); }

    _cpHtml38() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(38)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('核查超期总数', '15件', 'highlight')}
                        ${this._cpRenderCard('平均超期天数', '4.8天')}
                        ${this._cpRenderCard('最长超期', '12天', 'negative')}
                        ${this._cpRenderCard('超期率', '3.1%')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区告知承诺核查超期排行TOP8</div><div id="cpc38" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">超期核查事项分布</div><div id="cpc38b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>办件编号</th><th>事项名称</th><th>承诺人/企业</th><th>承诺日期</th><th>核查期限</th><th>实际核查日期</th><th>超期天数（天）</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.name}</td><td>${d.promisor}</td><td>${d.promiseDate}</td><td>${d.checkLimit}天</td><td>${d.actualCheckDate}</td><td><span class="rv-status negative">${d.overDays}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart38() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 8) + 1 }));

        const c38 = echarts.init(document.getElementById('cpc38'));
        c38.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff9500', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c38b = echarts.init(document.getElementById('cpc38b'));
        c38b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 30, name: '食品经营', itemStyle: { color: '#ff3b30' } },
                    { value: 25, name: '建筑施工', itemStyle: { color: '#ff9500' } },
                    { value: 20, name: '医疗卫生', itemStyle: { color: '#00d4ff' } },
                    { value: 15, name: '交通运输', itemStyle: { color: '#34c759' } },
                    { value: 10, name: '其他', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 39: 重复检查分析 ============
    genCp39Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const fields = ['餐饮', '零售', '建筑', '制造', '其他'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `企业${i + 1}`,
            code: `9146${String(Math.floor(Math.random() * 1000000000000)).slice(0, 12)}`,
            field: fields[Math.floor(Math.random() * fields.length)],
            checkCount: Math.floor(Math.random() * 5) + 1,
            lastDate: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            depts: ['市场监管', '税务', '消防', '环保'][Math.floor(Math.random() * 4)] + '、' + ['市场监管', '税务', '消防', '环保'][Math.floor(Math.random() * 4)]
        }));
    }

    openCpModal39() { this._cpOpen(39, this.genCp39Data()); }

    _cpHtml39() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(39)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('重复检查总数', '35件', 'highlight')}
                        ${this._cpRenderCard('涉及企业', '28家')}
                        ${this._cpRenderCard('最高重复次数', '5次', 'negative')}
                        ${this._cpRenderCard('平均重复次数', '2.3次')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区重复检查数量排行TOP8</div><div id="cpc39" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">重复检查领域分布TOP5</div><div id="cpc39b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>企业/主体名称</th><th>统一社会信用代码</th><th>所属领域</th><th>检查次数</th><th>最近检查日期</th><th>涉及检查部门</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.name}</td><td>${d.code}</td><td>${d.field}</td><td><span class="rv-status negative">${d.checkCount}</span></td><td>${d.lastDate}</td><td>${d.depts}</td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart39() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 15) + 2 }));

        const c39 = echarts.init(document.getElementById('cpc39'));
        c39.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#af52de', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c39b = echarts.init(document.getElementById('cpc39b'));
        c39b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 30, name: '餐饮', itemStyle: { color: '#ff3b30' } },
                    { value: 25, name: '零售', itemStyle: { color: '#ff9500' } },
                    { value: 18, name: '建筑', itemStyle: { color: '#00d4ff' } },
                    { value: 15, name: '制造', itemStyle: { color: '#34c759' } },
                    { value: 12, name: '其他', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 40: 未响应联合检查任务分析 ============
    genCp40Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const types = ['跨部门双随机', '综合查一次', '专项联合检查', '其他'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `RW${String(i + 1).padStart(8, '0')}`,
            name: `任务${i + 1}`,
            leadDept: `牵头部门${i + 1}`,
            joinDepts: `参与部门${i + 1}、参与部门${i + 2}`,
            issueDate: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            deadline: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            status: Math.random() > 0.5 ? '未响应' : '已超期'
        }));
    }

    openCpModal40() { this._cpOpen(40, this.genCp40Data()); }

    _cpHtml40() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(40)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('未响应任务总数', '18件', 'highlight')}
                        ${this._cpRenderCard('涉及部门', '12个')}
                        ${this._cpRenderCard('平均响应时长', '已超期4.2天', 'negative')}
                        ${this._cpRenderCard('最长未响应', '15天', 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区未响应联合检查任务排行TOP8</div><div id="cpc40" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">未响应任务类型分布</div><div id="cpc40b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>任务编号</th><th>任务名称</th><th>牵头部门</th><th>参与部门</th><th>任务下发日期</th><th>响应截止日期</th><th>当前状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.name}</td><td>${d.leadDept}</td><td>${d.joinDepts}</td><td>${d.issueDate}</td><td>${d.deadline}</td><td><span class="rv-status ${d.status === '已超期' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart40() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 8) + 1 }));

        const c40 = echarts.init(document.getElementById('cpc40'));
        c40.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#5856d6', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c40b = echarts.init(document.getElementById('cpc40b'));
        c40b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 40, name: '跨部门双随机', itemStyle: { color: '#5856d6' } },
                    { value: 30, name: '综合查一次', itemStyle: { color: '#af52de' } },
                    { value: 20, name: '专项联合检查', itemStyle: { color: '#00d4ff' } },
                    { value: 10, name: '其他', itemStyle: { color: '#34c759' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 41: 承诺即入制核查超期分析 ============
    genCp41Data() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            code: `CR${String(i + 1).padStart(8, '0')}`,
            name: `事项${i + 1}`,
            promisor: `承诺人${i + 1}`,
            promiseDate: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            checkLimit: Math.floor(Math.random() * 10) + 3,
            actualCheckDate: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            overDays: Math.floor(Math.random() * 9) + 1
        }));
    }

    openCpModal41() { this._cpOpen(41, this.genCp41Data()); }

    _cpHtml41() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(41)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('核查超期总数', '8件', 'highlight')}
                        ${this._cpRenderCard('平均超期天数', '3.5天')}
                        ${this._cpRenderCard('最长超期', '9天', 'negative')}
                        ${this._cpRenderCard('超期率', '2.8%')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">各市/区承诺即入制核查超期排行TOP8</div><div id="cpc41" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">超期核查事项分布</div><div id="cpc41b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>办件编号</th><th>事项名称</th><th>承诺人/企业</th><th>承诺日期</th><th>核查期限</th><th>实际核查日期</th><th>超期天数（天）</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.code}</td><td>${d.name}</td><td>${d.promisor}</td><td>${d.promiseDate}</td><td>${d.checkLimit}天</td><td>${d.actualCheckDate}</td><td><span class="rv-status negative">${d.overDays}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart41() {
        const areas = ['海口市', '三亚市', '儋州市', '琼海市', '文昌市', '万宁市', '东方市', '五指山市'];
        const areaData = areas.map(area => ({ area, value: Math.floor(Math.random() * 5) + 1 }));

        const c41 = echarts.init(document.getElementById('cpc41'));
        c41.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: areaData.map(d => d.area), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: areaData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#34c759', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c41b = echarts.init(document.getElementById('cpc41b'));
        c41b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 30, name: '食品经营', itemStyle: { color: '#ff3b30' } },
                    { value: 25, name: '建筑施工', itemStyle: { color: '#ff9500' } },
                    { value: 20, name: '医疗卫生', itemStyle: { color: '#00d4ff' } },
                    { value: 15, name: '交通运输', itemStyle: { color: '#34c759' } },
                    { value: 10, name: '其他', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }

    // ============ MODAL 43: 重点领域检查缺位分析 ============
    genCp43Data() {
        const fields = ['食品药品', '特种设备', '危险化学品', '建筑工程', '消防安全'];
        const reasons = ['人员不足', '任务冲突', '计划遗漏', '其他'];
        const statuses = ['已整改', '整改中', '未整改'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            field: fields[Math.floor(Math.random() * fields.length)],
            planDate: `${2026}-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            actualDate: '-',
            absentDays: Math.floor(Math.random() * 30) + 5,
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            dept: `责任部门${i + 1}`,
            status: statuses[Math.random() > 0.7 ? Math.random() > 0.5 ? 2 : 1 : 0]
        }));
    }

    openCpModal43() { this._cpOpen(43, this.genCp43Data()); }

    _cpHtml43() {
        const data = this.cpModalData;
        const start = (this.cpCurrentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / this.pageSize);

        return `
            <div class="rv-modal">
                <div class="rv-modal-header"><span class="rv-modal-title">${this._cpTitle(43)}</span><span class="rv-modal-close">×</span></div>
                <div class="rv-modal-body">
                    <div class="rv-stat-row">
                        ${this._cpRenderCard('检查缺位总数', '7件', 'highlight')}
                        ${this._cpRenderCard('涉及重点领域', '4个')}
                        ${this._cpRenderCard('涉及部门', '6个')}
                        ${this._cpRenderCard('缺位时长', '平均15天', 'negative')}
                    </div>
                    <div class="rv-chart-row">
                        <div class="rv-chart-item"><div class="rv-chart-title">重点领域检查缺位分布</div><div id="cpc43" class="rv-chart"></div></div>
                        <div class="rv-chart-item"><div class="rv-chart-title">检查缺位原因分布</div><div id="cpc43b" class="rv-chart"></div></div>
                    </div>
                    <div class="rv-table-wrap">
                        <table class="rv-table">
                            <thead><tr><th>序号</th><th>重点领域名称</th><th>计划检查日期</th><th>实际检查日期</th><th>缺位天数（天）</th><th>缺位原因</th><th>责任部门</th><th>整改状态</th></tr></thead>
                            <tbody>${pageData.map((d, i) => `<tr><td>${start + i + 1}</td><td>${d.field}</td><td>${d.planDate}</td><td>${d.actualDate}</td><td><span class="rv-status negative">${d.absentDays}</span></td><td>${d.reason}</td><td>${d.dept}</td><td><span class="rv-status ${d.status === '已整改' ? 'positive' : d.status === '未整改' ? 'negative' : ''}">${d.status}</span></td></tr>`).join('')}</tbody>
                        </table>
                        <div class="rv-pagination"><span class="rv-page-prev ${this.cpCurrentPage <= 1 ? 'disabled' : ''}">‹</span><span class="rv-page-info">${this.cpCurrentPage}/${totalPages}</span><span class="rv-page-next ${this.cpCurrentPage >= totalPages ? 'disabled' : ''}">›</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    _cpChart43() {
        const fields = ['食品药品', '特种设备', '危险化学品', '建筑工程', '消防安全'];
        const fieldData = fields.map(f => ({ f, value: Math.floor(Math.random() * 5) + 1 }));

        const c43 = echarts.init(document.getElementById('cpc43'));
        c43.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', data: fieldData.map(d => d.f), axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, interval: 0, rotate: 30 } },
            yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } },
            series: [{
                type: 'bar', data: fieldData.map(d => d.value), barWidth: '50%',
                itemStyle: { color: '#ff3b30', borderRadius: [4, 4, 0, 0] },
                label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 10 }
            }]
        });

        const c43b = echarts.init(document.getElementById('cpc43b'));
        c43b.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
            legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 } },
            series: [{
                type: 'pie', radius: ['40%', '70%'], center: ['40%', '50%'],
                data: [
                    { value: 35, name: '人员不足', itemStyle: { color: '#ff3b30' } },
                    { value: 25, name: '任务冲突', itemStyle: { color: '#ff9500' } },
                    { value: 20, name: '计划遗漏', itemStyle: { color: '#00d4ff' } },
                    { value: 20, name: '其他', itemStyle: { color: '#af52de' } }
                ],
                label: { show: true, color: 'rgba(255,255,255,0.7)', fontSize: 10, formatter: '{b}\n{c}%' },
                itemStyle: { borderRadius: 4, borderColor: '#0a1628', borderWidth: 2 }
            }]
        });
    }
};
