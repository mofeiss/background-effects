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
    { id: 'space', name: '宇宙场景', description: '模拟宇宙星空的 3D 场景' }
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
