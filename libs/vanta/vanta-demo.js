/**
 * Vanta.js 演示脚本
 * 提供五种不同的 3D 背景效果
 */

// 全局变量
let vantaInstance = null;

// 效果配置定义
const effectConfigs = [
    {
        id: 'waves',
        name: '波浪效果',
        description: '3D 波浪起伏效果，营造海洋般的动态背景',
        config: {
            el: '#vanta-container',
            color: 0x6366f1,
            waveHeight: 20,
            waveSpeed: 1.0,
            zoom: 0.75
        }
    },
    {
        id: 'clouds',
        name: '云朵飘动',
        description: '3D 云朵漂浮效果，创造天空般的背景氛围',
        config: {
            el: '#vanta-container',
            skyColor: 0x68b8d7,
            cloudColor: 0xadc1de,
            cloudShadowColor: 0x183550,
            sunColor: 0xff9919,
            sunGlareColor: 0xff6633,
            sunlightColor: 0xff9933,
            speed: 1
        }
    },
    {
        id: 'net',
        name: '网格动画',
        description: '3D 网络节点连接效果，展示科技感的数据网络',
        config: {
            el: '#vanta-container',
            color: 0x6366f1,
            backgroundColor: 0x0f172a,
            points: 10.00,
            maxDistance: 23.00,
            spacing: 17.00
        }
    },
    {
        id: 'birds',
        name: '鸟群飞行',
        description: '3D 鸟群飞行效果，模拟自然界的鸟类群体行为',
        config: {
            el: '#vanta-container',
            backgroundColor: 0x0f172a,
            color1: 0x6366f1,
            color2: 0x8b5cf6,
            birdSize: 1.00,
            wingSpan: 32.00,
            speedLimit: 8.00,
            separation: 42.00,
            alignment: 24.00,
            cohesion: 4.00,
            quantity: 3.00
        }
    },
    {
        id: 'halo',
        name: '光晕效果',
        description: '3D 光晕粒子效果，创造梦幻般的光影背景',
        config: {
            el: '#vanta-container',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            baseColor: 0x6366f1,
            backgroundColor: 0x0f172a,
            amplitudeFactor: 1.00,
            xOffset: 0.13,
            yOffset: 0.17,
            size: 1.7
        }
    }
];

/**
 * 初始化 Vanta.js 演示
 */
async function initVantaDemo() {
    try {
        // 检查依赖是否加载
        if (typeof THREE === 'undefined') {
            throw new Error('Three.js 库未加载');
        }
        
        if (typeof VANTA === 'undefined') {
            throw new Error('Vanta.js 库未加载');
        }

        // 创建效果切换器
        window.effectSwitcher = new EffectSwitcher();
        
        // 初始化切换器
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadVantaEffect(effect);
        });

        console.log('Vanta.js 演示初始化完成');

    } catch (error) {
        console.error('初始化 Vanta.js 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 加载指定的 Vanta.js 效果
 * @param {Object} effect - 效果配置对象
 */
async function loadVantaEffect(effect) {
    try {
        // 如果已有实例，先销毁
        if (vantaInstance) {
            vantaInstance.destroy();
            vantaInstance = null;
        }

        // 清空容器
        const container = document.getElementById('vanta-container');
        if (!container) {
            throw new Error('找不到 Vanta 容器');
        }

        // 添加短暂延迟以确保容器被正确清理
        await new Promise(resolve => setTimeout(resolve, 100));

        // 根据效果类型创建对应的 Vanta 实例
        switch (effect.id) {
            case 'waves':
                if (!VANTA.WAVES) throw new Error('Vanta WAVES 效果未加载');
                vantaInstance = VANTA.WAVES(effect.config);
                break;
            case 'clouds':
                if (!VANTA.CLOUDS) throw new Error('Vanta CLOUDS 效果未加载');
                vantaInstance = VANTA.CLOUDS(effect.config);
                break;
            case 'net':
                if (!VANTA.NET) throw new Error('Vanta NET 效果未加载');
                vantaInstance = VANTA.NET(effect.config);
                break;
            case 'birds':
                if (!VANTA.BIRDS) throw new Error('Vanta BIRDS 效果未加载');
                vantaInstance = VANTA.BIRDS(effect.config);
                break;
            case 'halo':
                if (!VANTA.HALO) throw new Error('Vanta HALO 效果未加载');
                vantaInstance = VANTA.HALO(effect.config);
                break;
            default:
                throw new Error(`未知的 Vanta 效果: ${effect.id}`);
        }
        
        if (!vantaInstance) {
            throw new Error('创建 Vanta 实例失败');
        }

        console.log(`已加载效果: ${effect.name}`);

    } catch (error) {
        console.error('加载 Vanta 效果失败:', error);
        
        // 如果特定效果加载失败，尝试加载默认的波浪效果
        if (effect.id !== 'waves' && VANTA.WAVES) {
            console.log('尝试加载默认波浪效果...');
            try {
                vantaInstance = VANTA.WAVES({
                    el: '#vanta-container',
                    color: 0x6366f1,
                    waveHeight: 15,
                    waveSpeed: 0.8,
                    zoom: 1
                });
            } catch (fallbackError) {
                console.error('加载默认效果也失败:', fallbackError);
            }
        }
        
        throw error;
    }
}

/**
 * 显示初始化错误
 * @param {string} message - 错误信息
 */
function showInitError(message) {
    const container = document.getElementById('vanta-container');
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
    if (vantaInstance) {
        vantaInstance.destroy();
        vantaInstance = null;
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
    if (vantaInstance && vantaInstance.resize) {
        vantaInstance.resize();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initVantaDemo);

// 页面卸载时清理资源
window.addEventListener('beforeunload', cleanup);

// 页面可见性变化时处理（优化性能）
document.addEventListener('visibilitychange', () => {
    if (vantaInstance) {
        if (document.hidden) {
            // 页面隐藏时，如果 Vanta 支持暂停，则暂停
            if (vantaInstance.pause) {
                vantaInstance.pause();
            }
        } else {
            // 页面显示时，如果 Vanta 支持恢复，则恢复
            if (vantaInstance.play) {
                vantaInstance.play();
            }
        }
    }
});

// 窗口大小变化时处理
window.addEventListener('resize', handleResize);

// 导出配置供调试使用
window.vantaConfigs = effectConfigs;
