/**
 * 流星雨效果
 */
function createMeteorsEffect(config) {
    const container = document.querySelector(config.el);
    if (!container) throw new Error('找不到容器元素');

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let animationId, meteors = [], stars = [], isDestroyed = false;
    
    class Meteor {
        constructor() {
            this.reset();
            this.life = Math.random(); // 随机起始生命值
        }
        
        reset() {
            this.x = Math.random() * canvas.width * 2 - canvas.width * 0.5;
            this.y = -50;
            this.speed = 3 + Math.random() * 8;
            this.size = Math.random() * 3 + 1;
            this.life = 1;
            this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        }
        
        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.life -= 0.005;
            
            if (this.life <= 0 || this.x > canvas.width + 100 || this.y > canvas.height + 100) {
                this.reset();
            }
        }
        
        draw(ctx) {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.life})`);
            gradient.addColorStop(0.2, `rgba(255, 240, 200, ${this.life * 0.8})`);
            gradient.addColorStop(1, `rgba(255, 200, 150, 0)`);
            
            // 绘制尾迹
            const tailLength = this.speed * 8;
            for (let i = 0; i < 10; i++) {
                const t = i / 10;
                const x = this.x - Math.cos(this.angle) * tailLength * t;
                const y = this.y - Math.sin(this.angle) * tailLength * t;
                const alpha = this.life * (1 - t) * 0.5;
                const size = this.size * (1 - t * 0.8);
                
                ctx.fillStyle = `rgba(255, ${240 - t * 40}, ${200 - t * 50}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // 绘制流星核心
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
    
    function init() {
        meteors = [];
        stars = [];
        
        // 创建流星
        for (let i = 0; i < 8; i++) {
            meteors.push(new Meteor());
        }
        
        // 创建背景星星
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                twinkle: Math.random() * Math.PI * 2,
                speed: 0.01 + Math.random() * 0.02
            });
        }
    }
    
    function animate() {
        if (isDestroyed) return;
        
        // 夜空背景
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#000011');
        bgGradient.addColorStop(1, '#000033');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制星星
        stars.forEach(star => {
            star.twinkle += star.speed;
            const alpha = 0.3 + Math.sin(star.twinkle) * 0.4;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 绘制流星
        meteors.forEach(meteor => {
            meteor.update();
            meteor.draw(ctx);
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    init();
    animate();
    
    const resizeHandler = () => resizeCanvas();
    window.addEventListener('resize', resizeHandler);
    
    return {
        destroy() {
            isDestroyed = true;
            if (animationId) cancelAnimationFrame(animationId);
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
            window.removeEventListener('resize', resizeHandler);
        },
        resize() { resizeCanvas(); }
    };
}

/**
 * 电路板效果
 */
function createCircuitEffect(config) {
    const container = document.querySelector(config.el);
    if (!container) throw new Error('找不到容器元素');

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let animationId, circuits = [], signals = [], isDestroyed = false;
    
    class Circuit {
        constructor(x1, y1, x2, y2) {
            this.x1 = x1; this.y1 = y1;
            this.x2 = x2; this.y2 = y2;
            this.active = Math.random() > 0.7;
        }
        
        draw(ctx) {
            ctx.strokeStyle = this.active ? '#00ff88' : '#004422';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
            ctx.stroke();
            
            // 绘制节点
            ctx.fillStyle = this.active ? '#00ffaa' : '#006644';
            ctx.beginPath();
            ctx.arc(this.x1, this.y1, 3, 0, Math.PI * 2);
            ctx.arc(this.x2, this.y2, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    class Signal {
        constructor(circuit) {
            this.circuit = circuit;
            this.progress = 0;
            this.speed = 0.01 + Math.random() * 0.02;
            this.size = 2 + Math.random() * 3;
        }
        
        update() {
            this.progress += this.speed;
            if (this.progress > 1) this.progress = 0;
        }
        
        draw(ctx) {
            const x = this.circuit.x1 + (this.circuit.x2 - this.circuit.x1) * this.progress;
            const y = this.circuit.y1 + (this.circuit.y2 - this.circuit.y1) * this.progress;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.size * 3);
            gradient.addColorStop(0, 'rgba(0, 255, 200, 1)');
            gradient.addColorStop(1, 'rgba(0, 255, 200, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function resizeCanvas() {
        if (isDestroyed) return;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    function init() {
        circuits = [];
        signals = [];
        
        const gridSize = 80;
        
        // 创建网格式电路
        for (let x = gridSize; x < canvas.width; x += gridSize) {
            for (let y = gridSize; y < canvas.height; y += gridSize) {
                // 水平连接
                if (x + gridSize < canvas.width) {
                    circuits.push(new Circuit(x, y, x + gridSize, y));
                }
                // 垂直连接
                if (y + gridSize < canvas.height) {
                    circuits.push(new Circuit(x, y, x, y + gridSize));
                }
            }
        }
        
        // 创建信号
        circuits.forEach(circuit => {
            if (Math.random() > 0.8) {
                signals.push(new Signal(circuit));
            }
        });
    }
    
    function animate() {
        if (isDestroyed) return;
        
        ctx.fillStyle = '#001122';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制电路
        circuits.forEach(circuit => circuit.draw(ctx));
        
        // 更新和绘制信号
        signals.forEach(signal => {
            signal.update();
            signal.draw(ctx);
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    init();
    animate();
    
    const resizeHandler = () => resizeCanvas();
    window.addEventListener('resize', resizeHandler);
    
    return {
        destroy() {
            isDestroyed = true;
            if (animationId) cancelAnimationFrame(animationId);
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
            window.removeEventListener('resize', resizeHandler);
        },
        resize() { resizeCanvas(); }
    };
}

/**
 * 黑客帝国效果
 */
function createMatrixEffect(config) {
    const container = document.querySelector(config.el);
    if (!container) throw new Error('找不到容器元素');

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let animationId, drops = [], isDestroyed = false;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    class Drop {
        constructor(x) {
            this.x = x;
            this.y = Math.random() * -canvas.height;
            this.speed = Math.random() * 3 + 2;
            this.chars = [];
            this.length = Math.random() * 20 + 10;
            
            for (let i = 0; i < this.length; i++) {
                this.chars.push({
                    char: characters[Math.floor(Math.random() * characters.length)],
                    opacity: 1 - i / this.length
                });
            }
        }
        
        update() {
            this.y += this.speed;
            
            // 随机改变字符
            if (Math.random() > 0.95) {
                const index = Math.floor(Math.random() * this.chars.length);
                this.chars[index].char = characters[Math.floor(Math.random() * characters.length)];
            }
            
            if (this.y > canvas.height + this.length * fontSize) {
                this.y = Math.random() * -canvas.height;
            }
        }
        
        draw(ctx) {
            ctx.font = `${fontSize}px monospace`;
            
            this.chars.forEach((charObj, i) => {
                const y = this.y + i * fontSize;
                if (y > 0 && y < canvas.height) {
                    if (i === 0) {
                        ctx.fillStyle = '#ffffff';
                    } else {
                        ctx.fillStyle = `rgba(0, 255, 0, ${charObj.opacity})`;
                    }
                    ctx.fillText(charObj.char, this.x, y);
                }
            });
        }
    }
    
    function resizeCanvas() {
        if (isDestroyed) return;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    function init() {
        drops = [];
        const cols = Math.floor(canvas.width / fontSize);
        
        for (let i = 0; i < cols; i++) {
            drops.push(new Drop(i * fontSize));
        }
    }
    
    function animate() {
        if (isDestroyed) return;
        
        // 创建拖尾效果
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drops.forEach(drop => {
            drop.update();
            drop.draw(ctx);
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    init();
    animate();
    
    const resizeHandler = () => resizeCanvas();
    window.addEventListener('resize', resizeHandler);
    
    return {
        destroy() {
            isDestroyed = true;
            if (animationId) cancelAnimationFrame(animationId);
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
            window.removeEventListener('resize', resizeHandler);
        },
        resize() { resizeCanvas(); }
    };
}