import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import { supabase } from '../supabaseClient'
import { useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'

const TextEditor= ({id}) => {
    const user = useUser();
    const [loading, setLoading] = useState(false);

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
              class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-3 focus:outline-none',
            },
          },
        
        // content: []
      });

      const saveNotes = async () => {
        setLoading(true);
        try {
            const{data, error} = await supabase
                .from("notes")
                .upsert({
                  user_id: user.email,
                  video_id: id,
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
