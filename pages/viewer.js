import React, { useState } from "react";
import { useRouter } from "next/router";
import TextEditor from "../components/TextEditor.jsx";
import { supabase } from "../supabaseClient.js";

const VideoPage = () => {
  const [notes, setNotes] = useState("");
  const router = useRouter();
  const { videoId, videoTitle } = router.query;
  // const id = '7OhauLZpJoU';

  return (
      <div className="container mx-auto py-8">
        <TextEditor id={videoId} title={videoTitle} />
      </div>
  );
};

export default VideoPage;
