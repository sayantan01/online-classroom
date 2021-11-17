import React, { useState } from "react";
import Disqus from "disqus-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { submitAssignment } from "../actions/creators";

function TableRow(props) {
  const downloadSubmission = () => {
    const element = document.createElement("a");
    const file = new Blob([props.submission], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${props.student}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.student}</td>
      <td>
        <Button variant="warning" onClick={downloadSubmission}>
          Download Submission
        </Button>
      </td>
    </tr>
  );
}

function Submissions({ props }) {
  const renderRow = () => {
    return props.records.map((item, i) => {
      return (
        <TableRow
          key={i}
          id={i + 1}
          student={item.student}
          submission={item.submission}
        />
      );
    });
  };

  return (
    <div>
      <div>
        <h5>Submissions</h5>
      </div>
      <table className="table table-light table-striped my-3">
        <thead>
          <tr>
            <td>Sl No.</td>
            <td>Student</td>
            <td>Submission</td>
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </table>
    </div>
  );
}

function Assignment(props) {
  const disqusShortname = "https-online-classroom-2021-herokuapp-com";
  const disqusConfig = {
    url: "https://online-classroom-2021.herokuapp.com/",
    identifier: "assignment-id",
    title: "assignment",
  };

  const exists = props.records.find((r) => r.student === props.email);

  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onChangeAnswer = (e) => {
    e.persist();
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    const reqObj = {
      answer,
      token: props.token,
      email: props.email,
      assignment_id: props.assignment_id,
    };

    setSubmitted(true);
    props.dispatch(submitAssignment(reqObj));
  };

  return (
    <Container style={{ backgroundColor: "whitesmoke" }}>
      {props.token === null && <Redirect to="/Login" />}
      {submitted && (
        <Alert
          variant="success"
          onClose={() => setSubmitted(false)}
          dismissible
        >
          Successfully submitted assignment
        </Alert>
      )}
      <Row className="my-5 pt-3">
        <Col md={6}>
          <h3>Assignment: {props.title}</h3>
        </Col>
        <Col md={4}>
          <h6>
            {props.curDate <= props.deadline && !exists && (
              <div>
                <b>Deadline:</b> {props.deadline}
              </div>
            )}
            {props.curDate > props.deadline && !exists && (
              <p style={{ color: "red" }}>Deadline over</p>
            )}
            {exists && <p style={{ color: "green" }}>Submitted</p>}
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
      {props.isTeacher === false && props.curDate <= props.deadline && (
        <div>
          <Row className="my-5">
            <label className="mb-3">Your submission :</label>
            <Col md={10}>
              <textarea
                placeholder="Write your answer here"
                className="col-sm-12"
                rows="10"
                value={!exists ? answer : exists.submission}
                disabled={!exists ? false : true}
                onChange={onChangeAnswer}
              />
            </Col>
          </Row>
          {!exists && (
            <Row className="my-5">
              <Button onClick={handleSubmit} variant="success">
                Submit answer
              </Button>
            </Row>
          )}
        </div>
      )}

      {props.isTeacher === true && <Submissions props={props} />}

      <div className="my-5">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </Container>
  );
}

const mapStateToProps = function (state) {
  return {
    token: state.token,
    email: state.email,
    isTeacher: state.isTeacher,
    curDate: new Date(Date.now()).toISOString().slice(0, 10),
    errors: state.msg,
  };
};

export default connect(mapStateToProps)(Assignment);
