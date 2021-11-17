import React, { useState } from "react";
import { Button, Modal, Row, Col, Card, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { Helmet } from "react-helmet";
import enIN from "date-fns/locale/en-IN";
import "react-datepicker/dist/react-datepicker.css";
import { createAssignment } from "../actions/creators";
import { receiveError } from "../actions/actionUtils";

registerLocale("enIN", enIN);

function CreateAssignment({ props }) {
  const [values, setValues] = useState({
    title: "",
    statement: "",
    deadline: new Date(),
  });

  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [assignmentlength, setAssignmentlength] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeTitle = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      title: e.target.value,
    }));
  };

  const onChangeStatement = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      statement: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setValues((values) => ({
      ...values,
      deadline: date,
    }));
  };

  const handleCreate = () => {
    setShow(false);
    if (
      values.title === "" ||
      values.statement === "" ||
      values.deadline === ""
    ) {
      setSubmitted(true);
      props.dispatch(receiveError("Fill up all the required fields !"));
      return;
    }
    let reqObj = values;
    reqObj.token = props.token;
    reqObj.classroom_id = props.classroom_id;
    setSubmitted(true);
    setAssignmentlength(props.assignments.length);
    props.dispatch(createAssignment(reqObj));
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
      {submitted &&
        !props.errors &&
        props.assignments.length > assignmentlength && (
          <Alert
            variant="success"
            onClose={() => setSubmitted(false)}
            dismissible
          >
            Successfully created assignment
          </Alert>
        )}
      <Row className="my-3">
        <Col md={8}>
          <h1>Classroom: {props.name}</h1>
        </Col>
        <Col md={4}>
          {props.isTeacher === true && (
            <Button variant="primary" onClick={handleShow}>
              + Create Assignment
            </Button>
          )}
        </Col>
      </Row>
      <p style={{ color: "red" }}>
        {props.isTeacher
          ? "* The assignments you create will appear here"
          : `Created by: ${props.creator}`}
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-grid gap-2 col-8 mx-auto my-3">
              <label>
                Assignment Title<sup style={{ color: "red" }}>*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Title of the assignment"
                value={values.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="d-grid gap-2 col-8 mx-auto my-3">
              <label>
                Statement<sup style={{ color: "red" }}>*</sup>
              </label>
              <div className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Enter the problem statement"
                  value={values.statement}
                  onChange={onChangeStatement}
                />
              </div>
            </div>
            <div className="d-grid gap-2 col-8 mx-auto my-3">
              <label>
                Deadline<sup style={{ color: "red" }}>*</sup>
              </label>
              <DatePicker
                locale="enIN"
                dateFormat="dd/MM/yyyy"
                selected={values.deadline}
                onChange={handleDateChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function AssignmentIcon(props) {
  return (
    <Col className="AssignmentIcon">
      <Card
        bg="success"
        border="primary"
        style={{ width: 350, height: 350, margin: 20 }}
      >
        <Card.Img
          variant="top"
          src="../assignment.jpg"
          alt="Icon"
        />
        <Card.Body>
          <Card.Title style={{ color: "white", fontWeight: "bold" }}>
            <Row>
              <Col xs={8}>{props.title}</Col>
              <Col xs={4}>
                <Button variant="danger">
                  <a
                    href={`/classrooms/${props.cid}/${props.aid}`}
                    style={{ color: "white" }}
                  >
                    Open
                  </a>
                </Button>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text style={{ color: "orange", fontWeight: "bold" }}>
            {props.isTeacher === false && (
              <label className="my-3">Due date: {props.deadline}</label>
            )}
            <br />
            {props.isTeacher === true && (
              <label>Created at: {props.createdAt}</label>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

function TableRow(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.email}</td>
    </tr>
  );
}

function Participants({ props }) {
  const renderRow = () => {
    return props.students.map((item, i) => {
      return <TableRow key={i} id={i + 1} email={item} />;
    });
  };
  return (
    <div className="my-3">
      <h5>Participants List</h5>
      <table className="table table-light table-striped my-3">
        <thead>
          <tr>
            <td>Sl No.</td>
            <td>Email ID</td>
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </table>
    </div>
  );
}

function Classroom(props) {
  const renderAssignment = () => {
    if (props.assignments === undefined || props.assignments === null) return;
    return props.assignments
      .slice(0)
      .reverse()
      .map((item, i) => {
        return (
          <AssignmentIcon
            key={props.assignments.length - 1 - i}
            cid={props.id}
            aid={props.assignments.length - 1 - i}
            title={item.title}
            deadline={item.deadline.slice(0, 10)}
            createdAt={item.createdAt}
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
      <CreateAssignment props={props} />
      {props.assignments && props.assignments.length === 0 && (
        <div className="text-center my-5">
          <h5 style={{ color: "gray" }}>
            Classroom assignments will show up here
          </h5>
        </div>
      )}
      {props.assignments && props.assignments.length !== 0 && (
        <Row xl={3} lg={2} md={2} sm={1}>
          {renderAssignment()}
        </Row>
      )}
      <Row xl={3}>
        <Participants props={props} />
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

export default connect(mapStateToProps)(Classroom);
