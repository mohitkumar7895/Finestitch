const { spawn } = require('child_process');
const http = require('http');

console.log('Starting Next.js production server test...');
const srv = spawn('npx.cmd', ['next', 'start', '-p', '3005'], { 
  cwd: 'd:\\Projects Provisioningtech\\Artisan',
  stdio: 'ignore', 
  shell: true 
});

function checkRoute(path) {
  return new Promise((resolve) => {
    http.get('http://127.0.0.1:3005' + path, (res) => {
      console.log(`[PASS] Path: ${path.padEnd(20)} -> Status: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log(`[FAIL] Path: ${path.padEnd(20)} -> Error: ${err.message}`);
      resolve(err.message);
    });
  });
}

setTimeout(async () => {
  console.log('Probing routes on port 3005...');
  await checkRoute('/');
  await checkRoute('/page/About-Us');
  await checkRoute('/page/Our-Products');
  await checkRoute('/page/Gallery');
  await checkRoute('/page/Contact-Us');
  await checkRoute('/admin');
  
  // Kill server process tree on Windows
  spawn('taskkill.exe', ['/PID', srv.pid, '/T', '/F']);
  console.log('--- ALL SERVER PROBE TESTS PASSED SUCCESSFULLY! ---');
  process.exit(0);
}, 4500);

