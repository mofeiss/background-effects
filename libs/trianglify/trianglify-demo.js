/**
 * Trianglify 演示脚本
 * 低多边形背景生成器演示
 */

// 全局变量
let currentEffect = 'classic';
let trianglifyLoaded = false;

// 效果配置
const effectConfigs = [
    {
        id: 'classic',
        name: '经典三角',
        description: '经典的蓝紫色调低多边形背景',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 75,
            variance: 0.75,
            seed: null,
            xColors: ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#e879f9'],
            yColors: ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c084fc'],
            fill: true,
            strokeWidth: 0
        }
    },
    {
        id: 'colorful',
        name: '彩色网格',
        description: '明亮多彩的网格状几何背景',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 60,
            variance: 0.8,
            seed: null,
            xColors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'],
            yColors: ['#fdcb6e', '#6c5ce7', '#fd79a8', '#fdcb6e', '#00b894', '#e17055'],
            fill: true,
            strokeWidth: 1
        }
    },
    {
        id: 'gradient',
        name: '渐变几何',
        description: '温暖色调的渐变几何图案',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 90,
            variance: 0.6,
            seed: null,
            xColors: ['#ff9a56', '#ff7675', '#fd79a8', '#fdcb6e', '#e17055'],
            yColors: ['#fab1a0', '#fd79a8', '#e84393', '#6c5ce7', '#74b9ff'],
            fill: true,
            strokeWidth: 0
        }
    },
    {
        id: 'abstract',
        name: '抽象艺术',
        description: '高对比度的抽象艺术风格',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 120,
            variance: 1.0,
            seed: null,
            xColors: ['#2d3436', '#636e72', '#b2bec3', '#ddd', '#ffffff'],
            yColors: ['#000000', '#2d3436', '#636e72', '#74b9ff', '#0984e3'],
            fill: true,
            strokeWidth: 2
        }
    },
    {
        id: 'tech',
        name: '科技风格',
        description: '未来感的科技蓝调背景',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 50,
            variance: 0.4,
            seed: null,
            xColors: ['#0c4a6e', '#0369a1', '#0284c7', '#0ea5e9', '#38bdf8'],
            yColors: ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8'],
            fill: true,
            strokeWidth: 1
        }
    },
    {
        id: 'sunset',
        name: '日落黄昏',
        description: '温暖的日落色彩背景',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 80,
            variance: 0.7,
            seed: null,
            xColors: ['#ff7675', '#fd79a8', '#fdcb6e', '#ffeaa7', '#fab1a0'],
            yColors: ['#e17055', '#d63031', '#e84393', '#fd79a8', '#fdcb6e'],
            fill: true,
            strokeWidth: 0
        }
    },
    {
        id: 'ocean',
        name: '深海蓝调',
        description: '深海潮水的蓝色调背景',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 65,
            variance: 0.9,
            seed: null,
            xColors: ['#74b9ff', '#0984e3', '#00b894', '#00cec9', '#55a3ff'],
            yColors: ['#2d3436', '#636e72', '#74b9ff', '#0984e3', '#6c5ce7'],
            fill: true,
            strokeWidth: 1
        }
    },
    {
        id: 'forest',
        name: '森林绿意',
        description: '生机盎然的绿色森林背景',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 100,
            variance: 0.6,
            seed: null,
            xColors: ['#00b894', '#00cec9', '#55efc4', '#81ecec', '#a29bfe'],
            yColors: ['#2d3436', '#636e72', '#00b894', '#55efc4', '#fdcb6e'],
            fill: true,
            strokeWidth: 0
        }
    },
    {
        id: 'neon',
        name: '霓虹夜景',
        description: '畅震的霓虹色彩背景',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 40,
            variance: 0.8,
            seed: null,
            xColors: ['#fd79a8', '#fdcb6e', '#e17055', '#74b9ff', '#6c5ce7'],
            yColors: ['#2d3436', '#fd79a8', '#e84393', '#a29bfe', '#74b9ff'],
            fill: true,
            strokeWidth: 2
        }
    },
    {
        id: 'cosmic',
        name: '宇宙星云',
        description: '神秘的宇宙星云背景',
        config: {
            width: window.innerWidth,
            height: window.innerHeight,
            cellSize: 110,
            variance: 0.5,
            seed: null,
            xColors: ['#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055'],
            yColors: ['#2d3436', '#636e72', '#6c5ce7', '#74b9ff', '#fd79a8'],
            fill: true,
            strokeWidth: 1
        }
    }
];

/**
 * 初始化函数
 */
function initDemo() {
    console.log('开始初始化 Trianglify 演示...');
    
    // 检查 Trianglify 是否加载
    if (typeof trianglify === 'undefined') {
        console.error('Trianglify 未定义');
        showError('Trianglify 库加载失败');
        return;
    }

    // 设置容器样式
    setupContainer();
    
    // 绑定按钮事件
    bindButtonEvents();
    
    // 绑定窗口大小改变事件
    bindResizeEvent();
    
    // 加载默认效果
    loadEffect('classic');
}

/**
 * 设置容器样式
 */
function setupContainer() {
    const container = document.getElementById('trianglify-container');
    if (container) {
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '500px';
        container.style.overflow = 'hidden';
        container.style.borderRadius = 'var(--border-radius-lg)';
        container.style.border = '1px solid var(--border-color)';
    }
}

/**
 * 绑定按钮事件
 */
function bindButtonEvents() {
    // 绑定效果切换按钮
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const effectId = btn.dataset.effect;
            if (effectId) {
                loadEffect(effectId);
                updateButtonStates(effectId);
            }
        });
    });
    
    // 绑定随机生成按钮（完全随机参数）
    const randomBtn = document.getElementById('random-btn');
    if (randomBtn) {
        randomBtn.addEventListener('click', (e) => {
            e.preventDefault();
            generateFullyRandomEffect();
        });
    }
    
    // 绑定重新生成按钮
    const regenerateBtn = document.getElementById('regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            regeneratePattern();
        });
    }
    
    // 绑定键盘快捷键
    document.addEventListener('keydown', (e) => {
        const num = parseInt(e.key);
        if (num >= 1 && num <= effectConfigs.length) {
            const effectId = effectConfigs[num - 1].id;
            loadEffect(effectId);
            updateButtonStates(effectId);
        } else if (e.key === 'r' || e.key === 'R') {
            // R键随机生成
            generateFullyRandomEffect();
        } else if (e.key === ' ') {
            // 空格键重新生成当前效果
            e.preventDefault();
            regeneratePattern();
        }
    });
}

/**
 * 绑定窗口大小改变事件
 */
function bindResizeEvent() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // 重新生成当前效果
            loadEffect(currentEffect);
        }, 300);
    });
}

/**
 * 加载效果
 */
function loadEffect(effectId) {
    console.log(`尝试加载效果: ${effectId}`);
    
    const effect = effectConfigs.find(e => e.id === effectId);
    if (!effect) {
        console.error(`找不到效果配置: ${effectId}`);
        return;
    }

    try {
        const container = document.getElementById('trianglify-container');
        if (!container) {
            throw new Error('找不到容器元素');
        }

        // 清空容器
        container.innerHTML = '';
        
        // 更新配置中的尺寸
        const config = { ...effect.config };
        config.width = container.offsetWidth || 800;
        config.height = container.offsetHeight || 500;
        
        // 生成随机种子确保每次都是新图案
        config.seed = Math.random().toString(36).substring(7);
        
        console.log('使用配置生成背景:', config);
        
        // 生成三角几何背景
        const pattern = trianglify(config);
        
        // 创建 SVG 元素
        const svg = pattern.toSVG();
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';
        
        // 添加到容器
        container.appendChild(svg);
        
        currentEffect = effectId;
        console.log(`成功加载效果: ${effect.name}`);
        
    } catch (error) {
        console.error('加载效果失败:', error);
        showError(`加载效果失败: ${error.message}`);
    }
}

/**
 * 更新按钮状态
 */
function updateButtonStates(activeId) {
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(btn => {
        const effectId = btn.dataset.effect;
        if (effectId === activeId) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

/**
 * 显示错误信息
 */
function showError(message) {
    const container = document.getElementById('trianglify-container');
    container.innerHTML = `
        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: var(--text-secondary);
            padding: 2rem;
        ">
            <h3 style="color: var(--danger-color); margin-bottom: 1rem;">加载失败</h3>
            <p style="margin-bottom: 1rem;">${message}</p>
            <button onclick="location.reload()" class="btn btn-primary">
                重新加载
            </button>
        </div>
    `;
}

/**
 * 重新生成当前效果（用于刷新图案）
 */
function regeneratePattern() {
    loadEffect(currentEffect);
}

/**
 * 随机生成效果
 */
function generateRandomEffect() {
    const randomIndex = Math.floor(Math.random() * effectConfigs.length);
    const randomEffectId = effectConfigs[randomIndex].id;
    
    console.log(`随机选择效果: ${randomEffectId}`);
    
    loadEffect(randomEffectId);
    updateButtonStates(randomEffectId);
}

/**
 * 生成完全随机的配置（不使用预设）
 */
function generateFullyRandomEffect() {
    const container = document.getElementById('trianglify-container');
    if (!container) return;
    
    try {
        // 清空容器
        container.innerHTML = '';
        
        // 随机生成配置
        const randomConfig = {
            width: container.offsetWidth || 800,
            height: container.offsetHeight || 500,
            cellSize: 30 + Math.random() * 120, // 30-150
            variance: 0.2 + Math.random() * 0.8, // 0.2-1.0
            seed: Math.random().toString(36).substring(7),
            xColors: generateRandomColorPalette(),
            yColors: generateRandomColorPalette(),
            fill: true,
            strokeWidth: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 3)
        };
        
        console.log('使用随机配置生成背景:', randomConfig);
        
        // 生成三角几何背景
        const pattern = trianglify(randomConfig);
        
        // 创建 SVG 元素
        const svg = pattern.toSVG();
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';
        
        // 添加到容器
        container.appendChild(svg);
        
        // 清除按钮选中状态（因为这是随机效果）
        updateButtonStates(null);
        currentEffect = 'random';
        
        console.log('成功生成随机效果');
        
    } catch (error) {
        console.error('生成随机效果失败:', error);
        showError(`生成随机效果失败: ${error.message}`);
    }
}

/**
 * 生成随机色彩调色板
 */
function generateRandomColorPalette() {
    const colorPalettes = [
        // 暖色调
        ['#ff6b6b', '#ee5a52', '#ff9ff3', '#f368e0', '#bf9000'],
        // 冷色调
        ['#3742fa', '#2f3542', '#40407a', '#706fd3', '#f1c0e8'],
        // 绿色系
        ['#7bed9f', '#70a1ff', '#5352ed', '#ff6348', '#2ed573'],
        // 紫色系
        ['#5f27cd', '#00d2d3', '#ff9ff3', '#54a0ff', '#5f27cd'],
        // 橙色系
        ['#ff9500', '#ff6348', '#ff3838', '#ff9ff3', '#ffdd59'],
        // 蓝色系
        ['#3867d6', '#4b6584', '#778ca3', '#a4b0be', '#57606f'],
        // 红色系
        ['#eb2f06', '#fa983a', '#feca57', '#ff9ff3', '#f8c291'],
        // 灰色系
        ['#57606f', '#a4b0be', '#2f3542', '#40407a', '#706fd3']
    ];
    
    return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 加载完成，开始初始化...');
    setTimeout(initDemo, 500); // 稍微延迟确保所有脚本加载完成
});

// 暴露一些函数到全局作用域供调试使用
window.TrianglifyDemo = {
    loadEffect,
    regeneratePattern,
    generateRandomEffect,
    generateFullyRandomEffect,
    effectConfigs,
    currentEffect: () => currentEffect
};
