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
            const selectedItem = state.menu.find(item => item.id === action.payload);
            const newItem = {
                title: selectedItem.title,
                price: selectedItem.price,
                url: selectedItem.url,
                id: selectedItem.id
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem

                ]
            };
        case 'ITEM_REMOVE_FROM_CART':
            const indx = state.items.findIndex(item => item.id === action.payload);
            return {
                ...state,
                items: [
                    ...state.items.slice(0, indx),
                    ...state.items.slice(indx + 1)

                ]
                
            };
        default:
            return state;

    }
}

export default reducer;