import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AddNote } from "../../../utils/api";

const FormAdd = ({ triggerData, setTriggerData, handleCloseModal, handleAlert }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    createdAt: new Date().toISOString("id-ID"),
    archived: false,
  });

  const submitForm = async (e) => {
    e.preventDefault();
    await AddNote(formData);
    setFormData({ title: "", body: "", createdAt: "", archived: "" });
    setTriggerData(!triggerData);
    handleCloseModal();
    handleAlert("success", "Success Add Note!")
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Body</Form.Label>
        <Form.Control
          type="text"
          as="textarea" 
          rows={10}
          placeholder="Enter Body"
          value={formData.body}
          onChange={(event) =>
            setFormData({ ...formData, body: event.target.value })
          }
        />
      </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        <Button variant="primary" type="submit">Add Note</Button>
      </Modal.Footer>
    </Form>
  );
};

export default FormAdd;
