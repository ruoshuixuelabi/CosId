import{_ as a}from"./chunks/sharding-db.CcJS1N71.js";import{_ as i}from"./chunks/CosIdModShardingAlgorithm.CJ9Ifd6g.js";import{_ as t,a as e}from"./chunks/Throughput-Of-ModShardingAlgorithm-RangeShardingValue.BY-CRkKl.js";import{_ as n}from"./chunks/CosIdIntervalShardingAlgorithm.BPct6Ea1.js";import{_ as h,a as r}from"./chunks/Throughput-Of-IntervalShardingAlgorithm-RangeShardingValue.CauZn_Be.js";import{_ as l,c as d,a2 as p,o}from"./chunks/framework.B_BCnrWk.js";const k="/assets/CosId-Integration-ShardingSphere-750x375.Ch6d_hQA.png",g="/assets/KeyGenerateAlgorithm-class-diagram.BmasSbQJ.png",c="/assets/ShardingAlgorithm-class-diagram.M4wMyR3B.png",v=JSON.parse('{"title":"ShardingSphere 集成 CosId 实战","description":"","frontmatter":{},"headers":[],"relativePath":"reference/blog/ShardingSphere-Integration-CosId.md","filePath":"reference/blog/ShardingSphere-Integration-CosId.md","lastUpdated":1724971834000}'),E={name:"reference/blog/ShardingSphere-Integration-CosId.md"};function y(m,s,u,b,S,A){return o(),d("div",null,s[0]||(s[0]=[p('<p align="center"><img src="'+k+'" alt="ShardingSphere 集成 CosId"></p><h1 id="shardingsphere-集成-cosid-实战" tabindex="-1">ShardingSphere 集成 CosId 实战 <a class="header-anchor" href="#shardingsphere-集成-cosid-实战" aria-label="Permalink to &quot;ShardingSphere 集成 CosId 实战&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>在软件系统演进过程中，随着业务规模的增长 (TPS/存储容量)，我们需要通过集群化部署来分摊计算、存储压力。 应用服务的无状态设计使其具备了伸缩性。在使用 <strong>Kubernetes</strong> 部署时我们只需要一行命令即可完成服务伸缩 (<code>kubectl scale --replicas=5 deployment/order-service</code>)。</p><p>但对于有状态的数据库就不那么容易了，此时数据库变成系统的性能瓶颈是显而易见的。</p><h3 id="分库分表" tabindex="-1">分库分表 <a class="header-anchor" href="#分库分表" aria-label="Permalink to &quot;分库分表&quot;">​</a></h3><blockquote><p>从微服务的角度来理解垂直拆分其实就是微服务拆分。以限界上下文来定义服务边界将大服务/单体应用拆分成多个自治的粒度更小的服务，因为自治性规范要求，数据库也需要进行业务拆分。 但垂直拆分后的单个微服务依然会面临 TPS/存储容量 的挑战，所以这里我们重点讨论水平拆分的方式。</p></blockquote><p align="center"><img src="'+a+`" alt="分库分表"></p><p>数据库分库分表方案是逻辑统一，物理分区自治的方案。其核心设计在于中间层映射方案的设计 (上图 <strong>Mapping</strong>)，即分片算法的设计。 几乎所有编程语言都内置实现了散列表(java:<code>HashMap</code>/csharp:<code>Dictionary</code>/python:<code>dict</code>/go:<code>map</code> ...)。分片算法跟散列表高度相似(<code>hashCode</code>)，都得通过 <code>key</code>/<code>shardingValue</code> 映射到对应的槽位(<code>slot</code>)。</p><p>那么 <code>shardingValue</code> 从哪里来呢？<strong>CosId</strong>！！！</p><h3 id="cosid-分布式-id-生成器" tabindex="-1">CosId：分布式 ID 生成器 <a class="header-anchor" href="#cosid-分布式-id-生成器" aria-label="Permalink to &quot;CosId：分布式 ID 生成器&quot;">​</a></h3><p><em><a href="https://github.com/Ahoo-Wang/CosId" target="_blank" rel="noreferrer">CosId</a></em> 旨在提供通用、灵活、高性能的分布式 ID 生成器。<strong>CosId</strong> 目前提供了以下三种算法：</p><ul><li><code>SnowflakeId</code> : <em>单机 TPS 性能：409W/s</em> , 主要解决 <em>时钟回拨问题</em> 、<em>机器号分配问题</em> 并且提供更加友好、灵活的使用体验。</li><li><code>SegmentId</code>: 每次获取一段 (<code>Step</code>) ID，来降低号段分发器的网络IO请求频次提升性能，提供多种存储后端：关系型数据库、<strong>Redis</strong>、<strong>Zookeeper</strong> 供用户选择。</li><li><code>SegmentChainId</code>(<strong>推荐</strong>):<code>SegmentChainId</code> (<em>lock-free</em>) 是对 <code>SegmentId</code> 的增强。性能可达到近似 <code>AtomicLong</code> 的 <em>TPS 性能:12743W+/s</em>。</li></ul><p><code>shardingValue</code> 问题解决了，但这就够了吗？<strong>ShardingSphere</strong>！！！</p><blockquote><p>摘自 <strong>CosId</strong> 官网：<a href="https://github.com/Ahoo-Wang/CosId" target="_blank" rel="noreferrer">https://github.com/Ahoo-Wang/CosId</a></p></blockquote><h3 id="shardingsphere" tabindex="-1">ShardingSphere <a class="header-anchor" href="#shardingsphere" aria-label="Permalink to &quot;ShardingSphere&quot;">​</a></h3><p>Apache ShardingSphere 是一款开源分布式数据库生态项目，由 JDBC、Proxy 和 Sidecar（规划中） 3 款产品组成。其核心采用可插拔架构，通过组件扩展功能。对上以数据库协议及 SQL 方式提供诸多增强功能，包括数据分片、访问路由、数据安全等；对下原生支持 MySQL、PostgreSQL、SQL Server、Oracle 等多种数据存储引擎。Apache ShardingSphere 项目理念，是提供数据库增强计算服务平台，进而围绕其上构建生态。充分利用现有数据库的计算与存储能力，通过插件化方式增强其核心能力，为企业解决在数字化转型中面临的诸多使用难点，为加速数字化应用赋能。</p><blockquote><p>摘自 <strong>Apache ShardingSphere</strong> 官网：<a href="https://shardingsphere.apache.org/index_zh.html" target="_blank" rel="noreferrer">https://shardingsphere.apache.org/index_zh.html</a></p></blockquote><p>接下来进入本文的主要内容：如何基于 <strong>ShardingSphere</strong> 可插拔架构（SPI）来集成 <strong>CosId</strong>，以及应用配置指南。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><blockquote><p>以 <strong>Spring-Boot 应用</strong> 为例</p></blockquote><ul><li>ShardingSphere v5.1.0+</li></ul><blockquote><p>因为 <code>ShardingSphere v5.1.0</code> <a href="https://github.com/apache/shardingsphere/pull/14132" target="_blank" rel="noreferrer">PR</a>，已经合并了 <a href="https://github.com/Ahoo-Wang/CosId/tree/main/cosid-shardingsphere" target="_blank" rel="noreferrer">cosid-shardingsphere</a> 模块,所以只需要引用 <code>ShardingSphere</code> 依赖即可。</p></blockquote><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.apache.shardingsphere&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;shardingsphere-jdbc-core-spring-boot-starter&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;5.1.1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><ul><li>ShardingSphere v5.0.0</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.apache.shardingsphere&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;shardingsphere-jdbc-core-spring-boot-starter&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;5.0.0&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;me.ahoo.cosid&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;cosid-shardingsphere&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1.8.15&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="分布式-id" tabindex="-1">分布式 ID <a class="header-anchor" href="#分布式-id" aria-label="Permalink to &quot;分布式 ID&quot;">​</a></h2><blockquote><p><code>KeyGenerateAlgorithm</code></p></blockquote><h3 id="uml-class-diagram" tabindex="-1">UML Class Diagram <a class="header-anchor" href="#uml-class-diagram" aria-label="Permalink to &quot;UML Class Diagram&quot;">​</a></h3><p align="center"><img src="`+g+`" alt="KeyGenerateAlgorithm"></p><blockquote><p>上图展示了目前所有 <code>ShardingSphere</code> 内置的 <code>KeyGenerateAlgorithm</code> 实现，这里我们只讲 <code>CosIdKeyGenerateAlgorithm</code> ，其他实现请阅读<a href="https://shardingsphere.apache.org/document/current/cn/features/sharding/concept/key-generator/" target="_blank" rel="noreferrer">https://shardingsphere.apache.org/document/current/cn/features/sharding/concept/key-generator/</a>。</p></blockquote><h3 id="cosidkeygeneratealgorithm" tabindex="-1">CosIdKeyGenerateAlgorithm <a class="header-anchor" href="#cosidkeygeneratealgorithm" aria-label="Permalink to &quot;CosIdKeyGenerateAlgorithm&quot;">​</a></h3><h4 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h4><blockquote><p>type: COSID</p></blockquote><table tabindex="0"><thead><tr><th>名称</th><th>数据类型</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>id-name</td><td><code>String</code></td><td><code>IdGenerator</code> 的名称（在 <code>IdGeneratorProvider</code> 中已注册）</td><td><code>__share__</code></td></tr><tr><td>as-string</td><td><code>String</code></td><td>是否生成字符串类型的ID</td><td><code>fasle</code></td></tr></tbody></table><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  shardingsphere</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      sharding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        key-generators</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          cosid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">COSID</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              id-name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">__share__</span></span></code></pre></div><h2 id="分片算法" tabindex="-1">分片算法 <a class="header-anchor" href="#分片算法" aria-label="Permalink to &quot;分片算法&quot;">​</a></h2><blockquote><p><code>ShardingAlgorithm</code></p></blockquote><h3 id="uml-class-diagram-1" tabindex="-1">UML Class Diagram <a class="header-anchor" href="#uml-class-diagram-1" aria-label="Permalink to &quot;UML Class Diagram&quot;">​</a></h3><p align="center"><img src="`+c+'" alt="ShardingAlgorithm"></p><h3 id="cosidmodshardingalgorithm" tabindex="-1">CosIdModShardingAlgorithm <a class="header-anchor" href="#cosidmodshardingalgorithm" aria-label="Permalink to &quot;CosIdModShardingAlgorithm&quot;">​</a></h3><p>CosId取模分片算法</p><h4 id="算法说明" tabindex="-1">算法说明 <a class="header-anchor" href="#算法说明" aria-label="Permalink to &quot;算法说明&quot;">​</a></h4><p align="center"><img src="'+i+'" alt="CosIdModShardingAlgorithm"></p><blockquote><p>单值分片键(<code>PreciseShardingValue</code>)算法复杂度：<code>O(1)</code>。</p><p>范围值分片键(<code>RangeShardingValue</code>)算法复杂度：<code>O(N)</code>，其中<code>N</code>为范围值个数。</p></blockquote><h4 id="性能基准测试" tabindex="-1">性能基准测试 <a class="header-anchor" href="#性能基准测试" aria-label="Permalink to &quot;性能基准测试&quot;">​</a></h4><table tabindex="0"><thead><tr><th>精确值/单值(<strong>PreciseShardingValue</strong>)</th><th>范围值/多值(<strong>RangeShardingValue</strong>)</th></tr></thead><tbody><tr><td><img src="'+t+'"></td><td><img src="'+e+`"></td></tr></tbody></table><h4 id="配置-1" tabindex="-1">配置 <a class="header-anchor" href="#配置-1" aria-label="Permalink to &quot;配置&quot;">​</a></h4><blockquote><p>type: COSID_MOD</p></blockquote><table tabindex="0"><thead><tr><th>名称</th><th>数据类型</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>logic-name-prefix</td><td><code>String</code></td><td>逻辑表/数据源名前缀</td><td></td></tr><tr><td>mod</td><td><code>int</code></td><td>除数</td><td></td></tr></tbody></table><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  shardingsphere</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      sharding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        sharding-algorithms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          alg-name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">COSID_MOD</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              mod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              logic-name-prefix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">t_table_</span></span></code></pre></div><h3 id="cosidintervalshardingalgorithm" tabindex="-1">CosIdIntervalShardingAlgorithm <a class="header-anchor" href="#cosidintervalshardingalgorithm" aria-label="Permalink to &quot;CosIdIntervalShardingAlgorithm&quot;">​</a></h3><p>基于间隔的时间范围分片算法。</p><h4 id="算法说明-1" tabindex="-1">算法说明 <a class="header-anchor" href="#算法说明-1" aria-label="Permalink to &quot;算法说明&quot;">​</a></h4><p align="center"><img src="`+n+'" alt="CosIdIntervalShardingAlgorithm"></p><blockquote><p>精确值/单值分片键(<code>PreciseShardingValue</code>)算法复杂度：<code>O(1)</code>。</p><p>范围值分片键(<code>RangeShardingValue</code>)算法复杂度：<code>O(N)</code>，其中<code>N</code>为范围值单位时间个数。</p></blockquote><h4 id="性能基准测试-1" tabindex="-1">性能基准测试 <a class="header-anchor" href="#性能基准测试-1" aria-label="Permalink to &quot;性能基准测试&quot;">​</a></h4><table tabindex="0"><thead><tr><th>精确值/单值(<strong>PreciseShardingValue</strong>)</th><th>范围值/多值(<strong>RangeShardingValue</strong>)</th></tr></thead><tbody><tr><td><img src="'+h+'"></td><td><img src="'+r+`"></td></tr></tbody></table><h4 id="配置-2" tabindex="-1">配置 <a class="header-anchor" href="#配置-2" aria-label="Permalink to &quot;配置&quot;">​</a></h4><blockquote><p>type: COSID_INTERVAL</p></blockquote><table tabindex="0"><thead><tr><th>名称</th><th>数据类型</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>logic-name-prefix</td><td><code>String</code></td><td>逻辑表/数据源名前缀</td><td></td></tr><tr><td>datetime-lower</td><td><code>String</code></td><td>时间分片下界值，时间戳格式：<code>yyyy-MM-dd HH:mm:ss</code></td><td></td></tr><tr><td>datetime-upper</td><td><code>String</code></td><td>时间分片上界值，时间戳格式：<code>yyyy-MM-dd HH:mm:ss</code></td><td></td></tr><tr><td>sharding-suffix-pattern</td><td><code>String</code></td><td>分片真实表/数据源后缀格式</td><td></td></tr><tr><td>datetime-interval-unit</td><td><code>ChronoUnit</code></td><td>分片键时间间隔单位</td><td></td></tr><tr><td>datetime-interval-amount</td><td><code>int</code></td><td>分片键时间间隔</td><td></td></tr><tr><td>ts-unit</td><td><code>String</code></td><td>时间戳单位：<code>SECOND</code>/<code>MILLISECOND</code></td><td><code>MILLISECOND</code></td></tr><tr><td>zone-id</td><td><code>String</code></td><td>分片键时区</td><td><code>ZoneId.systemDefault().getId()</code></td></tr></tbody></table><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  shardingsphere</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      sharding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        sharding-algorithms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          alg-name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">COSID_INTERVAL</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              logic-name-prefix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">logic-name-prefix</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              datetime-lower</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2021-12-08 22:00:00</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              datetime-upper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2022-12-01 00:00:00</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              sharding-suffix-pattern</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">yyyyMM</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              datetime-interval-unit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MONTHS</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              datetime-interval-amount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span></code></pre></div><h3 id="cosidsnowflakeintervalshardingalgorithm" tabindex="-1">CosIdSnowflakeIntervalShardingAlgorithm <a class="header-anchor" href="#cosidsnowflakeintervalshardingalgorithm" aria-label="Permalink to &quot;CosIdSnowflakeIntervalShardingAlgorithm&quot;">​</a></h3><h4 id="算法说明-2" tabindex="-1">算法说明 <a class="header-anchor" href="#算法说明-2" aria-label="Permalink to &quot;算法说明&quot;">​</a></h4><p>我们知道 <em>SnowflakeId</em> 的位分区方式，<em>SnowflakeId</em> 可以解析出时间戳，即 <em>SnowflakeId</em> 可以作为时间，所以 <em>SnowflakeId</em> 可以作为 <em>INTERVAL</em> 的分片算法的分片值。 （当没有<code>CreateTime</code>可用作分片时[这是一个非常极端的情况]，或者对性能有非常极端的要求时， <em>分布式ID主键</em> 作为查询范围可能是持久层性能更好的选择。 )</p><h4 id="配置-3" tabindex="-1">配置 <a class="header-anchor" href="#配置-3" aria-label="Permalink to &quot;配置&quot;">​</a></h4><blockquote><p>type: COSID_INTERVAL_SNOWFLAKE</p></blockquote><table tabindex="0"><thead><tr><th>名称</th><th>数据类型</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>logic-name-prefix</td><td><code>String</code></td><td>逻辑表/数据源名前缀</td><td></td></tr><tr><td>datetime-lower</td><td><code>String</code></td><td>时间分片下界值，时间戳格式：<code>yyyy-MM-dd HH:mm:ss</code></td><td></td></tr><tr><td>datetime-upper</td><td><code>String</code></td><td>时间分片上界值，时间戳格式：<code>yyyy-MM-dd HH:mm:ss</code></td><td></td></tr><tr><td>sharding-suffix-pattern</td><td><code>String</code></td><td>分片真实表/数据源后缀格式</td><td></td></tr><tr><td>datetime-interval-unit</td><td><code>ChronoUnit</code></td><td>分片键时间间隔单位</td><td></td></tr><tr><td>datetime-interval-amount</td><td><code>int</code></td><td>分片键时间间隔</td><td></td></tr><tr><td>id-name</td><td><code>String</code></td><td><code>IdGenerator</code> 的名称（在 <code>IdGeneratorProvider</code> 中已注册）</td><td><code>__share__</code></td></tr></tbody></table><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  shardingsphere</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      sharding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        sharding-algorithms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          alg-name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">COSID_INTERVAL_SNOWFLAKE</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              logic-name-prefix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">logic-name-prefix</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              datetime-lower</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2021-12-08 22:00:00</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              datetime-upper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2022-12-01 00:00:00</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              sharding-suffix-pattern</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">yyyyMM</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              datetime-interval-unit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MONTHS</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              datetime-interval-amount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              id-name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cosid-name</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本文主要讨论了分库分表产生的背景以及如何基于 <strong>ShardingSphere</strong> 可插拔架构集成 <strong>CosId</strong> 的应用实战。 <strong>ShardingSphere</strong> 采用可插拔架构，使得开发者非常方便的自定义满足自身应用场景的功能扩展，如果你也对参与 <strong>ShardingSphere</strong> 社区贡献感兴趣请参考 <a href="https://shardingsphere.apache.org/community/cn/contribute/contributor/" target="_blank" rel="noreferrer">https://shardingsphere.apache.org/community/cn/contribute/contributor/</a> 。</p><h2 id="阅读源码的小技巧之类图" tabindex="-1">阅读源码的小技巧之类图 <a class="header-anchor" href="#阅读源码的小技巧之类图" aria-label="Permalink to &quot;阅读源码的小技巧之类图&quot;">​</a></h2><p>相信很多小伙伴在阅读源码过程中总是难以自拔的遍历式以方法为单位一行行查看源码的实现细节，以至于迷失在细节中（如果你还能坚持下来，那真是佩服你的毅力之坚韧！）。这样的阅读方式是非常糟糕的、低效的。 阅读源码跟阅读书籍一样有非常多的相似之处：先建立一个概览图（索引），然后再逐层往下精进。（自上而下的方式更有利于阅读过程中不迷失在具体细节中） 推荐大家使用IDEA的插件 <em>Diagrams</em> 用于生成源码级别的概览图：UML类图。</p><blockquote><ul><li>IntelliJ IDEA: <a href="https://www.jetbrains.com/help/idea/class-diagram.html" target="_blank" rel="noreferrer">https://www.jetbrains.com/help/idea/class-diagram.html</a></li></ul></blockquote><h2 id="引用说明" tabindex="-1">引用说明 <a class="header-anchor" href="#引用说明" aria-label="Permalink to &quot;引用说明&quot;">​</a></h2><ul><li>ShardingSphere 官方文档：<a href="https://shardingsphere.apache.org/document/current/cn/overview/" target="_blank" rel="noreferrer">https://shardingsphere.apache.org/document/current/cn/overview/</a></li><li>IntelliJ IDEA: <a href="https://www.jetbrains.com/help/idea/class-diagram.html" target="_blank" rel="noreferrer">https://www.jetbrains.com/help/idea/class-diagram.html</a></li><li>CosId-ShardingSphere: <a href="https://cosid.ahoo.me/guide/cosid-shardingsphere.html" target="_blank" rel="noreferrer">https://cosid.ahoo.me/guide/cosid-shardingsphere.html</a></li></ul>`,76)]))}const x=l(E,[["render",y]]);export{v as __pageData,x as default};
