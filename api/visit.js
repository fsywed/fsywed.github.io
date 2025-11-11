// api/visit.js - 访问记录API
module.exports = (req, res) => {
  // 设置CORS头，允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 处理POST请求
  if (req.method === 'POST') {
    try {
      const visitData = req.body;
      console.log('📝 收到访问记录:', visitData);
      
      // 返回成功响应
      return res.status(200).json({
        success: true,
        message: '访问记录已保存',
        data: visitData,
        serverTime: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ 处理请求出错:', error);
      return res.status(500).json({
        success: false,
        message: '服务器错误',
        error: error.message
      });
    }
  }
  
  // 处理GET请求（测试用）
  res.status(200).json({
    message: '访问记录API工作正常',
    timestamp: new Date().toISOString(),
    endpoint: '/api/visit'
  });
};
