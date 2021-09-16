const { ApolloServer, gql } = require('apollo-server');
const { animals, mainCards } = require('./db.js')

const typeDefs = gql`
    type MainCard {
        title: String!
        image: String!
    }
    type Animal {
        id: ID!
        image: String!,
        title: String!,
        rating: Float
        price: String!
        description: [String!]!
        slug: String!
        stock: Int!
        onSale: Boolean
    }
    type Query {
        mainCards: [MainCard]
        animals: [Animal]
        animal(slug: String!): Animal
    }
`

const resolvers = {
    Query: {
        mainCards: () => mainCards,
        animals: () => animals,
        animal: (parent, args, ctx) => {
            let animalToBeFound = animals.find((animal) => {
                return animal.slug === args.slug
            })

            return animalToBeFound
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})