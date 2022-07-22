import { ReactNode, useContext, useState } from "react";
import { PlayingContext, defaultState } from './PlayingContext';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  const [isPlaying, setIsPlaying] = useState(defaultState.isPlaying);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayingContext.Provider
      value={{
        isPlaying,
        togglePlay,
      }}
    >
      <div className={`h-screen bg-activeColor ${isPlaying ? 'animate-back-change' : 'backdrop-filter-none'}`}>{children}</div>
    </PlayingContext.Provider>
  );
}
