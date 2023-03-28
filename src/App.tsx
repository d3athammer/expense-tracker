import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Form from './Component/Form'
import * as React from 'react'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'


function App() {

  return (
    <ChakraProvider>
      <div>
        <Form/>
      </div>
    </ChakraProvider>
  )
}

export default App;
