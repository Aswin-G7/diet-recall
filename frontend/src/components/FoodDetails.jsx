import { useParams } from "react-router-dom";
import foodData from "../data/foodData";
import './FoodDetails.css'

const FoodDetails = () => {
  const { foodName } = useParams();

  const food = foodData[foodName.toLowerCase()];

  if (!food) {
    return <h2>Food not found</h2>;
  }

  return (
    <div className="food-details-page">
      <h1>{food.name}</h1>

      <div className="food-details-card">
        <img
          src={food.image}
          alt={food.name}
          className="food-details-image"
        />

        <div className="food-info">
          <p><strong>Calories:</strong> {food.calories} kcal</p>
          <p><strong>Carbohydrates:</strong> {food.carbs} g</p>
          <p><strong>Protein:</strong> {food.protein} g</p>
          <p><strong>Fat:</strong> {food.fat} g</p>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
