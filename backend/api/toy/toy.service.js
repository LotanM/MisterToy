
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByToyname,
    remove,
    update,
    add
}

async function query() {
    try {
        const collection = await dbService.getCollection('toys')
        var toys = await collection.find().toArray()
        return toys
    }
    catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        // toy.givenReviews = await reviewService.query({ byToyId: ObjectId(toy._id) })
        // toy.givenReviews = toy.givenReviews.map(review => {
        //     delete review.byToy
        //     return review
        // })
        console.log(toy);
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}
async function getByToyname(toyname) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ toyname })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyname}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        // peek only updatable fields!
        const toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            createdAt: toy.createdAt,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        // // peek only updatable fields!
        //     toyname: toy.toyname,
        //     password: toy.password,
        //     fullname: toy.fullname,
        //     score: toy.score || 0
        // }
        const collection = await dbService.getCollection('toys')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                toyname: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}


