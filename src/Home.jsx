import React, { useState, useRef, useEffect } from "react";
import Nav from "./components/Nav";
import Centre from "./components/Centre";
import Footer from "./components/Footer";
import "./App.css";

function Home() {
  const trendingSongs = [
      { title: "Phool", artist: "AUR", filePath: "trending/AUR - Phool  پھول.mp3", coverPath: "image.png" },
      { title: "Humsafar", artist: "AUR", filePath: "trending/Humsafar [128] Kbps-(SongsPk.com.se).mp3", coverPath: "image.png" },
      { title: "Kabhi Kabhi", artist: "AUR", filePath: "trending/Kabhi Kabhi(KoshalWorld.Com).mp3", coverPath: "image.png" },
      { title: "Par Ab Jo Aayegi Tu", artist: "AUR", filePath: "trending/Par Ab Jo Aayegi Tu - AUR(MpThree.in).mp3", coverPath: "image.png" },
      { title: "Sanam Teri Kasam", artist: "Ankit Tiwari", filePath: "trending/Sanam Teri Kasam Ankit Tiwari 128 Kbps.mp3", coverPath: "image.png" },
      { title: "Tera Chehra", artist: "Himesh Reshamiya", filePath: "trending/Tera Chehra Sanam Teri Kasam 128 Kbps.mp3", coverPath: "image.png" },
      { title: "Tu Hai Kahan", artist: "AUR", filePath: "trending/Tu Hai Kahan-(Mr-Jat.in).mp3", coverPath: "image.png" }
    ];
  
    const ninetSongs = [
      { title: "Baharon Phool Barsao", artist: "Mohammed Rafi", filePath: "ninet/Baharon Phool Barsao Mera Mehboob Aaya Hai(KoshalWorld.Com).mp3", coverPath: "90s.jpg" },
      { title: "Breathless", artist: "Shankar Mahadevan", filePath: "ninet/Breathless (PenduJatt.Com.Se).mp3", coverPath: "90s.jpg" },
      { title: "Dil To Bachcha Hai", artist: "Rahat Fateh Ali Khan", filePath: "ninet/Dil To Bachcha Hai Ishqiya 128 Kbps.mp3", coverPath: "90s.jpg" },
      { title: "Jaane Kahan Mera Jigar Gaya Ji", artist: "Mohammed Rafi", filePath: "ninet/Jaane Kahan Mera Jigar Gaya Ji(KoshalWorld.Com).mp3", coverPath: "90s.jpg" },
      { title: "Kajra Mohabbat Wala", artist: "Asha Bhosle", filePath: "ninet/Kajra Mohabbat Wala (PenduJatt.Com.Se).mp3", coverPath: "90s.jpg" },
      { title: "Ruk Ja O Dil Deewane", artist: "Udit Narayan", filePath: "ninet/Ruk Ja O Dil Deewane - Dilwale Dulhania Le Jayenge 128 Kbps.mp3", coverPath: "90s.jpg" },
      { title: "Tum Agar Saath Dene Ka Vada Karo", artist: "Mahendra Kapoor", filePath: "ninet/Tum Agar Saath Dene Ka Vada Karo - Hamraaz 128 Kbps.mp3", coverPath: "90s.jpg" }
    ];
  
    // STATE 
    const audioRef = useRef(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(-1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
  
    // LOGIC 
    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "0:00";
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    const playSong = (category, index) => {
      const songsArray = category === 'trending' ? trendingSongs : ninetSongs;
      if (index < 0 || index >= songsArray.length) return;
  
      const song = songsArray[index];
  
      if (currentCategory === category && currentSongIndex === index) {
        togglePlayPause();
        return;
      }
  
      setCurrentCategory(category);
      setCurrentSongIndex(index);
      setCurrentSong(song);
  
      audioRef.current.src = song.filePath;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => setIsPlaying(false));
    };
  
    const togglePlayPause = () => {
      if (!audioRef.current.src) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    };
  
    const handleNext = () => {
      if (currentCategory) {
        const songsArray = currentCategory === 'trending' ? trendingSongs : ninetSongs;
        const nextIndex = (currentSongIndex + 1) % songsArray.length;
        playSong(currentCategory, nextIndex);
      }
    };
  
    const handlePrev = () => {
      if (currentCategory) {
        const songsArray = currentCategory === 'trending' ? trendingSongs : ninetSongs;
        const prevIndex = (currentSongIndex - 1 + songsArray.length) % songsArray.length;
        playSong(currentCategory, prevIndex);
      }
    };
  
    const handleSeek = (e) => {
      const seekTo = (e.target.value / 100) * duration;
      audioRef.current.currentTime = seekTo;
      setCurrentTime(seekTo);
    };
  
    useEffect(() => {
      const audio = audioRef.current;
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
      };
      const handleEnded = () => {
          setIsPlaying(false);
          handleNext();
      };
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleEnded);
      };
    });
  
  return (
    <div className="main">
      <Nav />
      <Centre
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        formatTime={formatTime}
        handleSeek={handleSeek}
        handleNext={handleNext}
        handlePrev={handlePrev}
        togglePlayPause={togglePlayPause}
        trendingSongs={trendingSongs}
        ninetSongs={ninetSongs}
        playSong={playSong}
        currentCategory={currentCategory}
        currentSongIndex={currentSongIndex}
      />
      <Footer />
    </div>
  );
}

export default Home;
