/**
 * Anime.js 演示脚本
 * 提供六种不同的DOM动画背景效果
 */

// 全局变量
let currentAnimation = null;
let currentEffect = null;

// 效果配置定义
const effectConfigs = [
    {
        id: 'floating-shapes',
        name: '浮动图形',
        description: '多个几何图形在屏幕中随机浮动',
        init: createFloatingShapes
    },
    {
        id: 'text-wave',
        name: '文字波浪',
        description: '文字字母形成波浪起伏动画',
        init: createTextWave
    },
    {
        id: 'morphing-grid',
        name: '变形网格',
        description: '网格点阵的形变和色彩变化',
        init: createMorphingGrid
    },
    {
        id: 'elastic-circles',
        name: '弹性圆圈',
        description: '具有弹性效果的圆圈扩散动画',
        init: createElasticCircles
    },
    {
        id: 'path-drawing',
        name: '路径绘制',
        description: 'SVG路径的绘制动画效果',
        init: createPathDrawing
    },
    {
        id: 'staggered-grid',
        name: '交错网格',
        description: '网格元素的交错出现动画',
        init: createStaggeredGrid
    }
];

/**
 * 初始化 Anime.js 演示
 */
async function initAnimeDemo() {
    try {
        // 确保 anime 函数已加载
        if (typeof anime === 'undefined') {
            throw new Error('Anime.js 库未加载');
        }

        // 创建效果切换器
        window.effectSwitcher = new EffectSwitcher();
        
        // 初始化切换器
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadAnimeEffect(effect);
        });

        console.log('Anime.js 演示初始化完成');

    } catch (error) {
        console.error('初始化 Anime.js 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 加载指定的 Anime.js 效果
 * @param {Object} effect - 效果配置对象
 */
async function loadAnimeEffect(effect) {
    try {
        // 停止当前动画
        if (currentAnimation) {
            currentAnimation.pause();
            currentAnimation = null;
        }

        // 清空容器
        const container = document.getElementById('anime-container');
        if (!container) {
            throw new Error('找不到动画容器');
        }

        container.innerHTML = '';
        
        // 重置容器样式
        container.style.position = 'relative';
        container.style.overflow = 'hidden';

        // 初始化新效果
        currentAnimation = await effect.init(container);
        currentEffect = effect;

        console.log(`已加载效果: ${effect.name}`);

    } catch (error) {
        console.error('加载 Anime.js 效果失败:', error);
        throw error;
    }
}

/**
 * 效果1: 浮动图形
 */
function createFloatingShapes(container) {
    // 创建多个几何图形
    const shapes = [];
    const shapeTypes = ['circle', 'square', 'triangle'];
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 20 + Math.random() * 40;

        shape.style.position = 'absolute';
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        shape.style.backgroundColor = color;
        shape.style.opacity = '0.7';
        shape.style.left = Math.random() * (container.offsetWidth - size) + 'px';
        shape.style.top = Math.random() * (container.offsetHeight - size) + 'px';

        // 设置不同的形状
        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (shapeType === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.backgroundColor = 'transparent';
            shape.style.borderLeft = (size/2) + 'px solid transparent';
            shape.style.borderRight = (size/2) + 'px solid transparent';
            shape.style.borderBottom = size + 'px solid ' + color;
        }

        container.appendChild(shape);
        shapes.push(shape);
    }

    // 创建浮动动画
    const animation = anime({
        targets: shapes,
        translateX: function() {
            return anime.random(-200, 200);
        },
        translateY: function() {
            return anime.random(-200, 200);
        },
        scale: function() {
            return anime.random(0.5, 2);
        },
        rotate: function() {
            return anime.random(0, 360);
        },
        duration: function() {
            return anime.random(3000, 6000);
        },
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true,
        delay: function() {
            return anime.random(0, 2000);
        }
    });

    return animation;
}

/**
 * 效果2: 文字波浪
 */
function createTextWave(container) {
    const text = "ANIME.JS DEMO";
    const textContainer = document.createElement('div');
    textContainer.style.position = 'absolute';
    textContainer.style.top = '50%';
    textContainer.style.left = '50%';
    textContainer.style.transform = 'translate(-50%, -50%)';
    textContainer.style.fontSize = '3rem';
    textContainer.style.fontWeight = 'bold';
    textContainer.style.display = 'flex';
    textContainer.style.gap = '0.2rem';

    // 创建每个字母
    text.split('').forEach((char, index) => {
        const letter = document.createElement('span');
        letter.textContent = char === ' ' ? '\u00A0' : char;
        letter.style.display = 'inline-block';
        letter.style.color = '#6366f1';
        textContainer.appendChild(letter);
    });

    container.appendChild(textContainer);

    // 创建波浪动画
    const animation = anime({
        targets: textContainer.children,
        translateY: function(el, i) {
            return Math.sin(i * 0.5) * 20;
        },
        scale: function(el, i) {
            return 1 + Math.sin(i * 0.3) * 0.3;
        },
        color: function(el, i) {
            const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
            return colors[i % colors.length];
        },
        duration: 2000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
        delay: function(el, i) {
            return i * 100;
        }
    });

    return animation;
}

/**
 * 效果3: 变形网格
 */
function createMorphingGrid(container) {
    const gridSize = 10;
    const cellSize = Math.min(container.offsetWidth, container.offsetHeight) / gridSize;
    const grid = [];

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.style.position = 'absolute';
            cell.style.width = cellSize * 0.8 + 'px';
            cell.style.height = cellSize * 0.8 + 'px';
            cell.style.backgroundColor = '#6366f1';
            cell.style.left = col * cellSize + cellSize * 0.1 + 'px';
            cell.style.top = row * cellSize + cellSize * 0.1 + 'px';
            cell.style.borderRadius = '2px';
            cell.style.opacity = '0.6';

            container.appendChild(cell);
            grid.push(cell);
        }
    }

    // 创建变形动画
    const animation = anime({
        targets: grid,
        scale: function() {
            return anime.random(0.3, 1.5);
        },
        rotate: function() {
            return anime.random(-45, 45);
        },
        backgroundColor: function() {
            const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        duration: function() {
            return anime.random(2000, 4000);
        },
        easing: 'easeInOutElastic(1, .6)',
        direction: 'alternate',
        loop: true,
        delay: function(el, i) {
            return i * 50;
        }
    });

    return animation;
}

/**
 * 效果4: 弹性圆圈
 */
function createElasticCircles(container) {
    const circles = [];
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    for (let i = 0; i < 12; i++) {
        const circle = document.createElement('div');
        const size = 30 + Math.random() * 40;
        
        circle.style.position = 'absolute';
        circle.style.width = size + 'px';
        circle.style.height = size + 'px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = '#6366f1';
        circle.style.left = centerX - size/2 + 'px';
        circle.style.top = centerY - size/2 + 'px';
        circle.style.opacity = '0.4';
        circle.style.border = '2px solid #8b5cf6';

        container.appendChild(circle);
        circles.push(circle);
    }

    // 创建弹性扩散动画
    const animation = anime({
        targets: circles,
        scale: [0, 1],
        translateX: function() {
            return anime.random(-300, 300);
        },
        translateY: function() {
            return anime.random(-300, 300);
        },
        rotate: function() {
            return anime.random(0, 360);
        },
        backgroundColor: function() {
            const colors = ['#6366f1', '#8b5cf6', '#ec4899'];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        duration: function() {
            return anime.random(3000, 5000);
        },
        easing: 'easeOutElastic(1, .5)',
        direction: 'alternate',
        loop: true,
        delay: function(el, i) {
            return i * 300;
        }
    });

    return animation;
}

/**
 * 效果5: 路径绘制
 */
function createPathDrawing(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.setAttribute('viewBox', `0 0 ${container.offsetWidth} ${container.offsetHeight}`);

    // 创建多条路径
    const paths = [];
    const pathData = [
        `M 50 ${container.offsetHeight/2} Q ${container.offsetWidth/2} 50 ${container.offsetWidth-50} ${container.offsetHeight/2}`,
        `M ${container.offsetWidth/2} 50 Q 50 ${container.offsetHeight/2} ${container.offsetWidth/2} ${container.offsetHeight-50}`,
        `M 50 50 Q ${container.offsetWidth-50} 50 ${container.offsetWidth-50} ${container.offsetHeight-50} Q 50 ${container.offsetHeight-50} 50 50`
    ];

    pathData.forEach((d, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.style.fill = 'none';
        path.style.stroke = '#6366f1';
        path.style.strokeWidth = '3';
        path.style.opacity = '0.7';
        
        // 设置路径长度
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        svg.appendChild(path);
        paths.push(path);
    });

    container.appendChild(svg);

    // 创建路径绘制动画
    const animation = anime({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        stroke: function() {
            const colors = ['#6366f1', '#8b5cf6', '#ec4899'];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        duration: 3000,
        easing: 'easeInOutQuart',
        direction: 'alternate',
        loop: true,
        delay: function(el, i) {
            return i * 500;
        }
    });

    return animation;
}

/**
 * 效果6: 交错网格
 */
function createStaggeredGrid(container) {
    const gridSize = 15;
    const cellSize = Math.min(container.offsetWidth, container.offsetHeight) / gridSize;
    const grid = [];

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.style.position = 'absolute';
            cell.style.width = cellSize * 0.6 + 'px';
            cell.style.height = cellSize * 0.6 + 'px';
            cell.style.backgroundColor = '#6366f1';
            cell.style.left = col * cellSize + cellSize * 0.2 + 'px';
            cell.style.top = row * cellSize + cellSize * 0.2 + 'px';
            cell.style.borderRadius = '2px';
            cell.style.transform = 'scale(0)';

            container.appendChild(cell);
            grid.push({ element: cell, row, col });
        }
    }

    // 创建交错出现动画
    const animation = anime({
        targets: grid.map(item => item.element),
        scale: [0, 1],
        backgroundColor: function() {
            const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        duration: 1500,
        easing: 'easeOutExpo',
        delay: function(el, i) {
            const item = grid[i];
            return (item.row + item.col) * 50;
        },
        direction: 'alternate',
        loop: true
    });

    return animation;
}

/**
 * 显示初始化错误
 * @param {string} message - 错误信息
 */
function showInitError(message) {
    const container = document.getElementById('anime-container');
    if (container) {
        container.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: var(--text-secondary);
                z-index: 1000;
            ">
                <h3 style="color: var(--danger-color); margin-bottom: 1rem;">初始化失败</h3>
                <p style="margin-bottom: 1rem;">${message}</p>
                <button 
                    onclick="location.reload()" 
                    class="btn btn-primary"
                >
                    重新加载
                </button>
            </div>
        `;
    }
}

/**
 * 页面卸载时清理资源
 */
function cleanup() {
    if (currentAnimation) {
        currentAnimation.pause();
        currentAnimation = null;
    }
    
    if (window.effectSwitcher) {
        window.effectSwitcher.destroy();
        window.effectSwitcher = null;
    }
}

/**
 * 处理窗口大小变化
 */
function handleResize() {
    // 如果有当前效果，重新加载以适应新尺寸
    if (currentEffect) {
        setTimeout(() => {
            loadAnimeEffect(currentEffect);
        }, 100);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initAnimeDemo);

// 页面卸载时清理资源
window.addEventListener('beforeunload', cleanup);

// 页面可见性变化时处理（优化性能）
document.addEventListener('visibilitychange', () => {
    if (document.hidden && currentAnimation) {
        currentAnimation.pause();
    } else if (!document.hidden && currentAnimation) {
        currentAnimation.play();
    }
});

// 窗口大小变化时处理
window.addEventListener('resize', handleResize);

// 导出配置供调试使用
window.animeConfigs = effectConfigs;
