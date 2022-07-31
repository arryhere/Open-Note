import jwt from 'jsonwebtoken';
import UserAuthentication from '../authentication/UserAuthentication.js';

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ message: 'Authentication failed', data: '' })
    } else {
        jwt.verify(token, UserAuthentication.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({ message: 'Authentication failed', data: '' })
            }
            else {
                req.user = decoded.user
                next()
            }
        });
    }
}

export default fetchUser