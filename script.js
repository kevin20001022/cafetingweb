// 创建点的函数
function createPoint() {
    const point = document.createElement('div');
    point.className = 'coffee-point';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    
    return point;
}

// 创建背景点的函数
function createBackgroundPoint() {
    const point = document.createElement('div');
    point.className = 'bg-point';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    point.style.left = `${x}%`;
    point.style.top = `${y}%`;
    
    return point;
}

// 点的动画函数
function animatePoint(point) {
    setTimeout(() => {
        point.style.transition = 'opacity 0.3s ease';
        point.style.opacity = '1';
    }, Math.random() * 300);

    setTimeout(() => {
        point.style.opacity = '0';
        setTimeout(() => {
            point.remove();
        }, 300);
    }, 800 + Math.random() * 500);
}

// 创建初始点阵
function createPoints() {
    const container = document.getElementById('mapContainer');
    let count = 0;
    const totalPoints = 40;
    
    const interval = setInterval(() => {
        if (count >= totalPoints) {
            clearInterval(interval);
            setTimeout(showMainContent, 1000);
            return;
        }

        const point = createPoint();
        container.appendChild(point);
        animatePoint(point);
        count++;
    }, 50);
}

// 添加背景点
function addBackgroundPoints() {
    const container = document.getElementById('backgroundPoints');
    const totalPoints = 60; // 增加点的数量

    for (let i = 0; i < totalPoints; i++) {
        const point = createBackgroundPoint();
        container.appendChild(point);
    }
}

// 显示主内容
function showMainContent() {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.getElementById('mainContent');

    loadingScreen.style.transition = 'opacity 0.5s ease';
    loadingScreen.style.opacity = '0';
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.opacity = '1';
        document.body.style.overflow = 'auto';
        addBackgroundPoints();
    }, 500);
}

// 回到頂部按鈕功能
function handleBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 页面加载事件
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
    createPoints();
    handleBackToTop();
    addBackgroundPoints(); // 在页面加载时就添加背景点
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    const features = document.querySelectorAll('.feature');
    features.forEach(feature => observer.observe(feature));
});
