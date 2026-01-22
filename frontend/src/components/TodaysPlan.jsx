import { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import "./TodaysPlan.css";

const TodaysPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodaysPlan = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/plan/today", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            age: 45,
            height: 170,
            weight: 72,
            goal: "diabetes control",
            conditions: ["diabetes"],
            dailyCalorieTarget: 1800
          })
        });

        if (!res.ok) {
          throw new Error("Failed to fetch plan");
        }

        const data = await res.json();
        setPlan(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load today's plan");
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysPlan();
  }, []);

  if (loading) {
    return <p className="loading-text">Generating today’s plan...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <section className="todays-plan">
      <h2>Today's Plan</h2>

      <div className="plan-cards">
        <PlanCard
          mealType="Breakfast"
          title={plan.breakfast.title}
          calories={plan.breakfast.calories}
          time="15 mins"
        />

        <PlanCard
          mealType="Lunch"
          title={plan.lunch.title}
          calories={plan.lunch.calories}
          time="30 mins"
        />

        <PlanCard
          mealType="Snack"
          title={plan.snack.title}
          calories={plan.snack.calories}
          time="25 mins"
        />

        <PlanCard
          mealType="Dinner"
          title={plan.dinner.title}
          calories={plan.dinner.calories}
          time="25 mins"
        />
      </div>
    </section>
  );
};

export default TodaysPlan;
