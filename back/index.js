import { ApolloServer, gql, PubSub } from 'apollo-server'

const pubsub = new PubSub()

const books = [
  { id: 1, title: 'Save the world', authorId: 2 },
  { id: 2, title: 'Money talks', authorId: 2 },
  { id: 3, title: 'Down the cabal', authorId: 1 }
]

const authors = [
  {
    id: 1,
    name: 'Janet Great'
  },
  {
    id: 2,
    name: 'Allen Backer'
  }
]

const subscribers = []

const typeDefs = gql`
  type Book {
    id: Int!
    title: String!
    authorId: Int!
  }
  type Author {
    id: Int!
    name: String!
  }
  type Query {
    books: [Book]
    authors: [Author]
  }
  type Mutation {
    addAuthor(id: Int!, name: String!): Author!
  }
  type Subscription {
    authorAdded: Author
  }
`

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors
  },
  Mutation: {
    addAuthor: (_, { id, name }) => {
      authors.push({ id, name })
      subscribers.forEach(fn => fn({ id, name }))
      return { id, name }
    }
  },
  Subscription: {
    authorAdded: {
      subscribe: () => {
        const channel = Math.random()
          .toString(36)
          .slice(2, 15)
        subscribers.push(payload =>
          pubsub.publish(channel, { authorAdded: payload })
        )
        return pubsub.asyncIterator(channel)
      }
    }
  }
}
// const server = new GraphQLServer({
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: { pubsub }
  subscriptions: {
    path: '/subscriptions'
  }
})

server.listen().then(({ url }) => console.log(`server is ready @ ${url} `))
// server.start(({ port }) => console.log(` server listening on port ${port}`))

// Notes about subscriptions:

// type definition is just like query and mutation, nothing special.
// resolver of the defined subscription field is not a function but a object which has a 'subscribe' method. This 'subscribe' method MUST return a AsyncIterator object which can be achieved by using 'pubsub.asyncIterator(['EVENT_NAME'])' or 'pubsub.asyncIterator(channel)'. The channel is just a unique string to identify the subscribing client. The EVENT_NAME is somewhat different from channel string. The event can be broatcasted to any clients which subscribed the 'EVENT_NAME'. Whereas if channel is used, each client  has its own event_name which is the channel string. So if channel is used, each channel must be broadcasted individually. Whereas if 'EVENT_NAME' is used, event can be broadcasted to every client via 'EVENT_NAME'.
// How the mutation result be sent to the subscribing client?
// After the mutation is made, using 'pubsub.publish('EVENT_NAME',{'FIELD_NAME': payload})' to publish the mutation result to the subscribing clients. payload is the mutation result.
