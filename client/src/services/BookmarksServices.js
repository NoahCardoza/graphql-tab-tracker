import R from 'ramda'
import API from './API'
import { Query } from './GraphQLClient'

export default {
  index () {
    return Query('bookmarks', {}, [
      Query('song', {}, [
        'id',
        'title',
        'album',
        'artist',
        'genre',
        'albumImageUrl'
      ])
    ]).send()
    .then(R.prop('bookmarks'))
    .then(R.map(R.prop('song')))
  },
  delete (songId) {
    return API().delete(`bookmarks/${songId}`)
  },
  create (songId) {
    return API().post(`bookmarks/${songId}`)
  }
}
