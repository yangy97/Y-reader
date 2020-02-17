import * as types from './mutationsType'

const mutations = {
  [types.SET_RANK] (state, DetailRank) {
    state.DetailRank.monthRank = DetailRank.monthRank;
    state.DetailRank.totalRank = DetailRank.totalRank;
    state.DetailRank.weekRank = DetailRank._id;
  },
  [types.SET_SEARCH] (state, search) {
    state.search = search
  },
  [types.SET_BOOK] (state, book) {
    state.book.id = book._id;
    state.book.title = book.title;
    state.book.cover = book.cover
  }
};
export default mutations
