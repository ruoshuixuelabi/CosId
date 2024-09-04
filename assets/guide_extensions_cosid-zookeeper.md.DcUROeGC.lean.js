import{_ as i,c as t,a2 as a,o as e}from"./chunks/framework.B_BCnrWk.js";const c=JSON.parse('{"title":"CosId-ZooKeeper 模块","description":"","frontmatter":{},"headers":[],"relativePath":"guide/extensions/cosid-zookeeper.md","filePath":"guide/extensions/cosid-zookeeper.md","lastUpdated":1724971834000}'),n={name:"guide/extensions/cosid-zookeeper.md"};function d(h,s,l,o,p,r){return e(),t("div",null,s[0]||(s[0]=[a(`<h1 id="cosid-zookeeper-模块" tabindex="-1">CosId-ZooKeeper 模块 <a class="header-anchor" href="#cosid-zookeeper-模块" aria-label="Permalink to &quot;CosId-ZooKeeper 模块&quot;">​</a></h1><p><a href="https://github.com/Ahoo-Wang/CosId/tree/main/cosid-zookeeper" target="_blank" rel="noreferrer">cosid-zookeeper</a> 模块提供 <em>ZooKeeper</em> 的支持。实现了：</p><ul><li><code>MachineIdDistributor</code>：作为<strong>雪花算法</strong>(<code>SnowflakeId</code>)的机器号分配器 (<code>MachineIdDistributor</code>)。</li><li><code>IdSegmentDistributor</code>：作为<strong>号段算法</strong>(<code>SegmentId</code>)的号段分发器 (<code>IdSegmentDistributor</code>)。</li></ul><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Z2mUk" id="tab-7gym1s3" checked><label for="tab-7gym1s3">Gradle(Kotlin)</label><input type="radio" name="group-Z2mUk" id="tab-YHgUBGo"><label for="tab-YHgUBGo">Maven</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    val</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cosidVersion </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;latestVersion&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    implementation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;me.ahoo.cosid:cosid-zookeeper:\${cosidVersion}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;me.ahoo.cosid&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;cosid-zookeeper&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;\${cosid.version}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></div></div><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><ul><li>配置类：<a href="https://github.com/Ahoo-Wang/CosId/blob/main/cosid-spring-boot-starter/src/main/java/me/ahoo/cosid/spring/boot/starter/zookeeper/CosIdZookeeperProperties.java" target="_blank" rel="noreferrer">CosIdZookeeperProperties</a></li><li>前缀：<code>cosid.zookeeper.</code></li></ul><table tabindex="0"><thead><tr><th>名称</th><th>数据类型</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>enabled</td><td><code>boolean</code></td><td>是否开启<em>ZooKeeper</em></td><td>true</td></tr><tr><td>connect-string</td><td><code>String</code></td><td>链接字符串</td><td><code>localhost:2181</code></td></tr><tr><td>block-until-connected-wait</td><td><code>Duration</code></td><td>阻塞直到客户端已连接等待时间</td><td><code>Duration.ofSeconds(10)</code></td></tr><tr><td>session-timeout</td><td><code>Duration</code></td><td>会话超时时间</td><td><code>Duration.ofSeconds(60</code></td></tr><tr><td>connection-timeout</td><td><code>Duration</code></td><td>连接超时时间</td><td><code>Duration.ofSeconds(15)</code></td></tr><tr><td>retry</td><td><code>Retry</code></td><td>重试策略配置</td><td></td></tr></tbody></table><h3 id="retry-exponentialbackoffretry-配置" tabindex="-1">Retry (<code>ExponentialBackoffRetry</code>) 配置 <a class="header-anchor" href="#retry-exponentialbackoffretry-配置" aria-label="Permalink to &quot;Retry (\`ExponentialBackoffRetry\`) 配置&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>数据类型</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>baseSleepTimeMs</td><td><code>int</code></td><td>重试之间等待的初始时间量 （毫秒）</td><td><code>100</code></td></tr><tr><td>maxRetries</td><td><code>int</code></td><td>最大重试次数</td><td><code>5</code></td></tr><tr><td>maxSleepMs</td><td><code>int</code></td><td>每次重试时的最大睡眠时间（毫秒）</td><td><code>500</code></td></tr></tbody></table><h3 id="配置案例" tabindex="-1">配置案例 <a class="header-anchor" href="#配置案例" aria-label="Permalink to &quot;配置案例&quot;">​</a></h3><p><a href="https://github.com/Ahoo-Wang/CosId/tree/main/examples/cosid-example-zookeeper" target="_blank" rel="noreferrer">CosId-Example-Zookeeper</a></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">cosid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  zookeeper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    connect-string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">localhost:2181</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    retry</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      base-sleep-time-ms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      max-retries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      max-sleep-ms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    block-until-connected-wait</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">10s</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  segment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    distributor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">zookeeper</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  machine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    distributor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line highlighted"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">zookeeper</span></span></code></pre></div>`,13)]))}const E=i(n,[["render",d]]);export{c as __pageData,E as default};
