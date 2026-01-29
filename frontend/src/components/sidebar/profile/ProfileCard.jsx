import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-avatar">👤</div>

      <div className="profile-info">
        <h2>Aswin</h2>
        <div className="profile-stats">
          <p>Age: 22</p>
          <p>Weight: 68 kg</p>
          <p>Diet: Vegetarian</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
