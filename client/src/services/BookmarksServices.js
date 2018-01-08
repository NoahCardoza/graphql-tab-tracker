import R from 'ramda'
import API from './API'
import { simpleSong, Query } from './GraphQLClient'

export default {
  index () {
    return Query('bookmarks', {}, [
      simpleSong
    ]).send()
    .then(R.map(R.prop('song')))
  },
  delete (songId) {
    return API().delete(`bookmarks/${songId}`)
  },
  create (songId) {
    return API().post(`bookmarks/${songId}`)
  }
}
