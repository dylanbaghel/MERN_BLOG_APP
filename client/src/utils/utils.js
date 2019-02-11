// export const BASE_URL = 'http://mern-blogging-app.herokuapp.com';
export const BASE_URL = 'http://localhost:4100'


export const isEmptyObject = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
};