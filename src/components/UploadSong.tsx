import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

type Props = {
  uploadPost: any;
  setSelectedFile: any;
};

export default function UploadSong({ uploadPost, setSelectedFile }: Props) {
  const [desc, setDesc] = useState("");

  return (
    <div className="flex h-1/3">
      <div className="flex flex-col mt-16 mx-auto py-1 px-1 w-72 h-72 rounded-full shadow-2xl">
        <form
          className="my-auto flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            uploadPost(desc);
          }}
        >
          <label htmlFor="inputTag" className="mx-auto cursor-pointer">
          Upload mp3 File <br/>
          <FontAwesomeIcon className="ml-11 h-8 w-8" icon={faUpload} />
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
          <button
            type="submit"
            className="w-max mx-auto mt-4 border-2 border-gray-700 px-3 py-1.5 rounded-xl text-white bg-[#000202] hover:border-blue-700"
          >
            Upload Song
          </button>
        </form>
      </div>
    </div>
  );
}
