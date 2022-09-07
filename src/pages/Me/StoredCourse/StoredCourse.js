import React from "react";
import { Row, Col, Table } from "react-bootstrap";

function StoredCourse() {
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
          <tbody>
            <tr>
              <td>
                <input type="checkbox" name="" />1
              </td>
              <td>HTML,CSS</td>
              <td>LEARNING</td>
              <td>11:12pm</td>
            </tr>
            <tr>
              <td>2</td>
              <td>JAVASCRIPT</td>
              <td>TO LEARN</td>
              <td>2:00am</td>
            </tr>
            <tr>
              <td>3</td>
              <td>PYTHON TUTORIAL</td>
              <td>TO LEARN</td>
              <td>9:30am</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default StoredCourse;
