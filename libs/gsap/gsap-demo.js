// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);

// 效果配置数组 - 适配base-switcher.js
const effectConfigs = [
    // 文字动画效果 (0-2)
    { id: 'typewriter', name: '文字打字机', category: 'text' },
    { id: 'text-split', name: '文字分裂', category: 'text' },
    { id: 'text-wave', name: '文字波浪', category: 'text' },
    
    // 位移动画效果 (3-5)
    { id: 'bounce', name: '位移弹跳', category: 'motion' },
    { id: 'rotate-scale', name: '旋转缩放', category: 'motion' },
    { id: 'path-motion', name: '路径动画', category: 'motion' },
    
    // SVG动画效果 (6-8)
    { id: 'svg-draw', name: 'SVG描边', category: 'svg' },
    { id: 'svg-morph', name: 'SVG变形', category: 'svg' },
    { id: 'path-follow', name: '路径跟随', category: 'svg' },
    
    // 滚动动画效果 (9-11)
    { id: 'scroll-parallax', name: '滚动视差', category: 'scroll' },
    { id: 'scroll-pin', name: '滚动固定', category: 'scroll' },
    { id: 'scroll-trigger', name: '滚动触发', category: 'scroll' },
    
    // 高级效果 (12-15)
    { id: 'timeline', name: '时间轴组合', category: 'advanced' },
    { id: 'elastic', name: '弹性动画', category: 'advanced' },
    { id: 'particles', name: '粒子系统', category: 'advanced' },
    { id: '3d-transform', name: '3D变换', category: 'advanced' }
];

// 全局变量
let currentAnimation = null;
let effectSwitcher = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化效果切换器
    effectSwitcher = new EffectSwitcher();
    effectSwitcher.init(effectConfigs, switchEffect);
    
    // 设置全局引用供键盘控制使用
    window.effectSwitcher = effectSwitcher;
});

// 效果切换回调函数
async function switchEffect(effectConfig) {
    const container = document.getElementById('gsap-container');
    
    // 停止当前动画
    if (currentAnimation) {
        currentAnimation.kill();
        currentAnimation = null;
    }
    
    // 清除ScrollTrigger
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // 清空容器
    container.innerHTML = '';
    
    // 根据效果ID调用对应的创建函数
    switch(effectConfig.id) {
        case 'typewriter':
            currentAnimation = createTypewriterEffect(container);
            break;
        case 'text-split':
            currentAnimation = createTextSplitEffect(container);
            break;
        case 'text-wave':
            currentAnimation = createTextWaveEffect(container);
            break;
        case 'bounce':
            currentAnimation = createBounceEffect(container);
            break;
        case 'rotate-scale':
            currentAnimation = createRotateScaleEffect(container);
            break;
        case 'path-motion':
            currentAnimation = createPathMotionEffect(container);
            break;
        case 'svg-draw':
            currentAnimation = createSVGDrawEffect(container);
            break;
        case 'svg-morph':
            currentAnimation = createSVGMorphEffect(container);
            break;
        case 'path-follow':
            currentAnimation = createPathFollowEffect(container);
            break;
        case 'scroll-parallax':
            currentAnimation = createScrollParallaxEffect(container);
            break;
        case 'scroll-pin':
            currentAnimation = createScrollPinEffect(container);
            break;
        case 'scroll-trigger':
            currentAnimation = createScrollTriggerEffect(container);
            break;
        case 'timeline':
            currentAnimation = createTimelineEffect(container);
            break;
        case 'elastic':
            currentAnimation = createElasticEffect(container);
            break;
        case 'particles':
            currentAnimation = createParticleEffect(container);
            break;
        case '3d-transform':
            currentAnimation = create3DTransformEffect(container);
            break;
        default:
            console.warn('未知效果:', effectConfig.id);
    }
}

// ===================== 文字动画效果 =====================

// 打字机效果
function createTypewriterEffect(container) {
    container.innerHTML = '<div class="text-demo" id="typewriterText">GSAP 让动画变得简单</div>';
    
    const text = document.getElementById('typewriterText');
    const originalText = text.textContent;
    text.textContent = '';
    
    return gsap.to(text, {
        duration: 2,
        text: {
            value: originalText,
            delimiter: ''
        },
        ease: "none"
    });
}

// 文字分裂效果
function createTextSplitEffect(container) {
    container.innerHTML = `
        <div class="split-text" id="splitText">
            <div class="word">GSAP</div>
            <div class="word">动画</div>
            <div class="word">展示</div>
        </div>
    `;
    
    // 将每个字符包装到span中
    const words = container.querySelectorAll('.word');
    words.forEach(word => {
        const text = word.textContent;
        word.innerHTML = text.split('').map(char => `<span style="display: inline-block;">${char}</span>`).join('');
    });
    
    const chars = container.querySelectorAll('.word span');
    
    gsap.set(chars, { y: 100, opacity: 0 });
    
    return gsap.to(chars, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });
}

// 文字波浪效果
function createTextWaveEffect(container) {
    container.innerHTML = '<div class="text-demo" id="waveText">GSAP WAVE ANIMATION</div>';
    
    const text = document.getElementById('waveText');
    const chars = text.textContent.split('').map(char => `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    text.innerHTML = chars;
    
    const charElements = text.querySelectorAll('span');
    
    const tl = gsap.timeline({ repeat: -1 });
    
    charElements.forEach((char, i) => {
        tl.to(char, {
            duration: 0.5,
            y: -30,
            ease: "power2.out"
        }, i * 0.1)
        .to(char, {
            duration: 0.5,
            y: 0,
            ease: "power2.in"
        }, i * 0.1 + 0.5);
    });
    
    return tl;
}

// ===================== 位移动画效果 =====================

// 弹跳效果
function createBounceEffect(container) {
    container.innerHTML = `
        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; align-items: center; height: 100%;">
            <div class="element-demo" id="bounce1"></div>
            <div class="element-demo" id="bounce2"></div>
            <div class="element-demo" id="bounce3"></div>
        </div>
    `;
    
    const elements = container.querySelectorAll('.element-demo');
    
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    elements.forEach((el, i) => {
        tl.to(el, {
            duration: 1,
            y: -100,
            ease: "bounce.out"
        }, i * 0.2);
    });
    
    return tl;
}

// 旋转缩放效果
function createRotateScaleEffect(container) {
    container.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <div class="element-demo" id="rotateScale" style="width: 150px; height: 150px;"></div>
        </div>
    `;
    
    const element = document.getElementById('rotateScale');
    
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(element, {
        duration: 2,
        rotation: 360,
        scale: 1.5,
        ease: "power2.inOut"
    })
    .to(element, {
        duration: 2,
        rotation: 720,
        scale: 0.5,
        ease: "power2.inOut"
    })
    .to(element, {
        duration: 2,
        rotation: 1080,
        scale: 1,
        ease: "power2.inOut"
    });
    
    return tl;
}

// 路径动画效果
function createPathMotionEffect(container) {
    container.innerHTML = `
        <div style="position: relative; height: 100%; display: flex; align-items: center; justify-content: center;">
            <svg width="400" height="300" viewBox="0 0 400 300" style="max-width: 100%; height: auto;">
                <path id="motionPath" d="M50,150 Q200,50 350,150 Q200,250 50,150" 
                      stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none"/>
                <circle id="pathFollower" cx="50" cy="150" r="15" fill="#ff6b6b"/>
            </svg>
        </div>
    `;
    
    const follower = container.querySelector('#pathFollower');
    const path = container.querySelector('#motionPath');
    
    return gsap.to(follower, {
        duration: 4,
        repeat: -1,
        ease: "none",
        motionPath: {
            path: path,
            autoRotate: false
        }
    });
}

// ===================== SVG动画效果 =====================

// SVG描边效果
function createSVGDrawEffect(container) {
    container.innerHTML = `
        <div class="svg-container">
            <svg width="400" height="300" viewBox="0 0 400 300" style="max-width: 100%; height: auto;">
                <path class="draw-me" d="M50,150 L150,50 L250,150 L350,50" stroke="#fff" stroke-width="3" fill="none"/>
                <circle class="draw-me" cx="100" cy="200" r="30" stroke="#fff" stroke-width="3" fill="none"/>
                <rect class="draw-me" x="200" y="170" width="60" height="60" stroke="#fff" stroke-width="3" fill="none"/>
            </svg>
        </div>
    `;
    
    const drawElements = container.querySelectorAll('.draw-me');
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    // 设置初始状态
    drawElements.forEach(element => {
        const length = element.getTotalLength();
        gsap.set(element, { 
            strokeDasharray: length, 
            strokeDashoffset: length 
        });
    });
    
    drawElements.forEach((element, i) => {
        tl.to(element, {
            duration: 2,
            strokeDashoffset: 0,
            ease: "power2.inOut"
        }, i * 0.5);
    });
    
    return tl;
}

// SVG变形效果
function createSVGMorphEffect(container) {
    container.innerHTML = `
        <div class="svg-container">
            <svg width="300" height="300" viewBox="0 0 300 300" style="max-width: 100%; height: auto;">
                <path id="morphShape" d="M150,50 L250,150 L150,250 L50,150 Z" fill="#ff6b6b" stroke="#4ecdc4" stroke-width="3"/>
            </svg>
        </div>
    `;
    
    const shape = container.querySelector('#morphShape');
    
    const shapes = [
        "M150,50 L250,150 L150,250 L50,150 Z", // 菱形
        "M150,75 A75,75 0 1,1 149,75", // 圆形
        "M50,50 L250,50 L250,250 L50,250 Z", // 正方形
        "M150,50 L200,100 L250,150 L200,200 L150,250 L100,200 L50,150 L100,100 Z" // 八边形
    ];
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    
    shapes.forEach((pathData, i) => {
        tl.to(shape, {
            duration: 1.5,
            attr: { d: pathData },
            ease: "power2.inOut"
        });
    });
    
    return tl;
}

// 路径跟随效果
function createPathFollowEffect(container) {
    container.innerHTML = `
        <div style="position: relative; height: 100%; display: flex; align-items: center; justify-content: center;">
            <svg width="500" height="400" viewBox="0 0 500 400" style="max-width: 100%; height: auto;">
                <path id="followPath" d="M50,200 Q150,50 250,200 T450,200" 
                      stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none"/>
                <g id="followerGroup">
                    <circle cx="0" cy="0" r="8" fill="#ff6b6b"/>
                    <circle cx="0" cy="0" r="15" fill="rgba(255,107,107,0.3)"/>
                </g>
            </svg>
        </div>
    `;
    
    const followerGroup = container.querySelector('#followerGroup');
    const path = container.querySelector('#followPath');
    
    return gsap.to(followerGroup, {
        duration: 5,
        repeat: -1,
        ease: "none",
        motionPath: {
            path: path,
            autoRotate: true,
            rotationOffset: 90
        }
    });
}

// ===================== 滚动动画效果 =====================

// 滚动视差效果
function createScrollParallaxEffect(container) {
    container.innerHTML = `
        <div style="height: 200vh; position: relative;">
            <div style="position: sticky; top: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <div id="parallaxLayer1" style="position: absolute; top: 20%; left: 10%; width: 100px; height: 100px; 
                     background: #ff6b6b; border-radius: 50%;"></div>
                <div id="parallaxLayer2" style="position: absolute; top: 60%; right: 10%; width: 80px; height: 80px; 
                     background: #4ecdc4; border-radius: 50%;"></div>
                <div style="color: var(--text-primary); font-size: 1.5rem; text-align: center;">滚动查看视差效果</div>
            </div>
        </div>
    `;
    
    const layer1 = container.querySelector('#parallaxLayer1');
    const layer2 = container.querySelector('#parallaxLayer2');
    
    // 创建滚动触发器
    gsap.to(layer1, {
        y: -200,
        scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
    
    gsap.to(layer2, {
        y: -100,
        x: -100,
        rotation: 360,
        scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
        }
    });
    
    return gsap.timeline();
}

// 滚动固定效果
function createScrollPinEffect(container) {
    container.innerHTML = `
        <div style="height: 300vh;">
            <div id="pinSection" style="height: 100vh; display: flex; align-items: center; justify-content: center; 
                 background: var(--card-background); backdrop-filter: blur(10px);">
                <div id="pinContent" style="text-align: center; color: var(--text-primary);">
                    <h2 style="font-size: 3rem; margin-bottom: 20px;">固定区域</h2>
                    <p style="font-size: 1.2rem;">此区域在滚动时会被固定</p>
                </div>
            </div>
            <div style="height: 100vh; display: flex; align-items: center; justify-content: center; 
                 background: rgba(0,0,0,0.3);">
                <h3 style="font-size: 2rem; color: var(--text-primary);">继续滚动的内容</h3>
            </div>
        </div>
    `;
    
    const pinSection = container.querySelector('#pinSection');
    const pinContent = container.querySelector('#pinContent');
    
    // 固定效果
    ScrollTrigger.create({
        trigger: pinSection,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: false
    });
    
    // 内容动画
    gsap.to(pinContent, {
        scale: 1.2,
        rotation: 360,
        scrollTrigger: {
            trigger: pinSection,
            start: "top top",
            end: "+=200%",
            scrub: 1
        }
    });
    
    return gsap.timeline();
}

// 滚动触发效果
function createScrollTriggerEffect(container) {
    container.innerHTML = `
        <div style="height: 200vh;">
            <div style="height: 50vh; display: flex; align-items: center; justify-content: center;">
                <h2 style="font-size: 2rem; color: var(--text-primary);">向下滚动查看触发效果</h2>
            </div>
            <div id="triggerBox1" style="width: 200px; height: 200px; background: #ff6b6b; margin: 50px auto; 
                 border-radius: 20px; opacity: 0; transform: translateY(100px);"></div>
            <div id="triggerBox2" style="width: 200px; height: 200px; background: #4ecdc4; margin: 50px auto; 
                 border-radius: 20px; opacity: 0; transform: translateX(-100px);"></div>
            <div id="triggerBox3" style="width: 200px; height: 200px; background: #45b7d1; margin: 50px auto; 
                 border-radius: 20px; opacity: 0; transform: scale(0);"></div>
        </div>
    `;
    
    const boxes = ['#triggerBox1', '#triggerBox2', '#triggerBox3'];
    
    boxes.forEach((box, i) => {
        gsap.to(container.querySelector(box), {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: container.querySelector(box),
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    return gsap.timeline();
}

// ===================== 高级效果 =====================

// 时间轴组合效果
function createTimelineEffect(container) {
    container.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100%; gap: 30px;">
            <div id="tlBox1" class="element-demo" style="background: #ff6b6b;"></div>
            <div id="tlBox2" class="element-demo" style="background: #4ecdc4;"></div>
            <div id="tlBox3" class="element-demo" style="background: #45b7d1;"></div>
        </div>
    `;
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    // 第一阶段：依次放大
    tl.to("#tlBox1", { duration: 0.5, scale: 1.5, ease: "back.out(1.7)" })
      .to("#tlBox2", { duration: 0.5, scale: 1.5, ease: "back.out(1.7)" }, "-=0.2")
      .to("#tlBox3", { duration: 0.5, scale: 1.5, ease: "back.out(1.7)" }, "-=0.2")
    
    // 第二阶段：同时旋转
      .to("#tlBox1, #tlBox2, #tlBox3", { 
          duration: 1, 
          rotation: 360, 
          ease: "power2.inOut" 
      })
    
    // 第三阶段：移动到中心
      .to("#tlBox1", { duration: 0.8, x: 100, y: 0, ease: "power2.inOut" })
      .to("#tlBox3", { duration: 0.8, x: -100, y: 0, ease: "power2.inOut" }, "-=0.8")
    
    // 第四阶段：重置
      .to("#tlBox1, #tlBox2, #tlBox3", { 
          duration: 1, 
          scale: 1, 
          rotation: 0, 
          x: 0, 
          y: 0, 
          ease: "elastic.out(1, 0.3)" 
      });
    
    return tl;
}

// 弹性动画效果
function createElasticEffect(container) {
    container.innerHTML = `
        <div style="display: flex; justify-content: space-around; align-items: center; height: 100%;">
            <div id="elastic1" class="element-demo" style="background: #ff6b6b;"></div>
            <div id="elastic2" class="element-demo" style="background: #4ecdc4; border-radius: 0;"></div>
            <div id="elastic3" class="element-demo" style="background: #45b7d1; clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
        </div>
    `;
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    tl.to("#elastic1", { 
        duration: 2, 
        y: -150, 
        ease: "elastic.out(1, 0.3)" 
    })
    .to("#elastic2", { 
        duration: 2, 
        rotation: 180, 
        scale: 1.5, 
        ease: "elastic.out(1, 0.5)" 
    }, "-=1.5")
    .to("#elastic3", { 
        duration: 2, 
        x: 100, 
        rotation: 720, 
        ease: "elastic.out(1, 0.2)" 
    }, "-=1.5")
    .to("#elastic1, #elastic2, #elastic3", { 
        duration: 1.5, 
        y: 0, 
        x: 0, 
        rotation: 0, 
        scale: 1, 
        ease: "elastic.out(1, 0.4)" 
    });
    
    return tl;
}

// 粒子系统效果
function createParticleEffect(container) {
    container.innerHTML = `
        <div id="particleContainer" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
            <div id="particleCenter" style="position: absolute; top: 50%; left: 50%; width: 20px; height: 20px; 
                 background: #fff; border-radius: 50%; transform: translate(-50%, -50%);"></div>
        </div>
    `;
    
    const particleContainer = container.querySelector('#particleContainer');
    const particles = [];
    
    // 创建粒子
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 2}px;
            height: ${Math.random() * 8 + 2}px;
            background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)]};
            border-radius: 50%;
            top: 50%;
            left: 50%;
        `;
        particleContainer.appendChild(particle);
        particles.push(particle);
    }
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    particles.forEach((particle, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = Math.random() * 200 + 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        tl.to(particle, {
            duration: 2,
            x: x,
            y: y,
            opacity: 1,
            scale: Math.random() * 1.5 + 0.5,
            ease: "power2.out"
        }, i * 0.02)
        .to(particle, {
            duration: 1.5,
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
            ease: "power2.in"
        }, i * 0.02 + 2);
    });
    
    return tl;
}

// 3D变换效果
function create3DTransformEffect(container) {
    container.innerHTML = `
        <div style="perspective: 1000px; display: flex; justify-content: center; align-items: center; height: 100%;">
            <div id="cube3D" style="width: 200px; height: 200px; position: relative; transform-style: preserve-3d;">
                <div style="position: absolute; width: 100%; height: 100%; background: rgba(255,107,107,0.8); 
                     transform: rotateY(0deg) translateZ(100px);"></div>
                <div style="position: absolute; width: 100%; height: 100%; background: rgba(78,205,196,0.8); 
                     transform: rotateY(90deg) translateZ(100px);"></div>
                <div style="position: absolute; width: 100%; height: 100%; background: rgba(69,183,209,0.8); 
                     transform: rotateY(180deg) translateZ(100px);"></div>
                <div style="position: absolute; width: 100%; height: 100%; background: rgba(150,206,180,0.8); 
                     transform: rotateY(270deg) translateZ(100px);"></div>
                <div style="position: absolute; width: 100%; height: 100%; background: rgba(254,202,87,0.8); 
                     transform: rotateX(90deg) translateZ(100px);"></div>
                <div style="position: absolute; width: 100%; height: 100%; background: rgba(255,159,243,0.8); 
                     transform: rotateX(-90deg) translateZ(100px);"></div>
            </div>
        </div>
    `;
    
    const cube = container.querySelector('#cube3D');
    
    return gsap.to(cube, {
        duration: 8,
        rotationX: 360,
        rotationY: 360,
        scale: 1.2,
        repeat: -1,
        ease: "none"
    });
}

// 添加通用样式
const style = document.createElement('style');
style.textContent = `
    .text-demo {
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        color: var(--text-primary);
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .element-demo {
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        border-radius: 50%;
        margin: 20px;
        display: inline-block;
    }

    .svg-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .split-text {
        font-size: 4rem;
        font-weight: bold;
        text-align: center;
        line-height: 1.2;
        color: var(--text-primary);
        display: flex;
        justify-content: center;
        gap: 2rem;
    }

    @media (max-width: 768px) {
        .text-demo {
            font-size: 2rem;
        }
        
        .split-text {
            font-size: 2.5rem;
            flex-direction: column;
            gap: 1rem;
        }
        
        .element-demo {
            width: 80px;
            height: 80px;
        }
    }
`;
document.head.appendChild(style);