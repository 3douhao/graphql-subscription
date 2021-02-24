import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  useSubscription,
  ApolloClient,
  gql,
  useQuery,
  InMemoryCache
} from '@apollo/client'
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

const SUBSCRIPTION_QUERY = gql`
  subscription {
    messagePosted {
      user
      content
    }
  }
`

const Messages = () => {
  // const { data } = useQuery(QUERY, {
  //   pollInterval: 500
  // })
  const { data } = useSubscription(SUBSCRIPTION_QUERY)
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
      {data && (
        <Flex
          key={uuidv4()}
          my='10px'
          align='center'
          style={{
            alignSelf:
              data.messagePosted.user === 'jack' ? 'flex-end' : 'flex-start',
            flexDirection:
              data.messagePosted.user === 'jack' ? 'row-reverse' : 'row'
          }}
        >
          <>
            <Avatar name={data.messagePosted.user} mx='10px' />
            <p
              style={{
                background:
                  data.messagePosted.user !== 'jack' ? 'gray' : 'lightgreen',
                color: data.messagePosted.user !== 'jack' ? 'white' : 'black',
                borderRadius: '10px',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
            >
              {data.messagePosted.content}
            </p>
          </>
        </Flex>
      )}
    </Flex>
  )
}

export default Messages
