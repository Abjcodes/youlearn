import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import { supabase } from '../supabaseClient'
import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { createEditor } from "@tiptap/core";

const TextEditor= ({id, title}) => {

  const [noteContent, setNoteContent] = useState("");
  const [notesExist, setNotesExist] = useState(false);

  useEffect(() => {
    async function fetchNoteContent() {
      const { data, error } = await supabase
        .from("notes")
        .select("notes")
        .eq("video_id", id)
        .single();

      if (error) {
        console.log("error", error);
      } else {
        setNoteContent(data.notes);
      }
    }

    fetchNoteContent();
  }, [id, noteContent]);

    const editor = useEditor({
      extensions: [
        StarterKit,
        Highlight,
        Typography,
        Placeholder.configure({
          placeholder: 
          'If you have taken notes for this video before, you can load them with the load button. The button wont be visible otherwise.\nMarkdown Controls\n- Text Formatting\ncntrl+I for italics, cntrl+B for bold\n- Headings\n#, ##, ###, ####, #####, ###### for different levels\n- Other formatting\n> for blockquotes, *, - or + for bullet lists, or `foobar` to highlight code, ~~tildes~~ to strike text, or ==equal signs== to highlight text.\n'
          // - `Code` with `backticks`
          
          // ## Headings
          // - # H1 with `# space`
          // - ## H2 with `## space`
          // - ### H3 with `### space`
          
          // ## Lists
          // - Unordered list with `-` or `*` and a space
          //   - Nested items with 2 spaces before the dash
          // - Ordered list with numbers and a period
          // 1. First item
          // 2. Second item',
        })
      ],
      editorProps: {
          attributes: {
            class: 'prose m-3 focus:outline-none',
          },
        },
    });

    
    
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    

    // const fetchNotes = async () => {
    //   try {
    //       const{data, error} = await supabase
    //           .from("notes")
    //           .select("*")
    //       if(error) throw error;
    //       if(data != null){
    //           setNotes(data);
    //           console.log(data);
    //       }
    //   } catch (error) {
    //       alert(error.message);
    //   }
    // };

    

    
    

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

      const loadNotes = () => {
        editor.commands.setContent(noteContent);
        setNotesExist(true);
      }

    //   useEffect(() => {
    //   if(noteContent != null){
    //   if(editor){
    //     editor.on('create', ({ editor }) => {
    //       editor.commands.insertContent(noteContent);
    //       editor.commands.setContent('<p>Example Text</p>')
    //       alert("editor created");
    //     })
    //   }
    // }
    // }, [editor, noteContent])


    
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
          <div className='flex w-full'>
          <button type="button" 
          className=" w-full text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center mx-2 mb-2"
          onClick={() => saveNotes()}>
            {loading ? "Saving..." : "Save notes"}
          </button>
          {noteContent!="" ? 
          <button type='button' className='w-1/4 text-black border-2 border-black hover:bg-gradient-to-br font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2'  
          onClick={() => loadNotes()}>
            Load
          </button>
          : null
          }
          </div>
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
