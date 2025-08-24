# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## 项目概述

这是一个综合性的 Web 背景特效库演示项目，展示了多种流行的 JavaScript 背景特效库（Particles.js、Three.js、Matter.js、Vanta.js 等）的使用方法和效果。项目采用纯前端架构，无需构建工具，通过 CDN 引入依赖，主要面向学习和演示用途。

## 核心架构

### 项目结构
```
background-effects/
├── index.html              # 主页，包含所有特效库的卡片展示
├── README.md              # 项目说明文档
├── assets/                # 静态资源目录
│   ├── css/
│   │   └── style.css      # 全局样式，包含 CSS 变量和响应式设计
│   └── js/
│       └── base-switcher.js  # 通用效果切换器系统
└── libs/                  # 特效库演示目录
    ├── particles/         # Particles.js 演示
    ├── three-js/          # Three.js 演示
    ├── matter-js/         # Matter.js 演示
    ├── vanta/             # Vanta.js 演示
    ├── trianglify/        # Trianglify 演示
    ├── canvas-nest/       # Canvas Nest 演示
    ├── p5-js/             # P5.js 演示
    ├── canvas-confetti/   # Canvas Confetti 演示
    ├── anime-js/          # Anime.js 演示
    └── rough-js/          # Rough.js 演示
```

### 通用切换器系统

项目的核心是 `assets/js/base-switcher.js` 中的两个类：

#### EffectSwitcher 类
- **用途**: 管理演示页面的效果切换
- **主要方法**: 
  - `init(effectConfigs, changeCallback)` - 初始化切换器
  - `switchTo(effectId, animated)` - 切换到指定效果
  - `nextEffect()` / `prevEffect()` - 循环切换效果
  - `destroy()` - 清理资源
- **支持键盘快捷键**: 数字键 1-9、左右箭头键
- **状态管理**: 防止快速切换，支持加载状态和错误处理

#### BaseSwitcher 类
- **用途**: 新版演示页面的简化切换器
- **特点**: 更轻量，专注于索引切换
- **键盘支持**: `ArrowLeft`、`ArrowRight`、`Digit1-9`

## 常用开发命令

### 启动本地服务器
由于项目涉及 Canvas 和某些特效可能有 CORS 限制，需要通过本地服务器运行：

```bash
# 使用 Python 3 内置服务器
python3 -m http.server 8080

# 使用 Node.js http-server
npx http-server .

# 使用 Live Server (VS Code 扩展)
# 右键 index.html -> "Open with Live Server"
```

### 项目访问
```bash
# 启动后访问
open http://localhost:8080
```

### 文件操作
```bash
# 查看项目结构
tree -I 'node_modules|.git|.DS_Store'

# 检查特效库目录
ls -la libs/

# 快速预览某个演示页面
open libs/particles/index.html  # 需要服务器环境
```

## 特效库组织规范

每个特效库演示遵循统一的目录结构：

```
libs/{library-name}/
├── index.html             # 演示页面 HTML
└── {library-name}-demo.js # 演示脚本，包含效果配置
```

### 演示页面结构模式
每个演示页面都包含：
1. **HTML 结构**: 标准的头部、控制面板、Canvas 容器
2. **控制按钮**: 使用 `data-effect` 属性标识不同效果
3. **效果配置**: 在 demo 脚本中定义 `effectConfigs` 数组
4. **初始化函数**: 使用 EffectSwitcher 或 BaseSwitcher 管理切换

### 效果配置格式
```javascript
const effectConfigs = [
    {
        id: 'effect-name',
        name: '效果显示名称',
        description: '效果描述',
        config: {
            // 特效库特有的配置对象
        }
    }
];
```

## 主页预览系统

`index.html` 包含动态 Canvas 预览系统：
- **预览函数**: 每个特效库都有对应的预览绘制函数（如 `drawConfettiPreview`）
- **动画循环**: 使用 `requestAnimationFrame` 实现动态预览
- **响应式**: 监听 `resize` 事件重新绘制预览

## 添加新特效库

1. **创建目录**: 在 `libs/` 下创建新目录
2. **编写 HTML**: 复制现有演示页面结构
3. **编写 Demo 脚本**: 定义 `effectConfigs` 和初始化逻辑
4. **更新主页**: 在 `index.html` 中添加新卡片和预览函数
5. **测试**: 确保切换器和键盘快捷键正常工作

## 开发注意事项

### 代码规范
- **保留注释**: 修改代码时必须保留原有的中文注释
- **增量更新**: 采用逐步更新方式，避免大幅度修改
- **禁止删除**: 不得随意删除现有代码或功能

### 技术约束
- **纯前端**: 无构建流程，所有依赖通过 CDN 引入
- **服务器要求**: 开发时需要本地服务器避免 CORS 问题
- **性能考虑**: Three.js 等 3D 特效对设备性能要求较高
- **兼容性**: 基于 Canvas 2D/WebGL，需考虑浏览器支持情况

### CDN 依赖管理
项目通过 CDN 引入各种特效库：
- Particles.js: `particles.js@2.0.0`
- Three.js: `three.js/r128`
- Matter.js: 通过 CDN 引入
- 其他库类似，版本固定以确保稳定性

### 键盘交互
- **数字键 1-9**: 直接切换到对应效果
- **左右箭头**: 循环切换上一个/下一个效果
- **响应式**: 在输入框中时自动禁用快捷键

### 调试建议
```bash
# 检查浏览器控制台错误
# 特别关注 CDN 资源加载失败
# 监控性能问题，特别是 3D 特效

# 测试不同设备和浏览器的兼容性
```

