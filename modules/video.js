module.exports = function(req, res) {
    // sess = req.session;
    // if(sess.email == 'admin') {
        const fs            = require("fs");
        var getparams       = req.params.action;

        const paths = '/mnt/chromeos/MyFiles/Downloads/videos/'+getparams;

        const range = req.headers.range;
        // console.log(range);
        if (!range) {
          res.status(400).send("Requires Range header");
        } 
        else {
      
          // get video stats (about 61MB)
          const videoPath = paths;

          try {
            if (fs.existsSync(paths)) {
              
              const videoSize = fs.statSync(paths).size;
        
              // Parse Range
              // Example: "bytes=32324-"
              const CHUNK_SIZE = 10 ** 6; // 1MB
              // console.log(range);
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

            }
            else {
              res.status(400).send("Videos Not Found!");
            }
          } catch(err) {
            console.error(err)
          }
      }
};