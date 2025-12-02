import React from 'react';
import Left from './Left';
import Right from './Right';
import './Centre.css';

function Centre(props) {
  return (
    <div className="centre">
      <Left 
        currentSong={props.currentSong}
        isPlaying={props.isPlaying}
        currentTime={props.currentTime}
        duration={props.duration}
        formatTime={props.formatTime}
        handleSeek={props.handleSeek}
        handleNext={props.handleNext}
        handlePrev={props.handlePrev}
        togglePlayPause={props.togglePlayPause}
      />
      <Right 
        trendingSongs={props.trendingSongs}
        ninetSongs={props.ninetSongs}
        playSong={props.playSong}
        currentCategory={props.currentCategory}
        currentSongIndex={props.currentSongIndex}
        isPlaying={props.isPlaying}
      />
    </div>
  );
}

export default Centre;