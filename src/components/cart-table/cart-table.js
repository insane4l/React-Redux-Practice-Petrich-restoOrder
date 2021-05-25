import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart} from '../../actions';
import withRestoService from '../hoc';

import './cart-table.scss';

const CartTable = ({items, deleteFromCart, RestoService}) => {
    const emptyCart = items.length < 1;
    
    if (emptyCart) {
        return <EmptyCart/>
    }

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, url, price, id, quantity} = item;
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$ x{quantity}</div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick = {() => {RestoService.setOrder( generateOrder(items))} }
                    className = "order">
                    Place an order</button>
        </>
    );
};

const EmptyCart = () => {
    return (
        <div className = "cart_message">Please select products on the Menu page first</div>
    )
}

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            quantity: item.quantity
        }
    })
    return newOrder;
}

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    deleteFromCart
};


export default withRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));