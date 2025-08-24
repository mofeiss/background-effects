/**
 * 通用效果切换器
 * 用于统一管理各个演示页面的按钮切换逻辑
 */

class EffectSwitcher {
    constructor() {
        this.currentEffect = null;
        this.effects = new Map(); // 存储效果配置
        this.isChanging = false; // 防止快速切换
    }

    /**
     * 初始化切换器
     * @param {Array} effectConfigs - 效果配置数组
     * @param {Function} changeCallback - 效果切换回调函数
     */
    init(effectConfigs, changeCallback) {
        this.changeCallback = changeCallback;
        
        // 注册所有效果
        effectConfigs.forEach((config, index) => {
            this.effects.set(config.id, {
                ...config,
                index
            });
        });

        // 绑定按钮事件
        this.bindEvents();
        
        // 激活第一个效果
        const firstEffect = effectConfigs[0];
        if (firstEffect) {
            this.switchTo(firstEffect.id, false); // 不触发动画
        }
    }

    /**
     * 绑定按钮点击事件
     */
    bindEvents() {
        const buttons = document.querySelectorAll('.control-btn');
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isChanging) return;
                
                const effectId = btn.dataset.effect;
                if (effectId && this.effects.has(effectId)) {
                    this.switchTo(effectId);
                }
            });
        });
    }

    /**
     * 切换到指定效果
     * @param {string} effectId - 效果ID
     * @param {boolean} animated - 是否显示切换动画
     */
    async switchTo(effectId, animated = true) {
        if (this.isChanging || effectId === this.currentEffect) return;
        
        this.isChanging = true;
        
        try {
            // 更新按钮状态
            this.updateButtonStates(effectId);
            
            // 显示加载状态
            if (animated) {
                this.showLoading();
            }
            
            // 获取效果配置
            const effect = this.effects.get(effectId);
            if (!effect) {
                throw new Error(`效果 ${effectId} 不存在`);
            }
            
            // 执行切换回调
            if (this.changeCallback) {
                await this.changeCallback(effect);
            }
            
            this.currentEffect = effectId;
            
            // 隐藏加载状态
            if (animated) {
                this.hideLoading();
            }
            
        } catch (error) {
            console.error('切换效果时出错:', error);
            this.showError('切换效果失败，请重试');
        } finally {
            this.isChanging = false;
        }
    }

    /**
     * 更新按钮激活状态
     * @param {string} activeEffectId - 当前激活的效果ID
     */
    updateButtonStates(activeEffectId) {
        const buttons = document.querySelectorAll('.control-btn');
        buttons.forEach(btn => {
            const effectId = btn.dataset.effect;
            if (effectId === activeEffectId) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * 显示加载状态
     */
    showLoading() {
        const container = document.querySelector('.canvas-container');
        if (container && !container.querySelector('.loading')) {
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.textContent = '加载中';
            loading.setAttribute('aria-label', '正在切换效果');
            container.appendChild(loading);
        }
    }

    /**
     * 隐藏加载状态
     */
    hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }

    /**
     * 显示错误信息
     * @param {string} message - 错误信息
     */
    showError(message) {
        this.hideLoading();
        
        // 创建错误提示
        const container = document.querySelector('.canvas-container');
        if (container) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            error.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #ef4444;
                background: rgba(0, 0, 0, 0.8);
                padding: 1rem;
                border-radius: 0.5rem;
                border: 1px solid #ef4444;
            `;
            
            container.appendChild(error);
            
            // 3秒后自动隐藏
            setTimeout(() => {
                error.remove();
            }, 3000);
        }
    }

    /**
     * 获取当前效果
     * @returns {string|null} 当前效果ID
     */
    getCurrentEffect() {
        return this.currentEffect;
    }

    /**
     * 获取所有效果
     * @returns {Map} 效果配置映射
     */
    getAllEffects() {
        return new Map(this.effects);
    }

    /**
     * 切换到下一个效果
     */
    nextEffect() {
        const effectIds = Array.from(this.effects.keys());
        const currentIndex = effectIds.indexOf(this.currentEffect);
        const nextIndex = (currentIndex + 1) % effectIds.length;
        this.switchTo(effectIds[nextIndex]);
    }

    /**
     * 切换到上一个效果
     */
    prevEffect() {
        const effectIds = Array.from(this.effects.keys());
        const currentIndex = effectIds.indexOf(this.currentEffect);
        const prevIndex = currentIndex === 0 ? effectIds.length - 1 : currentIndex - 1;
        this.switchTo(effectIds[prevIndex]);
    }

    /**
     * 销毁切换器
     */
    destroy() {
        const buttons = document.querySelectorAll('.control-btn');
        buttons.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true)); // 移除所有事件监听器
        });
        
        this.effects.clear();
        this.currentEffect = null;
        this.changeCallback = null;
    }
}

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (window.effectSwitcher) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                window.effectSwitcher.prevEffect();
                break;
            case 'ArrowRight':
                e.preventDefault();
                window.effectSwitcher.nextEffect();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                const effectIds = Array.from(window.effectSwitcher.getAllEffects().keys());
                if (effectIds[index]) {
                    window.effectSwitcher.switchTo(effectIds[index]);
                }
                break;
        }
    }
});

// 新版通用切换器 - 适用于新演示页面风格
class BaseSwitcher {
    constructor(effects, switchCallback, initialIndex = 0) {
        this.effects = effects;
        this.switchCallback = switchCallback;
        this.currentIndex = initialIndex;
        this.isChanging = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.bindKeyboard();
    }
    
    bindEvents() {
        // 绑定前后切换按钮
        const prevBtn = document.getElementById('prev-effect');
        const nextBtn = document.getElementById('next-effect');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousEffect());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextEffect());
        }
    }
    
    bindKeyboard() {
        this.keyboardHandler = (e) => {
            if (e.target.tagName === 'INPUT') return;
            
            switch(e.code) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousEffect();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextEffect();
                    break;
                case 'Digit1':
                case 'Digit2':
                case 'Digit3':
                case 'Digit4':
                case 'Digit5':
                case 'Digit6':
                case 'Digit7':
                case 'Digit8':
                case 'Digit9':
                    e.preventDefault();
                    const index = parseInt(e.code.replace('Digit', '')) - 1;
                    if (index >= 0 && index < this.effects.length) {
                        this.switchToIndex(index);
                    }
                    break;
            }
        };
        
        document.addEventListener('keydown', this.keyboardHandler);
    }
    
    previousEffect() {
        if (this.isChanging) return;
        
        const newIndex = this.currentIndex === 0 ? this.effects.length - 1 : this.currentIndex - 1;
        this.switchToIndex(newIndex);
    }
    
    nextEffect() {
        if (this.isChanging) return;
        
        const newIndex = (this.currentIndex + 1) % this.effects.length;
        this.switchToIndex(newIndex);
    }
    
    switchToIndex(index) {
        if (this.isChanging || index === this.currentIndex || index < 0 || index >= this.effects.length) {
            return;
        }
        
        this.isChanging = true;
        this.currentIndex = index;
        
        try {
            this.switchCallback(index);
        } catch (error) {
            console.error('切换效果时出错:', error);
        } finally {
            this.isChanging = false;
        }
    }
    
    destroy() {
        // 移除键盘事件监听器
        if (this.keyboardHandler) {
            document.removeEventListener('keydown', this.keyboardHandler);
        }
        
        // 移除按钮事件监听器
        const prevBtn = document.getElementById('prev-effect');
        const nextBtn = document.getElementById('next-effect');
        
        if (prevBtn) {
            prevBtn.replaceWith(prevBtn.cloneNode(true));
        }
        
        if (nextBtn) {
            nextBtn.replaceWith(nextBtn.cloneNode(true));
        }
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EffectSwitcher, BaseSwitcher };
} else {
    window.EffectSwitcher = EffectSwitcher;
    window.BaseSwitcher = BaseSwitcher;
}
