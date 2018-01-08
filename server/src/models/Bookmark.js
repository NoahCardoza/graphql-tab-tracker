module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('bookmark', {}, {
    indexes: [
      {
        fields: ['userId', 'songId'],
        unique: true
      }
    ]
  })
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User)
    Bookmark.belongsTo(models.Song)
    models.User.hasMany(Bookmark, {as: 'bookmarks'})
    models.Song.hasMany(Bookmark, {as: 'bookmarks'})
  }
  return Bookmark
}
