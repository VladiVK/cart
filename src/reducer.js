

const reducer = (state, action) => {

    switch (action.type) {
        case 'CLEAR_CART': return {
            ...state,
            cart: [],
        }
        case 'REMOVE_ITEM': return {
            ...state,
            cart: state.cart.filter( item => item.id !== action.payload),
        }
        case 'INCREASE': return {
            ...state,
            cart: state.cart.map( item => {
                return (item.id === action.payload) ? {...item, amount: item.amount + 1} : item;
            }),
        }
        case 'DECREASE': return {
            ...state,
            cart: state.cart.map( item => {
                if(item.id === action.payload) {
                    return {...item, amount: item.amount - 1}
                }
                return item;
                // а теперь исчезнет товар из списка корзины, если отняли все до 0 
            }).filter( item => item.amount !== 0)
        }
        case 'GET_TOTAL': 
        // complex reduce
            let {total, amount} = state.cart.reduce( (cartTotal, cartItem) => {

                const {price, amount} = cartItem;
                const itemTotal = price * amount;

                cartTotal.total += itemTotal;
                cartTotal.amount += amount;

                return cartTotal
            }, {
                total: 0,
                amount: 0,
            });

            total = parseFloat(total.toFixed(2));

            return {
                ...state,
                total,
                amount
        };
        case 'LOADING': return {
                ...state,
                loading: true,
        }    
        case 'DISPLAY_ITEMS': return {
                ...state,
                loading: false,
                cart: action.payload,
        }    
        case 'TOGGLE_AMOUNT': return {
                // ...state,
                // cart: state.cart.map( (cartItem) => {
                //     const {id, type} = action.payload;
                //     if(cartItem.id === id && type === 'inc') {
                //         return {...cartItem, amount: cartItem.amount + 1}
                //     }
                //     if(cartItem.id === id && type === 'dec') {
                //         return {...cartItem, amount: cartItem.amount - 1}
                //     }

                //     return cartItem;
                // }).filter( cartItem => cartItem.amount !== 0)
                ...state,
                cart: state.cart.map( (cartItem) => {
                    const {id, type} = action.payload;

                    if(cartItem.id === id ) {
                        if(type === 'inc') {
                            return {...cartItem, amount: cartItem.amount + 1}
                        }
                        if(type === 'dec') {
                            return {...cartItem, amount: cartItem.amount - 1}
                        }   
                    }
                   
                    return cartItem;
                }).filter( cartItem => cartItem.amount !== 0)
        }    
    
        // default: return state
        default: throw new Error('no matching action type')
    }

}

export default reducer;




