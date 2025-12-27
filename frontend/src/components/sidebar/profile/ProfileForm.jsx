import React from "react";
import "./ProfileForm.css";

const ProfileForm = () => {
  return (
    <div className="profile-form">
      <h3>Edit Profile</h3>

      <label>
        Name
        <input type="text" placeholder="Enter your name" />
      </label>

      <label>
        Age
        <input type="number" placeholder="Enter your age" />
      </label>

      <label>
        Weight (kg)
        <input type="number" placeholder="Enter your weight" />
      </label>

      <label>
        Diet Type
        <select>
          <option value="">Select diet type</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
      </label>

      <button className="save-btn">Save Profile</button>
    </div>
  );
};

export default ProfileForm;
