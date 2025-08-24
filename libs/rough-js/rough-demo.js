/**
 * Rough.js 演示脚本
 * 实现多种手绘风格背景效果
 */

// 效果配置定义
const effectConfigs = [
    {
        id: 'geometric-pattern',
        name: '几何图案',
        description: '手绘风格的几何图形背景',
        init: () => initGeometricPattern()
    },
    {
        id: 'line-art',
        name: '线条艺术',
        description: '随机线条组成的抽象艺术',
        init: () => initLineArt()
    },
    {
        id: 'grid-system',
        name: '网格系统',
        description: '不规则的手绘网格背景',
        init: () => initGridSystem()
    },
    {
        id: 'organic-shapes',
        name: '有机形状',
        description: '自然有机的曲线图形',
        init: () => initOrganicShapes()
    },
    {
        id: 'decorative-borders',
        name: '装饰边框',
        description: '精美的装饰性边框图案',
        init: () => initDecorativeBorders()
    },
    {
        id: 'abstract-collage',
        name: '抽象拼贴',
        description: '多种图形的抽象拼贴效果',
        init: () => initAbstractCollage()
    },
    {
        id: 'sketchy-mandala',
        name: '手绘曼陀罗',
        description: '传统曼陀罗花纹的手绘演绎',
        init: () => initSketchyMandala()
    },
    {
        id: 'constellation-map',
        name: '星座图谱',
        description: '手绘风格的星座连线图',
        init: () => initConstellationMap()
    },
    {
        id: 'vintage-wallpaper',
        name: '复古壁纸',
        description: '复古花纹壁纸的手绘效果',
        init: () => initVintageWallpaper()
    },
    {
        id: 'circuit-board',
        name: '电路板',
        description: '手绘风格的电路板图案',
        init: () => initCircuitBoard()
    },
    {
        id: 'forest-canopy',
        name: '森林天窗',
        description: '模拟森林树冠的手绘轮廓',
        init: () => initForestCanopy()
    },
    {
        id: 'musical-notes',
        name: '音乐符号',
        description: '漂浮的手绘音乐符号和五线谱',
        init: () => initMusicalNotes()
    },
    {
        id: 'van-gogh-starry-night',
        name: '梵高星空',
        description: '模拟梵高《星空》的旋涡笔触和动态星空',
        init: () => initVanGoghStarryNight()
    },
    {
        id: 'ocean-sunrise',
        name: '海上日出',
        description: '壮观的海上日出景象，波光粷粷的海面和金色太阳',
        init: () => initOceanSunrise()
    }
];

// 全局变量
let currentEffect = null;
let canvas = null;
let ctx = null;
let rc = null;
let animationId = null;
let animationTime = 0;
let isPlaying = true;
let roughness = 1;
let density = 30;

/**
 * 初始化 Rough.js 演示
 */
async function initRoughDemo() {
    try {
        // 确保 rough 函数已加载
        if (typeof rough === 'undefined') {
            throw new Error('Rough.js 库未加载');
        }

        // 设置Canvas
        setupCanvas();

        // 创建效果切换器
        window.effectSwitcher = new EffectSwitcher();
        
        // 初始化切换器
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadRoughEffect(effect);
        });

        // 设置参数控制
        setupParameterControls();

        console.log('Rough.js 演示初始化完成');

    } catch (error) {
        console.error('初始化 Rough.js 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 设置Canvas
 */
function setupCanvas() {
    canvas = document.getElementById('rough-canvas');
    if (!canvas) {
        throw new Error('找不到Canvas元素');
    }
    
    ctx = canvas.getContext('2d');
    rc = rough.canvas(canvas);
    
    resizeCanvas();
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        setTimeout(resizeCanvas, 100);
    });
}

/**
 * 调整Canvas大小
 */
function resizeCanvas() {
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 重新渲染当前效果
    if (currentEffect) {
        renderCurrentEffect();
    }
}

/**
 * 设置参数控制
 */
function setupParameterControls() {
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAnimation();
        } else if (isPlaying) {
            resumeAnimation();
        }
    });
}

/**
 * 加载指定的 Rough.js 效果
 * @param {Object} effect - 效果配置对象
 */
async function loadRoughEffect(effect) {
    try {
        currentEffect = effect;
        
        // 停止当前动画
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        // 重置动画时间
        animationTime = 0;
        
        // 初始化新效果
        await effect.init();
        
        // 开始动画循环
        startAnimation();
        
        console.log(`已加载效果: ${effect.name}`);

    } catch (error) {
        console.error('加载 Rough.js 效果失败:', error);
        throw error;
    }
}

/**
 * 开始动画循环
 */
function startAnimation() {
    if (!isPlaying) return;
    
    animationTime += 0.016; // ~60fps
    renderCurrentEffect();
    animationId = requestAnimationFrame(startAnimation);
}

/**
 * 暂停动画
 */
function pauseAnimation() {
    isPlaying = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

/**
 * 恢复动画
 */
function resumeAnimation() {
    isPlaying = true;
    startAnimation();
}

/**
 * 渲染当前效果
 */
function renderCurrentEffect() {
    if (!ctx || !rc || !currentEffect) return;
    
    // 清除画布
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 根据当前效果渲染
    switch(currentEffect.id) {
        case 'geometric-pattern':
            renderGeometricPattern();
            break;
        case 'line-art':
            renderLineArt();
            break;
        case 'grid-system':
            renderGridSystem();
            break;
        case 'organic-shapes':
            renderOrganicShapes();
            break;
        case 'decorative-borders':
            renderDecorativeBorders();
            break;
        case 'abstract-collage':
            renderAbstractCollage();
            break;
        case 'sketchy-mandala':
            renderSketchyMandala();
            break;
        case 'constellation-map':
            renderConstellationMap();
            break;
        case 'vintage-wallpaper':
            renderVintageWallpaper();
            break;
        case 'circuit-board':
            renderCircuitBoard();
            break;
        case 'forest-canopy':
            renderForestCanopy();
            break;
        case 'musical-notes':
            renderMusicalNotes();
            break;
        case 'van-gogh-starry-night':
            renderVanGoghStarryNight();
            break;
        case 'ocean-sunrise':
            renderOceanSunrise();
            break;
    }
}

// 效果初始化函数
function initGeometricPattern() { return Promise.resolve(); }
function initLineArt() { return Promise.resolve(); }
function initGridSystem() { return Promise.resolve(); }
function initOrganicShapes() { return Promise.resolve(); }
function initDecorativeBorders() { return Promise.resolve(); }
function initAbstractCollage() { return Promise.resolve(); }

// 新效果初始化函数
function initSketchyMandala() { return Promise.resolve(); }
function initConstellationMap() { return Promise.resolve(); }
function initVintageWallpaper() { return Promise.resolve(); }
function initCircuitBoard() { return Promise.resolve(); }
function initForestCanopy() { return Promise.resolve(); }
function initMusicalNotes() { return Promise.resolve(); }
function initVanGoghStarryNight() { return Promise.resolve(); }
function initOceanSunrise() { return Promise.resolve(); }

// 获取随机颜色
function getRandomColor() {
    const colors = [
        '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
        '#10b981', '#3b82f6', '#ef4444', '#8b5a2b'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 效果渲染函数

/**
 * 渲染几何图案
 */
function renderGeometricPattern() {
    const { width, height } = canvas;
    const spacing = 120;
    const time = animationTime * 0.5;
    
    for (let x = spacing/2; x < width; x += spacing) {
        for (let y = spacing/2; y < height; y += spacing) {
            const offset = Math.sin(time + x * 0.01 + y * 0.01) * 20;
            const size = 40 + Math.sin(time * 2 + x * 0.02 + y * 0.02) * 15;
            
            const options = {
                roughness: roughness,
                strokeWidth: 2,
                stroke: getRandomColor(),
                fill: getRandomColor(),
                fillStyle: 'zigzag'
            };
            
            if (Math.random() > 0.5) {
                // 绘制矩形
                rc.rectangle(
                    x - size/2 + offset,
                    y - size/2 + offset,
                    size,
                    size,
                    options
                );
            } else {
                // 绘制圆形
                rc.circle(
                    x + offset,
                    y + offset,
                    size,
                    options
                );
            }
        }
    }
}

/**
 * 渲染线条艺术
 */
function renderLineArt() {
    const { width, height } = canvas;
    const lineCount = density;
    const time = animationTime * 0.3;
    
    for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2 + time;
        const length = 100 + Math.sin(time * 2 + i * 0.1) * 50;
        
        const startX = width/2 + Math.cos(angle) * 200;
        const startY = height/2 + Math.sin(angle) * 200;
        const endX = startX + Math.cos(angle + Math.PI/4) * length;
        const endY = startY + Math.sin(angle + Math.PI/4) * length;
        
        rc.line(startX, startY, endX, endY, {
            roughness: roughness,
            strokeWidth: 1 + Math.sin(time + i * 0.2) * 2,
            stroke: getRandomColor()
        });
    }
    
    // 添加一些随机线条
    for (let i = 0; i < 20; i++) {
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = x1 + (Math.random() - 0.5) * 300;
        const y2 = y1 + (Math.random() - 0.5) * 300;
        
        rc.line(x1, y1, x2, y2, {
            roughness: roughness * 1.5,
            strokeWidth: Math.random() * 3 + 1,
            stroke: getRandomColor()
        });
    }
}

/**
 * 渲染网格系统
 */
function renderGridSystem() {
    const { width, height } = canvas;
    const gridSize = Math.max(30, density);
    const time = animationTime * 0.2;
    
    // 垂直线
    for (let x = 0; x <= width; x += gridSize) {
        const offset = Math.sin(time + x * 0.01) * 20;
        rc.line(
            x + offset, 0,
            x - offset, height,
            {
                roughness: roughness,
                strokeWidth: 1,
                stroke: '#6366f1'
            }
        );
    }
    
    // 水平线
    for (let y = 0; y <= height; y += gridSize) {
        const offset = Math.sin(time + y * 0.01) * 20;
        rc.line(
            0, y + offset,
            width, y - offset,
            {
                roughness: roughness,
                strokeWidth: 1,
                stroke: '#8b5cf6'
            }
        );
    }
    
    // 交点装饰
    for (let x = 0; x <= width; x += gridSize * 2) {
        for (let y = 0; y <= height; y += gridSize * 2) {
            const size = 8 + Math.sin(time * 3 + x * 0.02 + y * 0.02) * 4;
            rc.circle(x, y, size, {
                roughness: roughness,
                strokeWidth: 2,
                stroke: getRandomColor(),
                fill: getRandomColor(),
                fillStyle: 'dots'
            });
        }
    }
}

/**
 * 渲染有机形状
 */
function renderOrganicShapes() {
    const { width, height } = canvas;
    const shapeCount = Math.floor(density / 5);
    const time = animationTime * 0.4;
    
    for (let i = 0; i < shapeCount; i++) {
        const centerX = (i % 4) * (width / 4) + width / 8;
        const centerY = Math.floor(i / 4) * (height / 3) + height / 6;
        const radius = 50 + Math.sin(time + i) * 30;
        const points = 8 + Math.floor(Math.sin(time * 2 + i) * 3);
        
        // 创建有机形状的路径
        const path = [];
        for (let j = 0; j < points; j++) {
            const angle = (j / points) * Math.PI * 2;
            const r = radius + Math.sin(time * 3 + angle * 4) * 20;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            path.push([x, y]);
        }
        
        // 绘制多边形
        rc.polygon(path, {
            roughness: roughness * 1.2,
            strokeWidth: 2,
            stroke: getRandomColor(),
            fill: getRandomColor(),
            fillStyle: 'cross-hatch'
        });
    }
}

/**
 * 渲染装饰边框
 */
function renderDecorativeBorders() {
    const { width, height } = canvas;
    const borderWidth = 60;
    const time = animationTime * 0.3;
    
    // 顶部边框
    for (let x = 0; x < width; x += 40) {
        const y = borderWidth/2 + Math.sin(time + x * 0.02) * 15;
        const size = 20 + Math.sin(time * 2 + x * 0.01) * 8;
        
        rc.rectangle(x, y - size/2, size, size, {
            roughness: roughness,
            strokeWidth: 2,
            stroke: getRandomColor(),
            fill: getRandomColor(),
            fillStyle: 'zigzag'
        });
    }
    
    // 底部边框
    for (let x = 0; x < width; x += 50) {
        const y = height - borderWidth/2 + Math.sin(time + x * 0.015) * 10;
        const size = 15 + Math.sin(time * 3 + x * 0.02) * 6;
        
        rc.circle(x, y, size, {
            roughness: roughness,
            strokeWidth: 1,
            stroke: getRandomColor(),
            fill: getRandomColor(),
            fillStyle: 'dots'
        });
    }
    
    // 左侧边框
    for (let y = 0; y < height; y += 45) {
        const x = borderWidth/2 + Math.sin(time + y * 0.018) * 12;
        const points = [
            [x-15, y-15], [x+15, y-15], [x+10, y], [x+15, y+15], 
            [x-15, y+15], [x-10, y]
        ];
        
        rc.polygon(points, {
            roughness: roughness,
            strokeWidth: 1,
            stroke: getRandomColor(),
            fill: getRandomColor(),
            fillStyle: 'cross-hatch'
        });
    }
    
    // 右侧边框
    for (let y = 0; y < height; y += 35) {
        const x = width - borderWidth/2 + Math.sin(time + y * 0.025) * 8;
        
        rc.line(
            x - 20, y - 20,
            x + 20, y + 20,
            {
                roughness: roughness * 1.5,
                strokeWidth: 3,
                stroke: getRandomColor()
            }
        );
        
        rc.line(
            x + 20, y - 20,
            x - 20, y + 20,
            {
                roughness: roughness * 1.5,
                strokeWidth: 3,
                stroke: getRandomColor()
            }
        );
    }
}

/**
 * 渲染抽象拼贴
 */
function renderAbstractCollage() {
    const { width, height } = canvas;
    const elementCount = density;
    const time = animationTime * 0.5;
    
    for (let i = 0; i < elementCount; i++) {
        const x = (Math.sin(time + i * 0.5) + 1) * width / 2;
        const y = (Math.cos(time * 1.2 + i * 0.3) + 1) * height / 2;
        const size = 20 + Math.sin(time * 2 + i * 0.1) * 30;
        const type = Math.floor(Math.sin(time + i) * 3 + 3);
        
        const options = {
            roughness: roughness,
            strokeWidth: 1 + Math.random() * 2,
            stroke: getRandomColor(),
            fill: Math.random() > 0.7 ? getRandomColor() : 'none',
            fillStyle: ['zigzag', 'cross-hatch', 'dots'][Math.floor(Math.random() * 3)]
        };
        
        switch(type) {
            case 0: // 矩形
                rc.rectangle(x - size/2, y - size/2, size, size, options);
                break;
            case 1: // 圆形
                rc.circle(x, y, size, options);
                break;
            case 2: // 三角形
                const points = [
                    [x, y - size/2],
                    [x - size/2, y + size/2],
                    [x + size/2, y + size/2]
                ];
                rc.polygon(points, options);
                break;
            case 3: // 线条
                rc.line(
                    x - size/2, y - size/2,
                    x + size/2, y + size/2,
                    options
                );
                break;
            case 4: // 椭圆
                rc.ellipse(x, y, size, size * 0.6, options);
                break;
            case 5: // 多边形
                const sides = 5 + Math.floor(Math.random() * 3);
                const polyPoints = [];
                for (let j = 0; j < sides; j++) {
                    const angle = (j / sides) * Math.PI * 2;
                    polyPoints.push([
                        x + Math.cos(angle) * size/2,
                        y + Math.sin(angle) * size/2
                    ]);
                }
                rc.polygon(polyPoints, options);
                break;
        }
    }
}

/**
 * 显示初始化错误
 * @param {string} message - 错误信息
 */
function showInitError(message) {
    const container = document.querySelector('.canvas-container');
    if (container) {
        container.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: var(--text-primary);
                background: var(--card-background);
                padding: 2rem;
                border-radius: var(--border-radius-lg);
                border: 1px solid var(--border-color);
                max-width: 400px;
            ">
                <h3 style="color: #ef4444; margin-bottom: 1rem;">加载失败</h3>
                <p style="margin-bottom: 1rem;">${message}</p>
                <button onclick="location.reload()" style="
                    padding: 0.5rem 1rem;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: var(--border-radius);
                    cursor: pointer;
                ">重新加载</button>
            </div>
        `;
    }
}

/**
 * 渲染手绘曼陀罗
 */
function renderSketchyMandala() {
    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const time = animationTime * 0.3;
    const layers = 8;
    
    for (let layer = 0; layer < layers; layer++) {
        const radius = 50 + layer * 40;
        const petals = 8 + layer * 2;
        const layerTime = time + layer * 0.5;
        
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * Math.PI * 2 + layerTime * 0.5;
            const petalRadius = 20 + Math.sin(layerTime * 2 + i * 0.3) * 8;
            
            // 花瓣中心点
            const petalX = centerX + Math.cos(angle) * radius;
            const petalY = centerY + Math.sin(angle) * radius;
            
            // 绘制花瓣（椭圆形）
            rc.ellipse(petalX, petalY, petalRadius, petalRadius * 1.5, {
                roughness: roughness * 1.2,
                strokeWidth: 1,
                stroke: getRandomColor(),
                fill: layer % 2 === 0 ? getRandomColor() : 'none',
                fillStyle: 'cross-hatch'
            });
            
            // 花瓣装饰线
            const innerX = centerX + Math.cos(angle) * (radius - petalRadius/2);
            const innerY = centerY + Math.sin(angle) * (radius - petalRadius/2);
            const outerX = centerX + Math.cos(angle) * (radius + petalRadius/2);
            const outerY = centerY + Math.sin(angle) * (radius + petalRadius/2);
            
            rc.line(innerX, innerY, outerX, outerY, {
                roughness: roughness,
                strokeWidth: 1,
                stroke: '#8b5cf6'
            });
        }
    }
    
    // 中心圆形装饰
    for (let i = 0; i < 3; i++) {
        const size = 30 - i * 8 + Math.sin(time * 3) * 5;
        rc.circle(centerX, centerY, size, {
            roughness: roughness,
            strokeWidth: 2,
            stroke: getRandomColor(),
            fill: i === 1 ? getRandomColor() : 'none',
            fillStyle: 'dots'
        });
    }
}

/**
 * 渲染星座图谱
 */
function renderConstellationMap() {
    const { width, height } = canvas;
    const time = animationTime * 0.2;
    const starCount = Math.floor(density * 1.5);
    const constellations = [];
    
    // 生成星星位置
    const stars = [];
    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const brightness = 0.3 + Math.sin(time + i * 0.1) * 0.7;
        const size = 2 + brightness * 4;
        
        stars.push({ x, y, brightness, size, id: i });
        
        // 绘制星星
        rc.circle(x, y, size, {
            roughness: roughness * 0.8,
            strokeWidth: 1,
            stroke: '#f59e0b',
            fill: brightness > 0.7 ? '#fbbf24' : 'none'
        });
        
        // 星光效果
        if (brightness > 0.6) {
            const rayLength = size * 2;
            // 十字星光
            rc.line(x - rayLength, y, x + rayLength, y, {
                roughness: roughness * 2,
                strokeWidth: 0.5,
                stroke: '#fbbf24'
            });
            rc.line(x, y - rayLength, x, y + rayLength, {
                roughness: roughness * 2,
                strokeWidth: 0.5,
                stroke: '#fbbf24'
            });
        }
    }
    
    // 绘制星座连线
    for (let i = 0; i < stars.length; i++) {
        const star1 = stars[i];
        
        // 寻找附近的星星连线
        for (let j = i + 1; j < stars.length; j++) {
            const star2 = stars[j];
            const distance = Math.sqrt(
                Math.pow(star1.x - star2.x, 2) + 
                Math.pow(star1.y - star2.y, 2)
            );
            
            // 只连接相对较近的星星，且随机决定是否连接
            if (distance < 150 && Math.random() > 0.85) {
                const opacity = 1 - (distance / 150);
                rc.line(star1.x, star1.y, star2.x, star2.y, {
                    roughness: roughness * 1.5,
                    strokeWidth: opacity * 2,
                    stroke: '#6366f1'
                });
            }
        }
    }
    
    // 添加一些星云效果（大的模糊圆形）
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 100 + Math.sin(time + i * 2) * 30;
        
        rc.circle(x, y, size, {
            roughness: roughness * 2,
            strokeWidth: 0.5,
            stroke: '#8b5cf6',
            fill: '#8b5cf6',
            fillStyle: 'dots'
        });
    }
}

/**
 * 渲染复古壁纸
 */
function renderVintageWallpaper() {
    const { width, height } = canvas;
    const time = animationTime * 0.4;
    const patternSize = 80;
    
    for (let x = 0; x < width + patternSize; x += patternSize) {
        for (let y = 0; y < height + patternSize; y += patternSize) {
            const centerX = x + patternSize / 2;
            const centerY = y + patternSize / 2;
            const rotation = time + x * 0.01 + y * 0.01;
            
            // 主要花纹（玫瑰形状）
            const petalCount = 6;
            const baseRadius = 25;
            
            for (let i = 0; i < petalCount; i++) {
                const angle = (i / petalCount) * Math.PI * 2 + rotation;
                const petalRadius = baseRadius + Math.sin(time * 2 + i) * 8;
                
                const petalX = centerX + Math.cos(angle) * 15;
                const petalY = centerY + Math.sin(angle) * 15;
                
                // 花瓣
                rc.ellipse(petalX, petalY, petalRadius, petalRadius * 0.6, {
                    roughness: roughness * 1.3,
                    strokeWidth: 1,
                    stroke: '#ec4899',
                    fill: '#fce7f3',
                    fillStyle: 'zigzag'
                });
            }
            
            // 中心装饰
            rc.circle(centerX, centerY, 12, {
                roughness: roughness,
                strokeWidth: 2,
                stroke: '#be185d',
                fill: '#f9a8d4',
                fillStyle: 'dots'
            });
            
            // 叶子装饰
            for (let i = 0; i < 4; i++) {
                const leafAngle = (i / 4) * Math.PI * 2 + rotation * 0.5;
                const leafX = centerX + Math.cos(leafAngle) * 35;
                const leafY = centerY + Math.sin(leafAngle) * 35;
                
                const leafPoints = [
                    [leafX, leafY - 8],
                    [leafX + 6, leafY],
                    [leafX, leafY + 8],
                    [leafX - 6, leafY]
                ];
                
                rc.polygon(leafPoints, {
                    roughness: roughness,
                    strokeWidth: 1,
                    stroke: '#16a34a',
                    fill: '#bbf7d0',
                    fillStyle: 'cross-hatch'
                });
            }
            
            // 角落小装饰
            const cornerSize = 5;
            const corners = [
                [x + 5, y + 5],
                [x + patternSize - 5, y + 5],
                [x + 5, y + patternSize - 5],
                [x + patternSize - 5, y + patternSize - 5]
            ];
            
            corners.forEach(([cx, cy], index) => {
                const decorSize = cornerSize + Math.sin(time * 3 + index) * 2;
                rc.circle(cx, cy, decorSize, {
                    roughness: roughness,
                    strokeWidth: 1,
                    stroke: '#f59e0b',
                    fill: '#fed7aa',
                    fillStyle: 'dots'
                });
            });
        }
    }
}

/**
 * 渲染电路板
 */
function renderCircuitBoard() {
    const { width, height } = canvas;
    const time = animationTime * 0.3;
    const gridSize = 40;
    
    // 绘制主电路线
    for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
            // 水平线段
            if (Math.random() > 0.3) {
                const lineLength = gridSize * (1 + Math.floor(Math.random() * 3));
                const pulseOffset = Math.sin(time * 2 + x * 0.01) * 2;
                
                rc.line(
                    x, y + pulseOffset,
                    Math.min(x + lineLength, width), y + pulseOffset,
                    {
                        roughness: roughness * 0.8,
                        strokeWidth: 2 + Math.sin(time + x * 0.02) * 1,
                        stroke: '#10b981'
                    }
                );
            }
            
            // 垂直线段
            if (Math.random() > 0.4) {
                const lineLength = gridSize * (1 + Math.floor(Math.random() * 2));
                const pulseOffset = Math.sin(time * 1.5 + y * 0.01) * 2;
                
                rc.line(
                    x + pulseOffset, y,
                    x + pulseOffset, Math.min(y + lineLength, height),
                    {
                        roughness: roughness * 0.8,
                        strokeWidth: 2,
                        stroke: '#06b6d4'
                    }
                );
            }
        }
    }
    
    // 绘制电路元件（芯片、电阻等）
    for (let i = 0; i < density; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const componentType = Math.floor(Math.random() * 4);
        const pulse = 1 + Math.sin(time * 3 + i * 0.5) * 0.3;
        
        switch (componentType) {
            case 0: // 方形芯片
                const chipSize = 20 * pulse;
                rc.rectangle(x - chipSize/2, y - chipSize/2, chipSize, chipSize, {
                    roughness: roughness,
                    strokeWidth: 2,
                    stroke: '#f59e0b',
                    fill: '#451a03',
                    fillStyle: 'zigzag'
                });
                
                // 芯片引脚
                for (let pin = 0; pin < 4; pin++) {
                    const pinAngle = (pin / 4) * Math.PI * 2;
                    const pinX = x + Math.cos(pinAngle) * chipSize * 0.6;
                    const pinY = y + Math.sin(pinAngle) * chipSize * 0.6;
                    
                    rc.rectangle(pinX - 2, pinY - 1, 4, 2, {
                        roughness: roughness,
                        strokeWidth: 1,
                        stroke: '#d4d4d8',
                        fill: '#71717a'
                    });
                }
                break;
                
            case 1: // 圆形元件（电容）
                const capSize = 15 * pulse;
                rc.circle(x, y, capSize, {
                    roughness: roughness,
                    strokeWidth: 2,
                    stroke: '#8b5cf6',
                    fill: '#1e1b4b',
                    fillStyle: 'dots'
                });
                
                // 极性标记
                rc.line(x, y - capSize/3, x, y + capSize/3, {
                    roughness: roughness,
                    strokeWidth: 2,
                    stroke: '#fbbf24'
                });
                break;
                
            case 2: // 电阻
                const resistorWidth = 25 * pulse;
                const resistorHeight = 8;
                
                rc.rectangle(
                    x - resistorWidth/2, y - resistorHeight/2,
                    resistorWidth, resistorHeight,
                    {
                        roughness: roughness,
                        strokeWidth: 1,
                        stroke: '#dc2626',
                        fill: '#7f1d1d',
                        fillStyle: 'cross-hatch'
                    }
                );
                
                // 色环标记
                for (let ring = 0; ring < 3; ring++) {
                    const ringX = x - resistorWidth/3 + ring * resistorWidth/3;
                    rc.line(ringX, y - resistorHeight/2, ringX, y + resistorHeight/2, {
                        roughness: roughness,
                        strokeWidth: 2,
                        stroke: getRandomColor()
                    });
                }
                break;
                
            case 3: // 连接点
                const jointSize = 8 * pulse;
                rc.circle(x, y, jointSize, {
                    roughness: roughness,
                    strokeWidth: 2,
                    stroke: '#64748b',
                    fill: '#334155'
                });
                break;
        }
    }
    
    // 添加电流流动效果（小点沿线移动）
    for (let i = 0; i < 10; i++) {
        const flowX = (time * 50 + i * 200) % width;
        const flowY = 100 + Math.sin(flowX * 0.02) * 50;
        
        rc.circle(flowX, flowY, 3, {
            roughness: roughness,
            strokeWidth: 1,
            stroke: '#fbbf24',
            fill: '#fed7aa'
        });
    }
}

/**
 * 渲染森林天窗
 */
function renderForestCanopy() {
    const { width, height } = canvas;
    const time = animationTime * 0.2;
    const treeCount = Math.floor(density * 0.8);
    
    // 绘制树干和枝干
    for (let i = 0; i < treeCount; i++) {
        const baseX = (i / treeCount) * width;
        const baseY = height;
        const treeHeight = 200 + Math.sin(time + i * 0.5) * 50;
        const sway = Math.sin(time * 0.5 + i) * 20;
        
        // 主树干
        const trunkTop = height - treeHeight;
        rc.line(
            baseX, baseY,
            baseX + sway, trunkTop,
            {
                roughness: roughness * 1.5,
                strokeWidth: 8 + Math.sin(time + i) * 3,
                stroke: '#92400e'
            }
        );
        
        // 绘制树枝
        const branchCount = 5 + Math.floor(Math.random() * 3);
        for (let b = 0; b < branchCount; b++) {
            const branchY = trunkTop + (b / branchCount) * treeHeight * 0.7;
            const branchLength = 50 + Math.random() * 80;
            const branchAngle = (Math.random() - 0.5) * Math.PI * 0.8;
            
            const branchEndX = baseX + sway + Math.cos(branchAngle) * branchLength;
            const branchEndY = branchY + Math.sin(branchAngle) * branchLength;
            
            rc.line(
                baseX + sway, branchY,
                branchEndX, branchEndY,
                {
                    roughness: roughness * 1.3,
                    strokeWidth: 4 - b * 0.5,
                    stroke: '#a3a3a3'
                }
            );
            
            // 树叶簇
            const leafClusterSize = 30 + Math.sin(time * 2 + b) * 10;
            const leafColors = ['#16a34a', '#15803d', '#166534'];
            
            rc.circle(
                branchEndX + Math.sin(time + b) * 5,
                branchEndY + Math.cos(time + b) * 5,
                leafClusterSize,
                {
                    roughness: roughness * 2,
                    strokeWidth: 1,
                    stroke: leafColors[b % leafColors.length],
                    fill: leafColors[(b + 1) % leafColors.length],
                    fillStyle: 'cross-hatch'
                }
            );
            
            // 小树枝
            if (Math.random() > 0.6) {
                const smallBranchLength = branchLength * 0.4;
                const smallBranchAngle = branchAngle + (Math.random() - 0.5) * 0.5;
                
                const smallBranchEndX = branchEndX + Math.cos(smallBranchAngle) * smallBranchLength;
                const smallBranchEndY = branchEndY + Math.sin(smallBranchAngle) * smallBranchLength;
                
                rc.line(
                    branchEndX, branchEndY,
                    smallBranchEndX, smallBranchEndY,
                    {
                        roughness: roughness * 1.2,
                        strokeWidth: 2,
                        stroke: '#737373'
                    }
                );
                
                // 小叶簇
                const smallLeafSize = leafClusterSize * 0.6;
                rc.circle(
                    smallBranchEndX, smallBranchEndY,
                    smallLeafSize,
                    {
                        roughness: roughness * 1.8,
                        strokeWidth: 1,
                        stroke: '#22c55e',
                        fill: '#dcfce7',
                        fillStyle: 'dots'
                    }
                );
            }
        }
    }
    
    // 天空中的云朵和鸟儿
    for (let i = 0; i < 3; i++) {
        const cloudX = (time * 10 + i * 300) % (width + 200) - 100;
        const cloudY = 50 + i * 30;
        const cloudSize = 40 + Math.sin(time + i) * 15;
        
        // 云朵
        rc.ellipse(cloudX, cloudY, cloudSize * 2, cloudSize, {
            roughness: roughness * 2,
            strokeWidth: 1,
            stroke: '#e5e7eb',
            fill: '#f3f4f6',
            fillStyle: 'zigzag'
        });
    }
    
    // 飞鸟
    for (let i = 0; i < 5; i++) {
        const birdX = (time * 30 + i * 150) % (width + 100) - 50;
        const birdY = 80 + Math.sin(time * 2 + i) * 20;
        
        // 简化的鸟形（V形）
        rc.line(
            birdX - 8, birdY,
            birdX, birdY - 5,
            {
                roughness: roughness,
                strokeWidth: 2,
                stroke: '#374151'
            }
        );
        rc.line(
            birdX, birdY - 5,
            birdX + 8, birdY,
            {
                roughness: roughness,
                strokeWidth: 2,
                stroke: '#374151'
            }
        );
    }
    
    // 阳光透过树叶的光斑效果
    for (let i = 0; i < 8; i++) {
        const lightX = Math.random() * width;
        const lightY = Math.random() * height * 0.6;
        const lightSize = 20 + Math.sin(time * 3 + i) * 10;
        
        rc.circle(lightX, lightY, lightSize, {
            roughness: roughness * 3,
            strokeWidth: 0.5,
            stroke: '#fbbf24',
            fill: '#fef3c7',
            fillStyle: 'dots'
        });
    }
}

/**
 * 渲染音乐符号
 */
function renderMusicalNotes() {
    const { width, height } = canvas;
    const time = animationTime * 0.4;
    
    // 绘制五线谱
    const staffCount = 3;
    const staffSpacing = height / (staffCount + 1);
    
    for (let s = 0; s < staffCount; s++) {
        const staffY = staffSpacing * (s + 1);
        
        // 五条线
        for (let line = 0; line < 5; line++) {
            const lineY = staffY - 40 + line * 20;
            const wave = Math.sin(time + s + line * 0.5) * 5;
            
            rc.line(
                0, lineY + wave,
                width, lineY - wave,
                {
                    roughness: roughness,
                    strokeWidth: 1,
                    stroke: '#6b7280'
                }
            );
        }
        
        // 高音谱号
        const clefX = 50;
        const clefY = staffY;
        
        // 简化的高音谱号形状
        const clefPath = [
            [clefX, clefY - 30],
            [clefX + 15, clefY - 20],
            [clefX + 10, clefY],
            [clefX + 20, clefY + 20],
            [clefX, clefY + 30],
            [clefX - 10, clefY + 10],
            [clefX - 5, clefY - 10]
        ];
        
        rc.polygon(clefPath, {
            roughness: roughness * 1.2,
            strokeWidth: 3,
            stroke: '#1f2937',
            fill: '#374151',
            fillStyle: 'cross-hatch'
        });
    }
    
    // 绘制音符
    const noteCount = density;
    for (let i = 0; i < noteCount; i++) {
        const noteX = 100 + (i % 8) * 120 + Math.sin(time + i * 0.3) * 20;
        const staffIndex = Math.floor(i / 8) % staffCount;
        const staffY = staffSpacing * (staffIndex + 1);
        const noteY = staffY - 40 + (i % 9) * 10 + Math.sin(time * 2 + i * 0.2) * 8;
        
        const noteType = Math.floor(Math.sin(time + i) * 2 + 2); // 0-3
        
        switch (noteType) {
            case 0: // 四分音符
                // 符头
                rc.ellipse(noteX, noteY, 12, 8, {
                    roughness: roughness,
                    strokeWidth: 2,
                    stroke: '#111827',
                    fill: '#111827'
                });
                
                // 符干
                rc.line(
                    noteX + 6, noteY,
                    noteX + 6, noteY - 40,
                    {
                        roughness: roughness,
                        strokeWidth: 3,
                        stroke: '#111827'
                    }
                );
                break;
                
            case 1: // 八分音符
                // 符头
                rc.ellipse(noteX, noteY, 12, 8, {
                    roughness: roughness,
                    strokeWidth: 2,
                    stroke: '#111827',
                    fill: '#111827'
                });
                
                // 符干
                rc.line(
                    noteX + 6, noteY,
                    noteX + 6, noteY - 40,
                    {
                        roughness: roughness,
                        strokeWidth: 3,
                        stroke: '#111827'
                    }
                );
                
                // 符尾
                const flagPath = [
                    [noteX + 6, noteY - 40],
                    [noteX + 20, noteY - 30],
                    [noteX + 15, noteY - 20],
                    [noteX + 6, noteY - 25]
                ];
                rc.polygon(flagPath, {
                    roughness: roughness * 1.3,
                    strokeWidth: 1,
                    stroke: '#111827',
                    fill: '#111827'
                });
                break;
                
            case 2: // 二分音符
                rc.ellipse(noteX, noteY, 12, 8, {
                    roughness: roughness,
                    strokeWidth: 3,
                    stroke: '#111827',
                    fill: 'none'
                });
                
                rc.line(
                    noteX + 6, noteY,
                    noteX + 6, noteY - 35,
                    {
                        roughness: roughness,
                        strokeWidth: 3,
                        stroke: '#111827'
                    }
                );
                break;
                
            case 3: // 全音符
                rc.ellipse(noteX, noteY, 15, 10, {
                    roughness: roughness,
                    strokeWidth: 3,
                    stroke: '#111827',
                    fill: 'none'
                });
                break;
        }
    }
    
    // 飘浮的音符装饰
    const floatingNotes = 15;
    for (let i = 0; i < floatingNotes; i++) {
        const x = (Math.sin(time * 0.5 + i * 0.5) + 1) * width / 2;
        const y = (Math.cos(time * 0.7 + i * 0.3) + 1) * height / 2;
        const size = 8 + Math.sin(time * 3 + i) * 4;
        const rotation = time + i * 0.5;
        
        // 简单的音符符号
        rc.circle(x, y, size, {
            roughness: roughness * 1.2,
            strokeWidth: 2,
            stroke: getRandomColor(),
            fill: Math.random() > 0.5 ? getRandomColor() : 'none'
        });
        
        // 小尾巴
        const tailX = x + Math.cos(rotation) * size;
        const tailY = y + Math.sin(rotation) * size;
        rc.line(x, y, tailX, tailY, {
            roughness: roughness,
            strokeWidth: 2,
            stroke: getRandomColor()
        });
    }
    
    // 音波效果
    for (let wave = 0; wave < 5; wave++) {
        const waveY = height / 2 + Math.sin(time + wave * 0.5) * 100;
        const amplitude = 30 + wave * 10;
        
        const wavePoints = [];
        for (let x = 0; x <= width; x += 20) {
            const y = waveY + Math.sin(time * 2 + x * 0.02 + wave) * amplitude;
            wavePoints.push([x, y]);
        }
        
        // 连接波浪点
        for (let i = 0; i < wavePoints.length - 1; i++) {
            rc.line(
                wavePoints[i][0], wavePoints[i][1],
                wavePoints[i + 1][0], wavePoints[i + 1][1],
                {
                    roughness: roughness * 1.5,
                    strokeWidth: 1,
                    stroke: '#8b5cf6'
                }
            );
        }
    }
}

/**
 * 渲染梵高星空效果（优化版）
 */
function renderVanGoghStarryNight() {
    const { width, height } = canvas;
    const time = animationTime * 0.2;
    
    // 渲染简化的背景渐变
    renderNightSkyGradientOptimized();
    
    // 绘制优化的旋涡状云彩
    renderSwirlyCloudsOptimized(time);
    
    // 绘制主要星星
    renderStarsOptimized(time);
    
    // 绘制月亮
    renderCrescentMoonOptimized(time);
    
    // 绘制优化的风流线条
    renderWindFlowLinesOptimized(time);
    
    // 绘制前景轮廓
    renderForegroundSilhouettesOptimized(time);
}

/**
 * 渲染夜空渐变背景
 */
function renderNightSkyGradient() {
    const { width, height } = canvas;
    
    // 用多个半透明圆形模拟渐变效果
    const gradientSteps = 8;
    for (let i = 0; i < gradientSteps; i++) {
        const y = (i / gradientSteps) * height;
        const nextY = ((i + 1) / gradientSteps) * height;
        const alpha = 0.1 + (i / gradientSteps) * 0.3;
        
        // 为了模拟渐变，使用多个横向矩形
        for (let x = 0; x < width; x += 50) {
            const color = i < 3 ? '#1e1b4b' : '#0f172a'; // 上部深蓝，下部深灰
            rc.rectangle(x, y, 50, nextY - y, {
                roughness: roughness * 3,
                strokeWidth: 0,
                fill: color,
                fillStyle: 'zigzag'
            });
        }
    }
}

/**
 * 绘制旋涡状云彩
 */
function renderSwirlyClouds(time) {
    const { width, height } = canvas;
    const swirlCount = 5;
    
    for (let i = 0; i < swirlCount; i++) {
        const centerX = (i / swirlCount) * width + Math.sin(time + i) * 100;
        const centerY = height * 0.3 + Math.sin(time * 1.5 + i * 2) * 80;
        const swirlSize = 80 + Math.sin(time * 2 + i) * 30;
        
        // 绘制旋涡的多个层次
        for (let layer = 0; layer < 4; layer++) {
            const layerRadius = swirlSize - layer * 15;
            const layerTime = time + layer * 0.3 + i * 0.5;
            const spiralTurns = 3 + layer;
            
            // 创建螺旋路径
            const spiralPoints = [];
            const pointCount = 30;
            
            for (let p = 0; p < pointCount; p++) {
                const t = p / pointCount;
                const angle = t * Math.PI * 2 * spiralTurns + layerTime;
                const radius = layerRadius * (1 - t * 0.7);
                
                // 添加旋涡扰动
                const distortion = Math.sin(angle * 2 + layerTime * 2) * 10;
                const x = centerX + Math.cos(angle) * (radius + distortion);
                const y = centerY + Math.sin(angle) * (radius + distortion);
                
                spiralPoints.push([x, y]);
            }
            
            // 绘制螺旋线条
            for (let p = 0; p < spiralPoints.length - 1; p++) {
                const intensity = 1 - (p / spiralPoints.length);
                const strokeWidth = 2 + intensity * 3;
                
                rc.line(
                    spiralPoints[p][0], spiralPoints[p][1],
                    spiralPoints[p + 1][0], spiralPoints[p + 1][1],
                    {
                        roughness: roughness * 1.5,
                        strokeWidth: strokeWidth,
                        stroke: layer % 2 === 0 ? '#3b82f6' : '#1d4ed8'
                    }
                );
            }
        }
        
        // 添加旋涡中心的漩涡效果
        const vortexSize = swirlSize * 0.3;
        rc.circle(centerX, centerY, vortexSize, {
            roughness: roughness * 2,
            strokeWidth: 3,
            stroke: '#60a5fa',
            fill: '#1e40af',
            fillStyle: 'cross-hatch'
        });
    }
}

/**
 * 绘制星星
 */
function renderStars(time) {
    const { width, height } = canvas;
    
    // 主要的大星星（模拟原作中的亮星）
    const majorStars = [
        { x: width * 0.8, y: height * 0.15, baseSize: 25 },
        { x: width * 0.2, y: height * 0.25, baseSize: 20 },
        { x: width * 0.6, y: height * 0.35, baseSize: 22 },
        { x: width * 0.9, y: height * 0.4, baseSize: 18 },
        { x: width * 0.1, y: height * 0.5, baseSize: 16 }
    ];
    
    majorStars.forEach((star, i) => {
        const pulse = 1 + Math.sin(time * 3 + i * 0.7) * 0.4;
        const size = star.baseSize * pulse;
        const brightness = 0.7 + Math.sin(time * 2 + i * 0.5) * 0.3;
        
        // 主星星本体
        rc.circle(star.x, star.y, size, {
            roughness: roughness * 0.8,
            strokeWidth: 3,
            stroke: '#fbbf24',
            fill: '#fef3c7',
            fillStyle: 'zigzag'
        });
        
        // 星光放射效果
        const rayCount = 8;
        const rayLength = size * 1.5;
        
        for (let r = 0; r < rayCount; r++) {
            const rayAngle = (r / rayCount) * Math.PI * 2 + time * 0.5;
            const rayEndX = star.x + Math.cos(rayAngle) * rayLength;
            const rayEndY = star.y + Math.sin(rayAngle) * rayLength;
            
            rc.line(star.x, star.y, rayEndX, rayEndY, {
                roughness: roughness * 2,
                strokeWidth: 2 + Math.sin(time * 4 + r) * 1,
                stroke: '#fbbf24'
            });
        }
        
        // 光晕效果（同心圆）
        for (let halo = 1; halo <= 2; halo++) {
            const haloSize = size + halo * 15;
            rc.circle(star.x, star.y, haloSize, {
                roughness: roughness * 2,
                strokeWidth: 1,
                stroke: '#fde047',
                fill: 'none'
            });
        }
    });
    
    // 小星星（背景星星）
    const smallStarsCount = Math.floor(density * 0.8);
    for (let i = 0; i < smallStarsCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.7; // 主要在上方
        const size = 3 + Math.sin(time * 5 + i * 0.3) * 2;
        const twinkle = 0.5 + Math.sin(time * 4 + i * 0.8) * 0.5;
        
        if (twinkle > 0.3) {
            rc.circle(x, y, size, {
                roughness: roughness,
                strokeWidth: 1,
                stroke: '#f59e0b',
                fill: twinkle > 0.7 ? '#fbbf24' : 'none'
            });
            
            // 小星光
            if (twinkle > 0.6) {
                rc.line(x - size, y, x + size, y, {
                    roughness: roughness * 1.5,
                    strokeWidth: 0.5,
                    stroke: '#fbbf24'
                });
                rc.line(x, y - size, x, y + size, {
                    roughness: roughness * 1.5,
                    strokeWidth: 0.5,
                    stroke: '#fbbf24'
                });
            }
        }
    }
}

/**
 * 绘制新月
 */
function renderCrescentMoon(time) {
    const { width, height } = canvas;
    const moonX = width * 0.85;
    const moonY = height * 0.2;
    const moonSize = 60 + Math.sin(time) * 10;
    const glow = 1 + Math.sin(time * 2) * 0.3;
    
    // 月亮主体（新月形状）
    // 外圆
    rc.circle(moonX, moonY, moonSize, {
        roughness: roughness,
        strokeWidth: 3,
        stroke: '#fbbf24',
        fill: '#fef3c7',
        fillStyle: 'cross-hatch'
    });
    
    // 内切圆（创造新月形状）
    const innerX = moonX + moonSize * 0.3;
    rc.circle(innerX, moonY, moonSize * 0.8, {
        roughness: roughness * 1.5,
        strokeWidth: 2,
        stroke: '#0f172a',
        fill: '#0f172a',
        fillStyle: 'solid'
    });
    
    // 月亮光晕
    for (let halo = 1; halo <= 3; halo++) {
        const haloSize = moonSize + halo * 20 * glow;
        rc.circle(moonX, moonY, haloSize, {
            roughness: roughness * 2,
            strokeWidth: 1,
            stroke: `rgba(251, 191, 36, ${0.6 - halo * 0.15})`,
            fill: 'none'
        });
    }
    
    // 月光光束
    const rayCount = 12;
    for (let r = 0; r < rayCount; r++) {
        const rayAngle = (r / rayCount) * Math.PI * 2 + time * 0.3;
        const rayLength = moonSize * (1.5 + Math.sin(time * 2 + r) * 0.5);
        const rayEndX = moonX + Math.cos(rayAngle) * rayLength;
        const rayEndY = moonY + Math.sin(rayAngle) * rayLength;
        
        rc.line(moonX, moonY, rayEndX, rayEndY, {
            roughness: roughness * 2,
            strokeWidth: 1 + Math.sin(time * 3 + r) * 1,
            stroke: '#fde047'
        });
    }
}

/**
 * 绘制风流线条（模拟梵高的动态笔触）
 */
function renderWindFlowLines(time) {
    const { width, height } = canvas;
    const flowLines = 15;
    
    for (let i = 0; i < flowLines; i++) {
        const startY = (i / flowLines) * height * 0.8;
        const flow = time * 30 + i * 50;
        const amplitude = 40 + Math.sin(time + i) * 20;
        const wavelength = 200 + i * 30;
        
        // 创建流动的曲线路径
        const flowPoints = [];
        for (let x = 0; x <= width + 100; x += 15) {
            const waveY = startY + Math.sin((x + flow) / wavelength * Math.PI * 2) * amplitude;
            const turbulence = Math.sin(time * 3 + x * 0.01 + i) * 10;
            flowPoints.push([x, waveY + turbulence]);
        }
        
        // 绘制流线
        for (let p = 0; p < flowPoints.length - 1; p++) {
            const intensity = Math.sin(time + p * 0.1 + i) * 0.5 + 0.5;
            const strokeWidth = 1 + intensity * 2;
            
            rc.line(
                flowPoints[p][0], flowPoints[p][1],
                flowPoints[p + 1][0], flowPoints[p + 1][1],
                {
                    roughness: roughness * 1.8,
                    strokeWidth: strokeWidth,
                    stroke: i % 2 === 0 ? '#3b82f6' : '#1e40af'
                }
            );
        }
        
        // 添加一些垂直的流动线条
        if (i % 3 === 0) {
            const verticalFlow = [];
            const baseX = (i / 3) * width / 2 + width * 0.2;
            
            for (let y = 0; y <= height; y += 20) {
                const flowX = baseX + Math.sin((y + flow * 0.5) * 0.02) * 50;
                const turbulence = Math.sin(time * 2 + y * 0.02 + i) * 15;
                verticalFlow.push([flowX + turbulence, y]);
            }
            
            for (let p = 0; p < verticalFlow.length - 1; p++) {
                rc.line(
                    verticalFlow[p][0], verticalFlow[p][1],
                    verticalFlow[p + 1][0], verticalFlow[p + 1][1],
                    {
                        roughness: roughness * 1.6,
                        strokeWidth: 2,
                        stroke: '#6366f1'
                    }
                );
            }
        }
    }
}

/**
 * 绘制前景轮廓（模拟原作中的柏树和山岭）
 */
function renderForegroundSilhouettes(time) {
    const { width, height } = canvas;
    
    // 绘制左侧的高大柏树（原作中的标志性元素）
    const cypressX = width * 0.1;
    const cypressHeight = height * 0.8;
    const cypressWidth = 40;
    const sway = Math.sin(time * 0.8) * 15;
    
    // 柏树主体（火焰状）
    const cypressPoints = [];
    const pointCount = 20;
    
    for (let i = 0; i < pointCount; i++) {
        const t = i / pointCount;
        const y = height - t * cypressHeight;
        const width_at_height = cypressWidth * (1 - t * 0.7) * (1 + Math.sin(time + t * 10) * 0.3);
        
        // 左侧轮廓
        cypressPoints.push([cypressX - width_at_height/2 + sway * t, y]);
    }
    
    // 右侧轮廓（反向）
    for (let i = pointCount - 1; i >= 0; i--) {
        const t = i / pointCount;
        const y = height - t * cypressHeight;
        const width_at_height = cypressWidth * (1 - t * 0.7) * (1 + Math.sin(time + t * 10) * 0.3);
        
        cypressPoints.push([cypressX + width_at_height/2 + sway * t, y]);
    }
    
    // 绘制柏树
    rc.polygon(cypressPoints, {
        roughness: roughness * 1.8,
        strokeWidth: 3,
        stroke: '#1f2937',
        fill: '#111827',
        fillStyle: 'cross-hatch'
    });
    
    // 柏树的细节线条（模拟枝叶纹理）
    for (let i = 0; i < 10; i++) {
        const branchY = height - (i / 10) * cypressHeight;
        const branchLength = cypressWidth * 0.3;
        const branchAngle = (Math.random() - 0.5) * Math.PI * 0.3;
        
        const branchEndX = cypressX + Math.cos(branchAngle) * branchLength;
        const branchEndY = branchY + Math.sin(branchAngle) * branchLength;
        
        rc.line(cypressX, branchY, branchEndX, branchEndY, {
            roughness: roughness * 2,
            strokeWidth: 1,
            stroke: '#374151'
        });
    }
    
    // 绘制远山轮廓（模拟背景山岭）
    const mountainPoints = [];
    for (let x = 0; x <= width; x += 30) {
        const mountainHeight = height * 0.6 + Math.sin(x * 0.005 + time * 0.1) * 100;
        mountainPoints.push([x, mountainHeight]);
    }
    
    // 封闭山岭路径
    mountainPoints.push([width, height]);
    mountainPoints.push([0, height]);
    
    rc.polygon(mountainPoints, {
        roughness: roughness * 1.5,
        strokeWidth: 2,
        stroke: '#1f2937',
        fill: '#0f172a',
        fillStyle: 'cross-hatch'
    });
    
    // 添加一些小山丘和房屋轮廓
    const villageElements = 3;
    for (let i = 0; i < villageElements; i++) {
        const elementX = (i + 1) * width / (villageElements + 1);
        const elementHeight = height * 0.8 + Math.sin(time + i) * 20;
        const elementWidth = 30 + Math.random() * 20;
        
        // 小房屋或建筑轮廓
        rc.rectangle(
            elementX - elementWidth/2,
            elementHeight,
            elementWidth,
            height - elementHeight,
            {
                roughness: roughness * 1.3,
                strokeWidth: 2,
                stroke: '#374151',
                fill: '#1f2937',
                fillStyle: 'cross-hatch'
            }
        );
        
        // 屋顶（三角形）
        const roofPoints = [
            [elementX - elementWidth/2, elementHeight],
            [elementX + elementWidth/2, elementHeight],
            [elementX, elementHeight - 20]
        ];
        
        rc.polygon(roofPoints, {
            roughness: roughness * 1.2,
            strokeWidth: 2,
            stroke: '#4b5563',
            fill: '#374151',
            fillStyle: 'zigzag'
        });
        
        // 窗户光亮（小黄光点）
        if (Math.random() > 0.5) {
            const windowY = elementHeight + (height - elementHeight) * 0.3;
            rc.rectangle(
                elementX - 4, windowY,
                8, 12,
                {
                    roughness: roughness,
                    strokeWidth: 1,
                    stroke: '#fbbf24',
                    fill: '#fef3c7'
                }
            );
        }
    }
}

// 梵高星空优化版本的渲染函数

/**
 * 渲染优化的夜空渐变背景
 */
function renderNightSkyGradientOptimized() {
    const { width, height } = canvas;
    
    // 简化为更少的渐变层次
    const gradientSteps = 4;
    for (let i = 0; i < gradientSteps; i++) {
        const y = (i / gradientSteps) * height;
        const stepHeight = height / gradientSteps;
        
        // 使用更大的矩形块减少绘制次数
        const color = i < 2 ? '#1e1b4b' : '#0f172a';
        rc.rectangle(0, y, width, stepHeight, {
            roughness: roughness * 2,
            strokeWidth: 0,
            fill: color,
            fillStyle: 'solid'
        });
    }
}

/**
 * 绘制优化的旋涡状云彩
 */
function renderSwirlyCloudsOptimized(time) {
    const { width, height } = canvas;
    const swirlCount = 3; // 减少到3个旋涡
    
    for (let i = 0; i < swirlCount; i++) {
        const centerX = (i / swirlCount) * width + Math.sin(time + i) * 80;
        const centerY = height * 0.3 + Math.sin(time * 1.5 + i * 2) * 60;
        const swirlSize = 70 + Math.sin(time * 2 + i) * 20;
        
        // 减少层次，只绘制2层
        for (let layer = 0; layer < 2; layer++) {
            const layerRadius = swirlSize - layer * 20;
            const layerTime = time + layer * 0.5 + i * 0.8;
            
            // 减少螺旋点数
            const spiralPoints = [];
            const pointCount = 15; // 从30减少到15
            
            for (let p = 0; p < pointCount; p++) {
                const t = p / pointCount;
                const angle = t * Math.PI * 2 * 2.5 + layerTime; // 减少螺旋圈数
                const radius = layerRadius * (1 - t * 0.6);
                
                const distortion = Math.sin(angle * 1.5 + layerTime * 1.5) * 8; // 减少扰动
                const x = centerX + Math.cos(angle) * (radius + distortion);
                const y = centerY + Math.sin(angle) * (radius + distortion);
                
                spiralPoints.push([x, y]);
            }
            
            // 绘制螺旋线条
            for (let p = 0; p < spiralPoints.length - 1; p++) {
                const intensity = 1 - (p / spiralPoints.length);
                const strokeWidth = 2 + intensity * 2;
                
                rc.line(
                    spiralPoints[p][0], spiralPoints[p][1],
                    spiralPoints[p + 1][0], spiralPoints[p + 1][1],
                    {
                        roughness: roughness,
                        strokeWidth: strokeWidth,
                        stroke: layer % 2 === 0 ? '#3b82f6' : '#1d4ed8'
                    }
                );
            }
        }
        
        // 旋涡中心
        const vortexSize = swirlSize * 0.25;
        rc.circle(centerX, centerY, vortexSize, {
            roughness: roughness,
            strokeWidth: 2,
            stroke: '#60a5fa',
            fill: '#1e40af',
            fillStyle: 'dots'
        });
    }
}

/**
 * 绘制优化的星星
 */
function renderStarsOptimized(time) {
    const { width, height } = canvas;
    
    // 主要的大星星
    const majorStars = [
        { x: width * 0.8, y: height * 0.15, baseSize: 20 },
        { x: width * 0.2, y: height * 0.25, baseSize: 18 },
        { x: width * 0.6, y: height * 0.35, baseSize: 16 }
    ];
    
    majorStars.forEach((star, i) => {
        const pulse = 1 + Math.sin(time * 2 + i * 0.7) * 0.3;
        const size = star.baseSize * pulse;
        
        // 主星星本体
        rc.circle(star.x, star.y, size, {
            roughness: roughness * 0.8,
            strokeWidth: 2,
            stroke: '#fbbf24',
            fill: '#fef3c7',
            fillStyle: 'zigzag'
        });
        
        // 简化的星光效果 - 只绘制4个方向
        const rayLength = size * 1.2;
        const angles = [0, Math.PI/2, Math.PI, Math.PI * 1.5];
        
        angles.forEach((angle, r) => {
            const rayAngle = angle + time * 0.3;
            const rayEndX = star.x + Math.cos(rayAngle) * rayLength;
            const rayEndY = star.y + Math.sin(rayAngle) * rayLength;
            
            rc.line(star.x, star.y, rayEndX, rayEndY, {
                roughness: roughness,
                strokeWidth: 2,
                stroke: '#fbbf24'
            });
        });
        
        // 单层光晕
        rc.circle(star.x, star.y, size + 12, {
            roughness: roughness,
            strokeWidth: 1,
            stroke: '#fde047',
            fill: 'none'
        });
    });
    
    // 减少小星星数量
    const smallStarsCount = Math.floor(density * 0.4);
    for (let i = 0; i < smallStarsCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.6;
        const size = 2 + Math.sin(time * 3 + i * 0.5) * 1;
        const twinkle = 0.5 + Math.sin(time * 2 + i * 0.8) * 0.5;
        
        if (twinkle > 0.4) {
            rc.circle(x, y, size, {
                roughness: roughness * 0.5,
                strokeWidth: 1,
                stroke: '#f59e0b',
                fill: twinkle > 0.7 ? '#fbbf24' : 'none'
            });
        }
    }
}

/**
 * 绘制优化的新月
 */
function renderCrescentMoonOptimized(time) {
    const { width, height } = canvas;
    const moonX = width * 0.85;
    const moonY = height * 0.2;
    const moonSize = 50 + Math.sin(time) * 8;
    
    // 月亮主体
    rc.circle(moonX, moonY, moonSize, {
        roughness: roughness,
        strokeWidth: 2,
        stroke: '#fbbf24',
        fill: '#fef3c7',
        fillStyle: 'cross-hatch'
    });
    
    // 内切圆（创造新月形状）
    const innerX = moonX + moonSize * 0.25;
    rc.circle(innerX, moonY, moonSize * 0.7, {
        roughness: roughness,
        strokeWidth: 1,
        stroke: '#0f172a',
        fill: '#0f172a',
        fillStyle: 'solid'
    });
    
    // 简化的光晕
    rc.circle(moonX, moonY, moonSize + 15, {
        roughness: roughness,
        strokeWidth: 1,
        stroke: '#fde047',
        fill: 'none'
    });
    
    // 简化的月光光束 - 只绘制6个方向
    const rayCount = 6;
    for (let r = 0; r < rayCount; r++) {
        const rayAngle = (r / rayCount) * Math.PI * 2 + time * 0.2;
        const rayLength = moonSize * 1.3;
        const rayEndX = moonX + Math.cos(rayAngle) * rayLength;
        const rayEndY = moonY + Math.sin(rayAngle) * rayLength;
        
        rc.line(moonX, moonY, rayEndX, rayEndY, {
            roughness: roughness,
            strokeWidth: 1,
            stroke: '#fde047'
        });
    }
}

/**
 * 绘制优化的风流线条
 */
function renderWindFlowLinesOptimized(time) {
    const { width, height } = canvas;
    const flowLines = 8; // 减少线条数量
    
    for (let i = 0; i < flowLines; i++) {
        const startY = (i / flowLines) * height * 0.7;
        const flow = time * 20 + i * 60;
        const amplitude = 30 + Math.sin(time + i) * 15;
        const wavelength = 250 + i * 40;
        
        // 创建流动的曲线路径 - 减少点数
        const flowPoints = [];
        for (let x = 0; x <= width; x += 25) { // 增加步长
            const waveY = startY + Math.sin((x + flow) / wavelength * Math.PI * 2) * amplitude;
            const turbulence = Math.sin(time * 2 + x * 0.02 + i) * 8;
            flowPoints.push([x, waveY + turbulence]);
        }
        
        // 绘制流线
        for (let p = 0; p < flowPoints.length - 1; p++) {
            const intensity = Math.sin(time + p * 0.2 + i) * 0.5 + 0.5;
            const strokeWidth = 1 + intensity * 1.5;
            
            rc.line(
                flowPoints[p][0], flowPoints[p][1],
                flowPoints[p + 1][0], flowPoints[p + 1][1],
                {
                    roughness: roughness,
                    strokeWidth: strokeWidth,
                    stroke: i % 2 === 0 ? '#3b82f6' : '#1e40af'
                }
            );
        }
    }
}

/**
 * 绘制优化的前景轮廓
 */
function renderForegroundSilhouettesOptimized(time) {
    const { width, height } = canvas;
    
    // 简化的柏树
    const cypressX = width * 0.1;
    const cypressHeight = height * 0.7;
    const cypressWidth = 35;
    const sway = Math.sin(time * 0.5) * 10;
    
    // 柏树主体 - 减少点数
    const cypressPoints = [];
    const pointCount = 12; // 从20减少到12
    
    for (let i = 0; i < pointCount; i++) {
        const t = i / pointCount;
        const y = height - t * cypressHeight;
        const width_at_height = cypressWidth * (1 - t * 0.6) * (1 + Math.sin(time + t * 6) * 0.2);
        
        cypressPoints.push([cypressX - width_at_height/2 + sway * t, y]);
    }
    
    for (let i = pointCount - 1; i >= 0; i--) {
        const t = i / pointCount;
        const y = height - t * cypressHeight;
        const width_at_height = cypressWidth * (1 - t * 0.6) * (1 + Math.sin(time + t * 6) * 0.2);
        
        cypressPoints.push([cypressX + width_at_height/2 + sway * t, y]);
    }
    
    // 绘制柏树
    rc.polygon(cypressPoints, {
        roughness: roughness,
        strokeWidth: 2,
        stroke: '#1f2937',
        fill: '#111827',
        fillStyle: 'cross-hatch'
    });
    
    // 简化的远山轮廓
    const mountainPoints = [];
    for (let x = 0; x <= width; x += 50) { // 增加步长
        const mountainHeight = height * 0.65 + Math.sin(x * 0.008 + time * 0.1) * 80;
        mountainPoints.push([x, mountainHeight]);
    }
    
    mountainPoints.push([width, height]);
    mountainPoints.push([0, height]);
    
    rc.polygon(mountainPoints, {
        roughness: roughness,
        strokeWidth: 1,
        stroke: '#1f2937',
        fill: '#0f172a',
        fillStyle: 'cross-hatch'
    });
    
    // 简化的村庄元素
    const villageElements = 2;
    for (let i = 0; i < villageElements; i++) {
        const elementX = (i + 1) * width / 3;
        const elementHeight = height * 0.8;
        const elementWidth = 25;
        
        // 房屋
        rc.rectangle(
            elementX - elementWidth/2,
            elementHeight,
            elementWidth,
            height - elementHeight,
            {
                roughness: roughness,
                strokeWidth: 1,
                stroke: '#374151',
                fill: '#1f2937',
                fillStyle: 'solid'
            }
        );
        
        // 屋顶
        const roofPoints = [
            [elementX - elementWidth/2, elementHeight],
            [elementX + elementWidth/2, elementHeight],
            [elementX, elementHeight - 15]
        ];
        
        rc.polygon(roofPoints, {
            roughness: roughness,
            strokeWidth: 1,
            stroke: '#4b5563',
            fill: '#374151',
            fillStyle: 'solid'
        });
        
        // 窗户
        if (Math.random() > 0.3) {
            const windowY = elementHeight + 15;
            rc.rectangle(
                elementX - 3, windowY,
                6, 8,
                {
                    roughness: roughness * 0.5,
                    strokeWidth: 1,
                    stroke: '#fbbf24',
                    fill: '#fef3c7'
                }
            );
        }
    }
}

/**
 * 渲染海上日出效果
 */
function renderOceanSunrise() {
    const { width, height } = canvas;
    const time = animationTime * 0.3;
    
    // 绘制早晨天空渐变
    renderSunriseGradient(time);
    
    // 绘制太阳
    renderSun(time);
    
    // 绘制海平线
    renderHorizonLine(time);
    
    // 绘制海浪
    renderOceanWaves(time);
    
    // 绘制水面反射
    renderWaterReflections(time);
    
    // 绘制海鸥
    renderSeagulls(time);
    
    // 绘制云彩
    renderSunriseClouds(time);
}

/**
 * 绘制早晨天空渐变
 */
function renderSunriseGradient(time) {
    const { width, height } = canvas;
    const horizonY = height * 0.6;
    
    // 天空部分 - 从深蓝到橙红再到金黄
    const skySteps = 4;
    for (let i = 0; i < skySteps; i++) {
        const y = (i / skySteps) * horizonY;
        const stepHeight = horizonY / skySteps;
        
        let color;
        if (i === 0) {
            color = '#1e293b'; // 顶部深蓝
        } else if (i === 1) {
            color = '#7c3aed'; // 紫色
        } else if (i === 2) {
            color = '#f97316'; // 橙色
        } else {
            color = '#fbbf24'; // 金黄色
        }
        
        rc.rectangle(0, y, width, stepHeight, {
            roughness: roughness,
            strokeWidth: 0,
            fill: color,
            fillStyle: 'solid'
        });
    }
}

/**
 * 绘制太阳
 */
function renderSun(time) {
    const { width, height } = canvas;
    const sunX = width * 0.75;
    const horizonY = height * 0.6;
    const sunY = horizonY - 30 + Math.sin(time * 0.5) * 15; // 在海平线上方缓缓上升
    const sunSize = 80 + Math.sin(time) * 10;
    
    // 太阳本体
    rc.circle(sunX, sunY, sunSize, {
        roughness: roughness * 0.8,
        strokeWidth: 3,
        stroke: '#f59e0b',
        fill: '#fbbf24',
        fillStyle: 'zigzag'
    });
    
    // 太阳光芒
    const rayCount = 16;
    for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + time * 0.2;
        const rayLength = sunSize * (1.5 + Math.sin(time * 2 + i) * 0.3);
        const rayEndX = sunX + Math.cos(angle) * rayLength;
        const rayEndY = sunY + Math.sin(angle) * rayLength;
        
        rc.line(sunX, sunY, rayEndX, rayEndY, {
            roughness: roughness,
            strokeWidth: 2 + Math.sin(time * 3 + i) * 1,
            stroke: '#f59e0b'
        });
    }
    
    // 太阳光晕
    for (let halo = 1; halo <= 3; halo++) {
        const haloSize = sunSize + halo * 25;
        rc.circle(sunX, sunY, haloSize, {
            roughness: roughness * 2,
            strokeWidth: 1,
            stroke: '#fde047',
            fill: 'none'
        });
    }
}

/**
 * 绘制海平线
 */
function renderHorizonLine(time) {
    const { width, height } = canvas;
    const horizonY = height * 0.6;
    
    // 主海平线
    const horizonPoints = [];
    for (let x = 0; x <= width; x += 30) {
        const wave = Math.sin(time + x * 0.01) * 3;
        horizonPoints.push([x, horizonY + wave]);
    }
    
    for (let i = 0; i < horizonPoints.length - 1; i++) {
        rc.line(
            horizonPoints[i][0], horizonPoints[i][1],
            horizonPoints[i + 1][0], horizonPoints[i + 1][1],
            {
                roughness: roughness,
                strokeWidth: 2,
                stroke: '#1e40af'
            }
        );
    }
}

/**
 * 绘制海浪
 */
function renderOceanWaves(time) {
    const { width, height } = canvas;
    const horizonY = height * 0.6;
    const waveCount = 6;
    
    for (let wave = 0; wave < waveCount; wave++) {
        const waveY = horizonY + 20 + wave * 40;
        const waveSpeed = time * (2 + wave * 0.5);
        const amplitude = 15 + wave * 5;
        
        const wavePoints = [];
        for (let x = 0; x <= width; x += 20) {
            const y = waveY + Math.sin((x + waveSpeed * 30) * 0.02) * amplitude;
            wavePoints.push([x, y]);
        }
        
        // 绘制浪线
        for (let i = 0; i < wavePoints.length - 1; i++) {
            const intensity = Math.sin(time + i * 0.1 + wave) * 0.3 + 0.7;
            rc.line(
                wavePoints[i][0], wavePoints[i][1],
                wavePoints[i + 1][0], wavePoints[i + 1][1],
                {
                    roughness: roughness,
                    strokeWidth: 2 + intensity,
                    stroke: wave % 2 === 0 ? '#3b82f6' : '#1e40af'
                }
            );
        }
        
        // 浪花泯沫
        for (let foam = 0; foam < 3; foam++) {
            const foamX = (time * 40 + foam * 200 + wave * 50) % width;
            const foamY = waveY + Math.sin((foamX + waveSpeed * 30) * 0.02) * amplitude;
            const foamSize = 8 + Math.sin(time * 4 + foam + wave) * 4;
            
            rc.circle(foamX, foamY, foamSize, {
                roughness: roughness * 1.5,
                strokeWidth: 1,
                stroke: '#f0f9ff',
                fill: '#f0f9ff',
                fillStyle: 'dots'
            });
        }
    }
}

/**
 * 绘制水面反射
 */
function renderWaterReflections(time) {
    const { width, height } = canvas;
    const sunX = width * 0.75;
    const horizonY = height * 0.6;
    
    // 太阳在水面的反射光柱
    const reflectionPath = [];
    const pathWidth = 60;
    
    for (let y = horizonY; y < height; y += 10) {
        const distanceFromHorizon = y - horizonY;
        const perspective = distanceFromHorizon / (height - horizonY);
        const currentWidth = pathWidth * (1 - perspective * 0.7);
        
        const shimmer = Math.sin(time * 3 + y * 0.03) * (currentWidth * 0.3);
        const leftX = sunX - currentWidth/2 + shimmer;
        const rightX = sunX + currentWidth/2 + shimmer;
        
        // 光柱边缘
        rc.line(leftX, y, leftX, y + 8, {
            roughness: roughness,
            strokeWidth: 1,
            stroke: '#fbbf24'
        });
        
        rc.line(rightX, y, rightX, y + 8, {
            roughness: roughness,
            strokeWidth: 1,
            stroke: '#fbbf24'
        });
        
        // 内部闪烁效果
        if (Math.random() > 0.7) {
            const sparkleX = leftX + Math.random() * currentWidth;
            rc.circle(sparkleX, y, 2, {
                roughness: roughness,
                strokeWidth: 1,
                stroke: '#fde047',
                fill: '#fef3c7'
            });
        }
    }
}

/**
 * 绘制海鸥
 */
function renderSeagulls(time) {
    const { width, height } = canvas;
    const seagullCount = 5;
    
    for (let i = 0; i < seagullCount; i++) {
        const birdX = (time * 20 + i * 150) % (width + 100) - 50;
        const birdY = height * 0.3 + Math.sin(time * 1.5 + i) * 40;
        const wingFlap = Math.sin(time * 8 + i * 2) * 5;
        
        // 海鸥身体（简化的V形）
        rc.line(
            birdX - 12, birdY + wingFlap,
            birdX, birdY - 6,
            {
                roughness: roughness,
                strokeWidth: 2,
                stroke: '#6b7280'
            }
        );
        
        rc.line(
            birdX, birdY - 6,
            birdX + 12, birdY + wingFlap,
            {
                roughness: roughness,
                strokeWidth: 2,
                stroke: '#6b7280'
            }
        );
        
        // 海鸥的小尾巴
        if (Math.random() > 0.5) {
            rc.line(
                birdX, birdY - 6,
                birdX + 3, birdY - 3,
                {
                    roughness: roughness,
                    strokeWidth: 1,
                    stroke: '#6b7280'
                }
            );
        }
    }
}

/**
 * 绘制日出云彩
 */
function renderSunriseClouds(time) {
    const { width, height } = canvas;
    const cloudCount = 4;
    
    for (let i = 0; i < cloudCount; i++) {
        const cloudX = (i / cloudCount) * width + Math.sin(time * 0.3 + i) * 40;
        const cloudY = height * 0.2 + Math.sin(time * 0.5 + i * 2) * 30;
        const cloudSize = 40 + Math.sin(time + i) * 15;
        
        // 云朵主体
        rc.ellipse(cloudX, cloudY, cloudSize * 2.5, cloudSize, {
            roughness: roughness * 1.5,
            strokeWidth: 1,
            stroke: '#f97316',
            fill: '#fed7aa',
            fillStyle: 'dots'
        });
        
        // 云朵边缘金边
        rc.ellipse(cloudX, cloudY, cloudSize * 2.8, cloudSize * 1.2, {
            roughness: roughness * 2,
            strokeWidth: 2,
            stroke: '#fbbf24',
            fill: 'none'
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initRoughDemo();
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});
