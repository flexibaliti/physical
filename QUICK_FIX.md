# Cloudflare Pages 部署快速修复指南

## 🚨 当前错误

```
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

这个错误表示 Cloudflare Pages 被误配置为 Workers 部署方式。

## ✅ 快速修复步骤

### 步骤1：在 Cloudflare Dashboard 中修改构建设置

1. **登录 Cloudflare Dashboard**
   - 访问：https://dash.cloudflare.com/
   - 登录你的账号

2. **进入项目设置**
   - 点击左侧菜单 "Workers & Pages"
   - 点击 "Pages"
   - 找到你的项目 `physics-notes`，点击进入

3. **修改构建设置**
   - 点击顶部 "Settings" 标签
   - 找到 "Builds & deployments" 部分
   - 点击 "Edit configuration"

4. **清空构建命令**
   - **Build command**: **完全删除，留空** ⚠️ 重要！
   - **Build output directory**: 设置为 `.` (一个点号)
   - **Root directory**: 留空或填 `/`

5. **保存设置**
   - 点击 "Save"
   - 返回 "Deployments" 标签

6. **重新部署**
   - 找到最新的部署记录
   - 点击右侧的 "..." 菜单
   - 选择 "Retry deployment"

### 步骤2：删除或重命名 wrangler.toml（如果存在）

如果项目根目录有 `wrangler.toml` 文件，可以：

**选项A：删除它**
```bash
# 在项目目录执行
rm wrangler.toml
# 然后提交更改
git add .
git commit -m "Remove wrangler.toml for Pages deployment"
git push
```

**选项B：重命名为备份**
```bash
mv wrangler.toml wrangler.toml.backup
git add .
git commit -m "Rename wrangler.toml for Pages deployment"
git push
```

### 步骤3：验证部署

等待部署完成后，检查：
- ✅ Build completed successfully
- ✅ 网站可以正常访问

## 📋 正确的 Cloudflare Pages 配置

### 在 Dashboard 中的设置应该是：

```
Framework preset: None 或 Other
Build command: (留空)
Build output directory: .
Root directory: (留空)
```

### 环境变量：
不需要设置任何环境变量

## 🔄 如果还是失败

### 方法1：使用直接上传（最简单）

1. 在 Cloudflare Pages 中
2. 点击 "Create a project" → "Upload assets"
3. 将整个项目文件夹打包为 zip
4. 上传并部署

这样可以绕过构建配置问题。

### 方法2：检查 GitHub 仓库

确保：
- ✅ 所有文件都已推送到 GitHub
- ✅ `index.html` 在根目录
- ✅ 文件路径正确

### 方法3：使用 Gitee Pages（备选）

如果 Cloudflare 一直有问题，可以先用 Gitee Pages：

1. 访问 https://gitee.com/
2. 创建仓库，导入 GitHub 仓库
3. 启用 Gitee Pages
4. 立即可以访问（国内速度最快）

## 📝 检查清单

部署前检查：
- [ ] Build command 已清空
- [ ] Build output directory 设置为 `.`
- [ ] wrangler.toml 已删除或重命名
- [ ] 所有文件已推送到 GitHub
- [ ] index.html 在根目录

## 🆘 仍然有问题？

如果按照以上步骤操作后仍然失败，请：

1. **截图错误信息**
2. **检查 Cloudflare Dashboard 中的构建设置**
3. **确认项目结构正确**

或者考虑使用：
- **Gitee Pages**：国内访问最快，配置最简单
- **Vercel**：备选方案，配置类似

