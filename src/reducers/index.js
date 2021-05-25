const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const clickedItemId = action.payload;

            // if the item already was in the cart (findIndex will return index, else -1)
            const itemIndex = state.items.findIndex(item => item.id === clickedItemId);
            if (itemIndex >= 0) {
                const duplicatedItem = state.items.find(item => item.id === clickedItemId);
                const newItem = {
                    ...duplicatedItem,
                    quantity: ++duplicatedItem.quantity
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIndex),
                        newItem,
                        ...state.items.slice(itemIndex + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
            }

            // if the item was not in the cart
            const itemFromMenu = state.menu.find(item => item.id === clickedItemId);
            const {title, price, url, id} = itemFromMenu;
            const newItem = {
                title,
                price,
                url,
                id,
                quantity: 1
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };
        case 'ITEM_REMOVE_FROM_CART':
            const indx = state.items.findIndex(item => item.id === action.payload);
            const itemsPrice = state.items[indx]['price'] * state.items[indx]['quantity'];
            return {
                ...state,
                items: [
                    ...state.items.slice(0, indx),
                    ...state.items.slice(indx + 1)

                ],
                totalPrice: state.totalPrice - itemsPrice
                
            };
        default:
            return state;

    }
}

export default reducer;