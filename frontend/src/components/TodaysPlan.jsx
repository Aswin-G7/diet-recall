import PlanCard from "./PlanCard";
import "./TodaysPlan.css";

const TodaysPlan = () => {
  return (
    <section className="todays-plan">
      <h2>Today's Plan</h2>

      <div className="plan-cards">
        <PlanCard
          mealType="Breakfast"
          title="Oats & Banana"
          calories={350}
          time="15 mins"
        />

        <PlanCard
          mealType="Lunch"
          title="Rice, Dal & Vegetables"
          calories={550}
          time="30 mins"
        />

        <PlanCard
          mealType="Dinner"
          title="Chapati & Paneer"
          calories={450}
          time="25 mins"
        />
      </div>
    </section>
  );
};

export default TodaysPlan;
