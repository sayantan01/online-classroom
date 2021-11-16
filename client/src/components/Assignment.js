import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function Assignment(props) {
  const handleClick = (e) => {
    const url = `/api/assignment/download/${props.attachments[0]}`;
    console.log(url);
    axios({
      url,
      method: "GET",
      responseType: "blob", // important
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "attachment");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="py-1" style={{ backgroundColor: "whitesmoke" }}>
      {props.token === null && <Redirect to="/Login" />}
      <Row className="my-5">
        <Col md={6}>
          <h3>Assignment: {props.title}</h3>
        </Col>
        <Col md={4}>
          <h6>
            <b>Deadline:</b> {props.deadline}
          </h6>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={10}>
          <hr />
          <pre>{props.statement}</pre>
          <hr />
        </Col>
      </Row>
      <Row className="my-3">
        <label className="my-2">Attachment: </label>
        <Col xs={2}>
          <Button onClick={handleClick}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQds60F_3ugmOsBapIJSMx2LxuQii1ogEowEq6mzSvnw_6tvQQ4M6fqCbE9p9T4yf0oBBI&usqp=CAU"
              alt="downlod attachment"
              width="20"
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = function (state) {
  return {
    token: state.token,
    isTeacher: state.isTeacher,
    errors: state.msg,
  };
};

export default connect(mapStateToProps)(Assignment);
