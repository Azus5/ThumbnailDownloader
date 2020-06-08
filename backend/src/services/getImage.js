const axios = require('axios');
const fs = require('fs');
const Path = require('path');


async function downloadThumb(videoID) {
  axios({
    method: 'get',
    url: `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
    responseType: 'stream'
  })
  .then(response => {
    const path = "../../ThumbnailDownloader/frontend/src/assets/" + `${videoID}.jpg`;
    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);
    return response.status;
  })
  .catch(err => {
    console.log('Failed to get imagem, error: ' + err.message);
    return false;
  })

  return true;
}

module.exports = downloadThumb;