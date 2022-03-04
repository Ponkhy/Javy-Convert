#  Javy-Convert
  
It's a simple tool to watch on a folder for `.webm`, `.mp4` and `.mkv` files and convert them to `.mp3`.
After the conversion it will move the original and .mp3 file to different folders.
It will also include a thumbnail into the .mp3 file.


**Docker Compose:**

  version: "3"
  services:
    javy-convert:
    	image: ponkhy/javy-convert:latest
    	container_name: Javy-Convert
    	restart: unless-stopped
    	volumes:
    		-  YOUR_WATCH_FOLDER:/watch
    		-  YOUR_CONVERT_FOLDER:/convert
    		-  YOUR_MP3_FOLDER:/to
    		-  YOUR_ORIGINAL_FODLER:/move

The path must end **without "/" slash**!

- /watch => Folder to be watched for changes
- /convert => Temporary folder for conversion
- /to => Folder for the converted .mp3 file
- /move => Folder for the original file after conversion

Run with: `docker-compose up -d`


**Bare Metal:**
- Node JS 17
- Installed ffmpeg and ffprobe >= 0.9 (Path to binary can also be defined in .env file with FFMPEG_PATH and FFPROBE_PATH)
- Paths in the .env needs to be adjusted (The path must end **without "/" slash**!)

Run first: `npm install`

You can run the tool with `npm run start` or `node index.js`.


*I'm not the best developer so any help or suggestions are appreciated!*
