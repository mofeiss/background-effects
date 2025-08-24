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
      zoom: 0.75,
    },
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
      speed: 1,
    },
  },
  {
    id: 'net',
    name: '网格动画',
    description: '3D 网络节点连接效果，展示科技感的数据网络',
    config: {
      el: '#vanta-container',
      color: 0x6366f1,
      backgroundColor: 0x0f172a,
      points: 10.0,
      maxDistance: 23.0,
      spacing: 17.0,
    },
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
      birdSize: 1.0,
      wingSpan: 32.0,
      speedLimit: 8.0,
      separation: 42.0,
      alignment: 24.0,
      cohesion: 4.0,
      quantity: 3.0,
    },
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
      minHeight: 200.0,
      minWidth: 200.0,
      baseColor: 0x6366f1,
      backgroundColor: 0x0f172a,
      amplitudeFactor: 1.0,
      xOffset: 0.13,
      yOffset: 0.17,
      size: 1.7,
    },
  },
  {
    id: 'rings',
    name: '圆环效果',
    description: '3D 旋转圆环效果，营造科幻感的几何背景',
    config: {
      el: '#vanta-container',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0x0f172a,
      color: 0x6366f1,
    },
  },
  {
    id: 'dots',
    name: '点状粒子',
    description: '3D 点状粒子系统，展现动态的点阵效果',
    config: {
      el: '#vanta-container',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0x0f172a,
      color: 0x6366f1,
      color2: 0x8b5cf6,
      size: 3.0,
      spacing: 35.0,
    },
  },
  {
    id: 'rings2',
    name: '圆环2效果',
    description: '3D 双层圆环效果，营造科幻感的几何背景',
    config: {
      el: '#vanta-container',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0x0f172a,
      color: 0x6366f1,
      p5: window.p5,
    },
  },
  {
    id: 'trunk',
    name: '树干效果',
    description: '有机树干分支生长效果，模拟自然的开枝散叶结构',
    config: {
      el: '#vanta-container',
    },
    isCustom: true,
  },
  {
    id: 'topology',
    name: '拓扑网络',
    description: '3D 拓扑网络效果，展现复杂的网络拓扑结构',
    config: {
      el: '#vanta-container',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0x0f172a,
      color: 0x6366f1,
      p5: window.p5,
    },
  },
  {
    id: 'globe',
    name: '地球效果',
    description: '3D 地球球体效果，旋转的星球背景，支持交互',
    config: {
      el: '#vanta-container',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0x0f172a,
      color: 0x6366f1,
      color2: 0x8b5cf6,
    },
  },
  {
    id: 'galaxy',
    name: '银河系',
    description: '模拟银河系螺旋结构，数千颗恒星组成旋转星系',
    config: {
      el: '#vanta-container',
    },
    isCustom: true,
  },
  {
    id: 'aurora',
    name: '北极极光',
    description: '模拟北极光的波动彩色效果，绚烂的天空舞蹈',
    config: {
      el: '#vanta-container',
    },
    isCustom: true,
  },
  {
    id: 'meteors',
    name: '流星雨',
    description: '流星划过夜空的浪漫效果，带有发光尾迹',
    config: {
      el: '#vanta-container',
    },
    isCustom: true,
  },
  {
    id: 'circuit',
    name: '电路板',
    description: '计算机电路板效果，电子信号在线路中流动',
    config: {
      el: '#vanta-container',
    },
    isCustom: true,
  },
  {
    id: 'matrix',
    name: '黑客帝国',
    description: '经典的数字雨效果，绿色代码瀑布般下落',
    config: {
      el: '#vanta-container',
    },
    isCustom: true,
  },
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
    await new Promise((resolve) => setTimeout(resolve, 100));

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
      case 'rings':
        if (!VANTA.RINGS) throw new Error('Vanta RINGS 效果未加载');
        vantaInstance = VANTA.RINGS(effect.config);
        break;
      case 'dots':
        if (!VANTA.DOTS) throw new Error('Vanta DOTS 效果未加载');
        vantaInstance = VANTA.DOTS(effect.config);
        break;
      case 'rings2':
        if (!VANTA.TRUNK) throw new Error('Vanta TRUNK 效果未加载');
        vantaInstance = VANTA.TRUNK(effect.config);
        break;
      case 'trunk':
        // 创建自定义树干效果
        vantaInstance = createCustomTrunkEffect(effect.config);
        break;
      case 'topology':
        if (!VANTA.TOPOLOGY) throw new Error('Vanta TOPOLOGY 效果未加载');
        vantaInstance = VANTA.TOPOLOGY(effect.config);
        break;
      case 'globe':
        if (!VANTA.GLOBE) throw new Error('Vanta GLOBE 效果未加载');
        vantaInstance = VANTA.GLOBE(effect.config);
        break;
      case 'galaxy':
        // 创建银河系效果
        vantaInstance = createGalaxyEffect(effect.config);
        break;
      case 'aurora':
        // 创建北极光效果
        vantaInstance = createAuroraEffect(effect.config);
        break;
      case 'meteors':
        // 创建流星雨效果
        vantaInstance = createMeteorsEffect(effect.config);
        break;
      case 'circuit':
        // 创建电路板效果
        vantaInstance = createCircuitEffect(effect.config);
        break;
      case 'matrix':
        // 创建黑客帝国效果
        vantaInstance = createMatrixEffect(effect.config);
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
          zoom: 1,
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

/**
 * 创建自定义树干效果
 * @param {Object} config - 配置对象
 */
function createCustomTrunkEffect(config) {
  const container = document.querySelector(config.el);
  if (!container) {
    throw new Error('找不到容器元素');
  }

  // 创建canvas
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';

  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let animationId;
  let branches = [];
  let isDestroyed = false;

  // 分支类
  class Branch {
    constructor(startX, startY, endX, endY, depth, thickness) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.depth = depth;
      this.thickness = thickness;
      this.growth = 0;
      this.maxGrowth = 1;
      this.children = [];
      this.color = `hsl(${60 + depth * 15}, ${70 - depth * 5}%, ${50 + depth * 8}%)`;
    }

    update() {
      if (this.growth < this.maxGrowth) {
        this.growth += 0.02;
      }

      // 当主干完全生长后，生成子分支
      if (this.growth >= 1 && this.children.length === 0 && this.depth < 6) {
        this.generateChildren();
      }

      // 更新子分支
      this.children.forEach((child) => child.update());
    }

    generateChildren() {
      if (this.depth >= 6) return;

      const numChildren = Math.random() < 0.7 ? 2 : 3;
      const angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);

      for (let i = 0; i < numChildren; i++) {
        const branchAngle = angle + (Math.random() - 0.5) * Math.PI * 0.6;
        const length = this.getLength() * 0.7 * (0.8 + Math.random() * 0.4);
        const newThickness = this.thickness * 0.8;

        const childEndX = this.endX + Math.cos(branchAngle) * length;
        const childEndY = this.endY + Math.sin(branchAngle) * length;

        this.children.push(new Branch(this.endX, this.endY, childEndX, childEndY, this.depth + 1, newThickness));
      }
    }

    getLength() {
      return Math.sqrt(Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2));
    }

    draw(ctx, time) {
      if (this.growth <= 0) return;

      const currentEndX = this.startX + (this.endX - this.startX) * this.growth;
      const currentEndY = this.startY + (this.endY - this.startY) * this.growth;

      // 添加微妙的摆动
      const swayX = Math.sin(time * 0.001 + this.depth) * (this.depth * 0.5);
      const swayY = Math.cos(time * 0.0008 + this.depth) * (this.depth * 0.3);

      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.thickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 渐变效果
      const gradient = ctx.createLinearGradient(this.startX, this.startY, currentEndX, currentEndY);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, `hsl(${60 + this.depth * 15}, ${70 - this.depth * 5}%, ${30 + this.depth * 5}%)`);
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(this.startX + swayX * 0.5, this.startY + swayY * 0.5);
      ctx.lineTo(currentEndX + swayX, currentEndY + swayY);
      ctx.stroke();

      // 绘制叶子（在末端分支）
      if (this.depth >= 4 && this.growth >= 0.8) {
        this.drawLeaves(ctx, currentEndX + swayX, currentEndY + swayY, time);
      }

      // 绘制子分支
      this.children.forEach((child) => child.draw(ctx, time));
    }

    drawLeaves(ctx, x, y, time) {
      const numLeaves = 2 + Math.floor(Math.random() * 3);

      for (let i = 0; i < numLeaves; i++) {
        const leafAngle = ((Math.PI * 2) / numLeaves) * i + time * 0.001;
        const leafDistance = 5 + Math.random() * 8;
        const leafX = x + Math.cos(leafAngle) * leafDistance;
        const leafY = y + Math.sin(leafAngle) * leafDistance;

        ctx.fillStyle = `hsl(${120 + Math.sin(time * 0.002 + i) * 20}, 70%, 50%)`;
        ctx.beginPath();
        ctx.arc(leafX, leafY, 2 + Math.sin(time * 0.003 + i) * 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function resizeCanvas() {
    if (isDestroyed) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  function initTree() {
    branches = [];
    const centerX = canvas.width / 2;
    const startY = canvas.height - 20;
    const trunkHeight = canvas.height * 0.25;

    // 创建主干
    const mainTrunk = new Branch(centerX, startY, centerX + (Math.random() - 0.5) * 20, startY - trunkHeight, 0, 8);

    branches.push(mainTrunk);
  }

  function animate() {
    if (isDestroyed) return;

    const time = Date.now();

    // 清空画布
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 更新和绘制所有分支
    branches.forEach((branch) => {
      branch.update();
      branch.draw(ctx, time);
    });

    animationId = requestAnimationFrame(animate);
  }

  // 初始化
  resizeCanvas();
  initTree();
  animate();

  // 窗口大小变化处理
  const resizeHandler = () => resizeCanvas();
  window.addEventListener('resize', resizeHandler);

  // 返回实例对象，模拟Vanta实例的接口
  return {
    destroy() {
      isDestroyed = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      window.removeEventListener('resize', resizeHandler);
    },
    resize() {
      resizeCanvas();
    },
  };
}

/**
 * 创建北极光效果
 * @param {Object} config - 配置对象
 */
function createAuroraEffect(config) {
  const container = document.querySelector(config.el);
  if (!container) {
    throw new Error('找不到容器元素');
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';

  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let animationId;
  let auroraLayers = [];
  let stars = [];
  let isDestroyed = false;

  // 极光层类
  class AuroraLayer {
    constructor(baseY, amplitude, frequency, speed, colorHue) {
      this.baseY = baseY;
      this.amplitude = amplitude;
      this.frequency = frequency;
      this.speed = speed;
      this.colorHue = colorHue;
      this.offset = Math.random() * Math.PI * 2;
      this.points = [];
      this.generatePoints();
    }

    generatePoints() {
      this.points = [];
      for (let x = -50; x <= canvas.width + 50; x += 5) {
        this.points.push({ x: x, baseY: this.baseY });
      }
    }

    update(time) {
      this.offset += this.speed;
    }

    draw(ctx, time) {
      ctx.save();

      // 创建极光的波动路径
      const gradient = ctx.createLinearGradient(0, this.baseY - this.amplitude, 0, this.baseY + this.amplitude * 2);
      gradient.addColorStop(0, `hsla(${this.colorHue}, 70%, 60%, 0)`);
      gradient.addColorStop(0.3, `hsla(${this.colorHue}, 80%, 70%, 0.6)`);
      gradient.addColorStop(0.7, `hsla(${this.colorHue}, 90%, 80%, 0.8)`);
      gradient.addColorStop(1, `hsla(${this.colorHue}, 70%, 60%, 0)`);

      ctx.fillStyle = gradient;

      ctx.beginPath();

      // 绘制上边界
      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i];
        const waveY = this.baseY + Math.sin(point.x * this.frequency + this.offset) * this.amplitude;
        const shimmerY = waveY + Math.sin(point.x * 0.02 + time * 0.005) * 10;

        if (i === 0) {
          ctx.moveTo(point.x, shimmerY);
        } else {
          ctx.lineTo(point.x, shimmerY);
        }
      }

      // 绘制下边界
      for (let i = this.points.length - 1; i >= 0; i--) {
        const point = this.points[i];
        const waveY = this.baseY + Math.sin(point.x * this.frequency + this.offset) * this.amplitude;
        const bottomY = waveY + this.amplitude + Math.sin(point.x * 0.015 + time * 0.003) * 15;
        ctx.lineTo(point.x, bottomY);
      }

      ctx.closePath();
      ctx.fill();

      // 添加闪烁效果
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = `hsla(${this.colorHue}, 90%, 90%, 0.3)`;

      for (let i = 0; i < this.points.length; i += 3) {
        const point = this.points[i];
        const waveY = this.baseY + Math.sin(point.x * this.frequency + this.offset) * this.amplitude;
        const sparkle = Math.sin(time * 0.01 + i * 0.1) > 0.7 ? 1 : 0;

        if (sparkle) {
          ctx.beginPath();
          ctx.arc(point.x, waveY, 2 + Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }
  }

  function resizeCanvas() {
    if (isDestroyed) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // 重新生成极光层
    auroraLayers.forEach((layer) => layer.generatePoints());
  }

  function initAurora() {
    auroraLayers = [];
    stars = [];

    // 创建多层极光
    const layers = [
      { baseY: canvas.height * 0.3, amplitude: 40, frequency: 0.01, speed: 0.02, colorHue: 120 }, // 绿色
      { baseY: canvas.height * 0.4, amplitude: 60, frequency: 0.008, speed: 0.015, colorHue: 180 }, // 青色
      { baseY: canvas.height * 0.5, amplitude: 35, frequency: 0.012, speed: 0.025, colorHue: 280 }, // 紫色
      { baseY: canvas.height * 0.25, amplitude: 25, frequency: 0.015, speed: 0.018, colorHue: 60 }, // 黄绿色
    ];

    layers.forEach((layerConfig) => {
      auroraLayers.push(new AuroraLayer(layerConfig.baseY, layerConfig.amplitude, layerConfig.frequency, layerConfig.speed, layerConfig.colorHue));
    });

    // 创建背景星星
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7, // 主要在上半部分
        size: Math.random() * 2 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
      });
    }
  }

  function animate() {
    if (isDestroyed) return;

    const time = Date.now() * 0.001;

    // 创建极地夜空背景
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#001122');
    bgGradient.addColorStop(0.7, '#000811');
    bgGradient.addColorStop(1, '#000306');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制星星
    stars.forEach((star) => {
      star.twinkle += star.speed;
      const alpha = 0.3 + Math.sin(star.twinkle) * 0.4;

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // 绘制极光层
    ctx.globalCompositeOperation = 'screen';
    auroraLayers.forEach((layer) => {
      layer.update(time);
      layer.draw(ctx, time);
    });
    ctx.globalCompositeOperation = 'source-over';

    animationId = requestAnimationFrame(animate);
  }

  // 初始化
  resizeCanvas();
  initAurora();
  animate();

  const resizeHandler = () => resizeCanvas();
  window.addEventListener('resize', resizeHandler);

  return {
    destroy() {
      isDestroyed = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      window.removeEventListener('resize', resizeHandler);
    },
    resize() {
      resizeCanvas();
    },
  };
}

/**
 * 创建银河系效果
 * @param {Object} config - 配置对象
 */
function createGalaxyEffect(config) {
  const container = document.querySelector(config.el);
  if (!container) {
    throw new Error('找不到容器元素');
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';

  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let animationId;
  let stars = [];
  let isDestroyed = false;

  // 恒星类
  class Star {
    constructor(x, y, size, color, speed) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.speed = speed;
      this.angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
      this.distance = Math.sqrt((x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2);
      this.twinkle = Math.random() * Math.PI * 2;
    }

    update(time) {
      // 螺旋旋转
      this.angle += this.speed * 0.001;
      this.x = canvas.width / 2 + Math.cos(this.angle) * this.distance;
      this.y = canvas.height / 2 + Math.sin(this.angle) * this.distance;

      // 闪烁效果
      this.twinkle += 0.05;
    }

    draw(ctx) {
      const alpha = 0.5 + Math.sin(this.twinkle) * 0.3;
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
      gradient.addColorStop(0, `hsla(${this.color}, 80%, 70%, ${alpha})`);
      gradient.addColorStop(0.5, `hsla(${this.color}, 70%, 50%, ${alpha * 0.5})`);
      gradient.addColorStop(1, `hsla(${this.color}, 60%, 30%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function resizeCanvas() {
    if (isDestroyed) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  function initGalaxy() {
    stars = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;

    // 创建螺旋臂
    for (let arm = 0; arm < 4; arm++) {
      const armAngle = (arm * Math.PI * 2) / 4;

      for (let i = 0; i < 200; i++) {
        const t = i / 200;
        const radius = t * maxRadius;
        const angle = armAngle + t * Math.PI * 4 + (Math.random() - 0.5) * 0.5;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const size = Math.random() * 3 + 1;
        const color = 40 + Math.random() * 80; // 黄到蓝的色调
        const speed = 0.1 + Math.random() * 0.5;

        stars.push(new Star(x, y, size, color, speed));
      }
    }

    // 添加中心黑洞周围的亮星
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 40;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      stars.push(new Star(x, y, 4 + Math.random() * 2, 50 + Math.random() * 30, 2 + Math.random()));
    }

    // 添加背景恒星
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 0.5;
      const color = Math.random() * 360;

      stars.push(new Star(x, y, size, color, 0.01 + Math.random() * 0.05));
    }
  }

  function animate() {
    if (isDestroyed) return;

    const time = Date.now();

    // 创建深空背景
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height));
    gradient.addColorStop(0, '#000015');
    gradient.addColorStop(0.5, '#000010');
    gradient.addColorStop(1, '#000005');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 更新和绘制恒星
    stars.forEach((star) => {
      star.update(time);
      star.draw(ctx);
    });

    // 绘制中心黑洞
    const centerGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, 30);
    centerGradient.addColorStop(0, 'rgba(0,0,0,1)');
    centerGradient.addColorStop(0.8, 'rgba(50,20,100,0.3)');
    centerGradient.addColorStop(1, 'rgba(150,50,200,0.1)');

    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 25, 0, Math.PI * 2);
    ctx.fill();

    animationId = requestAnimationFrame(animate);
  }

  // 初始化
  resizeCanvas();
  initGalaxy();
  animate();

  const resizeHandler = () => resizeCanvas();
  window.addEventListener('resize', resizeHandler);

  return {
    destroy() {
      isDestroyed = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      window.removeEventListener('resize', resizeHandler);
    },
    resize() {
      resizeCanvas();
    },
  };
}
