import { dummyShowsData } from '../assets/assets'
import MovieCard from '../componets/MovieCard'
import BlurCircle from '../componets/BlurCircle'

const Favorite = () => {
  return dummyShowsData.length>0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-36 xl:px-44 overflow-hidden min-h-[80vh]'>
        <BlurCircle top='150px' right='0px' />
        <BlurCircle top='-50px' right='50px' />
        <h1 className='text-lg font-medium my-4'>Your Favorite Movies</h1>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
            {dummyShowsData.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
            ))}
        </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>No Movies Available</h1>
    </div>
  )
}

export default Favorite
