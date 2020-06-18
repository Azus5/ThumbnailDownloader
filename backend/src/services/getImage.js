const axios = require('axios');
const Path = require('path');
const fs = require('fs');
let responseStatus;

async function downloadThumb(videoID, quality) {
  await axios({
    method: 'get',
    url: `https://img.youtube.com/vi/${videoID}/${quality}.jpg`,
    responseType: 'stream'
  })
  .then(response => {
    const path = Path.join(__dirname, 'images', `${quality} - ${videoID}.jpg`);
    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);
    responseStatus = response.status
  })
  .catch(err => {
    console.log('Failed to get image, error: ' + err.message);
    responseStatus = err.response.status;
  })
  return responseStatus;
}

module.exports = downloadThumb;