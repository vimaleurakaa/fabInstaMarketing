import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext';
import {CartIcon} from '../icons';
import styles from './header.module.scss';

const Header = ({hideElements}) => {

    const {itemCount} = useContext(CartContext);

    return ( 
        <header className={styles.header}>
            <Link to='/'>FabInsta</Link>
            <Link to='/about'>About</Link>
            {!hideElements && <Link to='/cart'> <CartIcon/> Cart ({itemCount})</Link>}
        </header>
     );
}
 
export default Header;