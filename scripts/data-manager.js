// scripts/data-manager.js
class DataManager {
    constructor() {
        this.dataFile = 'data/visitors.json';
        this.statsFile = 'data/stats.json';
    }
    
    // 从Vercel日志提取数据
    async fetchVercelLogs() {
        // 这里需要Vercel的API密钥和项目ID
        const response = await fetch('https://api.vercel.com/v2/now/deployments/{deploymentId}/logs', {
            headers: {
                'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`
            }
        });
        return await response.json();
    }
    
    // 解析日志中的访问数据
    parseLogsToData(logs) {
        const visitors = [];
        const logLines = logs.split('\n');
        
        logLines.forEach(line => {
            if (line.includes('收到新的访问者数据')) {
                // 解析日志格式，提取数据
                const match = line.match(/姓名: (.*?), 留言: (.*?), 来源: (.*?), 时间: (.*)/);
                if (match) {
                    visitors.push({
                        name: match[1],
                        message: match[2],
                        website: match[3],
                        timestamp: match[4],
                        ip: '从日志解析'
                    });
                }
            }
        });
        
        return visitors;
    }
    
    // 保存数据到GitHub
    async saveToGitHub(data) {
        const existingData = await this.loadExistingData();
        const newData = [...existingData, ...data];
        
        // 这里需要GitHub API来更新文件
        await this.updateGitHubFile(this.dataFile, JSON.stringify(newData, null, 2));
        
        // 更新统计数据
        await this.updateStats(newData);
    }
    
    async updateStats(data) {
        const stats = {
            totalVisitors: data.length,
            uniqueVisitors: new Set(data.map(d => d.name)).size,
            lastUpdated: new Date().toISOString(),
            byWebsite: this.groupByWebsite(data),
            byDate: this.groupByDate(data)
        };
        
        await this.updateGitHubFile(this.statsFile, JSON.stringify(stats, null, 2));
    }
    
    groupByWebsite(data) {
        return data.reduce((acc, item) => {
            acc[item.website] = (acc[item.website] || 0) + 1;
            return acc;
        }, {});
    }
    
    groupByDate(data) {
        return data.reduce((acc, item) => {
            const date = new Date(item.timestamp).toDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
    }
}

module.exports = DataManager;