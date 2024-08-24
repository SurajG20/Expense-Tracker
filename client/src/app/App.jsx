import Home from '../components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import styled from 'styled-components';
import PrivateRoutes from './PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AppStyled>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </AppStyled>
  );
};
const AppStyled = styled.div`
  height: 100vh;
  background-image: radial-gradient(
    circle 311px at 8.6% 27.9%,
    rgba(62, 147, 252, 0.57) 12.9%,
    rgba(239, 183, 192, 0.44) 91.2%
  );
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    overflow: auto;
  }
`;

export default App;
