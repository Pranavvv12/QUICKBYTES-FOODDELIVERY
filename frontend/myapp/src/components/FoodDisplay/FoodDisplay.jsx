import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem'; 
import { StoreContext } from '../../context/StoreContext';


const FoodDisplay = () => {
    const [category, setCategory] = useState("All");
    const [showAll, setShowAll] = useState(false); 
    const {food_list,cartItems, addToCart, removeFromCart}=useContext(StoreContext)
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const itemsToShow = showAll ? food_list : food_list.slice(0, 8);

    return (
        <div className='food-display' id='food-display'>
            <div className="header-container">
                <h2>Top dishes near you</h2>
                <span
                    onClick={toggleShowAll}
                    role="button"
                    tabIndex="0"
                    className="show-more-span"
                >
                    {showAll ? "Hide" : "Show More"}
                </span>
            </div>
            <div className="food-display-list">
                {itemsToShow.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                cartItems={cartItems} // Pass the state
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                        );
                    }
                    return null; 
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
