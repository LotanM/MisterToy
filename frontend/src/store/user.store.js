import { userService } from '../services/user.service.js';


export const userStore = {
  state: {
    users: [],
    currUser: null,
    cartUsers: []
  },
  getters: {
    usersForDisplay(state) { return state.users },
    userForDisplay(state) {
      return state.currUser }
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
      state.currUser = user.nickname;
      console.log('state.currUser:', state.currUser)
      state.users.push(user);
    },
    updateUser(state, { user }) {
      const idx = state.users.findIndex(p => p._id === user._id)
      state.users.splice(idx, 1, user);
    }
    ,
    getUserById(state, { userId }) {
      const userObj = state.users.find(user => user._id === userId)
      state.currUser = userObj
    }
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
      console.log(type);
      userService.save(user)
        .then((savedUser) => {
          commit({ type, user: savedUser })
        })
        .catch((err) => {
          console.log('err', err);

        })
    },
    getUserById({ commit }, { userId }) {
      return userService.getById(userId)
        .then((user) => {
          commit({ type: 'getUserById', userId })
        })
        .catch(err => {
          console.log('Store: Cannot get user', err);
        })
    }
  }
}
