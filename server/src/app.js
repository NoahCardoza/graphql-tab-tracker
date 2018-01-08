const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models');
const config = require('./config/config')
const IsAuthenticated = require('./policies/IsAuthenticated');

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

// GrpahQL dependencies
const graphqlHTTP = require('express-graphql')
const schema = require('./schema');
const context = require('./graphqlContext');

app.use('/graphql',
  IsAuthenticated.soft,
  graphqlHTTP(req => {
    return {
      schema,
      context: context(req.user),
      rootValue: req.user,
      graphiql: true
    }
  }
))

app.use((req, res, next) => {
  // Easy error handling
  res.catch = (message, status) => error => {
    if (error.message){
      console.error("Thrown Error:", error.message, error.status)
      res.status(error.status || 500).send({ error: error.message })
    } else {
      console.error("Unknown Error:", message, status, error)
      res.status(status || 500).send({ error: message })
    }

  }

  // Easy status
  res.ok = (status) => res.send({ status: status || 'ok' })

  // Fixes: .then(res.send)
  // Scoping issues prevent: .then(res.send)
  res.send = res.send.bind(res)
  next()
})

require('./routes')(app)

// { force: true }
sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log("Server started on port", config.port);
  })
