'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const getClubsList = require('./fetchData')

// const clubs = [
//   { id: 1, name: 'Arsenal FC' },
//   { id: 2, name: 'Aston Villa FC' },
//   { id: 3, name: 'Chelsea FC' },
// ]

// const players = [
//   { id: 1, firstName: 'Hector', lastName: 'Bellerin', clubId: 1 },
//   { id: 2, firstName: 'Kai', lastName: 'Havertz', clubId: 3 },
// ]

const ClubType = new GraphQLObjectType({
  name: 'Club',
  description: 'Football clubs in EPL',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLString },
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    club: {
      type: ClubType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return getClubsList().then(clubList => clubList.find(club => club.id === args.id))
      }
    },
    clubs: {
      type: new GraphQLList(ClubType),
      resolve: () => {
        return getClubsList()
      }
    },
  })
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
