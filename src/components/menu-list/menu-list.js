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
        this.props.menuRequested();

        const {RestoService} = this.props;
        RestoService.getMenuItems()
            .then(items => {
                this.props.menuLoaded(items);
            })
            .catch(() => this.props.menuError());
        
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
        <ul className="menu__list">
            {items}
        </ul>
    ) 
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart
};

export default withRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));