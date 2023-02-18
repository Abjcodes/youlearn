import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const user = useUser();
  const [showModal, setShowModal] = useState(false);
  let emailId = null;
  useEffect(() => {
    if(user) {
      emailId = user.email;
    }
    fetchNotes(emailId);
  }, [user]);

  const fetchNotes = async (email) => {
    try {
        const{data, error} = await supabase
            .from("notes")
            .select("*")
        if(error) throw error;
        if(data != null && emailId!= null){
          const filteredArr = data.filter((note) => {
            return note.user_id === email;
          })
            setNotes(filteredArr);
            
        }
    } catch (error) {
        alert(error.message);
    }
  };

  return (
    <div className="flex flex-wrap">
      {user ? 
      notes.map(note => (
        <div key={note.user_id + note.video_id} className="w-full lg:w-1/4 p-4">
          <Link key={note.videoId}
          href={{
            pathname:'/viewer',
            query: {videoId: note.video_id, videoTitle: note.video_title}
          }}>
          <div className="bg-white shadow-lg rounded-lg overflow-auto h-56" onClick={() => setShowModal(true)}>
            <div className="p-6 h-full">
              <h2 className="text-base font-bold">{note.video_title}</h2>
              <h3 className="text-xs py-1 text-black">{note.created_at}</h3>
              <div className="py-1 content text-base text-gray-800 overflow-hidden" dangerouslySetInnerHTML={{__html: note.notes}}></div>
              <div>
              </div>
            </div>
          </div>
          </Link>
        </div>
      )) 
      : 
        <div className="">
            <p className="px-10 py-20 ">
                Please log into view your notes
            </p>
        </div>}
    </div>
  );
};

export default NotesPage;
