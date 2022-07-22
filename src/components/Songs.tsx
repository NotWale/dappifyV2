import ScrollContainer from 'react-indiana-drag-scroll'
import AudioPlayer from "./AudioPlayer";
import { useContext } from 'react';
import { PlayingContext } from './PlayingContext';

type Props = {
  posts: any;
};

export default function Songs({ posts }: Props) {
  const { isPlaying, togglePlay } = useContext(PlayingContext);

  return (
        <ScrollContainer className="flex flex-row gap-96 mt-24 z-10" vertical={false} >
          {posts.map((song: any, key: any) => {
            return (
              <AudioPlayer isPlaying={isPlaying} togglePlay={togglePlay} hash={song.song.hash} author={song.song.author} description={song.song.description}/>
            );
          })}
        </ScrollContainer>
  );
}
