import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { CourseContext } from "../../contexts/ContextProvider";

function AddCourseModal({ show, handleClose, toast }) {
  const [newCourse, setNewCourse] = React.useState({
    name: "",
    description: "",
    videoId: "",
    status: "TO LEARN",
  });

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

  const { addCourse } = React.useContext(CourseContext);

  const { name, description, videoId, status } = newCourse;

  const onChangeNewCourseForm = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    handleClose();
    setNewCourse({
      name: "",
      description: "",
      videoId: "",
      status: "TO LEARN",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addCourse(newCourse);
    if (success ? "success" : "error") {
      toast.success(message, toastEmiter);
    }
    closeModal();
  };
  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Course</Modal.Title>
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
                onChange={onChangeNewCourseForm}
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
                onChange={onChangeNewCourseForm}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Status : LEARNED, LEARNING, TO LEARN"
                name="status"
                value={status}
                onChange={onChangeNewCourseForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Youtube videoId"
                name="videoId"
                value={videoId}
                onChange={onChangeNewCourseForm}
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

export default AddCourseModal;
