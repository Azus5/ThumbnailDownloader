const express = require('express');
const fs = require('fs');
const downloadThumb = require('./services/getImage')


const routes = express.Router();

routes.get('/download/:videoID', async function (req, res) {
    let params = req.params;
    let path = "../frontend/src/assets/" + `${params.videoID}.jpg`;
    const statusCode = await downloadThumb(params.videoID);
    console.log('statusCode: ' + statusCode);
    if (statusCode) res.download(path);
})

module.exports = routes;