import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchData } from "../actions/creators";

function Update(props) {
  const handleFetch = (e) => {
    props.dispatch(fetchData(props.token));
  };
  return (
    <div>
      <Button className="my-2 my-lg-0" variant="danger" onClick={handleFetch}>
        Update
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(Update);
