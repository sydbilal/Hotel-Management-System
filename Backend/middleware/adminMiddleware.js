// const adminMiddleware = (req, res, next) => {
//     if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
//         next();
//     } else {
//         res.status(403).json({ message: 'Not authorized as an admin' });
//     }
// };

// module.exports = adminMiddleware;
