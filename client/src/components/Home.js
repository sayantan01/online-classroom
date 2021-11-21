import React from "react";
import { Row, Carousel, Button } from "react-bootstrap";

function Home() {
  return (
    <div
      className="container-fluid text-center"
      style={{ backgroundColor: "#1b1b1b" }}
    >
      <h1 id="title" className="text-center py-2">
        M Classroom - Give learning a new dimension
      </h1>
      <Button variant="primary">
        <a href="/dashboard" style={{ color: "white" }}>
          Get Started Here
        </a>
      </Button>
      <Row xl={3} lg={2} md={2} sm={1}>
        <Carousel
          style={{ width: 800, height: 500, margin: "auto", marginTop: 50 }}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.viewsonic.com/library/wp-content/uploads/2020/03/X00324-2-01_Facebook.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.designingdigitally.com/promotional/blog/quotes/4.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.schooljotter.com/wp-content/uploads/2016/01/shutterstock348916574.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </Row>
    </div>
  );
}

export default Home;
