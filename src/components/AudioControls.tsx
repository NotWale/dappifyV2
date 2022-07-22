import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Pause } from "../assets/pause.svg";
import {Dispatch, SetStateAction,} from 'react';

type Props = {
    isPlaying: boolean;
    onPlayPauseClick: any;
    setPl: any;
    isPl: boolean;
  };

const AudioControls = ({
  isPlaying,
  onPlayPauseClick, setPl, isPl
}: Props) => (
  <div className="flex justify-between w-3/4 m-auto">
    {isPl ? (
      <button
        type="button"
        className="mx-auto bg-none rounded-none cursor-pointer"
        onClick={() => { onPlayPauseClick(); setPl(false); }}
        aria-label="Pause"
      >
        <Pause className="h-[30px] w-[30px]"/>
      </button>
    ) : (
      <button
        type="button"
        className="mx-auto bg-none rounded-none cursor-pointer"
        onClick={() => { onPlayPauseClick(); setPl(true); }}
        aria-label="Play"
      >
        <Play className="h-[30px] w-[30px]"/>
      </button>
    )}
  </div>
);

export default AudioControls;