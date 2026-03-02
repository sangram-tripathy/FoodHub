import React, { useContext } from 'react'
 import { currencyFormatter } from '../util/formatting'
 import Button from './UI/Button'
 import CartContext from '../store/CartContext'
 import AuthContext from '../store/AuthContext'
 import UserProgressContext from '../store/UserProgressContext'
 import { useToast } from '../store/ToastContext'
 import { API_URL } from '../config'

const MealItem = ({meal}) => {
   const cartCtx= useContext(CartContext);
   const authCtx = useContext(AuthContext);
   const userProgressCtx = useContext(UserProgressContext);
   const { showToast } = useToast();

    function handleAddMealToCart(){
       if (!authCtx.isAuthenticated) {
         showToast('Please login or signup to add items to cart!', 'error');
         userProgressCtx.showLogin();
         return;
       }
       cartCtx.addItem(meal);
       showToast(`${meal.name} added to cart!`, 'success');
    }

  return (
    <li className='meal-item'>
        <article>
            <img src={`${API_URL}/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className='meal-item-price'>
                    {currencyFormatter.format(meal.price)}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <p className='meal-item-actions'>
                <Button onClick={handleAddMealToCart}>Add to Cart</Button>
            </p>
        </article>
    </li>
  )
}

export default MealItem