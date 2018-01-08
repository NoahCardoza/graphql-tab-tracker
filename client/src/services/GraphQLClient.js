import R from 'ramda'

import GraphQLClient from 'graphql-query-constructor'
import axios from 'axios'
import store from '@/store/store'

const sendQuery = (payload, fields) =>
  axios.post(
    'http://localhost:8081/graphql',
    payload, {
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    }
  ).then(R.prop('data'))
  .then(json => {
    if (json.errors) {
      throw json.errors.map(R.prop('message'))
    }
    return (fields.length === 1
      ? json.data[fields[0]]
      : json.data
    )
  })

export const simpleSongKeys = [
  'id',
  'title',
  'album',
  'artist',
  'genre',
  'albumImageUrl'
]

// axios.post({
//   baseURL: 'http://localhost:8081/',
//   headers: {
//     Authorization: `Bearer ${store.state.token}`
//   },
//   body: JSON.stringify(payload)
// })

const Client = GraphQLClient(sendQuery)

export const { Query, Mutation } = Client

export const simpleSong = Query('song', {}, simpleSongKeys)

export default Client
