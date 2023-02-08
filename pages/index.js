import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Videos from '../components/Videos.js'
import { useState } from 'react';


const Home = () => {

  const [query, setQuery] = useState('');
  const [finalQuery, setFinalQuery] = useState('');

  const handleSubmit = () => {
    setFinalQuery(query);
    console.log(query);
  }

  return (
    <div className='w-full px-6'>
      <div className="flex items-center my-8">
            <div className="flex w-full rounded gap-3">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-black bg-white border rounded-md"
                    placeholder="Search..."
                    value = {query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="px-4 text-white bg-black border-l rounded " onClick={() => handleSubmit()}>
                    Search
                </button>
            </div>
        </div>
      <h1 className='text-lg font-semibold py-3'>
        {(finalQuery == '') ? "Popular videos" : "Top results"}
      </h1>
      <Videos query={finalQuery}/>
    </div>
  )
}

export default Home