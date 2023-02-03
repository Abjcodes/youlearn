import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Videos from '../components/Videos.js'


const Home = () => {
  return (
    <div className='w-full px-6'>
    <div className=''>
      <h1 className='text-lg font-semibold py-3'>
        Popular Videos
      </h1>
      <Videos />
    </div>
    </div>
  )
}

export default Home