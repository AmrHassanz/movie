import './App.css';
import Movie from './Movie/Movie';
import TvShow from './TvShow/TvShow';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';
import Login from './Login/Login';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import MovieDetail from './MovieDetails/MovieDetail';
import TvDetail from './TvDetail/TvDetail';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';



function App() {

  let navigate = useNavigate();

  // keep loged in if reload
  useEffect(() => {
    if (localStorage.getItem('userToken')) { getUserData() }
  }, [])

  // user Token
  const [userData, setUserData] = useState(null);
  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem('userToken'));
    setUserData(decodedToken);
    console.log(userData)
  }
  // useEffect(() => { console.log(userData) }, [userData]);


  // Log out
  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }

  return (
    <>
      <Navbar userData={userData} logOut={logOut} />
      <Routes>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute userData={userData} />} >
          <Route path='/' element={<Movie />}></Route>
          <Route path='movie' element={<Movie />}></Route>
          <Route path='movieDetail' element={<MovieDetail />}>
            <Route path=':id' element={<MovieDetail />} />
          </Route>
          <Route path='tvDetail' element={<TvDetail />}>
            <Route path=':id' element={<TvDetail />} />
          </Route>
          <Route path='tvshow' element={<TvShow />}></Route>
        </Route>

        <Route path='register' element={<Register />}></Route>
        <Route path='login' element={<Login getUserData={getUserData} />}></Route>

        <Route path='*' element={<NotFound />}></Route>


      </Routes>
      <Footer />
    </>
  );
}

export default App;
