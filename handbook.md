<a id="cover"></a>
# 巴西为主、墨西哥为辅：MFN 跨境物流学习手册

**面向 Amazon Global Selling 新兴市场 MFN/FBM 跨境物流 Program Manager**  
**版本：v1.0｜资料截点：2026-09-09｜主市场：巴西｜辅市场：墨西哥**

> **法律声明**　本手册是学习与项目管理材料，不构成法律、税务、报关、产品认证或危险品运输意见。法规、税率、平台政策、承运商产品和口岸执行可能随时变化。凡标记 **[必须内部/法务/承运商确认]** 的事项，上线前必须取得书面确认并保存版本证据。

> **重要状态提示（截至 2026-09-09）**　巴西 Medida Provisória（**MPV**，临时法令）1.357/2026 已由国会以 Projeto de Lei de Conversão（**PLV**，转换法案）13/2026 形式通过，处于总统签署或否决阶段；Receita Federal do Brasil（**RFB**，巴西联邦税务局）自 2026-05-12 执行的操作税制仍在运行。税务引擎必须参数化并持续复核最终法律或否决结果。[BR-1][BR-10]

---

## 目录

- [0. 如何使用本手册](#ch0)
- [1. 一页执行摘要](#ch1)
- [2. 角色心智模型与责任边界](#ch2)
- [3. 术语与缩写总表](#ch3)
- [4. 端到端跨境包裹流程](#ch4)
- [5. Incoterms 2020、MoR/EOR/IOR 与责任链](#ch5)
- [6. 巴西深度：监管、税务与清关](#ch6)
- [7. 巴西深度：商品、承运、异常与上线](#ch7)
- [8. 墨西哥深度：税制、清关与身份数据](#ch8)
- [9. 墨西哥深度：商品监管、异常与上线](#ch9)
- [10. 巴西与墨西哥比较及决策树](#ch10)
- [11. 承运商商业与运营管理](#ch11)
- [12. 系统、数据、追踪与对账](#ch12)
- [13. 预测、容量与服务承诺](#ch13)
- [14. Program Management 操作系统](#ch14)
- [15. 软技能与 Amazon 工作方式](#ch15)
- [16. 场景练习与答案框架](#ch16)
- [17. 30/60/90 天与六周预习计划](#ch17)
- [18. 可复用模板库](#ch18)
- [19. 入职后首先要问的 50 个问题](#ch19)
- [20. 官方来源与版本控制](#ch20)

---

<a id="ch0"></a>
# 0. 如何使用本手册

## 0.1 三种标签

| 标签 | 含义 | 使用动作 |
|---|---|---|
| **[法律/监管要求]** | 来自海关、税务、产品监管、数据保护或运输规则的要求 | 建证据、做控制、留审计轨迹；不可用运营便利替代 |
| **[运营惯例]** | 为提高稳定性、可视性和客户体验而建议的做法 | 按业务规模与系统能力实施，并用数据验证 |
| **[必须内部/法务/承运商确认]** | 依赖 Amazon 内部项目、销售主体、合同、具体 SKU、承运商产品或最新法规 | 未获得书面确认前不得形成外部承诺或自动路由 |

## 0.2 建议学习顺序

1. **第一周：**第 1–5 章，建立责任链与端到端语言。
2. **第二、三周：**第 6–10 章，掌握巴西主路径和墨西哥差异。
3. **第四周：**第 11–13 章，把国家知识变成承运、数据和容量机制。
4. **第五周：**第 14–16 章，练习项目治理、升级和案例判断。
5. **第六周：**第 17–20 章，形成入职计划、模板和问题清单。

每次学完一章，至少产出一个可复用物：线路卡、Stock Keeping Unit（**SKU**，库存单位）合规卡、税费计算表、事件字典、RACI、RAID 或决策备忘录。不要只做笔记。

---

<a id="ch1"></a>
# 1. 一页执行摘要

1. **MFN 是服务产品，不是一张面单。** Merchant Fulfilled Network（**MFN**，卖家履约网络；也常称 Fulfilled by Merchant，**FBM**，卖家自发货）要同时控制库存、出库、运输、申报、税费、追踪、异常、妥投和退货。
2. **三条流必须一致：**实物流、单证/合规流、数据流。大多数跨境事故源于它们的金额、商品、身份或标识符不一致。
3. **商业条款不创造法定资格。** Delivered Duty Paid（**DDP**，完税后交货）或 Delivered at Place（**DAP**，目的地交货）不能自动指定合法 Importer of Record（**IOR**，进口责任主体），也不能让 Amazon 自动成为 IOR。
4. **巴西是主战场。** 对符合条件的个人购买、Programa Remessa Conforme（**PRC**，合规寄递计划）认证平台及正确预申报链路，2026-05-12 起登记的 Declaração de Importação de Remessa（**DIR**，快件进口申报）：完税价格不超过 USD 50，联邦 Imposto de Importação（**II**，进口税）为 0%，但 Imposto sobre Circulação de Mercadorias e Serviços（**ICMS**，商品流通和服务税）仍征；USD 50–3,000 为 60% II 减 USD 30，再计 ICMS。非 PRC 一般为 60% II、无扣减，再计 ICMS。[BR-1][BR-2]
5. **巴西 USD 50 看完税价格。** 完税价格 = 商品 + 国际运费 + 保险。ICMS 是 gross-up（税中税）计算，而非简单乘税率。
6. **巴西政策仍需参数化。** MPV 1.357/2026 已经国会通过 PLV 文本并待总统签署/否决；现行操作规则未停，但最终法律可能改变参数。[BR-10]
7. **墨西哥中国直发的默认预算不是“USD 50 免税”。** 2026 RGCE 规则 3.7.35 对快件简易程序规定 33.5% tasa global（综合税率）。只有符合 T-MEC 条件且满足运单、价值及无非关税监管等条件时，才有 ≤USD 50 不缴 IGI/IVA（DTA 仍相关）、>50–117 为 17% 综合税率、>117 为 19% 综合税率。[MX-1]
8. **33.5%、17%、19% 都是综合税率。** 不应机械再叠加完整 Impuesto al Valor Agregado（**IVA**，增值税）；逐票最终计算由承运商/报关行确认。[MX-1]
9. **身份数据是清关前置控制。** 巴西通常要求 Cadastro de Pessoas Físicas（**CPF**，个人税号）或 Cadastro Nacional da Pessoa Jurídica（**CNPJ**，法人税号）；墨西哥重点是 Registro Federal de Contribuyentes（**RFC**，联邦纳税人登记号），部分场景涉及 Clave Única de Registro de Población（**CURP**，人口登记代码）。
10. **产品准入优先于税率。** 低价值不等于免产品监管。无线、健康、食品、动植物、儿童用品、插电产品、锂电池必须先做 SKU 级判断。
11. **核心管理指标不是平均时效。** 同时看承诺兑现率、P50/P90/P95/P99、首次放行率、清关异常率、追踪事件及时率、税差、首次派送成功率及有效妥投单票成本。
12. **Amazon 平台阈值不可写死。** 有效追踪、准时配送、项目资格、可用承运商等要求会按 marketplace、日期和项目变化；使用当前内部文档及 Seller Central 页面。

---

<a id="ch2"></a>
# 2. 角色心智模型与责任边界

## 2.1 这个 Program Manager 拥有什么

**拥有：**
- 从客户承诺倒推线路、清关、数据与容量的端到端设计；
- 将法规转化为 SKU、订单、承运商和系统控制；
- 服务级别、成本、容量、追踪、异常和退货的跨团队机制；
- 事实源、指标口径、Weekly/Monthly/Quarterly Business Review（**WBR/MBR/QBR**，周/月/季度业务回顾）、风险与决策节奏；
- 试点、上线准备、回滚阈值、根因分析与持续改善。

**不单独拥有：**
- 法律解释、税务意见、商品认证签发、海关最终裁量；
- Amazon marketplace 政策或卖家账号执法决定；
- 承运商/报关行依法必须独立履行的职责；
- 产品团队、财务、法务和运营团队各自的专业审批。

> **工作原则：**项目经理（Program Manager，**PM**）对“问题是否被完整定义、责任是否明确、证据是否可审计、决策是否按时发生”负责；不是替每个职能做专业结论。

## 2.2 MFN/FBM 与 FBA

Fulfillment by Amazon（**FBA**，亚马逊物流）通常指卖家先将库存送入 Amazon 履约中心，入仓后由 Amazon 执行储存、拣选、包装、配送以及较多客服/退货操作。MFN/FBM 由卖家及其第三方网络履约。[GEN-1][GEN-2]

| 维度 | MFN/FBM | FBA |
|---|---|---|
| 适用 | 长尾、试水、新品、定制、高价值或无法合理前置库存 | 稳定高销量、标准化、适合前置库存 |
| PM 重点 | 全程运输、清关、追踪、承诺、退货、承运商治理 | 补货、入仓、库存健康、容量与接收 |
| 主要风险 | 税号失败、首扫缺失、扣关、尾部时效、拒付税费、跨境退货 | 缺货、库容、入仓延迟、长期仓储与调拨 |
| 组合策略 | 可按 SKU/地区/季节与 FBA 并用 | 不应被视为唯一解 |

## 2.3 三条流和一条责任链

```text
实物流：订单 → 拣包 → 揽收 → 出口 → 干线 → 进口 → 末端 → 退货
单证流：发票 → 税号 → 分类 → 原产地 → 许可 → 申报 → 税票/放行 → 归档
数据流：订单 → 标签 → 预报 → 事件 → 异常 → Proof of Delivery（POD，妥投证明）→ 账单 → 退款/索赔
责任链：MoR → EOR → 承运/报关 → IOR/收件人 → 末端 → 售后
```

每个包裹至少应能由 `订单号—包裹号—SKU 行—AWB—申报号—税费凭证—POD—账单行` 串联。任何断点都应进入异常队列。

## 2.4 利益相关者地图

| 群体 | 关心什么 | PM 需要的承诺 |
|---|---|---|
| 客户/卖家 | 价格透明、承诺可信、追踪可见、异常可解释 | 明确税费、文件和退货体验 |
| 运营/仓库 | 截单、包装、扫描、交接、峰值 | 标准作业、容量与故障替代 |
| 产品/技术 | 字段、接口、错误码、版本、权限 | 可测试需求、验收和回滚 |
| 数据/Business Intelligence（**BI**，商业智能） | 事实源、口径、维表、延迟 | 数据合同与质量 SLA |
| 法务/税务/合规 | 模式、主体、证据、法规版本 | 书面意见、边界与复核频率 |
| 财务/采购 | 单价、附加费、税差、索赔、预算 | 可审计价卡与对账机制 |
| 承运商/报关行 | 货量、数据、禁限运、授权、付款 | 端到端 Service Level Agreement（**SLA**，服务等级协议）与原因码 |
| Amazon 内部业务 | 客户价值、卖家采用、风险、规模 | 决策叙事与可量化结果 |

---

<a id="ch3"></a>
# 3. 术语与缩写总表

| 缩写/术语 | 原文与中文 | 实务意义 |
|---|---|---|
| MFN / FBM | Merchant Fulfilled Network / Fulfilled by Merchant，卖家履约/卖家自发货 | 卖家及其服务商控制端到端履约 |
| FBA | Fulfillment by Amazon，亚马逊物流 | 库存进入 Amazon 履约网络后的模式 |
| 3PL / 4PL | Third-/Fourth-Party Logistics，第三/第四方物流 | 操作执行者/多方编排者 |
| MoR | Merchant of Record，交易责任主体 | 向消费者销售、收款、退款的主体 |
| EOR | Exporter of Record，出口责任主体 | 对出口申报和出口合规负责 |
| IOR | Importer of Record，进口责任主体 | 对进口申报、税费、许可和记录负责 |
| AWB / B/L | Air Waybill / Bill of Lading，空运单/提单 | 运输与清关关联凭证 |
| DDP / DAP | Delivered Duty Paid / Delivered at Place，完税后交货/目的地交货 | 成本风险分配；不替代法定 IOR |
| FCA / CPT / CIP | Free Carrier / Carriage Paid To / Carriage and Insurance Paid To，货交承运人/运费付至/运保费付至 | 常用于上游运输合同 |
| HS | Harmonized System，协调制度 | 全球六码分类框架 |
| NCM | Nomenclatura Comum do Mercosul，南共市商品编码 | 巴西税则及监管入口 |
| LIGIE / NICO | Ley de los Impuestos Generales de Importación y de Exportación / Número de Identificación Comercial，墨西哥进出口税则/商业识别号 | 墨西哥 8+2 位分类与监管入口 |
| RFB | Receita Federal do Brasil，巴西联邦税务局 | 巴西税务与海关主管机关 |
| PRC | Programa Remessa Conforme，合规寄递计划 | 认证平台预展示、代收税并预申报的框架 |
| RTS | Regime de Tributação Simplificada，简易征税制度 | 巴西国际包裹简化税制 |
| DIR | Declaração de Importação de Remessa，快件进口申报 | Correios/courier 在 Siscomex Remessa 登记 |
| II / ICMS | Imposto de Importação / Imposto sobre Circulação de Mercadorias e Serviços，联邦进口税/州商品流通税 | 巴西小包核心税项 |
| CPF / CNPJ | Cadastro de Pessoas Físicas / Cadastro Nacional da Pessoa Jurídica，个人/法人税号 | 巴西收件人和申报身份 |
| SAT / ANAM | Servicio de Administración Tributaria / Agencia Nacional de Aduanas de México，墨西哥税务管理局/国家海关总署 | 墨西哥税务与海关主管机关 |
| RGCE | Reglas Generales de Comercio Exterior，对外贸易一般规则 | 墨西哥海关操作规则 |
| T-MEC / USMCA | Tratado entre México, Estados Unidos y Canadá / United States–Mexico–Canada Agreement，美墨加协定 | 合格快件可能适用分层综合税率 |
| RFC / CURP | Registro Federal de Contribuyentes / Clave Única de Registro de Población，联邦税号/人口登记代码 | 墨西哥进口身份数据 |
| IGI / IVA / DTA | Impuesto General de Importación / Impuesto al Valor Agregado / Derecho de Trámite Aduanero，进口税/增值税/海关手续费 | 墨西哥税费要素；综合税率不可重复叠加 |
| NOM / RRNA | Normas Oficiales Mexicanas / Regulaciones y Restricciones No Arancelarias，官方标准/非关税监管 | 产品、标签、安全和许可约束 |
| OMS / WMS / TMS | Order/Warehouse/Transportation Management System，订单/仓储/运输管理系统 | 三类核心业务系统 |
| API / EDI / SFTP | Application Programming Interface / Electronic Data Interchange / Secure File Transfer Protocol，接口/电子数据交换/安全文件传输 | 实时或批量集成方式 |
| SLA / POD | Service Level Agreement / Proof of Delivery，服务等级协议/妥投证明 | 服务承诺和交付证据 |
| RFP | Request for Proposal，征求建议书 | 承运商采购与方案比较 |
| WBR/MBR/QBR | Weekly/Monthly/Quarterly Business Review，周/月/季度业务回顾 | 运营治理节奏 |
| RACI | Responsible, Accountable, Consulted, Informed，执行/最终负责/征询/知会 | 责任矩阵 |
| RAID | Risks, Assumptions, Issues, Dependencies/Decisions，风险/假设/问题/依赖或决策 | 项目控制清单 |
| CAPA | Corrective and Preventive Action，纠正与预防措施 | 根因关闭机制 |
| SDS / UN38.3 | Safety Data Sheet / 联合国锂电测试摘要 | 危险品和锂电运输证据 |
| LGPD | Lei Geral de Proteção de Dados，巴西通用数据保护法 | CPF 等个人数据治理 |
| P50/P95/P99 | 时效分布的第 50/95/99 百分位 | 观察典型与尾部体验 |
| SKU / ASIN | Stock Keeping Unit / Amazon Standard Identification Number，库存单位/亚马逊标准商品编码 | 商品、库存和合规控制主键 |
| KPI | Key Performance Indicator，关键绩效指标 | 需有定义、分母、事实源和 Owner |
| B2C / B2B | Business-to-Consumer / Business-to-Business，企业对消费者/企业对企业 | 进口用途、主体和责任通常不同 |
| CEP | Código de Endereçamento Postal，巴西邮政编码 | 地址和州别税务/服务校验字段 |
| VA | Valor Aduaneiro / Customs Value，海关完税价格 | 商品、运费、保险等构成税基 |
| LPCO | Licença, Permissão, Certificado e Outros Documentos，许可、证书及其他文件 | 巴西行政监管文件 |
| DOF / SNICE | Diario Oficial de la Federación / Servicio Nacional de Información de Comercio Exterior，墨西哥联邦官方公报/外贸信息服务 | 法规发布和税则监管查询 |
| DI / DSI | Declaração de Importação / Declaração Simplificada de Importação，巴西进口申报/简化进口申报 | 不适合 DIR 时可能使用的正式路径 |
| SOP | Standard Operating Procedure，标准作业程序 | 把职责、步骤、时限和证据固化 |
| GMV / BI | Gross Merchandise Value / Business Intelligence，商品交易总额/商业智能 | 业务规模与分析语境 |
| EPCIS / X12 214 | Electronic Product Code Information Services / 运输状态 EDI 报文标准 | 跨伙伴事件语义参考 |


---

<a id="ch4"></a>
# 4. 端到端跨境包裹流程

## 4.1 泳道式总图

| 阶段 | 卖家/仓库 | Amazon/订单产品 | 承运商/报关 | 海关/监管 | PM 控制点 |
|---|---|---|---|---|---|
| 商品准入 | 提供准确成分、用途、型号、价值 | 限制可售/可配送范围 | 给出禁限运与资料要求 | 按分类、许可、认证判断 | SKU 合规卡、绿黄红路由 |
| 下单 | 确认库存、包装和发货能力 | 收集地址、税号、展示税费与承诺 | 校验服务区、税号字段 | — | 支付前拦截缺失数据 |
| 建单出库 | 拣包、称重、逐行发票、贴标 | 生成订单/包裹标识 | 返回 AWB 和预报回执 | — | 四账一致：订单/发票/标签/预报 |
| 出口/干线 | 完成出口资料并交接 | 回传确认发货 | 安检、出口、航班、转运 | 起运国海关 | 首扫、航班、危险品合规 |
| 进口清关 | 及时补充真实证据 | 客服通知与退款控制 | 预申报、计税、查验响应 | 风险筛选、监管审查、放行 | 申报号、税差、hold 原因与时钟 |
| 末端 | — | 更新买家状态 | 分拨、派送、POD | — | 首派成功、地址失败、伪妥投 |
| 退货/处置 | 接收、检验、重售或报废 | 退款与客户沟通 | 本地退、回运、销毁、弃件 | 出口/再进口规则 | 决策阈值和成本归属 |
| 对账复盘 | 提供重量与交接证据 | 订单与退款账 | 运费、税费、附加费、索赔 | 税票/放行凭证 | 三账一致、CAPA、价卡审计 |

## 4.2 每个阶段必须回答的所有权问题

1. 谁拥有商品事实、分类意见和准入决定？
2. 谁收集并有权处理 CPF/CNPJ/RFC/CURP？
3. 谁是 Merchant of Record（**MoR**，交易责任主体）、Exporter of Record（**EOR**，出口责任主体）和 Importer of Record（**IOR**，进口责任主体）？
4. 谁冻结清关数据快照；取消、拆包、部分退款后谁更新？
5. 谁计算、展示、代收、代缴和最终承担税差？
6. 谁在到港前提交电子数据；失败是否阻止装机？
7. 谁响应海关补件，法定/商业截止时间是多少？
8. 谁决定继续补件、复核、退运、销毁或弃件？
9. 谁向客户发消息；客户承诺与实际承运产品是否一致？
10. 谁拥有账单争议和索赔回收，何时关闭？

## 4.3 关键控制点

**下单前：**
- SKU 在目标国/渠道可进口、可航空运输、可末端派送；
- 价格、运费、税费和可能的客户动作清楚；
- 地址、姓名、税号和联系方式通过最小校验；
- 服务承诺由当前容量和 P90/P95 表现支持。

**交接前：**
- 发票不是 `gift/accessory/sample` 等笼统描述；
- 商品行数量、单价、币种、原产地、分类、重量与订单一致；
- 危险品和电池文件齐全；
- 预报回执成功；重复建单由幂等键阻断。

**到港前后：**
- 能看见 `pre-advice accepted / customs filed / hold / released`，而非只有 `in transit`；
- hold 有责任方、原因码、材料清单、截止日和升级阈值；
- 税款估算与实际税单做包裹级比较。

**妥投后：**
- Proof of Delivery（**POD**，妥投证明）可检索；
- 承运商账单可关联订单、重量、区域、附加费和税费；
- 退件有最终处置事件，不停留在“return in transit”。

## 4.4 常见失败模式

| 失败 | 早期信号 | 止血 | 永久修复 |
|---|---|---|---|
| 税号缺失/无效 | 建单拒绝、到港补件 | 暂停装机，联系客户 | 结账前校验、字段契约、失败原因回传 |
| 商品描述过泛 | 预报警告、查验率升高 | 提交付款/商品证据 | SKU 模板和发票自动生成 |
| 申报价不一致 | 税差、RCV/估价 | 冻结同批次，提供真实支付证据 | 单一价格事实源和版本化快照 |
| 无首扫 | 平台未识别、仓库称已交接 | 交接清单逐票核对 | 扫描 SLA、袋箱关联、交接签收 |
| 清关黑箱 | 追踪长时间 in transit | 要求报关事件和异常表 | 合同化事件字典与 API |
| 尾部恶化 | 均值正常、P95/P99 拉长 | 分流、延长承诺 | 按网关/邮编/品类做容量与路由 |
| 账单上涨 | 单票成本升、附加费集中 | 暂缓争议项付款 | 价卡规则引擎、重量/区域审计 |

---

<a id="ch5"></a>
# 5. Incoterms® 2020、MoR/EOR/IOR 与责任链

International Chamber of Commerce（**ICC**，国际商会）制定的 Incoterms® 2020 解决买卖双方在交付中的任务、成本和风险分配，但不决定货权、付款、消费者保护、税务登记、产品许可或谁依法能担任 IOR。[GEN-3]

| 术语 | 风险转移与主要义务 | 进口清关 | MFN 使用提示 |
|---|---|---|---|
| Free Carrier（**FCA**，货交承运人） | 卖方在指定地点交给买方指定承运人并完成出口 | 买方 | 适合上游 B2B；精确写明交货地点 |
| Carriage Paid To（**CPT**，运费付至） | 卖方付至指定地运费；风险在交第一承运人时转移 | 买方 | “卖方付运费”不代表承担全程风险 |
| Carriage and Insurance Paid To（**CIP**，运保费付至） | CPT 加约定保险 | 买方 | 明确保额、受益人、免赔和理赔协作 |
| Delivered at Place（**DAP**，目的地交货） | 卖方运至指定地、卸货前交付 | 通常买方 | B2C 易出现拒缴税、拒收和滞留 |
| Delivered Duty Paid（**DDP**，完税后交货） | 卖方承担包括进口在内的最大义务 | 卖方须能合法安排 | 不能仅凭“包税服务”采用；先验证 IOR |

**合同最小表达：**

```text
Incoterm + 精确地点 + Incoterms® 2020
MoR / EOR / IOR 的法定名称和注册信息
税费承担方、代缴方和税差归属
申报数据提供/审核/提交/留存责任
拒收、退运、销毁、弃件和退款责任
```

> **禁止性假设**　不得写“Amazon 订单因此由 Amazon 自动担任 IOR”；不得写“从 Amazon 产生的订单自动符合 PRC 或 T-MEC”；不得把 DDP 等同于“外国卖家刷卡付税”。

---

<a id="ch6"></a>
# 6. 巴西深度：监管、税务与清关

## 6.1 监管地图与主路径

Receita Federal do Brasil（**RFB**，巴西联邦税务局）负责海关、税收、风险筛选、查验、放行及处罚。Programa Remessa Conforme（**PRC**，合规寄递计划）认证电商平台在结账时披露并收取相关税费、提前传输数据；Regime de Tributação Simplificada（**RTS**，简易征税制度）通常覆盖完税价格不超过 USD 3,000 的国际包裹；Declaração de Importação de Remessa（**DIR**，快件进口申报）由 Correios 或获授权 courier 在 Siscomex Remessa 中登记。[BR-1][BR-3][BR-4]

推荐主路径：

```text
SKU 准入 → 结账前 CPF/地址校验 → 判断 PRC 订单资格
→ 展示商品/运保费/II/ICMS → 冻结逐行清关数据
→ 承运商预报 → 到港前登记 DIR → 风险筛选/监管审查
→ 税款确认 → 放行 → 巴西末端 → POD/退货/对账
```

**[必须内部/法务/承运商确认]** RFB 公开名单列示特定 Amazon 巴西实体及站点曾获得 PRC 认证，但认证主体存在不代表任一中国卖家、任一站点、任一承运产品和任一订单自动具备 PRC 资格。必须逐项目验证销售主体、结账展示、数据传输和指定物流链路。[BR-5]

## 6.2 2026-09-09 操作税制

**[法律/监管要求]** 对 2026-05-12 起登记、面向自然人、通过 PRC 认证平台且满足流程条件的 DIR：[BR-1][BR-2]

| 路径 | Customs Value（**VA**，完税价格） | 联邦 II | 州 ICMS |
|---|---:|---:|---:|
| PRC 合格 | USD 0.01–50 | 0% | 依目的州 17%–20%，税中税 |
| PRC 合格 | >USD 50–3,000 | `60% × VA − USD 30` | 依目的州 17%–20%，税中税 |
| 非 PRC/不符合条件 | USD 0.01–3,000 | `60% × VA`，无扣减 | 依目的州 17%–20%，税中税 |

其中：

\[
VA=商品实际成交价值+国际运费+保险
\]

\[
II_{PRC,\le50}=0
\]

\[
II_{PRC,>50}=\max(0,0.60\times VA-30美元等值)
\]

\[
ICMS=\frac{VA+II}{1-r}\times r
\]

`r` 为目的州适用 ICMS 税率。总进口税费（不含承运商服务费）为 `II + ICMS`。

### 示例 A：PRC，VA = USD 42，ICMS 17%

- II = 0；
- ICMS = `42 / (1−17%) × 17% = USD 8.60`；
- 税费合计 = USD 8.60。

**结论：**“0% II”不是“完全免税”。

### 示例 B：PRC，VA = USD 66，ICMS 17%

- II = `66×60%−30 = USD 9.60`；
- ICMS = `(66+9.60)/(1−17%)×17% = USD 15.48`；
- 税费合计 = USD 25.08。

### 示例 C：非 PRC，VA = USD 42，ICMS 17%

- II = `42×60% = USD 25.20`；
- ICMS = `(42+25.20)/(1−17%)×17% = USD 13.76`；
- 税费合计 = USD 38.96。

> **计算警告**　汇率、州税率、税基调整、承运商费用和单票资格必须以实际申报日及承运商/税务顾问确认结果为准。报价引擎需保存参数版本，不得把示例当作税务凭证。

## 6.3 立法状态与变更管理

**[法律/监管要求]** 截至 2026-09-09，MPV 1.357/2026 已由巴西国会以 PLV 13/2026 形式通过并送总统签署/否决，尚不能将其描述为已完成总统签署的永久法律。[BR-10]

**[运营惯例]** 现行 RFB 页面仍明确执行 2026-05-12 起的 0%/USD 30 规则，因此运营不能自行停用，但应：
- 将 `50 / 0% / 60% / 30 / 州 ICMS` 全部参数化；
- 每周检查总统签署/否决及 RFB 实施说明，最终落地后进行紧急回归测试；
- 保存“法规发布日期、业务生效日、DIR 登记日、税务引擎版本、承运商确认日”；
- 为税率回滚、税差吸收、客户重报价和已下单未申报包裹定义处理原则。

## 6.4 CPF/CNPJ、个人进口和商业进口

Cadastro de Pessoas Físicas（**CPF**，个人税号）和 Cadastro Nacional da Pessoa Jurídica（**CNPJ**，法人税号）是 DIR 的关键身份数据。号码需处于 RFB 可接受状态；姓名、税号、地址不一致会导致无法登记、补件、退运或弃置风险。[BR-4][BR-6]

**[运营惯例]**
- 支付前做格式、状态、姓名和地址合理性校验；
- 不把客服聊天当作长期保存税号的数据库；
- 按 Lei Geral de Proteção de Dados（**LGPD**，巴西通用数据保护法）执行目的限定、最小化、加密、权限、留存和删除；
- 对同一 CPF 高频、多地址、同址多 CPF、大量同 SKU 等模式做欺诈与商业用途风险检测。

**[法律/监管要求]** 个人包裹不能被用作转售、加工或提供服务的规避通道。B2B 补货、受监管商品、超限或明显商业数量，应转由合格巴西法人及正式进口路径；不能通过拆票、改品名或低报维持 RTS。

## 6.5 Correios 与 courier

| 维度 | Correios（巴西邮政） | Express courier（国际快递） |
|---|---|---|
| 事件和预清关 | 依邮政链路，粒度通常较低 | 通常更适合 API、预报和异常工单 |
| 税费/补件体验 | 常经 Minhas Importações 等渠道 | 可提供代缴、客服和报关代理服务 |
| 时效/成本 | 可能较经济，尾部与补件可控性较弱 | 较快、费用高，服务差异大 |
| 适合 | 低风险、低时效敏感且客户可接受 | 主力 Business-to-Consumer（**B2C**，企业对消费者）商业件、需可视化和异常 SLA |

**[必须内部/法务/承运商确认]** 承运商是否在 RFB 授权名单；是否能承接目标 PRC/Amazon 订单；DIR 由哪个实体提交；是否返回 DIR 编号、II/ICMS 明细、RCV/RPE、监管转交、税款和退运事件。[BR-7]

## 6.6 DIR 数据与海关控制

**[法律/监管要求]** DIR 通常包括追踪号、重量、运费、保险、发收件人、CPF/CNPJ、完整地址、逐项商品描述、数量、价值、税额等；商品描述可使用葡萄牙语、英语或西班牙语，但必须足以识别。所有国际包裹均受海关控制，可被 X 光、审单、查验或转主管机关；PRC 低风险不等于免查验。[BR-4][BR-6]

建议冻结 `customs_snapshot_version`：

```text
order_id, package_id, awb, invoice_no
shipper, consignee_name, CPF/CNPJ, address, Código de Endereçamento Postal（CEP，邮政编码）, phone, email
SKU, description_pt/en, brand, model, material, use, qty, unit_value, currency
product_value, discount, freight, insurance, customs_value
origin_country, HS, NCM, regulator_flags
battery_UN, Wh, SDS_ref, UN38.3_ref
PRC_eligibility, tax_version, Incoterm, tax_payer, return_instruction
```

---

<a id="ch7"></a>
# 7. 巴西深度：商品、承运、异常与上线

## 7.1 NCM 与监管机构

Nomenclatura Comum do Mercosul（**NCM**，南共市商品编码）不是供应商 HS 六码的简单复制。应建立 `全球 HS → 巴西 NCM → 主管机关/许可 → SKU/Amazon Standard Identification Number（ASIN，亚马逊标准商品编码）` 的版本映射，并由巴西专业方复核高销量和高风险商品。[BR-8]

| 机构 | 原文与典型触发 | 准入动作 |
|---|---|---|
| ANVISA | Agência Nacional de Vigilância Sanitária，国家卫生监督局；药品、医疗、化妆品、食品、补充剂、卫生产品 | 确认个人进口例外、注册/通知、处方、Licença, Permissão, Certificado e Outros Documentos（**LPCO**，许可、证书及其他文件）；低价不豁免 |
| ANATEL | Agência Nacional de Telecomunicações，国家电信局；手机、Wi‑Fi、Bluetooth、无线遥控 | 型号级 homologação；个人自用安排不可用于商业转售 |
| INMETRO | Instituto Nacional de Metrologia, Qualidade e Tecnologia，国家计量、质量和技术研究院；玩具、家电、电器、安全类 | 查询强制合格评定及 LPCO |
| MAPA/Vigiagro | Ministério da Agricultura e Pecuária / Vigilância Agropecuária Internacional，农业和畜牧部/国际农业检疫 | 动植物、肉乳、蜂蜜、种子、木材等原则上先排除，许可先行 |
| IBAMA/CITES | 环境与濒危物种监管；Convention on International Trade in Endangered Species | 物种和衍生材料筛查、许可和证据 |

**基础红线：**毒品、枪支弹药、爆炸物、仿真枪、现金、电子烟、部分烟草、危险废物、受保护动植物及衍生品等不得进入普通小包自动路由。[BR-9]

## 7.2 电池、危险品和液体

**[法律/监管要求]** 航空危险品规则、起运国出口规则、航司和承运商政策与巴西进口准入是四个独立门槛。可清关不代表可航空运输。

- UN3480：单独锂离子电池；
- UN3481：与设备同包装或安装于设备的锂离子电池；
- 每个 SKU 保存 Wh、锂含量、可拆卸性、SDS（Safety Data Sheet，安全数据表）、UN38.3 测试摘要、包装照片、荷电状态及承运商批准；
- 单独/备用电池、移动电源、无人机电池、损坏或召回电池应人工审批或禁运；
- 退货前重新检查航空可回运性，不能假定正向可运即逆向可运。[GEN-6]

## 7.3 RCV、RPE、处罚和时钟

| 场景 | 巴西事件 | 立即动作 | 管理时钟 |
|---|---|---|---|
| 价值存疑 | Retenção para Comprovação de Valor（**RCV**，价值证明扣留） | 订单、支付、发票、运保费和促销证据 | 通常补件窗口需严密监控 |
| 性质不清 | Retenção para Esclarecimentos（**RPE**，说明扣留） | 说明用途、材质、型号、数量、自用/商业用途 | 建责任人和截止日 |
| 监管转交 | ANVISA/ANATEL/MAPA 等 | 暂停同 SKU，评估许可、退运或销毁 | 不套用普通清关 SLA |
| 税务重估 | 补税/罚款/复核 | 保全原始证据，付款前判断复核 | 复核窗口不可错过 |
| 违禁/伪报 | 扣押、销毁、没收 | 法务、合规、品牌保护升级 | 立即停止同类发运 |

RFB 资料显示，补充说明通常需在 30 日内完成；Correios 税费/处理费存在 20 日支付窗口，复核亦有时限。具体起算点必须以实际通知和承运商流程确认。[BR-6]

**[法律/监管要求]** 低报、虚假品名、把零售系统性标为 gift/sample、拆单避税可能导致估价、补税、罚款、退运或 perdimento（没收）。RFB 可要求订单与付款证据并在放行后继续复核。[BR-11]

## 7.4 退货、弃件与处置

决策顺序：

```text
是否可补件/补税并仍有客户价值？
├─ 是：补件/复核 → 放行 → 派送
└─ 否：能否合法且经济地退运？
   ├─ 是：办理出口/回运 → 中国接收与检验
   └─ 否：是否允许本地销毁/清算？
      ├─ 是：取得销毁证据并结案
      └─ 否：法务决定弃置/监管处置
```

已进口后退回境外通常是新的出口事件，不会自动取消原进口或退回税款。必须把国际逆向运费、仓储、税费损失、销毁费、客户退款和品牌风险一起算。

## 7.5 巴西 Key Performance Indicator（**KPI**，关键绩效指标）与上线检查

**建议 KPI：**PRC 正确路由率、到港前 DIR 登记率、CPF 首次通过率、首次放行率、RCV/RPE 率、监管转交率、`DIR registered → released` P50/P95、税差率、首次派送成功率、退运/弃件率、异常首响/关闭时长。

**巴西上线清单：**
- [ ] 每个 SKU 有 NCM、分类证据、监管筛查和版本 Owner。
- [ ] 无线、健康、食品、动植物、玩具、电器和电池完成人工审批。
- [ ] 目标订单的 PRC 资格、平台披露、税款链路和承运产品得到书面确认。
- [ ] 税引擎按 `货值+运费+保险` 判断阈值，并实现 II/ICMS gross-up。
- [ ] MPV/PLV 状态和州 ICMS 更新进入固定法规观察表。
- [ ] CPF/CNPJ、姓名、CEP、州、地址、电话在发货前校验。
- [ ] 发票、AWB、订单和电子预报逐行一致。
- [ ] 承运商返回 DIR、税项、RCV/RPE、监管、放行、末端和退件事件。
- [ ] 20/30 日类截止时间有自动提醒和升级。
- [ ] 峰值舱位、网关、清关台席、末端与退运仓均完成压力测试。
- [ ] 客服有葡语税费、CPF、补件、反诈骗、拒收和退货话术。
- [ ] 正常件、税号错、金额错、监管 hold、电池拒收、重复事件、退运均通过演练。


---

<a id="ch8"></a>
# 8. 墨西哥深度：税制、清关与身份数据

## 8.1 监管地图与默认判断

Servicio de Administración Tributaria（**SAT**，墨西哥税务管理局）负责税务规则，Agencia Nacional de Aduanas de México（**ANAM**，墨西哥国家海关总署）负责海关执行。Reglas Generales de Comercio Exterior（**RGCE**，对外贸易一般规则）规定快件简易程序，授权快件企业在符合条件时申报。[MX-1][MX-2]

> **第一判断**　中国直发或中国原产商品经第三国中转，不应默认享有 Tratado entre México, Estados Unidos y Canadá（**T-MEC**，美墨加协定；英文 USMCA）便利。“从美国仓发货”不是原产资格证明。

典型路径：

```text
SKU 的 LIGIE/NICO、NOM、RRNA 和危险品审查
→ 收件人 RFC/必要时 CURP → 真实发票和 AWB
→ 承运商预报 → 简易 pedimento 或转常规进口
→ 税费/查验/补件 → 放行 → 末端/POD → pedimento 与账单归档
```

## 8.2 2026 RGCE 规则 3.7.35：必须正确理解

**[法律/监管要求]** SAT 2026 年 RGCE 第一次修订整合文本第 281–282 页、规则 3.7.35 明确：[MX-1]

| 场景 | 税务处理 | 关键条件 |
|---|---|---|
| 快件简易程序的一般档 | **33.5% tasa global（综合税率）** | 仍受简易程序、商品和申报条件限制 |
| 合格 T-MEC，完税价格 ≤ USD 50 | 不缴 Impuesto General de Importación（**IGI**，进口一般税）和 Impuesto al Valor Agregado（**IVA**，增值税） | 有 AWB/B/L、价值不超限、不受 RRNA；仍支付法定 DTA 定额 |
| 合格 T-MEC，> USD 50–117 | **17% 综合税率** | 有 AWB/B/L、价值不超限、不受 RRNA |
| 合格 T-MEC，> USD 117 | **19% 综合税率** | 有 AWB/B/L、不受 RRNA；适用上限和其他简易条件仍需确认 |

Derecho de Trámite Aduanero（**DTA**，海关手续费）在 ≤USD 50 的 T-MEC 条款中仍被明确提及。承运商代垫费、清关服务费、仓储或其他商业收费不是同一概念。

> **严禁重复计税**　33.5%、17% 和 19% 均是规则所称 `tasa global`。不能把 33.5% 当作关税后再机械加 16% IVA，也不能在 17%/19% 上再机械叠加 IVA。最终每票税基、DTA、特殊消费税、规则 3.7.6 特殊商品和承运商费用必须由承运商/报关行确认。

### 中国直发与 T-MEC 的对比

| 问题 | 中国直发常见结论 | 可能合格的 T-MEC 情形 |
|---|---|---|
| 原产/来源 | 中国原产，不因经美国仓改变 | 满足 T-MEC 规则并有证据 |
| 低值便利 | 不存在普遍 USD 50 免 IGI/IVA 假设 | ≤USD 50 可在条件满足时免 IGI/IVA，DTA 仍相关 |
| 预算税率 | 合格简易件通常先按 33.5% global 做预算 | >50–117 为 17%；>117 为 19% global |
| 单证 | 真实发票、AWB、原产地、RFC、商品信息 | 另需能支持 T-MEC 资格和来源条件 |
| 风险 | 假借美国仓、低报、拆票 | 资格证据不足或商品受 RRNA 即失去便利 |

### 成本示例

1. **中国直发普通家居用品，完税价格 USD 80：**若符合简易程序但不符合 T-MEC，预算税为 `80×33.5%=USD 26.80`。不要再机械加 IVA；另列已确认的 DTA/承运商费用。
2. **真正符合 T-MEC 的普通非监管商品，USD 90：**在规则条件均满足时，global 税为 `90×17%=USD 15.30`。
3. **合格 T-MEC 普通商品，USD 160：**若仍可走简易程序且无 RRNA，global 税为 `160×19%=USD 30.40`。
4. **中国原产蓝牙耳机从美国仓发出，USD 80：**仓库地点不创造 T-MEC 原产资格；同时需 Instituto Federal de Telecomunicaciones（**IFT**，联邦电信研究所）与电池运输审查，不能直接套 17%。

**[必须内部/法务/承运商确认]** 海关完税价格如何包含运保费和调整项、USD 2,500 简易程序常见上限在具体申报中的适用、DTA、特殊税、促销/折扣、拆包以及 3.7.6 特殊商品税率。

## 8.3 RFC、CURP、pedimento 与 IOR

Registro Federal de Contribuyentes（**RFC**，联邦纳税人登记号）是快件和进口身份的关键数据。Clave Única de Registro de Población（**CURP**，人口登记代码）在部分法律/电子申报场景被提及，但不应自行认定为所有承运商都接受的 RFC 替代物。[MX-2][MX-3]

**结账/发货控制：**
- RFC 格式、主体名称和 IOR 模式匹配；
- 仅在合法、必要并经确认时采集 CURP；
- 电话/邮箱用于补件和末端，不替代税务身份；
- 身份材料加密、最小权限、设留存期限；
- 建单失败在起飞前解决，不把补件留到墨西哥到港。

Pedimento（进口申报单）是货物合法进口和后续持有/销售的重要证据。常规商业进口通常需要具备 RFC、Padrón de Importadores（进口商名录）资格的墨西哥主体和报关代理；简易快件企业代办不意味着商品价值、原产地、许可和商业责任消失。[MX-2][MX-4]

> **IOR 原则**　Amazon 不是默认墨西哥 IOR。DDP 也不自动产生合法 IOR。合同中同时保留“法定 IOR/收件人”和“税费承担方”两个字段。

## 8.4 简易程序的适用边界

适合：低价值、描述明确、非受监管、非危险或承运商已批准、个人消费、数据完整的航空/陆路快件。

应转常规进口：
- 超出适用价值上限；
- 需要完整商业进口、税务抵扣或墨西哥本地库存；
- 受 RRNA、许可、NOM、卫生、农业或无线监管且简易路径不适用；
- 商品难以识别，如需理化分析的粉末、液体或药剂形态；
- 零价值、无价值、品名笼统或疑似拆票规避；
- 承运商无法依法使用简易程序。[MX-1][MX-2]

---

<a id="ch9"></a>
# 9. 墨西哥深度：商品监管、异常与上线

## 9.1 LIGIE/NICO 和 NOM

Ley de los Impuestos Generales de Importación y de Exportación（**LIGIE**，进出口一般税法税则）采用 8 位税号，并结合 Número de Identificación Comercial（**NICO**，商业识别号）。不可直接复制中国税号或美国 HTSUS。分类依据应包括功能、材质、成分、原理、套装构成、电池和无线模块。[MX-5]

Normas Oficiales Mexicanas（**NOM**，墨西哥官方标准）可能涉及产品安全、能效、信息和西班牙语标签。Anexo 2.4.1 的快件便利必须按条款、税号、货值和申报情形判断；它不等于全面免除产品、卫生、标签和消费者保护要求。[MX-6]

| 机关 | 原文与范围 | SKU 准入动作 |
|---|---|---|
| COFEPRIS | Comisión Federal para la Protección contra Riesgos Sanitarios，联邦卫生风险防护委员会；食品、饮料、补充剂、化妆品、药品、医疗器械 | 许可、注册/通知、成分、标签、卫生文件 |
| SENASICA | Servicio Nacional de Sanidad, Inocuidad y Calidad Agroalimentaria，国家农业食品卫生、安全和质量服务局；动植物、种子、木材、宠物食品、农产品 | 按产品、物种、原产国查检疫要求和证书 |
| IFT | Instituto Federal de Telecomunicaciones，联邦电信研究所；Wi‑Fi、Bluetooth、蜂窝等 | 查询 homologación；FCC 不替代 IFT |
| Secretaría de Economía | 经济部；LIGIE、NICO、NOM、配额与许可 | 以最新 Diario Oficial de la Federación（**DOF**，联邦官方公报）/Servicio Nacional de Información de Comercio Exterior（**SNICE**，外贸信息服务）和 Anexo 为准 |

高风险：酒类、烟草、药品、受控化学品、侵权品、武器及仿制品、现金、动植物、粉末/液体/药剂形态、无线设备、单独锂电池。平台可售或承运商愿收均不代表可进口。

## 9.2 电池与危险品

按 International Air Transport Association（**IATA**，国际航空运输协会）和 International Civil Aviation Organization（**ICAO**，国际民航组织）危险品规则、承运商差异和航线限制执行。至少记录：UN 编号、Wh、包装指令、SDS、UN38.3、标签、数量限制、中转机场、末端和退运能力。[GEN-6][GEN-7]

## 9.3 异常处理

| 异常 | 48 小时止血 | 根因与长期动作 |
|---|---|---|
| RFC 失败 | 阻止起飞；安全补采或取消 | 结账校验、姓名匹配、承运商错误码 |
| 33.5% 税费“惊喜” | 复核是否错误使用 T-MEC 假设；停止同模型报价 | 原产/来源资格矩阵、综合税率规则和客户披露 |
| NOM/RRNA hold | 暂停 SKU，收集分类、标签和许可 | 墨西哥分类意见、准入闸门 |
| IFT hold | 型号、无线参数、核准证据 | 设备目录和型号级准入 |
| 估价/低报 | 提交订单、付款、发票、运费 | 单一价格事实源，禁止手工改值 |
| 无追踪/伪妥投 | 抽取运单、源事件、POD，必要时暂停切流 | 事件字典、平台映射、证据 SLA |
| 未清关/弃货 | 评估补件、退运、销毁截止日 | 处置矩阵和成本责任 |

从墨西哥退回中国是出口；以后再进口通常是新进口。原 pedimento 和原税款不会自动复用或退回。保修、维修、误发、退运再进口应由报关行设计并保存序列号和全链路单证。

## 9.4 承运商准入问题

1. 墨西哥清关实体是否持有效 ANAM 快件授权，何时到期？
2. 简易程序适用价值、运输方式、口岸和排除品类是什么？
3. 3.7.35 的 33.5%/17%/19% 在系统中如何判断；哪些字段和证据决定 T-MEC？
4. DTA、特殊税、代垫费、清关费和仓租如何区分？
5. RFC/CURP/姓名地址错误的拦截时点和改正截止时间？
6. 能否返回 pedimento、税费凭证、查验和监管原因码？
7. 电池、危险品和逆向运输的具体批准范围？
8. 退运/销毁/弃件费用和授权链？
9. 数据 API/webhook 延迟、补数、保存期限和审计权？
10. 旺季日容量、网关、备用口岸、清关和末端恢复能力？

## 9.5 墨西哥上线清单

- [ ] LIGIE 8 位税号与 NICO 有墨西哥专业复核。
- [ ] NOM、COFEPRIS、SENASICA、IFT 和其他 RRNA 筛查完成。
- [ ] 中国直发默认不套 T-MEC；任何 T-MEC 资格有书面证据。
- [ ] 33.5%、17%、19% 作为 global rate 实现，未重复叠加 IVA。
- [ ] ≤USD 50 T-MEC 情形仍处理 DTA 与承运商费用。
- [ ] RFC 发货前校验；CURP 仅在确认场景采集。
- [ ] IOR、税费承担方、报关授权、pedimento 归档已合同化。
- [ ] 简易程序不适用时可自动/人工转常规进口或阻止发货。
- [ ] 含电池和危险品已取得具体 SKU/航线批准。
- [ ] 税费披露、补件、西班牙语客服、拒收和退货方案完成。
- [ ] 通过正常、RFC 错、T-MEC 误判、RRNA hold、重复事件和账单异常测试。

---

<a id="ch10"></a>
# 10. 巴西与墨西哥比较及决策树

## 10.1 核心比较

| 维度 | 巴西 | 墨西哥 |
|---|---|---|
| 主管体系 | RFB；Siscomex Remessa；其他产品机构 | SAT/ANAM；授权快件企业；其他产品机构 |
| 简化路径 | RTS + DIR；PRC 是关键体验/税制机制 | 快件简易程序 + pedimento；RGCE 3.7.35 |
| 身份 | CPF/CNPJ | RFC；部分场景 CURP |
| 低值逻辑 | PRC 合格且 VA≤50：II 0%，ICMS 仍征 | 仅合格 T-MEC ≤50：IGI/IVA 不缴，DTA 仍相关 |
| 中国直发默认 | 若不符合 PRC，一般 60% II + ICMS | 通常按 33.5% global 预算，不享普遍 50 美元免税 |
| 中档 | PRC >50–3,000：60% II 减 USD 30 + ICMS | 合格 T-MEC >50–117：17% global |
| 高一档 | 同上至 3,000 | 合格 T-MEC >117：19% global，受简易边界约束 |
| 产品分类 | NCM | LIGIE 8 位 + NICO |
| 主要产品机构 | ANVISA、ANATEL、INMETRO、MAPA/Vigiagro、IBAMA | COFEPRIS、SENASICA、IFT、经济部/NOM |
| 主要操作风险 | PRC 误判、CPF、ICMS gross-up、RCV/RPE、监管转交 | T-MEC 误判、RFC、global rate 重复计税、NOM/RRNA |
| 退货 | 退境外是出口，原进口不自动取消 | 退中国是出口，再进口通常是新进口 |

## 10.2 国家/税制决策树

```text
订单目的国？
├─ 巴西
│  ├─ 商品是否允许小包个人进口、无监管阻断？否→正式进口/停售
│  ├─ 订单是否经确认符合 PRC 平台+结账+数据+承运链？
│  │  ├─ 是：VA≤50？是→II 0 + ICMS；否→60% II−USD30 + ICMS
│  │  └─ 否：通常 60% II + ICMS
│  └─ CPF/地址/预申报/电池文件是否通过？否→阻止发货
└─ 墨西哥
   ├─ 商品是否可走简易程序且无 RRNA 阻断？否→常规进口/停售
   ├─ 是否有可证明的 T-MEC 资格和来源条件？
   │  ├─ 否：通常 33.5% global 预算
   │  └─ 是：VA≤50→IGI/IVA 0、DTA；>50–117→17%；>117→19%
   └─ RFC/IOR/运单/监管文件是否通过？否→阻止发货
```

## 10.3 DDP/DAP 决策树

```text
是否有合法、已准备的目的国 IOR/清关安排？
├─ 否：不得承诺真正 DDP；评估 DAP 或重构主体
└─ 是：税费能否在结账准确展示并由链路代缴？
   ├─ 否：高税差/拒收风险；延后上线或限制 SKU
   └─ 是：退运、补税、服务费、争议和客户退款是否合同化？
      ├─ 否：未准备就绪
      └─ 是：可进入试点，仍需逐票监控
```


---

<a id="ch11"></a>
# 11. 承运商商业与运营管理

## 11.1 RFP：按线路和服务产品采购

Request for Proposal（**RFP**，征求建议书）必须按 `起运仓 × 目的国/区域 × 服务级别 × 重量/体积 × 商品属性` 发出，至少要求：

- 覆盖邮编、偏远区、禁限运和危险品矩阵；
- 仓库截单、揽收频率、首扫、航班/干线、网关、清关、末端和退件能力；
- 分包商、清关实体、IOR 支持、PRC/T-MEC 判断方式；
- 历史 P50/P90/P95/P99，不只给平均时效；
- 事件字典、API/EDI/SFTP、延迟、重传、POD 和数据保留；
- 基础运费、计费重、燃油、旺季、住宅、偏远、地址修正、超尺寸、清关、代垫、仓储、退件和销毁费；
- 索赔材料、赔付上限、责任除外、提交和付款周期；
- 保底/峰值容量、拒收阈值、备用网关和业务连续性；
- 审计权、价格调整通知期、汇率/燃油指数来源和退出条款。

## 11.2 计费重与价卡

\[
体积重=\frac{长\times宽\times高}{体积系数}
\]

\[
计费重=\max(实重,体积重)，再按价卡进位
\]

不同承运商的单位、系数、进位、单边/周长限制和多件合并规则不同。价卡模型需保留：生效日、币种、汇率、最低计费重、区域、服务、燃油基数、附加费是否叠加、税费是否含在报价中。

## 11.3 总成本公式

\[
Total\ Landed\ Cost = 商品成本+国际运费+附加费+进口税费+清关/代垫+末端+系统/人工+库存/资金成本
\]

\[
Effective\ Delivered\ Cost=\frac{运输+附加费+税费损失+退件/弃件+索赔净损失+人工系统成本}{成功妥投包裹数}
\]

\[
Tax\ Estimate\ Variance=\frac{|实际税费-结账估算税费|}{\max(实际税费,最小稳定值)}
\]

同时看每发出件成本和每妥投件成本；前者用于采购，后者用于客户经济性。低面单价但高失败、高退件和高税差的线路可能更贵。

## 11.4 SLA 和 scorecard

| 层级 | 指标 | 口径提醒 |
|---|---|---|
| 仓/交接 | 按时交接、首扫及时、拒收率 | 打印面单不等于物理交接 |
| 干线 | 离港准时、错装/甩货、到港 | 按计划与实际里程碑比较 |
| 清关 | 预报及时、首次放行、P50/P95、可控 hold | 按数据/商品/海关/监管拆因 |
| 末端 | 出派、首次派送成功、妥投、POD、损失 | 区分首次失败与最终失败 |
| 数据 | 事件完整、及时、重复、映射、平台有效追踪 | 原始与标准化事件双留存 |
| 成本 | 账单准确、附加费、税差、索赔回收 | 按价卡、重量、区域逐行验证 |
| 容量 | 合同容量、实际接收、峰值恢复 | 不能只看航班舱位 |

**尾部时效：**`P95−P50` 反映网络稳定性。P50 改善但 P95/P99 恶化，不能宣称客户体验改善。

## 11.5 WBR/MBR/QBR

- Weekly Business Review（**WBR**，周业务回顾）：上周 KPI、异常 Top 5、清关时钟、容量、行动项。
- Monthly Business Review（**MBR**，月业务回顾）：趋势、成本、账单争议、服务承诺、路线和产品缺口。
- Quarterly Business Review（**QBR**，季度业务回顾）：战略容量、旺季、续约/淘汰、技术路线图、高层承诺。

会议输出必须是 `Decision / Action / Owner / Due date / Verification`，而不是幻灯片数量。

## 11.6 索赔和审计

- 建立丢件、损坏、延误、错计费、税费错误、伪妥投的证据包；
- 按合同窗口自动提醒，不能在窗口结束后批量索赔；
- 将“可索赔金额、已提交、已获批、已到账”分开；
- 每月随机抽样运单核对重量、区域、燃油、偏远和税费；
- 对承运商手工调整、重复账单、负数冲销和汇率变化设置异常规则。

---

<a id="ch12"></a>
# 12. 系统、数据、追踪与对账

## 12.1 系统边界

- Order Management System（**OMS**，订单管理系统）：订单、取消、承诺、付款、客户和确认发货。
- Warehouse Management System（**WMS**，仓储管理系统）：库存、拣包、重量尺寸、标签、交接。
- Transportation Management System（**TMS**，运输管理系统）：承运商选择、建单、路由、事件、成本、索赔。
- 合规/税务服务：商品准入、分类、税率、身份校验、申报快照。
- 数据平台：原始数据、标准模型、指标、告警和审计。

任何系统都不能以“我是主系统”为由覆盖其他系统的原始证据。应定义字段级 system of record（事实源）。

## 12.2 API、EDI、SFTP

| 方式 | 适用 | 控制 |
|---|---|---|
| Application Programming Interface（**API**，应用程序编程接口） | 实时报价、建单、取消、查询、webhook | 幂等键、限流、指数退避、超时、版本、密钥轮换、死信 |
| Electronic Data Interchange（**EDI**，电子数据交换） | 成熟大伙伴的批量标准报文 | 实施指南、确认回执、代码映射、重传和控制总数 |
| Secure File Transfer Protocol（**SFTP**，安全文件传输协议） | 账单、历史事件、低频批量 | 文件命名、hash、原子落盘、重复识别、行数/金额校验、可重放 |

## 12.3 原始事件与标准事件

必须同时保存：

```text
event_id / partner_event_id
event_type_raw / description_raw
event_type_normalized
event_occurred_at + timezone
event_received_at
order_id / package_id / shipment_id / tracking_number
carrier / service / facility / country
exception_code / responsibility / action_required
source_system / schema_version / payload_hash / sequence
```

标准状态建议：

```text
LABEL_CREATED → PICKED_UP → EXPORT_CLEARED → DEPARTED
→ ARRIVED_DESTINATION → CUSTOMS_FILED
→ CUSTOMS_HOLD_VALUE / HOLD_ID / HOLD_REGULATORY / TAX_PENDING
→ CUSTOMS_RELEASED → LAST_MILE_RECEIVED → OUT_FOR_DELIVERY
→ DELIVERED / DELIVERY_FAILED → RETURN_INITIATED → DISPOSED/RETURNED
```

**幂等：**同一 `source + partner_event_id` 重发只更新接收记录，不制造第二个业务事件。允许迟到、更正和乱序；不能用“最新状态”覆盖历史。

## 12.4 追踪与清关数据

追踪不仅是消费者页面。PM 需要：
- 运输里程碑的发生时间和接收时间；
- 清关申报号、税费、hold 类型、材料请求、责任方和截止日；
- 事件映射到 Amazon 可识别承运商/服务代码；
- POD、签收人、投递照片等按隐私最小化保存；
- 巴西的 DIR/RCV/RPE，墨西哥的 pedimento/RFC/监管状态可关联 AWB。

Amazon 有效追踪和订单绩效阈值会按 marketplace、项目和日期变化。**[必须内部/法务/承运商确认]** 使用上线当日 Seller Central/内部政策，不在本手册设置统一数值。[GEN-4]

## 12.5 三账一致

1. **订单账：**OMS/Amazon 的订单、取消、承诺、退款。
2. **物流账：**WMS/TMS/承运商的重量、交接、事件、POD、退件。
3. **财务账：**基础运费、附加费、税费代垫、索赔、退款。

\[
Match\ Rate=可按规则关联的记录/应关联记录
\]

\[
Completeness=必填且校验通过字段/应有字段
\]

\[
Timeliness=SLA内到达事件/已到达事件
\]

\[
Duplicate\ Rate=识别为重复的事件/接收事件总数
\]

异常队列：无订单、无追踪、一个追踪对应多订单、状态倒流、事件迟到、重量差异、税差、重复计费、无 POD、退件无结局。每类有 Owner、SLA、自动修复和升级。

## 12.6 隐私与安全基础

- 数据目的限定与最小化；不要为“以后可能有用”采集税号或身份证明；
- 传输和静态加密，敏感字段掩码，最小权限和定期复核；
- 密钥不写入代码/表格；轮换、撤销和审计；
- 生产数据不进入个人邮箱、开放聊天或非批准工具；
- 记录同意、通知、跨境传输、处理者/控制者角色和删除期限；
- 事件/POD 中的地址、电话、签名和照片同样属于敏感运营数据。

---

<a id="ch13"></a>
# 13. 预测、容量与服务承诺

## 13.1 从订单预测到包裹预测

\[
Shipped\ Parcels=Orders-Prefulfillment\ Cancellations+Split\ Shipments
\]

至少按 `日 × 起运仓 × 国家/网关 × 服务 × 重量体积段 × 商品属性` 建模。输入包括活动、价格、库存、大促、周内模式、节假日、截单、拆单率、取消率、历史偏差、新线路低置信度和政策变化。

## 13.2 端到端容量

\[
E2E\ Capacity=\min(仓内,揽收,出口,干线,网关,清关,末端,异常处理)
\]

维护四层：
1. **物理容量：**真实设备、人力、班次和场地；
2. **合同容量：**保底、上限、预留和拒收条款；
3. **实际容量：**扣除取消航班、节假日、爆仓和监管积压；
4. **恢复容量：**备用承运商、备用网关、加班和切流。

## 13.3 Base/Upside/Stress

| 场景 | 量与假设 | 管理动作 |
|---|---|---|
| Base | 最可能需求和正常通过率 | 常规容量、承诺和成本计划 |
| Upside | 活动更强、拆包/转化更高 | 预留舱位、临时班次、分流 |
| Stress | 峰值叠加航班/网关/法规故障 | 限流、延长承诺、暂停高风险 SKU、回滚 |

例：Base 8,000 件/日、Upside 10,500、Stress 13,000；仓 12,000、干线 11,000、清关 9,500、末端 14,000。当前瓶颈是清关 9,500，而不是仓或末端。Upside 前就应切流或扩清关台席。

## 13.4 服务承诺

\[
Promise\ Date=Order\ Time+Handling+Transport\ Quantile+Calendar+Risk\ Buffer
\]

- 使用已验证 P90/P95，而非平均时效或销售希望；
- 分别建起运地、目的地和承运商工作日历；
- 政策切换、新网关、受监管品和旺季增加风险 buffer；
- 每日比较 `Forecast / Booked / Tendered / First-scanned / Customs-released / Delivered`；
- 触发器：预测超合同容量、首扫下降、清关积压、P95 变差、承运商拒收或法规变化。

## 13.5 调节动作梯度

1. 加班、提前截单、优化波次；
2. 申请额外舱位/清关/末端容量；
3. 按邮编、SKU、重量或风险切备用线路；
4. 延长承诺或降低可售量；
5. 暂停受监管/高失败 SKU；
6. 暂停线路并执行回滚。

每一级写明触发阈值、决策人、客户影响、成本和恢复条件。

---

<a id="ch14"></a>
# 14. Program Management 操作系统

## 14.1 Charter

项目章程最少包含：客户问题、目标、范围/非范围、基线、成功指标、业务案例、里程碑、依赖、Sponsor、Directly Responsible Individual（**DRI**，直接责任人）、资源、风险、试点/退出/回滚条件。

## 14.2 RACI 与 RAID

Responsible/Accountable/Consulted/Informed（**RACI**，执行/最终负责/征询/知会）要求每个交付物只有一个 Accountable。

Risks/Assumptions/Issues/Dependencies 或 Decisions（**RAID**，风险/假设/问题/依赖或决策）字段：

```text
ID | 类型 | 描述 | 概率 | 影响 | 触发器 | 缓解 | 应急
Owner | 决策人 | 截止日 | 状态 | 最后更新 | 证据链接
```

## 14.3 决策日志与一页 memo

```text
问题与所需决定
事实/基线/数据限制
选项 A/B/C：客户、合规、成本、时效、可逆性
推荐与原因
不行动后果
决策人、截止时间、复审触发器
```

## 14.4 Launch readiness 与 rollback

上线评审覆盖：法规、税务、商品、合同、容量、系统、数据、客服、财务、退货、监控。必须测试正常件和异常件。回滚不应只写“切回旧系统”，还包括：停止新订单、处理在途、客户通知、税费/退款、承运商取消、数据补偿和恢复验证。

## 14.5 根因分析与 CAPA

Corrective and Preventive Action（**CAPA**，纠正与预防措施）流程：

1. 事实、样本量、影响和时间线；
2. 按仓、线路、SKU、网关、异常码、时间分层；
3. Pareto（帕累托）找最大贡献切片；
4. 5 Whys（五个为什么）追到机制，不归咎个人；
5. fishbone（鱼骨图）：人、流程、系统、数据、伙伴、政策、环境；
6. 止血、纠正、预防、Owner、日期和验证指标；
7. 未来 2–4 周数据证明改善后关闭。

## 14.6 升级规则

立即升级：安全、违法、隐私、危险品、税务重大风险；大范围承诺失败；承运商停收；数据事实源失真；当前 Owner 无法在 SLA 内解除；需要预算、政策例外或高层风险接受。

升级材料：`事实与影响 → 时间敏感性 → 已采取动作 → 选项 → 推荐 → 所需决定与截止 → 不行动后果`。

---

<a id="ch15"></a>
# 15. 软技能与 Amazon 工作方式

## 15.1 无权影响

- 先理解对方目标和不可谈判约束；
- 用共同事实源和可复现数据，不用职位压人；
- 带选项和推荐，不只带问题；
- 把动作切小，明确 Owner 和日期；
- 私下预对齐，会议用于决定；
- 批评机制，不攻击个人；及时分享坏消息。

**中英双语句式：**
- “我想先确认我们在解决同一个客户问题。” / *Let me first confirm we are solving the same customer problem.*
- “当前事实支持 A，但数据存在两项限制。” / *The current evidence supports A, with two data limitations.*
- “我不同意这个风险判断，但若 DRI 决定继续，我会全力执行并监控触发器。” / *I disagree with the risk assessment; if the DRI decides to proceed, I will commit and monitor the triggers.*

## 15.2 pre-read 与叙事

会前阅读材料（pre-read）应回答：为什么现在、客户影响、事实、根因、选项、推荐、需要谁在何时决定。正文用短句、明确分母、币种、时区和日期。附录放明细表，不在会议逐页朗读。

## 15.3 会议主持

开场 2 分钟：目标、决策人、所需决定、时间盒。中段区分事实、解释和意见。结尾逐条朗读：决定、Owner、截止日、开放问题、升级项。同日发书面记录。

## 15.4 推回与 disagree and commit

弱表达：“这个日期不可能。”

强表达：

> “Upside 需求将比已确认清关容量高 18%，且过去两周 P95 已超过客户承诺 2.3 天。A 是限流并切 15% 至备用线路；B 是保持量但延长承诺；C 是按原计划接受预计 6% 的额外晚到。我推荐 A。请 DRI 在今天 17:00 前决定。”

决定后执行，但保留触发器和事实；发现假设失效应重新升级，而不是被动服从到失败。

## 15.5 经理与 stakeholder 管理

- 与经理每周对齐前三优先级、需要的决定和你不做什么；
- 不用“都在推进”隐藏红色风险；
- 对高层先给结论、影响和请求，再给过程；
- 对法务/税务给具体业务模式、交易流、主体、数据和时间点；
- 对技术给字段、状态机、错误场景、验收和非功能要求；
- 对承运商用合同、运单样本、时钟和数据说话。

## 15.6 相关 Leadership Principles

| 原则 | 物流 PM 的可观察行为 |
|---|---|
| Customer Obsession（客户至尚） | 以承诺兑现和透明体验衡量，不用局部 KPI 掩盖失败 |
| Ownership（主人翁精神） | 跨边界闭环，明确移交但不甩锅 |
| Dive Deep（深入细节） | 从总 KPI 下钻到运单、事件、申报和账单行 |
| Earn Trust（赢得信任） | 报告坏消息、说明不确定性、纠正错误 |
| Highest Standards（最高标准） | 对清关数据、追踪和审计证据不妥协 |
| Bias for Action（行动导向） | 可逆风险快速试点；不可逆合规风险先验证 |
| Have Backbone; Disagree and Commit（敢于争论并服从决定） | 以证据挑战，决定后执行并监控 |
| Deliver Results（达成业绩） | 上线不是结果，持续客户/成本/合规表现才是 |

官方定义见 [GEN-5]。具体团队是否使用 Press Release/Frequently Asked Questions（**PR/FAQ**，新闻稿/常见问题）、六页叙事或其他格式，以入职后组织实践为准。


---

<a id="ch16"></a>
# 16. 场景练习与答案框架

## 16.1 巴西清关/税费不匹配

**场景：**结账按 PRC、VA USD 66、ICMS 17% 预收 USD 25.08，但承运商账单明显更高。

**作答任务：**重建订单、折扣、运费、保险、汇率、DIR 登记日、PRC 标识、州税率、II 扣减和承运商费用。

**答案框架：**
1. 冻结受影响订单并区分“税”与“清关/代垫/仓储费”；
2. 检查 DIR 是否在 2026-05-12 后、是否真正 PRC 合格、VA 是否含漏掉运费；
3. 按 `(VA+II)/(1-r)×r` 重算；
4. 与承运商申报回执和税票逐项比较；
5. 若系统参数错误，停止同类报价、评估客户补退费和财务影响；
6. CAPA：参数版本、回归测试、税差告警和月度样本审计。

## 16.2 巴西 CPF 失败

**场景：**一批包裹落地后无法登记 DIR，承运商称 CPF 无效。

**答案框架：**
- 立即停止未起飞同批件；按缺失、格式、状态、姓名不匹配分类；
- 通过批准渠道向客户补采，不在开放表格传 CPF；
- 建立剩余补件时钟，按客户价值决定取消/退运；
- 对比结账、OMS、承运商 payload，确认字符清洗或字段截断；
- 永久修复：支付前校验、回执拦截、加密、权限和删除机制。

## 16.3 巴西 ANATEL hold

**场景：**USD 45 无线耳机税率正确，却被 Agência Nacional de Telecomunicações（ANATEL）扣留。

**答案框架：**税收优惠不等于产品准入。停止同型号发货；收集型号、无线频段、核准、用途和数量；由巴西合规方判断个人自用安排是否适用、能否补证或必须退运/销毁；检查 NCM 与页面/发票描述一致性。不要仅提交 美国 Federal Communications Commission（**FCC**，联邦通信委员会）/Conformité Européenne（**CE**，欧洲合格认证）证书宣称等效。

## 16.4 巴西承运商追踪失败

**场景：**实物持续妥投，但平台有效追踪下降。

**答案框架：**
- 建立订单—包裹—AWB—承运商代码—事件—平台提交对账；
- 按标签版本、服务代码、仓、日期、追踪号格式切片；
- 区分未首扫、事件延迟、代码映射、API 失败和平台不识别；
- 48 小时：重放可恢复事件、修映射、暂停错误服务；
- 两周：幂等重试、告警、认证测试、合同事件 SLA。

## 16.5 墨西哥 RFC 失败

**场景：**承运商在航班截单前拒绝 12% 包裹，错误为 RFC/name mismatch。

**答案框架：**不带病装机。确认个人/法人 RFC 格式、名称重音/缩写和 IOR 模式；仅在书面确认时使用 CURP；为无法补正订单取消退款；复盘结账字段、清洗、承运商接口和错误码；以 RFC 首次通过率为上线闸门。

## 16.6 墨西哥 33.5% 税费惊喜

**场景：**业务按“美国仓发货、USD 80、17%”报价，清关按 33.5% global 收取。

**答案框架：**
- 验证商品真实原产地、T-MEC 资格、来源、AWB/B/L 与 RRNA；
- 若只是中国商品中转美国，33.5% 可能是正确默认；
- 确认承运商未在 33.5% 上重复加 IVA；
- 量化所有在途和已售订单的税差，暂停错误报价；
- 决定吸收、取消或客户沟通，法务审核；
- 建立原产资格矩阵和证明有效期，禁止以仓库国家替代原产地。

## 16.7 容量缺口

**场景：**Upside 需求高于合同容量 30%，备用线路贵 22%。

**答案框架：**计算仓、揽收、干线、清关、末端最小容量；比较 A 限流、B 切流、C 延长承诺、D 混合方案的客户晚到、成本和可逆性；推荐按 SKU/邮编/风险分层切流，而非平均分配；设置触发器和恢复条件。

## 16.8 账单争议

**场景：**单票成本上涨 15%，承运商称燃油和偏远费。

**答案框架：**将账单按服务、重量段、区域、附加费代码、日期切片；四方比对合同价卡、WMS 称重、邮编区域和账单行；分为确认应付、待补证、正式争议；检查燃油指数生效日和附加费叠加；建立自动审计和贷项到账跟踪。

### 练习评分标准

每题 10 分：事实/分母 2；法规与运营分开 2；48 小时止血 2；长期机制 2；Owner/时钟/验证 2。只说“找承运商处理”不及格。

---

<a id="ch17"></a>
# 17. 30/60/90 天与六周预习计划

## 17.1 入职前六周学习计划

| 周 | 每日安排 | 周交付物 |
|---|---|---|
| 第 1 周：基础 | D1 MFN/FBA；D2 三条流；D3 MoR/EOR/IOR；D4 Incoterms；D5 画一条中国→巴西泳道 | 术语闪卡 60 张；线路责任图；10 个未知问题 |
| 第 2 周：巴西税务 | D1 PRC/RTS/DIR；D2 VA/II；D3 ICMS gross-up；D4 CPF/CNPJ/LGPD；D5 手算 10 个订单 | 巴西税费计算表；PRC 资格清单；法规时间线 |
| 第 3 周：巴西运营 | D1 NCM；D2 ANVISA/ANATEL；D3 INMETRO/MAPA/IBAMA；D4 RCV/RPE/退运；D5 承运商和峰值 | 20 个 SKU 合规卡；巴西异常决策树；上线清单 |
| 第 4 周：墨西哥 | D1 SAT/ANAM/RGCE；D2 3.7.35；D3 RFC/IOR/pedimento；D4 LIGIE/NICO/NOM；D5 T-MEC vs 中国直发 | 规则 3.7.35 一页纸；5 个税费案例；墨巴对比表 |
| 第 5 周：数据与商业 | D1 RFP/价卡；D2 KPI/尾部；D3 API/事件；D4 三账对账；D5 预测容量 | 承运商 scorecard；事件字典；Base/Upside/Stress 模型 |
| 第 6 周：PM 与沟通 | D1 charter/RACI；D2 RAID/决策；D3 RCA/CAPA；D4 pre-read/升级；D5 八个案例模拟 | 2 页入职 narrative；30/60/90；第一次 WBR 模板 |

每日 90 分钟建议：20 分钟阅读、25 分钟重写知识、25 分钟做表/计算、20 分钟口头讲解。能向非专业同事讲清楚，才算掌握。

## 17.2 入职 0–30 天：理解事实

**目标：**不急于“优化”，先建立可信地图。

- 与业务、运营、产品、技术、数据、财务、采购、法务税务、客服和承运商访谈；
- 绘制现有巴西/墨西哥线路、主体、承运商、网关、税费、系统和退货；
- 获取过去 8–12 周订单、事件、税费、异常、退件、账单和承诺数据；
- 逐指标记录定义、分母、排除项、事实源、Owner、刷新频率、可信度；
- 随机抽 30 票做订单到税单/POD/账单的全链路审计；
- 输出：网络地图、stakeholder 地图、术语表、风险初稿、30 天观察 memo。

**30 天成功标准：**能解释 80% 量走哪条线路、谁是各责任主体、最大三个客户失败和数据缺口；不要求立即完成大改造。

## 17.3 31–60 天：建立控制并解决一个问题

- 发布 charter、RACI、RAID、决策日志和 WBR；
- 建立承运商 scorecard 与 P50/P95/税差/异常原因；
- 选择一个高频可控问题：CPF/RFC、追踪映射、税费偏差、清关数据或账单；
- 完成 5 Whys、CAPA、Owner 和验证；
- 与技术完成事件/字段数据合同和错误处理；
- 建 Base/Upside/Stress 周滚动容量；
- 输出：首个闭环改善、服务承诺方法、承运商治理节奏。

## 17.4 61–90 天：试点、标准化与路线图

- 对一条线路或一组低风险 SKU 进行有退出条件的试点；
- 完成法规、税务、系统、容量、客服、退货、财务和回滚评审；
- 比较试点前后承诺兑现、P95、首次放行、追踪、税差和有效妥投成本；
- 将成功机制写入 Standard Operating Procedure（**SOP**，标准作业程序）、模板、监控和合同；
- 形成下一季度路线图：巴西优先事项、墨西哥差异、技术债、承运商组合和资源请求；
- 输出：90 天业务 narrative、试点评估、长期风险登记册、QBR。

---

<a id="ch18"></a>
# 18. 可复用模板库

## 18.1 Lane Card（线路卡）

```text
线路 ID / 版本 / Owner：
起运仓—出口口岸—航线—进口网关—末端：
承运商及分包商：
适用国家/邮编/SKU/重量段：
MoR / EOR / IOR / 报关实体：
Incoterm + 指定地点：
PRC/T-MEC/简易程序适用条件：
税费展示、代缴、税差承担：
截单、首扫、P50/P95、承诺：
事件与申报号：
禁限运/电池条件：
容量 Base/Upside/Stress：
异常联系人与 SLA：
退运/销毁/弃件：
暂停与回滚触发器：
法规/合同最后复核日：
```

## 18.2 SKU Compliance Card（SKU 合规卡）

```text
SKU/ASIN / 商品中文、英文、葡语或西语名称：
品牌/型号/材质/成分/用途/图片：
原产国 / HS / 巴西 NCM / 墨西哥 LIGIE+NICO：
巴西：ANVISA/ANATEL/INMETRO/MAPA/IBAMA/CITES：
墨西哥：NOM/COFEPRIS/SENASICA/IFT/RRNA：
电池：UN、Wh、SDS、UN38.3、包装：
禁限运、年龄、数量和个人自用限制：
标签/说明书版本：
允许线路/承运商：
证据链接、意见人、生效/到期日：
自动路由：绿/黄/红：
```

## 18.3 Carrier Scorecard（承运商评分卡）

| 指标 | 本周 | 4 周 | 目标/合同 | 红黄绿 | 根因/行动 |
|---|---:|---:|---:|---|---|
| 按时交接/首扫 |  |  |  |  |  |
| P50/P95/P99 |  |  |  |  |  |
| 承诺兑现 |  |  |  |  |  |
| 首次放行/可控 hold |  |  |  |  |  |
| 事件完整/及时 |  |  |  |  |  |
| 首派成功/POD |  |  |  |  |  |
| 有效妥投成本 |  |  |  |  |  |
| 账单准确/索赔回收 |  |  |  |  |  |
| 容量接收/拒收 |  |  |  |  |  |

## 18.4 WBR 议程

```text
1. 上周决定与行动关闭（5 min）
2. 客户北极星与 P50/P95/P99（10 min）
3. 巴西：PRC/CPF/DIR/税差/RCV/RPE（10 min）
4. 墨西哥：RFC/3.7.35/RRNA/pedimento（8 min）
5. 追踪、数据质量和账单（8 min）
6. 未来 6 周容量 Base/Upside/Stress（8 min）
7. RAID 与所需决定（8 min）
8. 复述 Decision/Owner/Due date（3 min）
```

## 18.5 RAID Log

| ID | 类型 | 描述 | 概率/影响 | 触发器 | 缓解/应急 | Owner | 截止 | 状态 |
|---|---|---|---|---|---|---|---|---|
|  | Risk/Assumption/Issue/Dependency |  |  |  |  |  |  |  |

## 18.6 Decision Memo（决策备忘录）

```text
标题/日期/DRI：
所需决定及截止：
客户问题和量化影响：
事实、基线和数据限制：
法规/合规边界：
选项 A：成本/服务/风险/可逆性
选项 B：成本/服务/风险/可逆性
选项 C：成本/服务/风险/可逆性
推荐与原因：
反对意见及回应：
不行动后果：
复审触发器：
最终决定与行动：
```

## 18.7 Escalation Note（升级说明）

```text
严重度/受影响国家、订单、客户、金额：
已知事实与未知项：
开始时间、关键截止时间：
合规/安全/客户/财务影响：
已采取止血：
选项与推荐：
需要谁在何时决定：
不行动后果：
下一次更新时间：
```

## 18.8 Root-Cause Report（根因报告）

```text
问题陈述和分母：
影响范围/时间线：
分层与 Pareto：
直接原因：
5 Whys / 鱼骨机制：
为何原控制未发现：
止血：
纠正措施：
预防措施：
Owner/日期：
验证指标和观察期：
复发监控：
```

## 18.9 Launch Checklist（通用上线清单）

- [ ] 当前 Amazon/Seller Central 政策已按站点和日期归档。
- [ ] MoR/EOR/IOR、Incoterm、税费和报关授权确认。
- [ ] 国家税制、商品准入、危险品和隐私获批。
- [ ] 价卡、附加费、容量、SLA、索赔和审计签署。
- [ ] 正常/异常/取消/重复/迟到/退货测试通过。
- [ ] 事件、税费、POD、账单和三账对账可运行。
- [ ] 客服话术、升级联系人和法规时钟就绪。
- [ ] Base/Upside/Stress 与限流/切流方案就绪。
- [ ] 7/14/30 天复盘和退出/回滚条件生效。

## 18.10 Country Regulation Matrix（国家法规矩阵）

| 国家 | 主题 | 法规/规则 | 版本/生效日 | 业务参数 | 适用 SKU/订单 | Owner | 下次复核 |
|---|---|---|---|---|---|---|---|
| 巴西 | PRC/II/ICMS | RFB + MPV/PLV | 2026-05-12/2026-09-09 | 50/0%/60%/30/州率 |  |  |  |
| 墨西哥 | RGCE 3.7.35 | SAT 2026 compiled | 2026 版本 | 33.5/17/19/50/117 |  |  |  |

## 18.11 Glossary Flashcards（术语闪卡）

```text
正面：PRC
背面：Programa Remessa Conforme；巴西认证电商平台的税费展示、代收与预申报框架。认证主体不等于所有订单自动合格。

正面：tasa global
背面：墨西哥简易快件综合税率。33.5%、17%、19% 均不可机械再叠加完整 IVA。

正面：IOR
背面：Importer of Record，进口责任主体。与谁付税、DDP 文案、Amazon 平台身份不是同一概念。
```

---

<a id="ch19"></a>
# 19. 入职后首先要问的 50 个问题

## 19.1 业务与客户（1–8）

1. 巴西和墨西哥各自的客户问题、年度目标和成功指标是什么？
2. 当前订单量、Gross Merchandise Value（**GMV**，商品交易总额）、卖家数、SKU、客单价和地区分布？
3. 哪些场景选择 MFN，而非 FBA 或本地库存？
4. 客户看到的价格、税费、承诺和退货说明是什么？
5. 最大三类投诉、退款和承诺失败是什么？
6. 哪些 SKU/卖家贡献最多量和最多异常？
7. Amazon 政策的当前站点版本、Owner 和变更通知机制？
8. 未来两个季度的产品、国家、卖家和活动路线图？

## 19.2 合规与税务（9–17）

9. 每个模式的 MoR、EOR、IOR、收件人和税费承担方是谁？
10. 巴西哪些订单经书面确认属于 PRC，哪些明确不属于？
11. 巴西税引擎的 50/0%/60%/USD30/ICMS 参数由谁维护？
12. MPV 1.357/2026/PLV 13/2026 最终状态如何监控和发布？
13. CPF/CNPJ 的合法基础、校验、保留和删除如何设计？
14. 墨西哥 T-MEC 资格由谁判断，证据存在哪里？
15. 33.5%/17%/19% global、DTA 和费用如何落账？
16. RFC/CURP、IOR、pedimento 和进口商名录责任如何分配？
17. 商品分类、许可和监管意见多久复核一次？

## 19.3 承运商与运营（18–26）

18. 当前每条线路、分包商、网关和末端是谁？
19. 承运商清关实体是否持有效授权？
20. 日常/峰值容量、拒收和备用方案是什么？
21. 首扫、离港、到港、清关、末端和退件 SLA 如何定义？
22. 清关异常是否有可行动原因码和责任方？
23. 哪些 SKU/电池/危险品被允许，批准是否到型号和航线？
24. 退运、销毁和弃件谁批准、谁付费？
25. 索赔窗口、赔付上限和回收率是多少？
26. 承运商过去两个季度最常未履行的合同项是什么？

## 19.4 产品与技术（27–33）

27. OMS/WMS/TMS/税务/合规各自的事实源字段是什么？
28. 建单、取消、重打标签和拆包如何保证幂等？
29. 巴西 DIR、墨西哥 pedimento 能否回传并关联订单？
30. 原始事件和标准事件是否双留存？
31. API 限流、重试、死信、版本和密钥轮换如何做？
32. 政策/税率改变能否配置化且快速回滚？
33. 哪些手工表格是当前最大的单点故障？

## 19.5 数据与指标（34–40）

34. 北极星指标的分母、排除项和事实源是什么？
35. 是否同时报告 P50/P90/P95/P99 和 tail gap？
36. hold 如何分卖家、承运商、海关、监管和客户责任？
37. 有效追踪的当前 marketplace 定义和阈值在哪里？
38. 税费估算与实际税单能否包裹级对比？
39. 三账匹配率、事件及时率和账单准确率是多少？
40. 数据看板出现异常后，谁有权暂停线路？

## 19.6 财务与采购（41–45）

41. 价卡、燃油、汇率和附加费何时生效、谁批准？
42. 每发出件与每妥投件成本差多少，主要损失在哪？
43. DDP 税差、退件、弃件和退款由哪个成本中心承担？
44. 账单抽样、争议、贷项和索赔如何闭环？
45. 下一次 RFP/续约的时间、杠杆和退出成本是什么？

## 19.7 组织与决策（46–50）

46. 谁是 Sponsor、DRI 和各国家最终风险接受人？
47. 哪些决定可由 PM 做，哪些需法务/财务/副总裁（Vice President，**VP**）批准？
48. WBR/MBR/QBR 目前各解决什么，哪些只是报状态？
49. 发生合规或大规模承诺风险时的 24×7 升级链？
50. 90 天后，经理希望我用哪三个可量化结果证明成功？

---

<a id="ch20"></a>
# 20. 官方来源与版本控制

## 20.1 巴西官方来源

- **[BR-1] RFB：2026-05-12 起 PRC/非 PRC 税率、官方示例与 ICMS 公式**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/regras-futuras
- **[BR-2] RFB：RTS、II、ICMS 与计税基础**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/topicos/tributacao
- **[BR-3] RFB：PRC 工作方式与平台披露**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/programa-remessa-conforme-o-que-e-como-funciona
- **[BR-4] RFB：DIR、DSI、DI、字段与登记主体**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/topicos/declaracao
- **[BR-5] RFB：PRC 认证企业名单**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/empresas-certificadas-no-programa-remessa-conforme-prc
- **[BR-6] RFB：查验、RCV/RPE、复核、退运和时限**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/topicos/Procedimentos
- **[BR-7] RFB：获授权快件企业**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/empresas-autorizadas-a-operar-na-modalidade-remessa-expressa
- **[BR-8] 巴西进口税务及行政处理模拟器**  
  https://www.gov.br/empresas-e-negocios/pt-br/invest-export-brasil/importar/consulte-normas-administrativas/simulador-tributario-1
- **[BR-9] RFB：禁止和限制国际包裹**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/o-que-e-proibido-comprar
- **[BR-10] Congresso Nacional：MPV 1.357/2026 进程**  
  https://www.congressonacional.leg.br/materias/medidas-provisorias/-/mpv/174123
- **[BR-11] RFB：违法、处罚与低报风险**  
  https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/topicos/Infracoes_e_penalidades
- ANVISA：邮政快件进口手册  
  https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2023/anvisa-publica-novo-manual-de-importacao-por-remessa-postal
- ANATEL：个人自用进口  
  https://www.gov.br/anatel/pt-br/regulado/certificacao-de-produtos/importacao-para-uso-proprio
- INMETRO：进口许可与 LPCO  
  https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/anuencia-para-importacao-siscomex/modelo-lpco
- MAPA：Vigiagro 手册  
  https://www.gov.br/agricultura/pt-br/assuntos/vigilancia-agropecuaria/manual-do-vigiagro
- Correios：国际包裹收取与付款  
  https://www.correios.com.br/receber/encomenda/internacional

## 20.2 墨西哥官方及权威来源

- **[MX-1] SAT：2026 RGCE 第一次修订整合文本，规则 3.7.35，第 281–282 页**  
  https://www.sat.gob.mx/minisitio/NormatividadRMFyRGCE/documentos2026/rgce/compiladas/1raRMRGCEpara2026.pdf
- **[MX-2] ANAM：快件与包裹/授权企业入口**  
  https://www.anam.gob.mx/mensajeria-y-paqueteria/
- **[MX-3] 墨西哥众议院：海关法汇编**  
  https://www.diputados.gob.mx/LeyesBiblio/pdf/12_191125.pdf
- **[MX-4] SAT：进口商/出口商名录**  
  https://www.sat.gob.mx/minisitio/PadronImportadoresExportadores/pi_inscripcion.html
- **[MX-5] SNICE：LIGIE/TIGIE 修改与查询**  
  https://www.snice.gob.mx/cs/avi/snice/modificaciones_ligie_tigie.html
- **[MX-6] SNICE：NOM 与 Anexo 2.4.1**  
  https://www.snice.gob.mx/cs/avi/snice/seguridad.normatividad.html
- COFEPRIS：进口/出口监管指南  
  https://www.gob.mx/cofepris/acciones-y-programas/guias-manuales-sector-regulado-importaciones-y-exportaciones
- SENASICA：进口要求  
  https://www.gob.mx/senasica/acciones-y-programas/importacion
- IFT：电信设备 homologación  
  https://www.ift.org.mx/industria/requisitos-para-la-homologacion-de-equipos-de-telecomunicaciones-y-radiodifusion
- DOF：联邦官方公报  
  https://www.dof.gob.mx/

> **官方文本优先级说明**　SAT 整合 PDF 明示其用于了解更新文本；作为法律行为依据时应使用 Diario Oficial de la Federación（DOF）发布文本。项目文档应同时保存整合版页码和对应 DOF 发布记录。

## 20.3 Amazon、ICC、IATA、ICAO、GS1 与数据标准

- **[GEN-1] Amazon FBA 官方介绍**  
  https://sell.amazon.com/fulfillment-by-amazon
- **[GEN-2] Amazon FBM 官方介绍**  
  https://sell.amazon.com/programs/fulfilled-by-merchant
- **[GEN-3] ICC Incoterms® Rules**  
  https://iccwbo.org/business-solutions/incoterms-rules/
- ICC：DAP 或 DDP 实务说明  
  https://academy.iccwbo.org/incoterms/article/incoterms-2020-dap-or-ddp/
- **[GEN-4] Amazon Seller Central 有效追踪帮助页（阈值以当前站点为准）**  
  https://sellercentral.amazon.com/gp/help/G201817070
- Amazon Selling Partner API（SP-API）  
  https://developer-docs.amazon.com/sp-api/
- **[GEN-5] Amazon Leadership Principles**  
  https://www.aboutamazon.com/about-us/leadership-principles
- **[GEN-6] IATA Cargo/Dangerous Goods 入口**  
  https://www.iata.org/en/programs/cargo/dgr/
- **[GEN-7] ICAO Dangerous Goods Technical Instructions**  
  https://www.icao.int/Dangerous-Goods/Technical-Instructions
- GS1 Electronic Product Code Information Services（EPCIS）2.0 事件标准  
  https://ref.gs1.org/standards/epcis/
- Accredited Standards Committee X12（ASC X12）EDI 214  
  https://x12.org/node/4214

## 20.4 版本控制检查表

- [ ] 文档版本、Owner、批准人、资料截点和下次复核日明确。
- [ ] 每条法规保存原文 URL、标题、发布日、生效日、访问日和页码/条款。
- [ ] 区分法规发布日、业务生效日、订单日、发货日和申报登记日。
- [ ] 巴西追踪 MPV/PLV 最终签署/否决、RFB 实施和州 ICMS。
- [ ] 墨西哥追踪 RGCE 修订、DOF、3.7.35、3.7.6、LIGIE/NICO 和 Anexo 2.4.1。
- [ ] Amazon marketplace 政策按站点和日期留截图/链接；不使用全球统一阈值假设。
- [ ] 承运商产品、授权、禁限运、税费、SLA 和价卡有生效/到期日。
- [ ] 税务和路由参数均可配置、可回滚、有审批和回归测试。
- [ ] 法务意见标明业务事实假设；事实改变时自动触发复核。
- [ ] 每次重大更新记录“变化、影响订单、系统参数、客户沟通、Owner 和验证”。

---

## 结语：把复杂性变成可运营机制

新兴市场 MFN 的专业性，不在于背诵所有税率，而在于知道：**什么必须准确、什么会变化、谁有权决定、数据如何证明、失败时怎样止血并防止复发。**

请把本手册中的法规结论变成可配置参数，把责任变成 RACI，把不确定性变成 RAID，把线路变成 lane card，把商品变成 compliance card，把承运商承诺变成 scorecard，把事故变成 CAPA。这样，即使法规、站点、承运商或业务规模改变，团队仍能稳定地做出正确决定。
