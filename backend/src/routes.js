const express = require('express');
const Path = require('path');
const fs = require('fs');
const downloadThumb = require('./services/getImage');
const { response } = require('express');


const routes = express.Router();

routes.get('/download/:filename', (req, res) => {
    let filename = req.params.filename;
    const path = Path.join(__dirname, 'services', 'images', filename);
    res.download(path, (err) => {
        if (err) {
            console.log(`Fail to send the file: ${filename}. Error: ${err.message}`);
        } else {
            console.log('Successfully sended file: ' + filename);
            fs.unlink(path, (err) => {
                if (err) throw err;
                else {
                    console.log('Deleted file: ' + filename);
                }
            }) 
        }
    });
})

routes.get('/:videoID/:quality', async function (req, res) {
    let videoID = req.params.videoID;
    let quality = req.params.quality;
    // ["maxresdefault", "mqdefault", "sddefault"]; 

    let response = await downloadThumb(videoID, quality)
    if(response !== 404) {
        console.log('Successfully downloaded thumnail, filename: ' + `${quality} - ${videoID}.jpg`);
        res.send({
            filename: `${quality} - ${videoID}.jpg`
        });
    } else {
        res.send({
            filename: false
        })
        console.log('An error as occurred, fail to download thumbnail.')
    }
})

module.exports = routes;