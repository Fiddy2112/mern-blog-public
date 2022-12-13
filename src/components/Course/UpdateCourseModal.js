import React, { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { CourseContext } from "../../contexts/ContextProvider";

function UpdateCourseModal({ show, handleClose, toast }) {
  const { updateCourse, courseState } = React.useContext(CourseContext);
  const { course } = courseState;

  const [editCourse, setEditCourse] = React.useState(course);

  useEffect(() => {
    setEditCourse(course);
  }, [course]);

  //Toast
  const toastEmiter = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const { name, description, videoId, status } = editCourse;

  const onChangeUpdatedCourseForm = (e) => {
    setEditCourse({
      ...editCourse,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    handleClose();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updateCourse(editCourse);
    closeModal();
  };
  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Course</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                required
                aria-describedby="name-help"
                value={name}
                onChange={onChangeUpdatedCourseForm}
              />
              <Form.Text id="name-help" muted>
                Required
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                name="description"
                value={description}
                onChange={onChangeUpdatedCourseForm}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                placeholder="Status : LEARNED, LEARNING, TO LEARN"
                name="status"
                value={status}
                onChange={onChangeUpdatedCourseForm}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNED">LEARNED </option>
                <option value="LEARNING">LEARNING</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Youtube videoId"
                name="videoId"
                value={videoId}
                onChange={onChangeUpdatedCourseForm}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>

            <Button variant="primary" type="submit">
              Learn
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateCourseModal;
