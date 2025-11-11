// api/visit.js
module.exports = (req, res) => {
  // 设置CORS头，允许跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 处理POST请求（收集访问数据）
  if (req.method === 'POST') {
    try {
      const visitData = req.body;
      console.log('📝 收到访问记录:', visitData);
      
      // 这里可以添加数据存储逻辑（比如保存到数据库）
      // 暂时我们先在控制台打印并返回成功消息
      
      return res.status(200).json({
        success: true,
        message: '访问记录已保存',
        data: visitData,
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('处理请求时出错:', error);
      return res.status(500).json({
        success: false,
        message: '服务器内部错误',
        error: error.message
      });
    }
  }
  
  // 处理GET请求（测试用）
  if (req.method === 'GET') {
    res.status(200).json({
      message: '访问记录API已就绪',
      timestamp: new Date().toISOString(),
      usage: '发送POST请求到此端点来记录访问数据'
    });
  }
};
