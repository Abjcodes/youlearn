import React from "react";
import Link from "next/link";

function VideoCard({video}) {
    return (
        // <div key={video.id.videoId} className="w-1/4 px-2 pb-2">
        //   <div className="bg-white rounded shadow-lg overflow-hidden sm:h-[16.8rem]" 
        //   onClick={() => {
        //   Router.push(`/viewer?id=${video.id.videoId}&title=${video.snippet.title}`);
        //   console.log("This is clicked");}}>
        //     <img src={video.snippet.thumbnails.medium.url} className="w-full" alt={video.snippet.title} />
        //     <p className="my-2 mx-1 text-sm font-medium">
        //       {video.snippet.title}
        //     </p>
        //   </div>
        // </div>
        <div key={video.id.videoId} className="w-1/4 px-2 pb-2">
          <Link key={video.id.videoId}
          href={{
            pathname:'/viewer',
            query: {videoId: video.id.videoId, videoTitle: video.snippet.title}
          }}>
          <div className="bg-white rounded shadow-lg overflow-hidden sm:h-[16.8rem]" >
            <img src={video.snippet.thumbnails.medium.url} className="w-full" alt={video.snippet.title} />
            <p className="my-2 mx-1 text-sm font-medium">
              {video.snippet.title}
            </p>
          </div>
          </Link>
        </div>
    );
}

export default VideoCard;