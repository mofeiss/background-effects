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
    },
    {
        id: 'particle-explosion',
        name: '粒子爆炸',
        description: '从中心点爆发的粒子动画',
        init: createParticleExplosion
    },
    {
        id: 'flip-cards',
        name: '3D翻转卡片',
        description: '具有3D透视效果的卡片翻转',
        init: createFlipCards
    },
    {
        id: 'liquid-flow',
        name: '液体流动',
        description: '模拟液体流动的形变动画',
        init: createLiquidFlow
    },
    {
        id: 'breathing-rings',
        name: '呼吸光环',
        description: '多层光环的呼吸扩散效果',
        init: createBreathingRings
    },
    {
        id: 'dna-helix',
        name: 'DNA螺旋',
        description: '双螺旋结构的旋转动画',
        init: createDNAHelix
    },
    {
        id: 'neon-text',
        name: '霓虹文字',
        description: '具有霓虹灯效果的文字动画',
        init: createNeonText
    },
    {
        id: 'sound-ripples',
        name: '音波涟漪',
        description: '模拟声波传播的涟漪效果',
        init: createSoundRipples
    },
    {
        id: 'mosaic-puzzle',
        name: '马赛克拼图',
        description: '碎片化和重组的马赛克动画',
        init: createMosaicPuzzle
    },
    {
        id: 'clock-gears',
        name: '时钟齿轮',
        description: '机械齿轮的旋转联动效果',
        init: createClockGears
    },
    {
        id: 'star-constellation',
        name: '星空连线',
        description: '动态星座连线效果',
        init: createStarConstellation
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
 * 效果7: 粒子爆炸
 */
function createParticleExplosion(container) {
    const particles = [];
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = 4 + Math.random() * 8;
        const color = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][Math.floor(Math.random() * 5)];
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.boxShadow = `0 0 ${size}px ${color}`;
        
        container.appendChild(particle);
        particles.push(particle);
    }

    // 创建爆炸动画
    const animation = anime({
        targets: particles,
        translateX: function() {
            return anime.random(-400, 400);
        },
        translateY: function() {
            return anime.random(-400, 400);
        },
        scale: [1, 0],
        opacity: [1, 0],
        rotate: function() {
            return anime.random(0, 720);
        },
        duration: function() {
            return anime.random(2000, 4000);
        },
        easing: 'easeOutCubic',
        loop: true,
        delay: function(el, i) {
            return i * 50;
        },
        complete: function() {
            // 重置粒子位置
            particles.forEach(particle => {
                particle.style.transform = '';
                particle.style.opacity = '1';
            });
        }
    });

    return animation;
}

/**
 * 效果8: 3D翻转卡片
 */
function createFlipCards(container) {
    const cards = [];
    const cardCount = 12;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b'];
    
    container.style.perspective = '1000px';

    for (let i = 0; i < cardCount; i++) {
        const card = document.createElement('div');
        const size = 80 + Math.random() * 40;
        
        card.style.position = 'absolute';
        card.style.width = size + 'px';
        card.style.height = size + 'px';
        card.style.backgroundColor = colors[i % colors.length];
        card.style.borderRadius = '8px';
        card.style.left = Math.random() * (container.offsetWidth - size) + 'px';
        card.style.top = Math.random() * (container.offsetHeight - size) + 'px';
        card.style.transformStyle = 'preserve-3d';
        card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        
        container.appendChild(card);
        cards.push(card);
    }

    // 创建3D翻转动画
    const animation = anime({
        targets: cards,
        rotateX: function() {
            return anime.random(-180, 180);
        },
        rotateY: function() {
            return anime.random(-180, 180);
        },
        translateZ: function() {
            return anime.random(-100, 100);
        },
        duration: function() {
            return anime.random(3000, 5000);
        },
        easing: 'easeInOutQuart',
        direction: 'alternate',
        loop: true,
        delay: function(el, i) {
            return i * 200;
        }
    });

    return animation;
}

/**
 * 效果9: 液体流动
 */
function createLiquidFlow(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.setAttribute('viewBox', `0 0 ${container.offsetWidth} ${container.offsetHeight}`);

    // 创建液体形状的路径
    const liquidPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    liquidPath.style.fill = 'url(#liquidGradient)';
    liquidPath.style.opacity = '0.8';

    // 创建渐变
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'liquidGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#74b9ff');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#0984e3');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    svg.appendChild(liquidPath);
    container.appendChild(svg);

    // 生成液体形状路径数据
    function generateLiquidPath(t) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const amplitude = 30;
        const frequency = 0.01;
        
        let path = `M 0 ${height/2}`;
        for (let x = 0; x <= width; x += 10) {
            const y = height/2 + Math.sin(x * frequency + t) * amplitude + 
                      Math.sin(x * frequency * 2 + t * 1.5) * amplitude * 0.5;
            path += ` L ${x} ${y}`;
        }
        path += ` L ${width} ${height} L 0 ${height} Z`;
        return path;
    }

    let animationTime = 0;
    
    // 创建液体流动动画
    const animation = anime({
        targets: liquidPath,
        duration: 100,
        easing: 'linear',
        loop: true,
        update: function() {
            animationTime += 0.1;
            liquidPath.setAttribute('d', generateLiquidPath(animationTime));
        }
    });

    return animation;
}

/**
 * 效果10: 呼吸光环
 */
function createBreathingRings(container) {
    const rings = [];
    const ringCount = 8;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    for (let i = 0; i < ringCount; i++) {
        const ring = document.createElement('div');
        const size = 50 + i * 30;
        
        ring.style.position = 'absolute';
        ring.style.width = size + 'px';
        ring.style.height = size + 'px';
        ring.style.borderRadius = '50%';
        ring.style.border = '2px solid rgba(116, 185, 255, 0.6)';
        ring.style.left = centerX - size/2 + 'px';
        ring.style.top = centerY - size/2 + 'px';
        ring.style.boxShadow = `0 0 20px rgba(116, 185, 255, 0.4)`;
        
        container.appendChild(ring);
        rings.push(ring);
    }

    // 创建呼吸动画
    const animation = anime({
        targets: rings,
        scale: function() {
            return [0.5, 1.2, 0.5];
        },
        opacity: function(el, i) {
            return [0.8, 0.2, 0.8];
        },
        duration: function(el, i) {
            return 3000 + i * 200;
        },
        easing: 'easeInOutSine',
        loop: true,
        delay: function(el, i) {
            return i * 300;
        }
    });

    return animation;
}

/**
 * 效果11: DNA螺旋
 */
function createDNAHelix(container) {
    const points = [];
    const pointCount = 40;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const radius = 80;
    const height = 300;

    // 创建DNA双螺旋的点
    for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 6;
        const y = (i / pointCount) * height - height/2;
        
        // 第一条螺旋
        const point1 = document.createElement('div');
        point1.style.position = 'absolute';
        point1.style.width = '8px';
        point1.style.height = '8px';
        point1.style.backgroundColor = '#e74c3c';
        point1.style.borderRadius = '50%';
        point1.style.left = centerX + Math.cos(angle) * radius + 'px';
        point1.style.top = centerY + y + 'px';
        point1.style.boxShadow = '0 0 10px #e74c3c';
        
        // 第二条螺旋
        const point2 = document.createElement('div');
        point2.style.position = 'absolute';
        point2.style.width = '8px';
        point2.style.height = '8px';
        point2.style.backgroundColor = '#3498db';
        point2.style.borderRadius = '50%';
        point2.style.left = centerX + Math.cos(angle + Math.PI) * radius + 'px';
        point2.style.top = centerY + y + 'px';
        point2.style.boxShadow = '0 0 10px #3498db';

        // 连接线
        if (i % 4 === 0) {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.width = radius * 2 + 'px';
            line.style.height = '2px';
            line.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            line.style.left = centerX - radius + 'px';
            line.style.top = centerY + y + 'px';
            line.style.transformOrigin = '50% 50%';
            line.style.transform = `rotate(${angle * 180/Math.PI}deg)`;
            
            container.appendChild(line);
            points.push(line);
        }
        
        container.appendChild(point1);
        container.appendChild(point2);
        points.push(point1, point2);
    }

    // 创建旋转动画
    const animation = anime({
        targets: points,
        rotate: '360deg',
        duration: 6000,
        easing: 'linear',
        loop: true
    });

    return animation;
}

/**
 * 效果12: 霓虹文字
 */
function createNeonText(container) {
    const text = "NEON EFFECT";
    const textContainer = document.createElement('div');
    textContainer.style.position = 'absolute';
    textContainer.style.top = '50%';
    textContainer.style.left = '50%';
    textContainer.style.transform = 'translate(-50%, -50%)';
    textContainer.style.fontSize = '4rem';
    textContainer.style.fontWeight = 'bold';
    textContainer.style.display = 'flex';
    textContainer.style.gap = '0.3rem';

    // 创建每个字母
    text.split('').forEach((char, index) => {
        const letter = document.createElement('span');
        letter.textContent = char === ' ' ? '\u00A0' : char;
        letter.style.display = 'inline-block';
        letter.style.color = '#fff';
        letter.style.textShadow = `
            0 0 5px #ff006e,
            0 0 10px #ff006e,
            0 0 15px #ff006e,
            0 0 20px #ff006e
        `;
        textContainer.appendChild(letter);
    });

    container.appendChild(textContainer);

    // 创建霓虹闪烁动画
    const animation = anime({
        targets: textContainer.children,
        textShadow: [
            '0 0 5px #ff006e, 0 0 10px #ff006e, 0 0 15px #ff006e, 0 0 20px #ff006e',
            '0 0 10px #8338ec, 0 0 20px #8338ec, 0 0 30px #8338ec, 0 0 40px #8338ec',
            '0 0 10px #3a86ff, 0 0 20px #3a86ff, 0 0 30px #3a86ff, 0 0 40px #3a86ff',
            '0 0 5px #ff006e, 0 0 10px #ff006e, 0 0 15px #ff006e, 0 0 20px #ff006e'
        ],
        scale: [1, 1.1, 1],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true,
        delay: function(el, i) {
            return i * 100;
        }
    });

    return animation;
}

/**
 * 效果13: 音波涟漪
 */
function createSoundRipples(container) {
    const ripples = [];
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    // 创建多个涟漪圆圈
    for (let i = 0; i < 6; i++) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.border = '3px solid #74b9ff';
        ripple.style.left = centerX - 10 + 'px';
        ripple.style.top = centerY - 10 + 'px';
        ripple.style.opacity = '0';
        
        container.appendChild(ripple);
        ripples.push(ripple);
    }

    // 创建涟漪扩散动画
    const animation = anime({
        targets: ripples,
        scale: [0, 10],
        opacity: [1, 0],
        borderWidth: [3, 0],
        duration: 3000,
        easing: 'easeOutQuart',
        loop: true,
        delay: function(el, i) {
            return i * 400;
        }
    });

    return animation;
}

/**
 * 效果14: 马赛克拼图
 */
function createMosaicPuzzle(container) {
    const tiles = [];
    const tileSize = 40;
    const cols = Math.floor(container.offsetWidth / tileSize);
    const rows = Math.floor(container.offsetHeight / tileSize);
    const colors = ['#ff7675', '#74b9ff', '#55a3ff', '#fd79a8', '#fdcb6e', '#6c5ce7'];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = document.createElement('div');
            tile.style.position = 'absolute';
            tile.style.width = tileSize + 'px';
            tile.style.height = tileSize + 'px';
            tile.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            tile.style.left = col * tileSize + 'px';
            tile.style.top = row * tileSize + 'px';
            tile.style.opacity = '0.8';
            tile.style.border = '1px solid rgba(255,255,255,0.1)';
            
            container.appendChild(tile);
            tiles.push(tile);
        }
    }

    // 创建马赛克重组动画
    const animation = anime({
        targets: tiles,
        translateX: function() {
            return anime.random(-100, 100);
        },
        translateY: function() {
            return anime.random(-100, 100);
        },
        rotate: function() {
            return anime.random(-45, 45);
        },
        backgroundColor: function() {
            return colors[Math.floor(Math.random() * colors.length)];
        },
        duration: function() {
            return anime.random(2000, 4000);
        },
        easing: 'easeInOutBack',
        direction: 'alternate',
        loop: true,
        delay: function(el, i) {
            return i * 20;
        }
    });

    return animation;
}

/**
 * 效果15: 时钟齿轮
 */
function createClockGears(container) {
    const gears = [];
    const gearConfigs = [
        { size: 100, x: 200, y: 200, speed: 1, teeth: 12 },
        { size: 80, x: 280, y: 150, speed: -1.25, teeth: 10 },
        { size: 60, x: 350, y: 220, speed: 1.67, teeth: 8 },
        { size: 120, x: 150, y: 300, speed: -0.83, teeth: 15 }
    ];

    gearConfigs.forEach((config, index) => {
        const gear = document.createElement('div');
        gear.style.position = 'absolute';
        gear.style.width = config.size + 'px';
        gear.style.height = config.size + 'px';
        gear.style.left = config.x - config.size/2 + 'px';
        gear.style.top = config.y - config.size/2 + 'px';
        gear.style.borderRadius = '50%';
        gear.style.border = '4px solid #636e72';
        gear.style.backgroundColor = '#2d3436';
        
        // 添加齿轮齿
        for (let i = 0; i < config.teeth; i++) {
            const tooth = document.createElement('div');
            const angle = (i / config.teeth) * 360;
            tooth.style.position = 'absolute';
            tooth.style.width = '8px';
            tooth.style.height = '12px';
            tooth.style.backgroundColor = '#636e72';
            tooth.style.left = '50%';
            tooth.style.top = '-6px';
            tooth.style.transformOrigin = '50% ' + (config.size/2 + 6) + 'px';
            tooth.style.transform = `translate(-50%, 0) rotate(${angle}deg)`;
            gear.appendChild(tooth);
        }
        
        container.appendChild(gear);
        gears.push({ element: gear, speed: config.speed });
    });

    // 创建齿轮旋转动画
    const animations = gears.map(gear => {
        return anime({
            targets: gear.element,
            rotate: gear.speed > 0 ? '360deg' : '-360deg',
            duration: 4000 / Math.abs(gear.speed),
            easing: 'linear',
            loop: true
        });
    });

    return { pause: () => animations.forEach(a => a.pause()), play: () => animations.forEach(a => a.play()) };
}

/**
 * 效果16: 星空连线
 */
function createStarConstellation(container) {
    const stars = [];
    const lines = [];
    const starCount = 25;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.setAttribute('viewBox', `0 0 ${container.offsetWidth} ${container.offsetHeight}`);
    
    // 创建星星
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = 2 + Math.random() * 4;
        const x = Math.random() * container.offsetWidth;
        const y = Math.random() * container.offsetHeight;
        
        star.style.position = 'absolute';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.boxShadow = '0 0 10px #fff';
        
        // 添加连线
        if (i > 0) {
            const prevStar = stars[i - 1];
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', prevStar.x);
            line.setAttribute('y1', prevStar.y);
            line.setAttribute('x2', x);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
            line.setAttribute('stroke-width', '1');
            
            svg.appendChild(line);
            lines.push(line);
        }
        
        container.appendChild(star);
        stars.push({ element: star, x, y });
    }
    
    container.appendChild(svg);

    // 创建星空闪烁动画
    const animation = anime({
        targets: stars.map(s => s.element),
        opacity: function() {
            return [0.3, 1, 0.3];
        },
        scale: function() {
            return [0.5, 1.2, 0.5];
        },
        duration: function() {
            return anime.random(2000, 4000);
        },
        easing: 'easeInOutSine',
        loop: true,
        delay: function(el, i) {
            return i * 200;
        }
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
