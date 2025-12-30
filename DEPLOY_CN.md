# 国内访问优化指南

## 问题说明

Netlify 默认的 `.netlify.app` 域名在国内访问可能遇到以下问题：
1. **网络限制**：部分地区的网络环境可能限制访问
2. **DNS解析慢**：DNS解析可能较慢
3. **CDN节点少**：Netlify在国内的CDN节点较少，导致访问速度慢

## 解决方案

### 方案一：使用 Cloudflare（推荐）

Cloudflare 提供免费的CDN和DNS服务，可以显著改善国内访问速度。

#### 步骤1：在Cloudflare添加站点

1. **注册Cloudflare账号**
   - 访问 [Cloudflare](https://www.cloudflare.com/)
   - 注册免费账号

2. **添加你的网站**
   - 登录后点击 "Add a Site"
   - 输入你的域名（如果有）或先使用免费域名
   - 选择免费计划（Free Plan）

3. **配置DNS**
   - Cloudflare会自动扫描你的DNS记录
   - 如果没有域名，可以跳过这一步，直接使用Cloudflare Pages

#### 步骤2：使用Cloudflare Pages部署

**方法A：通过GitHub连接（推荐）**

1. **在Cloudflare Pages中创建项目**
   - 登录Cloudflare Dashboard
   - 进入 "Workers & Pages" → "Pages"
   - 点击 "Create a project" → "Connect to Git"

2. **连接GitHub仓库**
   - 选择你的GitHub账号
   - 选择 `physics-notes` 仓库
   - 点击 "Begin setup"

3. **配置构建设置**
   - **Project name**: `physics-notes`（或自定义）
   - **Production branch**: `main`
   - **Build command**: 留空（静态网站不需要构建）
   - **Build output directory**: `.`（根目录）
   - 点击 "Save and Deploy"

4. **等待部署完成**
   - Cloudflare会自动部署你的网站
   - 部署完成后会给你一个URL：`https://your-project.pages.dev`

**方法B：直接上传文件**

1. 进入 Cloudflare Pages
2. 点击 "Create a project" → "Upload assets"
3. 将整个项目文件夹打包为zip上传
4. 等待部署完成

#### 步骤3：配置自定义域名（可选）

如果你有自己的域名：

1. **在Cloudflare添加域名**
   - 在Cloudflare Dashboard中添加你的域名
   - 按照提示修改域名的DNS服务器为Cloudflare提供的地址

2. **在Pages中绑定域名**
   - 进入你的Pages项目
   - 点击 "Custom domains"
   - 添加你的域名
   - Cloudflare会自动配置SSL证书

#### 步骤4：优化设置

在Cloudflare Dashboard中：

1. **Speed优化**
   - 进入 "Speed" 标签
   - 开启 "Auto Minify"（自动压缩）
   - 开启 "Brotli"（压缩算法）

2. **Caching设置**
   - 进入 "Caching" → "Configuration"
   - 设置缓存级别为 "Standard"

3. **中国节点优化**
   - Cloudflare在中国有节点，会自动优化访问速度
   - 可以开启 "Always Online" 功能

---

### 方案二：使用Vercel（备选）

Vercel 在国内的访问速度通常比Netlify好一些。

#### 部署步骤：

1. **访问Vercel**
   - 访问 [Vercel](https://vercel.com/)
   - 使用GitHub账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择你的GitHub仓库
   - 点击 "Import"

3. **配置项目**
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: 留空
   - **Output Directory**: `.`
   - 点击 "Deploy"

4. **访问网站**
   - 部署完成后会给你一个URL：`https://your-project.vercel.app`

---

### 方案三：使用GitHub Pages（免费但速度一般）

GitHub Pages 是免费的，但国内访问速度可能较慢。

#### 部署步骤：

1. **在GitHub仓库中启用Pages**
   - 进入你的仓库设置（Settings）
   - 点击左侧 "Pages"
   - Source选择 "Deploy from a branch"
   - Branch选择 `main`，文件夹选择 `/ (root)`
   - 点击 "Save"

2. **访问网站**
   - 网站地址：`https://YOUR_USERNAME.github.io/physics-notes`

---

### 方案四：使用国内服务（最佳国内访问速度）

#### 选项1：Gitee Pages（码云）

1. **注册Gitee账号**
   - 访问 [Gitee](https://gitee.com/)
   - 注册账号

2. **导入GitHub仓库**
   - 创建新仓库
   - 选择 "导入仓库"
   - 输入GitHub仓库地址
   - 或直接上传代码

3. **启用Gitee Pages**
   - 进入仓库设置 → "Pages"
   - 点击 "启动"
   - 选择部署分支（main）
   - 访问地址：`https://YOUR_USERNAME.gitee.io/physics-notes`

#### 选项2：腾讯云静态网站托管

1. **注册腾讯云账号**
2. **开通静态网站托管服务**
3. **上传文件**
4. **配置CDN加速**（可选）

#### 选项3：阿里云OSS + CDN

1. **开通OSS服务**
2. **上传静态文件到OSS**
3. **配置静态网站托管**
4. **绑定CDN加速**

---

## 推荐方案对比

| 方案 | 国内访问速度 | 配置难度 | 费用 | 推荐度 |
|------|------------|---------|------|--------|
| Cloudflare Pages | ⭐⭐⭐⭐ | 简单 | 免费 | ⭐⭐⭐⭐⭐ |
| Vercel | ⭐⭐⭐ | 简单 | 免费 | ⭐⭐⭐⭐ |
| GitHub Pages | ⭐⭐ | 简单 | 免费 | ⭐⭐⭐ |
| Gitee Pages | ⭐⭐⭐⭐⭐ | 简单 | 免费 | ⭐⭐⭐⭐⭐ |
| 腾讯云/阿里云 | ⭐⭐⭐⭐⭐ | 中等 | 付费 | ⭐⭐⭐⭐ |

## 最佳实践建议

### 对于国内用户访问：

1. **首选：Gitee Pages**
   - 国内访问速度最快
   - 完全免费
   - 配置简单

2. **次选：Cloudflare Pages**
   - 全球CDN，国内也有节点
   - 免费且功能强大
   - 可以绑定自定义域名

3. **备选：Vercel**
   - 访问速度中等
   - 配置简单

### 多平台部署策略：

可以同时在多个平台部署：
- **Gitee Pages**：主要面向国内用户
- **Cloudflare Pages**：面向全球用户
- **GitHub Pages**：作为备份

在首页添加多个访问链接，让用户选择最快的入口。

---

## Cloudflare详细配置步骤

### 1. 注册并添加站点

```bash
# 访问 https://dash.cloudflare.com/
# 注册账号 → Add a Site → 输入域名
```

### 2. 修改DNS服务器

按照Cloudflare提示，将域名的DNS服务器修改为Cloudflare提供的地址。

### 3. 配置SSL/TLS

- 进入 SSL/TLS 设置
- 加密模式选择 "Full" 或 "Full (strict)"

### 4. 开启CDN加速

- Speed → 开启 Auto Minify
- Caching → 设置缓存规则

### 5. 使用Cloudflare Pages

- Workers & Pages → Pages → Create project
- 连接GitHub仓库
- 配置构建设置
- 部署

---

## 常见问题

### Q: Cloudflare在国内真的能访问吗？

A: 是的，Cloudflare在中国有节点，访问速度比Netlify好很多。但如果追求最佳速度，建议使用Gitee Pages。

### Q: 需要购买域名吗？

A: 不需要。Cloudflare Pages和Gitee Pages都提供免费子域名。但如果想使用自定义域名，需要购买。

### Q: 如何测试访问速度？

A: 可以使用以下工具：
- [17CE](http://www.17ce.com/) - 国内多节点测速
- [站长工具](https://tool.chinaz.com/) - 国内测速
- [GTmetrix](https://gtmetrix.com/) - 全球测速

### Q: 可以同时使用多个平台吗？

A: 可以！建议同时部署到Gitee Pages和Cloudflare Pages，在首页提供多个访问入口。

---

## 快速迁移指南

### 从Netlify迁移到Cloudflare Pages：

1. 在Cloudflare Pages中创建新项目
2. 连接相同的GitHub仓库
3. 配置相同的构建设置
4. 部署完成后更新访问链接

### 从Netlify迁移到Gitee Pages：

1. 在Gitee创建新仓库
2. 导入GitHub仓库或直接上传代码
3. 启用Gitee Pages
4. 更新访问链接

---

## 总结

**最佳方案**：
- **国内用户**：使用 **Gitee Pages**
- **全球用户**：使用 **Cloudflare Pages**
- **同时部署**：两个平台都部署，提供多个访问入口

这样既能保证国内用户的访问速度，又能服务全球用户！






