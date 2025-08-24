/**
 * tsParticles 演示脚本
 * 提供五种不同的粒子效果配置
 */

// 全局变量
let tsParticlesInstance = null;

// 效果配置定义
const effectConfigs = [
    {
        id: 'links',
        name: '粒子连线',
        description: '经典的粒子连线效果，展示粒子之间的连接关系',
        config: {
            background: {
                color: {
                    value: '#0f172a'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: '#6366f1'
                },
                links: {
                    color: '#6366f1',
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce'
                    },
                    random: false,
                    speed: 2,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 1, max: 5 }
                }
            },
            detectRetina: true
        }
    },
    {
        id: 'fireworks',
        name: '烟花效果',
        description: '绚烂的烟花粒子效果，展示爆炸和发射效果',
        config: {
            background: {
                color: {
                    value: '#000014'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    push: {
                        quantity: 10
                    }
                }
            },
            particles: {
                color: {
                    value: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'out'
                    },
                    random: true,
                    speed: 10,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 0
                },
                opacity: {
                    value: 1,
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 0,
                        startValue: 'max',
                        destroy: 'min'
                    }
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 2, max: 4 }
                },
                life: {
                    duration: {
                        sync: false,
                        value: 3
                    },
                    count: 1
                }
            },
            detectRetina: true,
            emitters: [
                {
                    direction: 'top',
                    life: {
                        count: 0,
                        duration: 0.1,
                        delay: 0.1
                    },
                    rate: {
                        delay: 0.15,
                        quantity: 1
                    },
                    size: {
                        width: 100,
                        height: 0
                    },
                    position: {
                        y: 100,
                        x: 50
                    }
                }
            ]
        }
    },
    {
        id: 'stars',
        name: '星空背景',
        description: '模拟夜空中的星星，提供静谧的宇宙背景效果',
        config: {
            background: {
                color: {
                    value: '#0d1421'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: 'bubble'
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 250,
                        duration: 2,
                        opacity: 0.8,
                        size: 0
                    }
                }
            },
            particles: {
                color: {
                    value: ['#ffffff', '#ffeaa7', '#74b9ff', '#a29bfe', '#fd79a8']
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'out'
                    },
                    random: true,
                    speed: 0.3,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 300
                },
                opacity: {
                    value: { min: 0.1, max: 1 },
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 0.5, max: 2 },
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.5,
                        sync: false
                    }
                }
            },
            detectRetina: true
        }
    },
    {
        id: 'bubbles',
        name: '泡泡动画',
        description: '可爱的泡泡上升效果，营造轻松愉快的氛围',
        config: {
            background: {
                color: {
                    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: ['#ffffff', '#e0e6ff', '#c7d2fe', '#a5b4fc', '#8b5cf6']
                },
                move: {
                    direction: 'top',
                    enable: true,
                    outModes: {
                        default: 'out'
                    },
                    random: false,
                    speed: { min: 1, max: 3 },
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 50
                },
                opacity: {
                    value: { min: 0.3, max: 0.7 },
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 10, max: 50 },
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 10,
                        sync: false
                    }
                },
                stroke: {
                    color: '#ffffff',
                    width: 1,
                    opacity: 0.3
                }
            },
            detectRetina: true
        }
    },
    {
        id: 'geometry',
        name: '几何图形',
        description: '各种几何形状的粒子动画，展示图形的多样性',
        config: {
            background: {
                color: {
                    value: '#1a1a2e'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'grab'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 0.8
                        }
                    },
                    push: {
                        quantity: 4
                    }
                }
            },
            particles: {
                color: {
                    value: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']
                },
                links: {
                    color: '#ffffff',
                    distance: 120,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce'
                    },
                    random: false,
                    speed: 1.5,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 60
                },
                opacity: {
                    value: 0.8
                },
                shape: {
                    type: ['circle', 'triangle', 'square', 'polygon'],
                    options: {
                        polygon: {
                            sides: 6
                        }
                    }
                },
                size: {
                    value: { min: 5, max: 15 },
                    animation: {
                        enable: true,
                        speed: 3,
                        minimumValue: 5,
                        sync: false
                    }
                },
                rotate: {
                    value: { min: 0, max: 360 },
                    direction: 'random',
                    animation: {
                        enable: true,
                        speed: 2,
                        sync: false
                    }
                }
            },
            detectRetina: true
        }
    }
];

/**
 * 初始化 tsParticles 演示
 */
async function initTsParticlesDemo() {
    try {
        // 确保 tsParticles 库已加载
        if (typeof tsParticles === 'undefined') {
            throw new Error('tsParticles 库未加载');
        }

        // 创建效果切换器
        window.effectSwitcher = new EffectSwitcher();
        
        // 初始化切换器
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadTsParticlesEffect(effect);
        });

        console.log('tsParticles 演示初始化完成');

    } catch (error) {
        console.error('初始化 tsParticles 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 加载指定的 tsParticles 效果
 * @param {Object} effect - 效果配置对象
 */
async function loadTsParticlesEffect(effect) {
    try {
        const container = document.getElementById('tsparticles-container');
        if (!container) {
            throw new Error('找不到 tsParticles 容器');
        }

        // 如果已有实例，先销毁
        if (tsParticlesInstance) {
            tsParticlesInstance.destroy();
            tsParticlesInstance = null;
        }

        // 清空容器
        container.innerHTML = '';

        // 添加短暂延迟以确保容器被正确清理
        await new Promise(resolve => setTimeout(resolve, 100));

        // 加载新效果
        tsParticlesInstance = await tsParticles.load('tsparticles-container', effect.config);
        
        if (!tsParticlesInstance) {
            throw new Error('创建 tsParticles 实例失败');
        }

        console.log(`已加载效果: ${effect.name}`);

    } catch (error) {
        console.error('加载 tsParticles 效果失败:', error);
        throw error;
    }
}

/**
 * 显示初始化错误
 * @param {string} message - 错误信息
 */
function showInitError(message) {
    const container = document.getElementById('tsparticles-container');
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
    if (tsParticlesInstance) {
        tsParticlesInstance.destroy();
        tsParticlesInstance = null;
    }
    
    if (window.effectSwitcher) {
        window.effectSwitcher.destroy();
        window.effectSwitcher = null;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initTsParticlesDemo);

// 页面卸载时清理资源
window.addEventListener('beforeunload', cleanup);

// 页面可见性变化时处理（优化性能）
document.addEventListener('visibilitychange', () => {
    if (tsParticlesInstance) {
        if (document.hidden) {
            // 页面隐藏时暂停动画
            tsParticlesInstance.pause();
        } else {
            // 页面显示时恢复动画
            tsParticlesInstance.play();
        }
    }
});

// 导出配置供调试使用
window.tsParticlesConfigs = effectConfigs;
