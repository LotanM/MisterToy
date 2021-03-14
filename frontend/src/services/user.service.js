import { httpService } from './http.service.js'

// const KEY = 'usersDB';

export const userService = {
    query,
    getById,
    remove,
    save,
    getEmptyUser
}

const userUrl = 'user/'

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
    const savedUser = (user._id) ? httpService.put(userUrl + user._id, user) : httpService.post(userUrl, user)
    return savedUser;
}

function getEmptyUser() {
    return {
        username,
        nickname,
        password,
        isAdmin
    }
}