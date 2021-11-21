import React, { useState } from "react";
import { Button, Modal, Row, Col, Card, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createOrJoinClass } from "../actions/creators";

function CreateOrJoinClassroom({ props }) {
  const [show, setShow] = useState(false);
  const [inputval, setInputval] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [classlength, setClasslength] = useState(0);

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
    setClasslength(props.classrooms.length);
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
      {submitted && !props.errors && props.classrooms.length > classlength && (
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
          <h1>Your Classrooms</h1>
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
          <Button
            variant="primary"
            onClick={handleCreateOrJoin}
            disabled={inputval === "" ? true : false}
          >
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
        <Card.Img variant="top" src="./classroom.png" alt="Icon" />
        <Card.Body className="text-wrap">
          <Card.Title style={{ color: "white", fontWeight: "bold" }}>
            <Row>
              <Col xs={8}>{props.classroom_name}</Col>
              <Col xs={4}>
                <Button variant="danger">
                  <a
                    href={`/classrooms/${props.id}`}
                    style={{ color: "white" }}
                  >
                    Enter
                  </a>
                </Button>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text style={{ color: "orange", fontWeight: "bold" }}>
            {props.isTeacher === false && (
              <label>Created by: {props.teacher_name}</label>
            )}
            <br />
            {props.isTeacher === true && (
              <label>
                Passcode:{" "}
                <label style={{ fontSize: 12 }}>{props.passcode}</label>
              </label>
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
            key={props.classrooms.length - 1 - i}
            id={props.classrooms.length - 1 - i}
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
      <Helmet>
        <style>{"body { background-color: whitesmoke; }"}</style>
      </Helmet>
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
