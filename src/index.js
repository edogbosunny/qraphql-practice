const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require('./generated/prisma-client')

// create type definations
// const typeDefs = `
// type Query {
//   info: String!
//   feed: [Link!]!
// }

// type Link {
//   id: ID!
//   description: String!
//   url: String!
// }
// type Mutation {
//   post(url: String!, description: String!): Link!
// }
// `

// fetch a link by id


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length


// create simple resolver;
const resolvers = {
  Query: {
    info: () => `Query resolved`,
    feed: (root, args, { prisma }, info) => {
      console.log('--info-->', info)
      return prisma.links();
    },
    // feed: () => links,
    link: (_, args) => {
      const a = links.filter(data => data.id === args.id)
      return a[0];
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    createLink: async (parent, args, { prisma }, info) => {
      const saveLink = await prisma.createLink({
        id: `link-${idCount++}`,
        description: args.data.description,
        url: args.data.url,
      });
      return saveLink;
    }
  }
}

// create the graphql server
const server = new GraphQLServer({
  // typeDefs,
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    prisma,
    req
  })
})
server.start(() => console.log('server running on localhost 4000'));