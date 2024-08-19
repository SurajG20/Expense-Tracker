import { Outlet, Navigate } from 'react-router-dom';
import { getAuth } from '../utils/requestMethods';

const PrivateRoutes = () => {
  const user = getAuth();

  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
