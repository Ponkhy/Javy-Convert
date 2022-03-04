require("dotenv").config();
const { workerData } = require("worker_threads");
const util = require('util');
const mv = require('mv');
const mvPromise = util.promisify(mv);
const fsExtra = require('fs-extra');
const ffmpeg = require('../modules/ffmpeg');
const NAMES = require('../modules/names');

(async () => {
    try {
        let names = new NAMES(workerData);
        console.log(names);

        let audioName = names.withoutExt + process.env.EXTENSION;

        console.log(`[${new Date().toLocaleString()}] Generating thumbnail for: ${names.name}`);
        await ffmpeg.thumbnail(names.input);

        console.log(`[${new Date().toLocaleString()}] Generating audio file for: ${names.name}`);
        await ffmpeg.audio(names.input);

        console.log(`[${new Date().toLocaleString()}] Bundle audio and image files for: ${names.withoutExt}`);
        await ffmpeg.bundle(names.input);

        console.log(`[${new Date().toLocaleString()}] Item successfully converted: ${audioName}`);

        let folder = `${process.env.CONVERT_FOLDER}/${names.withoutExt}`;
        fsExtra.rmSync(folder, { recursive: true });

        let newPath = process.env.MOVE_ORIGINAL + "/" + names.name;
        await mvPromise(names.input, newPath);
        console.log(`[${new Date().toLocaleString()}] Original file moved: ${names.name}`);
    } catch (e) {
        console.log(e);
    }
})();
