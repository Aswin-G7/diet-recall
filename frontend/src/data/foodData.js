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

const foodData = {
  idli: {
    name: "Idli",
    image: idli,
    calories: 120,
    carbs: 25,
    protein: 6,
    fat: 2,
    category: "Breakfast"
  },
  dosa: {
    name: "Dosa",
    image: dosa,
    calories: 168,
    carbs: 30,
    protein: 4,
    fat: 3,
    category: "Breakfast"
  },
  chapati: {
    name: "Chapati",
    image: chapati,
    calories: 104,
    carbs: 18,
    protein: 3,
    fat: 2,
    category: "Grains"
  },
  rice: {
    name: "Rice",
    image: rice,
    calories: 130,
    carbs: 28,
    protein: 2.7,
    fat: 0.3,
    category: "Grains"
  },
  // --- New Items Added Below ---
  egg: {
    name: "Egg",
    image: egg,
    calories: 78,
    carbs: 0.6,
    protein: 6,
    fat: 5,
    category: "Proteins"
  },
  chicken: {
    name: "Chicken",
    image: chicken,
    calories: 239,
    carbs: 0,
    protein: 27,
    fat: 14,
    category: "Proteins"
  },
  milk: {
    name: "Milk",
    image: milk,
    calories: 42,
    carbs: 5,
    protein: 3.4,
    fat: 1,
    category: "Dairy"
  },
  banana: {
    name: "Banana",
    image: banana,
    calories: 89,
    carbs: 23,
    protein: 1.1,
    fat: 0.3,
    category: "Fruits"
  },
  apple: {
    name: "Apple",
    image: apple,
    calories: 52,
    carbs: 14,
    protein: 0.3,
    fat: 0.2,
    category: "Fruits"
  },
  oats: {
    name: "Oats",
    image: oats,
    calories: 389,
    carbs: 66,
    protein: 16.9,
    fat: 6.9,
    category: "Breakfast"
  },
  paneer: {
    name: "Paneer",
    image: paneer,
    calories: 265,
    carbs: 1.2,
    protein: 18.3,
    fat: 20.8,
    category: "Dairy"
  },
  curd: {
    name: "Curd",
    image: curd,
    calories: 98,
    carbs: 3.4,
    protein: 11,
    fat: 4.3,
    category: "Dairy"
  }
};

export default foodData;