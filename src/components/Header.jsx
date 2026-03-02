import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import AuthContext from '../store/AuthContext';

const Header = () => {
   const cartCtx= useContext(CartContext);
   const userProgressCtx= useContext(UserProgressContext);
   const authCtx = useContext(AuthContext);

   const totalCartItems =cartCtx.items.reduce((totalNumberOfItems,item)=>{
    return totalNumberOfItems + item.quantity;
   },0);

   function handleShowCart(){
    userProgressCtx.showCart();
   }

   function handleShowLogin(){
    userProgressCtx.showLogin();
   }

   function handleLogout(){
    authCtx.logout();
   }

   function handleShowOrderHistory(){
    userProgressCtx.showOrderHistory();
   }

  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logoImg} alt="A restaurant" />
            <h1>FoodHub</h1>
        </div>
        <nav>
            {authCtx.isAuthenticated && (
              <span style={{ marginRight: '1rem', color: '#ffc404' }}>
                Welcome, {authCtx.user?.name}!
              </span>
            )}
            <Button textOnly onClick={handleShowCart}>
              Cart ({totalCartItems})
            </Button>
            {authCtx.isAuthenticated ? (
              <>
                <Button textOnly onClick={handleShowOrderHistory}>
                  My Orders
                </Button>
                <Button textOnly onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button textOnly onClick={handleShowLogin}>
                  Login
                </Button>
                <Button textOnly onClick={() => userProgressCtx.showSignup()}>
                  Sign Up
                </Button>
              </>
            )}
        </nav>
    </header>
  )
} 

export default Header