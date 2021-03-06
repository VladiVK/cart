import React, { useState, useContext, useReducer, useEffect, createContext } from 'react'
import cartItems from './data'
import reducer from './reducer'


const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = createContext()

const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
}

// Types 
const CLEAR_CART = 'CLEAR_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'
const GET_TOTAL = 'GET_TOTAL'
const LOADING = 'LOADING'
const DISPLAY_ITEMS = 'DISPLAY_ITEMS'
const TOGGLE_AMOUNT = 'TOGGLE_AMOUNT'

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }
  const removeItem = (id) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    })
  }
  const increase = (id) => {
    dispatch({
      type: INCREASE,
      payload: id,
    })
  }
  const decrease = (id) => {
    dispatch({
      type: DECREASE,
      payload: id,
    })
  }
  const fetchData = async () => {

    dispatch({type: LOADING});

    const response = await fetch(url);
    const cart = await response.json();

    dispatch({type: DISPLAY_ITEMS, payload: cart})

  }
  // alternative for increse/decrease
  const toggleAmount = (id, type) => {
    dispatch({
      type: TOGGLE_AMOUNT,
      payload: {id, type},
     })
  }
  // useEffect
  useEffect(() => {
    fetchData()
  }, [])

  useEffect( () => {
    dispatch({
      type: GET_TOTAL
    })
  }, [state.cart]);


  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }