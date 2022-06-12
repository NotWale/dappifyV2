import { Songbird } from "@usedapp/core";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";

type Props = {
  posts: any;
};

export default function Songs({ posts }: Props) {
  return (
    <div className="flex h-screen bg-gray-800 flex-col">
      {posts.map((song: any, key: any) => {
        return (
          <div
            className="flex flex-col mt-3 mx-auto w-[410px] rounded-xl border border-gray-600 bg-gray-700"
            key={key}
          >
            <div className="bg-gray-900 w-full px-1 mb-2 rounded-t-xl text-white">
              <h1>{song.song.author}</h1>
            </div>
            <div className="ml-1">
              <ReactPlayer
                url={`https://ipfs.infura.io/ipfs/${song.song.hash}`}
                width="400px"
                height="50px"
                playing={false}
                controls={true}
              />
            </div>
            <p className="flex-wrap grow">{song.song.description}</p>
          </div>
        );
      })}
    </div>
  );
}
