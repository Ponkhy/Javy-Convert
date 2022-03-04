require("dotenv").config();
const { Worker } = require('worker_threads');
const util = require('util');
const mv = require('mv');
const mvPromise = util.promisify(mv);
const Observer = require('./modules/observer');
const observer = new Observer();
const NAMES = require('./modules/names');

function runJavy(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./jobs/worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

observer.on('added', async (file) => {
    let names = new NAMES(file.path);

    let newPath = process.env.CONVERT_FOLDER + "/" + names.name;

    await mvPromise(file.path, newPath);
    console.log(`[${new Date().toLocaleString()}] Moved file to convert: ${names.name}`);

    await runJavy(newPath);
});

observer.watchFolder(process.env.WATCH_FOLDER);
