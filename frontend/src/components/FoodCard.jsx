import { useNavigate } from 'react-router-dom';

import './FoodCard.css'

const FoodCard = ({ name, image }) => {

  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(`/food/${name}`);
  };

  return (
    <button className="food-card" onClick={handleClick}>
      <div className="food-image-wrapper">
        <img src={image} alt={name} className="food-image" />
      </div>
      <span className="food-name">{name}</span>
    </button>
  );
};

export default FoodCard;
