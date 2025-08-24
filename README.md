# 背景特效库演示项目

## 📖 项目简介

这是一个综合性的 Web 背景特效库演示项目，展示了多种流行的 JavaScript 背景特效库的使用方法和效果。每个库都配备了独立的演示页面，提供了多种预设效果供切换体验。

## 🎯 包含的特效库

1. **tsParticles** - 现代化粒子效果库
2. **Granim.js** - 流体渐变动画背景
3. **Trianglify** - 几何三角形背景生成器
4. **Canvas Nest** - 连线粒子效果
5. **Matter.js** - 2D 物理引擎特效
6. **Three.js** - 强大的 3D 图形库
7. **P5.js** - 创意编程和艺术背景

## 🚀 运行方法

### 本地运行
1. 克隆或下载本项目
2. 使用本地服务器运行（避免 CORS 问题）：
   ```bash
   # 使用 Python
   python3 -m http.server 8080
   
   # 或使用 Node.js
   npx http-server .
   
   # 或使用 Live Server VS Code 扩展
   ```
3. 在浏览器中访问 `http://localhost:8080`

### 直接访问
打开 `index.html` 文件即可（某些特效可能需要服务器环境）。

## 📁 目录结构

```
background-effects/
│
├── index.html              # 主页
├── README.md              # 项目说明
│
├── assets/                # 静态资源
│   ├── css/
│   │   └── style.css      # 全局样式
│   ├── js/
│   │   └── base-switcher.js  # 通用切换逻辑
│   └── img/               # 预览缩略图
│
└── libs/                  # 各特效库演示
    ├── tsparticles/       # tsParticles 演示
    ├── granim/           # Granim.js 演示
    ├── trianglify/       # Trianglify 演示
    ├── canvas-nest/      # Canvas Nest 演示
    ├── matter-js/        # Matter.js 演示
    ├── three-js/         # Three.js 演示
    └── p5-js/           # P5.js 演示
```

## 🎨 特性

- 📱 **响应式设计** - 适配不同屏幕尺寸
- 🎛️ **多种效果** - 每个库提供 5 种不同效果切换
- 🔄 **实时切换** - 无需刷新页面即可切换效果
- 💡 **易于扩展** - 模块化设计，便于添加新效果
- 📝 **详细注释** - 中文注释，便于学习和修改

## 🛠️ 技术栈

- 纯 HTML5/CSS3/JavaScript
- 各特效库通过 CDN 引入
- 无需构建工具，开箱即用

## 📄 许可证

本项目仅供学习和演示使用。各特效库的版权归其原作者所有。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
