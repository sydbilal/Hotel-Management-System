// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../Hooks/useAuth';

// const ProtectedRoute = ({ requiredRole }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && !requiredRole.includes(user.role)) {
//     return <Navigate to="/" />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
