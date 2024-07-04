// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('/api/users/current'); // Adjust the endpoint to fetch current user
//         setUser(response.data);
//       } catch (error) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   return { user, loading };
// };

// export default useAuth;
