import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Table, Button, Spinner } from "react-bootstrap";
import { CourseContext } from "../../../contexts/ContextProvider";
import moment from "moment";
import AddCourseModal from "../../../components/Course/AddCourseModal";
import UpdateCourseModal from "../../../components/Course/UpdateCourseModal";
import { PlusCircle } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./StoredCourse.css";

function StoredCourse() {
  // Course Context
  const { courseState, getCourse, deleteCourse, findCourse } =
    useContext(CourseContext);
  const { courses, coursesLoading, course } = courseState;

  //ADD Modal react-bootstrap
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const handleShowAddPostModal = () => setShowAddPostModal(true);
  const handleCloseAddPostModal = () => setShowAddPostModal(false);

  //UPDATE Modal react-bootstrap
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const handleShowUpdatePostModal = () => setShowUpdatePostModal(true);
  const handleCloseUpdatePostModal = () => setShowUpdatePostModal(false);

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
    toast();
  }, [coursesLoading]);

  const chooseCourse = (courseId) => {
    findCourse(courseId);
    handleShowUpdatePostModal(true);
  };

  return (
    <>
      <Row style={{ marginRight: 0 }}>
        <Col md={{ span: 8, offset: 2 }}>
          <Table bordered hover className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Status</th>
                <th>CreateAt</th>
                <th colSpan="3"></th>
              </tr>
            </thead>
            {courses.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center">
                    No courses-Add a course!
                    <PlusCircle
                      className=" icon"
                      size={20}
                      onClick={handleShowAddPostModal}
                      style={{ marginLeft: 5 }}
                    />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>
                      {/* <input type="checkbox" name="" />1 */}
                      {index + 1}
                    </td>
                    <td>{course.name}</td>
                    <td>{course.status}</td>
                    <td>{moment(course.createAt).format("DD/MM/YY HH:mm")}</td>
                    <td>
                      <Button
                        variant="outline-info"
                        onClick={chooseCourse.bind(this, course._id)}
                      >
                        Edit
                      </Button>
                    </td>

                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={deleteCourse.bind(this, course._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6}>
                    <Button
                      variant="outline-success"
                      style={{ textAlign: "center" }}
                      onClick={handleShowAddPostModal}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </Col>
        <AddCourseModal
          show={showAddPostModal}
          handleClose={handleCloseAddPostModal}
          toast={toast}
        />
        {course !== null && (
          <UpdateCourseModal
            show={showUpdatePostModal}
            handleClose={handleCloseUpdatePostModal}
            toast={toast}
          />
        )}
        <ToastContainer />
      </Row>
    </>
  );
}

export default StoredCourse;
