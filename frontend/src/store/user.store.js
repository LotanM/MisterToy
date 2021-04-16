import { userService } from '../services/user.service.js';
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'


export const userStore = {
  state: {
    users: [],
    loggedinUser: null,
  },
  getters: {
    usersForDisplay(state) { return state.users },
    loggedinUser(state) {
      console.log('store: state.loggedinUser:', state.loggedinUser)
      return state.loggedinUser
    },
    watchedUser({ watchedUser }) { return watchedUser }
  },
  // Mutations should be SYNC and PURE functions (a pure function does not cause any side effects)
  //to mutate a state: inside some component: this.$store.commit({ type: 'mutationName', {payload.?} })
  mutations: { // <-- updates the state 

    setUsers(state, payload) {
      state.users = payload.users
    },
    removeUser(state, { userId }) {
      const idx = state.users.findIndex(p => p._id === userId)
      state.users.splice(idx, 1)
    },
    addUser(state, { user }) {
      state.loggedinUser = user;
      state.users.push(user);
    },
    setCurrUser(state, { user }) {
      state.loggedinUser = user
      console.log('state.loggedinUser:', state.loggedinUser)
    },
    cleanCurrUser(state, { user }) {
      state.loggedinUser = null
    },
    updateUser(state, { user }) {
      const idx = state.users.findIndex(p => p._id === user._id)
      state.users.splice(idx, 1, user);
    }
    ,
    getUserById(state, { userId }) {
      const userObj = state.users.find(user => user._id === userId)
      state.loggedinUser = userObj
    },
    setWatchedUser(state, { user }) {
      state.watchedUser = user;
  },
  },
  actions: { //async operations. speaking with backend
    loadUsers({ commit, state }) {
      return userService.query()
        .then((users) => {
          commit({ type: 'setUsers', users });
        })
        .then(() => console.log('loaded users successfully'))
        .catch(err => {
          console.log('Store: Cannot load users', err);
          throw new Error('Cannot load users');
        })
    },
    removeUser({ commit }, { userId }) {
      return userService.remove(userId)
        .then(() => {
          commit({ type: 'removeUser', userId })
        })
        .catch(err => {
          console.log('Store: Cannot remove user', err);
        })
    },
    saveUser({ commit }, { user }) {
      const type = (user._id) ? 'updateUser' : 'addUser'
      userService.save(user)
        .then((savedUser) => {
          commit({ type, user: savedUser })
        })
        .catch((err) => {
          console.log('err', err);
        })
    },
    logUser({ commit }, { user }) {
      userService.login(user)
        .then((loggedinUser) => {
          console.log('loggedinUser:', loggedinUser)
          commit({ type: 'setCurrUser', user: loggedinUser })
        })
        .catch((err) => {
          console.log('err', err);
        })
    },
    logout({ commit }, { user }) {
      userService.logout(user)
        .then(() => {
          commit({ type: 'cleanCurrUser' })
        })
        .catch(err => {
          console.log('Store: Cannot remove userLoggedIn', err);
        })
    },
    getUserById({ commit }, { userId }) {
      return userService.getById(userId)
        .then(() => {
          commit({ type: 'getUserById', userId })
          console.log(state.loggedinUser)
        })
        .catch(err => {
          console.log('Store: Cannot get user', err);
        })
    },
    async loadAndWatchUser({ commit }, { userId }) {
      try {
        const user = await userService.getById(userId);
        commit({ type: 'setWatchedUser', user })
        socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
        socketService.off(SOCKET_EVENT_USER_UPDATED)
        socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
          commit({ type: 'setWatchedUser', user })
        })
      } catch (err) {
        console.log('userStore: Error in loadAndWatchUser', err)
        throw err
      }
    },
  }
}
