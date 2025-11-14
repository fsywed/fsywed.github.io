// dashboard.js
class Dashboard {
    constructor() {
        this.data = [];
        this.stats = {};
        this.trendChart = null;
        this.sourceChart = null;
    }
    
    async loadData() {
        try {
            // 加载访问数据
            const dataResponse = await fetch('https://raw.githubusercontent.com/fsywed/fsywed.github.io/main/data/visitors.json');
            this.data = await dataResponse.json();
            
            // 加载统计数据
            const statsResponse = await fetch('https://raw.githubusercontent.com/fsywed/fsywed.github.io/main/data/stats.json');
            this.stats = await statsResponse.json();
            
            this.updateDashboard();
            this.updateCharts();
            
        } catch (error) {
            console.error('加载数据失败:', error);
            document.getElementById('dataContainer').innerHTML = '<p>加载数据失败，请稍后重试</p>';
        }
    }
    
    updateDashboard() {
        // 更新统计卡片
        document.getElementById('totalVisits').textContent = this.stats.totalVisitors || 0;
        document.getElementById('uniqueVisitors').textContent = this.stats.uniqueVisitors || 0;
        document.getElementById('dailyAverage').textContent = this.calculateDailyAverage();
        document.getElementById('lastSync').textContent = this.formatDate(this.stats.lastUpdated);
        document.getElementById('lastUpdate').textContent = `最后更新: ${this.formatDate(new Date())}`;
        
        // 更新数据表格
        this.updateDataTable();
    }
    
    calculateDailyAverage() {
        if (!this.stats.byDate) return 0;
        const days = Object.keys(this.stats.byDate).length;
        return days > 0 ? Math.round(this.stats.totalVisitors / days) : 0;
    }
    
    updateDataTable() {
        const container = document.getElementById('dataContainer');
        const timeRange = document.getElementById('timeRange').value;
        const filteredData = this.filterDataByTimeRange(timeRange);
        
        if (filteredData.length === 0) {
            container.innerHTML = '<p>暂无数据</p>';
            return;
        }
        
        let html = `
            <div style="margin-bottom: 15px; color: #666;">
                显示 ${filteredData.length} 条记录
            </div>
            <table>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>留言</th>
                        <th>来源</th>
                        <th>时间</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        filteredData.slice(0, 50).forEach(item => {
            html += `
                <tr>
                    <td><strong>${this.escapeHtml(item.name)}</strong></td>
                    <td>${this.escapeHtml(item.message || '无留言')}</td>
                    <td>${this.escapeHtml(item.website)}</td>
                    <td>${this.formatDate(item.timestamp)}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        
        if (filteredData.length > 50) {
            html += `<div style="margin-top: 15px; color: #666;">仅显示最近50条记录，共${filteredData.length}条</div>`;
        }
        
        container.innerHTML = html;
    }
    
    filterDataByTimeRange(range) {
        if (range === 'all') return this.data;
        
        const days = parseInt(range);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        return this.data.filter(item => new Date(item.timestamp) >= cutoffDate);
    }
    
    updateCharts() {
        this.updateTrendChart();
        this.updateSourceChart();
    }
    
    updateTrendChart() {
        const ctx = document.getElementById('trendChart').getContext('2d');
        
        if (this.trendChart) {
            this.trendChart.destroy();
        }
        
        // 处理日期数据
        const dateCounts = this.stats.byDate || {};
        const labels = Object.keys(dateCounts).slice(-30); // 最近30天
        const data = labels.map(label => dateCounts[label]);
        
        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '每日访问量',
                    data: data,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }
    
    updateSourceChart() {
        const ctx = document.getElementById('sourceChart').getContext('2d');
        
        if (this.sourceChart) {
            this.sourceChart.destroy();
        }
        
        const sourceData = this.stats.byWebsite || {};
        const labels = Object.keys(sourceData);
        const data = Object.values(sourceData);
        
        this.sourceChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#4CAF50', '#2196F3', '#FF9800', '#E91E63',
                        '#9C27B0', '#00BCD4', '#8BC34A', '#FFC107'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
    
    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('zh-CN');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `website-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
}

// 全局函数供HTML调用
const dashboard = new Dashboard();

function loadData() {
    dashboard.loadData();
}

function exportData() {
    dashboard.exportData();
}

// 页面加载时自动加载数据
window.addEventListener('load', loadData);