import { Route, Routes } from 'react-router-dom';

import { CinemaRoutes } from '../Cinema';
import { LoginPage } from '../auth';



export const AppRouter = () => {
  return (
    <>

        <Routes>
            
            <Route path="login" element={<LoginPage />} />
            
            
            <Route path="/*" element={ <CinemaRoutes />} />
            
            

        </Routes>
    
    </>
  )
}
