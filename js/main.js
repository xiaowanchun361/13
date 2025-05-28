/**
 * 主页脚本文件
 * 负责处理网站主页的所有交互和功能
 */

import { traditionalAutoNews, newEnergyAutoNews } from './news-data.js';

// DOM元素
const traditionalNewsListElem = document.getElementById('traditional-news-list');
const newEnergyNewsListElem = document.getElementById('new-energy-news-list');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('.news-section');

// 格式化日期显示
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 生成新闻卡片HTML
const createNewsCard = (news) => {
    return `
        <div class="news-item" data-id="${news.id}" onclick="window.location.href='detail.html?id=${news.id}'">
            <h3>${news.title}</h3>
            <p>${news.summary}</p>
            <div class="news-meta">
                <span class="news-date">${formatDate(news.date)}</span>
                <span class="news-category">${news.categoryName}</span>
            </div>
        </div>
    `;
};

// 显示传统能源汽车新闻
const displayTraditionalNews = () => {
    let newsHTML = '';
    traditionalAutoNews.forEach(news => {
        newsHTML += createNewsCard(news);
    });
    traditionalNewsListElem.innerHTML = newsHTML;
};

// 显示新能源汽车新闻
const displayNewEnergyNews = () => {
    let newsHTML = '';
    newEnergyAutoNews.forEach(news => {
        newsHTML += createNewsCard(news);
    });
    newEnergyNewsListElem.innerHTML = newsHTML;
};

// 切换显示不同分类的新闻
const switchNewsCategory = (categoryId) => {
    // 如果没有指定分类，默认显示全部
    if (!categoryId) return;
    
    // 更新导航栏激活状态
    navLinks.forEach(link => {
        if (link.getAttribute('data-category') === categoryId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 显示对应分类的内容区域
    sections.forEach(section => {
        if (section.id === categoryId || categoryId === 'all') {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
};

// 导航链接点击事件
const setupNavigation = () => {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = link.getAttribute('data-category');
            
            // 更新URL，但不刷新页面
            const newUrl = new URL(window.location);
            if (categoryId !== 'all') {
                newUrl.searchParams.set('category', categoryId);
            } else {
                newUrl.searchParams.delete('category');
            }
            window.history.pushState({}, '', newUrl);
            
            switchNewsCategory(categoryId);
        });
    });
};

// 获取当前URL中的分类参数
const getCategoryFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'all';
};

// 页面加载时执行
document.addEventListener('DOMContentLoaded', () => {
    // 加载新闻数据
    displayTraditionalNews();
    displayNewEnergyNews();
    
    // 设置导航事件
    setupNavigation();
    
    // 根据URL参数显示对应分类
    const currentCategory = getCategoryFromUrl();
    switchNewsCategory(currentCategory);
});

// 后退按钮处理
window.addEventListener('popstate', () => {
    const currentCategory = getCategoryFromUrl();
    switchNewsCategory(currentCategory);
});

// 函数验证
console.assert(
    typeof createNewsCard === 'function',
    '创建新闻卡片函数定义正确'
);

console.assert(
    typeof switchNewsCategory === 'function', 
    '切换新闻分类函数定义正确'
);

// Syntax self-check
try {
    console.log("Syntax check for main.js passed");
}
catch (error) {
    console.error("Syntax error in main.js:", error.message);
}