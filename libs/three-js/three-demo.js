/**
 * Three.js 演示脚本（简化版）
 * 提供五种不同的 3D 效果
 */

// 全局变量
let scene, camera, renderer;
let animationId;

// 效果配置定义
const effectConfigs = [
    { id: 'cubes', name: '旋转立方体', description: '多个彩色立方体的旋转动画' },
    { id: 'particles', name: '粒子系统', description: '3D 空间中的粒子动画效果' },
    { id: 'geometry', name: '几何体动画', description: '各种几何体的变形动画' },
    { id: 'shader', name: '着色器效果', description: '使用着色器创建的视觉效果' },
    { id: 'space', name: '宇宙场景', description: '模拟宇宙星空的 3D 场景' },
    { id: 'dna-helix', name: 'DNA螺旋', description: '双螺旋DNA结构的3D可视化' },
    { id: 'tunnel', name: '时空隧道', description: '穿越时空隧道的动态效果' },
    { id: 'crystal-cave', name: '水晶洞穴', description: '闪亮水晶洞穴的奇幻场景' },
    { id: 'wave-ocean', name: '波浪海洋', description: '3D波浪起伏的海洋效果' },
    { id: 'neural-network', name: '神经网络', description: '神经元连接的网络可视化' },
    { id: 'fractal-tree', name: '分形树', description: '分形几何的树状结构' },
    { id: 'galaxy-collision', name: '星系碰撞', description: '两个星系相撞的宇宙奇观' },
    { id: 'plasma-field', name: '等离子场', description: '高能等离子体的能量场' },
    { id: 'hologram', name: '全息投影', description: '未来科技感的全息效果' },
    { id: 'quantum-foam', name: '量子泡沫', description: '量子力学的泡沫结构' },
    { id: 'snake-game', name: '3D贪吃蛇', description: '完整的3D贪吃蛇游戏体验' }
];

/**
 * 初始化 Three.js 演示
 */
async function initThreeDemo() {
    try {
        if (typeof THREE === 'undefined') {
            throw new Error('Three.js 库未加载');
        }

        setupThreeJS();
        
        window.effectSwitcher = new EffectSwitcher();
        window.effectSwitcher.init(effectConfigs, async (effect) => {
            await loadThreeEffect(effect);
        });

        console.log('Three.js 演示初始化完成');
    } catch (error) {
        console.error('初始化 Three.js 演示失败:', error);
        showInitError(error.message);
    }
}

/**
 * 设置 Three.js 基础场景
 */
function setupThreeJS() {
    const container = document.getElementById('three-container');
    
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(
        75, 
        container.offsetWidth / container.offsetHeight, 
        0.1, 
        1000
    );
    camera.position.z = 5;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    
    // 处理窗口大小变化
    window.addEventListener('resize', onWindowResize);
}

/**
 * 加载指定的 Three.js 效果
 */
async function loadThreeEffect(effect) {
    try {
        // 清理现有动画
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        // 清理场景
        while(scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        
        // 添加基本光照
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // 根据效果类型加载不同的内容
        switch(effect.id) {
            case 'cubes':
                loadCubesEffect();
                break;
            case 'particles':
                loadParticlesEffect();
                break;
            case 'geometry':
                loadGeometryEffect();
                break;
            case 'shader':
                loadShaderEffect();
                break;
            case 'space':
                loadSpaceEffect();
                break;
            case 'dna-helix':
                loadDNAHelixEffect();
                break;
            case 'tunnel':
                loadTunnelEffect();
                break;
            case 'crystal-cave':
                loadCrystalCaveEffect();
                break;
            case 'wave-ocean':
                loadWaveOceanEffect();
                break;
            case 'neural-network':
                loadNeuralNetworkEffect();
                break;
            case 'fractal-tree':
                loadFractalTreeEffect();
                break;
            case 'galaxy-collision':
                loadGalaxyCollisionEffect();
                break;
            case 'plasma-field':
                loadPlasmaFieldEffect();
                break;
            case 'hologram':
                loadHologramEffect();
                break;
            case 'quantum-foam':
                loadQuantumFoamEffect();
                break;
            case 'snake-game':
                loadSnakeGameEffect();
                break;
        }
        
        animate();
        console.log(`已加载效果: ${effect.name}`);
    } catch (error) {
        console.error('加载 Three.js 效果失败:', error);
        throw error;
    }
}

/**
 * 旋转立方体效果
 */
function loadCubesEffect() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cubes = [];
    
    for (let i = 0; i < 10; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / 10, 0.8, 0.6)
        });
        const cube = new THREE.Mesh(geometry, material);
        
        cube.position.x = (Math.random() - 0.5) * 8;
        cube.position.y = (Math.random() - 0.5) * 8;
        cube.position.z = (Math.random() - 0.5) * 8;
        
        cubes.push(cube);
        scene.add(cube);
    }
    
    scene.userData.cubes = cubes;
}

/**
 * 粒子系统效果
 */
function loadParticlesEffect() {
    const geometry = new THREE.BufferGeometry();
    const particles = 1000;
    const positions = new Float32Array(particles * 3);
    
    for (let i = 0; i < particles * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x6366f1,
        size: 0.1,
        sizeAttenuation: true
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    scene.userData.particles = points;
}

/**
 * 几何体动画效果
 */
function loadGeometryEffect() {
    const geometries = [
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.ConeGeometry(1, 2, 8),
        new THREE.CylinderGeometry(1, 1, 2, 8),
        new THREE.OctahedronGeometry(1),
        new THREE.TetrahedronGeometry(1)
    ];
    
    const shapes = [];
    
    geometries.forEach((geometry, i) => {
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / 5, 0.8, 0.6),
            transparent: true,
            opacity: 0.8
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (i - 2) * 3;
        shapes.push(mesh);
        scene.add(mesh);
    });
    
    scene.userData.shapes = shapes;
}

/**
 * 着色器效果
 */
function loadShaderEffect() {
    const geometry = new THREE.PlaneGeometry(6, 6, 100, 100);
    
    const material = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    scene.userData.plane = plane;
}

/**
 * 宇宙场景效果
 */
function loadSpaceEffect() {
    // 星星
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        sizeAttenuation: false
    });
    
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // 彩色球体代表行星
    const planets = [];
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / 5, 0.8, 0.6)
        });
        const planet = new THREE.Mesh(geometry, material);
        planet.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        planets.push(planet);
        scene.add(planet);
    }
    
    scene.userData.stars = stars;
    scene.userData.planets = planets;
}

/**
 * DNA螺旋效果
 */
function loadDNAHelixEffect() {
    const helixGroups = [];
    const nucleotides = [];
    
    // 创建双螺旋结构
    for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 8; // 8圈螺旋
        const y = (i / 100) * 20 - 10; // 高度分布
        const radius = 3;
        
        // 第一条螺旋链
        const helix1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 8, 8),
            new THREE.MeshPhongMaterial({ color: 0xff6b6b })
        );
        helix1.position.set(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius
        );
        scene.add(helix1);
        helixGroups.push(helix1);
        
        // 第二条螺旋链
        const helix2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 8, 8),
            new THREE.MeshPhongMaterial({ color: 0x4ecdc4 })
        );
        helix2.position.set(
            Math.cos(angle + Math.PI) * radius,
            y,
            Math.sin(angle + Math.PI) * radius
        );
        scene.add(helix2);
        helixGroups.push(helix2);
        
        // 连接线（代表碱基对）
        if (i % 4 === 0) {
            const geometry = new THREE.CylinderGeometry(0.05, 0.05, radius * 2);
            const line = new THREE.Mesh(
                geometry,
                new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 0.6, transparent: true })
            );
            line.position.set(0, y, 0);
            line.rotation.z = Math.PI / 2;
            line.rotation.y = angle;
            scene.add(line);
            nucleotides.push(line);
        }
    }
    
    scene.userData.helixGroups = helixGroups;
    scene.userData.nucleotides = nucleotides;
}

/**
 * 时空隧道效果
 */
function loadTunnelEffect() {
    const tunnelSegments = [];
    
    for (let i = 0; i < 50; i++) {
        const geometry = new THREE.RingGeometry(2, 4, 16);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(i / 50, 1.0, 0.5),
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const ring = new THREE.Mesh(geometry, material);
        ring.position.z = i * 2 - 50;
        ring.rotation.z = (i / 50) * Math.PI * 2;
        
        scene.add(ring);
        tunnelSegments.push(ring);
    }
    
    // 设置相机位置
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, -50);
    
    scene.userData.tunnelSegments = tunnelSegments;
}

/**
 * 水晶洞穴效果
 */
function loadCrystalCaveEffect() {
    const crystals = [];
    
    // 创建各种形状的水晶
    const crystalGeometries = [
        new THREE.OctahedronGeometry(1),
        new THREE.TetrahedronGeometry(1),
        new THREE.ConeGeometry(0.5, 2, 6)
    ];
    
    for (let i = 0; i < 30; i++) {
        const geometry = crystalGeometries[Math.floor(Math.random() * crystalGeometries.length)];
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        const crystal = new THREE.Mesh(geometry, material);
        crystal.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        crystal.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        crystal.scale.setScalar(0.5 + Math.random() * 2);
        
        scene.add(crystal);
        crystals.push(crystal);
    }
    
    // 添加彩色点光源
    const colors = [0xff0040, 0x0040ff, 0x40ff00, 0xffff00, 0xff4000];
    const lights = [];
    
    colors.forEach((color, i) => {
        const light = new THREE.PointLight(color, 0.8, 50);
        light.position.set(
            Math.cos(i * Math.PI * 2 / 5) * 8,
            Math.sin(i * Math.PI * 2 / 5) * 8,
            Math.sin(i * Math.PI * 4 / 5) * 8
        );
        scene.add(light);
        lights.push(light);
    });
    
    scene.userData.crystals = crystals;
    scene.userData.crystalLights = lights;
}

/**
 * 波浪海洋效果
 */
function loadWaveOceanEffect() {
    const waveGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
    const waveMaterial = new THREE.MeshPhongMaterial({
        color: 0x006994,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });
    
    const ocean = new THREE.Mesh(waveGeometry, waveMaterial);
    ocean.rotation.x = -Math.PI / 2;
    scene.add(ocean);
    
    // 存储原始顶点位置
    const vertices = waveGeometry.attributes.position.array;
    const originalVertices = new Float32Array(vertices);
    
    scene.userData.ocean = ocean;
    scene.userData.waveGeometry = waveGeometry;
    scene.userData.originalVertices = originalVertices;
    
    // 设置相机位置
    camera.position.set(0, 8, 8);
    camera.lookAt(0, 0, 0);
}

/**
 * 神经网络效果
 */
function loadNeuralNetworkEffect() {
    const neurons = [];
    const connections = [];
    
    // 创建神经元
    for (let i = 0; i < 50; i++) {
        const neuron = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 16, 16),
            new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(0.6, 1.0, 0.5),
                emissive: 0x002244
            })
        );
        
        neuron.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        scene.add(neuron);
        neurons.push(neuron);
    }
    
    // 创建连接线
    for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
            if (Math.random() < 0.1) { // 10% 的连接概率
                const distance = neurons[i].position.distanceTo(neurons[j].position);
                if (distance < 8) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        neurons[i].position,
                        neurons[j].position
                    ]);
                    
                    const material = new THREE.LineBasicMaterial({
                        color: 0x00ffff,
                        transparent: true,
                        opacity: 0.3
                    });
                    
                    const line = new THREE.Line(geometry, material);
                    scene.add(line);
                    connections.push(line);
                }
            }
        }
    }
    
    scene.userData.neurons = neurons;
    scene.userData.connections = connections;
}

/**
 * 分形树效果
 */
function loadFractalTreeEffect() {
    const branches = [];
    
    function createBranch(position, direction, length, depth) {
        if (depth <= 0 || length < 0.2) return;
        
        const geometry = new THREE.CylinderGeometry(0.05, 0.1, length);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(0.1, 0.8, 0.3 + depth * 0.1)
        });
        
        const branch = new THREE.Mesh(geometry, material);
        
        // 计算分支位置和旋转
        const endPosition = position.clone().add(direction.clone().multiplyScalar(length));
        branch.position.copy(position.clone().lerp(endPosition, 0.5));
        
        // 对齐到方向向量
        const axis = new THREE.Vector3(0, 1, 0);
        branch.quaternion.setFromUnitVectors(axis, direction.normalize());
        
        scene.add(branch);
        branches.push(branch);
        
        // 递归创建子分支
        if (depth > 1) {
            const numBranches = 2 + Math.floor(Math.random() * 2);
            for (let i = 0; i < numBranches; i++) {
                const angle = (Math.PI / 4) * (Math.random() - 0.5);
                const rotationAxis = new THREE.Vector3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                ).normalize();
                
                const newDirection = direction.clone()
                    .applyAxisAngle(rotationAxis, angle);
                
                setTimeout(() => {
                    createBranch(endPosition, newDirection, length * 0.7, depth - 1);
                }, Math.random() * 100);
            }
        }
    }
    
    // 从底部开始生长
    const startPosition = new THREE.Vector3(0, -5, 0);
    const startDirection = new THREE.Vector3(0, 1, 0);
    createBranch(startPosition, startDirection, 3, 6);
    
    scene.userData.branches = branches;
}

/**
 * 星系碰撞效果
 */
function loadGalaxyCollisionEffect() {
    const galaxy1Stars = [];
    const galaxy2Stars = [];
    
    // 创建第一个星系
    for (let i = 0; i < 500; i++) {
        const star = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 8;
        const height = (Math.random() - 0.5) * 2;
        
        star.position.set(
            Math.cos(angle) * radius - 5,
            height,
            Math.sin(angle) * radius
        );
        
        star.userData = {
            originalX: star.position.x,
            originalY: star.position.y,
            originalZ: star.position.z,
            angle: angle,
            radius: radius
        };
        
        scene.add(star);
        galaxy1Stars.push(star);
    }
    
    // 创建第二个星系
    for (let i = 0; i < 500; i++) {
        const star = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffaaaa })
        );
        
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 8;
        const height = (Math.random() - 0.5) * 2;
        
        star.position.set(
            Math.cos(angle) * radius + 5,
            height,
            Math.sin(angle) * radius
        );
        
        star.userData = {
            originalX: star.position.x,
            originalY: star.position.y,
            originalZ: star.position.z,
            angle: angle,
            radius: radius
        };
        
        scene.add(star);
        galaxy2Stars.push(star);
    }
    
    scene.userData.galaxy1Stars = galaxy1Stars;
    scene.userData.galaxy2Stars = galaxy2Stars;
}

/**
 * 等离子场效果
 */
function loadPlasmaFieldEffect() {
    const plasmaParticles = [];
    
    // 创建等离子粒子
    for (let i = 0; i < 200; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 8, 8),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 1.0, 0.5),
                transparent: true,
                opacity: 0.8
            })
        );
        
        particle.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        particle.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1
            ),
            phase: Math.random() * Math.PI * 2
        };
        
        scene.add(particle);
        plasmaParticles.push(particle);
    }
    
    scene.userData.plasmaParticles = plasmaParticles;
}

/**
 * 全息投影效果
 */
function loadHologramEffect() {
    const hologramLines = [];
    
    // 创建全息网格
    const gridSize = 20;
    const spacing = 1;
    
    // 水平线
    for (let i = 0; i <= gridSize; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-gridSize/2 * spacing, 0, (i - gridSize/2) * spacing),
            new THREE.Vector3(gridSize/2 * spacing, 0, (i - gridSize/2) * spacing)
        ]);
        
        const material = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3
        });
        
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        hologramLines.push(line);
    }
    
    // 垂直线
    for (let i = 0; i <= gridSize; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3((i - gridSize/2) * spacing, 0, -gridSize/2 * spacing),
            new THREE.Vector3((i - gridSize/2) * spacing, 0, gridSize/2 * spacing)
        ]);
        
        const material = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3
        });
        
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        hologramLines.push(line);
    }
    
    // 全息物体
    const hologramObjects = [];
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.OctahedronGeometry(1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        
        const obj = new THREE.Mesh(geometry, material);
        obj.position.set(
            (Math.random() - 0.5) * 10,
            2 + Math.random() * 3,
            (Math.random() - 0.5) * 10
        );
        
        scene.add(obj);
        hologramObjects.push(obj);
    }
    
    scene.userData.hologramLines = hologramLines;
    scene.userData.hologramObjects = hologramObjects;
}

/**
 * 量子泡沫效果
 */
function loadQuantumFoamEffect() {
    const bubbles = [];
    
    for (let i = 0; i < 100; i++) {
        const size = 0.1 + Math.random() * 0.5;
        const bubble = new THREE.Mesh(
            new THREE.SphereGeometry(size, 16, 16),
            new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
                transparent: true,
                opacity: 0.4,
                shininess: 100
            })
        );
        
        bubble.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        
        bubble.userData = {
            originalSize: size,
            phase: Math.random() * Math.PI * 2,
            speed: 0.02 + Math.random() * 0.03
        };
        
        scene.add(bubble);
        bubbles.push(bubble);
    }
    
    scene.userData.bubbles = bubbles;
}

/**
 * 3D贪吃蛇游戏
 */
function loadSnakeGameEffect() {
    // 游戏配置
    const GRID_SIZE = 20;
    const CELL_SIZE = 0.5;
    
    // 游戏状态
    const gameState = {
        snake: [{ x: 10, y: 10, z: 10 }],
        direction: { x: 1, y: 0, z: 0 },
        food: null,
        score: 0,
        gameOver: false,
        gameStarted: false,
        lastMoveTime: 0,
        moveInterval: 300 // 移动间隔（毫秒）
    };
    
    // 创建游戏网格（可视化边界）
    createGameGrid();
    
    // 创建蛇身
    const snakeSegments = [];
    gameState.snake.forEach((segment, index) => {
        const geometry = new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE);
        const material = new THREE.MeshPhongMaterial({
            color: index === 0 ? 0x00ff00 : 0x008800, // 头部更亮
            shininess: 100
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (segment.x - GRID_SIZE/2) * CELL_SIZE,
            (segment.y - GRID_SIZE/2) * CELL_SIZE,
            (segment.z - GRID_SIZE/2) * CELL_SIZE
        );
        scene.add(cube);
        snakeSegments.push(cube);
    });
    
    // 生成食物
    function generateFood() {
        let foodPosition;
        do {
            foodPosition = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
                z: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (gameState.snake.some(segment => 
            segment.x === foodPosition.x && 
            segment.y === foodPosition.y && 
            segment.z === foodPosition.z
        ));
        
        gameState.food = foodPosition;
        
        // 创建食物视觉效果
        if (scene.userData.foodMesh) {
            scene.remove(scene.userData.foodMesh);
        }
        
        const foodGeometry = new THREE.SphereGeometry(CELL_SIZE * 0.6, 16, 16);
        const foodMaterial = new THREE.MeshPhongMaterial({
            color: 0xff4444,
            emissive: 0x440000,
            shininess: 100
        });
        const foodMesh = new THREE.Mesh(foodGeometry, foodMaterial);
        foodMesh.position.set(
            (foodPosition.x - GRID_SIZE/2) * CELL_SIZE,
            (foodPosition.y - GRID_SIZE/2) * CELL_SIZE,
            (foodPosition.z - GRID_SIZE/2) * CELL_SIZE
        );
        scene.add(foodMesh);
        scene.userData.foodMesh = foodMesh;
    }
    
    // 创建游戏边界网格
    function createGameGrid() {
        const gridLines = [];
        
        // X轴方向的线
        for (let y = 0; y <= GRID_SIZE; y++) {
            for (let z = 0; z <= GRID_SIZE; z++) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3((-GRID_SIZE/2) * CELL_SIZE, (y - GRID_SIZE/2) * CELL_SIZE, (z - GRID_SIZE/2) * CELL_SIZE),
                    new THREE.Vector3((GRID_SIZE/2) * CELL_SIZE, (y - GRID_SIZE/2) * CELL_SIZE, (z - GRID_SIZE/2) * CELL_SIZE)
                ]);
                const material = new THREE.LineBasicMaterial({ color: 0x444444, opacity: 0.3, transparent: true });
                const line = new THREE.Line(geometry, material);
                scene.add(line);
                gridLines.push(line);
            }
        }
        
        // Y轴方向的线
        for (let x = 0; x <= GRID_SIZE; x++) {
            for (let z = 0; z <= GRID_SIZE; z++) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3((x - GRID_SIZE/2) * CELL_SIZE, (-GRID_SIZE/2) * CELL_SIZE, (z - GRID_SIZE/2) * CELL_SIZE),
                    new THREE.Vector3((x - GRID_SIZE/2) * CELL_SIZE, (GRID_SIZE/2) * CELL_SIZE, (z - GRID_SIZE/2) * CELL_SIZE)
                ]);
                const material = new THREE.LineBasicMaterial({ color: 0x444444, opacity: 0.3, transparent: true });
                const line = new THREE.Line(geometry, material);
                scene.add(line);
                gridLines.push(line);
            }
        }
        
        // Z轴方向的线
        for (let x = 0; x <= GRID_SIZE; x++) {
            for (let y = 0; y <= GRID_SIZE; y++) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3((x - GRID_SIZE/2) * CELL_SIZE, (y - GRID_SIZE/2) * CELL_SIZE, (-GRID_SIZE/2) * CELL_SIZE),
                    new THREE.Vector3((x - GRID_SIZE/2) * CELL_SIZE, (y - GRID_SIZE/2) * CELL_SIZE, (GRID_SIZE/2) * CELL_SIZE)
                ]);
                const material = new THREE.LineBasicMaterial({ color: 0x444444, opacity: 0.3, transparent: true });
                const line = new THREE.Line(geometry, material);
                scene.add(line);
                gridLines.push(line);
            }
        }
        
        scene.userData.gridLines = gridLines;
    }
    
    // 移动蛇
    function moveSnake() {
        if (gameState.gameOver || !gameState.gameStarted) return;
        
        const head = gameState.snake[0];
        const newHead = {
            x: head.x + gameState.direction.x,
            y: head.y + gameState.direction.y,
            z: head.z + gameState.direction.z
        };
        
        // 边界检查
        if (newHead.x < 0 || newHead.x >= GRID_SIZE ||
            newHead.y < 0 || newHead.y >= GRID_SIZE ||
            newHead.z < 0 || newHead.z >= GRID_SIZE) {
            gameOver();
            return;
        }
        
        // 自碰撞检查
        if (gameState.snake.some(segment => 
            segment.x === newHead.x && 
            segment.y === newHead.y && 
            segment.z === newHead.z)) {
            gameOver();
            return;
        }
        
        gameState.snake.unshift(newHead);
        
        // 检查是否吃到食物
        if (gameState.food && 
            newHead.x === gameState.food.x && 
            newHead.y === gameState.food.y && 
            newHead.z === gameState.food.z) {
            gameState.score += 10;
            generateFood();
            
            // 添加新的蛇身段
            const geometry = new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE);
            const material = new THREE.MeshPhongMaterial({ color: 0x008800, shininess: 100 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            snakeSegments.push(cube);
        } else {
            // 移除尾部
            gameState.snake.pop();
            if (snakeSegments.length > gameState.snake.length) {
                const removedSegment = snakeSegments.pop();
                scene.remove(removedSegment);
            }
        }
        
        // 更新蛇身位置
        gameState.snake.forEach((segment, index) => {
            if (snakeSegments[index]) {
                snakeSegments[index].position.set(
                    (segment.x - GRID_SIZE/2) * CELL_SIZE,
                    (segment.y - GRID_SIZE/2) * CELL_SIZE,
                    (segment.z - GRID_SIZE/2) * CELL_SIZE
                );
                
                // 头部颜色更亮
                snakeSegments[index].material.color.setHex(index === 0 ? 0x00ff00 : 0x008800);
            }
        });
        
        updateUI();
    }
    
    // 游戏结束
    function gameOver() {
        gameState.gameOver = true;
        gameState.gameStarted = false;
        
        // 蛇身变红表示游戏结束
        snakeSegments.forEach(segment => {
            segment.material.color.setHex(0xff0000);
        });
        
        showGameOverScreen();
    }
    
    // 重新开始游戏
    function resetGame() {
        gameState.snake = [{ x: 10, y: 10, z: 10 }];
        gameState.direction = { x: 1, y: 0, z: 0 };
        gameState.score = 0;
        gameState.gameOver = false;
        gameState.gameStarted = true;
        
        // 清理现有蛇身
        snakeSegments.forEach(segment => scene.remove(segment));
        snakeSegments.length = 0;
        
        // 重新创建蛇身
        gameState.snake.forEach((segment, index) => {
            const geometry = new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE);
            const material = new THREE.MeshPhongMaterial({
                color: index === 0 ? 0x00ff00 : 0x008800,
                shininess: 100
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                (segment.x - GRID_SIZE/2) * CELL_SIZE,
                (segment.y - GRID_SIZE/2) * CELL_SIZE,
                (segment.z - GRID_SIZE/2) * CELL_SIZE
            );
            scene.add(cube);
            snakeSegments.push(cube);
        });
        
        generateFood();
        hideGameScreens();
        updateUI();
    }
    
    // 键盘控制
    function handleKeyPress(event) {
        if (!gameState.gameStarted && !gameState.gameOver) {
            if (event.code === 'Space') {
                gameState.gameStarted = true;
                hideGameScreens();
                return;
            }
        }
        
        if (gameState.gameOver && event.code === 'Space') {
            resetGame();
            return;
        }
        
        if (!gameState.gameStarted || gameState.gameOver) return;
        
        const newDirection = { ...gameState.direction };
        
        switch(event.code) {
            case 'ArrowUp':
            case 'KeyW':
                if (gameState.direction.y === 0) newDirection = { x: 0, y: 1, z: 0 };
                break;
            case 'ArrowDown':
            case 'KeyS':
                if (gameState.direction.y === 0) newDirection = { x: 0, y: -1, z: 0 };
                break;
            case 'ArrowLeft':
            case 'KeyA':
                if (gameState.direction.x === 0) newDirection = { x: -1, y: 0, z: 0 };
                break;
            case 'ArrowRight':
            case 'KeyD':
                if (gameState.direction.x === 0) newDirection = { x: 1, y: 0, z: 0 };
                break;
            case 'KeyQ':
                if (gameState.direction.z === 0) newDirection = { x: 0, y: 0, z: 1 };
                break;
            case 'KeyE':
                if (gameState.direction.z === 0) newDirection = { x: 0, y: 0, z: -1 };
                break;
        }
        
        gameState.direction = newDirection;
    }
    
    // UI 管理
    function updateUI() {
        const container = document.getElementById('three-container');
        let ui = container.querySelector('.snake-ui');
        
        if (!ui) {
            ui = document.createElement('div');
            ui.className = 'snake-ui';
            ui.style.position = 'absolute';
            ui.style.top = '10px';
            ui.style.left = '10px';
            ui.style.color = '#fff';
            ui.style.fontSize = '18px';
            ui.style.fontFamily = 'monospace';
            ui.style.zIndex = '1000';
            ui.style.background = 'rgba(0,0,0,0.7)';
            ui.style.padding = '10px';
            ui.style.borderRadius = '5px';
            container.appendChild(ui);
        }
        
        ui.innerHTML = `
            <div>🏆 得分: ${gameState.score}</div>
            <div>🎮 控制: WASD/方向键 移动</div>
            <div>🎮 控制: Q/E 前后移动</div>
            ${!gameState.gameStarted && !gameState.gameOver ? '<div>🚀 按空格键开始</div>' : ''}
        `;
    }
    
    function showGameOverScreen() {
        const container = document.getElementById('three-container');
        let gameOverScreen = container.querySelector('.snake-gameover');
        
        if (!gameOverScreen) {
            gameOverScreen = document.createElement('div');
            gameOverScreen.className = 'snake-gameover';
            gameOverScreen.style.position = 'absolute';
            gameOverScreen.style.top = '50%';
            gameOverScreen.style.left = '50%';
            gameOverScreen.style.transform = 'translate(-50%, -50%)';
            gameOverScreen.style.color = '#fff';
            gameOverScreen.style.fontSize = '24px';
            gameOverScreen.style.fontFamily = 'Arial, sans-serif';
            gameOverScreen.style.textAlign = 'center';
            gameOverScreen.style.zIndex = '1001';
            gameOverScreen.style.background = 'rgba(0,0,0,0.8)';
            gameOverScreen.style.padding = '30px';
            gameOverScreen.style.borderRadius = '10px';
            gameOverScreen.style.border = '2px solid #ff0000';
            container.appendChild(gameOverScreen);
        }
        
        gameOverScreen.innerHTML = `
            <div style="color: #ff4444; font-size: 2em; margin-bottom: 20px;">🐍 游戏结束</div>
            <div style="margin-bottom: 15px;">最终得分: ${gameState.score}</div>
            <div style="font-size: 16px; color: #cccccc;">按空格键重新开始</div>
        `;
        gameOverScreen.style.display = 'block';
    }
    
    function hideGameScreens() {
        const container = document.getElementById('three-container');
        const gameOverScreen = container.querySelector('.snake-gameover');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'none';
        }
    }
    
    // 存储游戏状态和函数到场景
    scene.userData.snakeGame = {
        gameState,
        snakeSegments,
        moveSnake,
        handleKeyPress,
        updateUI,
        resetGame
    };
    
    // 设置相机位置以获得更好的3D视角
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    
    // 生成初始食物
    generateFood();
    
    // 显示初始UI
    updateUI();
    
    // 添加键盘监听器
    document.addEventListener('keydown', handleKeyPress);
    
    console.log('3D贪吃蛇游戏已加载！使用 WASD/方向键控制移动，Q/E控制前后');
}

/**
 * 动画循环
 */
function animate() {
    animationId = requestAnimationFrame(animate);
    
    // 根据当前效果执行不同的动画
    const currentEffect = window.effectSwitcher?.getCurrentEffect();
    
    switch(currentEffect) {
        case 'cubes':
            if (scene.userData.cubes) {
                scene.userData.cubes.forEach(cube => {
                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;
                });
            }
            break;
            
        case 'particles':
            if (scene.userData.particles) {
                scene.userData.particles.rotation.y += 0.002;
            }
            break;
            
        case 'geometry':
            if (scene.userData.shapes) {
                scene.userData.shapes.forEach((shape, i) => {
                    shape.rotation.x += 0.01 * (i + 1);
                    shape.rotation.y += 0.01 * (i + 1);
                });
            }
            break;
            
        case 'shader':
            if (scene.userData.plane) {
                scene.userData.plane.rotation.x = Math.sin(Date.now() * 0.001) * 0.5;
                scene.userData.plane.rotation.y += 0.005;
            }
            break;
            
        case 'space':
            if (scene.userData.stars) {
                scene.userData.stars.rotation.y += 0.0005;
            }
            if (scene.userData.planets) {
                scene.userData.planets.forEach((planet, i) => {
                    planet.rotation.y += 0.01 * (i + 1);
                });
            }
            break;
            
        case 'dna-helix':
            if (scene.userData.helixGroups) {
                const time = Date.now() * 0.001;
                scene.userData.helixGroups.forEach((helix, i) => {
                    helix.rotation.y = time + i * 0.1;
                });
            }
            if (scene.userData.nucleotides) {
                scene.userData.nucleotides.forEach((nucleotide, i) => {
                    nucleotide.rotation.y += 0.02;
                });
            }
            break;
            
        case 'tunnel':
            if (scene.userData.tunnelSegments) {
                scene.userData.tunnelSegments.forEach((segment, i) => {
                    segment.rotation.z += 0.01 * (1 + i * 0.1);
                    segment.position.z += 0.5;
                    if (segment.position.z > 20) {
                        segment.position.z = -50;
                    }
                });
            }
            break;
            
        case 'crystal-cave':
            if (scene.userData.crystals) {
                scene.userData.crystals.forEach(crystal => {
                    crystal.rotation.x += 0.005;
                    crystal.rotation.y += 0.01;
                    crystal.rotation.z += 0.007;
                });
            }
            if (scene.userData.crystalLights) {
                const time = Date.now() * 0.001;
                scene.userData.crystalLights.forEach((light, i) => {
                    light.position.x = Math.cos(time + i * Math.PI * 0.4) * 8;
                    light.position.y = Math.sin(time + i * Math.PI * 0.4) * 8;
                    light.position.z = Math.sin(time * 2 + i * Math.PI * 0.4) * 8;
                });
            }
            break;
            
        case 'wave-ocean':
            if (scene.userData.waveGeometry && scene.userData.originalVertices) {
                const time = Date.now() * 0.002;
                const vertices = scene.userData.waveGeometry.attributes.position.array;
                const originalVertices = scene.userData.originalVertices;
                
                for (let i = 0; i < vertices.length; i += 3) {
                    const x = originalVertices[i];
                    const z = originalVertices[i + 2];
                    
                    vertices[i + 1] = originalVertices[i + 1] + 
                        Math.sin(x * 0.3 + time) * 0.5 + 
                        Math.sin(z * 0.3 + time * 1.2) * 0.3;
                }
                
                scene.userData.waveGeometry.attributes.position.needsUpdate = true;
            }
            break;
            
        case 'neural-network':
            if (scene.userData.neurons) {
                const time = Date.now() * 0.001;
                scene.userData.neurons.forEach((neuron, i) => {
                    neuron.material.emissive.setHSL(0.6, 1.0, 0.3 + Math.sin(time + i) * 0.2);
                    neuron.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.2);
                });
            }
            break;
            
        case 'fractal-tree':
            if (scene.userData.branches) {
                const time = Date.now() * 0.001;
                scene.userData.branches.forEach((branch, i) => {
                    branch.rotation.y += 0.001 * (1 + i * 0.01);
                    branch.material.color.setHSL(0.1, 0.8, 0.3 + Math.sin(time + i * 0.1) * 0.2);
                });
            }
            break;
            
        case 'galaxy-collision':
            if (scene.userData.galaxy1Stars && scene.userData.galaxy2Stars) {
                const time = Date.now() * 0.0005;
                
                scene.userData.galaxy1Stars.forEach((star, i) => {
                    const userData = star.userData;
                    const newAngle = userData.angle + time;
                    star.position.x = userData.originalX + Math.cos(newAngle) * userData.radius * 0.1;
                    star.position.z = userData.originalZ + Math.sin(newAngle) * userData.radius * 0.1;
                });
                
                scene.userData.galaxy2Stars.forEach((star, i) => {
                    const userData = star.userData;
                    const newAngle = userData.angle - time;
                    star.position.x = userData.originalX + Math.cos(newAngle) * userData.radius * 0.1;
                    star.position.z = userData.originalZ + Math.sin(newAngle) * userData.radius * 0.1;
                });
            }
            break;
            
        case 'plasma-field':
            if (scene.userData.plasmaParticles) {
                const time = Date.now() * 0.001;
                scene.userData.plasmaParticles.forEach((particle, i) => {
                    const userData = particle.userData;
                    
                    // 更新位置
                    particle.position.add(userData.velocity);
                    
                    // 边界检查
                    if (Math.abs(particle.position.x) > 10) userData.velocity.x *= -1;
                    if (Math.abs(particle.position.y) > 10) userData.velocity.y *= -1;
                    if (Math.abs(particle.position.z) > 10) userData.velocity.z *= -1;
                    
                    // 颜色动画
                    particle.material.color.setHSL((time + userData.phase) % 1, 1.0, 0.5);
                    
                    // 大小动画
                    const scale = 1 + Math.sin(time * 3 + userData.phase) * 0.3;
                    particle.scale.setScalar(scale);
                });
            }
            break;
            
        case 'hologram':
            if (scene.userData.hologramLines) {
                const time = Date.now() * 0.001;
                scene.userData.hologramLines.forEach((line, i) => {
                    line.material.opacity = 0.2 + Math.sin(time + i * 0.1) * 0.2;
                });
            }
            if (scene.userData.hologramObjects) {
                scene.userData.hologramObjects.forEach((obj, i) => {
                    obj.rotation.x += 0.01;
                    obj.rotation.y += 0.02;
                    obj.position.y += Math.sin(Date.now() * 0.002 + i) * 0.01;
                });
            }
            break;
            
        case 'quantum-foam':
            if (scene.userData.bubbles) {
                const time = Date.now() * 0.001;
                scene.userData.bubbles.forEach(bubble => {
                    const userData = bubble.userData;
                    
                    // 大小动画
                    const scale = userData.originalSize * (1 + Math.sin(time * userData.speed + userData.phase) * 0.3);
                    bubble.scale.setScalar(scale);
                    
                    // 随机漂移
                    bubble.position.x += (Math.random() - 0.5) * 0.01;
                    bubble.position.y += (Math.random() - 0.5) * 0.01;
                    bubble.position.z += (Math.random() - 0.5) * 0.01;
                    
                    // 边界检查
                    if (Math.abs(bubble.position.x) > 7.5) bubble.position.x *= 0.9;
                    if (Math.abs(bubble.position.y) > 7.5) bubble.position.y *= 0.9;
                    if (Math.abs(bubble.position.z) > 7.5) bubble.position.z *= 0.9;
                    
                    // 透明度动画
                    bubble.material.opacity = 0.2 + Math.sin(time * 2 + userData.phase) * 0.2;
                });
            }
            break;
            
        case 'snake-game':
            if (scene.userData.snakeGame) {
                const { gameState, moveSnake } = scene.userData.snakeGame;
                const currentTime = Date.now();
                
                // 自动移动蛇（基于时间间隔）
                if (currentTime - gameState.lastMoveTime > gameState.moveInterval) {
                    moveSnake();
                    gameState.lastMoveTime = currentTime;
                }
                
                // 食物发光动画
                if (scene.userData.foodMesh) {
                    const time = Date.now() * 0.005;
                    const glowIntensity = 0.3 + Math.sin(time) * 0.2;
                    scene.userData.foodMesh.material.emissive.setRGB(glowIntensity, 0, 0);
                    scene.userData.foodMesh.rotation.y += 0.02;
                }
            }
            break;
    }
    
    renderer.render(scene, camera);
}

/**
 * 窗口大小变化处理
 */
function onWindowResize() {
    const container = document.getElementById('three-container');
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

/**
 * 显示初始化错误
 */
function showInitError(message) {
    const container = document.getElementById('three-container');
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
    
    if (renderer) {
        renderer.dispose();
    }
    
    if (window.effectSwitcher) {
        window.effectSwitcher.destroy();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initThreeDemo);

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
window.threeConfigs = effectConfigs;
