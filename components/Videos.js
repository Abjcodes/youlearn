import React, { useState, useEffect } from "react";
import Router from "next/router";


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
        <div key={video.id.videoId} className="w-1/4 px-2 pb-2">
          <div className="bg-white rounded shadow-lg overflow-hidden" 
          onClick={() => {
          Router.push(`/viewer?id=${video.id.videoId}`);
          console.log("This is clicked");}}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <p>
              {video.snippet.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Videos;