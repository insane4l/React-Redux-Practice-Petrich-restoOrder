import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import withRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions/';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        const {menuRequested, RestoService, menuLoaded, menuError} = this.props;

        menuRequested();
        RestoService.getMenuItems()
            .then(items => {
                menuLoaded(items);
            })
            .catch(() => menuError());
        
    }

    render() {
        const {menuItems, loading, error, addedToCart} = this.props;

        if (error) {
            return <Error/>
        }

        if (loading) {
            return <Spinner/>
        }

        const items = menuItems.map(menuItem => {
            return ( <MenuListItem 
                        key={menuItem.id} 
                        menuItem={menuItem}
                        onAddToCart={() => addedToCart(menuItem.id)} />
            )
        })
           
        return <View items={items} />
    }
};

const View = ({items}) => {
    return (
        <>
            <div className="menu__page-title">Menu</div>
            <ul className="menu__list">
                {items}
            </ul>
        </>
    ) 
}

const mapStateToProps = ({menu, loading, error}) => {
    return {
        menuItems: menu,
        loading,
        error
    }
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart
};

export default withRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));