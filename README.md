
```markdown
# 🚀 我的个人网站与游戏中心

一个基于 GitHub Pages 构建的现代化个人网站，集成了游戏大厅、访问者数据收集和自动化数据看板。

![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)
![Vercel](https://img.shields.io/badge/Backend-Vercel-black?logo=vercel)
![Auto Sync](https://img.shields.io/badge/Data-Auto_Sync-green)

## 🌐 在线访问

- **主站**: [https://fsywed.github.io](https://fsywed.github.io)
- **数据看板**: [https://fsywed.github.io/dashboard.html](https://fsywed.github.io/dashboard.html)
- **游戏大厅**: [https://fsywed.github.io/game.html](https://fsywed.github.io/game.html)

## ✨ 功能特性

### 🎮 游戏中心
- 多款在线游戏集成
- 响应式设计，支持移动端
- 一键切换，流畅体验

### 📊 智能数据系统
- **自动数据收集**: 访问者信息自动记录
- **实时数据看板**: 可视化数据分析和图表展示
- **自动同步**: GitHub Actions 定时同步数据
- **数据导出**: 支持 JSON 格式数据导出

### 🛠️ 技术架构
- **前端**: 原生 HTML5/CSS3/JavaScript
- **后端**: Vercel Serverless Functions
- **部署**: GitHub Pages + GitCode 镜像
- **自动化**: GitHub Actions 工作流

## 🏗️ 项目结构




fsywed.github.io/
├──index.html              # 主站首页（访问者登记）
├──game.html              # 游戏大厅
├──dashboard.html         # 数据仪表板
├──data-view.html         # 简单数据查看
├──scripts/               # 数据管理脚本
│├── data-manager.js
│└── sync-data.js
├──data/                  # 数据存储目录
│├── visitors.json      # 访问者数据
│└── stats.json         # 统计数据
├──.github/workflows/     # 自动化工作流
│└── sync-data.yml      # 数据同步任务
└──api/                   # Vercel 云函数
└── message.js         # 数据接收 API



## 🚀 快速开始

### 访问网站
1. 打开 [https://fsywed.github.io](https://fsywed.github.io)
2. 填写访问者信息（可选）
3. 进入游戏大厅开始体验

### 查看数据
1. 访问 [数据看板](https://fsywed.github.io/dashboard.html)
2. 查看实时访问统计和图表
3. 使用筛选功能查看特定时间段数据

## 🔧 开发与部署

### 环境要求
- GitHub 账户
- Vercel 账户（用于云函数）

### 本地开发
```bash
# 克隆仓库
git clone https://github.com/fsywed/fsywed.github.io.git

# 进入目录
cd fsywed.github.io

# 使用本地服务器运行
python -m http.server 8000
# 或
npx http-server
```

自动化流程

· 数据同步: 每6小时自动运行
· 自动部署: Push 到 main 分支触发部署
· 镜像同步: GitCode 自动同步 GitHub 更新

📊 数据流架构

```mermaid
graph LR
    A[访问者] --> B[前端网站]
    B --> C[Vercel 云函数]
    C --> D[GitHub 数据存储]
    D --> E[自动化同步]
    E --> F[数据看板]
    F --> G[可视化图表]
```

🎯 核心功能详解

访问者登记系统

· 本地存储 + 云端备份双保险
· 微信端优化，支持移动设备
· 隐私保护设计

游戏集成方案

· iframe 嵌入主流在线游戏
· 加载状态优化
· 错误回退机制

数据监控看板

· 实时访问统计
· 来源分析图表
· 时间趋势分析

🔒 隐私与安全

· 所有数据仅用于展示和分析
· 不收集敏感个人信息
· 数据存储在用户自己的 GitHub 仓库

🤝 贡献与反馈

欢迎提出建议和改进意见！

📄 许可证

MIT License

---

由 GitHub Pages 驱动 | 后端由 Vercel 提供支持

```

## 🎨 可选的额外内容

如果你想添加更多技术细节，还可以包含这些部分：

### 技术栈详情
```markdown
## 🛠️ 技术栈

- **前端框架**: 原生 JavaScript
- **样式**: CSS3 + Flexbox/Grid
- **图表库**: Chart.js
- **部署**: GitHub Pages
- **后端**: Vercel Serverless Functions
- **自动化**: GitHub Actions
- **监控**: 自定义数据看板
```

API 文档

```markdown
## 📡 API 接口

### 提交访问者数据
```http
POST /api/message
Content-Type: application/json

{
  "name": "访客名称",
  "message": "留言内容",
  "website": "来源网站"
}
```

```

这个 README 展示了你的项目从简单的静态网站发展到包含完整数据系统的过程，体现了你的技术成长轨迹。需要我调整任何部分吗？