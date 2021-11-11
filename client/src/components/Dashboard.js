import React, { useState } from "react";
import { Button, Modal, Row, Col, Card, Container } from "react-bootstrap";

function CreateClassroom() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
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
          <input type="text" placeholder="Enter classroom name" required />
          <br />
          Passcode: <br />
          <input type="password" placeholder="Create a passcode" required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
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
            <p>Created by: {props.teacher_name}</p>
            <p>Passcode: {props.passcode}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Dashboard() {
  const classrooms = [
    {
      classroom_name: "DBMS",
      teacher_name: "mr. dbms",
      passcode: "passdbms",
    },
    {
      classroom_name: "Eng. Math",
      teacher_name: "mr. math",
      passcode: "passmath",
    },
    {
      classroom_name: "DSA",
      teacher_name: "mr. dsa",
      passcode: "passdsa",
    },
    {
      classroom_name: "Operating systems",
      teacher_name: "mr. os",
      passcode: "passos",
    },
    {
      classroom_name: "Networking",
      teacher_name: "mr. networks",
      passcode: "passnet",
    },
  ];
  const renderClassroom = () => {
    return classrooms.map((item, i) => {
      return (
        <ClassIcon
          key={item.id}
          classroom_name={item.classroom_name}
          teacher_name={item.teacher_name}
          passcode={item.passcode}
        />
      );
    });
  };

  return (
    <Container>
      <CreateClassroom />
      <Row xl={3} lg={2} md={2} sm={1}>
        {renderClassroom()}
      </Row>
    </Container>
  );
}

export default Dashboard;
