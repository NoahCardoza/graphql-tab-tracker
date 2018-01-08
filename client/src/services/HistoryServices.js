import R from 'ramda'
import { simpleSong, Query } from './GraphQLClient'

export default {
  index () {
    return Query('history', {}, [ simpleSong ]).send()
    .then(R.map(R.prop('song')))
  }
}
