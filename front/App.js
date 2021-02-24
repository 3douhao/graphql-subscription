import React from 'react'
import Messages from './components/Messages'
import InputBox from './components/InputBox'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
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
