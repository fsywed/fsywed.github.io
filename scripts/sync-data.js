const DataManager = require('./data-manager');
const axios = require('axios');

async function main() {
    const manager = new DataManager();
    
    try {
        console.log('开始同步Vercel数据...');
        
        // 获取Vercel日志
        const logs = await manager.fetchVercelLogs();
        
        // 解析数据
        const visitorData = manager.parseLogsToData(logs);
        
        if (visitorData.length > 0) {
            console.log(`找到 ${visitorData.length} 条新数据`);
            
            // 保存到GitHub
            await manager.saveToGitHub(visitorData);
            console.log('数据同步完成');
        } else {
            console.log('没有新数据需要同步');
        }
        
    } catch (error) {
        console.error('同步失败:', error.message);
        process.exit(1);
    }
}

main();