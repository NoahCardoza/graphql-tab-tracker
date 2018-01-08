const { Song } = require('./models')

const fetchSongs = (search) =>
  (search
    ? Song.findAll({
        where: {
          $or: ['title', 'artist', 'album', 'genre']
            .map(key => ({
              [key]: {$like: `${search}%%`}}))}})
    : Song.findAll({
        limit: 10})
  )

const fetchBookmarks = (user) => {
  return user.getBookmarks()
}

const fetchHistory = (user) => {
  return user.getHistory()
}

const requireAuth = (user, opts = {}) => {
  return new Promise((resolve, reject) => {
    if (!user)
      throw new Error("This request requires proper authentication.")
    resolve(user)
  })
}

  // .then(res.send)
  // .catch(res.catch("An error occured while fetching the songs."))


module.exports = (user) => ({
  requireAuth: requireAuth.bind(null, user),
  fetchSongs,
  fetchBookmarks,
  fetchHistory
})
