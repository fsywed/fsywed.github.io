export default async function handler(request, response) {
  // 设置CORS头
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { language, code, stdin } = request.body;

    if (!language || !code) {
      return response.status(400).json({ error: 'Missing language or code' });
    }

    // 映射语言到Piston API格式
    const languageMap = {
      'python': { language: 'python', version: '3.10.0' },
      'cpp': { language: 'c++', version: '10.2.0' },
      'c++': { language: 'c++', version: '10.2.0' },
      'javascript': { language: 'javascript', version: '18.15.0' },
      'js': { language: 'javascript', version: '18.15.0' },
      'java': { language: 'java', version: '15.0.2' },
      'c': { language: 'c', version: '10.2.0' }
    };

    const langConfig = languageMap[language];
    if (!langConfig) {
      return response.status(400).json({ error: 'Unsupported language' });
    }

    // 调用Piston API
    const pistonResponse = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [{
          name: langConfig.language === 'c++' ? 'main.cpp' : 
                langConfig.language === 'python' ? 'main.py' : 
                langConfig.language === 'java' ? 'Main.java' : 'main.c',
          content: code
        }],
        stdin: stdin || '',
        compile_timeout: 10000,
        run_timeout: 5000
      })
    });

    if (!pistonResponse.ok) {
      const errorText = await pistonResponse.text();
      console.error('Piston API error:', errorText);
      return response.status(500).json({ 
        error: 'Compilation failed', 
        details: errorText 
      });
    }

    const result = await pistonResponse.json();
    
    // 返回结果
    return response.status(200).json({
      success: true,
      language: langConfig.language,
      version: langConfig.version,
      run: result.run,
      compile: result.compile
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return response.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
