import React from 'react'
import Messages from './components/Messages'
import InputBox from './components/InputBox'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true
  }
})

const client = new ApolloClient({
  link: wsLink,
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Messages />
        <InputBox />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App
