import React, { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext, CourseContext } from "../../contexts/ContextProvider";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function ShowCourse() {
  const [course, setCourse] = useState({});

  const {
    authState: { user },
  } = useContext(AuthContext);

  // console.log(user);

  const location = useLocation();
  const id = location.pathname.split("/")[3];
  // console.log(id);

  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/courses/learn/${id}`,
        user
      );
      setCourse(res.data.course);
      console.log(res.data);
    };
    getAllData();
  }, [id, setCourse, user]);

  // console.log(course);

  return (
    <Row style={{ margin: 0 }}>
      <Col md={{ span: 7, offset: 3 }}>
        <h2
          style={{ textAlign: "center", fontWeight: "500", margin: "20px 0px" }}
        >
          {course.name}
        </h2>
        <iframe
          width="1000"
          height="500"
          src={`https://www.youtube.com/embed/${course.videoId}?start=1`}
          title={course.desc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Col>
    </Row>
  );
}

export default ShowCourse;
