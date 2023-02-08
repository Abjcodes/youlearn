import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import { supabase } from '../supabaseClient'
import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

const TextEditor= ({id, title}) => {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [notes, setNotes] = useState([]);

    const loadContent = async () => {
     await fetchNotes();
      if(notes != null){
        const result = notes.find(note => {
          return note.video_id === id;
        })
        setContent(result);
      }
    }

    useEffect(() => {
      loadContent();
    }, [])

    const fetchNotes = async () => {
      try {
          const{data, error} = await supabase
              .from("notes")
              .select("*")
          if(error) throw error;
          if(data != null){
              setNotes(data);
              console.log(data);
          }
      } catch (error) {
          alert(error.message);
      }
    };

    const editor = useEditor({
        extensions: [
          StarterKit,
          Highlight,
          Typography,
          Placeholder.configure({
            placeholder: 'Write your notes here …',
          })
        ],
        editorProps: {
            attributes: {
              class: 'prose m-3 focus:outline-none',
            },
          },
      });

    
    

      const saveNotes = async () => {
        setLoading(true);
        try {
            const{data, error} = await supabase
                .from("notes")
                .upsert({
                  user_id: user.email,
                  video_id: id,
                  video_title: title,
                  notes: editor.getHTML()
                })
            if(error) throw error;
        } catch (error) {
            alert(error.message);
        } finally {
          setLoading(false);
        }
      };


    
      return (
        <div className="flex">
          <div className="w-3/4 px-4">
            <iframe
              className="video-name"
              frameborder="0"
              // title={id}
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${id}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {user ?  
          <div className="w-1/4 border-2 mr-2 border-gray-600 flex flex-col justify-between">
          <div className="h-[34rem]  overflow-auto">
            <div className='p-5 bg-gray-100'>
              <p className='font-medium text-gray-800'>
                {title}
              </p>
            </div>
            <h1 className="p-3 text-lg font-bold">
              Notes
            </h1>
            <EditorContent editor={editor}/>
          </div>
          <button type="button" 
          className="text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium text-sm px-5 py-2.5 text-center mx-2 mb-2"
          onClick={() => saveNotes()}>
            {loading ? "Saving..." : "Save notes"}
          </button>
            </div> 
            :
            <div> 
              <p>
                Please login to take and save notes
              </p>
            </div>}
        </div>
      )
};

export default TextEditor;
