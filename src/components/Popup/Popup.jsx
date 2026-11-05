import { useRef } from 'react';
import './Popup.scss';
import PropType from 'prop-types';

export default function Popup({ setVideoList, setCurrentVideoSrc, setIsPopup }) {

    const srcInputRef = useRef(null);
    const handlePlay = async () => {
        if (!(await validateVideoUrl(srcInputRef.current.value))) return alert('Invalid URL');

        setVideoList(prev => [...prev, srcInputRef.current.value]);
        setCurrentVideoSrc(srcInputRef.current.value);
        setIsPopup(false);
    }

    function validateVideoUrl(url) {
        return new Promise(resolve => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => resolve(true);
            video.onerror = () => resolve(false);
            video.src = url;
        });
    }


    return (
        <><div className="Popup-wrapper" onClick={() => setIsPopup(false)}>
            <div className='Popup' onClick={e => e.stopPropagation()}>
                <h1>Paste your video URL</h1>
                <input type="text" placeholder="Enter video URL (should end with .mp4, .mkv, etc.)" ref={srcInputRef} />
                <button className='play-btn' onClick={handlePlay}>Play</button>
            </div>
        </div>
        </>
    )
}

Popup.propTypes = {
    setVideoList: PropType.func.isRequired,
    setCurrentVideoSrc: PropType.func.isRequired,
    setIsPopup: PropType.func.isRequired,
}