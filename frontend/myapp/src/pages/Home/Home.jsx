
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const [category, setCategory] = useState("All");
  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext); 
  return (
    <div>
      <Header />
      <ExploreMenu id="explore-menu" category={category} setCategory={setCategory} />

      <FoodDisplay 
        category={category} 
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default Home;
