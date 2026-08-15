import { spawn } from 'child_process';

function spawnChild(instanceId) {
  const child = spawn('node', ['bot.js'], {
    stdio: 'inherit'
  });

  child.on('exit', (code, signal) => {
    console.log(`Child ${instanceId} exited with code ${code} signal ${signal}. Respawning...`);
    spawnChild(instanceId); // respawn
  });

  child.on('error', (err) => {
    console.error(`Child ${instanceId} encountered error:`, err);
  });
}

for (let i = 1; i <= 100; i++) {
  spawnChild(i);
}
