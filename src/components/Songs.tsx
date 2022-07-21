import ScrollContainer from 'react-indiana-drag-scroll'
import AudioPlayer from "./AudioPlayer";

type Props = {
  posts: any;
};

export default function Songs({ posts }: Props) {
  return (
        <ScrollContainer className="flex flex-row gap-96 mt-24 z-10" vertical={false} >
          {posts.map((song: any, key: any) => {
            return (
              <AudioPlayer hash={song.song.hash} author={song.song.author} description={song.song.description}/>
            );
          })}
        </ScrollContainer>

  );
}
