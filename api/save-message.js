// api/save-message.js
export default async function handler(req, res) {
  // 设置CORS头，允许你的GitHub Pages网站访问这个接口
  res.setHeader('Access-Control-Allow-Origin', 'https://fsywed.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求（OPTIONS）
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只处理POST请求
  if (req.method === 'POST') {
    try {
      const { name, message } = req.body;

      // 简单的数据验证
      if (!name) {
        return res.status(400).json({ 
          success: false, 
          error: '请提供名字' 
        });
      }

      // 在这里处理数据 - 目前先记录到控制台
      console.log('📨 收到新的访问者信息:');
      console.log('   姓名:', name);
      console.log('   留言:', message || '（无留言）');
      console.log('   时间:', new Date().toISOString());
      console.log('   IP:', req.headers['x-forwarded-for'] || req.connection.remoteAddress);

      // 返回成功响应
      return res.status(200).json({
        success: true,
        message: '信息接收成功！',
        receivedData: {
          name,
          message,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('处理请求时出错:', error);
      return res.status(500).json({
        success: false,
        error: '服务器内部错误'
      });
    }
  }

  // 如果不是POST请求，返回错误
  return res.status(405).json({
    success: false,
    error: '只支持POST请求'
  });
}
