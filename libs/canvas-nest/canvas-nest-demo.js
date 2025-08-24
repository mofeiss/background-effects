/**
 * Canvas Nest 演示脚本（简化实现）
 * 模拟 Canvas Nest 的连线粒子效果
 */

// 全局变量
let canvas, ctx;
let particles = [];
let animationId;

// 效果配置
const effectConfigs = [
    { id: 'default', name: '默认效果', color: '#6366f1', count: 80, speed: 1 },
    { id: 'colorful', name: '彩色连线', color: 'rainbow', count: 60, speed: 1.2 },
    { id: 'dense', name: '密集粒子', color: '#8b5cf6', count: 120, speed: 0.8 },
    { id: 'slow', name: '慢速动画', color: '#10b981', count: 50, speed: 0.5 },
    { id: 'interactive', name: '交互增强', color: '#f59e0b', count: 70, speed: 1.5 }
];

let currentConfig = effectConfigs[0];
let mouse = { x: null, y: null };

/**
 * 初始化 Canvas Nest 演示
 */
async function initCanvasNestDemo() {
    try {
        setupCanvas();
        
        window.effectSwitcher = new EffectSwitcher();
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadCanvasNestEffect(effect);
        });

        console.log('Canvas Nest 演示初始化完成');
    } catch (error) {
        console.error('初始化 Canvas Nest 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 设置 canvas
 */
function setupCanvas() {
    canvas = document.getElementById('canvas-nest-canvas');
    ctx = canvas.getContext('2d');
    
    const container = document.getElementById('canvas-nest-container');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // 鼠标事件
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // 窗口大小变化
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initParticles();
    });
}

/**
 * 粒子类
 */
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2 * currentConfig.speed;
        this.vy = (Math.random() - 0.5) * 2 * currentConfig.speed;
        this.size = Math.random() * 3 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // 边界检测
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // 保持在画布内
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.getColor();
        ctx.fill();
    }
    
    getColor() {
        if (currentConfig.color === 'rainbow') {
            const hue = (this.x + this.y) % 360;
            return `hsl(${hue}, 70%, 60%)`;
        }
        return currentConfig.color;
    }
}

/**
 * 初始化粒子
 */
function initParticles() {
    particles = [];
    for (let i = 0; i < currentConfig.count; i++) {
        particles.push(new Particle());
    }
}

/**
 * 绘制连线
 */
function drawConnections() {
    ctx.strokeStyle = currentConfig.color === 'rainbow' ? '#ffffff' : currentConfig.color;
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.globalAlpha = 1 - distance / 100;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        // 与鼠标的连线
        if (mouse.x !== null && mouse.y !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.globalAlpha = 1 - distance / 150;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    
    ctx.globalAlpha = 1;
}

/**
 * 动画循环
 */
function animate() {
    animationId = requestAnimationFrame(animate);
    
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 更新和绘制粒子
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // 绘制连线
    drawConnections();
}

/**
 * 加载效果
 */
async function loadCanvasNestEffect(effect) {
    try {
        currentConfig = effect;
        
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        initParticles();
        animate();
        
        console.log(`已加载效果: ${effect.name}`);
    } catch (error) {
        console.error('加载 Canvas Nest 效果失败:', error);
        throw error;
    }
}

/**
 * 显示初始化错误
 */
function showInitError(message) {
    const container = document.getElementById('canvas-nest-container');
    if (container) {
        container.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: var(--text-secondary);
            ">
                <h3 style="color: var(--danger-color); margin-bottom: 1rem;">初始化失败</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">
                    重新加载
                </button>
            </div>
        `;
    }
}

/**
 * 清理资源
 */
function cleanup() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    if (window.effectSwitcher) {
        window.effectSwitcher.destroy();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initCanvasNestDemo);

// 页面卸载时清理资源
window.addEventListener('beforeunload', cleanup);

// 页面可见性变化时处理
document.addEventListener('visibilitychange', () => {
    if (document.hidden && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    } else if (!document.hidden && !animationId) {
        animate();
    }
});

// 导出配置供调试使用
window.canvasNestConfigs = effectConfigs;
