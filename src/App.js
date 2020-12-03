import React from 'react'
import {useGlobalContext} from './context'
// components
import NavBar from './NavBar'
import CartContainer from './CartContainer'

function App() {
  return (
    <main>
      <NavBar />
      <CartContainer />
    </main>
  );
}

export default App;
