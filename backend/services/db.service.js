const MongoClient = require('mongodb').MongoClient

const config = require('../config')

module.exports = {
    getCollection
}
const uri = "mongodb+srv://LotanYeah:123@cluster0.tuebb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// Database Nam
const dbName = 'toys_db'

const client = new MongoClient(uri, { useNewUrlParser: true })
client.connect(err => {
    console.log('connected to mongoo');
    const collection = client.db('TOY_DB').collection('toy')
    collection.find().toArray()
        .then(res => console.log(res))
    client.close()
})

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




