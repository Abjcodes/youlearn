import React, { useState, useEffect } from "react";
import Router from "next/router";
import VideoCard from "./VideoCard";


function Videos({query}) {
  const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const searchQuery = (query == '') ? "UIUX" : query ;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${api_key}`;

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setVideos(data.items);
      })
      .catch(error => {
        console.error(error);
      });
  }, [query]);

  // const vidIDArr =  [
  //   "Ks-_Mh1QhMc",
  //   "JGwWNGJdvx8",
  //   "2Vv-BfVoq4g",
  //   "pRpeEdMmmQ0",
  //   "6ZfuNTqbHE8",
  //   "JwYX52BP2Sk",
  //   "2uOgDYKdGc4",
  //   "3tmd-ClpJxA",
  //   "6Dh-RL__uN4",
  //   "qzYgSecGQww"
  // ];

  return (
    <div className="container mx-auto">
    <div className="flex flex-wrap flex-col sm:flex-row">
      {videos.map(video => (
        <VideoCard video={video} key={video}/>
      ))}
    </div>
  </div>
  // <div className="container mx-auto">
  //   <div className="flex flex-wrap flex-col sm:flex-row">

  //   <div className="w-1/4 px-2 pb-2">
  //         <div className="bg-white rounded shadow-lg overflow-hidden" 
  //         onClick={() => {
  //         Router.push(`/viewer?id=${'Ks-_Mh1QhMc'}`);
  //         console.log("This is clicked");}}>
  //           <img src="http://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg"/>
  //           <p>
  //             This is a long titleKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMc
  //           </p>
  //         </div>
  //     </div>

  //     <div className="w-1/4 px-2 pb-2">
  //         <div className="bg-white rounded shadow-lg overflow-hidden sm:h-[22rem]" 
  //         onClick={() => {
  //         Router.push(`/viewer?id=${'Ks-_Mh1QhMc'}`);
  //         console.log("This is clicked");}}>
  //           <img src="http://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg"/>
  //           <p className="my-2 mx-1 text-sm font-medium">
  //           The Reluctant Heroes
  //           </p>
  //         </div>
  //     </div>

  //     <div className="w-1/4 px-2 pb-2">
  //         <div className="bg-white rounded shadow-lg overflow-hidden" 
  //         onClick={() => {
  //         Router.push(`/viewer?id=${'Ks-_Mh1QhMc'}`);
  //         console.log("This is clicked");}}>
  //           <img src="http://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg"/>
  //           <p>
  //             This is a long titleKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMc
  //           </p>
  //         </div>
  //     </div>

  //     <div className="w-1/4 px-2 pb-2">
  //         <div className="bg-white rounded shadow-lg overflow-hidden" 
  //         onClick={() => {
  //         Router.push(`/viewer?id=${'Ks-_Mh1QhMc'}`);
  //         console.log("This is clicked");}}>
  //           <img src="http://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg"/>
  //           <p>
  //             This is a long titleKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMcKs-_Mh1QhMc
  //           </p>
  //         </div>
  //     </div>

  //   </div>

  // </div>
  );
}

export default Videos;