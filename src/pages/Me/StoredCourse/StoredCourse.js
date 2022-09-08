import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { apiURL } from "../../../contexts/constants";
import axios from "axios";
import moment from "moment";

function StoredCourse() {
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
    <Row style={{ marginRight: 0 }}>
      <Col md={{ span: 8, offset: 2 }}>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Status</th>
              <th>CreateAt</th>
            </tr>
          </thead>
          {courses.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Khong co khoa hoc nao
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>
                    <input type="checkbox" name="" />1
                  </td>
                  <td>{course.name}</td>
                  <td>{course.status}</td>
                  <td>{moment(course.createAt).format("DD/MM/YY HH:mm")}</td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </Col>
    </Row>
  );
}

export default StoredCourse;
