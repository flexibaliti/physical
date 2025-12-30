# Cloudflare Pages 部署配置指南

## 问题说明

如果你看到 `Missing entry-point to Worker script` 错误，说明 Cloudflare Pages 被误配置为 Workers 部署方式。

## 解决方案

### 方法一：在 Cloudflare Dashboard 中修改设置（推荐）

1. **登录 Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com/
   - 进入你的项目

2. **修改构建设置**
   - 进入 "Workers & Pages" → "Pages"
   - 点击你的项目名称
   - 进入 "Settings" → "Builds & deployments"
   - 找到 "Build configuration"

3. **配置构建设置**
   - **Build command**: 留空（删除所有内容）
   - **Build output directory**: `.` (点号，表示根目录)
   - **Root directory**: `/` (留空或填 `/`)

4. **保存并重新部署**
   - 点击 "Save"
   - 进入 "Deployments" 标签
   - 点击最新的部署，选择 "Retry deployment"

### 方法二：删除 wrangler.toml（如果存在）

如果你创建了 `wrangler.toml` 文件，对于静态网站 Pages 部署，应该删除它或使用下面的配置。

### 方法三：使用正确的配置文件

创建 `wrangler.toml` 文件（已在项目中创建），内容如下：

```toml
name = "physics-notes"
compatibility_date = "2025-12-29"
pages_build_output_dir = "."
```

## 正确的 Cloudflare Pages 配置

### 在 Cloudflare Dashboard 中：

**Build settings:**
- Framework preset: `None` 或 `Other`
- Build command: **留空**
- Build output directory: `.` (根目录)
- Root directory: `/` (留空)

**Environment variables:**
- 不需要设置任何环境变量

## 验证配置

部署成功后，你应该看到：
- ✅ Build completed successfully
- ✅ Deploy completed successfully
- 网站可以正常访问

## 如果还是失败

### 选项1：使用直接上传方式

1. 在 Cloudflare Pages 中
2. 选择 "Create a project" → "Upload assets"
3. 将整个项目文件夹打包为 zip
4. 上传并部署

### 选项2：检查文件结构

确保项目结构正确：
```
physics-notes/
├── index.html
├── styles/
├── scripts/
├── notes/
└── ...
```

### 选项3：使用 GitHub Actions（高级）

如果自动部署有问题，可以使用 GitHub Actions 手动触发部署。

## 常见错误

### 错误1: Missing entry-point
**原因**: 配置了 Workers 而不是 Pages
**解决**: 清空 Build command，设置 Build output directory 为 `.`

### 错误2: Build failed
**原因**: 构建命令错误
**解决**: 静态网站不需要构建命令，留空即可

### 错误3: 404 Not Found
**原因**: Build output directory 配置错误
**解决**: 设置为 `.` (根目录)






