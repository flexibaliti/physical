# 部署指南：GitHub + Netlify

## 第一步：创建GitHub仓库

### 1. 在GitHub上创建新仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `physics-notes` (或你喜欢的名字)
   - **Description**: 应用物理学习笔记网站
   - **Visibility**: Public (公开) 或 Private (私有)
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 2. 在本地初始化Git仓库

打开终端（PowerShell或命令提示符），进入项目目录：

```bash
cd "F:\程序\应用物理笔记整理"
```

初始化Git仓库：

```bash
git init
```

### 3. 添加文件到Git

```bash
# 添加所有文件
git add .

# 提交文件
git commit -m "Initial commit: 应用物理学习笔记网站"
```

### 4. 连接到GitHub仓库

将本地仓库连接到GitHub（替换YOUR_USERNAME为你的GitHub用户名）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/physics-notes.git
```

### 5. 推送到GitHub

```bash
# 推送代码到GitHub
git branch -M main
git push -u origin main
```

如果提示输入用户名和密码，请使用：
- **用户名**: 你的GitHub用户名
- **密码**: 使用Personal Access Token（不是GitHub密码）

#### 如何创建Personal Access Token：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成后复制token，用它作为密码

---

## 第二步：部署到Netlify

### 方法一：通过GitHub连接（推荐）

1. **登录Netlify**
   - 访问 [Netlify](https://www.netlify.com)
   - 使用GitHub账号登录（推荐）

2. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择 "GitHub"，授权Netlify访问你的仓库
   - 选择你刚创建的仓库 `physics-notes`

3. **配置构建设置**
   - **Build command**: 留空（静态网站不需要构建）
   - **Publish directory**: `.` (根目录)
   - 点击 "Deploy site"

4. **等待部署完成**
   - Netlify会自动部署你的网站
   - 部署完成后会给你一个URL，例如：`https://your-site-name.netlify.app`

### 方法二：直接拖拽部署（快速测试）

1. 访问 [Netlify](https://www.netlify.com)
2. 登录账号
3. 直接将整个项目文件夹拖拽到Netlify的部署区域
4. 等待部署完成

---

## 第三步：配置自定义域名（可选）

1. 在Netlify控制台，进入你的网站设置
2. 点击 "Domain settings"
3. 点击 "Add custom domain"
4. 输入你的域名（如果有的话）
5. 按照提示配置DNS记录

---

## 常见问题

### 1. 图片或PDF无法显示

- 检查文件路径是否正确
- 确保文件已提交到GitHub仓库
- 检查文件名是否包含中文字符（建议使用英文文件名）

### 2. 样式不生效

- 检查CSS文件路径是否正确
- 清除浏览器缓存后刷新

### 3. 更新网站内容

```bash
# 修改文件后
git add .
git commit -m "更新内容"
git push
```

Netlify会自动检测GitHub的更新并重新部署。

---

## 快速命令参考

```bash
# 初始化仓库
git init
git add .
git commit -m "Initial commit"

# 连接GitHub
git remote add origin https://github.com/YOUR_USERNAME/physics-notes.git
git branch -M main
git push -u origin main

# 后续更新
git add .
git commit -m "更新说明"
git push
```

---

## 技术支持

如有问题，可以：
1. 查看 [Netlify文档](https://docs.netlify.com/)
2. 查看 [GitHub文档](https://docs.github.com/)

