import React, { useState } from 'react';
import api from '../../services/api';
import { FiSearch } from 'react-icons/fi';

import './styles.css';

export default function Home() {
  const [url, setUrl] = useState('');
  const [ allowDownload, setDisplay ] = useState(false);
  const [paths, setPaths] = useState([]);

  function showDownload() {
    if (url.length > 5) {
      let videoLink = url.slice(0, url.indexOf('=') + 1)
      if (videoLink === "https://www.youtube.com/watch?v=") {
        let videoID = url.slice(url.indexOf('=') + 1);
        let lowQuality = `https://img.youtube.com/vi/${videoID}/sddefault.jpg`
        if(allowDownload) {
          return (
            <div className="download">
              <img className="miniature" src={lowQuality} alt="miniature" />
              <div className="options">
                <button onClick={handleDownload}>High</button>
              </div>
            </div>
          );
        }
      }
    }
    else {
      return (
        <span className="invalid-url">Invalid URL, please type again.</span>
      )
    }
  }

  async function handleDownload() {
    let videoID = url.slice(url.indexOf('=') + 1);
    try {
      // const response = await api.get(`/download`);
      window.open('http://localhost:8081/download');
    } catch (err) {
      console.log("Get error: " + err.message);
    }
  }

  return (
    <div className="container">
      <h1><span className="first-char">T</span>humbnail <span className="first-char green-part">D</span><span className="green-part">onwloader</span></h1>
      <form onSubmit={async function(e) {
        e.preventDefault();
        await handleDownload();
        setDisplay(true);
      }}>
        <input
          type="text"
          placeholder="Please type the video url here"
          value={url}
          onChange={e => setUrl(e.target.value)} />
        <button type="submit"><FiSearch size={20} /></button>
      </form>
      {showDownload()}
    </div>
  );
}