import { spawn } from 'child_process';
import { assert } from 'console';

// url with socks5 proxies on each line, format ip:port
export async function getProxies(url?: string) {
   if (!url) {
      url = 'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/socks5.txt';
   }

   return fetch(url)
      .then(res => res.text())
      .then(text =>
         text
         .split('\n')
         .map(x => 'socks5://' + x.trim())
      );
}

// check if the proxy can connect to powerline
// format socks5://ip:port
export async function testProxyPowerline(proxyUrl: string): Promise<boolean> {
   proxyUrl = proxyUrl.substring(9); // remove socks5://
   proxyUrl = proxyUrl.replace(':', '+');
   
   return new Promise((resolve) => {
      const child = spawn('node', ['./pl-bot/bot.js', 'test', proxyUrl, 'TESTING'], {
         // stdio: 'inherit'
      });

      child.on('exit', (code, signal) => {
         if ( !(code === 0 || code === 1) ) {
            console.error('code>1');
            process.exit(60);
         }
         resolve(!code);
      });

      child.on('error', (err) => {
         console.error(`Child encountered error:`, err);
         process.exit(61);
      });
   });
}