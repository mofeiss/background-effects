/**
 * P5.js 演示脚本
 * 提供五种不同的创意编程效果
 */

// 全局变量
let currentEffect = 'spiral';
let time = 0;
let particles = [];
let flowField = [];
let heartParticles = [];
let balloons = [];
let sunRays = [];
let stars = [];
let fireworks = [];
let galaxyPoints = [];
let sunflowerPetals = [];
let sunflowerSeeds = [];
let cloudParticles = [];
let lightRays = [];

// 效果配置
const effectConfigs = [
    {
        id: 'spiral',
        name: '螺旋艺术',
        description: '数学之美的螺旋艺术效果'
    },
    {
        id: 'flow',
        name: '流体模拟',
        description: '基于噪声的流体粒子运动'
    },
    {
        id: 'fractal',
        name: '分形图案',
        description: '递归生成的分形树结构'
    },
    {
        id: 'waves',
        name: '彩虹波浪',
        description: '三角函数驱动的彩色波浪'
    },
    {
        id: 'heart',
        name: '爱心飞舞',
        description: '浪漫的爱心粒子飞舞效果'
    },
    {
        id: 'balloons',
        name: '气球派对',
        description: '欢快的彩色气球上升动画'
    },
    {
        id: 'sun',
        name: '太阳光辉',
        description: '温暖的太阳光芒四射效果'
    },
    {
        id: 'moon',
        name: '月夜星空',
        description: '宁静的月亮与闪烁星空'
    },
    {
        id: 'sunflower',
        name: '向日葵花',
        description: '美丽的向日葵花盛放动效'
    },
    {
        id: 'sunrise',
        name: '日出东方',
        description: '壮丽的日出东升景色'
    },
    {
        id: 'sunset',
        name: '黄昏夕阳',
        description: '温馨的黄昏日落情景'
    },
    {
        id: 'mandala',
        name: '曼陀罗',
        description: '神秘的对称几何图案'
    },
    {
        id: 'fireworks',
        name: '烟花绽放',
        description: '绚烂的烟花爆炸效果'
    },
    {
        id: 'galaxy',
        name: '星系漩涡',
        description: '宇宙星系的旋转漩涡'
    }
];

// P5.js 核心函数
function setup() {
    let container = document.getElementById('p5-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('p5-container');
    
    // 初始化粒子系统
    initParticles();
    
    // 初始化流场
    initFlowField();
}

function draw() {
    time += 0.01;
    
    switch(currentEffect) {
        case 'spiral':
            drawSpiral();
            break;
        case 'flow':
            drawFlowField();
            break;
        case 'fractal':
            drawFractal();
            break;
        case 'waves':
            drawWaves();
            break;
        case 'heart':
            drawHeart();
            break;
        case 'balloons':
            drawBalloons();
            break;
        case 'sun':
            drawSun();
            break;
        case 'moon':
            drawMoon();
            break;
        case 'sunflower':
            drawSunflower();
            break;
        case 'sunrise':
            drawSunrise();
            break;
        case 'sunset':
            drawSunset();
            break;
        case 'mandala':
            drawMandala();
            break;
        case 'fireworks':
            drawFireworks();
            break;
        case 'galaxy':
            drawGalaxy();
            break;
        default:
            drawSpiral();
    }
}

// 效果实现函数
function drawSpiral() {
    background(15, 23, 42);
    
    push();
    translate(width/2, height/2);
    
    let numSpirals = 3;
    let points = 200;
    
    for (let s = 0; s < numSpirals; s++) {
        let hueOffset = s * 120;
        colorMode(HSB, 360, 100, 100);
        
        noFill();
        
        for (let i = 0; i < points; i++) {
            let angle = map(i, 0, points, 0, TWO_PI * 4) + time + s * PI/3;
            let radius = map(i, 0, points, 10, 150);
            
            let x = cos(angle) * radius;
            let y = sin(angle) * radius;
            
            let hue = (hueOffset + i * 2 + time * 50) % 360;
            stroke(hue, 80, 90, 150);
            strokeWeight(2);
            
            if (i > 0) {
                let prevAngle = map(i-1, 0, points, 0, TWO_PI * 4) + time + s * PI/3;
                let prevRadius = map(i-1, 0, points, 10, 150);
                let prevX = cos(prevAngle) * prevRadius;
                let prevY = sin(prevAngle) * prevRadius;
                
                line(prevX, prevY, x, y);
            }
            
            // 添加发光点
            fill(hue, 60, 100, 200);
            noStroke();
            circle(x, y, 3);
        }
    }
    
    pop();
    colorMode(RGB, 255);
}

function drawFlowField() {
    background(15, 23, 42, 20);
    
    updateFlowField();
    
    for (let particle of particles) {
        let x = floor(particle.pos.x / 20);
        let y = floor(particle.pos.y / 20);
        let index = x + y * floor(width / 20);
        
        if (index >= 0 && index < flowField.length) {
            let force = flowField[index];
            particle.vel.add(force);
        }
        
        particle.vel.mult(0.99);
        particle.vel.limit(2);
        particle.pos.add(particle.vel);
        
        // 边界处理
        if (particle.pos.x < 0) particle.pos.x = width;
        if (particle.pos.x > width) particle.pos.x = 0;
        if (particle.pos.y < 0) particle.pos.y = height;
        if (particle.pos.y > height) particle.pos.y = 0;
        
        // 绘制粒子
        let speed = particle.vel.mag();
        colorMode(HSB, 360, 100, 100);
        let hue = map(speed, 0, 2, 240, 360);
        stroke(hue, 80, 90, 100);
        strokeWeight(1);
        
        line(particle.pos.x, particle.pos.y, 
             particle.pos.x - particle.vel.x * 5, 
             particle.pos.y - particle.vel.y * 5);
    }
    
    colorMode(RGB, 255);
}

function drawFractal() {
    background(15, 23, 42);
    
    push();
    stroke(99, 102, 241);
    strokeWeight(2);
    
    let len = map(sin(time), -1, 1, 50, 100);
    
    translate(width/2, height);
    branch(len, 0);
    pop();
}

function branch(len, depth) {
    if (depth > 10) return;
    
    strokeWeight(map(depth, 0, 10, 4, 0.5));
    
    colorMode(HSB, 360, 100, 100);
    let hue = map(depth, 0, 10, 120, 300);
    stroke(hue, 70, 90);
    
    line(0, 0, 0, -len);
    translate(0, -len);
    
    if (len > 4) {
        push();
        rotate(-PI/6 + sin(time + depth) * 0.3);
        branch(len * 0.67, depth + 1);
        pop();
        
        push();
        rotate(PI/6 + cos(time + depth) * 0.3);
        branch(len * 0.67, depth + 1);
        pop();
    }
    
    colorMode(RGB, 255);
}

// 向日葵花效果
function drawSunflower() {
    background(135, 206, 250); // 天蓝色背景
    
    // 初始化向日葵花花瓣和花心
    if (sunflowerPetals.length === 0) {
        // 创建花瓣
        for (let i = 0; i < 20; i++) {
            sunflowerPetals.push({
                angle: i * (TWO_PI / 20),
                length: random(60, 100),
                width: random(15, 25),
                sway: random(TWO_PI)
            });
        }
        
        // 创建花心种子
        for (let i = 0; i < 200; i++) {
            let angle = i * 0.618 * TWO_PI; // 黄金角螺旋
            let radius = sqrt(i) * 3;
            sunflowerSeeds.push({
                angle: angle,
                radius: radius,
                size: 3 + radius * 0.02
            });
        }
    }
    
    push();
    translate(width/2, height/2);
    
    colorMode(HSB, 360, 100, 100);
    
    // 绘制花茎（绿色）
    stroke(120, 60, 40);
    strokeWeight(12);
    line(0, 100, 0, height/2);
    
    // 绘制花瓣
    for (let petal of sunflowerPetals) {
        push();
        rotate(petal.angle + sin(time * 0.5 + petal.sway) * 0.1);
        
        // 花瓣颜色从黄色到橙色
        fill(50, 90, 90);
        noStroke();
        
        // 绘制椭圆形花瓣
        ellipse(petal.length/2, 0, petal.length, petal.width);
        
        // 花瓣高光
        fill(55, 70, 100, 150);
        ellipse(petal.length/2 - petal.length/6, -petal.width/6, petal.length/3, petal.width/3);
        
        pop();
    }
    
    // 绘制花心背景
    fill(30, 80, 60);
    noStroke();
    circle(0, 0, 90);
    
    // 绘制花心种子螺旋
    for (let seed of sunflowerSeeds) {
        let x = cos(seed.angle + time * 0.3) * seed.radius;
        let y = sin(seed.angle + time * 0.3) * seed.radius;
        
        fill(45, 90, 30);
        noStroke();
        circle(x, y, seed.size);
        
        // 种子高光
        fill(50, 70, 50, 150);
        circle(x - seed.size/4, y - seed.size/4, seed.size/2);
    }
    
    // 添加花粉粒子效果
    if (random() < 0.1) {
        for (let i = 0; i < 5; i++) {
            let angle = random(TWO_PI);
            let radius = random(50, 80);
            let x = cos(angle) * radius + random(-10, 10);
            let y = sin(angle) * radius + random(-10, 10);
            
            fill(60, 100, 90, 150);
            noStroke();
            circle(x, y, 3);
        }
    }
    
    pop();
    colorMode(RGB, 255);
}

// 日出东方效果
function drawSunrise() {
    // 初始化云彩粒子
    if (cloudParticles.length === 0) {
        for (let i = 0; i < 30; i++) {
            cloudParticles.push({
                x: random(width),
                y: random(height * 0.3, height * 0.7),
                size: random(30, 80),
                speed: random(0.2, 0.8),
                opacity: random(0.3, 0.8)
            });
        }
    }
    
    // 初始化光线
    if (lightRays.length === 0) {
        for (let i = 0; i < 12; i++) {
            lightRays.push({
                angle: -PI/3 + (i * PI/18),
                length: random(200, 400),
                opacity: random(0.1, 0.3)
            });
        }
    }
    
    colorMode(HSB, 360, 100, 100);
    
    // 绘制渐变天空
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let hue = lerp(30, 200, inter); // 从橙色到蓝色
        let sat = lerp(90, 60, inter);
        let bright = lerp(90, 70, inter);
        
        stroke(hue, sat, bright);
        line(0, y, width, y);
    }
    
    // 绘制光线
    let sunX = width * 0.8;
    let sunY = height * 0.3;
    
    for (let ray of lightRays) {
        stroke(50, 60, 90, ray.opacity * 255);
        strokeWeight(3);
        
        let endX = sunX + cos(ray.angle) * ray.length;
        let endY = sunY + sin(ray.angle) * ray.length;
        
        line(sunX, sunY, endX, endY);
        
        // 动态变化光线长度
        ray.length += sin(time + ray.angle * 5) * 2;
        ray.length = constrain(ray.length, 150, 450);
    }
    
    // 绘制太阳
    noStroke();
    
    // 太阳光晕
    for (let i = 8; i > 0; i--) {
        fill(45, 80, 90, 30);
        circle(sunX, sunY, 60 + i * 20);
    }
    
    // 太阳本体
    fill(50, 90, 95);
    circle(sunX, sunY, 60 + sin(time * 2) * 5);
    
    // 绘制云彩
    for (let cloud of cloudParticles) {
        cloud.x += cloud.speed;
        if (cloud.x > width + cloud.size) {
            cloud.x = -cloud.size;
        }
        
        // 云彩颜色变化
        let hue = 20 + sin(time + cloud.x * 0.01) * 15;
        fill(hue, 40, 90, cloud.opacity * 255);
        noStroke();
        
        // 绘制云彩形状
        ellipse(cloud.x, cloud.y, cloud.size, cloud.size * 0.6);
        ellipse(cloud.x + cloud.size/3, cloud.y, cloud.size * 0.8, cloud.size * 0.5);
        ellipse(cloud.x - cloud.size/3, cloud.y, cloud.size * 0.7, cloud.size * 0.4);
    }
    
    colorMode(RGB, 255);
}

// 黄昏夕阳效果
function drawSunset() {
    // 复用云彩粒子系统
    if (cloudParticles.length === 0) {
        for (let i = 0; i < 25; i++) {
            cloudParticles.push({
                x: random(width),
                y: random(height * 0.2, height * 0.8),
                size: random(40, 120),
                speed: random(0.1, 0.5),
                opacity: random(0.4, 0.9)
            });
        }
    }
    
    colorMode(HSB, 360, 100, 100);
    
    // 绘制黄昏渗变天空
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let hue, sat, bright;
        
        if (inter < 0.3) {
            // 上部天空：深蓝色
            hue = lerp(15, 240, inter * 3.33);
            sat = lerp(80, 70, inter * 3.33);
            bright = lerp(60, 30, inter * 3.33);
        } else if (inter < 0.7) {
            // 中部：橙色和紫色
            hue = lerp(30, 300, (inter - 0.3) * 2.5);
            sat = lerp(90, 60, (inter - 0.3) * 2.5);
            bright = lerp(80, 50, (inter - 0.3) * 2.5);
        } else {
            // 下部：深紫色
            hue = lerp(300, 270, (inter - 0.7) * 3.33);
            sat = 40;
            bright = lerp(50, 20, (inter - 0.7) * 3.33);
        }
        
        stroke(hue, sat, bright);
        line(0, y, width, y);
    }
    
    // 绘制夕阳
    let sunX = width * 0.2;
    let sunY = height * 0.7 + sin(time) * 20; // 微微摇摆
    
    // 夕阳光晕
    noStroke();
    for (let i = 10; i > 0; i--) {
        let alpha = map(i, 0, 10, 100, 20);
        fill(15, 90, 80, alpha);
        circle(sunX, sunY, 80 + i * 25);
    }
    
    // 夕阳本体
    fill(15, 95, 90);
    circle(sunX, sunY, 80);
    
    // 夕阳内部纹理
    fill(20, 80, 95, 150);
    for (let i = 0; i < 8; i++) {
        let angle = i * 45 + time * 30;
        let x = sunX + cos(radians(angle)) * 20;
        let y = sunY + sin(radians(angle)) * 20;
        circle(x, y, 8);
    }
    
    // 绘制黄昏云彩
    for (let cloud of cloudParticles) {
        cloud.x -= cloud.speed;
        if (cloud.x < -cloud.size) {
            cloud.x = width + cloud.size;
        }
        
        // 黄昏云彩的温暖色调
        let hue = 320 + sin(time * 0.5 + cloud.x * 0.005) * 40;
        let sat = 60 + sin(time + cloud.y * 0.01) * 20;
        fill(hue, sat, 70, cloud.opacity * 255);
        noStroke();
        
        // 云彩形状（更柔和）
        for (let j = 0; j < 4; j++) {
            let offsetX = (j - 1.5) * cloud.size * 0.3;
            let offsetY = sin(time + cloud.x * 0.01 + j) * 10;
            ellipse(cloud.x + offsetX, cloud.y + offsetY, cloud.size * (0.6 + j * 0.1), cloud.size * 0.4);
        }
    }
    
    // 添加闪烁的星星效果
    if (time % 100 > 50) { // 间歇性闪烁
        for (let i = 0; i < 8; i++) {
            let starX = random(width);
            let starY = random(height * 0.3);
            
            fill(50, 30, 90, 200);
            noStroke();
            circle(starX, starY, 2);
            
            // 十字星光
            stroke(50, 30, 90, 150);
            strokeWeight(1);
            line(starX - 8, starY, starX + 8, starY);
            line(starX, starY - 8, starX, starY + 8);
        }
    }
    
    colorMode(RGB, 255);
}

function drawWaves() {
    background(15, 23, 42);
    
    let waves = 5;
    let points = 200;
    
    colorMode(HSB, 360, 100, 100);
    
    for (let w = 0; w < waves; w++) {
        let amplitude = 50 + w * 20;
        let frequency = 0.02 + w * 0.005;
        let yOffset = height / 2 + w * 30 - 60;
        let hue = (w * 60 + time * 50) % 360;
        
        stroke(hue, 80, 90);
        strokeWeight(2);
        noFill();
        
        beginShape();
        for (let x = 0; x <= width; x += width / points) {
            let y = yOffset + sin(x * frequency + time * 2 + w) * amplitude;
            vertex(x, y);
        }
        endShape();
        
        // 添加粒子效果
        for (let i = 0; i < 20; i++) {
            let x = (i * width / 20 + time * 20) % width;
            let y = yOffset + sin(x * frequency + time * 2 + w) * amplitude;
            
            fill(hue, 60, 100, 150);
            noStroke();
            circle(x, y, 4);
        }
    }
    
    colorMode(RGB, 255);
}

// 辅助函数
function initParticles() {
    particles = [];
    for (let i = 0; i < 1000; i++) {
        particles.push({
            pos: createVector(random(width), random(height)),
            vel: createVector(0, 0)
        });
    }
}

function initFlowField() {
    flowField = [];
    let cols = floor(width / 20);
    let rows = floor(height / 20);
    
    for (let i = 0; i < cols * rows; i++) {
        flowField[i] = createVector(0, 0);
    }
}

function updateFlowField() {
    let cols = floor(width / 20);
    
    for (let y = 0; y < floor(height / 20); y++) {
        for (let x = 0; x < cols; x++) {
            let angle = noise(x * 0.1, y * 0.1, time) * TWO_PI * 2;
            let v = p5.Vector.fromAngle(angle);
            v.mult(0.1);
            
            let index = x + y * cols;
            flowField[index] = v;
        }
    }
}

// 窗口大小调整
function windowResized() {
    let container = document.getElementById('p5-container');
    if (container) {
        resizeCanvas(container.offsetWidth, container.offsetHeight);
        initParticles();
        initFlowField();
    }
}

// 初始化效果切换器
document.addEventListener('DOMContentLoaded', function() {
    // 创建切换器实例
    window.effectSwitcher = new EffectSwitcher();
    
    // 初始化切换器
    window.effectSwitcher.init(effectConfigs, async function(effect) {
        currentEffect = effect.id;
        time = 0;
        
        // 重新初始化特定效果
        if (effect.id === 'flow') {
            initParticles();
            initFlowField();
        } else {
            // 初始化新效果
            initNewEffects(effect.id);
        }
        
        console.log('已切换到效果:', effect.name);
    });
});

// 兼容性函数（保留用于直接调用）
window.switchToEffect = function(effectId) {
    if (window.effectSwitcher) {
        window.effectSwitcher.switchTo(effectId);
    } else {
        currentEffect = effectId;
        time = 0;
        
        if (effectId === 'flow') {
            initParticles();
            initFlowField();
        }
    }
};

// ==================== 新增效果实现函数 ====================

// 爱心飞舞效果
function drawHeart() {
    background(15, 23, 42);
    
    // 初始化爱心粒子
    if (heartParticles.length === 0) {
        for (let i = 0; i < 50; i++) {
            heartParticles.push({
                x: random(width),
                y: random(height),
                size: random(10, 30),
                speed: random(0.5, 2),
                angle: random(TWO_PI),
                life: random(100, 300)
            });
        }
    }
    
    colorMode(HSB, 360, 100, 100);
    
    // 绘制和更新爱心粒子
    for (let i = heartParticles.length - 1; i >= 0; i--) {
        let heart = heartParticles[i];
        
        // 更新位置
        heart.x += cos(heart.angle + time) * heart.speed;
        heart.y += sin(heart.angle + time * 0.5) * heart.speed - 0.5;
        heart.angle += 0.02;
        heart.life--;
        
        // 边界处理
        if (heart.x < -50) heart.x = width + 50;
        if (heart.x > width + 50) heart.x = -50;
        if (heart.y < -50) heart.y = height + 50;
        
        // 绘制爱心
        push();
        translate(heart.x, heart.y);
        rotate(heart.angle);
        scale(heart.size / 20);
        
        let hue = (320 + sin(time + i) * 20) % 360;
        let alpha = map(heart.life, 0, 300, 0, 255);
        fill(hue, 80, 90, alpha);
        noStroke();
        
        // 绘制爱心形状
        beginShape();
        for (let t = 0; t < TWO_PI; t += 0.1) {
            let x = 16 * pow(sin(t), 3);
            let y = -(13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t));
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
        
        // 移除生命值耗尽的粒子
        if (heart.life <= 0) {
            heartParticles.splice(i, 1);
            // 添加新的爱心
            heartParticles.push({
                x: random(width),
                y: height + 50,
                size: random(10, 30),
                speed: random(0.5, 2),
                angle: random(TWO_PI),
                life: random(100, 300)
            });
        }
    }
    
    colorMode(RGB, 255);
}

// 气球派对效果
function drawBalloons() {
    background(15, 23, 42);
    
    // 初始化气球
    if (balloons.length === 0) {
        for (let i = 0; i < 30; i++) {
            balloons.push({
                x: random(50, width - 50),
                y: random(height, height + 200),
                size: random(20, 40),
                color: random(360),
                speed: random(0.5, 2),
                sway: random(TWO_PI),
                swaySpeed: random(0.02, 0.05)
            });
        }
    }
    
    colorMode(HSB, 360, 100, 100);
    
    // 绘制和更新气球
    for (let i = balloons.length - 1; i >= 0; i--) {
        let balloon = balloons[i];
        
        // 更新位置
        balloon.y -= balloon.speed;
        balloon.sway += balloon.swaySpeed;
        balloon.x += sin(balloon.sway) * 0.5;
        
        // 重新生成从底部上升的气球
        if (balloon.y < -100) {
            balloon.y = height + 50;
            balloon.x = random(50, width - 50);
        }
        
        // 绘制气球线
        stroke(0, 0, 50);
        strokeWeight(1);
        line(balloon.x, balloon.y + balloon.size/2, balloon.x, balloon.y + balloon.size + 30);
        
        // 绘制气球
        fill(balloon.color, 80, 90);
        noStroke();
        
        // 气球本体
        ellipse(balloon.x, balloon.y, balloon.size, balloon.size * 1.2);
        
        // 气球高光
        fill(balloon.color, 40, 100, 150);
        ellipse(balloon.x - balloon.size/4, balloon.y - balloon.size/4, balloon.size/3, balloon.size/4);
        
        // 气球结
        fill(0, 0, 20);
        ellipse(balloon.x, balloon.y + balloon.size/2, 3, 5);
    }
    
    colorMode(RGB, 255);
}

// 太阳光辉效果
function drawSun() {
    background(15, 23, 42);
    
    // 初始化太阳光线
    if (sunRays.length === 0) {
        for (let i = 0; i < 36; i++) {
            sunRays.push({
                angle: i * 10,
                length: random(80, 150),
                thickness: random(2, 6),
                speed: random(0.5, 2)
            });
        }
    }
    
    push();
    translate(width/2, height/2);
    
    colorMode(HSB, 360, 100, 100);
    
    // 绘制太阳光线
    for (let ray of sunRays) {
        let hue = 45 + sin(time + ray.angle * 0.1) * 10;
        stroke(hue, 80, 90);
        strokeWeight(ray.thickness);
        
        let startRadius = 40;
        let endRadius = startRadius + ray.length + sin(time * ray.speed + ray.angle * 0.1) * 20;
        
        let x1 = cos(radians(ray.angle + time * 20)) * startRadius;
        let y1 = sin(radians(ray.angle + time * 20)) * startRadius;
        let x2 = cos(radians(ray.angle + time * 20)) * endRadius;
        let y2 = sin(radians(ray.angle + time * 20)) * endRadius;
        
        line(x1, y1, x2, y2);
    }
    
    // 绘制太阳核心
    let pulseSize = 70 + sin(time * 3) * 10;
    fill(50, 90, 95);
    noStroke();
    circle(0, 0, pulseSize);
    
    // 太阳内部纹理
    for (let i = 0; i < 12; i++) {
        let angle = i * 30 + time * 50;
        let radius = 15 + i * 2;
        let x = cos(radians(angle)) * radius;
        let y = sin(radians(angle)) * radius;
        
        fill(55, 70, 100, 150);
        circle(x, y, 5);
    }
    
    pop();
    colorMode(RGB, 255);
}

// 月夜星空效果
function drawMoon() {
    background(5, 10, 25);
    
    // 初始化星星
    if (stars.length === 0) {
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: random(width),
                y: random(height),
                size: random(1, 4),
                twinkle: random(TWO_PI),
                twinkleSpeed: random(0.02, 0.08)
            });
        }
    }
    
    colorMode(HSB, 360, 100, 100);
    
    // 绘制星星
    for (let star of stars) {
        star.twinkle += star.twinkleSpeed;
        let brightness = 70 + sin(star.twinkle) * 30;
        
        fill(200, 30, brightness);
        noStroke();
        circle(star.x, star.y, star.size * (0.8 + sin(star.twinkle) * 0.4));
        
        // 星星闪烁效果
        if (random() < 0.02) {
            stroke(200, 20, 90, 100);
            strokeWeight(1);
            let sparkleSize = star.size * 3;
            line(star.x - sparkleSize, star.y, star.x + sparkleSize, star.y);
            line(star.x, star.y - sparkleSize, star.x, star.y + sparkleSize);
        }
    }
    
    // 绘制月亮
    push();
    translate(width * 0.75, height * 0.25);
    
    let moonSize = 100;
    
    // 月亮发光效果
    for (let i = 5; i > 0; i--) {
        fill(50, 20, 80, 20);
        noStroke();
        circle(0, 0, moonSize + i * 20);
    }
    
    // 月亮本体
    fill(50, 40, 90);
    circle(0, 0, moonSize);
    
    // 月亮表面纹理（陨石坑）
    fill(50, 60, 70);
    circle(-15, -10, 12);
    circle(20, 5, 8);
    circle(-5, 25, 6);
    circle(10, -20, 10);
    circle(-25, 15, 5);
    
    pop();
    colorMode(RGB, 255);
}

// 曼陀罗效果
function drawMandala() {
    background(15, 23, 42);
    
    push();
    translate(width/2, height/2);
    
    colorMode(HSB, 360, 100, 100);
    
    let layers = 8;
    let pointsPerLayer = 12;
    
    for (let layer = 0; layer < layers; layer++) {
        let radius = 20 + layer * 20;
        let hue = (layer * 45 + time * 30) % 360;
        
        // 绘制每层的对称图案
        for (let i = 0; i < pointsPerLayer; i++) {
            let angle = (i * TWO_PI / pointsPerLayer) + time + layer * 0.5;
            
            push();
            rotate(angle);
            translate(radius, 0);
            
            // 外层图案
            fill(hue, 70, 90);
            noStroke();
            
            let petalSize = 8 + sin(time * 2 + layer + i) * 4;
            
            // 绘制花瓣形状
            beginShape();
            for (let t = 0; t < TWO_PI; t += PI/8) {
                let r = petalSize * (1 + 0.3 * sin(3 * t));
                let x = r * cos(t);
                let y = r * sin(t);
                vertex(x, y);
            }
            endShape(CLOSE);
            
            // 内层装饰
            if (layer % 2 === 0) {
                fill(hue + 60, 80, 100, 200);
                circle(0, 0, petalSize * 0.6);
            }
            
            pop();
        }
        
        // 连接线
        if (layer > 0) {
            stroke(hue, 50, 70, 100);
            strokeWeight(1);
            noFill();
            circle(0, 0, radius * 2);
        }
    }
    
    // 中心装饰
    fill(30, 80, 95);
    noStroke();
    circle(0, 0, 20);
    
    fill(50, 90, 100);
    circle(0, 0, 12);
    
    pop();
    colorMode(RGB, 255);
}

// 烟花绽放效果
function drawFireworks() {
    background(15, 23, 42, 25);
    
    // 初始化烟花
    if (fireworks.length === 0 || random() < 0.02) {
        fireworks.push({
            x: random(width * 0.2, width * 0.8),
            y: random(height * 0.2, height * 0.6),
            particles: [],
            color: random(360),
            exploded: false,
            life: 100
        });
    }
    
    colorMode(HSB, 360, 100, 100);
    
    // 更新和绘制烟花
    for (let i = fireworks.length - 1; i >= 0; i--) {
        let firework = fireworks[i];
        
        if (!firework.exploded) {
            // 爆炸前的上升轨迹
            fill(firework.color, 80, 90);
            noStroke();
            circle(firework.x, firework.y, 8);
            
            // 创建爆炸粒子
            for (let j = 0; j < 30; j++) {
                firework.particles.push({
                    x: firework.x,
                    y: firework.y,
                    vx: random(-5, 5),
                    vy: random(-5, 5),
                    life: random(30, 60),
                    size: random(2, 6)
                });
            }
            firework.exploded = true;
        }
        
        // 绘制粒子
        for (let j = firework.particles.length - 1; j >= 0; j--) {
            let particle = firework.particles[j];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // 重力
            particle.life--;
            
            let alpha = map(particle.life, 0, 60, 0, 255);
            fill(firework.color, 80, 90, alpha);
            noStroke();
            circle(particle.x, particle.y, particle.size);
            
            // 拖尾效果
            stroke(firework.color, 60, 70, alpha * 0.5);
            strokeWeight(1);
            line(particle.x, particle.y, particle.x - particle.vx, particle.y - particle.vy);
            
            if (particle.life <= 0) {
                firework.particles.splice(j, 1);
            }
        }
        
        firework.life--;
        
        if (firework.life <= 0 && firework.particles.length === 0) {
            fireworks.splice(i, 1);
        }
    }
    
    colorMode(RGB, 255);
}

// 星系漩涡效果
function drawGalaxy() {
    background(5, 5, 15);
    
    // 初始化星系点
    if (galaxyPoints.length === 0) {
        for (let i = 0; i < 1000; i++) {
            galaxyPoints.push({
                angle: random(TWO_PI),
                radius: random(20, 200),
                speed: random(0.005, 0.02),
                size: random(1, 4),
                color: random(240, 300)
            });
        }
    }
    
    push();
    translate(width/2, height/2);
    
    colorMode(HSB, 360, 100, 100);
    
    // 绘制星系螺旋臂
    for (let point of galaxyPoints) {
        // 更新角度（内层转得快，外层转得慢）
        point.angle += point.speed * (1 / (point.radius * 0.01));
        
        // 螺旋臂效果
        let spiralFactor = point.radius * 0.02;
        let x = cos(point.angle + spiralFactor) * point.radius;
        let y = sin(point.angle + spiralFactor) * point.radius;
        
        // 距离中心越远越暗
        let brightness = map(point.radius, 20, 200, 90, 40);
        let alpha = map(point.radius, 20, 200, 255, 100);
        
        fill(point.color, 70, brightness, alpha);
        noStroke();
        circle(x, y, point.size);
        
        // 添加发光效果
        if (point.size > 2) {
            fill(point.color, 40, 100, alpha * 0.3);
            circle(x, y, point.size * 2);
        }
    }
    
    // 绘制中心黑洞
    let blackHoleSize = 30 + sin(time * 2) * 5;
    
    // 黑洞吸积盘
    for (let i = 0; i < 5; i++) {
        let diskRadius = blackHoleSize + i * 8;
        let hue = 30 + i * 10;
        stroke(hue, 80, 70, 100 - i * 20);
        strokeWeight(2);
        noFill();
        circle(0, 0, diskRadius);
    }
    
    // 黑洞本体
    fill(0, 0, 5);
    noStroke();
    circle(0, 0, blackHoleSize);
    
    pop();
    colorMode(RGB, 255);
}

// ==================== 初始化函数扩展 ====================

// 初始化新效果的辅助函数
function initNewEffects(effectId) {
    switch(effectId) {
        case 'heart':
            heartParticles = [];
            break;
        case 'balloons':
            balloons = [];
            break;
        case 'sun':
            sunRays = [];
            break;
        case 'moon':
            stars = [];
            break;
        case 'sunflower':
            sunflowerPetals = [];
            sunflowerSeeds = [];
            break;
        case 'sunrise':
            cloudParticles = [];
            lightRays = [];
            break;
        case 'sunset':
            cloudParticles = [];
            break;
        case 'fireworks':
            fireworks = [];
            break;
        case 'galaxy':
            galaxyPoints = [];
            break;
    }
}

// 导出配置供切换器使用
window.p5EffectConfigs = effectConfigs;
