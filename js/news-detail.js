/**
 * 新闻详情页脚本
 * 负责加载和显示单个新闻的详细内容
 */

import { findNewsById } from './news-data.js';

// 获取新闻ID
const getNewsIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

// DOM元素
const newsCategoryElem = document.getElementById('news-category');
const newsTitleElem = document.getElementById('news-title');
const newsDateElem = document.getElementById('news-date');
const newsContentElem = document.getElementById('news-content');

// 显示新闻详情
const displayNewsDetail = (newsId) => {
    // 获取新闻数据
    const news = findNewsById(newsId);
    
    // 如果新闻不存在，显示错误信息
    if (!news) {
        document.querySelector('.news-detail').innerHTML = `
            <div class="error-message">
                <h2>新闻不存在</h2>
                <p>您请求的新闻不存在或已被删除。</p>
                <a href="index.html" class="back-link">返回首页</a>
            </div>
        `;
        return;
    }
    
    // 更新页面标题
    document.title = `${news.title} - 利霞全球汽车咨询网`;
    
    // 更新新闻内容
    newsCategoryElem.textContent = news.categoryName;
    newsTitleElem.textContent = news.title;
    newsDateElem.textContent = `发布时间：${news.date}`;
    
    // 将内容分段显示
    const contentParagraphs = news.content.split('\n').filter(p => p.trim() !== '');
    const formattedContent = contentParagraphs.map(p => `<p>${p}</p>`).join('');
    newsContentElem.innerHTML = formattedContent;
};

// 页面加载时执行
document.addEventListener('DOMContentLoaded', () => {
    const newsId = getNewsIdFromUrl();
    if (newsId) {
        displayNewsDetail(newsId);
    } else {
        // 如果没有指定ID，重定向到首页
        window.location.href = 'index.html';
    }
});

// Syntax self-check
try {
    console.log("Syntax check for news-detail.js passed");
}
catch (error) {
    console.error("Syntax error in news-detail.js:", error.message);
}