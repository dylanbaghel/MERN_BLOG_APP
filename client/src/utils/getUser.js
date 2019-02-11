import jwt_decode from 'jwt-decode';

const getUser = (token) => {
    if (token) {
        const decoded = jwt_decode(token);
        return decoded;
    } else {
        return null;
    }
};

export default getUser;