/**
 * Granim.js 演示脚本
 * 提供五种不同的渐变动画效果
 */

// 全局变量
let granimInstance = null;

// 效果配置定义
const effectConfigs = [
    {
        id: 'basic',
        name: '基础渐变',
        description: '简单的线性渐变过渡效果',
        config: {
            element: '#granim-canvas',
            direction: 'left-right',
            isPausedWhenNotInView: true,
            states: {
                "default-state": {
                    gradients: [
                        ['#667eea', '#764ba2'],
                        ['#f093fb', '#f5576c'],
                        ['#4facfe', '#00f2fe'],
                        ['#43e97b', '#38f9d7']
                    ],
                    transitionSpeed: 2000
                }
            }
        }
    },
    {
        id: 'dynamic',
        name: '动态色彩',
        description: '多色彩动态变化的渐变效果',
        config: {
            element: '#granim-canvas',
            direction: 'diagonal',
            isPausedWhenNotInView: true,
            states: {
                "default-state": {
                    gradients: [
                        ['#ff9a9e', '#fecfef', '#fecfef'],
                        ['#ffecd2', '#fcb69f'],
                        ['#ff8a80', '#ea6100'],
                        ['#667eea', '#764ba2'],
                        ['#f093fb', '#f5576c']
                    ],
                    transitionSpeed: 1500
                }
            }
        }
    },
    {
        id: 'radial',
        name: '径向渐变',
        description: '从中心向外扩散的径向渐变效果',
        config: {
            element: '#granim-canvas',
            direction: 'radial',
            isPausedWhenNotInView: true,
            states: {
                "default-state": {
                    gradients: [
                        ['#6a11cb', '#2575fc'],
                        ['#37ecba', '#72afd3'],
                        ['#ebbba7', '#cfc7f8'],
                        ['#fff1eb', '#ace0f9']
                    ],
                    transitionSpeed: 3000
                }
            }
        }
    },
    {
        id: 'wave',
        name: '波浪效果',
        description: '模拟波浪起伏的渐变动画',
        config: {
            element: '#granim-canvas',
            direction: 'top-bottom',
            isPausedWhenNotInView: true,
            states: {
                "default-state": {
                    gradients: [
                        ['#0052D4', '#4364F7', '#6FB1FC'],
                        ['#5433FF', '#20BDFF', '#A5FECB'],
                        ['#667eea', '#764ba2'],
                        ['#f8cdda', '#1e3c72']
                    ],
                    transitionSpeed: 2500,
                    loop: true
                }
            }
        }
    },
    {
        id: 'rainbow',
        name: '彩虹循环',
        description: '彩虹色彩的循环渐变效果',
        config: {
            element: '#granim-canvas',
            direction: 'left-right',
            isPausedWhenNotInView: true,
            states: {
                "default-state": {
                    gradients: [
                        ['#ff0000', '#ff8000'],  // 红到橙
                        ['#ff8000', '#ffff00'],  // 橙到黄
                        ['#ffff00', '#80ff00'],  // 黄到黄绿
                        ['#80ff00', '#00ff00'],  // 黄绿到绿
                        ['#00ff00', '#00ff80'],  // 绿到青绿
                        ['#00ff80', '#00ffff'],  // 青绿到青
                        ['#00ffff', '#0080ff'],  // 青到蓝青
                        ['#0080ff', '#0000ff'],  // 蓝青到蓝
                        ['#0000ff', '#8000ff'],  // 蓝到紫蓝
                        ['#8000ff', '#ff00ff'],  // 紫蓝到紫
                        ['#ff00ff', '#ff0080'],  // 紫到品红
                        ['#ff0080', '#ff0000']   // 品红到红
                    ],
                    transitionSpeed: 1000
                }
            }
        }
    }
];

/**
 * 初始化 Granim.js 演示
 */
async function initGranimDemo() {
    try {
        // 确保 Granim 库已加载
        if (typeof Granim === 'undefined') {
            throw new Error('Granim 库未加载');
        }

        // 设置 canvas 尺寸
        setupCanvas();

        // 创建效果切换器
        window.effectSwitcher = new EffectSwitcher();
        
        // 初始化切换器
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadGranimEffect(effect);
        });

        console.log('Granim.js 演示初始化完成');

    } catch (error) {
        console.error('初始化 Granim.js 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 设置 canvas 尺寸
 */
function setupCanvas() {
    const canvas = document.getElementById('granim-canvas');
    const container = document.getElementById('granim-container');
    
    if (canvas && container) {
        // 设置 canvas 尺寸匹配容器
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
}

/**
 * 加载指定的 Granim 效果
 * @param {Object} effect - 效果配置对象
 */
async function loadGranimEffect(effect) {
    try {
        // 如果已有实例，先销毁
        if (granimInstance) {
            granimInstance.destroy();
            granimInstance = null;
        }

        // 短暂延迟确保清理完成
        await new Promise(resolve => setTimeout(resolve, 100));

        // 创建新的 Granim 实例
        granimInstance = new Granim(effect.config);

        console.log(`已加载效果: ${effect.name}`);

    } catch (error) {
        console.error('加载 Granim 效果失败:', error);
        throw error;
    }
}

/**
 * 显示初始化错误
 * @param {string} message - 错误信息
 */
function showInitError(message) {
    const container = document.getElementById('granim-container');
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
                <button 
                    onclick="location.reload()" 
                    class="btn btn-primary" 
                    style="margin-top: 1rem;"
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
    if (granimInstance) {
        granimInstance.destroy();
        granimInstance = null;
    }
    
    if (window.effectSwitcher) {
        window.effectSwitcher.destroy();
        window.effectSwitcher = null;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initGranimDemo);

// 页面卸载时清理资源
window.addEventListener('beforeunload', cleanup);

// 页面可见性变化时处理
document.addEventListener('visibilitychange', () => {
    if (granimInstance) {
        if (document.hidden) {
            granimInstance.pause();
        } else {
            granimInstance.play();
        }
    }
});

// 导出配置供调试使用
window.granimConfigs = effectConfigs;
