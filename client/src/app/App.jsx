import Home from '../components/Home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import styled from 'styled-components';
<<<<<<< HEAD:client/src/app/App.jsx
import { useSelector } from 'react-redux';
const App = () => {
  const user = useSelector((state) => state.users.currentUser);
  return (
    <AppStyled>
      <Routes>
        <Route
          path='/'
          element={!user ? <Navigate to={'/login'} /> : <Home />}
        />
=======
import { useGlobalContext } from './context/globalContext';
import { setAuthorizationHeader } from './context/fetchClient';
import { useEffect } from 'react';
const App = () => {
  const { user } = useGlobalContext();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthorizationHeader(token);
    }
  }, []);
  return (
    <AppStyled>
      <Routes>
        <Route path='/' element={<Home />} />
>>>>>>> fa290cc77b532f20b56a852ee36f30a7f2ae91b0:client/src/App.jsx
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AppStyled>
  );
};
const AppStyled = styled.div`
  height: 100vh;
  background: linear-gradient(to right, #3dabf2, #314755);
  position: relative;
`;
export default App;
