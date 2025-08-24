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
    },
    {
        id: 'matrix-rain',
        name: '黑客矩阵',
        description: '仿黑客帝国矩阵雨的绿色数字效果',
        trigger: () => matrixRain()
    },
    {
        id: 'space-wormhole',
        name: '宇宙虫洞',
        description: '模拟穿越宇宙虫洞的星光拖尾效果',
        trigger: () => spaceWormhole()
    },
    {
        id: 'dragon-breath',
        name: '龙息火焰',
        description: '模拟龙吐火的炽热火焰粒子效果',
        trigger: () => dragonBreath()
    },
    {
        id: 'quantum-explosion',
        name: '量子爆炸',
        description: '科幻感十足的量子粒子爆炸效果',
        trigger: () => quantumExplosion()
    },
    {
        id: 'galaxy-spiral',
        name: '星系漩涡',
        description: '螺旋星系形状的宇宙级庆祝效果',
        trigger: () => galaxySpiral()
    },
    {
        id: 'candy-shower',
        name: '糖果雨',
        description: '五颜六色的糖果从天而降',
        trigger: () => candyShower()
    },
    {
        id: 'emoji-festival',
        name: '表情节',
        description: '各种表情符号的欢乐庆祝',
        trigger: () => emojiFestival()
    },
    {
        id: 'lightning-storm',
        name: '雷电风暴',
        description: '模拟雷电闪烁的强烈视觉冲击',
        trigger: () => lightningStorm()
    },
    {
        id: 'aurora-dance',
        name: '极光舞蹈',
        description: '模拟北极光舞蹈的绚烂效果',
        trigger: () => auroraDance()
    },
    {
        id: 'pixel-explosion',
        name: '像素爆炸',
        description: '8位像素风格的复古爆炸效果',
        trigger: () => pixelExplosion()
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
 * 黑客矩阵效果
 */
function matrixRain() {
    const particleCount = Math.floor(intensity * 3);
    
    // 绿色矩阵字符
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            confetti({
                particleCount: Math.floor(particleCount / 15),
                startVelocity: 20,
                spread: 10,
                angle: 270, // 向下
                origin: { x: 0.1 + (i * 0.05), y: 0 },
                colors: ['#00ff00', '#00cc00', '#008800', '#00ff41', '#39ff14'],
                shapes: ['square'],
                scalar: 0.4,
                gravity: 0.5,
                drift: 0
            });
        }, i * 100);
    }
    
    // 添加数字字符效果
    setTimeout(() => {
        confetti({
            particleCount: particleCount / 4,
            startVelocity: 15,
            spread: 180,
            angle: 270,
            origin: { y: -0.1 },
            colors: ['#00ff00', '#39ff14'],
            shapes: ['square'],
            scalar: 0.3,
            gravity: 0.3
        });
    }, 800);
}

/**
 * 宇宙虫洞效果
 */
function spaceWormhole() {
    const particleCount = Math.floor(intensity * 2.5);
    
    // 创建螺旋虫洞效果
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const angle = (i * 30) % 360;
            confetti({
                particleCount: Math.floor(particleCount / 12),
                startVelocity: 60,
                spread: 15,
                angle: angle,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#ffffff', '#ccccff', '#9999ff', '#6666ff', '#0000ff', '#000099'],
                shapes: ['circle'],
                scalar: 0.6,
                gravity: 0.1,
                drift: Math.cos(angle * Math.PI / 180) * 0.1
            });
        }, i * 80);
    }
    
    // 中心爆炸
    setTimeout(() => {
        confetti({
            particleCount: particleCount / 3,
            startVelocity: 80,
            spread: 360,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ffffff', '#e6e6ff', '#ccccff'],
            shapes: ['star', 'circle'],
            scalar: 1.2,
            gravity: 0.2
        });
    }, 1000);
}

/**
 * 龙息火焰效果
 */
function dragonBreath() {
    const particleCount = Math.floor(intensity * 2.8);
    
    // 火焰从多个点喷出
    const breathPoints = [
        { x: 0.2, y: 0.8 },
        { x: 0.5, y: 0.9 },
        { x: 0.8, y: 0.8 }
    ];
    
    breathPoints.forEach((point, index) => {
        setTimeout(() => {
            // 主火焰
            confetti({
                particleCount: Math.floor(particleCount / 3),
                startVelocity: 70,
                spread: 45,
                angle: 45 + (index * 30),
                origin: point,
                colors: ['#ff4500', '#ff6347', '#ff0000', '#dc143c', '#b22222', '#8b0000'],
                shapes: ['circle'],
                scalar: 0.8,
                gravity: -0.3, // 向上浮
                drift: Math.random() * 0.2 - 0.1
            });
            
            // 火花
            setTimeout(() => {
                confetti({
                    particleCount: Math.floor(particleCount / 6),
                    startVelocity: 40,
                    spread: 80,
                    angle: 60 + (index * 20),
                    origin: { x: point.x, y: point.y - 0.1 },
                    colors: ['#ffd700', '#ffff00', '#ff8c00'],
                    shapes: ['star', 'circle'],
                    scalar: 0.4,
                    gravity: 0.8
                });
            }, 200);
        }, index * 150);
    });
}

/**
 * 量子爆炸效果
 */
function quantumExplosion() {
    const particleCount = Math.floor(intensity * 3);
    
    // 第一层：电子云
    confetti({
        particleCount: particleCount / 3,
        startVelocity: 100,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#00ffff', '#0080ff', '#4169e1', '#1e90ff'],
        shapes: ['circle'],
        scalar: 0.3,
        gravity: 0.1,
        drift: 0.2
    });
    
    // 第二层：质子束
    setTimeout(() => {
        for (let i = 0; i < 8; i++) {
            const angle = i * 45;
            confetti({
                particleCount: Math.floor(particleCount / 16),
                startVelocity: 80,
                spread: 5,
                angle: angle,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#ff00ff', '#ff69b4', '#da70d6'],
                shapes: ['square'],
                scalar: 0.5,
                gravity: 0.05
            });
        }
    }, 200);
    
    // 第三层：能量波
    setTimeout(() => {
        confetti({
            particleCount: particleCount / 2,
            startVelocity: 120,
            spread: 360,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ffffff', '#f0f8ff', '#e6e6fa'],
            shapes: ['star'],
            scalar: 1.5,
            gravity: 0.3
        });
    }, 400);
}

/**
 * 星系漩涡效果
 */
function galaxySpiral() {
    const particleCount = Math.floor(intensity * 2.2);
    
    // 创建螺旋臂
    for (let arm = 0; arm < 3; arm++) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const spiralAngle = (arm * 120) + (i * 15);
                const distance = 0.1 + (i * 0.05);
                const x = 0.5 + Math.cos(spiralAngle * Math.PI / 180) * distance;
                const y = 0.5 + Math.sin(spiralAngle * Math.PI / 180) * distance;
                
                confetti({
                    particleCount: Math.floor(particleCount / 24),
                    startVelocity: 30 + (i * 5),
                    spread: 20,
                    angle: spiralAngle + 90,
                    origin: { x, y },
                    colors: ['#ffffff', '#fffacd', '#f0e68c', '#dda0dd', '#9370db'],
                    shapes: ['star', 'circle'],
                    scalar: 0.7,
                    gravity: 0.02,
                    drift: Math.cos(spiralAngle * Math.PI / 180) * 0.05
                });
            }, (arm * 100) + (i * 50));
        }
    }
    
    // 星系核心
    setTimeout(() => {
        confetti({
            particleCount: particleCount / 4,
            startVelocity: 60,
            spread: 360,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ffff00', '#ffd700', '#ff8c00'],
            shapes: ['star'],
            scalar: 1.0,
            gravity: 0.1
        });
    }, 1200);
}

/**
 * 糖果雨效果
 */
function candyShower() {
    const particleCount = Math.floor(intensity * 2);
    
    // 各种糖果颜色
    const candyColors = [
        ['#ff69b4', '#ff1493', '#dc143c'], // 粉红系
        ['#00ff00', '#32cd32', '#228b22'], // 绿色系
        ['#ffd700', '#ffff00', '#ffa500'], // 黄色系
        ['#00bfff', '#1e90ff', '#0000ff'], // 蓝色系
        ['#9370db', '#8a2be2', '#4b0082']  // 紫色系
    ];
    
    // 从不同位置下糖果雨
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const colorSet = candyColors[Math.floor(Math.random() * candyColors.length)];
            confetti({
                particleCount: Math.floor(particleCount / 12),
                startVelocity: 25,
                spread: 30,
                angle: 270,
                origin: { x: Math.random(), y: -0.1 },
                colors: colorSet,
                shapes: ['circle', 'square'],
                scalar: 0.9,
                gravity: 1.5,
                drift: (Math.random() - 0.5) * 0.1
            });
        }, i * 150);
    }
    
    // 特殊糖果爆炸
    setTimeout(() => {
        confetti({
            particleCount: particleCount / 3,
            startVelocity: 50,
            spread: 120,
            origin: { x: 0.5, y: 0.7 },
            colors: ['#ff69b4', '#00ff00', '#ffd700', '#00bfff', '#9370db'],
            shapes: ['star'],
            scalar: 1.3,
            gravity: 0.8
        });
    }, 2000);
}

/**
 * 表情节效果
 */
function emojiFestival() {
    const particleCount = Math.floor(intensity * 2.5);
    
    // 模拟不同表情的颜色组合
    const emojiColors = [
        ['#ffff00', '#ffd700'], // 开心（黄色）
        ['#ff69b4', '#ff1493'], // 爱心（粉色）
        ['#32cd32', '#00ff00'], // 惊讶（绿色）
        ['#ff4500', '#ff0000'], // 愤怒（红色）
        ['#1e90ff', '#00bfff'], // 伤心（蓝色）
        ['#9370db', '#8a2be2']  // 神秘（紫色）
    ];
    
    // 表情雨
    emojiColors.forEach((colors, index) => {
        setTimeout(() => {
            confetti({
                particleCount: Math.floor(particleCount / 6),
                startVelocity: 40,
                spread: 60,
                angle: 270,
                origin: { x: 0.1 + (index * 0.15), y: 0 },
                colors: colors,
                shapes: ['circle'],
                scalar: 1.2,
                gravity: 1.0,
                drift: (Math.random() - 0.5) * 0.2
            });
        }, index * 200);
    });
    
    // 表情爆炸中心
    setTimeout(() => {
        confetti({
            particleCount: particleCount / 2,
            startVelocity: 70,
            spread: 360,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ffff00', '#ff69b4', '#32cd32', '#ff4500', '#1e90ff', '#9370db'],
            shapes: ['heart', 'star', 'circle'],
            scalar: 1.5,
            gravity: 0.6
        });
    }, 1500);
}

/**
 * 雷电风暴效果
 */
function lightningStorm() {
    const particleCount = Math.floor(intensity * 3.5);
    
    // 闪电效果（快速连续爆炸）
    const lightningStrikes = [
        { x: 0.2, y: 0.1 },
        { x: 0.8, y: 0.15 },
        { x: 0.5, y: 0.05 },
        { x: 0.3, y: 0.2 },
        { x: 0.7, y: 0.1 }
    ];
    
    lightningStrikes.forEach((strike, index) => {
        setTimeout(() => {
            // 主闪电
            confetti({
                particleCount: Math.floor(particleCount / 10),
                startVelocity: 100,
                spread: 15,
                angle: 270,
                origin: strike,
                colors: ['#ffffff', '#e6e6ff', '#ccccff', '#9999ff'],
                shapes: ['square'],
                scalar: 0.3,
                gravity: 0.8,
                drift: (Math.random() - 0.5) * 0.3
            });
            
            // 电光效果
            setTimeout(() => {
                confetti({
                    particleCount: Math.floor(particleCount / 15),
                    startVelocity: 80,
                    spread: 45,
                    angle: 225 + (Math.random() * 90),
                    origin: { x: strike.x, y: strike.y + 0.1 },
                    colors: ['#ffff00', '#ffffff', '#e6e6ff'],
                    shapes: ['star'],
                    scalar: 0.8,
                    gravity: 0.5
                });
            }, 50);
        }, index * 120);
    });
    
    // 雷声效果（大爆炸）
    setTimeout(() => {
        confetti({
            particleCount: particleCount / 2,
            startVelocity: 120,
            spread: 360,
            origin: { x: 0.5, y: 0.3 },
            colors: ['#ffffff', '#ffff00', '#e6e6ff'],
            shapes: ['star', 'circle'],
            scalar: 1.8,
            gravity: 0.4
        });
    }, 800);
}

/**
 * 极光舞蹈效果
 */
function auroraDance() {
    const particleCount = Math.floor(intensity * 2.8);
    
    // 极光色彩
    const auroraColors = [
        ['#00ff00', '#32cd32', '#7fff00'], // 绿色极光
        ['#ff69b4', '#ff1493', '#da70d6'], // 粉色极光
        ['#00bfff', '#1e90ff', '#87ceeb'], // 蓝色极光
        ['#9370db', '#8a2be2', '#dda0dd']  // 紫色极光
    ];
    
    // 波浪形极光
    for (let wave = 0; wave < 4; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const x = i * 0.1;
                    const y = 0.3 + Math.sin(x * Math.PI * 2) * 0.2;
                    
                    confetti({
                        particleCount: Math.floor(particleCount / 40),
                        startVelocity: 30,
                        spread: 25,
                        angle: 45 + Math.sin(x * Math.PI) * 30,
                        origin: { x, y },
                        colors: auroraColors[wave],
                        shapes: ['circle'],
                        scalar: 1.0,
                        gravity: -0.1, // 向上漂浮
                        drift: Math.sin(x * Math.PI) * 0.1
                    });
                }, i * 50);
            }
        }, wave * 300);
    }
    
    // 极光高潮
    setTimeout(() => {
        confetti({
            particleCount: particleCount / 2,
            startVelocity: 60,
            spread: 180,
            angle: 90,
            origin: { x: 0.5, y: 0.8 },
            colors: ['#00ff00', '#ff69b4', '#00bfff', '#9370db'],
            shapes: ['star', 'circle'],
            scalar: 1.5,
            gravity: -0.2,
            drift: 0
        });
    }, 1500);
}

/**
 * 像素爆炸效果
 */
function pixelExplosion() {
    const particleCount = Math.floor(intensity * 3);
    
    // 8位像素色彩
    const pixelColors = [
        '#ff0000', '#00ff00', '#0000ff',    // RGB 三原色
        '#ffff00', '#ff00ff', '#00ffff',    // CMY 三原色
        '#ffffff', '#000000', '#808080',    // 灰度
        '#ffa500', '#800080', '#008000'     // 其他经典色
    ];
    
    // 像素块爆炸（方形）
    for (let layer = 0; layer < 5; layer++) {
        setTimeout(() => {
            confetti({
                particleCount: Math.floor(particleCount / 5),
                startVelocity: 60 + (layer * 15),
                spread: 72,
                angle: 90,
                origin: { x: 0.5, y: 0.5 },
                colors: pixelColors,
                shapes: ['square'],
                scalar: 0.8 + (layer * 0.2),
                gravity: 0.8,
                drift: 0
            });
        }, layer * 100);
    }
    
    // 像素字符效果
    setTimeout(() => {
        const positions = [
            { x: 0.2, y: 0.4 }, { x: 0.4, y: 0.3 }, { x: 0.6, y: 0.4 }, { x: 0.8, y: 0.3 }
        ];
        
        positions.forEach((pos, index) => {
            setTimeout(() => {
                confetti({
                    particleCount: Math.floor(particleCount / 8),
                    startVelocity: 40,
                    spread: 30,
                    angle: 90,
                    origin: pos,
                    colors: pixelColors.slice(0, 6), // 使用前6种颜色
                    shapes: ['square'],
                    scalar: 0.6,
                    gravity: 1.2
                });
            }, index * 150);
        });
    }, 800);
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
