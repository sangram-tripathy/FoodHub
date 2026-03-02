import React, { useState } from 'react'
import { createContext } from 'react'

const UserProgressContext = createContext ({
  progress:'',
  showCart:()=>{},
  hideCart:()=>{},
  showCheckout:()=>{},
  hideCheckout:()=>{},
  showLogin:()=>{},
  hideLogin:()=>{},
  showSignup:()=>{},
  hideSignup:()=>{},
  showOrderHistory:()=>{},
  hideOrderHistory:()=>{}
})

export function UserProgressContextProvider({children}){
   
   const [userProgress ,setUserProgress]= useState('')

   function showCart(){
    setUserProgress('cart')
   }
   function hideCart(){
    setUserProgress('')
   }
   function showCheckout(){
    setUserProgress('checkout')

   }

   function hideCheckout(){
    setUserProgress('')
   }

   function showLogin(){
    setUserProgress('login')
   }

   function hideLogin(){
    setUserProgress('')
   }

   function showSignup(){
    setUserProgress('signup')
   }

   function hideSignup(){
    setUserProgress('')
   }

   function showOrderHistory(){
    setUserProgress('orderHistory')
   }

   function hideOrderHistory(){
    setUserProgress('')
   }

    const userProgressCtx={
    progress:userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    showLogin,
    hideLogin,
    showSignup,
    hideSignup,
    showOrderHistory,
    hideOrderHistory

    }
   
    return ( 
    <UserProgressContext.Provider value={userProgressCtx}>
    {children}
    </UserProgressContext.Provider>
    )
}



  
export default UserProgressContext