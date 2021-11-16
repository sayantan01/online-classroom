import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import Classroom from "./components/Classroom";
import Assignment from "./components/Assignment";
import NotFound from "./components/NotFound";
import { logoutUser } from "./actions/actionUtils";

import "./App.css";

function renderClassrooms(props) {
  if (props.classrooms === null) return;
  return props.classrooms.map((c, id) => {
    const path = "/classrooms/" + id;
    console.log(path, c.assignments);
    return (
      <Route
        key={id}
        exact
        path={path}
        render={(props) => (
          <Classroom
            {...props}
            id={id}
            classroom_id={c._id}
            name={c.name}
            creator={c.creator}
            students={c.students}
            assignments={c.assignments}
          />
        )}
      />
    );
  });
}

function renderAssignments(props) {
  if (props.classrooms === null) return;
  return props.classrooms.map((c, id) => {
    return c.assignments.map((assign, aid) => {
    const path = "/classrooms/" + id + "/" + aid;
    console.log(assign);
    console.log(path);
    return (
      <Route
        key={aid}
        exact
        path={path}
        render={(props) => (
          <Assignment
            {...props}
            id={aid}
            title={assign.title}
            statement={assign.statement}
            createdAt={assign.createdAt}
            deadline={assign.deadline}
            attachments={assign.attachments}
          />
        )}
      />
    );
    });
  });
}

function App(props) {
  useEffect(() => {
    try {
      const token = jwt_decode(props.token);
      const exp = token.exp;
      if (exp < Date.now() / 1000) {
        props.dispatch(logoutUser());
      }
    } catch (err) {
      console.log("err " + err);
    }
  }, [props]);
    console.log(process.env.PUBLIC_URL)

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="/home">M Classroom</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/signup">Signup</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              {props.token !== null && (
                <Nav.Item>
                  <User />
                </Nav.Item>
              )}
              {props.token !== null && <Logout />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          {renderClassrooms(props)}
          {renderAssignments(props)}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    classrooms: state.classrooms,
  };
};

export default connect(mapStateToProps)(App);
