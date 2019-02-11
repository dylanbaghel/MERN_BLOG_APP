export const BASE_URL = process.env.BASE_URL || 'http://localhost:4100';

export const isEmptyObject = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
};