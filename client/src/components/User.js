import React from "react";

function User(props) {
  const email = "demo@gmail.com";
  return (
    <div>
      <p style={{ color: "white" }} className="mx-md-5 my-2">
        Hello {email.split("@")[0]}
      </p>
    </div>
  );
}

export default User;
