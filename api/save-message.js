// api/save-message.js - 完整信息收集版本
export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS,GET');
res.setHeader('Access-Control-Allow-Headers','Content-Type');
if(req.method==='OPTIONS'){return res.status(200).end();}
if(req.method==='POST'){
try{
const{name,message,timestamp,action,screenSize,timezone}=req.body;
const clientIP=req.headers['x-forwarded-for']||req.connection.remoteAddress||'未知';
const cleanIP=clientIP.split(',')[0].trim();
const visitRecord={
id:Date.now().toString(),
name:name||'匿名用户',
message:message||'无留言',
timestamp:timestamp||new Date().toISOString(),
action:action||'unknown',
ip:cleanIP,
userAgent:req.headers['user-agent']||'未知',
acceptLanguage:req.headers['accept-language']||'未知',
referer:req.headers['referer']||'直接访问',
country:req.headers['x-vercel-ip-country']||'未知',
city:req.headers['x-vercel-ip-city']||'未知',
region:req.headers['x-vercel-ip-country-region']||'未知',
timezone:req.headers['x-vercel-ip-timezone']||timezone||'未知',
screenSize:screenSize||'未知',
host:req.headers['host'],
origin:req.headers['origin']
};
console.log('🌐 完整访问者信息:');
console.log('📍 IP:',visitRecord.ip);
console.log('🗺️ 位置:',visitRecord.country,visitRecord.city,visitRecord.region);
console.log('💻 设备:',visitRecord.userAgent);
console.log('🖥️ 屏幕:',visitRecord.screenSize);
console.log('🗣️ 语言:',visitRecord.acceptLanguage);
console.log('👤 用户:',visitRecord.name);
console.log('💬 留言:',visitRecord.message);
console.log('📄 来源:',visitRecord.referer);
console.log('⏰ 时间:',visitRecord.timestamp);
console.log('🔗 动作:',visitRecord.action);
console.log('🌐 时区:',visitRecord.timezone);
return res.status(200).json({
success:true,
message:'信息接收成功！',
collectedInfo:{
ip:visitRecord.ip,
location:`${visitRecord.country} ${visitRecord.city}`,
device:visitRecord.userAgent.substring(0,50)+'...'
}
});
}catch(error){
console.error('处理请求时出错:',error);
return res.status(500).json({success:false,error:'服务器内部错误'});
}
}
if(req.method==='GET'){
return res.status(200).json({
success:true,
message:'数据API正常工作',
endpoint:'/api/save-message',
usage:'发送POST请求记录访问数据'
});
}
return res.status(405).json({success:false,error:'只支持POST和GET请求'});
}