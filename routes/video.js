module.exports = function(req, res) {
    // sess = req.session;
    // if(sess.email == 'admin') {
        // const sqlite3       = require('sqlite3').verbose();
        // const dba           = new sqlite3.Database('./db/data.db');
        // const dbe           = new sqlite3.Database('./db/episode.db');
        const fs            = require("fs");

        const config        = require('../config');
        var getparams       = req.params.action;

        const paths = '/mnt/chromeos/MyFiles/Downloads/clonner/minioppai/downloading/videos/'+getparams;
        // const stat = fs.statSync(path)
        // const fileSize = stat.size
        // const head = {
        //     'Content-Length': fileSize,
        //     'Content-Type': 'video/mp4',
        // }
        // res.writeHead(200, head)
        // fs.createReadStream(path).pipe(res)

        const range = req.headers.range;
        // console.log(range);
        if (!range) {
          res.status(400).send("Requires Range header");
        }
      
        // get video stats (about 61MB)
        const videoPath = paths;
        const videoSize = fs.statSync(paths).size;
      
        // Parse Range
        // Example: "bytes=32324-"
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      
        // Create headers
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };
      
        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
};