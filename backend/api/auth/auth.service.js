const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username')
    const match = await bcrypt.compare(password, user.password)
    console.log('password:', password)
    console.log('user.password:', user.password)
    console.log('match:', match)
    if (!match) return Promise.reject('Invalid password')

    delete user.password
    return user
}

async function signup(fullname, username, password) {
    const saltRounds = 10
    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!fullname || !username || !password) return Promise.reject('fullname, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname })
}

module.exports = {
    signup,
    login
}