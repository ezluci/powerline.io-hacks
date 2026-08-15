import { workerData, parentPort } from "worker_threads";
import { testProxyPowerline } from "./proxy.js";
import pLimit from 'p-limit';

// this worker will test some of the proxies and say back the states of each

const limit = pLimit(40); // change this if u have lag -- 10-60
const proxies: string[] = workerData.proxies;

let goodProxies = 0;

Promise.all(
   proxies.map((proxy, i) =>
      limit(async () => {
         if (goodProxies > 30) {
            return parentPort?.postMessage({ index: i, state: false });
         }

         const state = await testProxyPowerline(proxy);
         if (state) {
            goodProxies += 1;
         }
         parentPort?.postMessage({ index: i, state: state });
      })
   )
);