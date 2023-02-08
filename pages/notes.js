import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const user = useUser();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
        const{data, error} = await supabase
            .from("notes")
            .select("*")
        if(error) throw error;
        if(data != null){
            setNotes(data);
        }
    } catch (error) {
        alert(error.message);
    }
  };

  return (
    <div className="flex flex-wrap">
      {user ? 
      notes.map(note => (
        <div key={note.user_id + note.video_id} className="w-full lg:w-1/3 p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden h-48">
            <div className="p-6">
              <h2 className="text-base font-medium">{note.video_title}</h2>
              <h3 className="text-sm py-1 text-slate-600">{note.created_at}</h3>
              <div className="content text-base text-gray-600 overflow-hidden" dangerouslySetInnerHTML={{__html: note.notes}}></div>
            </div>
          </div>
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
