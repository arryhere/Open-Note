import jwt from 'jsonwebtoken';
import UserAuthentication from '../authentication/UserAuthentication.js';

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ status: 'auth-failed', response: 'Please provide valid token' })
    } else {
        jwt.verify(token, UserAuthentication.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({ status: 'auth-failed', response: 'Please provide valid token' })
            }
            else {
                req.user = decoded.user
                next()
            }
        });
    }
}

export default fetchUser