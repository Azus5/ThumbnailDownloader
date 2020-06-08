import React, { useState } from 'react';
// import api from '../../services/api'
// import empty_background from '../../assets/transparent_background.png';
import { FiSearch } from 'react-icons/fi'

import './styles.css';

export default function Home() {
    const [ url, setUrl ] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
    }

    function showDownload() {
        if (url.length > 5) {
            let videoLink = url.slice(0, url.indexOf('=') + 1)
            if (videoLink === "https://www.youtube.com/watch?v=") {
                let videoID = url.slice(url.indexOf('=') + 1);
                let imageURL = `https://img.youtube.com/vi/${videoID}/sddefault.jpg`
                return(
                    <img class="miniature" src={imageURL} alt="miniature" />
                );
            } else {
                return (
                    <span className="invalid-url">Invalid URL, please type again.</span>
                )
            }  
        }
    }

    // async function handleDownload(event) {
    //     event.preventDefault();
    //     let videoID = url.slice(url.indexOf('=') + 1);
    //     try {
    //         const response = await api.get(`/${videoID}`);
    //         console.log(response.data.fileName);
    //     } catch(err) {
    //         console.log("Get error: " + err.message);
    //     }
    // }

    return(
        <div className="container">
            <h1><span className="first-char">T</span>humbnail <span className="first-char green-part">D</span><span className="green-part">onwloader</span></h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Please type the video url here"
                    value={url}
                    onChange={e => setUrl(e.target.value)}/>
                <button type="submit"><FiSearch size={25}/></button>
            </form>
            {showDownload()}
        </div>
    );
}