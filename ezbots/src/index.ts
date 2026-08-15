import Readline from 'readline';
import { getProxies } from "./proxy.js";
import { Worker } from 'worker_threads';
import { ChildProcess, ChildProcessWithoutNullStreams, spawn } from 'child_process';

const PROXY_MAX_USES = 3;

const proxies = await getProxies();
console.log(`fetched ${proxies.length} proxies`);

// -1 not processed
// 0 bad
// 1 good
const proxiesStates = new Array(proxies.length).fill(-1);

// how many bots use this proxy
const proxyUses = new Array(proxies.length).fill(0);

function getFreeProxy(): number {
   for (let i = 0; i < proxies.length; ++i) {
      if (proxiesStates[i] === 1 && proxyUses[i] < PROXY_MAX_USES) {
         return i;
      }
   }
   return -1;
}

const bots: Bot[] = []; // the list of created bots

// startup worker
const worker = new Worker('./dist/worker.js', {
   workerData: { proxies: proxies }
});

worker.on('message', (msg) => {
   const index: number = msg.index;
   const state: boolean = msg.state;

   if (state) {
      proxiesStates[index] = 1;
   } else {
      proxiesStates[index] = 0;
   }
});


// start with the repl
startREPL();

function startREPL() {
   const rl = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
   });

   rl.on('line', (line) => {
      const input = line.trim();

      if (input === 'help') {
         console.log('TODO');
      } else if (input === 'status') {
         const countProcessed = proxiesStates.filter(x => x !== -1).length;
         const countGood = proxiesStates.filter(x => x === 1).length;
         const finished = countProcessed === proxies.length;
         console.log(`Current status: ${finished ? 'IDLE' : 'TESTING proxies'}`);
         console.log(`Processed: ${countProcessed}/${proxies.length}`);
         console.log(`Good proxies found: ${countGood}`);
      } else if (input === 'ls' || input === 'list') {
         console.log('List of created bots:');
         console.log(' NAME      STATUS');
         bots.forEach(bot => {
            console.log(`  ${bot.name}      ${bot.proxyIndex !== null ? 'started' : 'stopped'}`);
         });
      } else if (input === 'exit') {
         console.log('bye bye');
         rl.close();
         return;
      } else if (input.startsWith('add ')) {
         const arg = input.substring(input.indexOf(' ') + 1);
         const argNum = parseInt(arg);
         for (let i = 0; i < argNum; ++i) {
            bots.push({ name: bots.length.toString().padStart(3, '0'), proxyIndex: null, child: null });
         }
      } else if (input.startsWith('del ') || input.startsWith('rm ') || input.startsWith('delete ') || input.startsWith('remove ')) {
         const arg = input.substring(input.indexOf(' ') + 1);
         const argNum = parseInt(arg);
         for (let i = 0; i < argNum; ++i) {
            if (bots.length === 0) {
               break;
            }
            stopBot(bots[bots.length - 1]);
            bots.length -= 1;
         }
      } else if (input === 'start') {
         bots.forEach(bot => {
            startBot(bot);
         });
      } else if (input === 'stop') {
         bots.forEach(bot => {
            stopBot(bot);
         });
      }

      rl.prompt();
   }).on('close', () => {
      bots.forEach(bot => {
         stopBot(bot);
      });
      process.exit(0);
   });

   console.log('I am processing the proxy list to find good ones.');
   console.log('Type \'help\' or \'status\'.');
   rl.prompt();
}


export type Bot = {
   name: string;
   proxyIndex: number | null;
   child: ChildProcessWithoutNullStreams | ChildProcess | null;
};

export function startBot(bot: Bot) {
   if (bot.proxyIndex !== null) {
      return; // already started
   }
   
   const index = getFreeProxy();
   if (index === -1) {
      console.error('out of free proxies');
      return;
   }
   bot.proxyIndex = index;

   let proxyUrl = proxies[index];
   proxyUrl = proxyUrl.substring(9); // remove socks5://
   proxyUrl = proxyUrl.replace(':', '+');

   proxyUses[index] += 1;
   bot.child = spawn('node', ['./pl-bot/bot.js', bot.name, proxyUrl], { /*stdio: 'inherit'*/ });
   bot.child.once('exit', onExitCallback);

   function onExitCallback(code: number) {
      if (code === 69) {
         setTimeout(() => {
            console.log(`---------- bot ${bot.name} exited! restarting ----------`);
            bot.child = spawn('node', ['./pl-bot/bot.js', bot.name, proxyUrl], { /*stdio: 'inherit'*/ });
            bot.child.once('exit', onExitCallback);
         }, 1000);
      } else {
         console.warn(`child exit code is ${code}!!`);
      }
   };
}

export function stopBot(bot: Bot) {
   if (bot.proxyIndex === null) {
      return;
   }

   proxyUses[bot.proxyIndex] -= 1;
   bot.proxyIndex = null;
   bot.child?.removeAllListeners('exit');
   bot.child?.kill();
}