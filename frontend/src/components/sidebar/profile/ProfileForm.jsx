import React, { useState } from "react";
import "./ProfileForm.css";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    dietType: "",
    goal: "",
    conditions: [],
    dailyCalorieTarget: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleConditionChange = (e) => {
    const { value, checked } = e.target;

    setProfile((prev) => ({
      ...prev,
      conditions: checked
        ? [...prev.conditions, value]
        : prev.conditions.filter((c) => c !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔴 Minimal required validation
    if (!profile.age || !profile.goal) {
      setError("Age and Goal are required to generate a diet plan.");
      return;
    }

    setError("");
    console.log("Profile data:", profile);
    // backend call comes next
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>

      {error && <p className="error-text">{error}</p>}

      <label>
        Name (optional)
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Age *
        <input
          type="number"
          name="age"
          value={profile.age}
          onChange={handleChange}
        />
      </label>

      <label>
        Height (cm) (optional)
        <input
          type="number"
          name="height"
          value={profile.height}
          onChange={handleChange}
        />
      </label>

      <label>
        Weight (kg) (optional)
        <input
          type="number"
          name="weight"
          value={profile.weight}
          onChange={handleChange}
        />
      </label>

      <label>
        Diet Type (optional)
        <select
          name="dietType"
          value={profile.dietType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
      </label>

      <label>
        Goal *
        <select name="goal" value={profile.goal} onChange={handleChange}>
          <option value="">Select goal</option>
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </label>

      <div className="conditions">
        <p>Health Conditions (optional)</p>

        <label>
          <input
            type="checkbox"
            value="diabetes"
            onChange={handleConditionChange}
          />
          Diabetes
        </label>

        <label>
          <input type="checkbox" value="bp" onChange={handleConditionChange} />
          BP
        </label>

        <label>
          <input
            type="checkbox"
            value="thyroid"
            onChange={handleConditionChange}
          />
          Thyroid
        </label>
      </div>

      <label>
        Daily Calorie Target (optional)
        <input
          type="number"
          name="dailyCalorieTarget"
          value={profile.dailyCalorieTarget}
          onChange={handleChange}
        />
      </label>

      <button className="save-btn">Save Profile</button>
    </form>
  );
};

export default ProfileForm;
