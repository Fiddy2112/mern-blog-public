import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, Spinner } from "react-bootstrap";
import { CourseContext } from "../../contexts/ContextProvider";

function Home() {
  // Course Context
  const { courseState, getCourse } = useContext(CourseContext);
  const { courses, coursesLoading } = courseState;
  // console.log(courses);

  useEffect(() => {
    if (
      coursesLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        ""
      )
    )
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
          <Button href="/me/stored-course">Let's go</Button>
        </div>
      ) : (
        <div className="d-flex mt-4 ">
          {courses.map((course) => (
            <Card
              key={course._id}
              style={{
                width: "18rem",
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              <Card.Img variant="top" src={course.image} />
              <Badge
                style={{ borderRadius: "0px" }}
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
                <Card.Title style={{ textOverflow: "ellipsis" }}>
                  {course.name}
                </Card.Title>
                <Card.Text>{course.description}</Card.Text>

                <Button
                  href={`courses/learn/${course._id}`}
                  style={{ width: "100%" }}
                  variant="outline-primary"
                >
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
