/**
 * Matter.js 演示脚本
 * 2D 物理引擎演示
 */

// 全局变量
let engine, world, render, runner;
let canvas, ctx;
let currentEffect = 'gravity';
let isRunning = false;

// Matter.js 模块
const { Engine, Render, Runner, Bodies, Body, World, Mouse, MouseConstraint, Constraint, Events } = Matter;

// 效果配置
const effectConfigs = [
    {
        id: 'gravity',
        name: '重力下落',
        description: '物体在重力作用下自然下落和堆积',
        setup: setupGravityEffect
    },
    {
        id: 'bouncing',
        name: '弹跳球',
        description: '高弹性球体在边界间反复弹跳',
        setup: setupBouncingEffect
    },
    {
        id: 'chain',
        name: '连锁反应',
        description: '多米诺骨牌式的连锁碰撞效果',
        setup: setupChainEffect
    },
    {
        id: 'pendulum',
        name: '摆锤时钟',
        description: '多个摆锤的有节奏摆动',
        setup: setupPendulumEffect
    },
    {
        id: 'explosion',
        name: '粒子爆炸',
        description: '从中心向外爆炸的粒子效果',
        setup: setupExplosionEffect
    },
    {
        id: 'floating',
        name: '漂浮气泡',
        description: '具有浮力的气泡向上漂浮',
        setup: setupFloatingEffect
    }
];

/**
 * 初始化函数
 */
function initDemo() {
    console.log('开始初始化 Matter.js 演示...');
    
    // 检查 Matter.js 是否加载
    if (typeof Matter === 'undefined') {
        console.error('Matter.js 未定义');
        showError('Matter.js 库加载失败');
        return;
    }

    // 设置容器
    setupContainer();
    
    // 绑定按钮事件
    bindButtonEvents();
    
    // 绑定窗口大小改变事件
    bindResizeEvent();
    
    // 加载默认效果
    loadEffect('gravity');
}

/**
 * 设置容器样式
 */
function setupContainer() {
    const container = document.getElementById('matter-container');
    if (container) {
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '500px';
        container.style.overflow = 'hidden';
        container.style.borderRadius = 'var(--border-radius-lg)';
        container.style.border = '1px solid var(--border-color)';
        container.style.backgroundColor = '#0f172a';
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
    
    // 绑定添加物体按钮
    const addObjectsBtn = document.getElementById('add-objects-btn');
    if (addObjectsBtn) {
        addObjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addRandomObjects();
        });
    }
    
    // 绑定重置按钮
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetWorld();
        });
    }
    
    // 绑定键盘快捷键
    document.addEventListener('keydown', (e) => {
        const num = parseInt(e.key);
        if (num >= 1 && num <= effectConfigs.length) {
            const effectId = effectConfigs[num - 1].id;
            loadEffect(effectId);
            updateButtonStates(effectId);
        } else if (e.key === ' ') {
            // 空格键重置世界
            e.preventDefault();
            resetWorld();
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
            // 重新加载当前效果
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
        // 停止当前引擎
        stopEngine();
        
        // 创建新的物理世界
        createEngine();
        
        // 设置效果
        effect.setup();
        
        // 启动引擎
        startEngine();
        
        currentEffect = effectId;
        console.log(`成功加载效果: ${effect.name}`);
        
    } catch (error) {
        console.error('加载效果失败:', error);
        showError(`加载效果失败: ${error.message}`);
    }
}

/**
 * 创建物理引擎
 */
function createEngine() {
    const container = document.getElementById('matter-container');
    if (!container) {
        throw new Error('找不到容器元素');
    }

    // 清空容器
    container.innerHTML = '';
    
    // 创建引擎
    engine = Engine.create();
    world = engine.world;
    
    // 设置重力
    engine.world.gravity.y = 0.8;
    
    // 创建渲染器
    render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: container.offsetWidth || 800,
            height: container.offsetHeight || 500,
            wireframes: false,
            background: 'transparent',
            showAngleIndicator: false,
            showVelocity: false,
            showDebug: false
        }
    });
    
    // 设置画布样式
    render.canvas.style.borderRadius = 'var(--border-radius-lg)';
    
    // 创建鼠标约束
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    
    World.add(world, mouseConstraint);
    
    // 保持鼠标同步
    render.mouse = mouse;
}

/**
 * 启动引擎
 */
function startEngine() {
    if (!isRunning) {
        Render.run(render);
        runner = Runner.create();
        Runner.run(runner, engine);
        isRunning = true;
    }
}

/**
 * 停止引擎
 */
function stopEngine() {
    if (isRunning) {
        if (render) {
            Render.stop(render);
            render.canvas?.remove();
        }
        if (runner) {
            Runner.stop(runner);
        }
        if (engine) {
            Engine.clear(engine);
        }
        isRunning = false;
    }
}

/**
 * 重力下落效果
 */
function setupGravityEffect() {
    const width = render.options.width;
    const height = render.options.height;
    
    // 创建边界
    const ground = Bodies.rectangle(width / 2, height - 10, width, 20, { 
        isStatic: true,
        render: { fillStyle: '#6366f1' }
    });
    const leftWall = Bodies.rectangle(10, height / 2, 20, height, { 
        isStatic: true,
        render: { fillStyle: '#6366f1' }
    });
    const rightWall = Bodies.rectangle(width - 10, height / 2, 20, height, { 
        isStatic: true,
        render: { fillStyle: '#6366f1' }
    });
    
    World.add(world, [ground, leftWall, rightWall]);
    
    // 定期添加下落的物体
    const addFallingObject = () => {
        const colors = ['#8b5cf6', '#a855f7', '#c084fc', '#e879f9', '#f3e8ff'];
        const x = 50 + Math.random() * (width - 100);
        const size = 10 + Math.random() * 20;
        
        const shape = Math.random() < 0.5 ? 'circle' : 'rectangle';
        let body;
        
        if (shape === 'circle') {
            body = Bodies.circle(x, -30, size, {
                render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
                restitution: 0.6,
                friction: 0.1
            });
        } else {
            body = Bodies.rectangle(x, -30, size * 2, size * 2, {
                render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
                restitution: 0.4,
                friction: 0.3
            });
        }
        
        World.add(world, body);
        
        // 清理超出边界的物体
        setTimeout(() => {
            if (body.position.y > height + 100) {
                World.remove(world, body);
            }
        }, 10000);
    };
    
    // 每隔一段时间添加新物体
    setInterval(addFallingObject, 1000);
    
    // 初始添加一些物体
    for (let i = 0; i < 5; i++) {
        setTimeout(addFallingObject, i * 200);
    }
}

/**
 * 弹跳球效果
 */
function setupBouncingEffect() {
    const width = render.options.width;
    const height = render.options.height;
    
    // 创建边界（高弹性）
    const boundaries = [
        Bodies.rectangle(width / 2, height - 5, width, 10, { 
            isStatic: true, 
            render: { fillStyle: '#6366f1' },
            restitution: 0.9
        }),
        Bodies.rectangle(width / 2, 5, width, 10, { 
            isStatic: true, 
            render: { fillStyle: '#6366f1' },
            restitution: 0.9
        }),
        Bodies.rectangle(5, height / 2, 10, height, { 
            isStatic: true, 
            render: { fillStyle: '#6366f1' },
            restitution: 0.9
        }),
        Bodies.rectangle(width - 5, height / 2, 10, height, { 
            isStatic: true, 
            render: { fillStyle: '#6366f1' },
            restitution: 0.9
        })
    ];
    
    World.add(world, boundaries);
    
    // 创建高弹性球
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    for (let i = 0; i < 8; i++) {
        const ball = Bodies.circle(
            50 + Math.random() * (width - 100),
            50 + Math.random() * (height - 100),
            15 + Math.random() * 15,
            {
                render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
                restitution: 0.9,
                friction: 0.001,
                frictionAir: 0.01
            }
        );
        
        // 给球一个初始速度
        Body.setVelocity(ball, {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
        });
        
        World.add(world, ball);
    }
}

/**
 * 连锁反应效果
 */
function setupChainEffect() {
    const width = render.options.width;
    const height = render.options.height;
    
    // 创建地面
    const ground = Bodies.rectangle(width / 2, height - 10, width, 20, { 
        isStatic: true,
        render: { fillStyle: '#6366f1' }
    });
    
    World.add(world, ground);
    
    // 创建多米诺骨牌
    const dominoColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    for (let i = 0; i < 15; i++) {
        const domino = Bodies.rectangle(
            100 + i * 40,
            height - 60,
            8,
            50,
            {
                render: { fillStyle: dominoColors[i % dominoColors.length] },
                friction: 0.8,
                frictionStatic: 1
            }
        );
        World.add(world, domino);
    }
    
    // 创建推动球
    const pusher = Bodies.circle(50, height - 100, 20, {
        render: { fillStyle: '#e74c3c' },
        restitution: 0.8
    });
    
    // 给推动球一个初始速度
    Body.setVelocity(pusher, { x: 8, y: 0 });
    
    World.add(world, pusher);
    
    // 定期重置
    setTimeout(() => {
        resetWorld();
    }, 15000);
}

/**
 * 摆锤效果
 */
function setupPendulumEffect() {
    const width = render.options.width;
    const height = render.options.height;
    
    // 创建多个摆锤
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
    
    for (let i = 0; i < 6; i++) {
        const x = 100 + i * 120;
        const pendulumLength = 150 + Math.random() * 100;
        
        // 摆锤支点
        const anchor = Bodies.circle(x, 50, 5, { 
            isStatic: true,
            render: { fillStyle: '#6366f1' }
        });
        
        // 摆锤球
        const pendulumBob = Bodies.circle(x, 50 + pendulumLength, 15 + Math.random() * 10, {
            render: { fillStyle: colors[i % colors.length] },
            frictionAir: 0.02
        });
        
        // 连接绳
        const constraint = Constraint.create({
            bodyA: anchor,
            bodyB: pendulumBob,
            length: pendulumLength,
            stiffness: 0.9,
            render: {
                strokeStyle: '#6366f1',
                lineWidth: 2
            }
        });
        
        // 给摆锤一个初始角度
        Body.setPosition(pendulumBob, {
            x: x + Math.random() * 100 - 50,
            y: 50 + pendulumLength
        });
        
        World.add(world, [anchor, pendulumBob, constraint]);
    }
}

/**
 * 爆炸效果
 */
function setupExplosionEffect() {
    const width = render.options.width;
    const height = render.options.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 创建边界
    const boundaries = [
        Bodies.rectangle(width / 2, height - 5, width, 10, { 
            isStatic: true, 
            render: { fillStyle: '#6366f1' }
        }),
        Bodies.rectangle(5, height / 2, 10, height, { 
            isStatic: true, 
            render: { fillStyle: '#6366f1' }
        }),
        Bodies.rectangle(width - 5, height / 2, 10, height, { 
            isStatic: true, 
            render: { fillStyle: '#6366f1' }
        })
    ];
    
    World.add(world, boundaries);
    
    // 创建爆炸粒子
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#e17055'];
    
    for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2;
        const distance = 20 + Math.random() * 50;
        const size = 5 + Math.random() * 10;
        
        const particle = Bodies.circle(
            centerX + Math.cos(angle) * distance,
            centerY + Math.sin(angle) * distance,
            size,
            {
                render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
                restitution: 0.7,
                friction: 0.1,
                frictionAir: 0.02
            }
        );
        
        // 给粒子爆炸速度
        const force = 0.02 + Math.random() * 0.03;
        Body.setVelocity(particle, {
            x: Math.cos(angle) * force * 100,
            y: Math.sin(angle) * force * 100
        });
        
        World.add(world, particle);
    }
    
    // 定期重新爆炸
    setInterval(() => {
        if (currentEffect === 'explosion') {
            resetWorld();
            setTimeout(() => {
                if (currentEffect === 'explosion') {
                    setupExplosionEffect();
                }
            }, 100);
        }
    }, 8000);
}

/**
 * 漂浮气泡效果
 */
function setupFloatingEffect() {
    const width = render.options.width;
    const height = render.options.height;
    
    // 设置向上的重力
    engine.world.gravity.y = -0.3;
    
    // 创建顶部边界
    const ceiling = Bodies.rectangle(width / 2, 10, width, 20, { 
        isStatic: true,
        render: { fillStyle: '#6366f1' }
    });
    const leftWall = Bodies.rectangle(10, height / 2, 20, height, { 
        isStatic: true,
        render: { fillStyle: '#6366f1' }
    });
    const rightWall = Bodies.rectangle(width - 10, height / 2, 20, height, { 
        isStatic: true,
        render: { fillStyle: '#6366f1' }
    });
    
    World.add(world, [ceiling, leftWall, rightWall]);
    
    // 定期从底部添加气泡
    const addBubble = () => {
        const colors = ['#74b9ff', '#0984e3', '#00cec9', '#55efc4', '#81ecec'];
        const x = 50 + Math.random() * (width - 100);
        const size = 10 + Math.random() * 15;
        
        const bubble = Bodies.circle(x, height + 30, size, {
            render: { 
                fillStyle: colors[Math.floor(Math.random() * colors.length)],
                strokeStyle: '#ffffff',
                lineWidth: 1
            },
            restitution: 0.8,
            friction: 0.001,
            frictionAir: 0.03,
            density: 0.0005 // 很轻，容易漂浮
        });
        
        World.add(world, bubble);
        
        // 清理超出边界的气泡
        setTimeout(() => {
            if (bubble.position.y < -100) {
                World.remove(world, bubble);
            }
        }, 15000);
    };
    
    // 每隔一段时间添加新气泡
    setInterval(() => {
        if (currentEffect === 'floating') {
            addBubble();
        }
    }, 1500);
    
    // 初始添加一些气泡
    for (let i = 0; i < 8; i++) {
        setTimeout(addBubble, i * 300);
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
 * 添加随机物体
 */
function addRandomObjects() {
    if (!world || !isRunning) return;
    
    const width = render.options.width;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
    
    for (let i = 0; i < 3; i++) {
        const x = 50 + Math.random() * (width - 100);
        const y = 50;
        const size = 10 + Math.random() * 20;
        
        const shape = Math.random() < 0.5 ? 'circle' : 'rectangle';
        let body;
        
        if (shape === 'circle') {
            body = Bodies.circle(x, y, size, {
                render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
                restitution: 0.6 + Math.random() * 0.3
            });
        } else {
            body = Bodies.rectangle(x, y, size * 2, size * 2, {
                render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
                restitution: 0.4 + Math.random() * 0.4
            });
        }
        
        World.add(world, body);
    }
}

/**
 * 重置世界
 */
function resetWorld() {
    if (currentEffect && isRunning) {
        loadEffect(currentEffect);
    }
}

/**
 * 显示错误信息
 */
function showError(message) {
    const container = document.getElementById('matter-container');
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

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 加载完成，开始初始化...');
    setTimeout(initDemo, 500);
});

// 页面卸载时清理资源
window.addEventListener('beforeunload', () => {
    stopEngine();
});

// 暴露一些函数到全局作用域供调试使用
window.MatterDemo = {
    loadEffect,
    resetWorld,
    addRandomObjects,
    effectConfigs,
    currentEffect: () => currentEffect
};
