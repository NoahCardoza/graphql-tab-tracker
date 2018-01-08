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

const call = fn => obj => obj[fn]()

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

const HistoryType = new GraphQLObjectType({
  name: 'History',
  description: '...',
  fields: mapModelToFields(
    History, {
      song: {
        type: SongType,
        resolve: call('getSong')
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
        ctx.requireAuth().then(user =>
          ctx.fetchBookmarks(user)
        )
      },
      history: {
        type: GraphQLList(HistoryType),
        resolve: (user, args, ctx) =>
          ctx.requireAuth().then(user =>
            ctx.fetchHistory(user)
          )
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
