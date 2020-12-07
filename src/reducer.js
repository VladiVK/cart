

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

            return {...state, total, amount};
            
    
        default: return state
    }

}

export default reducer;