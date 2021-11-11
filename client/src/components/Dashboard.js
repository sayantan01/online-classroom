import React, { useState } from "react";
import { Button, Modal, Row, Col, Card, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { createClass } from "../actions/creators";

function CreateClassroom({ props }) {
  const [show, setShow] = useState(false);
  const [classname, setClassname] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onchangeName = (e) => {
    e.persist();
    setClassname(e.target.value);
  };

  const handleCreate = () => {
    setShow(false);
    const reqObj = {
      name: classname,
      token: props.token,
    };
    setSubmitted(true);
    props.dispatch(createClass(reqObj));
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
          {"Successfully created classroom"}
        </Alert>
      )}
      <Row className="my-3">
        <Col md={8}>
          <h1>Welcome to dashboard</h1>
        </Col>
        <Col md={4}>
          <Button variant="primary" onClick={handleShow}>
            + Create Classroom
          </Button>
        </Col>
      </Row>
      <p style={{ color: "red" }}>
        * To let the students join a classroom, share the classroom's passcode
        with them
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Classroom name:
          <br />
          <input
            type="text"
            placeholder="Enter classroom name"
            value={classname}
            onChange={onchangeName}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
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
            <label>Passcode: {props.passcode}</label>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Dashboard(props) {
  const renderClassroom = () => {
    if (props.classrooms === undefined || props.classrooms === null) return;
    return props.classrooms.map((item, i) => {
      return (
        <ClassIcon
          key={i}
          classroom_name={item.name}
          teacher_name={item.creator}
          passcode={item.passcode}
        />
      );
    });
  };

  return (
    <Container>
      {props.token === null && <Redirect to="/Login" />}
      {props.isTeacher && <CreateClassroom props={props} />}
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
