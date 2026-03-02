import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import AuthContext from '../store/AuthContext'
import { currencyFormatter } from "../util/formatting.js"; 
import Button from './UI/Button.jsx'
import UserProgressContext from '../store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';
import { useToast } from '../store/ToastContext';

const Cart = () => {
    const cartCtx =useContext(CartContext)
    const authCtx = useContext(AuthContext)
    const userProgressCtx=useContext(UserProgressContext)
    const { showToast } = useToast();
    
    const cartTotal =cartCtx.items.reduce((totalPrice ,item) =>totalPrice + item.quantity * item.price ,
    0);
    function handleCloseCart(){
        userProgressCtx.hideCart();
    }
    function handleGoToCheckout(){
      if (!authCtx.isAuthenticated) {
        showToast('Please login or signup to proceed to checkout!', 'error');
        userProgressCtx.hideCart();
        userProgressCtx.showLogin();
        return;
      }
      userProgressCtx.showCheckout();
    }


  return (
    <Modal className='cart' 
    open={userProgressCtx.progress ==='cart'}
    onclose={userProgressCtx.progress ==='cart' ? handleCloseCart :null} >
        <h2>Your Cart</h2>
        
        {!authCtx.isAuthenticated && (
          <div style={{ 
            padding: '1rem', 
            marginBottom: '1rem', 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffc107',
            borderRadius: '4px',
            color: '#856404'
          }}>
            <p style={{ margin: 0 }}>
              <strong>Note:</strong> Please login or signup to add items and place orders.
            </p>
          </div>
        )}
        
        <ul>
         {cartCtx.items.map((item) => (
           <CartItem 
            key={item.id} 
            name={item.name}
            quantity={item.quantity} 
            price={item.price}  
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}

            />
        ))}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length >0 && (
            <Button onClick={handleGoToCheckout}>Go to Checkout</Button>

           )  }
        </p>

    </Modal>
  )
}

export default Cart