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
  console.log("LGEHLGHEWELJHGELWKJHFLEHJ");
  return user.getBookmarks()
}

  // .then(res.send)
  // .catch(res.catch("An error occured while fetching the songs."))


module.exports = (user) => ({
  user: {
    id: 1
  },
  fetchSongs,
  fetchBookmarks
})
