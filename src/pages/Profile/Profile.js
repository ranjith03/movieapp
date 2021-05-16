import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { selectUser } from "../../store/user";
import "./profile.css";
function Profile() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <div className="profileScreen_body">
        <h1>EditProfile</h1>
        <div className="profileScreen_info">
          <img
            src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
            alt=""
          />
        <div className="profileScreen_details">
          <h2>{user.email}</h2>
          <div className="profileScreen_plans">
              <h3>Premium Plan Active</h3>

          </div>
          <button
            onClick={() => auth.signOut()}
            className="profileScreen_signout"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;
