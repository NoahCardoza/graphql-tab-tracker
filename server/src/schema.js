const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = require('graphql');

console.log("GraphQLBoolean:" ,GraphQLBoolean);

const { Song, Bookmark, User, History } = require('./models');

const { mapModelToFields } = require('./sequelizeToGraphQL');

// const { getXML } = require('./helpers')
// const getID = getXML('id')
//
// const BookType = new GraphQLObjectType({
//   name: 'Book',
//   description: '...',
//   fields: () => ({
//     id: {
//       type: GraphQLInt,
//       resolve: getID
//     },
//     title: {
//       type: GraphQLString,
//       resolve: (book) => {
//         const title = book.title[0]
//         return title
//       }
//     },
//     isbn: {
//       type: GraphQLString,
//       resolve: getXML('isbn')
//     },
//     authors: {
//       type: new GraphQLList(AuthorType),
//       resolve: (book, args, ctx) =>
//         ctx.authorLoader.loadMany(
//           book.authors[0].author
//           .map(getXML('id'))
//         )
//     }
//   })
// })
//
// const AuthorType = new GraphQLObjectType({
//   name: 'Author',
//   description: '...',
//   fields: () => ({
//     id: {
//       type: GraphQLInt,
//       resolve: getID
//     },
//     name: {
//       type: GraphQLString,
//       resolve: getXML('name')
//     },
//     books: {
//       type: new GraphQLList(BookType),
//       resolve: (author, args, ctx) =>
//         ctx.bookLoader.loadMany(
//           author.books[0].book
//           .map(book => book.id[0]._)
//         )
//     }
//   })
// })
// module.exports = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     description: '...',
//     fields: () => ({
//       author: {
//         type: AuthorType,
//         args: {
//           id: { type: GraphQLInt }
//         },
//         resolve: (root, args, ctx) => ctx.authorLoader.load(args.id)
//       }
//     })
//   })
// })
// const field = ()

const isAuthed = (user, opts = {}) => {
  return new Promise((resolve, reject) => {
    if (opts.error && !user)
      throw new Error("This request requires proper authentication.")
    resolve(user)
  })
  // .catch(e => {
  //   throw new Error("This request requires proper authentication.")
  // })
  // if (opts.error && !user)
  //   throw new Error("This request requires proper authentication.")

}

const call = fn => obj => obj[fn]()

const HistoryType = new GraphQLObjectType({
  name: 'History',
  description: '...',
  fields: mapModelToFields(
    History
  )
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',
  fields: mapModelToFields(
    User
  )
})

const BookmarkType = new GraphQLObjectType({
  name: 'Bookmark',
  description: '...',
  fields: () => mapModelToFields(
    Bookmark,{
      user: {
        type: UserType,
        resolve: call('getUser')
      },
      song: {
        type: SongType,
        resolve: call('getSong')
      }
    })
})


const SongType = new GraphQLObjectType({
  name: 'Song',
  description: '...',
  fields: mapModelToFields(
    Song, {
      bookmarks: {
        type: GraphQLList(BookmarkType),
        resolve: call('getBookmarks')
      },
      bookmarked: {
        type: GraphQLBoolean,
        resolve: (song, args, { user }) => user
          ? song.getBookmarks({
              where: {
                userId: user.id
              }
            }).then(bookmarks => !!bookmarks.length)
          : false
      }
    }
  )
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      songs: {
        type: GraphQLList(SongType),
        args: {
          search: {
            type: GraphQLString
          }
        },
        resolve: (user, args, ctx) =>
          ctx.fetchSongs(args.search)
      },
      bookmarks: {
      type: GraphQLList(BookmarkType),
      resolve: (user, args, ctx) =>
        isAuthed(user, {
          error: true
        }).then(user =>
          ctx.fetchBookmarks(user)
        )
      },
      history: {
        type: GraphQLList(SongType),
        args: {
          search: {
            type: GraphQLString
          }
        },
        resolve: (user, args, ctx) =>
          ctx.fetchSongs(args.search)
      },
      question: {
        type: GraphQLString,
        resolve: (user, args, ctx) => {
          console.log(user);
          return "What is the answer to the Ultimate Question of Life, the Universe, and Everything?"
        }
      },
      answer: {
        type: GraphQLInt,
        resolve: (user, args, ctx) => {
          if (!user)
            throw new Error("You are not worthy!")
          console.log(root);
          return 42
        }
      }

    }),
    // mutations: () => ({
    //   console: {
    //     type: GraphQLString,
    //     args: {
    //       text: {
    //         type: GraphQLString
    //       }
    //     }
    //   }
    // })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: '...',
    fields: () => ({
      console: {
        type: GraphQLString,
        args: {
          text: {
            type: GraphQLString
          }
        },
        resolve: (root, { text }) => {
          console.log(text)
          return "Yes"
        }
      }
    })
  })
})
