import React from "react";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1 className="profile-title">My Profile</h1>

      <ProfileCard />
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
