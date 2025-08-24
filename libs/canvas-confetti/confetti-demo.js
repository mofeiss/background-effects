/**
 * Canvas Confetti 演示脚本
 * 实现多种彩带庆祝效果
 */

// 效果配置定义
const effectConfigs = [
    {
        id: 'classic-burst',
        name: '爆炸式彩带',
        description: '经典的爆炸式彩带庆祝效果',
        trigger: () => classicBurst()
    },
    {
        id: 'confetti-rain',
        name: '彩带雨',
        description: '从天而降的彩带雨效果',
        trigger: () => confettiRain()
    },
    {
        id: 'fireworks',
        name: '烟花爆炸',
        description: '模拟烟花爆炸的多点彩带效果',
        trigger: () => fireworks()
    },
    {
        id: 'rainbow-celebration',
        name: '彩虹庆祝',
        description: '彩虹色彩的多层次庆祝效果',
        trigger: () => rainbowCelebration()
    },
    {
        id: 'heart-celebration',
        name: '心形庆祝',
        description: '心形图案的特殊庆祝效果',
        trigger: () => heartCelebration()
    },
    {
        id: 'gold-coins',
        name: '金币喷洒',
        description: '模拟金币撒落的奢华庆祝效果',
        trigger: () => goldCoins()
    }
];

// 全局变量
let currentEffect = null;
let autoTriggerInterval = null;
let intensity = 50;

/**
 * 初始化 Canvas Confetti 演示
 */
async function initConfettiDemo() {
    try {
        // 确保 confetti 函数已加载
        if (typeof confetti === 'undefined') {
            throw new Error('Canvas Confetti 库未加载');
        }

        // 创建效果切换器
        window.effectSwitcher = new EffectSwitcher();
        
        // 初始化切换器
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadConfettiEffect(effect);
        });

        // 设置自动触发
        startAutoTrigger();
        
        // 绑定手动触发事件
        setupManualTrigger();

        console.log('Canvas Confetti 演示初始化完成');

    } catch (error) {
        console.error('初始化 Canvas Confetti 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 加载指定的 Canvas Confetti 效果
 * @param {Object} effect - 效果配置对象
 */
async function loadConfettiEffect(effect) {
    try {
        currentEffect = effect;
        
        // 立即触发一次效果演示
        effect.trigger();
        
        console.log(`已加载效果: ${effect.name}`);

    } catch (error) {
        console.error('加载 Canvas Confetti 效果失败:', error);
        throw error;
    }
}

/**
 * 设置自动触发
 */
function startAutoTrigger() {
    clearAutoTrigger();
    autoTriggerInterval = setInterval(() => {
        if (currentEffect) {
            currentEffect.trigger();
        }
    }, 4000); // 每4秒自动触发一次
}

/**
 * 清除自动触发
 */
function clearAutoTrigger() {
    if (autoTriggerInterval) {
        clearInterval(autoTriggerInterval);
        autoTriggerInterval = null;
    }
}

/**
 * 设置手动触发事件
 */
function setupManualTrigger() {
    // 绑定回车键手动触发
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' && currentEffect) {
            e.preventDefault();
            currentEffect.trigger();
        }
    });
    
    // 绑定鼠标点击触发（点击Canvas区域）
    const container = document.getElementById('confetti-container');
    if (container) {
        container.addEventListener('click', () => {
            if (currentEffect) {
                currentEffect.trigger();
            }
        });
        
        // 添加视觉提示
        container.style.cursor = 'pointer';
        container.setAttribute('title', '点击触发庆祝效果');
    }
}

// 效果实现函数

/**
 * 经典爆炸式彩带
 */
function classicBurst() {
    const particleCount = Math.floor(intensity * 2);
    
    confetti({
        particleCount: particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    });
}

/**
 * 彩带雨效果
 */
function confettiRain() {
    const particleCount = Math.floor(intensity * 1.5);
    
    // 创建多次小爆炸模拟雨的效果
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            confetti({
                particleCount: Math.floor(particleCount / 10),
                startVelocity: 30,
                spread: 360,
                ticks: 100,
                origin: {
                    x: Math.random(),
                    y: Math.random() - 0.2
                },
                colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
            });
        }, i * 100);
    }
}

/**
 * 烟花爆炸效果
 */
function fireworks() {
    const particleCount = Math.floor(intensity * 1.8);
    
    // 多个爆炸点模拟烟花
    const explosions = [
        { x: 0.25, y: 0.3 },
        { x: 0.75, y: 0.3 },
        { x: 0.5, y: 0.2 },
        { x: 0.2, y: 0.5 },
        { x: 0.8, y: 0.5 }
    ];
    
    explosions.forEach((pos, index) => {
        setTimeout(() => {
            confetti({
                particleCount: Math.floor(particleCount / 3),
                spread: 100,
                startVelocity: 45,
                origin: pos,
                colors: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b',
                    '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'
                ]
            });
        }, index * 200);
    });
}

/**
 * 彩虹庆祝效果
 */
function rainbowCelebration() {
    const particleCount = Math.floor(intensity * 2.5);
    
    // 彩虹色彩的分层爆炸
    const rainbowColors = [
        ['#ff0000', '#ff4500', '#ff8c00'],  // 红橙
        ['#ffff00', '#9acd32', '#00ff00'],  // 黄绿
        ['#00ffff', '#0080ff', '#0000ff'],  // 青蓝
        ['#8000ff', '#ff00ff', '#ff1493']   // 紫粉
    ];
    
    rainbowColors.forEach((colors, index) => {
        setTimeout(() => {
            confetti({
                particleCount: Math.floor(particleCount / 4),
                spread: 90,
                startVelocity: 40,
                origin: { 
                    x: 0.2 + (index * 0.2), 
                    y: 0.4 + (index % 2) * 0.2 
                },
                colors: colors
            });
        }, index * 150);
    });
}

/**
 * 心形庆祝效果
 */
function heartCelebration() {
    const particleCount = Math.floor(intensity * 1.5);
    
    // 心形图案的效果
    confetti({
        particleCount: particleCount,
        spread: 40,
        startVelocity: 35,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ff69b4', '#ff1493', '#dc143c', '#b22222', '#ff6347'],
        shapes: ['heart', 'circle'],
        scalar: 1.2
    });
    
    // 添加额外的心形粒子
    setTimeout(() => {
        confetti({
            particleCount: Math.floor(particleCount / 2),
            spread: 60,
            startVelocity: 25,
            origin: { x: 0.3, y: 0.6 },
            colors: ['#ffb6c1', '#ffc0cb', '#ff69b4'],
            shapes: ['heart']
        });
    }, 200);
    
    setTimeout(() => {
        confetti({
            particleCount: Math.floor(particleCount / 2),
            spread: 60,
            startVelocity: 25,
            origin: { x: 0.7, y: 0.6 },
            colors: ['#ffb6c1', '#ffc0cb', '#ff69b4'],
            shapes: ['heart']
        });
    }, 400);
}

/**
 * 金币喷洒效果
 */
function goldCoins() {
    const particleCount = Math.floor(intensity * 2);
    
    // 金币效果
    confetti({
        particleCount: particleCount,
        spread: 50,
        startVelocity: 40,
        origin: { y: 0.4 },
        colors: ['#ffd700', '#ffff00', '#ffa500', '#ff8c00', '#daa520'],
        shapes: ['circle'],
        scalar: 0.8,
        gravity: 1.2,
        drift: 0.1
    });
    
    // 添加闪烁效果
    setTimeout(() => {
        confetti({
            particleCount: Math.floor(particleCount / 3),
            spread: 100,
            startVelocity: 30,
            origin: { x: 0.2, y: 0.2 },
            colors: ['#fff700', '#ffef00', '#gold'],
            shapes: ['star', 'circle'],
            scalar: 0.6
        });
    }, 300);
    
    setTimeout(() => {
        confetti({
            particleCount: Math.floor(particleCount / 3),
            spread: 100,
            startVelocity: 30,
            origin: { x: 0.8, y: 0.2 },
            colors: ['#fff700', '#ffef00', '#gold'],
            shapes: ['star', 'circle'],
            scalar: 0.6
        });
    }, 500);
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initConfettiDemo();
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    clearAutoTrigger();
});
