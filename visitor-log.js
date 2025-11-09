// visitor-log.js - 增强版访问者记录系统

// 记录访问者信息
function registerVisitor(name, note = '') {
    let visitors = JSON.parse(localStorage.getItem('siteVisitors') || '[]');
    
    const visitInfo = {
        name: name,
        note: note,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenSize: `${screen.width}×${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || '直接访问'
    };
    
    visitors.push(visitInfo);
    
    // 只保留最近50条记录避免占用太多空间
    if (visitors.length > 50) {
        visitors = visitors.slice(-50);
    }
    
    localStorage.setItem('siteVisitors', JSON.stringify(visitors));
    
    // 更新访问统计
    updateVisitStats();
    
    console.log(`访问者登记: ${name}`);
}

// 更新访问统计
function updateVisitStats() {
    let stats = JSON.parse(localStorage.getItem('visitStats') || '{}');
    
    stats.totalVisits = (stats.totalVisits || 0) + 1;
    stats.lastVisit = new Date().toISOString();
    
    if (!stats.firstVisit) {
        stats.firstVisit = new Date().toISOString();
    }
    
    localStorage.setItem('visitStats', JSON.stringify(stats));
    return stats;
}

// 显示快速统计（在登记页面显示）
function displayQuickStats() {
    const stats = JSON.parse(localStorage.getItem('visitStats') || '{}');
    const visitors = JSON.parse(localStorage.getItem('siteVisitors') || '[]');
    
    if (stats.totalVisits) {
        console.log(`本站已被访问 ${stats.totalVisits} 次`);
        console.log(`已有 ${visitors.length} 位朋友登记`);
    }
}

// 获取所有访问者记录（供你自己查看）
function getAllVisitors() {
    return JSON.parse(localStorage.getItem('siteVisitors') || '[]');
}

// 获取访问统计（供你自己查看）
function getVisitStats() {
    return JSON.parse(localStorage.getItem('visitStats') || '{}');
}

// 清除所有记录（调试用）
function clearAllRecords() {
    localStorage.removeItem('siteVisitors');
    localStorage.removeItem('visitStats');
    console.log('所有访问记录已清除');
}

// 导出函数供全局使用
window.registerVisitor = registerVisitor;
window.getAllVisitors = getAllVisitors;
window.getVisitStats = getVisitStats;
window.displayQuickStats = displayQuickStats;
