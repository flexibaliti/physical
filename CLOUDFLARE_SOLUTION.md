# Cloudflare 部署解决方案

## 🔍 问题诊断

从你的截图看，你当前在 **Workers** 项目设置中，而不是 **Pages** 项目。

**区别**：
- **Workers**: 用于运行服务器端代码（需要 wrangler deploy）
- **Pages**: 用于部署静态网站（不需要构建命令）

## ✅ 解决方案

### 方案一：创建新的 Pages 项目（推荐）

1. **在 Cloudflare Dashboard 中**
   - 点击左侧菜单 "Workers & Pages"
   - 点击 "Pages"（不是 Workers）
   - 点击 "Create a project"

2. **连接 GitHub 仓库**
   - 选择 "Connect to Git"
   - 选择你的 GitHub 账号
   - 选择仓库 `flexibaliti/physical`（或你的仓库名）

3. **配置构建设置**
   - **Framework preset**: `None` 或 `Other`
   - **Build command**: **留空**
   - **Build output directory**: `.` (根目录)
   - **Root directory**: `/` (留空)

4. **部署**
   - 点击 "Save and Deploy"
   - 等待部署完成

### 方案二：修改当前 Worker 配置（如果必须使用 Workers）

如果你必须使用当前的 Worker 项目，需要修改部署命令：

1. **在 Build configuration 模态框中**
   - **Build command**: 留空
   - **Deploy command**: 改为 `npx wrangler deploy --assets=./`
   - **Non-production branch deploy command**: 留空或删除
   - **Path**: `/`

2. **点击 "Update"**

3. **或者创建 wrangler.toml 文件**

在项目根目录创建 `wrangler.toml`：

```toml
name = "physical"
compatibility_date = "2025-12-29"

[site]
bucket = "."
```

然后修改 Deploy command 为：`npx wrangler deploy`

## 🎯 推荐操作步骤

### 步骤1：创建新的 Pages 项目

1. 访问：https://dash.cloudflare.com/
2. Workers & Pages → **Pages**（注意是 Pages，不是 Workers）
3. Create a project → Connect to Git
4. 选择你的 GitHub 仓库
5. 构建设置：
   - Build command: **留空**
   - Build output directory: `.`
   - Root directory: `/`
6. Save and Deploy

### 步骤2：删除或忽略旧的 Worker 项目

如果不需要 Worker 项目，可以：
- 在 Worker 项目设置中点击 "Delete"
- 或者保留它，只使用 Pages 项目

## 📋 正确的 Pages 配置

在 Pages 项目中，Build configuration 应该是：

```
Framework preset: None
Build command: (留空)
Build output directory: .
Root directory: (留空)
```

**不应该有**：
- ❌ Deploy command: npx wrangler deploy
- ❌ Version command

## 🔄 如果创建 Pages 项目后还是失败

### 检查清单：

- [ ] 确认创建的是 **Pages** 项目，不是 Workers
- [ ] Build command 完全留空
- [ ] Build output directory 设置为 `.`
- [ ] index.html 在项目根目录
- [ ] 所有文件都已推送到 GitHub

### 备选方案：直接上传

1. 在 Pages 项目中
2. Create a project → **Upload assets**
3. 将项目文件夹打包为 zip
4. 上传并部署

## 💡 为什么推荐使用 Pages？

- ✅ 专为静态网站设计
- ✅ 不需要构建命令
- ✅ 自动 CDN 加速
- ✅ 免费 SSL 证书
- ✅ 更简单的配置

## 🆘 仍然有问题？

如果按照以上步骤操作后仍然失败：

1. **确认项目类型**：确保是 Pages 项目，不是 Workers
2. **检查文件结构**：确保 index.html 在根目录
3. **查看部署日志**：在 Deployments 标签中查看详细错误信息

或者考虑使用：
- **Gitee Pages**：国内访问最快，配置最简单
- **Vercel**：备选方案







