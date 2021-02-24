import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ApolloClient, gql, useQuery, InMemoryCache } from '@apollo/client'
import { VStack, Avatar, Box, Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import messages from '../messages'

const Div = styled.div`
  // display: flex;
  width: 70vw;
  margin: 50px auto;
  height: 70vh;
  background: royalblue;
`

const QUERY = gql`
  query {
    messages {
      user
      content
    }
  }
`

const Messages = () => {
  const { data, error } = useQuery(QUERY, {
    pollInterval: 500
  })
  console.log(data)

  return (
    <Flex
      p='20px'
      direction='column'
      w='70vw'
      mx='auto'
      my='50px'
      border='solid pink 2px'
    >
      {data?.messages.map(message => (
        <Flex
          key={uuidv4()}
          my='10px'
          align='center'
          style={{
            alignSelf: message.user === 'jack' ? 'flex-end' : 'flex-start',
            flexDirection: message.user === 'jack' ? 'row-reverse' : 'row'
          }}
        >
          <>
            <Avatar name={message.user} mx='10px' />
            <p
              style={{
                background: message.user !== 'jack' ? 'gray' : 'lightgreen',
                color: message.user !== 'jack' ? 'white' : 'black',
                borderRadius: '10px',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
            >
              {message.content}
            </p>
          </>
        </Flex>
      ))}
    </Flex>
  )
}

export default Messages
