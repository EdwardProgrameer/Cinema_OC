import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui';
import { CreateGenrePage, CreateMoviePage, GenreList, MoviePage,} from '../pages';

export const CinemaRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
            <Routes>
              
                <Route path="create-movie" element={<CreateMoviePage />} />
                <Route path="create-Genre" element={<CreateGenrePage />} />                               
                <Route path="MoviePage" element={<MoviePage />} />                                                                    
                <Route path="GenreList" element={<GenreList />} />                                                                    
                <Route path="/" element={<Navigate to="/MoviePage" />} />

            </Routes>
        </div>


    </>
  )
}
