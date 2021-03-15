import { toyService } from '../services/toy.service.js';


export const toyStore = {
  state: {
    toys: [],
    toy: null,
  },
  getters: {
    toysForDisplay(state) { return state.toys },
    toyForDisplay(state) { return state.toy }
  },
  // Mutations should be SYNC and PURE functions (a pure function does not cause any side effects)
  //to mutate a state: inside some component: this.$store.commit({ type: 'mutationName', {payload.?} })
  mutations: { // <-- updates the state 

    setToys(state, payload) {
      state.toys = payload.toys
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex(p => p._id === toyId)
      state.toys.splice(idx, 1)
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(p => p._id === toy._id)
      state.toys.splice(idx, 1, toy);
    }
    ,
    getToyById(state, { toyId }) {
      const toyObj = state.toys.find(toy => toy._id === toyId)
      state.toy = toyObj
    }
  },
  actions: { //async operations. speaking with backend
    //change to async await
    loadToys({ commit, state }) {
      return toyService.query()
        .then((toys) => {
          commit({ type: 'setToys', toys });
        })
        .then(() => console.log('loaded toys successfully'))
        .catch(err => {
          console.log('Store: Cannot load toys', err);
          throw new Error('Cannot load toys');
        })
    },
    removeToy({ commit }, { toyId }) {
      return toyService.remove(toyId)
        .then(() => {
          commit({ type: 'removeToy', toyId })
        })
        .catch(err => {
          console.log('Store: Cannot remove toy', err);
        })
    },
    saveToy({ commit }, { toy }) {
      const type = (toy._id) ? 'updateToy' : 'addToy'
      toyService.save(toy)
        .then((savedToy) => {
          commit({ type, toy: savedToy })
        })
        .catch((err) => {
          console.log('err', err);

        })
    },
    getToyById({ commit }, { toyId }) {
      return toyService.getById(toyId)
        .then((toy) => {
          commit({ type: 'getToyById', toyId })
        })
        .catch(err => {
          console.log('Store: Cannot get toy', err);
        })
    }
  }
}
