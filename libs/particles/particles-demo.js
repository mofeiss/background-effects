/**
 * Particles.js 演示脚本
 * 提供五种不同的粒子效果配置
 */

// 全局变量
let currentParticlesConfig = null;

// 效果配置定义
const effectConfigs = [
    {
        id: 'default',
        name: '默认效果',
        description: '经典的粒子连线效果，简洁优雅',
        config: {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6366f1"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6366f1",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        }
    },
    {
        id: 'nasa',
        name: 'NASA 风格',
        description: '深空探索风格的粒子效果',
        config: {
            "particles": {
                "number": {
                    "value": 160,
                    "density": {
                        "enable": false
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 1,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 250,
                        "size": 0,
                        "duration": 2,
                        "opacity": 0,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 400,
                        "duration": 0.4
                    }
                }
            },
            "retina_detect": true
        }
    },
    {
        id: 'snow',
        name: '雪花飘落',
        description: '温柔的雪花飘落效果',
        config: {
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#fff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.7,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "bottom",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    }
                }
            },
            "retina_detect": true
        }
    },
    {
        id: 'bubbles',
        name: '气泡上升',
        description: '海底气泡上浮的效果',
        config: {
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#3b82f6", "#06b6d4", "#0891b2"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 1,
                        "color": "#ffffff"
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 20,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 5,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "top",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 100,
                        "size": 40,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 150,
                        "duration": 0.4
                    }
                }
            },
            "retina_detect": true
        }
    },
    {
        id: 'nyan-cat',
        name: '连线网络',
        description: '密集的粒子连线网络效果',
        config: {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": false
                    }
                },
                "color": {
                    "value": "#6366f1"
                },
                "shape": {
                    "type": "triangle"
                },
                "opacity": {
                    "value": 1,
                    "random": false
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8b5cf6",
                    "opacity": 1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        }
    },
    {
        id: 'stars',
        name: '星空背景',
        description: '模拟夜空中的星星',
        config: {
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.8,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2,
                    "random": true
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 0.3,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 250,
                        "size": 0,
                        "duration": 2,
                        "opacity": 0,
                        "speed": 3
                    }
                }
            },
            "retina_detect": true
        }
    },
    {
        id: 'geometry',
        name: '几何图形',
        description: '多种几何形状的粒子',
        config: {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"]
                },
                "shape": {
                    "type": ["circle", "triangle", "edge", "polygon"],
                    "polygon": {
                        "nb_sides": 6
                    }
                },
                "opacity": {
                    "value": 0.8,
                    "random": false
                },
                "size": {
                    "value": 8,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 120,
                    "color": "#ffffff",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "bounce",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "push": {
                        "particles_nb": 3
                    }
                }
            },
            "retina_detect": true
        }
    }
];

/**
 * 初始化 Particles.js 演示
 */
async function initParticlesDemo() {
    try {
        // 确保 particlesJS 函数已加载
        if (typeof particlesJS === 'undefined') {
            throw new Error('Particles.js 库未加载');
        }

        // 创建效果切换器
        window.effectSwitcher = new EffectSwitcher();
        
        // 初始化切换器
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadParticlesEffect(effect);
        });

        console.log('Particles.js 演示初始化完成');

    } catch (error) {
        console.error('初始化 Particles.js 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 加载指定的 Particles.js 效果
 * @param {Object} effect - 效果配置对象
 */
async function loadParticlesEffect(effect) {
    try {
        const container = document.getElementById('particles-container');
        if (!container) {
            throw new Error('找不到 Particles 容器');
        }

        // 清空容器内容
        container.innerHTML = '';

        // 设置容器样式
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        
        // 创建 div 元素（Particles.js 需要 div 而不是 canvas）
        const particlesDiv = document.createElement('div');
        particlesDiv.id = 'particles-js';
        particlesDiv.style.width = '100%';
        particlesDiv.style.height = '100%';
        particlesDiv.style.position = 'absolute';
        particlesDiv.style.top = '0';
        particlesDiv.style.left = '0';
        container.appendChild(particlesDiv);

        // 添加短暂延迟以确保 DOM 已准备好
        await new Promise(resolve => setTimeout(resolve, 50));

        // 加载 particles.js 效果
        particlesJS('particles-js', effect.config);
        
        // 保存当前配置
        currentParticlesConfig = effect.config;

        console.log(`已加载效果: ${effect.name}`);

    } catch (error) {
        console.error('加载 Particles.js 效果失败:', error);
        throw error;
    }
}

/**
 * 显示初始化错误
 * @param {string} message - 错误信息
 */
function showInitError(message) {
    const container = document.getElementById('particles-container');
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
    // Particles.js 没有显式的销毁方法，但我们可以清理 DOM
    const canvas = document.getElementById('particles-js');
    if (canvas) {
        canvas.remove();
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
    // Particles.js 会自动处理窗口大小变化
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        const pJS = window.pJSDom[0].pJS;
        if (pJS.fn && pJS.fn.canvasSize) {
            pJS.fn.canvasSize();
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initParticlesDemo);

// 页面卸载时清理资源
window.addEventListener('beforeunload', cleanup);

// 页面可见性变化时处理（优化性能）
document.addEventListener('visibilitychange', () => {
    // Particles.js 的动画会在页面隐藏时自动暂停
});

// 窗口大小变化时处理
window.addEventListener('resize', handleResize);

// 导出配置供调试使用
window.particlesConfigs = effectConfigs;
