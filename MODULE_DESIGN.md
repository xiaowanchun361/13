# 利霞全球汽车咨询网 - 模块设计

## 1. 文件结构

```
/
├── index.html          # 主页
├── detail.html         # 新闻详情页
├── css/
│   └── style.css       # 样式表
├── js/
│   ├── main.js         # 主要业务逻辑
│   ├── news-data.js    # 新闻数据
│   └── news-detail.js  # 详情页逻辑
└── images/             # 图片资源目录
```

## 2. 数据结构

### 2.1 新闻数据结构

```typescript
interface NewsItem {
  id: number;           // 新闻ID
  title: string;        // 新闻标题
  summary: string;      // 新闻摘要
  content: string;      // 新闻正文
  date: string;         // 发布日期
  category: string;     // 分类 "traditional" 或 "newEnergy"
}

type NewsData = {
  traditional: NewsItem[];  // 传统能源汽车新闻
  newEnergy: NewsItem[];    // 新能源汽车新闻
}
```

## 3. 功能模块

### 3.1 新闻数据管理模块 (news-data.js)

```typescript
/**
 * 加载全部新闻数据
 * @returns {NewsData} 新闻数据对象
 */
function loadNewsData(): NewsData;

/**
 * 根据类别获取新闻列表
 * @param {string} category - 新闻类别 ("traditional" 或 "newEnergy")
 * @returns {NewsItem[]} 指定类别的新闻列表
 */
function getNewsByCategory(category: string): NewsItem[];

/**
 * 根据ID获取新闻详情
 * @param {number} id - 新闻ID
 * @param {string} category - 新闻类别
 * @returns {NewsItem|null} 对应ID的新闻项，若不存在则返回null
 */
function getNewsById(id: number, category: string): NewsItem|null;
```

### 3.2 主页面逻辑模块 (main.js)

```typescript
/**
 * 初始化页面
 */
function initPage(): void;

/**
 * 渲染新闻列表
 * @param {string} category - 新闻类别 ("traditional" 或 "newEnergy")
 * @param {HTMLElement} container - 容器元素
 */
function renderNewsList(category: string, container: HTMLElement): void;

/**
 * 切换新闻分类标签
 * @param {string} category - 要激活的分类
 */
function switchCategory(category: string): void;
```

### 3.3 新闻详情页面逻辑 (news-detail.js)

```typescript
/**
 * 初始化详情页面
 */
function initDetailPage(): void;

/**
 * 根据URL参数加载新闻详情
 * @returns {NewsItem|null} 新闻详情数据
 */
function loadNewsDetail(): NewsItem|null;

/**
 * 渲染新闻详情
 * @param {NewsItem} newsItem - 新闻数据项
 */
function renderNewsDetail(newsItem: NewsItem): void;

/**
 * 返回主页
 */
function backToHome(): void;
```

## 4. 界面模块

### 4.1 页面布局

- 页面顶部：网站LOGO和名称
- 导航栏：两个分类标签（全球传统能源汽车新闻、全球新能源汽车新闻）
- 主体内容：新闻列表或新闻详情
- 页脚：版权信息和联系方式

### 4.2 响应式设计

- 桌面端：横向排列，合理利用空间
- 移动端：垂直排列，确保内容可读性