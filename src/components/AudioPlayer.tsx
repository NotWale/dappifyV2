import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";

type Props = {
    hash: any;
    author: string;
    description: string;
  };

const AudioPlayer = ({ hash, author, description }: Props) => {
  // State
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Refs
  const audioRef = useRef(new Audio(`https://ipfs.infura.io/ipfs/${hash}`));
  const intervalRef = useRef<NodeJS.Timer>();

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setTrackProgress(0);
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: number) => {
    // Clear any timers already running
    clearInterval(intervalRef.current as NodeJS.Timeout);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="max-w-[450px] mb-12 p-[24px] rounded-2xl shadow-xl m-auto text-white">
      <div className="text-center z-10 relative">
        <h3 className="font-light mt-0">{author}</h3>
        <AudioControls
          isPlaying={isPlaying}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="h-[5px] w-full mb-[10px] rounded-lg bg-slate-500 cursor-pointer transition"
          onChange={(e) => onScrub(Number(e.target.value))}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AudioPlayer;
