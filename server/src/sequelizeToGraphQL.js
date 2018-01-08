const {
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

// INTEGER: GraphQLInt,
// STRING: GraphQLString,
// TEXT: GraphQLString, // ?
// DATE: GraphQLString, // ?

const sequelizeToGraphQL = {
  STRING: GraphQLString,
  CHAR: GraphQLString,
  TEXT: GraphQLString,
  INTEGER: GraphQLInt,
  BIGINT: GraphQLInt,
  FLOAT: GraphQLFloat,
  REAL: GraphQLFloat,
  DOUBLE: GraphQLInt,
  DECIMAL: GraphQLFloat,
  BOOLEAN: GraphQLBoolean,
  TIME: GraphQLString,
  DATE: GraphQLString,
  DATEONLY: GraphQLString,
  NOW: GraphQLString
  // Not sure how to handle these. http://sequelize.readthedocs.io/en/2.0/api/datatypes/
//   HSTORE: ,
//   JSON: ,
//   JSONB: ,
//   BLOB: ,
//   RANGE: ,
//   UUID: ,
//   UUIDV1: ,
//   UUIDV4: ,
//   VIRTUAL: ,
//   ENUM: ,
//   ARRAY: ,
//   GEOMETRY: ,
//   GEOGRAPHY: ,
}

const deleteAndReturn = (obj, key) => { // This mutates an object, I know!
  const val = obj[key]
  delete obj[key]
  return val
}

const mapModelToFields = ({ rawAttributes }, custom = {}) =>
  Object.assign(
    ...Object.keys(rawAttributes).map(field => ({
      [field]: {
        type: sequelizeToGraphQL[rawAttributes[field].type.constructor.name],
        resolve: (mod) => mod[field],
        ...(deleteAndReturn(custom, field) || {})
      }
    })),
    custom
  )


module.exports = {
  mapModelToFields
}
