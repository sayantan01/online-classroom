import React, { useState } from "react";
import { Button, Modal, Row, Col, Card, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { createOrJoinClass } from "../actions/creators";

function CreateOrJoinClassroom({ props }) {
  const [show, setShow] = useState(false);
  const [inputval, setInputval] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onchangeInputval = (e) => {
    e.persist();
    setInputval(e.target.value);
  };

  const handleCreateOrJoin = () => {
    setShow(false);
    let reqObj = {
      token: props.token,
      isTeacher: props.isTeacher,
    };
    if (props.isTeacher) reqObj.name = inputval;
    else reqObj.passcode = inputval;
    setSubmitted(true);
    props.dispatch(createOrJoinClass(reqObj));
  };

  return (
    <div>
      {submitted && props.errors && (
        <Alert
          variant="warning"
          onClose={() => setSubmitted(false)}
          dismissible
        >
          {props.errors}
        </Alert>
      )}
      {submitted && !props.errors && (
        <Alert
          variant="success"
          onClose={() => setSubmitted(false)}
          dismissible
        >
          {props.isTeacher
            ? "Successfully created classroom"
            : "Successfully joined classroom"}
        </Alert>
      )}
      <Row className="my-3">
        <Col md={8}>
          <h1>Welcome to dashboard</h1>
        </Col>
        <Col md={4}>
          <Button variant="primary" onClick={handleShow}>
            {props.isTeacher ? "+ Create Classroom" : "+ Join Classroom"}
          </Button>
        </Col>
      </Row>
      <p style={{ color: "red" }}>
        {props.isTeacher
          ? "* To let the students join a classroom, share the classroom's passcode with them"
          : "* To join a classroom, click on the button and enter the passcode shared by your teacher"}
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.isTeacher ? "Create new classroom" : "Join a classroom"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.isTeacher ? "Classroom name:" : "Passcode"}
          <br />
          <input
            style={{ marginTop: 10 }}
            type="text"
            placeholder={
              props.isTeacher ? "Enter classroom name" : "Enter passcode"
            }
            value={inputval}
            onChange={onchangeInputval}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateOrJoin}>
            {props.isTeacher ? "Create" : "Join"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function ClassIcon(props) {
  return (
    <Col className="ClassIcon">
      <Card
        bg="success"
        border="primary"
        style={{ width: 350, height: 350, margin: 20 }}
      >
        <Card.Img
          variant="top"
          src="https://www.chieflearningofficer.com/wp-content/uploads/sites/3/beans/images/AdobeStock_342462377-8b38574.png"
          alt="Icon"
        />
        <Card.Body>
          <Card.Title style={{ color: "white", fontWeight: "bold" }}>
            {props.classroom_name}
          </Card.Title>
          <Card.Text style={{ color: "orange", fontWeight: "bold" }}>
            {props.isTeacher === false && (
              <label>Created by: {props.teacher_name}</label>
            )}
            <br />
            {props.isTeacher === true && (
              <label>Passcode: {props.passcode}</label>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Dashboard(props) {
  const renderClassroom = () => {
    if (props.classrooms === undefined || props.classrooms === null) return;
    return props.classrooms
      .slice(0)
      .reverse()
      .map((item, i) => {
        return (
          <ClassIcon
            key={i}
            classroom_name={item.name}
            teacher_name={item.creator}
            passcode={item.passcode}
            isTeacher={props.isTeacher}
          />
        );
      });
  };

  return (
    <Container>
      {props.token === null && <Redirect to="/Login" />}
      <CreateOrJoinClassroom props={props} />
      {props.classrooms && props.classrooms.length === 0 && (
        <div className="text-center my-5">
          <h5 style={{ color: "gray" }}>You don't have any classrooms yet</h5>
        </div>
      )}
      {props.classrooms && props.classrooms.length !== 0 && (
        <Row xl={3} lg={2} md={2} sm={1}>
          {renderClassroom()}
        </Row>
      )}
    </Container>
  );
}

const mapStateToProps = function (state) {
  return {
    token: state.token,
    classrooms: state.classrooms,
    isTeacher: state.isTeacher,
    errors: state.msg,
  };
};

export default connect(mapStateToProps)(Dashboard);
