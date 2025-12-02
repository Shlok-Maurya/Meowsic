import React from 'react';
import './Left.css';

function Left({ currentSong, isPlaying, currentTime, duration, formatTime, handleSeek, handleNext, handlePrev, togglePlayPause }) {
  
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="left">
      <h2 className="player-heading">Now Playing</h2>
      <img 
        id="now-playing-cover" 
        src={currentSong ? currentSong.coverPath : "cover.jpg"} 
        alt="Album Art" 
      />

      <div className="now-playing-details">
        <strong id="now-playing-title">{currentSong ? currentSong.title : "Select a Song"}</strong>
        <span id="now-playing-artist">{currentSong ? currentSong.artist : ""}</span>
      </div>

      <div className="seek-bar-container">
        <span id="current-time">{formatTime(currentTime)}</span>
        <input 
          type="range" 
          id="seek-bar" 
          value={progressPercent} 
          min="0" 
          max="100" 
          onChange={handleSeek}
          style={{ '--progress-percent': `${progressPercent}%` }}
        />
        <span id="total-duration">{formatTime(duration)}</span>
      </div>

      <div className="control-buttons">
        <img src="previous.svg" alt="Previous" className="control-icon" id="prev-btn" onClick={handlePrev} />
        <img 
            src={isPlaying ? "pause.svg" : "play.svg"} 
            alt="Play" 
            className="control-icon play-pause" 
            id="play-pause-btn" 
            onClick={togglePlayPause}
        />
        <img src="next.svg" alt="Next" className="control-icon" id="next-btn" onClick={handleNext} />
      </div>
      <div className='cat'><img src="catguitar.gif" alt="" /></div>
    </div>
  );
}

export default Left;