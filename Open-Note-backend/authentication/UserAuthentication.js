import jwt from 'jsonwebtoken';

const JWT_SECRET = 'arryherewasnothere'

function authToken(userId) {
    const token = jwt.sign({
        user: {
            id: userId
        }
    }, JWT_SECRET)
    return token
}

export default { authToken }