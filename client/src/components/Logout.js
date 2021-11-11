import React from "react";

function Logout(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logout works");
  };

  return (
    <div>
      <form method="" onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-success mx-md-2">
          Logout
        </button>
      </form>
    </div>
  );
}

export default Logout;
