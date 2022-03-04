const Promise = require('bluebird')
const FFMPEG = require('fluent-ffmpeg');
const NAMES = require('./names');

module.exports = {
	thumbnail(filePath) {
        return new Promise((resolve, reject) => {
            let names = new NAMES(filePath);

            let proc = FFMPEG(filePath).thumbnail({ count: 1, timemarks: [ '00:00:15.000' ], size: '400x222' }, `${process.env.CONVERT_FOLDER}/${names.withoutExt}`);

            proc.on('error', (err) => { reject(err.message) });
            proc.on('end', () => { resolve(proc) });
        })
	},
    audio(filePath) {
        return new Promise((resolve, reject) => {
            let names = new NAMES(filePath);

            let proc = FFMPEG(filePath).format('mp3').save(`${process.env.CONVERT_FOLDER}/${names.withoutExt}/${names.withoutExt}_tmp.mp3`);

            proc.on('error', (err) => { reject(err.message) });
            proc.on('end', () => { resolve(proc) });
        })
	},
    bundle(filePath) {
        return new Promise((resolve, reject) => {
            let names = new NAMES(filePath);

            let audioCover = `${process.env.CONVERT_FOLDER}/${names.withoutExt}/tn.png`;
            let tmpPath = `${process.env.CONVERT_FOLDER}/${names.withoutExt}/${names.withoutExt}_tmp${process.env.EXTENSION}`;
            let newPath = `${process.env.TO_FOLDER}/${names.withoutExt}${process.env.EXTENSION}`;

            let proc = FFMPEG(tmpPath).addOutputOptions('-i', audioCover, '-map', '0:0', '-map', '1:0', '-c', 'copy', '-id3v2_version', '3').save(newPath);
            
            proc.on('error', (err) => { reject(err.message) });
            proc.on('end', () => { resolve(proc) }); 
        })
	},
}
