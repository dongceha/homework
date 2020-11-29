import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CSSReset, ChakraProvider, extendTheme, StylesProvider } from '@chakra-ui/react'
// import theme from '@chakra-ui/theme';
import DCComponents from './components';

const theme = extendTheme({})

console.log(theme, DCComponents);

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
