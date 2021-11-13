import React from "react";
import { Row, Carousel } from "react-bootstrap";

function Home() {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#1b1b1b" }}>
      <h1 id="title" className="text-center py-2">
        M Classroom - Give learning a new dimension
      </h1>
      <Row xl={3} lg={2} md={2} sm={1}>
        <Carousel
          style={{ width: 800, height: 500, margin: "auto", marginTop: 50 }}
        >
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
              src="https://1635225677.rsc.cdn77.org/images/animation-elearning-software.jpg"
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn1.expresscomputer.in/wp-content/uploads/2019/08/12100736/e-learning.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Row>
    </div>
  );
}

export default Home;
