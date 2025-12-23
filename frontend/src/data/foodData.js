import idli from "../assets/foods/idli.jpg";
import dosa from "../assets/foods/dosa.jpg";
import chapati from "../assets/foods/chapati.jpg";
import rice from "../assets/foods/rice.jpg";

const foodData = {
  idli: {
    name: "Idli",
    image: idli,
    calories: 120,
    carbs: 25,
    protein: 6,
    fat: 2
  },
  dosa: {
    name: "Dosa",
    image: dosa,
    calories: 168,
    carbs: 30,
    protein: 4,
    fat: 3
  },
  chapati: {
    name: "Chapati",
    image: chapati,
    calories: 104,
    carbs: 18,
    protein: 3,
    fat: 2
  },
  rice: {
    name: "Rice",
    image: rice,
    calories: 130,
    carbs: 28,
    protein: 2.7,
    fat: 0.3
  }
};

export default foodData;
