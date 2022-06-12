import { useState } from "react";

type Props = {
  uploadPost: any;
  setSelectedFile: any;
};

export default function UploadSong({ uploadPost, setSelectedFile }: Props) {
  const [desc, setDesc] = useState("");

  return (
    <div className="flex h-1/3">
      <form
        className="flex flex-col my-auto mx-auto py-1 px-1 w-96 h-48 rounded-xl border border-gray-600 bg-gray-700"
        onSubmit={(event) => {
          event.preventDefault();
          // setSongs((prevSongs: any) => [
          //   ...prevSongs,
          //   { songAuthor: "undefined", songDesc: desc },
          // ]);
          //console.log(songs);
          uploadPost(desc);
        }}
      >
        <input
          type="file"
          accept=".mp3, .wav"
          onChange={(event: React.FormEvent) => {
            const files = (event.target as HTMLInputElement).files;

            if (files && files.length > 0) {
              setSelectedFile(files[0]);
            }
          }}
          required
        />
        <input
          id="musicDescription"
          type="text"
          className="grow rounded-xl my-2 form-control"
          placeholder="Song description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button
          type="submit"
          className="border-2 border-gray-700 px-3 py-1.5 rounded-xl text-white bg-gray-900 hover:border-blue-700"
        >
          Upload Song
        </button>
      </form>
    </div>
  );
}
