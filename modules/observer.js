const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const NAMES = require('./names');

class Observer extends EventEmitter {
    constructor() {
        super();
    }
    watchFolder(folder) {
        try {
            console.log(`[${new Date().toLocaleString()}] Watching in folder changes on: ${folder}`);
            
            let watcher = chokidar.watch(folder, {
                persistent: true,
                awaitWriteFinish: {
                    stabilityThreshold: 5000,
                    pollInterval: 100
                }
            });
      
            watcher.on('add', async filePath => {
                if ((filePath.includes('.webm') || filePath.includes('.mp4') || filePath.includes('.mkv')) && (!filePath.includes('.f') && !filePath.includes('temp'))) {
                    let names = new NAMES(filePath);

                    console.log(`[${new Date().toLocaleString()}] Starting Javy Process for: ${names.name}`);

                    this.emit('added', {path: filePath});
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Observer;
