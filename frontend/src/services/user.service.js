import { httpService } from './http.service.js'

// const KEY = 'usersDB';

export const userService = {
    query,
    login,
    logout,
    getById,
    remove,
    save,
    getEmptyUser
}

const userUrl = 'user/'
const authUrl = 'auth/'

// TODO: support paging and filtering and sorting
function query() {
    return httpService.get(userUrl)
}

function getById(id) {
    return httpService.get(userUrl + id)
}


function remove(id) {
    return httpService.remove(userUrl + id)
}


function save(user) {
    const savedUser = httpService.post(authUrl + 'signup', user)
    return savedUser;
}

function login(user){
    return httpService.post(authUrl + 'login', user);
}

function logout(username) {
    return httpService.post(authUrl + 'logout', username)
}

function getEmptyUser() {
    return {
        fullname,
        username,
        password,
        isAdmin
    }
}