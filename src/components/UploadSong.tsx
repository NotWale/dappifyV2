import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import ReactiveButton from 'reactive-button';

type Props = {
  uploadPost: any;
  setSelectedFile: any;
  state: any;
  setState: any;
};

export default function UploadSong({ uploadPost, setSelectedFile, setState, state }: Props) {
  const [desc, setDesc] = useState("");
  
  return (
    <div className="flex h-1/3">
      <div className="flex flex-col mt-16 mx-auto py-1 px-1 w-72 h-72 rounded-full shadow-2xl">
        <form
          className="my-auto flex flex-col"
          onSubmit={(event) => {
            setState('loading');
            event.preventDefault();
            uploadPost(desc);
          }}
        >
          <label htmlFor="inputTag" className="mx-auto cursor-pointer">
          Upload mp3 File <br/>
          <FontAwesomeIcon className="ml-8 my-1" icon={faUpload} size="3x" beatFade/>
            <input
              id="inputTag"
              className="hidden"
              type="file"
              accept=".mp3, .wav"
              onChange={(event: React.FormEvent) => {
                const files = (event.target as HTMLInputElement).files;

                if (files && files.length > 0) {
                  setSelectedFile(files[0]);
                }
              }}
            />
          </label>
          
          <input
            id="musicDescription"
            type="text"
            className="grow rounded-xl my-4 h-8 form-control w-max mx-auto"
            placeholder="Song description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <ReactiveButton type="submit" buttonState={state} idleText={'Upload Song'} loadingText={'This takes a while... :I'} style={{ borderRadius: '12px', width: '188px' }} className="ml-12 bg-blue-700"/>
        </form>
      </div>
    </div>
  );
}
