import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import messages from '../messages'

const Form = styled.form`
  margin: auto;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 10vw 60vw auto;
  width: 75vw;
`

const InputBox = () => {
  const [user, setUser] = useState('')
  const [content, setContent] = useState('')

  const POST_MESSAGE = gql`
    mutation($user: String!, $content: String!) {
      postMessage(user: $user, content: $content) {
        user
        content
      }
    }
  `

  const [postMessage] = useMutation(POST_MESSAGE)

  const handleSubmit = e => {
    e.preventDefault()
    postMessage({ variables: { user, content } })
    setUser('')
    setContent('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        name='user'
        id='user'
        value={user}
        onChange={e => setUser(e.target.value)}
      />
      <Input
        type='text'
        name='message'
        id='message'
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Button colorScheme='whatsapp' type='submit'>
        Send
      </Button>
    </Form>
  )
}

export default InputBox
