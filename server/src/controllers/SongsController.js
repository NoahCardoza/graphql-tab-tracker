const { Song, Bookmark } = require('../models')

module.exports = {
  index (req, res) {
    (req.query.search
      ? Song.findAll({
          where: {
            $or: ['title', 'artist', 'album', 'genre']
              .map(key => ({
                [key]: {$like: `${req.query.search}%%`}}))}})
      : Song.findAll({
          limit: 10})
    )
    .then(res.send)
    .catch(res.catch("An error occured while fetching the songs."))
  },
  get (req, res) {
    Song.findById(req.params.id, {
      include: [{
        model: Bookmark,
        as: 'bookmarks',
        where: {
          UserId: (req.user || {}).id // If the users is logged in
        },
        required: false
      }]
    })
    .then(song => res.send({
      ...song.toJSON(),
      bookmarked: !!song.bookmarks.length,
      bookmarks: undefined
    }))
    .catch(res.catch("An error occured while fetching the song."))
  },
  update (req, res) {
    Song.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(res.ok)
    .catch(res.catch("An error occured while updating the song."))

  },
  post (req, res) {
    Song.create(req.body)
    .then(res.send)
    .catch(res.catch("An error occured while creating the song."))
  }
}
