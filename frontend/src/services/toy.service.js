import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

// const KEY = 'toysDB';

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}

const toyUrl = 'toy/'

// TODO: support paging and filtering and sorting
function query() {
    return httpService.get(toyUrl)
}

function getById(id) {
    return httpService.get(toyUrl + id)
}

function remove(id) {
    return httpService.remove(toyUrl + id)
}

function save(toy) {
    const savedToy = (toy._id) ? httpService.put(toyUrl + toy._id, toy) : httpService.post(KEY, toy)
    return savedToy;
}

function getEmptyToy(name = '', price = 100) {
    return {
        name,
        price,
        tags: []
    }
}