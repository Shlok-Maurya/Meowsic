import React from 'react';
import './Right.css';

function Right({ trendingSongs, ninetSongs, playSong, currentCategory, currentSongIndex, isPlaying }) {
  return (
    <div className="right">
      <div className="trending">
        <h2>Trending songs</h2>
        <div className="card-container" id="trending-cards">
          {trendingSongs.map((song, index) => {
            const isThisActive = currentCategory === 'trending' && currentSongIndex === index;
            return (
              <div 
                key={index} 
                className={`card ${isThisActive && isPlaying ? 'playing' : ''}`} 
                onClick={() => playSong('trending', index)}
              >
                <div className="play-btn">
                  <div className="play-icon"></div>
                </div>
                <img src={song.coverPath} alt={song.title} onError={(e) => {e.target.src='cover.jpg'}} />
                <strong>{song.title}</strong>
                <span>{song.artist}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="nine-tea">
        <h2>90's songs</h2>
        <div className="card-container" id="ninet-cards">
          {ninetSongs.map((song, index) => {
            const isThisActive = currentCategory === 'ninet' && currentSongIndex === index;
            return (
              <div 
                key={index} 
                className={`card ${isThisActive && isPlaying ? 'playing' : ''}`} 
                onClick={() => playSong('ninet', index)}
              >
                <div className="play-btn">
                  <div className="play-icon"></div>
                </div>
                <img src={song.coverPath} alt={song.title} onError={(e) => {e.target.src='cover.jpg'}} />
                <strong>{song.title}</strong>
                <span>{song.artist}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="copyright">© 2025 Meowsic -by Shlok</div>
    </div>
  );
}

export default Right;