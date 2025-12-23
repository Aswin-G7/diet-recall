import FoodCard from './FoodCard'

import idli from "../assets/foods/idli.jpg";
import dosa from "../assets/foods/dosa.jpg";
import chapati from "../assets/foods/chapati.jpg";
import rice from "../assets/foods/rice.jpg";
import egg from "../assets/foods/egg.jpg";
import chicken from "../assets/foods/chicken.jpg";
import milk from "../assets/foods/milk.jpg";
import banana from "../assets/foods/banana.jpg";
import apple from "../assets/foods/apple.jpg";
import oats from "../assets/foods/oats.jpg";
import paneer from "../assets/foods/paneer.jpg";
import curd from "../assets/foods/curd.jpg";

const FoodGrid = () => {
  const foods = [
    { name: "Idli", image: idli },
    { name: "Dosa", image: dosa },
    { name: "Chapati", image: chapati },
    { name: "Rice", image: rice },
    { name: "Egg", image: egg },
    { name: "Chicken", image: chicken },
    { name: "Milk", image: milk },
    { name: "Banana", image: banana },
    { name: "Apple", image: apple },
    { name: "Oats", image: oats },
    { name: "Paneer", image: paneer },
    { name: "Curd", image: curd }
  ];

  return (
    <section className="food-section">
      <h2>Quick Food Selection</h2>

      <div className="food-grid">
        {foods.map((food, index) => (
          <FoodCard
            key={index}
            name={food.name}
            image={food.image}
          />
        ))}
      </div>
    </section>
  );
};

export default FoodGrid;
