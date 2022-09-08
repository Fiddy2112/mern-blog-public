import React, { useEffect, useState } from "react";
import { apiURL } from "../../contexts/constants";
import axios from "axios";
import { Badge, Button, Card } from "react-bootstrap";

function Home() {
  const [courses, setCourses] = useState([]);

  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiURL}/courses`);
      console.log(response);
      if (response.data.success) {
        setCourses(response.data.courses);
      } else {
        setCourses([]);
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: "Server error!" };
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <>
      {courses.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <h2>
            It looks like you don't have a course at all. Do you want create a
            Course?
          </h2>
          <Button href="#">Let's go</Button>
        </div>
      ) : (
        <div className="d-flex mt-4 ">
          {courses.map((course) => (
            <Card
              style={{
                width: "18rem",
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              <Card.Img variant="top" src={course.image} />
              <Badge
                style={{ borderRadius: "none" }}
                bg={
                  course.status === "LEARNED"
                    ? "success"
                    : course.status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
              >
                {course.status}
              </Badge>
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>

                <Button style={{ width: "100%" }} variant="outline-primary">
                  Learn
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
