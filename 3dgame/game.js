import * as THREE from 'three';

// 核心变量
let scene, camera, renderer;
let player, enemies = [], bullets = [];
let score = 0;

// 初始化
function init() {
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer({canvas: document.getElementById('game')});
renderer.setSize(window.innerWidth, window.innerHeight);

// 玩家（相机就是玩家）
camera.position.set(0, 1.5, 5);

// 迷宫墙壁
createMaze();

// 敌人（红点）
for(let i=0; i<5; i++) {
createEnemy();
}

// 灯光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 15);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// 事件
window.addEventListener('resize', onResize);
window.addEventListener('click', shoot);
document.addEventListener('keydown', onKeyDown);

// 开始循环
animate();
}

// 创建简单迷宫
function createMaze() {
const wallGeometry = new THREE.BoxGeometry(1, 2, 10);
const wallMaterial = new THREE.MeshPhongMaterial({color: 0x888888});
for(let i=-10; i<=10; i+=5) {
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(i, 1, -5);
scene.add(wall);
}
}

// 创建敌人（红点）
function createEnemy() {
const geometry = new THREE.SphereGeometry(0.3, 8, 8);
const material = new THREE.MeshPhongMaterial({color: 0xff0000});
const enemy = new THREE.Mesh(geometry, material);
enemy.position.set(
( Math.random()-0.5)*20,
0.3,
( Math.random()-0.5)*20 - 10
);
scene.add(enemy);
enemies.push(enemy);
}

// 射击
function shoot() {
const geometry = new THREE.SphereGeometry(0.1, 4, 4);
const material = new THREE.MeshBasicMaterial({color: 0xffff00});
const bullet = new THREE.Mesh(geometry, material);
bullet.position.copy(camera.position);
scene.add(bullet);

// 射击方向
const direction = new THREE.Vector3();
camera.getWorldDirection(direction);
bullet.userData.velocity = direction.multiplyScalar(0.5);
bullets.push(bullet);
}

// 碰撞检测
function checkCollisions() {
for(let i=bullets.length-1; i>=0; i--) {
const bullet = bullets[i];
bullet.position.add(bullet.userData.velocity);

// 检测敌人碰撞
for(let j=enemies.length-1; j>=0; j--) {
const enemy = enemies[j];
if(bullet.position.distanceTo(enemy.position) < 0.5) {
scene.remove(enemy);
scene.remove(bullet);
enemies.splice(j, 1);
bullets.splice(i, 1);
score += 100;
document.getElementById('score').textContent = score;
if(enemies.length === 0) {
for(let k=0; k<5; k++) createEnemy();
}
break;
}
}

// 移除太远的子弹
if(bullet.position.distanceTo(camera.position) > 50) {
scene.remove(bullet);
bullets.splice(i, 1);
}
}
}

// 敌人移动
function moveEnemies() {
enemies.forEach(enemy => {
const dx = camera.position.x - enemy.position.x;
const dz = camera.position.z - enemy.position.z;
const dist = Math.sqrt(dx*dx + dz*dz);
if(dist < 10) {
enemy.position.x += dx/dist * 0.02;
enemy.position.z += dz/dist * 0.02;
}
});
}

// 键盘控制
const keys = {};
function onKeyDown(e) { keys[e.key] = true; }
function onKeyUp(e) { keys[e.key] = false; }
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function updatePlayer() {
const speed = 0.1;
if(keys['w']) camera.position.z -= speed;
if(keys['s']) camera.position.z += speed;
if(keys['a']) camera.position.x -= speed;
if(keys['d']) camera.position.x += speed;
if(keys[' ']) camera.position.y += speed; // 空格上升
if(keys['Shift']) camera.position.y -= speed; // Shift下降
}

// 响应式
function onResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}

// 主循环
function animate() {
requestAnimationFrame(animate);
updatePlayer();
moveEnemies();
checkCollisions();
renderer.render(scene, camera);
}

// 启动游戏
init();